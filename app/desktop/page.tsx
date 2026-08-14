import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { DesktopContent } from '@/components/desktop-content'
import { SiteFooter } from '@/components/site-footer'
export const metadata:Metadata={title:'Unitalk Desktop : votre équipe humain-IA sur ordinateur',description:'Accédez à la distribution Unitalk AI depuis Mac, Windows ou Linux. Confiez des missions, suivez le travail et validez les actions sensibles.',alternates:{canonical:'/desktop'},openGraph:{type:'website',url:'https://unitalk.ai/desktop',title:'Unitalk Desktop | Unitalk AI',description:'Le poste de travail local de votre équipe humain-IA.'}}
export default function DesktopPage(){return <><Navbar/><DesktopContent/><SiteFooter/></>}
