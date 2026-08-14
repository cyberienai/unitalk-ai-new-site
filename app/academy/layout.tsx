import type { Metadata } from 'next'
import Link from 'next/link'
import { AcademyNav } from '@/components/academy/academy-nav'

export const metadata:Metadata={title:{default:'Unitalk Academy',template:'%s | Unitalk Academy'},description:'Apprenez en accomplissant des missions, développez des compétences concrètes et constituez vos preuves.'}
export default function AcademyLayout({children}:{children:React.ReactNode}){return <div className="academy-root"><AcademyNav/>{children}<footer className="border-t border-[#d8d0c2] px-5 py-8 text-center text-xs text-[#857c6e]"><p>Unitalk Academy · Apprendre par la pratique</p><p className="mt-2"><Link href="/" className="hover:text-[#4e483f]">Unitalk</Link> · <Link href="/mentions-legales" className="hover:text-[#4e483f]">Mentions légales</Link> · <a href="mailto:academy@unitalk.fr" className="hover:text-[#4e483f]">academy@unitalk.fr</a></p></footer></div>}
