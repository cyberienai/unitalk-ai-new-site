import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Navbar } from '@/components/navbar'
import { StoreContent } from '@/components/store-content'
import { SiteFooter } from '@/components/site-footer'
import { STORE_ITEMS, storeItemHref } from '@/lib/store-catalog'

const SITE_URL = 'https://unitalk.ai'

export const metadata: Metadata = {
  title: 'Store — profils, compétences et applications',
  description:
    'Le savoir-faire prêt à confier à votre Collaborateur IA : profils métier, compétences et applications, assemblés par Alma pour votre Organisation.',
  alternates: { canonical: '/store' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/store`,
    title: 'Store — profils, compétences et applications | Unitalk',
    description:
      'Le savoir-faire prêt à confier à votre Collaborateur IA : profils métier, compétences et applications, assemblés par Alma pour votre Organisation.',
  },
}

const itemListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Store Unitalk',
  itemListElement: STORE_ITEMS.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: `${SITE_URL}${storeItemHref(item)}`,
    name: item.name.fr,
  })),
}

export default function StorePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <Navbar />
      <Suspense fallback={<div className="min-h-screen bg-[var(--store-page)]" />}>
        <StoreContent />
      </Suspense>
      <SiteFooter />
    </>
  )
}
