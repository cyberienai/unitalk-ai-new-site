'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, Mic, ShieldCheck, CalendarCheck, FileText } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { collaboratorHref } from '@/lib/collaborators-catalog'
import { ACME_WORKSPACES } from '@/lib/acme-demo'
import { Kicker } from './section-kicker'

const ease = [0.22, 1, 0.36, 1] as const

const T = {
  fr: {
    kicker: 'La preuve en action',
    title: 'Voyez un Collaborateur IA travailler pour de vrai.',
    lead: 'Vous lui parlez, il exécute. Voici Emma, assistante de direction, sur une demande réelle.',
    online: 'En ligne',
    badge: 'Serveur privé · France',
    voiceLabel: 'Demande vocale',
    request:
      '« Emma, organise un point commercial jeudi et prépare le compte-rendu du dernier appel client. »',
    stepsLabel: 'Emma exécute',
    steps: [
      'Analyse de la demande',
      'Vérification des agendas — jeudi 14h libre',
      'Invitations envoyées à 4 participants',
      'Compte-rendu généré depuis l’appel',
    ],
    deliverablesLabel: 'Livrables',
    invite: { title: 'Point commercial', meta: 'Jeudi 14h00 · 4 participants' },
    doc: { title: 'Compte-rendu — Appel client Acme', meta: 'PDF · 2 pages · partagé' },
    todayLabel: 'Aujourd’hui',
    cta: 'Voir Emma en action',
  },
  en: {
    kicker: 'Proof in action',
    title: 'Watch an AI Collaborator actually do the work.',
    lead: 'You talk, it executes. Here is Emma, executive assistant, on a real request.',
    online: 'Online',
    badge: 'Private server · France',
    voiceLabel: 'Voice request',
    request:
      '“Emma, set up a sales sync on Thursday and prepare the recap of the last client call.”',
    stepsLabel: 'Emma executes',
    steps: [
      'Parsing the request',
      'Checking calendars — Thursday 2pm free',
      'Invites sent to 4 attendees',
      'Recap generated from the call',
    ],
    deliverablesLabel: 'Deliverables',
    invite: { title: 'Sales sync', meta: 'Thursday 2:00pm · 4 attendees' },
    doc: { title: 'Recap — Acme client call', meta: 'PDF · 2 pages · shared' },
    todayLabel: 'Today',
    cta: 'See Emma in action',
  },
} as const

