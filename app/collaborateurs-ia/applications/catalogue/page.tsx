import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Navbar } from '@/components/navbar'
import { StoreContent } from '@/components/store-content'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Catalogue des applications Unitalk',
  description: 'Explorez les applications open source vérifiées et les modèles métier vibecodés proposés aux Collaborateurs IA.',
  alternates: { canonical: '/collaborateurs-ia/applications/catalogue' },
}

export default function ApplicationsCatalogPage() {
  return <><Navbar/><Suspense fallback={<div className="min-h-screen bg-[var(--store-page)]"/>}><StoreContent initialType="application"/></Suspense><SiteFooter/></>
}
