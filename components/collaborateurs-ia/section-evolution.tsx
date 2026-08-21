'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { Kicker } from '@/components/home/section-kicker'
import { SpecCard, type SpecRow } from './lucas-card'

const COPY = {
  fr: {
    kicker: 'Profils métier · Compétences · Applications',
    title: 'Plusieurs profils métier. Une seule identité.',
    lead: 'Lucas peut recevoir de nouvelles responsabilités, développer de nouveaux savoir-faire et accéder à de nouveaux outils sans perdre sa mémoire ni son expérience.',
    caseAEyebrow: 'Nouvelle mission',
    caseAMission: 'Suivre les réclamations après chaque appel.',
    caseARows: [
      { label: 'Conseiller relation client', status: 'Adapté', tone: 'active' },
      { label: 'Suivre une réclamation', status: 'Manquante', tone: 'pending' },
      { label: 'Agenda partagé', status: 'Nécessaire', tone: 'pending' },
    ] as SpecRow[],
    caseAResult: 'Une compétence et une application sont ajoutées. Aucun nouveau profil métier n’est nécessaire.',
    caseBEyebrow: 'Nouvelle responsabilité durable',
    caseBMission: 'Prendre en charge la fidélisation après résolution.',
    caseBProfileLabel: 'Nouveau profil métier',
    caseBProfile: 'Chargé de fidélisation',
    caseBRows: [
      { label: 'Préparer un suivi personnalisé', status: 'À développer', tone: 'added', added: true },
      { label: 'Détecter un risque de départ', status: 'À développer', tone: 'added', added: true },
      { label: 'Outil de satisfaction client', status: 'À connecter', tone: 'added', added: true },
    ] as SpecRow[],
    conclusion1: 'Ses responsabilités évoluent.',
    conclusion2: 'Son identité reste.',
    catalogsTitle: 'Faites-le évoluer',
    catalogs: [
      { title: 'Donnez-lui de nouvelles responsabilités.', body: 'Les rôles durables qu’il peut exercer dans votre entreprise.', cta: 'Explorer les profils métier', href: '/collaborateurs-ia/profils-metier' },
      { title: 'Transmettez-lui de nouveaux savoir-faire.', body: 'Les méthodes qu’il peut appliquer, tester, versionner et améliorer.', cta: 'Découvrir les compétences', href: '/marketplace/competences' },
      { title: 'Donnez-lui de nouveaux moyens d’action.', body: 'Les outils et les données dans lesquels il peut agir, selon vos règles.', cta: 'Voir les applications', href: '/marketplace/applications' },
    ],
  },
  en: {
    kicker: 'Job profiles · Skills · Applications',
    title: 'Several job profiles. One identity.',
    lead: 'Lucas can take on new responsibilities, build new know-how and access new tools without losing his memory or his experience.',
    caseAEyebrow: 'New mission',
    caseAMission: 'Follow up on complaints after every call.',
    caseARows: [
      { label: 'Customer relations advisor', status: 'Suitable', tone: 'active' },
      { label: 'Follow up on a complaint', status: 'Missing', tone: 'pending' },
      { label: 'Shared calendar', status: 'Required', tone: 'pending' },
    ] as SpecRow[],
    caseAResult: 'One skill and one application are added. No new job profile is needed.',
    caseBEyebrow: 'New durable responsibility',
    caseBMission: 'Take on customer loyalty after resolution.',
    caseBProfileLabel: 'New job profile',
    caseBProfile: 'Loyalty officer',
    caseBRows: [
      { label: 'Prepare a personalized follow-up', status: 'To build', tone: 'added', added: true },
      { label: 'Detect a churn risk', status: 'To build', tone: 'added', added: true },
      { label: 'Customer satisfaction tool', status: 'To connect', tone: 'added', added: true },
    ] as SpecRow[],
    conclusion1: 'His responsibilities evolve.',
    conclusion2: 'His identity stays.',
    catalogsTitle: 'Help him evolve',
    catalogs: [
      { title: 'Give him new responsibilities.', body: 'The durable roles he can hold in your company.', cta: 'Explore job profiles', href: '/collaborateurs-ia/profils-metier' },
      { title: 'Pass on new know-how.', body: 'The methods he can apply, test, version and improve.', cta: 'Discover skills', href: '/marketplace/competences' },
      { title: 'Give him new means of action.', body: 'The tools and data he can act in, under your rules.', cta: 'See applications', href: '/marketplace/applications' },
    ],
  },
} as const

export function SectionEvolution() {
  const { lang } = useLanguage()
  const t = COPY[lang]

  return (
    <section className="border-b border-[#E7E0D2] bg-[#F3EFE6] px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <Kicker>{t.kicker}</Kicker>
          <h2 className="mt-5 text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-[#1C1A17] sm:text-4xl md:text-5xl">
            {t.title}
          </h2>
          <p className="mt-5 text-pretty text-[15px] leading-relaxed text-[#6B6459] sm:text-base">{t.lead}</p>
        </div>

        {/* Two scenarios */}
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-[#E4DDCE] bg-[#F7F4ED] p-6">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#A89C88]">{t.caseAEyebrow}</p>
            <p className="mt-2 text-[16px] font-medium text-[#1C1A17]">{t.caseAMission}</p>
            <div className="mt-4">
              <SpecCard rows={t.caseARows} />
            </div>
            <p className="mt-4 text-pretty text-[14px] leading-relaxed text-[#5A5348]">{t.caseAResult}</p>
          </div>

          <div className="rounded-3xl border border-[#E4DDCE] bg-[#F7F4ED] p-6">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#A89C88]">{t.caseBEyebrow}</p>
            <p className="mt-2 text-[16px] font-medium text-[#1C1A17]">{t.caseBMission}</p>
            <div className="mt-4 rounded-2xl border border-[#D10E63]/25 bg-[#D10E63]/[0.06] p-4">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#B00C54]">{t.caseBProfileLabel}</p>
              <p className="mt-1 text-[15px] font-semibold text-[#1C1A17]">{t.caseBProfile}</p>
            </div>
            <div className="mt-4">
              <SpecCard rows={t.caseBRows} />
            </div>
          </div>
        </div>

        {/* Conclusion */}
        <div className="mt-10 text-center">
          <p className="text-2xl font-semibold leading-tight tracking-[-0.02em] text-[#1C1A17] sm:text-3xl">{t.conclusion1}</p>
          <p className="text-2xl font-semibold leading-tight tracking-[-0.02em] text-[#B00C54] sm:text-3xl">{t.conclusion2}</p>
        </div>

        {/* Catalog cards */}
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {t.catalogs.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group flex flex-col rounded-3xl border border-[#E4DDCE] bg-[#FBF9F3] p-6 transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-[#D10E63]/40"
            >
              <h3 className="text-balance text-lg font-semibold leading-snug tracking-[-0.01em] text-[#1C1A17]">{c.title}</h3>
              <p className="mt-2 flex-1 text-pretty text-[14px] leading-relaxed text-[#5A5348]">{c.body}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#A80B50]">
                {c.cta}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
