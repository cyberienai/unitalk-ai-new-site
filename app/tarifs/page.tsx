import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { PricingHero, BilledExplainer, UsageModesInfo } from '@/components/pricing/pricing-sections'
import { PricingConfigurator } from '@/components/pricing/pricing-configurator'
import { PricingFaq } from '@/components/pricing/pricing-faq'

export const metadata: Metadata = {
  title: 'Tarifs · Collaborateurs IA Unitalk',
  description:
    'Configurez vos Collaborateurs IA, choisissez votre mode de consommation et estimez votre budget mensuel. Profils métier illimités, multimodèle, crédits ou propres clés API.',
}

export default function TarifsPage() {
  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#1C1A17]">
      <Navbar />
      <main>
        <PricingHero />
        <PricingConfigurator />
        <BilledExplainer />
        <UsageModesInfo />
        <PricingFaq />
      </main>
      <SiteFooter />
    </div>
  )
}
