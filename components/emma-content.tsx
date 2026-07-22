'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Brain, Layers, Wrench, BookOpen, Plug, Sparkles } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

const COPY = {
  fr: {
    // Hero
    kicker: 'Rencontrez Emma',
    heroTitle: 'Votre premier Collaborateur IA.',
    heroClaim: 'Une identité. Une expertise sans limite.',
    heroBody:
      'Emma est votre Collaborateur IA, avec sa propre identité, sa mémoire, ses compétences et ses outils. Elle travaille avec vous, apprend votre contexte et grandit avec votre organisation.',
    heroCta: 'Recruter Emma',
    heroSecondary: 'Voir son profil',
    available: 'Disponible',
    role: 'Assistante de direction',
    // Section 2
    s2Title: 'Le monde recrute des Collaborateurs IA.',
    s2Body: 'Une nouvelle génération d’organisations émerge. Des humains et des Collaborateurs IA qui travaillent ensemble.',
    departments: ['Marketing', 'Ventes', 'Opérations', 'Finance', 'Support', 'Développement'],
    // Section 3
    s3Title: 'Un Collaborateur. Une expertise sans limite.',
    s3Lead: 'Créez une identité. Étendez-la avec une infinité de profils.',
    s3Sub: 'Chaque profil possède les siens :',
    attributes: [
      { icon: Sparkles, label: 'Son expertise' },
      { icon: Wrench, label: 'Ses compétences' },
      { icon: Brain, label: 'Sa mémoire' },
      { icon: BookOpen, label: 'Ses connaissances' },
      { icon: Plug, label: 'Ses applications connectées' },
    ],
    // Section 4
    s4Title: 'Construisez votre Force de travail IA.',
    s4Body: 'Commencez avec un Collaborateur. Passez à une équipe. Grandissez en une Force de travail IA.',
    ladder: ['Collaborateur IA', 'Équipe IA', 'Force de travail IA'],
    s4Cta: 'Construire ma Force de travail IA',
  },
  en: {
    kicker: 'Meet Emma',
    heroTitle: 'Your first AI Collaborator.',
    heroClaim: 'One identity. Unlimited expertise.',
    heroBody:
      'Emma is your AI Collaborator with her own identity, memory, skills and tools. She works with you, learns your context and grows with your organization.',
    heroCta: 'Recruit Emma',
    heroSecondary: 'See her profile',
    available: 'Available',
    role: 'Executive Assistant',
    s2Title: 'The world is hiring AI Collaborators.',
    s2Body: 'A new generation of organizations is emerging. Humans and AI Collaborators working together.',
    departments: ['Marketing', 'Sales', 'Operations', 'Finance', 'Support', 'Development'],
    s3Title: 'One Collaborator. Unlimited expertise.',
    s3Lead: 'Create one identity. Expand with unlimited profiles.',
    s3Sub: 'Each profile has its own:',
    attributes: [
      { icon: Sparkles, label: 'Expertise' },
      { icon: Wrench, label: 'Skills' },
      { icon: Brain, label: 'Memory' },
      { icon: BookOpen, label: 'Knowledge' },
      { icon: Plug, label: 'Connected apps' },
    ],
    s4Title: 'Build your AI Workforce.',
    s4Body: 'Start with one Collaborator. Scale to a team. Grow into an AI Workforce.',
    ladder: ['AI Collaborator', 'AI Team', 'AI Workforce'],
    s4Cta: 'Build your AI Workforce',
  },
} as const

const enter = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
})

