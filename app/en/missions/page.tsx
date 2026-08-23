import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Navbar } from '@/components/navbar'
import { MissionsContent } from '@/components/missions-content'
import { SiteFooter } from '@/components/site-footer'
import { MISSIONS } from '@/lib/missions-catalog'

const SITE_URL = 'https://unitalk.ai'

export const metadata: Metadata = {
  title: 'Missions for AI Collaborators',
  description: 'Describe the outcome you need or choose a ready-to-scope mission. Alma tailors your AI Collaborator to your organization.',
  alternates: { canonical: '/en/missions', languages: { fr: '/missions', en: '/en/missions', 'x-default': '/missions' } },
  openGraph: { type: 'website', locale: 'en_GB', alternateLocale: ['fr_FR'], url: `${SITE_URL}/en/missions`, title: 'Missions for AI Collaborators | Unitalk', description: 'Choose real work to entrust to an AI Collaborator.', images: ['/opengraph-image'] },
}

const itemListJsonLd = {
  '@context': 'https://schema.org', '@type': 'ItemList', name: 'Missions for AI Collaborators', inLanguage: 'en', numberOfItems: MISSIONS.length,
  itemListElement: MISSIONS.slice(0, 24).map((mission, index) => ({ '@type': 'ListItem', position: index + 1, url: `${SITE_URL}/en/missions/${mission.slug}`, name: mission.title.en })),
}

export default async function EnglishMissionsPage({ searchParams }: { searchParams: Promise<{ return?: string; categorie?: string; famille?: string; vue?: string; q?: string; composer?: string; collaborateur?: string }> }) {
  const query = await searchParams
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}/><Navbar/><Suspense fallback={<div className="min-h-screen bg-[#F3EFE6]"/>}><MissionsContent returnSlug={query.return} requestedCategory={query.categorie} requestedFamily={query.famille} requestedView={query.vue} requestedQuery={query.q} requestedCollaborator={query.collaborateur} composerRequested={query.composer === '1'}/></Suspense><SiteFooter/></>
}
