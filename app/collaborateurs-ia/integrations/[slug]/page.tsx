import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { StoreItemDetail } from '@/components/store/store-item-detail'
import { SiteFooter } from '@/components/site-footer'
import { getStoreItem, STORE_ITEMS } from '@/lib/store-catalog'

const TYPE_SLUG = 'integrations'
export function generateStaticParams() { return STORE_ITEMS.filter((item) => item.type === 'integration').map((item) => ({ slug: item.slug })) }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const item = getStoreItem(TYPE_SLUG, slug); return item ? { title: `${item.name.fr} · Intégration Unitalk`, description: item.description.fr, alternates: { canonical: `/collaborateurs-ia/${TYPE_SLUG}/${slug}` } } : { title: 'Intégrations' } }
export default async function IntegrationDetailPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; if (!getStoreItem(TYPE_SLUG, slug)) notFound(); return <><Navbar/><StoreItemDetail typeSlug={TYPE_SLUG} slug={slug}/><SiteFooter/></> }
