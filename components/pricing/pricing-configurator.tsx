'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/lib/language-context'
import { pricingConfig, type BillingCycle } from '@/lib/pricing-config'
import {
  normalizeQuantity,
  getTierForQuantity,
  calculateMonthlySubscription,
  calculateAnnualSubscription,
  calculateAnnualEquivalentMonthly,
} from '@/lib/pricing-calculator'
import { formatEuro } from './format'
import { PricingSummary } from './pricing-summary'

const COPY = {
  fr: {
    billingLegend: 'Cycle de facturation',
    monthly: 'Mensuelle',
    annual: `Annuelle · ${pricingConfig.annualFreeMonths} mois offerts`,
    quantityLabel: 'Nombre de Collaborateurs IA',
    decrease: 'Retirer un Collaborateur IA',
    increase: 'Ajouter un Collaborateur IA',
    collab: (n: number) => `${n} Collaborateur${n > 1 ? 's' : ''} IA`,
    each: (price: string) => `${price} chacun`,
    perMonth: (price: string) => `${price} / mois`,
    annualEquivalent: (price: string) => `${price} / mois équivalent`,
    annualBilled: (price: string) => `${price} facturés annuellement`,
    multiple: 'Besoin de plusieurs Collaborateurs IA ?',
    tierNote: 'Prix dégressif appliqué automatiquement.',
    included: [
      'Identité professionnelle',
      'Profils métier illimités',
      'Mémoire et Workspace privé',
      'Accès contrôlés et validations humaines',
    ],
  },
  en: {
    billingLegend: 'Billing cycle',
    monthly: 'Monthly',
    annual: `Annual · ${pricingConfig.annualFreeMonths} months free`,
    quantityLabel: 'Number of AI Collaborators',
    decrease: 'Remove an AI Collaborator',
    increase: 'Add an AI Collaborator',
    collab: (n: number) => `${n} AI Collaborator${n > 1 ? 's' : ''}`,
    each: (price: string) => `${price} each`,
    perMonth: (price: string) => `${price} / month`,
    annualEquivalent: (price: string) => `${price} / month equivalent`,
    annualBilled: (price: string) => `${price} billed annually`,
    multiple: 'Need several AI Collaborators?',
    tierNote: 'Volume pricing is applied automatically.',
    included: [
      'Professional identity',
      'Unlimited job profiles',
      'Memory and private Workspace',
      'Controlled access and human approvals',
    ],
  },
} as const

export function PricingConfigurator() {
  const { lang } = useLanguage()
  const router = useRouter()
  const t = COPY[lang]
  const [quantity, setQuantity] = useState(1)
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly')

  const calc = useMemo(() => {
    const normalized = normalizeQuantity(quantity)
    const tier = getTierForQuantity(normalized)
    return {
      quantity: normalized,
      unitPrice: tier.monthlyUnitPrice,
      tierLabel: tier.label,
      monthlySubscription: calculateMonthlySubscription(normalized),
      annualSubscription: calculateAnnualSubscription(normalized),
      annualEquivalentMonthly: calculateAnnualEquivalentMonthly(normalized),
    }
  }, [quantity])

  const money = (value: number) => formatEuro(value, lang)
  function startTrial() {
    try {
      sessionStorage.setItem(
        'unitalk_pricing_selection',
        JSON.stringify({
          quantity: calc.quantity,
          billingCycle,
          quantityTier: calc.tierLabel,
          monthlySubscription: calc.monthlySubscription,
          annualSubscription: calc.annualSubscription,
        }),
      )
    } catch {}
    router.push('/decouvrir')
  }

  return (
    <section aria-label={t.billingLegend} className="mx-auto w-full max-w-5xl px-5 pb-8 pt-3 sm:px-8">
      <fieldset className="flex justify-center">
        <legend className="sr-only">{t.billingLegend}</legend>
        <div role="radiogroup" aria-label={t.billingLegend} className="inline-flex w-full rounded-full border border-[#E4DDCE] bg-white p-1 sm:w-auto">
          {(['monthly', 'annual'] as BillingCycle[]).map((cycle) => {
            const active = billingCycle === cycle
            return (
              <button
                key={cycle}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setBillingCycle(cycle)}
                className={`min-h-11 flex-1 whitespace-nowrap rounded-full px-5 text-[13px] font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#D10E63]/50 ${
                  active ? 'bg-[#D10E63] text-white' : 'text-[#4E483F] hover:text-[#1C1A17]'
                }`}
              >
                {cycle === 'monthly' ? t.monthly : t.annual}
              </button>
            )
          })}
        </div>
      </fieldset>

      <div className="mt-5 overflow-hidden rounded-3xl border border-[#E4DDCE] bg-[#FBF9F3] shadow-[0_28px_65px_-48px_rgba(28,26,23,0.55)] lg:grid lg:grid-cols-[minmax(0,1fr)_23rem]">
        <div className="min-w-0 rounded-3xl border border-[#E4DDCE] bg-[#FBF9F3] p-5 sm:p-7">
          <div aria-live="polite">
            <p className="font-sf text-lg font-bold">{t.collab(calc.quantity)}</p>
            {calc.quantity > 1 && <p className="mt-1 text-sm text-[#4E483F]">{t.each(money(calc.unitPrice))}</p>}
            {billingCycle === 'monthly' ? (
              <p className="mt-1 font-sf text-[30px] font-bold tracking-[-0.03em]">{t.perMonth(money(calc.monthlySubscription))}</p>
            ) : (
              <div className="mt-2">
                <p className="font-sf text-[30px] font-bold tracking-[-0.03em]">{t.annualEquivalent(money(calc.annualEquivalentMonthly))}</p>
                <p className="mt-1 text-sm text-[#4E483F]">{t.annualBilled(money(calc.annualSubscription))} · {t.annual}</p>
              </div>
            )}
          </div>

          <ul className="mt-6 space-y-2.5 border-t border-[#E4DDCE] pt-5">
            {t.included.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-[#4E483F]">
                <span aria-hidden="true" className="font-bold text-[#D10E63]">✓</span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t border-[#E4DDCE] pt-5">
            <p className="text-sm font-semibold text-[#1C1A17]">{t.multiple}</p>
            <div className="mt-3 inline-flex items-center rounded-full border border-[#E4DDCE] bg-white">
              <button type="button" aria-label={t.decrease} disabled={calc.quantity <= 1} onClick={() => setQuantity((current) => Math.max(1, normalizeQuantity(current) - 1))} className="flex h-11 w-11 items-center justify-center rounded-full text-xl outline-none hover:bg-[#FBF3F7] focus-visible:ring-2 focus-visible:ring-[#D10E63]/50 disabled:text-[#CFC6B8]">−</button>
              <span aria-live="polite" className="min-w-12 text-center text-lg font-semibold tabular-nums">{calc.quantity}</span>
              <button type="button" aria-label={t.increase} onClick={() => setQuantity((current) => normalizeQuantity(current) + 1)} className="flex h-11 w-11 items-center justify-center rounded-full text-xl outline-none hover:bg-[#FBF3F7] focus-visible:ring-2 focus-visible:ring-[#D10E63]/50">+</button>
            </div>
            <p className="mt-2 text-[12px] text-[#6E665A]">{t.tierNote}</p>
          </div>
        </div>

        <PricingSummary
          lang={lang}
          quantity={calc.quantity}
          billingCycle={billingCycle}
          monthlySubscription={calc.monthlySubscription}
          annualSubscription={calc.annualSubscription}
          annualEquivalentMonthly={calc.annualEquivalentMonthly}
          onCta={startTrial}
        />
      </div>
    </section>
  )
}
