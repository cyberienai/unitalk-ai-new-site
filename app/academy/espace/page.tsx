import type { Metadata } from 'next'
import Link from 'next/link'
import { AcademyHero, AcademyKicker } from '@/components/academy/academy-ui'

export const metadata:Metadata={title:'Espace apprenant et portfolio'}

export default async function Page({searchParams}:{searchParams:Promise<{mission?:string;parcours?:string;network?:string}>}) {
  const p=await searchParams
  const context=p.mission??p.parcours??p.network
  const redirect=context?`/academy/espace?${new URLSearchParams(p).toString()}`:'/academy/espace'
  const panels=[['Missions en cours','Reprenez le travail là où vous l’avez laissé.'],['Preuves','Conservez les livrables que vous avez fait valider.'],['Compétences','Voyez ce que vos missions vous ont permis de démontrer.']]
  return <main>
    <AcademyHero kicker="Mon espace" title="Vos missions. Vos preuves. Votre progression." body="Un endroit simple pour retrouver ce que vous apprenez et ce que vous avez réellement accompli."/>
    <section className="px-5 pb-16 text-center"><Link href={`/connexion?redirect=${encodeURIComponent(redirect)}`} className="academy-button academy-button-primary">Se connecter avec Unitalk</Link></section>
    <section className="border-y border-[#d8d0c2] bg-[#fffdf9] px-5 py-12"><div className="academy-reading">{context&&<p className="mb-8 border-l-2 border-[#d10e63] pl-4 text-sm font-semibold">Votre sélection « {context} » sera reprise après connexion.</p>}<div className="divide-y divide-[#d8d0c2] border-y border-[#d8d0c2]">{panels.map(([title,body])=><section key={title} className="py-7"><AcademyKicker>{title}</AcademyKicker><p className="mt-3 text-sm leading-7 text-[#625b50]">{body}</p></section>)}</div></div></section>
  </main>
}
