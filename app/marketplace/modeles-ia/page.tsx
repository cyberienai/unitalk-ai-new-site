import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { UnitalkStoreHub } from '@/components/unitalk-store-hub'

const SITE_URL = 'https://unitalk.ai'
const models = [
  ['GPT', 'OpenAI'], ['Claude', 'Anthropic'], ['Gemini', 'Google'], ['Mistral', 'Mistral AI'], ['DeepSeek', 'DeepSeek'], ['Llama', 'Meta'],
] as const

export const metadata: Metadata = {
  title: 'Modèles IA pour Collaborateurs IA | Store Unitalk',
  description: 'Découvrez les modèles IA auxquels vos Collaborateurs ont accès. Unitalk sélectionne automatiquement le modèle adapté à chaque mission selon vos règles.',
  keywords: ['modèles IA', 'GPT Claude Gemini Mistral', 'modèle pour agent IA', 'AI Gateway entreprise'],
  alternates: { canonical: '/marketplace/modeles-ia' },
  openGraph: { type: 'website', url: `${SITE_URL}/marketplace/modeles-ia`, title: 'Modèles accessibles aux Collaborateurs IA | Unitalk', description: 'Voyez et contrôlez les modèles disponibles. Unitalk route chaque tâche vers une intelligence adaptée.', images: [{ url: '/opengraph-image', width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image', title: 'Modèles IA | Store Unitalk', description: 'Comparez les familles de modèles disponibles pour vos Collaborateurs IA.', images: ['/opengraph-image'] },
}

export default function AiModelsMarketplacePage() {
  const itemList = { '@context': 'https://schema.org', '@type': 'ItemList', name: 'Modèles IA disponibles dans Unitalk', numberOfItems: models.length, itemListElement: models.map(([name, maker], index) => ({ '@type': 'ListItem', position: index + 1, name, description: `Famille de modèles IA ${maker}`, url: `${SITE_URL}/marketplace/modeles-ia#${name.toLowerCase()}` })) }
  const breadcrumb = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Unitalk', item: SITE_URL }, { '@type': 'ListItem', position: 2, name: 'Marketplace', item: `${SITE_URL}/marketplace` }, { '@type': 'ListItem', position: 3, name: 'Modèles IA', item: `${SITE_URL}/marketplace/modeles-ia` }] }
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} /><Navbar/><UnitalkStoreHub initialCategoryId="modeles-ia"/><SiteFooter/></>
}
