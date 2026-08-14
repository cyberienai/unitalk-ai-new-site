'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/language-context'
import { AlmaInline } from '@/components/alma-inline'

const BASE_PRICE = 29

type ModelKey = 'byok' | 'c10' | 'c50' | 'c100' | 'c200' | 'unsure'
type ServiceKey = 'alma' | 'onboarding' | 'unsure'
type Option = { label: string; add: number | null; desc: string; feature: string }

const T = {
  fr: {
    eyebrow: 'Tarif',
    title1: 'Un prix clair. ',
    title2: 'Zéro surprise.',
    subtitle: 'Commencez gratuitement, sans carte bancaire. Puis invitez vos collaborateurs à parler avec Alma pour personnaliser leur agent.',
    packTitle: 'Pack Solo',
    packIntroStrong: 'Votre agent IA personnalisé.',
    packIntro: 'Accès aux meilleurs modèles. Accompagnement à la demande. Composez la formule qui vous ressemble.',
    modelsLabel: 'Modèles IA',
    serviceLabel: 'Mise en service',
    included: ' — inclus',
    period: '/ mois / agent',
    from: 'à partir de ',
    footnote: 'Essai de 7 jours · sans carte bancaire',
    cta: 'Créer mon agent gratuitement',
    teamPre: 'Version collaborative pour les équipes ?',
    teamLink: 'Alma interviewe vos collègues',
    desktopPre: 'Données sensibles ?',
    desktopLink: 'Téléchargez la version Desktop gratuite open source',
    businessPre: 'Vous voulez votre infrastructure IA privée ?',
    businessLink: 'Parlons d’une offre sur mesure',
    features: [
      '1 agent sur mesure, 10 profils inclus',
      'Adresse email, numéro de téléphone, agenda, fichiers et contacts dédiés',
      'Propulsé par Hermes, notre moteur open source',
      'Accès aux meilleurs modèles d’IA via des crédits prépayés',
      'Multimodal : voix, texte, image, audio, code',
      'Contexte d’entreprise persistant',
      'Compétences auto-apprises, extensibles à l’infini',
      'Recherche Web et navigation sur Internet',
      'Exécution de code en environnement sécurisé',
      'Connexion à 3 000+ apps via MCP',
      'Accessible partout : interface Web, apps de messagerie, Desktop et terminal',
    ],
    models: {
      byok: { label: 'Vos propres clés API — 0€', add: 0, desc: 'BYOK — vous gérez vos accès API directement. Les modèles restent à votre charge, au prix réel.', feature: 'Vos propres clés API (BYOK)' },
      c10: { label: 'Crédits IA prépayés — 20€', add: 20, desc: 'Un pack de crédits géré par Unitalk, sans aucune clé à configurer. Idéal pour démarrer.', feature: 'Crédits IA prépayés — rien à gérer' },
      c50: { label: 'Crédits IA prépayés — 50€', add: 50, desc: 'Un pack de crédits géré par Unitalk, sans aucune clé à configurer. Pour un usage régulier.', feature: 'Crédits IA prépayés — rien à gérer' },
      c100: { label: 'Crédits IA prépayés — 100€', add: 100, desc: 'Un pack de crédits géré par Unitalk, sans aucune clé à configurer. Pour un usage intensif.', feature: 'Crédits IA prépayés — rien à gérer' },
      c200: { label: 'Crédits IA prépayés — 200€', add: 200, desc: 'Un pack de crédits géré par Unitalk, sans aucune clé à configurer. Pour les gros volumes.', feature: 'Crédits IA prépayés — rien à gérer' },
      unsure: { label: 'Je ne sais pas encore', add: null, desc: 'Aucun souci — vous verrez cela avec Alma lors de votre appel. Elle vous recommandera la meilleure option.', feature: 'Modèles IA — à définir avec Alma' },
    } as Record<ModelKey, Option>,
    services: {
      alma: { label: 'Alma, votre conseillère IA vocale', add: 0, desc: 'Conseillère IA vocale — crée et fait évoluer votre agent, gère l’essentiel. Inclus.', feature: 'Accompagnement par Alma' },
      onboarding: { label: 'Onboarding humain (1h)', add: 99, desc: 'Nos ingénieurs IA configurent votre agent avec vous lors d’une session d’1h.', feature: 'Onboarding humain (1h) par nos ingénieurs' },
      unsure: { label: 'Je ne sais pas encore', add: null, desc: 'Aucun souci — vous verrez cela avec Alma lors de votre appel. Elle vous guidera selon vos besoins.', feature: 'Mise en service — à définir avec Alma' },
    } as Record<ServiceKey, Option>,
  },
  en: {
    eyebrow: 'Pricing',
    title1: 'A clear price. ',
    title2: 'Zero surprises.',
    subtitle: 'Start for free, no credit card. Then invite your colleagues to talk with Alma to customize their agent.',
    packTitle: 'Solo Pack',
    packIntroStrong: 'Your custom AI agent.',
    packIntro: 'Access to the best models. On-demand support. Build the plan that fits you.',
    modelsLabel: 'AI models',
    serviceLabel: 'Setup',
    included: ' — included',
    period: '/ month / agent',
    from: 'from ',
    footnote: '7-day trial · no credit card',
    cta: 'Create my agent for free',
    teamPre: 'A collaborative version for teams?',
    teamLink: 'Alma interviews your colleagues',
    desktopPre: 'Sensitive data?',
    desktopLink: 'Download the free open-source Desktop version',
    businessPre: 'Want your own private AI infrastructure?',
    businessLink: 'Let’s talk about a custom plan',
    features: [
      '1 custom agent, 10 profiles included',
      'Dedicated email address, phone number, calendar, files and contacts',
      'Powered by Hermes, our open-source engine',
      'Access to the best AI models via prepaid credits',
      'Multimodal: voice, text, image, audio, code',
      'Persistent company context',
      'Self-taught skills, infinitely extensible',
      'Web search and internet browsing',
      'Code execution in a secure environment',
      'Connection to 3,000+ apps via MCP',
      'Available everywhere: web interface, messaging apps, Desktop and terminal',
    ],
    models: {
      byok: { label: 'Your own API keys — €0', add: 0, desc: 'BYOK — you manage your API access directly. Models are billed to you at actual cost.', feature: 'Your own API keys (BYOK)' },
      c10: { label: 'Prepaid AI credits — €20', add: 20, desc: 'A credit pack managed by Unitalk, no key to configure. Ideal to get started.', feature: 'Prepaid AI credits — nothing to manage' },
      c50: { label: 'Prepaid AI credits — €50', add: 50, desc: 'A credit pack managed by Unitalk, no key to configure. For regular use.', feature: 'Prepaid AI credits — nothing to manage' },
      c100: { label: 'Prepaid AI credits — €100', add: 100, desc: 'A credit pack managed by Unitalk, no key to configure. For intensive use.', feature: 'Prepaid AI credits — nothing to manage' },
      c200: { label: 'Prepaid AI credits — €200', add: 200, desc: 'A credit pack managed by Unitalk, no key to configure. For high volumes.', feature: 'Prepaid AI credits — nothing to manage' },
      unsure: { label: 'I don’t know yet', add: null, desc: 'No worries — you’ll sort this out with Alma on your call. She’ll recommend the best option.', feature: 'AI models — to define with Alma' },
    } as Record<ModelKey, Option>,
    services: {
      alma: { label: 'Alma, your AI voice advisor', add: 0, desc: 'AI voice advisor — creates and evolves your agent, handles the essentials. Included.', feature: 'Support from Alma' },
      onboarding: { label: 'Human onboarding (1h)', add: 99, desc: 'Our AI engineers configure your agent with you during a 1-hour session.', feature: 'Human onboarding (1h) by our engineers' },
      unsure: { label: 'I don’t know yet', add: null, desc: 'No worries — you’ll sort this out with Alma on your call. She’ll guide you based on your needs.', feature: 'Setup — to define with Alma' },
    } as Record<ServiceKey, Option>,
  },
}

