'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { Kicker } from '@/components/home/section-kicker'
import { SpecCard, Conclusion, type SpecRow } from '@/components/collaborateurs-ia/lucas-card'

const COPY = {
  fr: {
    kicker: 'Affectation · Compétences · Accès',
    title: 'Le bon Collaborateur IA. Pas forcément un nouveau.',
    lead: 'Alma examine d’abord les Collaborateurs IA déjà présents. Elle recommande celui qui peut prendre la mission et ajoute uniquement ce qui lui manque.',
    analysisEyebrow: 'Analyse de Lucas',
    rows: [
      { label: 'Profil métier · Conseiller relation client', status: 'Adapté', tone: 'active' },
      { label: 'Compétence · Suivre une réclamation', status: 'À développer', tone: 'pending', added: true },
      { label: 'Application · CRM', status: 'Déjà autorisé', tone: 'active' },
      { label: 'Application · Agenda partagé', status: 'Nécessaire', tone: 'pending', added: true },
      { label: 'Validation · Geste commercial > 10 %', status: 'Marc', tone: 'owner' },
    ] as SpecRow[],
    recoEyebrow: 'Recommandation d’Alma',
    reco: 'Lucas peut prendre cette mission. Aucun nouveau Collaborateur IA n’est nécessaire.',
    preparesTitle: 'Alma prépare',
    prepares: [
      'la compétence Suivre une réclamation',
      'l’accès limité à l’agenda partagé',
      'la validation de Marc au bon moment',
    ],
    conclusion: 'Même Lucas. Prêt pour une mission de plus.',
    link: { label: 'Découvrir comment évolue un Collaborateur IA', href: '/collaborateurs-ia' },
  },
  en: {
    kicker: 'Assignment · Skills · Access',
    title: 'The right AI Collaborator. Not necessarily a new one.',
    lead: 'Alma first looks at the AI Collaborators already in place. It recommends the one that can take the mission and adds only what it lacks.',
    analysisEyebrow: 'Analysis of Lucas',
    rows: [
      { label: 'Job profile · Customer relations advisor', status: 'Suitable', tone: 'active' },
      { label: 'Skill · Follow a complaint', status: 'To develop', tone: 'pending', added: true },
      { label: 'Application · CRM', status: 'Already authorized', tone: 'active' },
      { label: 'Application · Shared calendar', status: 'Required', tone: 'pending', added: true },
      { label: 'Validation · Commercial gesture > 10%', status: 'Marc', tone: 'owner' },
    ] as SpecRow[],
    recoEyebrow: 'Alma’s recommendation',
    reco: 'Lucas can take this mission. No new AI Collaborator is needed.',
    preparesTitle: 'Alma prepares',
    prepares: [
      'the skill Follow a complaint',
      'limited access to the shared calendar',
      'Marc’s validation at the right moment',
    ],
    conclusion: 'Same Lucas. Ready for one more mission.',
    link: { label: 'See how an AI Collaborator evolves', href: '/collaborateurs-ia' },
  },
} as const

export function SectionPreparer() {
  const { lang } = useLanguage()
  const reduce = useReducedMotion()
  const t = COPY[lang]

  return (
    <section id="preparer" className="scroll-mt-24 border-b border-[#E7E0D2] bg-[#F3EFE6] px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Kicker>{t.kicker}</Kicker>
        <h2 className="mt-4 max-w-2xl text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-[#1C1A17] sm:text-4xl">
          {t.title}
        </h2>
        <p className="mt-5 max-w-2xl text-pretty text-[16px] leading-relaxed text-[#5A5348]">{t.lead}</p>

        <div className="mt-10 grid items-start gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <SpecCard eyebrow={t.analysisEyebrow} rows={t.rows} accent />
          </motion.div>

          <div className="flex flex-col gap-5">
            <div className="rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-5">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#A89C88]">{t.recoEyebrow}</p>
              <p className="mt-2 text-[16px] font-medium leading-snug text-[#1C1A17]">{t.reco}</p>
            </div>

            <div>
              <p className="text-[13px] font-semibold text-[#4E483F]">{t.preparesTitle}</p>
              <ul className="mt-3 flex flex-col gap-2">
                {t.prepares.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-[15px] leading-relaxed text-[#4E483F]">
                    <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-[#22A06B]" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Conclusion>{t.conclusion}</Conclusion>
          </div>
        </div>

        <div className="mt-10">
          <Link
            href={t.link.href}
            className="group inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#B00C54] transition-colors hover:text-[#8A0A41]"
          >
            {t.link.label}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