function useCountUp(target: number, active: boolean, reduce: boolean) {
  const [value, setValue] = useState(reduce ? target : 0)
  useEffect(() => {
    if (!active) return
    if (reduce) {
      setValue(target)
      return
    }
    let raf = 0
    const start = performance.now()
    const duration = 1100
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(target * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, active, reduce])
  return value
}

function Counter({ value, label, active, reduce }: { value: number; label: string; active: boolean; reduce: boolean }) {
  const n = useCountUp(value, active, reduce)
  return (
    <div className="rounded-xl border border-[#3A352E] bg-[#26231E] px-4 py-3">
      <div className="font-sf text-2xl font-semibold tracking-tight text-[#F3EFE6] sm:text-3xl">{n}</div>
      <div className="mt-0.5 text-[11px] font-medium leading-tight text-[#A9A296]">{label}</div>
    </div>
  )
}

export function SectionProof({ lang = 'fr' }: { lang?: Lang }) {
  const t = T[lang]
  const reduce = useReducedMotion() ?? false
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const today = ACME_WORKSPACES.emma.today
  const href = collaboratorHref('emma')

  // Sequenced reveal of the steps, then the deliverables.
  const [step, setStep] = useState(reduce ? t.steps.length : 0)
  const [showDeliverables, setShowDeliverables] = useState(reduce)

  useEffect(() => {
    if (!inView || reduce) return
    setStep(0)
    setShowDeliverables(false)
    const timers: ReturnType<typeof setTimeout>[] = []
    t.steps.forEach((_, i) => {
      timers.push(setTimeout(() => setStep(i + 1), 700 + i * 750))
    })
    timers.push(setTimeout(() => setShowDeliverables(true), 700 + t.steps.length * 750))
    return () => timers.forEach(clearTimeout)
  }, [inView, reduce, t.steps])

  return (
    <section className="bg-[#1C1A17] py-20 text-[#F3EFE6] sm:py-28">
      <div className="editorial-shell" ref={ref}>
        <div className="mx-auto max-w-2xl text-center sm:mx-0 sm:text-left">
          <Kicker dark>{t.kicker}</Kicker>
          <h2 className="mt-3 text-balance font-sf text-[clamp(1.9rem,3.4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
            {t.title}
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-[#A9A296] sm:text-lg">{t.lead}</p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.6fr_1fr]">
          {/* Product window — clickable to Emma's profile */}
          <Link
            href={href}
            aria-label={t.cta}
            className="group block overflow-hidden rounded-3xl border border-[#3A352E] bg-[#211E1A] shadow-2xl transition-colors hover:border-[#D10E63] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1C1A17]"
          >
            {/* Window chrome */}
            <div className="flex items-center gap-3 border-b border-[#3A352E] bg-[#26231E] px-4 py-3">
              <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full ring-1 ring-[#3A352E]">
                <Image src="/images/emma-avatar.png" alt="Emma" fill sizes="32px" className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 text-sm font-semibold text-[#F3EFE6]">
                  Emma
                  <span className="flex items-center gap-1 text-[11px] font-medium text-[#34D399]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#34D399]" aria-hidden="true" />
                    {t.online}
                  </span>
                </div>
              </div>
              <span className="hidden items-center gap-1.5 rounded-full border border-[#3A352E] bg-[#1C1A17] px-2.5 py-1 text-[11px] font-medium text-[#A9A296] sm:inline-flex">
                <ShieldCheck className="h-3.5 w-3.5 text-[#E8A0BF]" />
                {t.badge}
              </span>
            </div>

            {/* Conversation body */}
            <div className="space-y-5 p-5 sm:p-6">
              {/* Voice request */}
              <div>
                <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#A9A296]">
                  <Mic className="h-3.5 w-3.5 text-[#E8A0BF]" />
                  {t.voiceLabel}
                </div>
                <div className="flex items-start gap-3 rounded-2xl border border-[#3A352E] bg-[#1C1A17] px-4 py-3">
                  <div className="flex h-6 items-center gap-[3px]" aria-hidden="true">
                    {[9, 16, 7, 20, 12, 18, 8].map((h, i) => (
                      <motion.span
                        key={i}
                        className="w-[3px] rounded-full bg-[#D10E63]"
                        initial={{ height: 4 }}
                        animate={reduce ? { height: h } : { height: [4, h, 6, h] }}
                        transition={reduce ? undefined : { duration: 1.2, repeat: Infinity, delay: i * 0.09, ease: 'easeInOut' }}
                        style={{ height: h }}
                      />
                    ))}
                  </div>
                  <p className="text-pretty text-sm leading-relaxed text-[#F3EFE6]">{t.request}</p>
                </div>
              </div>

              {/* Steps */}
              <div>
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#A9A296]">
                  {t.stepsLabel}
                </div>
                <ul className="space-y-2">
                  {t.steps.map((s, i) => {
                    const done = i < step
                    return (
                      <li
                        key={s}
                        className={`flex items-center gap-2.5 text-sm transition-all duration-500 ${
                          done ? 'text-[#F3EFE6] opacity-100' : 'text-[#6F6A61] opacity-40'
                        }`}
                      >
                        <span
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-colors ${
                            done ? 'bg-[#34D399] text-[#0B140F]' : 'border border-[#3A352E] bg-transparent'
                          }`}
                        >
                          {done && <Check className="h-3 w-3" strokeWidth={3} />}
                        </span>
                        {s}
                      </li>
                    )
                  })}
                </ul>
              </div>

              {/* Deliverables */}
              <motion.div
                initial={false}
                animate={{ opacity: showDeliverables ? 1 : 0, y: showDeliverables ? 0 : 12 }}
                transition={{ duration: 0.5, ease }}
                className="space-y-2"
                aria-hidden={!showDeliverables}
              >
                <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#A9A296]">
                  {t.deliverablesLabel}
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-[#3A352E] bg-[#26231E] px-4 py-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#D10E63]/15 text-[#E8A0BF]">
                    <CalendarCheck className="h-4.5 w-4.5" />
                  </span>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-[#F3EFE6]">{t.invite.title}</div>
                    <div className="truncate text-xs text-[#A9A296]">{t.invite.meta}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-[#3A352E] bg-[#26231E] px-4 py-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#D10E63]/15 text-[#E8A0BF]">
                    <FileText className="h-4.5 w-4.5" />
                  </span>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-[#F3EFE6]">{t.doc.title}</div>
                    <div className="truncate text-xs text-[#A9A296]">{t.doc.meta}</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </Link>

          {/* Today rail */}
          <div className="flex flex-col gap-4">
            <div className="rounded-3xl border border-[#3A352E] bg-[#211E1A] p-5 sm:p-6">
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#A9A296]">
                {t.todayLabel}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {today.map((item) => (
                  <Counter key={item.label[lang]} value={item.value} label={item.label[lang]} active={inView} reduce={reduce} />
                ))}
              </div>
            </div>
            <Link
              href={href}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#D10E63] px-6 py-3.5 text-sm font-semibold text-[#F3EFE6] transition-colors hover:bg-[#B00C54] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A0BF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1C1A17]"
            >
              {t.cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
