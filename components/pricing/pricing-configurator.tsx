'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/lib/language-context'
import { pricingConfig, type BillingCycle } from '@/lib/pricing-config'
import {
  calculateAnnualEquivalentMonthly,
  calculateAnnualSubscription,
  calculateMonthlySubscription,
  getTierForQuantity,
  normalizeQuantity,
} from '@/lib/pricing-calculator'
import { formatEuro } from './format'

const COPY = {
  fr: {
    billingLegend: 'Cycle de facturation',
    monthly: 'Mensuel',
    annual: `Annuel · ${pricingConfig.annualFreeMonths} mois offerts`,
    collaboratorLabel: '1 · Le Collaborateur IA',
    collaboratorDescription: 'Une identité professionnelle durable, avec son environnement privé et sa propre expérience.',
    included: ['Identité professionnelle', 'Profils métier illimités', 'Compétences illimitées', 'Mémoire et Workspace privé', 'Applications selon vos autorisations', 'Validations humaines'],
    identityStays: 'Ses responsabilités évoluent. Son identité reste.',
    readyTitle: 'Déjà équipé pour travailler',
    ready: 'Réunions · Documents · Images · Vidéo',
    modelsLabel: '2 · Les modèles IA',
    modelsTitle: 'Vous choisissez.',
    creditsTitle: 'Crédits Unitalk',
    creditsText: (price: string) => `À partir de ${price}/mois.`,
    keysTitle: 'Vos propres clés API',
    keysText: 'Utilisez directement vos comptes OpenAI, Anthropic, Google, DeepSeek ou vos modèles privés.',
    hybridTitle: 'Hybride',
    hybridText: 'Combinez vos clés API et les crédits Unitalk selon les missions.',
    modelChanges: 'Le Collaborateur reste. Le modèle peut changer.',
    trialTitle: 'Commencez sans payer.',
    trialDays: `${pricingConfig.trialDays} jours d’essai gratuit`,
    trialTokens: '1 million de tokens préchargés',
    noCard: 'Sans carte bancaire',
    cta: 'Créer mon Collaborateur IA',
    afterMonthly: (price: string) => `Puis ${price}/mois, hors usages IA. Sans engagement.`,
    afterAnnual: (price: string) => `Puis ${price}/an, hors usages IA. Sans engagement.`,
    monthlyPrice: (price: string) => `${price}/mois`,
    annualPrice: (annual: string, monthly: string) => `${annual}/an · Soit ${monthly}/mois`,
    multipleTitle: 'Une identité vous suffit souvent. Plusieurs lorsque les responsabilités doivent être séparées.',
    multipleText: 'Créez un autre Collaborateur IA lorsque vous avez besoin d’un autre nom, de coordonnées distinctes, d’une mémoire séparée ou de ressources dédiées.',
    showVolume: 'Calculer le prix de plusieurs Collaborateurs',
    hideVolume: 'Replier le calculateur',
    quantityLabel: 'Nombre de Collaborateurs IA',
    decrease: 'Retirer un Collaborateur IA',
    increase: 'Ajouter un Collaborateur IA',
    totalMonthly: (price: string) => `${price}/mois au total`,
    totalAnnual: (price: string) => `${price}/an au total`,
    each: (price: string) => `${price}/mois par Collaborateur`,
  },
  en: {
    billingLegend: 'Billing cycle',
    monthly: 'Monthly',
    annual: `Annual · ${pricingConfig.annualFreeMonths} months free`,
    collaboratorLabel: '1 · The AI Collaborator',
    collaboratorDescription: 'A lasting professional identity, with its private environment and its own experience.',
    included: ['Professional identity', 'Unlimited job profiles', 'Unlimited skills', 'Memory and private Workspace', 'Applications based on your permissions', 'Human approvals'],
    identityStays: 'Its responsibilities evolve. Its identity remains.',
    readyTitle: 'Already equipped to work',
    ready: 'Meetings · Documents · Images · Video',
    modelsLabel: '2 · AI models',
    modelsTitle: 'You choose.',
    creditsTitle: 'Unitalk credits',
    creditsText: (price: string) => `From ${price}/month.`,
    keysTitle: 'Your own API keys',
    keysText: 'Use your OpenAI, Anthropic, Google, DeepSeek accounts or your private models directly.',
    hybridTitle: 'Hybrid',
    hybridText: 'Combine your API keys and Unitalk credits according to each mission.',
    modelChanges: 'The Collaborator remains. The model can change.',
    trialTitle: 'Start without paying.',
    trialDays: `${pricingConfig.trialDays}-day free trial`,
    trialTokens: '1 million tokens preloaded',
    noCard: 'No credit card',
    cta: 'Create my AI Collaborator',
    afterMonthly: (price: string) => `Then ${price}/month, excluding AI usage. No commitment.`,
    afterAnnual: (price: string) => `Then ${price}/year, excluding AI usage. No commitment.`,
    monthlyPrice: (price: string) => `${price}/month`,
    annualPrice: (annual: string, monthly: string) => `${annual}/year · ${monthly}/month equivalent`,
    multipleTitle: 'One identity is often enough. Use several when responsibilities need to be separated.',
    multipleText: 'Create another AI Collaborator when you need another name, separate contact details, separate memory or dedicated resources.',
    showVolume: 'Calculate the price for several Collaborators',
    hideVolume: 'Close calculator',
    quantityLabel: 'Number of AI Collaborators',
    decrease: 'Remove an AI Collaborator',
    increase: 'Add an AI Collaborator',
    totalMonthly: (price: string) => `${price}/month total`,
    totalAnnual: (price: string) => `${price}/year total`,
    each: (price: string) => `${price}/month per Collaborator`,
  },
} as const

