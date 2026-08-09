'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, ArrowRight, Plus, Minus, KeyRound, Coins } from 'lucide-react'
import { useState } from 'react'
import { useLanguage } from '@/lib/language-context'
import { ProofPill } from '@/components/ui/proof-pill'

const ease = [0.22, 1, 0.36, 1] as const

// Indicative degressive tiers — placeholder values to confirm before launch.
type Tier = { min: number; max: number; price: number }
const TIERS: Tier[] = [
  { min: 1, max: 1, price: 49 },
  { min: 2, max: 4, price: 45 },
  { min: 5, max: 9, price: 39 },
  { min: 10, max: Infinity, price: 35 },
]

function tierFor(qty: number): Tier {
  return TIERS.find((tr) => qty >= tr.min && qty <= tr.max) ?? TIERS[TIERS.length - 1]
}
function nextTier(qty: number): Tier | null {
  const current = tierFor(qty)
  const idx = TIERS.indexOf(current)
  return idx < TIERS.length - 1 ? TIERS[idx + 1] : null
}
function money(n: number, lang: 'fr' | 'en') {
  return lang === 'fr' ? `${n} €` : `€${n}`
}

const T = {
  fr: {
    trial: '7 jours d’essai · Sans carte bancaire · Sans engagement',
    title1: 'Des Collaborateurs IA ',
    title2: 'à la mesure de votre entreprise.',
    subtitle:
      'Commencez avec une identité. Ajoutez-en lorsque de nouvelles responsabilités exigent une mémoire, des accès et un historique distincts.',
    from: 'À partir de 49 € par mois.',

    configEyebrow: 'Configurateur',
    configTitle: 'Composez votre équipe.',
    qtyLabel: 'Nombre de Collaborateurs IA',
    tierChipsLabel: 'Paliers',
    includedIntro: 'Chaque Collaborateur IA inclut :',
    included: [
      'une identité propre',
      'une mémoire persistante',
      'des profils métier illimités',
      'un workspace privé',
      'des missions, compétences et applications',
      'une présence texte et voix',
      'des accès contrôlés',
      'l’accompagnement d’Alma',
    ],
    totalLabel: 'Total mensuel',
    perCollabLabel: 'Par Collaborateur IA',
    perCollabSuffix: 'chacun / mois',
    savingsLabel: 'Vous économisez',
    savingsSuffix: '/ mois',
    nextTierLabel: 'Prochain palier',
    nextTierMid: 'Collaborateurs',
    nextTierSuffix: 'chacun',
    tiersNote: 'Paliers dégressifs indicatifs — à confirmer.',
    configCta: 'Créer mon Collaborateur IA',

    identityEyebrow: 'Ce qui est réellement facturé',
    identityTitle: 'Une identité peut exercer plusieurs métiers.',
    identityBody1:
      'Votre Collaborateur IA peut intervenir comme commercial, recruteur, analyste ou responsable support sans devenir quatre agents différents.',
    identityBody2:
      'Vous ajoutez autant de profils métier que ses missions l’exigent. Ils sont illimités et n’augmentent pas le prix du forfait.',
    identityListIntro: 'Vous ajoutez un nouveau Collaborateur IA uniquement lorsqu’une responsabilité nécessite :',
    identityList: [
      'une identité distincte',
      'une mémoire propre',
      'des accès différents',
      'un historique séparé',
      'une présence publique dédiée',
    ],

    consumEyebrow: 'Consommation IA',
    consumTitle: 'Le forfait crée son environnement. Vous choisissez comment financer ses usages.',
    consumBody:
      'Les modèles IA, la voix, la téléphonie et certaines ressources d’exécution sont variables. Deux modes sont proposés.',

    creditsCardTitle: 'Crédits Unitalk prépayés',
    creditsCardBody: 'Achetez des crédits partagés par toute votre entreprise.',
    creditsList: [
      'aucun abonnement à un modèle par utilisateur',
      'accès à plusieurs modèles depuis une même interface',
      'choix du modèle adapté à chaque tâche',
      'budget plafonné à l’avance',
      'suivi de la consommation dans le workspace',
      'recharge manuelle ou automatique',
    ],
    creditsCta: 'Acheter des crédits',

    byokCardTitle: 'Vos propres clés API',
    byokCardBody: 'Connectez les comptes modèles déjà utilisés par votre entreprise.',
    byokList: [
      'OpenAI, Anthropic, Google, Mistral et autres fournisseurs compatibles',
      'facturation directe par le fournisseur',
      'aucun crédit Unitalk consommé pour les appels concernés',
      'mêmes missions, mémoire, compétences et validations',
      'changement de modèle sans recréer le Collaborateur IA',
    ],
    byokCta: 'Connecter mes clés API',

    coexistTitle: 'Les deux peuvent coexister.',
    coexistBody:
      'Votre entreprise peut utiliser ses propres clés pour certains modèles et conserver des crédits Unitalk pour la voix, la téléphonie, un modèle ponctuel ou une solution de secours.',
    coexistTag: 'Prépayé, BYOK ou hybride.',

    packsTitle: 'Packs de crédits',
    packsNote: 'Prix, volumes et ordres de grandeur à confirmer.',
    toConfirm: 'À confirmer',
    creditsUnit: 'crédits',
    packs: [
      { name: 'Découverte', note: 'Pour tester un premier Collaborateur IA.' },
      { name: 'Équipe', note: 'Pour une équipe qui travaille au quotidien.' },
      { name: 'Activité', note: 'Pour une activité régulière multi-missions.' },
      { name: 'Volume personnalisé', note: 'Pour un volume élevé ou plusieurs entités.' },
    ],

    formula1: 'Vous payez l’environnement persistant de chaque Collaborateur IA.',
    formula2: 'Vous choisissez ensuite comment régler les ressources qu’il utilise.',

    tableTitle: 'Deux modes de consommation.',
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

    faqTitle: 'Questions fréquentes',
    faq: [
      {
        q: 'Que comprend le forfait à 49 € ?',
        a: 'L’environnement complet d’un Collaborateur IA : identité, mémoire, profils métier illimités, workspace, missions, compétences, applications, présence autorisée et accompagnement d’Alma. Les consommations variables ne sont pas incluses.',
      },
      {
        q: 'Pourquoi ajouter un second Collaborateur IA si les profils sont illimités ?',
        a: 'Lorsqu’il faut séparer les identités, les responsabilités, les mémoires, les accès ou les présences publiques. Un Collaborateur peut exercer plusieurs métiers, mais il ne doit pas mélanger des périmètres qui doivent rester distincts.',
      },
      {
        q: 'Les crédits expirent-ils ?',
        a: 'Cette information est précisée sur votre contrat. Elle est décisive avant l’achat : nous l’affichons clairement au moment de commander.',
      },
      {
        q: 'Puis-je limiter les dépenses ?',
        a: 'Oui : plafond de budget, alertes et recharge automatique configurables. Les modalités exactes sont précisées dans le workspace.',
      },
      {
        q: 'Puis-je utiliser mes clés et des crédits simultanément ?',
        a: 'Oui, lorsque le routage hybride est disponible : vos clés pour certains modèles, des crédits Unitalk pour la voix, la téléphonie ou une solution de secours.',
      },
      {
        q: 'Unitalk ajoute-t-il une marge sur mes propres clés ?',
        a: 'La politique exacte est précisée sur votre contrat. L’objectif est de ne pas facturer les appels réglés directement chez votre fournisseur, hors ressources Unitalk clairement identifiées.',
      },
    ],

    partnerPre: 'Vous déployez Unitalk chez vos clients ?',
    partnerLink: 'Découvrir l’offre Partner',
    platformPre: 'Vous construisez votre propre produit ?',
    platformLink: 'Découvrir Platform',

    finalTitle: 'Créez votre Collaborateur IA avec Alma.',
    finalPrice: 'À partir de 49 € / mois',
    finalCta: 'Créer mon Collaborateur IA',
    finalProof: '7 jours d’essai · Sans carte bancaire · Données sous votre contrôle',
  },
  en: {
    trial: '7-day trial · No credit card · No commitment',
    title1: 'AI Collaborators ',
    title2: 'sized for your company.',
    subtitle:
      'Start with one identity. Add more when new responsibilities require distinct memory, access and history.',
    from: 'From €49 per month.',

    configEyebrow: 'Configurator',
    configTitle: 'Build your team.',
    qtyLabel: 'Number of AI Collaborators',
    tierChipsLabel: 'Tiers',
    includedIntro: 'Each AI Collaborator includes:',
    included: [
      'its own identity',
      'persistent memory',
      'unlimited job profiles',
      'a private workspace',
      'missions, skills and applications',
      'text and voice presence',
      'controlled access',
      'guidance from Alma',
    ],
    totalLabel: 'Monthly total',
    perCollabLabel: 'Per AI Collaborator',
    perCollabSuffix: 'each / month',
    savingsLabel: 'You save',
    savingsSuffix: '/ month',
    nextTierLabel: 'Next tier',
    nextTierMid: 'Collaborators',
    nextTierSuffix: 'each',
    tiersNote: 'Indicative degressive tiers — to be confirmed.',
    configCta: 'Create my AI Collaborator',

    identityEyebrow: 'What is actually billed',
    identityTitle: 'One identity can hold several roles.',
    identityBody1:
      'Your AI Collaborator can act as a salesperson, recruiter, analyst or support lead without becoming four different agents.',
    identityBody2:
      'You add as many job profiles as its missions require. They are unlimited and do not increase the plan price.',
    identityListIntro: 'You add a new AI Collaborator only when a responsibility requires:',
    identityList: [
      'a distinct identity',
      'its own memory',
      'different access',
      'separate history',
      'a dedicated public presence',
    ],

    consumEyebrow: 'AI consumption',
    consumTitle: 'The plan creates its environment. You choose how to fund its usage.',
    consumBody:
      'AI models, voice, telephony and some execution resources are variable. Two modes are available.',

    creditsCardTitle: 'Prepaid Unitalk credits',
    creditsCardBody: 'Buy credits shared across your whole company.',
    creditsList: [
      'no per-user model subscription',
      'access to several models from one interface',
      'pick the right model for each task',
      'budget capped in advance',
      'usage tracked in the workspace',
      'manual or automatic top-up',
    ],
    creditsCta: 'Buy credits',

    byokCardTitle: 'Your own API keys',
    byokCardBody: 'Connect the model accounts your company already uses.',
    byokList: [
      'OpenAI, Anthropic, Google, Mistral and other compatible providers',
      'billed directly by the provider',
      'no Unitalk credits consumed for those calls',
      'same missions, memory, skills and validations',
      'switch models without recreating the AI Collaborator',
    ],
    byokCta: 'Connect my API keys',

    coexistTitle: 'Both can coexist.',
    coexistBody:
      'Your company can use its own keys for some models and keep Unitalk credits for voice, telephony, an occasional model or a fallback.',
    coexistTag: 'Prepaid, BYOK or hybrid.',

    packsTitle: 'Credit packs',
    packsNote: 'Prices, volumes and orders of magnitude to be confirmed.',
    toConfirm: 'To confirm',
    creditsUnit: 'credits',
    packs: [
      { name: 'Starter', note: 'To test a first AI Collaborator.' },
      { name: 'Team', note: 'For a team working day to day.' },
      { name: 'Business', note: 'For regular multi-mission activity.' },
      { name: 'Custom volume', note: 'For high volume or several entities.' },
    ],

    formula1: 'You pay for the persistent environment of each AI Collaborator.',
    formula2: 'You then choose how to pay for the resources it uses.',

    tableTitle: 'Two consumption modes.',
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

    faqTitle: 'Frequently asked questions',
    faq: [
      {
        q: 'What does the €49 plan include?',
        a: 'The full environment of an AI Collaborator: identity, memory, unlimited job profiles, workspace, missions, skills, applications, authorized presence and Alma’s guidance. Variable consumption is not included.',
      },
      {
        q: 'Why add a second AI Collaborator if profiles are unlimited?',
        a: 'When you need to separate identities, responsibilities, memories, access or public presences. One Collaborator can hold several roles, but it should not mix scopes that must stay distinct.',
      },
      {
        q: 'Do credits expire?',
        a: 'This is specified in your contract. It is a decisive detail before purchase: we show it clearly at checkout.',
      },
      {
        q: 'Can I limit spending?',
        a: 'Yes: budget cap, alerts and automatic top-up are configurable. Exact terms are shown in the workspace.',
      },
      {
        q: 'Can I use my keys and credits at the same time?',
        a: 'Yes, when hybrid routing is available: your keys for some models, Unitalk credits for voice, telephony or a fallback.',
      },
      {
        q: 'Does Unitalk add a margin on my own keys?',
        a: 'The exact policy is specified in your contract. The intent is not to bill calls paid directly to your provider, apart from clearly identified Unitalk resources.',
      },
    ],

    partnerPre: 'Deploying Unitalk for your clients?',
    partnerLink: 'Discover the Partner offer',
    platformPre: 'Building your own product?',
    platformLink: 'Discover Platform',

    finalTitle: 'Create your AI Collaborator with Alma.',
    finalPrice: 'From €49 / month',
    finalCta: 'Create my AI Collaborator',
    finalProof: '7-day trial · No credit card · Data under your control',
  },
}

