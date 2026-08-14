'use client'

import Link from 'next/link'
import { ArrowRight, BarChart3, Check, KeyRound, Network, Route, ShieldCheck, SlidersHorizontal } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { Kicker } from '@/components/home/section-kicker'

const COPY = {
  fr: {
    kicker: 'Unitalk AI Gateway',
    title: 'Un seul accès gouverné à vos modèles d’IA.',
    lead: 'Connectez les modèles autorisés de votre organisation derrière une interface commune. Unitalk AI Gateway applique les clés, budgets, règles et routes définis pour chaque Collaborateur IA et chaque mission.',
    primary: 'Configurer ma capacité IA',
    secondary: 'Parler à notre équipe',
    proofs: ['Crédits Unitalk ou BYOK', 'Plusieurs fournisseurs', 'Budgets et règles par organisation', 'Aucun modèle imposé'],
    flowKicker: 'Une couche de contrôle',
    flowTitle: 'La mission demande. Le Gateway autorise, route et mesure.',
    flow: [
      ['Mission', 'Le Collaborateur IA formule une requête selon son contexte et ses droits.'],
      ['Politique', 'Le Gateway vérifie les modèles autorisés, le budget et les règles applicables.'],
      ['Routage', 'La requête est envoyée vers le fournisseur ou le modèle configuré.'],
      ['Traçabilité', 'L’usage, le coût et le résultat technique sont attribués à la bonne organisation.'],
    ],
    capabilitiesKicker: 'Capacités',
    capabilitiesTitle: 'Changez de modèle sans reconstruire votre organisation.',
    capabilities: [
      ['API unifiée', 'Une interface compatible avec les usages OpenAI pour accéder à plusieurs fournisseurs.', Network],
      ['Routage contrôlé', 'Sélection explicite, priorités et stratégies de repli selon votre configuration.', Route],
      ['Clés virtuelles', 'Séparez les accès par organisation, usage, environnement ou application.', KeyRound],
      ['Budgets et quotas', 'Suivez et limitez la consommation selon les capacités et règles définies.', BarChart3],
      ['Garde-fous', 'Appliquez des politiques avant l’appel au modèle et encadrez les usages autorisés.', ShieldCheck],
      ['Configuration hybride', 'Combinez crédits Unitalk et clés propres sans imposer un fournisseur unique.', SlidersHorizontal],
    ],
    modesKicker: 'Choisissez votre modèle économique',
    modesTitle: 'Trois façons d’accéder aux modèles.',
    modes: [
      ['Crédits Unitalk', 'Unitalk gère l’accès et la consommation des modèles compatibles selon votre capacité.'],
      ['BYOK', 'Vous fournissez vos propres clés API et réglez directement l’usage auprès des fournisseurs.'],
      ['Hybride', 'Utilisez vos clés habituelles et des crédits Unitalk pour les besoins ponctuels ou modèles complémentaires.'],
    ],
    foundationKicker: 'Socle open source',
    foundationTitle: 'Basé sur LiteLLM. Intégré à la gouvernance Unitalk.',
    foundationBody: 'Unitalk AI Gateway s’appuie sur les composants open source de LiteLLM pour l’interface multimodèle et le proxy. Unitalk ajoute l’intégration aux Organisations, aux Collaborateurs IA, aux missions, aux capacités, aux crédits et aux règles de gouvernance.',
    foundationNote: 'Les composants open source de LiteLLM sont distribués sous licence MIT. Le répertoire enterprise de LiteLLM, lorsqu’il est utilisé, relève de conditions distinctes. LiteLLM et BerriAI sont des projets tiers indépendants de Unitalk.',
    litellm: 'Consulter LiteLLM et sa licence',
    finalTitle: 'Donnez à chaque mission le bon modèle, sous vos règles.',
    finalBody: 'Commencez avec les crédits Unitalk, vos propres clés ou une configuration hybride.',
    finalCta: 'Configurer sur la page Tarifs',
  },
  en: {
    kicker: 'Unitalk AI Gateway', title: 'One governed access point for your AI models.', lead: 'Connect your organization’s authorized models behind one common interface. Unitalk AI Gateway applies the keys, budgets, policies and routes defined for every AI Collaborator and mission.', primary: 'Configure AI capacity', secondary: 'Talk to our team', proofs: ['Unitalk credits or BYOK', 'Multiple providers', 'Organization budgets and policies', 'No imposed model'], flowKicker: 'A control layer', flowTitle: 'The mission requests. The Gateway authorizes, routes and measures.', flow: [['Mission', 'The AI Collaborator sends a request under its context and permissions.'], ['Policy', 'The Gateway checks authorized models, budget and applicable rules.'], ['Routing', 'The request is sent to the configured provider or model.'], ['Traceability', 'Usage, cost and technical result are attributed to the right organization.']], capabilitiesKicker: 'Capabilities', capabilitiesTitle: 'Change models without rebuilding your organization.', capabilities: [['Unified API', 'One OpenAI-compatible interface for multiple providers.', Network], ['Controlled routing', 'Explicit selection, priorities and fallback strategies.', Route], ['Virtual keys', 'Separate access by organization, usage, environment or application.', KeyRound], ['Budgets and quotas', 'Track and limit consumption under defined capacities and rules.', BarChart3], ['Guardrails', 'Apply policies before model calls and govern authorized uses.', ShieldCheck], ['Hybrid setup', 'Combine Unitalk credits and your own keys without one-provider lock-in.', SlidersHorizontal]], modesKicker: 'Choose your model', modesTitle: 'Three ways to access models.', modes: [['Unitalk credits', 'Unitalk manages access and consumption for compatible models under your capacity.'], ['BYOK', 'Provide your own API keys and pay providers directly.'], ['Hybrid', 'Use your usual keys plus Unitalk credits for occasional needs or complementary models.']], foundationKicker: 'Open-source foundation', foundationTitle: 'Based on LiteLLM. Integrated into Unitalk governance.', foundationBody: 'Unitalk AI Gateway uses LiteLLM open-source components for its multi-model interface and proxy. Unitalk adds Organizations, AI Collaborators, missions, capacities, credits and governance rules.', foundationNote: 'LiteLLM open-source components are distributed under the MIT License. LiteLLM enterprise-directory components, when used, have separate terms. LiteLLM and BerriAI are third-party projects independent from Unitalk.', litellm: 'View LiteLLM and its license', finalTitle: 'Give every mission the right model, under your rules.', finalBody: 'Start with Unitalk credits, your own keys or a hybrid configuration.', finalCta: 'Configure on Pricing',
  },
} as const

