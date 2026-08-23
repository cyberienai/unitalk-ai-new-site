'use client'

import Link from 'next/link'
import { ArrowRight, Database, FileKey, Fingerprint, History, LockKeyhole, Server, ShieldCheck, UserCheck } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { Kicker } from '@/components/home/section-kicker'

const HERMES_SECURITY_DOCS = 'https://hermes-agent.nousresearch.com/docs/user-guide/security'

const COPY = {
  fr: {
    kicker: 'Sécurité et contrôle',
    title: 'Vos données. Vos accès. Vos décisions.',
    lead: 'Unitalk associe les protections techniques du moteur agentique open source Hermes à une gouvernance conçue pour le travail en entreprise.',
    principles: ['Refus par défaut', 'Accès explicites', 'Validation humaine', 'Environnements isolés', 'Actions traçables'],
    layersKicker: 'Défense en profondeur',
    layersTitle: 'Une action traverse plusieurs contrôles.',
    layersLead: 'La sécurité ne repose pas sur une seule barrière. Identité, permissions, environnement d’exécution et validation humaine se complètent.',
    layers: [
      { icon: UserCheck, title: 'Utilisateurs autorisés', body: 'Seules les personnes autorisées peuvent interagir avec le Collaborateur IA. Les accès peuvent être limités ou révoqués.' },
      { icon: Fingerprint, title: 'Permissions explicites', body: 'Applications, données et outils sont accessibles selon le rôle, la mission et les droits définis par votre organisation.' },
      { icon: ShieldCheck, title: 'Validation des actions sensibles', body: 'Les actions engageantes peuvent être suspendues jusqu’à la décision d’une personne autorisée.' },
      { icon: Server, title: 'Exécution isolée', body: 'Les environnements isolés réduisent l’exposition du système hôte et séparent les contextes d’exécution.' },
      { icon: FileKey, title: 'Secrets filtrés', body: 'Les identifiants et variables sensibles ne sont transmis aux outils que lorsqu’ils sont nécessaires et explicitement configurés.' },
      { icon: History, title: 'Traçabilité', body: 'Le Workspace rattache les étapes, résultats, validations et décisions à la mission concernée.' },
    ],
    boundaryKicker: 'Responsabilités claires',
    boundaryTitle: 'Hermes protège le moteur. Unitalk gouverne son usage.',
    boundaryLead: 'La sécurité dépend à la fois des protections du runtime, de la configuration Unitalk et des règles choisies par votre entreprise.',
    boundaries: [
      ['Hermes', 'Protège l’exécution agentique avec des contrôles de commandes, de fichiers, de sessions, de secrets et de réseau.'],
      ['Unitalk', 'Configure les missions, les profils, les accès, les validations et la traçabilité dans un Workspace partagé.'],
      ['Votre entreprise', 'Choisit les utilisateurs, connecte les applications et décide des permissions ainsi que des actions soumises à validation.'],
    ],
    decisionKicker: 'Contrôle humain',
    decisionTitle: 'Autorisé ne veut pas dire automatique.',
    decisionBody: 'Un Collaborateur IA peut disposer de l’accès nécessaire à une mission sans être autorisé à prendre seul toutes les décisions. Vous définissez les étapes qui exigent une validation.',
    decisionFlow: [['Droit', 'Peut-il accéder à cette ressource ?'], ['Action', 'Peut-il préparer ou exécuter cette opération ?'], ['Validation', 'Une personne doit-elle approuver avant de poursuivre ?'], ['Trace', 'Que faut-il conserver dans le fil de mission ?']],
    dataKicker: 'Données et hébergement',
    dataTitle: 'Des engagements lisibles.',
    dataItems: [
      { icon: Server, title: 'Hébergement', body: 'Les données Unitalk sont hébergées en France.' },
      { icon: LockKeyhole, title: 'Chiffrement', body: 'Les données sont chiffrées en transit et au repos.' },
      { icon: Database, title: 'Utilisation des données', body: 'Les contenus de mission ne servent pas à entraîner des modèles sans votre accord explicite.' },
      { icon: FileKey, title: 'DPA', body: 'L’accord de traitement précise les responsabilités, protections et conditions applicables aux sous-traitants.' },
    ],
    technicalKicker: 'Documentation technique',
    technicalTitle: 'Examiner les protections du moteur Hermes.',
    technicalBody: 'La documentation officielle détaille notamment les autorisations, le blocage des commandes destructrices, la protection des fichiers, l’isolation des sessions et conteneurs, le filtrage des secrets et les protections réseau.',
    technicalCta: 'Lire la documentation de sécurité Hermes',
    note: 'Les protections disponibles dépendent du mode de déploiement et de la configuration retenue. Unitalk définit et documente la configuration applicable à votre environnement avant sa mise en service.',
    privacyCta: 'Consulter la politique de confidentialité',
    dpaCta: 'Demander le DPA',
  },
  en: {
    kicker: 'Security and control',
    title: 'Your data. Your access. Your decisions.',
    lead: 'Unitalk combines the technical protections of the open-source Hermes agent engine with governance designed for enterprise work.',
    principles: ['Deny by default', 'Explicit access', 'Human approval', 'Isolated environments', 'Traceable actions'],
    layersKicker: 'Defense in depth',
    layersTitle: 'Every action passes through several controls.',
    layersLead: 'Security does not rely on a single barrier. Identity, permissions, execution environments and human approval work together.',
    layers: [
      { icon: UserCheck, title: 'Authorized users', body: 'Only authorized people can interact with the AI Collaborator. Access can be limited or revoked.' },
      { icon: Fingerprint, title: 'Explicit permissions', body: 'Applications, data and tools are available according to the role, mission and permissions defined by your organization.' },
      { icon: ShieldCheck, title: 'Sensitive-action approval', body: 'Consequential actions can be paused until an authorized person makes a decision.' },
      { icon: Server, title: 'Isolated execution', body: 'Isolated environments reduce host exposure and separate execution contexts.' },
      { icon: FileKey, title: 'Filtered secrets', body: 'Credentials and sensitive variables are passed to tools only when necessary and explicitly configured.' },
      { icon: History, title: 'Traceability', body: 'Workspace associates steps, outcomes, approvals and decisions with the relevant mission.' },
    ],
    boundaryKicker: 'Clear responsibilities',
    boundaryTitle: 'Hermes protects the engine. Unitalk governs its use.',
    boundaryLead: 'Security depends on runtime protections, Unitalk configuration and the rules selected by your organization.',
    boundaries: [
      ['Hermes', 'Protects agent execution with command, file, session, secret and network controls.'],
      ['Unitalk', 'Configures missions, profiles, access, approvals and traceability in a shared Workspace.'],
      ['Your organization', 'Selects users, connects applications and decides permissions and which actions require approval.'],
    ],
    decisionKicker: 'Human control',
    decisionTitle: 'Allowed does not mean automatic.',
    decisionBody: 'An AI Collaborator may have the access required for a mission without being allowed to make every decision alone. You define which steps require approval.',
    decisionFlow: [['Permission', 'Can it access this resource?'], ['Action', 'Can it prepare or execute this operation?'], ['Approval', 'Must a person approve before it proceeds?'], ['Record', 'What must remain in the mission thread?']],
    dataKicker: 'Data and hosting',
    dataTitle: 'Clear commitments.',
    dataItems: [
      { icon: Server, title: 'Hosting', body: 'Unitalk data is hosted in France.' },
      { icon: LockKeyhole, title: 'Encryption', body: 'Data is encrypted in transit and at rest.' },
      { icon: Database, title: 'Data use', body: 'Mission content is not used to train models without your explicit consent.' },
      { icon: FileKey, title: 'DPA', body: 'The Data Processing Agreement defines responsibilities, safeguards and conditions applying to processors.' },
    ],
    technicalKicker: 'Technical documentation',
    technicalTitle: 'Review the Hermes engine protections.',
    technicalBody: 'The official documentation covers authorization, destructive-command blocking, file safety, session and container isolation, secret filtering and network protections.',
    technicalCta: 'Read the Hermes security documentation',
    note: 'Available protections depend on the deployment mode and selected configuration. Unitalk defines and documents the configuration applying to your environment before setup.',
    privacyCta: 'Read the privacy policy',
    dpaCta: 'Request the DPA',
  },
} as const

