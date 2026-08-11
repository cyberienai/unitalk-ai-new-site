'use client'

import type { Lang } from '@/lib/language-context'
import { pricingConfig, type BillingCycle } from '@/lib/pricing-config'
import { formatEuro } from './format'

const COPY = {
  fr: {
    title: 'Votre essai',
    today: 'Aujourd’hui',
    during: `Pendant ${pricingConfig.trialDays} jours`,
    after: 'Après l’essai',
    collab: (quantity: number) => `${quantity} Collaborateur${quantity > 1 ? 's' : ''} IA`,
    tokens: '1 million de tokens inclus',
    noCard: 'Aucune carte bancaire',
    perMonth: (price: string) => `${price} / mois`,
    annualEquivalent: (price: string) => `${price} / mois équivalent`,
    annualBilled: (price: string) => `${price} facturés annuellement`,
    usage: '+ usages IA selon le mode choisi',
    cta: 'Créer mon Collaborateur IA',
    hint: `${pricingConfig.trialDays} jours d’essai, 1 million de tokens inclus, sans carte bancaire.`,
  },
  en: {
    title: 'Your trial',
    today: 'Today',
    during: `For ${pricingConfig.trialDays} days`,
    after: 'After the trial',
    collab: (quantity: number) => `${quantity} AI Collaborator${quantity > 1 ? 's' : ''}`,
    tokens: '1 million tokens included',
    noCard: 'No credit card',
    perMonth: (price: string) => `${price} / month`,
    annualEquivalent: (price: string) => `${price} / month equivalent`,
    annualBilled: (price: string) => `${price} billed annually`,
    usage: '+ AI usage according to your chosen mode',
    cta: 'Create my AI Collaborator',
    hint: `${pricingConfig.trialDays}-day trial, 1 million tokens included, no credit card.`,
  },
} as const

export function PricingSummary({
  lang,
  quantity,
  billingCycle,
  monthlySubscription,
  annualSubscription,
  annualEquivalentMonthly,
  onCta,
}: {
  lang: Lang
  quantity: number
  billingCycle: BillingCycle
  monthlySubscription: number
  annualSubscription: number
  annualEquivalentMonthly: number
  onCta: () => void
}) {
  const t = COPY[lang]
  const money = (value: number) => formatEuro(value, lang)
  const annual = billingCycle === 'annual'

  return (
    <aside className="overflow-hidden rounded-3xl border border-[#E4DDCE] bg-white shadow-[0_24px_55px_-38px_rgba(28,26,23,0.5)] lg:sticky lg:top-20">
      <div className="bg-[#FBF3F7] px-5 py-3 sm:px-6">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#B00C54]">{t.title}</p>
      </div>
      <div className="divide-y divide-[#EEE7D9] px-5 sm:px-6">
        <div className="flex items-center justify-between py-4">
          <span className="text-sm font-semibold text-[#4E483F]">{t.today}</span>
          <strong className="font-sf text-2xl">{money(0)}</strong>
        </div>
        <div className="py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#6E665A]">{t.during}</p>
          <ul className="mt-2 space-y-1 text-sm text-[#1C1A17]">
            <li>{t.collab(quantity)}</li>
            <li>{t.tokens}</li>
            <li>{t.noCard}</li>
          </ul>
        </div>
        <div className="py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#6E665A]">{t.after}</p>
          <p className="mt-2 font-sf text-xl font-bold">
            {annual ? t.annualEquivalent(money(annualEquivalentMonthly)) : t.perMonth(money(monthlySubscription))}
          </p>
          {annual && <p className="mt-1 text-xs text-[#6E665A]">{t.annualBilled(money(annualSubscription))}</p>}
          <p className="mt-2 text-sm text-[#4E483F]">{t.usage}</p>
        </div>
      </div>
      <div className="px-5 pb-5 pt-4 sm:px-6">
        <button
          type="button"
          onClick={onCta}
          className="group flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#D10E63] px-6 text-[15px] font-bold text-white outline-none transition-all hover:-translate-y-0.5 hover:bg-[#E51872] focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2"
        >
          {t.cta}
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
        </button>
        <p className="mt-2.5 text-center text-[12px] leading-relaxed text-[#6E665A]">{t.hint}</p>
      </div>
    </aside>
  )
}
