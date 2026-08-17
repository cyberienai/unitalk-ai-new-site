'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { MissionSeal } from '@/components/home/signs'
import { Kicker } from '@/components/home/section-kicker'

/**
 * WORKSPACE PROOF — an operational mission SHEET, not a chatbot. Three zones:
 * header (mission id + status), activity (a timestamped log on the mission
 * thread), and a real decision (the visitor is the human validator). The
 * thread runs down the activity and STOPS at the decision; it only turns green
 * and reaches the outcome once a person chooses. This is the clearest statement
 * that decisions stay human.
 */

const MAGENTA = '#D10E63'
const GREEN = '#2E7D4F'
const ease = [0.22, 1, 0.36, 1] as const

type Decision = null | 'validate' | 'refuse' | 'modify'
type WorkspaceScenario = {
  tab: string
  missionId: string
  missionTitle: string
  meta: { label: string; value: string }[]
  activity: { time: string; text: string }[]
  decisionClient: string
  decisionQuestion: string
  outcomes: Record<Exclude<Decision, null>, { time: string; text: string }>
}

const T = {
  fr: {
    kicker: 'Mission en action',
    title: 'Les humains décident. Les Collaborateurs IA agissent.',
    surfaces: 'Dans le Workspace privé, vos équipes suivent le travail, consultent les résultats et interviennent lorsqu’une décision exige leur validation.',
    surfacesList: 'Web · Application de bureau · Messageries · Terminal',
    cta: 'Découvrir le Workspace',
    missionId: 'Exemple illustratif · Mission FIN-042',
    statusPending: 'En attente de validation',
    statusValidated: 'Validée',
    statusRefused: 'Décision refusée',
    statusModify: 'À revoir',
    missionTitle: 'Relancer les factures impayées',
    meta: [
      { label: 'Collaboratrice', value: 'Emma · Collaboratrice IA' },
      { label: 'Profil', value: 'Finance' },
      { label: 'Validation', value: 'Responsable financier' },
    ],
    activityLabel: 'Activité',
    activity: [
      { time: '10:14', text: 'Emma a identifié 12 factures échues.' },
      { time: '10:16', text: '2 dossiers comportent un litige ouvert.' },
      { time: '10:18', text: '10 relances sont prêtes à partir.' },
    ],
    decisionLabel: 'Décision requise',
    decisionClient: 'Client Dupont · 14 800 €',
    decisionQuestion: 'Transmettre ce dossier au contentieux ?',
    refuse: 'Refuser',
    modify: 'Demander une modification',
    validate: 'Approuver',
    outcomes: {
      validate: { time: '10:21', text: 'Décision enregistrée. Emma transmet le dossier et poursuit la mission.' },
      refuse: { time: '10:21', text: 'Dossier non transmis. Emma le maintient en suivi et vous alerte à la prochaine échéance.' },
      modify: { time: '10:21', text: 'Emma reprend le dossier avec vos consignes avant toute transmission.' },
    },
  },
  en: {
    kicker: 'Mission in action',
    title: 'Humans decide. AI Collaborators act.',
    surfaces: 'In the private Workspace, your teams follow the work, review results and step in whenever a decision requires their approval.',
    surfacesList: 'Web · Desktop · Messaging · Terminal',
    cta: 'Discover the Workspace',
    missionId: 'Illustrative example · Mission FIN-042',
    statusPending: 'Awaiting validation',
    statusValidated: 'Validated',
    statusRefused: 'Decision declined',
    statusModify: 'To review',
    missionTitle: 'Follow up on overdue invoices',
    meta: [
      { label: 'Collaborator', value: 'Emma · AI Collaborator' },
      { label: 'Profile', value: 'Finance' },
      { label: 'Validation', value: 'Finance manager' },
    ],
    activityLabel: 'Activity',
    activity: [
      { time: '10:14', text: 'Emma identified 12 overdue invoices.' },
      { time: '10:16', text: '2 files carry an open dispute.' },
      { time: '10:18', text: '10 reminders are ready to send.' },
    ],
    decisionLabel: 'Decision required',
    decisionClient: 'Dupont · €14,800',
    decisionQuestion: 'Escalate this file to collections?',
    refuse: 'Decline',
    modify: 'Request changes',
    validate: 'Approve',
    outcomes: {
      validate: { time: '10:21', text: 'Decision recorded. Emma escalates the file and continues the mission.' },
      refuse: { time: '10:21', text: 'File not escalated. Emma keeps it under watch and alerts you at the next due date.' },
      modify: { time: '10:21', text: 'Emma resumes the file with your instructions before any escalation.' },
    },
  },
} as const

