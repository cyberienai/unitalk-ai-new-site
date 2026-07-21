import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { AcmeMemberProfile } from '@/components/acme/acme-member-profile'
import { getAcmeMember, getMemberProfile, ACME_MEMBER_PROFILES } from '@/lib/acme-demo'

export function generateStaticParams() {
  return Object.keys(ACME_MEMBER_PROFILES).map((id) => ({ id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const member = getAcmeMember(id)
  if (!member) return { title: 'Profil · Démo Unitalk' }
  return {
    title: `${member.name} · ${member.role.fr} chez Acme · Unitalk`,
    description: `Profil public de ${member.name}, membre d'Acme. Son assistante IA filtre et délègue les demandes.`,
  }
}

export default async function AcmeMemberProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  if (!getAcmeMember(id) || !getMemberProfile(id)) notFound()

  return (
    <>
      <Navbar />
      <AcmeMemberProfile id={id} />
      <SiteFooter />
    </>
  )
}
