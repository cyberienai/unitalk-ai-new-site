'use client'

import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

export function SectionHeader({
  eyebrow,
  title,
  titleAccent,
  accentNewLine = false,
  subtitle,
  align = 'left',
  dark = false,
}: {
  eyebrow: string
  title: string
  titleAccent?: string
  accentNewLine?: boolean
  subtitle?: string
  align?: 'left' | 'center'
  dark?: boolean
}) {
  const wrap =
    align === 'center' ? 'mx-auto max-w-2xl items-center text-center' : 'max-w-2xl items-start'

  return (
    <div className={`flex flex-col ${wrap}`}>
      <div className="flex items-center gap-3">
        <span className="h-2 w-2 rounded-sm bg-[#D10E63]" />
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D10E63]">
          {eyebrow}
        </p>
      </div>

      <motion.h2
        className={`mt-4 font-sf text-3xl font-bold leading-[1.05] text-balance sm:text-4xl md:text-5xl ${
          dark ? 'text-[#F7F4EE]' : 'text-[#1C1A17]'
        }`}
        style={{ letterSpacing: '-0.03em' }}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease }}
      >
        {title}
        {titleAccent ? (
          <span className={`text-[#D10E63] ${accentNewLine ? 'block' : ''}`}>{titleAccent}</span>
        ) : null}
      </motion.h2>

      {subtitle ? (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            dark ? 'text-[#C4BCAE]' : 'text-[#4E483F]'
          }`}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}
