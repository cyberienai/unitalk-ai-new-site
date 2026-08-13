import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { ProfilsFinalContent } from '@/components/collaborateurs-ia/profils/profils-final-content'

const SITE_URL = 'https://unitalk.ai'

export const metadata: Metadata = {
  title: 'Profils métier pour Collaborateurs IA — Unitalk',
  description:
    'Choisissez les responsabilités durables de votre Collaborateur IA. Alma adapte chaque profil métier à votre entreprise, à ses missions et à ses règles.',
  keywords: [
    'profil métier IA',
    'Collaborateur IA par métier',
    'rôle IA en entreprise',
    'assistant de direction IA',
    'commercial IA',
    'support client IA',
  ],
  alternates: { canonical: '/collaborateurs-ia/profils-metier' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/collaborateurs-ia/profils-metier`,
    title: 'Profils métier pour Collaborateurs IA — Unitalk',
    description:
      'Choisissez les responsabilités durables de votre Collaborateur IA. Alma adapte chaque profil métier à votre entreprise, à ses missions et à ses règles.',
  },
}

export default function ProfilsMetierPage() {
  return <><Navbar /><ProfilsFinalContent /><SiteFooter /></>
}
