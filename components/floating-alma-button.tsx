'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlmaAvatar } from './alma-avatar'

export function FloatingAlmaButton() {
  const [isHovering, setIsHovering] = useState(false)
  const [showPrompt, setShowPrompt] = useState(false)

  // Gentle opening prompt after the hero has settled
  useEffect(() => {
    const timer = setTimeout(() => setShowPrompt(true), 2500)
    const hide = setTimeout(() => setShowPrompt(false), 9000)
    return () => {
      clearTimeout(timer)
      clearTimeout(hide)
    }
  }, [])

  const isBubbleVisible = isHovering || showPrompt

  return (
    <motion.div
      className="fixed bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 z-40 flex items-end gap-3"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.4 }}
    >
      {/* Opening prompt bubble */}
      <AnimatePresence>
        {isBubbleVisible && (
          <motion.div
            className="mb-1 max-w-[200px] rounded-2xl rounded-br-sm border border-[rgba(255,255,255,0.08)] bg-[#1A1A1A] px-4 py-2.5 text-xs leading-relaxed text-white shadow-lg hidden sm:block"
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
          >
            Une question ? Je réponds en direct.
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button — dark glass surface so the primary CTA keeps the magenta */}
      <motion.button
        className="relative h-12 sm:h-14 w-12 sm:w-14 flex-shrink-0 rounded-full border border-[rgba(255,0,153,0.4)] bg-[#161616] transition-colors hover:bg-[#1E1E1E] flex items-center justify-center"
        style={{
          boxShadow: '0 4px 24px rgba(255, 0, 153, 0.2)',
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
