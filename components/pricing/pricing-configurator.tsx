'use client'

import Link from 'next/link'
import { startTransition, useState } from 'react'
import { ChevronDown, Minus, Plus, Users, Award, ArrowRight, Coins } from 'lucide-react'
import { persistPricingDraft } from '@/app/actions/pricing'
import {
  configurationBreakdownAt,
  configurationTotalAt,
  unitalkPricing,
  type AiCapacityId,
} from '@/lib/unitalk-pricing'
import { usePricingDraft } from './pricing-draft-context'
import { useLanguage } from '@/lib/language-context'

const CURRENT_DATE = new Date('2026-08-13T12:00:00Z')
const PERIODS_FR = [
  ['Jusqu’au 21 décembre 2026', new Date('2026-12-21T12:00:00Z')],
  ['Du 22 au 31 décembre 2026', new Date('2026-12-22T12:00:00Z')],
  ['À partir du 1 janvier 2027', new Date('2027-01-01T12:00:00Z')],
] as const

const PERIODS_EN = [
  ['Until December 21, 2026', new Date('2026-12-21T12:00:00Z')],
  ['From Dec 22 to 31, 2026', new Date('2026-12-22T12:00:00Z')],
  ['From January 1, 2027', new Date('2027-01-01T12:00:00Z')],
] as const

const PLAN_INFO = {
  fr: {
    byok: {
      name: 'BYOK (Clés propres)',
      slogan: 'Utilisez vos propres clés d’API',
      tokens: 'Usage facturé par votre fournisseur',
      desc: 'Idéal si vous possédez déjà des abonnements d’API chez OpenAI, Anthropic ou Google.',
    },
    quarterTime: {
      name: 'Quart-temps',
      slogan: 'Tâches de fond & Automatisations',
      tokens: '5 millions de tokens / mois',
      desc: 'Parfait pour assurer la veille, mettre à jour le CRM en arrière-plan et exécuter des tâches simples.',
    },
    halfTime: {
      name: 'Mi-temps',
      slogan: 'Prise en charge active quotidienne',
      tokens: '10 millions de tokens / mois',
      desc: 'Idéal pour le tri et la réponse aux emails, la qualification réactive de prospects et la planification d’agenda.',
    },
    fullTime: {
      name: 'Temps plein',
      slogan: 'Autonomie complète 24/7 dédiée',
      tokens: '20 millions de tokens / mois',
      desc: 'Un collaborateur IA dédié à 100% à l’action, prêt à piloter des processus multi-applications complexes.',
    },
  },
  en: {
    byok: {
      name: 'BYOK (Own Keys)',
      slogan: 'Use your own API keys',
      tokens: 'Usage billed directly by your provider',
      desc: 'Ideal if you already have API subscriptions with OpenAI, Anthropic, or Google.',
    },
    quarterTime: {
      name: 'Part-time (1/4)',
      slogan: 'Background Tasks & Automations',
      tokens: '5 million tokens / month',
      desc: 'Perfect for monitoring, updating the CRM in the background, and running simple tasks.',
    },
    halfTime: {
      name: 'Half-time (1/2)',
      slogan: 'Active Daily Support',
      tokens: '10 million tokens / month',
      desc: 'Ideal for email sorting and replying, responsive lead qualification, and calendar planning.',
    },
    fullTime: {
      name: 'Full-time (1/1)',
      slogan: 'Dedicated 24/7 Autonomy',
      tokens: '20 million tokens / month',
      desc: 'An AI collaborator 100% dedicated to action, ready to drive complex multi-app workflows.',
    },
  }
} as const

