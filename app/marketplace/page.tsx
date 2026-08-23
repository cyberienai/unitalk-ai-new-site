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
  return <><a href="#main-content" className="sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-3 focus:font-bold focus:text-[#1C1A17] focus:not-sr-only">Aller au contenu principal</a><Navbar/><MarketplaceOverview/><SiteFooter/></>
}
