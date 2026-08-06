'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { AppWindow, ArrowRight, Check, Globe, Loader2, Plus, ShieldCheck, Sparkles, Target, UserRound } from 'lucide-react'
import { Kicker } from '@/components/home/section-kicker'
import { CtaButton } from '@/components/ui/cta-button'

/**
 * Le hero raconte UN Collaborateur IA durable (Emma) qui développe ses
 * capacités mission après mission, plutôt qu'un recrutement à chaque tâche.
 *
 * Phase 0 (une seule fois par session) : Alma analyse l'entreprise (Solvea)
 * et construit le contexte partagé — ce qui prouve que les profils et
 * compétences ajoutés ensuite ne sont pas génériques. Un repère permanent
 * « Contexte Solvea actif » reste ensuite visible.
 *
 * Pour chaque mission, Alma : comprend la mission → vérifie qui peut la
 * prendre → équipe le Collaborateur compatible (profils métier, compétences,
 * applications) → attribue la mission. Elle ne prépare un nouveau poste que
 * lorsqu'aucun Collaborateur existant ne convient (scénario Chloé).
 */

const CONTEXT_KEY = 'unitalk_hero_context_seen'

// Le Collaborateur IA durable au cœur de la démonstration.
const HOLDER = {
  fr: { name: 'Emma', role: 'Assistante de direction', avatar: '/images/emma-avatar.png' },
  en: { name: 'Emma', role: 'Executive assistant', avatar: '/images/emma-avatar.png' },
} as const

type ItemKind = 'profil' | 'competence' | 'application'
type ItemStatus = 'installed' | 'new' | 'connected'

const JOURNEY = {
  fr: [
    {
      action: 'traiter vos emails',
      lines: ['traiter vos emails'],
      mission: 'Traiter vos emails',
      outcome: 'assigned',
      items: [
        { kind: 'profil', label: 'Assistante de direction', status: 'installed' },
        { kind: 'competence', label: 'Gestion des emails', status: 'new' },
        { kind: 'application', label: 'Outlook', status: 'connected' },
      ],
    },
    {
      action: 'préparer vos comptes rendus',
      lines: ['préparer vos', 'comptes rendus'],
      mission: 'Préparer vos comptes rendus',
      outcome: 'assigned',
      items: [
        { kind: 'profil', label: 'Assistante de direction', status: 'installed' },
        { kind: 'competence', label: 'Transcription de réunions', status: 'new' },
        { kind: 'competence', label: 'Rédaction de comptes rendus', status: 'new' },
        { kind: 'application', label: 'Microsoft Teams', status: 'connected' },
      ],
    },
    {
      action: 'organiser votre agenda',
      lines: ['organiser votre', 'agenda'],
      mission: 'Organiser votre agenda',
      outcome: 'assigned',
      items: [
        { kind: 'profil', label: 'Assistante de direction', status: 'installed' },
        { kind: 'competence', label: 'Gestion des disponibilités', status: 'installed' },
        { kind: 'competence', label: 'Planification d’agenda', status: 'new' },
        { kind: 'application', label: 'Google Agenda', status: 'connected' },
      ],
    },
    {
      action: 'trouver vos prospects',
      lines: ['trouver vos', 'prospects'],
      mission: 'Trouver vos prospects',
      outcome: 'newRole',
      newRole: {
        name: 'Chloé',
        role: 'Collaboratrice IA commerciale',
        avatar: '/images/chloe-avatar.png',
        reasons: ['Profil commercial distinct', 'Accès au CRM', 'Règles tarifaires', 'Suivi commercial régulier'],
      },
    },
  ],
  en: [
    {
      action: 'handle your emails',
      lines: ['handle your emails'],
      mission: 'Handle your emails',
      outcome: 'assigned',
      items: [
        { kind: 'profil', label: 'Executive assistant', status: 'installed' },
        { kind: 'competence', label: 'Email handling', status: 'new' },
        { kind: 'application', label: 'Outlook', status: 'connected' },
      ],
    },
    {
      action: 'prepare your meeting notes',
      lines: ['prepare your', 'meeting notes'],
      mission: 'Prepare your meeting notes',
      outcome: 'assigned',
      items: [
        { kind: 'profil', label: 'Executive assistant', status: 'installed' },
        { kind: 'competence', label: 'Meeting transcription', status: 'new' },
        { kind: 'competence', label: 'Minutes writing', status: 'new' },
        { kind: 'application', label: 'Microsoft Teams', status: 'connected' },
      ],
    },
    {
      action: 'organize your calendar',
      lines: ['organize your', 'calendar'],
      mission: 'Organize your calendar',
      outcome: 'assigned',
      items: [
        { kind: 'profil', label: 'Executive assistant', status: 'installed' },
        { kind: 'competence', label: 'Availability management', status: 'installed' },
        { kind: 'competence', label: 'Calendar planning', status: 'new' },
        { kind: 'application', label: 'Google Calendar', status: 'connected' },
      ],
    },
    {
      action: 'find your prospects',
      lines: ['find your', 'prospects'],
      mission: 'Find your prospects',
      outcome: 'newRole',
      newRole: {
        name: 'Chloé',
        role: 'Sales AI Collaborator',
        avatar: '/images/chloe-avatar.png',
        reasons: ['Distinct sales profile', 'CRM access', 'Pricing rules', 'Ongoing sales follow-up'],
      },
    },
  ],
} as const

