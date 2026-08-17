import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { UnitalkStoreHub } from '@/components/unitalk-store-hub'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'L’autonomie ne se télécharge pas | Store Unitalk',
  description: 'Composez un agent autonome sans verrou : métier, compétences, applications, modèle IA et serveur souverain dans le Store ouvert Unitalk.',
  alternates: { canonical: '/marketplace' },
  openGraph: { type: 'website', url: 'https://unitalk.ai/marketplace', title: 'L’autonomie ne se télécharge pas | Unitalk', description: 'Cinq décisions pour composer un agent autonome. Aucun verrou.' },
}

export default function MarketplacePage() { return <><Navbar/><UnitalkStoreHub/><SiteFooter/></> }
