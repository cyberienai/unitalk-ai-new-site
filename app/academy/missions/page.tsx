import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowDown, ArrowRight, Clock3, FileCheck2, Sparkles } from 'lucide-react'
import { MISSIONS, NETWORKS } from '@/lib/academy-catalog'

export const metadata: Metadata = { title: 'Missions d’apprentissage' }

type SearchParams = Promise<{ gratuit?: string; secteur?: string; q?: string }>

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  const query = params.q?.toLocaleLowerCase('fr')
  const missions = MISSIONS.filter(mission =>
    (params.gratuit !== '1' || mission.free) &&
    (!params.secteur || mission.sector === params.secteur) &&
    (!query || `${mission.title} ${mission.result} ${mission.deliverable}`.toLocaleLowerCase('fr').includes(query))
  )
  const allSelected = !params.gratuit && !params.secteur && !query

  return (
    <main className="academy-missions-page">
      <section className="academy-missions-hero">
        <div className="academy-missions-hero-grid" aria-hidden="true" />
        <div className="academy-missions-orbit" aria-hidden="true"><span>Faire</span><span>Apprendre</span></div>
        <div className="academy-missions-shell academy-missions-hero-layout">
          <div className="academy-missions-hero-copy">
            <p className="academy-missions-eyebrow"><span>Unitalk Academy</span><span>Catalogue 2026</span></p>
            <h1>Apprenez<br />en <em>faisant.</em></h1>
            <p className="academy-missions-lede">Pas de cours à regarder passivement. Choisissez un défi réel, produisez un livrable concret et faites évaluer votre méthode.</p>
            <a href="#catalogue" className="academy-missions-explore">Explorer les missions <ArrowDown /></a>
          </div>

          <aside className="academy-missions-manifesto">
            <div className="academy-missions-manifesto-number">01</div>
            <Sparkles aria-hidden="true" />
            <blockquote>« Une compétence n’existe que lorsqu’elle produit une preuve. »</blockquote>
            <div className="academy-missions-manifesto-facts">
              <span><strong>{MISSIONS.length}</strong>Missions</span>
              <span><strong>{NETWORKS.length}</strong>Secteurs</span>
              <span><strong>3</strong>Gratuites</span>
            </div>
          </aside>
        </div>
      </section>

      <section id="catalogue" className="academy-missions-catalogue">
        <div className="academy-missions-shell">
          <header className="academy-missions-catalogue-head">
            <div>
              <p className="academy-missions-section-label">Choisir son terrain</p>
              <h2>Des missions.<br />Des preuves.</h2>
            </div>
            <p>Filtrez par secteur, puis choisissez le résultat que vous voulez savoir produire.</p>
          </header>

          <nav className="academy-missions-filters" aria-label="Filtrer les missions">
            <Link href="/academy/missions" aria-current={allSelected ? 'page' : undefined} className={`academy-missions-filter ${allSelected ? 'academy-missions-filter-active' : ''}`}>Toutes <span>{MISSIONS.length}</span></Link>
            <Link href="/academy/missions?gratuit=1" aria-current={params.gratuit === '1' ? 'page' : undefined} className={`academy-missions-filter academy-missions-filter-free ${params.gratuit === '1' ? 'academy-missions-filter-active' : ''}`}>Gratuites <span>{MISSIONS.filter(mission => mission.free).length}</span></Link>
            {NETWORKS.map(network => (
              <Link key={network.id} href={`/academy/missions?secteur=${network.id}`} aria-current={params.secteur === network.id ? 'page' : undefined} className={`academy-missions-filter ${params.secteur === network.id ? 'academy-missions-filter-active' : ''}`}>
                <i style={{ backgroundColor: network.color }} />{network.name}
              </Link>
            ))}
          </nav>

          <div className="academy-missions-result-bar">
            <p><span>{String(missions.length).padStart(2, '0')}</span> mission{missions.length > 1 ? 's' : ''} disponible{missions.length > 1 ? 's' : ''}</p>
            <span>Un résultat concret à chaque mission</span>
          </div>

          {missions.length > 0 ? (
            <div className="academy-missions-grid">
              {missions.map((mission, index) => {
                const sector = NETWORKS.find(network => network.id === mission.sector)
                return (
                  <article key={mission.slug} className="academy-mission-card" style={{ '--mission-color': sector?.color } as React.CSSProperties}>
                    <div className="academy-mission-card-top">
                      <span className="academy-mission-index">{String(index + 1).padStart(2, '0')}</span>
                      <div className="academy-mission-badges">
                        <span><i />{sector?.name}</span>
                        {mission.free && <strong>Gratuit</strong>}
                      </div>
                    </div>
                    <div className="academy-mission-card-body">
                      <h3>{mission.title}</h3>
                      <p>{mission.result}</p>
                    </div>
                    <div className="academy-mission-output">
                      <FileCheck2 aria-hidden="true" />
                      <span><small>Votre livrable</small>{mission.deliverable}</span>
                    </div>
                    <footer>
                      <p><Clock3 aria-hidden="true" />{mission.duration}<span />{mission.level}</p>
                      <Link href={`/academy/missions/${mission.slug}`} aria-label={`Voir la mission : ${mission.title}`}><span>Voir la mission</span><ArrowRight aria-hidden="true" /></Link>
                    </footer>
                  </article>
                )
              })}
            </div>
          ) : (
            <div className="academy-missions-empty">
              <span>00</span><h3>Aucune mission sur ce terrain.</h3><p>Essayez un autre secteur ou affichez tout le catalogue.</p><Link href="/academy/missions">Voir toutes les missions <ArrowRight /></Link>
            </div>
          )}
        </div>
      </section>

      <section className="academy-missions-cta">
        <div className="academy-missions-shell">
          <p>Vous ne savez pas par où commencer ?</p>
          <h2>Commencez petit.<br /><em>Repartez avec du concret.</em></h2>
          <Link href="/academy/missions?gratuit=1">Découvrir les missions gratuites <ArrowRight /></Link>
        </div>
      </section>
    </main>
  )
}
