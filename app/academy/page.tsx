import Link from 'next/link'
import {
  ArrowDown,
  ArrowRight,
  Check,
  Clock3,
  FileCheck2,
  Sparkles,
} from 'lucide-react'
import { MISSIONS, NETWORKS } from '@/lib/academy-catalog'
import { AcademyAlmaHero } from '@/components/academy/academy-alma-hero'

const featuredMission = MISSIONS[0]
const freeMissions = MISSIONS.filter(mission => mission.free)

const steps = [
  {
    number: '01',
    title: 'Partez d’une mission réelle.',
    body: 'Choisissez un problème qu’une entreprise veut vraiment résoudre. Pas un exercice inventé pour le cours.',
    note: '5 min pour démarrer',
  },
  {
    number: '02',
    title: 'Créez le Collaborateur IA.',
    body: 'Formalisez son rôle, ses compétences, ses outils, ses règles et les décisions qui restent humaines.',
    note: '1 création testable',
  },
  {
    number: '03',
    title: 'Testez, présentez, vendez.',
    body: 'Prouvez sa valeur sur des cas réels, apprenez à cadrer l’offre, puis commercialisez-la avec la licence Co-créateur.',
    note: '1 offre présentable',
  },
]

export default function AcademyPage() {
  return (
    <main className="academy-home">
      <section className="academy-home-hero">
        <div className="academy-home-orbit" aria-hidden="true">
          <span>MISSION</span><span>PRATIQUE</span><span>PREUVE</span>
        </div>
        <div className="academy-home-shell academy-home-hero-grid">
          <div className="academy-home-hero-copy">
            <p className="academy-home-eyebrow"><span>Le métier de Co-créateur IA</span><span>2026</span></p>
            <h1>Formez-vous.<br/>Créez.<br/><em>Commercialisez.</em></h1>
            <p className="academy-home-lede">Créez vos propres Collaborateurs IA à partir d’une mission réelle, puis apprenez à les proposer à des clients avec la licence Co-créateur.</p>
            <div className="academy-home-actions">
              <Link href="/academy/parcours-gratuits/premiere-mission-ia" className="academy-home-primary">Commencer ma première mission<ArrowRight/></Link>
              <Link href="/academy/formations/co-createur-ia" className="academy-home-scroll">Découvrir le métier<ArrowDown/></Link>
            </div>
          </div>

          <div className="academy-home-brief-wrap">
            <div className="academy-home-brief-shadow" aria-hidden="true"/>
            <article className="academy-home-brief">
              <div className="academy-home-brief-top">
                <span>Brief de mission</span><span className="academy-home-live"><i/>Ouverte</span>
              </div>
              <div className="academy-home-brief-number">M—001</div>
              <p className="academy-home-brief-sector">{NETWORKS.find(network => network.id === featuredMission.sector)?.name} / Intermédiaire</p>
              <h2>{featuredMission.title}</h2>
              <p className="academy-home-brief-result">{featuredMission.result}</p>
              <dl>
                <div><dt><Clock3/>Temps estimé</dt><dd>{featuredMission.duration}</dd></div>
                <div><dt><FileCheck2/>À produire</dt><dd>{featuredMission.deliverable}</dd></div>
              </dl>
              <Link href={`/academy/missions/${featuredMission.slug}`}>Ouvrir le brief<ArrowRight/></Link>
            </article>
            <p className="academy-home-handnote">Votre première mission<br/>est gratuite <span>↗</span></p>
          </div>
        </div>
        <div className="academy-home-proofbar">
          <div className="academy-home-shell">
            <p><strong>1</strong><span>mission réelle pour partir</span></p>
            <p><strong>1</strong><span>Collaborateur IA à créer</span></p>
            <p><strong>1</strong><span>offre à présenter</span></p>
            <p className="academy-home-proofquote">“On apprend plus vite quand<br/>quelqu’un attend le résultat.”</p>
          </div>
        </div>
      </section>

      <AcademyAlmaHero title="Votre première mission ne commence pas par un formulaire." body="Expliquez à Alma ce que vous voulez accomplir. Elle personnalise votre point de départ, puis vous retrouvez vos formations dans le même compte Unitalk." cta="Commencer l’onboarding avec Alma" />

      <section id="methode" className="academy-home-method">
        <div className="academy-home-shell">
          <header className="academy-home-section-head">
            <p>La méthode Unitalk</p>
            <h2>De la mission<br/><em>au premier client.</em></h2>
            <span>La formation n’est pas le produit final. Le produit final est un Collaborateur IA utile, testable et commercialisable.</span>
          </header>
          <div className="academy-home-steps">
            {steps.map((step, index) => (
              <article key={step.number}>
                <div className="academy-home-step-index"><span>{step.number}</span>{index < steps.length - 1 && <i/>}</div>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                  <small><Check/>{step.note}</small>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="academy-home-missions">
        <div className="academy-home-shell">
          <header className="academy-home-mission-head">
            <div><p>Point de départ</p><h2>Trois problèmes.<br/>Une création réelle.</h2></div>
            <p>Commencez gratuitement par un besoin que vous comprenez.<br/>Transformez ensuite la méthode en Collaborateur IA.</p>
          </header>
          <div className="academy-home-card-grid">
            {freeMissions.map((mission, index) => {
              const network = NETWORKS.find(item => item.id === mission.sector)
              return (
                <Link href={`/academy/missions/${mission.slug}`} className="academy-home-card" key={mission.slug} style={{'--card-accent': network?.color} as React.CSSProperties}>
                  <div className="academy-home-card-top"><span>0{index + 1}</span><Sparkles/><b>Gratuit</b></div>
                  <p>{network?.name}</p>
                  <h3>{mission.title}</h3>
                  <div className="academy-home-card-output"><small>Votre livrable</small><strong>{mission.deliverable}</strong></div>
                  <footer><span>{mission.duration} · {mission.level}</span><i><ArrowRight/></i></footer>
                </Link>
              )
            })}
          </div>
          <Link href="/academy/missions" className="academy-home-all">Explorer les 6 missions <ArrowRight/></Link>
        </div>
      </section>

      <section className="academy-home-final">
        <div className="academy-home-final-grid" aria-hidden="true"/>
        <div className="academy-home-shell">
          <p className="academy-home-final-kicker">Le meilleur moment pour apprendre est avant de tout savoir</p>
          <h2>Ne préparez pas votre projet<br/>pendant six mois.</h2>
          <p className="academy-home-final-script">Commencez par une mission.</p>
          <Link href="/academy/parcours-gratuits/premiere-mission-ia">Créer mon premier Collaborateur IA<ArrowRight/></Link>
          <small>Gratuit · Sans carte bancaire · Commencez en 5 minutes</small>
        </div>
      </section>
    </main>
  )
}
