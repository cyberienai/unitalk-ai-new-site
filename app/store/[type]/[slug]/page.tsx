import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { StoreItemDetail } from '@/components/store/store-item-detail'
import { SiteFooter } from '@/components/site-footer'
import {
  getStoreItem,
  STORE_ITEMS,
  TYPE_BY_SLUG,
  TYPE_LABELS,
  TYPE_LABELS_PLURAL,
  TYPE_SLUGS,
} from '@/lib/store-catalog'

const SITE_URL = 'https://unitalk.ai'

export function generateStaticParams() {
  return STORE_ITEMS.map((item) => ({ type: TYPE_SLUGS[item.type], slug: item.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string; slug: string }>
}): Promise<Metadata> {
  const { type, slug } = await params
  const item = getStoreItem(type, slug)
  if (!item) return { title: 'Store · Unitalk' }
  return {
    title: `${item.name.fr} · ${TYPE_LABELS[item.type].fr} · Store · Unitalk`,
    description: item.description.fr,
    alternates: { canonical: `/store/${type}/${slug}` },
    openGraph: {
      type: 'article',
      url: `${SITE_URL}/store/${type}/${slug}`,
      title: `${item.name.fr} · Store · Unitalk`,
      description: item.description.fr,
    },
  }
}

export default async function StoreItemPage({
  params,
}: {
  params: Promise<{ type: string; slug: string }>
}) {
  const { type, slug } = await params
  if (!TYPE_BY_SLUG[type]) notFound()
  const item = getStoreItem(type, slug)
  if (!item) notFound()

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Store', item: `${SITE_URL}/store` },
      {
        '@type': 'ListItem',
        position: 3,
        name: TYPE_LABELS_PLURAL[item.type].fr,
        item: `${SITE_URL}/store/${type}`,
      },
      { '@type': 'ListItem', position: 4, name: item.name.fr, item: `${SITE_URL}/store/${type}/${slug}` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navbar />
      <StoreItemDetail typeSlug={type} slug={slug} />
      <SiteFooter />
    </>
  )
}
