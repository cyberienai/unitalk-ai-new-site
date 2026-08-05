'use client'

import { motion } from 'framer-motion'

export function Kicker({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4 }}
      className={`inline-flex items-center rounded-full border px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.16em] ${dark ? 'border-[#E8A0BF]/30 bg-[#E8A0BF]/10 text-[#F2BCD3]' : 'border-[#D10E63]/25 bg-[#D10E63]/[0.08] text-[#B00C54]'}`}
    >
      {children}
    </motion.p>
  )
}
