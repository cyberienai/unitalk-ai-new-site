'use client'

import Link from 'next/link'
import type { Lang } from '@/lib/language-context'
import { Kicker } from '@/components/home/section-kicker'

const COPY = {
  fr: {
    kicker: 'La différence',
    title: 'Un Collaborateur IA, ce n\'est pas un agent comme les autres.',
    rows: [
      { left: 'Vous lui dites quoi faire à chaque fois', right: 'Il apprend votre méthode et la reproduit' },
      { left: 'Il travaille dans sa bulle', right: 'Il utilise vos applications et vos outils' },
      { left: 'Le résultat disparaît avec la conversation', right: 'Ce qui marche est conservé et réutilisé' },
      { left: 'Un agent = une tâche', right: 'Un Collaborateur = tous les métiers de l\'entreprise' },
      { left: 'Il décide sans vous', right: 'Il vous soumet les décisions importantes' },
    ],
    cta: 'Confier une première mission',
  },
  en: {
    kicker: 'The difference',
    title: 'An AI Collaborator is not just another agent.',
    rows: [
      { left: 'You tell it what to do every time', right: 'It learns your method and reproduces it' },
      { left: 'It works in isolation', right: 'It uses your apps and your tools' },
      { left: 'Results vanish with the conversation', right: 'What works is saved and reused' },
      { left: 'One agent = one task', right: 'One Collaborator = every role in the company' },
      { left: 'It decides without you', right: 'It submits important decisions to you' },
    ],
    cta: 'Entrust a first mission',
  },
} as const

export function SectionDefinition({ lang = 'fr' }: { lang?: Lang }) {
  const t = COPY[lang]
  return (
    <section className="bg-[#F3EFE6] py-14 sm:py-20">
      <div className="editorial-shell">
        <Kicker>{t.kicker}</Kicker>
        <h2 className="mt-4 max-w-2xl text-balance font-sf text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-[#1C1A17]">{t.title}</h2>

        <div className="mt-10 space-y-px rounded-[18px] bg-[#DED6C8]">
          {t.rows.map((row, i) => (
            <div key={i} className={`grid grid-cols-[1fr_1fr] bg-white px-5 py-4 sm:px-8 sm:py-5 ${i === 0 ? 'rounded-t-[18px]' : ''} ${i === t.rows.length - 1 ? 'rounded-b-[18px]' : ''}`}>
              <p className="text-[15px] leading-relaxed text-[#8A8278] line-through decoration-[#C5BCAE]">{row.left}</p>
              <p className="text-[15px] leading-relaxed font-semibold text-[#1C1A17]">{row.right}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link href="/decouvrir" className="inline-flex min-h-12 items-center rounded-full bg-[#D10E63] px-7 text-[15px] font-bold text-white transition-transform hover:-translate-y-0.5">{t.cta} →</Link>
        </div>
      </div>
    </section>
  )
}