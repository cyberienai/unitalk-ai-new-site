import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check, HelpCircle, ShieldCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Tarifs',
  description: 'Commencez gratuitement par une mission réelle, suivez la formation Co-créateur puis créez et publiez avec la licence Unitalk.',
}

const offers = [
  {
    name: 'Découverte',
    eyebrow: 'Pour commencer',
    price: '0 €',
    cadence: 'sans carte bancaire',
    description: 'Cadrez une mission réelle et préparez votre premier Collaborateur IA.',
    features: ['Parcours guidé de 60 minutes', '3 missions ouvertes', 'Premier Collaborateur IA cadré', 'Sans carte bancaire'],
    cta: 'Commencer gratuitement',
    href: '/academy/onboarding',
  },
  {
    name: 'Formation Co-créateur',
    eyebrow: 'Pour exercer le métier',
    price: 'Sur devis',
    cadence: 'selon le parcours choisi',
    description: 'Créez un Collaborateur IA opérationnel et apprenez à présenter puis vendre votre offre.',
    features: ['Mission réelle accompagnée', 'Collaborateur IA et application métier', 'Tests et démonstration commerciale', 'Préparation à la publication'],
    cta: 'Voir la formation',
    href: '/academy/formations/co-createur-ia',
    featured: true,
  },
  {
    name: 'Équipe',
    eyebrow: 'Pour les entreprises',
    price: 'Sur mesure',
    cadence: 'à partir de vos besoins',
    description: 'Formez vos équipes à créer des Collaborateurs IA à partir de vos méthodes et missions.',
    features: ['Cadrage des missions', 'Parcours et créations internes', 'Animation de cohortes', 'Étude des financements mobilisables'],
    cta: 'Parler de votre projet',
    href: 'mailto:academy@unitalk.fr?subject=Projet%20Academy%20pour%20mon%20équipe',
  },
]

const questions = [
  ['Puis-je commencer gratuitement ?', 'Oui. Le parcours Première mission vous aide à cadrer votre premier Collaborateur IA sans carte bancaire. Trois missions ouvertes sont aussi disponibles.'],
  ['Pourquoi la formation est-elle sur devis ?', 'Le prix dépend de la mission, du niveau d’accompagnement, de l’évaluation et du nombre de participants. Vous connaissez le montant avant toute inscription.'],
  ['La licence Co-créateur est-elle incluse ?', 'La formation et la licence sont deux éléments distincts. La formation apprend le métier. La licence, facturée 50 € par mois et par Co-créateur, donne les droits de créer, versionner et publier dans Unitalk AI. La formation Hermes est incluse avec cette licence.'],
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
          <h1>Commencez par le travail.<br /><em>Payez pour aller plus loin.</em></h1>
          <p className="academy-pricing-lede">Cadrez gratuitement une première mission. Investissez dans l’accompagnement quand vous êtes prêt à construire, tester et commercialiser.</p>
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
           <div className="mt-8 grid gap-6 border border-[#d8d0c2] bg-[#181512] p-7 text-[#f8f1e7] sm:p-9 lg:grid-cols-[1fr_auto] lg:items-end">
             <div><span className="font-mono text-[10px] font-bold uppercase tracking-[.16em] text-[#f2a4c5]">Après la formation</span><h3 className="mt-4 text-3xl font-semibold tracking-[-.04em]">Publiez avec la licence Co-créateur.</h3><p className="mt-4 max-w-2xl text-sm leading-7 text-[#cfc6b8]">La formation vous apprend le métier. La licence produit, à 50 € par mois et par Co-créateur, donne accès à la création, au versionnage et à la publication dans Unitalk AI. La formation Hermes est incluse avec cette licence.</p></div>
             <Link href="/co-createur-ia" className="academy-button academy-button-primary">Comprendre la licence <ArrowRight /></Link>
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
