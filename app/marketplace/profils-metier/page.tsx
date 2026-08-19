import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { UnitalkStoreHub } from '@/components/unitalk-store-hub'
import { DOMAIN_LABELS, STORE_ITEMS } from '@/lib/store-catalog'

const SITE_URL = 'https://unitalk.ai'
const profiles = STORE_ITEMS.filter((item) => item.type === 'profil')

export const metadata: Metadata = {
  title: 'Profils métier IA pour Collaborateurs IA | Store Unitalk',
  description: `Explorez ${profiles.length} profils métier IA pour équiper un Collaborateur IA : commercial, marketing, support client, finance, RH, opérations et développement.`,
  keywords: ['profil métier IA', 'profils métier intelligence artificielle', 'Collaborateur IA par métier', 'commercial IA', 'assistant IA entreprise'],
  alternates: { canonical: '/marketplace/profils-metier' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/marketplace/profils-metier`,
    title: 'Profils métier IA pour Collaborateurs IA | Unitalk',
    description: 'Ajoutez les savoir-faire d’un métier à votre Collaborateur IA et faites évoluer ses responsabilités avec votre entreprise.',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Profils métier IA dans le Store Unitalk' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Profils métier IA | Store Unitalk',
    description: 'Découvrez les profils métier à ajouter à vos Collaborateurs IA.',
    images: ['/opengraph-image'],
  },
}

export default function JobProfilesMarketplacePage() {
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Profils métier IA Unitalk',
    numberOfItems: profiles.length,
    itemListElement: profiles.map((profile, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: profile.name.fr,
      description: profile.description.fr,
      url: `${SITE_URL}/marketplace/profils-metier#${profile.slug}`,
    })),
  }
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Unitalk', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Marketplace', item: `${SITE_URL}/marketplace` },
      { '@type': 'ListItem', position: 3, name: 'Profils métier IA', item: `${SITE_URL}/marketplace/profils-metier` },
    ],
  }
  const domains = Object.values(DOMAIN_LABELS).map((label) => label.fr).join(', ')

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Navbar />
      <UnitalkStoreHub initialCategoryId="profils-metier" />
      <p className="sr-only">Domaines disponibles : {domains}.</p>
      <SiteFooter />
    </>
  )
}