// Phase 0 — analyse initiale de l'entreprise (jouée une fois par session).
const CONTEXT = {
  fr: {
    domain: 'solvea.fr',
    groups: [
      { title: 'Identité', sources: ['Données SIRENE', 'Mentions légales', 'DNS publics'] },
      { title: 'Activité', sources: ['Site et contenus publics', 'LinkedIn'] },
    ],
    built: ['Produits et services', 'Clients et marchés', 'Tarifs', 'Procédures publiques', 'Ton et identité visuelle'],
  },
  en: {
    domain: 'solvea.fr',
    groups: [
      { title: 'Identity', sources: ['SIRENE data', 'Legal notice', 'Public DNS'] },
      { title: 'Activity', sources: ['Website and public content', 'LinkedIn'] },
    ],
    built: ['Products and services', 'Customers and markets', 'Pricing', 'Public procedures', 'Tone and visual identity'],
  },
} as const

const T = {
  fr: {
    eyebrow: 'Il vous manque quelqu’un',
    readyLead: 'Votre Collaborateur IA est prêt à',
    almaLeadPre: 'Parlez à ',
    almaName: 'Alma',
    almaLeadPost: '. Elle comprend votre entreprise et le prépare pour les missions que vous lui confiez.',
    cta: 'Parler à Alma',
    proofs: ['Essai gratuit 7 jours sans CB', 'Hébergé en France', 'Mis en service par Alma'],
    capContext: 'Alma analyse votre entreprise',
    capReceived: 'Nouvelle mission',
    capExamine: 'Alma vérifie qui peut prendre cette mission',
    capEquip: 'Alma prépare',
    capRecommend: 'Alma vérifie qui peut prendre cette mission',
    missionLabel: 'Mission',
    examineQuestion: 'Qui peut la prendre en charge ?',
    profilCompatible: 'Profil compatible',
    profilIncompatible: 'Profil non compatible',
    equipHeading: 'reçoit ce qui lui manque',
    readyBadge: 'Prête',
    readyForMission: 'est prête pour cette mission',
    continueAlma: 'Continuer avec Alma',
    noneFit: 'Aucun Collaborateur IA actuel n’est adapté à ce rôle.',
    recommendHeading: 'Alma recommande un nouveau poste',
    newRoleBadge: 'Nouveau poste',
    kindName: { profil: 'Profil métier', competence: 'Compétence', application: 'Application' },
    status: {
      installed: { profil: 'Actif', competence: 'Active', application: 'Connecté' },
      new: { profil: 'Ajouté', competence: 'Ajoutée', application: 'Ajoutée' },
      connected: { profil: 'Connecté', competence: 'Connectée', application: 'Connecté' },
    },
    domainLabel: 'Domaine',
    contextIdentified: 'Solvea identifiée',
    contextIdentifiedSub: 'Activité, identité juridique et présence numérique vérifiées.',
    contextBuilding: 'Contexte partagé construit',
    contextReady: 'Le contexte de Solvea est prêt.',
    contextChip: 'Contexte Solvea actif',
  },
  en: {
    eyebrow: 'Someone is missing',
    readyLead: 'Your AI Collaborator is ready to',
    almaLeadPre: 'Talk to ',
    almaName: 'Alma',
    almaLeadPost: '. She understands your company and prepares it for the missions you hand off.',
    cta: 'Talk to Alma',
    proofs: ['7-day free trial, no card', 'Hosted in France', 'Deployed by Alma'],
    capContext: 'Alma analyzes your company',
    capReceived: 'New mission',
    capExamine: 'Alma checks who can take this on',
    capEquip: 'Alma prepares',
    capRecommend: 'Alma checks who can take this on',
    missionLabel: 'Mission',
    examineQuestion: 'Who can take it on?',
    profilCompatible: 'Compatible profile',
    profilIncompatible: 'Incompatible profile',
    equipHeading: 'gets what she is missing',
    readyBadge: 'Ready',
    readyForMission: 'is ready for this mission',
    continueAlma: 'Continue with Alma',
    noneFit: 'No current AI Collaborator fits this role.',
    recommendHeading: 'Alma recommends a new role',
    newRoleBadge: 'New role',
    kindName: { profil: 'Job profile', competence: 'Skill', application: 'Application' },
    status: {
      installed: { profil: 'Active', competence: 'Active', application: 'Connected' },
      new: { profil: 'Added', competence: 'Added', application: 'Added' },
      connected: { profil: 'Connected', competence: 'Connected', application: 'Connected' },
    },
    domainLabel: 'Domain',
    contextIdentified: 'Solvea identified',
    contextIdentifiedSub: 'Business activity, legal identity and digital presence verified.',
    contextBuilding: 'Shared context built',
    contextReady: 'Solvea’s context is ready.',
    contextChip: 'Solvea context active',
  },
} as const