export function PricingSection() {
  const [model, setModel] = useState<ModelKey>('byok')
  const [service, setService] = useState<ServiceKey>('alma')
  const { lang } = useLanguage()
  const t = T[lang]

  const MODEL_OPTIONS = t.models
  const SERVICE_OPTIONS = t.services
  const modelOpt = MODEL_OPTIONS[model]
  const serviceOpt = SERVICE_OPTIONS[service]

  const isUndefined = modelOpt.add === null || serviceOpt.add === null
  const total = BASE_PRICE + (modelOpt.add ?? 0) + (serviceOpt.add ?? 0)
  const priceLabel = isUndefined ? `${t.from}${total}€` : `${total}€`
  const periodLabel = t.period

  const features = [
    t.features[0],
    t.features[1],
    t.features[2],
    t.features[3],
    modelOpt.feature,
    t.features[4],
    t.features[5],
    t.features[6],
    t.features[7],
    t.features[8],
    t.features[9],
    t.features[10],
    serviceOpt.feature,
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.section
      id="offres"
      className="relative overflow-hidden bg-[#F3EFE6] py-12 sm:py-20 md:py-28 border-t border-[#DcD4C4]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '100px' }}
      variants={containerVariants}
    >
      <div className="relative z-10 mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div className="mb-8 sm:mb-12 max-w-2xl" variants={itemVariants}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D10E63]">{t.eyebrow}</p>
          <h2 className="mt-3 font-sf text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] text-[#1C1A17] text-balance" style={{ letterSpacing: '-0.03em' }}>
            {t.title1}<span className="text-[#D10E63]">{t.title2}</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#4E483F]">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Configurator card */}
        <motion.div
          variants={itemVariants}
          className="rounded-3xl border border-[#DcD4C4] bg-[#FBF9F3] p-6 sm:p-8 shadow-[0_20px_50px_-30px_rgba(28,26,23,0.25)]"
        >
          {/* Pack title */}
          <h3 className="font-sf text-2xl font-bold text-[#1C1A17]" style={{ letterSpacing: '-0.02em' }}>
            {t.packTitle}
          </h3>

          {/* Intro line */}
          <p className="mt-2 mb-7 text-sm leading-relaxed text-[#4E483F]">
            <span className="font-medium text-[#1C1A17]">{t.packIntroStrong}</span>{' '}
            {t.packIntro}
          </p>

          <div className="grid gap-8 sm:grid-cols-2">
            {/* Left: configurator + price */}
            <div>
              <div className="space-y-5">
                {/* Selector 1 — Models */}
                <div>
                  <label htmlFor="model-select" className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#857C6E]">
                    {t.modelsLabel}
                  </label>
                  <div className="relative mt-2">
                    <select
                      id="model-select"
                      value={model}
                      onChange={(e) => setModel(e.target.value as ModelKey)}
                      className="w-full appearance-none rounded-xl border border-[#DcD4C4] bg-[#F3EFE6] px-4 py-3 pr-10 text-sm font-medium text-[#1C1A17] transition-colors hover:border-[#D10E63]/40 focus:border-[#D10E63] focus:outline-none"
                    >
                      {(Object.keys(MODEL_OPTIONS) as ModelKey[]).map((k) => (
                        <option key={k} value={k}>
                          {MODEL_OPTIONS[k].label}
                        </option>
                      ))}
                    </select>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#857C6E]">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-[#857C6E]">{modelOpt.desc}</p>
                </div>

                {/* Selector 2 — Service */}
                <div>
                  <label htmlFor="service-select" className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#857C6E]">
                    {t.serviceLabel}
                  </label>
                  <div className="relative mt-2">
                    <select
                      id="service-select"
                      value={service}
                      onChange={(e) => setService(e.target.value as ServiceKey)}
                      className="w-full appearance-none rounded-xl border border-[#DcD4C4] bg-[#F3EFE6] px-4 py-3 pr-10 text-sm font-medium text-[#1C1A17] transition-colors hover:border-[#D10E63]/40 focus:border-[#D10E63] focus:outline-none"
                    >
                      {(Object.keys(SERVICE_OPTIONS) as ServiceKey[]).map((k) => (
                        <option key={k} value={k}>
                          {SERVICE_OPTIONS[k].label}
                          {SERVICE_OPTIONS[k].add === null ? '' : SERVICE_OPTIONS[k].add === 0 ? t.included : ` — +${SERVICE_OPTIONS[k].add}€`}
                        </option>
                      ))}
                    </select>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#857C6E]">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-[#857C6E]">{serviceOpt.desc}</p>
                </div>
              </div>

              {/* Live price */}
              <div className="mt-6 border-t border-[#DcD4C4] pt-6">
                <div className="flex items-baseline gap-1.5">
                  <motion.span
                    key={priceLabel}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="font-sf font-bold text-[#1C1A17] whitespace-nowrap"
                    style={{ letterSpacing: '-0.03em' }}
                  >
                    {isUndefined && <span className="text-lg font-medium text-[#857C6E]">{t.from}</span>}
                    <span className="text-5xl">{total}€</span>
                  </motion.span>
                  <span className="text-sm text-[#857C6E]">{periodLabel}</span>
                </div>
              </div>

              <p className="mt-2 text-xs text-[#857C6E]">{t.footnote}</p>

              <button className="mt-6 w-full rounded-full bg-[#D10E63] px-5 py-3.5 text-sm font-semibold text-[#FBF9F3] transition-colors hover:bg-[#B00B52]">
                {t.cta}
              </button>
            </div>

            {/* Right: features */}
            <ul className="space-y-3 sm:border-l sm:border-[#DcD4C4] sm:pl-8">
              {features.map((feature) => (
                <motion.li
                  key={feature}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-start gap-2.5 text-sm text-[#3A362F]"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 flex-shrink-0 text-[#D10E63]">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {feature}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Discreet secondary options */}
        <motion.div
          variants={itemVariants}
          className="mt-6 flex flex-col items-center gap-2 text-center text-sm text-[#4E483F] sm:flex-row sm:justify-center sm:gap-6"
        >
          <span>
            {t.teamPre}{' '}
            <a href="#" className="font-medium text-[#D10E63] underline-offset-4 hover:underline">
                          <AlmaInline /> {t.teamLink}
            </a>
          </span>
          <span className="hidden text-[#C4BAA8] sm:inline">·</span>
          <span>
            {t.desktopPre}{' '}
            <a href="#" className="font-medium text-[#D10E63] underline-offset-4 hover:underline">
              {t.desktopLink}
            </a>
          </span>
          <span className="hidden text-[#C4BAA8] sm:inline">·</span>
          <span>
            {t.businessPre}{' '}
            <a href="#" className="font-medium text-[#D10E63] underline-offset-4 hover:underline">
              {t.businessLink}
            </a>
          </span>
        </motion.div>
      </div>
    </motion.section>
  )
}
