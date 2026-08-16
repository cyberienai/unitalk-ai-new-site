'use client'

import Link from 'next/link'
import { useState, type ReactNode } from 'react'
import { Anthropic, DeepSeek, Gemini, Mistral, OpenAI } from '@lobehub/icons'
import { ArrowDown, ArrowRight, Check, Code2, Eye, ImageIcon, Mic2, Sparkles, WalletCards } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { AlmaFace } from '@/components/alma-face'

type Workload = 'light' | 'daily' | 'intensive'

const MODEL_FAMILIES: { name: string; maker: string; mark: ReactNode; tone: string }[] = [
  { name: 'GPT', maker: 'OpenAI', mark: <OpenAI size={29} />, tone: 'bg-[#E7E2D7]' },
  { name: 'Claude', maker: 'Anthropic', mark: <Anthropic size={29} />, tone: 'bg-[#F1DCCF]' },
  { name: 'Gemini', maker: 'Google', mark: <Gemini size={29} />, tone: 'bg-[#DCE5E7]' },
  { name: 'Mistral', maker: 'Mistral AI', mark: <Mistral size={29} />, tone: 'bg-[#F2D9D0]' },
  { name: 'DeepSeek', maker: 'DeepSeek', mark: <DeepSeek size={29} />, tone: 'bg-[#DDE2EF]' },
  { name: 'Kimi', maker: 'Moonshot AI', mark: <span className="text-xl font-black">K</span>, tone: 'bg-[#DEE8E2]' },
  { name: 'Qwen', maker: 'Alibaba Cloud', mark: <span className="text-xl font-black">Q</span>, tone: 'bg-[#E7DDF0]' },
  { name: 'Grok', maker: 'xAI', mark: <span className="text-xl font-black">G</span>, tone: 'bg-[#E2E0DD]' },
  { name: 'MiniMax', maker: 'MiniMax', mark: <span className="text-lg font-black">MM</span>, tone: 'bg-[#E8DFD6]' },
]

