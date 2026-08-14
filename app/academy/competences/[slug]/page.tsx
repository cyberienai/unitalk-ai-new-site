import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { AcademyHero, AcademyKicker } from '@/components/academy/academy-ui'
import { SKILLS, academyMission, academySkill } from '@/lib/academy-catalog'

export function generateStaticParams(){return SKILLS.map(({slug})=>({slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{return {title:academySkill((await params).slug)?.title??'Compétence'}}

export default async function Page({params}:{params:Promise<{slug:string}>}) {
  const item=academySkill((await params).slug)
  if(!item) notFound()
  return <main>
    <AcademyHero kicker={`Compétence · version ${item.version}`} title={item.title} body={item.outcome}/>
    <section className="border-y border-[#d8d0c2] bg-[#fffdf9] px-5"><div className="academy-reading divide-y divide-[#d8d0c2]">{[['Preuve attendue',item.evidence],['Évaluation',item.evaluation],['Auteur',item.author]].map(([label,value])=><div key={label} className="py-6 sm:grid sm:grid-cols-[150px_1fr] sm:gap-5"><AcademyKicker>{label}</AcademyKicker><p className="mt-2 text-sm font-semibold leading-6 sm:mt-0">{value}</p></div>)}</div></section>
    <section className="px-5 py-16"><div className="academy-reading"><AcademyKicker>Pour l’acquérir</AcademyKicker><div className="mt-5 divide-y divide-[#d8d0c2] border-y border-[#d8d0c2]">{item.missionSlugs.map(academyMission).filter(Boolean).map(mission=><Link key={mission!.slug} href={`/academy/missions/${mission!.slug}`} className="group flex items-center justify-between gap-5 py-5"><span className="font-semibold">{mission!.title}</span><ArrowRight className="size-4 shrink-0 text-[#b00c54] transition group-hover:translate-x-1"/></Link>)}</div><p className="mt-10 border-l-2 border-[#d10e63] pl-4 text-xs leading-5 text-[#625b50]">Cette validation interne ne constitue pas automatiquement une certification professionnelle reconnue par l’État.</p></div></section>
  </main>
}
