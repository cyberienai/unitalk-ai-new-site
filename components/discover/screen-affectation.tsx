'use client'

import { ArrowRight, Check, Plus, UserCog, UserPlus } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { getMission, type Assignment } from './types'
import { getStoreItemBySlug } from '@/lib/store-catalog'
import { ROLE_DETAILS } from '@/lib/collaborators-catalog'

export function ScreenAffectation({
  lang,
  missionSlug,
  assignedSlug,
  assignment,
  onChoose,
  onContinue,
}: {
  lang: Lang
  missionSlug: string
  assignedSlug: string
  assignment: Assignment
  onChoose: (a: Assignment) => void
  onContinue: () => void
}) {
  const t = COPY[lang]
  const m = getMission(missionSlug)
  const persona = ROLE_DETAILS[assignedSlug]

  // What the existing Collaborateur already brings vs what the mission adds.
  const alreadyHas = persona ? persona.skills.slice(0, 3).map((s) => s[lang]) : []
  const missingSkills = m.skills.slice(0, 3).map((s) => s[lang])
  const missingApp = m.tools.map((slug) => getStoreItemBySlug(slug)).find(Boolean)

  // Reasons a distinct new Collaborateur IA can be justified.
  const newReasons =
    lang === 'fr'
      ? [
          'Une responsabilité durable différente',
          'Une identité et des moyens de communication propres',
          'Des droits ou des secrets à isoler',
          'Une charge de travail incompatible',
        ]
      : [
          'A different durable responsibility',
          'Its own identity and communication channels',
          'Rights or secrets to isolate',
          'An incompatible workload',
        ]

  return (
    <div>
      <p className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-[#D10E63]">{t.kicker}</p>
      <h1 className="mt-3 text-balance font-sf text-[clamp(1.5rem,3vw,2.1rem)] font-semibold leading-tight tracking-[-0.03em] text-[#1C1A17]">
        {t.title}
      </h1>
      <p className="mt-2.5 max-w-xl text-pretty text-[15px] leading-relaxed text-[#4E483F]">
        {persona ? t.examined.replace('{name}', persona.name) : t.examinedEmpty}
      </p>

      <div className="mt-6 flex flex-col gap-4">
        {/* Case A — evolve an existing Collaborateur IA */}
        {persona && (
          <OptionCard
            selected={assignment === 'existing'}
            onSelect={() => onChoose('existing')}
            icon={UserCog}
            badge={t.recommended}
            title={t.evolveTitle.replace('{name}', persona.name)}
          >
            <div className="mt-3 flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={persona.avatar || '/placeholder.svg'}
                alt={persona.name}
                className="h-11 w-11 rounded-full object-cover ring-2 ring-[#D10E63]/40"
              />
              <div>
                <p className="font-sf text-base font-bold text-[#1C1A17]">{persona.name}</p>
                <p className="text-sm text-[#5A544A]">{persona.role[lang]}</p>
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#1F7A45]">
                  {t.alreadyHas}
                </p>
                <ul className="mt-2 flex flex-col gap-1.5">
                  {alreadyHas.map((s) => (
                    <li key={s} className="flex items-center gap-2 text-sm text-[#3B362F]">
                      <Check className="h-4 w-4 shrink-0 text-[#2E9E5B]" strokeWidth={2.5} />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#A80B50]">
                  {t.toAdd}
                </p>
                <ul className="mt-2 flex flex-col gap-1.5">
                  {missingSkills.map((s) => (
                    <li key={s} className="flex items-center gap-2 text-sm text-[#3B362F]">
                      <Plus className="h-4 w-4 shrink-0 text-[#D10E63]" strokeWidth={2.5} />
                      {s}
                    </li>
                  ))}
                  {missingApp && (
                    <li className="flex items-center gap-2 text-sm text-[#3B362F]">
                      <Plus className="h-4 w-4 shrink-0 text-[#D10E63]" strokeWidth={2.5} />
                      {t.accessTo} {missingApp.name[lang]}
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </OptionCard>
        )}

        {/* Case B — put a new Collaborateur IA into service */}
        <OptionCard
          selected={assignment === 'new' || !persona}
          onSelect={() => onChoose('new')}
          icon={UserPlus}
          title={t.newTitle}
        >
          <p className="mt-2 text-sm leading-relaxed text-[#5A544A]">{t.newLead}</p>
          <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
            {newReasons.map((r) => (
              <li key={r} className="flex items-center gap-2 text-sm text-[#3B362F]">
                <Check className="h-4 w-4 shrink-0 text-[#8A8175]" strokeWidth={2.5} />
                {r}
              </li>
            ))}
          </ul>
        </OptionCard>
      </div>

      <button
        type="button"
        onClick={onContinue}
        className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#D10E63] px-6 py-3.5 text-sm font-bold text-[#FBF9F3] transition-colors hover:bg-[#E51872]"
      >
        {assignment === 'existing' && persona
          ? t.ctaEvolve.replace('{name}', persona.name)
          : t.ctaNew}
        <ArrowRight className="h-4 w-4" />
      </button>

      <p className="mt-4 text-[13px] leading-relaxed text-[#8A8175]">{t.micro}</p>
    </div>
  )
}

function OptionCard({
  selected,
  onSelect,
  icon: Icon,
  badge,
  title,
  children,
}: {
  selected: boolean
  onSelect: () => void
  icon: React.ComponentType<{ className?: string }>
  badge?: string
  title: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={[
        'w-full rounded-2xl border p-5 text-left transition-colors',
        selected
          ? 'border-[#D10E63] bg-[#FBF9F3] ring-1 ring-[#D10E63]'
          : 'border-[#E4DDCE] bg-[#FBF9F3]/70 hover:border-[#D10E63]/40',
      ].join(' ')}
    >
      <div className="flex items-center gap-2.5">
        <span
          className={[
            'flex h-8 w-8 items-center justify-center rounded-full',
            selected ? 'bg-[#D10E63] text-[#FBF9F3]' : 'bg-[#EBE4D6] text-[#8A8175]',
          ].join(' ')}
        >
          <Icon className="h-4 w-4" />
        </span>
        <p className="font-sf text-[15px] font-bold text-[#1C1A17]">{title}</p>
        {badge && (
          <span className="ml-auto rounded-full bg-[#D10E63]/12 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[#A80B50]">
            {badge}
          </span>
        )}
      </div>
      {children}
    </button>
  )
}

const COPY = {
  fr: {
    kicker: 'Affectation · 3 sur 5',
    title: 'Qui prend cette mission ?',
    examined:
      'J’ai examiné les Collaborateurs IA déjà présents dans votre entreprise. {name} correspond le mieux à ce savoir-faire.',
    examinedEmpty:
      'J’ai examiné votre entreprise : aucun Collaborateur IA existant ne porte ce rôle. Je recommande d’en mettre un nouveau en service.',
    recommended: 'Recommandé',
    evolveTitle: 'Faire évoluer {name}',
    alreadyHas: 'Possède déjà',
    toAdd: 'À ajouter',
    accessTo: 'Accès à',
    newTitle: 'Mettre en service un nouveau Collaborateur IA',
    newLead: 'Un rôle distinct se justifie quand aucun Collaborateur existant ne convient vraiment :',
    ctaEvolve: 'Faire évoluer {name} pour cette mission',
    ctaNew: 'Mettre en service un nouveau Collaborateur IA',
    micro: 'Alma propose, vous décidez. Aucun Collaborateur IA n’est créé automatiquement.',
  },
  en: {
    kicker: 'Assignment · 3 of 5',
    title: 'Who takes this mission?',
    examined:
      'I reviewed the AI Collaborators already in your company. {name} is the best fit for this know-how.',
    examinedEmpty:
      'I reviewed your company: no existing AI Collaborator holds this role. I recommend putting a new one into service.',
    recommended: 'Recommended',
    evolveTitle: 'Evolve {name}',
    alreadyHas: 'Already has',
    toAdd: 'To add',
    accessTo: 'Access to',
    newTitle: 'Put a new AI Collaborator into service',
    newLead: 'A distinct role is justified when no existing Collaborator truly fits:',
    ctaEvolve: 'Evolve {name} for this mission',
    ctaNew: 'Put a new AI Collaborator into service',
    micro: 'Alma proposes, you decide. No AI Collaborator is ever created automatically.',
  },
} as const
