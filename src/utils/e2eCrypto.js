/**
 * E2EE Crypto Utilities — ECDH P-256 + AES-256-GCM
 *
 * Architecture:
 *  1. generateKeyPair()       — create ECDH P-256 key pair once per device session
 *  2. exportPublicKey()       — base64 SPKI → send to server POST /chats/:id/e2e/key
 *  3. deriveSharedKey()       — ECDH(myPrivate, theirPublic) → HKDF → AES-256-GCM key
 *  4. encryptMessage()        — AES-256-GCM encrypt → JSON {encryptedContent, iv, authTag}
 *  5. decryptMessage()        — AES-256-GCM decrypt using shared key
 *
 * Key storage (IndexedDB via keyStore helpers):
 *  - Private key: stored as non-extractable CryptoKey in IndexedDB
 *  - Public key:  stored as extractable CryptoKey in IndexedDB
 *  - Shared keys: derived on demand, cached in memory (Map)
 *
 * All functions are async and return Promises.
 */

// ─── IndexedDB key store ────────────────────────────────────────────────────

const DB_NAME = 'jamm_e2e';
const DB_VERSION = 1;
const STORE_NAME = 'keys';

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      e.target.result.createObjectStore(STORE_NAME);
    };
    req.onsuccess = (e) => resolve(e.target.result);
    req.onerror = (e) => reject(e.target.error);
  });
}

async function idbPut(key, value) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).put(value, key);
    tx.oncomplete = () => resolve();
    tx.onerror = (e) => reject(e.target.error);
  });
}

async function idbGet(key) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const req = tx.objectStore(STORE_NAME).get(key);
    req.onsuccess = (e) => resolve(e.target.result ?? null);
    req.onerror = (e) => reject(e.target.error);
  });
}

async function idbDelete(key) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).delete(key);
    tx.oncomplete = () => resolve();
    tx.onerror = (e) => reject(e.target.error);
  });
}

// ─── In-memory derived key cache ─────────────────────────────────────────────

/** @type {Map<string, CryptoKey>} chatId → AES-GCM derived key */
const derivedKeyCache = new Map();

// ─── Key generation & persistence ────────────────────────────────────────────

const PRIVATE_KEY_IDB = 'e2e_private_key';
const PUBLIC_KEY_IDB = 'e2e_public_key';

/**
 * Generate a new ECDH P-256 key pair and persist it in IndexedDB.
 * Call once per device; subsequent calls overwrite the previous keys
 * and will invalidate all existing derived shared keys.
 * @returns {{ publicKey: CryptoKey, privateKey: CryptoKey }}
 */
export async function generateAndStoreKeyPair() {
  const keyPair = await crypto.subtle.generateKey(
    { name: 'ECDH', namedCurve: 'P-256' },
    false, // private key non-extractable
    ['deriveKey'],
  );

  await idbPut(PRIVATE_KEY_IDB, keyPair.privateKey);
  await idbPut(PUBLIC_KEY_IDB, keyPair.publicKey);
  derivedKeyCache.clear();

  return keyPair;
}

/**
 * Load the stored key pair from IndexedDB.
 * Returns null if no keys have been generated yet.
 * @returns {{ publicKey: CryptoKey, privateKey: CryptoKey } | null}
 */
export async function loadStoredKeyPair() {
  const [privateKey, publicKey] = await Promise.all([
    idbGet(PRIVATE_KEY_IDB),
    idbGet(PUBLIC_KEY_IDB),
  ]);
  if (!privateKey || !publicKey) return null;
  return { privateKey, publicKey };
}

/**
 * Export the stored public key as base64 SPKI string for server registration.
 * @returns {string | null} base64 SPKI or null if not generated
 */
export async function exportPublicKeyBase64() {
  const publicKey = await idbGet(PUBLIC_KEY_IDB);
  if (!publicKey) return null;

  const spki = await crypto.subtle.exportKey('spki', publicKey);
  return btoa(String.fromCharCode(...new Uint8Array(spki)));
}

/**
 * Delete the stored key pair (e.g., when disabling E2EE).
 */
export async function clearStoredKeyPair() {
  await Promise.all([idbDelete(PRIVATE_KEY_IDB), idbDelete(PUBLIC_KEY_IDB)]);
  derivedKeyCache.clear();
}

// ─── ECDH shared key derivation ───────────────────────────────────────────────

/**
 * Import a base64 SPKI public key received from the server.
 * @param {string} base64Spki
 * @returns {CryptoKey}
 */
export async function importPublicKeyFromBase64(base64Spki) {
  const raw = Uint8Array.from(atob(base64Spki), (c) => c.charCodeAt(0));
  return crypto.subtle.importKey(
    'spki',
    raw,
    { name: 'ECDH', namedCurve: 'P-256' },
    false,
    [],
  );
}

