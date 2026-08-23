import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { TeamProfile } from '@/components/team-profile'
import { HumanProfile } from '@/components/human-profile'
import { SiteFooter } from '@/components/site-footer'
import { ROLE_DETAILS, DETAILED_SLUGS, TEAM_HUMANS, HUMAN_HANDLES } from '@/lib/collaborators-catalog'
import { CollaborateurContent } from '@/components/collaborateur-content'
import { getCollaboratorPage } from '@/lib/collaborator-pages'

const SITE_URL = 'https://unitalk.ai'

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

  const page = getCollaboratorPage(slug)
  const title = page ? `${role.name} — ${role.role.fr}` : `${role.name}, Collaborateur IA · ${role.company}`
  const owner = role.dataOwner ?? role.company
  const description = page?.copy.body.fr ?? `${role.name}, Collaborateur IA chez ${role.company}. Responsable : ${role.manager.name} (${role.manager.role.fr}). Propriétaire des données : ${owner}.`

  return {
    title,
    description,
    alternates: { canonical: `/@${slug}`, languages: { fr: `/@${slug}`, en: `/en/@${slug}`, 'x-default': `/@${slug}` } },
    keywords: [role.name, 'Collaborateur IA', 'Unitalk', role.company, role.manager.name, owner],
    openGraph: {
      title,
      description,
      type: 'profile',
      url: `${SITE_URL}/@${slug}`,
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

  const detail = ROLE_DETAILS[slug]
  if (detail) {
    const page = getCollaboratorPage(slug)
    const personJsonLd = page ? {
      '@context': 'https://schema.org', '@type': 'SoftwareApplication', applicationCategory: 'BusinessApplication', name: `${detail.name}, Collaborateur IA`,
      alternateName: detail.name, operatingSystem: 'Web',
      description: page.copy.body.fr, image: `${SITE_URL}${detail.avatar}`,
      provider: { '@type': 'Organization', name: detail.company },
      featureList: detail.skills.map(skill => skill.fr), url: `${SITE_URL}/@${slug}`,
    } : null
    return (
      <>
        {personJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />}
        <Navbar />
        {page ? <CollaborateurContent page={page} /> : <TeamProfile slug={slug} />}
        <SiteFooter />
      </>
    )
  }

  notFound()
}
