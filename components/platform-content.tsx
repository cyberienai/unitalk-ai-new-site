'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { ProofPill } from '@/components/ui/proof-pill'

const ease = [0.22, 1, 0.36, 1] as const

const COPY = {
  fr: {
    heroTag: 'API · Multimodèle · Marque propre · Infrastructure dédiée',
    heroTitle: 'Construisez votre produit avec des Collaborateurs IA.',
    heroLead:
      'Intégrez des agents dotés d’une identité, d’une mémoire et de capacités d’action à votre propre expérience.',
    heroSub: 'Votre produit et votre marque restent devant. Unitalk fournit l’infrastructure agentique derrière.',
    heroCta: 'Parler à notre équipe',
    heroCtaHref: 'mailto:hello@unitalk.ai',

    augEyebrow: 'Votre produit, augmenté',
    augTitle: 'Plus qu’un modèle derrière une interface.',
    augIntro: 'Avec Unitalk Platform, chaque Collaborateur IA peut conserver :',
    augItems: [
      'une identité persistante',
      'une mémoire gouvernée',
      'des profils métier illimités',
      'des compétences versionnées',
      'des accès contrôlés',
      'un historique de travail',
    ],
    augNote: 'Les modèles, les outils et les responsabilités peuvent évoluer sans perdre l’expérience acquise.',

    infraEyebrow: 'L’infrastructure',
    infraTitle: 'Les briques dont votre produit a besoin.',
    bricks: [
      { t: 'Agents', d: 'Hermes transforme les missions, les compétences et les connaissances autorisées en actions.' },
      { t: 'Modèles', d: 'Utilisez l’AI Gateway Unitalk, vos propres clés API ou une configuration hybride.' },
      { t: 'Mémoire', d: 'Conservez le contexte et les méthodes selon les droits définis par votre entreprise.' },
      { t: 'Applications', d: 'Connectez vos services et vos données par API, MCP, webhooks ou intégrations spécifiques.' },
    ],

    offerEyebrow: 'Platform',
    offerTitle: 'Une infrastructure adaptée à votre expérience.',
    offerName: 'Sur mesure',
    offerItems: [
      'API Unitalk',
      'expérience et marque propres',
      'infrastructure dédiée',
      'moteur d’agents Hermes',
      'AI Gateway multimodèle',
      'mémoire et identité persistantes',
      'profils métier illimités',
      'intégrations spécifiques',
      'gouvernance personnalisée',
      'accompagnement d’architecture',
      'engagements de service adaptés',
    ],
    offerNote: 'Le tarif dépend des environnements, des volumes, des intégrations et du niveau de service attendu.',
    offerCta: 'Étudier votre projet',

    rulesEyebrow: 'Vos modèles. Vos règles.',
    rulesTitle: 'Vous gardez le contrôle.',
    rulesBody:
      'Choisissez vos modèles, vos fournisseurs, votre hébergement, vos limites de consommation et les actions qui nécessitent une validation humaine.',
    rulesIntro: 'Utilisez :',
    rulesItems: ['des crédits Unitalk', 'vos propres clés API', 'ou les deux'],
    rulesNote: 'Votre produit ne dépend pas d’un modèle unique.',

    openEyebrow: 'Une base ouverte',
    openTitle: 'Ouvert à la base. Gouverné en production.',
    openBody1: 'Unitalk s’appuie sur Hermes, son moteur d’agents open source.',
    openBody2:
      'Unitalk ajoute l’identité, la mémoire gouvernée, les communications, le workspace et l’infrastructure nécessaires à une exploitation professionnelle.',
    openCta: 'Découvrir Hermes',
    openHref: '/manifeste',

    vsEyebrow: 'Partner ou Platform ?',
    vsPartnerTitle: 'Partner',
    vsPartnerBody: 'Vous déployez Unitalk chez vos clients avec les outils Unitalk.',
    vsPartnerPrice: '499 € / mois',
    vsPartnerCta: 'Découvrir Partner',
    vsPartnerHref: '/partenaires/deployer',
    vsPlatformTitle: 'Platform',
    vsPlatformBody: 'Vous construisez votre propre produit sous votre marque.',
    vsPlatformPrice: 'Sur mesure',
    vsPlatformTag: 'Vous êtes ici',

    finalTitle: 'Donnez à votre produit sa propre infrastructure agentique.',
    finalBody:
      'Présentez-nous votre expérience, vos volumes et vos contraintes. Nous définirons l’architecture adaptée.',
    finalCta: 'Parler à notre équipe',
    finalHref: 'mailto:hello@unitalk.ai',
    finalTag: 'API · Multimodèle · Marque propre · Infrastructure dédiée',
  },
  en: {
    heroTag: 'API · Multi-model · Own brand · Dedicated infrastructure',
    heroTitle: 'Build your product with AI Collaborators.',
    heroLead: 'Integrate agents with an identity, a memory and the ability to act into your own experience.',
    heroSub: 'Your product and your brand stay in front. Unitalk provides the agentic infrastructure behind.',
    heroCta: 'Talk to our team',
    heroCtaHref: 'mailto:hello@unitalk.ai',

    augEyebrow: 'Your product, augmented',
    augTitle: 'More than a model behind an interface.',
    augIntro: 'With Unitalk Platform, each AI Collaborator can keep:',
    augItems: [
      'a persistent identity',
      'a governed memory',
      'unlimited job profiles',
      'versioned skills',
      'controlled access',
      'a work history',
    ],
    augNote: 'Models, tools and responsibilities can evolve without losing the experience acquired.',

    infraEyebrow: 'The infrastructure',
    infraTitle: 'The building blocks your product needs.',
    bricks: [
      { t: 'Agents', d: 'Hermes turns missions, skills and authorized knowledge into actions.' },
      { t: 'Models', d: 'Use the Unitalk AI Gateway, your own API keys or a hybrid setup.' },
      { t: 'Memory', d: 'Keep context and methods according to the rights defined by your company.' },
      { t: 'Applications', d: 'Connect your services and data via API, MCP, webhooks or specific integrations.' },
    ],

    offerEyebrow: 'Platform',
    offerTitle: 'Infrastructure tailored to your experience.',
    offerName: 'Custom',
    offerItems: [
      'Unitalk API',
      'own experience and brand',
      'dedicated infrastructure',
      'Hermes agent engine',
      'multi-model AI Gateway',
      'persistent memory and identity',
      'unlimited job profiles',
      'specific integrations',
      'custom governance',
      'architecture support',
      'tailored service-level commitments',
    ],
    offerNote: 'Pricing depends on environments, volumes, integrations and the expected service level.',
    offerCta: 'Study your project',

    rulesEyebrow: 'Your models. Your rules.',
    rulesTitle: 'You stay in control.',
    rulesBody:
      'Choose your models, your providers, your hosting, your consumption limits and the actions that require human validation.',
    rulesIntro: 'Use:',
    rulesItems: ['Unitalk credits', 'your own API keys', 'or both'],
    rulesNote: 'Your product does not depend on a single model.',

    openEyebrow: 'An open foundation',
    openTitle: 'Open at the core. Governed in production.',
    openBody1: 'Unitalk builds on Hermes, its open-source agent engine.',
    openBody2:
      'Unitalk adds the identity, governed memory, communications, workspace and infrastructure needed for professional operation.',
    openCta: 'Discover Hermes',
    openHref: '/manifeste',

    vsEyebrow: 'Partner or Platform?',
    vsPartnerTitle: 'Partner',
    vsPartnerBody: 'You deploy Unitalk at your clients with Unitalk’s tools.',
    vsPartnerPrice: '€499 / month',
    vsPartnerCta: 'Discover Partner',
    vsPartnerHref: '/partenaires/deployer',
    vsPlatformTitle: 'Platform',
    vsPlatformBody: 'You build your own product under your brand.',
    vsPlatformPrice: 'Custom',
    vsPlatformTag: 'You are here',

    finalTitle: 'Give your product its own agentic infrastructure.',
    finalBody: 'Tell us about your experience, your volumes and your constraints. We’ll define the right architecture.',
    finalCta: 'Talk to our team',
    finalHref: 'mailto:hello@unitalk.ai',
    finalTag: 'API · Multi-model · Own brand · Dedicated infrastructure',
  },
} as const

