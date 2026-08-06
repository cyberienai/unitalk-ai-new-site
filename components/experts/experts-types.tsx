'use client'

import { ArrowRight, ShieldCheck } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { EXPERT_TYPES } from '@/lib/experts'

/**
 * Expert types (brief §9) — categories, never named consultants. Paired with
 * the honest availability state (brief §10): the network is on selection, so we
 * say so instead of faking "book now" / "available immediately".
 */
export function ExpertsTypes({ lang, onPresent }: { lang: Lang; onPresent: () => void }) {
  const fr = lang === 'fr'
  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-6 sm:py-16 lg:px-8" aria-labelledby="experts-types-title">
      <div className="max-w-2xl">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#AD0C53]">
          {fr ? 'Types d’expertise' : 'Types of expertise'}
        </p>
        <h2
          id="experts-types-title"
          className="mt-2.5 text-balance font-sf text-[26px] font-bold leading-tight tracking-[-0.02em] text-[var(--store-text)] sm:text-[32px]"
        >
          {fr ? 'Les expertises mobilisables.' : 'The expertise you can call on.'}
        </h2>
        <p className="mt-3 text-pretty text-[15px] leading-relaxed text-[var(--store-muted)]">
          {fr
            ? 'Des catégories réelles, pas des profils fictifs. Nous n’affichons ni prix, ni notes, ni disponibilité inventée.'
            : 'Real categories, not fictional profiles. We show no invented prices, ratings or availability.'}
        </p>
      </div>

      <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {EXPERT_TYPES.map((type) => (
          <li
            key={type.fr}
            className="rounded-xl border border-[#E7DFD0] bg-[#FBF9F3] px-4 py-4 text-[14px] font-medium leading-snug text-[var(--store-text)]"
          >
            {type[lang]}
          </li>
        ))}
      </ul>

      {/* Honest availability state */}
      <div className="mt-10 flex flex-col items-start gap-5 rounded-3xl border border-[#E7DFD0] bg-[#FBF7F2] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#D10E63]/12 text-[#D10E63]">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div>
            <p className="font-sf text-base font-bold text-[var(--store-text)]">
              {fr ? 'Mise en relation assurée par Unitalk' : 'Introductions handled by Unitalk'}
            </p>
            <p className="mt-1 max-w-md text-pretty text-[14px] leading-relaxed text-[var(--store-muted)]">
              {fr
                ? 'Experts disponibles sur sélection. Vous présentez votre projet, nous identifions l’expertise adaptée.'
                : 'Experts available on selection. You present your project, we identify the right expertise.'}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onPresent}
          className="inline-flex min-h-[48px] shrink-0 items-center gap-2 rounded-full bg-[#D10E63] px-6 py-3 text-sm font-bold text-[#FBF9F3] transition-colors hover:bg-[#B00B52] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBF7F2]"
        >
          {fr ? 'Présenter mon projet' : 'Present my project'}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  )
}
