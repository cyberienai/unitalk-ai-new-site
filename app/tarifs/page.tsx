import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { PricingCollaboration, PricingFinalCta, PricingHero, PricingExplanations } from '@/components/pricing/pricing-sections'
import { MultiCollaboratorConfigurator, PricingConfigurator } from '@/components/pricing/pricing-configurator'
import { PricingFaq } from '@/components/pricing/pricing-faq'
import { pricingConfig } from '@/lib/pricing-config'
import { calculateAnnualSubscription } from '@/lib/pricing-calculator'

export const metadata: Metadata = {
  title: 'Tarifs des Collaborateurs IA',
  description:
    '49 € par mois pour l’identité de votre Collaborateur IA. Choisissez séparément les modèles avec des crédits Unitalk, vos clés API ou les deux.',
  alternates: { canonical: '/tarifs' },
  openGraph: {
    type: 'website',
    url: 'https://unitalk.ai/tarifs',
    title: 'Tarifs des Collaborateurs IA | Unitalk',
    description: '49 € par mois pour une identité professionnelle qui progresse. Les modèles et leurs usages restent votre choix.',
  },
}

const annualPrice = calculateAnnualSubscription(1)

const pricingJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Collaborateur IA Unitalk',
  description: 'Une identité professionnelle durable avec environnement privé, mémoire, moyens de communication, profils métier et compétences sans limite. Les usages des modèles IA sont réglés séparément.',
  offers: [
    {
      '@type': 'Offer',
      name: 'Forfait mensuel',
      price: String(pricingConfig.baseMonthlyPrice),
      priceCurrency: 'EUR',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: String(pricingConfig.baseMonthlyPrice),
        priceCurrency: 'EUR',
        billingDuration: 'P1M',
      },
      description: '7 jours d’essai gratuit sans carte bancaire. Les usages IA après l’essai sont réglés séparément.',
      url: 'https://unitalk.ai/tarifs',
    },
    {
      '@type': 'Offer',
      name: 'Forfait annuel',
      price: String(annualPrice),
      priceCurrency: 'EUR',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: String(annualPrice),
        priceCurrency: 'EUR',
        billingDuration: 'P1Y',
      },
      description: `${annualPrice} EUR facturés par an, soit deux mois offerts. Les usages IA sont réglés séparément.`,
      url: 'https://unitalk.ai/tarifs',
    },
  ],
}

export default function TarifsPage() {
  return (
    <div className="min-h-screen bg-[#F3EFE6] text-[#1C1A17]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingJsonLd) }} />
      <Navbar />
      <main>
        <PricingHero />
        <PricingConfigurator />
        <PricingCollaboration />
        <PricingExplanations />
        <MultiCollaboratorConfigurator />
        <PricingFaq />
        <PricingFinalCta />
      </main>
      <SiteFooter />
    </div>
  )
}
