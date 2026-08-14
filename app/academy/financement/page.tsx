import type { Metadata } from 'next'
import { Checklist } from '@/components/academy/editorial-page'
import { AcademyHero } from '@/components/academy/academy-ui'

export const metadata:Metadata={title:'Financement des formations IA'}

export default async function Page({searchParams}:{searchParams:Promise<{formation?:string}>}) {
  const {formation}=await searchParams
  return <main>
    <AcademyHero kicker="Financement" title="Vérifions ce qui peut être pris en charge." body="Les possibilités dépendent de votre situation, du programme et de l’accord préalable de l’organisme financeur."/>
    <section className="border-t border-[#d8d0c2] bg-[#fffdf9] px-5 py-14"><div className="academy-reading"><h2 className="text-3xl font-semibold tracking-[-.04em]">La prise en charge n’est jamais automatique.</h2><Checklist items={['Budget de formation de l’entreprise','OPCO selon la branche et l’entreprise','Fonds pour travailleurs indépendants','Dispositifs publics identifiés']}/><form action="mailto:academy@unitalk.fr" className="mt-12 border-t border-[#d8d0c2] pt-10"><h2 className="text-2xl font-semibold">Demander une étude</h2>{formation&&<p className="mt-2 text-sm text-[#625b50]">Formation concernée: {formation}</p>}<input type="hidden" name="formation" value={formation??''}/><input required name="nom" placeholder="Nom" className="mt-7 h-12 w-full rounded-xl border border-[#d8d0c2] bg-[#f3efe6] px-4 outline-none focus:ring-2 focus:ring-[#d10e63]/20"/><input required type="email" name="email" placeholder="Email professionnel" className="mt-3 h-12 w-full rounded-xl border border-[#d8d0c2] bg-[#f3efe6] px-4 outline-none focus:ring-2 focus:ring-[#d10e63]/20"/><textarea name="objectif" placeholder="Votre objectif" rows={4} className="mt-3 w-full rounded-xl border border-[#d8d0c2] bg-[#f3efe6] p-4 outline-none focus:ring-2 focus:ring-[#d10e63]/20"/><button className="academy-button academy-button-primary mt-4">Envoyer la demande</button></form></div></section>
  </main>
}
