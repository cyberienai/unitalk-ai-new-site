import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { AcmePublicProfile } from '@/components/acme/acme-public-profile'
import { getAcmeAiBySlug, ACME_MEMBERS } from '@/lib/acme-demo'

export function generateStaticParams() {
  return ACME_MEMBERS.filter((m) => m.kind === 'ai' && m.slug).map((m) => ({ slug: m.slug! }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const member = getAcmeAiBySlug(slug)
  if (!member) return { title: 'Profil · Démo Unitalk' }
  return {
    title: `${member.name} · ${member.role.fr} chez Acme · Unitalk`,
    description: `Profil public d'${member.name}, Collaborateur IA chez Acme.`,
  }
}

export default async function AcmePublicProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!getAcmeAiBySlug(slug)) notFound()

  return (
    <>
      <Navbar />
      <AcmePublicProfile slug={slug} />
      <SiteFooter />
    </>
  )
}
