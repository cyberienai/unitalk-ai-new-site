import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Navbar } from '@/components/navbar'
import { StoreContent } from '@/components/store-content'
import { SiteFooter } from '@/components/site-footer'

const SITE_URL = 'https://unitalk.ai'

export const metadata: Metadata = {
  title: 'Profils métier pour votre Collaborateur IA',
  description:
    'Les rôles durables qu’un Collaborateur IA peut exercer : conseiller relation client, assistant de direction, commercial et bien d’autres, préparés avec Alma.',
  alternates: { canonical: '/collaborateurs-ia/profils-metier' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/collaborateurs-ia/profils-metier`,
    title: 'Profils métier pour votre Collaborateur IA | Unitalk',
    description:
      'Les rôles durables qu’un Collaborateur IA peut exercer, préparés avec Alma.',
  },
}

export default function ProfilsMetierPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div className="min-h-screen bg-[var(--store-page)]" />}>
        <StoreContent initialType="profil" />
      </Suspense>
      <SiteFooter />
    </>
  )
}
