'use client'

import { Anthropic, DeepSeek, Gemini, Mistral, OpenAI } from '@lobehub/icons'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

const BRANDS: { provider: string; model?: string; logo: ReactNode; selected: boolean }[] = [
  { provider: 'OpenAI', model: 'GPT', logo: <OpenAI size={34} />, selected: true },
  { provider: 'Anthropic', model: 'Claude', logo: <Anthropic size={34} />, selected: true },
  { provider: 'Gemini', logo: <Gemini size={34} />, selected: true },
  { provider: 'DeepSeek', logo: <DeepSeek size={34} />, selected: false },
  { provider: 'Mistral AI', logo: <Mistral size={34} />, selected: false },
]

export function ModelLogoStrip({ lang }: { lang: 'fr' | 'en' }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.45 })
  const active = reduce || inView
  const t = COPY[lang]

  return (
    <div ref={ref} className="mt-12 border-y border-white/[0.14] py-9 sm:py-12">
      <h3 className="sr-only">{t.accessibleTitle}</h3>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(220px,2fr)] lg:items-end">
        <ul className="grid grid-cols-2 gap-x-7 gap-y-8 sm:grid-cols-5">
          {BRANDS.map(({ provider, model, logo, selected }, index) => (
            <motion.li
              key={provider}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={active ? { opacity: selected ? 1 : 0.62, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: reduce ? 0 : 0.35, delay: reduce ? 0 : index * 0.08 }}
              tabIndex={0}
              className="group relative min-w-0 outline-none transition-[opacity,transform] duration-150 hover:!-translate-y-0.5 hover:!opacity-100 focus-visible:!-translate-y-0.5 focus-visible:!opacity-100"
            >
              <span aria-hidden className="flex h-10 items-center text-[#FAF8F3]">{logo}</span>
              <span className="mt-3 block text-[14px] font-semibold text-[#FAF8F3] group-hover:text-white group-focus-visible:text-white">{provider}</span>
              {model && <span className="mt-0.5 block text-[11px] text-[#BDB7AC]">{model}</span>}
              {selected && <motion.span aria-hidden initial={reduce ? false : { scaleX: 0 }} animate={active ? { scaleX: 1 } : { scaleX: 0 }} transition={{ duration: reduce ? 0 : 0.35, delay: reduce ? 0 : 0.72 }} className="absolute -bottom-3 left-0 h-px w-full origin-left bg-[#D10E63]" />}
            </motion.li>
          ))}
        </ul>

        <motion.div initial={reduce ? false : { opacity: 0, y: 6 }} animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }} transition={{ duration: reduce ? 0 : 0.35, delay: reduce ? 0 : 0.9 }} className="border-t border-white/[0.14] pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#F2A4C5]">+ {t.privateTitle}</p>
          <p className="mt-2 text-[13px] leading-6 text-[#BDB7AC]">{t.privateBody}</p>
        </motion.div>
      </div>
    </div>
  )
}

const COPY = {
  fr: {
    accessibleTitle: 'Modèles accessibles via Unitalk AI Gateway',
    privateTitle: 'Vos modèles privés',
    privateBody: 'Connectés selon la configuration et les autorisations de votre entreprise.',
  },
  en: {
    accessibleTitle: 'Models available through Unitalk AI Gateway',
    privateTitle: 'Your private models',
    privateBody: 'Connected according to your organization’s configuration and permissions.',
  },
} as const
