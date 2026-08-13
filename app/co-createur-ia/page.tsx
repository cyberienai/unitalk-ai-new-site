import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { CoCreatorContent } from '@/components/co-creator-content'

export const metadata: Metadata = { title: 'Formation Co-créateur IA Unitalk, propulsée par Hermes', description: 'Apprenez à transformer le savoir-faire humain en profils métier, compétences, missions et applications métier pour les Collaborateurs IA Unitalk.', alternates: { canonical: '/co-createur-ia' } }
export default function Page(){return <><Navbar/><CoCreatorContent/><SiteFooter/></>}
