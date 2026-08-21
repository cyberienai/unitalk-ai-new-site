'use client'

import Link from 'next/link'
import { startTransition, useState } from 'react'
import { ChevronDown, Minus, Plus, ArrowRight, Coins } from 'lucide-react'
import { persistPricingDraft } from '@/app/actions/pricing'
import {
  configurationBreakdownAt,
  configurationTotalAt,
  unitalkPricing,
  type AiCapacityId,
} from '@/lib/unitalk-pricing'
import { usePricingDraft } from './pricing-draft-context'
import { useLanguage } from '@/lib/language-context'

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
      name: 'Vos propres clés',
      slogan: 'Vous payez directement vos fournisseurs',
      tokens: 'Consommation facturée par vos fournisseurs',
      desc: 'Connectez les clés API que votre entreprise utilise déjà chez OpenAI, Anthropic, Google ou un autre fournisseur compatible.',
    },
    quarterTime: {
      name: 'Usage régulier',
      slogan: 'Missions légères ou récurrentes',
      tokens: '5 millions de tokens par mois',
      desc: 'Pour les missions légères ou récurrentes : veille, mise à jour du CRM et tâches simples.',
    },
    halfTime: {
      name: 'Usage soutenu',
      slogan: 'Travail quotidien',
      tokens: '10 millions de tokens par mois',
      desc: 'Pour une activité quotidienne : traitement des emails, qualification de prospects et gestion du calendrier.',
    },
    fullTime: {
      name: 'Usage intensif',
      slogan: 'Volumes importants et processus complexes',
      tokens: '20 millions de tokens par mois',
      desc: 'Pour les processus complexes, les volumes soutenus et le travail continu dans plusieurs applications.',
    },
  },
  en: {
    byok: {
      name: 'Your own keys',
      slogan: 'You pay your providers directly',
      tokens: 'Usage billed by your providers',
      desc: 'Connect the API keys your company already uses with OpenAI, Anthropic, Google or another compatible provider.',
    },
    quarterTime: {
      name: 'Regular use',
      slogan: 'Light or recurring missions',
      tokens: '5 million tokens / month',
      desc: 'For light or recurring missions: monitoring, CRM updates and simple tasks.',
    },
    halfTime: {
      name: 'Sustained use',
      slogan: 'Daily work',
      tokens: '10 million tokens / month',
      desc: 'For daily activity: handling emails, qualifying prospects and managing the calendar.',
    },
    fullTime: {
      name: 'Intensive use',
      slogan: 'High volumes and complex processes',
      tokens: '20 million tokens / month',
      desc: 'For complex processes, sustained volumes and continuous work across multiple applications.',
    },
  }
} as const

