'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, Circle, Loader2 } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { Kicker } from '@/components/home/section-kicker'
import { useAlma } from '@/components/home/alma-panel-context'
import { track } from '@vercel/analytics'

const T = {
  fr: {
    eyebrow: 'Il vous manque quelqu’un',
    headline: 'Votre propre Collaborateur IA, prêt à travailler avec vos outils.',
    subtitle: 'Confiez-lui vos appels, emails, prospects, analyses ou tâches administratives. Il travaille avec vos outils et progresse à chaque mission.',
    proofs: ['7 jours pour tester une vraie mission', 'Sans carte bancaire', '1 million de tokens inclus'],
    cta: 'Confier une première mission',
    console: 'Préparation de mission',
    mission: 'Mission reçue',
    collaborator: 'Collaboratrice IA',
    assigned: 'Emma sélectionnée',
    equipping: 'Alma équipe Emma',
    ready: 'Prête à travailler',
    newRole: 'Nouveau rôle nécessaire',
    newRoleDetail: 'Cette mission demande un profil commercial distinct.',
    preparing: 'Alma prépare Chloé',
    chloeReady: 'Chloé rejoint votre équipe',
    cycle: 'Cycle',
    almaCaption: "Alma, coordinatrice de missions IA,\ncadre votre besoin et prépare vos collaborateurs",
    almaAction: "Parler à Alma",
  },
  en: {
    eyebrow: 'Someone is missing',
    headline: 'Your own AI Collaborator, ready to work with your tools.',
    subtitle: 'Entrust it with calls, emails, prospects, analysis or administrative work. It works with your tools and improves with every mission.',
    proofs: ['7 days to test a real mission', 'No credit card', '1 million tokens included'],
    cta: 'Hand over a first mission',
    console: 'Mission preparation',
    mission: 'Mission received',
    collaborator: 'AI Collaborator',
    assigned: 'Emma selected',
    equipping: 'Alma equips Emma',
    ready: 'Ready to work',
    newRole: 'New role required',
    newRoleDetail: 'This mission requires a distinct sales profile.',
    preparing: 'Alma prepares Chloé',
    chloeReady: 'Chloé joins your team',
    cycle: 'Cycle',
    almaCaption: "Alma, AI mission coordinator, scopes your needs and prepares your collaborators.",
    almaAction: "Talk to Alma",
  },
} as const

const JOURNEYS = {
  fr: [
    { mission: 'Traiter les emails entrants', skills: ['Gestion des emails', 'Priorisation', 'Outlook'] },
    { mission: 'Préparer les comptes rendus', skills: ['Transcription', 'Synthèse', 'Microsoft Teams'] },
    { mission: 'Organiser l’agenda', skills: ['Disponibilités', 'Planification', 'Google Agenda'] },
    { mission: 'Trouver de nouveaux prospects', skills: [] },
  ],
  en: [
    { mission: 'Handle incoming emails', skills: ['Email management', 'Prioritization', 'Outlook'] },
    { mission: 'Prepare meeting notes', skills: ['Transcription', 'Summarization', 'Microsoft Teams'] },
    { mission: 'Organize the calendar', skills: ['Availability', 'Planning', 'Google Calendar'] },
    { mission: 'Find new prospects', skills: [] },
  ],
} as const

const ease = [0.22, 1, 0.36, 1] as const
const PHASE_MS = 1300
type Phase = 0 | 1 | 2 | 3

