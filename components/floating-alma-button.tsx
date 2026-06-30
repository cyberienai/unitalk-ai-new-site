'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { AlmaAvatar } from './alma-avatar'

export function FloatingAlmaButton() {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-40"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.4 }}
    >
      {/* Tooltip */}
      <AnimatePresence>
        {isHovering && (
          <motion.div
            className="absolute bottom-full right-0 mb-3 whitespace-nowrap rounded-lg bg-[#1A1A1A] px-3 py-2 text-xs text-white border border-[rgba(255,255,255,0.08)]"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
          >
            Parler à Alma
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <motion.button
        className="relative h-14 w-14 rounded-full bg-[#FF0099] hover:bg-[#E00085] transition-colors flex items-center justify-center shadow-lg"
        style={{
          boxShadow: '0 4px 24px rgba(255, 0, 153, 0.35)',
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Parler à Alma"
      >
        <AlmaAvatar state="idle" size={26} showGlow={false} />
      </motion.button>
    </motion.div>
  )
}

import { AnimatePresence } from 'framer-motion'
