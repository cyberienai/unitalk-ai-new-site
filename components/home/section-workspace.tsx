'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useId, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { MissionSeal } from '@/components/home/signs'
import { Kicker } from '@/components/home/section-kicker'
import { localizedHref } from '@/lib/i18n-routing'

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
  avatar: string
  meta: { label: string; value: string }[]
  activity: { time: string; text: string }[]
  decisionClient: string
  decisionQuestion: string
  outcomes: Record<Exclude<Decision, null>, { time: string; text: string }>
}

const T = {
  fr: {
    kicker: 'Un espace de travail partagé',
    demo: 'Démonstration interactive · Données fictives',
    title: 'Humains et IA collaborent.',
    surfaces: 'Votre Collaborateur IA réalise la mission dans le Workspace, conserve le contexte et rend son travail visible. Avant une action sensible, il demande la décision de la personne responsable.',
    cta: 'Découvrir le Workspace',
    missionId: 'Mission FIN-042',
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
    kicker: 'A shared workspace',
    demo: 'Interactive demo · Fictional data',
    title: 'Humans and AI collaborate.',
    surfaces: 'Your AI Collaborator performs the mission in Workspace, retains context and makes its work visible. Before a sensitive action, it requests a decision from the person in charge.',
    cta: 'Discover the Workspace',
    missionId: 'Mission FIN-042',
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
      tab: 'Finance', missionId: 'Mission FIN-042', missionTitle: 'Relancer les factures impayées',
      avatar: '/images/nadia-avatar.png',
      meta: [{ label: 'Collaboratrice IA', value: 'Nadia' }, { label: 'Profil', value: 'Finance' }, { label: 'Validation', value: 'Responsable financier' }],
      activity: [{ time: '10:14', text: 'Nadia a identifié 12 factures échues.' }, { time: '10:16', text: '2 dossiers en litige ont été protégés.' }, { time: '10:18', text: '10 relances sont prêtes à partir.' }],
      decisionClient: 'Client Dupont · 14 800 €', decisionQuestion: 'Transmettre ce dossier au contentieux ?',
      outcomes: { validate: { time: '10:21', text: 'Décision enregistrée. Nadia transmet le dossier et poursuit la mission.' }, refuse: { time: '10:21', text: 'Dossier non transmis. Nadia le maintient en suivi.' }, modify: { time: '10:21', text: 'Nadia reprend le dossier avec vos consignes.' } },
    },
    {
      tab: 'Ventes', missionId: 'Mission VTE-018', missionTitle: 'Qualifier les nouveaux prospects',
      avatar: '/images/hugo-avatar.png',
      meta: [{ label: 'Collaborateur IA', value: 'Hugo' }, { label: 'Profil', value: 'Commercial' }, { label: 'Validation', value: 'Direction commerciale' }],
      activity: [{ time: '09:05', text: 'Hugo a analysé 34 entreprises.' }, { time: '09:12', text: '9 prospects correspondent aux critères.' }, { time: '09:18', text: 'Les fiches CRM sont prêtes.' }],
      decisionClient: '9 prospects qualifiés', decisionQuestion: 'Autoriser la préparation du premier contact ?',
      outcomes: { validate: { time: '09:21', text: 'Hugo prépare les prises de contact autorisées.' }, refuse: { time: '09:21', text: 'Aucun contact n’est préparé. Les prospects restent dans la sélection.' }, modify: { time: '09:21', text: 'Hugo applique vos nouveaux critères de qualification.' } },
    },
    {
      tab: 'Clients', missionId: 'Mission CLI-027', missionTitle: 'Préparer les réponses aux demandes',
      avatar: '/images/ines-avatar.png',
      meta: [{ label: 'Collaboratrice IA', value: 'Inès' }, { label: 'Profil', value: 'Relation client' }, { label: 'Validation', value: 'Responsable service client' }],
      activity: [{ time: '11:02', text: 'Inès a classé 18 demandes entrantes.' }, { time: '11:08', text: '13 réponses contextualisées sont prêtes.' }, { time: '11:11', text: '3 dossiers ont été orientés vers le bon service.' }],
      decisionClient: 'Demande de geste commercial', decisionQuestion: 'Accorder une remise exceptionnelle ?',
      outcomes: { validate: { time: '11:14', text: 'Inès intègre la remise validée dans la réponse.' }, refuse: { time: '11:14', text: 'La réponse est conservée sans remise.' }, modify: { time: '11:14', text: 'Inès reprend la proposition selon vos consignes.' } },
    },
    {
      tab: 'Direction', missionId: 'Mission DIR-011', missionTitle: 'Préparer la réunion de direction',
      avatar: '/images/emma-avatar.png',
      meta: [{ label: 'Collaboratrice IA', value: 'Emma' }, { label: 'Profil', value: 'Assistante de direction' }, { label: 'Validation', value: 'Direction générale' }],
      activity: [{ time: '08:32', text: 'Emma a réuni les documents utiles.' }, { time: '08:38', text: '5 points ouverts ont été identifiés.' }, { time: '08:44', text: 'L’ordre du jour est prêt.' }],
      decisionClient: 'Ordre du jour · Comité de direction', decisionQuestion: 'Ajouter le projet de réorganisation ?',
      outcomes: { validate: { time: '08:47', text: 'Emma ajoute le sujet et les documents associés.' }, refuse: { time: '08:47', text: 'Le sujet reste hors de cet ordre du jour.' }, modify: { time: '08:47', text: 'Emma reformule le sujet selon vos indications.' } },
    },
    {
      tab: 'Marketing', missionId: 'Mission MKT-036', missionTitle: 'Préparer le calendrier éditorial',
      avatar: '/images/lea-avatar.png',
      meta: [{ label: 'Collaboratrice IA', value: 'Léa' }, { label: 'Profil', value: 'Marketing' }, { label: 'Validation', value: 'Responsable marketing' }],
      activity: [{ time: '14:06', text: 'Léa a analysé les objectifs du trimestre.' }, { time: '14:12', text: '12 sujets ont été répartis par canal.' }, { time: '14:18', text: 'Le calendrier et les briefs sont prêts.' }],
      decisionClient: 'Campagne de lancement · Septembre', decisionQuestion: 'Valider les thèmes avant production ?',
      outcomes: { validate: { time: '14:21', text: 'Léa prépare les contenus à partir des thèmes validés.' }, refuse: { time: '14:21', text: 'La production reste en attente.' }, modify: { time: '14:21', text: 'Léa ajuste les thèmes et le calendrier.' } },
    },
  ],
  en: [
    {
      tab: 'Finance', missionId: 'Mission FIN-042', missionTitle: 'Follow up on overdue invoices',
      avatar: '/images/nadia-avatar.png',
      meta: [{ label: 'AI Collaborator', value: 'Nadia' }, { label: 'Profile', value: 'Finance' }, { label: 'Approval', value: 'Finance manager' }],
      activity: [{ time: '10:14', text: 'Nadia identified 12 overdue invoices.' }, { time: '10:16', text: '2 disputed files were protected.' }, { time: '10:18', text: '10 reminders are ready to send.' }],
      decisionClient: 'Dupont · €14,800', decisionQuestion: 'Escalate this file to collections?',
      outcomes: { validate: { time: '10:21', text: 'Decision recorded. Nadia escalates the file.' }, refuse: { time: '10:21', text: 'The file is not escalated and remains under watch.' }, modify: { time: '10:21', text: 'Nadia revises the file under your instructions.' } },
    },
    {
      tab: 'Sales', missionId: 'Mission SLS-018', missionTitle: 'Qualify new prospects',
      avatar: '/images/hugo-avatar.png',
      meta: [{ label: 'AI Collaborator', value: 'Hugo' }, { label: 'Profile', value: 'Sales' }, { label: 'Approval', value: 'Sales director' }],
      activity: [{ time: '09:05', text: 'Hugo analyzed 34 companies.' }, { time: '09:12', text: '9 prospects match the criteria.' }, { time: '09:18', text: 'CRM records are ready.' }],
      decisionClient: '9 qualified prospects', decisionQuestion: 'Authorize first-contact preparation?',
      outcomes: { validate: { time: '09:21', text: 'Hugo prepares the authorized outreach.' }, refuse: { time: '09:21', text: 'No outreach is prepared.' }, modify: { time: '09:21', text: 'Hugo applies your updated criteria.' } },
    },
    {
      tab: 'Customers', missionId: 'Mission CST-027', missionTitle: 'Prepare customer replies',
      avatar: '/images/ines-avatar.png',
      meta: [{ label: 'AI Collaborator', value: 'Inès' }, { label: 'Profile', value: 'Customer relations' }, { label: 'Approval', value: 'Customer service manager' }],
      activity: [{ time: '11:02', text: 'Inès classified 18 incoming requests.' }, { time: '11:08', text: '13 contextual replies are ready.' }, { time: '11:11', text: '3 cases were routed to the right team.' }],
      decisionClient: 'Commercial gesture request', decisionQuestion: 'Grant an exceptional discount?',
      outcomes: { validate: { time: '11:14', text: 'Inès includes the approved discount.' }, refuse: { time: '11:14', text: 'The reply is kept without a discount.' }, modify: { time: '11:14', text: 'Inès revises the proposal.' } },
    },
    {
      tab: 'Leadership', missionId: 'Mission LDR-011', missionTitle: 'Prepare the leadership meeting',
      avatar: '/images/emma-avatar.png',
      meta: [{ label: 'AI Collaborator', value: 'Emma' }, { label: 'Profile', value: 'Executive assistant' }, { label: 'Approval', value: 'Executive team' }],
      activity: [{ time: '08:32', text: 'Emma gathered the relevant documents.' }, { time: '08:38', text: '5 open points were identified.' }, { time: '08:44', text: 'The agenda is ready.' }],
      decisionClient: 'Executive meeting agenda', decisionQuestion: 'Add the reorganization project?',
      outcomes: { validate: { time: '08:47', text: 'Emma adds the topic and its documents.' }, refuse: { time: '08:47', text: 'The topic remains off this agenda.' }, modify: { time: '08:47', text: 'Emma reframes the topic as requested.' } },
    },
    {
      tab: 'Marketing', missionId: 'Mission MKT-036', missionTitle: 'Prepare the editorial calendar',
      avatar: '/images/lea-avatar.png',
      meta: [{ label: 'AI Collaborator', value: 'Léa' }, { label: 'Profile', value: 'Marketing' }, { label: 'Approval', value: 'Marketing manager' }],
      activity: [{ time: '14:06', text: 'Léa analyzed the quarter’s objectives.' }, { time: '14:12', text: '12 topics were assigned by channel.' }, { time: '14:18', text: 'The calendar and briefs are ready.' }],
      decisionClient: 'September launch campaign', decisionQuestion: 'Approve the themes before production?',
      outcomes: { validate: { time: '14:21', text: 'Léa prepares content from the approved themes.' }, refuse: { time: '14:21', text: 'Production remains on hold.' }, modify: { time: '14:21', text: 'Léa adjusts the themes and calendar.' } },
    },
  ],
}

