import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { AcademyHero } from '@/components/academy/academy-ui'
import { NETWORKS } from '@/lib/academy-catalog'
export const metadata:Metadata={title:'Unitalk Networks par secteur'}
export default function Page(){return <main><AcademyHero kicker="Secteurs" title="Apprenez avec les personnes de votre métier." body="Choisissez un secteur pour trouver ses missions, ses compétences et ses parcours."/><section className="border-t border-[#d8d0c2] bg-[#fffdf9] px-5 py-12"><div className="academy-reading academy-list">{NETWORKS.map(n=><Link key={n.id} href={`/academy/networks/${n.id}`} className="group block border-b border-[#d8d0c2] py-8"><div className="flex items-center gap-3"><span className="block size-2.5 rounded-full" style={{background:n.color}}/><h2 className="text-2xl font-semibold tracking-[-.035em]">{n.name}</h2></div><p className="mt-3 text-sm font-semibold text-[#4e483f]">{n.tagline}</p><p className="mt-2 text-sm leading-7 text-[#625b50]">{n.description}</p><span className="academy-text-link mt-4">Explorer<ArrowRight className="size-3.5 transition group-hover:translate-x-1"/></span></Link>)}</div></section></main>}
