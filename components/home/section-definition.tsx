'use client'

import Link from 'next/link'
import { AlmaInline } from '@/components/alma-inline'
import type { Lang } from '@/lib/language-context'
import { Kicker } from '@/components/home/section-kicker'

const COPY = {
  fr: {
    kicker: 'Comment ça marche',
    title: 'Des Collaborateurs IA qui progressent avec votre entreprise.',
    steps: [
      { n: '01', label: 'La mission', title: 'Confiez un travail à Alma.', body: 'Décrivez ce que vous voulez accomplir. Alma précise le résultat attendu, les règles et les décisions qui doivent rester humaines.', output: 'Mission cadrée' },
      { n: '02', label: 'La préparation', title: 'Alma prépare le Collaborateur IA.', body: 'Elle mobilise le profil métier, les compétences, les applications et les validations nécessaires à la mission.', output: 'Profil et accès préparés' },
      { n: '03', label: 'Le travail', title: 'Il travaille. Vous gardez la décision.', body: 'Votre Collaborateur IA agit avec les droits accordés et soumet les étapes sensibles à votre validation.', output: 'Résultat validé' },
      { n: '04', label: 'L’expérience', title: 'Ce qui fonctionne reste dans votre entreprise.', body: 'Les corrections validées enrichissent son expérience. Une méthode testée peut devenir une compétence réutilisable selon vos droits.', output: 'Expérience conservée' },
    ],
    close: 'Tout commence par une mission.',
    cta: 'Confier une première mission',
  },
  en: {
    kicker: 'How it works',
    title: 'AI Collaborators that progress with your company.',
    steps: [
      { n: '01', label: 'The mission', title: 'Entrust work to Alma.', body: 'Describe what you want to achieve. Alma clarifies the expected result, rules and decisions that must remain human.', output: 'Mission framed' },
      { n: '02', label: 'The preparation', title: 'Alma prepares the AI Collaborator.', body: 'She brings together the job profile, skills, applications and approvals required for the mission.', output: 'Profile and access prepared' },
      { n: '03', label: 'The work', title: 'It works. You keep the decision.', body: 'Your AI Collaborator acts with granted permissions and submits sensitive steps for your approval.', output: 'Result approved' },
      { n: '04', label: 'The experience', title: 'What works stays in your company.', body: 'Validated corrections enrich its experience. A tested method can become a reusable skill under your rights.', output: 'Experience retained' },
    ],
    close: 'It all starts with a mission.',
    cta: 'Entrust a first mission',
  },
} as const

export function SectionDefinition({ lang = 'fr' }: { lang?: Lang }) {
  const t = COPY[lang]
  return (
    <section className="bg-[#F3EFE6] py-14 sm:py-20">
      <div className="editorial-shell">
        <Kicker>{t.kicker}</Kicker>
        <h2 className="mt-4 max-w-3xl text-balance font-sf text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-[#1C1A17]">{t.title}</h2>

        <div aria-hidden className="relative mt-11 hidden h-5 lg:block">
          <span className="absolute left-[12.5%] right-[12.5%] top-1/2 h-px -translate-y-1/2 bg-[#D10E63]/30" />
          {[12.5, 37.5, 62.5, 87.5].map((left, index) => <span key={left} style={{ left: `${left}%` }} className={`absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 ${index === 3 ? 'border-[#2E7D4F] bg-[#2E7D4F]' : 'border-[#D10E63] bg-[#F3EFE6]'}`}>{index === 3 && <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-white">✓</span>}</span>)}
        </div>

        <div className="mt-7 grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {t.steps.map((step, index) => (
            <article key={step.n} className="relative border-l border-[#DED6C8] pl-5 md:px-6 lg:border-l-0 lg:px-5">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-[#A80C50]">{step.n} · {step.label}</p>
              <h3 className="mt-3 font-sf text-[22px] font-semibold leading-tight tracking-[-0.02em]">{step.title.startsWith('Alma') || step.title.includes('Alma') || step.title.startsWith('Entrust work to Alma') || step.title.includes('work to Alma') ? <><AlmaInline />{' '}{step.title}</> : step.title}</h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-[#4E483F]">{step.body}</p>
              <p className={`mt-5 text-sm font-semibold ${index === 3 ? 'text-[#1F6B41]' : 'text-[#A80C50]'}`}>{index === 3 ? '✓ ' : ''}{step.output}</p>
            </article>
          ))}
        </div>

        <div className="mt-11 flex flex-col items-start gap-4 border-t border-[#DED6C8] pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sf text-xl font-semibold">{t.close}</p>
          <Link href="/decouvrir" className="inline-flex min-h-12 items-center rounded-full bg-[#D10E63] px-6 text-[15px] font-bold text-white transition-transform hover:-translate-y-0.5">{t.cta} →</Link>
        </div>
      </div>
    </section>
  )
}
