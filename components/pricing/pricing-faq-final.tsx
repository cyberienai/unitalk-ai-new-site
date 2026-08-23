'use client'

import Link from 'next/link'
import { useId, useState } from 'react'
import { useLanguage } from '@/lib/language-context'
import { pricingFaqItems, type PricingFaqItem } from '@/lib/pricing-faq'
import { Kicker } from '@/components/home/section-kicker'

export function PricingFaqFinal() {
  const { lang } = useLanguage()
  return <section className="relative overflow-hidden border-y border-[#D8D0C2] bg-[#FAF8F3] py-16 sm:py-24"><div aria-hidden className="pointer-events-none absolute -left-32 top-10 size-72 rounded-full bg-[#D10E63]/[.055] blur-3xl"/><div className="editorial-shell relative grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-16"><div className="lg:sticky lg:top-28 lg:h-fit"><Kicker>{lang === 'fr' ? 'Comprendre votre tarif' : 'Understand your pricing'}</Kicker><h2 className="mt-5 max-w-lg text-balance text-[clamp(2.5rem,5vw,4.8rem)] font-semibold leading-[.94] tracking-[-.06em]">{lang === 'fr' ? <>Ce qui est inclus.<span className="block text-[#D10E63]">Ce que vous décidez.</span></> : <>What is included.<span className="block text-[#D10E63]">What you decide.</span></>}</h2><p className="mt-5 max-w-md text-sm leading-7 text-[#625B50]">{lang === 'fr' ? 'Mission offerte, licences, capacité IA et consommation : les règles importantes avant de commander.' : 'Included mission, licenses, AI capacity and usage: the important rules before ordering.'}</p></div><div className="overflow-hidden rounded-[24px] border border-[#D8D0C2] bg-[#FFFDF9] px-5 shadow-[0_24px_60px_-50px_rgba(28,26,23,.55)] sm:px-7">{pricingFaqItems[lang].map(item => <Item key={item.question} item={item}/>)}</div></div></section>
}

function Item({ item }: { item: PricingFaqItem }) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const triggerId = useId()
  return <div className="border-b border-[#DED6C8] last:border-b-0"><h3><button id={triggerId} type="button" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen(value => !value)} className="flex min-h-20 w-full items-center justify-between gap-6 rounded-sm text-left text-[16px] font-semibold outline-none transition-colors hover:text-[#B00C54] focus-visible:ring-2 focus-visible:ring-[#D10E63]"><span>{item.question}</span><span aria-hidden className={`flex size-8 shrink-0 items-center justify-center rounded-full border border-[#D10E63]/25 bg-[#FBEAF1] text-lg font-normal text-[#D10E63] transition-transform ${open ? 'rotate-45' : ''}`}>+</span></button></h3>{open && <div id={panelId} role="region" aria-labelledby={triggerId} className="max-w-2xl pb-7 pr-10 text-[15px] leading-7 text-[#4E483F]"><p>{item.answer}{item.link && <> <Link href={item.link.href} className="font-bold text-[#B00C54] underline decoration-[#D10E63]/30 underline-offset-4">{item.link.label}</Link>.</>}</p></div>}</div>
}
