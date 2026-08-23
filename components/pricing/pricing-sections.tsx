'use client'

import Link from 'next/link'
import { startTransition, useState, type ReactNode } from 'react'
import { ArrowRight, Check, Coins, KeyRound, Minus, Plus } from 'lucide-react'
import { persistPricingDraft } from '@/app/actions/pricing'
import { Kicker } from '@/components/home/section-kicker'
import { useLanguage } from '@/lib/language-context'
import { ROLE_DETAILS } from '@/lib/collaborators-catalog'
import { AlmaFace } from '@/components/alma-face'
import { organizationMonthlyPrice, pricingAnnualTotal, pricingRecurringTotal, unitalkPricing, type BillingPeriodId, type OrganizationTierId, type PricingDraft } from '@/lib/unitalk-pricing'

const COPY = {
  fr: {
    kicker: 'Commencez gratuitement', title: 'Votre première mission.', accent: 'Offerte.',
    lead: 'Décrivez le résultat attendu. Alma prépare la mission, le Workspace et le Collaborateur IA adapté à votre entreprise.',
    primary: 'Démarrer avec Alma', exploreMissions: 'Explorer les missions',
    proofs: ['Sans carte bancaire', 'Jusqu’à 7 jours', '1 million de tokens inclus', 'Puis à partir de 49 € HT/mois'],
    priceKicker: 'Une formule claire, sans frais cachés', priceTitle: '',
    priceLead: 'Choisissez votre Workspace et vos Collaborateurs IA. Rattachez-les à une personne, une équipe ou toute l’entreprise. Vous gardez le choix de vos modèles et fournisseurs ; les données et configurations prises en charge par les fonctions d’export peuvent être récupérées dans les formats proposés.',
    sectionTitle: 'Construisez votre équipe humain + IA.', sectionAccent: 'Maîtrisez son coût.',
    monthlyBilling: 'Mensuel', annualBilling: 'Annuel', annualOffer: '2 mois offerts', annualPayment: 'Paiement annuel', monthlyPayment: 'Paiement mensuel', equivalent: 'soit',
    collaboratorTitle: 'Collaborateurs IA', collaboratorPrice: '49 € HT/mois chacun', collaboratorCapacity: '5 millions de tokens DeepSeek inclus', collaboratorBody: 'Ils prennent en charge des missions avec mémoire, outils et autonomie encadrée.',
    collaboratorIncludes: ['Missions prises en charge', 'Applications Web et Desktop incluses', 'Profils et compétences illimités', 'Mémoire privée et partagée', 'Email, calendrier et téléphone', 'Disponible dans vos messageries : Slack, Teams, Telegram, WhatsApp…', 'Serveur privé virtuel dédié'],
    workspaceTitle: 'Workspace', workspaceBody: 'L’espace de travail où humains et IA collaborent. Le tarif est défini par palier selon le nombre d’humains inclus.', workspaceUsers: 'Palier Workspace', free: 'Gratuit',
    tiers: [{ id: 'solo', name: 'Solo', users: '1 humain inclus · Gratuit', option: 'Solo · 1 humain inclus', price: '' }, { id: 'team', name: 'Équipe', users: 'Jusqu’à 10 humains', option: 'Équipe · Jusqu’à 10 humains', price: '49 € HT/mois' }, { id: 'business', name: 'Entreprise', users: 'Jusqu’à 100 humains', option: 'Entreprise · Jusqu’à 100 humains', price: '299 € HT/mois' }],
    workspaceIncludes: ['Assistants d’équipe illimités', 'Accès aux modèles IA : texte, image, vidéo et audio', 'Plus de 3 000 applications via Pipedream'],
    privateServer: 'Serveur IA privé pour déployer vos applications open source',
    selectedProfile: 'Profil de départ', summaryTitle: 'Calcul du prix', summaryBody: 'Votre total se met à jour selon la taille du Workspace et le nombre de Collaborateurs IA.', workspaceLine: 'Licence Workspace', collaboratorsLine: 'Collaborateurs IA', tokensLine: 'DeepSeek V4', includedTokens: '5 millions de tokens par Collaborateur IA', millionTokens: 'millions de tokens', hostingLine: 'Hébergement', hostingValue: 'Europe · Microsoft Azure', phoneLine: 'Téléphone inclus', phoneMinutes: '60 min par Collaborateur IA', freeCreditsLine: 'Crédits IA inclus', setupLine: 'Mise en service', setupValue: 'Accompagnée par Alma', monthly: 'Total mensuel HT', annual: 'Total annuel HT', today: 'À payer aujourd’hui', tax: 'Prix HT',
    usageKicker: 'Consommation IA', usageTitle: 'Ne payez que', usageAccent: 'ce que vous consommez.', usageLead: 'Les crédits inclus et achetés alimentent un solde unique pour toute l’entreprise. Le Workspace et les Collaborateurs IA y puisent selon leurs usages. Vous pouvez aussi connecter vos propres clés API.',
    creditsTitle: 'Un solde IA partagé', creditsBody: 'Centralisez dans un même solde les modèles et services facturés à l’usage. Rechargez à partir de 25 €, uniquement lorsque vous le décidez.', creditsCta: 'Acheter des crédits', creditsDetail: 'Voir le détail',
    keysTitle: 'Vos propres clés API', keysBody: 'Connectez les clés de votre entreprise et réglez directement les fournisseurs que vous utilisez.', keysCta: 'Voir les modèles IA',
    migrationKicker: 'Déjà équipé ?', migrationTitle: 'Transformez votre agent Hermes ou OpenClaw en Collaborateur IA Unitalk.', migrationBody: 'Migrez sa configuration, sa mémoire et ses compétences compatibles, puis rattachez-le à votre entreprise.', migrationCta: 'Migrer en un clic gratuitement',
    continue: 'Enregistrer et continuer', activationNote: 'Aucun paiement avant confirmation.', error: 'La configuration n’a pas pu être enregistrée. Réessayez.',
    monthlyTerms: 'Prix HT. Facturation mensuelle, résiliable à tout moment. Aucune activation payante avant votre accord.', annualTerms: 'Prix HT. Facturation annuelle correspondant à 10 mois, soit 2 mois offerts. Aucune activation payante avant votre accord.',
  },
  en: {
    kicker: 'Start for free', title: 'Your first mission.', accent: 'Included.',
    lead: 'Describe the expected outcome. Alma prepares the mission, Workspace and AI Collaborator suited to your organization.',
    primary: 'Start with Alma', exploreMissions: 'Explore missions',
    proofs: ['No credit card', 'Up to 7 days', '1 million tokens included', 'Then from €49 excl. tax/month'],
    priceKicker: 'Clear pricing, no hidden fees', priceTitle: '',
    priceLead: 'Choose your Workspace and AI Collaborators. Assign them to one person, a team or your entire organization. Keep your choice of models and providers; data and configurations supported by export features can be retrieved in the available formats.',
    sectionTitle: 'Build your human + AI team.', sectionAccent: 'Control its cost.',
    monthlyBilling: 'Monthly', annualBilling: 'Annual', annualOffer: '2 months free', annualPayment: 'Annual payment', monthlyPayment: 'Monthly payment', equivalent: 'or',
    collaboratorTitle: 'AI Collaborators', collaboratorPrice: '€49 excl. tax/month each', collaboratorCapacity: '5 million DeepSeek tokens included', collaboratorBody: 'They handle missions with memory, tools and governed autonomy.',
    collaboratorIncludes: ['Missions handled', 'Web and Desktop apps included', 'Unlimited profiles and skills', 'Private and shared memory', 'Email, calendar and phone', 'Available in your messaging apps: Slack, Teams, Telegram, WhatsApp…', 'Dedicated private virtual server'],
    workspaceTitle: 'Workspace', workspaceBody: 'The workspace where humans and AI collaborate. Pricing uses tiers based on the number of humans included.', workspaceUsers: 'Workspace tier', free: 'Free',
    tiers: [{ id: 'solo', name: 'Solo', users: '1 human included · Free', option: 'Solo · 1 human included', price: '' }, { id: 'team', name: 'Team', users: 'Up to 10 humans', option: 'Team · Up to 10 humans', price: '€49 excl. tax/month' }, { id: 'business', name: 'Business', users: 'Up to 100 humans', option: 'Business · Up to 100 humans', price: '€299 excl. tax/month' }],
    workspaceIncludes: ['Unlimited team assistants', 'Access to AI models for text, image, video and audio', '3,000+ applications through Pipedream'],
    privateServer: 'Private AI server for deploying your open-source applications',
    selectedProfile: 'Starting profile', summaryTitle: 'Price calculation', summaryBody: 'Your total updates with the Workspace size and number of AI Collaborators.', workspaceLine: 'Workspace license', collaboratorsLine: 'AI Collaborators', tokensLine: 'DeepSeek V4', includedTokens: '5 million tokens per AI Collaborator', millionTokens: 'million tokens', hostingLine: 'Hosting', hostingValue: 'Europe · Microsoft Azure', phoneLine: 'Phone included', phoneMinutes: '60 min per AI Collaborator', freeCreditsLine: 'Included AI credits', setupLine: 'Setup', setupValue: 'Guided by Alma', monthly: 'Monthly total excl. tax', annual: 'Annual total excl. tax', today: 'Due today', tax: 'Price excludes tax',
    usageKicker: 'AI usage', usageTitle: 'Pay only for', usageAccent: 'what you use.', usageLead: 'Included and purchased credits fund one balance for your entire organization. The Workspace and AI Collaborators draw from it as they work. You can also connect your own API keys.',
    creditsTitle: 'One shared AI balance', creditsBody: 'Centralize usage-based models and services in a single balance. Top up from €25, only when you decide.', creditsCta: 'Buy credits', creditsDetail: 'View details',
    keysTitle: 'Your own API keys', keysBody: 'Connect your organization’s keys and pay the providers you use directly.', keysCta: 'View AI models',
    migrationKicker: 'Already equipped?', migrationTitle: 'Turn your Hermes or OpenClaw agent into a Unitalk AI Collaborator.', migrationBody: 'Migrate its compatible configuration, memory and skills, then attach it to your organization.', migrationCta: 'Migrate free in one click',
    continue: 'Save and continue', activationNote: 'No payment before confirmation.', error: 'We could not save this configuration. Please try again.',
    monthlyTerms: 'Prices exclude tax. Monthly billing, cancel anytime. No paid activation without your approval.', annualTerms: 'Prices exclude tax. Annual billing charged as 10 months, with 2 months included. No paid activation without your approval.',
  },
} as const

