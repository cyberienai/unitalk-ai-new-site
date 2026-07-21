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

  const title = `${role.name}, Collaborateur IA · ${role.company}`
  const owner = role.dataOwner ?? role.company
  const description = `${role.name}, Collaborateur IA chez ${role.company}. Responsable : ${role.manager.name} (${role.manager.role.fr}). Propriétaire des données : ${owner}.`

  return {
    title,
    description,
    keywords: [role.name, 'Collaborateur IA', 'Unitalk', role.company, role.manager.name, owner],
    openGraph: {
      title,
      description,
      type: 'profile',
      images: [{ url: role.avatar }],
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
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
