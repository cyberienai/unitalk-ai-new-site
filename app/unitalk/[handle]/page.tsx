import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { AlmaFinalContent } from '@/components/alma/alma-final-content'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
export const metadata: Metadata = { title: 'Alma, Coordinatrice de missions', description: 'Alma transforme votre besoin en mission et prépare le Collaborateur IA, les savoir-faire, les applications et les validations nécessaires.', alternates: { canonical: '/unitalk/@alma' }, openGraph: { type: 'profile', url: 'https://unitalk.ai/unitalk/@alma', title: 'Alma, Coordinatrice de missions | Unitalk', description: 'Commencez par le travail. Alma prépare la suite.', images: [{ url: '/alma-avatar.png', width: 800, height: 800 }] } }
export default async function Page({params}:{params:Promise<{handle:string}>}){const {handle}=await params;if(decodeURIComponent(handle)!=='@alma')notFound();return <><Navbar/><AlmaFinalContent/><SiteFooter/></>}
