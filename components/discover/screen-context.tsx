'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, Building2, Check, Loader2, Pencil } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { AlmaHead } from './context-column'
import type { CompanyFact } from './types'

// Step 1 — Company. Alma shows the first context she prepared from the work
// domain, in ONE compact card. Every fact is editable inline. She never invents
// a value she isn't sure about: those show "À confirmer". One primary decision:
// confirm the company (or correct it first).
export function ScreenContext({
  lang,
  company,
  onChange,
  onContinue,
  stepper,
}: {
  lang: Lang
  company: CompanyFact[]
  onChange: (next: CompanyFact[]) => void
  onContinue: () => void
  stepper: React.ReactNode
}) {
  const t = COPY[lang]
  const [editingKey, setEditingKey] = useState<string | null>(null)
  const [draft, setDraft] = useState('')
  const [status, setStatus] = useState<'loading' | 'ready' | 'confirmed'>('loading')
  const [logoFailed, setLogoFailed] = useState(false)
  const [clientsTouched, setClientsTouched] = useState(false)
  const [showSoftValidation, setShowSoftValidation] = useState(false)

  const domain = company.find((fact) => fact.key === 'domain')?.value.trim() ?? ''
  const companyName = company.find((fact) => fact.key === 'name')?.value.trim() ?? ''

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setStatus((current) => (current === 'loading' ? 'ready' : current))
    }, 700)
    return () => window.clearTimeout(timer)
  }, [])

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
    if (editingKey) {
      const fact = company.find((f) => f.key === editingKey)
      if (fact) saveEdit(fact)
    }
    if (!clientsTouched && !company.find((fact) => fact.key === 'clients')?.value) {
      setShowSoftValidation(true)
    }
    setStatus('confirmed')
    window.setTimeout(onContinue, 650)
  }

  function updateClients(value: string) {
    setClientsTouched(true)
    setShowSoftValidation(false)
    onChange(
      company.map((fact) =>
        fact.key === 'clients' ? { ...fact, value, uncertain: value.trim() ? false : fact.uncertain } : fact,
      ),
    )
  }

  return (
    <div className="grid overflow-hidden rounded-[2rem] border border-[#DED5C5] bg-[#FBF9F3] shadow-[0_30px_80px_-42px_rgba(28,26,23,0.5)] lg:min-h-[34rem] lg:grid-cols-[minmax(19rem,0.8fr)_minmax(0,1.2fr)]">
      <section className="relative flex min-w-0 flex-col overflow-hidden bg-[#211E1A] px-6 py-8 text-[#FBF9F3] sm:px-9 lg:px-10 lg:py-10">
        <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#D10E63]/15 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-32 -right-20 h-64 w-64 rounded-full border border-white/[0.06]" />

        <div className="relative flex h-full flex-col">
          <div className="mb-7 hidden md:block">{stepper}</div>

          <div className="flex items-center gap-3">
            <AlmaHead className="h-11 w-11 shrink-0 ring-1 ring-white/15" />
            <div className="leading-tight">
              <p className="font-sf text-[15px] font-bold text-white">{t.almaName}</p>
              <p className="mt-0.5 text-[12px] text-[#AAA197]">{t.almaRole}</p>
            </div>
          </div>

          <div className="my-auto py-9 lg:py-8">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#E38AB4]">{t.kicker}</p>
            <h1 className="mt-3 max-w-md text-balance font-sf text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.03] tracking-[-0.045em] text-white">
              {t.title}
            </h1>
            <div className="mt-5 flex max-w-sm items-start gap-2.5 text-pretty text-[14px] leading-7 text-[#C7BFB5]" aria-live="polite">
              {status === 'loading' && <Loader2 className="mt-1.5 h-4 w-4 shrink-0 animate-spin text-[#E38AB4]" />}
              {status === 'confirmed' && <Check className="mt-1.5 h-4 w-4 shrink-0 text-[#E38AB4]" strokeWidth={3} />}
              <p>{status === 'loading' ? t.loading : status === 'confirmed' ? t.confirmed : t.prefilled}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="flex min-w-0 flex-col px-6 py-7 sm:px-9 sm:py-8 lg:px-10 lg:py-9">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#E3DACB] bg-white text-[#8A8175] shadow-sm">
            {domain && !logoFailed ? (
              // Clearbit serves a domain logo directly; onError keeps the form usable when none exists.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={`https://logo.clearbit.com/${encodeURIComponent(domain)}`}
                alt=""
                className="h-full w-full object-contain p-1"
                onError={() => setLogoFailed(true)}
              />
            ) : (
              <Building2 className="h-5 w-5" />
            )}
          </span>
          <div>
            <h2 className="font-sf text-xl font-semibold tracking-[-0.025em] text-[#1C1A17]">{companyName || t.cardTitle}</h2>
            <p className="mt-0.5 text-[11px] text-[#8A8175]">{t.cardTitle}</p>
          </div>
        </div>

        <dl className="mt-5 flex-1 divide-y divide-[#EBE4D6] border-y border-[#EBE4D6]">
          {company.map((fact) => {
            const isEditing = editingKey === fact.key
            const showToConfirm = fact.uncertain && !fact.value
            return (
              <div key={fact.key} className="grid gap-1.5 py-3.5 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-4">
                <dt className="pt-1 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[#8A8175]">
                  {fact.label[lang]}
                </dt>
                <dd className="min-w-0">
                  {fact.key === 'clients' ? (
                    <div>
                      <div className="flex flex-wrap gap-1.5">
                        {CLIENT_OPTIONS[lang].map((option) => {
                          const selected = fact.value === option
                          return (
                            <button
                              key={option}
                              type="button"
                              aria-pressed={selected}
                              onClick={() => updateClients(option)}
                              className={[
                                'rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-colors',
                                selected
                                  ? 'border-[#D10E63] bg-[#D10E63]/10 text-[#B00C54]'
                                  : 'border-[#DED5C5] bg-white text-[#6E665A] hover:border-[#D10E63]/40',
                              ].join(' ')}
                            >
                              {option}
                            </button>
                          )
                        })}
                      </div>
                      <input
                        type="text"
                        value={fact.value}
                        onChange={(event) => updateClients(event.target.value)}
                        placeholder={t.clientsOther}
                        aria-label={t.clientsOther}
                        className="mt-2 w-full rounded-lg border border-[#DED5C5] bg-white px-3 py-2 text-[12px] text-[#1C1A17] outline-none placeholder:text-[#A79F91] focus:border-[#D10E63]/50 focus:ring-3 focus:ring-[#D10E63]/10"
                      />
                    </div>
                  ) : isEditing ? (
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
                          {t.toConfirm}
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
          {showSoftValidation && <p className="mt-1 text-right text-[11px] text-[#9A7B34]">{t.softValidation}</p>}
        </div>
      </section>
    </div>
  )
}

const COPY = {
  fr: {
    kicker: 'Entreprise',
    title: 'Voici votre entreprise.',
    loading: 'Je consulte les informations publiques sur votre entreprise…',
    prefilled: "J’ai trouvé ces informations à partir de votre domaine professionnel. Corrigez ce qui ne correspond pas.",
    confirmed: 'Parfait. Votre entreprise est prête. Passons à la mission.',
    almaName: 'Alma',
    almaRole: 'Conseillère en transformation IA',
    cardTitle: 'Votre fiche entreprise',
    toConfirm: 'À confirmer',
    save: 'Enregistrer',
    cancel: 'Annuler',
    clientsOther: 'Autre type de clients…',
    confirm: "C’est correct · Définir ma mission",
    confirmedCta: 'Entreprise confirmée',
    ctaNote: 'Alma va vous guider pour décrire votre première mission.',
    softValidation: 'Vous pourrez modifier la fiche depuis le Workspace.',
  },
  en: {
    kicker: 'Company',
    title: 'Here is your company.',
    loading: 'I’m checking public information about your company…',
    prefilled: 'I found this information from your work domain. Correct anything that does not match.',
    confirmed: 'Perfect. Your company is ready. Let’s move on to the mission.',
    almaName: 'Alma',
    almaRole: 'AI transformation advisor',
    cardTitle: 'Your company profile',
    toConfirm: 'To confirm',
    save: 'Save',
    cancel: 'Cancel',
    clientsOther: 'Another customer type…',
    confirm: 'Looks right · Define my mission',
    confirmedCta: 'Company confirmed',
    ctaNote: 'Alma will guide you through describing your first mission.',
    softValidation: 'You can edit this profile later from the Workspace.',
  },
} as const

const CLIENT_OPTIONS = {
  fr: ['TPE', 'PME', 'ETI', 'Grand compte', 'Collectivité', 'Association', 'Particuliers'],
  en: ['Small business', 'SME', 'Mid-market', 'Enterprise', 'Public sector', 'Nonprofit', 'Consumers'],
} as const
