'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Cloud, Monitor, Shield } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

const COPY = {
  fr: {
    // 1 — Hero manifeste
    heroLine: 'Le monde recrute',
    heroAccent: 'des Collaborateurs IA.',
    heroQuestion: 'Qui sera votre premier Collaborateur IA ?',
    heroCta: 'Recruter votre premier Collaborateur IA',
    // 2 — Meet Emma
    emmaKicker: 'Rencontrez Emma',
    emmaTitle: 'Votre Collaborateur IA.',
    emmaWords: ['Une présence.', 'Un visage.', 'Une voix.', 'Une identité.'],
    emmaAvailable: 'Disponible',
    emmaRole: 'Assistante de direction',
    emmaLink: 'Rencontrer Emma',
    // 3 — Identity / expertise
    idTitle: 'Une identité. Une expertise sans limite.',
    idLead: 'Emma possède :',
    idItems: ['une mémoire', 'des compétences', 'des connaissances', 'des outils', 'des profils'],
    idFoot: 'Elle grandit avec votre entreprise.',
    // 4 — Ladder
    ladderTitle: 'D’un Collaborateur à une Force de travail IA.',
    ladder: ['Collaborateur IA', 'Équipe IA', 'Force de travail IA'],
    // 5 — Work anywhere
    workTitle: 'Travaillez partout.',
    workBody: 'Votre Collaborateur fonctionne là où vous le décidez.',
    workModes: [
      { icon: Cloud, label: 'Cloud' },
      { icon: Shield, label: 'Privé' },
      { icon: Monitor, label: 'Bureau' },
    ],
    // 6 — Ownership
    ownTitle: 'Vos Collaborateurs vous appartiennent.',
    ownBody: 'Vous payez pour l’intelligence qu’ils utilisent.',
    // 7 — Final CTA
    finalCta: 'Recruter votre premier Collaborateur IA',
    finalSecondary: 'Découvrir votre entreprise',
  },
  en: {
    heroLine: 'The world is hiring',
    heroAccent: 'AI Collaborators.',
    heroQuestion: 'Who is your first AI Collaborator?',
    heroCta: 'Recruit your first AI Collaborator',
    emmaKicker: 'Meet Emma',
    emmaTitle: 'Your AI Collaborator.',
    emmaWords: ['A presence.', 'A face.', 'A voice.', 'An identity.'],
    emmaAvailable: 'Available',
    emmaRole: 'Executive Assistant',
    emmaLink: 'Meet Emma',
    idTitle: 'One identity. Unlimited expertise.',
    idLead: 'Emma has:',
    idItems: ['memory', 'skills', 'knowledge', 'tools', 'profiles'],
    idFoot: 'She grows with your organization.',
    ladderTitle: 'From one Collaborator to an AI Workforce.',
    ladder: ['AI Collaborator', 'AI Team', 'AI Workforce'],
    workTitle: 'Work anywhere.',
    workBody: 'Your Collaborator runs where you choose.',
    workModes: [
      { icon: Cloud, label: 'Cloud' },
      { icon: Shield, label: 'Private' },
      { icon: Monitor, label: 'Desktop' },
    ],
    ownTitle: 'You own your Collaborators.',
    ownBody: 'You pay for the intelligence they use.',
    finalCta: 'Recruit your first AI Collaborator',
    finalSecondary: 'Discover your organization',
  },
} as const

const enter = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
})

