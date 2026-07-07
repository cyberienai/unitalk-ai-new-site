'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/lib/language-context'

const T = {
  fr: {
    tooltipClose: 'Fermer',
    role: 'Je crée vos agents et les aide à progresser',
    // Contextual tooltips by route
    tipHome: '👋 Moi c’est Alma. Envie de créer votre premier collaborateur ?',
    tipAgents: 'Décrivons ensemble le poste à pourvoir.',
    tipPricing: 'Une question sur les offres ? Parlons-en.',
    tipDefault: 'Besoin d’un nouvel agent ?',
    msg1: 'Bonjour, je suis Alma.',
    msg2: 'Je vais apprendre à connaître votre entreprise et créer un agent qui travaillera pour vous.',
    msg3a: 'Je commence par découvrir ce qui est déjà public sur votre entreprise. Ensuite, je vous appelle pour comprendre votre activité, vos outils et votre façon de travailler. ',
    msg3strong: 'À la fin de notre conversation, votre agent est prêt à commencer.',
    msg4: 'Il possède sa propre identité : un prénom, une voix, un numéro de téléphone, une adresse email et un agenda. Il peut agir dans vos outils dès le premier jour.',
    msg5: 'Je reste ensuite à vos côtés : je vous aide à créer de nouveaux agents, à les faire progresser et à trouver de nouvelles tâches à automatiser.',
    msg6: 'Pour commencer, quel est le nom de domaine de votre entreprise ?',
    placeholder: 'Entrez votre nom de domaine',
    footnote: 'Écrivez ou parlez — gratuit, sans carte bancaire',
    send: 'Envoyer',
  },
  en: {
    tooltipClose: 'Close',
    role: 'I create your agents and help them grow',
    tipHome: '👋 Hi, I’m Alma. I can create your first agent.',
    tipAgents: 'Let’s describe the role you need to fill.',
    tipPricing: 'A question about our plans? Let’s talk.',
    tipDefault: 'Need a new agent?',
    msg1: "Hello, I'm Alma.",
    msg2: 'I’ll get to know your company and create an agent that works for you.',
    msg3a: 'I start by discovering what’s already public about your company. Then I call you to understand your business, your tools and the way you work. ',
    msg3strong: 'By the end of our conversation, your agent is ready to start.',
    msg4: 'It has its own identity: a name, a voice, a phone number, an email address and a calendar. It can act inside your tools from day one.',
    msg5: 'Then I stay by your side: I help you create new agents, make them progress and find new tasks to automate.',
    msg6: "To start, what's your company's domain name?",
    placeholder: 'Enter your domain name',
    footnote: 'Type or talk — free, no credit card',
    send: 'Send',
  },
}

function useContextualTip(t: (typeof T)['fr']) {
  const pathname = usePathname()
  if (pathname === '/' ) return t.tipHome
  if (pathname?.startsWith('/agents')) return t.tipAgents
  if (pathname?.startsWith('/tarifs')) return t.tipPricing
  return t.tipDefault
}

export function FloatingAlmaWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const { lang } = useLanguage()
  const t = T[lang]
  const tip = useContextualTip(t)

  // The contextual tooltip stays visible at all times while the chat is closed.
  const showTip = !isOpen

  return (
    <>
      {/* Floating launcher — Alma as a living presence, not a support bot */}
      <div className="fixed bottom-6 right-6 z-40 flex items-end gap-3">
        <AnimatePresence>
          {showTip && !isOpen && (
            <motion.button
              key="tip"
              onClick={() => setIsOpen(true)}
              initial={{ opacity: 0, x: 12, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 12, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className="mb-1 max-w-[220px] rounded-2xl rounded-br-md border border-[#DcD4C4] bg-[#FBF9F3] px-4 py-2.5 text-left text-[13px] leading-snug text-[#1C1A17] shadow-[0_16px_40px_-16px_rgba(28,26,23,0.35)]"
            >
              {tip}
            </motion.button>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#F3EFE6] shadow-[0_12px_32px_-8px_rgba(28,26,23,0.35)] ring-2 ring-[#D10E63]/40 transition-transform hover:scale-105"
          aria-label={isOpen ? t.tooltipClose : t.tipHome}
        >
          {isOpen ? (
            <span className="flex h-full w-full items-center justify-center rounded-full bg-[#D10E63] text-[#FBF9F3]">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </span>
          ) : (
            <>
              <img
                src="/alma-avatar.png"
                alt="Alma"
                className="h-full w-full rounded-full object-cover"
              />
              <span className="absolute bottom-0.5 right-0.5 h-3.5 w-3.5 rounded-full border-2 border-[#F3EFE6] bg-[#2E7D4F]" />
            </>
          )}
        </motion.button>
      </div>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-28 right-6 z-50 max-h-[620px] w-96 overflow-hidden rounded-[28px] border border-[#DcD4C4] bg-[#FBF9F3] shadow-[0_32px_96px_-24px_rgba(28,26,23,0.45)]"
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
            <div className="space-y-2.5 overflow-y-auto px-5 py-4" style={{ maxHeight: '380px' }}>
              <div className="flex items-start gap-2.5">
                <div className="rounded-2xl rounded-tl-md bg-[#EFE9DC] px-4 py-2.5 text-sm leading-relaxed text-[#1C1A17]">
                  {t.msg1}
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="rounded-2xl rounded-tl-md bg-[#EFE9DC] px-4 py-2.5 text-sm leading-relaxed text-[#4E483F]">
                  {t.msg2}
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="rounded-2xl rounded-tl-md bg-[#EFE9DC] px-4 py-2.5 text-sm leading-relaxed text-[#4E483F]">
                  {t.msg3a}
                  <span className="font-medium text-[#1C1A17]">{t.msg3strong}</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="rounded-2xl rounded-tl-md bg-[#EFE9DC] px-4 py-2.5 text-sm leading-relaxed text-[#4E483F]">
                  {t.msg4}
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="rounded-2xl rounded-tl-md bg-[#EFE9DC] px-4 py-2.5 text-sm leading-relaxed text-[#4E483F]">
                  {t.msg5}
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="rounded-2xl rounded-tl-md bg-[#EFE9DC] px-4 py-2.5 text-sm leading-relaxed text-[#1C1A17]">
                  {t.msg6}
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
                  aria-label={t.send}
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
