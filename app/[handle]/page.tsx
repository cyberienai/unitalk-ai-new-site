import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { TeamProfile } from '@/components/team-profile'
import { HumanProfile } from '@/components/human-profile'
import { SiteFooter } from '@/components/site-footer'
import { ROLE_DETAILS, DETAILED_SLUGS, TEAM_HUMANS, HUMAN_HANDLES } from '@/lib/collaborators-catalog'

// Public handle route for Unitalk people and AI Collaborators: unitalk.ai/@emma, unitalk.ai/@patrickchassany
export function generateStaticParams() {
  return [...DETAILED_SLUGS, ...HUMAN_HANDLES].map((slug) => ({ handle: `@${slug}` }))
}

function slugFromHandle(handle: string): string | null {
  const decoded = decodeURIComponent(handle)
  if (!decoded.startsWith('@')) return null
  return decoded.slice(1)
}

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params
  const slug = slugFromHandle(handle)
  if (!slug) return { title: 'Unitalk' }

  const human = TEAM_HUMANS[slug]
  if (human) {
    const title = `${human.name}, ${human.role.fr} · Unitalk`
    const description = `${human.name}, ${human.role.fr} chez Unitalk. En binôme avec ${ROLE_DETAILS[human.pairSlug]?.name ?? 'son Collaborateur IA'}.`
    return {
      title,
      description,
      keywords: [human.name, human.role.fr, 'Unitalk', 'équipe'],
      openGraph: { title, description, type: 'profile', images: [{ url: human.avatar }] },
      twitter: { card: 'summary', title, description },
    }
  }

  const role = ROLE_DETAILS[slug]
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
  if (!slug) notFound()

  if (TEAM_HUMANS[slug]) {
    return (
      <>
        <Navbar />
        <HumanProfile handle={slug} />
        <SiteFooter />
      </>
    )
  }

  if (ROLE_DETAILS[slug]) {
    return (
      <>
        <Navbar />
        <TeamProfile slug={slug} />
        <SiteFooter />
      </>
    )
  }

  notFound()
}
