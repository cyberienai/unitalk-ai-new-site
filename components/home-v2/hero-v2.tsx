'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Calendar, Check, Mail, Phone, Sparkles } from 'lucide-react'
import { Kicker } from '@/components/home/section-kicker'
import { CtaButton } from '@/components/ui/cta-button'

const T = {
  fr: {
    eyebrow: 'Il vous manque quelqu’un.',
    title: 'Recrutez votre premier Collaborateur IA.',
    readyLead: 'Prêt à',
    missions: [
      'répondre à vos clients',
      'trouver de nouveaux prospects',
      'qualifier vos leads',
      'préparer vos devis',
      'envoyer vos emails',
      'créer vos contenus',
      'analyser vos documents',
      'automatiser vos tâches',
      'organiser vos réunions',
      'collaborer avec vos équipes',
    ],
    almaLead:
      'Discutez avec Alma. Elle analyse votre entreprise et prépare le Collaborateur IA qu’il vous faut.',
    cta: 'Recruter mon Collaborateur IA',
    proofs: ['Aucune carte bancaire', 'Essai gratuit 7 jours', 'Hébergé en France · Conforme RGPD'],
    // Visual — cinématique
    almaName: 'Alma',
    almaRole: 'conseillère IA',
    steps: {
      ask: 'Quel est le site de votre entreprise ?',
      url: 'www.monentreprise.com',
      analyzing: 'J’analyse votre activité…',
      found: 'J’ai identifié le bon profil.',
      recommend: 'Je vous recommande Emma.',
    },
    analyzingLabel: 'Analyse en cours',
    buildingLabel: 'Création du Collaborateur IA',
    readyBadge: 'Emma est prête',
    ficheEyebrow: 'Prend vie',
    ficheName: 'Emma',
    ficheRole: 'Collaboratrice IA · Assistante de direction',
    contact: [
      { icon: Phone, label: '+33 1 84 80 00 00' },
      { icon: Mail, label: 'emma@monentreprise.com' },
      { icon: Calendar, label: 'Agenda connecté' },
    ],
    expertisesLabel: 'Expertises',
    expertises: ['Agenda', 'Réunions', 'Reporting', 'Emails'],
    missionsLabel: 'Missions',
    ficheMissions: ['Préparer vos réunions', 'Suivre vos décisions'],
  },
  en: {
    eyebrow: 'Someone is missing.',
    title: 'Hire your first AI Collaborator.',
    readyLead: 'Ready to',
    missions: [
      'answer your customers',
      'find new prospects',
      'qualify your leads',
      'prepare your quotes',
      'send your emails',
      'create your content',
      'analyze your documents',
      'automate your tasks',
      'organize your meetings',
      'collaborate with your teams',
    ],
    almaLead:
      'Chat with Alma. She analyzes your company and prepares the AI Collaborator you need.',
    cta: 'Hire my AI Collaborator',
    proofs: ['No credit card', '7-day free trial', 'Hosted in France · GDPR compliant'],
    // Visual — cinematic
    almaName: 'Alma',
    almaRole: 'AI advisor',
    steps: {
      ask: 'What is your company website?',
      url: 'www.mycompany.com',
      analyzing: 'Analyzing your business…',
      found: 'I found the right profile.',
      recommend: 'I recommend Emma.',
    },
    analyzingLabel: 'Analyzing',
    buildingLabel: 'Building the AI Collaborator',
    readyBadge: 'Emma is ready',
    ficheEyebrow: 'Coming to life',
    ficheName: 'Emma',
    ficheRole: 'AI Collaborator · Executive assistant',
    contact: [
      { icon: Phone, label: '+33 1 84 80 00 00' },
      { icon: Mail, label: 'emma@mycompany.com' },
      { icon: Calendar, label: 'Calendar connected' },
    ],
    expertisesLabel: 'Expertise',
    expertises: ['Calendar', 'Meetings', 'Reporting', 'Emails'],
    missionsLabel: 'Missions',
    ficheMissions: ['Prepare your meetings', 'Track your decisions'],
  },
} as const

