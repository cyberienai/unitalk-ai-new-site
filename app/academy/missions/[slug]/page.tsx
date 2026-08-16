import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Check } from 'lucide-react'
import { AcademyCta, AcademyHero, AcademyKicker, AcademyProofs } from '@/components/academy/academy-ui'
import { MISSIONS, NETWORKS, academyMission, academySkill } from '@/lib/academy-catalog'

export function generateStaticParams(){return MISSIONS.map(({slug})=>({slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const item=academyMission((await params).slug);return {title:item?.title??'Mission'}}

export default async function Page({params}:{params:Promise<{slug:string}>}) {
  const item=academyMission((await params).slug)
  if(!item) notFound()
  const sector=NETWORKS.find(network=>network.id===item.sector)
  const facts=[['Temps',`${item.duration} · ${item.level}`],['Livrable',item.deliverable],['Évaluation',item.evaluation]]
  const nextHref=item.free?`/espace?mission=${item.slug}`:'/formations/co-createur-ia'
  return <main>
    <AcademyHero kicker={`Mission · ${sector?.name}`} title={item.title} body={item.result}/>
    <section className="px-5 pb-16 text-center"><AcademyCta href={nextHref}>{item.free?'Ouvrir la mission guidée':'Construire cette mission en formation'}</AcademyCta><p className="mx-auto mt-4 max-w-xl text-xs leading-5 text-[#857c6e]">{item.free?'Compte Unitalk requis · Aucun paiement · Votre progression reste dans votre espace':'Cette mission avancée est travaillée dans un parcours accompagné.'}</p></section>
    <section className="border-y border-[#d8d0c2] bg-[#fffdf9] px-5"><div className="academy-reading divide-y divide-[#d8d0c2]">{facts.map(([label,value])=><div key={label} className="py-6 sm:grid sm:grid-cols-[140px_1fr] sm:gap-5"><AcademyKicker>{label}</AcademyKicker><p className="mt-2 text-sm font-semibold leading-6 sm:mt-0">{value}</p></div>)}</div></section>
    <section className="border-b border-[#d8d0c2] bg-[#181512] px-5 py-14 text-[#f8f1e7]"><div className="academy-reading"><AcademyKicker>De l’exercice à l’offre</AcademyKicker><h2 className="mt-5 text-3xl font-semibold leading-tight tracking-[-.04em]">Cette mission devient la première capacité de votre Collaborateur IA.</h2><p className="mt-5 text-[15px] leading-7 text-[#cfc6b8]">Vous ne produisez pas seulement un livrable. Vous formalisez une méthode, ses sources, ses contrôles et un résultat que vous pourrez tester puis montrer.</p><div className="mt-7"><AcademyProofs dark items={['Méthode réutilisable','Contrôles humains explicites','Preuve présentable à un client']}/></div></div></section>
    <section className="px-5 py-16"><div className="academy-reading"><AcademyKicker>Les étapes</AcademyKicker><ol className="mt-6 border-t border-[#d8d0c2]">{item.steps.map((step,index)=><li key={step} className="grid grid-cols-[40px_1fr] border-b border-[#d8d0c2] py-5"><span className="font-mono text-[10px] font-bold text-[#d10e63]">0{index+1}</span><strong className="font-semibold">{step}</strong></li>)}</ol>
      <div className="mt-14"><AcademyKicker>Ce que vous apprendrez</AcademyKicker><div className="mt-5 divide-y divide-[#d8d0c2] border-y border-[#d8d0c2]">{item.skillSlugs.map(academySkill).filter(Boolean).map(skill=><Link key={skill!.slug} href={`/academy/competences/${skill!.slug}`} className="group flex items-center justify-between gap-5 py-5"><span className="font-semibold">{skill!.title}</span><ArrowRight className="size-4 shrink-0 text-[#b00c54] transition group-hover:translate-x-1"/></Link>)}</div></div>
      <div className="mt-14 border border-[#d8d0c2] bg-[#fffdf9] p-6 sm:p-8"><AcademyKicker>Étape suivante</AcademyKicker><h2 className="mt-4 text-2xl font-semibold tracking-[-.035em]">Passez de la preuve à un Collaborateur IA commercialisable.</h2><ul className="mt-5 space-y-3 text-sm">{['Construire le profil et les compétences','Tester sur des cas contrôlés','Préparer la démonstration et le prix'].map(value=><li key={value} className="flex gap-3"><Check className="size-4 shrink-0 text-[#d10e63]"/>{value}</li>)}</ul><div className="mt-7 flex flex-wrap gap-3"><AcademyCta href="/formations/co-createur-ia">Voir la formation Co-créateur</AcademyCta><AcademyCta href="/tarifs" secondary>Comprendre les tarifs</AcademyCta></div></div>
      <p className="mt-10 text-xs text-[#857c6e]">Mission proposée par {item.author}.</p>
    </div></section>
  </main>
}
