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
      { q: 'C’est quoi exactement un agent et un profil ?', a: 'Votre agent est votre collaborateur IA, façonné pour votre entreprise : il a un prénom, une voix, un email et un agenda. Les 10 profils sont ses “casquettes” prêtes à l’emploi — commercial, support, assistant, rédacteur… Un seul agent, dix rôles que vous activez selon vos besoins.' },
      { q: 'BYOK ou crédits prépayés : quelle différence ?', a: 'En BYOK (Bring Your Own Key), vous connectez vos propres clés modèles (ChatGPT, Claude, Gemini…) et vous ne payez que l’abonnement — vous gardez la main sur vos coûts. Avec les crédits prépayés, tout est géré par Unitalk : rien à configurer, vous démarrez en une minute. Vous basculez de l’un à l’autre quand vous voulez.' },
      { q: 'Mes données sont-elles en sécurité ?', a: 'Oui. Cloud hébergé en France, données isolées et chiffrées, jamais utilisées pour entraîner des modèles. En version Desktop, rien ne sort de votre machine. En Business, vous déployez sur votre propre infrastructure.' },
      { q: 'Comment fonctionne l’essai de 7 jours ?', a: 'Vous créez votre agent et l’utilisez pendant 7 jours, sans carte bancaire. À la fin de l’essai, vous choisissez de continuer ou non — aucun prélèvement automatique, résiliable à tout moment.' },
      { q: 'Comment j’ajoute mon équipe ?', a: 'Vous démarrez seul avec votre agent, puis vous invitez vos collaborateurs. Alma les interviewe un par un, crée leurs agents sur mesure et partage le contexte de votre entreprise — pour que tous vos agents travaillent avec la même mémoire et les mêmes règles.' },
      { q: 'Qui est Alma ?', a: 'Alma est votre conseillère IA vocale. C’est elle qui vous appelle pour créer votre agent, vous guide au quotidien et vous forme à orchestrer vos agents. Si une question la dépasse, un ingénieur IA prend le relais en moins de 4 heures.' },
    ],
  },
  en: {
    eyebrow: 'Frequently asked questions',
    title1: 'Everything you want ',
    title2: 'to know.',
    contactPre: 'Another question?',
    contactLink: 'Talk to Alma about it',
    faqs: [
      { q: 'What is Unitalk AI Cloud?', a: 'Unitalk AI Cloud is a web-based platform where you create, deploy, and collaborate with AI agents powered by Hermès. Each agent has its own identity, memory, and capabilities. Your entire team—humans and agents—works in the same space with shared context and mutable intelligence.' },
      { q: 'How does pricing work?', a: 'Executive: €29/month for 1 custom agent, 7 days free trial. Teams: €49/month per agent for shared team workspace. Business: €299/month base for dedicated private server with unlimited agents. All plans scale and are cancellable anytime.' },
      { q: 'Where are the servers located?', a: 'Unitalk Cloud servers are hosted in France for data sovereignty. All data is encrypted and isolated. If you choose the Business plan, you can deploy on your own private infrastructure for complete control.' },
      { q: 'How do I get started?', a: 'Sign up on unitalk.ai, and Alma—our AI voice advisor—will call you to create your first agent. In 5 minutes, your agent is ready. Activate your 7-day free trial immediately, no credit card required.' },
      { q: 'How do I chat with my Hermes agent?', a: 'Access your agent through the Unitalk web interface via text or voice. Your agent has its own email, phone, and calendar integration. You can also invite teammates to collaborate with the same agent or create personal agents for each team member.' },
      { q: 'Does my agent keep its data between sessions?', a: 'Yes. Your agent\'s memory persists across all sessions. Every conversation, decision, and context is stored in your company\'s shared memory vault—so your agent learns and gets smarter over time, and your whole team benefits.' },
      { q: 'What happens when I stop my agent?', a: 'You can pause or delete an agent anytime. If paused, its data is retained and the agent can be reactivated. If deleted, data is permanently removed. Your billing stops immediately when you cancel.' },
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
      className="relative overflow-hidden border-t border-[#DcD4C4] bg-[#FBF9F3] py-12 sm:py-20 md:py-28"
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
          <a href="#" className="text-[#D10E63] underline-offset-4 hover:underline">
            {t.contactLink}
          </a>
          .
        </p>
      </div>
    </section>
  )
}
