'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, Check, Lock, Circle, Loader2, AlertCircle } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { getMission } from './types'
import { ExpertDoor } from '@/components/experts/expert-door'
import { loadDraft, type MissionDraft } from '@/lib/mission-draft'
import { createWorkspaceMission } from '@/lib/workspace-missions'

export function ScreenWorkspace({
  lang,
  missionSlug,
  draftId,
  domain,
}: {
  lang: Lang
  missionSlug: string
  draftId: string
  domain: string
}) {
  const t = COPY[lang]
  const m = getMission(missionSlug)
  const router = useRouter()

  // The draft Alma built on /missions, handed off by id. Loaded client-side.
  const [draft, setDraft] = useState<MissionDraft | null>(null)
  useEffect(() => {
    if (draftId) setDraft(loadDraft(draftId))
  }, [draftId])

  // Real create → persist → navigate. Created once; both CTAs reuse the id.
  const [phase, setPhase] = useState<'idle' | 'creating' | 'error'>('idle')
  const createdId = useRef<string | null>(null)

  async function openInWorkspace() {
    if (phase === 'creating') return
    // If already created in this session, just navigate to it again.
    if (createdId.current) {
      router.push(`/workspace?mission=${createdId.current}`)
      return
    }
    setPhase('creating')
    try {
      // A brief, honest preparation beat (persisting + wiring the mission).
      await new Promise((r) => setTimeout(r, 650))
      const record = createWorkspaceMission({ draft, mission: m, domain })
      createdId.current = record.id
      router.push(`/workspace?mission=${record.id}`)
    } catch {
      setPhase('error')
    }
  }

  // Mission facts, draft-first with catalog fallback.
  const title = (draft?.title ?? m.title)[lang]
  const objective = (draft?.objective ?? m.objective)[lang]
  const firstStep = (m.steps[0] ?? { fr: t.firstStepValue, en: t.firstStepValue })[lang]

  // Governance: prefer the validations the user actually confirmed with Alma.
  const needsItems =
    draft && draft.validations.length > 0 ? draft.validations.map((v) => v[lang]) : t.needsItems
  const cadreItems = draft && draft.cadre.length > 0 ? draft.cadre.map((c) => c[lang]) : null

  const tools =
    lang === 'fr'
      ? [
          { label: 'Sources publiques', state: 'ok', note: 'disponibles' },
          { label: 'CRM', state: 'todo', note: 'à connecter' },
          { label: 'Email professionnel', state: 'opt', note: 'facultatif à cette étape' },
        ]
      : [
          { label: 'Public sources', state: 'ok', note: 'available' },
          { label: 'CRM', state: 'todo', note: 'to connect' },
          { label: 'Work email', state: 'opt', note: 'optional at this step' },
        ]

  return (
    <div>
      <h1 className="text-balance font-sf text-[clamp(1.8rem,3.8vw,2.7rem)] font-semibold leading-tight tracking-[-0.03em] text-[#1C1A17]">
        {t.title}
      </h1>

      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <Card label={t.collaborator}>
          <p className="font-sf text-base font-bold text-[#1C1A17]">
            {t.activeProfile} : <span className="text-[#A80B50]">{m.profile[lang]}</span>
          </p>
        </Card>
        <Card label={t.activeMission}>
          <p className="font-sf text-base font-bold text-[#1C1A17]">{title}</p>
        </Card>
        <Card label={t.objective}>
          <p className="text-sm font-semibold leading-relaxed text-[#1C1A17]">{objective}</p>
        </Card>
        <Card label={t.firstStep}>
          <p className="text-sm font-semibold leading-relaxed text-[#1C1A17]">{firstStep}</p>
        </Card>
      </div>

      {/* Tools */}
      <div className="mt-4">
        <Card label={t.tools}>
          <ul className="flex flex-col gap-2">
            {tools.map((tool) => (
              <li key={tool.label} className="flex items-center gap-2 text-sm text-[#3B362F]">
                {tool.state === 'ok' ? (
                  <Check className="h-4 w-4 shrink-0 text-[#2E9E5B]" strokeWidth={2.5} />
                ) : tool.state === 'todo' ? (
                  <Circle className="h-4 w-4 shrink-0 text-[#D10E63]" strokeWidth={2.5} />
                ) : (
                  <Circle className="h-4 w-4 shrink-0 text-[#B4AC9E]" strokeWidth={2} />
                )}
                <span className="font-medium">{tool.label}</span>
                <span className="text-[#8A8175]">· {tool.note}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Governance */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-5">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#2E9E5B]">
            {cadreItems ? t.frameKnown : t.canAlone}
          </p>
          <ul className="mt-3 flex flex-col gap-2">
            {(cadreItems ?? t.aloneItems).map((i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-[#3B362F]">
                <Check className="h-4 w-4 shrink-0 text-[#2E9E5B]" strokeWidth={2.5} />
                {i}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-5">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#A80B50]">{t.needsYou}</p>
          <ul className="mt-3 flex flex-col gap-2">
            {needsItems.map((i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-[#3B362F]">
                <Lock className="h-3.5 w-3.5 shrink-0 text-[#D10E63]" strokeWidth={2.5} />
                {i}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={openInWorkspace}
          disabled={phase === 'creating'}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#D10E63] px-6 py-3.5 text-sm font-bold text-[#FBF9F3] transition-colors hover:bg-[#E51872] disabled:cursor-wait disabled:opacity-80"
        >
          {phase === 'creating' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {t.creating}
            </>
          ) : (
            <>
              {t.openMission}
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
        <Link
          href="/workspace"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#D8D0C2] bg-[#FBF9F3] px-6 py-3.5 text-sm font-semibold text-[#3B362F] transition-colors hover:border-[#D10E63]/40"
        >
          {t.connectTools}
        </Link>
      </div>

      {phase === 'error' && (
        <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#C0392B]" role="alert">
          <AlertCircle className="h-4 w-4" />
          {t.errorRetry}
        </p>
      )}

      {/* Once the first mission is ready, offer human help for the wider rollout.
          Kept discreet and after the primary actions: the setup works without it. */}
      <div className="mt-4">
        <ExpertDoor
          lang={lang}
          title={
            lang === 'fr'
              ? 'Un déploiement plus large en tête ? Un expert peut vous accompagner.'
              : 'A wider rollout in mind? An expert can support you.'
          }
          cta={lang === 'fr' ? 'Découvrir les experts' : 'Discover the experts'}
        />
      </div>
    </div>
  )
}

function Card({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-5">
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#8A8175]">{label}</p>
      <div className="mt-3">{children}</div>
    </div>
  )
}

const COPY = {
  fr: {
    title: 'Votre première mission est prête.',
    collaborator: 'Collaborateur IA préparé',
    activeProfile: 'Profil actif',
    activeMission: 'Mission active',
    objective: 'Objectif',
    firstStep: 'Première étape',
    firstStepValue: 'Valider les critères de qualification',
    tools: 'Outils nécessaires',
    canAlone: 'Il peut agir seul pour',
    frameKnown: 'Cadre compris',
    aloneItems: ['rechercher des entreprises', 'consulter les sources publiques', 'qualifier les prospects', 'préparer une sélection'],
    needsYou: 'Votre validation est requise pour',
    needsItems: ['contacter une personne', 'modifier le CRM', 'utiliser un budget', 'partager une information à l’extérieur'],
    openMission: 'Ouvrir la mission dans le Workspace',
    creating: 'Création de la mission…',
    connectTools: 'Connecter les outils nécessaires',
    errorRetry: 'La création a échoué. Réessayez.',
  },
  en: {
    title: 'Your first mission is ready.',
    collaborator: 'AI Collaborator prepared',
    activeProfile: 'Active profile',
    activeMission: 'Active mission',
    objective: 'Objective',
    firstStep: 'First step',
    firstStepValue: 'Validate the qualification criteria',
    tools: 'Required tools',
    canAlone: 'It can act on its own to',
    frameKnown: 'Known scope',
    aloneItems: ['research companies', 'consult public sources', 'qualify prospects', 'prepare a shortlist'],
    needsYou: 'Your approval is required to',
    needsItems: ['contact a person', 'edit the CRM', 'use a budget', 'share information externally'],
    openMission: 'Open the mission in the Workspace',
    creating: 'Creating the mission…',
    connectTools: 'Connect the required tools',
    errorRetry: 'Creation failed. Please try again.',
  },
} as const
