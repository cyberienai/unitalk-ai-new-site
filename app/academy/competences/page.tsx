import type { Metadata } from 'next'
import { AcademyHero } from '@/components/academy/academy-ui'
import { SkillCard } from '@/components/academy/catalog-cards'
import { SKILLS } from '@/lib/academy-catalog'
export const metadata:Metadata={title:'Compétences évaluées'}
export default function Page(){return <main><AcademyHero kicker="Compétences" title="Ce que vous savez faire doit pouvoir être démontré." body="Chaque compétence relie un objectif, des missions, une preuve, une méthode d’évaluation, une version et un auteur."/><section className="px-5 py-16"><div className="academy-shell grid gap-5 md:grid-cols-2 lg:grid-cols-3">{SKILLS.map(s=><SkillCard key={s.slug} skill={s}/>)}</div></section></main>}
