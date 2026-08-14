'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  Check,
  CircleUserRound,
  FileCheck2,
  Globe2,
  Mic,
  ShieldCheck,
  Square,
  Workflow,
} from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { AlmaInline } from '@/components/alma-inline'

type SpeechEvent = { results: ArrayLike<{ 0: { transcript: string } }> }
type Recognition = {
  lang: string
  continuous: boolean
  interimResults: boolean
  onresult: ((event: SpeechEvent) => void) | null
  onend: (() => void) | null
  onerror: (() => void) | null
  start: () => void
  stop: () => void
  abort: () => void
}

function speechRecognition(): (new () => Recognition) | null {
  if (typeof window === 'undefined') return null
  const browser = window as typeof window & {
    SpeechRecognition?: new () => Recognition
    webkitSpeechRecognition?: new () => Recognition
  }
  return browser.SpeechRecognition ?? browser.webkitSpeechRecognition ?? null
}

const COPY = {
  fr: {
    eyebrow: 'Une idée simple pour les entreprises capables',
    title: 'Votre savoir-faire devrait travailler même quand vous ne travaillez pas.',
    lead: 'Pas un chatbot de plus. Un Collaborateur IA qui accomplit une mission avec vos méthodes, vos outils et vos règles.',
    fieldLabel: 'Quel travail voulez-vous ne plus faire seul ?',
    placeholder: 'Ex. Préparer chaque lundi une veille concurrentielle sourcée…',
    voiceLabel: 'Dicter la mission',
    stopLabel: 'Arrêter la dictée',
    cta: 'Confier cette mission',
    free: '7 jours pour cadrer et tester · Sans carte bancaire',
    discover: 'Parler à Alma',
    thesis: 'Un logiciel vous donne un outil. Unitalk vous donne une capacité de travail.',
    thesisNote: 'La différence ne se joue pas dans une fenêtre de chat. Elle se joue dans le travail livré, les décisions documentées et les limites respectées.',
    exampleKicker: 'Exemple de mission',
    exampleTitle: 'De la demande au livrable, sans boîte noire.',
    exampleIntro: 'Une démonstration illustrative d’une veille concurrentielle hebdomadaire. Les sources, règles et validations changent selon votre entreprise.',
    exampleRequestLabel: 'Demande initiale',
    exampleRequest: 'Chaque lundi à 8 h, analysez les actualités de 12 concurrents et préparez une note sourcée pour la direction.',
    exampleSourcesLabel: 'Périmètre autorisé',
    exampleSources: 'Sites publics des concurrents, presse sectorielle et documents internes validés. Aucun envoi externe.',
    exampleWorkLabel: 'Travail exécuté',
    exampleWork: 'Collecte, dédoublonnage, comparaison avec la semaine précédente et signalement des informations incertaines.',
    exampleApprovalLabel: 'Validation humaine',
    exampleApproval: 'La responsable communication relit la synthèse et autorise sa diffusion. Sans validation, elle reste en brouillon.',
    exampleDeliverableLabel: 'Livrable',
    exampleDeliverable: 'Une note structurée avec faits, conséquences possibles, liens sources et journal des étapes.',
    exampleStatus: 'En attente de validation',
    exampleSchedule: 'Chaque lundi · 08:00',
    exampleProgress: '3 sources analysées sur 12',
    exampleUncertainty: '1 information à confirmer avant diffusion',
    exampleActivity: 'Journal d’activité',
    exampleActivityItems: ['07:58 · Mission planifiée ouverte', '08:04 · 3 nouvelles publications détectées', '08:11 · Synthèse préparée et soumise'],
    exampleDisclaimer: 'Scénario illustratif, pas un résultat client revendiqué.',
    modelKicker: 'Le modèle Unitalk',
    modelTitle: 'Vous gardez le jugement. Le système gagne en capacité.',
    humanTitle: 'Vous définissez',
    humanBody: 'Le résultat attendu, les sources autorisées et les décisions qui exigent votre validation.',
    almaTitle: 'Alma coordonne',
    almaBody: 'Alma ne réalise pas la mission. Elle la cadre, choisit les capacités et organise les validations.',
    workerTitle: 'Le Collaborateur exécute.',
    workerBody: 'Il utilise vos méthodes, produit le livrable et signale ce qu’il ne peut pas décider seul.',
    proofKicker: 'Contrôle par conception',
    proofTitle: 'Autonome sur le travail. Jamais sur vos décisions sensibles.',
    safeguards: [
      'Actions et sources autorisées définies avant exécution',
      'Validation humaine aux étapes qui engagent l’entreprise',
      'Journal clair du travail, des hypothèses et des résultats',
      'En cas de blocage, escalade vers un ingénieur IA',
    ],
    finalTitle: 'Commencez par un travail que vous connaissez par cœur.',
    finalBody: 'Décrivez-le en une phrase. Nous transformons votre savoir-faire en une mission contrôlée.',
    finalCta: 'Décrire ma première mission',
    pricing: 'Voir les tarifs',
  },
  en: {
    eyebrow: 'A simple idea for capable companies',
    title: 'Your know-how should work even when you are not working.',
    lead: 'Not another chatbot. An AI Collaborator that carries out a mission using your methods, tools and rules.',
    fieldLabel: 'What work do you no longer want to handle alone?',
    placeholder: 'E.g. Prepare a sourced competitive brief every Monday…',
    voiceLabel: 'Dictate the mission',
    stopLabel: 'Stop dictation',
    cta: 'Assign this mission',
    free: '7 days to frame and test · No credit card',
    discover: 'Talk to Alma',
    thesis: 'Software gives you a tool. Unitalk gives you work capacity.',
    thesisNote: 'The difference is not in a chat window. It is in delivered work, documented decisions and respected boundaries.',
    exampleKicker: 'Mission example',
    exampleTitle: 'From request to deliverable, without a black box.',
    exampleIntro: 'An illustrative weekly competitive monitoring demo. Sources, rules and approvals vary for each company.',
    exampleRequestLabel: 'Initial request',
    exampleRequest: 'Every Monday at 8am, review news from 12 competitors and prepare a sourced brief for leadership.',
    exampleSourcesLabel: 'Authorized scope',
    exampleSources: 'Public competitor sites, trade press and approved internal documents. No external sending.',
    exampleWorkLabel: 'Work performed',
    exampleWork: 'Collection, deduplication, comparison with the prior week and flagging of uncertain information.',
    exampleApprovalLabel: 'Human approval',
    exampleApproval: 'The communications lead reviews the brief and authorizes distribution. Without approval, it remains a draft.',
    exampleDeliverableLabel: 'Deliverable',
    exampleDeliverable: 'A structured brief with facts, possible implications, source links and an execution log.',
    exampleStatus: 'Awaiting approval',
    exampleSchedule: 'Every Monday · 8:00am',
    exampleProgress: '3 of 12 sources analyzed',
    exampleUncertainty: '1 item to confirm before distribution',
    exampleActivity: 'Activity log',
    exampleActivityItems: ['07:58 · Scheduled mission opened', '08:04 · 3 new publications detected', '08:11 · Brief prepared and submitted'],
    exampleDisclaimer: 'Illustrative scenario, not a claimed customer result.',
    modelKicker: 'The Unitalk model',
    modelTitle: 'You keep the judgment. The system gains capacity.',
    humanTitle: 'You define',
    humanBody: 'The expected outcome, authorized sources and decisions that require your approval.',
    almaTitle: 'Alma coordinates',
    almaBody: 'Alma does not carry out the mission. She frames it, selects capabilities and organizes approvals.',
    workerTitle: 'The Collaborator executes.',
    workerBody: 'It uses your methods, produces the deliverable and flags what it cannot decide alone.',
    proofKicker: 'Control by design',
    proofTitle: 'Autonomous on the work. Never on your sensitive decisions.',
    safeguards: [
      'Authorized actions and sources defined before execution',
      'Human approval at steps that commit the company',
      'Clear log of work, assumptions and outcomes',
      'When blocked, escalation to an AI engineer',
    ],
    finalTitle: 'Start with work you know by heart.',
    finalBody: 'Describe it in one sentence. We turn your know-how into a controlled mission.',
    finalCta: 'Describe my first mission',
    pricing: 'See pricing',
  },
} as const

