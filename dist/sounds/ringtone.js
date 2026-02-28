// Ringtone for outgoing calls
// You can replace this with actual audio file
const ringtoneData = "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGWi57Oe"

// Create a simple beep sound using Web Audio API
export const playOutgoingRingtone = () => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)()
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()
  
  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)
  
  oscillator.frequency.value = 800
  oscillator.type = 'sine'
  gainNode.gain.value = 0.3
  
  oscillator.start()
  oscillator.stop(audioContext.currentTime + 0.2)
  
  // Create repeating pattern
  setTimeout(() => {
    const osc2 = audioContext.createOscillator()
    const gain2 = audioContext.createGain()
    osc2.connect(gain2)
    gain2.connect(audioContext.destination)
    osc2.frequency.value = 800
    osc2.type = 'sine'
    gain2.gain.value = 0.3
    osc2.start()
    osc2.stop(audioContext.currentTime + 0.2)
  }, 400)
}

export const playIncomingRingtone = () => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)()
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()
  
  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)
  
  oscillator.frequency.value = 600
  oscillator.type = 'sine'
  gainNode.gain.value = 0.4
  
//   oscillator.start()
//   oscillator.stop(audioContext.currentTime + 0.5)
  
  // Create repeating pattern
  setTimeout(() => {
    const osc2 = audioContext.createOscillator()
    const gain2 = audioContext.createGain()
    osc2.connect(gain2)
    gain2.connect(audioContext.destination)
    osc2.frequency.value = 600
    osc2.type = 'sine'
    gain2.gain.value = 0.4
    // osc2.start()
    // osc2.stop(audioContext.currentTime + 0.5)
  }, 800)
}
