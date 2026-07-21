import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { TeamProfile } from '@/components/team-profile'
import { SiteFooter } from '@/components/site-footer'
import { ROLE_DETAILS, DETAILED_SLUGS } from '@/lib/collaborators-catalog'

// Public handle route for Unitalk AI Collaborators: unitalk.ai/@emma
export function generateStaticParams() {
  return DETAILED_SLUGS.map((slug) => ({ handle: `@${slug}` }))
}

function slugFromHandle(handle: string): string | null {
  const decoded = decodeURIComponent(handle)
  if (!decoded.startsWith('@')) return null
  return decoded.slice(1)
}

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params
  const slug = slugFromHandle(handle)
  const role = slug ? ROLE_DETAILS[slug] : undefined
  if (!role) return { title: 'Collaborateur IA · Unitalk' }
  return {
    title: `${role.name} · ${role.role.fr} · Unitalk`,
    description: role.description.fr,
  }
}

export default async function HandleProfilePage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params
  const slug = slugFromHandle(handle)
  if (!slug || !ROLE_DETAILS[slug]) notFound()

  return (
    <>
      <Navbar />
      <TeamProfile slug={slug} />
      <SiteFooter />
    </>
  )
}
