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
    perMonth: (price: string) => `${price}/mois`,
    annualEquivalent: (price: string) => `${price}/mois équivalent`,
    annualBilled: (price: string) => `${price} facturés annuellement`,
    included: [
      'Identité professionnelle',
      'Profils métier illimités',
      'Compétences illimitées',
      'Mémoire et Workspace privé',
      'Accès aux données et applications que vous autorisez',
      'Validation humaine des actions sensibles',
    ],
    trial: 'Votre essai',
    today: 'Aujourd’hui',
    trialDays: `${pricingConfig.trialDays} jours`,
    tokens: '1 million de tokens préchargés',
    tokensEach: '1 million de tokens préchargés par Collaborateur IA',
    noCard: 'Sans carte bancaire',
    cta: 'Créer mon Collaborateur IA',
    ctaTeam: (quantity: number) => `Préparer mon équipe de ${quantity} Collaborateurs IA`,
    after: (price: string) => `Puis ${price}/mois. Usages IA selon le mode choisi. Sans engagement.`,
    afterAnnual: (monthly: string, annual: string) => `Puis ${monthly}/mois équivalent, ${annual} facturés annuellement. Usages IA selon le mode choisi.`,
    multiple: 'Besoin de plusieurs Collaborateurs IA ?',
    showVolume: 'Ajouter plusieurs Collaborateurs IA',
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
    perMonth: (price: string) => `${price}/month`,
    annualEquivalent: (price: string) => `${price}/month equivalent`,
    annualBilled: (price: string) => `${price} billed annually`,
    included: [
      'Professional identity',
      'Unlimited job profiles',
      'Unlimited skills',
      'Memory and private Workspace',
      'Access limited to authorized data and applications',
      'Human approval for sensitive actions',
    ],
    trial: 'Your trial',
    today: 'Today',
    trialDays: `${pricingConfig.trialDays} days`,
    tokens: '1 million tokens included',
    tokensEach: '1 million tokens included per AI Collaborator',
    noCard: 'No credit card',
    cta: 'Create my AI Collaborator',
    ctaTeam: (quantity: number) => `Prepare my team of ${quantity} AI Collaborators`,
    after: (price: string) => `Then ${price}/month, excluding AI usage. No commitment.`,
    afterAnnual: (monthly: string, annual: string) => `Then ${monthly}/month equivalent, ${annual} billed annually, excluding AI usage.`,
    multiple: 'Need several AI Collaborators?',
    showVolume: 'Add several AI Collaborators',
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

      <div className="mt-4 overflow-hidden rounded-3xl border border-[#E4DDCE] bg-white shadow-[0_28px_65px_-48px_rgba(28,26,23,0.55)] lg:grid lg:grid-cols-[1.25fr_0.75fr]">
        <div className="p-5 sm:p-6" aria-live="polite">
          <p className="font-sf text-lg font-bold">{t.collab(calc.quantity)}</p>
          {calc.quantity > 1 && <p className="mt-1 text-sm text-[#4E483F]">{t.each(money(calc.unitPrice))}</p>}
          <p className="mt-1 font-sf text-[32px] font-bold tracking-[-0.04em] text-[#1C1A17]">
            {annual ? t.annualEquivalent(money(calc.annualEquivalentMonthly)) : t.perMonth(money(calc.monthlySubscription))}
          </p>
          {annual && <p className="mt-1 text-sm text-[#6E665A]">{t.annualBilled(money(calc.annualSubscription))}</p>}
          <ul className="mt-5 grid gap-x-5 gap-y-2 sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-3">
            {t.included.map((item) => (
              <li key={item} className="flex items-start gap-2 text-[13px] leading-snug text-[#4E483F]">
                <span aria-hidden="true" className="mt-px shrink-0 font-bold text-[#D10E63]">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-[#E4DDCE] bg-[#FBF9F3] p-5 sm:p-6 lg:border-l lg:border-t-0">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#B00C54]">{t.trial}</p>
          <p className="mt-4 text-sm font-semibold text-[#4E483F]">{t.today}</p>
          <p className="mt-0.5 font-sf text-[32px] font-bold tracking-[-0.04em]">{money(0)}</p>
          <ul className="mt-4 space-y-1.5 text-sm text-[#4E483F]">
            <li>{t.trialDays}</li>
            <li>{calc.quantity > 1 ? t.tokensEach : t.tokens}</li>
            <li>{t.noCard}</li>
          </ul>

          <button
            type="button"
            onClick={startTrial}
            className="group mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#D10E63] px-5 text-[14px] font-bold text-white outline-none transition-all hover:-translate-y-0.5 hover:bg-[#E51872] focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2"
          >
            {calc.quantity === 1 ? t.cta : t.ctaTeam(calc.quantity)}
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
          </button>
          <p className="mt-2.5 text-[12px] leading-relaxed text-[#6E665A]">
            {annual
              ? t.afterAnnual(money(calc.annualEquivalentMonthly), money(calc.annualSubscription))
              : t.after(money(calc.monthlySubscription))}
          </p>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm font-semibold">{t.multiple}</p>
        <button type="button" aria-expanded={volumeOpen} onClick={() => setVolumeOpen((open) => !open)} className="mt-1 text-sm font-semibold text-[#B00C54] underline decoration-[#D10E63]/30 underline-offset-4 outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/50">
          {volumeOpen ? t.hideVolume : t.showVolume}
        </button>
        {volumeOpen && (
          <div className="mx-auto mt-3 max-w-sm rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-4 text-left">
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
    </section>
  )
}
