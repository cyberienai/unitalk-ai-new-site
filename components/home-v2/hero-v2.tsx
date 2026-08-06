'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Calendar, Check, Clock, Layers, Loader2, Mail, Phone, Target } from 'lucide-react'
import { Kicker } from '@/components/home/section-kicker'
import { CtaButton } from '@/components/ui/cta-button'

const T = {
  fr: {
    eyebrow: 'Il vous manque quelqu’un',
    readyLead: 'Votre Collaborateur IA sait déjà',
    missions: [
      'traiter vos emails',
      'répondre à vos appels',
      'trouver vos prospects',
      'mettre à jour votre CRM',
      'préparer vos devis',
      'créer vos présentations',
      'gérer votre support',
      'transcrire vos réunions',
      'rédiger vos comptes rendus',
      'générer vos visuels',
    ],
    almaLeadPre: 'Parlez à ',
    almaName: 'Alma',
    almaLeadPost:
      '. Elle analyse votre entreprise et recrute le Collaborateur IA adapté à votre organisation.',
    cta: 'Parler à Alma',
    proofs: ['Essai gratuit 7 jours sans CB', 'Hébergé en France', 'Mis en service par Alma'],
    // En-tête de la carte pendant la préparation (l'avatar est celui d'Alma)
    almaPreparing: 'prépare Emma pour sa mission',
    // Étapes racontées dans la carte — la mission est le pivot du recrutement
    prepSteps: [
      'Analyse de votre entreprise',
      'Mission : traiter vos emails',
      'Préparation d’Emma',
      'Arrivée dans votre Organisation',
    ],
    missionDetail: 'Résultat attendu, règles et validations précisés par Alma.',
    analyzeCaption: 'Sources publiques analysées',
    analyzeSteps: ['Produits', 'Tarifs', 'Services', 'FAQ', 'Blog', 'LinkedIn'],
    // Visual — la fiche vivante d'Emma (le résultat)
    ficheName: 'Emma',
    ficheRole: 'Collaboratrice IA · Assistante de direction',
    ficheReadySub: 'Contexte, compétences et applications préparés.',
    ficheMissionLabel: 'Mission',
    ficheMission: 'Traiter vos emails',
    joinWorkspace: 'Rejoindre le Workspace',
    sharedContextLabel: 'Contexte partagé',
    sharedContext: ['Produits', 'Clients', 'Processus', 'Tarifs'],
    statusLabel: 'En poste',
    contact: [
      { icon: Mail, label: 'emma@solvea.fr' },
      { icon: Phone, label: '+33 1 84 80 24 12' },
      { icon: Calendar, label: 'Agenda connecté' },
    ],
    expertisesLabel: 'Expertises',
    expertises: ['Agenda', 'Réunions', 'Reporting', 'Emails', 'Téléphone'],
    activityLabel: 'En ce moment',
    activities: [
      { label: 'Prépare le comité de direction de lundi', status: 'live' },
      { label: 'A transmis le compte rendu de la réunion d’équipe', status: 'done' },
      { label: 'Organise les rendez-vous de la semaine', status: 'upcoming' },
    ],
    doneLabel: 'Terminé',
    liveLabel: 'En cours',
    upcomingLabel: 'À venir',
  },
  en: {
    eyebrow: 'Someone is missing',
    readyLead: 'Your AI Collaborator already knows how to',
    missions: [
      'handle your emails',
      'answer your calls',
      'find your prospects',
      'update your CRM',
      'prepare your quotes',
      'create your presentations',
      'manage your support',
      'transcribe your meetings',
      'write your meeting notes',
      'generate your visuals',
    ],
    almaLeadPre: 'Talk to ',
    almaName: 'Alma',
    almaLeadPost:
      '. She analyzes your company and recruits the AI Collaborator that fits your organization.',
    cta: 'Talk to Alma',
    proofs: ['7-day free trial, no card', 'Hosted in France', 'Deployed by Alma'],
    // Card header while preparing (the avatar is Alma's)
    almaPreparing: 'preparing Emma for her mission',
    // Steps told inside the card — the mission is the pivot of the recruitment
    prepSteps: [
      'Analyzing your company',
      'Mission: handle your emails',
      'Preparing Emma',
      'Joining your Organization',
    ],
    missionDetail: 'Expected outcome, rules and approvals defined by Alma.',
    analyzeCaption: 'Public sources analyzed',
    analyzeSteps: ['Products', 'Pricing', 'Services', 'FAQ', 'Blog', 'LinkedIn'],
    // Visual — Emma's live profile (the outcome)
    ficheName: 'Emma',
    ficheRole: 'AI Collaborator · Executive assistant',
    ficheReadySub: 'Context, skills and apps ready.',
    ficheMissionLabel: 'Mission',
    ficheMission: 'Handle your emails',
    joinWorkspace: 'Join the Workspace',
    sharedContextLabel: 'Shared context',
    sharedContext: ['Products', 'Clients', 'Processes', 'Pricing'],
    statusLabel: 'Active',
    contact: [
      { icon: Mail, label: 'emma@solvea.fr' },
      { icon: Phone, label: '+33 1 84 80 24 12' },
      { icon: Calendar, label: 'Calendar connected' },
    ],
    expertisesLabel: 'Expertise',
    expertises: ['Calendar', 'Meetings', 'Reporting', 'Emails', 'Phone'],
    activityLabel: 'Right now',
    activities: [
      { label: 'Preparing Monday’s leadership meeting', status: 'live' },
      { label: 'Sent the team meeting minutes', status: 'done' },
      { label: 'Organizing this week’s appointments', status: 'upcoming' },
    ],
    doneLabel: 'Done',
    liveLabel: 'In progress',
    upcomingLabel: 'Upcoming',
  },
} as const