export function PricingHero() {
  const { lang } = useLanguage()
  const t = COPY[lang]
  return (
    <section className="relative overflow-hidden border-b border-[#D8D0C2] bg-[#F3EFE6] pb-10 pt-24 sm:pb-12 sm:pt-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[.04] [background-image:linear-gradient(#1C1A17_1px,transparent_1px),linear-gradient(90deg,#1C1A17_1px,transparent_1px)] [background-size:72px_72px]" />
      <div aria-hidden className="pointer-events-none absolute -right-40 top-0 h-[40rem] w-[40rem] rounded-full bg-[#D10E63]/[.08] blur-3xl" />
      <div className="editorial-shell relative">
        <div className="grid items-end gap-8 sm:gap-10 lg:grid-cols-[1.08fr_.92fr] lg:gap-14">
          <div className="max-w-[720px]">
            <div className="mb-4 flex"><Kicker>{t.kicker}</Kicker></div>
            <h1 className="max-w-[760px] text-balance text-[clamp(2.65rem,12vw,4.75rem)] font-semibold leading-[.92] tracking-[-.06em] text-[#1C1A17] lg:text-[clamp(3.25rem,5vw,4.75rem)]">{t.title}<span className="block text-[#D10E63]">{t.accent}</span></h1>
          </div>
          <div className="lg:pb-1">
            <p className="max-w-xl text-[15px] leading-7 text-[#4E483F] sm:text-[17px] sm:leading-8">{withAlmaAvatar(t.lead)}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center"><Link href="/decouvrir?source=tarifs" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#D10E63] px-7 text-sm font-bold text-white shadow-[0_12px_30px_-18px_rgba(209,14,99,.75)] transition hover:-translate-y-0.5 hover:bg-[#B00C54]">{t.primary}<ArrowRight className="ml-2 size-4"/></Link><Link href="/missions" className="inline-flex min-h-12 items-center justify-center px-3 text-sm font-bold text-[#4E483F] underline decoration-[#D10E63]/35 underline-offset-4 hover:text-[#B00C54]">{t.exploreMissions}</Link></div>
          </div>
        </div>
        <ul className="mt-7 flex flex-wrap gap-x-7 gap-y-3 border-t border-[#CFC5B5] pt-5 text-xs font-bold text-[#625B50]">{t.proofs.map(item => <li key={item} className="flex items-center gap-2"><Check className="size-4 text-[#D10E63]"/>{item}</li>)}</ul>
      </div>
    </section>
  )
}

