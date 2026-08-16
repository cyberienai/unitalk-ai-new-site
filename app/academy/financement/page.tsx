import type { Metadata } from 'next'
import { Checklist } from '@/components/academy/editorial-page'
import { AcademyHero } from '@/components/academy/academy-ui'

export const metadata:Metadata={title:'Financement des formations IA'}

export default async function Page({searchParams}:{searchParams:Promise<{formation?:string}>}) {
  const {formation}=await searchParams
  return <main>
    <AcademyHero kicker="Financement" title="Vérifions ce qui peut être pris en charge." body="Les possibilités dépendent de votre situation, du programme et de l’accord préalable de l’organisme financeur."/>
    <section className="border-t border-[#d8d0c2] bg-[#fffdf9] px-5 py-14"><div className="academy-reading"><h2 className="text-3xl font-semibold tracking-[-.04em]">La prise en charge n’est jamais automatique.</h2><Checklist items={['Budget de formation de l’entreprise','OPCO selon la branche et l’entreprise','Fonds pour travailleurs indépendants','Dispositifs publics identifiés']}/><div className="mt-12 border-t border-[#d8d0c2] pt-10"><h2 className="text-2xl font-semibold">Demander une étude</h2>{formation&&<p className="mt-2 text-sm text-[#625b50]">Formation concernée : {formation}</p>}<p className="mt-4 text-sm leading-7 text-[#625b50]">Indiquez votre statut, l’effectif concerné, le calendrier souhaité et la mission que vous voulez construire. Nous vous répondons avec les informations disponibles, sans promettre l’accord d’un financeur.</p><a href={`mailto:academy@unitalk.fr?subject=${encodeURIComponent(`Étude de financement${formation?` · ${formation}`:''}`)}`} className="academy-button academy-button-primary mt-6">Écrire à l’équipe Academy</a><p className="mt-3 text-xs text-[#857c6e]">Votre messagerie s’ouvrira. Vous choisissez les informations envoyées.</p></div></div></section>
  </main>
}
