'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, Check, ShieldCheck } from 'lucide-react'
import { Kicker } from '@/components/home/section-kicker'
import { useLanguage, type Lang } from '@/lib/language-context'

type HelpKey = 'mission' | 'collaborator' | 'adoption'

const HELP_KEYS: HelpKey[] = ['mission', 'collaborator', 'adoption']

export function AlmaFinalContent() {
  const { lang } = useLanguage()
  const t = COPY[lang]
  const [active, setActive] = useState<HelpKey>('mission')
  const help = t.help[active]

  return (
    <main className="overflow-hidden bg-[#F3EFE6] font-sf text-[#1C1A17]">
      <section className="relative px-5 pb-16 pt-28 sm:px-8 sm:pb-20">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(#1C1A17_1px,transparent_1px),linear-gradient(90deg,#1C1A17_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="editorial-shell relative grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
          <div className="max-w-xl">
            <Kicker>{t.kicker}</Kicker>
            <h1 className="hero-heading mt-5 whitespace-pre-line">{t.title}</h1>
            <p className="mt-5 text-lg font-semibold text-[#B00C54]">{t.role}</p>
            <p className="mt-5 text-[17px] leading-8 text-[#4E483F]">{t.lead}</p>
            <p className="mt-4 text-[15px] leading-7 text-[#4E483F]">{t.boundary}</p>
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Link href="/decouvrir?source=nav" className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#D10E63] px-7 text-[15px] font-bold text-white shadow-[0_12px_30px_-10px_rgba(209,14,99,.55)] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2">
                {t.primaryCta}<ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a href="#alma-work" className="text-sm font-bold text-[#4E483F] underline decoration-[#D10E63]/30 underline-offset-4 hover:text-[#B00C54]">{t.secondaryCta}</a>
            </div>
            <p className="mt-5 text-xs font-medium text-[#6E665A]">{t.reassurance}</p>
          </div>

          <AlmaIdentity lang={lang} />
        </div>
      </section>

      <section id="alma-work" className="border-y border-[#DED6C8] bg-[#FAF8F3] px-5 py-16 sm:px-8">
        <div className="editorial-shell">
          <Kicker>{t.workKicker}</Kicker>
          <h2 className="mt-5 max-w-3xl text-balance text-[34px] font-semibold leading-[1.06] tracking-[-0.04em] sm:text-[44px]">{t.workTitle}</h2>
          <p className="mt-5 max-w-3xl text-[16px] leading-8 text-[#4E483F]">{t.workLead}</p>

          <div role="tablist" aria-label={t.tabLabel} className="scrollbar-hide mt-9 flex gap-2 overflow-x-auto pb-1">
            {HELP_KEYS.map(key => (
              <button key={key} type="button" role="tab" aria-selected={active === key} aria-controls={`alma-panel-${key}`} onClick={() => setActive(key)} className={`h-10 shrink-0 rounded-full border px-4 text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] ${active === key ? 'border-[#D10E63] bg-[#D10E63] text-white' : 'border-[#D8D0C2] bg-white text-[#4E483F]'}`}>
                {t.helpLabels[key]}
              </button>
            ))}
          </div>
          <div id={`alma-panel-${active}`} role="tabpanel" className="mt-6 grid gap-px overflow-hidden rounded-[18px] border border-[#DED6C8] bg-[#DED6C8] lg:grid-cols-3">
            <WorkStep number="01" label={t.request} value={help.request} />
            <WorkStep number="02" label={t.preparation} value={help.preparation} />
            <WorkStep number="03" label={t.result} value={help.result} />
          </div>
        </div>
      </section>

      <section className="bg-[#181615] px-5 py-16 text-[#FAF8F3] sm:px-8 sm:py-20">
        <div className="editorial-shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#F2A4C5]">{t.decisionKicker}</p>
            <h2 className="mt-5 text-balance text-[34px] font-semibold leading-[1.06] tracking-[-0.04em] sm:text-[44px]">{t.decisionTitle}</h2>
            <p className="mt-5 text-[16px] leading-8 text-[#CFC6B8]">{t.decisionLead}</p>
          </div>
          <div className="space-y-4">
            {t.decisions.map(item => <div key={item} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5"><span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#D10E63]"><Check className="size-4" /></span><p className="pt-0.5 text-sm leading-7 text-[#E7E0D5]">{item}</p></div>)}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-20">
        <div className="editorial-shell grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div>
            <Kicker>{t.identityKicker}</Kicker>
            <h2 className="mt-5 max-w-xl text-balance text-[34px] font-semibold leading-[1.06] tracking-[-0.04em] sm:text-[44px]">{t.identityTitle}</h2>
            <p className="mt-5 text-[16px] leading-8 text-[#4E483F]">{t.identityLead}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <BoundaryCard title={t.publicTitle} items={t.publicItems} />
            <BoundaryCard title={t.privateTitle} items={t.privateItems} />
          </div>
        </div>
      </section>

      <section className="border-t border-[#DED6C8] bg-[#EAE3D4] px-5 py-16 sm:px-8 sm:py-20">
        <div className="editorial-shell flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#B00C54]">{t.finalKicker}</p>
            <h2 className="mt-5 text-balance text-[36px] font-semibold leading-[1.04] tracking-[-0.04em] sm:text-[48px]">{t.finalTitle}</h2>
            <p className="mt-5 max-w-2xl text-[17px] leading-8 text-[#4E483F]">{t.finalLead}</p>
            <p className="mt-5 text-sm font-semibold">Alma · {t.roleShort}</p>
          </div>
          <div className="flex flex-col items-start gap-4 lg:items-end">
            <Link href="/decouvrir?source=nav" className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-[#D10E63] px-7 text-sm font-bold text-white">
              {t.finalCta}<ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link href="/missions" className="text-sm font-bold text-[#4E483F] underline decoration-[#D10E63]/30 underline-offset-4">{t.missionsCta}</Link>
          </div>
        </div>
      </section>
    </main>
  )
}

function AlmaIdentity({ lang }: { lang: Lang }) {
  const t = COPY[lang]
  return <article className="overflow-hidden rounded-[18px] border border-[#DED6C8] bg-[#FAF8F3] shadow-[0_24px_70px_-50px_rgba(28,26,23,.55)]"><div className="grid sm:grid-cols-[0.9fr_1.1fr]"><div className="relative min-h-[320px] bg-[#DED6C8] sm:min-h-[430px]"><Image src="/alma-avatar.png" alt={t.portraitAlt} fill priority sizes="(max-width: 640px) 100vw, 300px" className="object-cover object-top" /></div><div className="p-6 sm:p-7"><div className="flex items-center justify-between gap-3"><p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#B00C54]">{t.verified}</p><span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#257A43]"><span className="size-2 rounded-full bg-[#2E9E5B]" />{t.active}</span></div><h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em]">Alma</h2><p className="mt-2 text-sm font-semibold">{t.role}</p><dl className="mt-7 border-t border-[#DED6C8]"><Fact label={t.includedLabel} value={t.includedValue} /><Fact label={t.organizationLabel} value="Unitalk" /><Fact label={t.natureLabel} value={t.natureValue} /><Fact label={t.supervisionLabel} value="Patrick Chassany" /></dl></div></div></article>
}

function Fact({ label, value }: { label: string; value: string }) { return <div className="border-b border-[#DED6C8] py-3"><dt className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[#857C6E]">{label}</dt><dd className="mt-1.5 text-sm font-semibold">{value}</dd></div> }
function WorkStep({ number, label, value }: { number: string; label: string; value: string }) { return <div className="bg-[#F3EFE6] p-6"><p className="font-mono text-[10px] font-bold text-[#B00C54]">{number} · {label}</p><p className="mt-5 text-[17px] font-semibold leading-7">{value}</p></div> }
function BoundaryCard({ title, items }: { title: string; items: readonly string[] }) { return <article className="rounded-[18px] border border-[#DED6C8] bg-[#FAF8F3] p-6"><ShieldCheck className="size-5 text-[#D10E63]" /><h3 className="mt-5 text-xl font-semibold">{title}</h3><ul className="mt-5 space-y-3">{items.map(item => <li key={item} className="flex gap-3 text-sm leading-6 text-[#4E483F]"><Check className="mt-1 size-4 shrink-0 text-[#D10E63]" />{item}</li>)}</ul></article> }

const COPY = {
  fr: {
    kicker:'Alma · Unitalk', title:'Commencez par le travail.\nAlma prépare la suite.', role:'Coordinatrice de missions · Profil inclus', roleShort:'Coordinatrice de missions', lead:'Alma vous aide à transformer un besoin en mission claire, puis à préparer le Collaborateur IA, les savoir-faire, les applications et les validations nécessaires pour l’accomplir.', boundary:'Elle ne devient pas votre Collaboratrice IA et ne crée pas une nouvelle identité par défaut. Elle cherche d’abord comment faire progresser celles qui existent déjà.', primaryCta:'Commencer avec Alma', secondaryCta:'Voir comment elle travaille', reassurance:'Inscription sans mission choisie · 7 jours d’essai · Aucune carte bancaire',
    portraitAlt:'Portrait professionnel d’Alma', verified:'Identité IA vérifiée', active:'En activité', includedLabel:'Profil inclus', includedValue:'Coordinatrice de missions', organizationLabel:'Organisation', natureLabel:'Nature', natureValue:'Intelligence artificielle', supervisionLabel:'Créée et supervisée par',
    workKicker:'Du besoin à la mission', workTitle:'Alma clarifie avant de configurer.', workLead:'Elle part du résultat attendu, des méthodes de l’entreprise et des décisions qui doivent rester humaines. La technologie vient ensuite.', tabLabel:'Types d’accompagnement Alma', helpLabels:{mission:'Préparer une mission',collaborator:'Faire évoluer un Collaborateur IA',adoption:'Préparer l’adoption'}, request:'Votre besoin', preparation:'Ce qu’Alma prépare', result:'Ce que vous obtenez', help:{mission:{request:'Un travail à confier, encore imprécis.',preparation:'Résultat attendu, contexte, règles, sources et validations humaines.',result:'Une mission structurée, prête à personnaliser.'},collaborator:{request:'Une responsabilité nouvelle ou une capacité manquante.',preparation:'Profil métier, compétences, applications et droits utiles.',result:'Le même Collaborateur IA, équipé pour une nouvelle responsabilité lorsque c’est pertinent.'},adoption:{request:'Une équipe qui doit intégrer l’IA dans son travail réel.',preparation:'Parcours, règles d’usage, points de contrôle et besoins de formation.',result:'Un cadre d’adoption explicite, progressif et supervisé.'}},
    decisionKicker:'Faire progresser avant de créer', decisionTitle:'Une nouvelle mission ne signifie pas une nouvelle identité.', decisionLead:'Alma examine d’abord les Collaborateurs IA déjà présents et les responsabilités qu’ils peuvent assumer.', decisions:['Réutiliser une identité existante lorsque son rattachement et son contexte sont adaptés.','Ajouter un profil métier lorsqu’une responsabilité durable apparaît.','Ajouter une compétence lorsqu’une méthode réutilisable manque.','Demander une validation humaine avant toute action qui engage l’entreprise.'],
    identityKicker:'Profil professionnel public', identityTitle:'Une présence publique. Un travail privé par défaut.', identityLead:'Cette page présente la fonction d’Alma et ce qu’elle peut faire au nom de Unitalk. Elle n’expose ni sa mémoire, ni ses missions internes, ni les informations privées auxquelles elle pourrait avoir accès.', publicTitle:'Visible publiquement', publicItems:['Son identité IA et son rattachement à Unitalk','Son profil de Coordinatrice de missions','Les méthodes et limites présentées sur cette page'], privateTitle:'Reste privé', privateItems:['Ses conversations et missions internes','Les documents, budgets et infrastructures de Unitalk','Tout contexte d’entreprise non explicitement partagé'],
    finalKicker:'Première étape', finalTitle:'Vous n’avez pas besoin d’avoir déjà choisi une mission.', finalLead:'Créez votre compte, présentez votre entreprise et décrivez le travail qui compte. Alma vous aide ensuite à choisir ou construire la première mission.', finalCta:'Commencer sans mission choisie', missionsCta:'Explorer d’abord les missions',
  },
  en: {
    kicker:'Alma · Unitalk', title:'Start with the work.\nAlma prepares what comes next.', role:'Mission coordinator · Included profile', roleShort:'Mission coordinator', lead:'Alma helps turn a need into a clear mission, then prepares the AI Collaborator, know-how, applications and approvals required to accomplish it.', boundary:'She does not become your AI Collaborator and does not create a new identity by default. She first looks for ways to develop those that already exist.', primaryCta:'Start with Alma', secondaryCta:'See how she works', reassurance:'Sign up without a selected mission · 7-day trial · No credit card',
    portraitAlt:'Professional portrait of Alma', verified:'Verified AI identity', active:'Active', includedLabel:'Included profile', includedValue:'Mission coordinator', organizationLabel:'Organization', natureLabel:'Nature', natureValue:'Artificial intelligence', supervisionLabel:'Created and supervised by',
    workKicker:'From need to mission', workTitle:'Alma clarifies before configuring.', workLead:'She starts from the expected result, company methods and decisions that must remain human. Technology comes next.', tabLabel:'Alma support types', helpLabels:{mission:'Prepare a mission',collaborator:'Develop an AI Collaborator',adoption:'Prepare adoption'}, request:'Your need', preparation:'What Alma prepares', result:'What you get', help:{mission:{request:'Work to delegate that is still unclear.',preparation:'Expected result, context, rules, sources and human approvals.',result:'A structured mission ready to personalize.'},collaborator:{request:'A new responsibility or missing capability.',preparation:'The useful job profile, skills, applications and permissions.',result:'The same AI Collaborator equipped for a new responsibility when relevant.'},adoption:{request:'A team that needs to integrate AI into real work.',preparation:'A journey, usage rules, checkpoints and training needs.',result:'An explicit, progressive and supervised adoption framework.'}},
    decisionKicker:'Develop before creating', decisionTitle:'A new mission does not mean a new identity.', decisionLead:'Alma first examines the AI Collaborators already present and the responsibilities they can assume.', decisions:['Reuse an existing identity when its organization and context fit.','Add a job profile when a lasting responsibility appears.','Add a skill when a reusable method is missing.','Request human approval before any action that commits the company.'],
    identityKicker:'Public professional profile', identityTitle:'A public presence. Private work by default.', identityLead:'This page presents Alma’s role and what she can do on behalf of Unitalk. It exposes neither her memory, internal missions nor private information she may access.', publicTitle:'Publicly visible', publicItems:['Her AI identity and Unitalk affiliation','Her Mission coordinator profile','The methods and limits presented here'], privateTitle:'Remains private', privateItems:['Her internal conversations and missions','Unitalk documents, budgets and infrastructure','Any company context not explicitly shared'],
    finalKicker:'First step', finalTitle:'You do not need to have selected a mission yet.', finalLead:'Create your account, introduce your company and describe the work that matters. Alma then helps select or build the first mission.', finalCta:'Start without a selected mission', missionsCta:'Explore missions first',
  },
} as const
