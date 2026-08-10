'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/lib/language-context'
import { minimumCreditBudget, type BillingCycle, type UsageMode } from '@/lib/pricing-config'
import {
  normalizeQuantity,
  getTierForQuantity,
  getNextTier,
  calculateMonthlySubscription,
  calculateQuantitySavings,
  calculateAnnualSubscription,
  calculateAnnualEquivalentMonthly,
  calculateAnnualSavings,
  calculateMonthlyCreditBudget,
  calculateEstimatedMonthlyTotal,
  calculateAmountDueAfterTrial,
} from '@/lib/pricing-calculator'
import { formatEuro } from './format'
import { ProfessionalPresence } from './professional-presence'
import { MultimodalAccess } from './multimodal-access'
import { UsageModeSelector } from './usage-mode-selector'
import { PricingSummary } from './pricing-summary'

const COPY = {
  fr: {
    heading: 'Composez votre équipe.',
    billingLegend: 'Cycle de facturation',
    monthly: 'Mensuelle',
    annual: 'Annuelle · 2 mois offerts',
    monthlyNote: 'Facturation mensuelle · Résiliable à tout moment',
    annualNote: 'Deux mois offerts · Facturation annuelle après l’essai',
    quantityLabel: 'NOMBRE DE COLLABORATEURS IA',
    decrease: 'Retirer un Collaborateur IA',
    increase: 'Ajouter un Collaborateur IA',
    collab: (n: number) => `${n} Collaborateur${n > 1 ? 's' : ''} IA`,
    unit: (p: string) => `${p} chacun / mois`,
    planTotal: (p: string) => `${p} / mois`,
    savings: (p: string) => `Économie liée au nombre : ${p} / mois`,
    nextTier: (n: number, p: string) => `Prochain palier : ${n} Collaborateurs IA · ${p} chacun`,
    includedTitle: 'CHAQUE COLLABORATEUR IA INCLUT :',
    included: [
      { text: 'une identité propre', strong: false },
      { text: 'une mémoire persistante', strong: false },
      { text: 'des profils métier illimités', strong: true },
      { text: 'un profil public personnalisable', strong: false },
      { text: 'une adresse email professionnelle', strong: false },
      { text: 'un agenda et la prise de rendez-vous', strong: false },
      { text: 'un numéro de téléphone professionnel', strong: false },
      { text: 'un Workspace privé', strong: false },
      { text: 'des missions, compétences et applications', strong: false },
      { text: 'un accès aux modèles multimodaux autorisés', strong: false },
      { text: 'des accès et validations contrôlés', strong: false },
      { text: 'l’accompagnement d’Alma', strong: false },
    ],
  },
  en: {
    heading: 'Compose your team.',
    billingLegend: 'Billing cycle',
    monthly: 'Monthly',
    annual: 'Annual · 2 months free',
    monthlyNote: 'Monthly billing · Cancel anytime',
    annualNote: 'Two months free · Annual billing after the trial',
    quantityLabel: 'NUMBER OF COLLABORATEURS IA',
    decrease: 'Remove a Collaborateur IA',
    increase: 'Add a Collaborateur IA',
    collab: (n: number) => `${n} Collaborateur${n > 1 ? 's' : ''} IA`,
    unit: (p: string) => `${p} each / month`,
    planTotal: (p: string) => `${p} / month`,
    savings: (p: string) => `Volume savings: ${p} / month`,
    nextTier: (n: number, p: string) => `Next tier: ${n} Collaborateurs IA · ${p} each`,
    includedTitle: 'EACH COLLABORATEUR IA INCLUDES:',
    included: [
      { text: 'its own identity', strong: false },
      { text: 'persistent memory', strong: false },
      { text: 'unlimited job profiles', strong: true },
      { text: 'a customizable public profile', strong: false },
      { text: 'a professional email address', strong: false },
      { text: 'a calendar and appointment booking', strong: false },
      { text: 'a professional phone number', strong: false },
      { text: 'a private Workspace', strong: false },
      { text: 'missions, skills and applications', strong: false },
      { text: 'access to allowed multimodal models', strong: false },
      { text: 'controlled access and validations', strong: false },
      { text: 'Alma’s guidance', strong: false },
    ],
  },
} as const

const QUANTITY_SHORTCUTS: { label: string; value: number }[] = [
  { label: '1', value: 1 },
  { label: '2\u20134', value: 2 },
  { label: '5\u20139', value: 5 },
  { label: '10+', value: 10 },
]

