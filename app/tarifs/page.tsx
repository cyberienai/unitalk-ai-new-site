import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { PricingCollaboration, PricingFinalCta, PricingHero, PricingExplanations } from '@/components/pricing/pricing-sections'
import { PricingConfigurator } from '@/components/pricing/pricing-configurator'
import { pricingConfig } from '@/lib/pricing-config'

export const metadata: Metadata = {
  title: 'Tarifs Unitalk : organisation, Collaborateurs IA et crédits',
  description:
    'Composez votre organisation avec Alma : Collaborateurs IA, Co-créateurs, capacité IA et crédits selon vos besoins.',
  alternates: { canonical: '/tarifs' },
  openGraph: {
    type: 'website',
    url: 'https://unitalk.ai/tarifs',
    title: 'Tarifs des Collaborateurs IA | Unitalk',
    description: 'Collaborateur IA dès 49 € par mois, capacité IA et licences optionnelles.',
  },
}

const pricingJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Collaborateur IA Unitalk',
  description: 'Une offre composable : Collaborateur IA, capacité IA, Alma et licence Co-créateur IA optionnelle.',
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
      description: '7 jours gratuits sans carte bancaire, puis 49 EUR par mois par Collaborateur IA, hors options sélectionnées.',
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
        <Suspense fallback={<div className="mx-auto h-[720px] max-w-[1120px] px-5 sm:px-8" />}>
          <PricingConfigurator />
        </Suspense>
        <PricingCollaboration />
        <PricingExplanations />
        <PricingFinalCta />
      </main>
      <SiteFooter />
    </div>
  )
}
