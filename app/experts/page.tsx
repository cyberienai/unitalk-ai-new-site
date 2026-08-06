import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Navbar } from '@/components/navbar'
import { ExpertsContent } from '@/components/experts-content'
import { SiteFooter } from '@/components/site-footer'

const SITE_URL = 'https://unitalk.ai'

export const metadata: Metadata = {
  // The root layout applies a `%s | Unitalk` template.
  title: 'Experts — l’accompagnement humain de vos Collaborateurs IA',
  description:
    'Des experts métier et techniques accompagnent la mise en place et la montée en puissance de vos Collaborateurs IA : cadrage, configuration, intégrations et transmission du savoir-faire.',
  alternates: { canonical: '/experts' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/experts`,
    title: 'Experts — l’accompagnement humain de vos Collaborateurs IA | Unitalk',
    description:
      'Des experts métier et techniques accompagnent la mise en place et la montée en puissance de vos Collaborateurs IA.',
  },
}

// Service structured data — the human accompaniment offering.
const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Accompagnement par des experts Unitalk',
  serviceType: 'Accompagnement à la mise en place de Collaborateurs IA',
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
      <Suspense fallback={<div className="min-h-screen bg-[var(--store-page)]" />}>
        <ExpertsContent />
      </Suspense>
      <SiteFooter />
    </>
  )
}