export function PricingConfigurator() {
  const { lang } = useLanguage()
  const router = useRouter()
  const t = COPY[lang]

  const [quantity, setQuantity] = useState(1)
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly')
  const [usageMode, setUsageMode] = useState<UsageMode | null>(null)
  const [selectedCreditBudget, setSelectedCreditBudget] = useState<number | null>(null)
  // Remember the last budget so switching to BYOK and back restores it.
  const [lastBudget, setLastBudget] = useState<number>(minimumCreditBudget())

  const calc = useMemo(() => {
    const q = normalizeQuantity(quantity)
    const tier = getTierForQuantity(q)
    return {
      tier,
      next: getNextTier(q),
      unitPrice: tier.monthlyUnitPrice,
      monthlySubscription: calculateMonthlySubscription(q),
      quantitySavings: calculateQuantitySavings(q),
      annualSubscription: calculateAnnualSubscription(q),
      annualEquivalentMonthly: calculateAnnualEquivalentMonthly(q),
      annualSavings: calculateAnnualSavings(q),
      creditBudget: calculateMonthlyCreditBudget(usageMode, selectedCreditBudget),
      estimatedMonthlyTotal: calculateEstimatedMonthlyTotal(q, billingCycle, usageMode, selectedCreditBudget),
      amountDueAfterTrial: calculateAmountDueAfterTrial(q, billingCycle, usageMode, selectedCreditBudget),
    }
  }, [quantity, billingCycle, usageMode, selectedCreditBudget])

  const money = (n: number) => formatEuro(n, lang)

  function handleModeChange(mode: UsageMode) {
    setUsageMode(mode)
    if (mode === 'byok') {
      // Keep the previous budget in memory, drop it from the total.
      if (selectedCreditBudget != null) setLastBudget(selectedCreditBudget)
      setSelectedCreditBudget(null)
    } else {
      // Credits / hybrid: auto-select the minimum (or restore the last budget).
      setSelectedCreditBudget((cur) => cur ?? lastBudget ?? minimumCreditBudget())
    }
  }

  function handleBudgetChange(amount: number) {
    setSelectedCreditBudget(amount)
    setLastBudget(amount)
  }

  function handleCta() {
    const payload = {
      quantity: normalizeQuantity(quantity),
      billingCycle,
      quantityTier: calc.tier.label,
      usageMode,
      selectedCreditBudget,
      monthlySubscription: calc.monthlySubscription,
      annualSubscription: calc.annualSubscription,
      estimatedMonthlyTotal: calc.estimatedMonthlyTotal,
    }
    try {
      sessionStorage.setItem('unitalk_pricing_selection', JSON.stringify(payload))
    } catch {
      // sessionStorage may be unavailable; navigation must still proceed.
    }
    router.push('/decouvrir')
  }

  const decDisabled = normalizeQuantity(quantity) <= 1

  return (
    <section aria-labelledby="configurator-heading" className="mx-auto w-full max-w-6xl px-5 py-6 sm:px-8">
      <h2
        id="configurator-heading"
        className="font-sf text-[30px] font-bold tracking-[-0.01em] text-[#1C1A17] sm:text-[38px]"
      >
        {t.heading}
      </h2>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start lg:gap-12 xl:grid-cols-[minmax(0,1fr)_24rem]">
        {/* LEFT — all choices */}
        <div className="min-w-0 space-y-8">
          {/* Billing */}
          <fieldset>
            <legend className="sr-only">{t.billingLegend}</legend>
            <div
              role="radiogroup"
              aria-label={t.billingLegend}
              className="inline-flex w-full max-w-md rounded-full border border-[#EAE3D5] bg-white p-1 sm:w-auto"
            >
              {(['monthly', 'annual'] as BillingCycle[]).map((cycle) => {
                const active = billingCycle === cycle
                return (
                  <button
                    key={cycle}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setBillingCycle(cycle)}
                    className={`min-h-11 flex-1 whitespace-nowrap rounded-full px-4 text-[13.5px] font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#D10E63]/40 ${
                      active ? 'bg-[#D10E63] text-[#FBF9F3]' : 'text-[#4E483F] hover:text-[#1C1A17]'
                    }`}
                  >
                    {cycle === 'monthly' ? t.monthly : t.annual}
                  </button>
                )
              })}
            </div>
            <p className="mt-2 text-[12.5px] text-[#857C6E]">
              {billingCycle === 'monthly' ? t.monthlyNote : t.annualNote}
            </p>
          </fieldset>

          {/* Quantity */}
          <div>
            <p id="quantity-label" className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#857C6E]">
              {t.quantityLabel}
            </p>
            <div className="mt-3 flex items-center gap-4">
              <div className="inline-flex items-center rounded-full border border-[#EAE3D5] bg-white">
                <button
                  type="button"
                  aria-label={t.decrease}
                  disabled={decDisabled}
                  onClick={() => setQuantity((q) => Math.max(1, normalizeQuantity(q) - 1))}
                  className="flex h-11 w-11 items-center justify-center rounded-full text-[20px] text-[#1C1A17] outline-none transition-colors hover:bg-[#FBF3F7] focus-visible:ring-2 focus-visible:ring-[#D10E63]/40 disabled:cursor-not-allowed disabled:text-[#CFC6B8]"
                >
                  −
                </button>
                <span
                  aria-live="polite"
                  aria-labelledby="quantity-label"
                  className="min-w-12 text-center text-[18px] font-semibold tabular-nums text-[#1C1A17]"
                >
                  {normalizeQuantity(quantity)}
                </span>
                <button
                  type="button"
                  aria-label={t.increase}
                  onClick={() => setQuantity((q) => normalizeQuantity(q) + 1)}
                  className="flex h-11 w-11 items-center justify-center rounded-full text-[20px] text-[#1C1A17] outline-none transition-colors hover:bg-[#FBF3F7] focus-visible:ring-2 focus-visible:ring-[#D10E63]/40"
                >
                  +
                </button>
              </div>

              <div className="flex flex-wrap gap-2" role="group" aria-label={t.quantityLabel}>
                {QUANTITY_SHORTCUTS.map((s) => {
                  const active = getTierForQuantity(quantity).label === getTierForQuantity(s.value).label
                  return (
                    <button
                      key={s.label}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setQuantity(s.value)}
                      className={`min-h-11 rounded-full border px-3.5 text-[13px] font-medium tabular-nums outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#D10E63]/40 ${
                        active ? 'border-[#D10E63] bg-[#FBF3F7] text-[#B00C54]' : 'border-[#EAE3D5] bg-white text-[#4E483F] hover:border-[#D10E63]/40'
                      }`}
                    >
                      {s.label}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-[#EAE3D5] bg-[#FBF9F3] p-4" aria-live="polite">
              <p className="text-[15px] font-semibold text-[#1C1A17]">{t.collab(normalizeQuantity(quantity))}</p>
              <p className="text-[13.5px] text-[#6B6560]">
                {t.unit(money(calc.unitPrice))} · <span className="font-medium text-[#1C1A17]">{t.planTotal(money(calc.monthlySubscription))}</span>
              </p>
              {calc.quantitySavings > 0 && (
                <p className="mt-1 text-[13px] text-[#2E7D32]">{t.savings(money(calc.quantitySavings))}</p>
              )}
              {calc.next && (
                <p className="mt-1 text-[12.5px] text-[#857C6E]">
                  {t.nextTier(calc.next.min, money(calc.next.monthlyUnitPrice))}
                </p>
              )}
            </div>
          </div>

          {/* What each Collaborateur IA includes */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#857C6E]">{t.includedTitle}</p>
            <ul className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
              {t.included.map((item) => (
                <li key={item.text} className="flex items-start gap-2">
                  <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D10E63]" />
                  <span
                    className={
                      item.strong
                        ? 'text-[14px] font-semibold text-[#B00C54]'
                        : 'text-[14px] text-[#4E483F]'
                    }
                  >
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <ProfessionalPresence lang={lang} />
          <MultimodalAccess lang={lang} />

          <UsageModeSelector
            lang={lang}
            usageMode={usageMode}
            selectedCreditBudget={selectedCreditBudget}
            onModeChange={handleModeChange}
            onBudgetChange={handleBudgetChange}
          />
        </div>

        {/* RIGHT — sticky summary + single CTA */}
        <aside className="lg:sticky lg:top-24">
          <PricingSummary
            lang={lang}
            quantity={normalizeQuantity(quantity)}
            billingCycle={billingCycle}
            usageMode={usageMode}
            unitPrice={calc.unitPrice}
            monthlySubscription={calc.monthlySubscription}
            annualSubscription={calc.annualSubscription}
            annualEquivalentMonthly={calc.annualEquivalentMonthly}
            annualSavings={calc.annualSavings}
            quantitySavings={calc.quantitySavings}
            creditBudget={calc.creditBudget}
            estimatedMonthlyTotal={calc.estimatedMonthlyTotal}
            amountDueAfterTrial={calc.amountDueAfterTrial}
            ctaDisabled={usageMode === null}
            onCta={handleCta}
          />
        </aside>
      </div>
    </section>
  )
}
