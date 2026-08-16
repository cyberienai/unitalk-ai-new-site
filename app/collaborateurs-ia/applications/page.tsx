import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Navbar } from '@/components/navbar'
import { StoreContent } from '@/components/store-content'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Applications open source et métier pour Collaborateurs IA',
  description: 'Explorez les applications open source vérifiées et les modèles d’applications métier vibecodés pour vos Collaborateurs IA.',
  alternates: { canonical: '/collaborateurs-ia/applications' },
}

export default function ApplicationsPage() {
  return <><Navbar/><Suspense fallback={<div className="min-h-screen bg-[var(--store-page)]"/>}><StoreContent initialType="application"/></Suspense><SiteFooter/></>
}
