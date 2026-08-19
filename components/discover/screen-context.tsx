'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, Building2, Check, Pencil } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { AlmaHead } from './context-column'
import type { CompanyFact } from './types'

// Step 1 — Company. Alma shows the first context she prepared from the work
// domain, in ONE compact card. Every fact is editable inline. She never invents
// a value she isn't sure about: those show "À confirmer". One primary decision:
// confirm the company (or correct it first).
export function ScreenContext({
  lang,
  firstName,
  lastName,
  company,
  onChange,
  onIdentityChange,
  onContinue,
}: {
  lang: Lang
  firstName: string
  lastName: string
  company: CompanyFact[]
  onChange: (next: CompanyFact[]) => void
  onIdentityChange: (identity: { firstName: string; lastName: string }) => void
  onContinue: () => void
}) {
  const t = COPY[lang]
  const [editingKey, setEditingKey] = useState<string | null>(null)
  const [draft, setDraft] = useState('')
  const [status, setStatus] = useState<'ready' | 'confirmed'>('ready')
  const [logoFailed, setLogoFailed] = useState(false)
  const [firstNameTouched, setFirstNameTouched] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const domain = company.find((fact) => fact.key === 'domain')?.value.trim() ?? ''
  const companyName = company.find((fact) => fact.key === 'name')?.value.trim() ?? ''
  const firstNameMissing = !firstName.trim()
  const companyMissing = !companyName
  const domainMissing = !domain

  useEffect(() => setLogoFailed(false), [domain])

  function startEdit(fact: CompanyFact) {
    setEditingKey(fact.key)
    setDraft(fact.value)
  }

  function saveEdit(fact: CompanyFact) {
    onChange(
      company.map((f) =>
        f.key === fact.key ? { ...f, value: draft.trim(), uncertain: draft.trim() ? false : f.uncertain } : f,
      ),
    )
    setEditingKey(null)
  }

  // If a field is still open when the user confirms, commit it first — a click
  // on "Confirmer" never silently drops an in-progress edit.
  function confirmCompany() {
    setSubmitted(true)
    if (firstNameMissing || companyMissing || domainMissing) return
    if (editingKey) {
      const fact = company.find((f) => f.key === editingKey)
      if (fact) saveEdit(fact)
    }
    onIdentityChange({ firstName: firstName.trim(), lastName: lastName.trim() })
    setStatus('confirmed')
    window.setTimeout(onContinue, 650)
  }

  return (
    <div className="grid overflow-hidden rounded-[2rem] border border-[#DED5C5] bg-[#FBF9F3] shadow-[0_30px_80px_-42px_rgba(28,26,23,0.5)] lg:min-h-[31rem] lg:grid-cols-[minmax(16rem,1fr)_minmax(0,2fr)]">
      <section className="relative flex min-w-0 flex-col overflow-hidden bg-[#211E1A] px-6 py-7 text-[#FBF9F3] sm:px-8 lg:px-9">
        <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#D10E63]/15 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-32 -right-20 h-64 w-64 rounded-full border border-white/[0.06]" />

        <div className="relative flex h-full flex-col">
          <div className="flex items-center gap-3">
            <AlmaHead className="h-11 w-11 shrink-0 ring-1 ring-white/15" />
            <div className="leading-tight">
              <p className="font-sf text-[15px] font-bold text-white">{t.almaName}</p>
              <p className="mt-0.5 text-[12px] text-[#AAA197]">{t.almaRole}</p>
            </div>
          </div>

          <div className="mt-12">
            {firstName.trim() ? (
              <p className="font-sf text-[clamp(1.7rem,3vw,2.25rem)] font-semibold tracking-[-0.035em] text-white">
                {t.hello} {firstName.trim()}.
              </p>
            ) : (
              <p className="font-sf text-[clamp(1.7rem,3vw,2.25rem)] font-semibold tracking-[-0.035em] text-white">
                {t.welcome}
              </p>
            )}
            <div className="mt-5 flex max-w-sm items-start gap-2.5 text-pretty text-[14px] leading-7 text-[#C7BFB5]" aria-live="polite">
              {status === 'confirmed' && <Check className="mt-1.5 h-4 w-4 shrink-0 text-[#E38AB4]" strokeWidth={3} />}
              <p>
                {status === 'confirmed'
                    ? t.confirmed
                    : t.intro}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="flex min-w-0 flex-col px-6 py-7 sm:px-9 sm:py-8 lg:px-10 lg:py-9">
        <div>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-[11px] font-semibold text-[#4E483F]">
              {t.firstName}
              <input
                type="text"
                autoComplete="given-name"
                value={firstName}
                onChange={(event) => onIdentityChange({ firstName: event.target.value, lastName })}
                onBlur={() => setFirstNameTouched(true)}
                aria-invalid={(submitted || firstNameTouched) && firstNameMissing}
                className="mt-1.5 h-10 w-full rounded-xl border border-[#D8D0C2] bg-white px-3 text-[13px] text-[#1C1A17] outline-none focus:border-[#D10E63]/60 focus:ring-3 focus:ring-[#D10E63]/10"
              />
              {(submitted || firstNameTouched) && firstNameMissing && <span className="mt-1 block text-[10px] text-[#A80B50]">{t.required}</span>}
            </label>
            <label className="block text-[11px] font-semibold text-[#4E483F]">
              {t.lastName}
              <input
                type="text"
                autoComplete="family-name"
                value={lastName}
                onChange={(event) => onIdentityChange({ firstName, lastName: event.target.value })}
                aria-invalid={false}
                className="mt-1.5 h-10 w-full rounded-xl border border-[#D8D0C2] bg-white px-3 text-[13px] text-[#1C1A17] outline-none focus:border-[#D10E63]/60 focus:ring-3 focus:ring-[#D10E63]/10"
              />
              {!lastName.trim() && <span className="mt-1 block text-[10px] text-[#8A8175]">{t.optional}</span>}
            </label>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#E3DACB] bg-white text-[#8A8175] shadow-sm">
            {domain && !logoFailed ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={`https://logo.clearbit.com/${encodeURIComponent(domain)}`} alt="" className="h-full w-full object-contain p-1" onError={() => setLogoFailed(true)} />
            ) : (
              <Building2 className="h-5 w-5" />
            )}
          </span>
          <div>
            <h2 className="font-sf text-xl font-semibold tracking-[-0.025em] text-[#1C1A17]">{companyName || t.cardTitle}</h2>
          </div>
        </div>

        <dl className="mt-5 flex-1 divide-y divide-[#EBE4D6] border-y border-[#EBE4D6]">
          {company.filter((fact) => fact.key !== 'clients' && fact.key !== 'offer').map((fact) => {
            const isEditing = editingKey === fact.key
            const showToConfirm = fact.uncertain && !fact.value
            return (
              <div key={fact.key} className="grid gap-1.5 py-3.5 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-4">
                <dt className="pt-1 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[#8A8175]">
                  {fact.label[lang]}
                </dt>
                <dd className="min-w-0">
                  {isEditing ? (
                    <div>
                      <textarea
                        autoFocus
                        value={draft}
                        rows={2}
                        aria-label={fact.label[lang]}
                        onChange={(e) => setDraft(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
                            e.preventDefault()
                            saveEdit(fact)
                          }
                        }}
                        className="w-full resize-none rounded-xl border border-[#D10E63]/50 bg-white px-3 py-2 text-[13px] leading-relaxed text-[#1C1A17] outline-none focus:ring-4 focus:ring-[#D10E63]/10"
                      />
                      <div className="mt-2 flex gap-2">
                        <button
                          type="button"
                          onClick={() => saveEdit(fact)}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-[#D10E63] px-3 py-1.5 text-[12px] font-bold text-white transition-colors hover:bg-[#E51872]"
                        >
                          <Check className="h-3 w-3" strokeWidth={3} />
                          {t.save}
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingKey(null)}
                          className="rounded-lg border border-[#D8D0C2] bg-white px-3 py-1.5 text-[12px] font-semibold text-[#3B362F]"
                        >
                          {t.cancel}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => startEdit(fact)}
                      className="group flex w-full items-start justify-between gap-3 rounded-lg px-1 py-1 text-left transition-colors hover:bg-[#F3EEE5]"
                    >
                      {showToConfirm ? (
                        <span className="inline-flex items-center rounded-full bg-[#F3E8D6] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#9A7B34]">
                          {submitted && (fact.key === 'name' || fact.key === 'domain') ? t.required : t.toConfirm}
                        </span>
                      ) : (
                        <span className="text-[13px] leading-relaxed text-[#2D2924]">{fact.value}</span>
                      )}
                      <Pencil className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#B4327E] opacity-40 transition-opacity group-hover:opacity-100" />
                    </button>
                  )}
                </dd>
              </div>
            )
          })}
        </dl>

        <div className="mt-5 flex flex-col items-end">
          <button
            type="button"
            onClick={confirmCompany}
            disabled={status === 'confirmed'}
            className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#D10E63] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#E51872] disabled:cursor-wait disabled:opacity-80"
          >
            {status === 'confirmed' ? t.confirmedCta : t.confirm}
            {status === 'confirmed' ? (
              <Check className="h-4 w-4" strokeWidth={3} />
            ) : (
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            )}
          </button>
          <p className="mt-2 max-w-sm text-right text-[11px] leading-relaxed text-[#8A8175]">{t.ctaNote}</p>
        </div>
      </section>
    </div>
  )
}

