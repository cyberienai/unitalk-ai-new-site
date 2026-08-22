'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

export function PricingFinalCta() {
  const { lang } = useLanguage()
  return <section className="bg-[#D10E63] px-5 py-16 text-white sm:px-8 sm:py-24"><div className="editorial-shell grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="font-mono text-[10px] font-black uppercase tracking-[.2em] text-white/65">{lang === 'fr' ? 'Commencez simplement' : 'Start simply'}</p><h2 className="mt-5 max-w-4xl text-[clamp(2.5rem,5vw,4.8rem)] font-semibold leading-[.94] tracking-[-.06em]">{lang === 'fr' ? 'Un utilisateur. Une première mission. 0 €.' : 'One user. One first mission. €0.'}</h2><p className="mt-6 max-w-2xl text-[16px] leading-8 text-white/80">{lang === 'fr' ? 'Découvrez Unitalk sans carte bancaire. Ajoutez ensuite votre équipe, vos Collaborateurs IA et vos crédits lorsque vous en avez besoin.' : 'Discover Unitalk with no credit card. Add your team, AI Collaborators and credits when you need them.'}</p></div><Link href="/decouvrir?source=tarifs-final" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-[#181615] px-7 text-sm font-bold text-white outline-none hover:bg-[#292521] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#D10E63]">{lang === 'fr' ? 'Démarrer gratuitement' : 'Start for free'}<ArrowRight className="ml-2 size-4"/></Link></div></section>
}
