import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { UnitalkStoreHub } from '@/components/unitalk-store-hub'
import { STORE_ITEMS } from '@/lib/store-catalog'

const SITE_URL = 'https://unitalk.ai'
const applications = STORE_ITEMS.filter((item) => item.type === 'application' || item.type === 'integration')

export const metadata: Metadata = {
  title: 'Applications et intégrations pour Collaborateurs IA',
  description: `Découvrez ${applications.length} applications et intégrations pour connecter vos Collaborateurs IA à leurs outils métier avec des accès gouvernés.`,
  keywords: ['applications IA', 'intégrations agent IA', 'connecteurs IA entreprise', 'outils Collaborateur IA'],
  alternates: { canonical: '/marketplace/applications' },
  openGraph: { type: 'website', url: `${SITE_URL}/marketplace/applications`, title: 'Applications pour Collaborateurs IA | Unitalk', description: 'Connectez les outils nécessaires et choisissez les actions autorisées.', images: [{ url: '/opengraph-image', width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image', title: 'Applications IA | Store Unitalk', description: 'Les outils et connecteurs autorisés de vos Collaborateurs IA.', images: ['/opengraph-image'] },
}

export default function ApplicationsMarketplacePage() {
  const itemList = { '@context': 'https://schema.org', '@type': 'ItemList', name: 'Applications et intégrations Unitalk', numberOfItems: applications.length, itemListElement: applications.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name.fr, description: item.description.fr, url: `${SITE_URL}/marketplace/applications#${item.slug}` })) }
  const breadcrumb = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Unitalk', item: SITE_URL }, { '@type': 'ListItem', position: 2, name: 'Marketplace', item: `${SITE_URL}/marketplace` }, { '@type': 'ListItem', position: 3, name: 'Applications', item: `${SITE_URL}/marketplace/applications` }] }
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} /><Navbar/><UnitalkStoreHub initialCategoryId="applications"/><SiteFooter/></>
}
