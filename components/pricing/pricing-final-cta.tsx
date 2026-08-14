'use client'

import { startTransition, useState } from 'react'
import { persistPricingDraft } from '@/app/actions/pricing'
import { usePricingDraft } from './pricing-draft-context'

export function PricingFinalCta() {
  const { draft } = usePricingDraft()
  const [pending, setPending] = useState(false)
  function submit() {
    setPending(true)
    startTransition(() => persistPricingDraft(draft).catch(() => setPending(false)))
  }
  return <section className="bg-[#181615] py-16 text-[#FAF8F3] sm:py-20"><div className="editorial-shell flex flex-col justify-between gap-8 lg:flex-row lg:items-end"><div><p className="font-mono text-[10px] font-bold uppercase tracking-[.18em] text-[#F2A4C5]">Votre équipe évolue</p><h2 className="mt-5 max-w-4xl text-[34px] font-semibold leading-[1.05] tracking-[-.04em] sm:text-[44px]">Commencez petit. Ajoutez des agents ou de la capacité quand le travail augmente.</h2><p className="mt-5 max-w-2xl text-[#CFC6B8]">Votre configuration reste modifiable à tout moment.</p></div><button type="button" onClick={submit} disabled={pending} className="inline-flex min-h-12 shrink-0 items-center rounded-full bg-[#D10E63] px-7 text-sm font-bold text-white outline-none hover:bg-[#B00C54] focus-visible:ring-2 focus-visible:ring-[#F2A4C5] focus-visible:ring-offset-2 focus-visible:ring-offset-[#181615] disabled:opacity-60">{pending ? 'Préparation…' : 'Commencer gratuitement →'}</button></div></section>
}
