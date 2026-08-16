import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { UnitalkStoreHub } from '@/components/unitalk-store-hub'
import { SiteFooter } from '@/components/site-footer'

const SITE_URL = 'https://unitalk.ai'

export const metadata: Metadata = {
  title: 'Marketplace IA : Collaborateurs IA et créations de la communauté',
  description:
    'La Marketplace des Collaborateurs IA : profils métier, compétences, applications, modèles, formations, services et missions créés par Unitalk et la communauté.',
  alternates: { canonical: '/collaborateurs-ia/applications' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/collaborateurs-ia/applications`,
    title: 'Marketplace IA | Unitalk',
    description:
      'Trouvez, adoptez et enrichissez des Collaborateurs IA conçus par Unitalk et la communauté.',
  },
}

export default function ApplicationsPage() {
  return (
    <>
      <Navbar />
      <UnitalkStoreHub />
      <SiteFooter />
    </>
  )
}
