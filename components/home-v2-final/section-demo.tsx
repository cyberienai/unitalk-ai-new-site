'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, Mail, Phone, Calendar, Brain, FolderOpen, Sparkles, Plus } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as const

type Mission = {
  key: string
  label: string
  profile: string
  profileDesc: string
  skills: string[]
  deliverable: string
}

const T = {
  fr: {
    eyebrow: 'À vous de jouer',
    title: 'Donnez une nouvelle expertise à Emma.',
    intro:
      'Emma est l’assistante IA de la direction. Choisissez une mission : elle acquiert instantanément le profil métier et les savoir-faire nécessaires.',
    identityRole: 'Assistante IA · Direction',
    identityItems: ['Email', 'Téléphone', 'Calendrier', 'Mémoire', 'Fichiers'],
    step1: 'Choisissez une mission',
    step2: 'Le profil métier requis',
    addProfile: 'Ajouter ce profil à Emma',
    adding: 'Ajout du profil…',
    added: 'Profil ajouté',
    skillsTitle: 'Nouveaux savoir-faire',
    ready: 'Mission prête',
    entrust: 'Confier cette mission à Emma',
    stays:
      'Emma reste Emma : la même identité, la même mémoire. Vous lui ajoutez des savoir-faire quand vous en avez besoin.',
    allProfiles: 'Découvrir tous les profils métier',
    missions: [
      {
        key: 'newsletter',
        label: 'Préparer une newsletter',
        profile: 'Responsable du contenu',
        profileDesc: 'Le savoir-faire éditorial complet, de la stratégie à la publication.',
        skills: ['Stratégie éditoriale', 'Recherche', 'SEO', 'Rédaction', 'Création visuelle', 'Publication', 'Analyse'],
        deliverable: 'Newsletter — Septembre',
      },
      {
        key: 'prospects',
        label: 'Qualifier des prospects',
        profile: 'Business developer',
        profileDesc: 'La prospection structurée, du ciblage à la prise de rendez-vous.',
        skills: ['Ciblage', 'Enrichissement', 'Scoring', 'Séquences email', 'Relances', 'Qualification', 'CRM'],
        deliverable: 'Liste de prospects qualifiés',
      },
      {
        key: 'recrutement',
        label: 'Organiser un recrutement',
        profile: 'Chargé de recrutement',
        profileDesc: 'Le processus de recrutement, de la fiche de poste au suivi des candidats.',
        skills: ['Fiche de poste', 'Sourcing', 'Tri des candidatures', 'Préqualification', 'Planification', 'Comptes-rendus', 'Suivi'],
        deliverable: 'Short-list de candidats',
      },
      {
        key: 'ventes',
        label: 'Analyser les ventes',
        profile: 'Analyste data',
        profileDesc: 'L’analyse chiffrée, de la collecte des données aux recommandations.',
        skills: ['Collecte', 'Nettoyage', 'Tableaux de bord', 'Tendances', 'Prévisions', 'Recommandations', 'Reporting'],
        deliverable: 'Tableau de bord des ventes',
      },
    ] as Mission[],
  },
  en: {
    eyebrow: 'Your turn',
    title: 'Give Emma a new expertise.',
    intro:
      'Emma is the leadership team’s AI assistant. Pick a mission: she instantly gains the business profile and know-how she needs.',
    identityRole: 'AI assistant · Leadership',
    identityItems: ['Email', 'Phone', 'Calendar', 'Memory', 'Files'],
    step1: 'Pick a mission',
    step2: 'The required business profile',
    addProfile: 'Add this profile to Emma',
    adding: 'Adding profile…',
    added: 'Profile added',
    skillsTitle: 'New know-how',
    ready: 'Mission ready',
    entrust: 'Entrust this mission to Emma',
    stays:
      'Emma stays Emma: same identity, same memory. You add know-how whenever you need it.',
    allProfiles: 'Discover every business profile',
    missions: [
      {
        key: 'newsletter',
        label: 'Prepare a newsletter',
        profile: 'Content lead',
        profileDesc: 'The full editorial know-how, from strategy to publishing.',
        skills: ['Editorial strategy', 'Research', 'SEO', 'Writing', 'Visual design', 'Publishing', 'Analytics'],
        deliverable: 'Newsletter — September',
      },
      {
        key: 'prospects',
        label: 'Qualify prospects',
        profile: 'Business developer',
        profileDesc: 'Structured prospecting, from targeting to booked meetings.',
        skills: ['Targeting', 'Enrichment', 'Scoring', 'Email sequences', 'Follow-ups', 'Qualification', 'CRM'],
        deliverable: 'Qualified prospect list',
      },
      {
        key: 'recrutement',
        label: 'Run a hiring process',
        profile: 'Recruiter',
        profileDesc: 'The hiring process, from job description to candidate follow-up.',
        skills: ['Job description', 'Sourcing', 'Screening', 'Pre-qualification', 'Scheduling', 'Debriefs', 'Follow-up'],
        deliverable: 'Candidate short-list',
      },
      {
        key: 'ventes',
        label: 'Analyze sales',
        profile: 'Data analyst',
        profileDesc: 'Quantitative analysis, from data collection to recommendations.',
        skills: ['Collection', 'Cleaning', 'Dashboards', 'Trends', 'Forecasts', 'Recommendations', 'Reporting'],
        deliverable: 'Sales dashboard',
      },
    ] as Mission[],
  },
} as const

