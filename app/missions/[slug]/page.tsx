import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { MissionDetailContent } from '@/components/mission-detail-content'
import { SiteFooter } from '@/components/site-footer'
import { MISSIONS, getMission } from '@/lib/missions-catalog'

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
    title: `${mission.title.fr} · Missions · Unitalk`,
    description: mission.objective.fr,
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

  return (
    <>
      <Navbar />
      <MissionDetailContent slug={slug} />
      <SiteFooter />
    </>
  )
}
