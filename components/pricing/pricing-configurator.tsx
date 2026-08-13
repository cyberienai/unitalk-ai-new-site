'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/lib/language-context'
import { minimumCreditBudget, pricingConfig, type BillingCycle } from '@/lib/pricing-config'
import { calculateAnnualSubscription, calculateMonthlySubscription, getTierForQuantity, normalizeQuantity } from '@/lib/pricing-calculator'
import { formatEuro } from './format'

const COPY = {
  fr: {
    collaborator: 'Collaborateur IA', monthly: 'Mensuel', annual: 'Annuel', perMonth: '€ / mois', annualLine: (price: string) => `${price}/an · 2 mois offerts`, identityLines: ['Une identité professionnelle', 'Profils métier illimités', 'Compétences illimitées', 'Mémoire et environnement privés'], identityStays: 'L’identité reste.', models: 'Modèles IA', modelsTitle: 'À votre choix.', modelLines: (credit: string) => [['Crédits Unitalk', `dès ${credit}/mois`], ['Vos propres clés API', 'facturées par vos fournisseurs'], ['Hybride', 'combinez les deux']], modelChanges: 'Le modèle peut changer.', statement: 'Vous payez l’identité. Vous choisissez l’intelligence qu’elle mobilise.', trialItems: ['7 jours d’essai', '1 million de tokens', 'Sans carte bancaire'], cta: 'Commencer mes 7 jours d’essai', todayMonthly: (price: string) => `0 € aujourd’hui. Puis ${price}/mois, hors usages IA.`, todayAnnual: (price: string) => `0 € aujourd’hui. Puis ${price}/an, hors usages IA.`, multipleTitle: 'Un Collaborateur IA suffit tant que l’identité reste la même.', multipleIntro: 'Créez une nouvelle identité seulement lorsque vous avez besoin :', reasons: ['d’un autre nom', 'de coordonnées distinctes', 'd’une mémoire séparée', 'de ressources privées dédiées'], show: 'Calculer le prix de plusieurs identités', hide: 'Replier le calculateur', quantity: 'Nombre d’identités', decrease: 'Retirer une identité', increase: 'Ajouter une identité', totalMonth: (price: string) => `${price}/mois au total`, totalYear: (price: string) => `${price}/an au total`, each: (price: string) => `${price}/mois par identité`,
  },
  en: {
    collaborator: 'AI Collaborator', monthly: 'Monthly', annual: 'Annual', perMonth: '€ / month', annualLine: (price: string) => `${price}/year · 2 months free`, identityLines: ['A professional identity', 'Unlimited job profiles', 'Unlimited skills', 'Private memory and environment'], identityStays: 'The identity remains.', models: 'AI models', modelsTitle: 'Your choice.', modelLines: (credit: string) => [['Unitalk credits', `from ${credit}/month`], ['Your own API keys', 'billed by your providers'], ['Hybrid', 'combine both']], modelChanges: 'The model can change.', statement: 'You pay for the identity. You choose the intelligence it uses.', trialItems: ['7-day trial', '1 million tokens', 'No credit card'], cta: 'Start my 7-day trial', todayMonthly: (price: string) => `€0 today. Then ${price}/month, excluding AI usage.`, todayAnnual: (price: string) => `€0 today. Then ${price}/year, excluding AI usage.`, multipleTitle: 'One AI Collaborator is enough as long as the identity remains the same.', multipleIntro: 'Create a new identity only when you need:', reasons: ['another name', 'separate contact details', 'separate memory', 'dedicated private resources'], show: 'Calculate the price for several identities', hide: 'Close calculator', quantity: 'Number of identities', decrease: 'Remove an identity', increase: 'Add an identity', totalMonth: (price: string) => `${price}/month total`, totalYear: (price: string) => `${price}/year total`, each: (price: string) => `${price}/month per identity`,
  },
} as const

function Toggle({ value, onChange }: { value: BillingCycle; onChange: (value: BillingCycle) => void }) {
  const { lang } = useLanguage(); const t = COPY[lang]
  return <div role="radiogroup" className="inline-flex border border-[#1C1A17]/20 p-1">{(['monthly', 'annual'] as BillingCycle[]).map((cycle) => <button key={cycle} type="button" role="radio" aria-checked={value === cycle} onClick={() => onChange(cycle)} className={`px-4 py-1.5 text-[12px] font-semibold ${value === cycle ? 'bg-[#151310] text-white' : 'text-[#6E665A]'}`}>{cycle === 'monthly' ? t.monthly : t.annual}</button>)}</div>
}

