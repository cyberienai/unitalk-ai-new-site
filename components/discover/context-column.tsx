'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Check, Mic, MessageSquare, ShieldCheck, FileText, Lock } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { useAlma } from '@/lib/alma-context'
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

/** Step 1 + generic: dark Alma card (voice / write). */
function AlmaCard({ lang }: { lang: Lang }) {
  const { openAlma } = useAlma()
  const t = {
    fr: {
      badge: 'Alma · Conseillère IA',
      title: 'Vous préférez en parler ?',
      body: 'Présentez votre activité à Alma. Elle vous écoute, précise vos priorités et prépare la suite avec vous.',
      talk: 'Parler à Alma',
      write: 'Écrire à Alma',
      micro: 'Le micro est activé uniquement avec votre accord.',
    },
    en: {
      badge: 'Alma · AI advisor',
      title: 'Prefer to talk it through?',
      body: 'Introduce your business to Alma. She listens, sharpens your priorities and prepares what comes next with you.',
      talk: 'Talk to Alma',
      write: 'Write to Alma',
      micro: 'The mic turns on only with your consent.',
    },
  }[lang]

  return (
    <div className="rounded-2xl bg-[#17130F] p-6 text-[#FBF9F3]">
      <div className="flex items-center gap-3">
        <AlmaHead />
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF7DAC]">
            {t.badge}
          </p>
          <p className="mt-0.5 flex items-center gap-1.5 text-xs text-[#C6BFB3]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4ADE80]" />
            {lang === 'fr' ? 'En ligne' : 'Online'}
          </p>
        </div>
      </div>
      <h3 className="mt-5 font-sf text-xl font-bold leading-snug tracking-[-0.01em]">{t.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[#C6BFB3]">{t.body}</p>
      <div className="mt-5 flex flex-col gap-2.5">
        <button
          type="button"
          onClick={openAlma}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#D10E63] px-4 py-3 text-sm font-bold text-[#FBF9F3] transition-colors hover:bg-[#E51872]"
        >
          <Mic className="h-4 w-4" />
          {t.talk}
        </button>
        <button
          type="button"
          onClick={openAlma}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-[#FBF9F3] transition-colors hover:bg-white/[0.09]"
        >
          <MessageSquare className="h-4 w-4" />
          {t.write}
        </button>
      </div>
      <p className="mt-4 text-[11px] leading-relaxed text-[#8E867A]">{t.micro}</p>
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
        {lang === 'fr' ? 'Contexte de l’Organisation' : 'Organization context'}
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

export function ContextColumn({ state, lang }: { state: FlowState; lang: Lang }) {
  return (
    <div className="lg:sticky lg:top-8">
      {state.step === 'start' && <AlmaCard lang={lang} />}
      {state.step === 'context' && <ContextPanel lang={lang} progress={state.contextProgress} />}
      {state.step === 'proposal' && <ProposalSummary lang={lang} missionSlug={state.missionSlug} />}
      {(state.step === 'connect' || state.step === 'workspace') && <Reassurance lang={lang} />}
    </div>
  )
}

export { AlmaHead }
export const CONTEXT_TOTAL = CONTEXT_ITEMS_TOTAL
