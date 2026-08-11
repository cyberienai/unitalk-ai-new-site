'use client'

import { ArrowRight, Check, ShieldCheck, Sparkles, User } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { AlmaHead } from './context-column'
import type { CompanyFact, MissionInfo } from './types'

export function ScreenCollaborateur({
  lang,
  company,
  mission,
  profile,
  name,
  onName,
  onContinue,
}: {
  lang: Lang
  company: CompanyFact[]
  mission: MissionInfo
  profile: { fr: string; en: string }
  name: string
  onName: (name: string) => void
  onContinue: () => void
}) {
  const t = COPY[lang]
  const displayName = capitalizeName(name)
  const initial = displayName.charAt(0)
  const companyName = company.find((fact) => fact.key === 'name')?.value || t.companyFallback
  const activity = company.find((fact) => fact.key === 'activity')?.value || t.activityFallback

  return (
    <div className="grid overflow-hidden rounded-[2rem] border border-[#DED5C5] bg-[#FBF9F3] shadow-[0_30px_80px_-42px_rgba(28,26,23,0.5)] lg:min-h-[31rem] lg:grid-cols-[minmax(16rem,1fr)_minmax(0,2fr)]">
      <aside className="relative flex min-w-0 flex-col overflow-hidden bg-[#211E1A] px-6 py-7 text-white sm:px-8 lg:px-9">
        <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#D10E63]/15 blur-3xl" />
        <div className="relative flex h-full flex-col">
          <div className="flex items-center gap-3">
            <AlmaHead className="h-11 w-11 shrink-0 ring-1 ring-white/15" />
            <div>
              <p className="font-sf text-[15px] font-bold">Alma</p>
              <p className="mt-0.5 text-[12px] text-[#BDB5AC]">Unitalk</p>
            </div>
          </div>
          <p className="mt-8 text-pretty font-sf text-xl font-medium leading-relaxed text-[#F4EFE8]">“{t.alma}”</p>

          <div className="mt-8 border-t border-white/10 pt-5">
            <p className="font-sf text-[15px] font-bold text-white">{companyName}</p>
            <p className="mt-1.5 text-[12px] leading-relaxed text-[#BDB5AC]">{activity}</p>
          </div>

          <div className="mt-auto pt-7">
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold text-[#E9E2D9]">
              <Check className="h-3.5 w-3.5 text-[#E38AB4]" strokeWidth={3} />
              {t.previousStepsDone}
            </span>
          </div>
        </div>
      </aside>

      <section className="grid min-w-0 lg:grid-rows-[auto_1fr]">
        <div className="border-b border-[#EAE3D5] bg-white px-6 py-6 sm:px-9 lg:px-10">
          <p className="inline-flex items-center gap-1.5 rounded-full bg-[#D10E63]/10 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[#B00C54]">
            <Sparkles className="h-3 w-3" />
            {t.prepares}
          </p>

          <dl className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="sm:col-span-3">
              <dt className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[#6E665A]">{t.mission}</dt>
              <dd className="mt-1 font-sf text-[15px] font-bold leading-snug text-[#1C1A17]">{mission.title}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[#6E665A]">{t.profile}</dt>
              <dd className="mt-1.5 flex flex-wrap items-center gap-2 text-[13px] font-semibold text-[#1C1A17]">
                <Check className="h-4 w-4 shrink-0 text-[#D10E63]" strokeWidth={2.5} />
                {profile[lang]}
                <span className="rounded-full bg-[#F1ECE3] px-2 py-1 text-[10px] font-semibold text-[#4E483F]">{t.suggested}</span>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[#6E665A]">{t.validation}</dt>
              <dd className="mt-1.5 flex items-center gap-1.5 text-[12px] leading-relaxed text-[#3B362F]">
                <ShieldCheck className="h-4 w-4 shrink-0 text-[#2E9E5B]" strokeWidth={2.5} />
                {mission.validation}
              </dd>
            </div>
          </dl>
        </div>

        <div className="px-6 py-6 sm:px-9 lg:px-10">
          <div className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 font-sf text-2xl font-bold transition-colors ${
                displayName
                  ? 'border-[#D10E63]/45 bg-white text-[#D10E63]'
                  : 'border-[#DED5C5] bg-[#F1ECE3] text-[#8A8175]'
              }`}
            >
              {displayName ? initial : <User className="h-7 w-7" strokeWidth={1.75} />}
            </span>
            <div className="min-w-0">
              <p className="truncate font-sf text-[17px] font-bold text-[#1C1A17]">{displayName || t.placeholderIdentity}</p>
              <p className="mt-0.5 text-[12px] text-[#6E665A]">{t.profileTag} {profile[lang]}</p>
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="collab-name" className="block text-[13px] font-semibold text-[#1C1A17]">{t.nameQuestion}</label>
            <input
              id="collab-name"
              type="text"
              autoComplete="off"
              value={name}
              onChange={(event) => onName(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && displayName && !event.nativeEvent.isComposing) onContinue()
              }}
              placeholder={t.namePlaceholder}
              className="mt-2 h-12 w-full rounded-xl border border-[#D8D0C2] bg-white px-4 text-[15px] font-medium text-[#1C1A17] outline-none transition-colors placeholder:font-normal placeholder:text-[#8A8175] focus:border-[#D10E63]/60 focus:ring-4 focus:ring-[#D10E63]/10"
            />
            <p className="mt-2 text-[11px] leading-relaxed text-[#6E665A]">{t.nameHint}</p>
          </div>

          <div className="mt-5 flex justify-end">
            <button
              type="button"
              onClick={onContinue}
              disabled={!displayName}
              className="group inline-flex min-w-64 items-center justify-center gap-2 rounded-xl bg-[#D10E63] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#E51872] disabled:cursor-not-allowed disabled:bg-[#D8D0C2] disabled:text-[#6E665A]"
            >
              {displayName ? `${t.create} ${displayName}` : t.createEmpty}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-enabled:group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

function capitalizeName(value: string): string {
  const clean = value.trim().replace(/\s+/g, ' ')
  return clean ? clean.charAt(0).toUpperCase() + clean.slice(1) : ''
}

const COPY = {
  fr: {
    alma: 'Donnez-lui un prénom.',
    companyFallback: 'Votre entreprise',
    activityFallback: 'Activité à préciser',
    previousStepsDone: 'Étapes 1 et 2 validées',
    prepares: 'Préparation en cours',
    mission: 'Mission',
    profile: 'Profil métier recommandé',
    suggested: 'Suggéré par la mission',
    validation: 'Validation humaine',
    profileTag: 'Profil',
    placeholderIdentity: 'Votre Collaborateur IA',
    nameQuestion: 'Comment souhaitez-vous l’appeler ?',
    namePlaceholder: 'Ex. Lucas',
    nameHint: 'Un prénom rend la collaboration plus naturelle au quotidien.',
    create: 'Créer',
    createEmpty: 'Choisissez un prénom pour continuer',
  },
  en: {
    alma: 'Give them a first name.',
    companyFallback: 'Your company',
    activityFallback: 'Activity to be specified',
    previousStepsDone: 'Steps 1 and 2 complete',
    prepares: 'Preparing',
    mission: 'Mission',
    profile: 'Recommended job profile',
    suggested: 'Suggested by the mission',
    validation: 'Human approval',
    profileTag: 'Profile',
    placeholderIdentity: 'Your AI Collaborator',
    nameQuestion: 'What would you like to call them?',
    namePlaceholder: 'e.g. Lucas',
    nameHint: 'A first name makes day-to-day collaboration feel more natural.',
    create: 'Create',
    createEmpty: 'Choose a first name to continue',
  },
} as const
