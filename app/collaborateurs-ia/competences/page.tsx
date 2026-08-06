import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Navbar } from '@/components/navbar'
import { StoreContent } from '@/components/store-content'
import { SiteFooter } from '@/components/site-footer'

const SITE_URL = 'https://unitalk.ai'

export const metadata: Metadata = {
  title: 'Compétences pour votre Collaborateur IA',
  description:
    'Les capacités qu’un Collaborateur IA développe au fil de ses missions : préparées, testées, validées selon les règles de votre entreprise, puis conservées.',
  alternates: { canonical: '/collaborateurs-ia/competences' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/collaborateurs-ia/competences`,
    title: 'Compétences pour votre Collaborateur IA | Unitalk',
    description:
      'Les capacités qu’un Collaborateur IA développe au fil de ses missions, avec Alma.',
  },
}

export default function CompetencesPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div className="min-h-screen bg-[var(--store-page)]" />}>
        <StoreContent initialType="competence" />
      </Suspense>
      <SiteFooter />
    </>
  )
}
