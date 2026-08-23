import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { MarketplaceOverview } from '@/components/marketplace-overview'

export const metadata: Metadata = {
  title: 'Marketplace Unitalk : missions et ressources pour Collaborateurs IA',
  description: 'Explorez les missions, Collaborateurs IA, profils métier, compétences, applications, modèles et serveurs qui composent une capacité de travail gouvernée.',
  alternates: { canonical: '/marketplace', languages: { fr: '/marketplace', en: '/en/marketplace', 'x-default': '/marketplace' } },
  openGraph: { type: 'website', url: 'https://unitalk.ai/marketplace', title: 'Marketplace Unitalk', description: 'Commencez par une mission, puis équipez le Collaborateur IA qui la prendra en charge.' },
}

export default function MarketplacePage() {
  return <><Navbar/><MarketplaceOverview/><SiteFooter/></>
}
