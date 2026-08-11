import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { PricingHero, BilledExplainer, PricingIncluded, UsageModesInfo } from '@/components/pricing/pricing-sections'
import { PricingConfigurator } from '@/components/pricing/pricing-configurator'
import { PricingFaq } from '@/components/pricing/pricing-faq'

export const metadata: Metadata = {
  title: 'Tarifs · Collaborateurs IA Unitalk',
  description:
    'À partir de 49 € par mois par identité de Collaborateur IA, avec profils métier illimités et sept jours d’essai sans carte bancaire.',
}

export default function TarifsPage() {
  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#1C1A17]">
      <Navbar />
      <main>
        <PricingHero />
        <PricingConfigurator />
        <BilledExplainer />
        <PricingIncluded />
        <UsageModesInfo />
        <PricingFaq />
      </main>
      <SiteFooter />
    </div>
  )
}
