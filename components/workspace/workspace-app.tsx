'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowRight, Check, Lock, Plus, Sparkles, Clock, Play, ShieldCheck } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { ROLE_DETAILS } from '@/lib/collaborators-catalog'
import {
  activateWorkspaceMission,
  type WorkspaceMission,
} from '@/lib/workspace-missions'

export function WorkspaceApp({ missions }: { missions: WorkspaceMission[] }) {
  const { lang } = useLanguage()
  const t = COPY[lang]
  const router = useRouter()
  const searchParams = useSearchParams()

  const requestedId = searchParams.get('mission')
  const selected = useMemo(() => {
    return missions.find((m) => m.id === requestedId) ?? missions[0]
  }, [missions, requestedId])

  function select(id: string) {
    router.push(`/workspace?mission=${id}`)
  }

  if (!selected) return null

  return (
    <main className="min-h-screen bg-[#F3EFE6] text-[#1C1A17]">
      <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#D10E63]">
              <Sparkles className="h-3.5 w-3.5" />
              {t.kicker}
            </p>
            <h1 className="mt-3 text-balance font-sf text-[clamp(1.7rem,3.4vw,2.4rem)] font-semibold leading-tight tracking-[-0.03em]">
              {t.title}
            </h1>
          </div>
          <Link
            href="/missions"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#D8D0C2] bg-[#FBF9F3] px-4 py-2.5 text-sm font-semibold text-[#3B362F] transition-colors hover:border-[#D10E63]/40"
          >
            <Plus className="h-4 w-4" />
            {t.newMission}
          </Link>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-10">
          {/* Left rail — mission list */}
          <aside className="lg:pt-1">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A8175]">
              {t.yourMissions} · {missions.length}
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {missions.map((m) => {
                const collab = ROLE_DETAILS[m.collaboratorSlug]
                const isActive = m.id === selected.id
                return (
                  <li key={m.id}>
                    <button
                      type="button"
                      onClick={() => select(m.id)}
                      className={`flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition-colors ${
                        isActive
                          ? 'border-[#D10E63]/40 bg-[#FCEBF2]'
                          : 'border-[#E4DDCE] bg-[#FBF9F3] hover:border-[#D10E63]/25'
                      }`}
                    >
                      {collab && (
                        <Image
                          src={collab.avatar || '/placeholder.svg'}
                          alt=""
                          width={36}
                          height={36}
                          className="h-9 w-9 shrink-0 rounded-full object-cover"
                        />
                      )}
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-sf text-sm font-bold text-[#1C1A17]">
                          {m.title[lang]}
                        </span>
                        <span className="block truncate text-xs text-[#8A8175]">
                          {collab ? collab.name : m.profile[lang]}
                        </span>
                      </span>
                      <StatusDot status={m.status} />
                    </button>
                  </li>
                )
              })}
            </ul>
          </aside>

          {/* Main — selected mission detail */}
          <MissionDetail key={selected.id} mission={selected} lang={lang} t={t} />
        </div>
      </div>
    </main>
  )
}