function withAlmaAvatar(value: string) {
  return value.split('Alma').map((part, index) => <span key={`${part}-${index}`}>{index > 0 && <><AlmaFace em={1.15} />Alma</>}{part}</span>)
}

function formatPrice(value: number, lang: 'fr' | 'en') {
  return new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : 'en-US', { maximumFractionDigits: 2 }).format(value)
}

export function PricingCollaboration({ initialDraft, selectedProfile }: { initialDraft: PricingDraft; selectedProfile?: string }) {
  const { lang } = useLanguage()
  const t = COPY[lang]
  const [organizationTier, setOrganizationTier] = useState<OrganizationTierId>(initialDraft.organizationTier)
  const [collaborators, setCollaborators] = useState(initialDraft.collaborators)
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriodId>(initialDraft.billingPeriod)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  const organizationPrice = organizationMonthlyPrice(organizationTier)
  const monthlyTotal = pricingRecurringTotal({ organizationTier, collaborators })
  const annualTotal = pricingAnnualTotal({ organizationTier, collaborators })
  const effectiveMonthlyTotal = annualTotal / 12
  const workspaceCredits = unitalkPricing.organization[organizationTier].includedCredits
  const workspaceCreditsValue = `${new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : 'en-US').format(workspaceCredits)} ${lang === 'fr' ? 'crédits IA' : 'AI credits'}`
  const selectedTier = t.tiers.find(tier => tier.id === organizationTier)!
  const selectedRole = selectedProfile ? ROLE_DETAILS[selectedProfile] : undefined
  const includedTokensLabel = collaborators === 1 ? t.includedTokens : `${collaborators} × 5 millions = ${collaborators * 5} ${t.millionTokens}`
  const freeCreditsValue = workspaceCreditsValue

  function submit() {
    setError('')
    setPending(true)
    startTransition(() => persistPricingDraft({ ...initialDraft, organizationTier, collaborators, billingPeriod, selectedProfile }).catch(() => {
      setPending(false)
      setError(t.error)
    }))
  }

  return (
    <div id="detail-tarifs" className="scroll-mt-24">
      <span id="configurateur" className="block scroll-mt-24" aria-hidden />
      <section className="px-5 py-14 sm:px-8 sm:py-20">
        <div className="editorial-shell">
          <div><Kicker>{t.priceKicker}</Kicker><h2 className="mt-5 text-balance text-[clamp(2.35rem,5vw,4.8rem)] font-semibold leading-[.94] tracking-[-.06em]"><span className="block">{t.sectionTitle}</span><span className="block text-[#D10E63]">{t.sectionAccent}</span></h2><p className="mt-5 max-w-3xl text-[15px] leading-7 text-[#625B50]">{t.priceLead}</p></div>
          <div className="mt-7 flex flex-wrap items-center gap-3"><div role="group" aria-label={lang === 'fr' ? 'Période de facturation' : 'Billing period'} className="inline-flex rounded-full border border-[#CFC5B5] bg-[#EAE3D4] p-1"><BillingButton active={billingPeriod === 'monthly'} onClick={() => setBillingPeriod('monthly')}>{t.monthlyBilling}</BillingButton><BillingButton active={billingPeriod === 'annual'} onClick={() => setBillingPeriod('annual')}>{t.annualBilling}<span className="ml-2 rounded-full bg-[#FBEAF1] px-2 py-0.5 text-[10px] text-[#B00C54]">{t.annualOffer}</span></BillingButton></div>{selectedRole && <p className="w-fit rounded-full bg-[#D10E63]/10 px-4 py-2 text-sm font-bold text-[#B00C54]">{t.selectedProfile} : {selectedRole.name} · {selectedRole.role[lang]}</p>}</div>

          <div className="mt-10 grid items-stretch gap-5 lg:grid-cols-3">
            <PriceCard title={t.workspaceTitle} price={organizationTier === 'solo' ? t.free : billingPeriod === 'annual' ? `${organizationPrice * 10} € HT/${lang === 'fr' ? 'an' : 'year'}` : selectedTier.price} priceNote={workspaceCreditsValue} body={t.workspaceBody} items={[...t.workspaceIncludes, ...(organizationTier === 'solo' ? [] : [t.privateServer])]}><label className="block"><span className="mb-2 block text-xs font-bold text-[#625B50]">{t.workspaceUsers}</span><span className="relative block"><select value={organizationTier} onChange={event => setOrganizationTier(event.target.value as OrganizationTierId)} aria-label={t.workspaceTitle} className="h-12 w-full appearance-none rounded-xl border border-[#CFC5B5] bg-white px-4 pr-10 font-sans text-xs font-bold text-[#625B50] outline-none focus:border-[#D10E63] focus:ring-2 focus:ring-[#D10E63]/15">{t.tiers.map(tier => <option key={tier.id} value={tier.id}>{tier.option}</option>)}</select><span aria-hidden className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#D10E63]">▼</span></span></label></PriceCard>
            <PriceCard title={t.collaboratorTitle} price={billingPeriod === 'annual' ? `490 € HT/${lang === 'fr' ? 'an chacun' : 'year each'}` : t.collaboratorPrice} priceNote={t.collaboratorCapacity} body={t.collaboratorBody} items={t.collaboratorIncludes} featured><Counter value={collaborators} onChange={setCollaborators} lang={lang}/></PriceCard>
            <aside className="order-first flex h-full flex-col rounded-[26px] bg-[#211E1A] p-6 text-white shadow-[0_28px_70px_-38px_rgba(28,26,23,.8)] sm:p-7 lg:order-none"><p className="font-mono text-[10px] font-black uppercase tracking-[.16em] text-[#F2A4C5]">{billingPeriod === 'annual' ? t.annual : t.monthly}</p>{billingPeriod === 'annual' ? <><p className="mt-5 font-sf text-5xl font-semibold tracking-[-.065em]">{annualTotal} €</p><p className="mt-2 text-xs font-bold text-white/80">{t.equivalent} {formatPrice(effectiveMonthlyTotal, lang)} € HT/mois · {t.annualOffer}</p></> : <p className="mt-5 font-sf text-5xl font-semibold tracking-[-.065em]">{monthlyTotal} €</p>}<dl className="mt-6 overflow-hidden rounded-2xl border border-white/15 bg-white/[.07]"><WorkspaceSummary label={t.workspaceLine} name={selectedTier.name} detail={`${selectedTier.users}${organizationPrice ? ` · ${billingPeriod === 'annual' ? organizationPrice * 10 : organizationPrice} €` : ''}`}/><Summary label={t.freeCreditsLine} value={freeCreditsValue} dark/>{collaborators > 0 && <><Summary label={t.collaboratorsLine} value={billingPeriod === 'annual' ? `${collaborators} × 490 €` : `${collaborators} × 49 €`} dark/><Summary label={t.tokensLine} value={includedTokensLabel} dark/><Summary label={t.hostingLine} value={t.hostingValue} dark/><Summary label={t.phoneLine} value={t.phoneMinutes} dark/></>}<Summary label={t.setupLine} value={<span className="inline-flex items-center gap-1.5"><AlmaFace em={1.2}/>{t.setupValue}</span>} dark/></dl><button type="button" onClick={submit} disabled={pending} aria-busy={pending} className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#D10E63] px-6 text-sm font-bold text-white transition hover:bg-[#B00C54] disabled:opacity-60">{t.continue}<ArrowRight className="ml-2 size-4"/></button>{error && <p role="alert" className="mt-4 text-xs text-white">{error}</p>}</aside>
          </div>
          <p className="ml-auto mt-3 max-w-md text-center text-xs font-bold leading-5 text-[#625B50]">{t.activationNote}</p>

          <section className="mt-16 border-y border-[#CFC5B5] py-10 sm:py-12">
            <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-14">
              <div><Kicker>{t.usageKicker}</Kicker><h2 className="mt-5 max-w-xl text-balance font-sf text-[clamp(2.35rem,5vw,4.8rem)] font-semibold leading-[.94] tracking-[-.06em]">{t.usageTitle}<span className="block text-[#D10E63]">{t.usageAccent}</span></h2><p className="mt-5 max-w-lg text-[15px] leading-7 text-[#625B50]">{t.usageLead}</p></div>
              <div className="grid gap-4 sm:grid-cols-2">
                <article className="group relative flex min-h-64 flex-col overflow-hidden rounded-[24px] border border-[#D10E63]/25 bg-[#FFFDF9] p-6 shadow-[0_24px_55px_-44px_rgba(209,14,99,.65)] before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-[#D10E63]"><div className="flex size-11 items-center justify-center rounded-2xl bg-[#FBEAF1] text-[#D10E63]"><Coins className="size-5"/></div><p className="mt-6 font-sf text-xl font-semibold tracking-[-.035em]">{t.creditsTitle}</p><p className="mt-3 text-sm leading-7 text-[#625B50]">{t.creditsBody}</p><div className="mt-auto flex flex-wrap items-center gap-4 border-t border-[#E4DDD1] pt-5"><Link href="/commande?offre=credits&source=tarifs" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#D10E63] px-5 text-sm font-bold text-white transition hover:bg-[#B00C54]">{t.creditsCta}<ArrowRight className="size-4"/></Link><Link href="/credits" className="inline-flex min-h-11 items-center text-sm font-bold text-[#625B50] underline decoration-[#D10E63]/30 underline-offset-4 hover:text-[#B00C54]">{t.creditsDetail}</Link></div></article>
                <article className="group relative flex min-h-64 flex-col overflow-hidden rounded-[24px] border border-[#D8D0C2] bg-[#181615] p-6 text-white shadow-[0_24px_55px_-44px_rgba(28,26,23,.8)]"><div aria-hidden className="absolute -right-16 -top-16 size-40 rounded-full bg-[#D10E63]/15 blur-2xl"/><div className="relative flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[.07] text-[#F2A4C5]"><KeyRound className="size-5"/></div><p className="relative mt-6 font-sf text-xl font-semibold tracking-[-.035em]">{t.keysTitle}</p><p className="relative mt-3 text-sm leading-7 text-[#CFC6B8]">{t.keysBody}</p><Link href="/marketplace/modeles-ia" className="relative mt-auto inline-flex min-h-11 items-center gap-2 border-t border-white/10 pt-5 text-sm font-bold text-[#F2A4C5]">{t.keysCta}<ArrowRight className="size-4 transition-transform group-hover:translate-x-1"/></Link></article>
              </div>
            </div>
          </section>
          <aside className="relative mt-8 overflow-hidden rounded-[26px] border border-[#D10E63]/25 bg-[#211E1A] p-6 text-white sm:p-8">
            <div aria-hidden className="pointer-events-none absolute -right-20 -top-24 size-64 rounded-full bg-[#D10E63]/20 blur-3xl"/>
            <div className="relative grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
              <div><p className="font-mono text-[10px] font-black uppercase tracking-[.16em] text-[#F2A4C5]">{t.migrationKicker}</p><h3 className="mt-3 text-balance font-sf text-2xl font-semibold tracking-[-.04em] sm:text-3xl">{t.migrationTitle}</h3><p className="mt-3 max-w-3xl text-sm leading-7 text-[#CFC6B8]">{withAlmaAvatar(t.migrationBody)}</p></div>
              <Link href="/commande?offre=migration-agent&source=tarifs" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-[#D10E63] px-6 text-sm font-bold text-white transition hover:bg-[#B00C54]">{t.migrationCta}<ArrowRight className="ml-2 size-4"/></Link>
            </div>
          </aside>
          <p className="mt-5 text-xs leading-6 text-[#766D61]">{billingPeriod === 'annual' ? t.annualTerms : t.monthlyTerms}</p>
        </div>
      </section>
    </div>
  )
}

function PriceCard({ title, price, priceNote, body, items, children, featured = false }: { title: string; price: string; priceNote?: string; body: string; items: readonly string[]; children: ReactNode; featured?: boolean }) {
  return <section className={`relative flex h-full flex-col overflow-hidden rounded-[26px] border p-6 sm:p-7 ${featured ? 'border-[#D10E63]/35 bg-[#FFFDF9] shadow-[0_28px_70px_-50px_rgba(209,14,99,.75)]' : 'border-[#D8D0C2] bg-[#FAF8F3]'}`}><span aria-hidden className={`absolute inset-x-0 top-0 h-1 ${featured ? 'bg-[#D10E63]' : 'bg-[#CFC5B5]'}`}/><div className="min-h-[112px]"><h3 className="text-2xl font-semibold tracking-[-.04em]">{title}</h3><p className="mt-3 text-2xl font-semibold tracking-[-.04em] text-[#D10E63]">{price}</p>{priceNote && <p className="mt-2 inline-flex items-center rounded-full border border-[#CFC5B5] bg-[#EAE3D4] px-3 py-1.5 text-[11px] font-black text-[#4E483F]"><span aria-hidden className="mr-2 size-1.5 rounded-full bg-[#857C6E]"/>{priceNote}</p>}</div><p className="mt-4 min-h-12 text-sm leading-6 text-[#625B50]">{body}</p><ul className="mt-5 grid gap-2.5 text-sm font-semibold leading-5 text-[#4E483F]">{items.map(item => <li key={item} className="flex gap-2"><Check className="mt-0.5 size-3.5 shrink-0 text-[#D10E63]"/>{item}</li>)}</ul><div className="mt-auto pt-6">{children}</div></section>
}

function Counter({ value, onChange, lang }: { value: number; onChange: (value: number) => void; lang: 'fr' | 'en' }) {
  const noun = lang === 'fr' ? 'Collaborateur IA' : 'AI Collaborator'
  return <div className="grid h-12 grid-cols-[7rem_minmax(0,1fr)] items-center rounded-xl border border-[#CFC5B5] bg-white pl-3 pr-1"><span className="text-xs font-bold text-[#625B50]">{noun}</span><div className="ml-auto inline-flex h-10 items-center"><button type="button" aria-label={`${lang === 'fr' ? 'Retirer' : 'Remove'} ${noun}`} disabled={value === 0} onClick={() => onChange(Math.max(0, value - 1))} className="flex size-10 items-center justify-center rounded-full hover:bg-[#F3EFE6] focus-visible:ring-2 focus-visible:ring-[#D10E63] disabled:opacity-30"><Minus className="size-4"/></button><output aria-label={`${noun} : ${value}`} aria-live="polite" className="min-w-9 text-center text-sm font-black">{value}</output><button type="button" aria-label={`${lang === 'fr' ? 'Ajouter' : 'Add'} ${noun}`} disabled={value >= unitalkPricing.aiCollaborator.max} onClick={() => onChange(Math.min(unitalkPricing.aiCollaborator.max, value + 1))} className="flex size-10 items-center justify-center rounded-full hover:bg-[#F3EFE6] focus-visible:ring-2 focus-visible:ring-[#D10E63] disabled:opacity-30"><Plus className="size-4"/></button></div></div>
}

function BillingButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return <button type="button" aria-pressed={active} onClick={onClick} className={`inline-flex min-h-10 items-center rounded-full px-4 text-xs font-bold transition-colors focus-visible:ring-2 focus-visible:ring-[#D10E63] ${active ? 'bg-[#181615] text-white' : 'text-[#625B50] hover:text-[#B00C54]'}`}>{children}</button>
}

function Summary({ label, value, dark = false }: { label: ReactNode; value: ReactNode; dark?: boolean }) {
  return <div className={`border-b px-4 py-3.5 last:border-b-0 ${dark ? 'border-white/15' : 'border-[#DED6C8]'}`}><dt className={`text-xs ${dark ? 'text-white/70' : 'text-[#625B50]'}`}>{label}</dt><dd className="mt-1 text-xs font-bold">{value}</dd></div>
}

function WorkspaceSummary({ label, name, detail }: { label: string; name: string; detail: string }) {
  return <div className="border-b border-white/15 px-4 py-3.5"><div className="flex items-baseline justify-between gap-3"><dt className="text-xs text-white/70">{label}</dt><dd className="text-xs font-bold">{name}</dd></div><dd className="mt-1 text-xs font-bold">{detail}</dd></div>
}
