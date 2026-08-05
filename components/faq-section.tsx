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
      { q: 'Dois-je être expert en IA ?', a: "Non. Tout commence par une conversation avec Alma. Elle découvre votre entreprise, comprend vos objectifs et recrute les Collaborateurs IA adaptés. Vous n'avez rien à configurer." },
      { q: 'Puis-je utiliser mes propres modèles IA ?', a: "Oui. Vous pouvez utiliser les crédits Unitalk ou connecter vos propres clés API. Vos Collaborateurs IA s'appuient sur les meilleurs modèles du marché, dont ChatGPT, et vous gardez le contrôle de vos coûts." },
      { q: 'Les Collaborateurs IA remplacent-ils mes équipes ?', a: "Non. Ils travaillent aux côtés de vos collaborateurs pour exécuter des missions, automatiser des tâches et augmenter leur capacité d'action." },
      { q: 'Puis-je héberger Unitalk sur mon infrastructure ?', a: 'Oui. Cloud, cloud privé, On-Premise ou Desktop. Votre infrastructure, votre choix. Les serveurs Unitalk sont hébergés en France pour la souveraineté de vos données.' },
      { q: 'Puis-je créer mes propres Collaborateurs IA ?', a: 'Oui. Vous pouvez recruter des profils existants, les personnaliser ou créer les vôtres. Alma personnalise ensuite leurs expertises, leurs connaissances et leurs missions.' },
    ],
  },
  en: {
    eyebrow: 'Frequently asked questions',
    title1: 'Everything you want ',
    title2: 'to know.',
    contactPre: 'Another question?',
    contactLink: 'Talk to Alma about it',
    faqs: [
      { q: 'Do I need to be an AI expert?', a: 'No. It all starts with a conversation with Alma. She learns about your company, understands your goals, and hires the right AI Collaborators. There is nothing to configure.' },
      { q: 'Can I use my own AI models?', a: 'Yes. You can use Unitalk credits or connect your own API keys. Your AI Collaborators rely on the best models available, including ChatGPT, and you stay in control of your costs.' },
      { q: 'Do AI Collaborators replace my teams?', a: 'No. They work alongside your team members to carry out missions, automate tasks, and increase their capacity to act.' },
      { q: 'Can I host Unitalk on my own infrastructure?', a: 'Yes. Cloud, private cloud, On-Premise or Desktop. Your infrastructure, your choice. Unitalk servers are hosted in France for the sovereignty of your data.' },
      { q: 'Can I create my own AI Collaborators?', a: 'Yes. You can hire existing profiles, personalize them, or create your own. Alma then personalizes their expertise, knowledge, and missions.' },
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
