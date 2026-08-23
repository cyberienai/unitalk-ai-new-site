import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { PricingPageContent } from '@/components/pricing/pricing-page-content'
import { PURCHASE_DRAFT_COOKIE, parsePurchaseDraft } from '@/lib/purchase-draft'
import { normalizePricingDraft } from '@/lib/unitalk-pricing'
import { ROLE_DETAILS } from '@/lib/collaborators-catalog'

const pricingJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Unitalk AI',
  description: 'Workspace pour équipes humaines et IA, avec 5 millions de tokens mensuels inclus par Collaborateur IA.',
  offers: [
    { '@type': 'Offer', name: 'Workspace Solo', price: '0', priceCurrency: 'EUR' },
    { '@type': 'Offer', name: 'Workspace Équipe', price: '49', priceCurrency: 'EUR' },
    { '@type': 'Offer', name: 'Workspace Entreprise', price: '299', priceCurrency: 'EUR' },
    { '@type': 'Offer', name: 'Collaborateur IA', price: '49', priceCurrency: 'EUR' },
  ],
}

export const metadata: Metadata = {
  title: 'Tarifs Collaborateur IA et entreprise IA',
  description: 'Configurez votre Workspace et vos Collaborateurs IA à partir de 49 €/mois, avec 5 millions de tokens mensuels inclus par Collaborateur.',
  alternates: { canonical: '/tarifs', languages: { fr: '/tarifs', 'en-US': '/en/pricing', 'x-default': '/tarifs' } },
  openGraph: {
    type: 'website', locale: 'fr_FR', alternateLocale: ['en_US'], url: 'https://unitalk.ai/tarifs',
    title: 'Tarifs Collaborateur IA et entreprise IA | Unitalk',
    description: 'Workspace sans facturation par utilisateur et Collaborateurs IA à 49 €/mois avec 5 millions de tokens mensuels inclus chacun.',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Tarifs Unitalk pour les Collaborateurs IA et le Workspace' }],
  },
  twitter: { card: 'summary_large_image', title: 'Tarifs Collaborateur IA | Unitalk', description: 'Pas de facturation par utilisateur. 49 € par Collaborateur IA avec 5 millions de tokens mensuels inclus.', images: ['/opengraph-image'] },
}

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

export default async function TarifsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams
  const stored = parsePurchaseDraft((await cookies()).get(PURCHASE_DRAFT_COOKIE)?.value)?.pricing
  const requestedProfile = firstParam(params.profil)
  const selectedProfile = requestedProfile && ROLE_DETAILS[requestedProfile] ? requestedProfile : stored?.selectedProfile
  const initialDraft = normalizePricingDraft({ ...stored, organizationTier: 'solo', collaborators: 1, selectedProfile, coCreators: 0, usageMode: 'included', creditBudget: 0, capacity: 'included' })

  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingJsonLd) }}/><PricingPageContent initialDraft={initialDraft} selectedProfile={selectedProfile} /></>
}
