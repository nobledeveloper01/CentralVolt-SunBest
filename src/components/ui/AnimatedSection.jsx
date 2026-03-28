import { motion } from 'motion/react'
import { fadeUp, fadeLeft, fadeRight, scaleIn, defaultTransition, viewportOnce } from '../../lib/animations'

const variants = { up: fadeUp, left: fadeLeft, right: fadeRight, scale: scaleIn }

export default function AnimatedSection({ children, direction = 'up', delay = 0, className = '' }) {
  const variant = variants[direction] || fadeUp

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={variant}
      transition={{ ...defaultTransition, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