export function SectionWorkspace({ lang = 'fr' }: { lang?: Lang }) {
  const t = T[lang]
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const tabsId = useId()
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

  const status = !decision
    ? { label: t.statusPending, color: '#AD0C53', bg: 'rgba(209,14,99,0.1)' }
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
      <div className="editorial-shell grid min-w-0 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="max-w-xl">
          <Kicker>{t.kicker}</Kicker>
          <h2 className="mt-4 text-balance text-[clamp(2.35rem,4vw,3.5rem)] font-bold leading-[.98] tracking-[-.05em] text-[#1C1A17]">
            {t.title}
          </h2>
          <p className="mt-5 max-w-lg text-pretty text-[17px] leading-relaxed text-[#4E483F]">{t.surfaces}</p>
          <Link
            href={localizedHref('workspace', lang)}
            className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full border border-[#D10E63] px-6 text-[15px] font-bold text-[#B00C54] transition-colors hover:bg-[#D10E63] hover:text-white"
          >
            {t.cta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div ref={ref} className="min-w-0">
          <div className="relative mb-3 after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:w-8 after:bg-gradient-to-l after:from-[#F3EFE6] after:to-transparent sm:after:hidden"><div className="flex max-w-full items-center gap-2 overflow-x-auto pb-1 pr-6 [scrollbar-width:none] sm:pr-0 [&::-webkit-scrollbar]:hidden" role="tablist" aria-label={lang === 'fr' ? 'Exemples de missions' : 'Mission examples'} onKeyDown={(event) => { if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return; const next = (scenarioIndex + (event.key === 'ArrowRight' ? 1 : -1) + scenarios.length) % scenarios.length; selectScenario(next); requestAnimationFrame(() => document.getElementById(`${tabsId}-tab-${next}`)?.focus()) }}>
            {scenarios.map((item, index) => <button key={item.tab} id={`${tabsId}-tab-${index}`} type="button" role="tab" aria-selected={scenarioIndex === index} aria-controls={`${tabsId}-panel`} tabIndex={scenarioIndex === index ? 0 : -1} onClick={() => selectScenario(index)} className={`min-h-10 shrink-0 rounded-full border px-4 text-xs font-bold outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] ${scenarioIndex === index ? 'border-[#D10E63] bg-[#D10E63] text-white' : 'border-[#D8D0C2] bg-[#FAF8F3] text-[#625B50] hover:border-[#D10E63]/40'}`}>{item.tab}</button>)}
          </div></div>
          <motion.div
            key={scenario.missionId}
            id={`${tabsId}-panel`}
            role="tabpanel"
            aria-labelledby={`${tabsId}-tab-${scenarioIndex}`}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={inView || reduce ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, ease }}
            className="overflow-hidden rounded-[20px] border border-[#E4DDCE] bg-[#FBF9F3] shadow-[0_24px_70px_-40px_rgba(28,26,23,0.4)]"
          >
          {/* Header */}
          <div className="border-b border-[#EEE7DA] px-5 py-4 sm:px-6">
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:justify-between">
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
            <dl className="mt-4 grid gap-3 border-t border-[#EEE7DA] pt-3.5 sm:grid-cols-3">
              {scenario.meta.map((m) => (
                <div key={m.label} className="min-w-0">
                   <dt className="font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-[#625B50] sm:text-[11px] sm:tracking-[0.1em]">{m.label}</dt>
                  <dd className="mt-1 flex min-h-6 items-center gap-2 break-words text-[12px] font-medium leading-snug text-[#2A2622] sm:text-[13px]">{m === scenario.meta[0] && <Image src={scenario.avatar} alt="" width={24} height={24} className="size-6 shrink-0 rounded-full object-cover ring-1 ring-[#D10E63]/20"/>}{m.value}</dd>
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
                  <div aria-live="polite">
                  {!decision ? (
                    <div className="rounded-md border border-[#E4DDCE] bg-[#F1EADF]/70 p-4">
                      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#AD0C53]">{t.decisionLabel}</p>
                      <p className="mt-2 text-[15px] font-semibold text-[#1C1A17]">{scenario.decisionClient}</p>
                      <p className="mt-0.5 text-[13.5px] text-[#4E483F]">{scenario.decisionQuestion}</p>
                      <div className="mt-3.5 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => setDecision('validate')}
                          className="inline-flex min-h-10 w-full items-center justify-center rounded-full bg-[#D10E63] px-5 text-[13.5px] font-bold text-[#FBF9F3] transition-colors hover:bg-[#B00B52] sm:w-auto"
                        >
                          {t.validate}
                        </button>
                        <button
                          type="button"
                          onClick={() => setDecision('modify')}
                          className="inline-flex min-h-10 w-full items-center justify-center rounded-full border border-[#D2C9B8] px-5 text-[13.5px] font-semibold text-[#4E483F] transition-colors hover:border-[#1C1A17] sm:w-auto"
                        >
                          {t.modify}
                        </button>
                        <button
                          type="button"
                          onClick={() => setDecision('refuse')}
                          className="inline-flex min-h-10 w-full items-center justify-center rounded-full border border-[#D2C9B8] px-5 text-[13.5px] font-semibold text-[#4E483F] transition-colors hover:border-[#1C1A17] sm:w-auto"
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
          <p className="mt-3 text-right text-xs font-semibold text-[#625B50]">{t.demo}</p>
        </div>
      </div>
    </section>
  )
}