const T = {
  fr: {
    eyebrow: 'Votre prix en trois choix',
    heading: 'Configurez votre prix',
    collabTitle: '1. Combien de Collaborateurs IA ?',
    collabDesc: 'Chaque Collaborateur coûte 49 €/mois et comprend son identité, sa mémoire, ses communications, ses applications et son serveur privé.',
    planTitle: '2. Quel volume de travail ?',
    planDesc: 'Choisissez un usage. Les volumes de tokens restent visibles pour la transparence.',
    cocreatorTitle: '3. Ajouter des Co-créateurs IA',
    cocreatorDesc: 'Personnes autorisées à créer, tester, versionner et publier des actifs Unitalk.',
    
    // Right card
    cardKicker: 'Votre total',
    cardTitle: 'Estimation mensuelle',
    cardEstimationBadge: 'Calcul en direct',
    lineOrg: 'Votre entreprise',
    lineOrgDetail: 'Administration centralisée, Alma, Workspace et Desktop',
    lineLaunchPromo: 'Offre de lancement',
    lineCollab: 'Collaborateurs IA',
    lineCollabDetail: 'Identité, mémoire, communications, applications et serveur IA',
    lineForfait: 'Capacité IA',
    lineHermes: 'Hermes open source',
    lineHermesDetail: 'Profils métier et compétences · Licence MIT',
    linePromoTrial: 'Remise de lancement sur la capacité',
    lineCocreator: 'Licence Co-créateur IA',
    
    cardPeriod: '/mois',
    cardAfterTrial: 'Total mensuel',
    cardSovereignBadge: 'Prix après l’essai et promotions applicables',
    cardToday: 'À payer aujourd’hui',
    cardTrialIncluded: 'Première mission gratuite',
    cardTrialFree: '0 €',
    cardCta: 'Démarrer ma première mission',
    cardNoCardNeeded: 'Sans carte bancaire · Aucune activation payante automatique',
    cardAccordion: 'Voir l’évolution du prix après les promotions',
    cardCurrency: '€',
    remove: 'Retirer',
    add: 'Ajouter',
    selectedProfile: 'Profil de départ',
  },
  en: {
    eyebrow: 'Your price in three choices',
    heading: 'Configure your price',
    collabTitle: '1. How many AI Collaborators?',
    collabDesc: 'Each Collaborator costs €49/month and includes identity, memory, communications, applications and a private server.',
    planTitle: '2. What workload?',
    planDesc: 'Choose a usage level. Token volumes remain visible for transparency.',
    cocreatorTitle: '3. Add AI Co-creators',
    cocreatorDesc: 'People allowed to create, test, version and publish Unitalk assets.',
    
    // Right card
    cardKicker: 'Your total',
    cardTitle: 'Monthly estimate',
    cardEstimationBadge: 'Calculated live',
    lineOrg: 'Your organization',
    lineOrgDetail: 'Central administration, Alma, Workspace and Desktop',
    lineLaunchPromo: 'Launch Offer (Alma)',
    lineCollab: 'AI Collaborators',
    lineCollabDetail: 'Identity, memory, communications, applications and AI server',
    lineForfait: 'AI Capacity',
    lineHermes: 'Open-source Hermes',
    lineHermesDetail: 'Job profiles and skills · MIT License',
    linePromoTrial: 'Launch discount on capacity',
    lineCocreator: 'AI Co-creator License',
    
    cardPeriod: '/month',
    cardAfterTrial: 'Monthly total',
    cardSovereignBadge: 'Price after trial and applicable promotions',
    cardToday: 'Due today',
    cardTrialIncluded: 'First mission free',
    cardTrialFree: '0 €',
    cardCta: 'Start my first mission',
    cardNoCardNeeded: 'No credit card · No automatic paid activation',
    cardAccordion: 'See how pricing changes after promotions',
    cardCurrency: '€',
    remove: 'Remove',
    add: 'Add',
    selectedProfile: 'Starting profile',
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
  const breakdown = configurationBreakdownAt(collaborators, capacity, coCreators, new Date())

  function submit() {
    setPending(true)
    startTransition(() => persistPricingDraft({ collaborators, capacity, coCreators }).catch(() => setPending(false)))
  }

  return (
    <div id="configurateur" className="grid overflow-hidden rounded-[2rem] border border-[#292521] bg-[#17130F] shadow-[0_40px_90px_-55px_rgba(0,0,0,.85)] lg:grid-cols-[1.08fr_0.92fr]">
      {/* Left Column — Configurator */}
      <div className="flex flex-col gap-6 bg-[#FAF8F3] p-6 sm:p-9 lg:p-10">
        <div>
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#D10E63]">{t.eyebrow}</span>
          <h2 className="mt-4 max-w-xl font-sf text-[clamp(2rem,4vw,3.8rem)] font-semibold leading-[.95] tracking-[-.055em] text-[#1C1A17]">{t.heading}</h2>
          {selectedProfile && <p className="mt-3 inline-flex rounded-full bg-[#D10E63]/10 px-3 py-1.5 text-xs font-bold text-[#B00C54]">{t.selectedProfile} : {selectedProfile}</p>}
          <Link href="/documentation" className="mt-4 block text-xs font-bold text-[#B00C54] underline-offset-4 hover:underline">Voir le détail des licences →</Link>
        </div>

        {/* Counter Collaborators */}
        <div className="flex flex-col justify-between gap-4 border-t border-[#DED6C8]/60 pt-5 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-lg font-bold tracking-[-.02em] text-[#1C1A17]">{t.collabTitle}</h3>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#6E665A]">
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
        <fieldset className="border-t border-[#DED6C8]/60 pt-5">
          <legend className="text-lg font-bold tracking-[-.02em] text-[#1C1A17]">{t.planTitle}</legend>
          <p className="mt-2 text-sm text-[#6E665A]">
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
                  className={`relative min-h-[150px] cursor-pointer rounded-2xl border p-4 outline-none transition-all ${
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
                      <strong className="block pr-14 text-[15px] font-bold text-[#1C1A17]">{info.name}</strong>
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
        <details className="group border-t border-[#DED6C8]/60 pt-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4"><span><strong className="block text-base text-[#1C1A17]">{t.cocreatorTitle}</strong><span className="mt-1 block max-w-md text-xs leading-5 text-[#6E665A]">{t.cocreatorDesc}</span></span><span className="font-mono text-xs font-black text-[#B00C54]">{coCreators}</span></summary>
          <div className="mt-4 flex justify-end"><Counter value={coCreators} min={unitalkPricing.aiCocreator.min} max={unitalkPricing.aiCocreator.max} onChange={setCoCreators} noun={t.cocreatorTitle} removeLabel={`${t.remove} ${t.cocreatorTitle}`} addLabel={`${t.add} ${t.cocreatorTitle}`} /></div>
        </details>
      </div>

      {/* Right Column — RADICAL Estimate Card (Sombre & Ultra Premium) */}
      <aside aria-label={t.cardTitle} className="relative flex min-h-full flex-col justify-between overflow-hidden border-t border-white/10 bg-[#17130F] p-6 text-[#F8F1E7] sm:p-9 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:self-start lg:overflow-y-auto lg:border-l lg:border-t-0 lg:p-10">
        <div>
          <div className="flex items-start justify-between border-b border-white/10 pb-4">
            <div>
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#F15B9B]">{t.cardKicker}</p>
              <h2 className="mt-3 text-[clamp(1.8rem,3vw,3rem)] font-semibold leading-[.95] tracking-[-.05em] text-white">{t.cardTitle}</h2>
            </div>
            <span className="rounded-full bg-[#22C55E]/10 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-[#22C55E]">{t.cardEstimationBadge}</span>
          </div>

          <dl className="mt-6 divide-y divide-white/10 border-y border-white/10 text-[13px]">
            <PriceLine label={t.lineOrg} detail={t.lineOrgDetail} value={breakdown.organizationBase} currency={t.cardCurrency} />
            {breakdown.organizationDiscount > 0 && <PriceLine label={t.lineLaunchPromo} value={-breakdown.organizationDiscount} discount currency={t.cardCurrency} />}
             <PriceLine label={`${t.lineCollab} (${collaborators})`} detail={`${t.lineCollabDetail} · ${collaborators} × 49 €`} value={breakdown.collaboratorsBase} currency={t.cardCurrency} />
             <PriceLine label={`${t.lineForfait} · ${planInfo[capacity].name}`} detail={`${collaborators} × ${unitalkPricing.aiCapacity[capacity].monthlyPrice} €`} value={breakdown.capacityBase} currency={t.cardCurrency} />
             {breakdown.capacityDiscount > 0 && <PriceLine label={t.linePromoTrial} value={-breakdown.capacityDiscount} discount currency={t.cardCurrency} />}
             <PriceLine label={t.lineHermes} detail={t.lineHermesDetail} value={0} currency={t.cardCurrency} />
            {coCreators > 0 && <PriceLine label={t.lineCocreator} detail={`${coCreators} × 50 €`} value={breakdown.coCreatorsBase} currency={t.cardCurrency} />}
          </dl>
        </div>

        <div className="border-t border-white/10 pt-4">
          <div className="flex items-end justify-between gap-4 py-2">
            <dt>
              <strong className="block text-sm text-white">{t.cardAfterTrial}</strong>
              <span className="text-[10px] text-[#8F877A]">{t.cardSovereignBadge}</span>
            </dt>
            <dd aria-live="polite" className="text-[clamp(2.8rem,5vw,5.5rem)] font-semibold leading-none tracking-[-.07em] text-white">
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
    <div className="grid grid-cols-[1fr_auto] gap-x-4 py-4 text-xs">
      <dt className={discount ? 'text-[#F15B9B]' : 'text-[#C9C0B0]'}>
        {label}
        {detail && <span className="mt-1 block max-w-xs text-[10px] leading-4 text-[#8F877A]">{detail}</span>}
      </dt>
      <dd className={`font-semibold ${discount ? 'text-[#F15B9B]' : 'text-white'}`}>
        {value < 0 ? '−' : ''}{Math.abs(value)} {currency}
      </dd>
    </div>
  )
}
