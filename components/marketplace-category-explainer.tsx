'use client'

import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { UnitalkLogo } from '@/components/unitalk-logo'
import { useLanguage } from '@/lib/language-context'

type Bi = { fr: string; en: string }

export function MarketplaceCategoryExplainer({
  categoryId,
  eyebrow,
  title,
  lead,
  principles,
}: {
  categoryId: string
  eyebrow: Bi
  title: Bi
  lead: Bi
  principles: { title: Bi; body: Bi }[]
}) {
  const { lang } = useLanguage()
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F3EFE6] pt-28 text-[#1C1A17] sm:pt-32">
        <section className="border-b border-[#CFC5B5] px-5 pb-16 sm:px-8 sm:pb-20">
          <div className="editorial-shell">
            <div className="flex items-center gap-3"><UnitalkLogo size={28} activeSegment={0} inactiveColor="#C9BFB0" /><p className="font-mono text-[10px] font-black uppercase tracking-[.2em] text-[#B00C54]">{eyebrow[lang]}</p></div>
            <h1 className="mt-7 max-w-5xl text-[clamp(2.8rem,6vw,6rem)] font-semibold leading-[.93] tracking-[-.065em]">{title[lang]}</h1>
            <p className="mt-7 max-w-3xl text-[17px] leading-8 text-[#4E483F]">{lead[lang]}</p>
            <Link href={`/marketplace#${categoryId}`} className="mt-9 inline-flex min-h-12 items-center rounded-full bg-[#D10E63] px-6 text-sm font-bold text-white">{lang === 'fr' ? 'Voir les créations dans la Marketplace' : 'View items in the Marketplace'}<ArrowRight className="ml-2 size-4" /></Link>
          </div>
        </section>
        <section className="px-5 py-16 sm:px-8 sm:py-20">
          <div className="editorial-shell grid gap-px overflow-hidden rounded-3xl border border-[#D8D0C2] bg-[#D8D0C2] md:grid-cols-3">
            {principles.map((principle) => <article key={principle.title.fr} className="bg-[#FAF8F3] p-7 sm:p-8"><Check className="size-5 text-[#D10E63]" /><h2 className="mt-7 text-2xl font-bold tracking-[-.03em]">{principle.title[lang]}</h2><p className="mt-4 text-sm leading-7 text-[#625B50]">{principle.body[lang]}</p></article>)}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