export function SecurityContent() {
  const { lang } = useLanguage()
  const t = COPY[lang]

  return <main className="overflow-hidden bg-[#F3EFE6] text-[#1C1A17]">
    <section className="relative border-b border-[#D8D0C2] px-5 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-36"><div aria-hidden className="pointer-events-none absolute -right-40 top-12 size-[34rem] rounded-full bg-[#D10E63]/10 blur-3xl"/><div className="editorial-shell relative"><Kicker>{t.kicker}</Kicker><h1 className="mt-6 max-w-5xl text-balance text-[clamp(3rem,7vw,7rem)] font-semibold leading-[.9] tracking-[-.07em]"><AccentLastWord value={t.title}/></h1><p className="mt-7 max-w-3xl text-[18px] leading-8 text-[#4E483F]">{t.lead}</p><ul className="mt-9 flex flex-wrap gap-2">{t.principles.map(item => <li key={item} className="rounded-full border border-[#CFC5B5] bg-[#FAF8F3] px-4 py-2 text-xs font-bold text-[#4E483F]">{item}</li>)}</ul></div></section>

    <section className="px-5 py-16 sm:px-8 sm:py-24"><div className="editorial-shell"><div className="max-w-3xl"><Kicker>{t.layersKicker}</Kicker><h2 className="mt-5 text-balance text-[clamp(2.4rem,5vw,4.8rem)] font-semibold leading-[.95] tracking-[-.06em]"><AccentLastWord value={t.layersTitle}/></h2><p className="mt-5 text-[16px] leading-8 text-[#625B50]">{t.layersLead}</p></div><div className="mt-12 grid border-l border-t border-[#D8D0C2] sm:grid-cols-2 lg:grid-cols-3">{t.layers.map(({ icon: Icon, title, body }, index) => <article key={title} className="min-h-64 border-b border-r border-[#D8D0C2] p-6 sm:p-7"><div className="flex items-center justify-between"><span className="flex size-10 items-center justify-center rounded-xl bg-[#EAE3D4] text-[#B00C54]"><Icon className="size-5"/></span><span className="font-mono text-[10px] font-black text-[#857C6E]">0{index + 1}</span></div><h3 className="mt-8 text-xl font-semibold tracking-[-.035em]"><AccentLastWord value={title}/></h3><p className="mt-4 text-sm leading-7 text-[#625B50]">{body}</p></article>)}</div></div></section>

    <section className="bg-[#151310] px-5 py-16 text-white sm:px-8 sm:py-24"><div className="editorial-shell grid gap-12 lg:grid-cols-[.78fr_1.22fr] lg:gap-20"><div><p className="font-mono text-[10px] font-black uppercase tracking-[.18em] text-[#F2A4C5]">{t.boundaryKicker}</p><h2 className="mt-5 text-balance text-[clamp(2.4rem,5vw,4.8rem)] font-semibold leading-[.95] tracking-[-.06em]"><AccentLastWord value={t.boundaryTitle} dark/></h2><p className="mt-5 text-[15px] leading-7 text-[#CFC6B8]">{t.boundaryLead}</p></div><div className="overflow-hidden rounded-[24px] border border-white/15">{t.boundaries.map(([title, body], index) => <article key={title} className="grid gap-3 border-b border-white/10 bg-white/[.04] p-6 last:border-b-0 sm:grid-cols-[8rem_1fr]"><p className="font-mono text-[10px] font-black uppercase tracking-[.16em] text-[#F2A4C5]">0{index + 1} · {title}</p><p className="text-sm leading-7 text-[#D8D0C2]">{body}</p></article>)}</div></div></section>

    <section className="border-b border-[#D8D0C2] bg-[#EAE3D4] px-5 py-16 sm:px-8 sm:py-20"><div className="editorial-shell grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20"><div><Kicker>{t.decisionKicker}</Kicker><h2 className="mt-5 text-balance text-[clamp(2.35rem,4.5vw,4.4rem)] font-semibold leading-[.96] tracking-[-.055em]"><AccentLastWord value={t.decisionTitle}/></h2><p className="mt-5 text-[15px] leading-7 text-[#625B50]">{t.decisionBody}</p></div><ol className="overflow-hidden rounded-[24px] border border-[#D8D0C2] bg-[#FFFDF9]">{t.decisionFlow.map(([label, question], index) => <li key={label} className="flex gap-5 border-b border-[#E4DDCE] p-5 last:border-b-0 sm:p-6"><span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#D10E63] font-mono text-[10px] font-black text-white">{index + 1}</span><div><h3 className="font-semibold text-[#B00C54]">{label}</h3><p className="mt-1 text-sm leading-6 text-[#625B50]">{question}</p></div></li>)}</ol></div></section>

    <section className="px-5 py-16 sm:px-8 sm:py-24"><div className="editorial-shell"><div className="max-w-3xl"><Kicker>{t.dataKicker}</Kicker><h2 className="mt-5 text-balance text-[clamp(2.35rem,4.5vw,4.4rem)] font-semibold leading-[.96] tracking-[-.055em]"><AccentLastWord value={t.dataTitle}/></h2></div><div className="mt-10 grid gap-4 md:grid-cols-2">{t.dataItems.map(({ icon: Icon, title, body }) => <article key={title} className="rounded-[20px] border border-[#D8D0C2] bg-[#FAF8F3] p-6"><Icon className="size-5 text-[#B00C54]"/><h3 className="mt-5 text-xl font-semibold"><AccentLastWord value={title}/></h3><p className="mt-3 text-sm leading-7 text-[#625B50]">{body}</p></article>)}</div></div></section>

    <section className="border-y border-[#D8D0C2] bg-[#FAF8F3] px-5 py-14 sm:px-8 sm:py-16"><div className="editorial-shell grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end"><div className="max-w-4xl"><Kicker>{t.technicalKicker}</Kicker><h2 className="mt-5 text-balance text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[.98] tracking-[-.05em]"><AccentLastWord value={t.technicalTitle}/></h2><p className="mt-5 max-w-3xl text-sm leading-7 text-[#625B50]">{t.technicalBody}</p></div><a href={HERMES_SECURITY_DOCS} target="_blank" rel="noreferrer" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-[#211E1A] px-6 text-sm font-bold text-white hover:bg-[#D10E63]">{t.technicalCta}<ArrowRight className="ml-2 size-4"/></a></div></section>

    <section id="dpa" className="scroll-mt-24 px-5 py-12 sm:px-8"><div className="editorial-shell flex flex-col justify-between gap-6 sm:flex-row sm:items-center"><p className="max-w-3xl text-xs leading-6 text-[#766D61]">{t.note}</p><div className="flex shrink-0 flex-wrap gap-4"><Link href="/confidentialite" className="text-sm font-bold text-[#B00C54] underline decoration-[#D10E63]/30 underline-offset-4">{t.privacyCta}</Link><a href="mailto:hello@unitalk.ai?subject=DPA%20Unitalk" className="text-sm font-bold text-[#B00C54] underline decoration-[#D10E63]/30 underline-offset-4">{t.dpaCta}</a></div></div></section>
  </main>
}

function AccentLastWord({ value, dark = false }: { value: string; dark?: boolean }) {
  const splitAt = value.lastIndexOf(' ')
  if (splitAt < 0) return <span className={dark ? 'text-[#F2A4C5]' : 'text-[#D10E63]'}>{value}</span>
  return <>{value.slice(0, splitAt)} <span className={dark ? 'text-[#F2A4C5]' : 'text-[#D10E63]'}>{value.slice(splitAt + 1)}</span></>
}
