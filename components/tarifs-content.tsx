'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, useReducedMotion } from 'framer-motion'
import { Check, ArrowRight, Plus, Minus, KeyRound, Coins, Layers, ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLanguage } from '@/lib/language-context'
import { ProofPill } from '@/components/ui/proof-pill'
import {
  pricingConfig,
  tierForQuantity,
  nextTier,
  monthlySubtotal,
  annualTotal,
  annualEquivalentMonthly,
  annualSavings,
  quantitySavings,
  normalizeQuantity,
  enabledCreditPacks,
  type BillingCycle,
  type UsageMode,
} from '@/lib/pricing-config'

const ease = [0.22, 1, 0.36, 1] as const
const STORAGE_KEY = 'unitalk_pricing_selection'

function money(n: number, lang: 'fr' | 'en') {
  const isInt = Number.isInteger(n)
  const str = n.toLocaleString(lang === 'fr' ? 'fr-FR' : 'en-US', {
    minimumFractionDigits: isInt ? 0 : 2,
    maximumFractionDigits: isInt ? 0 : 2,
  })
  return lang === 'fr' ? `${str}\u00A0\u20AC` : `\u20AC${str}`
}

const T = {
  fr: {
    trial: '7 jours d’essai · Sans carte bancaire · Sans engagement',
    title1: 'Des Collaborateurs IA ',
    title2: 'à la mesure de votre entreprise.',
    subtitle:
      'Commencez avec une identité. Ajoutez-en une autre uniquement lorsqu’une identité distincte ou des ressources dédiées sont nécessaires.',
    from: 'À partir de 49 € par mois.',

    configTitle: 'Composez votre équipe.',

    billingLabel: 'Facturation',
    billingMonthly: 'Mensuelle',
    billingAnnual: 'Annuelle · 2 mois offerts',
    billingMonthlyNote: 'Facturation mensuelle · Résiliable à tout moment',
    billingAnnualNote: '2 mois offerts sur le forfait des Collaborateurs IA.',

    qtyLabel: 'Nombre de Collaborateurs IA',
    tierChipsLabel: 'Raccourcis',
    collabSingular: 'Collaborateur IA',
    collabPlural: 'Collaborateurs IA',

    includedIntro: 'Chaque Collaborateur IA inclut :',
    included: [
      'une identité propre',
      'une mémoire persistante',
      'un workspace privé',
      'des missions, compétences et applications',
      'une présence texte et voix',
      'des accès contrôlés',
      'l’accompagnement d’Alma',
    ],
    includedHighlight: 'des profils métier illimités',

    // Usage mode
    usageTitle: 'Comment souhaitez-vous régler les usages IA ?',
    usageModes: { credits: 'Crédits Unitalk', byok: 'Mes propres clés API', hybrid: 'Hybride' },
    usageChangeNote: 'Vous pourrez modifier ce choix à tout moment.',

    creditsTitle: 'Crédits Unitalk prépayés',
    creditsBody: 'Des crédits partagés entre tous les Collaborateurs IA de votre entreprise.',
    creditsList: [
      'mise en route immédiate',
      'plusieurs modèles depuis une même interface',
      'budget défini à l’avance',
      'consommation suivie dans le workspace',
      'recharge manuelle ou automatique',
    ],

    byokTitle: 'Vos propres clés API',
    byokBody:
      'Utilisez les comptes modèles déjà souscrits par votre entreprise. Vous serez facturé directement par vos fournisseurs.',
    byokList: [
      'aucun crédit Unitalk consommé pour les appels concernés',
      'mêmes missions, mémoire, compétences et validations',
      'changement de modèle sans recréer le Collaborateur IA',
      'configuration sécurisée après la création du workspace',
    ],

    hybridTitle: 'Mode hybride',
    hybridBody:
      'Utilisez vos clés pour vos modèles habituels et des crédits Unitalk pour la voix, la téléphonie, les modèles ponctuels ou la continuité de service.',

    noPacks: 'Aucun pack pour le moment.',
    packsSelectLabel: 'Packs de crédits',

    compareToggle: 'Comparer les modes de consommation',
    tableCols: ['', 'Crédits Unitalk', 'Vos clés API'],
    tableRows: [
      ['Mise en route', 'Immédiate', 'Connexion nécessaire'],
      ['Modèles disponibles', 'Catalogue Unitalk', 'Vos fournisseurs'],
      ['Facturation', 'Prépayée chez Unitalk', 'Directe chez le fournisseur'],
      ['Budget plafonné', 'Oui', 'Selon le fournisseur'],
      ['Partage dans l’entreprise', 'Oui', 'Selon vos comptes'],
      ['Voix et téléphonie', 'Via crédits', 'Selon intégration'],
      ['Utilisation hybride', 'Oui', 'Oui'],
    ],

    // Recap
    recapPlanMonthly: 'Forfait',
    recapPlanAnnual: 'Forfait annuel',
    unitLabel: 'Prix par Collaborateur IA',
    unitSuffix: 'chacun / mois',
    qtySavingsLabel: 'Économie liée au nombre',
    nextTierLabel: 'Prochain palier',
    nextTierMid: 'Collaborateurs',
    nextTierSuffix: 'chacun',
    monthlyTotalLabel: 'Total mensuel',
    activationLabel: 'À régler à l’activation',
    afterTrial: 'après les 7 jours d’essai',
    annualTwoMonths: 'Deux mois offerts',
    annualTotalLabel: 'Total du forfait annuel',
    annualBilledSuffix: 'facturés annuellement',
    annualEquivLabel: 'Équivalent mensuel',
    annualSavingsLabel: 'Économie annuelle',
    annualSavingsSuffix: 'par an',
    creditsExtraNote: 'Les crédits et usages variables ne sont pas concernés par la remise annuelle.',

    ctaSingular: 'Créer mon Collaborateur IA',
    ctaPluralA: 'Créer mes ',
    ctaPluralB: ' Collaborateurs IA',
    ctaProof: '7 jours d’essai · Sans carte bancaire · Sans engagement',

    // Identity section
    identityEyebrow: 'Ce qui est réellement facturé',
    identityTitle: 'Une identité peut exercer plusieurs métiers.',
    identityBody1:
      'Votre Collaborateur IA peut intervenir comme commercial, recruteur, analyste ou responsable support sans devenir quatre agents différents.',
    identityBody2:
      'Vous ajoutez autant de profils métier que ses missions l’exigent. Ils sont illimités et n’augmentent pas le prix du forfait.',
    identityRule:
      'Vous ajoutez un nouveau Collaborateur IA uniquement lorsqu’une identité distincte ou des ressources dédiées sont nécessaires.',
    identityRule2:
      'Dans les autres cas, Alma fait progresser le Collaborateur existant avec les profils métier, les compétences, les applications et les droits adaptés à ses nouvelles missions.',

    faqTitle: 'Questions fréquentes',
    faq: [
      {
        q: 'Que comprend le forfait à 49 € ?',
        a: 'L’environnement complet d’un Collaborateur IA : identité, mémoire persistante, profils métier illimités, workspace privé, missions, compétences, applications, présence texte et voix, accès contrôlés et accompagnement d’Alma. Les usages IA variables (modèles, voix, téléphonie) sont réglés séparément, en crédits ou avec vos propres clés.',
      },
      {
        q: 'Pourquoi ajouter un autre Collaborateur IA si les profils métier sont illimités ?',
        a: 'Chaque Collaborateur IA peut exercer plusieurs métiers grâce à ses profils métier illimités. Vous en ajoutez un nouveau uniquement lorsqu’une identité distincte ou des ressources dédiées sont nécessaires.',
      },
      {
        q: 'Comment fonctionne la remise par quantité ?',
        a: 'Le prix mensuel par Collaborateur IA diminue selon leur nombre. Le total est calculé en multipliant le nombre de Collaborateurs par le prix unitaire du palier correspondant, et le configurateur affiche l’économie obtenue ainsi que le prochain palier.',
      },
      {
        q: 'Comment fonctionne la facturation annuelle ?',
        a: 'En facturation annuelle, deux mois sont offerts sur le forfait des Collaborateurs IA : vous réglez dix mois pour douze. Le configurateur affiche le montant réellement facturé sur l’année, l’équivalent mensuel et l’économie. La remise annuelle porte uniquement sur le forfait, pas sur les crédits ni les usages variables.',
      },
      {
        q: 'Puis-je utiliser mes propres clés API ?',
        a: 'Oui. Vous utilisez les comptes modèles déjà souscrits par votre entreprise et vous êtes facturé directement par vos fournisseurs. Les missions, la mémoire, les compétences et les validations restent identiques. La connexion des clés se fait de façon sécurisée après la création du workspace.',
      },
      {
        q: 'Puis-je combiner mes clés et des crédits Unitalk ?',
        a: 'Oui, en mode hybride : vos clés pour vos modèles habituels et des crédits Unitalk pour la voix, la téléphonie, les modèles ponctuels ou la continuité de service.',
      },
    ],

    partnerPre: 'Vous déployez Unitalk chez vos clients ?',
    partnerLink: 'Découvrir Partner',
    platformPre: 'Vous construisez votre propre produit ?',
    platformLink: 'Découvrir Platform',
  },
  en: {
    trial: '7-day trial · No credit card · No commitment',
    title1: 'AI Collaborators ',
    title2: 'sized for your company.',
    subtitle:
      'Start with one identity. Add another only when a distinct identity or dedicated resources are required.',
    from: 'From €49 per month.',

    configTitle: 'Build your team.',

    billingLabel: 'Billing',
    billingMonthly: 'Monthly',
    billingAnnual: 'Annual · 2 months free',
    billingMonthlyNote: 'Monthly billing · Cancel anytime',
    billingAnnualNote: '2 months free on the AI Collaborators plan.',

    qtyLabel: 'Number of AI Collaborators',
    tierChipsLabel: 'Shortcuts',
    collabSingular: 'AI Collaborator',
    collabPlural: 'AI Collaborators',

    includedIntro: 'Each AI Collaborator includes:',
    included: [
      'its own identity',
      'persistent memory',
      'a private workspace',
      'missions, skills and applications',
      'text and voice presence',
      'controlled access',
      'guidance from Alma',
    ],
    includedHighlight: 'unlimited job profiles',

    usageTitle: 'How would you like to pay for AI usage?',
    usageModes: { credits: 'Unitalk credits', byok: 'My own API keys', hybrid: 'Hybrid' },
    usageChangeNote: 'You can change this choice at any time.',

    creditsTitle: 'Prepaid Unitalk credits',
    creditsBody: 'Credits shared across all the AI Collaborators in your company.',
    creditsList: [
      'immediate setup',
      'several models from one interface',
      'budget defined in advance',
      'usage tracked in the workspace',
      'manual or automatic top-up',
    ],

    byokTitle: 'Your own API keys',
    byokBody:
      'Use the model accounts your company already subscribes to. You are billed directly by your providers.',
    byokList: [
      'no Unitalk credits consumed for those calls',
      'same missions, memory, skills and validations',
      'switch models without recreating the AI Collaborator',
      'secure configuration after the workspace is created',
    ],

    hybridTitle: 'Hybrid mode',
    hybridBody:
      'Use your keys for your usual models and Unitalk credits for voice, telephony, occasional models or service continuity.',

    noPacks: 'No pack available yet.',
    packsSelectLabel: 'Credit packs',

    compareToggle: 'Compare consumption modes',
    tableCols: ['', 'Unitalk credits', 'Your API keys'],
    tableRows: [
      ['Setup', 'Immediate', 'Connection required'],
      ['Available models', 'Unitalk catalog', 'Your providers'],
      ['Billing', 'Prepaid with Unitalk', 'Direct with the provider'],
      ['Capped budget', 'Yes', 'Depends on provider'],
      ['Company-wide sharing', 'Yes', 'Depends on your accounts'],
      ['Voice and telephony', 'Via credits', 'Depends on integration'],
      ['Hybrid usage', 'Yes', 'Yes'],
    ],

    recapPlanMonthly: 'Plan',
    recapPlanAnnual: 'Annual plan',
    unitLabel: 'Price per AI Collaborator',
    unitSuffix: 'each / month',
    qtySavingsLabel: 'Quantity savings',
    nextTierLabel: 'Next tier',
    nextTierMid: 'Collaborators',
    nextTierSuffix: 'each',
    monthlyTotalLabel: 'Monthly total',
    activationLabel: 'Due at activation',
    afterTrial: 'after the 7-day trial',
    annualTwoMonths: 'Two months free',
    annualTotalLabel: 'Annual plan total',
    annualBilledSuffix: 'billed annually',
    annualEquivLabel: 'Monthly equivalent',
    annualSavingsLabel: 'Annual savings',
    annualSavingsSuffix: 'per year',
    creditsExtraNote: 'Credits and variable usage are not covered by the annual discount.',

    ctaSingular: 'Create my AI Collaborator',
    ctaPluralA: 'Create my ',
    ctaPluralB: ' AI Collaborators',
    ctaProof: '7-day trial · No credit card · No commitment',

    identityEyebrow: 'What is actually billed',
    identityTitle: 'One identity can hold several roles.',
    identityBody1:
      'Your AI Collaborator can act as a salesperson, recruiter, analyst or support lead without becoming four different agents.',
    identityBody2:
      'You add as many job profiles as its missions require. They are unlimited and do not increase the plan price.',
    identityRule:
      'You add a new AI Collaborator only when a distinct identity or dedicated resources are required.',
    identityRule2:
      'Otherwise, Alma grows the existing Collaborator with the job profiles, skills, applications and rights suited to its new missions.',

    faqTitle: 'Frequently asked questions',
    faq: [
      {
        q: 'What does the €49 plan include?',
        a: 'The full environment of an AI Collaborator: identity, persistent memory, unlimited job profiles, private workspace, missions, skills, applications, text and voice presence, controlled access and Alma’s guidance. Variable AI usage (models, voice, telephony) is paid separately, with credits or your own keys.',
      },
      {
        q: 'Why add another AI Collaborator if job profiles are unlimited?',
        a: 'Each AI Collaborator can hold several roles thanks to its unlimited job profiles. You add a new one only when a distinct identity or dedicated resources are required.',
      },
      {
        q: 'How does the quantity discount work?',
        a: 'The monthly price per AI Collaborator decreases with their number. The total is the number of Collaborators times the unit price of the matching tier, and the configurator shows the savings and the next tier.',
      },
      {
        q: 'How does annual billing work?',
        a: 'On annual billing, two months are free on the AI Collaborators plan: you pay ten months for twelve. The configurator shows the amount actually billed for the year, the monthly equivalent and the savings. The annual discount applies only to the plan, not to credits or variable usage.',
      },
      {
        q: 'Can I use my own API keys?',
        a: 'Yes. You use the model accounts your company already subscribes to and are billed directly by your providers. Missions, memory, skills and validations stay the same. Keys are connected securely after the workspace is created.',
      },
      {
        q: 'Can I combine my keys and Unitalk credits?',
        a: 'Yes, in hybrid mode: your keys for your usual models and Unitalk credits for voice, telephony, occasional models or service continuity.',
      },
    ],

    partnerPre: 'Deploying Unitalk for your clients?',
    partnerLink: 'Discover Partner',
    platformPre: 'Building your own product?',
    platformLink: 'Discover Platform',
  },
}

