import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Navbar } from '@/components/navbar'
import { MissionsContent } from '@/components/missions-content'
import { SiteFooter } from '@/components/site-footer'
import { MISSIONS } from '@/lib/missions-catalog'

const SITE_URL = 'https://unitalk.ai'

export const metadata: Metadata = {
  // The root layout applies a `%s | Unitalk` template, so the bare title here
  // renders as "Missions pour Collaborateurs IA | Unitalk" (no duplicate).
  title: 'Missions pour Collaborateurs IA',
  description:
    'Découvrez des missions prêtes à confier à votre Collaborateur IA : prospection, support client, contenu, réunions, automatisation et développement.',
  alternates: { canonical: '/missions' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/missions`,
    title: 'Missions pour Collaborateurs IA | Unitalk',
    description:
      'Découvrez des missions prêtes à confier à votre Collaborateur IA : prospection, support client, contenu, réunions, automatisation et développement.',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Missions pour Collaborateurs IA Unitalk' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Missions pour Collaborateurs IA | Unitalk',
    description: 'Choisissez une mission à personnaliser pour votre entreprise ou décrivez à Alma le travail à accomplir.',
    images: ['/opengraph-image'],
  },
}

// ItemList structured data for the Missions catalog.
const itemListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Missions pour Collaborateurs IA',
  itemListElement: MISSIONS.map((m, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: `${SITE_URL}/missions/${m.slug}`,
    name: m.title.fr,
  })),
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Missions', item: `${SITE_URL}/missions` },
  ],
}

export default async function MissionsPage({
  searchParams,
}: {
  searchParams: Promise<{ return?: string; categorie?: string; famille?: string; vue?: string; q?: string; composer?: string }>
}) {
  const query = await searchParams
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navbar />
      <Suspense fallback={<div className="min-h-screen bg-[var(--store-page)]" />}>
        <MissionsContent
          returnSlug={query.return}
          requestedCategory={query.categorie}
          requestedFamily={query.famille}
          requestedView={query.vue}
          requestedQuery={query.q}
          composerRequested={query.composer === '1'}
        />
      </Suspense>
      <SiteFooter />
    </>
  )
}
