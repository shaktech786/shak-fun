// Bowling game sound system using Web Audio API

export type SoundEffect = 'roll' | 'pin-hit' | 'strike' | 'spare' | 'gutter'

class SoundManager {
  private audioContext: AudioContext | null = null
  private enabled: boolean = false
  private volume: number = 0.15

  private initAudioContext() {
    if (!this.audioContext && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      if (AudioContextClass) {
        this.audioContext = new AudioContextClass()
      }
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
    gainNode.gain.setValueAtTime(this.volume * 0.15, this.audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration)

    noise.connect(filter)
    filter.connect(gainNode)
    gainNode.connect(this.audioContext.destination)

    noise.start(this.audioContext.currentTime)
  }

  play(name: SoundEffect) {
    switch (name) {
      case 'roll':
        // Subtle low rumble
        this.playNoise(0.15, 150)
        break

      case 'pin-hit':
        // Quick impact
        this.playNoise(0.05, 1500)
        this.playTone(220, 0.05, 'sine')
        break

      case 'strike':
        // Single pleasant tone
        this.playTone(523, 0.2, 'sine')
        break

      case 'spare':
        // Short pleasant tone
        this.playTone(392, 0.15, 'sine')
        break

      case 'gutter':
        // Very subtle descending tone
        this.playTone(294, 0.15, 'sine')
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
