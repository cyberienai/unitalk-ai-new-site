'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Eye, ShieldCheck, FolderOpen, Target, Cpu, CheckCircle2, PackageCheck, type LucideIcon } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { Kicker } from './section-kicker'

type Stage = { label: string; caption: string; icon: LucideIcon }
type Pillar = { title: string; body: string; icon: LucideIcon }

const T: Record<Lang, {
  kicker: string
  titleA: string
  titleB: string
  subtitle: string
  claireName: string
  claireMsg: string
  emmaName: string
  emmaProfile: string
  emmaMsg: string
  laterLabel: string
  emmaResult: string
  review: string
  validate: string
  timelineLabel: string
  stages: Stage[]
  pillars: Pillar[]
  cta: string
}> = {
  fr: {
    kicker: 'Regardez-le travailler',
    titleA: 'Vous donnez le cap.',
    titleB: 'Il revient avec le travail accompli.',
    subtitle:
      'Dans votre Workspace, humains et Collaborateurs IA partagent leurs Missions, leurs fichiers, leurs validations et leurs résultats.',
    claireName: 'Claire',
    claireMsg: 'Emma, prépare la prospection pour notre nouvelle offre.',
    emmaName: 'Emma',
    emmaProfile: 'Profil Prospection',
    emmaMsg:
      'Je vais vérifier la cible, sélectionner les entreprises pertinentes et préparer les prises de contact. Je vous demanderai confirmation avant tout envoi.',
    laterLabel: 'Plus tard',
    emmaResult: '36 entreprises analysées. 12 retenues. Les messages sont prêts pour validation.',
    review: 'Examiner',
    validate: 'Valider',
    timelineLabel: 'Le déroulé d’une Mission',
    stages: [
      { label: 'Objectif', caption: 'Vous fixez le résultat attendu.', icon: Target },
      { label: 'Travail', caption: 'Le Collaborateur IA exécute la Mission.', icon: Cpu },
      { label: 'Validation', caption: 'Vous approuvez avant toute action sensible.', icon: CheckCircle2 },
      { label: 'Résultat', caption: 'Le livrable et ses sources restent accessibles.', icon: PackageCheck },
    ],
    pillars: [
      { title: 'Le travail reste visible', body: 'Suivez les Missions en cours, les étapes accomplies et les éventuels blocages.', icon: Eye },
      { title: 'Les décisions restent humaines', body: 'Approuvez, modifiez ou refusez les actions sensibles.', icon: ShieldCheck },
      { title: 'Les résultats restent accessibles', body: 'Retrouvez les livrables, les sources et les décisions prises.', icon: FolderOpen },
    ],
    cta: 'Découvrir le Workspace',
  },
  en: {
    kicker: 'Watch it work',
    titleA: 'You set the direction.',
    titleB: 'It comes back with the work done.',
    subtitle:
      'In your Workspace, humans and AI Collaborators share their Missions, files, validations and results.',
    claireName: 'Claire',
    claireMsg: 'Emma, prepare the prospecting for our new offer.',
    emmaName: 'Emma',
    emmaProfile: 'Prospecting Profile',
    emmaMsg:
      'I’ll verify the target, select the relevant companies and prepare the outreach. I’ll ask for confirmation before anything is sent.',
    laterLabel: 'Later',
    emmaResult: '36 companies analyzed. 12 selected. The messages are ready for validation.',
    review: 'Review',
    validate: 'Validate',
    timelineLabel: 'How a Mission unfolds',
    stages: [
      { label: 'Goal', caption: 'You set the expected result.', icon: Target },
      { label: 'Work', caption: 'The AI Collaborator runs the Mission.', icon: Cpu },
      { label: 'Validation', caption: 'You approve before any sensitive action.', icon: CheckCircle2 },
      { label: 'Result', caption: 'The deliverable and its sources stay accessible.', icon: PackageCheck },
    ],
    pillars: [
      { title: 'The work stays visible', body: 'Track ongoing Missions, completed steps and any blockers.', icon: Eye },
      { title: 'Decisions stay human', body: 'Approve, edit or refuse sensitive actions.', icon: ShieldCheck },
      { title: 'Results stay accessible', body: 'Find the deliverables, the sources and the decisions made.', icon: FolderOpen },
    ],
    cta: 'Discover the Workspace',
  },
}