export function AiGatewayContent() {
  const { lang } = useLanguage()
  const t = COPY[lang]
  return <main className="bg-[#F3EFE6] font-sf text-[#1C1A17]">
    <section className="relative overflow-hidden px-5 pb-16 pt-28 sm:px-8 sm:pb-20"><div aria-hidden className="pointer-events-none absolute inset-0 opacity-[.04] [background-image:linear-gradient(#1C1A17_1px,transparent_1px),linear-gradient(90deg,#1C1A17_1px,transparent_1px)] [background-size:72px_72px]"/><div className="editorial-shell relative grid gap-12 lg:grid-cols-[1fr_.82fr] lg:items-center"><div><Kicker>{t.kicker}</Kicker><h1 className="hero-heading mt-5 max-w-4xl">{t.title}</h1><p className="mt-6 max-w-2xl text-[17px] leading-8 text-[#4E483F]">{t.lead}</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link href="/tarifs#configurateur" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#D10E63] px-7 text-sm font-bold text-white">{t.primary}<ArrowRight className="ml-2 size-4"/></Link><a href="mailto:hello@unitalk.ai?subject=Unitalk%20AI%20Gateway" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#D8D0C2] bg-[#FAF8F3] px-7 text-sm font-bold">{t.secondary}</a></div><ul className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-[#625B50]">{t.proofs.map(proof=><li key={proof} className="flex items-center gap-2"><Check className="size-4 text-[#D10E63]"/>{proof}</li>)}</ul></div><GatewayConsole lang={lang}/></div></section>
    <section className="border-y border-white/10 bg-[#181615] px-5 py-16 text-[#FAF8F3] sm:px-8 sm:py-20"><div className="editorial-shell"><Kicker dark>{t.flowKicker}</Kicker><h2 className="mt-5 max-w-4xl text-[34px] font-semibold leading-[1.06] tracking-[-.04em] sm:text-[44px]">{t.flowTitle}</h2><div className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">{t.flow.map(([title,body],index)=><article key={title} className="bg-[#211E1B] p-6"><p className="font-mono text-[10px] font-black text-[#F2A4C5]">0{index+1}</p><h3 className="mt-6 text-xl font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-[#CFC6B8]">{body}</p></article>)}</div></div></section>
    <section className="px-5 py-16 sm:px-8 sm:py-20"><div className="editorial-shell"><Kicker>{t.capabilitiesKicker}</Kicker><h2 className="mt-5 max-w-4xl text-[34px] font-semibold leading-[1.06] tracking-[-.04em] sm:text-[44px]">{t.capabilitiesTitle}</h2><div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{t.capabilities.map(([title,body,Icon])=><article key={title as string} className="rounded-3xl border border-[#D8D0C2] bg-[#FAF8F3] p-6"><Icon className="size-5 text-[#D10E63]"/><h3 className="mt-7 text-xl font-bold">{title}</h3><p className="mt-3 text-sm leading-7 text-[#625B50]">{body}</p></article>)}</div></div></section>
    <section className="border-y border-[#D8D0C2] bg-[#EAE3D4] px-5 py-16 sm:px-8 sm:py-20"><div className="editorial-shell"><Kicker>{t.modesKicker}</Kicker><h2 className="mt-5 text-[34px] font-semibold tracking-[-.04em] sm:text-[44px]">{t.modesTitle}</h2><div className="mt-10 grid gap-4 md:grid-cols-3">{t.modes.map(([title,body],index)=><article key={title} className={`rounded-3xl border p-6 ${index===2?'border-[#D10E63] bg-[#181615] text-white':'border-[#D8D0C2] bg-[#FAF8F3]'}`}><h3 className="text-xl font-bold">{title}</h3><p className={`mt-3 text-sm leading-7 ${index===2?'text-[#CFC6B8]':'text-[#625B50]'}`}>{body}</p></article>)}</div></div></section>
    <section className="px-5 py-16 sm:px-8 sm:py-20"><div className="editorial-shell rounded-3xl border border-[#D8D0C2] bg-[#FAF8F3] p-7 sm:p-10"><Kicker>{t.foundationKicker}</Kicker><h2 className="mt-5 max-w-4xl text-[34px] font-semibold leading-[1.06] tracking-[-.04em] sm:text-[44px]">{t.foundationTitle}</h2><p className="mt-5 max-w-4xl text-[16px] leading-8 text-[#4E483F]">{t.foundationBody}</p><p className="mt-5 max-w-4xl rounded-2xl bg-[#EAE3D4] p-5 text-xs leading-6 text-[#625B50]">{t.foundationNote}</p><a href="https://github.com/BerriAI/litellm" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#B00C54]">{t.litellm}<ArrowRight className="size-4"/></a></div></section>
    <section className="bg-[#D10E63] px-5 py-16 text-white sm:px-8"><div className="editorial-shell flex flex-col justify-between gap-8 lg:flex-row lg:items-end"><div><h2 className="max-w-4xl text-[36px] font-semibold leading-[1.02] tracking-[-.045em] sm:text-[52px]">{t.finalTitle}</h2><p className="mt-5 text-[17px] text-white/80">{t.finalBody}</p></div><Link href="/tarifs#configurateur" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-[#181615] px-7 text-sm font-bold text-white">{t.finalCta}<ArrowRight className="ml-2 size-4"/></Link></div></section>
  </main>
}

function GatewayConsole({ lang }: { lang: 'fr'|'en' }) { const fr=lang==='fr'; return <aside className="rounded-3xl border border-white/10 bg-[#181615] p-6 text-[#FAF8F3] shadow-[0_30px_70px_-35px_rgba(0,0,0,.6)]"><div className="flex items-center justify-between border-b border-white/10 pb-4"><p className="font-mono text-[10px] font-bold uppercase tracking-[.16em] text-[#F2A4C5]">Gateway policy</p><span className="rounded-full bg-[#22C55E]/10 px-2.5 py-1 text-[9px] font-bold text-[#22C55E]">ACTIVE</span></div><dl className="mt-5 space-y-4 text-sm"><Row label={fr?'Mission':'Mission'} value={fr?'Analyser les contrats entrants':'Analyze inbound contracts'}/><Row label={fr?'Modèles autorisés':'Allowed models'} value="Claude · GPT · Mistral"/><Row label={fr?'Règle de route':'Routing rule'} value={fr?'Qualité puis coût':'Quality then cost'}/><Row label={fr?'Budget':'Budget'} value="4,20 € / mission"/><Row label={fr?'Repli':'Fallback'} value={fr?'Activé':'Enabled'}/></dl><div className="mt-6 rounded-2xl border border-[#D10E63]/30 bg-[#D10E63]/10 p-4 text-xs leading-6 text-[#E7E0D5]">{fr?'Une seule politique relie mission, modèle, budget et organisation.':'One policy connects mission, model, budget and organization.'}</div></aside> }
function Row({label,value}:{label:string;value:string}){return <div className="flex justify-between gap-4 border-b border-white/10 pb-3"><dt className="text-[#AFA397]">{label}</dt><dd className="text-right font-bold">{value}</dd></div>}
