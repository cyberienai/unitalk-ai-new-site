'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, Mail, Phone, Calendar, Brain, FolderOpen, Sparkles, Lock } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as const

type Tool = { name: string; connected: boolean }

type Mission = {
  key: string
  label: string
  profile: string
  profileDesc: string
  skills: string[]
  tools: Tool[]
  readyTitle: string
}

const T = {
  fr: {
    eyebrow: 'À vous de jouer — Essai gratuit 7 jours',
    title: 'Choisissez une mission. Votre Collaborateur IA se prépare.',
    intro:
      'Alma identifie le profil métier, les compétences et les outils nécessaires. Vous validez, puis votre Collaborateur IA passe à l’action.',
    identityRole: 'Collaboratrice IA · Profil actuel : assistante de direction',
    identityHeader: 'Son identité professionnelle',
    identityItems: ['Email', 'Téléphone', 'Calendrier', 'Mémoire', 'Fichiers'],
    personalizeNote:
      'Son nom, son avatar et sa voix pourront être personnalisés après son arrivée dans votre organisation.',
    step1: 'Choisissez une mission',
    profileTitle: 'Profil métier proposé',
    skillsTitle: 'Compétences préparées',
    toolsTitle: 'Outils nécessaires',
    connectionRequired: 'Connexion requise',
    validationTitle: 'Validation',
    prepare: 'Préparer Emma pour cette mission',
    preparing: 'Préparation en cours…',
    readyLabel: 'Emma est prête',
    entrust: 'Confier cette mission à Emma',
    stays:
      'Emma reste Emma. Sa mémoire, ses accès et son expérience l’accompagnent dans toutes ses missions.',
    allProfiles: 'Explorer tous les profils métier',
    steps: (profile: string) => [
      `Profil ${profile} ajouté`,
      'Compétences préparées',
      'Outils disponibles vérifiés',
      'Cadre de validation défini',
    ],
    missions: [
      {
        key: 'newsletter',
        label: 'Préparer une newsletter',
        profile: 'Responsable du contenu',
        profileDesc: 'Planifie, produit et diffuse les contenus de votre organisation.',
        skills: ['Recherche', 'Rédaction', 'Création visuelle', 'Publication'],
        tools: [
          { name: 'Site Web', connected: false },
          { name: 'Email', connected: true },
          { name: 'CMS', connected: false },
        ],
        readyTitle: 'Préparer la prochaine newsletter',
      },
      {
        key: 'prospects',
        label: 'Qualifier des prospects',
        profile: 'Développement commercial',
        profileDesc: 'Identifie, qualifie et engage de nouveaux prospects.',
        skills: ['Recherche', 'Qualification', 'Personnalisation', 'CRM'],
        tools: [
          { name: 'Web', connected: false },
          { name: 'CRM', connected: false },
          { name: 'Tableur', connected: false },
        ],
        readyTitle: 'Qualifier de nouveaux prospects',
      },
      {
        key: 'recrutement',
        label: 'Organiser un recrutement',
        profile: 'Recrutement',
        profileDesc: 'Structure le recrutement, du tri des candidatures au suivi des candidats.',
        skills: ['Analyse de candidatures', 'Présélection', 'Synthèse', 'Planification'],
        tools: [
          { name: 'Email', connected: true },
          { name: 'Calendrier', connected: true },
          { name: 'Dossiers de candidature', connected: false },
        ],
        readyTitle: 'Organiser le prochain recrutement',
      },
      {
        key: 'ventes',
        label: 'Analyser les ventes',
        profile: 'Analyse commerciale',
        profileDesc: 'Consolide et analyse vos données de vente pour éclairer vos décisions.',
        skills: ['Consolidation', 'Analyse', 'Visualisation', 'Synthèse'],
        tools: [
          { name: 'CRM', connected: false },
          { name: 'Tableur', connected: false },
          { name: 'Fichiers', connected: true },
        ],
        readyTitle: 'Analyser les ventes du trimestre',
      },
    ] as Mission[],
  },
  en: {
    eyebrow: 'Your turn — 7-day free trial',
    title: 'Pick a mission. Your AI Collaborator gets ready.',
    intro:
      'Alma identifies the business profile, skills and tools required. You approve, then your AI Collaborator gets to work.',
    identityRole: 'AI Collaborator · Current profile: executive assistant',
    identityHeader: 'Her professional identity',
    identityItems: ['Email', 'Phone', 'Calendar', 'Memory', 'Files'],
    personalizeNote:
      'Her name, avatar and voice can be personalized after she joins your organization.',
    step1: 'Pick a mission',
    profileTitle: 'Proposed business profile',
    skillsTitle: 'Skills prepared',
    toolsTitle: 'Tools required',
    connectionRequired: 'Connection required',
    validationTitle: 'Approval',
    prepare: 'Prepare Emma for this mission',
    preparing: 'Preparing…',
    readyLabel: 'Emma is ready',
    entrust: 'Entrust this mission to Emma',
    stays:
      'Emma stays Emma. Her memory, her access and her experience follow her across every mission.',
    allProfiles: 'Explore every business profile',
    steps: (profile: string) => [
      `${profile} profile added`,
      'Skills prepared',
      'Available tools checked',
      'Approval framework defined',
    ],
    missions: [
      {
        key: 'newsletter',
        label: 'Prepare a newsletter',
        profile: 'Content lead',
        profileDesc: 'Plans, produces and publishes your organization’s content.',
        skills: ['Research', 'Writing', 'Visual design', 'Publishing'],
        tools: [
          { name: 'Website', connected: false },
          { name: 'Email', connected: true },
          { name: 'CMS', connected: false },
        ],
        readyTitle: 'Prepare the next newsletter',
      },
      {
        key: 'prospects',
        label: 'Qualify prospects',
        profile: 'Business development',
        profileDesc: 'Identifies, qualifies and engages new prospects.',
        skills: ['Research', 'Qualification', 'Personalization', 'CRM'],
        tools: [
          { name: 'Web', connected: false },
          { name: 'CRM', connected: false },
          { name: 'Spreadsheet', connected: false },
        ],
        readyTitle: 'Qualify new prospects',
      },
      {
        key: 'recrutement',
        label: 'Run a hiring process',
        profile: 'Recruitment',
        profileDesc: 'Structures hiring, from screening applications to candidate follow-up.',
        skills: ['Application review', 'Shortlisting', 'Summaries', 'Scheduling'],
        tools: [
          { name: 'Email', connected: true },
          { name: 'Calendar', connected: true },
          { name: 'Application files', connected: false },
        ],
        readyTitle: 'Run the next hiring process',
      },
      {
        key: 'ventes',
        label: 'Analyze sales',
        profile: 'Sales analysis',
        profileDesc: 'Consolidates and analyzes your sales data to inform your decisions.',
        skills: ['Consolidation', 'Analysis', 'Visualization', 'Summary'],
        tools: [
          { name: 'CRM', connected: false },
          { name: 'Spreadsheet', connected: false },
          { name: 'Files', connected: true },
        ],
        readyTitle: 'Analyze this quarter’s sales',
      },
    ] as Mission[],
  },
} as const

