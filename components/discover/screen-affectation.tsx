'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, ChevronDown, Plus } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { getMission, type Assignment, type MissionOverride } from './types'
import { ROLE_DETAILS } from '@/lib/collaborators-catalog'

const ease = [0.22, 1, 0.36, 1] as const

// Derive a readable company label from the analyzed domain (solvea.fr → Solvea).
function companyFromDomain(domain: string): string {
  const label = (domain || '').split('.')[0]
  if (!label) return ''
  return label.charAt(0).toUpperCase() + label.slice(1)
}

/**
 * Step 3 — "Alma prépare votre Collaborateur IA".
 *
 * In the onboarding flow there is no pre-existing collaborator, so this is a
 * CREATION: Alma composes a brand-new Collaborateur IA for the mission — a fresh
 * identity, a job profile, the required skills, applications, model and
 * instructions. Every element is shown as freshly composed (no "existing
 * identity"), and the mission always reflects the one the user actually chose or
 * described (via `override`). The user only validates.
 */
export function ScreenAffectation({
  lang,
  missionSlug,
  assignedSlug,
  onChoose,
  onContinue,
  domain = '',
  override = null,
}: {
  lang: Lang
  missionSlug: string
  assignedSlug: string
  assignment: Assignment
  onChoose: (a: Assignment) => void
  onContinue: () => void
  domain?: string
  override?: MissionOverride | null
}) {
  const t = COPY[lang]
  const reduce = useReducedMotion()
  const m = getMission(missionSlug)
  const persona = ROLE_DETAILS[assignedSlug]
  const company = companyFromDomain(domain) || t.yourCompany
  const [showModels, setShowModels] = useState(false)

  // Onboarding always creates a new collaborator (no existing org yet).
  useEffect(() => {
    onChoose('new')
  }, [onChoose])

  // The mission always matches what the user chose/described.
  const missionTitle = override?.title || m.title[lang]
  const objective = override?.result || m.result[lang]

  // Alma's proposal for the new collaborator.
  const proposedProfile = m.profile[lang]
  const proposedSkills = m.skills.slice(0, 2).map((s) => s[lang])
  const apps = m.tools.slice(0, 3)

  // Everything Alma composes for the new identity — all freshly created.
  const composed: { label: string; value: string }[] = [
    { label: t.addIdentity, value: '' },
    { label: t.addProfile, value: proposedProfile },
    ...proposedSkills.map((s) => ({ label: t.addSkill, value: s })),
    ...apps.map((a) => ({ label: t.addApp, value: a })),
    { label: t.addModel, value: t.autoModel },
    { label: t.addInstructions, value: '' },
  ]

  const anim = (delay: number) =>
    reduce
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4, ease, delay },
        }

  return (
    <div>
      <p className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-[#D10E63]">{t.kicker}</p>
      <h1 className="mt-3 text-balance font-sf text-[clamp(1.5rem,3vw,2.1rem)] font-semibold leading-tight tracking-[-0.03em] text-[#1C1A17]">
        {t.title}
      </h1>
      <p className="mt-2.5 max-w-xl text-pretty text-[15px] leading-relaxed text-[#4E483F]">{t.sub}</p>

      {/* Collaborator card */}
      <motion.div
        {...anim(0.05)}
        className="mt-6 rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-5"
      >
        <div className="flex items-center gap-3.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={persona?.avatar || '/placeholder.svg'}
            alt={persona?.name ?? ''}
            className="h-12 w-12 rounded-full object-cover ring-2 ring-[#D10E63]/30"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="font-sf text-lg font-bold text-[#1C1A17]">{persona?.name ?? t.newCollaborator}</p>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FBEFC9]/70 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#8A6A12]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C79A22]" />
                {t.preparing}
              </span>
            </div>
            <p className="mt-0.5 text-[13.5px] text-[#5A544A]">
              {t.newCollaboratorOf} {company}
            </p>
          </div>
          <span className="ml-auto hidden shrink-0 rounded-full border border-[#E4DDCE] bg-white px-3 py-1 text-[12px] font-medium text-[#6B6459] sm:inline">
            {proposedProfile}
          </span>
        </div>

        {/* For this mission — always the mission the user chose/described */}
        <div className="mt-5 border-t border-[#EFE8DA] pt-4">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A8172]">{t.forThisMission}</p>
          <p className="mt-1 font-sf text-[15px] font-semibold text-[#1C1A17]">{missionTitle}</p>

          {/* What Alma composes for the new identity — all created fresh */}
          <ul className="mt-3 flex flex-col gap-1.5">
            {composed.map((a, i) => (
              <motion.li
                key={`${a.label}-${a.value}-${i}`}
                {...anim(0.2 + i * 0.09)}
                className="flex items-center gap-2 text-[13.5px] text-[#3B362F]"
              >
                <Plus className="h-4 w-4 shrink-0 text-[#D10E63]" strokeWidth={2.5} />
                <span>
                  <span className="text-[#8A8172]">{a.label}</span>
                  {a.value ? <span className="font-medium text-[#3B362F]"> {a.value}</span> : null}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* A durable new identity — reinforces the model without a fake "before" */}
      <motion.div
        {...anim(0.9)}
        className="mt-4 rounded-2xl border border-[#EADCE3] bg-gradient-to-br from-[#FCF2F6] to-[#FBF9F3] p-5"
      >
        <p className="font-sf text-[15px] font-semibold text-[#1C1A17]">{t.durableTitle}</p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-3">
          {[t.durableIdentity, t.durableMemory, t.durableGrows].map((item) => (
            <li key={item} className="flex items-start gap-2 text-[13px] leading-snug text-[#4E483F]">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#D10E63]" strokeWidth={2.5} />
              {item}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Authorized models — never a model picker, just reassurance + a link */}
      <motion.div {...anim(1.0)} className="mt-4 rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-4">
        <button
          type="button"
          onClick={() => setShowModels((v) => !v)}
          aria-expanded={showModels}
          className="flex w-full items-center gap-2 text-left"
        >
          <span className="font-sf text-[14px] font-semibold text-[#1C1A17]">{t.models}</span>
          <span className="rounded-full bg-[#EAF6EE] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#1F7A45]">
            {t.autoModel}
          </span>
          <ChevronDown
            className={['ml-auto h-4 w-4 text-[#8A8172] transition-transform', showModels ? 'rotate-180' : ''].join(' ')}
          />
        </button>
        <AnimatePresence initial={false}>
          {showModels && (
            <motion.div
              initial={reduce ? false : { height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease }}
              className="overflow-hidden"
            >
              <p className="pt-3 text-[13px] leading-relaxed text-[#5A544A]">{t.modelsNote}</p>
              <span className="mt-2 inline-flex items-center gap-1 text-[13px] font-semibold text-[#D10E63]">
                {t.editModels}
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Working frame (instructions, never a raw prompt) */}
      <motion.div {...anim(1.05)} className="mt-4 rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-5">
        <div className="flex items-center justify-between gap-2">
          <p className="font-sf text-[14px] font-semibold text-[#1C1A17]">{t.frame}</p>
          <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#D10E63]">
            {t.edit}
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
        <dl className="mt-3 grid gap-3 sm:grid-cols-2">
          {[
            { k: t.objective, v: objective },
            { k: t.rules, v: t.rulesValue },
            { k: t.humanValidation, v: t.humanValidationValue },
            { k: t.style, v: t.styleValue },
          ].map((row) => (
            <div key={row.k}>
              <dt className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#8A8172]">{row.k}</dt>
              <dd className="mt-1 text-[13.5px] leading-snug text-[#3B362F]">{row.v}</dd>
            </div>
          ))}
        </dl>
      </motion.div>

      {/* Applications — do not block the flow; connect later from the Workspace */}
      <motion.div {...anim(1.1)} className="mt-4 rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-5">
        <p className="font-sf text-[14px] font-semibold text-[#1C1A17]">{t.apps}</p>
        <ul className="mt-3 flex flex-col divide-y divide-[#EFE8DA]">
          {apps.map((a) => (
            <li key={a} className="flex items-center justify-between gap-3 py-2.5 first:pt-0 last:pb-0">
              <span className="text-[14px] text-[#3B362F]">{a}</span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E4DDCE] bg-white px-3 py-1 text-[12px] font-medium text-[#6B6459]">
                <span className="h-1.5 w-1.5 rounded-full border border-[#C9BFAE]" />
                {t.connect}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-[13px] leading-relaxed text-[#8A8175]">{t.appsNote}</p>
      </motion.div>

      <button
        type="button"
        onClick={onContinue}
        className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#D10E63] px-6 py-3.5 text-sm font-bold text-[#FBF9F3] transition-colors hover:bg-[#E51872]"
      >
        {t.cta}
        <ArrowRight className="h-4 w-4" />
      </button>

      <p className="mt-4 text-[13px] leading-relaxed text-[#8A8175]">{t.micro}</p>
    </div>
  )
}

const COPY = {
  fr: {
    kicker: 'Collaborateur IA · 3 sur 5',
    title: 'Alma compose votre Collaborateur IA.',
    sub: 'À partir de cette mission, elle crée un nouveau Collaborateur IA : une identité, un profil métier, les compétences et les accès nécessaires. Vous validez.',
    yourCompany: 'votre entreprise',
    newCollaborator: 'Nouveau Collaborateur IA',
    preparing: 'En préparation',
    newCollaboratorOf: 'Nouveau Collaborateur IA ·',
    forThisMission: 'Pour cette mission',
    addIdentity: 'Identité créée',
    addProfile: 'Profil métier',
    addSkill: 'Compétence',
    addApp: 'Application',
    addModel: 'Modèle autorisé',
    addInstructions: 'Instructions de mission',
    autoModel: 'Auto · recommandé',
    durableTitle: 'Une identité durable, dès sa création.',
    durableIdentity: 'Une identité et un nom propres à votre entreprise.',
    durableMemory: 'Une mémoire dédiée qui lui appartient.',
    durableGrows: 'Il évoluera au fil de ses missions.',
    models: 'Modèles autorisés',
    modelsNote:
      'Alma choisira le modèle adapté à chaque tâche parmi ceux autorisés par votre entreprise.',
    editModels: 'Modifier les modèles autorisés',
    frame: 'Cadre de travail',
    edit: 'Modifier',
    objective: 'Objectif',
    rules: 'Règles',
    rulesValue: 'Transférer les demandes sensibles à un membre de l’équipe.',
    humanValidation: 'Validation humaine',
    humanValidationValue: 'Aucune décision engageante sans votre accord.',
    style: 'Style',
    styleValue: 'Professionnel · chaleureux · concis',
    apps: 'Applications nécessaires',
    connect: 'Connecter',
    appsNote: 'Vous pourrez connecter ces applications depuis le Workspace.',
    cta: 'Valider ce Collaborateur',
    micro: 'Vous restez maître de son identité, de sa mémoire, de ses compétences et de ses accès.',
  },
  en: {
    kicker: 'AI Collaborator · 3 of 5',
    title: 'Alma composes your AI Collaborator.',
    sub: 'From this mission she creates a new AI Collaborator: an identity, a job profile, the required skills and access. You validate.',
    yourCompany: 'your company',
    newCollaborator: 'New AI Collaborator',
    preparing: 'In preparation',
    newCollaboratorOf: 'New AI Collaborator ·',
    forThisMission: 'For this mission',
    addIdentity: 'Identity created',
    addProfile: 'Job profile',
    addSkill: 'Skill',
    addApp: 'Application',
    addModel: 'Authorized model',
    addInstructions: 'Mission instructions',
    autoModel: 'Auto · recommended',
    durableTitle: 'A durable identity, from day one.',
    durableIdentity: 'An identity and a name of its own for your company.',
    durableMemory: 'A dedicated memory that belongs to it.',
    durableGrows: 'It will grow across its missions.',
    models: 'Authorized models',
    modelsNote:
      'Alma will pick the model suited to each task among those authorized by your company.',
    editModels: 'Edit authorized models',
    frame: 'Working frame',
    edit: 'Edit',
    objective: 'Objective',
    rules: 'Rules',
    rulesValue: 'Hand sensitive requests to a member of your team.',
    humanValidation: 'Human validation',
    humanValidationValue: 'No binding decision without your approval.',
    style: 'Style',
    styleValue: 'Professional · warm · concise',
    apps: 'Required applications',
    connect: 'Connect',
    appsNote: 'You will be able to connect these applications from the Workspace.',
    cta: 'Validate this Collaborator',
    micro: 'You stay in control of its identity, memory, skills and access.',
  },
} as const
