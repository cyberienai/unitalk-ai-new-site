import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { UnitalkStoreHub } from '@/components/unitalk-store-hub'

export const metadata: Metadata = { title: 'AI models for AI Collaborators', description: 'Choose and govern the AI models available to your AI Collaborators.', alternates: { canonical: '/en/marketplace/ai-models', languages: { fr: '/marketplace/modeles-ia', en: '/en/marketplace/ai-models', 'x-default': '/marketplace/modeles-ia' } } }
export default function EnglishAiModelsPage() { return <><Navbar/><UnitalkStoreHub initialCategoryId="modeles-ia" fixedLang="en"/><SiteFooter/></> }
