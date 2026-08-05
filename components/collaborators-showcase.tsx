'use client'

import { CtaButton } from '@/components/ui/cta-button'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Briefcase, Check, Code2, PenLine, Wrench } from 'lucide-react'
import { useT, type Lang } from '@/lib/language-context'
import { Kicker } from '@/components/home/section-kicker'

const ease = [0.22, 1, 0.36, 1] as const

type Profile = {
  key: string
  icon: typeof Briefcase
  name: { fr: string; en: string }
  sectors: { fr: string; en: string }[]
  missions: { fr: string; en: string }[]
  skills: { fr: string; en: string }[]
  tools: string[]
}

// Profils métier par défaut (savoir-faire initial), sans identité nommée.
// L'Organisation choisit ensuite le nom, l'avatar et la voix du Collaborateur IA.
const PROFILES: Profile[] = [
  {
    key: 'assistanat',
    icon: Briefcase,
    name: { fr: 'Assistanat de direction', en: 'Executive assistant' },
    sectors: [
      { fr: 'PME', en: 'SMBs' },
      { fr: 'Startups', en: 'Startups' },
      { fr: 'Indépendants', en: 'Freelancers' },
    ],
    missions: [
      { fr: 'Organiser le comité de direction hebdomadaire', en: 'Organize the weekly leadership committee' },
      { fr: 'Réserver et confirmer un déplacement complet', en: 'Book and confirm a full business trip' },
      { fr: 'Préparer un dossier de décision avant réunion', en: 'Prepare a decision brief before a meeting' },
    ],
    skills: [
      { fr: "Gestion d'agenda", en: 'Calendar management' },
      { fr: 'Préparation de réunions', en: 'Meeting preparation' },
      { fr: 'Coordination des déplacements', en: 'Travel coordination' },
      { fr: 'Filtrage des demandes', en: 'Request triage' },
    ],
    tools: ['Email', 'Google Agenda', 'Notion', 'Slack', 'Zoom'],
  },
  {
    key: 'contenu',
    icon: PenLine,
    name: { fr: 'Stratégie de contenu', en: 'Content strategy' },
    sectors: [
      { fr: 'PME', en: 'SMBs' },
      { fr: 'Startups', en: 'Startups' },
      { fr: 'Agences', en: 'Agencies' },
    ],
    missions: [
      { fr: 'Définir la ligne éditoriale du trimestre', en: 'Define the quarterly editorial line' },
      { fr: 'Rédiger une série d’articles de blog', en: 'Write a series of blog posts' },
      { fr: "Analyser l'engagement des campagnes", en: 'Analyze campaign engagement' },
    ],
    skills: [
      { fr: 'Stratégie de contenu', en: 'Content strategy' },
      { fr: 'Calendrier éditorial', en: 'Editorial calendar' },
      { fr: 'Rédaction et SEO', en: 'Writing and SEO' },
      { fr: 'Analyse de performance', en: 'Performance analysis' },
    ],
    tools: ['CMS', 'Réseaux sociaux', 'Analytics', 'Notion', 'Canva'],
  },
  {
    key: 'developpement',
    icon: Code2,
    name: { fr: 'Développement logiciel', en: 'Software development' },
    sectors: [
      { fr: 'Startups', en: 'Startups' },
      { fr: 'SaaS', en: 'SaaS' },
      { fr: 'Studios', en: 'Studios' },
    ],
    missions: [
      { fr: 'Implémenter une nouvelle fonctionnalité', en: 'Implement a new feature' },
      { fr: 'Corriger un lot de bugs prioritaires', en: 'Fix a batch of priority bugs' },
      { fr: 'Documenter une API', en: 'Document an API' },
    ],
    skills: [
      { fr: 'Écriture de code', en: 'Code writing' },
      { fr: 'Revue de code', en: 'Code review' },
      { fr: 'Correction de bugs', en: 'Bug fixing' },
      { fr: 'Documentation technique', en: 'Technical documentation' },
    ],
    tools: ['GitHub', 'VS Code', 'Linear', 'Slack', 'CI/CD'],
  },
]

