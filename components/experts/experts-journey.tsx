'use client'

import type { Lang } from '@/lib/language-context'
import { JOURNEY_STEPS } from '@/lib/experts'

/**
 * The client journey (brief §8). A short, honest progression that ends on the
 * governance promise: the expert helps, the company keeps control.
 */
export function ExpertsJourney({ lang }: { lang: Lang }) {
  const fr = lang === 'fr'
  return (
    <section
      className="border-y border-[#E7DFD0] bg-[#FBF7F2]"
      aria-labelledby="experts-journey-title"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="max-w-2xl">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#AD0C53]">
            {fr ? 'Comment ça se passe' : 'How it works'}
          </p>
          <h2
            id="experts-journey-title"
            className="mt-2.5 text-balance font-sf text-[26px] font-bold leading-tight tracking-[-0.02em] text-[var(--store-text)] sm:text-[32px]"
          >
            {fr ? 'Un parcours simple, du besoin au résultat.' : 'A simple path, from need to result.'}
          </h2>
        </div>

        <ol className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {JOURNEY_STEPS.map((step, i) => (
            <li key={step.title[lang]} className="relative flex flex-col">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D10E63] font-sf text-sm font-bold text-[#FBF9F3]"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <h3 className="mt-3 text-pretty font-sf text-[15px] font-bold leading-snug text-[var(--store-text)]">
                {step.title[lang]}
              </h3>
              <p className="mt-1.5 text-pretty text-[13px] leading-relaxed text-[var(--store-muted)]">{step.body[lang]}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12 rounded-3xl bg-[#241F1D] px-6 py-10 text-center sm:px-10 sm:py-12">
          <p className="mx-auto max-w-2xl text-balance font-sf text-2xl font-bold leading-tight tracking-[-0.02em] text-[#FBF9F3] sm:text-[30px]">
            {fr ? 'L’expert vous accompagne.' : 'The expert supports you.'}
            <br />
            <span className="text-[#F2A9C9]">
              {fr ? 'Votre entreprise garde la maîtrise.' : 'Your company keeps control.'}
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}
