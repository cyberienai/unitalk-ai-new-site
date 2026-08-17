import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { UnitalkStoreHub } from '@/components/unitalk-store-hub'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'L’autonomie se compose | Store Unitalk',
  description: 'Composez un agent autonome sans verrou : métier, compétences, applications, modèle IA et serveur souverain dans le Store ouvert Unitalk.',
  alternates: { canonical: '/marketplace' },
  openGraph: { type: 'website', url: 'https://unitalk.ai/marketplace', title: 'L’autonomie se compose | Unitalk', description: 'Cinq pièces pour composer un agent autonome qui reste à vous.' },
}

export default function MarketplacePage() { return <><Navbar/><UnitalkStoreHub/><SiteFooter/></> }