const ease = [0.22, 1, 0.36, 1] as const

/**
 * Cinématique "naissance d'Emma" — une machine à étapes en boucle.
 * Chaque étape révèle un morceau de la conversation Alma ET, en parallèle,
 * un morceau de la fiche du Collaborateur IA qui se construit.
 *   0 idle      → carte vide, Alma pose sa question
 *   1 url       → l'URL de l'entreprise apparaît
 *   2 analyzing → barre d'analyse, la fiche s'amorce (photo)
 *   3 contact   → coordonnées (email / téléphone / agenda)
 *   4 expertise → expertises
 *   5 missions  → missions + badge "Emma est prête"
 *   6 hold      → maintien de l'état final avant reboucle
 */
const STEP_DURATIONS = [1400, 1500, 2200, 1300, 1300, 1600, 2200] as const
const TOTAL_STEPS = STEP_DURATIONS.length

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

  // Machine à étapes de la cinématique
  const [step, setStep] = useState(reduceMotion ? TOTAL_STEPS - 1 : 0)
  useEffect(() => {
    if (reduceMotion) {
      setStep(TOTAL_STEPS - 1)
      return
    }
    let timeout: ReturnType<typeof setTimeout>
    let current = 0
    setStep(0)
    const tick = () => {
      timeout = setTimeout(() => {
        current = (current + 1) % TOTAL_STEPS
        setStep(current)
        tick()
      }, STEP_DURATIONS[current])
    }
    tick()
    return () => clearTimeout(timeout)
  }, [reduceMotion, lang])

  const enter = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.75, ease, delay: reduceMotion ? 0 : delay },
  })

  // Seuils d'apparition de la fiche selon l'étape
  const showFiche = step >= 2
  const showContact = step >= 3
  const showExpertise = step >= 4
  const showMissions = step >= 5
  const isReady = step >= 5

  return (
    <section className="relative flex min-h-0 items-center overflow-hidden bg-[#F3EFE6] pb-14 pt-24 sm:min-h-[94svh] sm:pb-20 sm:pt-32 lg:pt-36">
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
            className="text-balance text-center font-sf text-[clamp(2rem,5vw,4.25rem)] font-semibold leading-[1.06] tracking-[-0.055em] text-[#1C1A17] sm:text-left sm:leading-[1]"
          >
            {t.title}
          </motion.h1>

          <div className="mt-6 text-center sm:text-left">
            <motion.p {...enter(0.18)} className="flex flex-wrap items-center justify-center gap-x-2 font-sf text-lg font-semibold leading-snug text-[#4E483F] sm:justify-start md:text-xl">
              <span>{t.readyLead}</span>
              <span className="inline-flex min-h-[1.4em] items-center">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={missionIndex}
                    initial={reduceMotion ? false : { opacity: 0, y: '0.4em' }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: '-0.4em' }}
                    transition={{ duration: 0.4, ease }}
                    className="font-extrabold tracking-tight text-[#D10E63] text-xl md:text-3xl"
                  >
                    {t.missions[missionIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.p>
            <p className="sr-only">{`${t.readyLead} ${t.missions.join(', ')}.`}</p>
          </div>

          <motion.p {...enter(0.24)} className="mx-auto mt-4 max-w-xl text-balance text-center text-base leading-relaxed text-[#4E483F] sm:mx-0 sm:text-left md:text-lg">
            {t.almaLead}
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

        {/* Visual — cinématique : Alma analyse à gauche, Emma prend vie à droite */}
        <motion.div {...enter(0.2)} className="relative mx-auto w-full max-w-xl">
          <div className="premium-shadow grid overflow-hidden rounded-[1.75rem] border border-[#D8D0C2] bg-[#FBF9F3] sm:grid-cols-[0.92fr_1.08fr]">
            {/* Alma — conversation */}
            <div className="flex flex-col gap-3 border-b border-[#E4DDCE] bg-[#F3EFE6]/60 p-5 sm:border-b-0 sm:border-r">
              <div className="flex items-center gap-2.5">
                <span className="relative shrink-0">
                  <Image src="/alma-avatar.png" alt="Alma" width={32} height={32} className="h-8 w-8 rounded-full object-cover ring-2 ring-[#D10E63]/35" />
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#FBF9F3] bg-[#2E7D4F]" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-bold leading-tight text-[#1C1A17]">{t.almaName}</p>
                  <p className="text-[11px] font-medium leading-tight text-[#8A8175]">{t.almaRole}</p>
                </div>
              </div>

              <div className="flex min-h-[9.5rem] flex-col gap-2">
                {/* Question d'Alma */}
                <motion.p
                  initial={false}
                  animate={{ opacity: step >= 0 ? 1 : 0, y: 0 }}
                  className="w-fit max-w-[92%] rounded-2xl rounded-tl-sm border border-[#E4DDCE] bg-[#FBF9F3] px-3 py-2 text-[12px] leading-snug text-[#3F3A33]"
                >
                  {t.steps.ask}
                </motion.p>

                {/* Réponse : URL de l'entreprise */}
                <AnimatePresence>
                  {step >= 1 && (
                    <motion.p
                      key="url"
                      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease }}
                      className="ml-auto w-fit max-w-[85%] break-all rounded-2xl rounded-tr-sm bg-[#1C1A17] px-3 py-2 font-mono text-[11px] leading-snug text-[#FBF9F3]"
                    >
                      {t.steps.url}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Statut d'Alma : analyse → trouvé → recommandation */}
                <AnimatePresence mode="wait">
                  {step >= 2 && (
                    <motion.p
                      key={step >= 4 ? 'recommend' : step >= 3 ? 'found' : 'analyzing'}
                      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease }}
                      className="flex w-fit max-w-[92%] items-center gap-1.5 rounded-2xl rounded-tl-sm border border-[#E4DDCE] bg-[#FBF9F3] px-3 py-2 text-[12px] leading-snug text-[#3F3A33]"
                    >
                      {step >= 4 ? (
                        <>
                          <Sparkles className="h-3.5 w-3.5 shrink-0 text-[#D10E63]" aria-hidden="true" />
                          {t.steps.recommend}
                        </>
                      ) : step >= 3 ? (
                        <>
                          <Check className="h-3.5 w-3.5 shrink-0 text-[#2E7D4F]" strokeWidth={3} aria-hidden="true" />
                          {t.steps.found}
                        </>
                      ) : (
                        t.steps.analyzing
                      )}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Barre d'analyse / voix */}
              <div className="mt-auto rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] px-3 py-2.5">
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#8A8175]">{t.analyzingLabel}</span>
                  <span className="flex h-3.5 items-end gap-[2px]" aria-hidden="true">
                    {[6, 12, 8, 14, 9].map((h, i) => (
                      <motion.span
                        key={i}
                        className="w-[2px] rounded-full bg-[#D10E63]"
                        style={{ height: h }}
                        animate={reduceMotion ? undefined : { scaleY: [1, 0.35, 1] }}
                        transition={{ duration: 0.9, ease: 'easeInOut', repeat: Infinity, delay: i * 0.1 }}
                      />
                    ))}
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-[#E4DDCE]">
                  <motion.div
                    className="h-full rounded-full bg-[#D10E63]"
                    initial={false}
                    animate={{ width: reduceMotion ? '100%' : `${Math.min(step / (TOTAL_STEPS - 2), 1) * 100}%` }}
                    transition={{ duration: 0.6, ease }}
                  />
                </div>
              </div>
            </div>

            {/* Emma — fiche qui se construit */}
            <div className="relative p-5">
              {/* État vide avant l'analyse */}
              <AnimatePresence>
                {!showFiche && (
                  <motion.div
                    key="empty"
                    initial={false}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-5 text-center"
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-full border border-dashed border-[#CFC6B6]">
                      <Sparkles className="h-5 w-5 text-[#C0B6A4]" aria-hidden="true" />
                    </span>
                    <p className="max-w-[12rem] text-[11px] font-medium leading-snug text-[#A79E90]">{t.buildingLabel}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* La fiche */}
              <motion.div initial={false} animate={{ opacity: showFiche ? 1 : 0 }} transition={{ duration: 0.4, ease }}>
                {/* En-tête : photo + nom */}
                <motion.div
                  initial={false}
                  animate={{ opacity: showFiche ? 1 : 0, y: showFiche ? 0 : 10 }}
                  transition={{ duration: 0.45, ease }}
                  className="mb-4 flex items-center gap-3"
                >
                  <Image src="/images/emma-avatar.png" alt="" width={48} height={48} className="h-12 w-12 rounded-full object-cover ring-2 ring-[#D10E63]/25" />
                  <div className="min-w-0">
                    <span className="inline-flex items-center gap-1 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#D10E63]">
                      <Sparkles className="h-3 w-3" /> {isReady ? t.readyBadge : t.ficheEyebrow}
                    </span>
                    <p className="truncate font-sf text-lg font-bold leading-tight text-[#1C1A17]">{t.ficheName}</p>
                    <p className="truncate text-[11px] font-medium leading-tight text-[#6B6560]">{t.ficheRole}</p>
                  </div>
                </motion.div>

                {/* Contact */}
                <ul className="flex flex-col gap-1.5">
                  {t.contact.map((c, i) => {
                    const Icon = c.icon
                    return (
                      <motion.li
                        key={c.label}
                        initial={false}
                        animate={{ opacity: showContact ? 1 : 0, y: showContact ? 0 : 8 }}
                        transition={{ duration: 0.4, ease, delay: showContact && !reduceMotion ? i * 0.1 : 0 }}
                        className="flex items-center gap-2.5 rounded-lg border border-[#E4DDCE] bg-[#F3EFE6]/70 px-2.5 py-1.5 text-[11px] font-medium text-[#3F3A33]"
                      >
                        <Icon className="h-3.5 w-3.5 shrink-0 text-[#D10E63]" aria-hidden="true" />
                        <span className="truncate">{c.label}</span>
                      </motion.li>
                    )
                  })}
                </ul>

                {/* Expertises */}
                <motion.div
                  initial={false}
                  animate={{ opacity: showExpertise ? 1 : 0, y: showExpertise ? 0 : 8 }}
                  transition={{ duration: 0.4, ease }}
                  className="mt-3"
                >
                  <p className="mb-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#8A8175]">{t.expertisesLabel}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {t.expertises.map((e, i) => (
                      <motion.span
                        key={e}
                        initial={false}
                        animate={{ opacity: showExpertise ? 1 : 0, scale: showExpertise ? 1 : 0.9 }}
                        transition={{ duration: 0.35, ease, delay: showExpertise && !reduceMotion ? i * 0.07 : 0 }}
                        className="rounded-full border border-[#D10E63]/25 bg-[#D10E63]/[0.06] px-2 py-0.5 text-[10px] font-semibold text-[#A80B50]"
                      >
                        {e}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Missions */}
                <motion.div
                  initial={false}
                  animate={{ opacity: showMissions ? 1 : 0, y: showMissions ? 0 : 8 }}
                  transition={{ duration: 0.4, ease }}
                  className="mt-3"
                >
                  <p className="mb-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#8A8175]">{t.missionsLabel}</p>
                  <ul className="flex flex-col gap-1">
                    {t.ficheMissions.map((m) => (
                      <li key={m} className="flex items-center gap-1.5 text-[11px] font-medium text-[#3F3A33]">
                        <Check className="h-3 w-3 shrink-0 text-[#2E7D4F]" strokeWidth={3} aria-hidden="true" />
                        {m}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
