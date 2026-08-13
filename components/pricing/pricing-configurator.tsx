'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/lib/language-context'
import { minimumCreditBudget, pricingConfig, type BillingCycle } from '@/lib/pricing-config'
import { calculateAnnualSubscription, calculateMonthlySubscription, getTierForQuantity, normalizeQuantity } from '@/lib/pricing-calculator'
import { formatEuro } from './format'

const COPY = {
  fr: {
    collaborator: '1 · Le Collaborateur IA', monthly: 'Mensuel', annual: 'Annuel', perMonth: '€ / mois', annualEquivalent: (price: string) => `Soit ${price}/mois · 2 mois offerts`, definition: 'Une identité professionnelle durable, équipée pour travailler avec les autres et conserver sa propre expérience.', identityLines: [['Identité', 'Prénom, visage, voix et profil public.'], ['Communication', 'Email, calendrier et numéro de téléphone professionnels.'], ['Collaboration', 'Avec vos équipes, vos contacts et les autres Collaborateurs IA.'], ['Continuité', 'Mémoire, environnement privé, profils métier et compétences sans limite.']], identityStays: 'Ses responsabilités évoluent. Son identité reste.', models: '2 · Les modèles IA', modelsTitle: 'Vous choisissez.', modelLines: (credit: string) => [['Crédits Unitalk', `À partir de ${credit}/mois.`], ['Vos propres clés API', 'Facturées directement par vos fournisseurs.'], ['Hybride', 'Combinez les deux selon les missions.']], modelChanges: 'Le Collaborateur reste. Le modèle peut changer.', statement: 'Vous payez l’identité. Vous choisissez l’intelligence qu’elle mobilise.', trialTitle: 'Commencez sans payer.', trialItems: ['7 jours d’essai gratuit', '1 million de tokens offerts', 'Sans carte bancaire'], cta: 'Commencer mes 7 jours d’essai', todayMonthly: (price: string) => `0 € aujourd’hui. Puis ${price}/mois, hors usages IA. Sans engagement.`, todayAnnual: (price: string) => `0 € aujourd’hui. Puis ${price}/an, hors usages IA.`, multipleTitle: 'Un Collaborateur IA suffit tant que l’identité reste la même.', multipleIntro: 'Créez une nouvelle identité lorsque vous avez besoin d’un autre prénom, de coordonnées distinctes, d’une mémoire séparée ou de ressources privées dédiées.', show: 'Calculer le prix de plusieurs identités', hide: 'Replier le calculateur', quantity: 'Nombre d’identités', decrease: 'Retirer une identité', increase: 'Ajouter une identité', totalMonth: (price: string) => `${price}/mois au total`, totalYear: (price: string) => `${price}/an au total`, each: (price: string) => `${price}/mois par identité`,
  },
  en: {
    collaborator: '1 · The AI Collaborator', monthly: 'Monthly', annual: 'Annual', perMonth: '€ / month', annualEquivalent: (price: string) => `${price}/month equivalent · 2 months free`, definition: 'A lasting professional identity, equipped to work with others and retain its own experience.', identityLines: [['Identity', 'First name, face, voice and public profile.'], ['Communication', 'Professional email, calendar and phone number.'], ['Collaboration', 'With your teams, contacts and other AI Collaborators.'], ['Continuity', 'Memory, private environment, unlimited job profiles and skills.']], identityStays: 'Its responsibilities evolve. Its identity remains.', models: '2 · AI models', modelsTitle: 'You choose.', modelLines: (credit: string) => [['Unitalk credits', `From ${credit}/month.`], ['Your own API keys', 'Billed directly by your providers.'], ['Hybrid', 'Combine both according to each mission.']], modelChanges: 'The Collaborator remains. The model can change.', statement: 'You pay for the identity. You choose the intelligence it uses.', trialTitle: 'Start without paying.', trialItems: ['7-day free trial', '1 million tokens', 'No credit card'], cta: 'Start my 7-day trial', todayMonthly: (price: string) => `€0 today. Then ${price}/month, excluding AI usage. No commitment.`, todayAnnual: (price: string) => `€0 today. Then ${price}/year, excluding AI usage.`, multipleTitle: 'One AI Collaborator is enough as long as the identity remains the same.', multipleIntro: 'Create a new identity when you need another first name, separate contact details, separate memory or dedicated private resources.', show: 'Calculate the price for several identities', hide: 'Close calculator', quantity: 'Number of identities', decrease: 'Remove an identity', increase: 'Add an identity', totalMonth: (price: string) => `${price}/month total`, totalYear: (price: string) => `${price}/year total`, each: (price: string) => `${price}/month per identity`,
  },
} as const

