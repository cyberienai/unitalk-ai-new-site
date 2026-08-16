import type { Metadata } from 'next'
import Link from 'next/link'
import { AcademyNav } from '@/components/academy/academy-nav'

export const metadata:Metadata={title:{default:'Unitalk Academy',template:'%s | Unitalk Academy'},description:'Partez d’une mission réelle, créez un Collaborateur IA utile et apprenez à le commercialiser avec la licence Co-créateur.'}
export default function AcademyLayout({children}:{children:React.ReactNode}){return <div className="academy-root"><AcademyNav/>{children}<footer className="border-t border-[#d8d0c2] px-5 py-8 text-center text-xs text-[#857c6e]"><p>Unitalk Academy · Apprendre, créer, commercialiser</p><p className="mt-2"><Link href="/" className="hover:text-[#4e483f]">Unitalk</Link> · <Link href="/co-createur-ia" className="hover:text-[#4e483f]">Licence Co-créateur</Link> · <Link href="/mentions-legales" className="hover:text-[#4e483f]">Mentions légales</Link> · <a href="mailto:academy@unitalk.fr" className="hover:text-[#4e483f]">academy@unitalk.fr</a></p></footer></div>}
