import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
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
    title: `${member.name}, ${member.role.fr} chez Acme`,
    description: `Découvrez le profil public d'${member.name}, Collaboratrice IA et ${member.role.fr} chez Acme.`,
    alternates: { canonical: `/team/${slug}/profil` },
    openGraph: { type: 'profile', title: `${member.name}, ${member.role.fr} chez Acme | Unitalk`, description: `Profil public de ${member.name}, Collaboratrice IA chez Acme.`, images: member.avatar ? [{ url: member.avatar }] : undefined },
  }
}

export default async function AcmePublicProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!getAcmeAiBySlug(slug)) notFound()

  return (
    <>
      <AcmePublicProfile slug={slug} />
    </>
  )
}
