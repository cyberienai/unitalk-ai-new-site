import type { Metadata } from 'next'
import { AcademyHero } from '@/components/academy/academy-ui'
import { PathCard } from '@/components/academy/catalog-cards'
import { PATHS } from '@/lib/academy-catalog'
export const metadata:Metadata={title:'Parcours professionnels'}
export default function Page(){return <main><AcademyHero kicker="Parcours professionnels" title="Assemblez les compétences autour du rôle que vous voulez exercer." body="Un parcours organise des missions, des productions, des évaluations et un portfolio."/><section className="px-5 py-16"><div className="academy-shell grid gap-5 md:grid-cols-2">{PATHS.map(p=><PathCard key={p.slug} path={p}/>)}</div></section></main>}
