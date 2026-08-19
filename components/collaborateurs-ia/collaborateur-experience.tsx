'use client'

import Link from 'next/link'
import {
  ArrowDown,
  ArrowRight,
  Braces,
  Check,
  ShieldCheck,
} from 'lucide-react'
import { ApplicationLogos, IdentityCard, ModelLogos } from '@/components/collaborateur-content'
import { useLanguage } from '@/lib/language-context'
import { ROLE_DETAILS } from '@/lib/collaborators-catalog'

const LEA = ROLE_DETAILS.lea
const LEA_APPLICATIONS = ['Notion', 'Canva', 'WordPress', 'LinkedIn', 'Analytics', 'Gmail'] as const

export function CollaborateurExperience() {
  const { lang } = useLanguage()
  const t = COPY[lang]

  return (
    <main className="overflow-hidden bg-[#F3EFE6] font-sf text-[#191715]">
      <section className="relative min-h-[92svh] border-b border-[#191715] pt-24 sm:pt-32">
        <div aria-hidden className="absolute inset-0 opacity-[.055] [background-image:linear-gradient(#191715_1px,transparent_1px),linear-gradient(90deg,#191715_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="editorial-shell relative flex min-h-[calc(92svh-6rem)] flex-col pb-8">
          <div className="flex items-center justify-between border-b border-[#191715] pb-4 font-mono text-[10px] font-bold uppercase tracking-[.16em]">
            <span>{t.eyebrow}</span>
            <span>Hermes × Unitalk</span>
          </div>
          <h1 className="mt-8 max-w-[1060px] text-[clamp(3.7rem,9.5vw,9rem)] font-semibold leading-[.79] tracking-[-.085em]">
            {t.heroLine1}<br />
            <span className="text-[#D10E63]">{t.heroLine2}</span>
          </h1>
          <div className="mt-auto grid gap-8 pt-14 lg:grid-cols-[1fr_1fr] lg:items-end">
            <div>
              <p className="max-w-xl text-[clamp(1.15rem,2vw,1.65rem)] font-medium leading-[1.35] tracking-[-.025em]">{t.heroBody}</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href="/marketplace" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#D10E63] px-6 text-sm font-bold text-white outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2">{t.marketCta}<ArrowRight className="size-4" /></Link>
                <Link href="/missions?composer=1&source=collaborateurs-ia-hero" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#191715] px-6 text-sm font-bold outline-none hover:bg-[#191715] hover:text-white focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2">{t.missionCta}<ArrowRight className="size-4" /></Link>
              </div>
            </div>
            <div className="flex items-end justify-between border-l border-[#191715] pl-5 sm:pl-8">
              <p className="max-w-sm text-sm leading-7 text-[#5B544B]">{t.heroNote}</p>
              <a href="#anatomie" aria-label={t.discover} className="ml-5 grid size-12 shrink-0 place-items-center rounded-full bg-[#191715] text-white outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2"><ArrowDown className="size-4" /></a>
            </div>
          </div>
        </div>
      </section>

      <section aria-label={t.formulaLabel} className="border-b border-[#191715] bg-[#D10E63] py-5 text-white">
        <div className="editorial-shell flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center font-mono text-xs font-bold uppercase tracking-[.12em] sm:text-sm">
          <span>Hermes</span><span aria-hidden>+</span><span>Unitalk</span><span aria-hidden>=</span><span>{t.formulaResult}</span><span aria-hidden className="text-white/50">·</span><span className="text-white/75">{t.formulaMarket}</span>
        </div>
      </section>

      <section id="anatomie" className="scroll-mt-20 bg-[#191715] py-20 text-white sm:py-28">
        <div className="editorial-shell">
          <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
            <div>
              <p className="font-mono text-[11px] font-bold uppercase tracking-[.18em] text-[#F2A4C5]">01 · {t.hermesKicker}</p>
              <h2 className="mt-6 text-[clamp(3.5rem,7vw,7rem)] font-semibold leading-[.82] tracking-[-.075em]">{t.hermesTitle}</h2>
            </div>
            <div className="border-l border-white/20 pl-6 sm:pl-9">
              <p className="max-w-2xl text-[19px] leading-9 text-[#D8D0C5]">{t.hermesBody}</p>
              <Link href="/documentation/licence-collaborateur-ia" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#F2A4C5] outline-none focus-visible:ring-2 focus-visible:ring-[#F2A4C5]">{t.hermesLink}<ArrowRight className="size-4" /></Link>
            </div>
          </div>

          <div className="relative mt-16 border border-white/20 p-4 sm:p-8 lg:p-12">
            <div aria-hidden className="absolute inset-0 opacity-[.07] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:18px_18px]" />
            <div className="relative grid gap-3 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <SystemNode number="01" title={t.nodes.mission[0]} body={t.nodes.mission[1]} />
                <SystemNode number="02" title={t.nodes.context[0]} body={t.nodes.context[1]} />
              </div>
              <div className="relative mx-auto my-6 grid size-64 place-items-center rounded-full border border-[#F2A4C5]/40 bg-[#D10E63] text-center shadow-[0_0_100px_rgba(209,14,99,.28)] sm:size-72 lg:mx-10">
                <div><Braces className="mx-auto size-8" /><p className="mt-4 font-mono text-[10px] font-bold uppercase tracking-[.2em] text-white/65">{t.coreLabel}</p><p className="mt-2 text-5xl font-semibold tracking-[-.06em]">Hermes</p><p className="mx-auto mt-3 max-w-40 text-xs leading-5 text-white/75">{t.core}</p></div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <SystemNode number="03" title={t.nodes.plan[0]} body={t.nodes.plan[1]} />
                <SystemNode number="04" title={t.nodes.action[0]} body={t.nodes.action[1]} />
              </div>
            </div>
          </div>
          <p className="mt-8 max-w-4xl text-[clamp(1.8rem,4vw,3.6rem)] font-semibold leading-[1.02] tracking-[-.05em]">{t.hermesConclusion}</p>
        </div>
      </section>

      <section className="border-b border-[#191715] py-20 sm:py-28">
        <div className="editorial-shell">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
            <div><p className="font-mono text-[11px] font-bold uppercase tracking-[.18em] text-[#B00C54]">02 · Unitalk</p><h2 className="mt-6 text-[clamp(3.5rem,7vw,7rem)] font-semibold leading-[.82] tracking-[-.075em]">{t.unitalkTitle}</h2></div>
            <p className="max-w-xl border-l border-[#191715] pl-6 text-[18px] leading-8 text-[#514A42] sm:pl-9">{t.unitalkBody}</p>
          </div>
          <div className="mt-16 grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-center">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[.18em] text-[#B00C54]">{t.identityExample}</p>
              <h3 className="mt-5 text-[clamp(2.4rem,4.5vw,4.5rem)] font-semibold leading-[.92] tracking-[-.06em]">{t.identityTitle}</h3>
              <p className="mt-6 max-w-lg text-[16px] leading-8 text-[#514A42]">{t.identityBody}</p>
            </div>
            <div className="min-w-0">
              <IdentityCard detail={LEA} lang={lang} labels={t.identityCard} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#D10E63] py-20 text-white sm:py-28">
        <div className="editorial-shell">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[.18em] text-white/60">03 · Workspace</p>
          <h2 className="mt-6 max-w-5xl text-[clamp(3.4rem,7.5vw,7.5rem)] font-semibold leading-[.82] tracking-[-.08em]">{t.workspaceTitle}</h2>
          <div className="mt-14 grid border border-white/35 lg:grid-cols-[1fr_1.25fr_1fr]">
            <WorkspaceColumn label={t.humanLabel} title={t.humanTitle} body={t.humanBody} />
            <div className="border-y border-white/35 bg-[#191715] p-7 lg:border-x lg:border-y-0 sm:p-10">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[.16em] text-[#F2A4C5]">{t.sharedWorkspace}</p>
              <div className="mt-10 space-y-4">{t.workspaceItems.map((item) => <div key={item} className="flex items-center gap-3 border-b border-white/15 pb-4 text-sm font-semibold"><Check className="size-4 text-[#F2A4C5]" />{item}</div>)}</div>
            </div>
            <WorkspaceColumn label={t.aiLabel} title={t.aiTitle} body={t.aiBody} />
          </div>
          <p className="mt-10 max-w-4xl text-[clamp(1.6rem,3.2vw,3rem)] font-semibold leading-tight tracking-[-.04em]">{t.workspaceConclusion}</p>
        </div>
      </section>

      <section className="border-b border-[#191715] bg-[#E8E0D2] py-20 sm:py-28">
        <div className="editorial-shell">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div><p className="font-mono text-[11px] font-bold uppercase tracking-[.18em] text-[#B00C54]">04 · Marketplace</p><h2 className="mt-6 text-[clamp(3.3rem,6.5vw,6.5rem)] font-semibold leading-[.84] tracking-[-.075em]">{t.marketTitle}</h2></div>
            <p className="max-w-2xl text-[18px] leading-8 text-[#514A42]">{t.marketBody}</p>
          </div>
          <div className="mt-14 grid gap-px overflow-hidden rounded-[26px] border border-[#CFC5B5] bg-[#CFC5B5] lg:grid-cols-2">
            <Link href="/marketplace#applications" className="group bg-[#FAF8F3] p-6 outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-[#D10E63] sm:p-8">
              <p className="font-mono text-[10px] font-black uppercase tracking-[.18em] text-[#B00C54]">{t.appsKicker}</p>
              <h3 className="mt-5 text-[clamp(2.15rem,3.2vw,3.35rem)] font-bold leading-[.98] tracking-[-.045em]">{t.appsTitle}</h3>
              <p className="mt-5 text-[15px] font-medium leading-7 text-[#625B50]">{t.appsBody}</p>
              <ApplicationLogos apps={LEA_APPLICATIONS} />
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#B00C54]">{t.exploreApps}<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span>
            </Link>
            <Link href="/marketplace#modeles-ia" className="group bg-[#181615] p-6 text-white outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-[#F2A4C5] sm:p-8">
              <p className="font-mono text-[10px] font-black uppercase tracking-[.18em] text-[#F2A4C5]">Unitalk AI Gateway</p>
              <h3 className="mt-5 text-[clamp(2.15rem,3.2vw,3.35rem)] font-bold leading-[.98] tracking-[-.045em]">{t.modelsTitle}</h3>
              <p className="mt-5 text-[15px] font-medium leading-7 text-[#CFC6B8]">{t.modelsBody}</p>
              <ModelLogos />
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#F2A4C5]">{t.exploreModels}<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span>
            </Link>
          </div>
          <p className="mt-4 font-mono text-[10px] leading-5 text-[#6B6359]">{t.catalogNote}</p>
          <p className="mt-10 max-w-5xl text-[clamp(2rem,4.5vw,4.5rem)] font-semibold leading-[.98] tracking-[-.055em]">{t.marketConclusion}</p>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="editorial-shell">
          <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr] lg:items-end">
            <div><p className="font-mono text-[11px] font-bold uppercase tracking-[.18em] text-[#B00C54]">05 · {t.proofKicker}</p><h2 className="mt-6 text-[clamp(3rem,5.5vw,5.5rem)] font-semibold leading-[.88] tracking-[-.065em]">{t.proofTitle}</h2></div>
            <p className="max-w-2xl text-[18px] leading-8 text-[#514A42]">{t.proofBody}</p>
          </div>
          <div className="mt-14 border border-[#191715]">
            <div className="grid border-b border-[#191715] lg:grid-cols-[.7fr_1.3fr]">
              <div className="bg-[#191715] p-7 text-white sm:p-9"><p className="font-mono text-[10px] font-bold uppercase tracking-[.16em] text-[#F2A4C5]">{t.exampleLabel}</p><h3 className="mt-7 text-3xl font-semibold tracking-[-.045em]">{t.exampleMission}</h3><p className="mt-4 text-sm leading-7 text-[#BEB4A8]">{t.exampleRule}</p></div>
              <ol className="grid sm:grid-cols-3">{t.proofSteps.map((step, index) => <li key={step[0]} className="border-b border-[#191715] p-6 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"><span className="font-mono text-[10px] font-bold text-[#B00C54]">0{index + 1} · {step[0]}</span><h4 className="mt-8 text-xl font-semibold">{step[1]}</h4><p className="mt-3 text-sm leading-6 text-[#5B544B]">{step[2]}</p></li>)}</ol>
            </div>
            <div className="grid lg:grid-cols-[.7fr_1.3fr]">
              <div className="border-b border-[#191715] bg-[#D10E63] p-7 text-white lg:border-b-0 lg:border-r sm:p-9"><p className="font-mono text-[10px] font-bold uppercase tracking-[.16em] text-white/65">{t.decisionLabel}</p><p className="mt-5 text-2xl font-semibold tracking-[-.035em]">{t.decisionQuestion}</p><span className="mt-6 inline-flex rounded-full bg-white px-4 py-2 text-xs font-bold text-[#B00C54]">{t.decisionStatus}</span></div>
              <div className="grid sm:grid-cols-3">{t.guarantees.map((item) => <div key={item[0]} className="border-b border-[#191715] p-6 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"><ShieldCheck className="size-5 text-[#D10E63]"/><h4 className="mt-6 font-semibold">{item[0]}</h4><p className="mt-2 text-xs leading-5 text-[#5B544B]">{item[1]}</p></div>)}</div>
            </div>
          </div>
          <p className="mt-6 text-xs leading-6 text-[#6B6359]">{t.demoNote}</p>
        </div>
      </section>

      <section className="bg-[#191715] py-20 text-white sm:py-28">
        <div className="editorial-shell">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[.18em] text-[#F2A4C5]">{t.finalKicker}</p>
          <h2 className="mt-6 max-w-6xl text-[clamp(3.5rem,8vw,8rem)] font-semibold leading-[.8] tracking-[-.08em]">{t.finalTitle}</h2>
          <p className="mt-8 max-w-2xl text-[18px] leading-8 text-[#C8BEB2]">{t.finalBody}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/marketplace" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#D10E63] px-7 text-sm font-bold outline-none focus-visible:ring-2 focus-visible:ring-[#F2A4C5]">{t.marketCta}<ArrowRight className="size-4" /></Link>
            <Link href="/missions?composer=1&source=collaborateurs-ia" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-white/25 px-7 text-sm font-bold outline-none hover:border-white/60 focus-visible:ring-2 focus-visible:ring-[#F2A4C5]">{t.missionCta}<ArrowRight className="size-4" /></Link>
          </div>
        </div>
      </section>
    </main>
  )
}

function SystemNode({ number, title, body }: { number: string; title: string; body: string }) {
  return <div className="min-h-36 border border-white/15 bg-[#211E1B] p-5"><span className="font-mono text-[10px] font-bold text-[#F2A4C5]">{number}</span><h3 className="mt-5 font-semibold">{title}</h3><p className="mt-2 text-xs leading-5 text-[#AFA397]">{body}</p></div>
}

function WorkspaceColumn({ label, title, body }: { label: string; title: string; body: string }) {
  return <div className="p-7 sm:p-10"><p className="font-mono text-[10px] font-bold uppercase tracking-[.16em] text-white/60">{label}</p><h3 className="mt-10 text-3xl font-semibold tracking-[-.04em]">{title}</h3><p className="mt-5 text-sm leading-7 text-white/75">{body}</p></div>
}

const COPY = {
  fr: {
    eyebrow:'Manifeste · Collaborateurs IA', heroLine1:'Un agent sait agir.', heroLine2:'Un Collaborateur sait travailler avec vous.', heroBody:'Hermes transforme un objectif en actions. Unitalk en fait un travail partagé : une identité, un Workspace humain + IA, une mémoire commune et des règles claires.', heroNote:'Les modèles et les applications peuvent changer. Le Collaborateur, son histoire et sa relation avec votre équipe demeurent.', discover:'Découvrir son anatomie', formulaLabel:'Formule du Collaborateur IA', formulaResult:'Collaborateur IA', formulaMarket:'La Marketplace étend ses capacités',
    hermesKicker:'Le cœur agentique', hermesTitle:'Hermes conduit le travail.', hermesBody:'Hermes est le moteur open source de chaque Collaborateur IA. Il reçoit un objectif, comprend le contexte, construit un plan, mobilise les ressources autorisées et avance jusqu’à un résultat vérifiable.', hermesLink:'Découvrir la licence et l’architecture', coreLabel:'Cœur agentique', core:'Raisonner · planifier · agir', nodes:{mission:['Mission','Un objectif et un résultat attendu.'],context:['Contexte','Les informations utiles et autorisées.'],plan:['Plan de travail','Les étapes sont construites et adaptées.'],action:['Actions','Les outils sont mobilisés dans le cadre défini.']}, hermesConclusion:'Hermes donne l’autonomie. Unitalk la rend collaborative.',
    unitalkTitle:'Unitalk crée la relation.', unitalkBody:'Unitalk ne pose pas un avatar sur un agent. La plateforme lui donne une existence professionnelle et un cadre commun pour travailler avec les humains dans la durée.', identityExample:'Exemple · Léa', identityTitle:'Une identité propre. Des accès propres.', identityBody:'Léa illustre ce que reçoit chaque Collaborateur IA : une identité rattachée à votre entreprise, une supervision humaine, des canaux professionnels, une mémoire et un environnement privé.', identityCard:{header:'Carte d’identité de votre Collaborateur IA',owner:'Propriétaire',supervisor:'Supervision humaine',communication:'Canaux professionnels',memory:'Mémoire propre',shared:'Savoir de l’entreprise',execution:'Environnement privé',governance:'Accès et actions gouvernés par votre entreprise'},
    workspaceTitle:'Le travail sort de la boîte de dialogue.', humanLabel:'Humains', humanTitle:'Décident et transmettent', humanBody:'Votre équipe confie le résultat attendu, partage le contexte, suit le travail et arbitre les décisions sensibles.', aiLabel:'Collaborateur IA', aiTitle:'Prépare et accomplit', aiBody:'Le Collaborateur organise la mission, produit les livrables, signale les blocages et demande les validations nécessaires.', sharedWorkspace:'Workspace partagé', workspaceItems:['Missions et résultats attendus','Contexte et mémoire commune','Travail visible et traçable','Demandes de validation','Livrables et décisions'], workspaceConclusion:'Même espace. Même contexte. Des responsabilités différentes.',
    marketTitle:'Ses capacités se composent.', marketBody:'La Marketplace étend les capacités du Collaborateur sans toucher à son identité. Voici l’équipement de Léa : ses applications autorisées et les modèles accessibles sous les règles de l’entreprise.', appsKicker:'Applications autorisées', appsTitle:'Léa travaille dans votre environnement métier.', appsBody:'Connectez uniquement les outils utiles à sa mission, avec les droits que vous décidez.', exploreApps:'Voir les applications', modelsTitle:'Le bon modèle. Sous vos règles.', modelsBody:'Léa utilise uniquement les modèles autorisés par votre entreprise, dans les limites du budget défini.', exploreModels:'Voir les modèles IA', catalogNote:'Exemple de configuration. La disponibilité dépend du fournisseur, de votre offre, de vos droits et des connexions effectivement autorisées.', marketConclusion:'Ses ressources évoluent. Son identité demeure.',
    proofKicker:'Une mission, concrètement', proofTitle:'Le travail avance. La décision reste humaine.', proofBody:'Un Collaborateur ne reçoit pas carte blanche. La mission relie un résultat attendu, des ressources autorisées et les décisions que votre équipe doit valider.', exampleLabel:'Démonstration fictive · Mission SALES-014', exampleMission:'Qualifier les prospects entrants', exampleRule:'Hugo peut analyser les demandes et préparer le CRM. Aucun premier contact ne part sans validation.', proofSteps:[['Observer','Demandes reçues','34 entreprises sont examinées selon vos critères.'],['Préparer','Résultat produit','9 fiches qualifiées et leurs messages sont prêts.'],['Signaler','Décision requise','Le travail s’arrête avant l’action engageante.']], decisionLabel:'Validation humaine', decisionQuestion:'Autoriser le premier contact pour ces 9 prospects ?', decisionStatus:'En attente de votre décision', guarantees:[['Périmètre','Un résultat et des limites explicites.'],['Accès','Seulement les ressources attribuées.'],['Trace','Sources, actions et décisions conservées.']], demoNote:'Cette démonstration illustre le fonctionnement du Workspace. Les actions disponibles dépendent de votre configuration et de vos droits.',
    finalKicker:'Hermes sait accomplir le travail. Unitalk lui permet de travailler avec vous.', finalTitle:'Plus qu’un agent. Une place dans votre équipe.', finalBody:'Composez ses capacités dans la Marketplace ou partez d’un travail réel. Alma vous aide à cadrer la première mission et le Collaborateur adapté.', marketCta:'Explorer la Marketplace', missionCta:'Confier une première mission',
  },
  en: {
    eyebrow:'Manifesto · AI Collaborators', heroLine1:'An agent knows how to act.', heroLine2:'A Collaborator knows how to work with you.', heroBody:'Hermes turns an objective into action. Unitalk makes it shared work: an identity, a human + AI Workspace, common memory and clear rules.', heroNote:'Models and applications can change. The Collaborator, its history and its relationship with your team remain.', discover:'Discover its anatomy', formulaLabel:'AI Collaborator formula', formulaResult:'AI Collaborator', formulaMarket:'The Marketplace extends its capabilities',
    hermesKicker:'The agentic core', hermesTitle:'Hermes drives the work.', hermesBody:'Hermes is the open-source engine inside every AI Collaborator. It receives an objective, understands context, builds a plan, uses authorized resources and advances toward a verifiable result.', hermesLink:'Explore the license and architecture', coreLabel:'Agentic core', core:'Reason · plan · act', nodes:{mission:['Mission','An objective and expected outcome.'],context:['Context','Useful, authorized information.'],plan:['Work plan','Steps are built and adapted.'],action:['Actions','Tools are used within the defined scope.']}, hermesConclusion:'Hermes provides autonomy. Unitalk makes it collaborative.',
    unitalkTitle:'Unitalk creates the relationship.', unitalkBody:'Unitalk does not simply place an avatar on an agent. The platform gives it a professional existence and a shared framework for long-term work with people.', identityExample:'Example · Léa', identityTitle:'Its own identity. Its own access.', identityBody:'Léa illustrates what every AI Collaborator receives: an identity attached to your organization, human supervision, professional channels, memory and a private environment.', identityCard:{header:'Your AI Collaborator identity card',owner:'Owning organization',supervisor:'Human supervision',communication:'Professional channels',memory:'Own memory',shared:'Organization knowledge',execution:'Private environment',governance:'Access and actions governed by your organization'},
    workspaceTitle:'Work moves beyond the chat box.', humanLabel:'People', humanTitle:'Decide and provide direction', humanBody:'Your team entrusts the expected outcome, shares context, follows the work and arbitrates sensitive decisions.', aiLabel:'AI Collaborator', aiTitle:'Prepare and deliver', aiBody:'The Collaborator organizes the mission, produces deliverables, flags blockers and requests the necessary approvals.', sharedWorkspace:'Shared Workspace', workspaceItems:['Missions and expected outcomes','Shared context and memory','Visible, traceable work','Approval requests','Deliverables and decisions'], workspaceConclusion:'Same space. Same context. Different responsibilities.',
    marketTitle:'Its capabilities are composable.', marketBody:'The Marketplace extends the Collaborator’s capabilities without changing its identity. Here is Léa’s equipment: authorized applications and models available under organization rules.', appsKicker:'Authorized applications', appsTitle:'Léa works in your business environment.', appsBody:'Connect only the tools useful to the mission, with the permissions you decide.', exploreApps:'View applications', modelsTitle:'The right model. Under your rules.', modelsBody:'Léa only uses models authorized by your organization, within the defined budget.', exploreModels:'View AI models', catalogNote:'Example configuration. Availability depends on the provider, your plan, permissions and connections actually authorized.', marketConclusion:'Its resources evolve. Its identity remains.',
    proofKicker:'A mission, in practice', proofTitle:'Work moves forward. The decision stays human.', proofBody:'A Collaborator is not given carte blanche. The mission connects an expected outcome, authorized resources and the decisions your team must approve.', exampleLabel:'Fictional demo · Mission SALES-014', exampleMission:'Qualify inbound prospects', exampleRule:'Hugo can analyze requests and prepare the CRM. No first contact is sent without approval.', proofSteps:[['Observe','Requests received','34 companies are reviewed against your criteria.'],['Prepare','Outcome produced','9 qualified records and their messages are ready.'],['Flag','Decision required','Work stops before the binding action.']], decisionLabel:'Human approval', decisionQuestion:'Authorize first contact for these 9 prospects?', decisionStatus:'Waiting for your decision', guarantees:[['Scope','An explicit outcome and limits.'],['Access','Only assigned resources.'],['Trace','Sources, actions and decisions retained.']], demoNote:'This demo illustrates how the Workspace operates. Available actions depend on your configuration and permissions.',
    finalKicker:'Hermes knows how to do the work. Unitalk lets it work with you.', finalTitle:'More than an agent. A place on your team.', finalBody:'Compose its capabilities in the Marketplace or start from real work. Alma helps scope the first mission and the right Collaborator.', marketCta:'Explore the Marketplace', missionCta:'Entrust a first mission',
  },
} as const