function MissionDetail({
  mission,
  lang,
  t,
}: {
  mission: WorkspaceMission
  lang: 'fr' | 'en'
  t: Copy
}) {
  const collab = ROLE_DETAILS[mission.collaboratorSlug]
  const [status, setStatus] = useState(mission.status)
  const [justLaunched, setJustLaunched] = useState(false)

  function launch() {
    const next = activateWorkspaceMission(mission.id)
    if (next) {
      setStatus(next.status)
      setJustLaunched(true)
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="min-w-0"
    >
      {/* Title + status */}
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="font-sf text-2xl font-semibold tracking-[-0.02em]">{mission.title[lang]}</h2>
        <StatusBadge status={status} t={t} />
      </div>
      <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-[#8A8175]">
        <Clock className="h-3.5 w-3.5" />
        {mission.rythme[lang]}
        {mission.domain ? ` · ${mission.domain}` : ''}
      </p>

      {/* Responsable */}
      {collab && (
        <div className="mt-6 flex items-center gap-4 rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-5">
          <Image
            src={collab.avatar || '/placeholder.svg'}
            alt={collab.name}
            width={56}
            height={56}
            className="h-14 w-14 shrink-0 rounded-full object-cover"
          />
          <div className="min-w-0">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#8A8175]">
              {t.responsible}
            </p>
            <p className="mt-1 font-sf text-base font-bold text-[#1C1A17]">
              {collab.name} <span className="font-normal text-[#A80B50]">· {collab.role[lang]}</span>
            </p>
            <p className="text-sm text-[#6B6560]">
              {t.pairedWith} {collab.manager.name} · {collab.manager.role[lang]}
            </p>
          </div>
        </div>
      )}

      {/* Objectif */}
      <div className="mt-4 rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-5">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#8A8175]">{t.objective}</p>
        <p className="mt-2 text-[15px] font-semibold leading-relaxed text-[#1C1A17]">{mission.objective[lang]}</p>
      </div>

      {/* Governance */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-5">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#2E9E5B]">{t.frame}</p>
          {mission.cadre.length > 0 ? (
            <ul className="mt-3 flex flex-col gap-2">
              {mission.cadre.map((c) => (
                <li key={c[lang]} className="flex items-center gap-2 text-sm text-[#3B362F]">
                  <Check className="h-4 w-4 shrink-0 text-[#2E9E5B]" strokeWidth={2.5} />
                  {c[lang]}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-[#8A8175]">{t.frameEmpty}</p>
          )}
        </div>
        <div className="rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-5">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#A80B50]">{t.validations}</p>
          {mission.validations.length > 0 ? (
            <ul className="mt-3 flex flex-col gap-2">
              {mission.validations.map((v) => (
                <li key={v[lang]} className="flex items-center gap-2 text-sm text-[#3B362F]">
                  <Lock className="h-3.5 w-3.5 shrink-0 text-[#D10E63]" strokeWidth={2.5} />
                  {v[lang]}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-[#8A8175]">{t.validationsEmpty}</p>
          )}
        </div>
      </div>

      {/* Tools */}
      {mission.tools.length > 0 && (
        <div className="mt-4 rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-5">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#8A8175]">{t.tools}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {mission.tools.map((tool) => (
              <span
                key={tool}
                className="inline-flex items-center rounded-full border border-[#E4DDCE] bg-white/60 px-3 py-1 text-xs font-semibold text-[#3B362F]"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* First action */}
      <div className="mt-4 rounded-2xl border border-[#D10E63]/25 bg-[#FCEBF2] p-5">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#A80B50]">{t.firstStep}</p>
        <p className="mt-2 text-[15px] font-semibold leading-relaxed text-[#1C1A17]">{mission.firstStep[lang]}</p>

        {justLaunched ? (
          <p className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#EAF6EE] px-4 py-3 text-sm font-semibold text-[#227A47]">
            <ShieldCheck className="h-4 w-4" />
            {t.launched}
          </p>
        ) : status === 'active' ? (
          <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#227A47]">
            <ShieldCheck className="h-4 w-4" />
            {t.alreadyActive}
          </p>
        ) : (
          <button
            type="button"
            onClick={launch}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#D10E63] px-5 py-3 text-sm font-bold text-[#FBF9F3] transition-colors hover:bg-[#E51872]"
          >
            <Play className="h-4 w-4" />
            {t.launch}
          </button>
        )}
      </div>

      <p className="mt-6 text-xs leading-relaxed text-[#9A9184]">{t.footnote}</p>
    </motion.section>
  )
}

function StatusDot({ status }: { status: WorkspaceMission['status'] }) {
  return (
    <span
      aria-hidden
      className={`h-2 w-2 shrink-0 rounded-full ${status === 'active' ? 'bg-[#2E9E5B]' : 'bg-[#D10E63]'}`}
    />
  )
}

function StatusBadge({ status, t }: { status: WorkspaceMission['status']; t: Copy }) {
  const active = status === 'active'
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] ${
        active ? 'bg-[#EAF6EE] text-[#227A47]' : 'bg-[#FCEBF2] text-[#A80B50]'
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${active ? 'bg-[#2E9E5B]' : 'bg-[#D10E63]'}`} />
      {active ? t.statusActive : t.statusReady}
    </span>
  )
}

type Copy = {
  kicker: string
  title: string
  newMission: string
  yourMissions: string
  responsible: string
  pairedWith: string
  objective: string
  frame: string
  frameEmpty: string
  validations: string
  validationsEmpty: string
  tools: string
  firstStep: string
  launch: string
  launched: string
  alreadyActive: string
  statusReady: string
  statusActive: string
  footnote: string
}

const COPY: Record<'fr' | 'en', Copy> = {
  fr: {
    kicker: 'Votre Workspace',
    title: 'Vos missions, prêtes à avancer.',
    newMission: 'Nouvelle mission',
    yourMissions: 'Vos missions',
    responsible: 'Responsable',
    pairedWith: 'En binôme avec',
    objective: 'Objectif',
    frame: 'Cadre compris',
    frameEmpty: 'Aucune règle particulière précisée pour l’instant.',
    validations: 'Votre validation est requise pour',
    validationsEmpty: 'Aucune validation humaine imposée pour l’instant.',
    tools: 'Outils nécessaires',
    firstStep: 'Première action',
    launch: 'Lancer la première action',
    launched: 'Première action lancée · en attente de votre validation.',
    alreadyActive: 'Mission en cours · première action lancée.',
    statusReady: 'Prête',
    statusActive: 'En cours',
    footnote:
      'Votre Collaborateur IA agit dans le cadre défini et s’arrête à chaque point qui requiert votre validation. Vous gardez la main à tout moment.',
  },
  en: {
    kicker: 'Your Workspace',
    title: 'Your missions, ready to move.',
    newMission: 'New mission',
    yourMissions: 'Your missions',
    responsible: 'Owner',
    pairedWith: 'Paired with',
    objective: 'Objective',
    frame: 'Known scope',
    frameEmpty: 'No specific rule set for now.',
    validations: 'Your approval is required to',
    validationsEmpty: 'No human validation enforced for now.',
    tools: 'Required tools',
    firstStep: 'First action',
    launch: 'Launch the first action',
    launched: 'First action launched · awaiting your approval.',
    alreadyActive: 'Mission running · first action launched.',
    statusReady: 'Ready',
    statusActive: 'Active',
    footnote:
      'Your AI Collaborator acts within the defined scope and stops at every point that needs your approval. You stay in control at all times.',
  },
} as const
