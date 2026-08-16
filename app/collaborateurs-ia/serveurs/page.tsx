import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Navbar } from '@/components/navbar'
import { StoreContent } from '@/components/store-content'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = { title: 'Serveurs privés IA : Small, Medium, Large et XXL', description: 'Découvrez quatre niveaux de serveur privé à dimensionner selon vos Collaborateurs IA, applications et volumes de travail.', alternates: { canonical: '/collaborateurs-ia/serveurs' } }
export default function ServersPage() { return <><Navbar/><Suspense fallback={<div className="min-h-screen bg-[var(--store-page)]"/>}><StoreContent initialType="server"/></Suspense><SiteFooter/></> }
