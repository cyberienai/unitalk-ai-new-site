'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
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

const T = {
  fr: {
    kicker: 'Workspace',
    title: 'Les humains décident. Les Collaborateurs IA agissent.',
    surfaces: 'Le Workspace privé réunit les missions, l’activité, les validations et les résultats. Vos équipes voient ce qui se passe, interviennent quand c’est nécessaire et gardent le contrôle des décisions.',
    surfacesList: 'Web · Desktop · Messageries · Terminal',
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
    modify: 'Modifier',
    validate: 'Valider',
    outcomes: {
      validate: { time: '10:21', text: 'Décision enregistrée. Emma transmet le dossier et poursuit la mission.' },
      refuse: { time: '10:21', text: 'Dossier non transmis. Emma le maintient en suivi et vous alerte à la prochaine échéance.' },
      modify: { time: '10:21', text: 'Emma reprend le dossier avec vos consignes avant toute transmission.' },
    },
  },
  en: {
    kicker: 'Workspace',
    title: 'Humans decide. AI Collaborators act.',
    surfaces: 'The private Workspace brings together missions, activity, validations and results. Your teams see what is happening, step in when needed and keep control of the decisions.',
    surfacesList: 'Web · Desktop · Messaging · Terminal',
    cta: 'Discover the Workspace',
    missionId: 'Mission FIN-042',
    statusPending: 'Awaiting validation',
    statusValidated: 'Validated',
    statusRefused: 'Decision declined',
    statusModify: 'To review',
    missionTitle: 'Chase unpaid invoices',
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
    modify: 'Amend',
    validate: 'Validate',
    outcomes: {
      validate: { time: '10:21', text: 'Decision recorded. Emma escalates the file and continues the mission.' },
      refuse: { time: '10:21', text: 'File not escalated. Emma keeps it under watch and alerts you at the next due date.' },
      modify: { time: '10:21', text: 'Emma resumes the file with your instructions before any escalation.' },
    },
  },
} as const

export function SectionWorkspace({ lang = 'fr' }: { lang?: Lang }) {
  const t = T[lang]
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })

  const [hasReached, setReached] = useState(false)
  const [decision, setDecision] = useState<Decision>(null)
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
    ? { label: t.statusPending, color: '#D10E63', bg: 'rgba(209,14,99,0.1)' }
    : decision === 'validate'
      ? { label: t.statusValidated, color: '#1F7A46', bg: 'rgba(46,158,91,0.12)' }
      : decision === 'refuse'
        ? { label: t.statusRefused, color: '#6E655A', bg: 'rgba(138,128,115,0.14)' }
        : { label: t.statusModify, color: '#6E655A', bg: 'rgba(138,128,115,0.14)' }

  const outcome = decision ? t.outcomes[decision] : null

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
            className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#1C1A17] underline decoration-[#D8D0C2] underline-offset-4 transition-colors hover:decoration-[#D10E63]"
          >
            {t.cta}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-4 font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-[#625B50]">{t.surfacesList}</p>
        </div>

        {/* The mission sheet */}
        <motion.div
          ref={ref}
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={inView || reduce ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="overflow-hidden rounded-lg border border-[#E4DDCE] bg-[#FBF9F3] shadow-[0_24px_70px_-40px_rgba(28,26,23,0.4)]"
        >
          {/* Header */}
          <div className="border-b border-[#EEE7DA] px-5 py-4 sm:px-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#6E655A]">{t.missionId}</p>
                <h3 className="mt-1.5 font-sf text-[1.15rem] font-semibold tracking-[-0.015em] text-[#1C1A17]">{t.missionTitle}</h3>
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
              {t.meta.map((m) => (
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
              {t.activity.map((a) => (
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
                      <p className="mt-2 text-[15px] font-semibold text-[#1C1A17]">{t.decisionClient}</p>
                      <p className="mt-0.5 text-[13.5px] text-[#4E483F]">{t.decisionQuestion}</p>
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
                      {t.decisionClient} · {status.label}
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
    </section>
  )
}
