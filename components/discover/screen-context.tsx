'use client'

import { useState } from 'react'
import { ArrowRight, Check, Pencil } from 'lucide-react'
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
}: {
  lang: Lang
  company: CompanyFact[]
  onChange: (next: CompanyFact[]) => void
  onContinue: () => void
}) {
  const t = COPY[lang]
  const [editingKey, setEditingKey] = useState<string | null>(null)
  const [draft, setDraft] = useState('')

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
    onContinue()
  }

  return (
    <div className="mx-auto w-full max-w-[560px]">
      <p className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-[#D10E63]">{t.kicker}</p>
      <h1 className="mt-3 text-balance font-sf text-[clamp(1.6rem,3.4vw,2.3rem)] font-semibold leading-tight tracking-[-0.03em] text-[#1C1A17]">
        {t.title}
      </h1>
      <p className="mt-3 max-w-lg text-pretty text-[15px] leading-relaxed text-[#4E483F]">{t.subtitle}</p>

      {/* One compact company card */}
      <div className="mt-7 overflow-hidden rounded-3xl border border-[#EAE3D5] bg-white shadow-[0_1px_0_rgba(255,255,255,0.7)_inset,0_28px_50px_-34px_rgba(28,26,23,0.4)]">
        <div className="flex items-center gap-2.5 border-b border-[#EFE8DA] bg-[#FBF9F3] px-5 py-3.5">
          <AlmaHead className="h-6 w-6 shrink-0" />
          <p className="text-[13px] leading-relaxed text-[#6B6459]">
            <span className="font-semibold text-[#1C1A17]">{t.almaName}</span>
            <span className="mx-1.5 text-[#C7BFB0]">·</span>
            {t.almaLine}
          </p>
        </div>

        <dl className="divide-y divide-[#EFE8DA]">
          {company.map((fact) => {
            const isEditing = editingKey === fact.key
            const showToConfirm = fact.uncertain && !fact.value
            return (
              <div key={fact.key} className="flex items-start gap-4 px-5 py-4">
                <dt className="w-24 shrink-0 pt-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#8A8175]">
                  {fact.label[lang]}
                </dt>
                <dd className="min-w-0 flex-1">
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
                        className="w-full resize-none rounded-lg border border-[#D10E63]/50 bg-white px-2.5 py-1.5 text-[14px] leading-relaxed text-[#1C1A17] outline-none focus:ring-4 focus:ring-[#D10E63]/10"
                      />
                      <div className="mt-2 flex gap-2">
                        <button
                          type="button"
                          onClick={() => saveEdit(fact)}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-[#D10E63] px-3 py-1.5 text-[13px] font-bold text-[#FBF9F3] transition-colors hover:bg-[#E51872]"
                        >
                          <Check className="h-3.5 w-3.5" strokeWidth={3} />
                          {t.save}
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingKey(null)}
                          className="rounded-lg border border-[#D8D0C2] bg-white px-3 py-1.5 text-[13px] font-semibold text-[#3B362F]"
                        >
                          {t.cancel}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => startEdit(fact)}
                      className="group flex w-full items-start justify-between gap-3 rounded-lg px-1 py-0.5 text-left transition-colors hover:bg-[#F6F1E7]"
                    >
                      {showToConfirm ? (
                        <span className="inline-flex items-center rounded-full bg-[#F3E8D6] px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#9A7B34]">
                          {t.toConfirm}
                        </span>
                      ) : (
                        <span className="text-[14px] leading-relaxed text-[#1C1A17]">{fact.value}</span>
                      )}
                      <Pencil className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#C7BFB0] opacity-0 transition-opacity group-hover:opacity-100" />
                    </button>
                  )}
                </dd>
              </div>
            )
          })}
        </dl>
      </div>

      <div className="mt-7">
        <button
          type="button"
          onClick={confirmCompany}
          className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#D10E63] px-6 py-3.5 text-sm font-bold text-[#FBF9F3] transition-colors hover:bg-[#E51872]"
        >
          {t.confirm}
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>
      </div>

      <p className="mt-4 text-[12px] leading-relaxed text-[#6E665A]">{t.note}</p>
    </div>
  )
}

const COPY = {
  fr: {
    kicker: 'Entreprise',
    title: 'Voici votre entreprise.',
    subtitle: 'Alma a préparé ce premier contexte à partir de votre domaine professionnel.',
    almaName: 'Alma',
    almaLine: 'Vérifiez, corrigez si besoin, puis confirmez.',
    toConfirm: 'À confirmer',
    save: 'Enregistrer',
    cancel: 'Annuler',
    confirm: 'Confirmer mon entreprise',
    note: 'Cliquez sur une information pour la modifier. Rien n’est envoyé sans votre accord.',
  },
  en: {
    kicker: 'Company',
    title: 'Here is your company.',
    subtitle: 'Alma prepared this first context from your work domain.',
    almaName: 'Alma',
    almaLine: 'Check, correct if needed, then confirm.',
    toConfirm: 'To confirm',
    save: 'Save',
    cancel: 'Cancel',
    confirm: 'Confirm my company',
    note: 'Click any information to edit it. Nothing is sent without your consent.',
  },
} as const
