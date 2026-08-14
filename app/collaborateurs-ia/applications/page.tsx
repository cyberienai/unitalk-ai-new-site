import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { UnitalkStoreHub } from '@/components/unitalk-store-hub'
import { SiteFooter } from '@/components/site-footer'

const SITE_URL = 'https://unitalk.ai'

export const metadata: Metadata = {
  title: 'Unitalk Store : profils, compétences, applications, modèles et formations',
  description:
    'Le Store central de votre équipe humain-IA : profils métier, compétences, applications, modèles, missions et formations recommandés par Alma.',
  alternates: { canonical: '/collaborateurs-ia/applications' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/collaborateurs-ia/applications`,
    title: 'Unitalk Store | Unitalk',
    description:
      'Tout ce qui équipe votre équipe humain-IA, recommandé et assemblé avec Alma.',
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
