import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { AcmeWorkspace } from '@/components/acme/acme-workspace'
import { getAcmeAiBySlug, ACME_WORKSPACES, ACME_MEMBERS } from '@/lib/acme-demo'

export function generateStaticParams() {
  return ACME_MEMBERS.filter((m) => m.kind === 'ai' && m.slug && ACME_WORKSPACES[m.slug!]).map((m) => ({ slug: m.slug! }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const member = getAcmeAiBySlug(slug)
  if (!member) return { title: 'Espace équipe · Démo Unitalk' }
  return {
    title: `${member.name} — vue interne · Acme · Unitalk`,
    description: `Espace équipe d'${member.name} chez Acme : outils connectés, collègues et activité.`,
  }
}

export default async function AcmeWorkspacePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!getAcmeAiBySlug(slug) || !ACME_WORKSPACES[slug]) notFound()

  return (
    <>
      <Navbar />
      <AcmeWorkspace slug={slug} />
      <SiteFooter />
    </>
  )
}
