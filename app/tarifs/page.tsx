import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { PricingCollaboration, PricingFinalCta, PricingHero, PricingExplanations } from '@/components/pricing/pricing-sections'
import { MultiCollaboratorConfigurator, PricingConfigurator } from '@/components/pricing/pricing-configurator'
import { pricingConfig } from '@/lib/pricing-config'

export const metadata: Metadata = {
  title: 'Tarifs des Collaborateurs IA',
  description:
    '0 € par utilisateur humain. 98 € par mois par Collaborateur IA, avec 5 millions de tokens inclus chaque mois.',
  alternates: { canonical: '/tarifs' },
  openGraph: {
    type: 'website',
    url: 'https://unitalk.ai/tarifs',
    title: 'Tarifs des Collaborateurs IA | Unitalk',
    description: '0 € par humain. 98 € par Collaborateur IA. 5 millions de tokens inclus chaque mois.',
  },
}

const pricingJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Collaborateur IA Unitalk',
  description: 'Une identité professionnelle durable avec environnement privé, mémoire, moyens de communication, profils métier et compétences sans limite. Les usages des modèles IA sont réglés séparément.',
  offers: [
    {
      '@type': 'Offer',
      name: 'Collaborateur IA mensuel',
      price: String(pricingConfig.baseMonthlyPrice),
      priceCurrency: 'EUR',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: String(pricingConfig.baseMonthlyPrice),
        priceCurrency: 'EUR',
        billingDuration: 'P1M',
      },
      description: '7 jours gratuits sans carte bancaire, puis 98 EUR par mois. 5 millions de tokens inclus chaque mois ; consommation supplémentaire facturée à l’usage.',
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
        <PricingFinalCta />
      </main>
      <SiteFooter />
    </div>
  )
}
