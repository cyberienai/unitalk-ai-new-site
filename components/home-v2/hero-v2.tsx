'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, Layers, Loader2, Target } from 'lucide-react'
import { Kicker } from '@/components/home/section-kicker'
import { CtaButton } from '@/components/ui/cta-button'

/**
 * Catalogue des collaborateurs de la démo.
 * La mission affichée dans la carte est synchronisée avec le verbe qui défile
 * dans le titre : quand l'action change, le profil préparé change aussi.
 * `g` sert uniquement aux accords français (prête / préparée).
 */
const CATALOG = {
  fr: [
    { action: 'traiter vos emails', name: 'Emma', role: 'Assistante de direction', mission: 'Traiter vos emails', g: 'f' },
    { action: 'répondre à vos appels', name: 'Lucas', role: 'Chargé de la relation téléphonique', mission: 'Répondre à vos appels', g: 'm' },
    { action: 'trouver vos prospects', name: 'Sarah', role: 'Business developer', mission: 'Trouver vos prospects', g: 'f' },
    { action: 'mettre à jour votre CRM', name: 'Thomas', role: 'Assistant CRM & opérations', mission: 'Mettre à jour votre CRM', g: 'm' },
    { action: 'préparer vos devis', name: 'Chloé', role: 'Assistante commerciale', mission: 'Préparer vos devis', g: 'f' },
    { action: 'créer vos présentations', name: 'Hugo', role: 'Designer de présentations', mission: 'Créer vos présentations', g: 'm' },
    { action: 'gérer votre support', name: 'Léa', role: 'Chargée de support client', mission: 'Gérer votre support', g: 'f' },
    { action: 'transcrire vos réunions', name: 'Malik', role: 'Assistant de réunion', mission: 'Transcrire vos réunions', g: 'm' },
    { action: 'rédiger vos comptes rendus', name: 'Camille', role: 'Rédactrice de comptes rendus', mission: 'Rédiger vos comptes rendus', g: 'f' },
    { action: 'générer vos visuels', name: 'Noah', role: 'Designer visuel', mission: 'Générer vos visuels', g: 'm' },
  ],
  en: [
    { action: 'handle your emails', name: 'Emma', role: 'Executive assistant', mission: 'Handle your emails', g: 'f' },
    { action: 'answer your calls', name: 'Lucas', role: 'Phone relationship agent', mission: 'Answer your calls', g: 'm' },
    { action: 'find your prospects', name: 'Sarah', role: 'Business developer', mission: 'Find your prospects', g: 'f' },
    { action: 'update your CRM', name: 'Thomas', role: 'CRM & operations assistant', mission: 'Update your CRM', g: 'm' },
    { action: 'prepare your quotes', name: 'Chloé', role: 'Sales assistant', mission: 'Prepare your quotes', g: 'f' },
    { action: 'create your presentations', name: 'Hugo', role: 'Presentation designer', mission: 'Create your presentations', g: 'm' },
    { action: 'manage your support', name: 'Léa', role: 'Customer support agent', mission: 'Manage your support', g: 'f' },
    { action: 'transcribe your meetings', name: 'Malik', role: 'Meeting assistant', mission: 'Transcribe your meetings', g: 'm' },
    { action: 'write your meeting notes', name: 'Camille', role: 'Minutes writer', mission: 'Write your meeting notes', g: 'f' },
    { action: 'generate your visuals', name: 'Noah', role: 'Visual designer', mission: 'Generate your visuals', g: 'm' },
  ],
} as const