function BillingToggle({ cycle, onChange }: { cycle: BillingCycle; onChange: (cycle: BillingCycle) => void }) {
  const { lang } = useLanguage()
  const t = COPY[lang]
  return (
    <fieldset className="flex justify-start">
      <legend className="sr-only">{t.billingLegend}</legend>
      <div role="radiogroup" aria-label={t.billingLegend} className="inline-flex w-full rounded-full border border-[#D8D0C2] bg-[#ECE6DB] p-1 sm:w-auto">
        {(['monthly', 'annual'] as BillingCycle[]).map((option) => {
          const active = cycle === option
          return (
            <button key={option} type="button" role="radio" aria-checked={active} onClick={() => onChange(option)} className={`min-h-11 flex-1 whitespace-nowrap rounded-full px-5 text-[13px] font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#D10E63]/50 ${active ? 'bg-white text-[#1C1A17] shadow-sm' : 'text-[#6E665A] hover:text-[#1C1A17]'}`}>
              {option === 'monthly' ? t.monthly : t.annual}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

export function PricingConfigurator() {
  const { lang } = useLanguage()
  const router = useRouter()
  const t = COPY[lang]
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly')
  const money = (value: number) => formatEuro(value, lang)
  const annual = billingCycle === 'annual'
  const annualSubscription = calculateAnnualSubscription(1)
  const monthlySubscription = calculateMonthlySubscription(1)

  function startTrial() {
    try {
      sessionStorage.setItem('unitalk_pricing_selection', JSON.stringify({
        quantity: 1,
        billingCycle,
        quantityTier: getTierForQuantity(1).label,
        monthlySubscription,
        annualSubscription,
      }))
    } catch {}
    router.push('/decouvrir')
  }

  return (
    <section aria-label={t.billingLegend} className="mx-auto w-full max-w-[1120px] px-5 pb-8 sm:px-8">
      <BillingToggle cycle={billingCycle} onChange={setBillingCycle} />

      <div className="mt-7 grid items-stretch gap-4 lg:grid-cols-[1fr_72px_1fr] lg:gap-0">
        <article className="flex flex-col rounded-[28px] border border-[#D8D0C2] bg-white p-6 sm:p-9">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#B00C54]">{t.collaboratorLabel}</p>
          <div className="mt-6" aria-live="polite">
            <p className="font-sf text-[40px] font-bold tracking-[-0.05em] sm:text-[50px]">
              {annual ? t.annualPrice(money(annualSubscription), money(calculateAnnualEquivalentMonthly(1))) : t.monthlyPrice(money(monthlySubscription))}
            </p>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[#4E483F]">{t.collaboratorDescription}</p>
          </div>
          <ul className="mt-7 grid gap-x-6 gap-y-3 border-t border-[#E4DDCE] pt-6 sm:grid-cols-2">
            {t.included.map((item) => <li key={item} className="text-[13px] font-medium text-[#4E483F]">{item}</li>)}
          </ul>
          <div className="mt-auto pt-8">
            <p className="font-sf text-lg font-bold">{t.identityStays}</p>
            <p className="mt-5 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-[#6E665A]">{t.readyTitle}</p>
            <p className="mt-2 text-sm text-[#4E483F]">{t.ready}</p>
          </div>
        </article>

        <div aria-hidden="true" className="flex items-center justify-center font-sf text-[48px] font-bold text-[#D10E63] lg:text-[62px]">+</div>

        <article className="flex flex-col rounded-[28px] bg-[#211E1A] p-6 text-[#F8F5EE] sm:p-9">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#F15A9B]">{t.modelsLabel}</p>
          <h2 className="mt-6 font-sf text-[40px] font-bold tracking-[-0.05em] sm:text-[50px]">{t.modelsTitle}</h2>
          <div className="mt-7 divide-y divide-white/15 border-y border-white/15">
            {[
              [t.creditsTitle, t.creditsText(money(pricingConfig.creditBudgets.find((budget) => budget.enabled)?.amount ?? 0))],
              [t.keysTitle, t.keysText],
              [t.hybridTitle, t.hybridText],
            ].map(([title, text]) => (
              <div key={title} className="py-5">
                <h3 className="font-semibold text-white">{title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[#CFC7BC]">{text}</p>
              </div>
            ))}
          </div>
          <p className="mt-auto pt-8 font-sf text-lg font-bold">{t.modelChanges}</p>
        </article>
      </div>

      <div className="mt-4 rounded-[28px] bg-[#E8DDE1] px-6 py-7 sm:px-9 sm:py-8">
        <div className="grid items-center gap-7 lg:grid-cols-[1fr_auto]">
          <div>
            <h2 className="font-sf text-[30px] font-bold tracking-[-0.035em] sm:text-[38px]">{t.trialTitle}</h2>
            <ul className="mt-4 flex flex-col gap-2 text-sm font-semibold text-[#4E483F] sm:flex-row sm:flex-wrap sm:gap-6">
              <li>{t.trialDays}</li><li>{t.trialTokens}</li><li>{t.noCard}</li>
            </ul>
          </div>
          <div className="lg:min-w-[310px]">
            <button type="button" id="pricing-cta" onClick={startTrial} className="group flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#D10E63] px-6 text-sm font-semibold text-white outline-none transition-all hover:-translate-y-0.5 hover:bg-[#E51872] focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2">
              {t.cta}<span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
            </button>
            <p className="mt-2.5 text-[12px] leading-relaxed text-[#6E665A]">{annual ? t.afterAnnual(money(annualSubscription)) : t.afterMonthly(money(monthlySubscription))}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export function MultiCollaboratorConfigurator() {
  const { lang } = useLanguage()
  const t = COPY[lang]
  const [open, setOpen] = useState(false)
  const [quantity, setQuantity] = useState(2)
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly')
  const normalized = normalizeQuantity(quantity)
  const tier = getTierForQuantity(normalized)
  const money = (value: number) => formatEuro(value, lang)

  return (
    <section aria-labelledby="multiple-title" className="mx-auto w-full max-w-[1120px] px-5 py-16 sm:px-8 sm:py-24">
      <div className="grid gap-6 lg:grid-cols-[1fr_340px] lg:items-end">
        <div>
          <h2 id="multiple-title" className="max-w-3xl font-sf text-[32px] font-bold leading-tight tracking-[-0.04em] sm:text-[44px]">{t.multipleTitle}</h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[#4E483F]">{t.multipleText}</p>
        </div>
        <button type="button" aria-expanded={open} onClick={() => setOpen((value) => !value)} className="text-left text-sm font-bold text-[#B00C54] underline decoration-[#D10E63]/30 underline-offset-4 outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/50 lg:text-right">
          {open ? t.hideVolume : `${t.showVolume} →`}
        </button>
      </div>
      {open && (
        <div className="mt-8 grid gap-6 rounded-[24px] border border-[#D8D0C2] bg-white p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <BillingToggle cycle={billingCycle} onChange={setBillingCycle} />
            <p id="quantity-label" className="mt-6 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-[#6E665A]">{t.quantityLabel}</p>
            <div className="mt-3 inline-flex items-center rounded-full border border-[#D8D0C2]">
              <button type="button" aria-label={t.decrease} disabled={normalized <= 2} onClick={() => setQuantity((value) => Math.max(2, normalizeQuantity(value) - 1))} className="h-11 w-11 rounded-full text-xl hover:bg-[#FBF3F7] disabled:text-[#CFC6B8]">−</button>
              <span aria-live="polite" aria-labelledby="quantity-label" className="min-w-14 text-center text-lg font-semibold tabular-nums">{normalized}</span>
              <button type="button" aria-label={t.increase} onClick={() => setQuantity((value) => normalizeQuantity(value) + 1)} className="h-11 w-11 rounded-full text-xl hover:bg-[#FBF3F7]">+</button>
            </div>
          </div>
          <div aria-live="polite" className="lg:text-right">
            <p className="font-sf text-[32px] font-bold tracking-[-0.04em]">{billingCycle === 'annual' ? t.totalAnnual(money(calculateAnnualSubscription(normalized))) : t.totalMonthly(money(calculateMonthlySubscription(normalized)))}</p>
            <p className="mt-2 text-sm text-[#6E665A]">{t.each(money(tier.monthlyUnitPrice))}</p>
          </div>
        </div>
      )}
    </section>
  )
}
