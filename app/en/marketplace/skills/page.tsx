import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { UnitalkStoreHub } from '@/components/unitalk-store-hub'

export const metadata: Metadata = { title: 'Reusable AI skills | Unitalk Store', description: 'Explore documented skills to add to your AI Collaborators.', alternates: { canonical: '/en/marketplace/skills', languages: { fr: '/marketplace/competences', en: '/en/marketplace/skills', 'x-default': '/marketplace/competences' } } }
export default function EnglishSkillsPage() { return <><Navbar/><UnitalkStoreHub initialCategoryId="competences" fixedLang="en"/><SiteFooter/></> }
