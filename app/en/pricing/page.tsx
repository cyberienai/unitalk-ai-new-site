import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { PricingPageContent } from '@/components/pricing/pricing-page-content'
import { ROLE_DETAILS } from '@/lib/collaborators-catalog'
import { PURCHASE_DRAFT_COOKIE, parsePurchaseDraft } from '@/lib/purchase-draft'
import { normalizePricingDraft } from '@/lib/unitalk-pricing'

const pricingJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Unitalk AI',
  description: 'Workspace for human and AI teams, with 5 million monthly tokens included per AI Collaborator.',
  offers: [
    { '@type': 'Offer', name: 'Solo Workspace', price: '0', priceCurrency: 'EUR' },
    { '@type': 'Offer', name: 'Team Workspace', price: '49', priceCurrency: 'EUR' },
    { '@type': 'Offer', name: 'Business Workspace', price: '299', priceCurrency: 'EUR' },
    { '@type': 'Offer', name: 'AI Collaborator', price: '49', priceCurrency: 'EUR' },
  ],
}

export const metadata: Metadata = {
  title: 'AI Collaborator and Workspace pricing',
  description: 'Configure your Workspace and AI Collaborators from €49/month, with 5 million monthly tokens included per Collaborator.',
  alternates: { canonical: '/en/pricing', languages: { fr: '/tarifs', en: '/en/pricing', 'x-default': '/tarifs' } },
  openGraph: {
    type: 'website', locale: 'en_GB', alternateLocale: ['fr_FR'], url: 'https://unitalk.ai/en/pricing',
    title: 'AI Collaborator and Workspace pricing | Unitalk',
    description: 'Workspace with no per-user billing and AI Collaborators at €49/month, each with 5 million monthly tokens included.',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Unitalk pricing for AI Collaborators and Workspace' }],
  },
  twitter: { card: 'summary_large_image', title: 'AI Collaborator pricing | Unitalk', description: 'No per-user billing. €49 per AI Collaborator with 5 million monthly tokens included.', images: ['/opengraph-image'] },
}

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

export default async function EnglishPricingPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams
  const stored = parsePurchaseDraft((await cookies()).get(PURCHASE_DRAFT_COOKIE)?.value)?.pricing
  const requestedProfile = firstParam(params.profil)
  const selectedProfile = requestedProfile && ROLE_DETAILS[requestedProfile] ? requestedProfile : stored?.selectedProfile
  const initialDraft = normalizePricingDraft({ ...stored, selectedProfile })
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingJsonLd) }}/><PricingPageContent initialDraft={initialDraft} selectedProfile={selectedProfile} lang="en" /></>
}
