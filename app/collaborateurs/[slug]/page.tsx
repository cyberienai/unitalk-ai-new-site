import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { CollaborateurContent } from '@/components/collaborateur-content'
import { getCollaboratorPage, COLLABORATOR_PAGE_SLUGS } from '@/lib/collaborator-pages'

const SITE_URL = 'https://unitalk.ai'

export function generateStaticParams() {
  return COLLABORATOR_PAGE_SLUGS.filter((slug) => slug !== 'hugo').map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  if (slug === 'hugo') return { title: 'Page introuvable', robots: { index: false, follow: false } }
  const page = getCollaboratorPage(slug)
  if (!page) return { title: 'Collaborateur IA' }

  const { detail, copy } = page
  const role = detail.roleInline ? `${detail.role.fr} ${detail.manager.name}` : detail.role.fr
  const title = `${detail.name} — ${role}`
  const description = copy.body.fr

  return {
    // Root layout applies a `%s | Unitalk` template.
    title,
    description,
    alternates: { canonical: `/collaborateurs/${slug}` },
    openGraph: {
      type: 'profile',
      url: `${SITE_URL}/collaborateurs/${slug}`,
      title: `${title} | Unitalk`,
      description,
      images: detail.avatar ? [{ url: detail.avatar }] : undefined,
    },
  }
}

export default async function CollaborateurPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ equipment?: string }>
}) {
  const { slug } = await params
  if (slug === 'hugo') notFound()
  const query = await searchParams
  const page = getCollaboratorPage(slug)
  if (!page) notFound()

  const { detail, copy } = page
  const role = detail.roleInline ? `${detail.role.fr} ${detail.manager.name}` : detail.role.fr

  // Person structured data — the incarnated Collaborateur IA.
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: detail.name,
    jobTitle: role,
    description: copy.body.fr,
    image: detail.avatar ? `${SITE_URL}${detail.avatar}` : undefined,
    worksFor: { '@type': 'Organization', name: detail.company },
    knowsAbout: detail.skills.map((s) => s.fr),
    url: `${SITE_URL}/collaborateurs/${slug}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Navbar />
      <CollaborateurContent page={page} equipmentId={query.equipment} />
      <SiteFooter />
    </>
  )
}
