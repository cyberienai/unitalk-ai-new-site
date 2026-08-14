import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Radio, UsersRound } from 'lucide-react'
import { MISSIONS, NETWORKS, PATHS } from '@/lib/academy-catalog'

export const metadata: Metadata = { title: 'Unitalk Networks par secteur' }

export default function Page() {
  return (
    <main className="academy-catalog-page academy-networks-page">
      <section className="academy-catalog-hero academy-networks-hero">
        <div className="academy-catalog-grid" aria-hidden="true" />
        <div className="academy-networks-radar" aria-hidden="true"><i /><i /><i /></div>
        <div className="academy-catalog-shell academy-catalog-hero-layout">
          <div>
            <p className="academy-catalog-eyebrow"><span>Unitalk Networks</span><span>{NETWORKS.length} communautés métier</span></p>
            <h1>Votre métier.<br /><em>Votre réseau.</em></h1>
          </div>
          <div className="academy-networks-intro">
            <Radio aria-hidden="true" />
            <p>Retrouvez les personnes qui rencontrent les mêmes problèmes, partagent leurs méthodes et construisent les compétences de votre secteur.</p>
            <Link href="#secteurs">Trouver mon secteur <ArrowRight /></Link>
          </div>
        </div>
      </section>

      <section id="secteurs" className="academy-networks-catalogue">
        <div className="academy-catalog-shell">
          <header className="academy-catalog-heading">
            <p>La carte des communautés</p>
            <h2>Apprenez avec<br />les gens du métier.</h2>
          </header>
          <div className="academy-networks-grid">
            {NETWORKS.map((network, index) => {
              const missionCount = MISSIONS.filter(mission => mission.sector === network.id).length
              const pathCount = PATHS.filter(path => path.sector === network.id).length
              return (
                <Link key={network.id} href={`/academy/networks/${network.id}`} className="academy-network-card" style={{ '--catalog-color': network.color } as React.CSSProperties}>
                  <div className="academy-network-card-top"><span>{String(index + 1).padStart(2, '0')}</span><i /></div>
                  <div className="academy-network-symbol" aria-hidden="true"><span /><span /></div>
                  <h3>{network.name}</h3>
                  <strong>{network.tagline}</strong>
                  <p>{network.description}</p>
                  <div className="academy-network-stats">
                    <span><UsersRound aria-hidden="true" />{network.members}</span>
                    <span>{missionCount} mission{missionCount > 1 ? 's' : ''} · {pathCount} parcours</span>
                  </div>
                  <footer><span>{network.events}</span><strong>Explorer <ArrowRight /></strong></footer>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="academy-network-principle">
        <div className="academy-catalog-shell">
          <span>Le principe</span>
          <blockquote>« Les meilleures méthodes ne descendent pas d’un cours. Elles remontent du terrain. »</blockquote>
          <p>Chaque Network relie apprentissage, pratique et transmission entre pairs.</p>
        </div>
      </section>
    </main>
  )
}
