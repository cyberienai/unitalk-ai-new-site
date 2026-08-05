'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Calendar, Check, Mail, Phone, Sparkles } from 'lucide-react'

const T = {
  fr: {
    eyebrow: 'Il vous manque quelqu’un.',
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
    almaLead: 'Tout commence par une simple conversation avec Alma.',
    cta: 'Commencer gratuitement',
    proofs: ['Aucune carte bancaire', 'Essai gratuit', 'Configuration en quelques minutes'],
    // Visual
    almaName: 'Alma',
    almaRole: 'conseillère IA',
    convo: [
      'Bonjour ! Parlez-moi de votre entreprise.',
      'J’analyse votre activité…',
      'Voici le Collaborateur IA que je vous recommande.',
    ],
    listening: 'Alma vous écoute',
    ficheEyebrow: 'Prend vie',
    ficheName: 'Emma',
    ficheRole: 'Collaboratrice IA · Assistante de direction',
    contact: [
      { icon: Phone, label: '+33 1 84 80 00 00' },
      { icon: Mail, label: 'emma@votreentreprise.com' },
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
    almaLead: 'It all starts with a simple conversation with Alma.',
    cta: 'Start for free',
    proofs: ['No credit card', 'Free trial', 'Set up in minutes'],
    // Visual
    almaName: 'Alma',
    almaRole: 'AI advisor',
    convo: [
      'Hi! Tell me about your company.',
      'Analyzing your business…',
      'Here is the AI Collaborator I recommend.',
    ],
    listening: 'Alma is listening',
    ficheEyebrow: 'Coming to life',
    ficheName: 'Emma',
    ficheRole: 'AI Collaborator · Executive assistant',
    contact: [
      { icon: Phone, label: '+33 1 84 80 00 00' },
      { icon: Mail, label: 'emma@yourcompany.com' },
      { icon: Calendar, label: 'Calendar connected' },
    ],
    expertisesLabel: 'Expertise',
    expertises: ['Calendar', 'Meetings', 'Reporting', 'Emails'],
    missionsLabel: 'Missions',
    ficheMissions: ['Prepare your meetings', 'Track your decisions'],
  },
} as const

const ease = [0.22, 1, 0.36, 1] as const

export function HeroV2({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = T[lang]
  const reduceMotion = useReducedMotion()

  const [missionIndex, setMissionIndex] = useState(0)
  useEffect(() => {
    if (reduceMotion) return
    const id = setInterval(() => {
      setMissionIndex((i) => (i + 1) % t.missions.length)
    }, 2200)
    return () => clearInterval(id)
  }, [reduceMotion, t.missions.length])

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
          <motion.p {...enter(0.04)} className="mb-5 text-center font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D10E63] sm:mb-6 sm:text-left">
            {t.eyebrow}
          </motion.p>

          <motion.h1
            {...enter(0.1)}
            className="text-balance text-center font-sf text-[clamp(2rem,5vw,4.25rem)] font-semibold leading-[1.06] tracking-[-0.055em] text-[#1C1A17] sm:text-left sm:leading-[1]"
          >
            {t.title}
          </motion.h1>

          <div className="mt-6 text-center sm:text-left">
            <motion.p {...enter(0.18)} className="font-sf text-lg font-semibold leading-snug text-[#4E483F] md:text-xl">
              {t.readyLead}{' '}
              <span className="inline-flex min-h-[1.2em] items-baseline">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={missionIndex}
                    initial={reduceMotion ? false : { opacity: 0, y: '0.4em' }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: '-0.4em' }}
                    transition={{ duration: 0.4, ease }}
                    className="font-bold text-[#D10E63]"
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
            <Link
              href="/decouvrir"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#D10E63] px-7 text-sm font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2"
            >
              {t.cta}
              <ArrowRight className="h-4 w-4" />
            </Link>

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

        {/* Visual — à gauche une conversation avec Alma, à droite un Collaborateur IA prend vie */}
        <motion.div {...enter(0.2)} className="relative mx-auto w-full max-w-xl">
          <div className="premium-shadow grid overflow-hidden rounded-[1.75rem] border border-[#D8D0C2] bg-[#FBF9F3] sm:grid-cols-[0.9fr_1.1fr]">
            {/* Alma conversation */}
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

              <div className="flex flex-col gap-2">
                {t.convo.map((line, i) => (
                  <motion.p
                    key={line}
                    initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease, delay: reduceMotion ? 0 : 0.5 + i * 0.5 }}
                    className="w-fit max-w-[92%] rounded-2xl rounded-tl-sm border border-[#E4DDCE] bg-[#FBF9F3] px-3 py-2 text-[12px] leading-snug text-[#3F3A33]"
                  >
                    {line}
                  </motion.p>
                ))}
              </div>

              {/* Voice waveform */}
              <div className="mt-auto flex items-center gap-2 rounded-full border border-[#E4DDCE] bg-[#FBF9F3] px-3 py-2">
                <span className="flex h-6 items-end gap-[3px]" aria-hidden="true">
                  {[6, 12, 8, 16, 10, 14, 7].map((h, i) => (
                    <motion.span
                      key={i}
                      className="w-[3px] rounded-full bg-[#D10E63]"
                      style={{ height: h }}
                      animate={reduceMotion ? undefined : { scaleY: [1, 0.4, 1] }}
                      transition={{ duration: 0.9, ease: 'easeInOut', repeat: Infinity, delay: i * 0.1 }}
                    />
                  ))}
                </span>
                <span className="text-[11px] font-medium text-[#8A8175]">{t.listening}</span>
              </div>
            </div>

            {/* Collaborateur IA fiche */}
            <motion.div
              className="p-5"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: reduceMotion ? 0 : 0.14, delayChildren: reduceMotion ? 0 : 0.9 } },
              }}
            >
              {(() => {
                const item = {
                  hidden: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
                }
                return (
                  <>
                    <motion.div variants={item} className="mb-4 flex items-center gap-3">
                      <Image src="/images/emma-avatar.png" alt="" width={48} height={48} className="h-12 w-12 rounded-full object-cover ring-2 ring-[#D10E63]/25" />
                      <div className="min-w-0">
                        <span className="inline-flex items-center gap-1 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#D10E63]">
                          <Sparkles className="h-3 w-3" /> {t.ficheEyebrow}
                        </span>
                        <p className="truncate font-sf text-lg font-bold leading-tight text-[#1C1A17]">{t.ficheName}</p>
                        <p className="truncate text-[11px] font-medium leading-tight text-[#6B6560]">{t.ficheRole}</p>
                      </div>
                    </motion.div>

                    <ul className="flex flex-col gap-1.5">
                      {t.contact.map((c) => {
                        const Icon = c.icon
                        return (
                          <motion.li variants={item} key={c.label} className="flex items-center gap-2.5 rounded-lg border border-[#E4DDCE] bg-[#F3EFE6]/70 px-2.5 py-1.5 text-[11px] font-medium text-[#3F3A33]">
                            <Icon className="h-3.5 w-3.5 shrink-0 text-[#D10E63]" aria-hidden="true" />
                            <span className="truncate">{c.label}</span>
                          </motion.li>
                        )
                      })}
                    </ul>

                    <motion.div variants={item} className="mt-3">
                      <p className="mb-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#8A8175]">{t.expertisesLabel}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {t.expertises.map((e) => (
                          <span key={e} className="rounded-full border border-[#D10E63]/25 bg-[#D10E63]/[0.06] px-2 py-0.5 text-[10px] font-semibold text-[#A80B50]">
                            {e}
                          </span>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div variants={item} className="mt-3">
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
                  </>
                )
              })()}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