export function HeroHybrid({ lang = 'fr' }: { lang?: Lang }) {
  const t = T[lang]
  const journeys = JOURNEYS[lang]
  const reduce = useReducedMotion()
  const { openAlma } = useAlma()
  const [cycle, setCycle] = useState(0)
  const [phase, setPhase] = useState<Phase>(0)
  const current = journeys[cycle]
  const isChloe = cycle === journeys.length - 1

  useEffect(() => {
    if (reduce) return
    const id = setTimeout(() => {
      if (phase < 3) setPhase((phase + 1) as Phase)
      else {
        setCycle((value) => (value + 1) % journeys.length)
        setPhase(0)
      }
    }, phase === 3 ? 1900 : PHASE_MS)
    return () => clearTimeout(id)
  }, [cycle, journeys.length, phase, reduce])

  const visiblePhase = reduce ? 3 : phase
  const enter = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay: reduce ? 0 : delay, ease },
  })

  return (
    <section className="relative overflow-hidden bg-[#F3EFE6] pb-12 pt-24 sm:pt-28 lg:pb-16">
      <div aria-hidden className="pointer-events-none absolute -right-40 top-0 h-[36rem] w-[36rem] rounded-full bg-[#D10E63]/[0.07] blur-3xl" />
      <div className="editorial-shell relative grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
        <div className="max-w-xl text-center sm:text-left">
          <motion.div {...enter(0)} className="mb-5 flex justify-center sm:justify-start"><Kicker>{t.eyebrow}</Kicker></motion.div>
          <motion.h1 {...enter(0.08)} className="hero-heading text-[#1C1A17]">{t.headline}</motion.h1>
          <motion.p {...enter(0.16)} className="mt-5 text-balance text-[17px] leading-relaxed text-[#4E483F] md:text-lg">{t.subtitle}</motion.p>

          <motion.div {...enter(0.28)} className="mt-7 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs font-medium text-[#6E665A] sm:justify-start">
            {t.proofs.map((proof) => <span key={proof} className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-[#D10E63]" />{proof}</span>)}
          </motion.div>

          <motion.div {...enter(0.34)} className="mt-8">
            <Link href="/decouvrir" onClick={() => track('home_cta_clicked', { position: 'hero', label: t.cta })} className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#D10E63] px-7 text-[15px] font-bold text-white shadow-[0_14px_30px_-12px_rgba(209,14,99,0.7)] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F3EFE6] sm:w-auto">
              {t.cta}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>

        <motion.div {...enter(0.18)} className="mx-auto w-full max-w-2xl">
          <motion.div>
          <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-[#17130F] text-[#F8F1E7] shadow-[0_34px_80px_-28px_rgba(23,19,15,0.65)] min-h-[420px]">
            <div aria-hidden className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#F15B9B] to-transparent" />
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
              <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#D10E63]" /><span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#D6CABD]">{t.console}</span></div>
              <span className="font-mono text-[10px] text-[#887D72]">{t.cycle} {cycle + 1}/4</span>
            </div>

            <div className="p-5 sm:p-7">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={cycle} initial={reduce ? false : { opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} exit={reduce ? { opacity: 0 } : { opacity: 0, x: -14 }} transition={{ duration: reduce ? 0 : 0.35, ease }}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#887D72]">{t.mission}</p>
                  <h2 className="mt-2 font-sf text-[25px] font-semibold tracking-[-0.025em] text-white sm:text-[30px]">{current.mission}</h2>

                  <div className="mt-7 grid gap-7 sm:grid-cols-[150px_1fr]">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                      <Image src={isChloe ? '/images/chloe-avatar.png' : '/images/emma-avatar.png'} alt={isChloe ? 'Chloé' : 'Emma'} width={56} height={56} className="h-14 w-14 rounded-full object-cover ring-2 ring-[#D10E63]/30" />
                      <p className="mt-3 font-sf text-lg font-semibold">{isChloe ? 'Chloé' : 'Emma'}</p>
                      <p className="mt-1 text-xs leading-relaxed text-[#D6CABD]">{isChloe ? t.preparing : t.collaborator}</p>
                    </div>

                    <ol className="space-y-4">
                      <TimelineRow label={t.mission} status={visiblePhase > 0 ? 'done' : 'active'} />
                      <TimelineRow label={isChloe ? t.newRole : t.assigned} detail={isChloe ? t.newRoleDetail : undefined} status={visiblePhase > 1 ? 'done' : visiblePhase === 1 ? 'active' : 'next'} />
                      <TimelineRow label={isChloe ? t.preparing : t.equipping} status={visiblePhase > 2 ? 'done' : visiblePhase === 2 ? 'active' : 'next'}>
                        {!isChloe && visiblePhase >= 2 && <div className="mt-3 flex flex-wrap gap-2">{current.skills.map((skill, index) => <motion.span key={skill} initial={reduce ? false : { opacity: 0, y: 6 }} animate={{ opacity: index < (visiblePhase === 2 ? 2 : 3) ? 1 : 0.3, y: 0 }} transition={{ delay: reduce ? 0 : index * 0.18 }} className="rounded-full border border-[#D10E63]/25 bg-[#D10E63]/10 px-2.5 py-1 text-[11px] text-[#F3B4CF]">{skill}</motion.span>)}</div>}
                      </TimelineRow>
                      <TimelineRow label={isChloe ? t.chloeReady : t.ready} status={visiblePhase === 3 ? 'done' : 'next'} />
                    </ol>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <motion.div {...enter(0.24)} className="mt-5 flex flex-col justify-between gap-4 rounded-[26px] border border-white/10 bg-[#17130F] p-4 text-left sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <Image 
                src="/alma-avatar.png" 
                alt="Alma" 
                width={40} 
                height={40} 
                className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-[#D10E63]/30" 
              />
              <p className="max-w-[280px] whitespace-pre-line text-[13px] font-medium leading-relaxed text-[#D6CABD] sm:max-w-none">
                {t.almaCaption}
              </p>
            </div>
            <button
              type="button"
              onClick={() => openAlma(undefined, 'hero_alma')}
              className="group flex items-center gap-1.5 self-start whitespace-nowrap text-xs font-bold text-[#F15B9B] hover:text-[#F8A3CB] sm:self-auto"
            >
              {t.almaAction}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </motion.div>
        </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function TimelineRow({ label, detail, status, children }: { label: string; detail?: string; status: 'done' | 'active' | 'next'; children?: React.ReactNode }) {
  return (
    <li className="grid grid-cols-[20px_1fr] gap-3">
      <span className="mt-0.5 flex h-5 w-5 items-center justify-center">
        {status === 'done' ? <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D10E63] text-white"><Check className="h-3 w-3" strokeWidth={3} /></span> : status === 'active' ? <Loader2 className="h-5 w-5 animate-spin text-[#F15B9B]" /> : <Circle className="h-4 w-4 text-[#625A52]" />}
      </span>
      <div className={status === 'next' ? 'text-[#AFA397]' : 'text-[#F8F1E7]'}>
        <p className="text-sm font-medium">{label}</p>
        {detail && <p className="mt-1 text-xs leading-relaxed text-[#AFA397]">{detail}</p>}
        {children}
      </div>
    </li>
  )
}
