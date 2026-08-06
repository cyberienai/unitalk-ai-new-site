'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Calendar, Check, Layers, Loader2, Mail, Phone } from 'lucide-react'
import { Kicker } from '@/components/home/section-kicker'
import { CtaButton } from '@/components/ui/cta-button'

const T = {
  fr: {
    eyebrow: 'Il vous manque quelqu’un',
    readyLead: 'Votre Collaborateur IA est prêt à',
    missions: [
      'répondre à vos clients',
      'trouver de nouveaux prospects',
      'préparer vos devis',
      'répondre au téléphone',
      'organiser vos réunions',
      'transcrire vos réunions',
      'envoyer vos emails',
      'créer vos contenus',
      'mettre à jour votre CRM',
      'automatiser vos tâches',
    ],
    almaLeadPre: 'Parlez à ',
    almaName: 'Alma',
    almaLeadPost:
      '. Elle analyse votre entreprise, puis recrute le Collaborateur IA dont vous avez besoin.',
    cta: 'Recruter mon Collaborateur IA',
    proofs: ['Essai gratuit 7 jours', 'Sans carte bancaire', 'Configuré par Alma'],
    // Séquence Alma (avant l'arrivée d'Emma)
    analyzeLabel: 'Analyse de solvea.fr',
    analyzeCaption: 'Sources publiques analysées',
    analyzeSteps: ['Produits', 'Tarifs', 'Services', 'FAQ', 'LinkedIn'],
    buildingLabel: 'Construction du contexte d’entreprise…',
    creatingLabel: 'Création d’Emma…',
    // Visual — la fiche vivante d'Emma (le résultat)
    ficheName: 'Emma',
    ficheRole: 'Collaboratrice IA · Assistante de direction',
    sharedContextLabel: 'Contexte partagé',
    sharedContext: ['Produits', 'Clients', 'Processus', 'Tarifs'],
    statusLabel: 'En poste',
    contact: [
      { icon: Mail, label: 'emma@solvea.fr' },
      { icon: Phone, label: '+33 1 84 80 24 12' },
      { icon: Calendar, label: 'Agenda connecté' },
    ],
    expertisesLabel: 'Expertises',
    expertises: ['Agenda', 'Réunions', 'Reporting', 'Emails'],
    activityLabel: 'En ce moment',
    activities: [
      'Prépare le comité de direction de lundi',
      'A répondu à 3 demandes clients',
      'Planifie un point avec un prospect',
    ],
    doneLabel: 'Terminé',
    liveLabel: 'En cours',
  },
  en: {
    eyebrow: 'Someone is missing',
    readyLead: 'Your AI Collaborator is ready to',
    missions: [
      'answer your customers',
      'find new prospects',
      'prepare your quotes',
      'answer the phone',
      'organize your meetings',
      'transcribe your meetings',
      'send your emails',
      'create your content',
      'update your CRM',
      'automate your tasks',
    ],
    almaLeadPre: 'Talk to ',
    almaName: 'Alma',
    almaLeadPost:
      '. She analyzes your company, then recruits the AI Collaborator you need.',
    cta: 'Recruit my AI Collaborator',
    proofs: ['7-day free trial', 'No credit card', 'Set up by Alma'],
    // Alma sequence (before Emma appears)
    analyzeLabel: 'Analyzing solvea.fr',
    analyzeCaption: 'Public sources analyzed',
    analyzeSteps: ['Products', 'Pricing', 'Services', 'FAQ', 'LinkedIn'],
    buildingLabel: 'Building the company context…',
    creatingLabel: 'Creating Emma…',
    // Visual — Emma's live profile (the outcome)
    ficheName: 'Emma',
    ficheRole: 'AI Collaborator · Executive assistant',
    sharedContextLabel: 'Shared context',
    sharedContext: ['Products', 'Clients', 'Processes', 'Pricing'],
    statusLabel: 'Active',
    contact: [
      { icon: Mail, label: 'emma@solvea.fr' },
      { icon: Phone, label: '+33 1 84 80 24 12' },
      { icon: Calendar, label: 'Calendar connected' },
    ],
    expertisesLabel: 'Expertise',
    expertises: ['Calendar', 'Meetings', 'Reporting', 'Emails'],
    activityLabel: 'Right now',
    activities: [
      'Preparing Monday’s leadership meeting',
      'Answered 3 customer requests',
      'Scheduling a call with a prospect',
    ],
    doneLabel: 'Done',
    liveLabel: 'In progress',
  },
} as const

const ease = [0.22, 1, 0.36, 1] as const

