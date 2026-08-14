import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { AcademyCta, AcademyHero, AcademyKicker } from '@/components/academy/academy-ui'
import { MissionCard } from '@/components/academy/catalog-cards'
import { MISSIONS } from '@/lib/academy-catalog'

const steps = [
  ['Choisissez une mission', 'Un travail concret, avec un résultat clair et un temps défini.'],
  ['Produisez un livrable', 'Vous apprenez en faisant, avec une méthode et des sources.'],
  ['Faites valider votre travail', 'Vous repartez avec une preuve utile, pas seulement une leçon terminée.'],
]

export default function AcademyPage() {
  return <main>
    <AcademyHero
      kicker="Unitalk Academy"
      title="Apprenez l’IA en faisant un vrai travail."
      body="Choisissez une mission, produisez un résultat et faites valider ce que vous savez faire."
    />

    <section className="px-5 pb-16 text-center sm:pb-24">
      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
        <AcademyCta href="/missions?gratuit=1">Commencer gratuitement</AcademyCta>
        <Link href="/academy/parcours" className="academy-text-link px-4 py-3">Voir les parcours<ArrowRight className="size-3.5"/></Link>
      </div>
      <p className="mt-4 text-xs font-semibold text-[#857c6e]">Une première mission. Un livrable. Une preuve.</p>
    </section>

    <section className="border-y border-[#d8d0c2] bg-[#fffdf9] px-5 py-16 sm:py-24">
      <div className="academy-reading">
        <AcademyKicker>Comment ça marche</AcademyKicker>
        <p className="mt-5 text-[clamp(1.7rem,3.8vw,2.8rem)] font-semibold leading-[1.1] tracking-[-.04em]">La formation devient utile quand elle produit quelque chose.</p>
        <div className="mt-10 divide-y divide-[#d8d0c2] border-y border-[#d8d0c2]">
          {steps.map(([title, body], index) => <article key={title} className="grid grid-cols-[36px_1fr] gap-4 py-6">
            <span className="font-mono text-[10px] font-bold text-[#d10e63]">0{index + 1}</span>
            <div><h2 className="text-lg font-semibold">{title}</h2><p className="mt-1 text-sm leading-6 text-[#625b50]">{body}</p></div>
          </article>)}
        </div>
      </div>
    </section>

    <section className="px-5 py-16 sm:py-24">
      <div className="academy-reading">
        <div className="flex items-end justify-between gap-5">
          <div><AcademyKicker>Pour commencer</AcademyKicker><h2 className="mt-4 text-3xl font-semibold tracking-[-.04em]">Trois missions gratuites.</h2></div>
          <Link href="/academy/missions" className="academy-text-link hidden sm:inline-flex">Toutes les missions<ArrowRight className="size-3.5"/></Link>
        </div>
        <div className="academy-list mt-8">{MISSIONS.filter(mission => mission.free).slice(0, 3).map(mission => <MissionCard key={mission.slug} mission={mission}/>)}</div>
        <Link href="/academy/missions" className="academy-text-link mt-7 sm:hidden">Toutes les missions<ArrowRight className="size-3.5"/></Link>
      </div>
    </section>

    <section className="border-t border-[#d8d0c2] bg-[#fffdf9] px-5 py-16 text-center sm:py-24">
      <div className="academy-reading">
        <AcademyKicker>Votre prochaine étape</AcademyKicker>
        <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-semibold leading-tight tracking-[-.04em] sm:text-4xl">Commencez petit. Terminez une mission.</h2>
        <div className="mt-7"><AcademyCta href="/missions?gratuit=1">Choisir une mission</AcademyCta></div>
      </div>
    </section>
  </main>
}
