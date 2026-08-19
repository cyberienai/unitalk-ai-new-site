'use client'

import Link from 'next/link'
import { ArrowDown, ArrowRight, Braces, MessagesSquare, ShieldCheck } from 'lucide-react'
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
      <section className="relative min-h-[86svh] border-b border-[#191715] pt-24 sm:pt-32">
        <div aria-hidden className="absolute inset-0 opacity-[.05] [background-image:linear-gradient(#191715_1px,transparent_1px),linear-gradient(90deg,#191715_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="editorial-shell relative flex min-h-[calc(86svh-6rem)] flex-col pb-10">
          <div className="flex items-center justify-between border-b border-[#191715] pb-4 font-mono text-[10px] font-bold uppercase tracking-[.16em]"><span>{t.eyebrow}</span><span>Hermes × Unitalk</span></div>
          <h1 className="mt-8 max-w-[1080px] text-[clamp(3.5rem,9vw,8.5rem)] font-semibold leading-[.8] tracking-[-.08em]">{t.heroLine1}<br /><span className="text-[#D10E63]">{t.heroLine2}</span></h1>
          <div className="mt-auto grid gap-8 pt-12 lg:grid-cols-2 lg:items-end">
            <p className="max-w-xl text-[clamp(1.1rem,2vw,1.55rem)] font-medium leading-[1.4] tracking-[-.02em]">{t.heroBody}</p>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Link href="/missions?composer=1&source=collaborateurs-ia-hero" className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-[#D10E63] px-7 text-sm font-bold text-white outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2">{t.missionCta}<ArrowRight className="size-4" /></Link>
              <a href="#comprendre" className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-[#191715] px-7 text-sm font-bold outline-none hover:bg-[#191715] hover:text-white focus-visible:ring-2 focus-visible:ring-[#D10E63]">{t.understand}<ArrowDown className="size-4" /></a>
            </div>
          </div>
        </div>
      </section>

      <section id="comprendre" className="scroll-mt-20 bg-[#191715] py-20 text-white sm:py-24">
        <div className="editorial-shell">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[.18em] text-[#F2A4C5]">01 · {t.anatomyKicker}</p>
          <h2 className="mt-6 max-w-5xl text-[clamp(3rem,6vw,6rem)] font-semibold leading-[.86] tracking-[-.07em]">{t.anatomyTitle}</h2>
          <div className="mt-14 grid gap-px border border-white/15 bg-white/15 lg:grid-cols-3">
            <Layer icon={Braces} number="01" title="Hermes" body={t.hermes} accent />
            <Layer icon={MessagesSquare} number="02" title="Unitalk" body={t.unitalk} />
            <Layer icon={ShieldCheck} number="03" title="Workspace" body={t.workspace} />
          </div>
          <p className="mt-8 max-w-4xl text-[clamp(1.7rem,3vw,3rem)] font-semibold leading-tight tracking-[-.045em]">{t.anatomyConclusion}</p>
        </div>
      </section>

      <section className="border-b border-[#191715] py-20 sm:py-24">
        <div className="editorial-shell grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:items-center">
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[.18em] text-[#B00C54]">02 · {t.identityKicker}</p>
            <h2 className="mt-6 text-[clamp(3rem,5.5vw,5.5rem)] font-semibold leading-[.88] tracking-[-.065em]">{t.identityTitle}</h2>
            <p className="mt-6 max-w-lg text-[16px] leading-8 text-[#514A42]">{t.identityBody}</p>
          </div>
          <div className="min-w-0"><IdentityCard detail={LEA} lang={lang} labels={t.identityCard} compact /></div>
        </div>
      </section>

      <section className="bg-[#E8E0D2] py-20 sm:py-24">
        <div className="editorial-shell">
          <div className="grid gap-8 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
            <div><p className="font-mono text-[11px] font-bold uppercase tracking-[.18em] text-[#B00C54]">03 · Marketplace</p><h2 className="mt-6 text-[clamp(3rem,5.5vw,5.5rem)] font-semibold leading-[.88] tracking-[-.065em]">{t.equipmentTitle}</h2></div>
            <p className="max-w-xl text-[17px] leading-8 text-[#514A42]">{t.equipmentBody}</p>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-[24px] border border-[#CFC5B5] bg-[#CFC5B5] lg:grid-cols-2">
            <article className="bg-[#FAF8F3] p-6 sm:p-8">
              <p className="font-mono text-[10px] font-black uppercase tracking-[.18em] text-[#B00C54]">{t.appsKicker}</p>
              <h3 className="mt-4 text-3xl font-bold tracking-[-.045em]">{t.appsTitle}</h3>
              <ApplicationLogos apps={LEA_APPLICATIONS} limit={4} />
              <Link href="/marketplace#applications" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#B00C54]">{t.exploreApps}<ArrowRight className="size-4" /></Link>
            </article>
            <article className="bg-[#181615] p-6 text-white sm:p-8">
              <p className="font-mono text-[10px] font-black uppercase tracking-[.18em] text-[#F2A4C5]">Unitalk AI Gateway</p>
              <h3 className="mt-4 text-3xl font-bold tracking-[-.045em]">{t.modelsTitle}</h3>
              <ModelLogos limit={4} />
              <Link href="/marketplace#modeles-ia" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#F2A4C5]">{t.exploreModels}<ArrowRight className="size-4" /></Link>
            </article>
          </div>
          <p className="mt-4 text-xs leading-6 text-[#6B6359]">{t.catalogNote}</p>
        </div>
      </section>

      <section className="border-y border-[#191715] py-20 sm:py-24">
        <div className="editorial-shell">
          <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
            <div><p className="font-mono text-[11px] font-bold uppercase tracking-[.18em] text-[#B00C54]">04 · {t.proofKicker}</p><h2 className="mt-6 text-[clamp(3rem,5.5vw,5.5rem)] font-semibold leading-[.88] tracking-[-.065em]">{t.proofTitle}</h2></div>
            <p className="max-w-xl text-[17px] leading-8 text-[#514A42]">{t.proofBody}</p>
          </div>
          <div className="mt-12 grid border border-[#191715] lg:grid-cols-[.72fr_1.28fr]">
            <div className="bg-[#191715] p-7 text-white sm:p-9"><p className="font-mono text-[10px] font-bold uppercase tracking-[.16em] text-[#F2A4C5]">{t.hugoExample}</p><h3 className="mt-7 text-3xl font-semibold tracking-[-.045em]">{t.mission}</h3><p className="mt-4 text-sm leading-7 text-[#BEB4A8]">{t.missionRule}</p></div>
            <div>
              <ol className="grid border-b border-[#191715] sm:grid-cols-3">{t.steps.map((step, index) => <li key={step[0]} className="border-b border-[#191715] p-6 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"><span className="font-mono text-[10px] font-bold text-[#B00C54]">0{index + 1}</span><h4 className="mt-6 font-semibold">{step[0]}</h4><p className="mt-2 text-xs leading-5 text-[#5B544B]">{step[1]}</p></li>)}</ol>
              <div className="bg-[#D10E63] p-6 text-white"><p className="font-mono text-[10px] font-bold uppercase tracking-[.16em] text-white/65">{t.approval}</p><p className="mt-3 text-xl font-semibold">{t.question}</p><span className="mt-5 inline-flex rounded-full bg-white px-4 py-2 text-xs font-bold text-[#B00C54]">{t.waiting}</span></div>
            </div>
          </div>
          <p className="mt-4 text-xs leading-6 text-[#6B6359]">{t.demoNote}</p>
        </div>
      </section>

      <section className="bg-[#191715] py-20 text-white sm:py-24">
        <div className="editorial-shell grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div><p className="font-mono text-[11px] font-bold uppercase tracking-[.18em] text-[#F2A4C5]">{t.finalKicker}</p><h2 className="mt-6 max-w-5xl text-[clamp(3.3rem,7vw,7rem)] font-semibold leading-[.82] tracking-[-.075em]">{t.finalTitle}</h2></div>
          <div className="flex min-w-64 flex-col gap-3"><Link href="/missions?composer=1&source=collaborateurs-ia" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#D10E63] px-7 text-sm font-bold">{t.missionCta}<ArrowRight className="size-4" /></Link><Link href="/marketplace" className="text-center text-sm font-bold text-[#F2A4C5] underline decoration-white/20 underline-offset-4">{t.marketCta}</Link></div>
        </div>
      </section>
    </main>
  )
}

function Layer({ icon: Icon, number, title, body, accent = false }: { icon: typeof Braces; number: string; title: string; body: string; accent?: boolean }) {
  return <article className={`min-h-72 p-7 sm:p-8 ${accent ? 'bg-[#D10E63]' : 'bg-[#211E1B]'}`}><div className="flex items-center justify-between"><Icon className="size-6 text-[#F2A4C5]"/><span className="font-mono text-[10px] font-bold text-white/50">{number}</span></div><h3 className="mt-16 text-3xl font-semibold">{title}</h3><p className={`mt-4 text-sm leading-7 ${accent ? 'text-white/80' : 'text-[#BEB4A8]'}`}>{body}</p></article>
}

const COPY = {
  fr: {
    eyebrow:'Collaborateurs IA', heroLine1:'Un agent sait agir.', heroLine2:'Un Collaborateur sait travailler avec vous.', heroBody:'Hermes conduit le travail. Unitalk lui donne une identité, un espace commun avec votre équipe et des règles claires.', understand:'Comprendre', missionCta:'Confier une première mission', marketCta:'Explorer la Marketplace',
    anatomyKicker:'Trois couches, un Collaborateur', anatomyTitle:'L’autonomie devient un travail d’équipe.', hermes:'Le moteur open source qui comprend l’objectif, construit un plan et mobilise les ressources autorisées.', unitalk:'L’identité, la mémoire et les moyens de communication qui inscrivent le Collaborateur dans la durée.', workspace:'L’espace où humains et IA partagent le contexte, suivent le travail et valident les décisions.', anatomyConclusion:'Hermes donne l’autonomie. Unitalk la rend collaborative.',
    identityKicker:'Exemple · Léa', identityTitle:'Une identité qui reste.', identityBody:'Léa illustre la configuration professionnelle d’un Collaborateur IA. Son responsable peut changer ; son identité, sa mémoire et son historique restent dans l’entreprise.', identityCard:{header:'Carte d’identité de votre Collaborateur IA',owner:'Propriétaire',supervisor:'Supervision humaine',communication:'Canaux professionnels',memory:'Mémoire propre',shared:'Savoir de l’entreprise',execution:'Environnement privé',governance:'Accès et actions gouvernés par votre entreprise'},
    equipmentTitle:'Changez ses outils. Pas son identité.', equipmentBody:'Applications et modèles sont des ressources remplaçables. La Marketplace permet de les attribuer selon chaque mission et vos règles.', appsKicker:'Applications autorisées', appsTitle:'Léa agit dans vos outils.', exploreApps:'Toutes les applications', modelsTitle:'Le modèle adapté au travail.', exploreModels:'Tous les modèles IA', catalogNote:'Exemple de configuration de Léa. Disponibilité selon votre offre, vos fournisseurs, vos connexions et vos droits.',
    proofKicker:'Autre exemple · Hugo', proofTitle:'Il prépare. Vous décidez.', proofBody:'Une mission définit le résultat, les ressources autorisées et le moment où une décision humaine est obligatoire.', hugoExample:'Démonstration fictive · Hugo', mission:'Qualifier les prospects entrants', missionRule:'Hugo analyse les demandes et prépare le CRM. Aucun premier contact ne part sans validation.', steps:[['Analyser','34 entreprises examinées.'],['Préparer','9 fiches et messages prêts.'],['S’arrêter','Premier contact bloqué.']], approval:'Validation humaine', question:'Autoriser le premier contact pour ces 9 prospects ?', waiting:'En attente de votre décision', demoNote:'Démonstration illustrative. Les actions disponibles dépendent de votre configuration et de vos droits.',
    finalKicker:'Commencez par le travail', finalTitle:'Quelle mission voulez-vous faire avancer ?',
  },
  en: {
    eyebrow:'AI Collaborators', heroLine1:'An agent knows how to act.', heroLine2:'A Collaborator knows how to work with you.', heroBody:'Hermes drives the work. Unitalk gives it an identity, a shared space with your team and clear rules.', understand:'Understand', missionCta:'Entrust a first mission', marketCta:'Explore the Marketplace',
    anatomyKicker:'Three layers, one Collaborator', anatomyTitle:'Autonomy becomes teamwork.', hermes:'The open-source engine that understands the objective, builds a plan and uses authorized resources.', unitalk:'The identity, memory and communication tools that give the Collaborator continuity.', workspace:'The space where people and AI share context, follow work and approve decisions.', anatomyConclusion:'Hermes provides autonomy. Unitalk makes it collaborative.',
    identityKicker:'Example · Léa', identityTitle:'An identity that remains.', identityBody:'Léa illustrates the professional configuration of an AI Collaborator. The supervisor may change; identity, memory and history remain within the organization.', identityCard:{header:'Your AI Collaborator identity card',owner:'Owning organization',supervisor:'Human supervision',communication:'Professional channels',memory:'Own memory',shared:'Organization knowledge',execution:'Private environment',governance:'Access and actions governed by your organization'},
    equipmentTitle:'Change its tools. Not its identity.', equipmentBody:'Applications and models are replaceable resources. The Marketplace lets you assign them according to each mission and your rules.', appsKicker:'Authorized applications', appsTitle:'Léa acts in your tools.', exploreApps:'All applications', modelsTitle:'The right model for the work.', exploreModels:'All AI models', catalogNote:'Example Léa configuration. Availability depends on your plan, providers, connections and permissions.',
    proofKicker:'Another example · Hugo', proofTitle:'He prepares. You decide.', proofBody:'A mission defines the outcome, authorized resources and the point where a human decision is mandatory.', hugoExample:'Fictional demo · Hugo', mission:'Qualify inbound prospects', missionRule:'Hugo analyzes requests and prepares the CRM. No first contact is sent without approval.', steps:[['Analyze','34 companies reviewed.'],['Prepare','9 records and messages ready.'],['Stop','First contact blocked.']], approval:'Human approval', question:'Authorize first contact for these 9 prospects?', waiting:'Waiting for your decision', demoNote:'Illustrative demo. Available actions depend on your configuration and permissions.',
    finalKicker:'Start from the work', finalTitle:'What mission do you want to move forward?',
  },
} as const