/**
 * Derive a shared AES-256-GCM key using ECDH + HKDF.
 * Result is cached by chatId to avoid repeated derivations.
 *
 * @param {string}    chatId          — used as HKDF info / cache key
 * @param {CryptoKey} myPrivateKey    — caller's ECDH private key
 * @param {CryptoKey} theirPublicKey  — recipient's ECDH public key (imported)
 * @returns {CryptoKey} AES-256-GCM derived key
 */
export async function deriveSharedKey(chatId, myPrivateKey, theirPublicKey) {
  if (derivedKeyCache.has(chatId)) return derivedKeyCache.get(chatId);

  // Step 1: ECDH → raw shared secret
  const ecdhKey = await crypto.subtle.deriveKey(
    { name: 'ECDH', public: theirPublicKey },
    myPrivateKey,
    { name: 'HKDF' },
    false,
    ['deriveKey'],
  );

  // Step 2: HKDF → AES-256-GCM key
  // info encodes the chatId to bind key to this specific conversation
  const info = new TextEncoder().encode(`jamm-e2e-v1-${chatId}`);
  const salt = new TextEncoder().encode('jamm-hkdf-salt-v1');

  const aesKey = await crypto.subtle.deriveKey(
    { name: 'HKDF', hash: 'SHA-256', salt, info },
    ecdhKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt'],
  );

  derivedKeyCache.set(chatId, aesKey);
  return aesKey;
}

/**
 * Invalidate cached derived key for a chat (e.g., after key rotation).
 * @param {string} chatId
 */
export function clearDerivedKey(chatId) {
  derivedKeyCache.delete(chatId);
}

// ─── Encrypt / Decrypt ────────────────────────────────────────────────────────

/**
 * Encrypt a plaintext message using the derived shared key.
 * Returns a JSON string to be sent as the `content` field to the server.
 *
 * @param {string}    plaintext
 * @param {CryptoKey} sharedKey  — AES-256-GCM key from deriveSharedKey()
 * @returns {string} JSON: { encryptedContent, iv, authTag }
 */
export async function encryptMessage(plaintext, sharedKey) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(plaintext);

  // AES-GCM appends 16-byte auth tag at the end of ciphertext
  const cipherWithTag = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    sharedKey,
    encoded,
  );

  const cipherBytes = new Uint8Array(cipherWithTag);
  const ciphertext = cipherBytes.slice(0, cipherBytes.length - 16);
  const authTag = cipherBytes.slice(cipherBytes.length - 16);

  return JSON.stringify({
    encryptedContent: btoa(String.fromCharCode(...ciphertext)),
    iv: btoa(String.fromCharCode(...iv)),
    authTag: btoa(String.fromCharCode(...authTag)),
  });
}

/**
 * Decrypt a message payload received from the server.
 * `content` is the JSON string returned by the server for E2E messages.
 *
 * @param {string}    content    — JSON string or raw ciphertext envelope
 * @param {CryptoKey} sharedKey  — AES-256-GCM key from deriveSharedKey()
 * @returns {string} plaintext or null on failure
 */
export async function decryptMessage(content, sharedKey) {
  let parsed;
  try {
    parsed =
      typeof content === 'string' && content.startsWith('{')
        ? JSON.parse(content)
        : null;
  } catch {
    return null;
  }

  if (!parsed?.encryptedContent || !parsed?.iv || !parsed?.authTag) {
    return null;
  }

  try {
    const ciphertext = Uint8Array.from(atob(parsed.encryptedContent), (c) =>
      c.charCodeAt(0),
    );
    const iv = Uint8Array.from(atob(parsed.iv), (c) => c.charCodeAt(0));
    const authTag = Uint8Array.from(atob(parsed.authTag), (c) =>
      c.charCodeAt(0),
    );

    // Reassemble ciphertext + authTag (SubtleCrypto AES-GCM expects them joined)
    const combined = new Uint8Array(ciphertext.length + authTag.length);
    combined.set(ciphertext);
    combined.set(authTag, ciphertext.length);

    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      sharedKey,
      combined,
    );

    return new TextDecoder().decode(decrypted);
  } catch {
    return null;
  }
}

/**
 * Check whether a message content string is an E2E encrypted envelope.
 * @param {string} content
 * @returns {boolean}
 */
export function isE2EEnvelope(content) {
  if (typeof content !== 'string' || !content.startsWith('{')) return false;
  try {
    const p = JSON.parse(content);
    return Boolean(p.encryptedContent && p.iv && p.authTag);
  } catch {
    return false;
  }
}
