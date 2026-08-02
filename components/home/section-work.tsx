'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { Check, Globe, Filter, Users, Mail, CalendarPlus, Loader2, type LucideIcon } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { Kicker } from './section-kicker'

const T = {
  fr: {
    kicker: 'Regardez-le travailler',
    titleA: 'Un Collaborateur IA ne répond pas.',
    titleB: 'Il travaille.',
    verbs: ['Il recherche.', 'Il analyse.', 'Il rédige.', 'Il planifie.', 'Il appelle.', 'Il automatise.', 'Il collabore avec votre équipe.'],
    missionLabel: 'Mission reçue',
    mission: 'Trouve 20 prospects.',
    steps: ['Recherche sur le web', 'Qualification des prospects', 'Création des fiches CRM', 'Email de contact préparé', 'Rendez-vous ajouté au calendrier'],
    working: 'En cours…',
    done: 'Mission accomplie',
  },
  en: {
    kicker: 'Watch it work',
    titleA: 'An AI Collaborator doesn’t just reply.',
    titleB: 'It works.',
    verbs: ['It researches.', 'It analyzes.', 'It writes.', 'It plans.', 'It calls.', 'It automates.', 'It collaborates with your team.'],
    missionLabel: 'Mission received',
    mission: 'Find 20 leads.',
    steps: ['Web research', 'Lead qualification', 'CRM records created', 'Outreach email prepared', 'Meeting added to calendar'],
    working: 'Working…',
    done: 'Mission complete',
  },
}

const STEP_ICONS: LucideIcon[] = [Globe, Filter, Users, Mail, CalendarPlus]

export function SectionWork({ lang }: { lang: Lang }) {
  const t = T[lang]
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })
  const [step, setStep] = useState(-1)

  useEffect(() => {
    if (!inView) return
    let i = -1
    const id = setInterval(() => {
      i += 1
      setStep(i)
      if (i >= t.steps.length) clearInterval(id)
    }, 900)
    return () => clearInterval(id)
  }, [inView, t.steps.length])

  const allDone = step >= t.steps.length

  return (
    <section className="bg-[#1C1A17] px-5 py-20 text-[#FBF9F3] sm:px-8 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
        {/* Copy */}
        <div>
          <Kicker dark>{t.kicker}</Kicker>
          <h2 className="mt-3 text-balance font-sf text-3xl font-bold tracking-[-0.02em] sm:text-4xl">
            {t.titleA}
            <br />
            <span className="text-[#E8A0BF]">{t.titleB}</span>
          </h2>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
            {t.verbs.map((v) => (
              <li key={v} className="text-lg font-medium text-[#C8C1B4]">
                {v}
              </li>
            ))}
          </ul>
        </div>

        {/* Animation */}
        <div ref={ref} className="rounded-3xl border border-[#332F2A] bg-[#26231F] p-5 sm:p-6">
          <div className="flex items-center gap-3 border-b border-[#332F2A] pb-4">
            <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-[#D10E63]/40">
              <Image src="/images/emma-avatar.png" alt="Emma" fill className="object-cover" sizes="44px" />
            </span>
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8A8175]">{t.missionLabel}</p>
              <p className="text-[15px] font-semibold text-[#FBF9F3]">&ldquo;{t.mission}&rdquo;</p>
            </div>
          </div>

          <ul className="mt-4 flex flex-col gap-2.5">
            {t.steps.map((label, i) => {
              const Icon = STEP_ICONS[i]
              const active = step >= i
              const current = step === i && !allDone
              return (
                <motion.li
                  key={label}
                  initial={false}
                  animate={{ opacity: active ? 1 : 0.4 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-3 rounded-xl bg-[#1C1A17] px-3.5 py-3"
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                      active ? 'bg-[#D10E63] text-[#FBF9F3]' : 'bg-[#332F2A] text-[#8A8175]'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className={`flex-1 text-sm font-medium ${active ? 'text-[#FBF9F3]' : 'text-[#8A8175]'}`}>{label}</span>
                  {active ? (
                    <Check className="h-4 w-4 text-[#7BB98C]" />
                  ) : current ? (
                    <Loader2 className="h-4 w-4 animate-spin text-[#8A8175]" />
                  ) : null}
                </motion.li>
              )
            })}
          </ul>

          <div className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-[#1C1A17] py-3">
            {allDone ? (
              <>
                <Check className="h-4 w-4 text-[#7BB98C]" />
                <span className="text-sm font-semibold text-[#7BB98C]">{t.done}</span>
              </>
            ) : (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-[#8A8175]" />
                <span className="text-sm font-medium text-[#8A8175]">{t.working}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