export function EmmaContent() {
  const { lang } = useLanguage()
  const t = COPY[lang]

  return (
    <main className="bg-[#F3EFE6] text-[#1C1A17]">
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-20 sm:pt-32 sm:pb-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          <div>
            <motion.p
              {...enter(0)}
              className="mb-5 font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D10E63]"
            >
              {t.kicker}
            </motion.p>
            <motion.h1
              {...enter(0.06)}
              className="text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
            >
              {t.heroTitle}
            </motion.h1>
            <motion.p {...enter(0.12)} className="mt-4 text-xl font-semibold text-[#D10E63] sm:text-2xl">
              {t.heroClaim}
            </motion.p>
            <motion.p {...enter(0.18)} className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-[#4E483F] sm:text-lg">
              {t.heroBody}
            </motion.p>
            <motion.div {...enter(0.24)} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="/signup"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#D10E63] px-7 text-sm font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2"
              >
                {t.heroCta}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/team/emma"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#D8D0C2] bg-[#FBF9F3] px-7 text-sm font-semibold text-[#1C1A17] transition-colors hover:border-[#B9AF9C]"
              >
                {t.heroSecondary}
              </a>
            </motion.div>
          </div>

          {/* Emma portrait card */}
          <motion.div {...enter(0.2)} className="relative mx-auto w-full max-w-sm">
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
                  {t.available}
                </div>
              </div>
              <div className="flex items-center justify-between px-5 py-4">
                <div>
                  <p className="text-base font-bold text-[#1C1A17]">Emma</p>
                  <p className="text-xs text-[#D10E63]">{t.role}</p>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#9A9284]">Unitalk</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 2 — The world is hiring */}
      <section className="border-t border-[#E1DACB] bg-[#FBF9F3] py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <motion.h2 {...enter(0)} className="text-balance text-3xl font-bold leading-tight sm:text-4xl">
            {t.s2Title}
          </motion.h2>
          <motion.p {...enter(0.08)} className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-[#4E483F] sm:text-lg">
            {t.s2Body}
          </motion.p>
          <div className="mx-auto mt-10 flex max-w-2xl flex-wrap justify-center gap-2.5">
            {t.departments.map((dep, i) => (
              <motion.span
                key={dep}
                {...enter(0.1 + i * 0.05)}
                className="rounded-full border border-[#D8D0C2] bg-[#F3EFE6] px-4 py-2 text-sm font-medium text-[#1C1A17]"
              >
                {dep}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — One Collaborator, unlimited expertise */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="text-center">
            <motion.h2 {...enter(0)} className="text-balance text-3xl font-bold leading-tight sm:text-4xl">
              {t.s3Title}
            </motion.h2>
            <motion.p {...enter(0.08)} className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-[#4E483F] sm:text-lg">
              {t.s3Lead}
            </motion.p>
            <motion.p {...enter(0.12)} className="mt-6 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9A9284]">
              {t.s3Sub}
            </motion.p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {t.attributes.map((attr, i) => {
              const Icon = attr.icon
              return (
                <motion.div
                  key={attr.label}
                  {...enter(0.1 + i * 0.06)}
                  className="flex flex-col items-center gap-3 rounded-2xl border border-[#D8D0C2] bg-[#FBF9F3] px-4 py-6 text-center"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D10E63]/[0.08] text-[#D10E63]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-semibold text-[#1C1A17]">{attr.label}</span>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Section 4 — Build your AI Workforce */}
      <section className="border-t border-[#E1DACB] bg-[#1C1A17] py-20 text-[#FBF9F3] sm:py-24">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <motion.h2 {...enter(0)} className="text-balance text-3xl font-bold leading-tight sm:text-4xl">
            {t.s4Title}
          </motion.h2>
          <motion.p {...enter(0.08)} className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-[#C9C3B8] sm:text-lg">
            {t.s4Body}
          </motion.p>
          <div className="mx-auto mt-10 flex flex-col items-center gap-3">
            {t.ladder.map((step, i) => (
              <div key={step} className="flex flex-col items-center gap-3">
                <motion.div
                  {...enter(0.1 + i * 0.1)}
                  className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold ${
                    i === t.ladder.length - 1
                      ? 'bg-[#D10E63] text-[#FBF9F3]'
                      : 'border border-[#3A3730] bg-[#26231E] text-[#FBF9F3]'
                  }`}
                >
                  {i === t.ladder.length - 1 && <Layers className="h-4 w-4" />}
                  {step}
                </motion.div>
                {i < t.ladder.length - 1 && (
                  <motion.span {...enter(0.14 + i * 0.1)} className="text-[#6E665A]" aria-hidden="true">
                    <svg width="18" height="22" viewBox="0 0 18 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 2v18M3 14l6 6 6-6" />
                    </svg>
                  </motion.span>
                )}
              </div>
            ))}
          </div>
          <motion.div {...enter(0.4)} className="mt-12">
            <a
              href="/decouvrir"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#D10E63] px-8 text-sm font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1C1A17]"
            >
              {t.s4Cta}
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