const T = {
  fr: {
    eyebrow: 'Votre configuration',
    heading: 'Composez votre équipe',
    collabTitle: 'Agents Hermes',
    collabDesc: 'Une identité professionnelle distincte, avec ses outils, ses droits et ses profils métier.',
    planTitle: 'Capacité IA par Agent Hermes',
    planDesc: 'Choisissez le volume mensuel de modèles attribué à chaque agent.',
    cocreatorTitle: 'Co-créateurs IA',
    cocreatorDesc: 'Personnes autorisées à créer, tester, versionner et publier des actifs Unitalk.',
    
    // Right card
    cardKicker: 'Prix en direct',
    cardTitle: 'Votre configuration',
    cardEstimationBadge: 'Estimation',
    lineOrg: 'Alma Organisation',
    lineOrgDetail: 'Workspace & Desktop inclus',
    lineLaunchPromo: 'Offre de lancement (Alma)',
    lineCollab: 'Agents Hermes',
    lineForfait: 'Capacité',
    linePromoTrial: 'Offre capacité d’essai',
    lineCocreator: 'Licence Co-créateur IA',
    
    cardPeriod: '/mois',
    cardAfterTrial: 'Total mensuel',
    cardSovereignBadge: 'Après l’essai gratuit',
    cardToday: 'Aujourd’hui (7 jours d’essai)',
    cardTrialIncluded: '1 million de tokens d’action inclus',
    cardTrialFree: '0 €',
    cardCta: 'Commencer gratuitement',
    cardNoCardNeeded: '7 jours gratuits · Sans carte bancaire',
    cardAccordion: 'Voir l’évolution du prix hors promotions',
    cardCurrency: '€',
    remove: 'Retirer',
    add: 'Ajouter',
    selectedProfile: 'Profil présélectionné',
  },
  en: {
    eyebrow: 'Your configuration',
    heading: 'Build your team',
    collabTitle: 'Hermes Agents',
    collabDesc: 'A distinct professional identity with its tools, permissions and job profiles.',
    planTitle: 'AI capacity per Hermes Agent',
    planDesc: 'Choose the monthly model allowance assigned to each agent.',
    cocreatorTitle: 'AI Co-creators',
    cocreatorDesc: 'People allowed to create, test, version and publish Unitalk assets.',
    
    // Right card
    cardKicker: 'Live pricing',
    cardTitle: 'Your configuration',
    cardEstimationBadge: 'Estimate',
    lineOrg: 'Alma Organization',
    lineOrgDetail: 'Workspace & Desktop included',
    lineLaunchPromo: 'Launch Offer (Alma)',
    lineCollab: 'Hermes Agents',
    lineForfait: 'Capacity',
    linePromoTrial: 'Trial capacity offer',
    lineCocreator: 'AI Co-creator License',
    
    cardPeriod: '/month',
    cardAfterTrial: 'Monthly total',
    cardSovereignBadge: 'After the free trial',
    cardToday: 'Today (7-day trial)',
    cardTrialIncluded: '1 million action tokens included',
    cardTrialFree: '0 €',
    cardCta: 'Start free',
    cardNoCardNeeded: '7 days free · No credit card',
    cardAccordion: 'See pricing evolution without promotions',
    cardCurrency: '€',
    remove: 'Remove',
    add: 'Add',
    selectedProfile: 'Preselected profile',
  }
} as const

