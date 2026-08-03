import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { MissionsContent } from '@/components/missions-content'
import { SiteFooter } from '@/components/site-footer'
import { MISSIONS } from '@/lib/missions-catalog'

const SITE_URL = 'https://unitalk.ai'

export const metadata: Metadata = {
  title: 'Missions pour Collaborateurs IA | Unitalk',
  description:
    'Découvrez des Missions prêtes à confier à votre Collaborateur IA : prospection, support client, contenu, réunions, automatisation et développement.',
  alternates: { canonical: '/missions' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/missions`,
    title: 'Missions pour Collaborateurs IA | Unitalk',
    description:
      'Découvrez des Missions prêtes à confier à votre Collaborateur IA : prospection, support client, contenu, réunions, automatisation et développement.',
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

export default function MissionsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <Navbar />
      <MissionsContent />
      <SiteFooter />
    </>
  )
}
