'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Calendar, Check, Mail, Phone } from 'lucide-react'
import { Kicker } from '@/components/home/section-kicker'
import { CtaButton } from '@/components/ui/cta-button'

const T = {
  fr: {
    eyebrow: 'Il vous manque quelqu’un',
    title: 'Recrutez votre premier Collaborateur IA.',
    readyLead: 'Votre Collaborateur IA est prêt à',
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
    // Visual — la fiche vivante d'Emma (le résultat)
    ficheName: 'Emma',
    ficheRole: 'Collaboratrice IA · Assistante de direction',
    company: 'Solvea',
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
    summary: 'Emma a bouclé sa matinée.',
  },
  en: {
    eyebrow: 'Someone is missing',
    title: 'Hire your first AI Collaborator.',
    readyLead: 'Your AI Collaborator is ready to',
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
    // Visual — Emma's live profile (the outcome)
    ficheName: 'Emma',
    ficheRole: 'AI Collaborator · Executive assistant',
    company: 'Solvea',
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
    summary: 'Emma wrapped up her morning.',
  },
} as const

const ease = [0.22, 1, 0.36, 1] as const

// Progression des tâches d'Emma : 0,1,2 = tâche active, 3 = tout terminé (hold), puis reboucle.
const TASK_STEPS = 4
const STEP_MS = 2200

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

  // Progression des tâches d'Emma (l'accroche : elle travaille déjà)
  const [taskStep, setTaskStep] = useState(reduceMotion ? TASK_STEPS - 1 : 0)
  useEffect(() => {
    if (reduceMotion) {
      setTaskStep(TASK_STEPS - 1)
      return
    }
    setTaskStep(0)
    const id = setInterval(() => {
      setTaskStep((s) => (s + 1) % TASK_STEPS)
    }, STEP_MS)
    return () => clearInterval(id)
  }, [reduceMotion, lang])

  const allDone = taskStep >= t.activities.length

  const enter = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.75, ease, delay: reduceMotion ? 0 : delay },
  })

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
            <motion.p
              {...enter(0.18)}
              className="flex min-h-[3.5rem] flex-wrap items-start justify-center gap-x-2 font-sf text-lg font-semibold leading-tight text-[#4E483F] sm:justify-start md:min-h-[4.5rem] md:text-xl"
            >
              <span className="pt-1 md:pt-2">{t.readyLead}</span>
              <span className="inline-flex items-start">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={missionIndex}
                    initial={reduceMotion ? false : { opacity: 0, y: '0.4em' }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: '-0.4em' }}
                    transition={{ duration: 0.4, ease }}
                    className="text-balance text-xl font-extrabold leading-tight tracking-tight text-[#D10E63] md:text-3xl"
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

        {/* Visual — Emma en poste : le résultat, une collaboratrice qui travaille déjà */}
        <motion.div {...enter(0.2)} className="relative mx-auto w-full max-w-md">
          <div className="premium-shadow overflow-hidden rounded-[1.75rem] border border-[#D8D0C2] bg-[#FBF9F3] transition-transform duration-500 hover:-translate-y-1">
            {/* En-tête : Emma, identité + statut en poste */}
            <div className="flex items-center gap-3.5 border-b border-[#E4DDCE] bg-[#F3EFE6]/50 p-5">
              <span className="relative shrink-0">
                <Image
                  src="/images/emma-avatar.png"
                  alt=""
                  width={52}
                  height={52}
                  className="rounded-full object-cover ring-2 ring-[#D10E63]/25"
                  style={{ height: 52, width: 52 }}
                />
                <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center" aria-hidden="true">
                  <motion.span
                    className="absolute h-3.5 w-3.5 rounded-full bg-[#2E7D4F]/40"
                    animate={reduceMotion ? undefined : { scale: [1, 1.9], opacity: [0.6, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                  />
                  <span className="h-2.5 w-2.5 rounded-full border-2 border-[#FBF9F3] bg-[#2E7D4F]" />
                </span>
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-sf text-xl font-bold leading-tight text-[#1C1A17]">{t.ficheName}</p>
                <p className="truncate text-[12px] font-medium leading-tight text-[#6B6560]">{t.ficheRole}</p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#2E7D4F]/25 bg-[#2E7D4F]/[0.08] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-[#2E7D4F]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2E7D4F]" aria-hidden="true" />
                {t.statusLabel}
              </span>
            </div>

            <div className="flex flex-col gap-4 p-5">
              {/* Coordonnées : Emma est une vraie coéquipière */}
              <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                {t.contact.map((c, i) => {
                  const Icon = c.icon
                  return (
                    <li
                      key={c.label}
                      className={`flex items-center gap-2 rounded-lg border border-[#E4DDCE] bg-[#F3EFE6]/60 px-2.5 py-1.5 text-[11px] font-medium text-[#3F3A33] ${i === 0 ? 'sm:col-span-2' : ''}`}
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0 text-[#D10E63]" aria-hidden="true" />
                      <span className="truncate">{c.label}</span>
                    </li>
                  )
                })}
              </ul>

              {/* Expertises */}
              <div>
                <p className="mb-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#8A8175]">{t.expertisesLabel}</p>
                <div className="flex flex-wrap gap-1.5">
                  {t.expertises.map((e) => (
                    <span
                      key={e}
                      className="rounded-full border border-[#D10E63]/25 bg-[#D10E63]/[0.06] px-2 py-0.5 text-[10px] font-semibold text-[#A80B50]"
                    >
                      {e}
                    </span>
                  ))}
                </div>
              </div>

              {/* Activité en direct — l'accroche : elle travaille déjà */}
              <div className="rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-3.5">
                <div className="mb-2.5 flex items-center justify-between">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#8A8175]">{t.activityLabel}</span>
                  <span className="flex h-3 items-end gap-[2px]" aria-hidden="true">
                    {[6, 11, 8].map((h, i) => (
                      <motion.span
                        key={i}
                        className="w-[2px] rounded-full bg-[#D10E63]"
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
                            ? 'bg-[#D10E63]/[0.06] text-[#1C1A17]'
                            : done
                              ? 'text-[#3F3A33]'
                              : 'text-[#B4AB9C]'
                        }`}
                      >
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center" aria-hidden="true">
                          {done ? (
                            <motion.span
                              initial={reduceMotion ? false : { scale: 0.4, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.35, ease }}
                              className="flex h-4 w-4 items-center justify-center rounded-full bg-[#2E7D4F]/12"
                            >
                              <Check className="h-2.5 w-2.5 text-[#2E7D4F]" strokeWidth={3.5} />
                            </motion.span>
                          ) : live ? (
                            <span className="flex items-center gap-[2px]">
                              {[0, 1, 2].map((d) => (
                                <motion.span
                                  key={d}
                                  className="h-1 w-1 rounded-full bg-[#D10E63]"
                                  animate={reduceMotion ? undefined : { opacity: [0.3, 1, 0.3] }}
                                  transition={{ duration: 1, repeat: Infinity, delay: d * 0.18 }}
                                />
                              ))}
                            </span>
                          ) : (
                            <span className="h-1.5 w-1.5 rounded-full border border-[#CFC6B6]" />
                          )}
                        </span>
                        <span className="flex-1 truncate">{task}</span>
                        {(done || live) && (
                          <span
                            className={`shrink-0 font-mono text-[8px] font-bold uppercase tracking-[0.1em] ${live ? 'text-[#D10E63]' : 'text-[#2E7D4F]'}`}
                          >
                            {live ? t.liveLabel : t.doneLabel}
                          </span>
                        )}
                      </li>
                    )
                  })}
                </ul>

                <AnimatePresence>
                  {allDone && (
                    <motion.p
                      key="summary"
                      initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease }}
                      className="mt-2 flex items-center gap-1.5 border-t border-[#E4DDCE] pt-2 text-[11px] font-semibold text-[#2E7D4F]"
                    >
                      <Check className="h-3.5 w-3.5 shrink-0" strokeWidth={3} aria-hidden="true" />
                      {t.summary}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
