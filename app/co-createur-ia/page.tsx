import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { CoCreatorContent } from '@/components/co-creator-content'

export const metadata: Metadata = { title: 'Devenir Co-créateur IA : créer et commercialiser des Collaborateurs IA', description: 'Créez des Collaborateurs IA, puis développez votre activité avec 30 % de commission comme Affilié ou 50 % comme Partenaire, selon les conditions des programmes Unitalk.', alternates: { canonical: '/co-createur-ia' } }
export default function Page(){return <><Navbar/><CoCreatorContent/><SiteFooter/></>}
