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

const COPY = {
  fr: {
    billingLegend: 'Cycle de facturation',
    monthly: 'Mensuelle',
    annual: `Annuelle · ${pricingConfig.annualFreeMonths} mois offerts`,
    collab: (quantity: number) => `${quantity} Collaborateur${quantity > 1 ? 's' : ''} IA`,
    each: (price: string) => `${price} chacun`,
    perMonth: (price: string) => `${price} / mois`,
    annualEquivalent: (price: string) => `${price} / mois équivalent`,
    annualBilled: (price: string) => `${price} facturés annuellement`,
    included: ['Identité professionnelle', 'Profils métier illimités', 'Mémoire et Workspace privé', 'Accès contrôlés'],
    today: 'Aujourd’hui',
    cta: 'Créer mon Collaborateur IA',
    after: (price: string) => `Puis ${price}/mois, hors usages IA. Sans engagement.`,
    afterAnnual: (monthly: string, annual: string) => `Puis ${monthly}/mois équivalent, ${annual} facturés annuellement, hors usages IA.`,
    multiple: 'Besoin de plusieurs Collaborateurs IA ?',
    showVolume: 'Voir les tarifs dégressifs',
    hideVolume: 'Masquer les tarifs dégressifs',
    quantityLabel: 'Nombre de Collaborateurs IA',
    decrease: 'Retirer un Collaborateur IA',
    increase: 'Ajouter un Collaborateur IA',
    volumeApplied: 'Prix dégressif appliqué automatiquement.',
  },
  en: {
    billingLegend: 'Billing cycle',
    monthly: 'Monthly',
    annual: `Annual · ${pricingConfig.annualFreeMonths} months free`,
    collab: (quantity: number) => `${quantity} AI Collaborator${quantity > 1 ? 's' : ''}`,
    each: (price: string) => `${price} each`,
    perMonth: (price: string) => `${price} / month`,
    annualEquivalent: (price: string) => `${price} / month equivalent`,
    annualBilled: (price: string) => `${price} billed annually`,
    included: ['Professional identity', 'Unlimited job profiles', 'Memory and private Workspace', 'Controlled access'],
    today: 'Today',
    cta: 'Create my AI Collaborator',
    after: (price: string) => `Then ${price}/month, excluding AI usage. No commitment.`,
    afterAnnual: (monthly: string, annual: string) => `Then ${monthly}/month equivalent, ${annual} billed annually, excluding AI usage.`,
    multiple: 'Need several AI Collaborators?',
    showVolume: 'See volume pricing',
    hideVolume: 'Hide volume pricing',
    quantityLabel: 'Number of AI Collaborators',
    decrease: 'Remove an AI Collaborator',
    increase: 'Add an AI Collaborator',
    volumeApplied: 'Volume pricing is applied automatically.',
  },
} as const

export function PricingConfigurator() {
  const { lang } = useLanguage()
  const router = useRouter()
  const t = COPY[lang]
  const [quantity, setQuantity] = useState(1)
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly')
  const [volumeOpen, setVolumeOpen] = useState(false)

  const calc = useMemo(() => {
    const normalized = normalizeQuantity(quantity)
    const tier = getTierForQuantity(normalized)
    return {
      quantity: normalized,
      tierLabel: tier.label,
      unitPrice: tier.monthlyUnitPrice,
      monthlySubscription: calculateMonthlySubscription(normalized),
      annualSubscription: calculateAnnualSubscription(normalized),
      annualEquivalentMonthly: calculateAnnualEquivalentMonthly(normalized),
    }
  }, [quantity])

  const money = (value: number) => formatEuro(value, lang)
  const annual = billingCycle === 'annual'

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
    <section aria-label={t.billingLegend} className="mx-auto w-full max-w-2xl px-5 pb-10 pt-3 sm:px-8">
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

      <div className="mt-5 rounded-3xl border border-[#E4DDCE] bg-white p-6 shadow-[0_28px_65px_-48px_rgba(28,26,23,0.55)] sm:p-8">
        <div aria-live="polite">
          <p className="font-sf text-lg font-bold">{t.collab(calc.quantity)}</p>
          {calc.quantity > 1 && <p className="mt-1 text-sm text-[#4E483F]">{t.each(money(calc.unitPrice))}</p>}
          <p className="mt-2 font-sf text-[34px] font-bold tracking-[-0.04em] text-[#1C1A17]">
            {annual ? t.annualEquivalent(money(calc.annualEquivalentMonthly)) : t.perMonth(money(calc.monthlySubscription))}
          </p>
          {annual && <p className="mt-1 text-sm text-[#6E665A]">{t.annualBilled(money(calc.annualSubscription))}</p>}
        </div>

        <ul className="mt-6 space-y-2.5 border-t border-[#E4DDCE] pt-5">
          {t.included.map((item) => (
            <li key={item} className="flex items-center gap-2.5 text-sm text-[#4E483F]">
              <span aria-hidden="true" className="font-bold text-[#D10E63]">✓</span>
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center justify-between border-t border-[#E4DDCE] pt-5">
          <span className="text-sm font-semibold text-[#4E483F]">{t.today}</span>
          <strong className="font-sf text-2xl">{money(0)}</strong>
        </div>

        <button
          type="button"
          onClick={startTrial}
          className="group mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#D10E63] px-6 text-[15px] font-bold text-white outline-none transition-all hover:-translate-y-0.5 hover:bg-[#E51872] focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2"
        >
          {t.cta}
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
        </button>
        <p className="mt-2.5 text-center text-[12px] leading-relaxed text-[#6E665A]">
          {annual
            ? t.afterAnnual(money(calc.annualEquivalentMonthly), money(calc.annualSubscription))
            : t.after(money(calc.monthlySubscription))}
        </p>

        <div className="mt-5 border-t border-[#E4DDCE] pt-4 text-center">
          <p className="text-sm font-semibold">{t.multiple}</p>
          <button
            type="button"
            aria-expanded={volumeOpen}
            onClick={() => setVolumeOpen((open) => !open)}
            className="mt-1 text-sm font-semibold text-[#B00C54] underline decoration-[#D10E63]/30 underline-offset-4 outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/50"
          >
            {volumeOpen ? t.hideVolume : t.showVolume}
          </button>

          {volumeOpen && (
            <div className="mt-4 rounded-2xl bg-[#F3EFE6] p-4 text-left">
              <p id="quantity-label" className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6E665A]">{t.quantityLabel}</p>
              <div className="mt-3 inline-flex items-center rounded-full border border-[#E4DDCE] bg-white">
                <button type="button" aria-label={t.decrease} disabled={calc.quantity <= 1} onClick={() => setQuantity((current) => Math.max(1, normalizeQuantity(current) - 1))} className="flex h-11 w-11 items-center justify-center rounded-full text-xl outline-none hover:bg-[#FBF3F7] focus-visible:ring-2 focus-visible:ring-[#D10E63]/50 disabled:text-[#CFC6B8]">−</button>
                <span aria-live="polite" aria-labelledby="quantity-label" className="min-w-12 text-center text-lg font-semibold tabular-nums">{calc.quantity}</span>
                <button type="button" aria-label={t.increase} onClick={() => setQuantity((current) => normalizeQuantity(current) + 1)} className="flex h-11 w-11 items-center justify-center rounded-full text-xl outline-none hover:bg-[#FBF3F7] focus-visible:ring-2 focus-visible:ring-[#D10E63]/50">+</button>
              </div>
              <p className="mt-2 text-[12px] text-[#6E665A]">{t.volumeApplied}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
