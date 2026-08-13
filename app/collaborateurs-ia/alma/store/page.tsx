import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { AlmaStoreContent } from '@/components/alma/alma-store-content'
export const metadata: Metadata = { title: 'Store Alma', description: 'Équipez Alma avec des profils métier, compétences et missions compatibles.', alternates: { canonical: '/collaborateurs-ia/alma/store' } }
export default function Page(){return <><Navbar/><AlmaStoreContent/><SiteFooter/></>}
