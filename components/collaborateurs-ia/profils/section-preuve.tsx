'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useLanguage } from '@/lib/language-context'
import { Kicker } from '@/components/home/section-kicker'
import { Conclusion } from '../lucas-card'

const COPY = {
  fr: {
    kicker: 'Plusieurs profils · une seule identité',
    title: 'Ses responsabilités évoluent. Son identité reste.',
    lead: 'Lucas peut exercer plusieurs profils métier sans perdre son nom, sa mémoire, ses coordonnées, son rattachement ni son historique.',
    beforeEyebrow: 'Avant',
    beforeName: 'Lucas',
    beforeLabel: 'Profil métier',
    before: ['Conseiller relation client'],
    afterEyebrow: 'Après validation',
    afterName: 'Lucas',
    afterLabel: 'Profils métier',
    after: ['Conseiller relation client', 'Chargé de fidélisation'],
    staysTitle: 'Ce qui reste',
    stays: [
      'identité',
      'mémoire',
      'responsable humaine',
      'email, téléphone et agenda',
      'applications déjà autorisées',
      'historique des missions',
    ],
    evolvesTitle: 'Ce qui évolue',
    evolves: ['responsabilités', 'compétences nécessaires', 'applications et droits liés au nouveau rôle'],
    conclusion: 'Un nouveau rôle. Toujours le même Collaborateur IA.',
  },
  en: {
    kicker: 'Several profiles · one identity',
    title: 'Its responsibilities evolve. Its identity stays.',
    lead: 'Lucas can hold several job profiles without losing his name, his memory, his contact details, his reporting line or his history.',
    beforeEyebrow: 'Before',
    beforeName: 'Lucas',
    beforeLabel: 'Job profile',
    before: ['Customer relations advisor'],
    afterEyebrow: 'After validation',
    afterName: 'Lucas',
    afterLabel: 'Job profiles',
    after: ['Customer relations advisor', 'Retention officer'],
    staysTitle: 'What stays',
    stays: [
      'identity',
      'memory',
      'human lead',
      'email, phone and calendar',
      'already-authorized applications',
      'mission history',
    ],
    evolvesTitle: 'What evolves',
    evolves: ['responsibilities', 'required skills', 'applications and rights tied to the new role'],
    conclusion: 'A new role. Still the same AI Collaborator.',
  },
} as const

export function SectionPreuve() {
  const { lang } = useLanguage()
  const reduce = useReducedMotion()
  const t = COPY[lang]

  return (
    <section id="preuve" className="border-b border-white/10 bg-[#1C1A17] px-6 py-20 text-[#F4F1EA] sm:py-24">
      <div className="mx-auto max-w-6xl">
        <Kicker dark>{t.kicker}</Kicker>
        <h2 className="mt-5 max-w-2xl text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-[#F4F1EA] sm:text-4xl">
          {t.title}
        </h2>
        <p className="mt-4 max-w-2xl text-pretty text-[15px] leading-relaxed text-[#B8B0A4] sm:text-base">{t.lead}</p>

        {/* Before / after */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <StateCard eyebrow={t.beforeEyebrow} name={t.beforeName} label={t.beforeLabel} profils={t.before} reduce={!!reduce} />
          <StateCard eyebrow={t.afterEyebrow} name={t.afterName} label={t.afterLabel} profils={t.after} accent reduce={!!reduce} />
        </div>

        {/* Stays / evolves */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <ListCard title={t.staysTitle} items={t.stays} tone="stays" />
          <ListCard title={t.evolvesTitle} items={t.evolves} tone="evolves" />
        </div>

        <div className="mt-8">
          <Conclusion dark>{t.conclusion}</Conclusion>
        </div>
      </div>
    </section>
  )
}

function StateCard({
  eyebrow,
  name,
  label,
  profils,
  accent = false,
  reduce,
}: {
  eyebrow: string
  name: string
  label: string
  profils: readonly string[]
  accent?: boolean
  reduce: boolean
}) {
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.45 }}
      className={`rounded-2xl border p-5 ${accent ? 'border-[#D10E63]/40 bg-[#D10E63]/[0.08]' : 'border-white/10 bg-[#211E1B]'}`}
    >
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#8E877C]">{eyebrow}</p>
      <p className="mt-2 text-[17px] font-semibold text-[#F4F1EA]">{name}</p>
      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-[#8E877C]">{label}</p>
      <ul className="mt-1.5 flex flex-col gap-1.5">
        {profils.map((p, i) => (
          <li key={p} className="flex items-center gap-2 text-[15px] font-medium text-[#F4F1EA]">
            <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${accent && i === profils.length - 1 ? 'bg-[#D10E63]' : 'bg-[#5FD3A0]'}`} />
            {p}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

function ListCard({ title, items, tone }: { title: string; items: readonly string[]; tone: 'stays' | 'evolves' }) {
  const dot = tone === 'stays' ? 'bg-[#5FD3A0]' : 'bg-[#E4B96B]'
  return (
    <div className="rounded-2xl border border-white/10 bg-[#211E1B] p-5">
      <p className="text-[15px] font-semibold text-[#F4F1EA]">{title}</p>
      <ul className="mt-3 flex flex-col gap-2">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-2.5 text-[14px] leading-snug text-[#B8B0A4]">
            <span aria-hidden className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} />
            {it}
          </li>
        ))}
      </ul>
    </div>
  )
}
