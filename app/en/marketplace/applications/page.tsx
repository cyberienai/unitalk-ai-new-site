import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { UnitalkStoreHub } from '@/components/unitalk-store-hub'

export const metadata: Metadata = { title: 'Applications for AI Collaborators', description: 'Connect your AI Collaborators to business applications through governed access.', alternates: { canonical: '/en/marketplace/applications', languages: { fr: '/marketplace/applications', en: '/en/marketplace/applications', 'x-default': '/marketplace/applications' } } }
export default function EnglishApplicationsPage() { return <><Navbar/><UnitalkStoreHub initialCategoryId="applications" fixedLang="en"/><SiteFooter/></> }
