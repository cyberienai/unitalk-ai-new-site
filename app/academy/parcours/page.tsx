import type { Metadata } from 'next'
import { AcademyHero } from '@/components/academy/academy-ui'
import { PathCard } from '@/components/academy/catalog-cards'
import { PATHS } from '@/lib/academy-catalog'
export const metadata:Metadata={title:'Parcours professionnels'}
export default function Page(){return <main><AcademyHero kicker="Parcours" title="Progressez autour d’un rôle précis." body="Chaque parcours réunit quelques missions utiles dans un ordre simple."/><section className="border-t border-[#d8d0c2] bg-[#fffdf9] px-5 py-12"><div className="academy-reading academy-list">{PATHS.map(p=><PathCard key={p.slug} path={p}/>)}</div></section></main>}