export function PricingConfigurator() {
  const { lang } = useLanguage()
  const t = T[lang]
  const planInfo = PLAN_INFO[lang]
  const periods = lang === 'fr' ? PERIODS_FR : PERIODS_EN

  const { draft, selectedProfile, setCollaborators, setCapacity, setCoCreators } = usePricingDraft()
  const { collaborators, capacity, coCreators } = draft
  const [pending, setPending] = useState(false)
  const breakdown = configurationBreakdownAt(collaborators, capacity, coCreators, CURRENT_DATE)

  function submit() {
    setPending(true)
    startTransition(() => persistPricingDraft({ collaborators, capacity, coCreators }).catch(() => setPending(false)))
  }

  return (
    <div id="configurateur" className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
      {/* Left Column — Configurator */}
      <div className="flex flex-col gap-6 rounded-3xl border border-[#D8D0C2] bg-[#FBF9F3] p-6 sm:p-8">
        <div>
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#D10E63]">{t.eyebrow}</span>
          <h2 className="mt-2 font-sf text-2xl font-bold tracking-[-0.025em] text-[#1C1A17]">{t.heading}</h2>
          {selectedProfile && <p className="mt-3 inline-flex rounded-full bg-[#D10E63]/10 px-3 py-1.5 text-xs font-bold text-[#B00C54]">{t.selectedProfile} : {selectedProfile}</p>}
          <Link href="/documentation" className="mt-4 block text-xs font-bold text-[#B00C54] underline-offset-4 hover:underline">Voir le détail des licences →</Link>
        </div>

        {/* Counter Collaborators */}
        <div className="flex flex-col justify-between gap-4 border-t border-[#DED6C8]/60 pt-6 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-base font-bold text-[#1C1A17] flex items-center gap-2">
              <Users className="h-4.5 w-4.5 text-[#D10E63]" />
              {t.collabTitle}
            </h3>
            <p className="mt-1 text-xs text-[#6E665A] max-w-sm">
              {t.collabDesc}
            </p>
          </div>
          <Counter 
            value={collaborators} 
            min={unitalkPricing.aiCollaborator.min} 
            max={unitalkPricing.aiCollaborator.max} 
            onChange={setCollaborators} 
            noun={t.collabTitle}
            removeLabel={`${t.remove} ${t.collabTitle}`}
            addLabel={`${t.add} ${t.collabTitle}`}
          />
        </div>

        {/* Forfait sélection */}
        <fieldset className="border-t border-[#DED6C8]/60 pt-6">
          <legend className="text-base font-bold text-[#1C1A17]">{t.planTitle}</legend>
          <p className="mt-1 text-xs text-[#6E665A]">
            {t.planDesc}
          </p>
          
          <div role="radiogroup" aria-label={t.planTitle} className="mt-4 grid gap-3 sm:grid-cols-2">
            {(Object.keys(planInfo) as AiCapacityId[]).map((id) => {
              const selected = capacity === id
              const info = planInfo[id]
              const basePrice = unitalkPricing.aiCapacity[id].monthlyPrice + 49
              
              return (
                <label 
                  key={id} 
                  className={`relative cursor-pointer rounded-2xl border p-4 outline-none transition-all ${
                    selected 
                      ? 'border-[#D10E63] bg-[#FCEBF2]/30 shadow-sm' 
                      : 'border-[#DED6C8] bg-white hover:border-[#D10E63]/40'
                  }`}
                >
                  <span className="flex items-start gap-3">
                    <input 
                      type="radio" 
                      name="capacity" 
                      value={id} 
                      checked={selected} 
                      onChange={() => setCapacity(id)} 
                      className="mt-1.5 accent-[#D10E63]" 
                    />
                    <span className="flex-1">
                      <strong className="block text-[15px] font-bold text-[#1C1A17]">{info.name}</strong>
                      <span className="mt-0.5 block text-xs font-semibold text-[#D10E63]">{info.slogan}</span>
                      <span className="mt-3 block text-xs font-bold text-[#8A8175]">{info.tokens}</span>
                    </span>
                  </span>
                  <span className="absolute right-4 top-4 font-mono text-xs font-black text-[#1C1A17]">
                    {id === 'byok' ? `49${t.cardCurrency}` : `${basePrice}${t.cardCurrency}`}<span className="text-[10px] font-normal text-[#8A8175]">/m</span>
                  </span>
                </label>
              )
            })}
          </div>
        </fieldset>

        {/* Co-Creators counter */}
        <div className="flex flex-col justify-between gap-4 border-t border-[#DED6C8]/60 pt-6 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-base font-bold text-[#1C1A17] flex items-center gap-2">
              <Award className="h-4.5 w-4.5 text-[#D10E63]" />
              {t.cocreatorTitle}
            </h3>
            <p className="mt-1 text-xs text-[#6E665A] max-w-sm">
              {t.cocreatorDesc}
            </p>
          </div>
          <Counter 
            value={coCreators} 
            min={unitalkPricing.aiCocreator.min} 
            max={unitalkPricing.aiCocreator.max} 
            onChange={setCoCreators} 
            noun={t.cocreatorTitle}
            removeLabel={`${t.remove} ${t.cocreatorTitle}`}
            addLabel={`${t.add} ${t.cocreatorTitle}`}
          />
        </div>
      </div>

      {/* Right Column — RADICAL Estimate Card (Sombre & Ultra Premium) */}
      <aside aria-label={t.cardTitle} className="flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#17130F] p-6 text-[#F8F1E7] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.65)] sm:p-8 lg:sticky lg:top-24 lg:self-start">
        <div>
          <div className="flex items-start justify-between border-b border-white/10 pb-4">
            <div>
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#F15B9B]">{t.cardKicker}</p>
              <h2 className="mt-1 text-xl font-bold text-white">{t.cardTitle}</h2>
            </div>
            <span className="rounded-full bg-[#22C55E]/10 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-[#22C55E]">{t.cardEstimationBadge}</span>
          </div>

          <dl className="divide-y divide-white/10 py-2 text-[13px]">
            <PriceLine label={t.lineOrg} detail={t.lineOrgDetail} value={breakdown.organizationBase} currency={t.cardCurrency} />
            {breakdown.organizationDiscount > 0 && <PriceLine label={t.lineLaunchPromo} value={-breakdown.organizationDiscount} discount currency={t.cardCurrency} />}
            <PriceLine label={`${t.lineCollab} (${collaborators})`} detail={`${collaborators} × 49 €`} value={breakdown.collaboratorsBase} currency={t.cardCurrency} />
            <PriceLine label={`${t.lineForfait} ${planInfo[capacity].name}`} detail={`${collaborators} × ${unitalkPricing.aiCapacity[capacity].monthlyPrice} €`} value={breakdown.capacityBase} currency={t.cardCurrency} />
            {breakdown.capacityDiscount > 0 && <PriceLine label={t.linePromoTrial} value={-breakdown.capacityDiscount} discount currency={t.cardCurrency} />}
            {coCreators > 0 && <PriceLine label={t.lineCocreator} detail={`${coCreators} × 50 €`} value={breakdown.coCreatorsBase} currency={t.cardCurrency} />}
          </dl>
        </div>

        <div className="border-t border-white/10 pt-4">
          <div className="flex items-end justify-between gap-4 py-2">
            <dt>
              <strong className="block text-sm text-white">{t.cardAfterTrial}</strong>
              <span className="text-[10px] text-[#8F877A]">{t.cardSovereignBadge}</span>
            </dt>
            <dd aria-live="polite" className="text-3xl font-black tracking-[-0.04em] text-white">
              {breakdown.total} {t.cardCurrency}<span className="text-xs font-normal text-[#8F877A]">{t.cardPeriod}</span>
            </dd>
          </div>

          <div className="mt-4 flex items-center justify-between rounded-xl bg-white/[0.04] border border-white/5 px-4 py-3 text-xs">
            <dt>
              <strong>{t.cardToday}</strong>
              <span className="block mt-0.5 text-[10px] text-[#22C55E] font-medium">{t.cardTrialIncluded}</span>
            </dt>
            <dd className="text-lg font-black text-[#22C55E]">{t.cardTrialFree}</dd>
          </div>

          <p className="mt-3 flex items-center gap-2 text-[10px] leading-5 text-[#8F877A]"><Coins className="size-3.5 text-[#F15B9B]" />{lang === 'fr' ? 'Crédits complémentaires disponibles à la demande.' : 'Additional credits available on demand.'}</p>

          <button 
            type="button" 
            onClick={submit} 
            disabled={pending} 
            className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#D10E63] text-sm font-bold text-white outline-none transition-transform hover:-translate-y-0.5 disabled:opacity-60"
          >
            {pending ? (lang === 'fr' ? 'Préparation…' : 'Preparing...') : t.cardCta}
            <ArrowRight className="h-4 w-4" />
          </button>
          
          <p className="mt-3 text-center text-[10px] text-[#8F877A]">{t.cardNoCardNeeded}</p>

          <details className="group mt-4 border-t border-white/10 pt-3">
            <summary className="flex cursor-pointer list-none items-center justify-between text-xs font-bold text-[#AFA397] outline-none">
              <span>{t.cardAccordion}</span>
              <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
            </summary>
            <dl className="mt-3 space-y-2 text-[11px] text-[#8F877A]">
              {periods.map(([label, date]) => (
                <div key={label} className="flex justify-between gap-3">
                  <dt>{label}</dt>
                  <dd className="font-semibold text-white">{configurationTotalAt(collaborators, capacity, coCreators, date)} {t.cardCurrency}/m</dd>
                </div>
              ))}
            </dl>
          </details>
        </div>
      </aside>
    </div>
  )
}

