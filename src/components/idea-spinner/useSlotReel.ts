import { useCallback, useRef, useState } from 'react'
import {
  animate,
  useMotionValue,
  useTransform,
  useVelocity,
} from 'framer-motion'
import { prefersReducedMotion } from '#/lib/motion'

function shuffle<T>(arr: readonly T[]): T[] {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

interface UseSlotReelOptions {
  bank: readonly string[]
  itemHeight: number
  /** how many full shuffled passes of the bank scroll by before landing */
  loops?: number
  /** total spin duration in seconds, before any per-reel delay */
  duration?: number
  /** land on this word immediately (shared / restored combos) */
  initialWord?: string
}

/**
 * Drives one slot-machine reel: a MotionValue for the vertical offset (so
 * framer-motion can subscribe to it without re-rendering React on every
 * frame), a derived motion-blur filter based on real-time velocity, and a
 * `spin()` action that shuffles a fresh strip of words, animates a long
 * expo-out deceleration into a small overshoot, then settles back onto the
 * target with a soft spring "click" — the bit that makes it read as
 * physical rather than just a CSS transition stopping abruptly.
 */
export function useSlotReel({
  bank,
  itemHeight,
  loops = 4,
  duration = 3.2,
  initialWord,
}: UseSlotReelOptions) {
  const y = useMotionValue(0)
  const velocity = useVelocity(y)
  const filter = useTransform(velocity, (v) => {
    if (prefersReducedMotion()) return 'none'
    const blur = Math.min(Math.abs(v) / 320, 6)
    return blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : 'none'
  })

  const start =
    initialWord && bank.includes(initialWord) ? initialWord : bank[0]
  const [items, setItems] = useState<string[]>(() => [start])
  const [landed, setLanded] = useState(() =>
    Boolean(initialWord && bank.includes(initialWord)),
  )
  const controlsRef = useRef<ReturnType<typeof animate> | null>(null)

  const spin = useCallback(
    (delay = 0, targetWord?: string) => {
      return new Promise<string>((resolve) => {
        setLanded(false)
        const target =
          targetWord && bank.includes(targetWord)
            ? targetWord
            : bank[Math.floor(Math.random() * bank.length)]

        if (prefersReducedMotion()) {
          setItems([target])
          y.jump(0)
          setLanded(true)
          resolve(target)
          return
        }

        const strip: string[] = []
        for (let i = 0; i < loops; i++) strip.push(...shuffle(bank))
        strip.push(target)

        setItems(strip)
        y.jump(0)

        const finalOffset = (strip.length - 1) * itemHeight
        const overshoot = finalOffset + itemHeight * 0.16

        controlsRef.current?.stop()
        requestAnimationFrame(() => {
          controlsRef.current = animate(y, [0, -overshoot, -finalOffset], {
            duration,
            delay,
            times: [0, 0.91, 1],
            ease: [
              [0.16, 1, 0.3, 1],
              [0.33, 1.55, 0.62, 1],
            ],
            onComplete: () => {
              setLanded(true)
              resolve(target)
            },
          })
        })
      })
    },
    [bank, itemHeight, loops, duration, y],
  )

  const landOn = useCallback(
    (word: string) => {
      controlsRef.current?.stop()
      setItems([word])
      y.jump(0)
      setLanded(true)
    },
    [y],
  )

  return { y, filter, items, landed, spin, landOn }
}
