'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { ProofPill } from '@/components/ui/proof-pill'

const ease = [0.22, 1, 0.36, 1] as const

type Path = {
  title: string
  audience: string
  body: string
  cta: string
  href: string
  external?: boolean
}

const COPY = {
  fr: {
    heroTag: 'Créer · Recommander · Déployer',
    heroTitle: 'Transformez une mission réelle en activité durable.',
    heroLead:
      'Apprenez à créer des Collaborateurs IA, trouvez les premiers clients, puis déployez les solutions qui prouvent leur valeur.',
    heroSub:
      'Le coût de construire baisse. La capacité d’une petite équipe augmente. Ce qui compte reste inchangé : comprendre un problème réel et créer quelque chose que des clients veulent utiliser.',
    heroCta: 'Commencer par une mission',
    heroCtaHref: '/academy/parcours-gratuits/premiere-mission-ia',
    heroSecondary: 'Déployer chez mes clients',
    heroSecondaryHref: '/partenaires/deployer',

    sequenceEyebrow: 'Le chemin le plus simple',
    sequenceTitle: 'Ne cherchez pas d’abord à devenir partenaire. Devenez utile.',
    sequence: [
      { n:'01', title:'Trouvez une mission', body:'Partez d’un problème précis, porté par une personne qui attend un résultat.' },
      { n:'02', title:'Créez la solution', body:'Construisez et testez le Collaborateur IA avec l’expert métier et des validations humaines.' },
      { n:'03', title:'Montrez la preuve', body:'Démontrez le résultat, les limites, les corrections et la valeur obtenue.' },
      { n:'04', title:'Choisissez votre modèle', body:'Recommandez Unitalk ou prenez en charge la vente, le déploiement et le suivi.' },
    ],

    pathsEyebrow: 'Trois niveaux d’engagement',
    pathsTitle: 'Choisissez ce que vous voulez réellement faire.',
    paths: [
      {
        title: 'Créer des Collaborateurs IA',
        audience: 'Expert, consultant, formateur ou intégrateur.',
        body: 'Apprenez à transformer une méthode métier en mission, compétences, application et Collaborateur IA testable.',
        cta: 'Devenir Co-créateur IA',
        href: '/academy/formations/co-createur-ia',
      },
      {
        title: 'Recommander Unitalk',
        audience: 'Vous créez la relation et transmettez l’opportunité.',
        body: 'Présentez Unitalk à une nouvelle entreprise et recevez 30 % des abonnements éligibles encaissés pendant sa première année.',
        cta: 'Comprendre l’affiliation',
        href: '#affiliation',
      },
      {
        title: 'Déployer chez vos clients',
        audience: 'Vous vendez, configurez et accompagnez.',
        body: 'Pilotez plusieurs environnements clients, facturez vos prestations et recevez 50 % selon les conditions du programme Partenaire.',
        cta: 'Découvrir Partner — 499 € / mois',
        href: '/partenaires/deployer',
      },
      {
        title: 'Construire ou connecter une technologie',
        audience: 'Éditeur, plateforme, fournisseur ou communauté open source.',
        body: 'Intégrez Unitalk à votre produit, proposez une application, une API, un modèle ou une infrastructure, ou contribuez à Hermes.',
        cta: 'Explorer la voie technologique',
        href: '/platform',
      },
    ] as Path[],

    baseEyebrow: 'Une base commune',
    baseTitle: 'Vous apportez la mission et la relation. Unitalk fournit le terrain de travail.',
    baseIntro: 'Unitalk fournit, selon le partenariat :',
    baseItems: [
      'des Collaborateurs IA propulsés par Hermes',
      'une identité et une mémoire persistantes',
      'des profils métier, compétences et missions',
      'des missions, compétences et applications',
      'un workspace commun aux humains et à l’IA',
      'une AI Gateway multimodèle',
      'des environnements isolés',
      'des API, MCP et webhooks',
      'une gouvernance des accès et des validations',
    ],
    baseNote: 'Les capacités exactes dépendent du programme choisi.',

    openEyebrow: 'Une base ouverte',
    openTitle: 'Hermes est ouvert. Unitalk le prépare pour l’entreprise.',
    openBody1:
      'Hermes est un agent autonome open source capable d’utiliser des outils, d’accomplir des tâches et de progresser grâce à sa mémoire et à ses compétences.',
    openBody2:
      'Unitalk transforme cette capacité technique en Collaborateur IA : une responsabilité claire, des missions, des outils autorisés, une mémoire contrôlée et des validations humaines.',
    openCta: 'Découvrir Hermes et l’open source',
    openHref: '/manifeste',

    editorialEyebrow: 'Pourquoi maintenant',
    editorialTitle: 'Il n’a jamais été aussi accessible de construire une entreprise capable.',
    editorialBody: 'Paul Graham rappelle que les grandes entreprises commencent par un petit groupe qui comprend profondément un problème. Sam Altman observe que l’intelligence devient une ressource de plus en plus accessible. Ensemble, ces idées décrivent une fenêtre rare : une petite équipe peut désormais construire, tester et servir beaucoup plus vite, sans cesser d’écouter ses clients.',
    editorialCta: 'Lire notre analyse de Paul Graham et Sam Altman',
    editorialHref: '/blog/paul-graham-sam-altman-creer-maintenant',
    editorialNote: 'Une lecture éditoriale Unitalk de leurs idées publiques, sans citation ni approbation implicite.',

    modelEyebrow: 'Votre modèle',
    modelTitle: 'Votre rémunération suit votre niveau d’engagement.',
    modelIntro: 'Selon votre activité, vous pouvez :',
    modelItems: [
      'Co-créateur : vendre vos créations et prestations',
      'Affilié : recommander un client attribué à votre code',
      'Partenaire : vendre, déployer et accompagner',
      'Platform : construire une expérience sous votre marque',
      'Technologie : proposer une intégration ou une infrastructure',
      'Open source : contribuer à Hermes et à ses outils',
    ],
    modelNote:
      'Les commissions portent sur les montants éligibles effectivement encaissés. Elles ne garantissent aucun revenu et ne se cumulent pas sur une même vente, sauf accord explicite.',
    modelSignature: 'Privé par défaut. Partagé par choix.',

    programsEyebrow: 'Deux programmes commerciaux',
    programsTitle: 'Recommander n’est pas déployer.',
    programsLead: 'Choisissez le programme qui correspond au travail que vous prenez réellement en charge.',
    affiliateTitle: 'Affilié · 30 %',
    affiliateBody: 'Vous créez la mise en relation. Recevez 30 % des abonnements éligibles encaissés pendant la première année pour chaque nouveau client attribué à votre code.',
    affiliateItems: ['Code affilié personnel','Attribution des commandes','Aucun déploiement client requis'],
    affiliateCta: 'Rejoindre le programme d’affiliation',
    affiliateHref: 'mailto:partenaires@unitalk.ai?subject=Programme%20d%27affiliation%20Unitalk',
    partnerTitle: 'Partenaire · 50 %',
    partnerBody: 'Vous développez la relation commerciale, déployez les Collaborateurs IA et accompagnez le client. Recevez 50 % selon les conditions du programme.',
    partnerItems: ['Espace multi-clients','Déploiement et accompagnement','Prestations facturées librement'],
    partnerCta: 'Découvrir le programme Partenaire',
    programsNote: 'Les commissions s’appliquent aux montants éligibles effectivement encaissés, selon les règles d’attribution et les exclusions de chaque programme. Elles ne garantissent aucun revenu et ne se cumulent pas sur une même vente, sauf accord explicite.',

    finalTitle: 'Votre activité peut commencer par une seule mission utile.',
    finalBody: 'Cadrez le problème, construisez la preuve, puis choisissez le programme qui correspond au travail que vous prenez réellement en charge.',
    finalCta: 'Commencer gratuitement',
    finalHref: '/academy/parcours-gratuits/premiere-mission-ia',
    finalTag: 'Mission · Création · Preuve · Déploiement',
  },
  en: {
    heroTag: 'Deployment · Infrastructure · Integrations · Open source · Training',
    heroTitle: 'Let’s build the AI Collaborator ecosystem.',
    heroLead:
      'Deploy Unitalk at your clients, build on its infrastructure, connect your solutions or contribute to Hermes.',
    heroSub:
      'Unitalk brings together the partners who turn AI into useful, governed and durable work for companies.',
    heroCta: 'Find my place',
    heroCtaHref: 'mailto:partenaires@unitalk.ai',
    heroSecondary: 'Discover Hermes',
    heroSecondaryHref: '/manifeste',

    sequenceEyebrow: 'The simplest path',
    sequenceTitle: 'Do not start by becoming a partner. Start by becoming useful.',
    sequence: [
      { n:'01', title:'Find a mission', body:'Start from a precise problem and a person who expects a result.' },
      { n:'02', title:'Build the solution', body:'Build and test the AI Collaborator with the domain expert and human approvals.' },
      { n:'03', title:'Show the proof', body:'Demonstrate the result, limits, corrections and value delivered.' },
      { n:'04', title:'Choose your model', body:'Refer Unitalk or take ownership of sales, deployment and follow-up.' },
    ],

    pathsEyebrow: 'Several ways to build with Unitalk',
    pathsTitle: 'Choose your path.',
    paths: [
      {
        title: 'Deploy at your clients',
        audience: 'Agency, consultancy or integrator.',
        body: 'Create, configure and support AI Collaborators in separate client environments.',
        cta: 'Discover Partner — €499 / month',
        href: '/partenaires/deployer',
      },
      {
        title: 'Build your product',
        audience: 'Software vendor, platform or service provider.',
        body: 'Integrate Unitalk’s agents, memory, models and execution into your own experience, under your brand.',
        cta: 'Discover Platform — Custom',
        href: '/platform',
      },
      {
        title: 'Connect your solution',
        audience: 'You provide an application, an API, a model or infrastructure.',
        body: 'Make your technology available to AI Collaborators within the rights defined by each company.',
        cta: 'Propose an integration',
        href: 'mailto:partenaires@unitalk.ai',
        external: true,
      },
      {
        title: 'Contribute to open source',
        audience: 'Developer, researcher or member of a technical community.',
        body: 'Contribute to Hermes, build tools and improve the autonomous engine behind Unitalk’s AI Collaborators.',
        cta: 'Discover Hermes',
        href: '/manifeste',
      },
      {
        title: 'Refer Unitalk',
        audience: 'Consultant, creator, expert or community member.',
        body: 'Introduce Unitalk to new companies and receive 30% of collected subscriptions during their first year.',
        cta: 'Join the affiliate program',
        href: 'mailto:partenaires@unitalk.ai?subject=Unitalk%20affiliate%20program',
        external: true,
      },
      {
        title: 'Share your expertise',
        audience: 'Trainer or domain specialist.',
        body: 'Create learning paths, formalize methods and support teams in their collaboration with AI.',
        cta: 'Discover experts',
        href: '/experts',
      },
    ] as Path[],

    baseEyebrow: 'A common foundation',
    baseTitle: 'You bring your expertise. Unitalk connects the building blocks.',
    baseIntro: 'Depending on the partnership, Unitalk provides:',
    baseItems: [
      'AI Collaborators powered by Hermes',
      'persistent identity and memory',
      'unlimited job profiles',
      'missions, skills and applications',
      'a workspace shared by humans and AI',
      'a multi-model AI Gateway',
      'isolated environments',
      'APIs, MCP and webhooks',
      'governance of access and validations',
    ],
    baseNote: 'The exact capabilities depend on the chosen program.',

    openEyebrow: 'An open foundation',
    openTitle: 'Hermes is open. Unitalk makes it enterprise-ready.',
    openBody1:
      'Hermes is an open-source autonomous agent able to use tools, complete tasks and improve through its memory and skills.',
    openBody2:
      'Unitalk adds a professional identity, an attachment, governed memory, communications, a workspace and infrastructure fit for enterprise work.',
    openCta: 'Discover Hermes and open source',
    openHref: '/manifeste',

    editorialEyebrow: 'Why now',
    editorialTitle: 'Building a capable company has never been this accessible.',
    editorialBody: 'Paul Graham reminds founders that great companies begin with a small group that deeply understands a problem. Sam Altman argues that intelligence is becoming increasingly accessible. Together, these ideas describe a rare window: a small team can now build, test and serve much faster without ceasing to listen to customers.',
    editorialCta: 'Read our analysis of Paul Graham and Sam Altman',
    editorialHref: '/blog/paul-graham-sam-altman-creer-maintenant',
    editorialNote: 'A Unitalk editorial reading of their public ideas, with no implied quote or endorsement.',

    modelEyebrow: 'Your model',
    modelTitle: 'Create the value that fits you.',
    modelIntro: 'Depending on your activity, you can:',
    modelItems: [
      'bill your services',
      'deploy Unitalk at your clients',
      'build your own product',
      'publish skills and applications',
      'offer infrastructure or an integration',
      'train and support teams',
    ],
    modelNote:
      'What belongs to a client stays private. What can be shared is shared only according to the defined rights.',
    modelSignature: 'Private by default. Shared by choice.',

    programsEyebrow: 'Two commercial programs',
    programsTitle: 'Referring is not deploying.',
    programsLead: 'Choose the program that matches the work you actually take ownership of.',
    affiliateTitle: 'Affiliate · 30%',
    affiliateBody: 'You make the introduction. Receive 30% of eligible subscriptions collected during the first year for each new client attributed to your code.',
    affiliateItems: ['Personal affiliate code','Order attribution','No client deployment required'],
    affiliateCta: 'Join the affiliate program',
    affiliateHref: 'mailto:partenaires@unitalk.ai?subject=Unitalk%20affiliate%20program',
    partnerTitle: 'Partner · 50%',
    partnerBody: 'You develop the commercial relationship, deploy AI Collaborators and support the client. Receive 50% under the program terms.',
    partnerItems: ['Multi-client workspace','Deployment and support','Freely priced services'],
    partnerCta: 'Discover the Partner program',
    programsNote: 'Commissions apply to eligible amounts actually collected, under each program’s attribution rules and exclusions. They do not guarantee income and cannot be combined on the same sale unless explicitly agreed.',

    finalTitle: 'What place do you want in the Unitalk ecosystem?',
    finalBody: 'Tell us about your activity. Alma will point you to the right program.',
    finalCta: 'Become a partner',
    finalHref: 'mailto:partenaires@unitalk.ai',
    finalTag: 'Deployment · Infrastructure · Integrations · Open source · Training',
  },
} as const

