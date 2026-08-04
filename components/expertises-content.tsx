'use client'

import Link from 'next/link'
import { ArrowRight, Compass, Plug, SlidersHorizontal, Eye, ShieldCheck } from 'lucide-react'
import { useLanguage, type Lang } from '@/lib/language-context'

type Copy = {
  kicker: string
  title: string
  lead: string
  distinction: { term: string; def: string }[]
  stepsTitle: string
  steps: { title: string; body: string }[]
  optional: string
  primary: string
  secondary: string
  note: string
}

const T: Record<Lang, Copy> = {
  fr: {
    kicker: 'Un expert à vos côtés',
    title: 'Un accompagnement humain pour vos missions les plus exigeantes.',
    lead: "L'accompagnement par un expert IA est facultatif. La plupart des missions se lancent en autonomie ; un expert intervient quand le besoin demande davantage de cadrage, d'intégration ou de supervision.",
    distinction: [
      { term: 'Profil métier', def: 'un produit installable, activé directement dans votre workspace.' },
      { term: 'Expertise', def: 'une prestation humaine réalisée par un expert IA à vos côtés.' },
    ],
    stepsTitle: 'Ce qu’un expert IA peut prendre en charge',
    steps: [
      { title: 'Cadrage', body: 'Préciser le résultat, le périmètre et les critères de réussite.' },
      { title: 'Intégration', body: 'Connecter les applications et préparer les données nécessaires.' },
      { title: 'Configuration', body: 'Adapter les profils, les compétences, les permissions et les validations.' },
      { title: 'Supervision', body: 'Suivre l’exécution, contrôler la qualité et améliorer le dispositif.' },
    ],
    optional: 'Facultatif · chaque mission peut se lancer sans expert.',
    primary: 'Être mis en relation',
    secondary: 'Voir les missions',
    note: 'Nous vous mettons en relation avec un expert IA adapté à votre besoin. Aucun engagement tant que le périmètre n’est pas défini avec vous.',
  },
  en: {
    kicker: 'An expert by your side',
    title: 'Human support for your most demanding missions.',
    lead: 'Support from an AI expert is optional. Most missions launch on their own; an expert steps in when the need calls for more scoping, integration or supervision.',
    distinction: [
      { term: 'Job profile', def: 'an installable product, activated directly in your workspace.' },
      { term: 'Expertise', def: 'human work delivered by an AI expert alongside you.' },
    ],
    stepsTitle: 'What an AI expert can take on',
    steps: [
      { title: 'Scoping', body: 'Define the outcome, the scope and the success criteria.' },
      { title: 'Integration', body: 'Connect the apps and prepare the required data.' },
      { title: 'Configuration', body: 'Adapt profiles, skills, permissions and approvals.' },
      { title: 'Supervision', body: 'Track execution, control quality and improve the setup.' },
    ],
    optional: 'Optional · every mission can launch without an expert.',
    primary: 'Get connected',
    secondary: 'Browse missions',
    note: 'We connect you with an AI expert suited to your need. No commitment until the scope is defined with you.',
  },
}

export function ExpertisesContent() {
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
          <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#E4DDCE] bg-[#FBF9F3] px-3.5 py-1.5 text-xs font-semibold text-[#5A5349]">
            <ShieldCheck className="h-4 w-4 text-[#0F8A5F]" />
            {t.optional}
          </p>
        </div>
      </section>

      <section className="px-5 py-8 sm:px-8">
        <div className="editorial-shell">
          <h2 className="font-sf text-lg font-bold text-[#1C1A17]">{t.stepsTitle}</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.steps.map((step, i) => {
              const StepIcon = [Compass, Plug, SlidersHorizontal, Eye][i]
              return (
                <div key={step.title} className="rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1C1A17] text-[#FBF9F3]">
                    <StepIcon className="h-4 w-4" />
                  </span>
                  <h3 className="mt-3 font-sf text-sm font-bold text-[#1C1A17]">{step.title}</h3>
                  <p className="mt-1.5 text-pretty text-[13px] leading-6 text-[#5A5349]">{step.body}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-8 sm:px-8">
        <div className="editorial-shell">
          <div className="grid gap-4 rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-6 sm:grid-cols-2 sm:p-7">
            {t.distinction.map((d) => (
              <p key={d.term} className="text-pretty text-sm leading-7 text-[#4A443C]">
                <span className="font-bold text-[#1C1A17]">{d.term}</span> : {d.def}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-8 sm:py-16">
        <div className="editorial-shell">
          <div className="rounded-[2rem] bg-[#1C1A17] p-8 sm:p-12">
            <p className="max-w-2xl text-pretty text-sm leading-7 text-[#C9BFB2]">{t.note}</p>
            <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <Link
                href="/decouvrir"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#D10E63] px-5 py-3 text-sm font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5"
              >
                {t.primary}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/missions"
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