const T = {
  fr: {
    eyebrow: 'Il vous manque quelqu’un',
    readyLead: 'Votre Collaborateur IA sait déjà',
    almaLeadPre: 'Parlez à ',
    almaName: 'Alma',
    almaLeadPost:
      '. Elle analyse votre entreprise et recrute le Collaborateur IA adapté à votre organisation.',
    cta: 'Parler à Alma',
    proofs: ['Essai gratuit 7 jours sans CB', 'Hébergé en France', 'Mis en service par Alma'],
    // En-tête de la carte (l'avatar est celui d'Alma qui prépare le collaborateur)
    almaPrepares: 'prépare',
    // Les quatre étapes du recrutement, pivotées autour de la mission
    stepTitles: [
      'Votre Organisation est identifiée',
      'Son contexte est construit',
      'La mission est définie',
      'Le Collaborateur IA est préparé',
    ],
    identifyCaption: 'Informations publiques analysées',
    identifySources: ['Site internet', 'Données SIRENE', 'DNS publics', 'LinkedIn', 'Mentions légales'],
    identifyResult: 'Identité juridique, domaine officiel et présence numérique vérifiés.',
    contextItems: ['Produits & services', 'Clients & marchés', 'Tarifs', 'Processus & documents publics', 'Ton & charte graphique'],
    missionBullets: ['Résultat attendu', 'Règles de traitement', 'Actions autorisées', 'Validations humaines'],
    prepBullets: ['Profil métier', 'Compétences', 'Applications', 'Accès & validations'],
    // Fiche finale (synthétique)
    missionLabel: 'Mission',
    contextNote: 'dans le contexte de votre Organisation',
    inheritedLabel: 'Contexte hérité',
    inherited: ['Produits', 'Clients', 'Processus', 'Tarifs'],
    joinWorkspace: 'Rejoindre le Workspace',
  },
  en: {
    eyebrow: 'Someone is missing',
    readyLead: 'Your AI Collaborator already knows how to',
    almaLeadPre: 'Talk to ',
    almaName: 'Alma',
    almaLeadPost:
      '. She analyzes your company and recruits the AI Collaborator that fits your organization.',
    cta: 'Talk to Alma',
    proofs: ['7-day free trial, no card', 'Hosted in France', 'Deployed by Alma'],
    almaPrepares: 'is preparing',
    stepTitles: [
      'Your Organization is identified',
      'Its context is built',
      'The mission is defined',
      'The AI Collaborator is prepared',
    ],
    identifyCaption: 'Public information analyzed',
    identifySources: ['Website', 'SIRENE data', 'Public DNS', 'LinkedIn', 'Legal notice'],
    identifyResult: 'Legal identity, official domain and online presence verified.',
    contextItems: ['Products & services', 'Clients & markets', 'Pricing', 'Public processes & documents', 'Tone & brand style'],
    missionBullets: ['Expected outcome', 'Processing rules', 'Allowed actions', 'Human approvals'],
    prepBullets: ['Job profile', 'Skills', 'Applications', 'Access & approvals'],
    missionLabel: 'Mission',
    contextNote: 'in the context of your Organization',
    inheritedLabel: 'Inherited context',
    inherited: ['Products', 'Clients', 'Processes', 'Pricing'],
    joinWorkspace: 'Join the Workspace',
  },
} as const

const ease = [0.22, 1, 0.36, 1] as const

type Phase = 'identify' | 'context' | 'mission' | 'preparing' | 'ready'