// Progression des tâches d'Emma : 0,1,2 = tâche active, 3 = tout terminé (hold), puis reboucle.
const TASK_STEPS = 4
const STEP_MS = 2200

type Phase = 'analyzing' | 'building' | 'creating' | 'ready'

export function HeroV2({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = T[lang]
  const reduceMotion = useReducedMotion()

  // Verbes rotatifs du titre
  const [missionIndex, setMissionIndex] = useState(0)
  useEffect(() => {
    if (reduceMotion) return
    const id = setInterval(() => {
      setMissionIndex((i) => (i + 1) % t.missions.length)
    }, 2200)
    return () => clearInterval(id)
  }, [reduceMotion, t.missions.length])

  // Séquence Alma → Emma : on montre qu'Emma hérite du contexte construit par Alma
  const [phase, setPhase] = useState<Phase>(reduceMotion ? 'ready' : 'analyzing')
  const [analyzeStep, setAnalyzeStep] = useState(reduceMotion ? 99 : 0)
  useEffect(() => {
    if (reduceMotion) {
      setPhase('ready')
      setAnalyzeStep(99)
      return
    }
    setPhase('analyzing')
    setAnalyzeStep(0)
    const timers: ReturnType<typeof setTimeout>[] = []
    t.analyzeSteps.forEach((_, i) => {
      timers.push(setTimeout(() => setAnalyzeStep(i + 1), 430 * (i + 1)))
    })
    const afterAnalyze = 430 * t.analyzeSteps.length + 520
    timers.push(setTimeout(() => setPhase('building'), afterAnalyze))
    timers.push(setTimeout(() => setPhase('creating'), afterAnalyze + 1150))
    timers.push(setTimeout(() => setPhase('ready'), afterAnalyze + 2300))
    return () => timers.forEach(clearTimeout)
  }, [reduceMotion, lang, t.analyzeSteps])

  // Progression des tâches d'Emma — démarre une fois Emma en poste
  const [taskStep, setTaskStep] = useState(reduceMotion ? TASK_STEPS - 1 : 0)
  useEffect(() => {
    if (reduceMotion) {
      setTaskStep(TASK_STEPS - 1)
      return
    }
    if (phase !== 'ready') {
      setTaskStep(0)
      return
    }
    setTaskStep(0)
    const id = setInterval(() => {
      setTaskStep((s) => (s + 1) % TASK_STEPS)
    }, STEP_MS)
    return () => clearInterval(id)
  }, [reduceMotion, phase])

  const allDone = taskStep >= t.activities.length
  const intro = phase !== 'ready'
  const introLabel = phase === 'analyzing' ? t.analyzeLabel : phase === 'building' ? t.buildingLabel : t.creatingLabel
  const analyzeCount = Math.min(analyzeStep, t.analyzeSteps.length)
  const analyzePct = phase === 'analyzing' ? (analyzeCount / t.analyzeSteps.length) * 100 : 100

  const enter = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.75, ease, delay: reduceMotion ? 0 : delay },
  })

  return (
    <section className="relative flex min-h-0 items-center overflow-hidden bg-[#F3EFE6] pb-14 pt-24 sm:min-h-[92svh] sm:pb-16 sm:pt-28">
      {/* subtle editorial backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 -top-24 h-[36rem] w-[36rem] rounded-full bg-[#D10E63]/[0.06] blur-3xl" />
        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(#1C1A17_1px,transparent_1px),linear-gradient(90deg,#1C1A17_1px,transparent_1px)] [background-size:64px_64px]" />
      </div>

      <div className="editorial-shell relative grid items-center gap-10 sm:gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
        <div className="max-w-2xl">
          <motion.div {...enter(0.04)} className="mb-5 flex justify-center sm:mb-6 sm:justify-start">
            <Kicker>{t.eyebrow}</Kicker>
          </motion.div>

          <motion.h1
            {...enter(0.1)}
            className="text-balance text-center font-sf text-[clamp(1.9rem,4.2vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.05em] text-[#1C1A17] sm:text-left"
          >
            <span className="block">{t.readyLead}</span>
            <span className="relative block min-h-[2.1em]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={missionIndex}
                  initial={reduceMotion ? false : { opacity: 0, y: '0.35em' }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: '-0.35em' }}
                  transition={{ duration: 0.4, ease }}
                  className="block text-[#D10E63]"
                >
                  {t.missions[missionIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>

          <motion.p {...enter(0.24)} className="mx-auto mt-4 max-w-xl text-balance text-center text-base leading-relaxed text-[#4E483F] sm:mx-0 sm:text-left md:text-lg">
            {t.almaLeadPre}
            <span className="whitespace-nowrap font-semibold text-[#1C1A17]">
              <Image
                src="/alma-avatar.png"
                alt=""
                width={22}
                height={22}
                className="mr-1.5 inline-block h-[1.15em] w-[1.15em] rounded-full object-cover align-[-0.22em] ring-1 ring-[#D10E63]/25"
              />
              {t.almaName}
            </span>
            {t.almaLeadPost}
          </motion.p>

          <motion.div {...enter(0.28)} className="mt-8 flex flex-col items-center gap-4 sm:items-start">
            <CtaButton href="/decouvrir">
              {t.cta}
              <ArrowRight className="h-4 w-4" />
            </CtaButton>

            <div className="flex flex-row flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-xs font-medium text-[#6B6560] sm:justify-start">
              {t.proofs.map((proof) => (
                <span key={proof} className="flex items-center gap-1.5 whitespace-nowrap">
                  <Check className="h-3.5 w-3.5 text-[#D10E63]" strokeWidth={2.5} />
                  {proof}
                </span>
              ))}
            </div>

          </motion.div>
        </div>

        {/* Visual — Alma construit le contexte, puis Emma prend son poste */}
        <motion.div {...enter(0.2)} className="group relative mx-auto w-full max-w-md">
          {/* Halo aurora bi-teinte derrière la carte */}
          <div aria-hidden="true" className="pointer-events-none absolute -inset-16 -z-10">
            <motion.div
              className="absolute left-[42%] top-[46%] h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D10E63]/40 blur-[90px]"
              animate={reduceMotion ? undefined : { x: ['-6%', '8%', '-6%'], y: ['-4%', '6%', '-4%'], scale: [1, 1.12, 1], opacity: [0.5, 0.85, 0.5] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute right-[10%] top-[10%] h-[55%] w-[55%] rounded-full bg-[#F2A65A]/25 blur-[80px]"
              animate={reduceMotion ? undefined : { x: ['4%', '-8%', '4%'], y: ['2%', '10%', '2%'], scale: [1.05, 0.92, 1.05], opacity: [0.35, 0.6, 0.35] }}
              transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute bottom-[6%] left-[18%] h-[45%] w-[45%] rounded-full bg-[#F0658F]/30 blur-[70px]"
              animate={reduceMotion ? undefined : { x: ['0%', '10%', '0%'], y: ['0%', '-8%', '0%'], opacity: [0.3, 0.55, 0.3] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />
          </div>

          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#17130F] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.65)] transition-transform duration-500 group-hover:-translate-y-1.5">
            {/* liseré lumineux haut + grain radial */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F0658F]/60 to-transparent" />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-70"
              style={{ background: 'radial-gradient(120% 80% at 85% -10%, rgba(209,14,99,0.16), transparent 55%)' }}
            />
            {/* fine grille technique */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  'linear-gradient(to right, #F6F1E8 1px, transparent 1px), linear-gradient(to bottom, #F6F1E8 1px, transparent 1px)',
                backgroundSize: '34px 34px',
                maskImage: 'radial-gradient(120% 90% at 80% 0%, black, transparent 70%)',
                WebkitMaskImage: 'radial-gradient(120% 90% at 80% 0%, black, transparent 70%)',
              }}
            />
            {/* reflet lumineux qui balaie la carte */}
            {!reduceMotion && (
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-y-8 w-1/3 -skew-x-12"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(246,241,232,0.10), transparent)' }}
                initial={{ left: '-40%' }}
                animate={{ left: ['-40%', '130%'] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2.5 }}
              />
            )}

            <AnimatePresence mode="wait" initial={false}>
              {intro ? (
                /* ── Séquence Alma : analyse → contexte → création d'Emma ── */
                <motion.div
                  key="alma-intro"
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease }}
                  className="relative flex min-h-[520px] flex-col p-5"
                >
                  <div className="flex items-center gap-3.5 border-b border-white/[0.08] pb-4">
                    <span className="relative shrink-0">
                      <span aria-hidden="true" className="absolute -inset-1 rounded-full bg-[#D10E63]/30 blur-md" />
                      <Image
                        src="/alma-avatar.png"
                        alt=""
                        width={44}
                        height={44}
                        className="relative rounded-full object-cover ring-2 ring-[#F0658F]/40"
                        style={{ height: 44, width: 44 }}
                      />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-sf text-base font-bold leading-tight text-[#F6F1E8]">{t.almaName}</p>
                      <p className="truncate text-[12px] font-medium leading-tight text-[#A49E92]">{introLabel}</p>
                    </div>
                    <Loader2 className="h-4 w-4 shrink-0 animate-spin text-[#F0658F]" aria-hidden="true" />
                  </div>

                  {/* Légende + compteur de sources analysées */}
                  <div className="mt-5 flex items-center justify-between">
                    <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#8A8175]">{t.analyzeCaption}</p>
                    <span className="font-mono text-[11px] font-bold tabular-nums text-[#F58AAB]">
                      {analyzeCount}
                      <span className="text-[#6E685E]">/{t.analyzeSteps.length}</span>
                    </span>
                  </div>

                  {/* Checklist des sources publiques analysées — centrée pour occuper l'espace */}
                  <ul className="mt-3 flex flex-1 flex-col justify-center gap-2">
                    {t.analyzeSteps.map((step, i) => {
                      const checked = analyzeStep > i
                      return (
                        <li
                          key={step}
                          className={`flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-[12px] font-medium transition-colors duration-500 ${
                            checked
                              ? 'border-white/[0.08] bg-white/[0.03] text-[#D8D2C6]'
                              : 'border-transparent text-[#6E685E]'
                          }`}
                        >
                          <span className="flex h-4 w-4 shrink-0 items-center justify-center" aria-hidden="true">
                            {checked ? (
                              <motion.span
                                initial={reduceMotion ? false : { scale: 0.4, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.3, ease }}
                                className="flex h-4 w-4 items-center justify-center rounded-full bg-[#4ADE80]/15"
                              >
                                <Check className="h-2.5 w-2.5 text-[#5FE38F]" strokeWidth={3.5} />
                              </motion.span>
                            ) : (
                              <span className="h-1.5 w-1.5 rounded-full border border-white/20" />
                            )}
                          </span>
                          <span className="flex-1 truncate">{step}</span>
                        </li>
                      )
                    })}
                  </ul>

                  {/* Barre de progression de l'analyse */}
                  <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/[0.07]" aria-hidden="true">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-[#D10E63] to-[#F0658F]"
                      initial={false}
                      animate={{ width: `${analyzePct}%` }}
                      transition={{ duration: 0.5, ease }}
                    />
                  </div>

                  {/* Statut de construction du contexte / création d'Emma */}
                  <div className="mt-4 flex items-center gap-2.5 rounded-2xl border border-white/[0.08] bg-black/25 px-3.5 py-3">
                    <span className="flex items-center gap-[3px]" aria-hidden="true">
                      {[0, 1, 2].map((d) => (
                        <motion.span
                          key={d}
                          className="h-1.5 w-1.5 rounded-full bg-[#F0658F]"
                          animate={reduceMotion ? undefined : { opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity, delay: d * 0.18 }}
                        />
                      ))}
                    </span>
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={introLabel}
                        initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
                        transition={{ duration: 0.3, ease }}
                        className="text-[12px] font-semibold text-[#F6F1E8]"
                      >
                        {introLabel}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </motion.div>
              ) : (
                /* ── Emma en poste (le résultat) ── */
                <motion.div
                  key="emma-card"
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease }}
                >
                  {/* En-tête : Emma, identité + statut en poste */}
                  <div className="relative flex items-center gap-3.5 border-b border-white/[0.08] bg-white/[0.02] p-5">
                    <span className="relative shrink-0">
                      <span aria-hidden="true" className="absolute -inset-1 rounded-full bg-[#D10E63]/30 blur-md" />
                      <Image
                        src="/images/emma-avatar.png"
                        alt=""
                        width={52}
                        height={52}
                        className="relative rounded-full object-cover ring-2 ring-[#F0658F]/40"
                        style={{ height: 52, width: 52 }}
                      />
                      <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center" aria-hidden="true">
                        <motion.span
                          className="absolute h-3.5 w-3.5 rounded-full bg-[#4ADE80]/40"
                          animate={reduceMotion ? undefined : { scale: [1, 1.9], opacity: [0.6, 0] }}
                          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                        />
                        <span className="h-2.5 w-2.5 rounded-full border-2 border-[#17130F] bg-[#4ADE80]" />
                      </span>
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-sf text-xl font-bold leading-tight text-[#F6F1E8]">{t.ficheName}</p>
                      <p className="truncate text-[12px] font-medium leading-tight text-[#A49E92]">{t.ficheRole}</p>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#4ADE80]/25 bg-[#4ADE80]/[0.1] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-[#5FE38F]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#4ADE80]" aria-hidden="true" />
                      {t.statusLabel}
                    </span>
                  </div>

                  <div className="relative flex flex-col gap-4 p-5">
                    {/* Coordonnées : Emma est une vraie coéquipière */}
                    <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                      {t.contact.map((c, i) => {
                        const Icon = c.icon
                        return (
                          <li
                            key={c.label}
                            className={`flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1.5 text-[11px] font-medium text-[#D8D2C6] ${i === 0 ? 'sm:col-span-2' : ''}`}
                          >
                            <Icon className="h-3.5 w-3.5 shrink-0 text-[#F0658F]" aria-hidden="true" />
                            <span className="truncate">{c.label}</span>
                          </li>
                        )
                      })}
                    </ul>

                    {/* Contexte partagé : Emma hérite du contexte construit par Alma */}
                    <div className="rounded-2xl border border-[#F0658F]/20 bg-[#D10E63]/[0.06] p-3.5">
                      <p className="mb-2 flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#F58AAB]">
                        <Layers className="h-3 w-3" aria-hidden="true" />
                        {t.sharedContextLabel}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {t.sharedContext.map((c) => (
                          <span
                            key={c}
                            className="rounded-full border border-white/[0.1] bg-white/[0.05] px-2 py-0.5 text-[10px] font-semibold text-[#E4DED2]"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Expertises */}
                    <div>
                      <p className="mb-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#8A8175]">{t.expertisesLabel}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {t.expertises.map((e) => (
                          <span
                            key={e}
                            className="rounded-full border border-[#F0658F]/30 bg-[#D10E63]/[0.12] px-2 py-0.5 text-[10px] font-semibold text-[#F58AAB]"
                          >
                            {e}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Activité en direct — l'accroche : elle travaille déjà */}
                    <div className="rounded-2xl border border-white/[0.08] bg-black/25 p-3.5">
                      <div className="mb-2.5 flex items-center justify-between">
                        <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#8A8175]">{t.activityLabel}</span>
                        <span className="flex h-3 items-end gap-[2px]" aria-hidden="true">
                          {[6, 11, 8].map((h, i) => (
                            <motion.span
                              key={i}
                              className="w-[2px] rounded-full bg-[#F0658F]"
                              style={{ height: h }}
                              animate={reduceMotion ? undefined : { scaleY: [1, 0.4, 1] }}
                              transition={{ duration: 0.9, ease: 'easeInOut', repeat: Infinity, delay: i * 0.12 }}
                            />
                          ))}
                        </span>
                      </div>

                      <ul className="flex flex-col gap-1.5">
                        {t.activities.map((task, i) => {
                          const done = allDone || i < taskStep
                          const live = !allDone && i === taskStep
                          return (
                            <li
                              key={task}
                              className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[11px] font-medium transition-colors duration-500 ${
                                live
                                  ? 'bg-[#D10E63]/[0.14] text-[#F6F1E8]'
                                  : done
                                    ? 'text-[#D8D2C6]'
                                    : 'text-[#6E685E]'
                              }`}
                            >
                              <span className="flex h-4 w-4 shrink-0 items-center justify-center" aria-hidden="true">
                                {done ? (
                                  <motion.span
                                    initial={reduceMotion ? false : { scale: 0.4, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.35, ease }}
                                    className="flex h-4 w-4 items-center justify-center rounded-full bg-[#4ADE80]/15"
                                  >
                                    <Check className="h-2.5 w-2.5 text-[#5FE38F]" strokeWidth={3.5} />
                                  </motion.span>
                                ) : live ? (
                                  <span className="flex items-center gap-[2px]">
                                    {[0, 1, 2].map((d) => (
                                      <motion.span
                                        key={d}
                                        className="h-1 w-1 rounded-full bg-[#F0658F]"
                                        animate={reduceMotion ? undefined : { opacity: [0.3, 1, 0.3] }}
                                        transition={{ duration: 1, repeat: Infinity, delay: d * 0.18 }}
                                      />
                                    ))}
                                  </span>
                                ) : (
                                  <span className="h-1.5 w-1.5 rounded-full border border-white/20" />
                                )}
                              </span>
                              <span className="flex-1 truncate">{task}</span>
                              {(done || live) && (
                                <span
                                  className={`shrink-0 font-mono text-[8px] font-bold uppercase tracking-[0.1em] ${live ? 'text-[#F0658F]' : 'text-[#5FE38F]'}`}
                                >
                                  {live ? t.liveLabel : t.doneLabel}
                                </span>
                              )}
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
