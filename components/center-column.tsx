'use client'

import { motion } from 'framer-motion'
import { Alma } from './alma'

export function CenterColumn({ selectedSlide }: { selectedSlide: number }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* Product Preview - Alma Avatar */}
      <motion.div
        className="w-full aspect-square max-w-sm rounded-2xl bg-gradient-to-br from-card to-secondary border border-border flex items-center justify-center overflow-hidden relative"
        key={selectedSlide}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Alma state={selectedSlide === 0 ? 'idle' : selectedSlide === 1 ? 'listening' : selectedSlide === 2 ? 'speaking' : 'thinking'} />
      </motion.div>

      {/* Slide Indicators */}
      <motion.div
        className="flex gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <motion.div
            key={index}
            className={`h-2 rounded-full transition-all ${
              index === selectedSlide ? 'w-6 bg-accent' : 'w-2 bg-muted'
            }`}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}
