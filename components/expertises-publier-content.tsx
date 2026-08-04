'use client'

import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { useLanguage, type Lang } from '@/lib/language-context'

type Copy = {
  kicker: string
  title: string
  lead: string
  forWho: string
  audiences: string[]
  provideTitle: string
  provide: string[]
  keepTitle: string
  keep: string[]
  primary: string
  secondary: string
  note: string
}

const T: Record<Lang, Copy> = {
  fr: {
    kicker: 'Proposer une expertise',
    title: 'Mettez votre expertise IA au service des entreprises.',
    lead: 'Proposez une expertise sur Unitalk : cadrage, intégration, configuration ou supervision de Collaborateurs IA. Vous intervenez sur les missions qui correspondent à votre savoir-faire.',
    forWho: 'Pour qui',
    audiences: ['Consultants IA', 'Agences', 'Formateurs', 'Intégrateurs'],
    provideTitle: 'Ce qu’Unitalk fournit',
    provide: [
      'Le socle de travail : missions, profils, workspace et gouvernance.',
      'La mise en relation avec des entreprises ayant un besoin réel.',
      'Le cadre d’exécution et de validation des missions.',
    ],
    keepTitle: 'Ce que vous conservez',
    keep: [
      'Votre expertise et votre méthode.',
      'Votre relation client.',
      'La maîtrise de vos interventions.',
    ],
    primary: 'Proposer mon expertise',
    secondary: 'Devenir partenaire',
    note: 'Nous étudions chaque proposition d’expertise avant mise en relation. Aucune certification ni tarif imposé : vous définissez votre offre.',
  },
  en: {
    kicker: 'Offer an expertise',
    title: 'Put your AI expertise to work for companies.',
    lead: 'Offer an expertise on Unitalk: scoping, integration, configuration or supervision of AI Collaborators. You work on the missions that match your know-how.',
    forWho: 'Who it’s for',
    audiences: ['AI consultants', 'Agencies', 'Trainers', 'Integrators'],
    provideTitle: 'What Unitalk provides',
    provide: [
      'The work foundation: missions, profiles, workspace and governance.',
      'Introductions to companies with a real need.',
      'The execution and approval framework for missions.',
    ],
    keepTitle: 'What you keep',
    keep: ['Your expertise and method.', 'Your client relationship.', 'Control over your engagements.'],
    primary: 'Offer my expertise',
    secondary: 'Become a partner',
    note: 'We review every expertise proposal before making introductions. No imposed certification or pricing: you define your offer.',
  },
}

export function ExpertisesPublierContent() {
  const { lang } = useLanguage()
  const t = T[lang]

  return (
    <main className="bg-[#F3EFE6]">
      <section className="px-5 pb-8 pt-28 sm:px-8 sm:pt-32">
        <div className="editorial-shell">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D10E63]">{t.kicker}</p>
          <h1 className="mt-3 max-w-3xl text-balance font-sf text-3xl font-bold leading-[1.08] tracking-[-0.03em] text-[#1C1A17] sm:text-4xl">
            {t.title}
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-[#4A443C]">{t.lead}</p>
          <div className="mt-6">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A7B5C]">{t.forWho}</p>
            <ul className="mt-2.5 flex flex-wrap gap-2">
              {t.audiences.map((a) => (
                <li
                  key={a}
                  className="rounded-full border border-[#D8CFBB] bg-[#FBF9F3] px-3 py-1 text-xs font-semibold text-[#4A443C]"
                >
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="px-5 py-8 sm:px-8">
        <div className="editorial-shell grid gap-5 lg:grid-cols-2">
          {[
            { title: t.provideTitle, items: t.provide },
            { title: t.keepTitle, items: t.keep },
          ].map((col) => (
            <div key={col.title} className="rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-6 sm:p-7">
              <h2 className="font-sf text-base font-bold text-[#1C1A17]">{col.title}</h2>
              <ul className="mt-4 space-y-3">
                {col.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-6 text-[#4A443C]">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0F8A5F]" />
                    <span className="text-pretty">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 py-12 sm:px-8 sm:py-16">
        <div className="editorial-shell">
          <div className="rounded-[2rem] bg-[#1C1A17] p-8 sm:p-12">
            <p className="max-w-2xl text-pretty text-sm leading-7 text-[#C9BFB2]">{t.note}</p>
            <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <Link
                href="/partenaires"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#D10E63] px-5 py-3 text-sm font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5"
              >
                {t.primary}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/partenaires"
                className="inline-flex items-center gap-1.5 rounded-full border border-[#3A352F] px-5 py-3 text-sm font-bold text-[#FBF9F3] transition-colors hover:border-[#D10E63]/50 hover:text-[#E8A0BF]"
              >
                {t.secondary}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
