import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { AcademyHero } from '@/components/academy/academy-ui'
import { NETWORKS } from '@/lib/academy-catalog'
export const metadata:Metadata={title:'Unitalk Networks par secteur'}
export default function Page(){return <main><AcademyHero kicker="Unitalk Network" title="Les connaissances prennent de la valeur lorsqu’elles circulent dans un secteur." body="Chaque Network réunit experts, formateurs, apprenants, organisations, missions, compétences, méthodes et événements."/><section className="px-5 py-16"><div className="academy-shell grid gap-5 md:grid-cols-2 lg:grid-cols-3">{NETWORKS.map(n=><Link key={n.id} href={`/academy/networks/${n.id}`} className="group min-h-96 rounded-3xl border border-[#d7cebe] bg-[#fffaf4] p-7"><span className="block size-4 rounded-full" style={{background:n.color}}/><h2 className="mt-9 text-3xl font-black">{n.name}</h2><p className="mt-3 font-black text-[#625b50]">{n.tagline}</p><p className="mt-5 text-sm leading-7 text-[#625b50]">{n.description}</p><div className="mt-8 flex justify-between border-t border-[#d7cebe] pt-5 text-xs font-bold"><span>{n.members}</span><span>{n.events}</span></div><span className="mt-7 inline-flex gap-2 text-sm font-black text-[#b00b52]">Explorer<ArrowRight className="size-4"/></span></Link>)}</div></section></main>}