function Configurator({ lang }: { lang: 'fr' | 'en' }) {
  const t = T[lang]
  const [qty, setQty] = useState(1)
  const tier = tierFor(qty)
  const total = qty * tier.price
  const savings = qty * TIERS[0].price - total
  const next = nextTier(qty)

  const presets = TIERS.map((tr) => ({
    label: tr.max === Infinity ? `${tr.min}+` : tr.min === tr.max ? `${tr.min}` : `${tr.min}\u2013${tr.max}`,
    target: tr.min,
    active: qty >= tr.min && qty <= tr.max,
  }))

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease }}
      className="premium-shadow overflow-hidden rounded-[2rem] border border-[#D8D0C2] bg-[#FBF9F3]"
    >
      <div className="grid lg:grid-cols-[1fr_1.05fr]">
        {/* Left — controls */}
        <div className="border-b border-[#E4DCCF] p-7 sm:p-9 lg:border-b-0 lg:border-r">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D10E63]">{t.configEyebrow}</p>
          <h2 className="mt-3 font-sf text-2xl font-bold tracking-[-0.025em] text-[#1C1A17] sm:text-3xl">{t.configTitle}</h2>

          <label className="mt-8 block font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6B6560]">
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
            <span
              aria-live="polite"
              className="min-w-[3.5rem] text-center font-sf text-4xl font-bold tabular-nums text-[#1C1A17]"
            >
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
          </div>

          <div className="mt-6">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8A8175]">{t.tierChipsLabel}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {presets.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => setQty(p.target)}
                  className={`rounded-full px-3.5 py-1.5 font-mono text-[12px] font-semibold tabular-nums transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 ${
                    p.active
                      ? 'bg-[#1C1A17] text-[#FBF9F3]'
                      : 'border border-[#D8D0C2] text-[#4E483F] hover:border-[#1C1A17]'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <p className="mt-3 text-[12px] italic leading-relaxed text-[#8A8175]">{t.tiersNote}</p>
          </div>
        </div>

        {/* Right — live summary */}
        <div className="flex flex-col p-7 sm:p-9">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6B6560]">{t.totalLabel}</p>
              <p className="mt-1 font-sf text-5xl font-bold tracking-[-0.04em] text-[#1C1A17]">{money(total, lang)}</p>
              <p className="mt-1 text-sm text-[#6B6560]">{lang === 'fr' ? '/ mois' : '/ month'}</p>
            </div>
          </div>

          <dl className="mt-6 grid gap-3 border-t border-[#E4DCCF] pt-6 text-[14px]">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-[#6B6560]">{t.perCollabLabel}</dt>
              <dd className="font-semibold text-[#1C1A17]">
                {money(tier.price, lang)} <span className="font-normal text-[#8A8175]">{t.perCollabSuffix}</span>
              </dd>
            </div>
            {savings > 0 && (
              <div className="flex items-center justify-between gap-4">
                <dt className="text-[#6B6560]">{t.savingsLabel}</dt>
                <dd className="font-semibold text-[#B00C54]">
                  {money(savings, lang)} <span className="font-normal">{t.savingsSuffix}</span>
                </dd>
              </div>
            )}
            {next && (
              <div className="flex items-center justify-between gap-4">
                <dt className="text-[#6B6560]">{t.nextTierLabel}</dt>
                <dd className="text-right font-semibold text-[#1C1A17]">
                  {next.min} {t.nextTierMid} · {money(next.price, lang)} {t.nextTierSuffix}
                </dd>
              </div>
            )}
          </dl>

          <p className="mt-6 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6B6560]">
            {t.includedIntro}
          </p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {t.included.map((f) => (
              <li key={f} className="flex items-start gap-2 text-[13.5px] leading-snug text-[#3F3A33]">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#D10E63]" strokeWidth={2.5} aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>

          <Link
            href="/decouvrir"
            className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#D10E63] px-6 text-sm font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2"
          >
            {t.configCta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
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
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.28, ease }}
          className="overflow-hidden pb-5 pr-10 text-[14.5px] leading-relaxed text-[#5F594F]"
        >
          {a}
        </motion.p>
      )}
    </div>
  )
}

function ConsumptionCard({
  icon,
  title,
  body,
  list,
  cta,
  href,
  featured,
}: {
  icon: React.ReactNode
  title: string
  body: string
  list: string[]
  cta: string
  href: string
  featured?: boolean
}) {
  return (
    <div
      className={`flex flex-col rounded-[1.75rem] p-7 sm:p-8 ${
        featured ? 'premium-shadow border-2 border-[#D10E63] bg-[#FBF9F3]' : 'border border-[#D8D0C2] bg-[#FBF9F3]'
      }`}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EFE9DC] text-[#D10E63]">{icon}</div>
      <h3 className="mt-5 font-sf text-xl font-bold tracking-[-0.02em] text-[#1C1A17]">{title}</h3>
      <p className="mt-2 text-[14px] leading-relaxed text-[#4E483F]">{body}</p>
      <ul className="mt-5 flex flex-1 flex-col gap-2.5 border-t border-[#E4DCCF] pt-5">
        {list.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-[13.5px] leading-snug text-[#3F3A33]">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#D10E63]" strokeWidth={2.5} aria-hidden="true" />
            {f}
          </li>
        ))}
      </ul>
      <Link
        href={href}
        className={`mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-6 text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 ${
          featured
            ? 'bg-[#D10E63] text-[#FBF9F3] hover:-translate-y-0.5'
            : 'border border-[#1C1A17] text-[#1C1A17] hover:bg-[#1C1A17] hover:text-[#FBF9F3]'
        }`}
      >
        {cta}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  )
}

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

      {/* Configurateur */}
      <section className="mx-auto w-full max-w-5xl px-4 pb-16 sm:px-6 lg:px-8 sm:pb-20">
        <Configurator lang={lang} />
      </section>

      {/* Une identité, plusieurs métiers */}
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
            <p className="text-[14px] font-semibold text-[#1C1A17]">{t.identityListIntro}</p>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {t.identityList.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-[14px] leading-snug text-[#3F3A33]">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#D10E63]" strokeWidth={2.5} aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </section>

      {/* Consommation IA */}
      <section className="mx-auto w-full max-w-5xl px-4 pb-8 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D10E63]">{t.consumEyebrow}</p>
          <h2 className="mx-auto mt-3 text-balance font-sf text-2xl font-bold tracking-[-0.025em] text-[#1C1A17] sm:text-3xl">
            {t.consumTitle}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-[15px] leading-relaxed text-[#4E483F]">{t.consumBody}</p>
        </motion.div>

        <div className="mt-10 grid items-start gap-6 lg:grid-cols-2">
          <ConsumptionCard
            featured
            icon={<Coins className="h-5 w-5" aria-hidden="true" />}
            title={t.creditsCardTitle}
            body={t.creditsCardBody}
            list={t.creditsList}
            cta={t.creditsCta}
            href="/decouvrir"
          />
          <ConsumptionCard
            icon={<KeyRound className="h-5 w-5" aria-hidden="true" />}
            title={t.byokCardTitle}
            body={t.byokCardBody}
            list={t.byokList}
            cta={t.byokCta}
            href="/decouvrir"
          />
        </div>

        {/* Coexist */}
        <div className="mt-6 rounded-[1.75rem] border border-[#D8D0C2] bg-[#F7F3EA] p-7 text-center sm:p-8">
          <h3 className="font-sf text-lg font-bold tracking-[-0.02em] text-[#1C1A17]">{t.coexistTitle}</h3>
          <p className="mx-auto mt-3 max-w-2xl text-pretty text-[14.5px] leading-relaxed text-[#4E483F]">{t.coexistBody}</p>
          <p className="mx-auto mt-5 inline-block rounded-full bg-[#1C1A17] px-5 py-2 font-sf text-sm font-semibold text-[#FBF9F3]">
            {t.coexistTag}
          </p>
        </div>
      </section>

      {/* Packs de crédits */}
      <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8 sm:py-20">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-sf text-2xl font-bold tracking-[-0.025em] text-[#1C1A17] sm:text-3xl">{t.packsTitle}</h2>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8A8175]">{t.packsNote}</p>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.packs.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease, delay: i * 0.06 }}
              className="flex flex-col rounded-[1.5rem] border border-[#D8D0C2] bg-[#FBF9F3] p-6"
            >
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#8A8175]">{p.name}</p>
              <p className="mt-3 font-sf text-2xl font-bold tracking-[-0.03em] text-[#1C1A17]">{t.toConfirm}</p>
              <p className="mt-1 font-mono text-[12px] uppercase tracking-[0.12em] text-[#B00C54]">
                {t.toConfirm} · {t.creditsUnit}
              </p>
              <p className="mt-4 flex-1 text-[13.5px] leading-relaxed text-[#4E483F]">{p.note}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Formule tarifaire */}
      <section className="mx-auto w-full max-w-4xl px-4 pb-16 sm:px-6 sm:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease }}
          className="rounded-[2rem] border border-[#2C2822] bg-[#161412] p-8 text-center sm:p-14"
        >
          <p className="mx-auto max-w-2xl text-balance font-heading text-xl font-medium leading-[1.3] text-[#F4F1EA] sm:text-2xl">
            {t.formula1}
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-balance font-heading text-xl font-medium leading-[1.3] text-[#E8548C] sm:text-2xl">
            {t.formula2}
          </p>
        </motion.div>
      </section>

      {/* Comparatif des 2 modes */}
      <section className="mx-auto w-full max-w-4xl px-4 pb-16 sm:px-6 sm:pb-24">
        <h2 className="text-center font-sf text-2xl font-bold tracking-[-0.025em] text-[#1C1A17] sm:text-3xl">
          {t.tableTitle}
        </h2>
        <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-[#D8D0C2] bg-[#FBF9F3]">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-[#E4DCCF]">
                {t.tableCols.map((c, i) => (
                  <th
                    key={i}
                    className={`px-4 py-4 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] sm:px-6 ${
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
                  <th scope="row" className="px-4 py-3.5 text-[13.5px] font-medium text-[#4E483F] sm:px-6">
                    {row[0]}
                  </th>
                  <td className="px-4 py-3.5 text-[13.5px] font-semibold text-[#1C1A17] sm:px-6">{row[1]}</td>
                  <td className="px-4 py-3.5 text-[13.5px] text-[#4E483F] sm:px-6">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto w-full max-w-3xl px-4 pb-14 sm:px-6 sm:pb-20">
        <h2 className="text-balance text-center font-sf text-2xl font-bold tracking-[-0.025em] text-[#1C1A17] sm:text-3xl">
          {t.faqTitle}
        </h2>
        <div className="mt-8 border-t border-[#E4DCCF]">
          {t.faq.map((item) => (
            <FaqItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </section>

      {/* Liens Partner / Platform */}
      <section className="mx-auto w-full max-w-3xl px-4 pb-16 sm:px-6 sm:pb-24">
        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/partenaires"
            className="group flex flex-col gap-1 rounded-2xl border border-[#D8D0C2] bg-[#FBF9F3] p-5 transition-colors hover:border-[#1C1A17]"
          >
            <span className="text-[13.5px] text-[#6B6560]">{t.partnerPre}</span>
            <span className="inline-flex items-center gap-1.5 font-sf text-[15px] font-bold text-[#B00C54]">
              {t.partnerLink}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </Link>
          <Link
            href="mailto:hello@unitalk.ai"
            className="group flex flex-col gap-1 rounded-2xl border border-[#D8D0C2] bg-[#FBF9F3] p-5 transition-colors hover:border-[#1C1A17]"
          >
            <span className="text-[13.5px] text-[#6B6560]">{t.platformPre}</span>
            <span className="inline-flex items-center gap-1.5 font-sf text-[15px] font-bold text-[#B00C54]">
              {t.platformLink}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </Link>
        </div>
      </section>

      {/* CTA final */}
      <section className="mx-auto w-full max-w-5xl px-4 pb-20 sm:px-6 sm:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease }}
          className="premium-shadow overflow-hidden rounded-[2rem] border border-[#2C2822] bg-[#161412] px-6 py-14 text-center sm:px-10 sm:py-16"
        >
          <h2 className="mx-auto max-w-2xl text-balance font-heading text-3xl font-medium leading-[1.1] text-[#F4F1EA] sm:text-5xl">
            {t.finalTitle}
          </h2>
          <p className="mt-5 font-sf text-xl font-bold text-[#E8548C]">{t.finalPrice}</p>
          <Link
            href="/decouvrir"
            className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#D10E63] px-8 text-sm font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#161412]"
          >
            {t.finalCta}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-[#8A8175]">{t.finalProof}</p>
        </motion.div>
      </section>
    </main>
  )
}
