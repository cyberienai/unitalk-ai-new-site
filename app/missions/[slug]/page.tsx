import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { MissionDetailContent } from '@/components/mission-detail-content'
import { SiteFooter } from '@/components/site-footer'
import { MISSIONS, getMission, getMissionCategory, getMissionCategoryHref } from '@/lib/missions-catalog'

const SITE_URL = 'https://unitalk.ai'

export function generateStaticParams() {
  return MISSIONS.map((m) => ({ slug: m.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const mission = getMission(slug)
  if (!mission) return { title: 'Mission · Unitalk' }
  return {
    title: `${mission.title.fr} · Mission IA`,
    description: mission.objective.fr,
    alternates: { canonical: `/missions/${slug}`, languages: { fr: `/missions/${slug}`, en: `/en/missions/${slug}`, 'x-default': `/missions/${slug}` } },
    openGraph: {
      type: 'article',
      url: `${SITE_URL}/missions/${slug}`,
      title: `${mission.title.fr} · Mission IA | Unitalk`,
      description: mission.objective.fr,
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: `${mission.title.fr} · Unitalk` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${mission.title.fr} · Mission IA | Unitalk`,
      description: mission.objective.fr,
      images: ['/opengraph-image'],
    },
  }
}

export default async function MissionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const mission = getMission(slug)
  if (!mission) notFound()
  const category = getMissionCategory(mission.category)

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Missions', item: `${SITE_URL}/missions` },
      ...(category ? [{ '@type': 'ListItem', position: 3, name: category.label.fr, item: `${SITE_URL}${getMissionCategoryHref(category)}` }] : []),
      { '@type': 'ListItem', position: category ? 4 : 3, name: mission.title.fr, item: `${SITE_URL}/missions/${slug}` },
    ],
  }
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: mission.title.fr,
    description: mission.objective.fr,
    url: `${SITE_URL}/missions/${slug}`,
    provider: { '@type': 'Organization', name: 'Unitalk', url: SITE_URL },
    areaServed: mission.zones.includes('france') ? 'France' : undefined,
    serviceType: 'Mission pour Collaborateur IA',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <Navbar />
      <MissionDetailContent slug={slug} />
      <SiteFooter />
    </>
  )
}
