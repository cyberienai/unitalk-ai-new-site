import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { MissionDetailContent } from '@/components/mission-detail-content'
import { SiteFooter } from '@/components/site-footer'
import { MISSIONS, getMission } from '@/lib/missions-catalog'

const SITE_URL = 'https://unitalk.ai'

export function generateStaticParams() { return MISSIONS.map(mission => ({ slug: mission.slug })) }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const mission = getMission(slug)
  if (!mission) return { title: 'Mission | Unitalk' }
  return { title: `${mission.title.en} · AI mission`, description: mission.objective.en, alternates: { canonical: `/en/missions/${slug}`, languages: { fr: `/missions/${slug}`, en: `/en/missions/${slug}`, 'x-default': `/missions/${slug}` } }, openGraph: { type: 'article', locale: 'en_GB', alternateLocale: ['fr_FR'], url: `${SITE_URL}/en/missions/${slug}`, title: `${mission.title.en} · AI mission | Unitalk`, description: mission.objective.en, images: ['/opengraph-image'] } }
}

export default async function EnglishMissionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const mission = getMission(slug)
  if (!mission) notFound()
  const breadcrumb = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', inLanguage: 'en', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Unitalk', item: `${SITE_URL}/en` }, { '@type': 'ListItem', position: 2, name: 'Missions', item: `${SITE_URL}/en/missions` }, { '@type': 'ListItem', position: 3, name: mission.title.en, item: `${SITE_URL}/en/missions/${slug}` }] }
  const service = { '@context': 'https://schema.org', '@type': 'Service', inLanguage: 'en', name: mission.title.en, description: mission.objective.en, url: `${SITE_URL}/en/missions/${slug}`, provider: { '@type': 'Organization', name: 'Unitalk', url: SITE_URL }, serviceType: 'AI Collaborator mission' }
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}/><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }}/><Navbar/><MissionDetailContent slug={slug}/><SiteFooter/></>
}