function ProfileCard({
  profile,
  lang,
  labels,
  index,
  reduceMotion,
}: {
  profile: Profile
  lang: Lang
  labels: { missionsLabel: string; skillsLabel: string; toolsLabel: string; choose: string }
  index: number
  reduceMotion: boolean | null
}) {
  const Icon = profile.icon
  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease, delay: index * 0.08 }}
      className="group relative flex w-full flex-col overflow-hidden rounded-3xl border border-[#E4DCCF] bg-[#F3EFE6] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#D10E63]/30 hover:shadow-[0_24px_60px_rgba(28,26,23,0.10)]"
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-[#D10E63] transition-transform duration-300 group-hover:scale-x-100"
      />

      {/* Header: business icon + sector filters (no name, no portrait) */}
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#E4DCCF] bg-[#FBF9F3] text-[#D10E63]">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
        <div className="flex flex-wrap justify-end gap-1.5">
          {profile.sectors.map((s) => (
            <span
              key={s.en}
              className="rounded-full border border-[#E4DCCF] bg-[#FBF9F3] px-2.5 py-1 text-[11px] font-semibold text-[#6B6560]"
            >
              {s[lang]}
            </span>
          ))}
        </div>
      </div>

      {/* Profile name */}
      <h3 className="mt-5 font-sf text-xl font-bold tracking-[-0.02em] text-[#1C1A17]">{profile.name[lang]}</h3>

      {/* Missions principales */}
      <p className="mt-5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A8175]">
        {labels.missionsLabel}
      </p>
      <ul className="mt-2 flex flex-col gap-2">
        {profile.missions.map((m) => (
          <li key={m.en} className="flex items-start gap-2 text-[14px] leading-snug text-[#4E483F]">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#D10E63]" aria-hidden="true" />
            {m[lang]}
          </li>
        ))}
      </ul>

      {/* Compétences (4 max) */}
      <p className="mt-5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A8175]">
        {labels.skillsLabel}
      </p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {profile.skills.slice(0, 4).map((skill) => (
          <span
            key={skill.en}
            className="rounded-full border border-[#E4DCCF] bg-[#FBF9F3] px-2.5 py-1 text-[11px] font-semibold text-[#4E483F]"
          >
            {skill[lang]}
          </span>
        ))}
      </div>

      {/* Outils nécessaires */}
      <p className="mt-5 flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A8175]">
        <Wrench className="h-3.5 w-3.5" aria-hidden="true" />
        {labels.toolsLabel}
      </p>
      <p className="mt-1.5 text-[13px] text-[#6B6560]">{profile.tools.join(' · ')}</p>

      {/* CTA */}
      <div className="mt-6 flex flex-col">
        <CtaButton href="/decouvrir" size="sm">
          {labels.choose}
          <ArrowRight className="h-4 w-4" />
        </CtaButton>
      </div>
    </motion.article>
  )
}

export function CollaboratorsShowcase({ lang }: { lang: Lang }) {
  const t = useT({
    fr: {
      eyebrow: 'Profils métier',
      title: 'Avec quel savoir-faire doit-il commencer ?',
      subtitle:
        'Votre Collaborateur IA rejoint votre organisation avec un profil métier par défaut. Vous choisissez ensuite son nom, son avatar et sa voix, puis vous pouvez lui ajouter d’autres profils.',
      missionsLabel: 'Missions principales',
      skillsLabel: 'Compétences',
      toolsLabel: 'Outils nécessaires',
      choose: 'Choisir ce profil',
      allCta: 'Voir tous les profils métier',
    },
    en: {
      eyebrow: 'Business profiles',
      title: 'Which know-how should it start with?',
      subtitle:
        'Your AI Collaborator joins your organization with a default business profile. You then choose its name, avatar and voice, and can add more profiles later.',
      missionsLabel: 'Key missions',
      skillsLabel: 'Skills',
      toolsLabel: 'Required tools',
      choose: 'Choose this profile',
      allCta: 'See all business profiles',
    },
  })

  const reduceMotion = useReducedMotion()

  const labels = {
    missionsLabel: t.missionsLabel,
    skillsLabel: t.skillsLabel,
    toolsLabel: t.toolsLabel,
    choose: t.choose,
  }

  return (
    <section className="w-full border-t border-[#E9E2D4] bg-[#FBF9F3] py-24 sm:py-32">
      <div className="editorial-shell">
        <header className="mx-auto max-w-2xl text-center">
          <div className="mb-4 flex justify-center">
            <Kicker>{t.eyebrow}</Kicker>
          </div>
          <h2 className="text-balance font-sf text-3xl font-bold leading-[1.05] tracking-[-0.035em] text-[#1C1A17] sm:text-4xl lg:text-[2.75rem]">
            {t.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-[#5F594F]">
            {t.subtitle}
          </p>
        </header>

        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROFILES.map((profile, i) => (
            <ProfileCard
              key={profile.key}
              profile={profile}
              lang={lang}
              labels={labels}
              index={i}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <CtaButton href="/collaborateurs-ia/roles" variant="secondary">
            {t.allCta}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </CtaButton>
        </div>
      </div>
    </section>
  )
}
