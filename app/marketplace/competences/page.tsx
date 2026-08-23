import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { UnitalkStoreHub } from '@/components/unitalk-store-hub'
import { STORE_ITEMS } from '@/lib/store-catalog'

const SITE_URL = 'https://unitalk.ai'
const skills = STORE_ITEMS.filter((item) => item.type === 'competence')

export const metadata: Metadata = {
  title: 'Compétences IA réutilisables',
  description: `Explorez ${skills.length} compétences IA documentées à ajouter à vos Collaborateurs IA : méthodes, contexte d’application, résultats attendus et validations humaines.`,
  keywords: ['compétence IA', 'compétences pour agent IA', 'méthode IA entreprise', 'Collaborateur IA compétences'],
  alternates: { canonical: '/marketplace/competences' },
  openGraph: { type: 'website', url: `${SITE_URL}/marketplace/competences`, title: 'Compétences pour Collaborateurs IA | Unitalk', description: 'Ajoutez un savoir-faire précis et réutilisable à vos Collaborateurs IA.', images: [{ url: '/opengraph-image', width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image', title: 'Compétences IA | Store Unitalk', description: 'Des méthodes documentées et réutilisables pour vos Collaborateurs IA.', images: ['/opengraph-image'] },
}

export default function SkillsMarketplacePage() {
  return <StoreCategoryPage categoryId="competences" name="Compétences IA Unitalk" items={skills} />
}

function StoreCategoryPage({ categoryId, name, items }: { categoryId: string; name: string; items: typeof skills }) {
  const itemList = { '@context': 'https://schema.org', '@type': 'ItemList', name, numberOfItems: items.length, itemListElement: items.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name.fr, description: item.description.fr, url: `${SITE_URL}/marketplace/${categoryId}#${item.slug}` })) }
  const breadcrumb = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Unitalk', item: SITE_URL }, { '@type': 'ListItem', position: 2, name: 'Marketplace', item: `${SITE_URL}/marketplace` }, { '@type': 'ListItem', position: 3, name, item: `${SITE_URL}/marketplace/${categoryId}` }] }
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} /><Navbar/><UnitalkStoreHub initialCategoryId={categoryId}/><SiteFooter/></>
}
