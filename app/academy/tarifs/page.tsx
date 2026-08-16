import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check, HelpCircle, ShieldCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Tarifs',
  description: 'Les tarifs Unitalk Academy pour apprendre par la pratique, rejoindre un parcours ou former une équipe.',
}

const offers = [
  {
    name: 'Découverte',
    eyebrow: 'Pour commencer',
    price: '0 €',
    cadence: 'sans carte bancaire',
    description: 'Testez la méthode Academy et produisez votre premier livrable concret.',
    features: ['3 missions ouvertes', 'Parcours Première mission IA', 'Livrables exportables', 'Accès aux communautés métier'],
    cta: 'Commencer gratuitement',
    href: '/academy/missions?gratuit=1',
  },
  {
    name: 'Parcours',
    eyebrow: 'Pour progresser',
    price: 'Sur devis',
    cadence: 'selon le parcours choisi',
    description: 'Suivez une progression guidée autour d’un rôle, avec missions et évaluations.',
    features: ['Parcours métier structuré', 'Retours sur les livrables', 'Évaluations documentées', 'Progression et preuves centralisées'],
    cta: 'Choisir un parcours',
    href: '/academy/parcours',
    featured: true,
  },
  {
    name: 'Équipe',
    eyebrow: 'Pour les entreprises',
    price: 'Sur mesure',
    cadence: 'à partir de vos besoins',
    description: 'Construisez un programme ancré dans vos métiers, méthodes et règles de gouvernance.',
    features: ['Cadrage des besoins', 'Parcours et missions internes', 'Animation de cohortes', 'Étude des financements mobilisables'],
    cta: 'Parler de votre projet',
    href: 'mailto:academy@unitalk.fr?subject=Projet%20Academy%20pour%20mon%20équipe',
  },
]

const questions = [
  ['Puis-je commencer gratuitement ?', 'Oui. Trois missions et un premier parcours sont accessibles pour découvrir la méthode sans carte bancaire.'],
  ['Pourquoi les parcours sont-ils sur devis ?', 'Le prix dépend du parcours, du niveau d’accompagnement, de l’évaluation et du nombre de participants. Vous connaissez le montant avant toute inscription.'],
  ['Une prise en charge est-elle possible ?', 'Selon votre situation, certains budgets entreprise, OPCO ou fonds professionnels peuvent être mobilisables. Aucun financement n’est toutefois automatique.'],
  ['Les attestations sont-elles des certifications d’État ?', 'Non, sauf mention explicite contraire. Les preuves et attestations décrivent précisément les missions réalisées et les critères évalués.'],
]

export default function Page() {
  return (
    <main className="academy-catalog-page academy-pricing-page">
      <section className="academy-pricing-hero">
        <div className="academy-catalog-grid" aria-hidden="true" />
        <div className="academy-catalog-shell">
          <p className="academy-catalog-eyebrow"><span>Tarifs Academy</span><span>Clairs avant de commencer</span></p>
          <h1>Commencez librement.<br /><em>Investissez quand c’est utile.</em></h1>
          <p className="academy-pricing-lede">Explorez gratuitement la méthode. Pour un parcours accompagné ou un programme d’équipe, nous définissons le périmètre et le prix avant tout engagement.</p>
          <div className="academy-pricing-proof"><ShieldCheck aria-hidden="true" /> Aucun débit automatique · Aucun financement présenté comme garanti</div>
        </div>
      </section>

      <section className="academy-pricing-offers">
        <div className="academy-catalog-shell">
          <header className="academy-catalog-heading">
            <p>Trois façons d’avancer</p>
            <h2>Choisissez le niveau<br />d’accompagnement.</h2>
          </header>
          <div className="academy-pricing-grid">
            {offers.map((offer, index) => (
              <article key={offer.name} className={`academy-price-card ${offer.featured ? 'academy-price-card-featured' : ''}`}>
                {offer.featured && <span className="academy-price-recommended">Le plus structurant</span>}
                <header><span>{String(index + 1).padStart(2, '0')}</span><p>{offer.eyebrow}</p></header>
                <h3>{offer.name}</h3>
                <div className="academy-price"><strong>{offer.price}</strong><span>{offer.cadence}</span></div>
                <p className="academy-price-description">{offer.description}</p>
                <ul>{offer.features.map(feature => <li key={feature}><Check aria-hidden="true" />{feature}</li>)}</ul>
                <Link href={offer.href}>{offer.cta}<ArrowRight aria-hidden="true" /></Link>
              </article>
            ))}
          </div>
          <div className="academy-pricing-finance">
            <div><span>Financement</span><h3>Une prise en charge est peut-être mobilisable.</h3></div>
            <p>Nous vérifions les possibilités selon votre situation et le programme choisi, sans jamais promettre l’accord d’un organisme financeur.</p>
            <Link href="/academy/financement">Étudier les possibilités <ArrowRight /></Link>
          </div>
        </div>
      </section>

      <section className="academy-pricing-faq">
        <div className="academy-catalog-shell academy-pricing-faq-layout">
          <div><p>Questions fréquentes</p><h2>Avant de<br /><em>vous engager.</em></h2><HelpCircle aria-hidden="true" /></div>
          <div>{questions.map(([question, answer], index) => <article key={question}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{question}</h3><p>{answer}</p></div></article>)}</div>
        </div>
      </section>
    </main>
  )
}
