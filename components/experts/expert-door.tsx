'use client'

import Link from 'next/link'
import { ArrowRight, UserRound } from 'lucide-react'
import type { Lang } from '@/lib/language-context'

/**
 * A discreet, reusable "door" toward the Experts pillar.
 *
 * Deliberately understated: the product stands on its own; a human expert is
 * an option, never a prerequisite. Placed at the END of a surface (never in a
 * hero or next to a primary CTA) so it reads as "if you'd like a hand", not
 * "you'll need help".
 *
 * `tone`:
 *  - 'light'  → for light backgrounds (default)
 *  - 'dark'   → for dark sections (e.g. the collab demonstration band)
 */
export function ExpertDoor({
  lang,
  href = '/experts',
  title,
  cta,
  tone = 'light',
}: {
  lang: Lang
  href?: string
  title?: string
  cta?: string
  tone?: 'light' | 'dark'
}) {
  const label =
    title ??
    (lang === 'fr'
      ? 'Un projet plus large ? Un expert peut vous accompagner.'
      : 'A larger project? An expert can support you.')
  const action = cta ?? (lang === 'fr' ? 'Découvrir les experts' : 'Discover the experts')

  const dark = tone === 'dark'

  return (
    <Link
      href={href}
      className={`group flex flex-col gap-2 rounded-xl border px-5 py-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/40 sm:flex-row sm:items-center sm:justify-between sm:gap-4 ${
        dark
          ? 'border-[#FBF9F3]/15 bg-[#FBF9F3]/[0.06] hover:border-[#FBF9F3]/30'
          : 'border-[var(--store-line)] bg-[var(--store-surface)] hover:border-[#D10E63]/40'
      }`}
    >
      <span className="flex items-center gap-3">
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
            dark ? 'bg-[#FBF9F3]/10 text-[#F4A9C9]' : 'bg-[#D10E63]/[0.08] text-[#D10E63]'
          }`}
        >
          <UserRound className="h-[18px] w-[18px]" strokeWidth={1.8} aria-hidden="true" />
        </span>
        <span className={`text-sm leading-relaxed ${dark ? 'text-[#FBF9F3]/80' : 'text-[var(--store-text)]'}`}>
          {label}
        </span>
      </span>
      <span
        className={`inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold ${
          dark ? 'text-[#F4A9C9]' : 'text-[#AD0C53]'
        }`}
      >
        {action}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </Link>
  )
}
