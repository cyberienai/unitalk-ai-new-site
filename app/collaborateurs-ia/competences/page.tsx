import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { CompetencesContent } from '@/components/collaborateurs-ia/competences-content'
import { SiteFooter } from '@/components/site-footer'

const SITE_URL = 'https://unitalk.ai'

export const metadata: Metadata = {
  title: 'Compétences réutilisables pour Collaborateurs IA',
  description: 'Explorez des méthodes structurées que vos Collaborateurs IA peuvent appliquer d’une mission à l’autre, selon leurs droits et vos règles de validation.',
  alternates: { canonical: '/collaborateurs-ia/competences' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/collaborateurs-ia/competences`,
    title: 'Compétences réutilisables pour Collaborateurs IA | Unitalk',
    description: 'Des savoir-faire structurés, testés et prêts à adapter aux méthodes de votre entreprise.',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
}

export default async function CompetencesPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams
  if (params.type !== undefined) {
    const normalized = new URLSearchParams()
    for (const [key, raw] of Object.entries(params)) {
      if (key === 'type' || raw === undefined) continue
      const value = Array.isArray(raw) ? raw[0] : raw
      if (value) normalized.set(key, value)
    }
    redirect(`/collaborateurs-ia/competences${normalized.size ? `?${normalized}` : ''}`)
  }

  return <><Navbar /><CompetencesContent /><SiteFooter /></>
}
