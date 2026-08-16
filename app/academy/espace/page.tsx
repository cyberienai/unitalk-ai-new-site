import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { ArrowRight, Award, BookOpen, Check, ChevronRight, Clock3, FileCheck2, GraduationCap, LayoutDashboard, LockKeyhole, MessageCircle, Network, Play, Sparkles, Target } from 'lucide-react'
import { academyMission, academyPath, MISSIONS, PATHS } from '@/lib/academy-catalog'
import { decodeSession, initials, SESSION_COOKIE } from '@/lib/mock-auth'

export const metadata: Metadata = { title: 'Mon espace Academy', robots: { index: false, follow: false } }

type SearchParams = Promise<{ mission?: string; parcours?: string; network?: string }>

const navigation = [
  ['Vue d’ensemble', LayoutDashboard],
  ['Mes missions', Target],
  ['Mes parcours', BookOpen],
  ['Mes preuves', FileCheck2],
  ['Compétences', Award],
] as const

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  const store = await cookies()
  const session = decodeSession(store.get(SESSION_COOKIE)?.value)
  const selectedMission = params.mission ? academyMission(params.mission) : undefined
  const selectedPath = params.parcours ? academyPath(params.parcours) : undefined
  const query = new URLSearchParams()
  if (params.mission) query.set('mission', params.mission)
  if (params.parcours) query.set('parcours', params.parcours)
  if (params.network) query.set('network', params.network)
  const redirect = query.size ? `/academy/espace?${query.toString()}` : '/academy/espace'

  if (!session) {
    return (
      <main className="academy-space-login">
        <div className="academy-space-login-grid" aria-hidden="true" />
        <div className="academy-space-shell academy-space-login-layout">
          <section>
            <p className="academy-space-eyebrow">Votre espace d’apprentissage</p>
            <h1>Vos missions.<br /><em>Vos preuves.</em><br />Votre progression.</h1>
            <p>Retrouvez tout ce que vous apprenez et surtout ce que vous avez réellement accompli.</p>
            <Link href={`/connexion?redirect=${encodeURIComponent(redirect)}`}>Se connecter avec Unitalk <ArrowRight /></Link>
            <span><LockKeyhole /> Un seul compte pour Unitalk et Academy</span>
          </section>
          <DashboardPreview selection={selectedMission?.title ?? selectedPath?.title} />
        </div>
      </main>
    )
  }

  const firstName = session.firstName || session.name.split(' ')[0] || 'Membre'
  const activeMission = selectedMission ?? MISSIONS[0]
  const activePath = selectedPath ?? PATHS.find(path => path.missionSlugs.includes(activeMission.slug)) ?? PATHS[0]
  const completedSteps = 2
  const progress = Math.round((completedSteps / activeMission.steps.length) * 100)

  return (
    <main className="academy-space-dashboard">
      <div className="academy-space-shell academy-space-layout">
        <aside className="academy-space-sidebar">
          <div className="academy-space-profile">
            <span>{initials(session.name || firstName)}</span>
            <div><strong>{session.name || firstName}</strong><small>Apprenant Academy</small></div>
          </div>
          <nav aria-label="Navigation de mon espace">
            {navigation.map(([label, Icon], index) => <a key={label} href={`#${index === 0 ? 'dashboard' : label.toLowerCase().replaceAll(' ', '-')}`} className={index === 0 ? 'active' : ''}><Icon aria-hidden="true" />{label}</a>)}
          </nav>
          <div className="academy-space-sidebar-network"><Network /><small>Mon Network</small><strong>Entrepreneuriat</strong><Link href="/academy/networks/entrepreneuriat">Ouvrir <ChevronRight /></Link></div>
          <Link className="academy-space-help" href="mailto:academy@unitalk.fr"><MessageCircle />Besoin d’aide ?</Link>
        </aside>

        <div className="academy-space-main" id="dashboard">
          <header className="academy-space-welcome">
            <div><p>Vendredi 14 août</p><h1>Bonjour {firstName},<br /><em>on continue ?</em></h1></div>
            <Link href="/academy/missions">Trouver une mission <ArrowRight /></Link>
          </header>

          {(selectedMission || selectedPath || params.network) && <div className="academy-space-selection"><Sparkles /><p><strong>Votre sélection a bien été ajoutée.</strong><span>{selectedMission?.title ?? selectedPath?.title ?? `Network ${params.network}`}</span></p><Check /></div>}

          <section className="academy-space-active">
            <div className="academy-space-section-title"><div><span>À reprendre</span><h2>Votre mission en cours</h2></div><Link href={`/academy/missions/${activeMission.slug}`}>Voir la fiche <ArrowRight /></Link></div>
            <article className="academy-space-mission">
              <div className="academy-space-mission-main">
                <div className="academy-space-mission-label"><span>En cours</span><p><Clock3 />{activeMission.duration} · {activeMission.level}</p></div>
                <h3>{activeMission.title}</h3>
                <p>{activeMission.result}</p>
                <div className="academy-space-progress"><div><span>Progression</span><strong>{progress}%</strong></div><i><span style={{ width: `${progress}%` }} /></i><small>Étape {completedSteps + 1} sur {activeMission.steps.length} · {activeMission.steps[completedSteps]}</small></div>
                <Link href={`/academy/missions/${activeMission.slug}`}><Play fill="currentColor" />Reprendre la mission</Link>
              </div>
              <div className="academy-space-deliverable"><FileCheck2 /><small>Livrable attendu</small><strong>{activeMission.deliverable}</strong><span>Brouillon enregistré aujourd’hui à 10:42</span></div>
            </article>
          </section>

          <section className="academy-space-stats" aria-label="Résumé de votre progression">
            <article><span>01</span><strong>Mission</strong><p>en cours</p><Target /></article>
            <article><span>02</span><strong>Preuves</strong><p>déposées</p><FileCheck2 /></article>
            <article><span>03</span><strong>Compétences</strong><p>en progression</p><Award /></article>
          </section>

          <div className="academy-space-columns">
            <section className="academy-space-path">
              <div className="academy-space-section-title"><div><span>Mon parcours</span><h2>{activePath.title}</h2></div><strong>{activePath.missionSlugs.length} étapes</strong></div>
              <ol>{activePath.missionSlugs.map((slug, index) => { const mission = academyMission(slug); const done = index === 0 && mission?.slug !== activeMission.slug; const current = mission?.slug === activeMission.slug; return <li key={slug} className={current ? 'current' : ''}><span>{done ? <Check /> : String(index + 1).padStart(2, '0')}</span><div><strong>{mission?.title}</strong><small>{done ? 'Terminée · Preuve validée' : current ? 'En cours' : 'À venir'}</small></div>{current && <Play fill="currentColor" />}</li>})}</ol>
              <Link href={`/academy/parcours/${activePath.slug}`}>Voir tout le parcours <ArrowRight /></Link>
            </section>

            <aside className="academy-space-alma">
              <div className="academy-space-alma-orbit"><Sparkles /></div>
              <span>Alma · Guide Academy</span>
              <h2>Besoin d’un coup de pouce ?</h2>
              <p>Je peux vous aider à clarifier votre prochaine étape, relire votre méthode ou préparer votre preuve.</p>
              <button type="button">Demander à Alma <ArrowRight /></button>
              <small>Alma ne réalise pas la mission à votre place.</small>
            </aside>
          </div>

          <section className="academy-space-activity">
            <div className="academy-space-section-title"><div><span>Activité récente</span><h2>Vos dernières avancées</h2></div></div>
            <div>
              <article><span><FileCheck2 /></span><p><strong>Preuve déposée</strong><small>Grille de veille v1 · Il y a 2 jours</small></p><b>À évaluer</b></article>
              <article><span><Award /></span><p><strong>Compétence débloquée</strong><small>Vérifier et citer ses sources · Il y a 5 jours</small></p><ChevronRight /></article>
              <article><span><GraduationCap /></span><p><strong>Parcours rejoint</strong><small>{activePath.title} · Il y a 1 semaine</small></p><ChevronRight /></article>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

function DashboardPreview({ selection }: { selection?: string }) {
  return <aside className="academy-space-preview"><div className="academy-space-preview-top"><span>Mon espace</span><i /><i /><i /></div><div className="academy-space-preview-body"><p>Bonjour Patrick,</p><h2>Continuez à construire<br />vos preuves.</h2>{selection && <div className="academy-space-preview-selection"><Sparkles />{selection}</div>}<article><small>Mission en cours</small><strong>Construire une veille concurrentielle fiable</strong><div><i><span /></i><b>40%</b></div><button>Reprendre <Play fill="currentColor" /></button></article><div className="academy-space-preview-stats"><span><strong>01</strong>Mission</span><span><strong>02</strong>Preuves</span><span><strong>03</strong>Compétences</span></div></div></aside>
}
