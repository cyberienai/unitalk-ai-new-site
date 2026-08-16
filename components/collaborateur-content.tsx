'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Layers, Sparkles, Wrench, Plug, Brain } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import type { CollaboratorPage } from '@/lib/collaborator-pages'

const COPY = {
  fr: {
    kicker: (name: string) => `Rencontrez ${name}`,
    available: 'En poste',
    recruit: (name: string) => `Recruter ${name}`,
    seeProfile: 'Voir son profil',
    // Missions section
    missionsTitle: (name: string) => `Ce que ${name} prend en charge`,
    missionsLead:
      'Des missions concrètes, prêtes à confier. Choisissez-en une : Alma précise avec vous le résultat attendu.',
    missionCta: 'Confier cette mission',
    allMissions: 'Voir toutes les missions',
    // Savoir-faire section
    knowTitle: (name: string) => `Le savoir-faire de ${name}`,
    knowLead:
      'Un profil métier de départ, des compétences et des applications. Ce savoir-faire s’enrichit mission après mission, jamais figé.',
    profileLabel: 'Profil métier',
    skillsLabel: 'Compétences',
    appsLabel: 'Applications connectées',
    accrue:
      'Chaque mission accomplie ajoute une compétence, un accès ou une connaissance. Alma prépare ces ajouts ; vous validez.',
    // Team section
    teamTitle: 'D’un Collaborateur à une équipe',
    teamBody:
      'Commencez avec un Collaborateur. Ajoutez-en d’autres quand le besoin le justifie. Ensemble, ils forment votre force de travail IA.',
    ladder: ['Collaborateur IA', 'Équipe IA', 'Force de travail IA'],
    pairLabel: (name: string) => `${name} travaille en binôme avec`,
    teamCta: 'Construire mon entreprise',
  },
  en: {
    kicker: (name: string) => `Meet ${name}`,
    available: 'On the job',
    recruit: (name: string) => `Recruit ${name}`,
    seeProfile: 'See profile',
    missionsTitle: (name: string) => `What ${name} takes on`,
    missionsLead:
      'Concrete missions, ready to hand over. Pick one: Alma clarifies the expected outcome with you.',
    missionCta: 'Hand over this mission',
    allMissions: 'See all missions',
    knowTitle: (name: string) => `${name}’s know-how`,
    knowLead:
      'A starting job profile, skills and applications. This know-how grows mission after mission — never fixed.',
    profileLabel: 'Job profile',
    skillsLabel: 'Skills',
    appsLabel: 'Connected apps',
    accrue:
      'Every completed mission adds a skill, an access or a piece of knowledge. Alma prepares these additions; you approve them.',
    teamTitle: 'From one Collaborator to a team',
    teamBody:
      'Start with one Collaborator. Add more when the need justifies it. Together they form your AI workforce.',
    ladder: ['AI Collaborator', 'AI Team', 'AI Workforce'],
    pairLabel: (name: string) => `${name} pairs with`,
    teamCta: 'Build my organization',
  },
} as const

const enter = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
})