export function PricingConfigurator() {
  const { lang } = useLanguage(); const router = useRouter(); const t = COPY[lang]
  const [cycle, setCycle] = useState<BillingCycle>('monthly')
  const annual = cycle === 'annual'
  const money = (value: number) => formatEuro(value, lang)
  const monthlyPrice = pricingConfig.baseMonthlyPrice
  const annualPrice = calculateAnnualSubscription(1)
  function startTrial() {
    try { sessionStorage.setItem('unitalk_pricing_selection', JSON.stringify({ quantity: 1, billingCycle: cycle, monthlySubscription: monthlyPrice, annualSubscription: annualPrice })) } catch {}
    router.push('/decouvrir')
  }
  return (
    <section className="mx-auto w-full max-w-[1120px] px-5 pb-10 sm:px-8">
      <div className="relative grid border-y border-[#1C1A17]/15 md:grid-cols-2">
        <div className="py-4 md:pr-12">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.17em] text-[#6E665A]">{t.collaborator}</p>
          <div className="mt-1 flex items-end gap-3"><span className="font-sf text-[82px] font-bold leading-none tracking-[-0.07em] sm:text-[96px]">{annual ? annualPrice : monthlyPrice}</span><span className="pb-2 text-[16px] font-semibold">{annual ? '€ / an' : t.perMonth}</span></div>
          <p className="text-sm font-semibold text-[#6E665A]">{t.annualLine(money(annualPrice))}</p>
          <div className="mt-3"><Toggle value={cycle} onChange={setCycle} /></div>
          <div className="mt-3 grid gap-x-5 text-[14px] leading-5 text-[#4E483F] sm:grid-cols-2">{t.identityLines.map((line) => <p key={line}>{line}</p>)}</div>
          <p className="mt-2 font-sf text-lg font-bold">{t.identityStays}</p>
        </div>
        <div className="border-t border-[#1C1A17]/15 py-4 md:border-l md:border-t-0 md:pl-12">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.17em] text-[#6E665A]">{t.models}</p>
          <h2 className="mt-2 font-sf text-[38px] font-bold tracking-[-0.045em] sm:text-[44px]">{t.modelsTitle}</h2>
          <div className="mt-3 border-t border-[#1C1A17]/15">{t.modelLines(money(minimumCreditBudget())).map(([name, detail]) => <div key={name} className="grid gap-1 border-b border-[#1C1A17]/15 py-2.5 text-[14px] sm:grid-cols-[1fr_auto]"><span className="font-semibold">{name}</span><span className="text-[#6E665A]">{detail}</span></div>)}</div>
          <p className="mt-3 font-sf text-lg font-bold">{t.modelChanges}</p>
        </div>
        <span aria-hidden className="absolute left-1/2 top-1/2 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-[#F3EFE6] font-sf text-[32px] font-bold text-[#D10E63] md:flex">+</span>
      </div>
      <p className="py-3 text-center font-sf text-[17px] font-bold sm:text-[20px]">{t.statement}</p>
      <div className="grid items-center gap-4 bg-[#151310] px-5 py-4 text-[#FAF8F3] sm:px-6 lg:grid-cols-[1fr_auto]">
        <div className="flex flex-wrap gap-x-7 gap-y-2 font-mono text-[11px] font-bold uppercase tracking-[0.1em]">{t.trialItems.map((item) => <span key={item}>{item}</span>)}</div>
        <div className="lg:min-w-[330px]"><button type="button" id="pricing-cta" onClick={startTrial} className="h-11 w-full bg-[#D10E63] px-5 text-sm font-bold text-white hover:bg-[#E51872]">{t.cta} →</button><p className="mt-2 text-[12px] text-[#BDB7AC]">{annual ? t.todayAnnual(money(annualPrice)) : t.todayMonthly(money(monthlyPrice))}</p></div>
      </div>
    </section>
  )
}

export function MultiCollaboratorConfigurator() {
  const { lang } = useLanguage(); const t = COPY[lang]
  const [open, setOpen] = useState(false); const [quantity, setQuantity] = useState(2); const [cycle, setCycle] = useState<BillingCycle>('monthly')
  const count = normalizeQuantity(quantity); const unit = getTierForQuantity(count).monthlyUnitPrice; const money = (value: number) => formatEuro(value, lang)
  return <section className="bg-[#F3EFE6]"><div className="mx-auto w-full max-w-[1120px] px-5 py-16 sm:px-8 sm:py-24"><h2 className="max-w-4xl font-sf text-[36px] font-bold leading-[1.02] tracking-[-0.045em] sm:text-[54px]">{t.multipleTitle}</h2><p className="mt-6 text-[17px] text-[#4E483F]">{t.multipleIntro}</p><div className="mt-4 grid gap-2 border-y border-[#1C1A17]/15 py-5 text-[15px] sm:grid-cols-2">{t.reasons.map((reason) => <p key={reason}>{reason}</p>)}</div><button type="button" aria-expanded={open} onClick={() => setOpen((value) => !value)} className="mt-6 text-sm font-bold text-[#B00C54] underline underline-offset-4">{open ? t.hide : `${t.show} →`}</button>{open && <div className="mt-7 grid gap-6 border-t border-[#1C1A17]/15 pt-7 sm:grid-cols-[1fr_auto] sm:items-end"><div><Toggle value={cycle} onChange={setCycle} /><p className="mt-5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#6E665A]">{t.quantity}</p><div className="mt-2 inline-flex border border-[#1C1A17]/20"><button type="button" aria-label={t.decrease} disabled={count <= 2} onClick={() => setQuantity((value) => Math.max(2, value - 1))} className="h-11 w-11 disabled:opacity-30">−</button><span className="flex min-w-12 items-center justify-center border-x border-[#1C1A17]/20 font-bold">{count}</span><button type="button" aria-label={t.increase} onClick={() => setQuantity((value) => value + 1)} className="h-11 w-11">+</button></div></div><div className="sm:text-right"><p className="font-sf text-[32px] font-bold">{cycle === 'annual' ? t.totalYear(money(calculateAnnualSubscription(count))) : t.totalMonth(money(calculateMonthlySubscription(count)))}</p><p className="mt-1 text-sm text-[#6E665A]">{t.each(money(unit))}</p></div></div>}</div></section>
}