export function SectionWork({ lang }: { lang: Lang }) {
  const t = T[lang]
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })
  const [stage, setStage] = useState(0)

  useEffect(() => {
    if (!inView) return
    const id = setInterval(() => {
      setStage((s) => (s >= t.stages.length - 1 ? s : s + 1))
    }, 1600)
    return () => clearInterval(id)
  }, [inView, t.stages.length])

  return (
    <section className="bg-[#1C1A17] px-5 py-20 text-[#FBF9F3] sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <Kicker dark>{t.kicker}</Kicker>
          <h2 className="mt-3 text-balance font-sf text-3xl font-bold tracking-[-0.02em] sm:text-4xl">
            {t.titleA}
            <br />
            <span className="text-[#E8A0BF]">{t.titleB}</span>
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-[#C8C1B4]">{t.subtitle}</p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:items-start">
          {/* Workspace conversation */}
          <div className="rounded-3xl border border-[#332F2A] bg-[#26231F] p-5 sm:p-6">
            <div className="flex flex-col gap-4">
              {/* Claire */}
              <div className="flex items-start gap-3">
                <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-2 ring-[#FBF9F3]/10">
                  <Image src="/images/claire-avatar.png" alt={t.claireName} fill className="object-cover" sizes="36px" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-[#8A8175]">{t.claireName}</p>
                  <div className="mt-1 rounded-2xl rounded-tl-sm bg-[#332F2A] px-4 py-2.5 text-sm leading-relaxed text-[#FBF9F3]">
                    {t.claireMsg}
                  </div>
                </div>
              </div>

              {/* Emma reply */}
              <div className="flex items-start gap-3">
                <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-2 ring-[#D10E63]/40">
                  <Image src="/images/emma-avatar.png" alt={t.emmaName} fill className="object-cover" sizes="36px" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-[#E8A0BF]">
                    {t.emmaName} <span className="font-normal text-[#8A8175]">· {t.emmaProfile}</span>
                  </p>
                  <div className="mt-1 rounded-2xl rounded-tl-sm bg-[#D10E63]/12 px-4 py-2.5 text-sm leading-relaxed text-[#F3DCE7]">
                    {t.emmaMsg}
                  </div>
                </div>
              </div>

              {/* Later — result */}
              <div className="flex items-center gap-3 pt-1">
                <span className="h-px flex-1 bg-[#332F2A]" />
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8A8175]">{t.laterLabel}</span>
                <span className="h-px flex-1 bg-[#332F2A]" />
              </div>

              <div className="flex items-start gap-3">
                <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-2 ring-[#D10E63]/40">
                  <Image src="/images/emma-avatar.png" alt={t.emmaName} fill className="object-cover" sizes="36px" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="rounded-2xl rounded-tl-sm bg-[#332F2A] px-4 py-2.5 text-sm leading-relaxed text-[#FBF9F3]">
                    {t.emmaResult}
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button type="button" className="inline-flex items-center gap-1.5 rounded-full border border-[#4A453E] px-4 py-1.5 text-sm font-semibold text-[#C8C1B4] transition-colors hover:border-[#FBF9F3] hover:text-[#FBF9F3]">
                      {t.review}
                    </button>
                    <button type="button" className="inline-flex items-center gap-1.5 rounded-full bg-[#22A06B] px-4 py-1.5 text-sm font-bold text-[#06231A] transition-transform hover:-translate-y-0.5">
                      <CheckCircle2 className="h-4 w-4" />
                      {t.validate}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive 4-state timeline */}
          <div ref={ref} className="rounded-3xl border border-[#332F2A] bg-[#26231F] p-5 sm:p-6">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8A8175]">{t.timelineLabel}</p>
            <ol className="mt-4 flex flex-col gap-2">
              {t.stages.map((s, i) => {
                const Icon = s.icon
                const active = i <= stage
                return (
                  <li key={s.label}>
                    <button
                      type="button"
                      onClick={() => setStage(i)}
                      className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-all duration-300 ${
                        active ? 'border-[#D10E63]/40 bg-[#1C1A17]' : 'border-[#332F2A] bg-[#1C1A17]/40'
                      }`}
                    >
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${
                          active ? 'bg-[#D10E63] text-[#FBF9F3]' : 'bg-[#332F2A] text-[#8A8175]'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0">
                        <span className={`block text-sm font-bold ${active ? 'text-[#FBF9F3]' : 'text-[#8A8175]'}`}>{s.label}</span>
                        <motion.span
                          initial={false}
                          animate={{ opacity: active ? 1 : 0.5 }}
                          className="block text-xs text-[#A79E8E]"
                        >
                          {s.caption}
                        </motion.span>
                      </span>
                    </button>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>

        {/* Three pillars */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {t.pillars.map((p) => {
            const Icon = p.icon
            return (
              <div key={p.title} className="rounded-2xl border border-[#332F2A] bg-[#26231F] p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D10E63]/15 text-[#E8A0BF]">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-sf text-base font-bold text-[#FBF9F3]">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#A79E8E]">{p.body}</p>
              </div>
            )
          })}
        </div>

        <div className="mt-8">
          <Link
            href="/decouvrir"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#FBF9F3] px-5 py-2.5 text-sm font-bold text-[#1C1A17] transition-transform hover:-translate-y-0.5"
          >
            {t.cta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
