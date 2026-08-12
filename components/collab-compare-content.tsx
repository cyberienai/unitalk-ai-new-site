'use client'

import { useLanguage } from '@/lib/language-context'
import { ProofPill } from '@/components/ui/proof-pill'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, Check, Minus, Plus } from 'lucide-react'

const ease = [0.16, 1, 0.3, 1] as const

type Copy = {
  eyebrow: string
  trial: string
  title: { a: string; b: string; c: string }
  lead: string
  sub: string
  ctaMission: string
  ctaAlma: string
  heroProof: string[]

  waysTitle: string
  ways: { kicker: string; head: string; body: string; featured?: boolean }[]

  tableTitle: string
  colAssistant: string
  colAgent: string
  colCollab: string
  rows: { label: string; assistant: string; agent: string; collab: string }[]

  scenarioTitle: string
  scenarioQuote: string
  scenario: { head: string; body: string }[]
  scenarioSkillLabel: string
  scenarioSkill: string
  scenarioSkillTags: string[]

  changeTitle: string
  changes: { head: string; body: string }[]
  changePunch: string[]

  chooseTitle: string
  choose: { tag: string; body: string }[]

  faqTitle: string
  faq: { q: string; a: string }[]

  finalTitle: string
  finalBody: string
  finalProof: string[]
}