const COPY = {
  fr: {
    hello: 'Bonjour',
    welcome: 'Bienvenue.',
    intro: 'Vérifiez les informations de votre entreprise.',
    confirmed: 'Parfait. Votre entreprise est prête. Passons au Collaborateur IA.',
    almaName: 'Alma',
    almaRole: 'Collaboratrice IA · Coordinatrice de missions chez Unitalk',
    cardTitle: 'Votre fiche entreprise',
    toConfirm: 'À confirmer',
    save: 'Enregistrer',
    cancel: 'Annuler',
    firstName: 'Votre prénom',
    lastName: 'Votre nom',
    optional: 'Facultatif',
    required: 'Ce champ est requis.',
    confirm: 'Vérifier et continuer',
    confirmedCta: 'Entreprise confirmée',
    ctaNote: 'Vous pourrez corriger ces informations à tout moment.',
  },
  en: {
    hello: 'Hello',
    welcome: 'Welcome.',
    intro: 'Review the information prepared from your work email address.',
    confirmed: 'Perfect. Your company is ready. Let’s move on to the AI Collaborator.',
    almaName: 'Alma',
    almaRole: 'AI mission coordinator · Unitalk',
    cardTitle: 'Your company profile',
    toConfirm: 'To confirm',
    save: 'Save',
    cancel: 'Cancel',
    firstName: 'Your first name',
    lastName: 'Your last name',
    optional: 'Optional',
    required: 'This field is required.',
    confirm: 'Review and continue',
    confirmedCta: 'Company confirmed',
    ctaNote: 'You can update this information at any time.',
  },
} as const