export function PaulGrahamHero() {
  const { lang } = useLanguage()
  const t = COPY[lang]
  const router = useRouter()
  const [need, setNeed] = useState('')
  const [listening, setListening] = useState(false)
  const recognitionRef = useRef<Recognition | null>(null)
  const missionFieldRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    const SpeechRecognition = speechRecognition()
    if (!SpeechRecognition) return
    const recognition = new SpeechRecognition()
    recognition.lang = lang === 'fr' ? 'fr-FR' : 'en-US'
    recognition.continuous = false
    recognition.interimResults = true
    recognition.onresult = event => {
      let transcript = ''
      for (let index = 0; index < event.results.length; index++) transcript += event.results[index][0].transcript
      setNeed(transcript)
    }
    recognition.onend = () => setListening(false)
    recognition.onerror = () => setListening(false)
    recognitionRef.current = recognition
    return () => recognition.abort()
  }, [lang])

  function toggleListening() {
    const recognition = recognitionRef.current
    if (!recognition) return
    if (listening) {
      recognition.stop()
      return
    }
    setListening(true)
    try { recognition.start() } catch { setListening(false) }
  }

  function submit() {
    const clean = need.trim()
    if (!clean) {
      missionFieldRef.current?.focus()
      return
    }
    const draftId = `draft_${crypto.randomUUID()}`
    try { localStorage.setItem(`unitalk_mission_${draftId}`, JSON.stringify({ text: clean, createdAt: Date.now() })) } catch {}
    const query = new URLSearchParams({ source: 'paul-graham', draft: draftId })
    router.push(`/decouvrir?${query}`)
  }

  function focusMission() {
    document.getElementById('mission')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    missionFieldRef.current?.focus({ preventScroll: true })
  }

  return (
    <main className="graham-page">
      <section className="graham-hero" aria-labelledby="graham-title">
        <div className="graham-grid" aria-hidden="true" />
        <div className="graham-shell graham-hero-layout">
          <div className="graham-hero-copy">
            <p className="graham-eyebrow"><span>Unitalk / Thèse n°01</span><span>{t.eyebrow}</span></p>
            <h1 id="graham-title">{t.title}</h1>
            <p className="graham-lead">{t.lead}</p>
            <a href="#modele" className="graham-discover">{t.discover}<ArrowDown aria-hidden="true" /></a>
          </div>

          <div id="mission" className="graham-mission-wrap">
            <div className="graham-mission-shadow" aria-hidden="true" />
            <form className="graham-mission" onSubmit={event => { event.preventDefault(); submit() }}>
              <header><span>Nouvelle mission</span><span><i />Brouillon local</span></header>
              <label htmlFor="graham-need">{t.fieldLabel}</label>
              <div className="graham-input-wrap">
                <textarea
                  ref={missionFieldRef}
                  id="graham-need"
                  value={need}
                  onChange={event => setNeed(event.target.value)}
                  rows={5}
                  maxLength={600}
                  placeholder={t.placeholder}
                />
                <button type="button" onClick={toggleListening} aria-label={listening ? t.stopLabel : t.voiceLabel} aria-pressed={listening} className="graham-mic">
                  {listening ? <Square aria-hidden="true" /> : <Mic aria-hidden="true" />}
                </button>
              </div>
              <div className="graham-submit-row">
                <small>{need.length}/600</small>
                <button type="submit" className="graham-submit">{t.cta}<ArrowRight aria-hidden="true" /></button>
              </div>
              <p className="graham-free"><ShieldCheck aria-hidden="true" />{t.free}</p>
            </form>
          </div>
        </div>
      </section>

      <section className="graham-thesis" aria-label={t.thesis}>
        <div className="graham-shell">
          <p className="graham-thesis-index">01 / LA THÈSE</p>
          <blockquote>{t.thesis}</blockquote>
          <p>{t.thesisNote}</p>
        </div>
      </section>

      <section className="graham-example" aria-labelledby="graham-example-title">
        <div className="graham-shell">
          <header className="graham-example-heading">
            <p>{t.exampleKicker}</p>
            <div>
              <h2 id="graham-example-title">{t.exampleTitle}</h2>
              <span>{t.exampleIntro}</span>
            </div>
          </header>
          <div className="graham-example-board">
            <div className="graham-dossier-bar">
              <div><i aria-hidden="true" /><span>MISSION / VEILLE-001</span></div>
              <strong>{t.exampleStatus}</strong>
              <time>{t.exampleSchedule}</time>
            </div>
            <div className="graham-dossier-body">
              <div className="graham-example-brief">
                <small>{t.exampleRequestLabel}</small>
                <blockquote>{t.exampleRequest}</blockquote>
                <div><Globe2 aria-hidden="true" /><p><strong>{t.exampleSourcesLabel}</strong>{t.exampleSources}</p></div>
                <aside><span>{t.exampleProgress}</span><span>{t.exampleUncertainty}</span></aside>
              </div>
              <div className="graham-dossier-work">
                <ol className="graham-example-steps">
                  <li><span>01</span><p><strong>{t.exampleWorkLabel}</strong>{t.exampleWork}</p></li>
                  <li className="graham-example-gate"><span>02</span><p><strong>{t.exampleApprovalLabel}</strong>{t.exampleApproval}</p><ShieldCheck aria-hidden="true" /></li>
                  <li><span>03</span><p><strong>{t.exampleDeliverableLabel}</strong>{t.exampleDeliverable}</p><FileCheck2 aria-hidden="true" /></li>
                </ol>
                <div className="graham-activity">
                  <strong>{t.exampleActivity}</strong>
                  {t.exampleActivityItems.map(item => <span key={item}>{item}</span>)}
                </div>
              </div>
            </div>
          </div>
          <p className="graham-example-note">{t.exampleDisclaimer}</p>
        </div>
      </section>

      <section id="modele" className="graham-model" aria-labelledby="graham-model-title">
        <div className="graham-shell">
          <header className="graham-section-heading">
            <p>{t.modelKicker}</p>
            <h2 id="graham-model-title">{t.modelTitle}</h2>
          </header>
          <div className="graham-model-flow">
            <article>
              <span className="graham-model-icon"><CircleUserRound aria-hidden="true" /></span>
              <small>01 / Humain</small>
              <h3>{t.humanTitle}</h3>
              <p>{t.humanBody}</p>
            </article>
            <i className="graham-flow-arrow" aria-hidden="true"><ArrowRight /></i>
            <article className="graham-alma-card">
              <span className="graham-model-icon"><Workflow aria-hidden="true" /></span>
              <small>02 / Coordination</small>
              <h3><AlmaInline /> {t.almaTitle}</h3>
              <p>{t.almaBody}</p>
            </article>
            <i className="graham-flow-arrow" aria-hidden="true"><ArrowRight /></i>
            <article>
              <span className="graham-model-icon"><span aria-hidden="true">IA</span></span>
              <small>03 / Exécution</small>
              <h3>{t.workerTitle}</h3>
              <p>{t.workerBody}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="graham-proof" aria-labelledby="graham-proof-title">
        <div className="graham-shell graham-proof-layout">
          <div>
            <p className="graham-proof-kicker">{t.proofKicker}</p>
            <h2 id="graham-proof-title">{t.proofTitle}</h2>
          </div>
          <ul>
            {t.safeguards.map((item, index) => <li key={item}><span>0{index + 1}</span><p>{item}</p><Check aria-hidden="true" /></li>)}
          </ul>
        </div>
      </section>

      <section className="graham-final" aria-labelledby="graham-final-title">
        <div className="graham-final-circle" aria-hidden="true" />
        <div className="graham-shell">
          <p>Une mission. Vos règles. Un résultat.</p>
          <h2 id="graham-final-title">{t.finalTitle}</h2>
          <span>{t.finalBody}</span>
          <div>
            <button type="button" onClick={focusMission}>{t.finalCta}<ArrowRight aria-hidden="true" /></button>
            <Link href="/tarifs">{t.pricing}</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
