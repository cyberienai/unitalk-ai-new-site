import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { UnitalkStoreHub } from '@/components/unitalk-store-hub'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'L’autonomie se compose | Store Unitalk',
  description: 'Découvrez les Collaborateurs IA Unitalk et faites-les évoluer avec des profils métier, des compétences, des applications, le modèle IA et le serveur adaptés.',
  alternates: { canonical: '/marketplace' },
  openGraph: { type: 'website', url: 'https://unitalk.ai/marketplace', title: 'Faites évoluer votre Collaborateur IA | Unitalk', description: 'Choisissez un Collaborateur IA puis adaptez ses profils métier, ses compétences, ses applications, son modèle et son serveur.' },
}

export default function MarketplacePage() { return <><Navbar/><UnitalkStoreHub/><SiteFooter/></> }
