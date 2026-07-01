'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const BASE_PRICE = 29

type ModelKey = 'byok' | 'credits'
type ServiceKey = 'alma' | 'engineers'

const MODEL_OPTIONS: Record<
  ModelKey,
  { label: string; add: number | null; desc: string; feature: string }
> = {
  byok: {
    label: 'Vos propres clés API',
    add: 0,
    desc: 'BYOK — vous gérez vos accès API directement. Les modèles restent à votre charge, au prix réel.',
    feature: 'Vos propres clés API (BYOK)',
  },
  credits: {
    label: 'Crédits IA prépayés',
    add: 20,
    desc: 'Un pack de crédits géré par Unitalk, sans aucune clé à configurer. Vous démarrez en une minute.',
    feature: 'Crédits IA prépayés — rien à gérer',
  },
}

const SERVICE_OPTIONS: Record<
  ServiceKey,
  { label: string; add: number | null; desc: string; feature: string }
> = {
  alma: {
    label: 'Alma incluse',
    add: 0,
    desc: 'Agent IA vocal — crée et fait évoluer votre agent, gère l’essentiel. Inclus.',
    feature: 'Accompagnement par Alma',
  },
  engineers: {
    label: 'Ingénieurs IA à la demande',
    add: null,
    desc: 'Nos ingénieurs IA interviennent selon vos besoins, facturés à l’intervention.',
    feature: 'Ingénieurs IA à la demande',
  },
}

export function PricingSection() {
  const [model, setModel] = useState<ModelKey>('byok')
  const [service, setService] = useState<ServiceKey>('alma')

  const modelOpt = MODEL_OPTIONS[model]
  const serviceOpt = SERVICE_OPTIONS[service]

  const onQuote = modelOpt.add === null || serviceOpt.add === null
  const total = BASE_PRICE + (modelOpt.add ?? 0) + (serviceOpt.add ?? 0)
  const priceLabel = onQuote ? 'Sur devis' : `${total}€`
  const periodLabel = onQuote ? 'selon vos besoins' : '/ mois / agent'

  const features = [
    '1 agent sur mesure, 10 profils inclus',
    'Accès aux meilleurs modèles d’IA',
    modelOpt.feature,
    'Multimodal : voix, texte, image, audio, code',
    'Mémoire d’entreprise',
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
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D10E63]">Tarif</p>
          <h2 className="mt-3 font-sf text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] text-[#1C1A17] text-balance" style={{ letterSpacing: '-0.03em' }}>
            Un prix clair. <span className="text-[#D10E63]">Zéro surprise.</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#4E483F]">
            Commencez gratuitement, sans carte bancaire. Vous ne payez que si votre agent vous fait gagner du temps — et vous résiliez quand vous voulez.
          </p>
        </motion.div>

        {/* Configurator card */}
        <motion.div
          variants={itemVariants}
          className="rounded-3xl border border-[#DcD4C4] bg-[#FBF9F3] p-6 sm:p-8 shadow-[0_20px_50px_-30px_rgba(28,26,23,0.25)]"
        >
          {/* Intro line */}
          <p className="mb-7 text-sm leading-relaxed text-[#4E483F]">
            <span className="font-medium text-[#1C1A17]">Un agent. Dix profils inclus.</span>{' '}
            Accès aux meilleurs modèles. Accompagnement à la demande. Composez la formule qui vous ressemble.
          </p>

          <div className="grid gap-8 sm:grid-cols-2">
            {/* Left: configurator + price */}
            <div>
              <div className="space-y-5">
                {/* Selector 1 — Models */}
                <div>
                  <label htmlFor="model-select" className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#857C6E]">
                    Modèles IA
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
                          {MODEL_OPTIONS[k].add === 0 ? ' — 0€' : MODEL_OPTIONS[k].add ? ` — +${MODEL_OPTIONS[k].add}€` : ''}
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
                    Mise en service
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
                          {SERVICE_OPTIONS[k].add === 0 ? ' — inclus' : SERVICE_OPTIONS[k].add ? ` — +${SERVICE_OPTIONS[k].add}€` : ' — sur devis'}
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
              <div className="mt-6 flex items-baseline gap-1.5 border-t border-[#DcD4C4] pt-6">
                <motion.span
                  key={priceLabel}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`font-sf font-bold text-[#1C1A17] whitespace-nowrap ${onQuote ? 'text-3xl' : 'text-5xl'}`}
                  style={{ letterSpacing: '-0.03em' }}
                >
                  {priceLabel}
                </motion.span>
                <span className="text-sm text-[#857C6E]">{periodLabel}</span>
              </div>

              <p className="mt-2 text-xs text-[#857C6E]">Vous ne payez que ce que vous consommez.</p>

              <button className="mt-6 w-full rounded-full bg-[#D10E63] px-5 py-3.5 text-sm font-semibold text-[#FBF9F3] transition-colors hover:bg-[#B00B52]">
                Créer mon agent gratuitement
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
            Toute une équipe à équiper ?{' '}
            <a href="#" className="font-medium text-[#D10E63] underline-offset-4 hover:underline">
              Ajoutez autant d’agents que nécessaire
            </a>
          </span>
          <span className="hidden text-[#C4BAA8] sm:inline">·</span>
          <span>
            Données sensibles ?{' '}
            <a href="#" className="font-medium text-[#D10E63] underline-offset-4 hover:underline">
              Téléchargez la version Desktop gratuite open source
            </a>
          </span>
          <span className="hidden text-[#C4BAA8] sm:inline">·</span>
          <span>
            Vous êtes un grand compte ?{' '}
            <a href="#" className="font-medium text-[#D10E63] underline-offset-4 hover:underline">
              Parlons d’une offre sur mesure
            </a>
          </span>
        </motion.div>
      </div>
    </motion.section>
  )
}