const SCENARIOS: Record<Lang, WorkspaceScenario[]> = {
  fr: [
    {
      tab: 'Finance', missionId: 'Exemple illustratif · Mission FIN-042', missionTitle: 'Relancer les factures impayées',
      meta: [{ label: 'Collaboratrice', value: 'Emma · Collaboratrice IA' }, { label: 'Profil', value: 'Finance' }, { label: 'Validation', value: 'Responsable financier' }],
      activity: [{ time: '10:14', text: 'Emma a identifié 12 factures échues.' }, { time: '10:16', text: '2 dossiers comportent un litige ouvert.' }, { time: '10:18', text: '10 relances sont prêtes à partir.' }],
      decisionClient: 'Client Dupont · 14 800 €', decisionQuestion: 'Transmettre ce dossier au contentieux ?',
      outcomes: { validate: { time: '10:21', text: 'Décision enregistrée. Emma transmet le dossier et poursuit la mission.' }, refuse: { time: '10:21', text: 'Dossier non transmis. Emma le maintient en suivi.' }, modify: { time: '10:21', text: 'Emma reprend le dossier avec vos consignes.' } },
    },
    {
      tab: 'Ventes', missionId: 'Exemple illustratif · Mission VTE-018', missionTitle: 'Qualifier les nouveaux prospects',
      meta: [{ label: 'Collaboratrice', value: 'Chloé · Collaboratrice IA' }, { label: 'Profil', value: 'Commercial' }, { label: 'Validation', value: 'Direction commerciale' }],
      activity: [{ time: '09:05', text: 'Chloé a analysé 34 entreprises.' }, { time: '09:12', text: '9 prospects correspondent aux critères.' }, { time: '09:18', text: 'Les fiches CRM sont prêtes.' }],
      decisionClient: '9 prospects qualifiés', decisionQuestion: 'Autoriser la préparation du premier contact ?',
      outcomes: { validate: { time: '09:21', text: 'Chloé prépare les prises de contact autorisées.' }, refuse: { time: '09:21', text: 'Aucun contact n’est préparé. Les prospects restent dans la sélection.' }, modify: { time: '09:21', text: 'Chloé applique vos nouveaux critères de qualification.' } },
    },
    {
      tab: 'Clients', missionId: 'Exemple illustratif · Mission CLI-027', missionTitle: 'Préparer les réponses aux demandes',
      meta: [{ label: 'Collaborateur', value: 'Lucas · Collaborateur IA' }, { label: 'Profil', value: 'Relation client' }, { label: 'Validation', value: 'Responsable service client' }],
      activity: [{ time: '11:02', text: 'Lucas a classé 18 demandes entrantes.' }, { time: '11:08', text: '13 réponses contextualisées sont prêtes.' }, { time: '11:11', text: '3 dossiers ont été orientés vers le bon service.' }],
      decisionClient: 'Demande de geste commercial', decisionQuestion: 'Accorder une remise exceptionnelle ?',
      outcomes: { validate: { time: '11:14', text: 'Lucas intègre la remise validée dans la réponse.' }, refuse: { time: '11:14', text: 'La réponse est conservée sans remise.' }, modify: { time: '11:14', text: 'Lucas reprend la proposition selon vos consignes.' } },
    },
    {
      tab: 'Direction', missionId: 'Exemple illustratif · Mission DIR-011', missionTitle: 'Préparer la réunion de direction',
      meta: [{ label: 'Collaboratrice', value: 'Emma · Collaboratrice IA' }, { label: 'Profil', value: 'Assistante de direction' }, { label: 'Validation', value: 'Direction générale' }],
      activity: [{ time: '08:32', text: 'Emma a réuni les documents utiles.' }, { time: '08:38', text: '5 points ouverts ont été identifiés.' }, { time: '08:44', text: 'L’ordre du jour est prêt.' }],
      decisionClient: 'Ordre du jour · Comité de direction', decisionQuestion: 'Ajouter le projet de réorganisation ?',
      outcomes: { validate: { time: '08:47', text: 'Emma ajoute le sujet et les documents associés.' }, refuse: { time: '08:47', text: 'Le sujet reste hors de cet ordre du jour.' }, modify: { time: '08:47', text: 'Emma reformule le sujet selon vos indications.' } },
    },
    {
      tab: 'Marketing', missionId: 'Exemple illustratif · Mission MKT-036', missionTitle: 'Préparer le calendrier éditorial',
      meta: [{ label: 'Collaboratrice', value: 'Nadia · Collaboratrice IA' }, { label: 'Profil', value: 'Marketing' }, { label: 'Validation', value: 'Responsable marketing' }],
      activity: [{ time: '14:06', text: 'Nadia a analysé les objectifs du trimestre.' }, { time: '14:12', text: '12 sujets ont été répartis par canal.' }, { time: '14:18', text: 'Le calendrier et les briefs sont prêts.' }],
      decisionClient: 'Campagne de lancement · Septembre', decisionQuestion: 'Valider les thèmes avant production ?',
      outcomes: { validate: { time: '14:21', text: 'Nadia prépare les contenus à partir des thèmes validés.' }, refuse: { time: '14:21', text: 'La production reste en attente.' }, modify: { time: '14:21', text: 'Nadia ajuste les thèmes et le calendrier.' } },
    },
  ],
  en: [
    {
      tab: 'Finance', missionId: 'Illustrative example · Mission FIN-042', missionTitle: 'Follow up on overdue invoices',
      meta: [{ label: 'Collaborator', value: 'Emma · AI Collaborator' }, { label: 'Profile', value: 'Finance' }, { label: 'Approval', value: 'Finance manager' }],
      activity: [{ time: '10:14', text: 'Emma identified 12 overdue invoices.' }, { time: '10:16', text: '2 files have an open dispute.' }, { time: '10:18', text: '10 reminders are ready to send.' }],
      decisionClient: 'Dupont · €14,800', decisionQuestion: 'Escalate this file to collections?',
      outcomes: { validate: { time: '10:21', text: 'Decision recorded. Emma escalates the file.' }, refuse: { time: '10:21', text: 'The file is not escalated and remains under watch.' }, modify: { time: '10:21', text: 'Emma revises the file under your instructions.' } },
    },
    {
      tab: 'Sales', missionId: 'Illustrative example · Mission SLS-018', missionTitle: 'Qualify new prospects',
      meta: [{ label: 'Collaborator', value: 'Chloé · AI Collaborator' }, { label: 'Profile', value: 'Sales' }, { label: 'Approval', value: 'Sales director' }],
      activity: [{ time: '09:05', text: 'Chloé analyzed 34 companies.' }, { time: '09:12', text: '9 prospects match the criteria.' }, { time: '09:18', text: 'CRM records are ready.' }],
      decisionClient: '9 qualified prospects', decisionQuestion: 'Authorize first-contact preparation?',
      outcomes: { validate: { time: '09:21', text: 'Chloé prepares the authorized outreach.' }, refuse: { time: '09:21', text: 'No outreach is prepared.' }, modify: { time: '09:21', text: 'Chloé applies your updated criteria.' } },
    },
    {
      tab: 'Customers', missionId: 'Illustrative example · Mission CST-027', missionTitle: 'Prepare customer replies',
      meta: [{ label: 'Collaborator', value: 'Lucas · AI Collaborator' }, { label: 'Profile', value: 'Customer relations' }, { label: 'Approval', value: 'Customer service manager' }],
      activity: [{ time: '11:02', text: 'Lucas classified 18 incoming requests.' }, { time: '11:08', text: '13 contextual replies are ready.' }, { time: '11:11', text: '3 cases were routed to the right team.' }],
      decisionClient: 'Commercial gesture request', decisionQuestion: 'Grant an exceptional discount?',
      outcomes: { validate: { time: '11:14', text: 'Lucas includes the approved discount.' }, refuse: { time: '11:14', text: 'The reply is kept without a discount.' }, modify: { time: '11:14', text: 'Lucas revises the proposal.' } },
    },
    {
      tab: 'Leadership', missionId: 'Illustrative example · Mission LDR-011', missionTitle: 'Prepare the leadership meeting',
      meta: [{ label: 'Collaborator', value: 'Emma · AI Collaborator' }, { label: 'Profile', value: 'Executive assistant' }, { label: 'Approval', value: 'Executive team' }],
      activity: [{ time: '08:32', text: 'Emma gathered the relevant documents.' }, { time: '08:38', text: '5 open points were identified.' }, { time: '08:44', text: 'The agenda is ready.' }],
      decisionClient: 'Executive meeting agenda', decisionQuestion: 'Add the reorganization project?',
      outcomes: { validate: { time: '08:47', text: 'Emma adds the topic and its documents.' }, refuse: { time: '08:47', text: 'The topic remains off this agenda.' }, modify: { time: '08:47', text: 'Emma reframes the topic as requested.' } },
    },
    {
      tab: 'Marketing', missionId: 'Illustrative example · Mission MKT-036', missionTitle: 'Prepare the editorial calendar',
      meta: [{ label: 'Collaborator', value: 'Nadia · AI Collaborator' }, { label: 'Profile', value: 'Marketing' }, { label: 'Approval', value: 'Marketing manager' }],
      activity: [{ time: '14:06', text: 'Nadia analyzed the quarter’s objectives.' }, { time: '14:12', text: '12 topics were assigned by channel.' }, { time: '14:18', text: 'The calendar and briefs are ready.' }],
      decisionClient: 'September launch campaign', decisionQuestion: 'Approve the themes before production?',
      outcomes: { validate: { time: '14:21', text: 'Nadia prepares content from the approved themes.' }, refuse: { time: '14:21', text: 'Production remains on hold.' }, modify: { time: '14:21', text: 'Nadia adjusts the themes and calendar.' } },
    },
  ],
}

