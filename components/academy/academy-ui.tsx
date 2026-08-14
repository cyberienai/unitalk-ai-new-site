import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'

export const academyHref = (href:string) => href.startsWith('/') && !href.startsWith('/academy') ? `/academy${href}` : href

export function AcademyCta({ href, children, secondary=false }: { href:string; children:React.ReactNode; secondary?:boolean }) {
  return <Link href={academyHref(href)} className={`academy-button gap-2 ${secondary?'academy-button-secondary':'academy-button-primary'}`}>{children}<ArrowRight className="size-4"/></Link>
}
export function AcademyKicker({ children }: { children:React.ReactNode }) { return <p className="academy-kicker">{children}</p> }
export function AcademyProofs({ items, dark=false }: { items:string[]; dark?:boolean }) { return <ul className={`flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold ${dark?'text-[#e7e0d5]':'text-[#514b42]'}`}>{items.map(item=><li key={item} className="flex items-center gap-2"><Check className={`size-4 ${dark?'text-[#f2a4c5]':'text-[#d10e63]'}`}/>{item}</li>)}</ul> }
export function AcademyHero({ kicker, title, body }: { kicker:string; title:string; body?:string }) { return <section className="px-5 pb-14 pt-20 text-center sm:pb-20 sm:pt-28"><div className="academy-reading"><AcademyKicker>{kicker}</AcademyKicker><h1 className="academy-display mt-6">{title}</h1>{body&&<p className="mx-auto mt-6 max-w-2xl text-[17px] leading-7 text-[#4e483f]">{body}</p>}</div></section> }
