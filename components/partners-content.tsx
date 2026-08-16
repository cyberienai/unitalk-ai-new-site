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
    heroTag: 'Déploiement · Infrastructure · Intégrations · Open source · Formation',
    heroTitle: 'Construisons l’écosystème des Collaborateurs IA.',
    heroLead:
      'Déployez Unitalk chez vos clients, construisez sur son infrastructure, connectez vos solutions ou contribuez à Hermes.',
    heroSub:
      'Unitalk réunit les partenaires capables de transformer l’IA en travail utile, gouverné et durable pour les entreprises.',
    heroCta: 'Trouver ma place',
    heroCtaHref: 'mailto:partenaires@unitalk.ai',
    heroSecondary: 'Découvrir Hermes',
    heroSecondaryHref: '/manifeste',

    pathsEyebrow: 'Plusieurs façons de construire avec Unitalk',
    pathsTitle: 'Choisissez votre voie.',
    paths: [
      {
        title: 'Déployer chez vos clients',
        audience: 'Agence, cabinet de conseil ou intégrateur.',
        body: 'Créez, configurez et accompagnez des Collaborateurs IA dans des environnements clients séparés.',
        cta: 'Découvrir Partner — 499 € / mois',
        href: '/partenaires/deployer',
      },
      {
        title: 'Construire votre produit',
        audience: 'Éditeur, plateforme ou fournisseur de services.',
        body: 'Intégrez les agents, la mémoire, les modèles et l’exécution Unitalk à votre propre expérience et sous votre marque.',
        cta: 'Découvrir Platform — Sur mesure',
        href: '/platform',
      },
      {
        title: 'Connecter votre solution',
        audience: 'Vous fournissez une application, une API, un modèle ou une infrastructure.',
        body: 'Rendez votre technologie accessible aux Collaborateurs IA dans le respect des droits définis par chaque entreprise.',
        cta: 'Proposer une intégration',
        href: 'mailto:partenaires@unitalk.ai',
        external: true,
      },
      {
        title: 'Contribuer à l’open source',
        audience: 'Développeur, chercheur ou membre d’une communauté technique.',
        body: 'Contribuez à Hermes, créez des outils et améliorez le moteur autonome sur lequel s’appuient les Collaborateurs IA Unitalk.',
        cta: 'Découvrir Hermes',
        href: '/manifeste',
      },
      {
        title: 'Recommander Unitalk',
        audience: 'Consultant, créateur, expert ou membre de la communauté.',
        body: 'Présentez Unitalk à de nouvelles entreprises et recevez 30 % des abonnements encaissés pendant leur première année.',
        cta: 'Rejoindre le programme d’affiliation',
        href: 'mailto:partenaires@unitalk.ai?subject=Programme%20d%27affiliation%20Unitalk',
        external: true,
      },
      {
        title: 'Transmettre votre expertise',
        audience: 'Formateur ou spécialiste métier.',
        body: 'Créez des parcours, formalisez des méthodes et accompagnez les équipes dans leur collaboration avec l’IA.',
        cta: 'Découvrir les experts',
        href: '/experts',
      },
    ] as Path[],

    baseEyebrow: 'Une base commune',
    baseTitle: 'Vous apportez votre expertise. Unitalk relie les briques.',
    baseIntro: 'Unitalk fournit, selon le partenariat :',
    baseItems: [
      'des Collaborateurs IA propulsés par Hermes',
      'une identité et une mémoire persistantes',
      'des profils métier illimités',
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
      'Unitalk lui ajoute une identité professionnelle, un rattachement, une mémoire gouvernée, des communications, un workspace et une infrastructure adaptée au travail en entreprise.',
    openCta: 'Découvrir Hermes et l’open source',
    openHref: '/manifeste',

    modelEyebrow: 'Votre modèle',
    modelTitle: 'Créez la valeur qui vous ressemble.',
    modelIntro: 'Selon votre activité, vous pouvez :',
    modelItems: [
      'facturer vos prestations',
      'déployer Unitalk chez vos clients',
      'construire votre propre produit',
      'publier des compétences et des applications',
      'proposer une infrastructure ou une intégration',
      'former et accompagner les équipes',
    ],
    modelNote:
      'Ce qui appartient à un client reste privé. Ce qui peut être partagé l’est uniquement selon les droits définis.',
    modelSignature: 'Privé par défaut. Partagé par choix.',

    finalTitle: 'Quelle place voulez-vous prendre dans l’écosystème Unitalk ?',
    finalBody: 'Présentez-nous votre activité. Alma vous orientera vers le programme adapté.',
    finalCta: 'Devenir partenaire',
    finalHref: 'mailto:partenaires@unitalk.ai',
    finalTag: 'Déploiement · Infrastructure · Intégrations · Open source · Formation',
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
            <a
              href={t.heroCtaHref}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#D10E63] px-7 text-sm font-semibold text-[#FBF9F3] transition-colors hover:bg-[#B00C54]"
            >
              {t.heroCta}
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href={t.heroSecondaryHref}
              className="inline-flex h-12 items-center justify-center gap-1.5 rounded-full border border-[#D8D0C2] px-7 text-sm font-semibold text-[#1C1A17] transition-colors hover:border-[#1C1A17]"
            >
              {t.heroSecondary}
            </Link>
          </motion.div>
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
                id={p.title === 'Recommander Unitalk' || p.title === 'Refer Unitalk' ? 'affiliation' : undefined}
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
          <a
            href={t.finalHref}
            className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#D10E63] px-8 text-sm font-semibold text-[#FBF9F3] transition-colors hover:bg-[#B00C54]"
          >
            {t.finalCta}
            <ArrowRight className="h-4 w-4" />
          </a>
          <p className="mt-6 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[#8F877A]">
            {t.finalTag}
          </p>
        </div>
      </section>
    </main>
  )
}