function Toggle({ value, onChange }: { value: BillingCycle; onChange: (value: BillingCycle) => void }) {
  const { lang } = useLanguage(); const t = COPY[lang]
  return <div role="radiogroup" aria-label={lang === 'fr' ? 'Cycle de facturation' : 'Billing cycle'} className="inline-flex border border-[#1C1A17]/20 p-1">{(['monthly', 'annual'] as BillingCycle[]).map((cycle) => <button key={cycle} type="button" role="radio" aria-checked={value === cycle} onClick={() => onChange(cycle)} className={`px-4 py-1.5 text-[12px] font-semibold outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] ${value === cycle ? 'bg-[#151310] text-white' : 'text-[#6E665A]'}`}>{cycle === 'monthly' ? t.monthly : t.annual}</button>)}</div>
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
    <section id="pricing-formula" className="mx-auto w-full max-w-[1120px] px-5 pb-8 sm:px-8">
      <div className="relative grid border border-[#1C1A17]/15 bg-[#FAF8F3] md:grid-cols-2">
        <div className="p-4 md:pr-8 lg:px-5 lg:py-3 lg:pr-10">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.17em] text-[#6E665A]">{t.collaborator}</p>
          <div id="pricing-price" className="flex items-end gap-3"><span className="font-sf text-[72px] font-bold leading-none tracking-[-0.07em] sm:text-[80px]">{annual ? annualPrice : monthlyPrice}</span><span className="pb-1.5 text-[15px] font-semibold">{annual ? '€ / an' : t.perMonth}</span></div>
          {annual && <p className="text-sm font-semibold text-[#6E665A]">{t.annualEquivalent(money(annualPrice / 12))}</p>}
          <div className="mt-1"><Toggle value={cycle} onChange={setCycle} /></div>
          <p className="mt-2 text-[13px] leading-4 text-[#4E483F]">{t.definition}</p>
          <dl className="mt-2 grid gap-x-5 gap-y-0.5 text-[12px] leading-4 text-[#4E483F] sm:grid-cols-2">{t.identityLines.map(([label, text]) => <div key={label}><dt className="inline font-semibold text-[#1C1A17]">{label}. </dt><dd className="inline">{text}</dd></div>)}</dl>
          <p className="mt-2 font-sf text-[16px] font-bold">{t.identityStays}</p>
        </div>
        <div className="border-t border-[#1C1A17]/15 p-4 md:border-l md:border-t-0 md:pl-8 lg:px-5 lg:py-3 lg:pl-10">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.17em] text-[#6E665A]">{t.models}</p>
          <h2 className="mt-1 font-sf text-[32px] font-bold tracking-[-0.045em] sm:text-[36px]">{t.modelsTitle}</h2>
          <div className="mt-2 border-t border-[#1C1A17]/15">{t.modelLines(money(minimumCreditBudget())).map(([name, detail]) => <div key={name} className="grid border-b border-[#1C1A17]/15 py-1.5 text-[13px] sm:grid-cols-[1fr_1.15fr] sm:gap-3"><p className="font-semibold">{name}</p><p className="text-[#6E665A]">{detail}</p></div>)}</div>
          <p className="mt-2 font-sf text-[16px] font-bold">{t.modelChanges}</p>
        </div>
        <span aria-hidden className="absolute left-1/2 top-1/2 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-[#F3EFE6] font-sf text-[32px] font-bold text-[#D10E63] md:flex">+</span>
      </div>
      <p className="py-1 text-center font-sf text-[16px] font-bold sm:text-[18px]">{t.statement}</p>
      <div id="pricing-trial" className="grid items-center gap-2 bg-[#151310] px-5 py-2 text-[#FAF8F3] sm:px-6 lg:grid-cols-[1fr_auto]">
        <div><p className="font-sf text-[17px] font-bold">{t.trialTitle}</p><div className="flex flex-wrap gap-x-6 gap-y-1 font-mono text-[10px] font-bold uppercase tracking-[0.08em]">{t.trialItems.map((item) => <span key={item}>{item}</span>)}</div></div>
        <div className="lg:min-w-[350px]"><button type="button" id="pricing-cta" onClick={startTrial} className="h-10 w-full bg-[#D10E63] px-5 text-sm font-bold text-white outline-none hover:bg-[#E51872] focus-visible:ring-2 focus-visible:ring-white">{t.cta} →</button><p className="mt-1 text-[11px] text-[#BDB7AC]">{annual ? t.todayAnnual(money(annualPrice)) : t.todayMonthly(money(monthlyPrice))}</p></div>
      </div>
    </section>
  )
}

export function MultiCollaboratorConfigurator() {
  const { lang } = useLanguage(); const t = COPY[lang]
  const [open, setOpen] = useState(false); const [quantity, setQuantity] = useState(2); const [cycle, setCycle] = useState<BillingCycle>('monthly')
  const count = normalizeQuantity(quantity); const unit = getTierForQuantity(count).monthlyUnitPrice; const money = (value: number) => formatEuro(value, lang)
  return <section className="bg-[#F3EFE6]"><div className="mx-auto w-full max-w-[1120px] px-5 py-16 sm:px-8 sm:py-24"><h2 className="max-w-4xl font-sf text-[36px] font-bold leading-[1.02] tracking-[-0.045em] sm:text-[54px]">{t.multipleTitle}</h2><p className="mt-6 max-w-3xl text-[17px] leading-7 text-[#4E483F]">{t.multipleIntro}</p><button type="button" aria-expanded={open} onClick={() => setOpen((value) => !value)} className="mt-6 text-sm font-bold text-[#B00C54] underline underline-offset-4 outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]">{open ? t.hide : `${t.show} →`}</button>{open && <div className="mt-7 grid gap-6 border-t border-[#1C1A17]/15 pt-7 sm:grid-cols-[1fr_auto] sm:items-end"><div><Toggle value={cycle} onChange={setCycle} /><p className="mt-5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#6E665A]">{t.quantity}</p><div className="mt-2 inline-flex border border-[#1C1A17]/20"><button type="button" aria-label={t.decrease} disabled={count <= 2} onClick={() => setQuantity((value) => Math.max(2, value - 1))} className="h-11 w-11 outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] disabled:opacity-30">−</button><span className="flex min-w-12 items-center justify-center border-x border-[#1C1A17]/20 font-bold">{count}</span><button type="button" aria-label={t.increase} onClick={() => setQuantity((value) => value + 1)} className="h-11 w-11 outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]">+</button></div></div><div className="sm:text-right"><p className="font-sf text-[32px] font-bold">{cycle === 'annual' ? t.totalYear(money(calculateAnnualSubscription(count))) : t.totalMonth(money(calculateMonthlySubscription(count)))}</p><p className="mt-1 text-sm text-[#6E665A]">{t.each(money(unit))}</p></div></div>}</div></section>
}
