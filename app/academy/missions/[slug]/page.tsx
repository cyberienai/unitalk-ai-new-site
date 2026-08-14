import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { AcademyCta, AcademyHero, AcademyKicker } from '@/components/academy/academy-ui'
import { MISSIONS, NETWORKS, academyMission, academySkill } from '@/lib/academy-catalog'

export function generateStaticParams(){return MISSIONS.map(({slug})=>({slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const item=academyMission((await params).slug);return {title:item?.title??'Mission'}}

export default async function Page({params}:{params:Promise<{slug:string}>}) {
  const item=academyMission((await params).slug)
  if(!item) notFound()
  const sector=NETWORKS.find(network=>network.id===item.sector)
  const facts=[['Temps',`${item.duration} · ${item.level}`],['Livrable',item.deliverable],['Évaluation',item.evaluation]]
  return <main>
    <AcademyHero kicker={`Mission · ${sector?.name}`} title={item.title} body={item.result}/>
    <section className="px-5 pb-16 text-center"><AcademyCta href={`/espace?mission=${item.slug}`}>{item.free?'Commencer gratuitement':'Rejoindre la mission'}</AcademyCta></section>
    <section className="border-y border-[#d8d0c2] bg-[#fffdf9] px-5"><div className="academy-reading divide-y divide-[#d8d0c2]">{facts.map(([label,value])=><div key={label} className="py-6 sm:grid sm:grid-cols-[140px_1fr] sm:gap-5"><AcademyKicker>{label}</AcademyKicker><p className="mt-2 text-sm font-semibold leading-6 sm:mt-0">{value}</p></div>)}</div></section>
    <section className="px-5 py-16"><div className="academy-reading"><AcademyKicker>Les étapes</AcademyKicker><ol className="mt-6 border-t border-[#d8d0c2]">{item.steps.map((step,index)=><li key={step} className="grid grid-cols-[40px_1fr] border-b border-[#d8d0c2] py-5"><span className="font-mono text-[10px] font-bold text-[#d10e63]">0{index+1}</span><strong className="font-semibold">{step}</strong></li>)}</ol>
      <div className="mt-14"><AcademyKicker>Ce que vous apprendrez</AcademyKicker><div className="mt-5 divide-y divide-[#d8d0c2] border-y border-[#d8d0c2]">{item.skillSlugs.map(academySkill).filter(Boolean).map(skill=><Link key={skill!.slug} href={`/academy/competences/${skill!.slug}`} className="group flex items-center justify-between gap-5 py-5"><span className="font-semibold">{skill!.title}</span><ArrowRight className="size-4 shrink-0 text-[#b00c54] transition group-hover:translate-x-1"/></Link>)}</div></div>
      <p className="mt-10 text-xs text-[#857c6e]">Mission proposée par {item.author}.</p>
    </div></section>
  </main>
}
