'use client'

import type { Lang } from '@/lib/language-context'
import { VoiceConsole } from './voice-console'
import { getMission, type Entry } from './types'

export function ScreenActivate({
  lang,
  entry,
  missionSlug,
  onActivate,
}: {
  lang: Lang
  entry: Entry
  missionSlug: string
  onActivate: () => void
}) {
  const mission = getMission(missionSlug)
  const t = COPY[lang]
  const lead =
    entry === 'company'
      ? t.leadCompany
      : entry === 'mission'
        ? t.leadMission.replace('{mission}', mission.title[lang])
        : t.leadProfile.replace('{mission}', mission.title[lang])

  return (
    <div>
      <p className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-[#D10E63]">{t.kicker}</p>
      <h1 className="mt-4 text-balance font-sf text-[clamp(1.7rem,3.6vw,2.6rem)] font-semibold leading-tight tracking-[-0.03em] text-[#1C1A17]">
        {t.title}
      </h1>
      <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-[#4E483F]">{lead}</p>

      <div className="mt-8">
        <VoiceConsole lang={lang} entry={entry} missionSlug={missionSlug} onActivate={onActivate} />
      </div>
    </div>
  )
}

const COPY = {
  fr: {
    kicker: 'Activation',
    title: 'Parlez à Alma pour activer votre Collaborateur IA.',
    leadCompany:
      'Présentez votre activité de vive voix ou par écrit. Alma vous écoute, précise vos priorités et construit le contexte de votre Organisation.',
    leadMission:
      'Vous partez de la mission « {mission} ». Racontez-la à Alma : elle précise le résultat attendu et prépare le Collaborateur IA adapté.',
    leadProfile:
      'Vous partez d’un profil métier, pour commencer par « {mission} ». Décrivez votre besoin à Alma : elle affine le savoir-faire attendu.',
  },
  en: {
    kicker: 'Activation',
    title: 'Talk to Alma to activate your AI Collaborator.',
    leadCompany:
      'Introduce your business by voice or in writing. Alma listens, sharpens your priorities and builds your Organization context.',
    leadMission:
      'You start from the mission “{mission}”. Tell Alma about it: she clarifies the expected result and prepares the right AI Collaborator.',
    leadProfile:
      'You start from a job profile, beginning with “{mission}”. Describe your need to Alma: she refines the expected know-how.',
  },
} as const
