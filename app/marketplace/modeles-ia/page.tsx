import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { UnitalkStoreHub } from '@/components/unitalk-store-hub'
import { AI_MODELS } from '@/lib/ai-models-catalog'

const SITE_URL = 'https://unitalk.ai'
export const metadata: Metadata = {
  title: 'Modèles IA pour Collaborateurs IA',
  description: 'Explorez les modèles IA référencés, leurs capacités et leur statut. Votre entreprise autorise les fournisseurs et modèles utilisables par mission.',
  keywords: ['modèles IA', 'GPT Claude Gemini Mistral', 'modèle pour agent IA', 'AI Gateway entreprise'],
  alternates: { canonical: '/marketplace/modeles-ia' },
  openGraph: { type: 'website', url: `${SITE_URL}/marketplace/modeles-ia`, title: 'Modèles accessibles aux Collaborateurs IA | Unitalk', description: 'Voyez et contrôlez les modèles disponibles. Unitalk route chaque tâche vers une intelligence adaptée.', images: [{ url: '/opengraph-image', width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image', title: 'Modèles IA | Store Unitalk', description: 'Comparez les familles de modèles disponibles pour vos Collaborateurs IA.', images: ['/opengraph-image'] },
}

export default function AiModelsMarketplacePage() {
  const itemList = { '@context': 'https://schema.org', '@type': 'ItemList', name: 'Modèles IA référencés par Unitalk', numberOfItems: AI_MODELS.length, itemListElement: AI_MODELS.slice(0, 24).map((model, index) => ({ '@type': 'ListItem', position: index + 1, name: model.title, description: model.description.fr, url: `${SITE_URL}/marketplace/modeles-ia#${model.key}` })) }
  const breadcrumb = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Unitalk', item: SITE_URL }, { '@type': 'ListItem', position: 2, name: 'Marketplace', item: `${SITE_URL}/marketplace` }, { '@type': 'ListItem', position: 3, name: 'Modèles IA', item: `${SITE_URL}/marketplace/modeles-ia` }] }
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} /><Navbar/><UnitalkStoreHub initialCategoryId="modeles-ia"/><SiteFooter/></>
}
