'use client'

import { motion } from 'framer-motion'
import { AlmaAvatar } from './alma-avatar'
import { useState } from 'react'

export function FloatingAlmaButton() {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-8 right-8 z-40 w-14 h-14 rounded-full bg-[#FF0099] hover:bg-[#E00085] transition-colors shadow-lg"
      style={{
        boxShadow: '0 4px 24px rgba(255, 0, 153, 0.35)'
      }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      aria-label="Talk to Alma"
    >
      <div className="w-full h-full flex items-center justify-center">
        <AlmaAvatar state="idle" size={26} showGlow={false} />
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-full right-0 mb-3 px-3 py-2 bg-[#1A1A1A] text-white text-xs rounded-lg whitespace-nowrap border border-[rgba(255,255,255,0.08)]"
        >
          Parler à Alma
        </motion.div>
      )}
    </motion.button>
  )
}
