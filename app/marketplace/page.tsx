import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { UnitalkStoreHub } from '@/components/unitalk-store-hub'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Marketplace IA : Collaborateurs IA, métiers et capacités',
  description: 'La Marketplace réunit Collaborateurs IA, missions, métiers, compétences, connaissances, mémoire, applications, modèles IA, formations et services.',
  alternates: { canonical: '/marketplace' },
  openGraph: { type: 'website', url: 'https://unitalk.ai/marketplace', title: 'Marketplace IA | Unitalk', description: 'Tout ce qui équipe un Collaborateur IA, créé par Unitalk et la communauté.' },
}

export default function MarketplacePage() { return <><Navbar/><UnitalkStoreHub/><SiteFooter/></> }
