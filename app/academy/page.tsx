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
    label: 'Cadrer',
    title: 'Choisissez un travail qui compte.',
    body: 'Partez d’un problème métier réel, avec un résultat attendu et des critères de réussite clairs.',
    note: '1 brief concret',
  },
  {
    number: '02',
    label: 'Construire',
    title: 'Transformez la méthode en Collaborateur IA.',
    body: 'Formalisez son rôle, ses compétences, ses outils, ses sources et les décisions qui restent humaines.',
    note: '1 création à tester',
  },
  {
    number: '03',
    label: 'Prouver',
    title: 'Testez la valeur. Présentez l’offre.',
    body: 'Mesurez le résultat sur des cas réels, cadrez votre proposition puis commercialisez-la avec la licence Co-créateur.',
    note: '1 offre prête à présenter',
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
            <p className="academy-home-eyebrow"><span>Unitalk Academy</span><span>Apprendre par la pratique</span></p>
            <h1>Une mission.<br/>Une création.<br/><em>Une offre.</em></h1>
            <p className="academy-home-lede">Apprenez le métier de Co-créateur IA sur un cas concret : cadrez un besoin, construisez un Collaborateur IA utile et transformez la preuve en offre commerciale.</p>
            <div className="academy-home-actions">
              <Link href="/academy/onboarding" className="academy-home-primary">Choisir ma première mission<ArrowRight/></Link>
              <Link href="#methode" className="academy-home-scroll">Voir la méthode<ArrowDown/></Link>
            </div>
            <p className="academy-home-reassurance"><Check/>Gratuit pour commencer · Sans carte bancaire</p>
          </div>

          <div className="academy-home-brief-wrap">
            <div className="academy-home-brief-shadow" aria-hidden="true"/>
            <article className="academy-home-brief">
              <div className="academy-home-brief-top">
                <span>Votre point de départ</span><span className="academy-home-live"><i/>Mission gratuite</span>
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
            <p className="academy-home-handnote">Un vrai livrable.<br/>Pas un exercice. <span>↗</span></p>
          </div>
        </div>
        <div className="academy-home-proofbar">
          <div className="academy-home-shell">
            <p><strong>01</strong><span>Cadrez une mission réelle</span></p>
            <p><strong>02</strong><span>Construisez une solution testable</span></p>
            <p><strong>03</strong><span>Présentez une offre crédible</span></p>
            <p className="academy-home-proofquote">« La preuve avant<br/>la promesse. »</p>
          </div>
        </div>
      </section>

      <section id="methode" className="academy-home-method">
        <div className="academy-home-shell">
          <header className="academy-home-section-head">
            <p>La méthode Academy</p>
            <h2>Apprendre<br/><em>en produisant.</em></h2>
            <span>Vous ne suivez pas une succession de cours. Chaque étape produit une preuve concrète, réutilisable dans votre projet.</span>
          </header>
          <div className="academy-home-steps">
            {steps.map((step, index) => (
              <article key={step.number}>
                <div className="academy-home-step-index"><span>{step.number}</span>{index < steps.length - 1 && <i/>}</div>
                <div>
                  <b>{step.label}</b>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                  <small><Check/>{step.note}</small>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <AcademyAlmaHero title="Alma vous aide à trouver le bon point de départ." body="Décrivez votre expertise, votre projet ou le travail que vous voulez améliorer. Alma vous oriente vers une première mission adaptée et prépare votre parcours dans votre espace Academy." cta="Définir ma première mission" />

      <section className="academy-home-missions">
        <div className="academy-home-shell">
          <header className="academy-home-mission-head">
            <div><p>Missions ouvertes</p><h2>Choisissez votre<br/>première preuve.</h2></div>
            <p>Trois briefs gratuits, trois livrables concrets. Choisissez le problème le plus proche de votre expérience et confrontez-vous au travail réel.</p>
          </header>
          <div className="academy-home-card-grid">
            {freeMissions.map((mission, index) => {
              const network = NETWORKS.find(item => item.id === mission.sector)
              return (
                <Link href={`/academy/missions/${mission.slug}`} className="academy-home-card" key={mission.slug} style={{'--card-accent': network?.color} as React.CSSProperties}>
                  <div className="academy-home-card-top"><span>0{index + 1}</span><Sparkles/><b>Gratuit</b></div>
                  <p>{network?.name}</p>
                  <h3>{mission.title}</h3>
                  <div className="academy-home-card-output"><small>À la fin, vous repartez avec</small><strong>{mission.deliverable}</strong></div>
                  <footer><span>{mission.duration} · {mission.level}</span><i><ArrowRight/></i></footer>
                </Link>
              )
            })}
          </div>
          <Link href="/academy/missions" className="academy-home-all">Voir les 6 missions Academy <ArrowRight/></Link>
        </div>
      </section>

      <section className="academy-home-final">
        <div className="academy-home-final-grid" aria-hidden="true"/>
        <div className="academy-home-shell">
          <p className="academy-home-final-kicker">Votre première preuve peut commencer aujourd’hui</p>
          <h2>Moins de théorie.<br/>Plus de travail réel.</h2>
          <p className="academy-home-final-script">Commencez par une mission.</p>
          <Link href="/academy/onboarding">Trouver ma mission avec Alma<ArrowRight/></Link>
          <small>Première mission gratuite · Sans carte bancaire · Démarrage en 5 minutes</small>
        </div>
      </section>
    </main>
  )
}
