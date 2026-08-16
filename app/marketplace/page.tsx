import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { UnitalkStoreHub } from '@/components/unitalk-store-hub'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Marketplace IA : profils, intégrations, applications et serveurs',
  description: 'La Marketplace des Collaborateurs IA réunit profils métier, compétences, intégrations, applications, modèles, serveurs, formations, services et missions.',
  alternates: { canonical: '/marketplace' },
  openGraph: { type: 'website', url: 'https://unitalk.ai/marketplace', title: 'Marketplace IA | Unitalk', description: 'Tout ce qui équipe un Collaborateur IA, créé par Unitalk et la communauté.' },
}

export default function MarketplacePage() { return <><Navbar/><UnitalkStoreHub/><SiteFooter/></> }