export function ManifesteContent() {
  const { lang } = useLanguage()
  const t = COPY[lang]

  return (
    <main className="bg-[#F3EFE6] text-[#1C1A17]">
      {/* 1 — Hero manifeste */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden">
        <div className="mx-auto w-full max-w-5xl px-5 py-32 text-center sm:px-8">
          <motion.h1
            {...enter(0)}
            className="text-balance text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl"
          >
            {t.heroLine}{' '}
            <span className="text-[#D10E63]">{t.heroAccent}</span>
          </motion.h1>
          <motion.p
            {...enter(0.14)}
            className="mx-auto mt-8 max-w-2xl text-pretty text-xl font-medium text-[#4E483F] sm:text-2xl"
          >
            {t.heroQuestion}
          </motion.p>
          <motion.div {...enter(0.26)} className="mt-11">
            <a
              href="/decouvrir"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#D10E63] px-9 text-base font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2"
            >
              {t.heroCta}
              <ArrowRight className="h-5 w-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2 — Meet Emma */}
      <section className="border-t border-[#E1DACB] bg-[#FBF9F3] py-24 sm:py-28">
        <div className="mx-auto grid max-w-5xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[0.8fr_1fr]">
          <motion.div {...enter(0)} className="relative mx-auto w-full max-w-xs">
            <div className="premium-shadow overflow-hidden rounded-[2rem] border border-[#D8D0C2] bg-[#FBF9F3]">
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/emma-avatar.png"
                  alt={lang === 'fr' ? 'Emma, Collaborateur IA' : 'Emma, AI Collaborator'}
                  className="h-full w-full object-cover"
                />
                <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-[#FBF9F3]/90 px-3 py-1 text-[11px] font-semibold text-[#1C1A17] backdrop-blur">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22A06B] opacity-70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22A06B]" />
                  </span>
                  {t.emmaAvailable}
                </div>
              </div>
              <div className="flex items-center justify-between px-5 py-4">
                <div>
                  <p className="text-base font-bold text-[#1C1A17]">Emma</p>
                  <p className="text-xs text-[#D10E63]">{t.emmaRole}</p>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#9A9284]">Unitalk</span>
              </div>
            </div>
          </motion.div>

          <div>
            <motion.p
              {...enter(0.05)}
              className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D10E63]"
            >
              {t.emmaKicker}
            </motion.p>
            <motion.h2 {...enter(0.1)} className="text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
              {t.emmaTitle}
            </motion.h2>
            <div className="mt-7 space-y-1.5">
              {t.emmaWords.map((word, i) => (
                <motion.p key={word} {...enter(0.16 + i * 0.08)} className="text-2xl font-semibold text-[#4E483F] sm:text-3xl">
                  {word}
                </motion.p>
              ))}
            </div>
            <motion.div {...enter(0.48)} className="mt-8">
              <a
                href="/emma"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#D10E63] transition-colors hover:text-[#A50B4E]"
              >
                {t.emmaLink}
                <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3 — One identity, unlimited expertise */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <motion.h2 {...enter(0)} className="text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            {t.idTitle}
          </motion.h2>
          <motion.p {...enter(0.1)} className="mt-8 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9A9284]">
            {t.idLead}
          </motion.p>
          <div className="mt-6 flex flex-wrap justify-center gap-2.5">
            {t.idItems.map((item, i) => (
              <motion.span
                key={item}
                {...enter(0.14 + i * 0.06)}
                className="rounded-full border border-[#D8D0C2] bg-[#FBF9F3] px-5 py-2.5 text-base font-medium text-[#1C1A17]"
              >
                {item}
              </motion.span>
            ))}
          </div>
          <motion.p {...enter(0.5)} className="mt-10 text-lg font-medium text-[#4E483F]">
            {t.idFoot}
          </motion.p>
        </div>
      </section>

      {/* 4 — Ladder */}
      <section className="border-t border-[#E1DACB] bg-[#1C1A17] py-24 text-[#FBF9F3] sm:py-28">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <motion.h2 {...enter(0)} className="text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            {t.ladderTitle}
          </motion.h2>
          <div className="mx-auto mt-12 flex flex-col items-center gap-3">
            {t.ladder.map((step, i) => (
              <div key={step} className="flex flex-col items-center gap-3">
                <motion.div
                  {...enter(0.1 + i * 0.12)}
                  className={`inline-flex items-center rounded-full px-7 py-3.5 text-base font-bold ${
                    i === t.ladder.length - 1
                      ? 'bg-[#D10E63] text-[#FBF9F3]'
                      : 'border border-[#3A3730] bg-[#26231E] text-[#FBF9F3]'
                  }`}
                >
                  {step}
                </motion.div>
                {i < t.ladder.length - 1 && (
                  <motion.span {...enter(0.16 + i * 0.12)} className="text-[#6E665A]" aria-hidden="true">
                    <svg width="18" height="22" viewBox="0 0 18 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 2v18M3 14l6 6 6-6" />
                    </svg>
                  </motion.span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — Work anywhere */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <motion.h2 {...enter(0)} className="text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            {t.workTitle}
          </motion.h2>
          <motion.p {...enter(0.1)} className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-[#4E483F] sm:text-lg">
            {t.workBody}
          </motion.p>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {t.workModes.map((mode, i) => {
              const Icon = mode.icon
              return (
                <motion.div
                  key={mode.label}
                  {...enter(0.12 + i * 0.08)}
                  className="flex flex-col items-center gap-4 rounded-2xl border border-[#D8D0C2] bg-[#FBF9F3] px-6 py-10"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D10E63]/[0.08] text-[#D10E63]">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="text-lg font-bold text-[#1C1A17]">{mode.label}</span>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 6 — Ownership + 7 Final CTA */}
      <section className="border-t border-[#E1DACB] bg-[#FBF9F3] py-24 sm:py-28">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <motion.h2 {...enter(0)} className="text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            {t.ownTitle}
          </motion.h2>
          <motion.p {...enter(0.1)} className="mx-auto mt-5 max-w-xl text-pretty text-lg leading-relaxed text-[#4E483F]">
            {t.ownBody}
          </motion.p>
          <motion.div {...enter(0.22)} className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="/decouvrir"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#D10E63] px-9 text-base font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2"
            >
              {t.finalCta}
              <ArrowRight className="h-5 w-5" />
            </a>
            <a
              href="/decouvrir"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-[#D8D0C2] bg-[#F3EFE6] px-8 text-base font-semibold text-[#1C1A17] transition-colors hover:border-[#B9AF9C]"
            >
              {t.finalSecondary}
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