function Counter({ value, min, max, onChange, noun, removeLabel, addLabel }: { value: number; min: number; max: number; onChange: (value: number) => void; noun: string; removeLabel: string; addLabel: string }) {
  return (
    <div className="inline-flex items-center rounded-full border border-[#DED6C8] bg-white p-1">
      <button 
        type="button" 
        aria-label={removeLabel}
        disabled={value <= min} 
        onClick={() => onChange(Math.max(min, value - 1))} 
        className="flex size-8 items-center justify-center rounded-full hover:bg-[#F3EFE6] disabled:opacity-30"
      >
        <Minus className="size-3.5" />
      </button>
      <output aria-label={`${noun} : ${value}`} aria-live="polite" className="min-w-10 text-center text-xs font-extrabold text-[#1C1A17]">{value}</output>
      <button 
        type="button" 
        aria-label={addLabel}
        disabled={value >= max} 
        onClick={() => onChange(Math.min(max, value + 1))} 
        className="flex size-8 items-center justify-center rounded-full hover:bg-[#F3EFE6] disabled:opacity-30"
      >
        <Plus className="size-3.5" />
      </button>
    </div>
  )
}

function PriceLine({ label, detail, value, discount = false, currency = '€' }: { label: string; detail?: string; value: number; discount?: boolean; currency?: string }) {
  return (
    <div className="grid grid-cols-[1fr_auto] gap-x-3 py-2 text-xs">
      <dt className={discount ? 'text-[#F15B9B]' : 'text-[#C9C0B0]'}>
        {label}
        {detail && <span className="ml-1 text-[10px] text-[#8F877A]">{detail}</span>}
      </dt>
      <dd className={`font-semibold ${discount ? 'text-[#F15B9B]' : 'text-white'}`}>
        {value < 0 ? '−' : ''}{Math.abs(value)} {currency}
      </dd>
    </div>
  )
}
