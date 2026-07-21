'use client'

import { motion } from 'framer-motion'
import {
  Mail,
  Phone,
  Calendar,
  Brain,
  Check,
  Globe,
  MessageSquare,
  Share2,
  Sparkles,
  Bot,
  ChevronRight,
} from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as const

function getInitials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

/* ------------------------------------------------------------------ */
/* Copy                                                                */
/* ------------------------------------------------------------------ */

const T = {
  fr: {
    // Section 2 — Emma works
    works: {
      eyebrow: 'ILS TRAVAILLENT',
      title: 'Votre premier collaborateur commence à travailler immédiatement.',
      subtitle: 'Pas des fonctionnalités. Une journée de travail réelle.',
      timeline: [
        { time: '09:00', label: 'Répond aux emails' },
        { time: '09:17', label: 'Prend un appel' },
        { time: '10:42', label: 'Planifie une réunion' },
        { time: '11:15', label: 'Prépare une proposition commerciale' },
        { time: '14:05', label: 'Met à jour votre CRM' },
        { time: '16:20', label: 'Répond à un client' },
      ],
      cardName: 'Emma',
      cardStatus: 'En ligne',
      cardTodayLabel: "Aujourd'hui",
      stats: [
        { value: '46', label: 'emails' },
        { value: '8', label: 'appels' },
        { value: '3', label: 'rendez-vous' },
        { value: '15', label: 'tâches réalisées' },
      ],
    },
    // Section 3 — Emma learns
    learns: {
      eyebrow: 'ILS APPRENNENT',
      title: 'Emma apprend grâce à Alma.',
      subtitle: "En cinq étapes, votre entreprise devient le contexte d'Emma.",
      steps: [
        { icon: Globe, title: 'Votre site web', desc: 'Alma analyse votre présence en ligne.' },
        { icon: MessageSquare, title: 'Alma interviewe le dirigeant', desc: 'Pour comprendre vos méthodes.' },
        { icon: Share2, title: 'Contexte partagé', desc: 'Une mémoire commune à toute votre organisation.' },
        { icon: Sparkles, title: 'Compétences', desc: 'Générées automatiquement selon vos besoins.' },
        { icon: Bot, title: 'Emma travaille', desc: 'Opérationnelle, à vos côtés.' },
      ],
    },
    // Section 4 — Deploy the team
    team: {
      eyebrow: 'ILS SONT UNE ÉQUIPE',
      title: 'Déployez autant de collaborateurs que nécessaire.',
      subtitle: 'Chacun avec son rôle, ses outils et sa mémoire.',
      onlineLabel: 'En ligne',
      abilities: ['Email', 'Téléphone', 'Calendrier', 'Mémoire'],
      members: [
        { id: 'emma', name: 'Emma', role: 'Executive Assistant' },
        { id: 'lea', name: 'Léa', role: 'Marketing' },
        { id: 'arthur', name: 'Arthur', role: 'Développement' },
        { id: 'hugo', name: 'Hugo', role: 'Commercial' },
        { id: 'ines', name: 'Inès', role: 'Relation client' },
      ],
    },
    // Section 5 — Shared context / directory
    directory: {
      eyebrow: 'ILS COLLABORENT',
      title: 'Tous vos collaborateurs partagent le même contexte.',
      subtitle: 'Humains et agents, dans un même annuaire. Une seule équipe.',
      humanLabel: 'Humain',
      agentLabel: 'Agent IA',
      people: [
        { name: 'Patrick', role: 'CEO', human: true },
        { name: 'Emma', role: 'Executive Assistant', human: false },
        { name: 'Hugo', role: 'Commercial', human: false },
        { name: 'Inès', role: 'Relation client', human: false },
        { name: 'Léa', role: 'Marketing', human: false },
        { name: 'Arthur', role: 'Développement', human: false },
      ],
    },
  },
  en: {
    works: {
      eyebrow: 'THEY WORK',
      title: 'Your first collaborator starts working immediately.',
      subtitle: 'Not features. A real working day.',
      timeline: [
        { time: '09:00', label: 'Answers emails' },
        { time: '09:17', label: 'Takes a call' },
        { time: '10:42', label: 'Schedules a meeting' },
        { time: '11:15', label: 'Prepares a sales proposal' },
        { time: '14:05', label: 'Updates your CRM' },
        { time: '16:20', label: 'Replies to a client' },
      ],
      cardName: 'Emma',
      cardStatus: 'Online',
      cardTodayLabel: 'Today',
      stats: [
        { value: '46', label: 'emails' },
        { value: '8', label: 'calls' },
        { value: '3', label: 'meetings' },
        { value: '15', label: 'tasks completed' },
      ],
    },
    learns: {
      eyebrow: 'THEY LEARN',
      title: 'Emma learns through Alma.',
      subtitle: "In five steps, your company becomes Emma's context.",
      steps: [
        { icon: Globe, title: 'Your website', desc: 'Alma analyzes your online presence.' },
        { icon: MessageSquare, title: 'Alma interviews the founder', desc: 'To understand your methods.' },
        { icon: Share2, title: 'Shared context', desc: 'A common memory for your whole organization.' },
        { icon: Sparkles, title: 'Skills', desc: 'Generated automatically for your needs.' },
        { icon: Bot, title: 'Emma works', desc: 'Operational, right by your side.' },
      ],
    },
    team: {
      eyebrow: 'THEY ARE A TEAM',
      title: 'Deploy as many collaborators as you need.',
      subtitle: 'Each with their role, tools and memory.',
      onlineLabel: 'Online',
      abilities: ['Email', 'Phone', 'Calendar', 'Memory'],
      members: [
        { id: 'emma', name: 'Emma', role: 'Executive Assistant' },
        { id: 'lea', name: 'Léa', role: 'Marketing' },
        { id: 'arthur', name: 'Arthur', role: 'Engineering' },
        { id: 'hugo', name: 'Hugo', role: 'Sales' },
        { id: 'ines', name: 'Inès', role: 'Customer Relations' },
      ],
    },
    directory: {
      eyebrow: 'THEY COLLABORATE',
      title: 'All your collaborators share the same context.',
      subtitle: 'Humans and agents, in one directory. One single team.',
      humanLabel: 'Human',
      agentLabel: 'AI Agent',
      people: [
        { name: 'Patrick', role: 'CEO', human: true },
        { name: 'Emma', role: 'Executive Assistant', human: false },
        { name: 'Hugo', role: 'Sales', human: false },
        { name: 'Inès', role: 'Customer Relations', human: false },
        { name: 'Léa', role: 'Marketing', human: false },
        { name: 'Arthur', role: 'Engineering', human: false },
      ],
    },
  },
}

