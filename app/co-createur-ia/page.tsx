import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { CoCreatorContent } from '@/components/co-creator-content'

export const metadata: Metadata = { title: 'Devenir Co-créateur IA : créer et commercialiser des Collaborateurs IA', description: 'Partez d’une mission réelle, créez un Collaborateur IA avec Unitalk Academy puis commercialisez vos créations avec la licence Co-créateur.', alternates: { canonical: '/co-createur-ia' } }
export default function Page(){return <><Navbar/><CoCreatorContent/><SiteFooter/></>}
