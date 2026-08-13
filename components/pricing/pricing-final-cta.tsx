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
  return <section className="py-16"><div className="editorial-shell"><div className="rounded-[18px] border border-[#DED6C8] bg-[#FAF8F3] p-7 sm:p-10"><h2 className="text-[34px] font-semibold tracking-[-.04em] sm:text-[44px]">Commencez gratuitement. Ajustez ensuite.</h2><p className="mt-4 text-[#4E483F]">Votre configuration reste modifiable à mesure que vos missions et vos Collaborateurs IA évoluent.</p><button type="button" onClick={submit} disabled={pending} className="mt-7 inline-flex min-h-12 items-center rounded-full bg-[#D10E63] px-6 text-sm font-bold text-white outline-none hover:bg-[#B00C54] focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 disabled:opacity-60">{pending ? 'Préparation…' : 'Commencer avec cette configuration →'}</button></div></div></section>
}
