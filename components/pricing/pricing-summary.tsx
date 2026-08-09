'use client'

import type { Lang } from '@/lib/language-context'
import type { BillingCycle, UsageMode } from '@/lib/pricing-config'
import { formatEuro } from './format'

const COPY = {
  fr: {
    plan: 'FORFAIT',
    planAnnual: 'FORFAIT ANNUEL',
    collabsSuffix: (n: number) => `${n} Collaborateur${n > 1 ? 's' : ''} IA`,
    each: (p: string) => `${p} chacun / mois`,
    perMonth: (p: string) => `${p} / mois`,
    perYear: (p: string) => `${p} / an`,
    quantitySavings: 'ÉCONOMIE LIÉE AU NOMBRE',
    annualEquivalent: 'ÉQUIVALENT MENSUEL DU FORFAIT',
    annualSavings: 'ÉCONOMIE ANNUELLE',
    creditBudget: 'BUDGET DE CRÉDITS',
    apiKeys: 'CLÉS API',
    externalBilling: 'Facturation externe',
    totalEstimated: 'TOTAL UNITALK ESTIMÉ',
    monthlyEstimated: 'BUDGET MENSUEL ESTIMÉ',
    today: 'AUJOURD’HUI',
    afterTrial: 'APRÈS LES 7 JOURS D’ESSAI',
    ctaSingular: 'Créer mon Collaborateur IA',
    ctaPlural: (n: number) => `Créer mes ${n} Collaborateurs IA`,
    ctaHint: '7 jours d’essai · Sans carte bancaire · Sans engagement',
    ctaDisabledHint: 'Choisissez un mode de consommation pour continuer.',
    byokNote: 'Forfait uniquement — vos fournisseurs sont facturés séparément.',
  },
  en: {
    plan: 'PLAN',
    planAnnual: 'ANNUAL PLAN',
    collabsSuffix: (n: number) => `${n} Collaborateur${n > 1 ? 's' : ''} IA`,
    each: (p: string) => `${p} each / month`,
    perMonth: (p: string) => `${p} / month`,
    perYear: (p: string) => `${p} / year`,
    quantitySavings: 'VOLUME SAVINGS',
    annualEquivalent: 'MONTHLY EQUIVALENT OF THE PLAN',
    annualSavings: 'ANNUAL SAVINGS',
    creditBudget: 'CREDIT BUDGET',
    apiKeys: 'API KEYS',
    externalBilling: 'External billing',
    totalEstimated: 'ESTIMATED UNITALK TOTAL',
    monthlyEstimated: 'ESTIMATED MONTHLY BUDGET',
    today: 'TODAY',
    afterTrial: 'AFTER THE 7-DAY TRIAL',
    ctaSingular: 'Create my Collaborateur IA',
    ctaPlural: (n: number) => `Create my ${n} Collaborateurs IA`,
    ctaHint: '7-day trial · No credit card · No commitment',
    ctaDisabledHint: 'Choose a consumption mode to continue.',
    byokNote: 'Plan only — your providers are billed separately.',
  },
} as const

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2">
      <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#857C6E]">{label}</span>
      <span className="text-right text-[14px] font-medium tabular-nums text-[#1C1A17]">{children}</span>
    </div>
  )
}

export type SummaryProps = {
  lang: Lang
  quantity: number
  billingCycle: BillingCycle
  usageMode: UsageMode | null
  unitPrice: number
  monthlySubscription: number
  annualSubscription: number
  annualEquivalentMonthly: number
  annualSavings: number
  quantitySavings: number
  creditBudget: number
  estimatedMonthlyTotal: number
  amountDueAfterTrial: number
  ctaDisabled: boolean
  onCta: () => void
}

/** Sticky recap containing the one and only primary CTA of the page. */
export function PricingSummary(props: SummaryProps) {
  const t = COPY[props.lang]
  const { lang } = props
  const annual = props.billingCycle === 'annual'
  const isByok = props.usageMode === 'byok'
  const money = (n: number) => formatEuro(n, lang)

  return (
    <div className="rounded-2xl border border-[#E5DED0] bg-white p-5 shadow-[0_1px_0_rgba(28,26,23,0.04)] sm:p-6">
      <div className="divide-y divide-[#EFEAE0]">
        {/* Plan */}
        <div className="pb-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#857C6E]">
            {annual ? t.planAnnual : t.plan}
          </p>
          <p className="mt-1.5 text-[15px] font-semibold text-[#1C1A17]">{t.collabsSuffix(props.quantity)}</p>
          {annual ? (
            <p className="text-[13px] text-[#6B6560]">{t.perYear(money(props.annualSubscription))}</p>
          ) : (
            <>
              <p className="text-[13px] text-[#6B6560]">{t.each(money(props.unitPrice))}</p>
              <p className="text-[13px] font-medium text-[#1C1A17]">{t.perMonth(money(props.monthlySubscription))}</p>
            </>
          )}
        </div>

        {props.quantitySavings > 0 && !annual && (
          <Row label={t.quantitySavings}>{t.perMonth(money(props.quantitySavings))}</Row>
        )}

        {annual && (
          <>
            <Row label={t.annualEquivalent}>{t.perMonth(money(props.annualEquivalentMonthly))}</Row>
            <Row label={t.annualSavings}>{t.perYear(money(props.annualSavings))}</Row>
          </>
        )}

        {/* Credit budget or BYOK */}
        {isByok ? (
          <Row label={t.apiKeys}>{t.externalBilling}</Row>
        ) : (
          <Row label={t.creditBudget}>{t.perMonth(money(props.creditBudget))}</Row>
        )}

        {/* Estimated total */}
        <div className="py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#857C6E]">
            {annual ? t.monthlyEstimated : t.totalEstimated}
          </p>
          <p className="mt-1 font-serif text-[26px] leading-none tabular-nums text-[#1C1A17]" aria-live="polite">
            {t.perMonth(money(props.estimatedMonthlyTotal))}
          </p>
          {isByok && <p className="mt-1 text-[12px] text-[#857C6E]">{t.byokNote}</p>}
        </div>

        {/* Charged now / after trial */}
        <Row label={t.today}>{money(0)}</Row>
        <div className="pt-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#857C6E]">{t.afterTrial}</p>
          <p className="mt-1 text-[15px] font-semibold tabular-nums text-[#1C1A17]" aria-live="polite">
            {annual ? money(props.amountDueAfterTrial) : t.perMonth(money(props.amountDueAfterTrial))}
          </p>
        </div>
      </div>

      {/* Single primary CTA */}
      <button
        type="button"
        onClick={props.onCta}
        disabled={props.ctaDisabled}
        aria-describedby="cta-hint"
        className="mt-5 flex min-h-12 w-full items-center justify-center rounded-full bg-[#7A1E3A] px-6 text-[15px] font-semibold text-white outline-none transition-colors hover:bg-[#6A1832] focus-visible:ring-2 focus-visible:ring-[#7A1E3A]/40 disabled:cursor-not-allowed disabled:bg-[#D8CFC2] disabled:text-[#8B8377]"
      >
        {props.quantity === 1 ? t.ctaSingular : t.ctaPlural(props.quantity)}
      </button>
      <p id="cta-hint" className="mt-2.5 text-center text-[12px] text-[#857C6E]">
        {props.ctaDisabled ? t.ctaDisabledHint : t.ctaHint}
      </p>
    </div>
  )
}