export function SectionWorkspace({ lang = 'fr' }: { lang?: Lang }) {
  const t = T[lang]
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })

  const [hasReached, setReached] = useState(false)
  const [decision, setDecision] = useState<Decision>(null)
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const scenarios = SCENARIOS[lang]
  const scenario = scenarios[scenarioIndex]
  const validated = decision === 'validate'
  const reached = Boolean(reduce) || hasReached

  useEffect(() => {
    if (reduce) return
    if (inView) {
      const id = window.setTimeout(() => setReached(true), 350)
      return () => window.clearTimeout(id)
    }
  }, [inView, reduce])

  useEffect(() => {
    if (reduce || !inView || decision) return
    const id = window.setTimeout(() => selectScenario(scenarioIndex + 1), 7000)
    return () => window.clearTimeout(id)
  }, [decision, inView, reduce, scenarioIndex])

  const status = !decision
    ? { label: t.statusPending, color: '#D10E63', bg: 'rgba(209,14,99,0.1)' }
    : decision === 'validate'
      ? { label: t.statusValidated, color: '#1F7A46', bg: 'rgba(46,158,91,0.12)' }
      : decision === 'refuse'
        ? { label: t.statusRefused, color: '#6E655A', bg: 'rgba(138,128,115,0.14)' }
        : { label: t.statusModify, color: '#6E655A', bg: 'rgba(138,128,115,0.14)' }

  const outcome = decision ? scenario.outcomes[decision] : null

  function selectScenario(index: number) {
    setScenarioIndex((index + scenarios.length) % scenarios.length)
    setDecision(null)
  }

  return (
    <section className="bg-[#F3EFE6] py-14 sm:py-20">
      <div className="editorial-shell grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="max-w-xl">
          <Kicker>{t.kicker}</Kicker>
          <h2 className="mt-4 text-balance font-sf text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-[#1C1A17]">
            {t.title}
          </h2>
          <p className="mt-5 max-w-lg text-pretty text-[17px] leading-relaxed text-[#4E483F]">{t.surfaces}</p>
          <Link
            href="/workspace"
            className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full border border-[#D10E63] px-6 text-[15px] font-bold text-[#B00C54] transition-colors hover:bg-[#D10E63] hover:text-white"
          >
            {t.cta}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-4 font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-[#625B50]">{t.surfacesList}</p>
        </div>

        <div ref={ref}>
          <div className="mb-3 flex items-center gap-3">
            <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="tablist" aria-label={lang === 'fr' ? 'Exemples de missions' : 'Mission examples'}>
              {scenarios.map((item, index) => <button key={item.tab} type="button" role="tab" aria-selected={scenarioIndex === index} onClick={() => selectScenario(index)} className={`min-h-10 shrink-0 rounded-full border px-4 text-xs font-bold outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] ${scenarioIndex === index ? 'border-[#D10E63] bg-[#D10E63] text-white' : 'border-[#D8D0C2] bg-[#FAF8F3] text-[#625B50] hover:border-[#D10E63]/40'}`}>{item.tab}</button>)}
            </div>
            <div className="flex shrink-0 items-center gap-1.5">
              <span className="hidden min-w-9 text-center font-mono text-[10px] font-bold text-[#857C6E] sm:inline">{scenarioIndex + 1}/{scenarios.length}</span>
              <button type="button" onClick={() => selectScenario(scenarioIndex - 1)} aria-label={lang === 'fr' ? 'Exemple précédent' : 'Previous example'} className="flex size-10 items-center justify-center rounded-full border border-[#D8D0C2] bg-[#FAF8F3] outline-none hover:border-[#D10E63]/50 focus-visible:ring-2 focus-visible:ring-[#D10E63]"><ChevronLeft className="size-4" /></button>
              <button type="button" onClick={() => selectScenario(scenarioIndex + 1)} aria-label={lang === 'fr' ? 'Exemple suivant' : 'Next example'} className="flex size-10 items-center justify-center rounded-full border border-[#D8D0C2] bg-[#FAF8F3] outline-none hover:border-[#D10E63]/50 focus-visible:ring-2 focus-visible:ring-[#D10E63]"><ChevronRight className="size-4" /></button>
            </div>
          </div>
          <motion.div
            key={scenario.missionId}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={inView || reduce ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, ease }}
            className="overflow-hidden rounded-lg border border-[#E4DDCE] bg-[#FBF9F3] shadow-[0_24px_70px_-40px_rgba(28,26,23,0.4)]"
          >
          {/* Header */}
          <div className="border-b border-[#EEE7DA] px-5 py-4 sm:px-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#6E655A]">{scenario.missionId}</p>
                <h3 className="mt-1.5 font-sf text-[1.15rem] font-semibold tracking-[-0.015em] text-[#1C1A17]">{scenario.missionTitle}</h3>
              </div>
              <span
                className="shrink-0 rounded-full px-2.5 py-1 font-mono text-[9.5px] font-bold uppercase tracking-[0.12em] transition-colors"
                style={{ color: status.color, backgroundColor: status.bg }}
              >
                {status.label}
              </span>
            </div>
            {/* Governance meta — Unitalk provides the infrastructure, the company keeps authority. */}
            <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-[#EEE7DA] pt-3.5">
              {scenario.meta.map((m) => (
                <div key={m.label}>
                   <dt className="font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-[#625B50]">{m.label}</dt>
                  <dd className="mt-1 text-[13px] font-medium leading-snug text-[#2A2622]">{m.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Activity + decision, on the mission thread */}
          <div className="px-5 py-5 sm:px-6">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#6E655A]">{t.activityLabel}</p>

            <ol className="mt-3">
              {scenario.activity.map((a) => (
                <li key={a.time} className="relative flex gap-4 pb-4">
                  {/* spine */}
                  <span aria-hidden className="absolute left-[6px] top-3 h-full w-px bg-[#E4DDCE]" />
                  <span
                    className="relative z-10 mt-1 h-3 w-3 shrink-0 rounded-full transition-colors duration-500"
                    style={{ backgroundColor: reached ? MAGENTA : 'transparent', border: reached ? 'none' : '1.5px solid #DcD4C4' }}
                  />
                  <p className="text-[13.5px] leading-snug text-[#2A2622]">
                     <span className="mr-2 font-mono text-[12px] text-[#625B50]">{a.time}</span>{' '}
                    {a.text}
                  </p>
                </li>
              ))}

              {/* Decision node — the gate */}
              <li className="relative flex gap-4">
                {outcome && <span aria-hidden className="absolute left-[6px] top-3 h-full w-px bg-[#C7E3D2]" />}
                <span className="relative z-10 mt-0.5 flex h-3 w-3 shrink-0 items-center justify-center">
                  {validated ? (
                    <MissionSeal size={18} color={GREEN} className="-translate-x-0.5 -translate-y-0.5" />
                  ) : (
                    <>
                      {!decision && !reduce && reached && (
                        <motion.span
                          className="absolute inset-0 rounded-full"
                          style={{ backgroundColor: MAGENTA }}
                          animate={{ scale: [1, 2.2, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                        />
                      )}
                      <span
                        className="relative h-3 w-3 rounded-full"
                        style={{
                          backgroundColor: decision ? '#B4AB99' : 'transparent',
                          border: decision ? 'none' : `1.5px solid ${MAGENTA}`,
                        }}
                      />
                    </>
                  )}
                </span>

                <div className="min-w-0 flex-1">
                  {!decision ? (
                    <div className="rounded-md border border-[#E4DDCE] bg-[#F1EADF]/70 p-4">
                      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#AD0C53]">{t.decisionLabel}</p>
                      <p className="mt-2 text-[15px] font-semibold text-[#1C1A17]">{scenario.decisionClient}</p>
                      <p className="mt-0.5 text-[13.5px] text-[#4E483F]">{scenario.decisionQuestion}</p>
                      <div className="mt-3.5 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => setDecision('validate')}
                          disabled={!reached}
                          className="inline-flex min-h-10 items-center justify-center rounded-full bg-[#D10E63] px-5 text-[13.5px] font-bold text-[#FBF9F3] transition-colors hover:bg-[#B00B52] disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          {t.validate}
                        </button>
                        <button
                          type="button"
                          onClick={() => setDecision('modify')}
                          disabled={!reached}
                          className="inline-flex min-h-10 items-center justify-center rounded-full border border-[#D2C9B8] px-5 text-[13.5px] font-semibold text-[#4E483F] transition-colors hover:border-[#1C1A17] disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          {t.modify}
                        </button>
                        <button
                          type="button"
                          onClick={() => setDecision('refuse')}
                          disabled={!reached}
                          className="inline-flex min-h-10 items-center justify-center rounded-full border border-[#D2C9B8] px-5 text-[13.5px] font-semibold text-[#4E483F] transition-colors hover:border-[#1C1A17] disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          {t.refuse}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="pt-0.5 text-[15px] font-semibold text-[#1C1A17]">
                      {scenario.decisionClient} · {status.label}
                    </p>
                  )}
                </div>
              </li>

              {/* Outcome line — only after a decision */}
              {outcome && (
                <motion.li
                  initial={reduce ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease }}
                  className="relative flex gap-4 pt-4"
                >
                  <span
                    className="relative z-10 mt-1 h-3 w-3 shrink-0 rounded-full"
                    style={{ backgroundColor: validated ? GREEN : '#B4AB99' }}
                  />
                  <p className="text-[13.5px] leading-snug text-[#2A2622]">
                     <span className="mr-2 font-mono text-[12px] text-[#625B50]">{outcome.time}</span>{' '}
                    {outcome.text}
                  </p>
                </motion.li>
              )}
            </ol>
          </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
