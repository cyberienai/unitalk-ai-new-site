import type { Metadata } from 'next'
import { AcademyHero } from '@/components/academy/academy-ui'
import { SkillCard } from '@/components/academy/catalog-cards'
import { SKILLS } from '@/lib/academy-catalog'
export const metadata:Metadata={title:'Compétences évaluées'}
export default function Page(){return <main><AcademyHero kicker="Compétences" title="Montrez ce que vous savez faire." body="Une compétence se construit dans une mission et se démontre par une preuve."/><section className="border-t border-[#d8d0c2] bg-[#fffdf9] px-5 py-12"><div className="academy-reading academy-list">{SKILLS.map(s=><SkillCard key={s.slug} skill={s}/>)}</div></section></main>}
