'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/lib/language-context'

const T = {
  fr: {
    tooltipOpen: 'Parlez avec Alma',
    tooltipClose: 'Fermer',
    role: 'Votre accompagnatrice IA · Unitalk',
    online: 'En ligne',
    msg1: 'Bonjour, je suis Alma.',
    msg2a: 'Je collecte les données publiques de votre entreprise, puis je vous appelle pour créer votre agent : ',
    msg2strong: 'personnalisé sur mesure',
    msg2b: ', avec son prénom, sa voix, son email et son agenda. Votre nouveau bras droit, prêt à travailler.',
    msg3a: 'Ensuite, je reste à vos côtés : je vous accompagne au quotidien et vous forme à ',
    msg3strong: 'orchestrer vos agents',
    msg3b: ' pour en tirer le meilleur.',
    msg4: 'Pour commencer, quel est le nom de domaine de votre entreprise ?',
    placeholder: 'Entrez votre nom de domaine',
    footnote: 'Écrivez ou parlez — gratuit, sans carte bancaire',
  },
  en: {
    tooltipOpen: 'Chat with Alma',
    tooltipClose: 'Close',
    role: 'Your AI guide · Unitalk',
    online: 'Online',
    msg1: "Hello, I'm Alma.",
    msg2a: "I gather your company's public data, then I call you to create your agent: ",
    msg2strong: 'fully customized',
    msg2b: ', with its name, voice, email and calendar. Your new right hand, ready to work.',
    msg3a: 'Then I stay by your side: I guide you day to day and train you to ',
    msg3strong: 'orchestrate your agents',
    msg3b: ' to get the most out of them.',
    msg4: "To start, what's your company's domain name?",
    placeholder: 'Enter your domain name',
    footnote: 'Type or talk — free, no credit card',
  },
}

export function FloatingAlmaWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const { lang } = useLanguage()
  const t = T[lang]

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#D10E63] text-[#FBF9F3] shadow-[0_12px_32px_-8px_rgba(209,14,99,0.4)] transition-all hover:bg-[#B00B52] hover:shadow-[0_16px_40px_-8px_rgba(209,14,99,0.5)]"
        title={isOpen ? t.tooltipClose : t.tooltipOpen}
        aria-label={isOpen ? t.tooltipClose : t.tooltipOpen}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 max-h-[600px] w-96 overflow-hidden rounded-[28px] border border-[#DcD4C4] bg-[#FBF9F3] shadow-[0_32px_96px_-24px_rgba(28,26,23,0.45)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#E4DCCC] bg-[#F3EFE6] px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="relative shrink-0">
                  <img
                    src="/alma-avatar.png"
                    alt="Alma"
                    className="h-9 w-9 rounded-full object-cover ring-2 ring-[#D10E63]/35"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#F3EFE6] bg-[#2E7D4F]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1C1A17]">Alma</p>
                  <p className="text-[11px] text-[#857C6E]">{t.role}</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-[#857C6E] transition-colors hover:bg-[#E4DCCC] hover:text-[#1C1A17]"
                aria-label={t.tooltipClose}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="space-y-2.5 overflow-y-auto px-5 py-4" style={{ maxHeight: '340px' }}>
              <div className="flex items-start gap-2.5">
                <div className="rounded-2xl rounded-tl-md bg-[#EFE9DC] px-4 py-2.5 text-sm leading-relaxed text-[#1C1A17]">
                  {t.msg1}
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="rounded-2xl rounded-tl-md bg-[#EFE9DC] px-4 py-2.5 text-sm leading-relaxed text-[#4E483F]">
                  {t.msg2a}
                  <span className="font-medium text-[#1C1A17]">{t.msg2strong}</span>{t.msg2b}
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="rounded-2xl rounded-tl-md bg-[#EFE9DC] px-4 py-2.5 text-sm leading-relaxed text-[#4E483F]">
                  {t.msg3a}
                  <span className="font-medium text-[#1C1A17]">{t.msg3strong}</span>{t.msg3b}
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="rounded-2xl rounded-tl-md bg-[#EFE9DC] px-4 py-2.5 text-sm leading-relaxed text-[#1C1A17]">
                  {t.msg4}
                </div>
              </div>
            </div>

            {/* Composer */}
            <div className="border-t border-[#E4DCCC] bg-[#F3EFE6] px-4 py-2.5">
              <div className="flex items-center gap-2 rounded-full border border-[#DcD4C4] bg-[#FBF9F3] pl-4 pr-1.5 py-1.5 focus-within:border-[#D10E63]">
                <input
                  type="text"
                  placeholder={t.placeholder}
                  className="flex-1 bg-transparent text-sm text-[#1C1A17] placeholder-[#A79E8E] focus:outline-none"
                />
                <button
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#D10E63] text-[#FBF9F3] transition-colors hover:bg-[#B00B52]"
                  aria-label={lang === 'fr' ? 'Envoyer' : 'Send'}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                </button>
              </div>
              <p className="mt-2.5 text-center text-[10px] text-[#857C6E]">
                {t.footnote}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