const ease = [0.22, 1, 0.36, 1] as const

type Phase = 'analyzing' | 'mission' | 'preparing' | 'ready'

export function HeroV2({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = T[lang]
  const reduceMotion = useReducedMotion()

  // Verbes rotatifs du titre.
  // Ordre mélangé (différent à chaque visite) sans répétition immédiate d'un item,
  // via une file d'attente reconstruite quand elle est vide.
  const [missionIndex, setMissionIndex] = useState(0)
  const missionQueue = useRef<number[]>([])
  // Réserve la largeur du conteneur sur le mot le plus long, calculé dynamiquement
  // (reste juste si la liste change).
  const longestMission = t.missions.reduce((a, b) => (b.length > a.length ? b : a), '')
  useEffect(() => {
    missionQueue.current = []
    const n = t.missions.length
    if (n <= 1) return
    // Fisher-Yates ; on évite que le prochain premier item soit celui affiché.
    const buildQueue = (avoid: number) => {
      const arr = Array.from({ length: n }, (_, i) => i)
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
      }
      if (arr[0] === avoid) [arr[0], arr[1]] = [arr[1], arr[0]]
      return arr
    }
    const id = setInterval(() => {
      setMissionIndex((prev) => {
        if (missionQueue.current.length === 0) missionQueue.current = buildQueue(prev)
        return missionQueue.current.shift() as number
      })
    }, 2800)
    return () => clearInterval(id)
  }, [reduceMotion, t.missions])

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
      timers.push(setTimeout(() => setAnalyzeStep(i + 1), 380 * (i + 1)))
    })
    const afterAnalyze = 380 * t.analyzeSteps.length + 600
    timers.push(setTimeout(() => setPhase('mission'), afterAnalyze))
    timers.push(setTimeout(() => setPhase('preparing'), afterAnalyze + 1500))
    timers.push(setTimeout(() => setPhase('ready'), afterAnalyze + 3000))
    return () => timers.forEach(clearTimeout)
  }, [reduceMotion, lang, t.analyzeSteps])

  const intro = phase !== 'ready'
  // Étape courante du stepper (0 → 2 pendant l'intro, 4 = tout terminé une fois Emma arrivée)
  const currentStep = phase === 'analyzing' ? 0 : phase === 'mission' ? 1 : phase === 'preparing' ? 2 : 4
  const analyzeCount = Math.min(analyzeStep, t.analyzeSteps.length)
  // Progression globale : l'analyse remplit le premier quart, puis chaque étape avance la barre
  const overallPct =
    phase === 'analyzing'
      ? (analyzeCount / t.analyzeSteps.length) * 25
      : phase === 'mission'
        ? 50
        : phase === 'preparing'
          ? 75
          : 100

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
            {/* Le mot invisible réserve la largeur du plus long verbe → conteneur stable. */}
            <span className="relative inline-block align-top text-[#D10E63]">
              <span className="invisible" aria-hidden="true">
                {longestMission}
              </span>
              <AnimatePresence initial={false}>
                <motion.span
                  key={missionIndex}
                  initial={reduceMotion ? false : { opacity: 0, y: '0.32em' }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: '-0.32em' }}
                  transition={reduceMotion ? { duration: 0 } : { duration: 0.32, ease: 'easeInOut' }}
                  className="absolute inset-0 block whitespace-nowrap"
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
                      <p className="truncate text-[12px] font-medium leading-tight text-[#A49E92]">{t.almaPreparing}</p>
                    </div>
                    <Loader2 className="h-4 w-4 shrink-0 animate-spin text-[#F0658F]" aria-hidden="true" />
                  </div>

                  {/* Stepper : les 4 étapes du recrutement, pivotées autour de la mission */}
                  <ol className="mt-5 flex flex-1 flex-col justify-center gap-2.5">
                    {t.prepSteps.map((label, i) => {
                      const done = currentStep > i
                      const active = currentStep === i
                      return (
                        <li
                          key={label}
                          className={`rounded-2xl border px-3.5 py-3 transition-colors duration-500 ${
                            active
                              ? 'border-[#F0658F]/30 bg-[#D10E63]/[0.08]'
                              : done
                                ? 'border-white/[0.08] bg-white/[0.02]'
                                : 'border-transparent'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center" aria-hidden="true">
                              {done ? (
                                <motion.span
                                  initial={reduceMotion ? false : { scale: 0.4, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  transition={{ duration: 0.3, ease }}
                                  className="flex h-5 w-5 items-center justify-center rounded-full bg-[#4ADE80]/15"
                                >
                                  <Check className="h-3 w-3 text-[#5FE38F]" strokeWidth={3.5} />
                                </motion.span>
                              ) : active ? (
                                <Loader2 className="h-4 w-4 animate-spin text-[#F0658F]" />
                              ) : (
                                <span className="h-2 w-2 rounded-full border border-white/20" />
                              )}
                            </span>
                            <span
                              className={`flex-1 text-[12.5px] font-semibold leading-tight ${
                                active ? 'text-[#F6F1E8]' : done ? 'text-[#D8D2C6]' : 'text-[#948D7F]'
                              }`}
                            >
                              {label}
                            </span>
                          </div>

                          {/* Sous-contenu de l'étape 1 : les sources publiques scannées */}
                          {i === 0 && (active || done) && (
                            <div className="mt-3 pl-7">
                              <div className="mb-2 flex items-center justify-between">
                                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#B0A99B]">
                                  {t.analyzeCaption}
                                </span>
                                <span className="font-mono text-[11px] font-bold tabular-nums text-[#F58AAB]">
                                  {done ? t.analyzeSteps.length : analyzeCount}
                                  <span className="text-[#948D7F]">/{t.analyzeSteps.length}</span>
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                {t.analyzeSteps.map((source, si) => {
                                  const scanned = done || analyzeStep > si
                                  return (
                                    <span
                                      key={source}
                                      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium transition-colors duration-300 ${
                                        scanned
                                          ? 'border-[#F0658F]/25 bg-[#D10E63]/[0.1] text-[#F58AAB]'
                                          : 'border-white/[0.08] text-[#7C766B]'
                                      }`}
                                    >
                                      {scanned && <Check className="h-2.5 w-2.5" strokeWidth={3} aria-hidden="true" />}
                                      {source}
                                    </span>
                                  )
                                })}
                              </div>
                            </div>
                          )}

                          {/* Sous-contenu de l'étape 2 : ce qu'Alma précise pour la mission */}
                          {i === 1 && (active || done) && (
                            <p className="mt-2 pl-7 text-[11px] leading-snug text-[#A49E92]">{t.missionDetail}</p>
                          )}
                        </li>
                      )
                    })}
                  </ol>

                  {/* Barre de progression globale de la préparation */}
                  <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/[0.07]" aria-hidden="true">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-[#D10E63] to-[#F0658F]"
                      initial={false}
                      animate={{ width: `${overallPct}%` }}
                      transition={{ duration: 0.5, ease }}
                    />
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
                      <motion.span
                        className="h-1.5 w-1.5 rounded-full bg-[#4ADE80]"
                        aria-hidden="true"
                        animate={reduceMotion ? undefined : { opacity: [1, 0.4, 1], scale: [1, 0.85, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      />
                      {t.statusLabel}
                    </span>
                  </div>

                  <div className="relative flex flex-col gap-4 p-5">
                    {/* Mission : le pivot du recrutement, mis en avant sur la fiche d'Emma */}
                    <motion.div
                      initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease, delay: 0.12 }}
                      className="rounded-2xl border border-[#F0658F]/25 bg-[#D10E63]/[0.08] p-3.5"
                    >
                      <div className="flex items-center gap-2">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D10E63]/20" aria-hidden="true">
                          <Target className="h-3 w-3 text-[#F58AAB]" strokeWidth={2.5} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#F58AAB]">
                            {t.ficheMissionLabel}
                          </p>
                          <p className="truncate text-[13px] font-semibold text-[#F6F1E8]">{t.ficheMission}</p>
                        </div>
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#4ADE80]/15" aria-hidden="true">
                          <Check className="h-2.5 w-2.5 text-[#5FE38F]" strokeWidth={3.5} />
                        </span>
                      </div>
                      <p className="mt-2 text-[11px] leading-snug text-[#CDBFC4]">{t.ficheReadySub}</p>
                    </motion.div>

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
                      <p className="mb-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#B0A99B]">{t.expertisesLabel}</p>
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
                        <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#B0A99B]">{t.activityLabel}</span>
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
                        {t.activities.map((task) => {
                          const live = task.status === 'live'
                          const done = task.status === 'done'
                          return (
                            <li
                              key={task.label}
                              className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[11px] font-medium ${
                                live
                                  ? 'border border-[#F0658F]/40 bg-[#D10E63]/[0.14] text-[#F6F1E8]'
                                  : done
                                    ? 'text-[#B7B1A6]'
                                    : 'text-[#CFC9BD]'
                              }`}
                            >
                              <span className="flex h-4 w-4 shrink-0 items-center justify-center" aria-hidden="true">
                                {live ? (
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
                                ) : done ? (
                                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#4ADE80]/15">
                                    <Check className="h-2.5 w-2.5 text-[#5FE38F]" strokeWidth={3.5} />
                                  </span>
                                ) : (
                                  <Clock className="h-3.5 w-3.5 text-[#8F887C]" strokeWidth={2.25} />
                                )}
                              </span>
                              <span className="flex-1 truncate">{task.label}</span>
                              <span
                                className={`shrink-0 font-mono text-[8px] font-bold uppercase tracking-[0.1em] ${
                                  live ? 'text-[#F0658F]' : done ? 'text-[#5FE38F]' : 'text-[#8F887C]'
                                }`}
                              >
                                {live ? t.liveLabel : done ? t.doneLabel : t.upcomingLabel}
                              </span>
                            </li>
                          )
                        })}
                      </ul>
                    </div>

                    {/* CTA final : Emma rejoint le Workspace de l'organisation */}
                    <motion.a
                      href="/decouvrir"
                      initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease, delay: 0.24 }}
                      className="group/cta flex items-center justify-center gap-2 rounded-xl bg-[#D10E63] px-4 py-2.5 text-[13px] font-bold text-[#FBF9F3] transition-colors hover:bg-[#B60C56]"
                    >
                      {t.joinWorkspace}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-0.5" aria-hidden="true" />
                    </motion.a>
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
