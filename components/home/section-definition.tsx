'use client'

import { Check, MessageSquareText, ShieldCheck, Sparkles } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { Kicker } from '@/components/home/section-kicker'
import { useAlma } from '@/components/home/alma-panel-context'

const COPY = {
  fr: {
    kicker: 'Votre première semaine',
    title: 'En 7 jours, testez une mission réelle.',
    lead: 'Pas une démonstration générique : choisissez un besoin concret de votre entreprise et observez comment Alma et votre Collaborateur IA le prennent en charge.',
    steps: [
      { title: 'Décrivez la mission', body: 'Expliquez votre besoin à Alma, à la voix ou par écrit.', icon: MessageSquareText },
      { title: 'Alma prépare le cadre', body: 'Elle précise le résultat attendu, le profil métier, les compétences, les applications et les validations.', icon: Sparkles },
      { title: 'Le Collaborateur IA agit', body: 'Il accomplit la mission dans le périmètre défini et soumet les étapes sensibles à votre validation.', icon: ShieldCheck },
      { title: 'Vous jugez le résultat', body: 'Vous évaluez le travail réalisé et décidez librement de poursuivre.', icon: Check },
    ],
    cta: 'Préparer ma première mission avec Alma',
    note: 'Essai gratuit de 7 jours pour tester une première mission sans carte bancaire',
  },
  en: {
    kicker: 'Your first week',
    title: 'Test a real mission in 7 days.',
    lead: 'Not a generic demo: choose a concrete need from your company and see how Alma and your AI Collaborator handle it.',
    steps: [
      { title: 'Describe the mission', body: 'Explain your need to Alma, by voice or in writing.', icon: MessageSquareText },
      { title: 'Alma prepares the framework', body: 'It clarifies the expected result, job profile, skills, applications and approvals.', icon: Sparkles },
      { title: 'The AI Collaborator acts', body: 'It completes the mission within the agreed scope and submits sensitive steps for your approval.', icon: ShieldCheck },
      { title: 'You assess the result', body: 'Review the work and freely decide whether to continue.', icon: Check },
    ],
    cta: 'Prepare my first mission with Alma',
    note: '7-day free trial to test a first mission, with no credit card required',
  },
} as const

export function SectionDefinition({ lang = 'fr' }: { lang?: Lang }) {
  const t = COPY[lang]
  const { openAlma } = useAlma()
  return (
    <section className="border-b border-[#DED6C8] bg-[#F3EFE6] py-16 sm:py-20">
      <div className="editorial-shell">
        <div className="max-w-3xl">
          <Kicker>{t.kicker}</Kicker>
          <h2 className="mt-4 text-balance font-sf text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-[#1C1A17]">{t.title}</h2>
          <p className="mt-5 max-w-2xl text-[16px] leading-7 text-[#4E483F] sm:text-[17px]">{t.lead}</p>
        </div>

        <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {t.steps.map((step) => {
            const Icon = step.icon
            return (
              <li key={step.title} className="rounded-3xl border border-[#DED6C8] bg-[#FBF9F3] p-6">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#D10E63]/10 text-[#B00C54]"><Icon className="size-[18px]" /></span>
                  <h3 className="font-sf text-lg font-semibold leading-tight text-[#1C1A17]">{step.title}</h3>
                </div>
                <p className="mt-4 text-sm leading-6 text-[#5A5348]">{step.body}</p>
              </li>
            )
          })}
        </ol>

        <div className="mt-10 flex flex-col items-center">
          <button type="button" onClick={() => openAlma(undefined, 'first_week')} className="inline-flex min-h-12 items-center rounded-full bg-[#D10E63] px-7 text-[15px] font-bold text-white transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2">{t.cta} →</button>
          <p className="mt-3 text-center text-xs font-medium text-[#625B50]">{t.note}</p>
        </div>
      </div>
    </section>
  )
}