const T = {
  fr: {
    eyebrow: 'Modèles IA / Capacité', heroA: 'Le bon modèle.', heroB: 'Seulement quand', heroC: 'le travail l’exige.',
    lead: 'Votre Collaborateur IA peut mobiliser plusieurs familles de modèles, sous les règles de votre entreprise. Vous choisissez la capacité mensuelle, vos propres clés ou des crédits prépayés.',
    primary: 'Choisir ma capacité', secondary: 'Comprendre AI Gateway',
    ribbon: ['Plusieurs fournisseurs', 'Une politique commune', 'Coûts attribués', 'Aucun modèle imposé'],
    catalogKicker: 'La table des modèles', catalogTitle: 'Une équipe d’intelligences derrière chaque Collaborateur IA.', catalogBody: 'La famille utilisée peut varier selon la mission, la modalité, le budget et les autorisations. Cette sélection est indicative : les versions et disponibilités évoluent.',
    formats: [['Raisonner', Sparkles], ['Voir', Eye], ['Créer une image', ImageIcon], ['Écouter et parler', Mic2], ['Coder', Code2]] as const,
    gatewayLink: 'Voir le routage et la gouvernance',
    capacityKicker: 'Capacité mensuelle', capacityTitle: 'Choisissez une cadence, pas un modèle.', capacityBody: 'La capacité suit le Collaborateur IA. Vous pouvez l’ajuster sans changer son identité, ses missions ou son expérience validée.',
    workloadLabel: 'Estimez votre rythme de travail', workloads: { light: 'Léger', daily: 'Quotidien', intensive: 'Intensif' },
    capacities: {
      light: { name: 'Quart-temps', tokens: '5 M', price: '25 €', cadence: 'Missions légères ou récurrentes', note: 'Offert jusqu’au 31 décembre 2026' },
      daily: { name: 'Mi-temps', tokens: '10 M', price: '50 €', cadence: 'Prise en charge quotidienne', note: 'Ajustable à tout moment' },
      intensive: { name: 'Temps plein', tokens: '20 M', price: '100 €', cadence: 'Processus complexes et volumes importants', note: 'Ajustable à tout moment' },
    },
    perMonth: '/ mois / Collaborateur IA', tokensLabel: 'tokens par mois', choose: 'Commander', orderCapacity: 'Acheter de la capacité IA',
    freedomKicker: 'À votre manière', freedomTitle: 'Mensuel, prépayé ou avec vos clés.',
    prepaidTitle: 'Crédits prépayés', prepaidPrice: 'Dès 25 €', prepaidTag: 'Sans engagement', prepaidBody: 'Rechargez un solde pour les besoins ponctuels, les modèles avancés ou les usages image, audio et vidéo. Vous ne consommez que ce que les missions utilisent.', prepaidPoints: ['Recharge ponctuelle', 'Budget maîtrisé', 'Complète une capacité mensuelle'],
    byokTitle: 'BYOK', byokPrice: '0 € / mois', byokTag: 'Vos clés', byokBody: 'Connectez les clés API de votre entreprise. Le fournisseur vous facture directement la consommation, tandis que Unitalk applique vos règles d’accès.', byokPoints: ['Prix direct fournisseur', 'Clés sous votre contrôle', 'Compatible avec une configuration hybride'],
    monthlyTitle: 'Capacité mensuelle', monthlyPrice: '25 à 100 €', monthlyTag: 'Prévisible', monthlyBody: 'Un volume mensuel affecté à chaque Collaborateur IA pour ses missions régulières.', monthlyPoints: ['5, 10 ou 20 M de tokens', 'Budget récurrent lisible', 'Capacité ajustable'],
    explainTitle: 'Trois moyens de payer. Une seule politique de contrôle.', explainBody: 'Vous pouvez utiliser une capacité mensuelle pour le quotidien, des crédits prépayés pour les pointes et vos propres clés pour les fournisseurs déjà contractualisés.',
    order: 'Commander', finalA: 'Pas besoin de choisir seul.', finalB: 'Alma dimensionne avec vous.', finalBody: 'Décrivez la première mission. Alma estime le rythme, les formats et le niveau de capacité utile avant toute activation.', finalCta: 'Décrire ma mission', finalAlt: 'Voir les tarifs détaillés',
  },
  en: {
    eyebrow: 'AI models / Capacity', heroA: 'The right model.', heroB: 'Only when the work', heroC: 'requires it.', lead: 'Your AI Collaborator can use several model families under your organization rules. Choose monthly capacity, your own keys or prepaid credits.', primary: 'Choose capacity', secondary: 'Understand AI Gateway', ribbon: ['Multiple providers', 'One shared policy', 'Attributed costs', 'No imposed model'],
    catalogKicker: 'The model table', catalogTitle: 'A team of intelligences behind every AI Collaborator.', catalogBody: 'The family used may vary by mission, modality, budget and permissions. This selection is indicative: versions and availability evolve.', formats: [['Reason', Sparkles], ['See', Eye], ['Create images', ImageIcon], ['Listen and speak', Mic2], ['Code', Code2]] as const, gatewayLink: 'View routing and governance',
    capacityKicker: 'Monthly capacity', capacityTitle: 'Choose a pace, not a model.', capacityBody: 'Capacity follows the AI Collaborator. Adjust it without changing its identity, missions or validated experience.', workloadLabel: 'Estimate your work pace', workloads: { light: 'Light', daily: 'Daily', intensive: 'Intensive' }, capacities: { light: { name: 'Quarter-time', tokens: '5M', price: '€25', cadence: 'Light or recurring missions', note: 'Free through December 31, 2026' }, daily: { name: 'Half-time', tokens: '10M', price: '€50', cadence: 'Daily workload', note: 'Adjust at any time' }, intensive: { name: 'Full-time', tokens: '20M', price: '€100', cadence: 'Complex processes and high volumes', note: 'Adjust at any time' } }, perMonth: '/ month / AI Collaborator', tokensLabel: 'tokens per month', choose: 'Order', orderCapacity: 'Buy AI capacity',
    freedomKicker: 'Your way', freedomTitle: 'Monthly, prepaid or with your keys.', prepaidTitle: 'Prepaid credits', prepaidPrice: 'From €25', prepaidTag: 'No commitment', prepaidBody: 'Top up a balance for occasional needs, advanced models or image, audio and video usage. You only consume what missions use.', prepaidPoints: ['One-off top-up', 'Controlled budget', 'Complements monthly capacity'], byokTitle: 'BYOK', byokPrice: '€0 / month', byokTag: 'Your keys', byokBody: 'Connect your company API keys. Providers bill usage directly while Unitalk applies your access policies.', byokPoints: ['Direct provider price', 'Keys under your control', 'Works in a hybrid setup'], monthlyTitle: 'Monthly capacity', monthlyPrice: '€25 to €100', monthlyTag: 'Predictable', monthlyBody: 'A monthly volume assigned to each AI Collaborator for regular missions.', monthlyPoints: ['5, 10 or 20M tokens', 'Clear recurring budget', 'Adjustable capacity'], explainTitle: 'Three ways to pay. One control policy.', explainBody: 'Use monthly capacity for daily work, prepaid credits for peaks and your keys for providers you already contract with.',
    order: 'Order', finalA: 'You do not have to choose alone.', finalB: 'Alma sizes it with you.', finalBody: 'Describe the first mission. Alma estimates its pace, formats and useful capacity before activation.', finalCta: 'Describe my mission', finalAlt: 'View detailed pricing',
  },
} as const

