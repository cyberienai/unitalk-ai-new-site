import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { StoreItemDetail } from '@/components/store/store-item-detail'
import { SiteFooter } from '@/components/site-footer'
import { getStoreItem, STORE_ITEMS, TYPE_LABELS, TYPE_LABELS_PLURAL } from '@/lib/store-catalog'

const SITE_URL = 'https://unitalk.ai'
const TYPE_SLUG = 'profils-metier'

export function generateStaticParams() {
  return STORE_ITEMS.filter((item) => item.type === 'profil').map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const item = getStoreItem(TYPE_SLUG, slug)
  if (!item) return { title: 'Profils métier · Unitalk' }
  return {
    title: `${item.name.fr} · ${TYPE_LABELS.profil.fr} · Unitalk`,
    description: item.description.fr,
    alternates: { canonical: `/collaborateurs-ia/${TYPE_SLUG}/${slug}` },
    openGraph: {
      type: 'article',
      url: `${SITE_URL}/collaborateurs-ia/${TYPE_SLUG}/${slug}`,
      title: `${item.name.fr} · Unitalk`,
      description: item.description.fr,
    },
  }
}

export default async function ProfilMetierDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = getStoreItem(TYPE_SLUG, slug)
  if (!item) notFound()

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Collaborateurs IA', item: `${SITE_URL}/collaborateurs-ia` },
      {
        '@type': 'ListItem',
        position: 3,
        name: TYPE_LABELS_PLURAL.profil.fr,
        item: `${SITE_URL}/collaborateurs-ia/${TYPE_SLUG}`,
      },
      { '@type': 'ListItem', position: 4, name: item.name.fr, item: `${SITE_URL}/collaborateurs-ia/${TYPE_SLUG}/${slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Navbar />
      <StoreItemDetail typeSlug={TYPE_SLUG} slug={slug} />
      <SiteFooter />
    </>
  )
}
