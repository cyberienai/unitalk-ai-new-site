import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check, Route } from 'lucide-react'
import { NETWORKS, PATHS } from '@/lib/academy-catalog'

export const metadata: Metadata = { title: 'Parcours professionnels' }

export default function Page() {
  return (
    <main className="academy-catalog-page academy-paths-page">
      <section className="academy-catalog-hero">
        <div className="academy-catalog-grid" aria-hidden="true" />
        <div className="academy-catalog-shell academy-catalog-hero-layout">
          <div>
            <p className="academy-catalog-eyebrow"><span>Parcours professionnels</span><span>Apprendre dans le bon ordre</span></p>
            <h1>Un cap.<br /><em>Plusieurs preuves.</em></h1>
          </div>
          <div className="academy-paths-hero-note">
            <Route aria-hidden="true" />
            <p>Chaque parcours organise quelques missions autour d’un rôle précis. Vous avancez en produisant, pas en collectionnant des heures de vidéo.</p>
            <span>{PATHS.length} parcours · {PATHS.reduce((total, path) => total + path.missionSlugs.length, 0)} missions guidées</span>
          </div>
        </div>
      </section>

      <section className="academy-paths-catalogue">
        <div className="academy-catalog-shell">
          <header className="academy-catalog-heading">
            <p>Choisissez votre direction</p>
            <h2>Progressez autour<br />d’un rôle concret.</h2>
          </header>
          <div className="academy-paths-list">
            {PATHS.map((path, index) => {
              const sector = NETWORKS.find(network => network.id === path.sector)
              return (
                <article key={path.slug} className="academy-path-card" style={{ '--catalog-color': sector?.color } as React.CSSProperties}>
                  <div className="academy-path-card-index">{String(index + 1).padStart(2, '0')}</div>
                  <div className="academy-path-card-main">
                    <div className="academy-catalog-tag"><i />{sector?.name}</div>
                    <h3>{path.title}</h3>
                    <p>{path.promise}</p>
                    <div className="academy-path-audience"><small>Pour qui ?</small>{path.audience}</div>
                  </div>
                  <div className="academy-path-card-meta">
                    <p><small>Format</small>{path.format}</p>
                    <p><small>Progression</small>{path.missionSlugs.length} mission{path.missionSlugs.length > 1 ? 's' : ''} · {path.skillSlugs.length} compétence{path.skillSlugs.length > 1 ? 's' : ''}</p>
                    <ul>
                      {['Un livrable à chaque étape', 'Des critères d’évaluation', 'Une progression structurée'].map(item => <li key={item}><Check aria-hidden="true" />{item}</li>)}
                    </ul>
                    <Link href={`/academy/parcours/${path.slug}`}>Explorer le parcours <ArrowRight aria-hidden="true" /></Link>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="academy-catalog-cta academy-paths-cta">
        <div className="academy-catalog-shell">
          <p>Pas encore prêt pour un parcours complet ?</p>
          <h2>Commencez par<br /><em>une seule mission.</em></h2>
          <Link href="/academy/missions?gratuit=1">Voir les missions gratuites <ArrowRight /></Link>
        </div>
      </section>
    </main>
  )
}
