import type { Metadata } from 'next'
import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { StoreContent } from '@/components/store-content'
import { SiteFooter } from '@/components/site-footer'
import { TYPE_BY_SLUG, TYPE_LABELS_PLURAL, TYPE_SLUGS } from '@/lib/store-catalog'

const SITE_URL = 'https://unitalk.ai'

export function generateStaticParams() {
  return Object.values(TYPE_SLUGS).map((type) => ({ type }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>
}): Promise<Metadata> {
  const { type } = await params
  const storeType = TYPE_BY_SLUG[type]
  if (!storeType) return { title: 'Store · Unitalk' }
  const label = TYPE_LABELS_PLURAL[storeType].fr
  return {
    title: `${label} · Store`,
    description: `Explorez les ${label.toLowerCase()} du Store Unitalk, prêts à confier à votre Collaborateur IA.`,
    alternates: { canonical: `/store/${type}` },
    openGraph: {
      type: 'website',
      url: `${SITE_URL}/store/${type}`,
      title: `${label} · Store · Unitalk`,
    },
  }
}

export default async function StoreTypePage({
  params,
}: {
  params: Promise<{ type: string }>
}) {
  const { type } = await params
  const storeType = TYPE_BY_SLUG[type]
  if (!storeType) notFound()

  return (
    <>
      <Navbar />
      <Suspense fallback={<div className="min-h-screen bg-[var(--store-page)]" />}>
        <StoreContent initialType={storeType} />
      </Suspense>
      <SiteFooter />
    </>
  )
}
