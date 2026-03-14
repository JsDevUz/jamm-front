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

const playTone = (audioContext, frequency, gain, duration, startAt = 0) => {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = frequency;
  oscillator.type = "sine";
  gainNode.gain.value = gain;

  const startTime = audioContext.currentTime + startAt;
  oscillator.start(startTime);
  oscillator.stop(startTime + duration);
};

const closeContextLater = (audioContext, delayMs) => {
  window.setTimeout(() => {
    audioContext.close().catch(() => {});
  }, delayMs);
};

export const playOutgoingRingtone = async () => {
  const audioContext = await getAudioContext();
  if (!audioContext) return;

  playTone(audioContext, 800, 0.3, 0.2, 0);
  playTone(audioContext, 800, 0.3, 0.2, 0.4);
  closeContextLater(audioContext, 900);
};

export const playIncomingRingtone = async () => {
  const audioContext = await getAudioContext();
  if (!audioContext) return;

  playTone(audioContext, 600, 0.4, 0.35, 0);
  playTone(audioContext, 600, 0.4, 0.35, 0.8);
  closeContextLater(audioContext, 1500);
};
