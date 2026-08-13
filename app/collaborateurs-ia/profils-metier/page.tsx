import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { ProfilesCatalogContent } from '@/components/collaborateurs-ia/profils/profiles-catalog-content'

const SITE_URL = 'https://unitalk.ai'

export const metadata: Metadata = {
  title: 'Profils métier : responsabilités durables des Collaborateurs IA',
  description:
    'Explorez les responsabilités durables qu’un Collaborateur IA peut exercer sans changer d’identité. Recherchez, filtrez et adaptez les profils métier avec Alma.',
  keywords: [
    'profil métier IA',
    'Collaborateur IA par métier',
    'rôle IA en entreprise',
    'assistant de direction IA',
    'commercial IA',
    'support client IA',
  ],
  alternates: { canonical: '/collaborateurs-ia/profils-metier' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/collaborateurs-ia/profils-metier`,
    title: 'Profils métier pour Collaborateurs IA | Unitalk',
    description:
      'Une identité IA peut exercer plusieurs responsabilités durables, selon ses compétences, ses missions et ses droits.',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', title: 'Profils métier pour Collaborateurs IA | Unitalk', description: 'Ajoutez de nouvelles responsabilités à votre Collaborateur IA sans recréer son identité.' },
}

export default function ProfilsMetierPage() {
  return <><Navbar /><Suspense fallback={<div className="min-h-screen bg-[#F3EFE6]" />}><ProfilesCatalogContent /></Suspense><SiteFooter /></>
}
