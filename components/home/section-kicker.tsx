'use client'

import { motion } from 'framer-motion'

export function Kicker({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4 }}
      className={`font-mono text-[11px] font-semibold uppercase tracking-[0.22em] ${dark ? 'text-[#E8A0BF]' : 'text-[#D10E63]'}`}
    >
      {children}
    </motion.p>
  )
}