const ease = [0.22, 1, 0.36, 1] as const
const KIND_ICON = { profil: UserRound, competence: Sparkles, application: AppWindow } as const

type Phase = 'received' | 'examine' | 'equip' | 'ready'
type Stage = 'context' | 'missions'

export function HeroV2({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = T[lang]
  const journey = JOURNEY[lang]
  const holder = HOLDER[lang]
  const ctx = CONTEXT[lang]
  const reduceMotion = useReducedMotion()

  // Décision prise au montage (SSR-safe) : rejoue-t-on la phase 0 ?
  const [decided, setDecided] = useState(false)
  const [stage, setStage] = useState<Stage>('missions')
  const [contextActive, setContextActive] = useState(false)

  const [cycle, setCycle] = useState(0)
  const current = journey[cycle % journey.length]
  const isNewRole = current.outcome === 'newRole'

  const [phase, setPhase] = useState<Phase>('received')
  const [equipStep, setEquipStep] = useState(0)
  const [p0, setP0] = useState(0)

  // Décision unique au montage — évite tout décalage d'hydratation.
  useEffect(() => {
    let seen = false
    try {
      seen = sessionStorage.getItem(CONTEXT_KEY) === '1'
    } catch {
      seen = false
    }
    if (reduceMotion) {
      setContextActive(true)
      setStage('missions')
      setPhase('ready')
      setEquipStep(99)
      setDecided(true)
      return
    }
    if (seen) {
      setContextActive(true)
      setStage('missions')
    } else {
      setStage('context')
    }
    setDecided(true)
  }, [reduceMotion])

  // Phase 0 — analyse de l'entreprise (≤ 4 s), une seule fois.
  useEffect(() => {
    if (!decided || stage !== 'context' || reduceMotion) return
    const timers: ReturnType<typeof setTimeout>[] = []
    setP0(0)
    timers.push(setTimeout(() => setP0(1), 500)) // groupe Identité
    timers.push(setTimeout(() => setP0(2), 1300)) // groupe Activité
    timers.push(setTimeout(() => setP0(3), 2100)) // entreprise identifiée
    timers.push(setTimeout(() => setP0(4), 2900)) // contexte construit
    timers.push(
      setTimeout(() => {
        try {
          sessionStorage.setItem(CONTEXT_KEY, '1')
        } catch {
          /* ignore */
        }
        setContextActive(true)
        setCycle(0)
        setStage('missions')
      }, 4200),
    )
    return () => timers.forEach(clearTimeout)
  }, [decided, stage, reduceMotion])

  // Cycle des missions — rythme ralenti pour la lisibilité.
  useEffect(() => {
    if (!decided || stage !== 'missions' || reduceMotion) return
    const m = journey[cycle % journey.length]
    const itemCount = m.outcome === 'assigned' ? m.items.length : 0
    const timers: ReturnType<typeof setTimeout>[] = []

    setPhase('received')
    setEquipStep(0)
    timers.push(setTimeout(() => setPhase('examine'), 1300))
    timers.push(setTimeout(() => setPhase('equip'), 3100))
    for (let i = 0; i < itemCount; i++) {
      timers.push(setTimeout(() => setEquipStep(i + 1), 3100 + 550 * (i + 1)))
    }
    const equipDur = m.outcome === 'assigned' ? 900 + 550 * itemCount : 2600
    const readyAt = 3100 + equipDur
    timers.push(setTimeout(() => setPhase('ready'), readyAt))
    timers.push(setTimeout(() => setCycle((c) => (c + 1) % journey.length), readyAt + 5000))
    return () => timers.forEach(clearTimeout)
  }, [decided, stage, cycle, reduceMotion, journey])

  // Reduced motion : on fait tourner les missions sans animation intermédiaire.
  useEffect(() => {
    if (!decided || !reduceMotion) return
    const id = setInterval(() => setCycle((c) => (c + 1) % journey.length), 5000)
    return () => clearInterval(id)
  }, [decided, reduceMotion, journey])

  const inContext = stage === 'context'
  const intro = phase !== 'ready'
  const overallPct = inContext
    ? p0 <= 0
      ? 12
      : p0 === 1
        ? 32
        : p0 === 2
          ? 55
          : p0 === 3
            ? 78
            : 100
    : phase === 'received'
      ? 15
      : phase === 'examine'
        ? 42
        : phase === 'equip'
          ? 78
          : 100

  const caption = inContext
    ? t.capContext
    : phase === 'received'
      ? t.capReceived
      : phase === 'examine'
        ? t.capExamine
        : isNewRole
          ? t.capRecommend
          : `${t.capEquip} ${holder.name}`

  const enter = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.75, ease, delay: reduceMotion ? 0 : delay },
  })

  return (
    <section className="hero-viewport relative flex items-center overflow-hidden bg-[#F3EFE6] pb-14 pt-24 sm:pb-16 sm:pt-28">
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
            className="font-sf text-[clamp(1.9rem,4.2vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.05em] text-[#1C1A17]"
          >
            {/* Continuous sentence for assistive tech — no visual line breaks announced. */}
            <span className="sr-only">
              {t.readyLead} {current.action}.
            </span>

            {/* Visual composition: fixed lead line + a dynamic area that reserves
                two lines of height so the paragraph and CTA never shift. */}
            <span aria-hidden="true" className="block text-center sm:text-left">
              <span className="block text-balance">{t.readyLead}</span>
              <span className="relative mt-1 block min-h-[2.1em]">
                <AnimatePresence initial={false}>
                  <motion.span
                    key={cycle}
                    initial={reduceMotion ? false : { opacity: 0, y: '0.3em' }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: '-0.3em' }}
                    transition={reduceMotion ? { duration: 0 } : { duration: 0.4, ease: 'easeInOut' }}
                    className="absolute inset-x-0 top-0 block text-[#D10E63]"
                  >
                    {current.lines.map((line, i) => (
                      <span key={i} className="block">
                        {line}
                      </span>
                    ))}
                  </motion.span>
                </AnimatePresence>
              </span>
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

        {/* Visual — Alma comprend l'entreprise, puis équipe le Collaborateur mission après mission */}
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

            {/* Repère permanent : contexte de l'entreprise actif */}
            <AnimatePresence initial={false}>
              {contextActive && (
                <motion.div
                  key="context-chip"
                  initial={reduceMotion ? false : { opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease }}
                  className="relative flex items-center justify-center gap-1.5 border-b border-white/[0.06] bg-[#4ADE80]/[0.06] py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#7FE3A6]"
                >
                  <ShieldCheck className="h-3 w-3" strokeWidth={2.5} aria-hidden="true" />
                  {t.contextChip}
                  <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait" initial={false}>
              {!decided ? (
                /* ── Frame neutre (SSR + 1er rendu) : évite tout flash de mission ── */
                <motion.div key="boot" className="relative flex min-h-[520px] flex-col p-5">
                  <div className="flex items-center gap-3.5 border-b border-white/[0.08] pb-4">
                    <Image
                      src="/alma-avatar.png"
                      alt=""
                      width={44}
                      height={44}
                      className="rounded-full object-cover ring-2 ring-[#F0658F]/40"
                      style={{ height: 44, width: 44 }}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-sf text-base font-bold leading-tight text-[#F6F1E8]">{t.almaName}</p>
                      <p className="truncate text-[12px] font-medium leading-tight text-[#A49E92]">{t.capContext}</p>
                    </div>
                    <Loader2 className="h-4 w-4 shrink-0 animate-spin text-[#F0658F]" aria-hidden="true" />
                  </div>
                </motion.div>
              ) : inContext ? (
                /* ── Phase 0 — Alma analyse l'entreprise (une fois par session) ── */
                <motion.div
                  key="context-card"
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
                      <p className="truncate text-[12px] font-medium leading-tight text-[#A49E92]">{caption}</p>
                    </div>
                    <Loader2 className="h-4 w-4 shrink-0 animate-spin text-[#F0658F]" aria-hidden="true" />
                  </div>

                  <div className="flex flex-1 flex-col gap-3 pt-4">
                    {/* Domaine reçu */}
                    <div className="flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2.5">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/[0.05]" aria-hidden="true">
                        <Globe className="h-3.5 w-3.5 text-[#D8D2C6]" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#8A8377]">{t.domainLabel}</p>
                        <p className="truncate text-[13px] font-semibold text-[#F6F1E8]">{ctx.domain}</p>
                      </div>
                      <Check className="h-3.5 w-3.5 shrink-0 text-[#5FE38F]" strokeWidth={3} aria-hidden="true" />
                    </div>

                    {/* Deux groupes de sources vérifiées */}
                    <div className="grid grid-cols-2 gap-2">
                      {ctx.groups.map((g, gi) => {
                        const shown = p0 > gi
                        return (
                          <motion.div
                            key={g.title}
                            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                            animate={shown ? { opacity: 1, y: 0 } : { opacity: 0.25, y: 0 }}
                            transition={{ duration: 0.35, ease }}
                            className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-2.5"
                          >
                            <p className="mb-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#F58AAB]">{g.title}</p>
                            <ul className="flex flex-col gap-1">
                              {g.sources.map((s) => (
                                <li key={s} className="flex items-center gap-1.5 text-[11px] leading-tight text-[#D8D2C6]">
                                  <Check className="h-2.5 w-2.5 shrink-0 text-[#5FE38F]" strokeWidth={3} aria-hidden="true" />
                                  <span className="truncate">{s}</span>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )
                      })}
                    </div>

                    {/* Entreprise identifiée */}
                    <motion.div
                      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                      animate={p0 > 2 ? { opacity: 1, y: 0 } : { opacity: 0.2, y: 0 }}
                      transition={{ duration: 0.35, ease }}
                      className="flex items-center gap-2.5 rounded-xl border border-[#4ADE80]/20 bg-[#4ADE80]/[0.07] px-3 py-2.5"
                    >
                      <ShieldCheck className="h-4 w-4 shrink-0 text-[#5FE38F]" strokeWidth={2.5} aria-hidden="true" />
                      <div className="min-w-0 flex-1">
                        <p className="text-[12.5px] font-bold leading-tight text-[#F6F1E8]">{t.contextIdentified}</p>
                        <p className="truncate text-[10.5px] leading-tight text-[#A49E92]">{t.contextIdentifiedSub}</p>
                      </div>
                    </motion.div>

                    {/* Contexte partagé construit */}
                    <motion.div
                      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                      animate={p0 > 3 ? { opacity: 1, y: 0 } : { opacity: 0.2, y: 0 }}
                      transition={{ duration: 0.35, ease }}
                    >
                      <p className="mb-2 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#8A8377]">{t.contextBuilding}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {ctx.built.map((b) => (
                          <span key={b} className="rounded-full border border-white/[0.1] bg-white/[0.03] px-2 py-1 text-[10.5px] font-medium text-[#D8D2C6]">
                            {b}
                          </span>
                        ))}
                      </div>
                      <p className="mt-3 flex items-center gap-1.5 text-[12.5px] font-semibold text-[#5FE38F]">
                        <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                        {t.contextReady}
                      </p>
                    </motion.div>
                  </div>

                  <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/[0.07]" aria-hidden="true">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-[#D10E63] to-[#F0658F]"
                      initial={false}
                      animate={{ width: `${overallPct}%` }}
                      transition={{ duration: 0.5, ease }}
                    />
                  </div>
                </motion.div>
              ) : intro ? (
                /* ── Séquence : mission reçue → équipe vérifiée → équipement ── */
                <motion.div
                  key="alma-intro"
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease }}
                  className="relative flex min-h-[520px] flex-col p-5"
                >
                  {/* En-tête Alma + libellé de phase */}
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
                      <p className="truncate text-[12px] font-medium leading-tight text-[#A49E92]">{caption}</p>
                    </div>
                    <Loader2 className="h-4 w-4 shrink-0 animate-spin text-[#F0658F]" aria-hidden="true" />
                  </div>

                  <div className="flex flex-1 flex-col justify-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={phase}
                        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                        transition={{ duration: 0.32, ease }}
                      >
                        {/* État 1 — Mission reçue */}
                        {phase === 'received' && (
                          <div className="text-center">
                            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#F58AAB]">
                              {t.missionLabel}
                            </span>
                            <p className="mx-auto mt-3 max-w-[16rem] text-balance font-sf text-2xl font-bold leading-[1.15] text-[#F6F1E8]">
                              {current.mission}
                            </p>
                          </div>
                        )}

                        {/* État 2 — Alma vérifie qui peut prendre la mission */}
                        {phase === 'examine' && (
                          <div>
                            <p className="mb-4 text-center font-sf text-[15px] font-semibold text-[#F6F1E8]">
                              {t.examineQuestion}
                            </p>
                            <div className="flex items-center gap-3 rounded-2xl border border-white/[0.1] bg-white/[0.03] px-3.5 py-3">
                              <img
                                src={holder.avatar || '/placeholder.svg'}
                                alt={holder.name}
                                className="h-10 w-10 shrink-0 rounded-full object-cover"
                              />
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-bold text-[#F6F1E8]">{holder.name}</p>
                                <p className="truncate text-[11.5px] text-[#A49E92]">{holder.role}</p>
                              </div>
                              <span
                                className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold ${
                                  isNewRole
                                    ? 'border-[#F2A65A]/30 bg-[#F2A65A]/[0.12] text-[#F2C08A]'
                                    : 'border-[#4ADE80]/25 bg-[#4ADE80]/[0.1] text-[#5FE38F]'
                                }`}
                              >
                                {isNewRole ? '—' : <Check className="h-2.5 w-2.5" strokeWidth={3} />}
                                {isNewRole ? t.profilIncompatible : t.profilCompatible}
                              </span>
                            </div>
                            {isNewRole && <p className="mt-3 text-center text-[11.5px] leading-snug text-[#C7A98A]">{t.noneFit}</p>}
                          </div>
                        )}

                        {/* État 3 — Équipement complété (assigned) OU recommandation (newRole) */}
                        {phase === 'equip' && !isNewRole && (
                          <div>
                            <p className="mb-3 font-sf text-[15px] font-semibold text-[#F6F1E8]">
                              <span className="text-[#F58AAB]">{holder.name}</span> {t.equipHeading}
                            </p>
                            <ul className="flex flex-col gap-1.5">
                              {current.items.map((item, i) => {
                                const revealed = equipStep > i
                                const Icon = KIND_ICON[item.kind as ItemKind]
                                const done = item.status === 'installed'
                                const statusText = t.status[item.status as ItemStatus][item.kind as ItemKind]
                                return (
                                  <motion.li
                                    key={item.label}
                                    initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                                    animate={revealed ? { opacity: 1, x: 0 } : { opacity: 0.25, x: 0 }}
                                    transition={{ duration: 0.3, ease }}
                                    className="flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] px-3 py-2"
                                  >
                                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/[0.05]" aria-hidden="true">
                                      <Icon className="h-3.5 w-3.5 text-[#D8D2C6]" />
                                    </span>
                                    <div className="min-w-0 flex-1">
                                      <p className="truncate text-[12.5px] font-semibold leading-tight text-[#F6F1E8]">{item.label}</p>
                                      <p className="truncate text-[10px] leading-tight text-[#8A8377]">{t.kindName[item.kind as ItemKind]}</p>
                                    </div>
                                    <span
                                      className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                                        done ? 'text-[#8A8377]' : 'bg-[#4ADE80]/[0.12] text-[#5FE38F]'
                                      }`}
                                    >
                                      {done ? (
                                        <Check className="h-2.5 w-2.5" strokeWidth={3} aria-hidden="true" />
                                      ) : (
                                        <Plus className="h-2.5 w-2.5" strokeWidth={3} aria-hidden="true" />
                                      )}
                                      {statusText}
                                    </span>
                                  </motion.li>
                                )
                              })}
                            </ul>
                          </div>
                        )}

                        {phase === 'equip' && isNewRole && (
                          <div>
                            <p className="mb-3 font-sf text-[15px] font-semibold text-[#F6F1E8]">{t.recommendHeading}</p>
                            <div className="rounded-2xl border border-[#F0658F]/25 bg-[#D10E63]/[0.08] p-3.5">
                              <div className="flex items-center gap-3">
                                <img
                                  src={current.newRole.avatar || '/placeholder.svg'}
                                  alt={current.newRole.name}
                                  className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-[#F0658F]/40"
                                />
                                <div className="min-w-0 flex-1">
                                  <p className="truncate text-sm font-bold text-[#F6F1E8]">{current.newRole.name}</p>
                                  <p className="truncate text-[11.5px] text-[#CDBFC4]">{current.newRole.role}</p>
                                </div>
                                <span className="inline-flex shrink-0 items-center rounded-full border border-[#F0658F]/30 bg-[#D10E63]/20 px-2 py-0.5 text-[10px] font-bold text-[#F58AAB]">
                                  {t.newRoleBadge}
                                </span>
                              </div>
                              <ul className="mt-3 grid grid-cols-2 gap-1.5">
                                {current.newRole.reasons.map((r) => (
                                  <li key={r} className="flex items-center gap-1.5 text-[10.5px] font-medium text-[#CFC9BD]">
                                    <span className="h-1 w-1 shrink-0 rounded-full bg-[#F0658F]" aria-hidden="true" />
                                    {r}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Barre de progression globale */}
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
                /* ── État 4 — Mission attribuée (assigned) OU décision (newRole) ── */
                <motion.div
                  key="ready-card"
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease }}
                  className="flex min-h-[520px] flex-col"
                >
                  {!isNewRole ? (
                    <>
                      {/* En-tête : Emma est prête */}
                      <div className="relative flex items-center gap-3.5 border-b border-white/[0.08] bg-white/[0.02] p-5">
                        <span className="relative shrink-0">
                          <span aria-hidden="true" className="absolute -inset-1 rounded-full bg-[#D10E63]/30 blur-md" />
                          <img
                            src={holder.avatar || '/placeholder.svg'}
                            alt={holder.name}
                            className="relative h-[52px] w-[52px] rounded-full object-cover ring-2 ring-[#F0658F]/40"
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
                          <p className="truncate font-sf text-xl font-bold leading-tight text-[#F6F1E8]">{holder.name}</p>
                          <p className="truncate text-[12px] font-medium leading-tight text-[#A49E92]">{holder.role}</p>
                        </div>
                        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#4ADE80]/25 bg-[#4ADE80]/[0.1] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-[#5FE38F]">
                          <motion.span
                            className="h-1.5 w-1.5 rounded-full bg-[#4ADE80]"
                            aria-hidden="true"
                            animate={reduceMotion ? undefined : { opacity: [1, 0.4, 1], scale: [1, 0.85, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                          />
                          {t.readyBadge}
                        </span>
                      </div>

                      <div className="relative flex flex-1 flex-col gap-4 p-5">
                        {/* Mission attribuée */}
                        <motion.div
                          initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, ease, delay: 0.12 }}
                          className="rounded-2xl border border-[#F0658F]/25 bg-[#D10E63]/[0.08] p-4"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#D10E63]/20" aria-hidden="true">
                              <Target className="h-3.5 w-3.5 text-[#F58AAB]" strokeWidth={2.5} />
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#F58AAB]">
                                {t.missionLabel}
                              </p>
                              <p className="truncate text-[14px] font-semibold text-[#F6F1E8]">{current.mission}</p>
                            </div>
                            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#4ADE80]/15" aria-hidden="true">
                              <Check className="h-2.5 w-2.5 text-[#5FE38F]" strokeWidth={3.5} />
                            </span>
                          </div>
                        </motion.div>

                        {/* Capacités mobilisées (preuve d'accumulation) */}
                        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-3.5">
                          <div className="flex flex-col gap-1.5">
                            {current.items.map((item) => {
                              const Icon = KIND_ICON[item.kind as ItemKind]
                              const done = item.status === 'installed'
                              return (
                                <div key={item.label} className="flex items-center gap-2.5">
                                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-white/[0.05]" aria-hidden="true">
                                    <Icon className="h-3 w-3 text-[#D8D2C6]" />
                                  </span>
                                  <span className="min-w-0 flex-1 truncate text-[12px] font-medium text-[#E4DED2]">{item.label}</span>
                                  <span
                                    className={`inline-flex shrink-0 items-center gap-1 text-[10px] font-bold ${
                                      done ? 'text-[#8A8377]' : 'text-[#5FE38F]'
                                    }`}
                                  >
                                    {done ? (
                                      <Check className="h-2.5 w-2.5" strokeWidth={3} aria-hidden="true" />
                                    ) : (
                                      <Plus className="h-2.5 w-2.5" strokeWidth={3} aria-hidden="true" />
                                    )}
                                    {t.status[item.status as ItemStatus][item.kind as ItemKind]}
                                  </span>
                                </div>
                              )
                            })}
                          </div>
                        </div>

                        <div className="flex-1" />

                        <div>
                          <p className="mb-2 text-center text-[12px] font-medium text-[#A49E92] sm:text-left">
                            <span className="font-semibold text-[#F6F1E8]">{holder.name}</span> {t.readyForMission}
                          </p>
                          <motion.a
                            href="/decouvrir"
                            initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, ease, delay: 0.24 }}
                            className="group/cta flex items-center justify-center gap-2 rounded-xl bg-[#D10E63] px-4 py-3 text-[13px] font-bold text-[#FBF9F3] transition-colors hover:bg-[#B60C56]"
                          >
                            {t.continueAlma}
                            <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-0.5" aria-hidden="true" />
                          </motion.a>
                        </div>
                      </div>
                    </>
                  ) : (
                    /* Décision : Alma propose un nouveau poste, l'utilisateur poursuit avec Alma */
                    <div className="relative flex flex-1 flex-col p-5">
                      <div className="flex items-center gap-3.5 border-b border-white/[0.08] pb-4">
                        <Image
                          src="/alma-avatar.png"
                          alt=""
                          width={40}
                          height={40}
                          className="rounded-full object-cover ring-2 ring-[#F0658F]/40"
                          style={{ height: 40, width: 40 }}
                        />
                        <div className="min-w-0 flex-1">
                          <p className="font-sf text-base font-bold leading-tight text-[#F6F1E8]">{t.almaName}</p>
                          <p className="truncate text-[12px] font-medium leading-tight text-[#A49E92]">{t.recommendHeading}</p>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-1 flex-col">
                        <p className="text-[13px] leading-snug text-[#C7A98A]">{t.noneFit}</p>

                        <div className="mt-3 rounded-2xl border border-[#F0658F]/25 bg-[#D10E63]/[0.08] p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={current.newRole.avatar || '/placeholder.svg'}
                              alt={current.newRole.name}
                              className="h-[46px] w-[46px] shrink-0 rounded-full object-cover ring-2 ring-[#F0658F]/40"
                            />
                            <div className="min-w-0 flex-1">
                              <p className="truncate font-sf text-base font-bold text-[#F6F1E8]">{current.newRole.name}</p>
                              <p className="truncate text-[12px] text-[#CDBFC4]">{current.newRole.role}</p>
                            </div>
                            <span className="inline-flex shrink-0 items-center rounded-full border border-[#F0658F]/30 bg-[#D10E63]/20 px-2 py-0.5 text-[10px] font-bold text-[#F58AAB]">
                              {t.newRoleBadge}
                            </span>
                          </div>
                          <ul className="mt-3 grid grid-cols-2 gap-1.5">
                            {current.newRole.reasons.map((r) => (
                              <li key={r} className="flex items-center gap-1.5 text-[10.5px] font-medium text-[#CFC9BD]">
                                <span className="h-1 w-1 shrink-0 rounded-full bg-[#F0658F]" aria-hidden="true" />
                                {r}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex-1" />

                        {/* Un seul CTA — la décision détaillée se poursuit sur /decouvrir */}
                        <a
                          href="/decouvrir"
                          className="group/cta mt-4 flex items-center justify-center gap-2 rounded-xl bg-[#D10E63] px-4 py-3 text-[13px] font-bold text-[#FBF9F3] transition-colors hover:bg-[#B60C56]"
                        >
                          {t.continueAlma}
                          <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-0.5" aria-hidden="true" />
                        </a>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
