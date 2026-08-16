import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Navbar } from '@/components/navbar'
import { StoreContent } from '@/components/store-content'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = { title: 'Intégrations pour Collaborateurs IA', description: 'Connectez les services tiers autorisés : messagerie, CRM, documents, collaboration et productivité.', alternates: { canonical: '/collaborateurs-ia/integrations' } }
export default function IntegrationsPage() { return <><Navbar/><Suspense fallback={<div className="min-h-screen bg-[var(--store-page)]"/>}><StoreContent initialType="integration"/></Suspense><SiteFooter/></> }
