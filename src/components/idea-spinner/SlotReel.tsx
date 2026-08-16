import { motion } from 'framer-motion'
import type { MotionValue } from 'framer-motion'

interface SlotReelProps {
  items: string[]
  y: MotionValue<number>
  filter: MotionValue<string>
  landed: boolean
  locked: boolean
  itemHeight: number
  label: string
  narrow?: boolean
}

export function SlotReel({
  items,
  y,
  filter,
  landed,
  locked,
  itemHeight,
  label,
  narrow,
}: SlotReelProps) {
  const classes = [
    'slot-reel',
    narrow ? 'slot-reel--narrow' : '',
    landed ? 'slot-reel--landed' : '',
    locked ? 'slot-reel--locked' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <span className={classes} style={{ height: itemHeight }} aria-label={label}>
      <span className="slot-reel__label">{label}</span>
      <span className="slot-reel__fade slot-reel__fade--top" />
      <span className="slot-reel__fade slot-reel__fade--bottom" />
      <motion.span className="slot-reel__track" style={{ y, filter }}>
        {items.map((word, i) => (
          <span
            className="slot-reel__item"
            key={`${word}-${i}`}
            style={{ height: itemHeight }}
          >
            {word}
          </span>
        ))}
      </motion.span>
    </span>
  )
}
