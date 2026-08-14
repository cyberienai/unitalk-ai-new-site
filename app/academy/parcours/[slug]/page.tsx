import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AcademyCta, AcademyHero, AcademyKicker } from '@/components/academy/academy-ui'
import { MissionCard, SkillCard } from '@/components/academy/catalog-cards'
import { PATHS, academyMission, academyPath, academySkill } from '@/lib/academy-catalog'

export function generateStaticParams(){return PATHS.map(({slug})=>({slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{return {title:academyPath((await params).slug)?.title??'Parcours'}}

export default async function Page({params}:{params:Promise<{slug:string}>}) {
  const item=academyPath((await params).slug)
  if(!item) notFound()
  return <main>
    <AcademyHero kicker="Parcours" title={item.title} body={item.promise}/>
    <section className="px-5 pb-16 text-center"><p className="mb-6 text-sm font-semibold text-[#625b50]">{item.audience} · {item.format}</p><AcademyCta href={`/espace?parcours=${item.slug}`}>Rejoindre ce parcours</AcademyCta></section>
    <section className="border-y border-[#d8d0c2] bg-[#fffdf9] px-5 py-14"><div className="academy-reading"><AcademyKicker>Missions</AcademyKicker><div className="academy-list mt-5">{item.missionSlugs.map(academyMission).filter(Boolean).map(mission=><MissionCard key={mission!.slug} mission={mission!}/>)}</div><div className="mt-14"><AcademyKicker>Compétences visées</AcademyKicker><div className="academy-list mt-5">{item.skillSlugs.map(academySkill).filter(Boolean).map(skill=><SkillCard key={skill!.slug} skill={skill!}/>)}</div></div><p className="mt-10 border-l-2 border-[#d10e63] pl-4 text-xs text-[#625b50]">Les attestations affichent toujours leur nature exacte.</p></div></section>
  </main>
}