const IDENTITY_ICONS = [Mail, Phone, Calendar, Brain, FolderOpen] as const

type Phase = 'idle' | 'adding' | 'done'

export function SectionDemo({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = T[lang]
  const reduceMotion = useReducedMotion()
  const [selected, setSelected] = useState(0)
  const [phase, setPhase] = useState<Phase>('idle')
  const interacted = useRef(false)
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-120px' })

  const mission = t.missions[selected]

  const runAdd = () => {
    if (phase !== 'idle') return
    setPhase('adding')
  }

  // adding -> done transition
  useEffect(() => {
    if (phase !== 'adding') return
    const id = setTimeout(() => setPhase('done'), reduceMotion ? 0 : 1100)
    return () => clearTimeout(id)
  }, [phase, reduceMotion])

  // autoplay when scrolled into view, only if the visitor hasn't interacted
  useEffect(() => {
    if (!inView || interacted.current || reduceMotion) return
    const id = setTimeout(() => {
      if (!interacted.current) setPhase('adding')
    }, 1200)
    return () => clearTimeout(id)
  }, [inView, reduceMotion])

  const selectMission = (i: number) => {
    interacted.current = true
    setSelected(i)
    setPhase('idle')
  }

  const onAddClick = () => {
    interacted.current = true
    runAdd()
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
            <div className="flex flex-wrap items-center gap-4 border-b border-[#E4DDCE] bg-[#F3EFE6]/60 p-5 sm:p-6">
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
              <ul className="ml-auto flex flex-wrap items-center gap-1.5">
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

              {/* Step 2 / 3 — profile add + transformation */}
              <div className="p-5 sm:p-6">
                <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#5F594F]">
                  {t.step2}
                </p>

                {/* Profile card */}
                <div className="rounded-2xl border border-[#E4DDCE] bg-[#F3EFE6] p-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D10E63]/10 text-[#D10E63]">
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

                  {/* Add button / status */}
                  <div className="mt-4">
                    {phase === 'idle' && (
                      <button
                        type="button"
                        onClick={onAddClick}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1C1A17] px-5 py-2.5 text-sm font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1A17] focus-visible:ring-offset-2"
                      >
                        <Plus className="h-4 w-4" />
                        {t.addProfile}
                      </button>
                    )}
                    {phase === 'adding' && (
                      <div className="flex items-center justify-center gap-2 rounded-full bg-[#E4DDCE] px-5 py-2.5 text-sm font-semibold text-[#5F594F]">
                        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#D10E63] border-t-transparent motion-reduce:animate-none" />
                        {t.adding}
                      </div>
                    )}
                    {phase === 'done' && (
                      <motion.div
                        initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.35, ease }}
                        className="flex items-center justify-center gap-2 rounded-full bg-[#D10E63]/[0.08] px-5 py-2.5 text-sm font-bold text-[#A80B50]"
                      >
                        <Check className="h-4 w-4" strokeWidth={3} />
                        {t.added}
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Skills reveal */}
                <AnimatePresence>
                  {phase === 'done' && (
                    <motion.div
                      initial={reduceMotion ? false : { opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease }}
                      className="overflow-hidden"
                    >
                      <p className="mb-3 mt-5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#5F594F]">
                        {t.skillsTitle}
                      </p>
                      <ul className="flex flex-wrap gap-2">
                        {mission.skills.map((skill, i) => (
                          <motion.li
                            key={skill}
                            initial={reduceMotion ? false : { opacity: 0, y: 8, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.3, ease, delay: reduceMotion ? 0 : 0.05 * i }}
                            className="rounded-full border border-[#D10E63]/25 bg-[#D10E63]/[0.05] px-3 py-1.5 text-xs font-semibold text-[#A80B50]"
                          >
                            {skill}
                          </motion.li>
                        ))}
                      </ul>

                      <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-[#E4DDCE] bg-[#F3EFE6] p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-2 text-sm font-bold text-[#1C1A17]">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D10E63] text-[#FBF9F3]">
                            <Check className="h-3 w-3" strokeWidth={3} />
                          </span>
                          {t.ready}
                        </div>
                        <a
                          href="/decouvrir"
                          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D10E63] px-5 py-2.5 text-sm font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2"
                        >
                          {t.entrust}
                          <ArrowRight className="h-4 w-4" />
                        </a>
                      </div>
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