const IDENTITY_ICONS = [Mail, Phone, Calendar, Brain, FolderOpen] as const

type Phase = 'idle' | 'validating' | 'done'

export function SectionDemo({
  lang = 'fr',
  onMissionChange,
}: {
  lang?: 'fr' | 'en'
  onMissionChange?: (key: string) => void
}) {
  const t = T[lang]
  const reduceMotion = useReducedMotion()
  const [selected, setSelected] = useState(0)
  const [phase, setPhase] = useState<Phase>('idle')
  const interacted = useRef(false)
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-120px' })

  const mission = t.missions[selected]
  const steps = t.steps(mission.profile)

  // validating -> done transition
  useEffect(() => {
    if (phase !== 'validating') return
    const id = setTimeout(() => setPhase('done'), reduceMotion ? 0 : 2000)
    return () => clearTimeout(id)
  }, [phase, reduceMotion])

  // autoplay when scrolled into view, only if the visitor hasn't interacted
  useEffect(() => {
    if (!inView || interacted.current || reduceMotion) return
    const id = setTimeout(() => {
      if (!interacted.current) setPhase('validating')
    }, 1400)
    return () => clearTimeout(id)
  }, [inView, reduceMotion])

  const selectMission = (i: number) => {
    interacted.current = true
    setSelected(i)
    setPhase('idle')
    onMissionChange?.(t.missions[i].key)
  }

  const onPrepareClick = () => {
    interacted.current = true
    if (phase === 'idle') setPhase('validating')
  }

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#F3EFE6] py-20 sm:py-28">
      <div className="editorial-shell">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D10E63]">
            {t.eyebrow}
          </p>
          <h2 className="text-balance font-sf text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-[#1C1A17]">
            {t.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-[#4E483F]">
            {t.intro}
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-5xl">
          <div className="premium-shadow overflow-hidden rounded-[1.75rem] border border-[#D8D0C2] bg-[#FBF9F3]">
            {/* Emma identity header */}
            <div className="border-b border-[#E4DDCE] bg-[#F3EFE6]/60 p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-4">
                <div className="relative shrink-0">
                  <Image
                    src="/images/emma-avatar.png"
                    alt="Emma"
                    width={56}
                    height={56}
                    className="h-14 w-14 rounded-full object-cover ring-2 ring-[#FBF9F3]"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-[#FBF9F3] bg-[#D10E63]" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="text-lg font-bold text-[#1C1A17]">Emma</p>
                  <p className="text-xs text-[#6E665A]">{t.identityRole}</p>
                </div>
                <div className="ml-auto">
                  <p className="mb-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#8A8175]">
                    {t.identityHeader}
                  </p>
                  <ul className="flex flex-wrap items-center gap-1.5">
                    {t.identityItems.map((item, i) => {
                      const Icon = IDENTITY_ICONS[i]
                      return (
                        <li
                          key={item}
                          className="flex items-center gap-1.5 rounded-full border border-[#E4DDCE] bg-[#FBF9F3] px-2.5 py-1 text-[11px] font-medium text-[#5F594F]"
                        >
                          <Icon className="h-3 w-3 text-[#8A8175]" />
                          {item}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
              <p className="mt-3 text-[11px] italic leading-snug text-[#8A8175]">{t.personalizeNote}</p>
            </div>

            <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
              {/* Step 1 — missions */}
              <div className="border-b border-[#E4DDCE] p-5 sm:p-6 lg:border-b-0 lg:border-r">
                <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#5F594F]">
                  {t.step1}
                </p>
                <div className="flex flex-col gap-2.5">
                  {t.missions.map((m, i) => {
                    const active = i === selected
                    return (
                      <button
                        key={m.key}
                        type="button"
                        onClick={() => selectMission(i)}
                        aria-pressed={active}
                        className={`group flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition-all ${
                          active
                            ? 'border-[#D10E63] bg-[#D10E63]/[0.06] text-[#1C1A17]'
                            : 'border-[#E4DDCE] bg-[#F3EFE6] text-[#4E483F] hover:border-[#D10E63]/40'
                        }`}
                      >
                        {m.label}
                        <span
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-colors ${
                            active ? 'bg-[#D10E63] text-[#FBF9F3]' : 'bg-[#E4DDCE] text-transparent'
                          }`}
                          aria-hidden="true"
                        >
                          <Check className="h-3 w-3" strokeWidth={3} />
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Step 2 — profile / skills / tools / validation */}
              <div className="p-5 sm:p-6">
                {/* Profile card */}
                <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#5F594F]">
                  {t.profileTitle}
                </p>
                <div className="flex items-center gap-3 rounded-2xl border border-[#E4DDCE] bg-[#F3EFE6] p-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#D10E63]/10 text-[#D10E63]">
                    <Sparkles className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={mission.profile}
                        initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                        transition={{ duration: 0.3, ease }}
                      >
                        <p className="text-sm font-bold text-[#1C1A17]">{mission.profile}</p>
                        <p className="text-[11px] leading-snug text-[#6E665A]">{mission.profileDesc}</p>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Skills */}
                <p className="mb-2 mt-5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#5F594F]">
                  {t.skillsTitle}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {mission.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-[#D10E63]/25 bg-[#D10E63]/[0.05] px-3 py-1.5 text-xs font-semibold text-[#A80B50]"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>

                {/* Tools */}
                <p className="mb-2 mt-5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#5F594F]">
                  {t.toolsTitle}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {mission.tools.map((tool) => (
                    <li
                      key={tool.name}
                      className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${
                        tool.connected
                          ? 'border-[#E4DDCE] bg-[#F3EFE6] text-[#5F594F]'
                          : 'border-[#D9A100]/40 bg-[#F6EBCB]/60 text-[#8A6A00]'
                      }`}
                    >
                      {tool.connected ? (
                        <Check className="h-3 w-3 text-[#6E9A4E]" strokeWidth={3} />
                      ) : (
                        <Lock className="h-3 w-3" />
                      )}
                      {tool.name}
                      {!tool.connected && (
                        <span className="ml-0.5 text-[10px] font-medium text-[#A07A00]">· {t.connectionRequired}</span>
                      )}
                    </li>
                  ))}
                </ul>

                {/* Validation zone */}
                <p className="mb-2 mt-5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#5F594F]">
                  {t.validationTitle}
                </p>

                {phase === 'idle' && (
                  <button
                    type="button"
                    onClick={onPrepareClick}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1C1A17] px-5 py-2.5 text-sm font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1A17] focus-visible:ring-offset-2"
                  >
                    {t.prepare}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                )}

                {phase === 'validating' && (
                  <ul className="flex flex-col gap-2 rounded-2xl border border-[#E4DDCE] bg-[#F3EFE6] p-4">
                    {steps.map((s, i) => (
                      <motion.li
                        key={s}
                        initial={reduceMotion ? false : { opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, ease, delay: reduceMotion ? 0 : 0.45 * i }}
                        className="flex items-center gap-2.5 text-sm font-semibold text-[#1C1A17]"
                      >
                        <motion.span
                          initial={reduceMotion ? false : { scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.25, ease, delay: reduceMotion ? 0 : 0.45 * i + 0.1 }}
                          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D10E63] text-[#FBF9F3]"
                        >
                          <Check className="h-3 w-3" strokeWidth={3} />
                        </motion.span>
                        {s}
                      </motion.li>
                    ))}
                  </ul>
                )}

                <AnimatePresence>
                  {phase === 'done' && (
                    <motion.div
                      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease }}
                      className="rounded-2xl border border-[#D10E63]/20 bg-[#D10E63]/[0.04] p-4"
                    >
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#A80B50]">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D10E63] text-[#FBF9F3]">
                          <Check className="h-3 w-3" strokeWidth={3} />
                        </span>
                        {t.readyLabel}
                      </div>
                      <p className="mt-2 font-sf text-lg font-semibold leading-tight tracking-[-0.02em] text-[#1C1A17]">
                        {mission.readyTitle}
                      </p>
                      <a
                        href="/decouvrir"
                        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#D10E63] px-5 py-2.5 text-sm font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2"
                      >
                        {t.entrust}
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-center text-sm leading-relaxed text-[#6E665A]">
            {t.stays}{' '}
            <a href="/expertises" className="font-semibold text-[#D10E63] underline-offset-2 hover:underline">
              {t.allProfiles}
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
