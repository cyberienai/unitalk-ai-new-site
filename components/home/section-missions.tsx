'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  Check,
  Code2,
  MessageCircle,
  MessagesSquare,
  Package,
  PenLine,
  Settings2,
  Target,
  type LucideIcon,
} from 'lucide-react'
import { ROLE_DETAILS, collaboratorHref } from '@/lib/collaborators-catalog'
import { useMyTeam } from '@/lib/my-team-context'
import type { Lang } from '@/lib/language-context'
import { Kicker } from './section-kicker'

type Mission = { key: string; icon: LucideIcon; label: { fr: string; en: string }; slugs: string[] }

const MISSIONS: Mission[] = [
  { key: 'find', icon: Target, label: { fr: 'Trouver des clients', en: 'Find customers' }, slugs: ['hugo'] },
  { key: 'answer', icon: MessagesSquare, label: { fr: 'Répondre à vos clients', en: 'Answer your customers' }, slugs: ['ines'] },
  { key: 'content', icon: PenLine, label: { fr: 'Créer du contenu', en: 'Create content' }, slugs: ['lea'] },
  { key: 'analyze', icon: BarChart3, label: { fr: 'Analyser vos données', en: 'Analyze your data' }, slugs: ['nadia'] },
  { key: 'automate', icon: Settings2, label: { fr: 'Automatiser vos opérations', en: 'Automate your operations' }, slugs: ['arthur'] },
  { key: 'organize', icon: CalendarDays, label: { fr: 'Organiser votre activité', en: 'Organize your business' }, slugs: ['emma'] },
  { key: 'develop', icon: Code2, label: { fr: 'Développer vos applications', en: 'Build your apps' }, slugs: ['arthur'] },
  { key: 'production', icon: Package, label: { fr: 'Gérer votre production', en: 'Manage your production' }, slugs: ['emma', 'nadia'] },
]

const T = {
  fr: {
    kicker: 'Choisissez sa mission',
    title: 'Chaque Collaborateur IA est spécialisé pour un métier et une mission.',
    lead: 'Commencez par ce dont votre entreprise a besoin aujourd’hui.',
    explore: 'Explorer toutes les missions',
    talk: 'Parler avec',
    recruit: 'Recruter',
    recruited: 'Recruté',
    hint: 'Sélectionnez une mission pour voir le Collaborateur IA correspondant.',
  },
  en: {
    kicker: 'Choose their mission',
    title: 'Each AI Collaborator is specialized for a role and a mission.',
    lead: 'Start with what your company needs today.',
    explore: 'Explore all missions',
    talk: 'Talk with',
    recruit: 'Recruit',
    recruited: 'Recruited',
    hint: 'Select a mission to see the matching AI Collaborator.',
  },
}

export function SectionMissions({ lang }: { lang: Lang }) {
  const t = T[lang]
  const [active, setActive] = useState<string>('find')
  const { has, toggle } = useMyTeam()

  const mission = MISSIONS.find((m) => m.key === active) ?? MISSIONS[0]
  const matches = mission.slugs.map((s) => ROLE_DETAILS[s]).filter(Boolean)

  return (
    <section className="bg-[#F3EFE6] px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <Kicker>{t.kicker}</Kicker>
          <h2 className="mt-3 text-balance font-sf text-3xl font-bold tracking-[-0.02em] text-[#1C1A17] sm:text-4xl">
            {t.title}
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-[#5F594F]">{t.lead}</p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Missions grid */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2">
            {MISSIONS.map((m) => {
              const Icon = m.icon
              const selected = m.key === active
              return (
                <button
                  key={m.key}
                  type="button"
                  onClick={() => setActive(m.key)}
                  aria-pressed={selected}
                  className={`flex items-center gap-3 rounded-2xl border px-4 py-4 text-left transition-all duration-200 ${
                    selected
                      ? 'border-[#D10E63] bg-[#FBF9F3] shadow-[0_10px_30px_rgba(209,14,99,0.12)]'
                      : 'border-[#E4DCCF] bg-[#FBF9F3]/60 hover:border-[#D10E63]/40 hover:bg-[#FBF9F3]'
                  }`}
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                      selected ? 'bg-[#D10E63] text-[#FBF9F3]' : 'bg-[#EFE9DD] text-[#4E483F]'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-semibold leading-tight text-[#1C1A17]">{m.label[lang]}</span>
                </button>
              )
            })}
          </div>

          {/* Reveal panel */}
          <div className="rounded-3xl border border-[#E4DCCF] bg-[#FBF9F3] p-5 sm:p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="flex h-full flex-col gap-4"
              >
                {matches.map((ai) => {
                  const inTeam = has(ai.slug)
                  return (
                    <div key={ai.slug} className="flex flex-col gap-4 rounded-2xl bg-[#F3EFE6] p-4">
                      <div className="flex items-center gap-3">
                        <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-[#1C1A17]/[0.08]">
                          <Image src={ai.avatar || '/placeholder.svg'} alt={ai.name} fill className="object-cover" sizes="56px" />
                        </span>
                        <div className="min-w-0">
                          <p className="font-sf text-lg font-bold text-[#1C1A17]">{ai.name}</p>
                          <p className="text-sm font-medium text-[#D10E63]">
                            {ai.role[lang]}
                            {ai.roleInline ? ` ${ai.manager.name}` : ''}
                          </p>
                        </div>
                      </div>
                      <p className="text-pretty text-sm leading-relaxed text-[#4E483F]">{ai.description[lang]}</p>
                      <div className="mt-auto flex items-center gap-2">
                        <Link
                          href={collaboratorHref(ai.slug)}
                          className="inline-flex min-h-10 flex-1 items-center justify-center gap-1.5 rounded-full border border-[#DDD5CA] px-3 text-sm font-semibold text-[#4E483F] transition-colors hover:border-[#1C1A17] hover:text-[#1C1A17]"
                        >
                          <MessageCircle className="h-4 w-4 shrink-0" />
                          <span className="truncate">{`${t.talk} ${ai.name}`}</span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => toggle({ slug: ai.slug, name: ai.name, role: ai.role[lang], avatar: ai.avatar })}
                          aria-pressed={inTeam}
                          className={`inline-flex min-h-10 shrink-0 items-center justify-center gap-1.5 rounded-full px-4 text-sm font-bold transition-colors ${
                            inTeam ? 'bg-[#1C1A17] text-[#FBF9F3]' : 'border border-[#D10E63]/40 text-[#D10E63] hover:bg-[#D10E63]/[0.06]'
                          }`}
                        >
                          {inTeam ? <Check className="h-4 w-4" /> : null}
                          {inTeam ? t.recruited : t.recruit}
                        </button>
                      </div>
                    </div>
                  )
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-8">
          <Link
            href="/collaborateurs-ia"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#4E483F] underline-offset-4 transition-colors hover:text-[#D10E63] hover:underline"
          >
            {t.explore}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
