'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Check, Cloud, DatabaseBackup, KeyRound, RefreshCw, Server, ShieldCheck } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

export function HermesContent() {
  const { lang } = useLanguage()
  const t = COPY[lang]

  return (
    <main className="overflow-hidden bg-[#F3EFE6] font-sf text-[#191715]">
      <section className="hero-viewport relative flex items-center overflow-hidden border-b border-[#CFC5B5] pb-14 pt-24 sm:pb-16 sm:pt-28">
        <div aria-hidden className="absolute inset-0 opacity-[.04] [background-image:linear-gradient(#191715_1px,transparent_1px),linear-gradient(90deg,#191715_1px,transparent_1px)] [background-size:64px_64px]"/>
        <div aria-hidden className="absolute -right-32 -top-24 size-[36rem] rounded-full bg-[#D10E63]/[.07] blur-3xl"/>
        <div className="editorial-shell relative grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div className="max-w-2xl">
            <h1 className="text-balance text-center text-[clamp(2.7rem,5.8vw,5.6rem)] font-semibold leading-[.88] tracking-[-.068em] sm:text-left">{t.title}<span className="block text-[#D10E63]">{t.accent}</span></h1>
            <p className="mx-auto mt-5 max-w-xl text-center text-sm font-bold text-[#B00C54] sm:mx-0 sm:text-left">{t.identification}</p>
            <p className="mx-auto mt-3 max-w-xl text-balance text-center text-base leading-8 text-[#4E483F] sm:mx-0 sm:text-left md:text-lg">{t.lead}</p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row"><Link href="/decouvrir?source=hermes" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#D10E63] px-7 text-sm font-bold text-white">{t.primary}<ArrowRight className="ml-2 size-4"/></Link><Link href="/marketplace/serveurs-ia" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#191715] px-7 text-sm font-bold">{t.secondary}</Link></div>
            <p className="mt-5 text-center text-xs font-semibold leading-5 text-[#766D61] sm:text-left">{t.heroNote}</p>
          </div>
          <OperationsConsole t={t} />
        </div>
      </section>

      <section className="border-b border-[#CFC5B5] bg-[#FAF8F3] py-16 sm:py-24">
        <div className="editorial-shell">
          <SectionHeading kicker={t.layersKicker} title={t.layersTitle} body={t.layersBody}/>
          <div className="mt-12 grid gap-px overflow-hidden rounded-[24px] border border-[#CFC5B5] bg-[#CFC5B5] lg:grid-cols-3">
            {t.layers.map(([title,body], index) => <article key={title} className="bg-[#F3EFE6] p-7 sm:p-8"><span className="font-mono text-[10px] font-black text-[#B00C54]">0{index + 1}</span><h3 className="mt-8 text-2xl font-semibold tracking-[-.035em]">{title}</h3><p className="mt-4 text-sm leading-7 text-[#625B50]">{body}</p></article>)}
          </div>
        </div>
      </section>

      <section id="services" className="bg-[#191715] py-16 text-white sm:py-24">
        <div className="editorial-shell">
          <SectionHeading kicker={t.operationsKicker} title={t.operationsTitle} body={t.operationsBody} dark/>
          <div className="mt-12 grid gap-px overflow-hidden rounded-[24px] border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">
            {t.operations.map(([title,body],index)=>{const Icon=[RefreshCw,ShieldCheck,DatabaseBackup,Cloud][index];return <article key={title} className="min-h-56 bg-[#211E1B] p-7"><Icon className="size-6 text-[#F2A4C5]"/><h3 className="mt-8 text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-7 text-[#BEB4A8]">{body}</p></article>})}
          </div>
          <p className="mt-6 max-w-4xl border-l border-[#D10E63] pl-5 text-xs leading-6 text-[#AFA397]">{t.serviceNote}</p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-xs font-bold text-[#F2A4C5]"><Link href="/architecture" className="underline decoration-white/20 underline-offset-4">{t.architectureLink}</Link><Link href="/confidentialite" className="underline decoration-white/20 underline-offset-4">{t.privacyLink}</Link><Link href="/conditions" className="underline decoration-white/20 underline-offset-4">{t.conditionsLink}</Link></div>
        </div>
      </section>

      <section id="responsabilites" className="border-b border-[#CFC5B5] bg-[#FAF8F3] py-16 sm:py-24">
        <div className="editorial-shell">
          <SectionHeading kicker={t.responsibilityKicker} title={t.responsibilityTitle} body={t.responsibilityBody}/>
          <div className="mt-12 overflow-hidden rounded-[24px] border border-[#CFC5B5] lg:grid lg:grid-cols-2">
            <ResponsibilityColumn title={t.unitalkTitle} icon={Cloud} items={t.unitalkItems} dark />
            <ResponsibilityColumn title={t.companyTitle} icon={KeyRound} items={t.companyItems} />
          </div>
        </div>
      </section>

      <section className="bg-[#E8E0D2] py-16 sm:py-24">
        <div className="editorial-shell">
          <SectionHeading kicker={t.choiceKicker} title={t.choiceTitle} body={t.choiceBody}/>
          <div className="mt-12 grid overflow-hidden rounded-[24px] border border-[#CFC5B5] lg:grid-cols-2">
            <article className="bg-[#FAF8F3] p-7 sm:p-9"><Cloud className="size-7 text-[#B00C54]"/><h3 className="mt-8 text-3xl font-semibold">Unitalk AI Cloud</h3><p className="mt-4 text-sm leading-7 text-[#4E483F]">{t.cloud}</p></article>
            <article className="border-t border-[#CFC5B5] bg-[#F3EFE6] p-7 sm:p-9 lg:border-l lg:border-t-0"><Server className="size-7 text-[#B00C54]"/><h3 className="mt-8 text-3xl font-semibold">{t.providerTitle}</h3><p className="mt-4 text-sm leading-7 text-[#4E483F]">{t.provider}</p><Link href="/marketplace/serveurs-ia" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#B00C54]">{t.serversCta}<ArrowRight className="size-4"/></Link></article>
          </div>
        </div>
      </section>

      <section className="border-y border-[#191715] bg-[#F3EFE6] py-16 sm:py-24">
        <div className="editorial-shell">
          <SectionHeading kicker={t.portabilityKicker} title={t.portabilityTitle} body={t.portabilityBody}/>
          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            <article className="rounded-[24px] bg-[#191715] p-7 text-white sm:p-9"><p className="font-mono text-[10px] font-black uppercase tracking-[.17em] text-[#F2A4C5]">{t.exportLabel}</p><h3 className="mt-5 text-3xl font-semibold">{t.exportTitle}</h3><ul className="mt-6 space-y-3">{t.exportItems.map(item => <li key={item} className="flex gap-3 text-sm leading-6 text-[#D8D0C5]"><Check className="mt-1 size-4 shrink-0 text-[#F2A4C5]"/>{item}</li>)}</ul></article>
            <article className="rounded-[24px] border border-[#CFC5B5] bg-[#FAF8F3] p-7 sm:p-9"><p className="font-mono text-[10px] font-black uppercase tracking-[.17em] text-[#B00C54]">{t.limitLabel}</p><h3 className="mt-5 text-3xl font-semibold">{t.limitTitle}</h3><p className="mt-5 text-sm leading-7 text-[#625B50]">{t.limitBody}</p></article>
          </div>
        </div>
      </section>

      <section className="bg-[#D10E63] py-16 text-white sm:py-24"><div className="editorial-shell grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="font-mono text-[10px] font-black uppercase tracking-[.18em] text-white/65">{t.finalKicker}</p><h2 className="mt-5 max-w-4xl text-balance text-[clamp(2.4rem,5vw,4.8rem)] font-semibold leading-[.92] tracking-[-.06em]">{t.finalTitle}</h2><p className="mt-6 max-w-2xl text-[16px] leading-8 text-white/80">{t.finalBody}</p></div><div className="flex min-w-64 flex-col gap-3"><Link href="/decouvrir?source=hermes-final" className="inline-flex min-h-13 items-center justify-center rounded-full bg-[#191715] px-7 text-sm font-bold">{t.finalCta}<ArrowRight className="ml-2 size-4"/></Link><Link href="/marketplace/serveurs-ia" className="text-center text-sm font-bold underline decoration-white/35 underline-offset-4">{t.serversCta}</Link></div></div></section>
    </main>
  )
}

function OperationsConsole({ t }: { t: typeof COPY.fr | typeof COPY.en }) {
  return <aside aria-label={t.consoleLabel} className="mx-auto w-full max-w-md"><div className="overflow-hidden rounded-[28px] bg-[#181615] text-white shadow-[0_35px_90px_-32px_rgba(0,0,0,.65)]"><div className="flex items-center justify-between border-b border-white/10 px-6 py-4"><div className="flex items-center gap-3"><Image src="/images/hermes-agent-logo.webp" alt="" width={38} height={38} className="size-9 rounded-lg object-cover"/><div><p className="text-sm font-bold">Hermes · Emma</p><p className="text-[10px] text-[#AFA397]">Unitalk AI Cloud</p></div></div><span className="flex items-center gap-2 text-[10px] font-bold text-[#86D9A7]"><span className="size-2 rounded-full bg-[#64C98D] shadow-[0_0_12px_#64C98D]"/>{t.active}</span></div><dl className="divide-y divide-white/10 px-6">{t.consoleRows.map(([label,value,status])=><div key={label} className="grid grid-cols-[1fr_auto] items-center gap-5 py-4"><dt className="text-xs text-[#AFA397]">{label}</dt><dd className={`text-right text-xs font-bold ${status ? 'text-[#86D9A7]' : 'text-white'}`}>{value}</dd></div>)}</dl><div className="grid grid-cols-2 border-t border-white/10"><div className="p-5"><p className="font-mono text-[8px] font-black uppercase tracking-[.14em] text-[#AFA397]">{t.monitoring}</p><p className="mt-2 text-sm font-bold text-[#86D9A7]">{t.enabled}</p></div><div className="border-l border-white/10 p-5"><p className="font-mono text-[8px] font-black uppercase tracking-[.14em] text-[#AFA397]">{t.updates}</p><p className="mt-2 text-sm font-bold">{t.controlled}</p></div></div></div></aside>
}

function ResponsibilityColumn({ title, icon: Icon, items, dark = false }: { title: string; icon: typeof Cloud; items: readonly string[]; dark?: boolean }) {
  return <article className={`p-7 sm:p-9 ${dark ? 'bg-[#191715] text-white' : 'border-t border-[#CFC5B5] bg-[#FAF8F3] lg:border-l lg:border-t-0'}`}><Icon className={`size-6 ${dark ? 'text-[#F2A4C5]' : 'text-[#B00C54]'}`}/><h3 className="mt-6 text-2xl font-semibold">{title}</h3><ul className="mt-6 space-y-4">{items.map(item => <li key={item} className={`flex gap-3 text-sm leading-6 ${dark ? 'text-[#D8D0C5]' : 'text-[#4E483F]'}`}><Check className={`mt-1 size-4 shrink-0 ${dark ? 'text-[#F2A4C5]' : 'text-[#B00C54]'}`}/>{item}</li>)}</ul></article>
}

function SectionHeading({ kicker, title, body, dark = false }: { kicker: string; title: string; body: string; dark?: boolean }) {
  return <div className="grid gap-6 lg:grid-cols-[1.08fr_.92fr] lg:items-end lg:gap-12"><div><p className={`font-mono text-[10px] font-black uppercase tracking-[.18em] ${dark?'text-[#F2A4C5]':'text-[#B00C54]'}`}>{kicker}</p><h2 className="mt-5 max-w-3xl text-balance text-[clamp(2.1rem,4.2vw,4.1rem)] font-semibold leading-[.94] tracking-[-.055em]">{title}</h2></div><p className={`max-w-xl text-[16px] leading-8 ${dark?'text-[#CFC6B8]':'text-[#514A42]'}`}>{body}</p></div>
}

const COPY = {
  fr: {
    title:'Hermes fonctionne.', accent:'Votre équipe travaille.', identification:'Service de déploiement et d’exploitation de Hermes pour vos Collaborateurs IA.', lead:'Unitalk déploie, sécurise et maintient l’environnement de vos Collaborateurs IA pour que votre entreprise se concentre sur leurs missions.', primary:'Évaluer mon besoin d’hébergement', secondary:'Voir les options d’hébergement', heroNote:'Configuration, isolation et engagements de service selon l’offre et l’hébergement choisis.',
    consoleLabel:'Aperçu illustratif des capacités d’exploitation', active:'Exemple', consoleRows:[['Instance','Configurée par Collaborateur'],['Version Hermes','Canal stable disponible'],['Région','Sélectionnable selon l’offre'],['Sauvegarde','Configurable selon la politique',true],['État du service','Suivi selon l’offre',true]], monitoring:'Supervision', enabled:'Disponible selon l’offre', updates:'Mises à jour', controlled:'Canal contrôlé',
    layersKicker:'Trois couches distinctes', layersTitle:'Le serveur héberge. Hermes exécute. Unitalk organise.', layersBody:'Chaque couche a un rôle précis. Vous choisissez l’hébergement et les règles ; Unitalk assure l’exploitation définie dans votre offre.', layers:[['Serveur','Les ressources de calcul, le stockage et l’isolation nécessaires à l’exécution.'],['Hermes','Le moteur agentique open source qui planifie, utilise les outils autorisés et accomplit les tâches.'],['Unitalk','L’identité professionnelle, les missions, la collaboration, les applications, les droits et les validations.']],
    operationsKicker:'Exploitation et engagements', operationsTitle:'La continuité avant la plomberie.', operationsBody:'L’exploitation est organisée autour de quatre responsabilités lisibles plutôt que d’une accumulation de fonctions techniques.', operations:[['Exploitation suivie','État du service, versions et incidents sont suivis dans le périmètre de l’offre.'],['Sécurité et isolation','Accès, secrets et environnements sont séparés selon la configuration retenue.'],['Sauvegarde et reprise','Les données couvertes par votre politique peuvent être sauvegardées et restaurées.'],['Disponibilité','Les objectifs de service et modalités de support sont ceux définis dans l’offre souscrite.']], serviceNote:'Les niveaux de service, fréquences de sauvegarde, régions disponibles et délais de support dépendent de l’offre et du fournisseur d’hébergement sélectionnés.',
    architectureLink:'Voir l’architecture', privacyLink:'Politique de confidentialité', conditionsLink:'Conditions de service',
    responsibilityKicker:'Responsabilités', responsibilityTitle:'Unitalk opère. Votre entreprise garde le contrôle.', responsibilityBody:'La séparation est explicite : nous faisons fonctionner l’environnement ; vous décidez des données, des accès, des modèles et des actions autorisées.', unitalkTitle:'Unitalk gère', unitalkItems:['Déploiement et configuration de l’environnement','Suivi des versions et mises à jour','Supervision, sauvegarde et restauration selon l’offre','Support et traitement des incidents selon le niveau souscrit'], companyTitle:'Votre entreprise contrôle', companyItems:['Les membres et responsables autorisés','Les données et documents accessibles','Les applications, secrets et fournisseurs de modèles','Les actions sensibles et validations humaines'],
    choiceKicker:'Hébergement', choiceTitle:'Unitalk AI Cloud ou un fournisseur compatible.', choiceBody:'Choisissez selon vos exigences de localisation, de confidentialité, de disponibilité et de budget. La compatibilité et le niveau d’exploitation sont confirmés avant déploiement.', cloud:'Pour aller vite : déploiement et exploitation intégrés par Unitalk, selon la région et le niveau de service disponibles dans votre offre.', providerTitle:'Votre hébergeur', provider:'Pour respecter vos contraintes internes, de souveraineté ou vos contrats existants. Compatibilité, responsabilités, accès techniques et coûts sont confirmés avant déploiement.', serversCta:'Comparer les options d’hébergement',
    portabilityKicker:'Portabilité', portabilityTitle:'Sachez ce qui peut vous suivre.', portabilityBody:'La portabilité dépend des composants utilisés et des droits associés. Unitalk précise le périmètre exportable avant tout engagement.', exportLabel:'Éléments portables', exportTitle:'Configuration et savoir-faire documentés.', exportItems:['Profils métier et compétences compatibles','Instructions, méthodes et configurations exportables','Documents appartenant à votre entreprise dans les formats prévus','Historique ou mémoire lorsque le format et l’offre le permettent'], limitLabel:'Limites à connaître', limitTitle:'Tout n’est pas interchangeable.', limitBody:'Les secrets, services managés, historiques techniques, connecteurs propriétaires et données de fournisseurs tiers peuvent rester liés à leur environnement. Les formats, dépendances et conditions de sortie sont précisés dans votre offre.',
    finalKicker:'Votre environnement', finalTitle:'Choisissez le niveau d’exploitation adapté à vos missions.', finalBody:'Décrivez vos contraintes de confidentialité, de disponibilité, de localisation et de charge. Unitalk vous aide à choisir une configuration réaliste.', finalCta:'Évaluer mon besoin d’hébergement',
  },
  en: {
    title:'Hermes runs.', accent:'Your team gets work done.', identification:'Hermes deployment and operations for your AI Collaborators.', lead:'Unitalk deploys, secures and maintains your AI Collaborators’ environment so your organization can focus on their missions.', primary:'Assess my hosting needs', secondary:'View hosting options', heroNote:'Configuration, isolation and service commitments depend on the selected plan and hosting provider.',
    consoleLabel:'Illustrative operations capability preview', active:'Example', consoleRows:[['Instance','Configured per Collaborator'],['Hermes version','Stable channel available'],['Region','Selectable by plan'],['Backup','Configurable by policy',true],['Service status','Monitored by plan',true]], monitoring:'Monitoring', enabled:'Available by plan', updates:'Updates', controlled:'Controlled channel',
    layersKicker:'Three distinct layers', layersTitle:'The server hosts. Hermes executes. Unitalk organizes.', layersBody:'Each layer has a precise role. You choose hosting and rules; Unitalk provides the operations defined in your plan.', layers:[['Server','Compute, storage and isolation resources required for execution.'],['Hermes','The open-source agentic engine that plans, uses authorized tools and completes tasks.'],['Unitalk','Professional identity, missions, collaboration, applications, permissions and approvals.']],
    operationsKicker:'Operations and commitments', operationsTitle:'Continuity before plumbing.', operationsBody:'Operations are organized around four clear responsibilities rather than a list of generic technical features.', operations:[['Managed operations','Service health, versions and incidents are monitored within your plan’s scope.'],['Security and isolation','Access, secrets and environments are separated according to the selected configuration.'],['Backup and recovery','Data covered by your policy can be backed up and restored.'],['Availability','Service objectives and support terms are those defined in your subscribed plan.']], serviceNote:'Service levels, backup frequency, available regions and support times depend on the selected plan and hosting provider.',
    architectureLink:'View architecture', privacyLink:'Privacy policy', conditionsLink:'Service terms',
    responsibilityKicker:'Responsibilities', responsibilityTitle:'Unitalk operates. Your organization stays in control.', responsibilityBody:'The separation is explicit: we keep the environment running; you decide which data, access, models and actions are authorized.', unitalkTitle:'Unitalk manages', unitalkItems:['Environment deployment and configuration','Version and update management','Monitoring, backup and recovery according to plan','Support and incident handling at the subscribed level'], companyTitle:'Your organization controls', companyItems:['Authorized members and managers','Accessible data and documents','Applications, secrets and model providers','Sensitive actions and human approvals'],
    choiceKicker:'Hosting', choiceTitle:'Unitalk AI Cloud or a compatible provider.', choiceBody:'Choose according to location, confidentiality, availability and budget requirements. Compatibility and operating scope are confirmed before deployment.', cloud:'For a faster start: integrated deployment and operations by Unitalk, according to the region and service level available in your plan.', providerTitle:'Your hosting provider', provider:'For internal, sovereignty or existing-contract constraints. Compatibility, responsibilities, technical access and costs are confirmed before deployment.', serversCta:'Compare hosting options',
    portabilityKicker:'Portability', portabilityTitle:'Know what can move with you.', portabilityBody:'Portability depends on the components used and their associated rights. Unitalk defines the exportable scope before commitment.', exportLabel:'Portable elements', exportTitle:'Documented configuration and know-how.', exportItems:['Compatible job profiles and skills','Exportable instructions, methods and configurations','Organization-owned documents in supported formats','History or memory when supported by the format and plan'], limitLabel:'Limits to understand', limitTitle:'Not everything is interchangeable.', limitBody:'Secrets, managed services, technical histories, proprietary connectors and third-party provider data may remain tied to their environment. Formats, dependencies and exit terms are specified in your plan.',
    finalKicker:'Your environment', finalTitle:'Choose the operating level that fits your missions.', finalBody:'Describe your confidentiality, availability, location and workload constraints. Unitalk helps you choose a realistic configuration.', finalCta:'Assess my hosting needs',
  },
} as const