/* ------------------------------------------------------------------ */
/* Shared header                                                       */
/* ------------------------------------------------------------------ */

function Header({
  eyebrow,
  title,
  subtitle,
  dark = false,
}: {
  eyebrow: string
  title: string
  subtitle: string
  dark?: boolean
}) {
  return (
    <motion.div
      className="mx-auto mb-14 max-w-3xl text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease }}
    >
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D10E63]">
        {eyebrow}
      </p>
      <h2
        className={`text-balance font-sf text-3xl font-bold leading-[1.08] sm:text-4xl md:text-[2.75rem] ${
          dark ? 'text-[#F7F4EE]' : 'text-[#1C1A17]'
        }`}
        style={{ letterSpacing: '-0.03em' }}
      >
        {title}
      </h2>
      <p className={`mt-4 text-pretty text-base leading-relaxed sm:text-lg ${dark ? 'text-[#B8B0A2]' : 'text-[#8A8175]'}`}>
        {subtitle}
      </p>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/* Section 2 — Emma works                                              */
/* ------------------------------------------------------------------ */

export function EmmaWorksSection({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = T[lang].works

  return (
    <section className="relative w-full bg-[#FBF9F3] px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Header eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

        <div className="grid items-start gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-12">
          {/* Timeline */}
          <motion.ol
            className="relative space-y-0"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            {t.timeline.map((item, i) => (
              <motion.li
                key={item.time}
                className="flex items-stretch gap-4"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease, delay: i * 0.08 }}
              >
                {/* Time + rail */}
                <div className="flex w-16 shrink-0 flex-col items-end pt-1">
                  <span className="font-mono text-sm font-semibold text-[#8A8175]">{item.time}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2E7D4F]/12 text-[#2E7D4F]">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  {i < t.timeline.length - 1 && <span className="w-px flex-1 bg-[#DDD5CA]" />}
                </div>
                {/* Label */}
                <div className="pb-8 pt-0.5">
                  <p className="text-base font-medium text-[#1C1A17]">{item.label}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>

          {/* Activity card */}
          <motion.div
            className="lg:sticky lg:top-24"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: 0.15 }}
          >
            <div className="overflow-hidden rounded-3xl border border-[#E8E1D0] bg-white p-6 shadow-lg sm:p-8">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#D10E63] text-lg font-bold text-white">
                  {getInitials(t.cardName)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1C1A17]">{t.cardName}</h3>
                  <span className="mt-0.5 inline-flex items-center gap-1.5 text-sm font-medium text-[#2E7D4F]">
                    <span className="h-2 w-2 rounded-full bg-[#2E7D4F]" />
                    {t.cardStatus}
                  </span>
                </div>
              </div>

              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8A8175]">
                {t.cardTodayLabel}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {t.stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-[#EEE7DA] bg-[#FBF9F3] p-4">
                    <p className="font-sf text-3xl font-bold text-[#1C1A17]">{stat.value}</p>
                    <p className="mt-0.5 text-sm text-[#8A8175]">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Section 3 — Emma learns                                             */
/* ------------------------------------------------------------------ */

export function EmmaLearnsSection({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = T[lang].learns

  return (
    <section className="relative w-full bg-[#F3EFE6] px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Header eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

        <div className="relative">
          {/* connecting line (desktop) */}
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-7 hidden h-px bg-[#DDD5CA] lg:block"
          />
          <ol className="grid gap-6 lg:grid-cols-5 lg:gap-4">
            {t.steps.map((step, i) => {
              const Icon = step.icon
              const isLast = i === t.steps.length - 1
              return (
                <motion.li
                  key={step.title}
                  className="relative flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease, delay: i * 0.12 }}
                >
                  <div
                    className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border shadow-sm ${
                      isLast
                        ? 'border-transparent bg-[#D10E63] text-white'
                        : 'border-[#E8E1D0] bg-white text-[#D10E63]'
                    }`}
                  >
                    <Icon className="h-6 w-6" strokeWidth={1.8} />
                  </div>
                  <p className="mt-4 text-base font-bold text-[#1C1A17]">{step.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#8A8175]">{step.desc}</p>

                  {/* mobile connector arrow */}
                  {!isLast && (
                    <ChevronRight className="mt-4 h-5 w-5 rotate-90 text-[#C9BFAE] lg:hidden" />
                  )}
                </motion.li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Section 4 — Deploy the team                                         */
/* ------------------------------------------------------------------ */

export function DeployTeamSection({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = T[lang].team
  const abilityIcons = [Mail, Phone, Calendar, Brain]

  return (
    <section className="relative w-full bg-[#FBF9F3] px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Header eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.members.map((member, i) => (
            <motion.div
              key={member.id}
              className="group flex flex-col rounded-2xl border border-[#E8E1D0] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease, delay: i * 0.08 }}
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#D10E63] text-base font-bold text-white">
                  {getInitials(member.name)}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-lg font-bold text-[#1C1A17]">{member.name}</h3>
                  <p className="truncate text-sm text-[#8A8175]">{member.role}</p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#2E7D4F]/25 bg-[#2E7D4F]/10 px-2.5 py-1 text-xs font-medium text-[#2E7D4F]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#2E7D4F]" />
                  {t.onlineLabel}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 border-t border-[#EEE7DA] pt-4">
                {t.abilities.map((ability, idx) => {
                  const Icon = abilityIcons[idx]
                  return (
                    <div key={ability} className="flex items-center gap-2 text-sm text-[#4E483F]">
                      <Icon className="h-4 w-4 shrink-0 text-[#D10E63]" strokeWidth={1.8} />
                      {ability}
                    </div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Section 5 — Shared context / directory                              */
/* ------------------------------------------------------------------ */

export function SharedContextSection({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = T[lang].directory

  return (
    <section className="relative w-full bg-[#1C1A17] px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Header eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} dark />

        <motion.div
          className="overflow-hidden rounded-3xl border border-white/10 bg-[#26231F]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          <ul className="divide-y divide-white/[0.06]">
            {t.people.map((person, i) => (
              <motion.li
                key={person.name}
                className="flex items-center gap-4 px-5 py-4 sm:px-6"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease, delay: i * 0.07 }}
              >
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                    person.human
                      ? 'bg-[#3A3530] text-[#F7F4EE] ring-1 ring-white/15'
                      : 'bg-[#D10E63] text-white'
                  }`}
                >
                  {getInitials(person.name)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-[#F7F4EE]">{person.name}</p>
                  <p className="truncate text-sm text-[#B8B0A2]">{person.role}</p>
                </div>
                <span
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                    person.human
                      ? 'bg-white/[0.06] text-[#C4BCAE]'
                      : 'bg-[#D10E63]/15 text-[#FF7FAC]'
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${person.human ? 'bg-[#8A8175]' : 'bg-[#2E7D4F]'}`}
                  />
                  {person.human ? t.humanLabel : t.agentLabel}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
