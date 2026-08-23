import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Navbar } from '@/components/navbar'
import { MissionsContent } from '@/components/missions-content'
import { SiteFooter } from '@/components/site-footer'
import { MISSIONS } from '@/lib/missions-catalog'
import { missionsFaqJsonLd } from '@/lib/missions-page-faq'

const SITE_URL = 'https://unitalk.ai'

export const metadata: Metadata = {
  // The root layout applies a `%s | Unitalk` template, so the bare title here
  // appends "| Unitalk" to this title without duplicating the brand.
  title: 'Plus de 200 modèles de missions prêts à personnaliser',
  description:
    'Explorez plus de 200 missions IA pour la vente, le support, le marketing, la finance et les opérations. Alma adapte chaque mission à votre entreprise.',
  keywords: ['missions IA', 'Collaborateur IA', 'agent IA entreprise', 'automatisation entreprise', 'assistant IA professionnel'],
  alternates: { canonical: '/missions', languages: { fr: '/missions', en: '/en/missions', 'x-default': '/missions' } },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Unitalk',
    url: `${SITE_URL}/missions`,
    title: 'Plus de 200 modèles de missions prêts à personnaliser | Unitalk',
    description:
      'Explorez plus de 200 missions IA et confiez un résultat concret à un Collaborateur IA adapté à votre entreprise.',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Missions pour Collaborateurs IA Unitalk' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Plus de 200 modèles de missions prêts à personnaliser | Unitalk',
    description: 'Plus de 200 missions IA pour la vente, le support, le marketing, la finance et les opérations.',
    images: [{ url: '/opengraph-image', alt: 'Missions pour Collaborateurs IA Unitalk' }],
  },
}

// ItemList structured data for the Missions catalog.
const itemListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Missions pour Collaborateurs IA',
  numberOfItems: MISSIONS.length,
  itemListElement: MISSIONS.slice(0, 24).map((m, i) => ({
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
  searchParams: Promise<{ return?: string; categorie?: string; famille?: string; vue?: string; q?: string; composer?: string; collaborateur?: string }>
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(missionsFaqJsonLd('fr')) }}
      />
      <a href="#missions-top" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-3 focus:font-bold focus:text-[#1C1A17]">Aller au contenu principal</a>
      <Navbar />
      <Suspense fallback={<div className="min-h-screen bg-[var(--store-page)]" />}>
        <MissionsContent
          returnSlug={query.return}
          requestedCategory={query.categorie}
          requestedFamily={query.famille}
          requestedView={query.vue}
          requestedQuery={query.q}
          requestedCollaborator={query.collaborateur}
          composerRequested={query.composer === '1'}
        />
      </Suspense>
      <SiteFooter />
    </>
  )
}
