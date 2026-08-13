import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { MissionGuideContent } from '@/components/mission-guide-content'
import { MISSIONS, getMission } from '@/lib/missions-catalog'

const SITE_URL = 'https://unitalk.ai'

export function generateStaticParams() {
  return MISSIONS.filter((mission) => !mission.article).map((mission) => ({ slug: mission.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const mission = getMission(slug)
  if (!mission || mission.article) return { title: 'Guide de mission' }
  const title = `Comment ${mission.title.fr.toLocaleLowerCase('fr')} avec un Collaborateur IA`
  const description = `${mission.result.fr} Découvrez comment cadrer, réaliser et valider cette mission avec un Collaborateur IA.`
  const canonical = `/guides/missions/${mission.slug}`
  return {
    title,
    description,
    alternates: { canonical },
    robots: { index: false, follow: true },
    openGraph: { title, description, url: `${SITE_URL}${canonical}`, type: 'article' },
  }
}

export default async function MissionGuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const mission = getMission(slug)
  if (!mission || mission.article) notFound()
  const canonical = `${SITE_URL}/guides/missions/${mission.slug}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `Comment ${mission.title.fr.toLocaleLowerCase('fr')} avec un Collaborateur IA`,
    description: mission.result.fr,
    url: canonical,
    inLanguage: 'fr-FR',
    step: mission.steps.map((step, index) => ({ '@type': 'HowToStep', position: index + 1, text: step.fr })),
  }
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /><Navbar /><MissionGuideContent mission={mission} /><SiteFooter /></>
}
