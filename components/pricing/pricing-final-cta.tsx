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
  return <section className="bg-[#D10E63] px-5 py-16 text-white sm:px-8 sm:py-24"><div className="editorial-shell grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="font-mono text-[10px] font-black uppercase tracking-[.2em] text-white/65">Commencez par une mission réelle</p><h2 className="mt-5 max-w-4xl text-[clamp(2.5rem,5vw,4.8rem)] font-semibold leading-[.94] tracking-[-.06em]">Commencez gratuitement. Ajustez ensuite.</h2><p className="mt-6 max-w-2xl text-[16px] leading-8 text-white/80">Première mission gratuite, sans carte bancaire. Aucun abonnement payant n’est activé automatiquement.</p></div><button type="button" onClick={submit} disabled={pending} className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-[#181615] px-7 text-sm font-bold text-white outline-none hover:bg-[#292521] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#D10E63] disabled:opacity-60">{pending ? 'Préparation…' : 'Démarrer ma première mission gratuite'}</button></div></section>
}
