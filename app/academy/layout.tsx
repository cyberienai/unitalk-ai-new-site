import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { AcademyNav } from '@/components/academy/academy-nav'

export const metadata:Metadata={title:{default:'Unitalk Academy',template:'%s | Unitalk Academy'},description:'Apprenez en accomplissant des missions, développez des compétences concrètes et constituez vos preuves.'}
export default function AcademyLayout({children}:{children:React.ReactNode}){return <div className="academy-root"><Navbar/><div className="pt-[76px]"><AcademyNav/></div>{children}<SiteFooter/></div>}