export function PlatformContent() {
  const { lang } = useLanguage()
  const t = COPY[lang]

  return (
    <main className="bg-[#F3EFE6] pt-[76px] text-[#1C1A17]">
      {/* Hero */}
      <section className="px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl py-20 text-center sm:py-28">
          <div className="flex justify-center">
            <ProofPill>{t.heroTag}</ProofPill>
          </div>
          <h1 className="mt-6 text-balance font-sf text-4xl font-bold leading-[1.05] tracking-[-0.03em] sm:text-5xl md:text-6xl">
            {t.heroTitle}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-[#4E483F]">{t.heroLead}</p>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-[15px] leading-relaxed text-[#6B6560]">{t.heroSub}</p>
          <div className="mt-9 flex justify-center">
            <a
              href={t.heroCtaHref}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#D10E63] px-7 text-sm font-semibold text-[#FBF9F3] transition-colors hover:bg-[#B00C54]"
            >
              {t.heroCta}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Your product augmented */}
      <section className="border-t border-[#E4DDCE] px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D10E63]">{t.augEyebrow}</p>
            <h2 className="mt-3 text-balance font-sf text-3xl font-bold tracking-[-0.02em] sm:text-4xl">{t.augTitle}</h2>
            <p className="mt-5 text-[15px] leading-relaxed text-[#4E483F]">{t.augIntro}</p>
            <p className="mt-6 text-[14px] leading-relaxed text-[#6B6560]">{t.augNote}</p>
          </div>
          <div>
            <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {t.augItems.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-[#1C1A17]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D10E63]" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Infrastructure bricks */}
      <section className="border-t border-[#E4DDCE] bg-[#EFEADF] px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D10E63]">{t.infraEyebrow}</p>
          <h2 className="mt-3 text-balance font-sf text-3xl font-bold tracking-[-0.02em] sm:text-4xl">{t.infraTitle}</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.bricks.map((b, i) => (
              <motion.div
                key={b.t}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, ease, delay: i * 0.05 }}
                className="rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-6"
              >
                <h3 className="font-sf text-lg font-bold tracking-[-0.01em]">{b.t}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[#4E483F]">{b.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform offer */}
      <section className="border-t border-[#E4DDCE] px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D10E63]">{t.offerEyebrow}</p>
            <h2 className="mt-3 text-balance font-sf text-3xl font-bold tracking-[-0.02em] sm:text-4xl">{t.offerTitle}</h2>
          </div>
          <div className="mt-10 rounded-3xl border border-[#1C1A17]/12 bg-[#FBF9F3] p-7 shadow-[0_24px_60px_-32px_rgba(28,26,23,0.35)] sm:p-9">
            <div className="flex items-baseline justify-between border-b border-[#E4DDCE] pb-5">
              <span className="font-sf text-2xl font-bold tracking-[-0.01em]">Platform</span>
              <span className="font-sf text-2xl font-bold tracking-[-0.02em] text-[#D10E63]">{t.offerName}</span>
            </div>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {t.offerItems.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-[#1C1A17]">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#D10E63]" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[13px] leading-relaxed text-[#6B6560]">{t.offerNote}</p>
            <a
              href={t.finalHref}
              className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#D10E63] px-7 text-sm font-semibold text-[#FBF9F3] transition-colors hover:bg-[#B00C54]"
            >
              {t.offerCta}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Your models, your rules */}
      <section className="border-t border-[#E4DDCE] bg-[#EFEADF] px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D10E63]">{t.rulesEyebrow}</p>
            <h2 className="mt-3 text-balance font-sf text-3xl font-bold tracking-[-0.02em] sm:text-4xl">{t.rulesTitle}</h2>
            <p className="mt-5 text-[15px] leading-relaxed text-[#4E483F]">{t.rulesBody}</p>
            <p className="mt-6 font-sf text-lg font-bold tracking-[-0.01em] text-[#1C1A17]">{t.rulesNote}</p>
          </div>
          <div>
            <p className="text-[15px] leading-relaxed text-[#4E483F]">{t.rulesIntro}</p>
            <ul className="mt-4 grid gap-3">
              {t.rulesItems.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-[#1C1A17]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D10E63]" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Open foundation */}
      <section className="border-t border-[#E4DDCE] px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D10E63]">{t.openEyebrow}</p>
          <h2 className="mt-3 text-balance font-sf text-3xl font-bold tracking-[-0.02em] sm:text-4xl">{t.openTitle}</h2>
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

      {/* Partner vs Platform */}
      <section className="border-t border-[#E4DDCE] bg-[#EFEADF] px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-center font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D10E63]">
            {t.vsEyebrow}
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-7">
              <h3 className="font-sf text-xl font-bold tracking-[-0.01em]">{t.vsPartnerTitle}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-[#4E483F]">{t.vsPartnerBody}</p>
              <p className="mt-5 font-sf text-2xl font-bold tracking-[-0.02em] text-[#1C1A17]">{t.vsPartnerPrice}</p>
              <Link
                href={t.vsPartnerHref}
                className="group mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#B00C54] transition-colors hover:text-[#8A0A41]"
              >
                {t.vsPartnerCta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
            <div className="rounded-2xl border-2 border-[#D10E63] bg-[#FBF3F7] p-7">
              <div className="flex items-center justify-between">
                <h3 className="font-sf text-xl font-bold tracking-[-0.01em]">{t.vsPlatformTitle}</h3>
                <span className="rounded-full bg-[#D10E63] px-3 py-1 text-[11px] font-semibold text-[#FBF9F3]">
                  {t.vsPlatformTag}
                </span>
              </div>
              <p className="mt-3 text-[14px] leading-relaxed text-[#4E483F]">{t.vsPlatformBody}</p>
              <p className="mt-5 font-sf text-2xl font-bold tracking-[-0.02em] text-[#D10E63]">{t.vsPlatformPrice}</p>
            </div>
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
          <p className="mt-6 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[#8F877A]">{t.finalTag}</p>
        </div>
      </section>
    </main>
  )
}
