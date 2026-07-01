'use client'

import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/language-context'

type StepIconKey = 'call' | 'build' | 'guide' | 'human'

const STEP_ICON: Record<StepIconKey, ReactNode> = {
  call: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  build: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  guide: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  human: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
}

const STEP_ORDER: StepIconKey[] = ['call', 'build', 'guide', 'human']

type Step = { title: string; desc: string }

const T = {
  fr: {
    eyebrow: 'Accompagnement',
    title1: 'Vous n’êtes jamais seul. ',
    title2: 'Alma vous guide.',
    subtitle:
      'De la création de votre agent à son orchestration au quotidien, une conseillère IA vocale vous accompagne — et un ingénieur humain prend le relais quand il le faut.',
    stepsLabel: 'Comment ça marche',
    steps: {
      call: { title: 'Un appel avec Alma', desc: 'Alma vous appelle, découvre votre entreprise et comprend vos besoins — sans formulaire, sans configuration.' },
      build: { title: 'Elle crée votre agent', desc: 'Elle façonne un agent sur mesure : prénom, voix, email, agenda et accès à vos outils.' },
      guide: { title: 'Elle vous forme', desc: 'Au quotidien, Alma vous apprend à orchestrer vos agents pour en tirer le meilleur.' },
      human: { title: 'Un humain si besoin', desc: 'Quand une question la dépasse, un ingénieur IA prend le relais en moins de 4 heures.' },
    } as Record<StepIconKey, Step>,
    almaCardTitle: 'Alma, votre conseillère IA vocale',
    almaCardDesc:
      'Une vraie voix, disponible en continu. Elle crée votre agent, répond à vos questions et vous accompagne à mesure que vos usages grandissent. Incluse dans tous les plans.',
    almaPoints: [
      'Création guidée par la voix',
      'Formation continue à l’orchestration',
      'Réponses en langage naturel',
      'Incluse, sans surcoût',
    ],
    humanCardTitle: 'Un onboarding humain, en option',
    humanCardDesc:
      'Besoin d’aller plus loin ? Nos ingénieurs IA configurent votre agent avec vous lors d’une session dédiée, et restent disponibles pour vos cas les plus exigeants.',
    humanPoints: [
      'Session de mise en service (1h)',
      'Configuration avancée sur mesure',
      'Relais humain sous 4 heures',
      'SLA dédié en plan Business',
    ],
    ctaTitle1: 'Prêt à rencontrer ',
    ctaTitle2: 'Alma ?',
    ctaDesc:
      'Donnez votre nom de domaine, elle vous appelle et crée votre agent. Gratuit, sans carte bancaire.',
    ctaBtn: 'Créer mon agent gratuitement',
  },
  en: {
    eyebrow: 'Support',
    title1: 'You’re never alone. ',
    title2: 'Alma guides you.',
    subtitle:
      'From creating your agent to orchestrating it day to day, an AI voice advisor supports you — and a human engineer takes over whenever needed.',
    stepsLabel: 'How it works',
    steps: {
      call: { title: 'A call with Alma', desc: 'Alma calls you, discovers your company and understands your needs — no forms, no setup.' },
      build: { title: 'She builds your agent', desc: 'She crafts a custom agent: name, voice, email, calendar and access to your tools.' },
      guide: { title: 'She trains you', desc: 'Day to day, Alma teaches you to orchestrate your agents to get the most out of them.' },
      human: { title: 'A human if needed', desc: 'When a question is beyond her, an AI engineer takes over in under 4 hours.' },
    } as Record<StepIconKey, Step>,
    almaCardTitle: 'Alma, your AI voice advisor',
    almaCardDesc:
      'A real voice, always available. She creates your agent, answers your questions and supports you as your usage grows. Included in every plan.',
    almaPoints: [
      'Voice-guided creation',
      'Ongoing orchestration training',
      'Natural-language answers',
      'Included, at no extra cost',
    ],
    humanCardTitle: 'Human onboarding, optional',
    humanCardDesc:
      'Need to go further? Our AI engineers configure your agent with you in a dedicated session, and stay available for your most demanding cases.',
    humanPoints: [
      'Setup session (1h)',
      'Advanced custom configuration',
      'Human backup within 4 hours',
      'Dedicated SLA on Business plan',
    ],
    ctaTitle1: 'Ready to meet ',
    ctaTitle2: 'Alma?',
    ctaDesc:
      'Give your domain name, she calls you and creates your agent. Free, no credit card.',
    ctaBtn: 'Create my agent for free',
  },
}

export function AccompagnementContent() {
  const { lang } = useLanguage()
  const t = T[lang]

  return (
    <main className="w-full bg-[#F3EFE6]">
      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-grid pt-28 sm:pt-32 pb-10 sm:pb-14">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D10E63]">{t.eyebrow}</p>
          <h1
            className="mt-3 font-sf text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] text-[#1C1A17] text-balance"
            style={{ letterSpacing: '-0.03em' }}
          >
            {t.title1}<span className="text-[#D10E63]">{t.title2}</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-[#4E483F]">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#857C6E]">{t.stepsLabel}</p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEP_ORDER.map((key, i) => {
            const step = t.steps[key]
            return (
              <motion.article
                key={key}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex flex-col rounded-2xl border border-[#DcD4C4] bg-[#FBF9F3] p-6"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D10E63]/10 text-[#D10E63]">
                    {STEP_ICON[key]}
                  </span>
                  <span className="font-sf text-sm font-bold text-[#857C6E]">0{i + 1}</span>
                </div>
                <h2 className="mt-5 font-sf text-lg font-bold leading-snug text-[#1C1A17]" style={{ letterSpacing: '-0.02em' }}>
                  {step.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#4E483F]">{step.desc}</p>
              </motion.article>
            )
          })}
        </div>
      </section>

      {/* Two cards: Alma + Human */}
      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pb-14">
        <div className="grid gap-5 lg:grid-cols-2">
          {[
            { title: t.almaCardTitle, desc: t.almaCardDesc, points: t.almaPoints, dark: false },
            { title: t.humanCardTitle, desc: t.humanCardDesc, points: t.humanPoints, dark: false },
          ].map((card) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4 }}
              className="flex flex-col rounded-3xl border border-[#DcD4C4] bg-[#FBF9F3] p-8"
            >
              <h2 className="font-sf text-2xl font-bold leading-snug text-[#1C1A17]" style={{ letterSpacing: '-0.02em' }}>
                {card.title}
              </h2>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#4E483F]">{card.desc}</p>
              <ul className="mt-6 space-y-2.5 border-t border-[#DcD4C4] pt-6">
                {card.points.map((point) => (
                  <li key={point} className="flex items-center gap-2.5 text-sm text-[#3A362F]">
                    <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-[#D10E63]/12 text-[#D10E63]">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pb-24">
        <div className="rounded-3xl bg-[#1C1A17] px-6 py-12 sm:px-12 sm:py-16 text-center">
          <h2
            className="font-sf text-2xl sm:text-3xl md:text-4xl font-bold leading-[1.1] text-[#FBF9F3] text-balance"
            style={{ letterSpacing: '-0.02em' }}
          >
            {t.ctaTitle1}<span className="text-[#FF6FB0]">{t.ctaTitle2}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-[#C4BAA8]">
            {t.ctaDesc}
          </p>
          <a
            href="/signup"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#D10E63] px-6 py-3 text-sm font-semibold text-[#FBF9F3] transition-colors hover:bg-[#B00B52]"
          >
            {t.ctaBtn}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>
        </div>
      </section>
    </main>
  )
}
