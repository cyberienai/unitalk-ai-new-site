'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FAQS = [
  {
    q: 'C’est quoi exactement un agent et un profil ?',
    a: 'Votre agent est votre collaborateur IA, façonné pour votre entreprise : il a un prénom, une voix, un email et un agenda. Les 10 profils sont ses “casquettes” prêtes à l’emploi — commercial, support, assistant, rédacteur… Un seul agent, dix rôles que vous activez selon vos besoins.',
  },
  {
    q: 'BYOK ou crédits inclus : quelle différence ?',
    a: 'En BYOK (Bring Your Own Key), vous connectez vos propres clés modèles (GPT, Claude, Gemini…) et vous ne payez que l’abonnement — vous gardez la main sur vos coûts. Avec les crédits inclus, tout est géré par Unitalk : rien à configurer, vous démarrez en une minute. Vous basculez de l’un à l’autre quand vous voulez.',
  },
  {
    q: 'Mes données sont-elles en sécurité ?',
    a: 'Oui. Cloud hébergé en France, données isolées et chiffrées, jamais utilisées pour entraîner des modèles. En version Desktop, rien ne sort de votre machine. En Business, vous déployez sur votre propre infrastructure.',
  },
  {
    q: 'Comment fonctionne l’essai de 7 jours ?',
    a: 'Vous créez votre agent et l’utilisez pendant 7 jours, sans carte bancaire. À la fin de l’essai, vous choisissez de continuer ou non — aucun prélèvement automatique, résiliable à tout moment.',
  },
  {
    q: 'Comment j’ajoute mon équipe ?',
    a: 'Vous démarrez seul avec votre agent, puis vous invitez vos collaborateurs. Alma les interview un par un, crée leurs agents sur mesure et partage le contexte de votre entreprise — pour que tous vos agents travaillent avec la même mémoire et les mêmes règles.',
  },
  {
    q: 'Qui est Alma ?',
    a: 'Alma est votre accompagnatrice IA. C’est elle qui vous appelle pour créer votre agent, vous guide au quotidien et vous forme à orchestrer vos agents. Si une question la dépasse, un ingénieur IA prend le relais en moins d’une heure.',
  },
]

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section
      id="faq"
      className="relative overflow-hidden border-t border-[rgba(255,255,255,0.06)] bg-[#0A0A0A] py-12 sm:py-20 md:py-28"
    >
      <div className="relative z-10 mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 sm:mb-14 max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF0099]">Questions fréquentes</p>
          <h2
            className="mt-3 font-heading text-3xl sm:text-4xl md:text-5xl font-light leading-[1.1] text-white text-balance"
            style={{ letterSpacing: '-0.02em' }}
          >
            Tout ce que vous voulez <span className="text-[#FF0099] italic">savoir.</span>
          </h2>
        </div>

        {/* Accordion */}
        <div className="divide-y divide-[rgba(255,255,255,0.08)] border-y border-[rgba(255,255,255,0.08)]">
          {FAQS.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-white"
                  aria-expanded={isOpen}
                >
                  <span className={`text-base sm:text-lg font-medium ${isOpen ? 'text-white' : 'text-[#D4D4DA]'}`}>
                    {item.q}
                  </span>
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors ${
                      isOpen ? 'border-[#FF0099] text-[#FF0099]' : 'border-white/20 text-[#8A8A92]'
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
                      <p className="pb-5 pr-10 text-sm sm:text-base leading-relaxed text-[#A0A0A8]">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        {/* Contact line */}
        <p className="mt-8 text-sm text-[#8A8A92]">
          Une autre question ?{' '}
          <a href="#" className="text-[#FF0099] underline-offset-4 hover:underline">
            Parlez-en à Alma
          </a>
          .
        </p>
      </div>
    </section>
  )
}
