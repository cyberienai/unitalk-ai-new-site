import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { MarketplaceOverview } from '@/components/marketplace-overview'

export const metadata: Metadata = {
  title: 'Unitalk Marketplace: missions and resources for AI Collaborators',
  description: 'Explore missions, AI Collaborators, job profiles, skills, applications, models and servers that compose a governed work capability.',
  alternates: { canonical: '/en/marketplace', languages: { fr: '/marketplace', en: '/en/marketplace', 'x-default': '/marketplace' } },
}

export default function EnglishMarketplacePage() {
  return <><Navbar/><MarketplaceOverview lang="en"/><SiteFooter/></>
}
