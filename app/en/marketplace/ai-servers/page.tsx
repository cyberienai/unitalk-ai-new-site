import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { UnitalkStoreHub } from '@/components/unitalk-store-hub'
import { SESSION_COOKIE } from '@/lib/mock-auth'

export const metadata: Metadata = { title: 'Private AI infrastructure', description: 'Choose scalable execution infrastructure for your AI Collaborators.', alternates: { canonical: '/en/marketplace/ai-servers', languages: { fr: '/marketplace/serveurs-ia', en: '/en/marketplace/ai-servers', 'x-default': '/marketplace/serveurs-ia' } } }
export default async function EnglishAiServersPage() { const authenticated = Boolean((await cookies()).get(SESSION_COOKIE)?.value); return <><Navbar/><UnitalkStoreHub initialCategoryId="serveurs-ia" fixedLang="en" authenticated={authenticated}/><SiteFooter/></> }
