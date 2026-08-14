import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { AcademyCta, AcademyHero, AcademyKicker } from '@/components/academy/academy-ui'
import { MissionCard, PathCard, SkillCard } from '@/components/academy/catalog-cards'
import { MISSIONS, NETWORKS, PATHS, SKILLS, academyNetwork } from '@/lib/academy-catalog'

export function generateStaticParams(){return NETWORKS.map(({id:sector})=>({sector}))}
export async function generateMetadata({params}:{params:Promise<{sector:string}>}):Promise<Metadata>{return {title:academyNetwork((await params).sector)?.name??'Secteur'}}

export default async function Page({params}:{params:Promise<{sector:string}>}) {
  const item=academyNetwork((await params).sector)
  if(!item) notFound()
  const missions=MISSIONS.filter(x=>x.sector===item.id), skills=SKILLS.filter(x=>x.sector===item.id), paths=PATHS.filter(x=>x.sector===item.id)
  return <main>
    <AcademyHero kicker="Secteur" title={item.name} body={`${item.tagline} ${item.description}`}/>
    <section className="px-5 pb-16 text-center"><p className="mb-6 text-xs font-semibold text-[#857c6e]">{item.members} · {item.events}</p><AcademyCta href={`/espace?network=${item.id}`}>Rejoindre ce secteur</AcademyCta></section>
    <section className="border-y border-[#d8d0c2] bg-[#fffdf9] px-5 py-14"><div className="academy-reading">{missions.length>0&&<><AcademyKicker>Missions</AcademyKicker><div className="academy-list mt-5">{missions.map(mission=><MissionCard key={mission.slug} mission={mission}/>)}</div></>}{paths.length>0&&<div className="mt-14"><AcademyKicker>Parcours</AcademyKicker><div className="academy-list mt-5">{paths.map(path=><PathCard key={path.slug} path={path}/>)}</div></div>}{skills.length>0&&<div className="mt-14"><AcademyKicker>Compétences</AcademyKicker><div className="academy-list mt-5">{skills.map(skill=><SkillCard key={skill.slug} skill={skill}/>)}</div></div>}<p className="mt-12 text-sm text-[#625b50]">Vous souhaitez transmettre une méthode dans ce secteur ? <Link href="/academy/experts" className="font-bold text-[#b00c54] hover:underline">Devenir contributeur</Link>.</p></div></section>
  </main>
}
