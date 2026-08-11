'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, Loader2, ShieldCheck } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { createOnboardingWorkspaceMission } from '@/lib/workspace-missions'
import type { CompanyFact, MissionInfo } from './types'

export function ScreenWorkspace({
  lang,
  name,
  profile,
  mission,
  company,
}: {
  lang: Lang
  name: string
  profile: { fr: string; en: string }
  mission: MissionInfo
  company: CompanyFact[]
}) {
  const t = COPY[lang]
  const reduce = useReducedMotion()
  const router = useRouter()
  const companyName = company.find((fact) => fact.key === 'name')?.value || ''
  const companyDomain = company.find((fact) => fact.key === 'domain')?.value || ''
  const displayName = capitalizeName(name) || t.fallbackName
  const initial = displayName.charAt(0).toUpperCase()
  const [phase, setPhase] = useState<'idle' | 'opening'>('idle')
  const opened = useRef(false)

  async function open() {
    if (phase === 'opening' || opened.current) return
    setPhase('opening')
    opened.current = true

    createOnboardingWorkspaceMission({
      title: mission.title,
      result: mission.result,
      rule: mission.rule,
      validation: mission.validation,
      profile,
      collaboratorName: displayName,
      domain: companyDomain || companyName,
      lang,
    })

    await new Promise((resolve) => setTimeout(resolve, 600))
    router.push('/workspace')
  }

  return (
    <div className="mx-auto w-full max-w-[620px] py-2 text-center">
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#D10E63]/45 bg-white font-sf text-3xl font-bold text-[#D10E63] shadow-sm"
      >
        {initial}
      </motion.div>

      <h1 className="mt-4 text-balance font-sf text-[clamp(1.8rem,4vw,2.5rem)] font-semibold leading-tight tracking-[-0.03em] text-[#1C1A17]">
        {displayName} {t.isReady}
      </h1>
      <p className="mx-auto mt-2 max-w-lg text-pretty text-[14px] leading-relaxed text-[#4E483F]">
        {t.subtitleBefore}{companyName ? ` ${companyName}` : ''}{t.subtitleAfter}
      </p>

      <div className="mt-5 overflow-hidden rounded-3xl border border-[#E3DACB] bg-white text-left shadow-[0_24px_55px_-42px_rgba(28,26,23,0.6)]">
        <div className="flex items-center gap-4 px-5 py-4 sm:px-6">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-[#D10E63]/40 bg-white font-sf text-xl font-bold text-[#D10E63]">
            {initial}
          </span>
          <div className="min-w-0">
            <p className="truncate font-sf text-[17px] font-bold text-[#1C1A17]">{displayName}</p>
            <p className="mt-0.5 text-[12px] text-[#6E665A]">{t.collaborator}</p>
            <p className="mt-0.5 text-[12px] font-semibold text-[#4E483F]">{t.profile} {profile[lang]}</p>
          </div>
        </div>

        <div className="border-t border-[#EEE7D9] bg-[#FBF9F3] px-5 py-4 sm:px-6">
          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[#6E665A]">{t.mission}</p>
          <p className="mt-1.5 font-sf text-[15px] font-semibold text-[#1C1A17]">{mission.title}</p>
          <p className="mt-3 flex items-start gap-2 text-[12px] leading-relaxed text-[#4E483F]">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#2E9E5B]" strokeWidth={3} />
            {mission.validation}
          </p>
        </div>
      </div>

      <p className="mx-auto mt-4 flex max-w-lg items-start justify-center gap-2 text-left text-[11px] leading-relaxed text-[#6E665A]">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#2E9E5B]" />
        {t.connNote}
      </p>

      <p className="mt-4 text-[12px] font-semibold text-[#4E483F]">{t.readyTogether}</p>
      <button
        type="button"
        onClick={open}
        disabled={phase === 'opening'}
        className="group mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-[#D10E63] px-7 py-3.5 text-[14px] font-bold text-white transition-colors hover:bg-[#E51872] disabled:cursor-wait disabled:opacity-80"
      >
        {phase === 'opening' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {t.opening}
          </>
        ) : (
          <>
            {t.start} {displayName}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </>
        )}
      </button>
    </div>
  )
}

function capitalizeName(value: string): string {
  const clean = value.trim().replace(/\s+/g, ' ')
  return clean ? clean.charAt(0).toUpperCase() + clean.slice(1) : ''
}

const COPY = {
  fr: {
    fallbackName: 'Votre Collaborateur',
    isReady: 'est prêt.',
    subtitleBefore: 'Il connaît le contexte de votre entreprise',
    subtitleAfter: ' et sa première mission l’attend dans Unitalk.',
    collaborator: 'Collaborateur IA',
    profile: 'Profil',
    mission: 'Mission',
    connNote: 'Les connexions aux applications seront demandées dans le Workspace, quand la mission en aura besoin.',
    readyTogether: 'Prêt à travailler ensemble ?',
    start: 'Commencer avec',
    opening: 'Ouverture du Workspace…',
  },
  en: {
    fallbackName: 'Your Collaborator',
    isReady: 'is ready.',
    subtitleBefore: 'They know the context of your company',
    subtitleAfter: ' and their first mission is waiting in Unitalk.',
    collaborator: 'AI Collaborator',
    profile: 'Profile',
    mission: 'Mission',
    connNote: 'App connections will be requested in the Workspace when the mission needs them.',
    readyTogether: 'Ready to work together?',
    start: 'Start with',
    opening: 'Opening the Workspace…',
  },
} as const
