import { useCallback, useEffect, useRef, useState } from 'react'
import { animate, motion, useMotionValue } from 'framer-motion'
import { prefersReducedMotion } from '#/lib/motion'

const REST_DEG = -6
const PULL_DEG = 24

// A pull isn't one clean snap-back — it overshoots the rest angle and
// settles in two decreasing beats, and the grip squashes on impact.
const ROTATE_KEYFRAMES = [
  REST_DEG,
  PULL_DEG,
  REST_DEG - 5,
  REST_DEG + 2,
  REST_DEG,
]
const SCALE_KEYFRAMES = [1, 0.84, 1.08, 0.97, 1]
const KEYFRAME_TIMES = [0, 0.26, 0.52, 0.76, 1]

interface LeverProps {
  onPull: () => void
  disabled?: boolean
}

/**
 * A slot-machine lever: a single arm pivoting from a fixed base, not a
 * knob sliding on a track. Click or press Enter/Space to pull it — the
 * arm snaps toward the reels, overshoots, and wobbles down to rest while
 * the grip squashes on impact, so the motion reads as spring-loaded
 * rather than a linear tween.
 */
export function Lever({ onPull, disabled }: LeverProps) {
  const rotate = useMotionValue(REST_DEG)
  const scale = useMotionValue(1)
  const controlsRef = useRef<ReturnType<typeof animate>[]>([])
  const [pulling, setPulling] = useState(false)

  const pull = useCallback(() => {
    if (disabled) return
    onPull()
    if (prefersReducedMotion()) return
    setPulling(true)
    controlsRef.current.forEach((c) => c.stop())
    controlsRef.current = [
      animate(rotate, ROTATE_KEYFRAMES, {
        duration: 0.62,
        times: KEYFRAME_TIMES,
        ease: ['easeIn', 'circOut', 'easeInOut', 'easeOut'],
        onComplete: () => setPulling(false),
      }),
      animate(scale, SCALE_KEYFRAMES, {
        duration: 0.62,
        times: KEYFRAME_TIMES,
        ease: ['easeIn', 'circOut', 'easeInOut', 'easeOut'],
      }),
    ]
  }, [disabled, onPull, rotate, scale])

  useEffect(() => () => controlsRef.current.forEach((c) => c.stop()), [])

  return (
    <button
      type="button"
      className="lever"
      onClick={pull}
      disabled={disabled}
      aria-label="Pull the lever to spin"
      data-pulling={pulling ? 'true' : 'false'}
    >
      <span className="lever__label">Pull</span>
      <span className="lever__mount" aria-hidden="true">
        <span className="lever__shadow" />
        <motion.span className="lever__arm" style={{ rotate }}>
          <motion.span className="lever__grip" style={{ scale }} />
        </motion.span>
        <span className="lever__base" />
      </span>
    </button>
  )
}
