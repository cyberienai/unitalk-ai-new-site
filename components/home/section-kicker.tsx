'use client'

import { motion } from 'framer-motion'

export function Kicker({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4 }}
      className={`inline-flex items-center rounded-xl border px-3.5 py-2 text-[13px] font-bold ${dark ? 'border-[#E8A0BF]/35 bg-[#E8A0BF]/15 text-[#F2BCD3]' : 'border-[#D10E63]/25 bg-[#D10E63]/[0.12] text-[#B00C54]'}`}
    >
      {children}
    </motion.p>
  )
}
