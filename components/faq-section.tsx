'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/lib/language-context'

const T = {
  fr: {
    eyebrow: 'Questions fréquentes',
    title1: 'Tout ce que vous voulez ',
    title2: 'savoir.',
    contactPre: 'Une autre question ?',
    contactLink: 'Parlez-en à Alma',
    faqs: [
      { q: 'Dois-je être expert en IA ?', a: "Non. Tout commence par une simple conversation avec Alma. Elle découvre votre entreprise et prépare le Collaborateur IA dont vous avez besoin, sans que vous ayez à rédiger le moindre prompt." },
      { q: 'Mon Collaborateur IA m’appartient-il ?', a: "Oui. Il appartient à votre organisation. Son identité, son contexte d’entreprise et son savoir-faire restent les vôtres : vous pouvez les consulter, les modifier et les exporter à tout moment." },
      { q: 'Puis-je utiliser mes propres modèles d’IA ?', a: "Oui. Vos Collaborateurs IA s’appuient sur les meilleurs modèles du marché, dont ChatGPT, Claude et Gemini. Utilisez les crédits Unitalk ou connectez vos propres clés API pour garder le contrôle de vos coûts." },
      { q: 'Puis-je héberger Unitalk chez moi ?', a: "Oui. Unitalk Cloud (hébergé en France et conforme au RGPD), chez votre propre hébergeur, on-premise, ou localement avec Unitalk Desktop." },
    ],
  },
  en: {
    eyebrow: 'Frequently asked questions',
    title1: 'Everything you want ',
    title2: 'to know.',
    contactPre: 'Another question?',
    contactLink: 'Talk to Alma about it',
    faqs: [
      { q: 'Do I need to be an AI expert?', a: 'No. It all starts with a simple conversation with Alma. She gets to know your company and prepares the AI Collaborator you need, without you writing a single prompt.' },
      { q: 'Does my AI Collaborator belong to me?', a: 'Yes. It belongs to your organization. Its identity, company context, and know-how stay yours: you can view, edit, and export them at any time.' },
      { q: 'Can I use my own AI models?', a: 'Yes. Your AI Collaborators rely on the best models available, including ChatGPT, Claude, and Gemini. Use Unitalk credits or connect your own API keys to stay in control of your costs.' },
      { q: 'Can I host Unitalk myself?', a: 'Yes. Unitalk Cloud (hosted in France and GDPR compliant), with your own host, on-premise, or locally with Unitalk Desktop.' },
    ],
  },
}

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0)
  const { lang } = useLanguage()
  const t = T[lang]
  const FAQS = t.faqs

  return (
    <section
      id="faq"
      className="relative overflow-hidden border-t border-[#E9E2D4] bg-[#FBF9F3] py-24 sm:py-32"
    >
      <div className="relative z-10 mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 sm:mb-14 max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D10E63]">{t.eyebrow}</p>
          <h2
            className="mt-3 font-sf text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] text-[#1C1A17] text-balance"
            style={{ letterSpacing: '-0.03em' }}
          >
            {t.title1}<span className="text-[#D10E63]">{t.title2}</span>
          </h2>
        </div>

        {/* Accordion */}
        <div className="divide-y divide-[#DcD4C4] border-y border-[#DcD4C4]">
          {FAQS.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className={`text-base sm:text-lg font-medium ${isOpen ? 'text-[#1C1A17]' : 'text-[#4E483F]'}`}>
                    {item.q}
                  </span>
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors ${
                      isOpen ? 'border-[#D10E63] text-[#D10E63]' : 'border-[#C4BAA8] text-[#857C6E]'
                    }`}
                    aria-hidden="true"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      className={`transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 pr-10 text-sm sm:text-base leading-relaxed text-[#6E665A]">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        {/* Contact line */}
        <p className="mt-8 text-sm text-[#857C6E]">
          {t.contactPre}{' '}
          <a href="/decouvrir" className="text-[#D10E63] underline-offset-4 hover:underline">
            {t.contactLink}
          </a>
          .
        </p>
      </div>
    </section>
  )
}
