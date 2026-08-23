import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { UnitalkStoreHub } from '@/components/unitalk-store-hub'
import { STORE_ITEMS } from '@/lib/store-catalog'

const count = STORE_ITEMS.filter(item => item.type === 'profil').length
export const metadata: Metadata = { title: 'AI job profiles | Unitalk Store', description: `Explore ${count} job profiles to extend your AI Collaborator’s responsibilities.`, alternates: { canonical: '/en/marketplace/job-profiles', languages: { fr: '/marketplace/profils-metier', en: '/en/marketplace/job-profiles', 'x-default': '/marketplace/profils-metier' } } }
export default function EnglishJobProfilesPage() { return <><Navbar/><UnitalkStoreHub initialCategoryId="profils-metier" fixedLang="en"/><SiteFooter/></> }
