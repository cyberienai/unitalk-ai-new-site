'use client'

import { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { AlmaHead } from './context-column'
import type { CompanyFact, MissionInfo } from './types'

export function ScreenMission({
  lang,
  company,
  mission,
  onDefine,
  onContinue,
}: {
  lang: Lang
  company: CompanyFact[]
  mission: MissionInfo
  onDefine: (next: MissionInfo) => void
  onContinue: () => void
}) {
  const t = COPY[lang]
  const [draft, setDraft] = useState<MissionInfo>(mission)
  const [submitted, setSubmitted] = useState(false)
  const companyName = company.find((fact) => fact.key === 'name')?.value || t.companyFallback
  const requiredMissing = !draft.title.trim() || !draft.target.trim() || !draft.result.trim() || !draft.validation.trim()

  function update(key: keyof MissionInfo, value: string) {
    setDraft((current) => ({ ...current, [key]: value }))
  }

  function continueFlow() {
    setSubmitted(true)
    if (requiredMissing) return
    onDefine(Object.fromEntries(Object.entries(draft).map(([key, value]) => [key, value.trim()])) as MissionInfo)
    onContinue()
  }

  return (
    <div className="grid overflow-hidden rounded-[2rem] border border-[#DED5C5] bg-[#FBF9F3] shadow-[0_30px_80px_-42px_rgba(28,26,23,0.5)] lg:grid-cols-[minmax(16rem,1fr)_minmax(0,2fr)]">
      <aside className="relative flex min-w-0 flex-col overflow-hidden bg-[#211E1A] px-6 py-7 text-white sm:px-8 lg:px-9">
        <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#D10E63]/15 blur-3xl" />
        <div className="relative flex h-full flex-col">
          <div className="flex items-center gap-3">
            <AlmaHead className="h-11 w-11 shrink-0 ring-1 ring-white/15" />
            <div><p className="font-sf text-[15px] font-bold">Alma</p><p className="mt-0.5 text-[12px] text-[#BDB5AC]">{t.almaRole}</p></div>
          </div>
          <p className="mt-8 text-pretty font-sf text-xl font-medium leading-relaxed text-[#F4EFE8]">“{t.alma}”</p>
          <div className="mt-8 border-t border-white/10 pt-5">
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#E38AB4]">{t.selectedMission}</p>
            <p className="mt-2 font-sf text-[18px] font-semibold leading-relaxed text-white">{mission.title}</p>
            <p className="mt-4 text-[13px] text-[#BDB5AC]">{companyName}</p>
          </div>
          <div className="mt-auto pt-7"><span className="inline-flex items-center gap-2 text-[11px] font-semibold text-[#E9E2D9]"><Check className="h-3.5 w-3.5 text-[#E38AB4]" strokeWidth={3} />{t.companyDone}</span></div>
        </div>
      </aside>

      <section className="min-w-0 px-6 py-7 sm:px-9 lg:px-10">
        <h2 className="font-sf text-[26px] font-bold tracking-[-0.03em]">{t.title}</h2>
        <p className="mt-2 text-sm leading-6 text-[#6E665A]">{t.intro}</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {FIELDS.map(({ key, required }) => (
            <label key={key} className={key === 'result' || key === 'validation' ? 'sm:col-span-2' : ''}>
              <span className="text-[11px] font-semibold text-[#4E483F]">{t.fields[key]}</span>
              {key === 'title' ? (
                <input value={draft[key]} onChange={(event) => update(key, event.target.value)} className="mt-1.5 h-10 w-full rounded-xl border border-[#D8D0C2] bg-white px-3 text-[13px] outline-none focus:border-[#D10E63]/60 focus:ring-3 focus:ring-[#D10E63]/10" />
              ) : (
                <textarea rows={key === 'result' || key === 'validation' ? 2 : 3} value={draft[key]} onChange={(event) => update(key, event.target.value)} placeholder={t.placeholders[key]} className="mt-1.5 w-full resize-none rounded-xl border border-[#D8D0C2] bg-white px-3 py-2 text-[13px] leading-5 outline-none focus:border-[#D10E63]/60 focus:ring-3 focus:ring-[#D10E63]/10" />
              )}
              {submitted && required && !draft[key].trim() && <span className="mt-1 block text-[10px] text-[#A80B50]">{t.required}</span>}
            </label>
          ))}
        </div>
        <div className="mt-6 flex justify-end">
          <button type="button" onClick={continueFlow} className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#D10E63] px-5 py-3 text-sm font-bold text-white hover:bg-[#E51872]">
            {t.continue}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </section>
    </div>
  )
}

const FIELDS: { key: keyof MissionInfo; required: boolean }[] = [
  { key: 'title', required: true },
  { key: 'target', required: true },
  { key: 'criteria', required: false },
  { key: 'sources', required: false },
  { key: 'exclusions', required: false },
  { key: 'result', required: true },
  { key: 'validation', required: true },
]

const COPY = {
  fr: {
    alma: 'J’ai préparé un premier cadre. Confirmez ce qui fait un bon prospect pour votre entreprise.', almaRole: 'Coordinatrice de missions IA · Unitalk', selectedMission: 'Mission à personnaliser', companyDone: 'Entreprise confirmée', companyFallback: 'Votre entreprise', title: 'Cadrez la mission.', intro: 'Alma a préparé les règles communes. Ajoutez surtout vos critères de qualification.', required: 'Ce champ est requis.', continue: 'Confirmer cette mission', fields: { title: 'Mission', target: 'Prospects concernés', criteria: 'Vos critères de qualification', sources: 'Sources autorisées', exclusions: 'À exclure', result: 'Résultat attendu', validation: 'Validations humaines', rule: 'Règle' }, placeholders: { title: '', target: 'Ex. prospects entrants et comptes ciblés', criteria: 'Ex. taille, secteur, zone, budget ou signaux d’intérêt', sources: 'Ex. CRM, site de l’entreprise et sources publiques', exclusions: 'Ex. clients existants, concurrents, contacts opposés', result: 'Décrivez le résultat utile attendu', validation: 'Ex. validation obligatoire avant toute prise de contact', rule: '' },
  },
  en: {
    alma: 'Let’s personalize this mission for your company.', almaRole: 'AI mission coordinator · Unitalk', selectedMission: 'Selected mission', companyDone: 'Company confirmed', companyFallback: 'Your company', title: 'Let’s refine your mission.', intro: 'Define the framework Alma and your AI Collaborator must follow.', required: 'This field is required.', continue: 'Confirm mission', fields: { title: 'Mission', target: 'Target', criteria: 'Criteria', sources: 'Authorized sources', exclusions: 'Exclusions', result: 'Expected result', validation: 'Human approvals', rule: 'Rule' }, placeholders: { title: '', target: 'e.g. French B2B software SMEs', criteria: 'e.g. size, industry, geography', sources: 'e.g. public websites, authorized CRM', exclusions: 'e.g. existing customers, competitors', result: 'Describe the useful expected result', validation: 'e.g. approval required before any outreach', rule: '' },
  },
} as const
