'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

export function PricingFinalCta() {
  const { lang } = useLanguage()
  return <section className="bg-[#D10E63] py-16 text-white sm:py-24"><div className="editorial-shell grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="font-mono text-[11px] font-black uppercase tracking-[.2em] text-white/80">{lang === 'fr' ? 'Première mission offerte' : 'First mission included'}</p><h2 className="mt-5 max-w-4xl text-[clamp(2.5rem,5vw,4.8rem)] font-semibold leading-[.94] tracking-[-.06em]">{lang === 'fr' ? 'Votre première mission commence ici.' : 'Your first mission starts here.'}</h2><p className="mt-6 max-w-2xl text-[16px] leading-8 text-white/90">{lang === 'fr' ? 'Décrivez le résultat attendu. Aucun abonnement payant n’est activé sans votre accord.' : 'Describe the expected outcome. No paid subscription is activated without your approval.'}</p></div><Link href="/decouvrir?source=tarifs" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-[#181615] px-7 text-sm font-bold text-white outline-none hover:bg-[#292521] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#D10E63]">{lang === 'fr' ? 'Démarrer ma mission offerte' : 'Start my included mission'}<ArrowRight className="ml-2 size-4"/></Link></div></section>
}
