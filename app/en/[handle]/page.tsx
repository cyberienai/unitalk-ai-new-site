import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { ROLE_DETAILS, DETAILED_SLUGS } from '@/lib/collaborators-catalog'
import { CollaborateurContent } from '@/components/collaborateur-content'
import { getCollaboratorPage } from '@/lib/collaborator-pages'

const SITE_URL = 'https://unitalk.ai'
export function generateStaticParams() { return DETAILED_SLUGS.map(slug => ({ handle: `@${slug}` })) }
function slugFromHandle(handle: string) { const decoded = decodeURIComponent(handle); return decoded.startsWith('@') ? decoded.slice(1) : null }

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const slug = slugFromHandle((await params).handle)
  const role = slug ? ROLE_DETAILS[slug] : undefined
  if (!role) return { title: 'AI Collaborator · Unitalk' }
  const page = getCollaboratorPage(slug!)
  const title = `${role.name} — ${role.role.en}`
  const description = page?.copy.body.en ?? role.description.en
  return { title, description, alternates: { canonical: `/en/@${slug}`, languages: { fr: `/@${slug}`, en: `/en/@${slug}`, 'x-default': `/@${slug}` } }, openGraph: { type: 'profile', locale: 'en_GB', alternateLocale: ['fr_FR'], url: `${SITE_URL}/en/@${slug}`, title, description, images: [{ url: role.avatar }] } }
}

export default async function EnglishCollaboratorPage({ params }: { params: Promise<{ handle: string }> }) {
  const slug = slugFromHandle((await params).handle)
  const detail = slug ? ROLE_DETAILS[slug] : undefined
  const page = slug ? getCollaboratorPage(slug) : undefined
  if (!detail || !page) notFound()
  const jsonLd = { '@context': 'https://schema.org', '@type': 'SoftwareApplication', applicationCategory: 'BusinessApplication', name: `${detail.name}, AI Collaborator`, operatingSystem: 'Web', inLanguage: 'en', description: page.copy.body.en, image: `${SITE_URL}${detail.avatar}`, provider: { '@type': 'Organization', name: detail.company }, featureList: detail.skills.map(skill => skill.en), url: `${SITE_URL}/en/@${slug}` }
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}/><Navbar/><CollaborateurContent page={page}/><SiteFooter/></>
}