export function HeroV2({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = T[lang]
  const catalog = CATALOG[lang]
  const reduceMotion = useReducedMotion()

  // Cycle courant : pilote À LA FOIS le verbe du titre et le profil préparé
  // dans la carte (synchronisation lockstep titre ↔ démonstration).
  const [cycle, setCycle] = useState(0)
  const current = catalog[cycle % catalog.length]

  // Machine à états de la démonstration, rejouée à chaque cycle.
  const [phase, setPhase] = useState<Phase>(reduceMotion ? 'ready' : 'identify')
  const [sourceStep, setSourceStep] = useState(reduceMotion ? 99 : 0)

  useEffect(() => {
    const sources = t.identifySources
    const timers: ReturnType<typeof setTimeout>[] = []

    if (reduceMotion) {
      // Pas d'animation : on montre la fiche finale et on change de profil lentement.
      setPhase('ready')
      setSourceStep(sources.length)
      timers.push(setTimeout(() => setCycle((c) => (c + 1) % catalog.length), 4200))
      return () => timers.forEach(clearTimeout)
    }

    setPhase('identify')
    setSourceStep(0)
    sources.forEach((_, i) => {
      timers.push(setTimeout(() => setSourceStep(i + 1), 300 * (i + 1)))
    })
    const afterIdentify = 300 * sources.length + 700
    timers.push(setTimeout(() => setPhase('context'), afterIdentify))
    timers.push(setTimeout(() => setPhase('mission'), afterIdentify + 1200))
    timers.push(setTimeout(() => setPhase('preparing'), afterIdentify + 2400))
    timers.push(setTimeout(() => setPhase('ready'), afterIdentify + 3600))
    // Fin du cycle : on passe au collaborateur / à la mission suivante.
    timers.push(setTimeout(() => setCycle((c) => (c + 1) % catalog.length), afterIdentify + 3600 + 3000))
    return () => timers.forEach(clearTimeout)
  }, [cycle, reduceMotion, t.identifySources, catalog.length])

  const intro = phase !== 'ready'
  const stepOf: Record<Phase, number> = { identify: 0, context: 1, mission: 2, preparing: 3, ready: 4 }
  const currentStep = stepOf[phase]
  const sourceCount = Math.min(sourceStep, t.identifySources.length)
  const overallPct =
    phase === 'identify'
      ? (sourceCount / t.identifySources.length) * 20
      : phase === 'context'
        ? 40
        : phase === 'mission'
          ? 60
          : phase === 'preparing'
            ? 80
            : 100

  const isF = current.g === 'f'
  const readyBadge = isF ? 'Prête' : 'Prêt'
  const contextNote = lang === 'fr' ? `Préparé${isF ? 'e' : ''} ${t.contextNote}` : `Prepared ${t.contextNote}`

  // Largeur réservée sur le plus long verbe → conteneur du titre stable.
  const longestAction = catalog.reduce((a, c) => (c.action.length > a.length ? c.action : a), '')

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
            {/* Le verbe invisible réserve la largeur du plus long → conteneur stable. */}
            <span className="relative inline-block align-top text-[#D10E63]">
              <span className="invisible" aria-hidden="true">
                {longestAction}
              </span>
              <AnimatePresence initial={false}>
                <motion.span
                  key={cycle}
                  initial={reduceMotion ? false : { opacity: 0, y: '0.32em' }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: '-0.32em' }}
                  transition={reduceMotion ? { duration: 0 } : { duration: 0.36, ease: 'easeInOut' }}
                  className="absolute inset-0 block whitespace-nowrap"
                >
                  {current.action}
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

        {/* Visual — Alma identifie, construit le contexte, définit la mission, prépare le collaborateur */}
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
                /* ── Séquence Alma : identification → contexte → mission → préparation ── */
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
                      <p className="truncate text-[12px] font-medium leading-tight text-[#A49E92]">
                        {t.almaPrepares} {current.name}
                      </p>
                    </div>
                    <Loader2 className="h-4 w-4 shrink-0 animate-spin text-[#F0658F]" aria-hidden="true" />
                  </div>

                  {/* Stepper : 4 étapes ; seule l'étape active déploie son détail (hauteur stable) */}
                  <ol className="mt-5 flex flex-1 flex-col justify-center gap-2">
                    {t.stepTitles.map((label, i) => {
                      const done = currentStep > i
                      const active = currentStep === i
                      const title = i === 2 ? `${t.missionLabel} : ${current.mission}` : label
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
                              {title}
                            </span>
                          </div>

                          {/* Détail de l'étape active uniquement */}
                          <AnimatePresence>
                            {active && (
                              <motion.div
                                initial={reduceMotion ? false : { opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3, ease }}
                                className="overflow-hidden pl-7"
                              >
                                {/* Étape 1 — informations publiques (SIRENE, DNS… prouvent la profondeur) */}
                                {i === 0 && (
                                  <div className="pt-3">
                                    <div className="mb-2 flex items-center justify-between">
                                      <span className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#B0A99B]">
                                        {t.identifyCaption}
                                      </span>
                                      <span className="font-mono text-[11px] font-bold tabular-nums text-[#F58AAB]">
                                        {sourceCount}
                                        <span className="text-[#948D7F]">/{t.identifySources.length}</span>
                                      </span>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                      {t.identifySources.map((source, si) => {
                                        const scanned = sourceStep > si
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
                                    {sourceStep >= t.identifySources.length && (
                                      <p className="mt-2 text-[10.5px] leading-snug text-[#9E978B]">{t.identifyResult}</p>
                                    )}
                                  </div>
                                )}

                                {/* Étape 2 — contexte structuré (dont le ton et la charte, extraits du site) */}
                                {i === 1 && (
                                  <div className="flex flex-wrap gap-1.5 pt-3">
                                    {t.contextItems.map((item) => (
                                      <span
                                        key={item}
                                        className="rounded-full border border-white/[0.1] bg-white/[0.05] px-2 py-0.5 text-[10px] font-semibold text-[#E4DED2]"
                                      >
                                        {item}
                                      </span>
                                    ))}
                                  </div>
                                )}

                                {/* Étape 3 — cadrage de la mission par Alma */}
                                {i === 2 && (
                                  <ul className="grid grid-cols-2 gap-1.5 pt-3">
                                    {t.missionBullets.map((b) => (
                                      <li key={b} className="flex items-center gap-1.5 text-[10.5px] font-medium text-[#CFC9BD]">
                                        <span className="h-1 w-1 shrink-0 rounded-full bg-[#F0658F]" aria-hidden="true" />
                                        {b}
                                      </li>
                                    ))}
                                  </ul>
                                )}

                                {/* Étape 4 — ce qu'Alma réunit pour le collaborateur */}
                                {i === 3 && (
                                  <ul className="grid grid-cols-2 gap-1.5 pt-3">
                                    {t.prepBullets.map((b) => (
                                      <li key={b} className="flex items-center gap-1.5 text-[10.5px] font-medium text-[#CFC9BD]">
                                        <span className="h-1 w-1 shrink-0 rounded-full bg-[#F0658F]" aria-hidden="true" />
                                        {b}
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </li>
                      )
                    })}
                  </ol>

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
                /* ── Fiche synthétique : le collaborateur est prêt pour sa mission ── */
                <motion.div
                  key="ready-card"
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease }}
                  className="flex min-h-[520px] flex-col"
                >
                  {/* En-tête : identité du collaborateur préparé + statut prêt */}
                  <div className="relative flex items-center gap-3.5 border-b border-white/[0.08] bg-white/[0.02] p-5">
                    <span className="relative shrink-0">
                      <span aria-hidden="true" className="absolute -inset-1 rounded-full bg-[#D10E63]/30 blur-md" />
                      <span
                        className="relative flex h-[52px] w-[52px] items-center justify-center rounded-full font-sf text-xl font-bold text-[#FBF9F3] ring-2 ring-[#F0658F]/40"
                        style={{ background: 'linear-gradient(135deg, #D10E63, #F0658F)' }}
                        aria-hidden="true"
                      >
                        {current.name.charAt(0)}
                      </span>
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
                      <p className="truncate font-sf text-xl font-bold leading-tight text-[#F6F1E8]">{current.name}</p>
                      <p className="truncate text-[12px] font-medium leading-tight text-[#A49E92]">{current.role}</p>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#4ADE80]/25 bg-[#4ADE80]/[0.1] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-[#5FE38F]">
                      <motion.span
                        className="h-1.5 w-1.5 rounded-full bg-[#4ADE80]"
                        aria-hidden="true"
                        animate={reduceMotion ? undefined : { opacity: [1, 0.4, 1], scale: [1, 0.85, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      />
                      {readyBadge}
                    </span>
                  </div>

                  <div className="relative flex flex-1 flex-col gap-4 p-5">
                    {/* Mission : le pivot du recrutement, mis en avant */}
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
                      <p className="mt-2.5 text-[11px] leading-snug text-[#CDBFC4]">{contextNote}</p>
                    </motion.div>

                    {/* Contexte hérité de l'analyse d'Alma */}
                    <div className="rounded-2xl border border-[#F0658F]/20 bg-[#D10E63]/[0.06] p-3.5">
                      <p className="mb-2 flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#F58AAB]">
                        <Layers className="h-3 w-3" aria-hidden="true" />
                        {t.inheritedLabel}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {t.inherited.map((c) => (
                          <span
                            key={c}
                            className="rounded-full border border-white/[0.1] bg-white/[0.05] px-2 py-0.5 text-[10px] font-semibold text-[#E4DED2]"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex-1" />

                    {/* CTA final : le collaborateur rejoint le Workspace */}
                    <motion.a
                      href="/decouvrir"
                      initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease, delay: 0.24 }}
                      className="group/cta flex items-center justify-center gap-2 rounded-xl bg-[#D10E63] px-4 py-3 text-[13px] font-bold text-[#FBF9F3] transition-colors hover:bg-[#B60C56]"
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
