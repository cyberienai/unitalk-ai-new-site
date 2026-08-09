'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, ChevronDown, Plus } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { getMission, type Assignment } from './types'
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
 * This screen does NOT ask the user to configure or choose an agent. Alma takes
 * the existing collaborator and *prepares* it for the new mission: the signature
 * moment is the AVANT → APRÈS reveal ("Même identité. Nouvelle responsabilité.").
 * The user only validates. Assignment is locked to "existing" (or "new" when no
 * persona resolves) so the downstream Workspace stays consistent.
 */
export function ScreenAffectation({
  lang,
  missionSlug,
  assignedSlug,
  onChoose,
  onContinue,
  domain = '',
}: {
  lang: Lang
  missionSlug: string
  assignedSlug: string
  assignment: Assignment
  onChoose: (a: Assignment) => void
  onContinue: () => void
  domain?: string
}) {
  const t = COPY[lang]
  const reduce = useReducedMotion()
  const m = getMission(missionSlug)
  const persona = ROLE_DETAILS[assignedSlug]
  const company = companyFromDomain(domain) || t.yourCompany
  const [showModels, setShowModels] = useState(false)

  // In the "Alma prepares" model she evolves the existing collaborator.
  useEffect(() => {
    onChoose(persona ? 'existing' : 'new')
  }, [persona, onChoose])

  const existingProfile = persona ? persona.role[lang] : m.profile[lang]
  const addedProfile = m.profile[lang]
  const profileChanged = addedProfile.toLowerCase() !== existingProfile.toLowerCase()
  const addedSkills = m.skills.slice(0, 2).map((s) => s[lang])
  const apps = m.tools.slice(0, 3)

  // The staggered "+" reveal — what the mission adds to the existing identity.
  const added: { label: string; value: string }[] = [
    ...(profileChanged ? [{ label: t.addProfile, value: addedProfile }] : []),
    ...addedSkills.map((s) => ({ label: t.addSkill, value: s })),
    ...apps.map((a) => ({ label: t.addApp, value: a })),
    { label: t.addModel, value: t.autoModel },
    { label: t.addInstructions, value: '' },
  ]

  const apresProfile = profileChanged ? `${existingProfile} · ${addedProfile}` : existingProfile

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
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF6EE] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#1F7A45]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2E9E5B]" />
                {t.ready}
              </span>
            </div>
            <p className="mt-0.5 text-[13.5px] text-[#5A544A]">
              {t.collaboratorOf} {company}
            </p>
          </div>
          <span className="ml-auto hidden shrink-0 rounded-full border border-[#E4DDCE] bg-white px-3 py-1 text-[12px] font-medium text-[#6B6459] sm:inline">
            {existingProfile}
          </span>
        </div>

        {/* For this mission */}
        <div className="mt-5 border-t border-[#EFE8DA] pt-4">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A8172]">{t.forThisMission}</p>
          <p className="mt-1 font-sf text-[15px] font-semibold text-[#1C1A17]">{m.title[lang]}</p>

          {/* What already exists */}
          <ul className="mt-3 flex flex-col gap-1.5">
            {[t.identityExisting, `${t.profile} ${existingProfile}`].map((item, i) => (
              <motion.li
                key={item}
                {...anim(0.15 + i * 0.08)}
                className="flex items-center gap-2 text-[13.5px] text-[#3B362F]"
              >
                <Check className="h-4 w-4 shrink-0 text-[#2E9E5B]" strokeWidth={2.5} />
                {item}
              </motion.li>
            ))}
          </ul>

          {/* What the mission adds */}
          <ul className="mt-2.5 flex flex-col gap-1.5">
            {added.map((a, i) => (
              <motion.li
                key={`${a.label}-${a.value}-${i}`}
                {...anim(0.32 + i * 0.09)}
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

      {/* AVANT → APRÈS — the signature moment */}
      <motion.div
        {...anim(0.9)}
        className="mt-4 grid gap-3 rounded-2xl border border-[#EADCE3] bg-gradient-to-br from-[#FCF2F6] to-[#FBF9F3] p-5 sm:grid-cols-[1fr_auto_1fr] sm:items-center"
      >
        <div className="rounded-xl border border-[#E4DDCE] bg-white/70 p-3.5">
          <p className="font-mono text-[9.5px] font-bold uppercase tracking-[0.16em] text-[#A79E8E]">{t.before}</p>
          <p className="mt-1.5 font-sf text-[15px] font-bold text-[#1C1A17]">{persona?.name ?? t.newCollaborator}</p>
          <p className="text-[13px] text-[#6B6459]">{existingProfile}</p>
        </div>
        <div className="flex items-center justify-center">
          <ArrowRight className="h-5 w-5 rotate-90 text-[#D10E63] sm:rotate-0" />
        </div>
        <div className="rounded-xl border border-[#D10E63]/30 bg-white p-3.5 ring-1 ring-[#D10E63]/15">
          <p className="font-mono text-[9.5px] font-bold uppercase tracking-[0.16em] text-[#A80B50]">{t.after}</p>
          <p className="mt-1.5 font-sf text-[15px] font-bold text-[#1C1A17]">{persona?.name ?? t.newCollaborator}</p>
          <p className="text-[13px] font-medium text-[#1C1A17]">{apresProfile}</p>
          <p className="mt-1 text-[12px] leading-snug text-[#8A6270]">{t.plusNew}</p>
        </div>
        <p className="text-pretty text-center font-sf text-[14px] font-semibold text-[#1C1A17] sm:col-span-3">
          {t.sameIdentity}
        </p>
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
            { k: t.objective, v: m.result[lang] },
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
    title: 'Alma prépare votre Collaborateur IA.',
    sub: 'Elle s’appuie d’abord sur votre Collaborateur existant, puis lui ajoute ce dont il a besoin pour accomplir cette mission.',
    yourCompany: 'votre entreprise',
    newCollaborator: 'Nouveau Collaborateur',
    ready: 'Prête',
    collaboratorOf: 'Collaborateur IA ·',
    forThisMission: 'Pour cette mission',
    identityExisting: 'Identité existante',
    profile: 'Profil',
    addProfile: 'Profil',
    addSkill: 'Compétence',
    addApp: 'Application',
    addModel: 'Modèle autorisé',
    addInstructions: 'Instructions de mission',
    autoModel: 'Auto · recommandé',
    before: 'Avant',
    after: 'Après',
    plusNew: '+ nouvelles compétences, applications et instructions',
    sameIdentity: 'Même identité. Nouvelle responsabilité.',
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
    title: 'Alma prepares your AI Collaborator.',
    sub: 'She starts from your existing Collaborator, then adds what it needs to carry out this mission.',
    yourCompany: 'your company',
    newCollaborator: 'New Collaborator',
    ready: 'Ready',
    collaboratorOf: 'AI Collaborator ·',
    forThisMission: 'For this mission',
    identityExisting: 'Existing identity',
    profile: 'Profile',
    addProfile: 'Profile',
    addSkill: 'Skill',
    addApp: 'Application',
    addModel: 'Authorized model',
    addInstructions: 'Mission instructions',
    autoModel: 'Auto · recommended',
    before: 'Before',
    after: 'After',
    plusNew: '+ new skills, applications and instructions',
    sameIdentity: 'Same identity. New responsibility.',
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
