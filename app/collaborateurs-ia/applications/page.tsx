import type { Metadata } from 'next'
import { Suspense } from 'react'
import { redirect } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { StoreContent } from '@/components/store-content'
import { SiteFooter } from '@/components/site-footer'

const SITE_URL = 'https://unitalk.ai'

export const metadata: Metadata = {
  title: 'Applications pour votre Collaborateur IA',
  description:
    'Les outils dans lesquels un Collaborateur IA travaille avec les autorisations que vous accordez : CRM, agenda, messagerie et bien d’autres.',
  alternates: { canonical: '/collaborateurs-ia/applications' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/collaborateurs-ia/applications`,
    title: 'Applications pour votre Collaborateur IA | Unitalk',
    description:
      'Les outils dans lesquels un Collaborateur IA travaille avec les autorisations accordées.',
  },
}

export default async function ApplicationsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams
  if (params.type !== undefined) {
    const normalized = new URLSearchParams()
    for (const [key, raw] of Object.entries(params)) {
      if (key === 'type' || raw === undefined) continue
      const value = Array.isArray(raw) ? raw[0] : raw
      if (value) normalized.set(key, value)
    }
    redirect(`/collaborateurs-ia/applications${normalized.size ? `?${normalized}` : ''}`)
  }

  return (
    <>
      <Navbar />
      <Suspense fallback={<div className="min-h-screen bg-[var(--store-page)]" />}>
        <StoreContent initialType="application" />
      </Suspense>
      <SiteFooter />
    </>
  )
}