function useCopy(): Copy {
  const { lang } = useLanguage()

  if (lang === 'en') {
    return {
      eyebrow: 'Comparison',
    trial: '7-day trial · No credit card',
      title: { a: 'A chatbot answers.', b: 'An agent executes.', c: 'An AI Collaborator grows with your company.' },
      lead: 'It has an identity, a memory and responsibilities that last over time.',
      sub: 'It answers your visitors, works with your teams, acts in your applications and builds skills from the methods you validate.',
      ctaMission: 'Hand over a first mission',
      ctaAlma: 'Talk to Alma',
      heroProof: ['Private memory', 'Human validations', 'Data under your control'],

      waysTitle: 'Three ways to work with AI',
      ways: [
        { kicker: 'Chatbot or AI assistant', head: 'A question. An answer.', body: 'It answers, summarizes and produces content from the context provided.' },
        { kicker: 'AI agent', head: 'A goal. An execution.', body: 'It uses tools and chains actions to accomplish a defined task.' },
        { kicker: 'Unitalk AI Collaborator', head: 'Missions. Experience that stays.', body: 'It keeps its identity, works with your teams and builds skills specific to your company.', featured: true },
      ],

      tableTitle: 'The difference, point by point',
      colAssistant: 'AI assistant',
      colAgent: 'AI agent',
      colCollab: 'Unitalk AI Collaborator',
      rows: [
        { label: 'Main purpose', assistant: 'Answer', agent: 'Execute a task', collab: 'Take on missions' },
        { label: 'Identity', assistant: 'Session or account', agent: 'Tied to a function', collab: 'Persistent in the company' },
        { label: 'Memory', assistant: 'Conversation', agent: 'Tied to the tool', collab: 'Governed by the company' },
        { label: 'Methods', assistant: 'Prompt instructions', agent: 'Configured procedure', collab: 'Specific to the company' },
        { label: 'Skills', assistant: 'General', agent: 'Predefined', collab: 'Tested and versioned' },
        { label: 'Applications', assistant: 'Available connectors', agent: 'Tools the task needs', collab: 'Access controlled per mission' },
        { label: 'Collaboration', assistant: 'With a user', agent: 'For a user', collab: 'With the teams' },
        { label: 'Human validation', assistant: 'Review of the result', agent: 'Depending on configuration', collab: 'Built into sensitive decisions' },
        { label: 'Public presence', assistant: 'Conversation', agent: 'Rarely central', collab: 'Text, voice, qualification, meetings' },
        { label: 'Lasting outcome', assistant: 'An answer', agent: 'A result', collab: 'A reusable skill' },
      ],

      scenarioTitle: 'Take a concrete mission',
      scenarioQuote: '“I want every customer complaint tracked through to resolution.”',
      scenario: [
        { head: 'With an AI assistant', body: 'It drafts a procedure or a reply. The team then organizes the follow-up.' },
        { head: 'With an AI agent', body: 'It applies a predefined procedure to classify the request, reply and follow up.' },
        { head: 'With a Unitalk AI Collaborator', body: 'It consults the authorized file, classifies the complaint, prepares the reply, schedules the follow-up and updates the CRM. When a commercial gesture exceeds the defined threshold, it asks the responsible person.' },
      ],
      scenarioSkillLabel: 'The validated method can then become a lasting skill',
      scenarioSkill: 'Track a customer complaint',
      scenarioSkillTags: ['Tested', 'Validated', 'Versioned'],

      changeTitle: 'What changes with Unitalk',
      changes: [
        { head: 'An identity that remains', body: 'The same Collaborator can carry out several missions without losing its memory or its experience.' },
        { head: 'Capabilities that grow', body: 'Add job profiles, skills and applications as your company needs them.' },
        { head: 'Decisions that stay human', body: 'You define its access, its limits and the actions that require validation.' },
        { head: 'Intelligence under your control', body: 'Your data, your memory and your methods stay private by default.' },
      ],
      changePunch: ['Alma prepares.', 'The AI Collaborator carries out.', 'You validate.'],

      chooseTitle: 'Which choice for your company?',
      choose: [
        { tag: 'an AI assistant', body: 'to get answers, summaries or one-off content.' },
        { tag: 'an AI agent', body: 'to automate a defined task within a stable scope.' },
        { tag: 'a Unitalk AI Collaborator', body: 'to hand over successive missions to an identity that works with your teams and keeps the experience it gains.' },
      ],

      faqTitle: 'Frequently asked questions',
      faq: [
        { q: 'Is it just an agent with a first name?', a: 'No. Its identity links its role, its memory, its skills, its applications, its permissions and its work history.' },
        { q: 'Do you need an AI Collaborator for every mission?', a: 'No. Alma first checks whether an existing Collaborator can carry out the mission and only adds the capabilities it needs.' },
        { q: 'Can it act without validation?', a: 'Yes, within the limits your company defines. Sensitive decisions can require the approval of an authorized person.' },
        { q: 'Are our methods shared?', a: 'No. Your data and your methods stay private by default. Nothing is shared without your choice.' },
      ],

      finalTitle: 'Stop starting over with every mission.',
      finalBody: 'Create an AI Collaborator that works with your teams, acts in your applications and builds skills specific to your company.',
      finalProof: ['7 days for your first mission', 'No card', 'Hosted in France'],
    }
  }

  return {
    eyebrow: 'Comparatif',
    trial: '7 jours d’essai · Sans carte bancaire',
    title: { a: 'Un chatbot répond.', b: 'Un agent exécute.', c: 'Un Collaborateur IA progresse avec votre entreprise.' },
    lead: 'Il possède une identité, une mémoire et des responsabilités qui s’inscrivent dans la durée.',
    sub: 'Il répond à vos visiteurs, travaille avec vos équipes, agit dans vos applications et développe des compétences à partir des méthodes que vous validez.',
    ctaMission: 'Confier une première mission',
    ctaAlma: 'Parler à Alma',
    heroProof: ['Mémoire privée', 'Validations humaines', 'Données sous votre contrôle'],

    waysTitle: 'Trois manières de travailler avec l’IA',
    ways: [
      { kicker: 'Chatbot ou assistant IA', head: 'Une question. Une réponse.', body: 'Il répond, résume et produit du contenu à partir du contexte fourni.' },
      { kicker: 'Agent IA', head: 'Un objectif. Une exécution.', body: 'Il utilise des outils et enchaîne des actions pour accomplir une tâche définie.' },
      { kicker: 'Collaborateur IA Unitalk', head: 'Des missions. Une expérience qui reste.', body: 'Il conserve son identité, travaille avec vos équipes et développe des compétences propres à votre entreprise.', featured: true },
    ],

    tableTitle: 'La différence, point par point',
    colAssistant: 'Assistant IA',
    colAgent: 'Agent IA',
    colCollab: 'Collaborateur IA Unitalk',
    rows: [
      { label: 'Mission principale', assistant: 'Répondre', agent: 'Exécuter une tâche', collab: 'Prendre en charge des missions' },
      { label: 'Identité', assistant: 'Session ou compte', agent: 'Liée à une fonction', collab: 'Persistante dans l’entreprise' },
      { label: 'Mémoire', assistant: 'Conversation', agent: 'Liée à l’outil', collab: 'Gouvernée par l’entreprise' },
      { label: 'Méthodes', assistant: 'Instructions du prompt', agent: 'Procédure configurée', collab: 'Propres à l’entreprise' },
      { label: 'Compétences', assistant: 'Générales', agent: 'Prédéfinies', collab: 'Testées et versionnées' },
      { label: 'Applications', assistant: 'Connecteurs disponibles', agent: 'Outils nécessaires à la tâche', collab: 'Accès contrôlés selon la mission' },
      { label: 'Collaboration', assistant: 'Avec un utilisateur', agent: 'Pour un utilisateur', collab: 'Avec les équipes' },
      { label: 'Validation humaine', assistant: 'Relecture du résultat', agent: 'Selon la configuration', collab: 'Intégrée aux décisions sensibles' },
      { label: 'Présence publique', assistant: 'Conversation', agent: 'Rarement centrale', collab: 'Texte, voix, qualification, rendez-vous' },
      { label: 'Résultat durable', assistant: 'Une réponse', agent: 'Un résultat', collab: 'Une compétence réutilisable' },
    ],

    scenarioTitle: 'Prenons une mission concrète',
    scenarioQuote: '« Je veux que chaque réclamation client soit suivie jusqu’à sa résolution. »',
    scenario: [
      { head: 'Avec un assistant IA', body: 'Il rédige une procédure ou une réponse. L’équipe organise ensuite le suivi.' },
      { head: 'Avec un agent IA', body: 'Il applique une procédure prédéfinie pour classer la demande, répondre et relancer.' },
      { head: 'Avec un Collaborateur IA Unitalk', body: 'Il consulte le dossier autorisé, classe la réclamation, prépare la réponse, planifie le suivi et met à jour le CRM. Lorsqu’un geste commercial dépasse le seuil défini, il sollicite la personne responsable.' },
    ],
    scenarioSkillLabel: 'La méthode validée peut ensuite devenir une compétence durable',
    scenarioSkill: 'Suivre une réclamation client',
    scenarioSkillTags: ['Testée', 'Validée', 'Versionnée'],

    changeTitle: 'Ce qui change avec Unitalk',
    changes: [
      { head: 'Une identité qui demeure', body: 'Le même Collaborateur peut accomplir plusieurs missions sans perdre sa mémoire ni son expérience.' },
      { head: 'Des capacités qui progressent', body: 'Ajoutez des profils métier, des compétences et des applications selon les besoins de votre entreprise.' },
      { head: 'Des décisions qui restent humaines', body: 'Vous définissez ses accès, ses limites et les actions qui nécessitent une validation.' },
      { head: 'Une intelligence sous votre contrôle', body: 'Vos données, votre mémoire et vos méthodes restent privées par défaut.' },
    ],
    changePunch: ['Alma prépare.', 'Le Collaborateur IA accomplit.', 'Vous validez.'],

    chooseTitle: 'Quel choix pour votre entreprise ?',
    choose: [
      { tag: 'un assistant IA', body: 'pour obtenir des réponses, des synthèses ou des contenus ponctuels.' },
      { tag: 'un agent IA', body: 'pour automatiser une tâche définie dans un périmètre stable.' },
      { tag: 'un Collaborateur IA Unitalk', body: 'pour confier des missions successives à une identité qui travaille avec vos équipes et conserve l’expérience acquise.' },
    ],

    faqTitle: 'Questions fréquentes',
    faq: [
      { q: 'Est-ce simplement un agent avec un prénom ?', a: 'Non. Son identité relie son rôle, sa mémoire, ses compétences, ses applications, ses autorisations et son historique de travail.' },
      { q: 'Faut-il un Collaborateur IA pour chaque mission ?', a: 'Non. Alma vérifie d’abord si un Collaborateur existant peut accomplir la mission et lui ajoute uniquement les capacités nécessaires.' },
      { q: 'Peut-il agir sans validation ?', a: 'Oui, dans les limites définies par votre entreprise. Les décisions sensibles peuvent exiger l’accord d’une personne autorisée.' },
      { q: 'Nos méthodes sont-elles partagées ?', a: 'Non. Vos données et vos méthodes restent privées par défaut. Rien n’est partagé sans votre choix.' },
    ],

    finalTitle: 'Ne recommencez plus à chaque mission.',
    finalBody: 'Créez un Collaborateur IA qui travaille avec vos équipes, agit dans vos applications et développe des compétences propres à votre entreprise.',
    finalProof: ['7 jours pour votre première mission', 'Sans carte bancaire', 'Hébergé en France'],
  }
}

