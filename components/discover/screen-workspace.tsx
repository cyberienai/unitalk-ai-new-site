'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, Loader2, ShieldCheck } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import type { CompanyFact, MissionInfo } from './types'

// Step 4 — Workspace. A very clean closing screen. The chosen first name leads
// the dynamic title and the primary CTA. A short recap only — Collaborator, job
// profile, first mission, human approval. App connections are NOT part of the
// onboarding: they are requested inside the Workspace, only when a mission needs
// them.
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

  const companyName = company.find((f) => f.key === 'name')?.value || ''
  const displayName = name.trim() || t.fallbackName

  const [phase, setPhase] = useState<'idle' | 'opening'>('idle')
  const opened = useRef(false)

  async function open() {
    if (phase === 'opening' || opened.current) return
    setPhase('opening')
    // A brief, honest beat before opening the Workspace with the kept context.
    await new Promise((r) => setTimeout(r, 600))
    opened.current = true
    const params = new URLSearchParams({
      collaborateur: name.trim(),
      profil: profile[lang],
      mission: mission.title,
    })
    router.push(`/workspace?${params.toString()}`)
  }

  const recap = [
    { label: t.rCollab, value: displayName, accent: true },
    { label: t.rProfile, value: profile[lang] },
    { label: t.rMission, value: mission.title },
    { label: t.rValidation, value: mission.validation },
  ]

  return (
    <div className="mx-auto w-full max-w-[560px] py-6 text-center">
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#2E9E5B]/12"
      >
        <Check className="h-7 w-7 text-[#2E9E5B]" strokeWidth={2.5} />
      </motion.div>

      <h1 className="mt-6 text-balance font-sf text-[clamp(1.8rem,4vw,2.6rem)] font-semibold leading-tight tracking-[-0.03em] text-[#1C1A17]">
        {displayName} {t.isReady}
      </h1>
      <p className="mt-3 text-pretty text-[15px] leading-relaxed text-[#4E483F]">
        {t.subtitleBefore}
        {companyName ? ` ${companyName}` : ''}
        {t.subtitleAfter}
      </p>

      {/* Short recap */}
      <dl className="mt-8 overflow-hidden rounded-3xl border border-[#EAE3D5] bg-white text-left shadow-[0_1px_0_rgba(255,255,255,0.7)_inset,0_28px_50px_-34px_rgba(28,26,23,0.4)]">
        {recap.map((r, i) => (
          <div
            key={r.label}
            className={`flex items-start gap-4 px-5 py-4 ${i > 0 ? 'border-t border-[#EFE8DA]' : ''}`}
          >
            <dt className="w-32 shrink-0 pt-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#8A8175]">
              {r.label}
            </dt>
            <dd
              className={`min-w-0 flex-1 text-[14px] leading-relaxed ${
                r.accent ? 'font-sf text-[15px] font-bold text-[#A80B50]' : 'font-medium text-[#1C1A17]'
              }`}
            >
              {r.value}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-4 inline-flex items-center gap-1.5 text-[12px] leading-relaxed text-[#8A8175]">
        <ShieldCheck className="h-3.5 w-3.5 text-[#2E9E5B]" />
        {t.connNote}
      </p>

      <div className="mt-7">
        <button
          type="button"
          onClick={open}
          disabled={phase === 'opening'}
          className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#D10E63] px-7 py-4 text-[15px] font-bold text-[#FBF9F3] transition-colors hover:bg-[#E51872] disabled:cursor-wait disabled:opacity-80"
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
    </div>
  )
}

const COPY = {
  fr: {
    fallbackName: 'Votre Collaborateur',
    isReady: 'est prêt.',
    subtitleBefore: 'Il connaît le contexte de votre entreprise',
    subtitleAfter: ' et sa première mission l’attend dans Unitalk.',
    rCollab: 'Collaborateur IA',
    rProfile: 'Profil métier',
    rMission: 'Première mission',
    rValidation: 'Validation humaine',
    connNote: 'Les connexions aux applications seront demandées dans le Workspace, quand la mission en aura besoin.',
    start: 'Commencer avec',
    opening: 'Ouverture du Workspace…',
  },
  en: {
    fallbackName: 'Your Collaborator',
    isReady: 'is ready.',
    subtitleBefore: 'It knows your company context',
    subtitleAfter: ' and its first mission is waiting in Unitalk.',
    rCollab: 'AI Collaborator',
    rProfile: 'Job profile',
    rMission: 'First mission',
    rValidation: 'Human approval',
    connNote: 'App connections will be requested in the Workspace, when the mission needs them.',
    start: 'Start with',
    opening: 'Opening the Workspace…',
  },
} as const
