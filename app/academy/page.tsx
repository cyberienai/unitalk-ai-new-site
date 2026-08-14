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

const featuredMission = MISSIONS[0]
const freeMissions = MISSIONS.filter(mission => mission.free)

const steps = [
  {
    number: '01',
    title: 'Choisissez un vrai problème.',
    body: 'Pas de cours abstrait. Vous partez d’une mission cadrée, proche du travail réel.',
    note: '5 min pour démarrer',
  },
  {
    number: '02',
    title: 'Construisez avec l’IA.',
    body: 'Une méthode, des étapes et des sources vous guident jusqu’au livrable final.',
    note: '2 à 4 h de pratique',
  },
  {
    number: '03',
    title: 'Repartez avec une preuve.',
    body: 'Votre travail est relu selon des critères explicites. Vous savez ce que vous maîtrisez.',
    note: '1 livrable validé',
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
            <p className="academy-home-eyebrow"><span>Nouvelle manière d’apprendre</span><span>2026</span></p>
            <h1>Ne suivez plus<br/>de cours.<br/><em>Faites le travail.</em></h1>
            <p className="academy-home-lede">L’Academy où l’on apprend l’IA comme on apprend un métier&nbsp;: en accomplissant des missions concrètes, évaluées et utiles.</p>
            <div className="academy-home-actions">
              <Link href="/academy/missions?gratuit=1" className="academy-home-primary">Choisir une mission<ArrowRight/></Link>
              <Link href="#methode" className="academy-home-scroll">Découvrir la méthode<ArrowDown/></Link>
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
            <p><strong>6</strong><span>missions concrètes</span></p>
            <p><strong>3</strong><span>gratuites pour commencer</span></p>
            <p><strong>100%</strong><span>orientées livrable</span></p>
            <p className="academy-home-proofquote">“Apprendre, c’est produire<br/>quelque chose qui compte.”</p>
          </div>
        </div>
      </section>

      <section id="methode" className="academy-home-method">
        <div className="academy-home-shell">
          <header className="academy-home-section-head">
            <p>La méthode Unitalk</p>
            <h2>Du premier geste<br/><em>à la preuve.</em></h2>
            <span>Une progression simple, pensée pour celles et ceux qui veulent savoir faire, pas seulement savoir.</span>
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
            <div><p>Point de départ</p><h2>Trois missions.<br/>Zéro excuse.</h2></div>
            <p>Gratuites, accessibles immédiatement.<br/>Choisissez celle qui ressemble le plus à votre quotidien.</p>
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
          <p className="academy-home-final-kicker">Votre prochaine compétence commence ici</p>
          <h2>Vous n’avez pas besoin<br/>d’un cours de plus.</h2>
          <p className="academy-home-final-script">Vous avez besoin de commencer.</p>
          <Link href="/academy/missions?gratuit=1">Trouver ma première mission<ArrowRight/></Link>
          <small>Gratuit · Sans carte bancaire · Commencez en 5 minutes</small>
        </div>
      </section>
    </main>
  )
}
