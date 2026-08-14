import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { ProfilesCatalogContent } from '@/components/collaborateurs-ia/profils/profiles-catalog-content'

const SITE_URL = 'https://unitalk.ai'

export const metadata: Metadata = {
  title: 'Profils métier IA : trouvez le bon Collaborateur IA',
  description:
    'Explorez 29 profils métier IA prêts à adapter : commercial, support client, direction, marketing, finance, RH et opérations. Alma vous aide à choisir.',
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
    title: '29 profils métier pour Collaborateurs IA | Unitalk',
    description:
      'Trouvez une responsabilité prête à adapter et confiez une première mission au bon Collaborateur IA.',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', title: 'Profils métier pour Collaborateurs IA | Unitalk', description: 'Ajoutez de nouvelles responsabilités à votre Collaborateur IA sans recréer son identité.' },
}

export default function ProfilsMetierPage() {
  return <><Navbar /><Suspense fallback={<div className="min-h-screen bg-[#F3EFE6]" />}><ProfilesCatalogContent /></Suspense><SiteFooter /></>
}
