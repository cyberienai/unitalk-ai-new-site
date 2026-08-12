import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { PricingHero, PricingExplanations } from '@/components/pricing/pricing-sections'
import { MultiCollaboratorConfigurator, PricingConfigurator } from '@/components/pricing/pricing-configurator'
import { PricingFaq } from '@/components/pricing/pricing-faq'

export const metadata: Metadata = {
  title: 'Tarifs · Collaborateurs IA Unitalk',
  description:
    '49 € par mois pour l’identité de votre Collaborateur IA. Choisissez séparément les modèles avec des crédits Unitalk, vos clés API ou les deux.',
}

export default function TarifsPage() {
  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#1C1A17]">
      <Navbar />
      <main>
        <PricingHero />
        <PricingConfigurator />
        <PricingExplanations />
        <MultiCollaboratorConfigurator />
        <PricingFaq />
      </main>
      <SiteFooter />
    </div>
  )
}
