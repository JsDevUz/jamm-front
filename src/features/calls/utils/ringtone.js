const getAudioContext = async () => {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;

  const context = new AudioContextClass();
  if (context.state === "suspended") {
    try {
      await context.resume();
    } catch {
      return null;
    }
  }

  return context;
};

const scheduleTone = (
  audioContext,
  {
    frequency,
    startAt = 0,
    duration = 0.24,
    gain = 0.08,
    type = "sine",
    attack = 0.02,
    release = 0.14,
    detune = 0,
  },
) => {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  const startTime = audioContext.currentTime + startAt;
  const endTime = startTime + duration;

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, startTime);
  oscillator.detune.setValueAtTime(detune, startTime);

  gainNode.gain.setValueAtTime(0.0001, startTime);
  gainNode.gain.exponentialRampToValueAtTime(gain, startTime + attack);
  gainNode.gain.exponentialRampToValueAtTime(
    Math.max(gain * 0.72, 0.0001),
    startTime + Math.max(duration - release, attack + 0.02),
  );
  gainNode.gain.exponentialRampToValueAtTime(0.0001, endTime);

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.start(startTime);
  oscillator.stop(endTime);
};

const scheduleLayeredTone = (audioContext, note) => {
  scheduleTone(audioContext, note);
  scheduleTone(audioContext, {
    ...note,
    type: "triangle",
    gain: Math.max((note.gain || 0.08) * 0.65, 0.02),
    detune: 7,
  });
};

const closeContextLater = (audioContext, delayMs) => {
  window.setTimeout(() => {
    audioContext.close().catch(() => {});
  }, delayMs);
};

const playPattern = async (notes, closeAfterMs) => {
  const audioContext = await getAudioContext();
  if (!audioContext) return;

  notes.forEach((note) => scheduleLayeredTone(audioContext, note));
  closeContextLater(audioContext, closeAfterMs);
};

export const playOutgoingRingtone = async () => {
  await playPattern(
    [
      { frequency: 659.25, startAt: 0, duration: 0.22, gain: 0.06 },
      { frequency: 783.99, startAt: 0.12, duration: 0.28, gain: 0.055 },
      { frequency: 987.77, startAt: 0.42, duration: 0.24, gain: 0.06 },
      { frequency: 783.99, startAt: 0.66, duration: 0.3, gain: 0.05 },
    ],
    1300,
  );
};

export const playIncomingRingtone = async () => {
  await playPattern(
    [
      { frequency: 523.25, startAt: 0, duration: 0.3, gain: 0.075 },
      { frequency: 659.25, startAt: 0.16, duration: 0.34, gain: 0.07 },
      { frequency: 783.99, startAt: 0.72, duration: 0.28, gain: 0.08 },
      { frequency: 659.25, startAt: 0.92, duration: 0.36, gain: 0.07 },
    ],
    1800,
  );
};

export const playMeetStartedTone = async () => {
  await playPattern(
    [
      { frequency: 660, startAt: 0, duration: 0.12, gain: 0.05 },
      { frequency: 880, startAt: 0.16, duration: 0.15, gain: 0.05 },
      { frequency: 1046.5, startAt: 0.34, duration: 0.2, gain: 0.045 },
    ],
    900,
  );
};

export const playJoinRequestTone = async () => {
  await playPattern(
    [
      { frequency: 720, startAt: 0, duration: 0.1, gain: 0.04 },
      { frequency: 820, startAt: 0.18, duration: 0.1, gain: 0.04 },
      { frequency: 920, startAt: 0.36, duration: 0.12, gain: 0.04 },
    ],
    900,
  );
};
