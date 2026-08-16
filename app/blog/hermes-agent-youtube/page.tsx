import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { HermesCreatorsContent } from '@/components/hermes-creators-content'
import { HERMES_CREATORS } from '@/lib/hermes-creators'

export const metadata: Metadata = {
  title: '10 créateurs YouTube pour comprendre Hermes Agent',
  description: 'Une sélection éditoriale indépendante de tutoriels, cours, démonstrations et entretiens consacrés à Hermes Agent.',
  alternates: { canonical: '/blog/hermes-agent-youtube' },
  openGraph: { type: 'article', url: 'https://unitalk.ai/blog/hermes-agent-youtube', title: '10 créateurs YouTube pour comprendre Hermes Agent | Unitalk', description: 'Tutoriels, cours et retours d’expérience vérifiés autour de Hermes Agent.' },
}

export default async function HermesAgentYoutubePage({ searchParams }: { searchParams: Promise<{ createur?: string }> }) {
  const { createur } = await searchParams
  const itemList = { '@context': 'https://schema.org', '@type': 'ItemList', numberOfItems: HERMES_CREATORS.length, itemListElement: HERMES_CREATORS.map((creator, index) => ({ '@type': 'ListItem', position: index + 1, name: creator.name, url: creator.videoUrl })) }
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} /><Navbar/><HermesCreatorsContent initialAffiliateCode={createur}/><SiteFooter/></>
}
