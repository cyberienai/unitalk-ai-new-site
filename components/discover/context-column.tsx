'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Check, ShieldCheck, FileText, Lock } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { CONTEXT_ITEMS_TOTAL, getMission, type FlowState } from './types'

function AlmaHead({ className = 'h-10 w-10' }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/alma-avatar.png"
      alt="Alma"
      className={`${className} rounded-full object-cover ring-2 ring-[#D10E63]/60`}
    />
  )
}

/** Step 1: recap of the already-chosen entry point + guarantees. */
function EntryRecap({ state, lang }: { state: FlowState; lang: Lang }) {
  const entry = state.entry ?? 'company'
  const mission = getMission(state.missionSlug)
  const heading = {
    company: { fr: 'Votre entreprise', en: 'Your company' },
    mission: { fr: 'Votre mission', en: 'Your mission' },
    profile: { fr: 'Votre profil métier', en: 'Your job profile' },
  }[entry][lang]
  const factLabel =
    entry === 'company'
      ? lang === 'fr'
        ? 'Site à analyser'
        : 'Site to analyze'
      : lang === 'fr'
        ? 'Première mission'
        : 'First mission'
  const fact =
    entry === 'company'
      ? state.domain || (lang === 'fr' ? 'À préciser avec Alma' : 'To confirm with Alma')
      : mission.title[lang]
  const guarantees =
    lang === 'fr'
      ? ['7 jours gratuits', 'Hébergé en France', 'Conforme au RGPD']
      : ['7 days free', 'Hosted in France', 'GDPR compliant']

  return (
    <div className="rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-6">
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A8175]">
        {lang === 'fr' ? 'Point de départ' : 'Starting point'}
      </p>
      <h3 className="mt-3 font-sf text-lg font-bold tracking-[-0.01em] text-[#1C1A17]">{heading}</h3>
      <div className="mt-4 rounded-xl border border-[#E4DDCE] bg-white/60 p-3.5">
        <p className="text-xs font-medium text-[#8A8175]">{factLabel}</p>
        <p className="mt-0.5 text-sm font-semibold text-[#1C1A17]">{fact}</p>
      </div>
      <p className="mt-4 text-[11px] leading-relaxed text-[#8A8175]">
        {lang === 'fr'
          ? 'Alma part de ce point pour construire le contexte de votre entreprise. Vous gardez la main à chaque étape.'
          : 'Alma starts from here to build your company context. You stay in control at every step.'}
      </p>
      <ul className="mt-4 flex flex-col gap-2.5 border-t border-[#EBE4D6] pt-4">
        {guarantees.map((g) => (
          <li key={g} className="flex items-center gap-2.5 text-sm text-[#3B362F]">
            <Check className="h-4 w-4 shrink-0 text-[#D10E63]" strokeWidth={2.5} />
            {g}
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Step 2: Organization context building live. */
function ContextPanel({ lang, progress }: { lang: Lang; progress: number }) {
  const reduce = useReducedMotion()
  const items = {
    fr: ['Activité comprise', 'Offre identifiée', 'Clients précisés', 'Priorité définie', 'Méthodes recueillies', 'Validations préparées'],
    en: ['Business understood', 'Offer identified', 'Customers clarified', 'Priority defined', 'Methods captured', 'Approvals prepared'],
  }[lang]

  return (
    <div className="rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-6">
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A8175]">
        {lang === 'fr' ? 'Contexte de votre entreprise' : 'Your company context'}
      </p>
      <ul className="mt-4 flex flex-col gap-2.5">
        {items.map((label, i) => {
          const filled = i < progress
          return (
            <motion.li
              key={label}
              initial={false}
              animate={{ opacity: filled ? 1 : 0.5 }}
              className="flex items-center gap-3"
            >
              <span
                className={[
                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors',
                  filled ? 'bg-[#D10E63] text-[#FBF9F3]' : 'border border-[#D8D0C2] bg-transparent text-transparent',
                ].join(' ')}
              >
                {filled && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
              </span>
              <span className={filled ? 'text-sm font-semibold text-[#1C1A17]' : 'text-sm text-[#9A9184]'}>
                {label}
              </span>
            </motion.li>
          )
        })}
      </ul>

      <div className="mt-5 flex flex-wrap gap-2 border-t border-[#EBE4D6] pt-4">
        {(lang === 'fr'
          ? [{ i: FileText, t: 'Voir les sources' }, { i: Check, t: 'Corriger' }, { i: Lock, t: 'Gérer les accès' }]
          : [{ i: FileText, t: 'View sources' }, { i: Check, t: 'Correct' }, { i: Lock, t: 'Manage access' }]
        ).map(({ i: Icon, t }) => (
          <span
            key={t}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#E1D9C9] bg-white/60 px-2.5 py-1 text-[11px] font-medium text-[#5A544A]"
          >
            <Icon className="h-3 w-3" />
            {t}
          </span>
        ))}
      </div>

      <p className="mt-4 text-[11px] leading-relaxed text-[#8A8175]">
        {lang === 'fr'
          ? 'Ce contexte est construit une fois, puis enrichi au fil du travail. Chaque Collaborateur IA reçoit uniquement les connaissances autorisées pour ses missions.'
          : 'This context is built once, then enriched as work happens. Each AI Collaborator receives only the knowledge authorized for its missions.'}
      </p>
      {!reduce && null}
    </div>
  )
}

/** Step 3: proposal summary. */
function ProposalSummary({ lang, missionSlug }: { lang: Lang; missionSlug: string }) {
  const mission = getMission(missionSlug)
  return (
    <div className="rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-6">
      <div className="flex items-center gap-3">
        <AlmaHead className="h-9 w-9" />
        <p className="text-sm font-semibold text-[#1C1A17]">
          {lang === 'fr' ? 'Résumé d’Alma' : 'Alma’s summary'}
        </p>
      </div>
      <dl className="mt-5 flex flex-col gap-4 text-sm">
        <div>
          <dt className="text-xs font-medium text-[#8A8175]">{lang === 'fr' ? 'Première mission' : 'First mission'}</dt>
          <dd className="mt-0.5 font-semibold text-[#1C1A17]">{mission.title[lang]}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-[#8A8175]">{lang === 'fr' ? 'Profil métier' : 'Job profile'}</dt>
          <dd className="mt-0.5 font-semibold text-[#1C1A17]">{mission.profile[lang]}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-[#8A8175]">{lang === 'fr' ? 'Résultat attendu' : 'Expected result'}</dt>
          <dd className="mt-0.5 leading-relaxed text-[#3B362F]">{mission.result[lang]}</dd>
        </div>
      </dl>
    </div>
  )
}

/** Step 4 + 5: reassurance / Alma available. */
function Reassurance({ lang }: { lang: Lang }) {
  const points =
    lang === 'fr'
      ? ['7 jours gratuits', 'Hébergé en France', 'Conforme au RGPD', 'Il appartient à votre organisation']
      : ['7 days free', 'Hosted in France', 'GDPR compliant', 'It belongs to your organization']
  return (
    <div className="rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-6">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D10E63]/[0.1] text-[#D10E63]">
          <ShieldCheck className="h-5 w-5" />
        </span>
        <p className="text-sm font-semibold text-[#1C1A17]">
          {lang === 'fr' ? 'Vos garanties' : 'Your guarantees'}
        </p>
      </div>
      <ul className="mt-5 flex flex-col gap-3">
        {points.map((p) => (
          <li key={p} className="flex items-center gap-2.5 text-sm text-[#3B362F]">
            <Check className="h-4 w-4 shrink-0 text-[#D10E63]" strokeWidth={2.5} />
            {p}
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Locked mission decisions — kept visible while Alma works the later steps. */
function MissionRecap({ lang, missionSlug }: { lang: Lang; missionSlug: string }) {
  const m = getMission(missionSlug)
  const rows = [
    { label: lang === 'fr' ? 'Résultat attendu' : 'Expected result', value: m.result[lang] },
    { label: lang === 'fr' ? 'Rythme' : 'Cadence', value: m.deliveryTime[lang] },
    { label: lang === 'fr' ? 'Validation' : 'Approval', value: m.validation[lang] },
  ]
  return (
    <div className="rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-6">
      <div className="flex items-center gap-2">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2E9E5B] text-[#FBF9F3]">
          <Check className="h-3 w-3" strokeWidth={3} />
        </span>
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#1F7A45]">
          {lang === 'fr' ? 'Mission définie' : 'Mission defined'}
        </p>
      </div>
      <h3 className="mt-3 font-sf text-base font-bold leading-snug tracking-[-0.01em] text-[#1C1A17]">
        {m.title[lang]}
      </h3>
      <dl className="mt-4 flex flex-col gap-3 border-t border-[#EBE4D6] pt-4">
        {rows.map((r) => (
          <div key={r.label}>
            <dt className="text-[11px] font-medium text-[#8A8175]">{r.label}</dt>
            <dd className="mt-0.5 text-[13px] leading-relaxed text-[#3B362F]">{r.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export function ContextColumn({ state, lang }: { state: FlowState; lang: Lang }) {
  return (
    <div className="flex flex-col gap-4 lg:sticky lg:top-8">
      {state.step === 'mission' && <EntryRecap state={state} lang={lang} />}
      {state.step === 'entreprise' && (
        <>
          <MissionRecap lang={lang} missionSlug={state.missionSlug} />
          <ContextPanel lang={lang} progress={state.contextProgress} />
        </>
      )}
      {state.step === 'savoirfaire' && <MissionRecap lang={lang} missionSlug={state.missionSlug} />}
      {state.step === 'affectation' && <ProposalSummary lang={lang} missionSlug={state.missionSlug} />}
      {(state.step === 'acces' || state.step === 'workspace') && <Reassurance lang={lang} />}
    </div>
  )
}

export { AlmaHead }
export const CONTEXT_TOTAL = CONTEXT_ITEMS_TOTAL
