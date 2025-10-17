// Bowling game sound system using Web Audio API

export type SoundEffect = 'roll' | 'pin-hit' | 'strike' | 'spare' | 'gutter'

class SoundManager {
  private audioContext: AudioContext | null = null
  private enabled: boolean = true
  private volume: number = 0.5

  private initAudioContext() {
    if (!this.audioContext && typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
  }

  private playTone(frequency: number, duration: number, type: OscillatorType = 'sine') {
    if (!this.enabled) return
    this.initAudioContext()
    if (!this.audioContext) return

    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(this.audioContext.destination)

    oscillator.type = type
    oscillator.frequency.value = frequency

    gainNode.gain.setValueAtTime(this.volume, this.audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration)

    oscillator.start(this.audioContext.currentTime)
    oscillator.stop(this.audioContext.currentTime + duration)
  }

  private playNoise(duration: number, filterFreq: number = 1000) {
    if (!this.enabled) return
    this.initAudioContext()
    if (!this.audioContext) return

    const bufferSize = this.audioContext.sampleRate * duration
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate)
    const output = buffer.getChannelData(0)

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1
    }

    const noise = this.audioContext.createBufferSource()
    noise.buffer = buffer

    const filter = this.audioContext.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = filterFreq

    const gainNode = this.audioContext.createGain()
    gainNode.gain.setValueAtTime(this.volume * 0.3, this.audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration)

    noise.connect(filter)
    filter.connect(gainNode)
    gainNode.connect(this.audioContext.destination)

    noise.start(this.audioContext.currentTime)
  }

  play(name: SoundEffect) {
    switch (name) {
      case 'roll':
        // Low rumbling sound
        this.playNoise(0.3, 200)
        this.playTone(60, 0.3, 'triangle')
        break

      case 'pin-hit':
        // Sharp impact sound
        this.playNoise(0.1, 2000)
        this.playTone(200, 0.1, 'square')
        break

      case 'strike':
        // Celebratory ascending tones
        setTimeout(() => this.playTone(262, 0.15, 'sine'), 0)    // C
        setTimeout(() => this.playTone(330, 0.15, 'sine'), 100)  // E
        setTimeout(() => this.playTone(392, 0.15, 'sine'), 200)  // G
        setTimeout(() => this.playTone(523, 0.3, 'sine'), 300)   // C (high)
        break

      case 'spare':
        // Pleasant chord
        this.playTone(262, 0.2, 'sine')  // C
        this.playTone(330, 0.2, 'sine')  // E
        this.playTone(392, 0.2, 'sine')  // G
        break

      case 'gutter':
        // Descending sad tones
        setTimeout(() => this.playTone(330, 0.15, 'sine'), 0)
        setTimeout(() => this.playTone(294, 0.15, 'sine'), 150)
        setTimeout(() => this.playTone(247, 0.3, 'sine'), 300)
        break
    }
  }

  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume))
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled
  }

  stopAll() {
    // Web Audio API nodes are automatically garbage collected when done
    // No need to manually stop them
  }
}

export const soundManager = new SoundManager()
