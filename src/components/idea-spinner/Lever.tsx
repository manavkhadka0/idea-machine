import { useCallback, useEffect, useRef, useState } from 'react'
import { animate, motion, useMotionValue } from 'framer-motion'
import { prefersReducedMotion } from '#/lib/motion'

const REST_DEG = -6
const PULL_DEG = 22

interface LeverProps {
  onPull: () => void
  disabled?: boolean
}

/**
 * A slot-machine lever: a single arm pivoting from a fixed base, not a
 * knob sliding on a track. Click or press Enter/Space to pull it — the
 * arm snaps toward the reels and springs back to its resting cant while
 * onPull fires, so the rotation reads as the thing that caused the spin.
 */
export function Lever({ onPull, disabled }: LeverProps) {
  const rotate = useMotionValue(REST_DEG)
  const controlsRef = useRef<ReturnType<typeof animate> | null>(null)
  const [pulling, setPulling] = useState(false)

  const pull = useCallback(() => {
    if (disabled) return
    onPull()
    if (prefersReducedMotion()) return
    setPulling(true)
    controlsRef.current?.stop()
    controlsRef.current = animate(
      rotate,
      [REST_DEG, PULL_DEG, REST_DEG],
      {
        duration: 0.5,
        times: [0, 0.3, 1],
        ease: [
          [0.6, 0, 1, 0.2],
          [0.33, 1.6, 0.6, 1],
        ],
        onComplete: () => setPulling(false),
      },
    )
  }, [disabled, onPull, rotate])

  useEffect(() => () => controlsRef.current?.stop(), [])

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
        <motion.span className="lever__arm" style={{ rotate }}>
          <span className="lever__grip" />
        </motion.span>
        <span className="lever__base" />
      </span>
    </button>
  )
}
