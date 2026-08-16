import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'

export function AcademyAlmaHero({title='Commencez avec Alma.',body='Décrivez ce que vous voulez savoir livrer. Alma personnalise votre première mission et vous ouvre le même compte Unitalk.',href='/academy/onboarding',cta='Personnaliser mon parcours'}:{title?:string;body?:string;href?:string;cta?:string}){
  return <section className="border-y border-[#d8d0c2] bg-[#181512] px-5 py-14 text-[#f8f1e7]"><div className="academy-shell grid gap-8 sm:grid-cols-[140px_1fr] sm:items-center"><div className="relative aspect-[4/5] overflow-hidden border border-white/15"><Image src="/alma-avatar.png" alt="Alma, guide Unitalk Academy" fill className="object-cover object-top"/></div><div><p className="academy-kicker text-[#f2a4c5]">Alma · Guide Academy</p><h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-[-.04em] sm:text-4xl">{title}</h2><p className="mt-4 max-w-2xl text-[15px] leading-7 text-[#cfc6b8]">{body}</p><div className="mt-6 flex flex-wrap items-center gap-5"><Link href={href} className="academy-button academy-button-primary gap-2">{cta}<ArrowRight className="size-4"/></Link><span className="flex items-center gap-2 text-xs text-[#cfc6b8]"><Check className="size-3.5 text-[#f2a4c5]"/>Un seul compte Unitalk</span></div></div></div></section>
}
