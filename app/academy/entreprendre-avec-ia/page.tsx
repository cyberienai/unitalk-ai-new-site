import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { AcademyCta, AcademyHero, AcademyKicker } from '@/components/academy/academy-ui'

export const metadata: Metadata = {
  title: 'Entreprendre à l’ère de l’IA',
  description: 'Concevez une micro-entreprise augmentée par l’IA sans confondre autonomie, valeur, responsabilité et revenus.',
  alternates: { canonical: '/academy/entreprendre-avec-ia' },
}

const sectors = [
  ['Création de contenu', 'Transformer une expertise en système de recherche, production et distribution.'],
  ['Développement logiciel', 'Concevoir et maintenir un produit avec des capacités IA sous contrôle humain.'],
  ['E-commerce', 'Coordonner catalogue, service client et opérations sans perdre la relation.'],
  ['Conseil', 'Industrialiser une méthode tout en conservant le jugement de l’expert.'],
]

const principles = [
  ['Temps humain', 'Choisir, cadrer, décider et apprendre.'],
  ['Capacités IA', 'Exécuter, amplifier et rendre une méthode réutilisable.'],
  ['Risque de banalisation', 'Quand l’exécution devient accessible, la méthode, la marque et la confiance comptent davantage.'],
]

export default function EntrepreneurshipVisionPage() {
  return <main>
    <AcademyHero
      kicker="Entreprendre avec l’IA"
      title="Une personne peut désormais piloter la capacité d’une équipe."
      body="L’IA déplace l’effort: moins d’exécution répétitive, davantage de direction, de validation et de relation."
    />

    <section className="border-y border-[#d8d0c2] bg-[#fffdf9] px-5 py-16 sm:py-24">
      <div className="academy-reading">
        <AcademyKicker>L’idée essentielle</AcademyKicker>
        <h2 className="mt-5 text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.08] tracking-[-.045em]">Le revenu peut se découpler du temps. La responsabilité, non.</h2>
        <div className="mt-10 divide-y divide-[#d8d0c2] border-y border-[#d8d0c2]">{principles.map(([title,body])=><article key={title} className="py-6"><h3 className="text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-7 text-[#625b50]">{body}</p></article>)}</div>
      </div>
    </section>

    <section className="px-5 py-16 sm:py-24"><div className="academy-reading"><AcademyKicker>Ce qui reste profondément humain</AcademyKicker><h2 className="mt-5 text-3xl font-semibold leading-tight tracking-[-.04em]">Vision, relation, gouvernance et originalité.</h2><p className="mt-5 text-[17px] leading-8 text-[#4e483f]">Une entreprise augmentée n’est pas une entreprise sans humain. L’entrepreneur choisit le problème, comprend ses clients, fixe les règles et assume les décisions qui engagent son activité.</p></div></section>

    <section className="border-y border-[#d8d0c2] bg-[#fffdf9] px-5 py-16"><div className="academy-reading"><AcademyKicker>Choisir un terrain</AcademyKicker><div className="mt-6 divide-y divide-[#d8d0c2] border-y border-[#d8d0c2]">{sectors.map(([title,body])=><article key={title} className="py-6"><h2 className="text-xl font-semibold">{title}</h2><p className="mt-2 text-sm leading-7 text-[#625b50]">{body}</p><Link href={`/academy/missions?q=${encodeURIComponent(title)}`} className="academy-text-link mt-3">Explorer les missions<ArrowRight className="size-3.5"/></Link></article>)}</div></div></section>

    <section className="px-5 py-16 text-center sm:py-24"><div className="academy-reading"><AcademyKicker>Commencer</AcademyKicker><h2 className="mx-auto mt-5 max-w-2xl text-3xl font-semibold leading-tight tracking-[-.04em]">Ne commencez pas par automatiser toute l’entreprise. Commencez par une mission utile.</h2><div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"><AcademyCta href="/missions?gratuit=1">Explorer les missions gratuites</AcademyCta><AcademyCta href="/parcours/entreprendre-avec-ia" secondary>Voir le parcours</AcademyCta></div><p className="mx-auto mt-6 max-w-xl text-xs leading-5 text-[#857c6e]">Les revenus ne sont jamais garantis. Ils dépendent de la valeur de l’offre, de l’exécution, du marché et de la confiance obtenue.</p></div></section>
  </main>
}