export function ModelesIaContent() {
  const { lang } = useLanguage()
  const t = T[lang]
  const [workload, setWorkload] = useState<Workload>('light')
  const capacity = t.capacities[workload]

  return <main className="overflow-hidden bg-[#F3EFE6] font-sf text-[#1C1A17]">
    <section className="relative min-h-[740px] border-b border-[#D8D0C2] px-5 pb-16 pt-32 sm:px-8 sm:pt-40">
      <div aria-hidden className="absolute inset-0 opacity-[.045] [background-image:linear-gradient(#1C1A17_1px,transparent_1px),linear-gradient(90deg,#1C1A17_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="editorial-shell relative">
        <p className="font-mono text-[10px] font-black uppercase tracking-[.22em] text-[#B00C54]">{t.eyebrow}</p>
        <div className="mt-8 grid gap-12 lg:grid-cols-[1.25fr_.75fr] lg:items-end">
          <h1 className="max-w-[900px] text-[clamp(2.7rem,5.8vw,5.8rem)] font-semibold leading-[.94] tracking-[-.06em]"><span className="block">{t.heroA}</span><span className="block">{t.heroB}</span><span className="block text-[#D10E63]">{t.heroC}</span></h1>
          <div className="lg:pb-3"><p className="text-[17px] leading-8 text-[#4E483F]">{t.lead}</p><div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row"><a href="#capacite" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#181615] px-6 text-sm font-bold text-white">{t.primary}<ArrowDown className="ml-2 size-4" /></a><Link href="/ai-gateway" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#BFB5A5] bg-[#FAF8F3] px-6 text-sm font-bold">{t.secondary}</Link></div></div>
        </div>
        <div className="mt-16 grid border-y border-[#CFC5B5] sm:grid-cols-2 lg:grid-cols-4">{t.ribbon.map((item, index) => <p key={item} className="flex min-h-20 items-center gap-4 border-b border-[#CFC5B5] py-4 text-sm font-bold last:border-b-0 sm:border-r sm:[&:nth-child(2)]:border-r-0 lg:border-b-0 lg:[&:nth-child(2)]:border-r lg:last:border-r-0"><span className="font-mono text-[9px] text-[#B00C54]">0{index + 1}</span>{item}</p>)}</div>
      </div>
    </section>

    <section className="bg-[#181615] px-5 py-20 text-white sm:px-8 sm:py-28"><div className="editorial-shell"><div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr]"><SectionTitle dark kicker={t.catalogKicker} title={t.catalogTitle} /><div className="lg:pt-10"><p className="max-w-2xl text-[16px] leading-8 text-[#CFC6B8]">{t.catalogBody}</p><Link href="/ai-gateway#modeles" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#F2A4C5]">{t.gatewayLink}<ArrowRight className="size-4" /></Link></div></div>
      <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">{MODEL_FAMILIES.map((model, index) => <article key={model.name} className="group relative min-h-52 bg-[#211E1B] p-6 transition-colors hover:bg-[#292521]"><span aria-hidden className={`flex size-14 items-center justify-center rounded-full text-[#181615] ${model.tone}`}>{model.mark}</span><span className="absolute right-6 top-6 font-mono text-[9px] text-[#756E65]">{String(index + 1).padStart(2, '0')}</span><h3 className="mt-10 text-2xl font-semibold tracking-[-.03em]">{model.name}</h3><p className="mt-1 text-xs text-[#AFA397]">{model.maker}</p></article>)}</div>
      <div className="mt-10 flex flex-wrap gap-2">{t.formats.map(([label, Icon]) => <span key={label} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/15 px-4 text-xs font-bold text-[#D8D0C2]"><Icon className="size-4 text-[#F2A4C5]" />{label}</span>)}</div>
    </div></section>

    <section id="capacite" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28"><div className="editorial-shell"><div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr]"><SectionTitle kicker={t.capacityKicker} title={t.capacityTitle} /><div className="lg:pt-10"><p className="max-w-2xl text-[16px] leading-8 text-[#4E483F]">{t.capacityBody}</p><fieldset className="mt-8"><legend className="font-mono text-[9px] font-black uppercase tracking-[.18em] text-[#857C6E]">{t.workloadLabel}</legend><div className="mt-3 flex flex-wrap gap-2">{(Object.keys(t.workloads) as Workload[]).map((key) => <button key={key} type="button" aria-pressed={workload === key} onClick={() => setWorkload(key)} className={`min-h-11 rounded-full border px-5 text-sm font-bold transition-colors ${workload === key ? 'border-[#D10E63] bg-[#D10E63] text-white' : 'border-[#CFC5B5] bg-[#FAF8F3] text-[#4E483F] hover:border-[#D10E63]/50'}`}>{t.workloads[key]}</button>)}</div></fieldset></div></div>
      <div className="mt-14 grid overflow-hidden rounded-[2rem] border border-[#CFC5B5] bg-[#FAF8F3] shadow-[0_36px_80px_-60px_rgba(28,26,23,.7)] lg:grid-cols-[.75fr_1.25fr]"><div className="bg-[#D10E63] p-7 text-white sm:p-10"><p className="font-mono text-[10px] font-black uppercase tracking-[.2em] text-white/70">{capacity.name}</p><p className="mt-16 text-[clamp(4.5rem,10vw,8rem)] font-semibold leading-none tracking-[-.08em]">{capacity.tokens}</p><p className="mt-2 text-sm font-bold text-white/75">{t.tokensLabel}</p></div><div className="flex flex-col justify-between p-7 sm:p-10"><div><p className="text-[clamp(3rem,7vw,6rem)] font-semibold leading-none tracking-[-.07em]">{capacity.price}</p><p className="mt-3 text-sm font-bold text-[#6E665A]">{t.perMonth}</p><p className="mt-10 max-w-xl text-xl font-semibold leading-8">{capacity.cadence}</p><p className="mt-3 text-sm text-[#6E665A]">{capacity.note}</p></div><div className="mt-10 flex flex-col items-start gap-2"><Link href={`/commande?offre=capacite-${workload}`} className="inline-flex min-h-12 w-fit items-center justify-center rounded-full bg-[#181615] px-6 text-sm font-bold text-white">{t.choose}<ArrowRight className="ml-2 size-4" /></Link><span className="text-xs font-semibold text-[#6E665A]">{t.orderCapacity}</span></div></div></div>
    </div></section>

    <section className="border-y border-[#D8D0C2] bg-[#EAE3D4] px-5 py-20 sm:px-8 sm:py-28"><div className="editorial-shell"><SectionTitle kicker={t.freedomKicker} title={t.freedomTitle} /><div className="mt-14 grid gap-4 lg:grid-cols-3"><PaymentCard tag={t.prepaidTag} title={t.prepaidTitle} price={t.prepaidPrice} body={t.prepaidBody} points={t.prepaidPoints} cta={t.order} href="/commande?offre=credits-prepayes" featured icon={<WalletCards className="size-5" />} /><PaymentCard tag={t.monthlyTag} title={t.monthlyTitle} price={t.monthlyPrice} body={t.monthlyBody} points={t.monthlyPoints} cta={t.order} href="/commande?offre=capacite-mensuelle" /><PaymentCard tag={t.byokTag} title={t.byokTitle} price={t.byokPrice} body={t.byokBody} points={t.byokPoints} cta={t.order} href="/commande?offre=byok" /></div><div className="mt-5 grid gap-4 rounded-3xl border border-[#CFC5B5] bg-[#F3EFE6] p-6 sm:p-8 lg:grid-cols-[.75fr_1.25fr]"><h3 className="text-2xl font-semibold tracking-[-.035em]">{t.explainTitle}</h3><div><p className="text-sm leading-7 text-[#625B50]">{t.explainBody}</p><Link href="/commande?offre=capacite-ia" className="mt-5 inline-flex min-h-11 items-center rounded-full bg-[#181615] px-5 text-sm font-bold text-white">{t.orderCapacity}<ArrowRight className="ml-2 size-4" /></Link></div></div></div></section>

    <section className="bg-[#D10E63] px-5 py-20 text-white sm:px-8 sm:py-24"><div className="editorial-shell grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"><div><h2 className="max-w-5xl text-[clamp(2.7rem,6vw,6rem)] font-semibold leading-[.92] tracking-[-.065em]">{t.finalA}<br /><span className="text-white/70">{withAlmaAvatar(t.finalB)}</span></h2><p className="mt-7 max-w-2xl text-[17px] leading-8 text-white/80">{withAlmaAvatar(t.finalBody)}</p></div><div className="flex min-w-64 flex-col gap-3"><Link href="/decouvrir?source=modeles-ia" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#181615] px-7 text-sm font-bold text-white">{t.finalCta}<ArrowRight className="ml-2 size-4" /></Link><Link href="/tarifs" className="text-center text-sm font-bold text-white underline decoration-white/35 underline-offset-4">{t.finalAlt}</Link></div></div></section>
  </main>
}

function SectionTitle({ kicker, title, dark = false }: { kicker: string; title: string; dark?: boolean }) { return <div><p className={`font-mono text-[10px] font-black uppercase tracking-[.2em] ${dark ? 'text-[#F2A4C5]' : 'text-[#B00C54]'}`}>{kicker}</p><h2 className="mt-5 max-w-4xl text-[clamp(2.4rem,5vw,5rem)] font-semibold leading-[.95] tracking-[-.06em]">{title}</h2></div> }

function PaymentCard({ tag, title, price, body, points, cta, href, featured = false, icon }: { tag: string; title: string; price: string; body: string; points: readonly string[]; cta: string; href: string; featured?: boolean; icon?: ReactNode }) { return <article className={`relative flex min-h-[470px] flex-col rounded-3xl border p-7 ${featured ? 'border-[#D10E63] bg-[#D10E63] text-white shadow-[0_24px_55px_-35px_rgba(209,14,99,.8)]' : 'border-[#CFC5B5] bg-[#FAF8F3]'}`}><div className="flex items-center justify-between"><p className={`font-mono text-[9px] font-black uppercase tracking-[.18em] ${featured ? 'text-white/70' : 'text-[#B00C54]'}`}>{tag}</p>{icon}</div><h3 className="mt-10 text-2xl font-semibold">{title}</h3><p className="mt-3 text-[clamp(2.3rem,4vw,4.2rem)] font-semibold leading-none tracking-[-.06em]">{price}</p><p className={`mt-6 text-sm leading-7 ${featured ? 'text-white/80' : 'text-[#625B50]'}`}>{body}</p><ul className={`mt-auto space-y-3 border-t pt-6 text-sm font-semibold ${featured ? 'border-white/20' : 'border-[#D8D0C2]'}`}>{points.map((point) => <li key={point} className="flex gap-2.5"><Check className={`mt-0.5 size-4 shrink-0 ${featured ? 'text-white' : 'text-[#D10E63]'}`} />{point}</li>)}</ul><Link href={href} className={`mt-7 inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm font-bold ${featured ? 'bg-[#181615] text-white' : 'bg-[#D10E63] text-white'}`}>{cta}<ArrowRight className="ml-2 size-4" /></Link></article> }

function withAlmaAvatar(value: string) { return value.split('Alma').map((part, index) => <span key={`${part}-${index}`}>{index > 0 && <><AlmaFace />Alma</>}{part}</span>) }
