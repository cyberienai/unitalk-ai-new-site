'use client'

import { ArrowRight } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { EXPERT_DOMAINS, type ExpertDomain } from '@/lib/experts'

/**
 * The four intervention domains (brief §7). Each card is a single button that
 * loads its context into Alma — never a long list of deliverables.
 */
export function ExpertsDomains({
  lang,
  onPick,
}: {
  lang: Lang
  onPick: (domain: ExpertDomain) => void
}) {
  const fr = lang === 'fr'
  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-6 sm:py-16 lg:px-8" aria-labelledby="experts-domains-title">
      <div className="max-w-2xl">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#AD0C53]">
          {fr ? 'Quatre domaines d’intervention' : 'Four intervention domains'}
        </p>
        <h2
          id="experts-domains-title"
          className="mt-2.5 text-balance font-sf text-[26px] font-bold leading-tight tracking-[-0.02em] text-[var(--store-text)] sm:text-[32px]"
        >
          {fr ? 'Un accompagnement, quatre façons d’intervenir.' : 'One kind of support, four ways to step in.'}
        </h2>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {EXPERT_DOMAINS.map((d) => (
          <button
            key={d.key}
            type="button"
            onClick={() => onPick(d)}
            className="group flex min-h-[188px] flex-col rounded-2xl border border-[#E7DFD0] bg-[#FBF9F3] p-5 text-left transition-all hover:border-[#D10E63]/40 hover:shadow-[0_12px_28px_-20px_rgba(28,26,23,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/45"
          >
            <h3 className="font-sf text-lg font-bold text-[var(--store-text)]">{d.title[lang]}</h3>
            <p className="mt-2 flex-1 text-pretty text-[14px] leading-relaxed text-[var(--store-muted)]">{d.desc[lang]}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#D10E63]">
              {d.cta[lang]}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