const reveal = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease },
}

export function CollabCompareContent() {
  const t = useCopy()
  const [open, setOpen] = useState<number | null>(0)

  return (
    <main className="w-full bg-[#F3EFE6]">

      {/* Hero */}
      <section className="border-b border-[#E4DDCE] px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 flex justify-center">
            <ProofPill>{t.trial}</ProofPill>
          </div>
          <h1 className="text-balance font-sf text-[clamp(2.1rem,5vw,3.4rem)] font-bold leading-[1.05] tracking-[-0.03em] text-[#1C1A17]">
            <span>{t.title.a} </span>
            <span>{t.title.b} </span>
            <span className="text-[#B00C54]">{t.title.c}</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-[#4E483F]">{t.lead}</p>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-[15px] leading-relaxed text-[#6B6459]">{t.sub}</p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/decouvrir"
              className="group inline-flex items-center gap-2 rounded-full bg-[#D10E63] px-7 py-3.5 text-[15px] font-bold text-[#FBF9F3] transition-colors hover:bg-[#E51872]"
            >
              {t.ctaMission}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/alma"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#D8D0C2] px-6 py-3.5 text-[15px] font-semibold text-[#1C1A17] transition-colors hover:border-[#B00C54] hover:text-[#B00C54]"
            >
              {t.ctaAlma}
            </Link>
          </div>

          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {t.heroProof.map((p) => (
              <li key={p} className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[#8C8477]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E8548C]" aria-hidden />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Three ways */}
      <section className="border-b border-[#E4DDCE] px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.h2 {...reveal} className="text-balance font-sf text-2xl font-bold tracking-[-0.02em] text-[#1C1A17] sm:text-3xl">
            {t.waysTitle}
          </motion.h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {t.ways.map((w, i) => (
              <motion.div
                key={w.kicker}
                {...reveal}
                transition={{ duration: 0.5, ease, delay: i * 0.06 }}
                className={`flex flex-col rounded-2xl border p-7 ${
                  w.featured
                    ? 'border-[#D10E63]/40 bg-[#1C1A17] text-[#F4F1EA] premium-shadow'
                    : 'border-[#E4DDCE] bg-[#FBF9F3]'
                }`}
              >
                <p className={`font-mono text-[11px] font-medium uppercase tracking-[0.16em] ${w.featured ? 'text-[#E8A0BE]' : 'text-[#8C8477]'}`}>
                  {w.kicker}
                </p>
                <h3 className={`mt-4 font-sf text-xl font-bold tracking-[-0.01em] ${w.featured ? 'text-[#F4F1EA]' : 'text-[#1C1A17]'}`}>
                  {w.head}
                </h3>
                <p className={`mt-3 text-[15px] leading-relaxed ${w.featured ? 'text-[#C9C1B5]' : 'text-[#4E483F]'}`}>{w.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="border-b border-[#E4DDCE] px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.h2 {...reveal} className="text-balance font-sf text-2xl font-bold tracking-[-0.02em] text-[#1C1A17] sm:text-3xl">
            {t.tableTitle}
          </motion.h2>

          <motion.div {...reveal} className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#DDD5CA]">
                  <th className="py-4 pr-4" />
                  <th className="px-4 py-4 align-bottom font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-[#8C8477]">{t.colAssistant}</th>
                  <th className="px-4 py-4 align-bottom font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-[#8C8477]">{t.colAgent}</th>
                  <th className="rounded-t-xl bg-[#1C1A17] px-4 py-4 align-bottom font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#E8A0BE]">{t.colCollab}</th>
                </tr>
              </thead>
              <tbody>
                {t.rows.map((r) => (
                  <tr key={r.label} className="border-b border-[#E9E2D5]">
                    <th scope="row" className="py-4 pr-4 align-top text-[13px] font-semibold text-[#1C1A17]">{r.label}</th>
                    <td className="px-4 py-4 align-top text-[14px] leading-snug text-[#6B6459]">{r.assistant}</td>
                    <td className="px-4 py-4 align-top text-[14px] leading-snug text-[#6B6459]">{r.agent}</td>
                    <td className="bg-[#1C1A17] px-4 py-4 align-top text-[14px] font-medium leading-snug text-[#F4F1EA]">{r.collab}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* Concrete scenario */}
      <section className="border-b border-[#E4DDCE] bg-[#EFEADF] px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <motion.h2 {...reveal} className="text-balance font-sf text-2xl font-bold tracking-[-0.02em] text-[#1C1A17] sm:text-3xl">
            {t.scenarioTitle}
          </motion.h2>
          <motion.blockquote {...reveal} className="mt-6 border-l-2 border-[#D10E63] pl-5 font-sf text-xl font-semibold leading-snug text-[#1C1A17] sm:text-2xl">
            {t.scenarioQuote}
          </motion.blockquote>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {t.scenario.map((s, i) => {
              const last = i === t.scenario.length - 1
              return (
                <motion.div
                  key={s.head}
                  {...reveal}
                  transition={{ duration: 0.5, ease, delay: i * 0.06 }}
                  className={`rounded-2xl border p-6 ${last ? 'border-[#D10E63]/40 bg-[#FBF9F3] premium-shadow' : 'border-[#E4DDCE] bg-[#FBF9F3]'}`}
                >
                  <h3 className="font-sf text-[15px] font-bold text-[#1C1A17]">{s.head}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-[#4E483F]">{s.body}</p>
                </motion.div>
              )
            })}
          </div>

          <motion.div {...reveal} className="mt-8 rounded-2xl border border-[#E4DDCE] bg-[#1C1A17] p-6 sm:p-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#8C8477]">{t.scenarioSkillLabel}</p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <span className="font-sf text-lg font-bold text-[#F4F1EA]">{t.scenarioSkill}</span>
              <span className="flex flex-wrap gap-1.5">
                {t.scenarioSkillTags.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1 rounded-full border border-[#3A352E] px-2.5 py-1 text-[11px] font-medium text-[#5FD3A0]">
                    <Check aria-hidden className="h-3 w-3" />
                    {tag}
                  </span>
                ))}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What changes with Unitalk */}
      <section className="border-b border-[#E4DDCE] px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.h2 {...reveal} className="text-balance font-sf text-2xl font-bold tracking-[-0.02em] text-[#1C1A17] sm:text-3xl">
            {t.changeTitle}
          </motion.h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {t.changes.map((c, i) => (
              <motion.div
                key={c.head}
                {...reveal}
                transition={{ duration: 0.5, ease, delay: i * 0.05 }}
                className="rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-7"
              >
                <h3 className="font-sf text-lg font-bold tracking-[-0.01em] text-[#1C1A17]">{c.head}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[#4E483F]">{c.body}</p>
              </motion.div>
            ))}
          </div>

          <motion.p {...reveal} className="mt-10 text-balance font-sf text-2xl font-semibold tracking-[-0.02em] text-[#1C1A17] sm:text-3xl">
            {t.changePunch[0]} <span className="text-[#D10E63]">{t.changePunch[1]}</span> {t.changePunch[2]}
          </motion.p>
        </div>
      </section>

      {/* Which choice */}
      <section className="border-b border-[#E4DDCE] bg-[#EFEADF] px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <motion.h2 {...reveal} className="text-balance font-sf text-2xl font-bold tracking-[-0.02em] text-[#1C1A17] sm:text-3xl">
            {t.chooseTitle}
          </motion.h2>
          <div className="mt-8 flex flex-col gap-4">
            {t.choose.map((c) => (
              <motion.p
                key={c.tag}
                {...reveal}
                className="text-pretty text-[17px] leading-relaxed text-[#4E483F]"
              >
                {t.eyebrow === 'Comparatif' ? 'Choisissez ' : 'Choose '}
                <span className="font-semibold text-[#1C1A17]">{c.tag}</span> {c.body}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-[#E4DDCE] px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <motion.h2 {...reveal} className="text-balance font-sf text-2xl font-bold tracking-[-0.02em] text-[#1C1A17] sm:text-3xl">
            {t.faqTitle}
          </motion.h2>
          <div className="mt-8 divide-y divide-[#E4DDCE] border-y border-[#E4DDCE]">
            {t.faq.map((f, i) => {
              const isOpen = open === i
              return (
                <div key={f.q}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="font-sf text-[16px] font-semibold text-[#1C1A17]">{f.q}</span>
                    <span className="shrink-0 text-[#B00C54]" aria-hidden>
                      {isOpen ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                    </span>
                  </button>
                  {isOpen && <p className="pb-5 text-[15px] leading-relaxed text-[#4E483F]">{f.a}</p>}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#1C1A17] px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2 {...reveal} className="text-balance font-sf text-3xl font-bold leading-[1.08] tracking-[-0.02em] text-[#F4F1EA] sm:text-4xl">
            {t.finalTitle}
          </motion.h2>
          <motion.p {...reveal} className="mx-auto mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-[#C9C1B5]">
            {t.finalBody}
          </motion.p>
          <motion.div {...reveal} className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/decouvrir"
              className="group inline-flex items-center gap-2 rounded-full bg-[#D10E63] px-7 py-3.5 text-[15px] font-bold text-[#FBF9F3] transition-colors hover:bg-[#E51872]"
            >
              {t.ctaMission}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/alma"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#3A352E] px-6 py-3.5 text-[15px] font-semibold text-[#F4F1EA] transition-colors hover:border-[#E8A0BE] hover:text-[#E8A0BE]"
            >
              {t.ctaAlma}
            </Link>
          </motion.div>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {t.finalProof.map((p) => (
              <li key={p} className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[#8C8477]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E8548C]" aria-hidden />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
