'use client'

import Link from 'next/link'
import { ArrowRight, Database, FileKey, Fingerprint, History, LockKeyhole, Server, ShieldCheck, UserCheck } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { Kicker } from '@/components/home/section-kicker'

const HERMES_SECURITY_DOCS = 'https://hermes-agent.nousresearch.com/docs/user-guide/security'
const REVIEW_URL = 'https://cal.com/patrickchassany/30min'

type Status = 'available' | 'configuration' | 'request' | 'confirm'
type TrustItem = { title: string; status: Status; body: string }

const STATUS = {
  fr: { available: 'Disponible', configuration: 'Selon configuration', request: 'Sur demande', confirm: 'À documenter / À confirmer' },
  en: { available: 'Available', configuration: 'Depending on configuration', request: 'On request', confirm: 'To document / To confirm' },
} as const

const COPY = {
  fr: {
    kicker: 'Centre de confiance', title: 'Sécurité documentée. Inconnues assumées.', lead: 'Cette page distingue les protections documentées, les choix de configuration et les informations qui restent à confirmer avant un engagement contractuel.',
    updated: 'Mise à jour : 23 août 2026', scope: 'Portée : site Unitalk, Workspace et environnements Hermes décrits par le code public. Les conditions contractuelles et la configuration retenue prévalent.',
    review: 'Planifier une revue sécurité', mission: 'Décrire ma mission', navLabel: 'Navigation du centre de confiance',
    nav: [['Contrôles', '#controles'], ['Données', '#donnees'], ['Résilience', '#resilience'], ['Assurance', '#assurance'], ['Responsabilités', '#responsabilites']],
    sections: [
      { id: 'controles', kicker: 'Identité et accès', title: 'Contrôles d’accès', intro: 'État des fonctions d’identité, d’autorisation et de séparation.', items: [
        { title: 'SSO / SAML', status: 'confirm', body: 'Aucune prise en charge SAML ni politique SSO d’entreprise n’est documentée dans le périmètre examiné.' },
        { title: 'MFA', status: 'confirm', body: 'Les facteurs, méthodes d’enrôlement et règles d’obligation MFA restent à confirmer.' },
        { title: 'Rôles et permissions', status: 'available', body: 'Applications, données et outils sont accordés selon le rôle, la mission et les droits définis par l’entreprise. Les accès peuvent être limités ou révoqués.' },
        { title: 'Séparation des entreprises', status: 'configuration', body: 'Des environnements isolés et des contextes d’exécution séparés sont prévus. L’architecture d’isolation applicable est confirmée pour chaque déploiement.' },
      ] satisfies TrustItem[] },
      { id: 'donnees', kicker: 'Données et IA', title: 'Cycle de vie des données', intro: 'Localisation, flux vers les modèles et maîtrise des données confiées.', items: [
        { title: 'Régions d’hébergement', status: 'available', body: 'La politique de confidentialité indique un hébergement des données Unitalk en France. La région d’un environnement ou fournisseur choisi est confirmée avant déploiement.' },
        { title: 'Chiffrement', status: 'available', body: 'Les données sont annoncées comme chiffrées en transit et au repos.' },
        { title: 'Flux vers les modèles', status: 'configuration', body: 'L’entreprise choisit les modèles et fournisseurs autorisés. Les contenus de mission ne servent pas à entraîner des modèles tiers sans accord explicite.' },
        { title: 'Suppression des données', status: 'request', body: 'Les droits d’effacement peuvent être exercés auprès de hello@unitalk.ai. Le processus opérationnel et les délais précis restent à documenter.' },
        { title: 'Sous-traitants', status: 'confirm', body: 'La politique de confidentialité indique que la liste des sous-traitants et prestataires techniques est à compléter.' },
      ] satisfies TrustItem[] },
      { id: 'resilience', kicker: 'Continuité', title: 'Résilience et exploitation', intro: 'Les objectifs précis dépendent de l’offre et ne sont pas présumés.', items: [
        { title: 'Sauvegardes', status: 'configuration', body: 'Les données couvertes par la politique retenue peuvent être sauvegardées et restaurées. Fréquence, périmètre et tests dépendent de l’offre.' },
        { title: 'RPO / RTO', status: 'confirm', body: 'Aucun objectif chiffré de perte de données ou de délai de reprise n’est publié.' },
        { title: 'Rétention des logs', status: 'confirm', body: 'Des journaux de connexion et une traçabilité de mission sont mentionnés, mais leurs durées de conservation précises restent à documenter.' },
        { title: 'Gestion des incidents', status: 'configuration', body: 'Le suivi des incidents et le support dépendent du niveau de service souscrit. Le processus, les contacts et délais d’escalade sont confirmés dans l’offre.' },
      ] satisfies TrustItem[] },
      { id: 'assurance', kicker: 'Vérification', title: 'Assurance et conformité', intro: 'Aucune preuve absente n’est présentée comme acquise.', items: [
        { title: 'Tests d’intrusion', status: 'confirm', body: 'La fréquence, le périmètre, le prestataire et la disponibilité d’un rapport ne sont pas documentés.' },
        { title: 'Certifications', status: 'confirm', body: 'Aucune certification de sécurité Unitalk vérifiable n’est publiée dans le périmètre examiné.' },
        { title: 'DPA', status: 'request', body: 'Un accord de traitement peut être demandé afin de préciser responsabilités, protections et conditions applicables aux sous-traitants.' },
        { title: 'Documentation Hermes', status: 'available', body: 'La documentation officielle décrit les contrôles de commandes, fichiers, sessions, conteneurs, secrets et réseau du moteur open source.' },
      ] satisfies TrustItem[] },
    ],
    boundaryKicker: 'Responsabilités claires', boundaryTitle: 'Hermes protège le moteur. Unitalk gouverne son usage.', boundaryLead: 'La sécurité dépend du runtime, de la configuration Unitalk et des règles choisies par votre entreprise.',
    boundaries: [['Hermes', 'Protège l’exécution agentique avec des contrôles de commandes, fichiers, sessions, secrets et réseau.'], ['Unitalk', 'Configure missions, profils, accès, validations et traçabilité dans le périmètre de l’offre.'], ['Votre entreprise', 'Choisit utilisateurs, applications, données, modèles, permissions et validations humaines.']],
    technicalCta: 'Lire la documentation de sécurité Hermes', privacyCta: 'Politique de confidentialité', dpaCta: 'Demander le DPA', finalTitle: 'Examinons votre périmètre réel.', finalBody: 'Partagez vos exigences d’identité, d’hébergement, de données et de continuité. La revue distingue ce qui est disponible, configurable et encore à confirmer.',
  },
  en: {
    kicker: 'Trust center', title: 'Documented security. Unknowns made explicit.', lead: 'This page separates documented safeguards, configuration choices and information that still needs confirmation before a contractual commitment.',
    updated: 'Updated: August 23, 2026', scope: 'Scope: Unitalk website, Workspace and Hermes environments described by the public code. Contractual terms and the selected configuration prevail.',
    review: 'Schedule a security review', mission: 'Describe my mission', navLabel: 'Trust center navigation',
    nav: [['Controls', '#controles'], ['Data', '#donnees'], ['Resilience', '#resilience'], ['Assurance', '#assurance'], ['Responsibilities', '#responsabilites']],
    sections: [
      { id: 'controles', kicker: 'Identity and access', title: 'Access controls', intro: 'Status of identity, authorization and separation capabilities.', items: [
        { title: 'SSO / SAML', status: 'confirm', body: 'No SAML support or enterprise SSO policy is documented in the reviewed scope.' }, { title: 'MFA', status: 'confirm', body: 'Factors, enrollment methods and mandatory MFA rules remain to be confirmed.' }, { title: 'Roles and permissions', status: 'available', body: 'Applications, data and tools are granted according to the role, mission and organization-defined permissions. Access can be limited or revoked.' }, { title: 'Organization separation', status: 'configuration', body: 'Isolated environments and separate execution contexts are provided. The applicable isolation architecture is confirmed for each deployment.' },
      ] satisfies TrustItem[] },
      { id: 'donnees', kicker: 'Data and AI', title: 'Data lifecycle', intro: 'Location, model flows and control over entrusted data.', items: [
        { title: 'Hosting regions', status: 'available', body: 'The privacy policy states that Unitalk data is hosted in France. The region of a selected environment or provider is confirmed before deployment.' }, { title: 'Encryption', status: 'available', body: 'Data is stated to be encrypted in transit and at rest.' }, { title: 'Model data flows', status: 'configuration', body: 'The organization selects authorized models and providers. Mission content is not used to train third-party models without explicit consent.' }, { title: 'Data deletion', status: 'request', body: 'Erasure rights can be exercised through hello@unitalk.ai. The operational process and precise timelines remain to be documented.' }, { title: 'Processors', status: 'confirm', body: 'The privacy policy states that the list of processors and technical providers must be completed.' },
      ] satisfies TrustItem[] },
      { id: 'resilience', kicker: 'Continuity', title: 'Resilience and operations', intro: 'Precise objectives depend on the plan and are not presumed.', items: [
        { title: 'Backups', status: 'configuration', body: 'Data covered by the selected policy may be backed up and restored. Frequency, scope and testing depend on the plan.' }, { title: 'RPO / RTO', status: 'confirm', body: 'No quantified recovery point or recovery time objective is published.' }, { title: 'Log retention', status: 'confirm', body: 'Connection logs and mission traceability are mentioned, but precise retention periods remain to be documented.' }, { title: 'Incident management', status: 'configuration', body: 'Incident monitoring and support depend on the subscribed service level. Process, contacts and escalation times are confirmed in the offer.' },
      ] satisfies TrustItem[] },
      { id: 'assurance', kicker: 'Verification', title: 'Assurance and compliance', intro: 'Missing evidence is never presented as established.', items: [
        { title: 'Penetration testing', status: 'confirm', body: 'Frequency, scope, provider and report availability are not documented.' }, { title: 'Certifications', status: 'confirm', body: 'No verifiable Unitalk security certification is published in the reviewed scope.' }, { title: 'DPA', status: 'request', body: 'A Data Processing Agreement can be requested to define responsibilities, safeguards and processor terms.' }, { title: 'Hermes documentation', status: 'available', body: 'Official documentation describes command, file, session, container, secret and network controls in the open-source engine.' },
      ] satisfies TrustItem[] },
    ],
    boundaryKicker: 'Clear responsibilities', boundaryTitle: 'Hermes protects the engine. Unitalk governs its use.', boundaryLead: 'Security depends on the runtime, Unitalk configuration and rules selected by your organization.',
    boundaries: [['Hermes', 'Protects agent execution with command, file, session, secret and network controls.'], ['Unitalk', 'Configures missions, profiles, access, approvals and traceability within the plan scope.'], ['Your organization', 'Selects users, applications, data, models, permissions and human approvals.']],
    technicalCta: 'Read the Hermes security documentation', privacyCta: 'Privacy policy', dpaCta: 'Request the DPA', finalTitle: 'Let’s review your actual scope.', finalBody: 'Share your identity, hosting, data and continuity requirements. The review separates what is available, configurable and still to be confirmed.',
  },
} as const

