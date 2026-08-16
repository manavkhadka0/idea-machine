const STORAGE_KEY = 'idea-machine:sound'

export function isSoundEnabled(): boolean {
  if (typeof window === 'undefined') return true
  return window.localStorage.getItem(STORAGE_KEY) !== 'off'
}

export function setSoundEnabled(on: boolean) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, on ? 'on' : 'off')
}

function getContext(): AudioContext | null {
  if (typeof window === 'undefined' || typeof AudioContext === 'undefined') {
    return null
  }
  const win = window as unknown as { __ideaMachineAudio?: AudioContext }
  if (!win.__ideaMachineAudio) {
    win.__ideaMachineAudio = new AudioContext()
  }
  const ctx = win.__ideaMachineAudio
  if (ctx.state === 'suspended') void ctx.resume()
  return ctx
}

function tone(
  ctx: AudioContext,
  {
    start,
    freqFrom,
    freqTo,
    duration,
    peak,
    type,
  }: {
    start: number
    freqFrom: number
    freqTo?: number
    duration: number
    peak: number
    type: OscillatorType
  },
) {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freqFrom, start)
  if (freqTo !== undefined) {
    osc.frequency.exponentialRampToValueAtTime(freqTo, start + duration)
  }
  gain.gain.setValueAtTime(0.0001, start)
  gain.gain.linearRampToValueAtTime(peak, start + Math.min(0.015, duration / 4))
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration)
  osc.connect(gain).connect(ctx.destination)
  osc.start(start)
  osc.stop(start + duration + 0.02)
}

/** A short mechanical clack — the arm hitting the bottom of its pull. */
export function playPull() {
  if (!isSoundEnabled()) return
  const ctx = getContext()
  if (!ctx) return
  tone(ctx, {
    start: ctx.currentTime,
    freqFrom: 220,
    freqTo: 70,
    duration: 0.1,
    peak: 0.14,
    type: 'square',
  })
}

/** A bright three-note chime — the combo landing. */
export function playLand() {
  if (!isSoundEnabled()) return
  const ctx = getContext()
  if (!ctx) return
  const notes = [523.25, 659.25, 783.99] // C5, E5, G5
  notes.forEach((freq, i) => {
    tone(ctx, {
      start: ctx.currentTime + i * 0.06,
      freqFrom: freq,
      duration: 0.35,
      peak: 0.1,
      type: 'triangle',
    })
  })
}
