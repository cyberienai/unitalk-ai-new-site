'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

export function PricingFinalCta() {
  const { lang } = useLanguage()
  return <section className="bg-[#D10E63] px-5 py-16 text-white sm:px-8 sm:py-24"><div className="editorial-shell grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="font-mono text-[10px] font-black uppercase tracking-[.2em] text-white/65">{lang === 'fr' ? 'Première mission offerte' : 'First mission free'}</p><h2 className="mt-5 max-w-4xl text-[clamp(2.5rem,5vw,4.8rem)] font-semibold leading-[.94] tracking-[-.06em]">{lang === 'fr' ? 'Mettez un Collaborateur IA au travail.' : 'Put an AI Collaborator to work.'}</h2><p className="mt-6 max-w-2xl text-[16px] leading-8 text-white/80">{lang === 'fr' ? 'Jusqu’à 7 jours et 1 million de tokens pour accomplir une première mission réelle. Sans carte bancaire et sans activation payante automatique.' : 'Up to 7 days and 1 million tokens to complete a first real mission. No credit card and no automatic paid activation.'}</p></div><Link href="/decouvrir?source=tarifs-final" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-[#181615] px-7 text-sm font-bold text-white outline-none hover:bg-[#292521] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#D10E63]">{lang === 'fr' ? 'Lancer ma première mission' : 'Launch my first mission'}<ArrowRight className="ml-2 size-4"/></Link></div></section>
}
