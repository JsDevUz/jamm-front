const uniq = (items) => [
  ...new Set(items.filter((item) => item !== null && item !== undefined)),
];

const getAudioOutputCandidates = async (speakerOn) => {
  const fallback = speakerOn ? ["default", ""] : ["communications", "default", ""];

  if (typeof navigator === "undefined" || !navigator.mediaDevices?.enumerateDevices) {
    return fallback;
  }

  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const outputs = devices.filter((device) => device.kind === "audiooutput");
    const preferredPattern = speakerOn
      ? /(speaker|external|default)/i
      : /(earpiece|receiver|phone|communication)/i;
    const preferredDevice = outputs.find((device) =>
      preferredPattern.test(String(device.label || "")),
    );

    return uniq([
      preferredDevice?.deviceId,
      ...outputs.map((device) => device.deviceId),
      ...fallback,
    ]);
  } catch {
    return fallback;
  }
};

const applySinkId = async (element, candidates) => {
  if (!element || typeof element.setSinkId !== "function") {
    return false;
  }

  for (const sinkId of candidates) {
    try {
      await element.setSinkId(sinkId);
      try {
        await element.play?.();
      } catch {}
      return true;
    } catch {}
  }

  return false;
};

export const applyPreferredAudioOutput = async (speakerOn, root = null) => {
  const targetRoot = root || (typeof document !== "undefined" ? document : null);

  if (!targetRoot?.querySelectorAll) {
    return false;
  }

  const candidates = await getAudioOutputCandidates(speakerOn);
  const mediaElements = [
    ...targetRoot.querySelectorAll("audio"),
    ...targetRoot.querySelectorAll("video"),
  ];

  if (!mediaElements.length) {
    return false;
  }

  const results = await Promise.all(
    mediaElements.map((element) => applySinkId(element, candidates)),
  );

  return results.some(Boolean);
};
