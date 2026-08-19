import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { UnitalkStoreHub } from '@/components/unitalk-store-hub'
import { STORE_ITEMS } from '@/lib/store-catalog'

const SITE_URL = 'https://unitalk.ai'
const servers = STORE_ITEMS.filter((item) => item.type === 'server')

export const metadata: Metadata = {
  title: 'Serveurs IA privés pour Collaborateurs IA | Unitalk',
  description: `Découvrez ${servers.length} configurations de serveurs IA privés pour héberger les fichiers, applications et environnements d’exécution de vos Collaborateurs IA.`,
  keywords: ['serveur IA privé', 'hébergement agent IA', 'infrastructure IA entreprise', 'serveur Collaborateur IA'],
  alternates: { canonical: '/marketplace/serveurs-ia' },
  openGraph: { type: 'website', url: `${SITE_URL}/marketplace/serveurs-ia`, title: 'Serveurs privés pour Collaborateurs IA | Unitalk', description: 'Choisissez un environnement privé dimensionné pour le travail de vos Collaborateurs IA.', images: [{ url: '/opengraph-image', width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image', title: 'Serveurs IA | Store Unitalk', description: 'Des environnements privés pour les applications et ressources de vos Collaborateurs IA.', images: ['/opengraph-image'] },
}

export default function AiServersMarketplacePage() {
  const itemList = { '@context': 'https://schema.org', '@type': 'ItemList', name: 'Serveurs IA Unitalk', numberOfItems: servers.length, itemListElement: servers.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name.fr, description: item.description.fr, url: `${SITE_URL}/marketplace/serveurs-ia#${item.slug}` })) }
  const breadcrumb = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Unitalk', item: SITE_URL }, { '@type': 'ListItem', position: 2, name: 'Marketplace', item: `${SITE_URL}/marketplace` }, { '@type': 'ListItem', position: 3, name: 'Serveurs IA', item: `${SITE_URL}/marketplace/serveurs-ia` }] }
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} /><Navbar/><UnitalkStoreHub initialCategoryId="serveurs-ia"/><SiteFooter/></>
}