export function CollaborateurContent({ page }: { page: CollaboratorPage }) {
  const { lang } = useLanguage()
  const t = COPY[lang]
  const { detail, copy, missions } = page
  const { name, avatar, company } = detail

  // Role label handles Emma's inline form ("Assistante de <manager>").
  const roleLabel = detail.roleInline
    ? `${detail.role[lang]} ${detail.manager.name}`
    : detail.role[lang]

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
              {t.kicker(name)}
            </motion.p>
            <motion.h1
              {...enter(0.06)}
              className="text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
            >
              {copy.claim[lang]}
            </motion.h1>
            <motion.p {...enter(0.12)} className="mt-4 text-base font-semibold text-[#D10E63] sm:text-lg">
              {roleLabel} · {detail.department[lang]}
            </motion.p>
            <motion.p {...enter(0.18)} className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-[#4E483F] sm:text-lg">
              {copy.body[lang]}
            </motion.p>
            <motion.div {...enter(0.24)} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="/decouvrir"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#D10E63] px-7 text-sm font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2"
              >
                {t.recruit(name)}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={`/@${detail.slug}`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#D8D0C2] bg-[#FBF9F3] px-7 text-sm font-semibold text-[#1C1A17] transition-colors hover:border-[#B9AF9C]"
              >
                {t.seeProfile}
              </a>
            </motion.div>
          </div>

          {/* Portrait card */}
          <motion.div {...enter(0.2)} className="relative mx-auto w-full max-w-sm">
            <div className="premium-shadow overflow-hidden rounded-[2rem] border border-[#D8D0C2] bg-[#FBF9F3]">
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={avatar || '/placeholder.svg'}
                  alt={lang === 'fr' ? `${name}, Collaborateur IA` : `${name}, AI Collaborator`}
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
                  <p className="text-base font-bold text-[#1C1A17]">{name}</p>
                  <p className="text-xs text-[#D10E63]">{detail.department[lang]}</p>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#9A9284]">{company}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Missions — the specialization made tangible */}
      {missions.length > 0 && (
        <section className="border-t border-[#E1DACB] bg-[#FBF9F3] py-20 sm:py-24">
          <div className="mx-auto max-w-5xl px-5 sm:px-8">
            <div className="max-w-2xl">
              <motion.h2 {...enter(0)} className="text-balance text-3xl font-bold leading-tight sm:text-4xl">
                {t.missionsTitle(name)}
              </motion.h2>
              <motion.p {...enter(0.08)} className="mt-4 text-pretty text-base leading-relaxed text-[#4E483F] sm:text-lg">
                {t.missionsLead}
              </motion.p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {missions.map((m, i) => (
                <motion.a
                  key={m.slug}
                  {...enter(0.1 + i * 0.06)}
                  href={`/missions?q=${encodeURIComponent(m.objective[lang])}`}
                  className="group flex flex-col gap-3 rounded-2xl border border-[#D8D0C2] bg-[#F3EFE6] p-6 transition-colors hover:border-[#D10E63]/40"
                >
                  <h3 className="text-lg font-bold leading-snug text-[#1C1A17]">{m.title[lang]}</h3>
                  <p className="text-sm leading-relaxed text-[#4E483F]">{m.objective[lang]}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-[#AD0C53]">
                    {t.missionCta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </motion.a>
              ))}
            </div>
            <motion.div {...enter(0.2)} className="mt-8">
              <a
                href="/missions"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1C1A17] underline decoration-[#D8D0C2] underline-offset-4 transition-colors hover:decoration-[#D10E63]"
              >
                {t.allMissions}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </motion.div>
          </div>
        </section>
      )}

      {/* Savoir-faire — profile + skills + apps, with the accumulation narrative */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="max-w-2xl">
            <motion.h2 {...enter(0)} className="text-balance text-3xl font-bold leading-tight sm:text-4xl">
              {t.knowTitle(name)}
            </motion.h2>
            <motion.p {...enter(0.08)} className="mt-4 text-pretty text-base leading-relaxed text-[#4E483F] sm:text-lg">
              {t.knowLead}
            </motion.p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {/* Profil métier */}
            <motion.div {...enter(0.1)} className="rounded-2xl border border-[#D8D0C2] bg-[#FBF9F3] p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D10E63]/[0.08] text-[#D10E63]">
                <Sparkles className="h-5 w-5" />
              </span>
              <p className="mt-4 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9A9284]">
                {t.profileLabel}
              </p>
              <p className="mt-2 text-lg font-bold text-[#1C1A17]">{roleLabel}</p>
              <p className="mt-2 text-sm leading-relaxed text-[#4E483F]">{detail.description[lang]}</p>
            </motion.div>

            {/* Compétences */}
            <motion.div {...enter(0.16)} className="rounded-2xl border border-[#D8D0C2] bg-[#FBF9F3] p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D10E63]/[0.08] text-[#D10E63]">
                <Wrench className="h-5 w-5" />
              </span>
              <p className="mt-4 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9A9284]">
                {t.skillsLabel}
              </p>
              <ul className="mt-3 flex flex-col gap-2">
                {detail.skills.map((s) => (
                  <li key={s[lang]} className="flex items-start gap-2 text-sm leading-relaxed text-[#3B362F]">
                    <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D10E63]" />
                    {s[lang]}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Applications */}
            <motion.div {...enter(0.22)} className="rounded-2xl border border-[#D8D0C2] bg-[#FBF9F3] p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D10E63]/[0.08] text-[#D10E63]">
                <Plug className="h-5 w-5" />
              </span>
              <p className="mt-4 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9A9284]">
                {t.appsLabel}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {detail.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-[#D8D0C2] bg-[#F3EFE6] px-3 py-1.5 text-sm font-medium text-[#1C1A17]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            {...enter(0.28)}
            className="mt-6 flex items-start gap-3 rounded-2xl border border-dashed border-[#D8D0C2] bg-[#FBF9F3] p-5"
          >
            <Brain className="mt-0.5 h-5 w-5 shrink-0 text-[#D10E63]" />
            <p className="text-sm leading-relaxed text-[#4E483F]">{t.accrue}</p>
          </motion.div>
        </div>
      </section>

      {/* From one Collaborator to a team */}
      <section className="border-t border-[#E1DACB] bg-[#1C1A17] py-20 text-[#FBF9F3] sm:py-24">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <motion.h2 {...enter(0)} className="text-balance text-3xl font-bold leading-tight sm:text-4xl">
            {t.teamTitle}
          </motion.h2>
          <motion.p {...enter(0.08)} className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-[#C9C3B8] sm:text-lg">
            {t.teamBody}
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

          {/* Human pair bridge */}
          <motion.p {...enter(0.34)} className="mt-10 text-sm text-[#C9C3B8]">
            {t.pairLabel(name)}{' '}
            <a
              href={detail.managerHandle ? `/@${detail.managerHandle}` : '#'}
              className="font-semibold text-[#FBF9F3] underline decoration-[#4E483F] underline-offset-4 transition-colors hover:decoration-[#D10E63]"
            >
              {detail.manager.name}
            </a>{' '}
            · {detail.manager.role[lang]}
          </motion.p>

          <motion.div {...enter(0.4)} className="mt-8">
            <a
              href="/decouvrir"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#D10E63] px-8 text-sm font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1C1A17]"
            >
              {t.teamCta}
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
