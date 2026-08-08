'use client'

import { ArrowRight, Check, Sparkles, Wrench, Puzzle, AppWindow } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { getMission } from './types'
import { AlmaHead } from './context-column'
import { getStoreItemBySlug, APP_CATEGORY_LABELS } from '@/lib/store-catalog'

// Status of a building block Alma needs for the mission. Honest and explicit:
// some know-how already exists in the catalogue, some is adapted, some is
// created dynamically for this mission.
type Status = 'available' | 'adapt' | 'create'

const STATUS: Record<Status, { label: { fr: string; en: string }; className: string }> = {
  available: {
    label: { fr: 'Disponible', en: 'Available' },
    className: 'bg-[#2E9E5B]/12 text-[#1F7A45]',
  },
  adapt: {
    label: { fr: 'À adapter', en: 'To adapt' },
    className: 'bg-[#C98A00]/14 text-[#96690A]',
  },
  create: {
    label: { fr: 'À créer', en: 'To create' },
    className: 'bg-[#D10E63]/12 text-[#A80B50]',
  },
}

// Deterministic status per competence index — a realistic mix without pretending
// to know the exact catalogue coverage.
function skillStatus(i: number): Status {
  if (i === 0) return 'available'
  if (i === 1) return 'adapt'
  return 'create'
}

export function ScreenSavoirFaire({
  lang,
  missionSlug,
  onContinue,
}: {
  lang: Lang
  missionSlug: string
  onContinue: () => void
}) {
  const t = COPY[lang]
  const m = getMission(missionSlug)

  // Whether the job profile already exists in the catalogue.
  const profileExists = Boolean(getStoreItemBySlug(m.profile[lang].toLowerCase()))
  const profileStatus: Status = profileExists ? 'available' : 'adapt'

  // Application types the mission needs — resolved against the real catalogue.
  const apps = m.tools
    .map((slug) => getStoreItemBySlug(slug))
    .filter((x): x is NonNullable<typeof x> => Boolean(x))

  return (
    <div>
      <p className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-[#D10E63]">{t.kicker}</p>
      <h1 className="mt-3 text-balance font-sf text-[clamp(1.5rem,3vw,2.1rem)] font-semibold leading-tight tracking-[-0.03em] text-[#1C1A17]">
        {t.title}
      </h1>

      {/* Alma decomposes the mission */}
      <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-4">
        <AlmaHead className="h-9 w-9" />
        <p className="text-[15px] leading-relaxed text-[#3B362F]">
          {t.intro} <span className="font-semibold text-[#1C1A17]">{m.title[lang]}</span>.
        </p>
      </div>

      {/* Profil métier */}
      <Section icon={Wrench} title={t.profileTitle} note={t.profileNote}>
        <div className="flex items-center justify-between gap-3 rounded-xl border border-[#E4DDCE] bg-white/60 px-4 py-3">
          <div className="min-w-0">
            <p className="font-sf text-[15px] font-bold text-[#1C1A17]">{m.profile[lang]}</p>
            <p className="mt-0.5 truncate text-sm text-[#5A544A]">{m.result[lang]}</p>
          </div>
          <StatusBadge status={profileStatus} lang={lang} />
        </div>
      </Section>

      {/* Compétences */}
      <Section icon={Puzzle} title={t.skillsTitle} note={t.skillsNote}>
        <ul className="flex flex-col gap-2">
          {m.skills.map((s, i) => {
            const st = skillStatus(i)
            return (
              <li
                key={s[lang]}
                className="flex items-center justify-between gap-3 rounded-xl border border-[#E4DDCE] bg-white/60 px-4 py-2.5"
              >
                <span className="flex items-center gap-2.5 text-sm font-medium text-[#3B362F]">
                  <Check className="h-4 w-4 shrink-0 text-[#D10E63]" strokeWidth={2.5} />
                  {s[lang]}
                </span>
                <StatusBadge status={st} lang={lang} />
              </li>
            )
          })}
        </ul>
      </Section>

      {/* Applications requises */}
      <Section icon={AppWindow} title={t.appsTitle} note={t.appsNote}>
        {apps.length > 0 ? (
          <ul className="flex flex-wrap gap-2">
            {apps.map((a) => (
              <li
                key={a.slug}
                className="inline-flex items-center gap-2 rounded-full border border-[#E1D9C9] bg-white/60 px-3 py-1.5 text-sm text-[#3B362F]"
              >
                <span className="font-semibold text-[#1C1A17]">{a.name[lang]}</span>
                <span className="text-[11px] text-[#8A8175]">
                  · {APP_CATEGORY_LABELS[a.facet]?.[lang] ?? a.facet}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-[#5A544A]">{t.appsEmpty}</p>
        )}
      </Section>

      {/* Continue */}
      <button
        type="button"
        onClick={onContinue}
        className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#1C1A17] px-6 py-3.5 text-sm font-bold text-[#FBF9F3] transition-colors hover:bg-[#000]"
      >
        {t.continue}
        <ArrowRight className="h-4 w-4" />
      </button>

      <p className="mt-4 flex items-start gap-2 text-[13px] leading-relaxed text-[#8A8175]">
        <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#D10E63]" />
        {t.micro}
      </p>
    </div>
  )
}

function Section({
  icon: Icon,
  title,
  note,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  note: string
  children: React.ReactNode
}) {
  return (
    <section className="mt-6">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-[#8A8175]" />
        <h2 className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#5A544A]">{title}</h2>
      </div>
      <p className="mt-1 text-[13px] leading-relaxed text-[#8A8175]">{note}</p>
      <div className="mt-3">{children}</div>
    </section>
  )
}

function StatusBadge({ status, lang }: { status: Status; lang: Lang }) {
  const s = STATUS[status]
  return (
    <span
      className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.08em] ${s.className}`}
    >
      {s.label[lang]}
    </span>
  )
}

const COPY = {
  fr: {
    kicker: 'Étape 3 · Savoir-faire',
    title: 'Ce que la mission exige, décomposé par Alma.',
    intro: 'J’ai décomposé la mission',
    profileTitle: 'Profil métier',
    profileNote: 'Le rôle durable que la mission mobilise.',
    skillsTitle: 'Compétences',
    skillsNote: 'Les capacités précises à réunir. Certaines existent déjà, d’autres sont créées pour votre mission.',
    appsTitle: 'Applications requises',
    appsNote: 'Les types d’outils nécessaires. Vous en autoriserez les accès à l’étape suivante.',
    appsEmpty: 'Aucun outil externe n’est requis pour cette mission.',
    continue: 'Choisir qui prend la mission',
    micro: 'Un savoir-faire manquant est préparé dynamiquement : profil, compétence et instructions dédiées, sans développement de votre part.',
  },
  en: {
    kicker: 'Step 3 · Know-how',
    title: 'What the mission requires, broken down by Alma.',
    intro: 'I broke down the mission',
    profileTitle: 'Job profile',
    profileNote: 'The durable role the mission mobilizes.',
    skillsTitle: 'Skills',
    skillsNote: 'The precise capabilities to gather. Some already exist, others are created for your mission.',
    appsTitle: 'Required applications',
    appsNote: 'The types of tools needed. You will authorize their access in the next step.',
    appsEmpty: 'No external tool is required for this mission.',
    continue: 'Choose who takes the mission',
    micro: 'Missing know-how is prepared dynamically: a dedicated profile, skill and instructions, with no development on your side.',
  },
} as const
