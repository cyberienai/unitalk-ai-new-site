import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { ExpertsContent } from '@/components/experts-content'
import { SiteFooter } from '@/components/site-footer'

const SITE_URL = 'https://unitalk.ai'

export const metadata: Metadata = {
  // The root layout applies a `%s | Unitalk` template.
  title: 'Experts IA — transformer une mission en capacité testée',
  description:
    'Partez d’une mission réelle. Formalisez le jugement humain, construisez et testez un Collaborateur IA, puis transmettez la méthode à votre équipe.',
  alternates: { canonical: '/experts' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/experts`,
    title: 'Experts IA — le jugement humain là où il compte | Unitalk',
    description:
      'Une mission réelle, des décisions humaines explicites et une capacité IA testée puis transmise.',
  },
}

// Service structured data — the human accompaniment offering.
const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Formalisation et transmission de l’expertise métier',
  serviceType: 'Cadrage de missions, jugement expert et construction de Collaborateurs IA',
  provider: { '@type': 'Organization', name: 'Unitalk' },
  areaServed: 'FR',
  url: `${SITE_URL}/experts`,
}

export default function ExpertsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <Navbar />
      <ExpertsContent />
      <SiteFooter />
    </>
  )
}
