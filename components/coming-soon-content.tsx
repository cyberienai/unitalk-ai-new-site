'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { Kicker } from '@/components/home/section-kicker'

/**
 * Shared minimal "coming soon" surface for footer destinations that don't have
 * full content yet (Blog, Changelog, AI Gateway, AI server). Keeps the links
 * crawlable and on-brand instead of returning a 404, and points visitors back
 * to a live conversion path (Alma / missions).
 */
type Bi = { fr: string; en: string }

const T = {
  fr: {
    eyebrow: 'Bientôt disponible',
    lead: 'Cette page arrive prochainement.',
    back: 'Retour à l’accueil',
    talk: 'Confier une mission',
  },
  en: {
    eyebrow: 'Coming soon',
    lead: 'This page is on its way.',
    back: 'Back to home',
    talk: 'Hand over a mission',
  },
} as const

export function ComingSoonContent({ title, description }: { title: Bi; description: Bi }) {
  const { lang } = useLanguage()
  const t = T[lang]

  return (
    <main className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-[#F3EFE6] px-6 py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(#1C1A17_1px,transparent_1px),linear-gradient(90deg,#1C1A17_1px,transparent_1px)] [background-size:72px_72px]"
      />
      <div className="relative mx-auto max-w-xl text-center">
        <div className="flex justify-center">
          <Kicker>{t.eyebrow}</Kicker>
        </div>
        <h1 className="mt-6 text-balance font-sf text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-[#1C1A17]">
          {title[lang]}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-pretty text-[16px] leading-relaxed text-[#5C554A]">
          {description[lang]}
        </p>
        <p className="mt-2 text-[15px] text-[#6E655A]">{t.lead}</p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/missions"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#D10E63] px-7 text-[15px] font-bold text-[#FBF9F3] transition-colors hover:bg-[#B00C54] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F3EFE6]"
          >
            {t.talk}
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#4E483F] transition-colors hover:text-[#1C1A17]"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.back}
          </Link>
        </div>
      </div>
    </main>
  )
}
