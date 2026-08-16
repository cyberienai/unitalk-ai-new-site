'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Check } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { UnitalkLogo } from '@/components/unitalk-logo'
import { AlmaHead } from './context-column'
import type { MissionInfo } from './types'

export function ScreenCollaborateur({
  lang,
  mission,
  profile,
  name,
  onName,
  onCreated,
}: {
  lang: Lang
  mission: MissionInfo
  profile: { fr: string; en: string }
  name: string
  onName: (name: string) => void
  onCreated: (name: string) => void
}) {
  const t = COPY[lang]
  const router = useRouter()
  const [opening, setOpening] = useState(false)
  const displayName = capitalizeName(name)
  const initial = displayName.charAt(0)

  function createCollaborator() {
    if (!displayName || opening) return
    setOpening(true)
    void profile
    onCreated(displayName)
    router.push('/workspace')
  }

  return (
    <div className="grid overflow-hidden rounded-[2rem] border border-[#DED5C5] bg-[#FBF9F3] shadow-[0_30px_80px_-42px_rgba(28,26,23,0.5)] lg:grid-cols-[minmax(16rem,1fr)_minmax(0,2fr)]">
      <aside className="relative flex min-w-0 flex-col overflow-hidden bg-[#211E1A] px-6 py-6 text-white sm:px-8 lg:px-9">
        <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#D10E63]/15 blur-3xl" />
        <div className="relative flex h-full flex-col">
          <div className="flex items-center gap-3">
            <AlmaHead className="h-11 w-11 shrink-0 ring-1 ring-white/15" />
            <div>
              <p className="font-sf text-[15px] font-bold">Alma</p>
              <p className="mt-0.5 text-[12px] text-[#BDB5AC]">{t.almaRole}</p>
            </div>
          </div>

          <p className="mt-8 text-pretty font-sf text-xl font-medium leading-relaxed text-[#F4EFE8]">“{t.alma}”</p>

          <div className="mt-8 border-t border-white/10 pt-5">
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#E38AB4]">{t.mission}</p>
            <p className="mt-2 line-clamp-3 font-sf text-[16px] font-semibold leading-relaxed text-white">{mission.title}</p>
          </div>

          <div className="mt-auto pt-7">
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold text-[#E9E2D9]">
              <Check className="h-3.5 w-3.5 text-[#E38AB4]" strokeWidth={3} />
              {t.previousStepsDone}
            </span>
          </div>
        </div>
      </aside>

      <section className="flex min-w-0 items-center justify-center px-6 py-6 sm:px-9 lg:px-10">
        <div className="w-full max-w-md">
          <div className="flex justify-center">
            <span
              aria-hidden="true"
              className={`flex h-16 w-16 items-center justify-center rounded-full border-2 font-sf text-2xl font-bold transition-colors ${
                displayName
                  ? 'border-[#D10E63]/55 bg-white text-[#D10E63]'
                  : 'border-[#D8D0C2] bg-[#F3EFE6] text-[#9B9285]'
              }`}
            >
              {initial || <UnitalkLogo size={24} />}
            </span>
          </div>

          <label htmlFor="collab-name" className="mt-4 block text-[13px] font-semibold text-[#1C1A17]">
            {t.firstName}
          </label>
          <input
            id="collab-name"
            autoFocus
            type="text"
            autoComplete="off"
            value={name}
            onChange={(event) => onName(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && displayName && !event.nativeEvent.isComposing) createCollaborator()
            }}
            placeholder={t.namePlaceholder}
            className="mt-3 h-12 w-full rounded-xl border border-[#D8D0C2] bg-white px-4 text-[15px] font-medium text-[#1C1A17] outline-none transition-colors placeholder:font-normal placeholder:text-[#8A8175] focus:border-[#D10E63]/60 focus:ring-4 focus:ring-[#D10E63]/10"
          />
          <p className="mt-2 text-[12px] leading-relaxed text-[#6E665A]">{t.nameHint}</p>

          <button
            type="button"
            onClick={createCollaborator}
            disabled={!displayName || opening}
            className="group mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#D10E63] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#E51872] disabled:cursor-not-allowed disabled:bg-[#E5DED1] disabled:text-[#655E54] disabled:shadow-none"
          >
            {opening ? t.opening : displayName ? `${t.create} ${displayName}` : t.createEmpty}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-enabled:group-hover:translate-x-0.5" />
          </button>
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
    almaRole: 'Conseillère IA · Unitalk',
    mission: 'Mission',
    previousStepsDone: 'Entreprise confirmée · Mission conservée',
    firstName: 'Prénom',
    namePlaceholder: 'Ex. Lucas',
    nameHint: 'Un prénom rend la collaboration plus naturelle au quotidien.',
    create: 'Créer',
    createEmpty: 'Choisissez un prénom pour continuer',
    opening: 'Ouverture du Workspace…',
  },
  en: {
    alma: 'Give them a first name.',
    almaRole: 'AI advisor · Unitalk',
    mission: 'Mission',
    previousStepsDone: 'Company confirmed · Mission saved',
    firstName: 'First name',
    namePlaceholder: 'e.g. Lucas',
    nameHint: 'A first name makes day-to-day collaboration feel more natural.',
    create: 'Create',
    createEmpty: 'Choose a first name to continue',
    opening: 'Opening the Workspace…',
  },
} as const