const ICONS = [UserCheck, Fingerprint, ShieldCheck, Server, Database, LockKeyhole, History, FileKey]

export function SecurityContent() {
  const { lang } = useLanguage()
  const t = COPY[lang]
  const statuses = STATUS[lang]
  return <main id="main-content" className="overflow-hidden bg-[#F3EFE6] text-[#1C1A17]">
    <section className="relative border-b border-[#D8D0C2] px-5 pb-14 pt-28 sm:px-8 sm:pt-36"><div aria-hidden className="pointer-events-none absolute -right-40 top-12 size-[34rem] rounded-full bg-[#D10E63]/10 blur-3xl"/><div className="editorial-shell relative"><Kicker>{t.kicker}</Kicker><h1 className="mt-6 max-w-5xl text-balance text-[clamp(3rem,7vw,7rem)] font-semibold leading-[.9] tracking-[-.07em]"><AccentLastWord value={t.title}/></h1><p className="mt-7 max-w-3xl text-[18px] leading-8 text-[#4E483F]">{t.lead}</p><div className="mt-8 flex flex-wrap gap-3"><a href={REVIEW_URL} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#D10E63] px-6 text-sm font-bold text-white">{t.review}<ArrowRight className="size-4"/></a><Link href="/decouvrir?source=securite" className="inline-flex min-h-12 items-center rounded-full border border-[#BFB4A4] bg-[#FAF8F3] px-6 text-sm font-bold">{t.mission}</Link></div><div className="mt-8 border-l-2 border-[#D10E63] pl-4 text-xs leading-6 text-[#625B50]"><p className="font-bold text-[#1C1A17]">{t.updated}</p><p>{t.scope}</p></div></div></section>
    <nav aria-label={t.navLabel} className="sticky top-[76px] z-20 border-b border-white/10 bg-[#211E1B]/95 px-5 text-white backdrop-blur sm:px-8"><div className="editorial-shell flex overflow-x-auto scrollbar-hide">{t.nav.map(([label, href]) => <a key={href} href={href} className="flex h-14 shrink-0 items-center px-4 text-xs font-bold text-[#D8D0C2] hover:text-white sm:h-16 sm:text-sm">{label}</a>)}</div></nav>
    {t.sections.map((section, sectionIndex) => <section key={section.id} id={section.id} className={`scroll-mt-36 px-5 py-16 sm:px-8 sm:py-20 ${sectionIndex % 2 ? 'border-y border-[#D8D0C2] bg-[#EAE3D4]' : ''}`}><div className="editorial-shell"><div className="max-w-3xl"><Kicker>{section.kicker}</Kicker><h2 className="mt-5 text-[clamp(2.4rem,5vw,4.6rem)] font-semibold leading-[.95] tracking-[-.06em]"><AccentLastWord value={section.title}/></h2><p className="mt-5 text-[16px] leading-8 text-[#625B50]">{section.intro}</p></div><div className="mt-10 grid gap-4 md:grid-cols-2">{section.items.map((item, index) => { const Icon = ICONS[(sectionIndex * 4 + index) % ICONS.length]; return <article key={item.title} className="rounded-[20px] border border-[#D8D0C2] bg-[#FAF8F3] p-6"><div className="flex items-start justify-between gap-4"><Icon className="size-5 text-[#B00C54]"/><StatusBadge status={item.status} label={statuses[item.status]}/></div><h3 className="mt-5 text-xl font-semibold"><AccentLastWord value={item.title}/></h3><p className="mt-3 text-sm leading-7 text-[#625B50]">{item.body}</p></article>})}</div></div></section>)}
    <section id="responsabilites" className="scroll-mt-36 bg-[#151310] px-5 py-16 text-white sm:px-8 sm:py-24"><div className="editorial-shell grid gap-12 lg:grid-cols-[.78fr_1.22fr] lg:gap-20"><div><p className="font-mono text-[10px] font-black uppercase tracking-[.18em] text-[#F2A4C5]">{t.boundaryKicker}</p><h2 className="mt-5 text-[clamp(2.4rem,5vw,4.8rem)] font-semibold leading-[.95] tracking-[-.06em]"><AccentLastWord value={t.boundaryTitle} dark/></h2><p className="mt-5 text-[15px] leading-7 text-[#CFC6B8]">{t.boundaryLead}</p></div><div className="overflow-hidden rounded-[24px] border border-white/15">{t.boundaries.map(([title, body], index) => <article key={title} className="grid gap-3 border-b border-white/10 bg-white/[.04] p-6 last:border-b-0 sm:grid-cols-[8rem_1fr]"><p className="font-mono text-[10px] font-black uppercase tracking-[.16em] text-[#F2A4C5]">0{index + 1} · {title}</p><p className="text-sm leading-7 text-[#D8D0C2]">{body}</p></article>)}</div></div></section>
    <section className="border-b border-[#D8D0C2] bg-[#FAF8F3] px-5 py-14 sm:px-8"><div className="editorial-shell flex flex-wrap gap-5"><a href={HERMES_SECURITY_DOCS} target="_blank" rel="noreferrer" className="text-sm font-bold text-[#B00C54] underline underline-offset-4">{t.technicalCta}</a><Link href="/confidentialite" className="text-sm font-bold text-[#B00C54] underline underline-offset-4">{t.privacyCta}</Link><a href="mailto:hello@unitalk.ai?subject=DPA%20Unitalk" className="text-sm font-bold text-[#B00C54] underline underline-offset-4">{t.dpaCta}</a></div></section>
    <section className="px-5 py-16 sm:px-8 sm:py-20"><div className="editorial-shell rounded-[28px] bg-[#D10E63] p-8 text-white sm:p-12"><h2 className="max-w-3xl text-[clamp(2.2rem,5vw,4.5rem)] font-semibold leading-[.95] tracking-[-.06em]">{t.finalTitle}</h2><p className="mt-5 max-w-2xl text-sm leading-7 text-white/85">{t.finalBody}</p><div className="mt-8 flex flex-wrap gap-3"><a href={REVIEW_URL} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-[#B00C54]">{t.review}<ArrowRight className="size-4"/></a><Link href="/decouvrir?source=securite" className="inline-flex min-h-12 items-center rounded-full border border-white/50 px-6 text-sm font-bold">{t.mission}</Link></div></div></section>
  </main>
}

function StatusBadge({ status, label }: { status: Status; label: string }) {
  const tone = status === 'available' ? 'border-[#216641]/25 bg-[#E4F3E8] text-[#216641]' : status === 'configuration' ? 'border-[#1D6692]/25 bg-[#E8F2F8] text-[#174F70]' : status === 'request' ? 'border-[#B00C54]/20 bg-[#F8E7EF] text-[#B00C54]' : 'border-[#9A6A20]/25 bg-[#F8EEDB] text-[#765016]'
  return <span className={`rounded-full border px-3 py-1 text-[9px] font-black uppercase tracking-[.1em] ${tone}`}>{label}</span>
}

function AccentLastWord({ value, dark = false }: { value: string; dark?: boolean }) {
  const splitAt = value.lastIndexOf(' ')
  if (splitAt < 0) return <span className={dark ? 'text-[#F2A4C5]' : 'text-[#D10E63]'}>{value}</span>
  return <>{value.slice(0, splitAt)} <span className={dark ? 'text-[#F2A4C5]' : 'text-[#D10E63]'}>{value.slice(splitAt + 1)}</span></>
}
