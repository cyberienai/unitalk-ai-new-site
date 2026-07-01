'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/language-context'

const ease = [0.22, 1, 0.36, 1] as const

const T = {
  fr: {
    eyebrow: 'Il apprend, chaque jour',
    title1: 'En quelques semaines, il connaît ',
    title2: 'vos clients mieux que vous.',
    body: 'Chaque appel, chaque email, chaque échange nourrit sa mémoire. Ce qu’il apprend ne se perd jamais — et vous profite pour toujours.',
  },
  en: {
    eyebrow: 'It learns, every day',
    title1: 'Within weeks, it knows ',
    title2: 'your customers better than you do.',
    body: 'Every call, every email, every exchange feeds its memory. What it learns is never lost — and benefits you forever.',
  },
}

export function StatementBand() {
  const { lang } = useLanguage()
  const t = T[lang]
  return (
    <section className="w-full bg-[#F3EFE6] py-24 sm:py-32">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D10E63]">
          {t.eyebrow}
        </p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease }}
          className="mt-5 font-sf text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.02] text-[#1C1A17] text-balance"
          style={{ letterSpacing: '-0.03em' }}
        >
          {t.title1}
          <span className="text-[#D10E63]">{t.title2}</span>
        </motion.h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#4E483F] sm:text-lg">
          {t.body}
        </p>
      </div>
    </section>
  )
}
