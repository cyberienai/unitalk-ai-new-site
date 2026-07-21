import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { TeamProfile } from '@/components/team-profile'
import { SiteFooter } from '@/components/site-footer'
import { ROLE_DETAILS, DETAILED_SLUGS } from '@/lib/collaborators-catalog'

export function generateStaticParams() {
  return DETAILED_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const role = ROLE_DETAILS[slug]
  if (!role) return { title: 'Collaborateur IA · Unitalk' }
  return {
    title: `${role.name} · ${role.role.fr} · Unitalk`,
    description: role.description.fr,
  }
}

export default async function TeamProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!ROLE_DETAILS[slug]) notFound()

  return (
    <>
      <Navbar />
      <TeamProfile slug={slug} />
      <SiteFooter />
    </>
  )
}