export function PartnersContent() {
  const { lang } = useLanguage()
  const t = COPY[lang]

  return (
    <main className="bg-[#F3EFE6] pt-[76px] text-[#1C1A17]">
      {/* Hero */}
      <section className="relative overflow-hidden px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl py-20 text-center sm:py-28">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="flex justify-center"
          >
            <ProofPill>{t.heroTag}</ProofPill>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.05 }}
            className="mt-6 text-balance font-sf text-4xl font-bold leading-[1.05] tracking-[-0.03em] sm:text-5xl md:text-6xl"
          >
            {t.heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.12 }}
            className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-[#4E483F]"
          >
            {t.heroLead}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.16 }}
            className="mx-auto mt-4 max-w-2xl text-pretty text-[15px] leading-relaxed text-[#6B6560]"
          >
            {t.heroSub}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.22 }}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link
              href={t.heroCtaHref}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#D10E63] px-7 text-sm font-semibold text-[#FBF9F3] transition-colors hover:bg-[#B00C54]"
            >
              {t.heroCta}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={t.heroSecondaryHref}
              className="inline-flex h-12 items-center justify-center gap-1.5 rounded-full border border-[#D8D0C2] px-7 text-sm font-semibold text-[#1C1A17] transition-colors hover:border-[#1C1A17]"
            >
              {t.heroSecondary}
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="border-t border-[#E4DDCE] bg-[#181615] px-5 py-16 text-[#FAF8F3] sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F2A4C5]">{t.sequenceEyebrow}</p>
          <h2 className="mt-4 max-w-4xl text-balance font-sf text-3xl font-bold leading-tight tracking-[-0.03em] sm:text-5xl">{t.sequenceTitle}</h2>
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
            {t.sequence.map((step) => <article key={step.n} className="min-h-56 bg-[#181615] p-6"><span className="font-mono text-xs font-bold text-[#F2A4C5]">{step.n}</span><h3 className="mt-8 font-sf text-xl font-bold">{step.title}</h3><p className="mt-3 text-sm leading-7 text-[#CFC6B8]">{step.body}</p></article>)}
          </div>
        </div>
      </section>

      {/* Paths */}
      <section className="border-t border-[#E4DDCE] px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D10E63]">
              {t.pathsEyebrow}
            </p>
            <h2 className="mt-3 text-balance font-sf text-3xl font-bold tracking-[-0.02em] sm:text-4xl">
              {t.pathsTitle}
            </h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {t.paths.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, ease, delay: i * 0.04 }}
                className="flex flex-col rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-6"
              >
                <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#857C6E]">
                  {p.audience}
                </p>
                <h3 className="mt-3 font-sf text-xl font-bold tracking-[-0.01em]">{p.title}</h3>
                <p className="mt-2 flex-1 text-[14px] leading-relaxed text-[#4E483F]">{p.body}</p>
                {p.external ? (
                  <a
                    href={p.href}
                    className="group mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#B00C54] transition-colors hover:text-[#8A0A41]"
                  >
                    {p.cta}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                ) : (
                  <Link
                    href={p.href}
                    className="group mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#B00C54] transition-colors hover:text-[#8A0A41]"
                  >
                    {p.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="programmes" className="border-t border-[#E4DDCE] px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D10E63]">{t.programsEyebrow}</p>
          <div className="mt-4 grid gap-7 lg:grid-cols-[.8fr_1.2fr] lg:items-end"><h2 className="text-balance font-sf text-3xl font-bold tracking-[-0.03em] sm:text-5xl">{t.programsTitle}</h2><p className="max-w-2xl text-[15px] leading-7 text-[#4E483F]">{t.programsLead}</p></div>
          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            <article id="affiliation" className="flex flex-col rounded-2xl border border-[#D8D0C2] bg-[#FBF9F3] p-7 sm:p-8"><p className="font-mono text-[11px] font-bold uppercase tracking-[.16em] text-[#B00C54]">{t.affiliateTitle}</p><p className="mt-5 text-[15px] leading-7 text-[#4E483F]">{t.affiliateBody}</p><ul className="mt-6 space-y-3">{t.affiliateItems.map(item=><li key={item} className="flex gap-3 text-sm font-semibold"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#D10E63]"/>{item}</li>)}</ul><a href={t.affiliateHref} className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#B00C54]">{t.affiliateCta}<ArrowUpRight className="size-4"/></a></article>
            <article className="flex flex-col rounded-2xl bg-[#D10E63] p-7 text-white sm:p-8"><p className="font-mono text-[11px] font-bold uppercase tracking-[.16em] text-white/70">{t.partnerTitle}</p><p className="mt-5 text-[15px] leading-7 text-white/85">{t.partnerBody}</p><ul className="mt-6 space-y-3">{t.partnerItems.map(item=><li key={item} className="flex gap-3 text-sm font-semibold"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-white"/>{item}</li>)}</ul><Link href="/partenaires/deployer" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-white">{t.partnerCta}<ArrowRight className="size-4"/></Link></article>
          </div>
          <p className="mt-6 max-w-4xl text-xs leading-6 text-[#6B6560]">{t.programsNote}</p>
        </div>
      </section>

      {/* Common foundation */}
      <section className="border-t border-[#E4DDCE] bg-[#EFEADF] px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D10E63]">
              {t.baseEyebrow}
            </p>
            <h2 className="mt-3 text-balance font-sf text-3xl font-bold tracking-[-0.02em] sm:text-4xl">
              {t.baseTitle}
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-[#4E483F]">{t.baseIntro}</p>
          </div>
          <div>
            <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {t.baseItems.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-[#1C1A17]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D10E63]" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[13px] italic text-[#6B6560]">{t.baseNote}</p>
          </div>
        </div>
      </section>

      {/* Open foundation */}
      <section className="border-t border-[#E4DDCE] px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D10E63]">
            {t.openEyebrow}
          </p>
          <h2 className="mt-3 text-balance font-sf text-3xl font-bold tracking-[-0.02em] sm:text-4xl">
            {t.openTitle}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-[15px] leading-relaxed text-[#4E483F]">{t.openBody1}</p>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-[15px] leading-relaxed text-[#4E483F]">{t.openBody2}</p>
          <Link
            href={t.openHref}
            className="group mt-7 inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#B00C54] transition-colors hover:text-[#8A0A41]"
          >
            {t.openCta}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>

      <section className="border-t border-[#E4DDCE] bg-[#D10E63] px-5 py-16 text-white sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div><p className="font-mono text-[11px] font-semibold uppercase tracking-[.2em] text-white/65">{t.editorialEyebrow}</p><h2 className="mt-4 text-balance font-sf text-3xl font-bold leading-tight tracking-[-.03em] sm:text-5xl">{t.editorialTitle}</h2></div>
          <div><p className="text-[16px] leading-8 text-white/85">{t.editorialBody}</p><Link href={t.editorialHref} className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#181615] px-6 py-3 text-sm font-bold text-white">{t.editorialCta}<ArrowRight className="size-4"/></Link><p className="mt-4 text-xs leading-5 text-white/60">{t.editorialNote}</p></div>
        </div>
      </section>

      {/* Your model */}
      <section className="border-t border-[#E4DDCE] bg-[#EFEADF] px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D10E63]">
              {t.modelEyebrow}
            </p>
            <h2 className="mt-3 text-balance font-sf text-3xl font-bold tracking-[-0.02em] sm:text-4xl">
              {t.modelTitle}
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-[#4E483F]">{t.modelIntro}</p>
            <p className="mt-6 text-[14px] leading-relaxed text-[#6B6560]">{t.modelNote}</p>
            <p className="mt-4 font-sf text-lg font-bold tracking-[-0.01em] text-[#1C1A17]">{t.modelSignature}</p>
          </div>
          <div>
            <ul className="grid gap-3">
              {t.modelItems.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-[#1C1A17]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D10E63]" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#161412] px-5 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-balance font-sf text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-[#FBF9F3] sm:text-4xl">
            {t.finalTitle}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-[15px] leading-relaxed text-[#B8B0A4]">{t.finalBody}</p>
          <Link
            href={t.finalHref}
            className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#D10E63] px-8 text-sm font-semibold text-[#FBF9F3] transition-colors hover:bg-[#B00C54]"
          >
            {t.finalCta}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-6 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[#8F877A]">
            {t.finalTag}
          </p>
        </div>
      </section>
    </main>
  )
}
