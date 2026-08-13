import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { CoCreatorContent } from '@/components/co-creator-content'

export const metadata: Metadata = { title: 'Licence Co-créateur IA Unitalk', description: 'Transformez le savoir-faire humain en profils métier, compétences et missions IA réutilisables et monétisables.', alternates: { canonical: '/co-createur-ia' } }
export default function Page(){return <><Navbar/><CoCreatorContent/><SiteFooter/></>}