/* ------------------------------------------------------------------ */
/* Configurator                                                        */
/* ------------------------------------------------------------------ */

function Configurator({ lang }: { lang: 'fr' | 'en' }) {
  const t = T[lang]
  const router = useRouter()
  const reduceMotion = useReducedMotion()

  const [qty, setQty] = useState(1)
  const [billing, setBilling] = useState<BillingCycle>('monthly')
  const [usageMode, setUsageMode] = useState<UsageMode | null>(null)
  const [creditPackId, setCreditPackId] = useState<string | null>(null)
  const [compareOpen, setCompareOpen] = useState(false)

  // Restore a previous selection when returning to the page.
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY)
      if (!raw) return
      const s = JSON.parse(raw)
      if (typeof s.quantity === 'number') setQty(normalizeQuantity(s.quantity))
      if (s.billingCycle === 'monthly' || s.billingCycle === 'annual') setBilling(s.billingCycle)
      if (s.usageMode === 'credits' || s.usageMode === 'byok' || s.usageMode === 'hybrid') setUsageMode(s.usageMode)
      if (typeof s.creditPackId === 'string') setCreditPackId(s.creditPackId)
    } catch {
      /* ignore malformed storage */
    }
  }, [])

  const tier = tierForQuantity(qty)
  const next = nextTier(qty)
  const monthly = monthlySubtotal(qty)
  const qtySave = quantitySavings(qty)
  const annual = annualTotal(qty)
  const annualEquiv = annualEquivalentMonthly(qty)
  const annualSave = annualSavings(qty)
  const packs = enabledCreditPacks()

  const collabWord = qty > 1 ? t.collabPlural : t.collabSingular
  const ctaLabel = qty > 1 ? `${t.ctaPluralA}${qty}${t.ctaPluralB}` : t.ctaSingular

  const chips = pricingConfig.quantityTiers.map((tr) => ({
    label: tr.label,
    target: tr.min,
    active: qty >= tr.min && (tr.max === undefined || qty <= tr.max),
  }))

  function handleCreate() {
    const selection = {
      quantity: qty,
      billingCycle: billing,
      quantityTier: tier.label,
      usageMode: usageMode ?? 'credits',
      creditPackId: creditPackId ?? null,
    }
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(selection))
    } catch {
      /* ignore */
    }
    const params = new URLSearchParams({
      quantity: String(selection.quantity),
      billingCycle: selection.billingCycle,
      quantityTier: selection.quantityTier,
      usageMode: selection.usageMode,
    })
    if (selection.creditPackId) params.set('creditPackId', selection.creditPackId)
    router.push(`/decouvrir?${params.toString()}`)
  }

  const priceTransition = reduceMotion ? { duration: 0 } : { duration: 0.3, ease }

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease }}
      className="premium-shadow overflow-hidden rounded-[2rem] border border-[#D8D0C2] bg-[#FBF9F3]"
    >
      <div className="p-7 sm:p-9">
        <h2 className="font-sf text-2xl font-bold tracking-[-0.025em] text-[#1C1A17] sm:text-3xl">{t.configTitle}</h2>
      </div>

      <div className="grid border-t border-[#E4DCCF] lg:grid-cols-[1fr_1.02fr]">
        {/* Left — steps 1 to 2 */}
        <div className="border-b border-[#E4DCCF] p-7 sm:p-9 lg:border-b-0 lg:border-r">
          {/* Step 1 — billing */}
          <fieldset>
            <legend className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6B6560]">
              {t.billingLabel}
            </legend>
            <div
              role="radiogroup"
              aria-label={t.billingLabel}
              className="mt-3 inline-flex w-full rounded-full border border-[#D8D0C2] bg-[#F3EFE6] p-1"
            >
              {(['monthly', 'annual'] as BillingCycle[]).map((cycle) => {
                const selected = billing === cycle
                return (
                  <button
                    key={cycle}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setBilling(cycle)}
                    className={`flex-1 rounded-full px-4 py-2 text-[13px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 ${
                      selected ? 'bg-[#1C1A17] text-[#FBF9F3]' : 'text-[#4E483F] hover:text-[#1C1A17]'
                    }`}
                  >
                    {cycle === 'monthly' ? t.billingMonthly : t.billingAnnual}
                  </button>
                )
              })}
            </div>
            <p className="mt-3 text-[12.5px] leading-relaxed text-[#6B6560]">
              {billing === 'monthly' ? t.billingMonthlyNote : t.billingAnnualNote}
            </p>
          </fieldset>

          {/* Step 2 — quantity */}
          <div className="mt-8">
            <label className="block font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6B6560]">
              {t.qtyLabel}
            </label>
            <div className="mt-3 flex items-center gap-4">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label={lang === 'fr' ? 'Retirer un Collaborateur IA' : 'Remove one AI Collaborator'}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#1C1A17] text-[#1C1A17] transition-colors hover:bg-[#1C1A17] hover:text-[#FBF9F3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 disabled:opacity-30"
                disabled={qty <= 1}
              >
                <Minus className="h-5 w-5" aria-hidden="true" />
              </button>
              <span className="min-w-[3.25rem] text-center font-sf text-4xl font-bold tabular-nums text-[#1C1A17]">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => setQty((q) => Math.min(99, q + 1))}
                aria-label={lang === 'fr' ? 'Ajouter un Collaborateur IA' : 'Add one AI Collaborator'}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#1C1A17] text-[#1C1A17] transition-colors hover:bg-[#1C1A17] hover:text-[#FBF9F3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2"
              >
                <Plus className="h-5 w-5" aria-hidden="true" />
              </button>
              <span className="ml-1 text-[14px] font-medium text-[#4E483F]">
                {qty} {collabWord}
              </span>
            </div>

            <div className="mt-5">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8A8175]">
                {t.tierChipsLabel}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {chips.map((c) => (
                  <button
                    key={c.label}
                    type="button"
                    onClick={() => setQty(c.target)}
                    className={`rounded-full px-3.5 py-1.5 font-mono text-[12px] font-semibold tabular-nums transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 ${
                      c.active ? 'bg-[#1C1A17] text-[#FBF9F3]' : 'border border-[#D8D0C2] text-[#4E483F] hover:border-[#1C1A17]'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2b — included */}
            <div className="mt-8">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6B6560]">
                {t.includedIntro}
              </p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                <li className="flex items-start gap-2 sm:col-span-2">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#D10E63]" strokeWidth={2.5} aria-hidden="true" />
                  <span className="rounded-md bg-[#F7E3EC] px-1.5 py-0.5 text-[13.5px] font-bold text-[#B00C54]">
                    {t.includedHighlight}
                  </span>
                </li>
                {t.included.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[13.5px] leading-snug text-[#3F3A33]">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#D10E63]" strokeWidth={2.5} aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right — live recap + CTA */}
        <div className="flex flex-col p-7 sm:p-9">
          <motion.div key={`${billing}-${monthly}`} initial={reduceMotion ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={priceTransition} aria-live="polite">
            {billing === 'monthly' ? (
              <>
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6B6560]">
                  {t.monthlyTotalLabel}
                </p>
                <p className="mt-1 font-sf text-5xl font-bold tracking-[-0.04em] text-[#1C1A17]">{money(monthly, lang)}</p>
                <p className="mt-1 text-sm text-[#6B6560]">{lang === 'fr' ? '/ mois' : '/ month'}</p>
              </>
            ) : (
              <>
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6B6560]">
                  {t.annualTotalLabel}
                </p>
                <p className="mt-1 font-sf text-5xl font-bold tracking-[-0.04em] text-[#1C1A17]">{money(annual, lang)}</p>
                <p className="mt-1 text-sm text-[#6B6560]">{t.annualBilledSuffix}</p>
              </>
            )}
          </motion.div>

          <dl className="mt-6 grid gap-3 border-t border-[#E4DCCF] pt-6 text-[14px]">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-[#6B6560]">
                {billing === 'monthly' ? t.recapPlanMonthly : t.recapPlanAnnual} · {qty} {collabWord}
              </dt>
              <dd className="font-semibold text-[#1C1A17]">
                {money(tier.monthlyUnitPrice, lang)} <span className="font-normal text-[#8A8175]">{t.unitSuffix}</span>
              </dd>
            </div>

            {billing === 'monthly' ? (
              <>
                {qtySave > 0 && (
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-[#6B6560]">{t.qtySavingsLabel}</dt>
                    <dd className="font-semibold text-[#B00C54]">
                      {money(qtySave, lang)} <span className="font-normal">{lang === 'fr' ? '/ mois' : '/ month'}</span>
                    </dd>
                  </div>
                )}
                {next && (
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-[#6B6560]">{t.nextTierLabel}</dt>
                    <dd className="text-right font-semibold text-[#1C1A17]">
                      {next.min} {t.nextTierMid} · {money(next.monthlyUnitPrice, lang)} {t.nextTierSuffix}
                    </dd>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-[#6B6560]">{t.annualEquivLabel}</dt>
                  <dd className="font-semibold text-[#1C1A17]">{money(annualEquiv, lang)}{lang === 'fr' ? ' / mois' : ' / month'}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-[#6B6560]">{t.annualTwoMonths}</dt>
                  <dd className="font-semibold text-[#B00C54]">
                    {money(annualSave, lang)} <span className="font-normal">{t.annualSavingsSuffix}</span>
                  </dd>
                </div>
              </>
            )}
          </dl>

          {billing === 'monthly' ? (
            <p className="mt-4 text-[12.5px] text-[#8A8175]">
              {t.activationLabel} · {t.afterTrial}
            </p>
          ) : (
            <p className="mt-4 text-[12.5px] text-[#8A8175]">{t.creditsExtraNote}</p>
          )}

          <button
            type="button"
            onClick={handleCreate}
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#D10E63] px-6 text-sm font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2"
          >
            {ctaLabel}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
          <p className="mt-3 text-center font-mono text-[11px] uppercase tracking-[0.12em] text-[#8A8175]">{t.ctaProof}</p>
        </div>
      </div>

      {/* Step 3 — usage mode (full width) */}
      <div className="border-t border-[#E4DCCF] p-7 sm:p-9">
        <h3 className="font-sf text-lg font-bold tracking-[-0.02em] text-[#1C1A17]">{t.usageTitle}</h3>
        <div role="radiogroup" aria-label={t.usageTitle} className="mt-4 grid gap-2 sm:grid-cols-3">
          {(['credits', 'byok', 'hybrid'] as UsageMode[]).map((mode) => {
            const selected = usageMode === mode
            const icon = mode === 'credits' ? <Coins className="h-4 w-4" aria-hidden="true" /> : mode === 'byok' ? <KeyRound className="h-4 w-4" aria-hidden="true" /> : <Layers className="h-4 w-4" aria-hidden="true" />
            return (
              <button
                key={mode}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => {
                  setUsageMode(mode)
                  setCreditPackId(null)
                }}
                className={`flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-[13.5px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 ${
                  selected ? 'border-[#D10E63] bg-[#FBEAF1] text-[#B00C54]' : 'border-[#D8D0C2] bg-[#FBF9F3] text-[#4E483F] hover:border-[#1C1A17]'
                }`}
              >
                {icon}
                {t.usageModes[mode]}
              </button>
            )
          })}
        </div>
        <p className="mt-3 text-[12.5px] text-[#8A8175]">{t.usageChangeNote}</p>

        {usageMode && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.3, ease }}
            className="overflow-hidden"
          >
            <div className="mt-5 rounded-2xl border border-[#E4DCCF] bg-[#F7F3EA] p-6">
              {usageMode === 'credits' && (
                <>
                  <h4 className="font-sf text-[15px] font-bold text-[#1C1A17]">{t.creditsTitle}</h4>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-[#4E483F]">{t.creditsBody}</p>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {t.creditsList.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-[13px] leading-snug text-[#3F3A33]">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#D10E63]" strokeWidth={2.5} aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <CreditPacks lang={lang} selected={creditPackId} onSelect={setCreditPackId} />
                </>
              )}
              {usageMode === 'byok' && (
                <>
                  <h4 className="font-sf text-[15px] font-bold text-[#1C1A17]">{t.byokTitle}</h4>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-[#4E483F]">{t.byokBody}</p>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {t.byokList.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-[13px] leading-snug text-[#3F3A33]">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#D10E63]" strokeWidth={2.5} aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {usageMode === 'hybrid' && (
                <>
                  <h4 className="font-sf text-[15px] font-bold text-[#1C1A17]">{t.hybridTitle}</h4>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-[#4E483F]">{t.hybridBody}</p>
                  <CreditPacks lang={lang} selected={creditPackId} onSelect={setCreditPackId} />
                </>
              )}
            </div>
          </motion.div>
        )}

        {/* Secondary comparison accordion (collapsed by default, no CTA) */}
        <div className="mt-5 rounded-2xl border border-[#E4DCCF]">
          <button
            type="button"
            onClick={() => setCompareOpen((v) => !v)}
            aria-expanded={compareOpen}
            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2"
          >
            <span className="font-sf text-[14.5px] font-semibold text-[#1C1A17]">{t.compareToggle}</span>
            <ChevronDown className={`h-4 w-4 shrink-0 text-[#8A8175] transition-transform ${compareOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
          </button>
          {compareOpen && (
            <div className="overflow-x-auto border-t border-[#E4DCCF] px-1 pb-1">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-[#E4DCCF]">
                    {t.tableCols.map((c, i) => (
                      <th
                        key={i}
                        className={`px-4 py-3 font-mono text-[10.5px] font-semibold uppercase tracking-[0.1em] sm:px-5 ${
                          i === 1 ? 'text-[#D10E63]' : i === 2 ? 'text-[#1C1A17]' : 'text-[#8A8175]'
                        }`}
                      >
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {t.tableRows.map((row, r) => (
                    <tr key={r} className={r % 2 === 1 ? 'bg-[#F7F3EA]' : ''}>
                      <th scope="row" className="px-4 py-3 text-[13px] font-medium text-[#4E483F] sm:px-5">
                        {row[0]}
                      </th>
                      <td className="px-4 py-3 text-[13px] font-semibold text-[#1C1A17] sm:px-5">{row[1]}</td>
                      <td className="px-4 py-3 text-[13px] text-[#4E483F] sm:px-5">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function CreditPacks({
  lang,
  selected,
  onSelect,
}: {
  lang: 'fr' | 'en'
  selected: string | null
  onSelect: (id: string | null) => void
}) {
  const t = T[lang]
  const packs = enabledCreditPacks()
  return (
    <div className="mt-5 border-t border-[#E4DCCF] pt-5">
      <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#8A8175]">
        {t.packsSelectLabel}
      </p>
      {packs.length === 0 ? (
        <p className="mt-2 text-[13.5px] text-[#6B6560]">{t.noPacks}</p>
      ) : (
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {packs.map((p) => {
            const isSel = selected === p.id
            return (
              <button
                key={p.id}
                type="button"
                aria-pressed={isSel}
                onClick={() => onSelect(isSel ? null : p.id)}
                className={`flex flex-col rounded-2xl border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 ${
                  isSel ? 'border-[#D10E63] bg-[#FBEAF1]' : 'border-[#D8D0C2] bg-[#FBF9F3] hover:border-[#1C1A17]'
                }`}
              >
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[#8A8175]">{p.name}</span>
                <span className="mt-2 font-sf text-xl font-bold tracking-[-0.02em] text-[#1C1A17]">{money(p.price, lang)}</span>
                <span className="mt-1 text-[12px] text-[#6B6560]">
                  {p.credits.toLocaleString(lang === 'fr' ? 'fr-FR' : 'en-US')} {lang === 'fr' ? 'crédits' : 'credits'}
                </span>
                <span className="mt-2 text-[12.5px] leading-snug text-[#4E483F]">{p.description}</span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  const reduceMotion = useReducedMotion()
  return (
    <div className="border-b border-[#E4DCCF]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2"
      >
        <span className="font-sf text-[16px] font-semibold text-[#1C1A17] sm:text-[17px]">{q}</span>
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#D8D0C2] text-[#D10E63]">
          {open ? <Minus className="h-4 w-4" aria-hidden="true" /> : <Plus className="h-4 w-4" aria-hidden="true" />}
        </span>
      </button>
      {open && (
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.28, ease }}
          className="overflow-hidden pb-5 pr-10 text-[14.5px] leading-relaxed text-[#5F594F]"
        >
          {a}
        </motion.p>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function TarifsContent() {
  const { lang } = useLanguage()
  const t = T[lang]

  return (
    <main className="w-full bg-[#F3EFE6]">
      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-grid pt-28 pb-12 sm:pt-32 sm:pb-16">
        <div className="mx-auto w-full max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <ProofPill>{t.trial}</ProofPill>
          </div>
          <h1
            className="mt-5 text-balance font-sf text-4xl font-bold leading-[1.05] text-[#1C1A17] sm:text-5xl md:text-6xl"
            style={{ letterSpacing: '-0.03em' }}
          >
            {t.title1}
            <span className="text-[#D10E63]">{t.title2}</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#4E483F] sm:text-lg">{t.subtitle}</p>
          <p className="mt-6 font-sf text-lg font-bold text-[#1C1A17]">{t.from}</p>
        </div>
      </section>

      {/* Configurateur unique */}
      <section className="mx-auto w-full max-w-5xl px-4 pb-16 sm:px-6 lg:px-8 sm:pb-20">
        <Configurator lang={lang} />
      </section>

      {/* Profils métier */}
      <section className="mx-auto w-full max-w-4xl px-4 pb-16 sm:px-6 sm:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease }}
          className="rounded-[2rem] border border-[#D8D0C2] bg-[#FBF9F3] p-8 sm:p-12"
        >
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D10E63]">{t.identityEyebrow}</p>
          <h2 className="mt-3 max-w-2xl text-balance font-sf text-2xl font-bold tracking-[-0.025em] text-[#1C1A17] sm:text-3xl">
            {t.identityTitle}
          </h2>
          <p className="mt-5 max-w-2xl text-pretty text-[15px] leading-relaxed text-[#4E483F]">{t.identityBody1}</p>
          <p className="mt-3 max-w-2xl text-pretty text-[15px] leading-relaxed text-[#4E483F]">{t.identityBody2}</p>

          <div className="mt-7 rounded-2xl bg-[#F3EFE6] p-6">
            <p className="text-pretty text-[15px] font-semibold leading-relaxed text-[#1C1A17]">{t.identityRule}</p>
            <p className="mt-3 text-pretty text-[14px] leading-relaxed text-[#4E483F]">{t.identityRule2}</p>
          </div>
        </motion.div>
      </section>

      {/* FAQ */}
      <section className="mx-auto w-full max-w-3xl px-4 pb-14 sm:px-6 sm:pb-16">
        <h2 className="text-balance text-center font-sf text-2xl font-bold tracking-[-0.025em] text-[#1C1A17] sm:text-3xl">
          {t.faqTitle}
        </h2>
        <div className="mt-8 border-t border-[#E4DCCF]">
          {t.faq.map((item) => (
            <FaqItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </section>

      {/* Liens éditoriaux Partner / Platform */}
      <section className="mx-auto w-full max-w-3xl px-4 pb-20 sm:px-6 sm:pb-28">
        <div className="flex flex-col gap-3 border-t border-[#E4DCCF] pt-8 text-[14.5px] text-[#5F594F]">
          <p>
            {t.partnerPre}{' '}
            <Link href="/partenaires/deployer" className="font-semibold text-[#B00C54] underline underline-offset-4 hover:text-[#D10E63]">
              {t.partnerLink}
            </Link>
          </p>
          <p>
            {t.platformPre}{' '}
            <Link href="/platform" className="font-semibold text-[#B00C54] underline underline-offset-4 hover:text-[#D10E63]">
              {t.platformLink}
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}
