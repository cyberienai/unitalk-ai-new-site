'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

type Mode = 'byok' | 'credits'

const MODES: Record<
  Mode,
  { price: string; period: string; note: string; features: string[] }
> = {
  byok: {
    price: '29€',
    period: '/ mois / agent',
    note: 'Vous apportez vos clés API (OpenAI, Anthropic, Google…). Vous ne payez que la plateforme, les modèles restent à votre charge, au prix réel.',
    features: [
      '1 agent sur mesure, 10 profils',
      'Vos propres clés — coûts modèles maîtrisés',
      'Multimodal : voix, texte, image',
      'Mémoire d’entreprise',
      'Accompagnement par Alma',
    ],
  },
  credits: {
    price: '49€',
    period: '/ mois / agent',
    note: 'Tout est inclus. Un pack de crédits géré par Unitalk, sans aucune clé à configurer. Vous démarrez en une minute.',
    features: [
      '1 agent sur mesure, 10 profils',
      'Crédits modèles inclus — rien à gérer',
      'Multimodal : voix, texte, image',
      'Mémoire d’entreprise',
      'Accompagnement par Alma',
    ],
  },
}

export function PricingSection() {
  const [mode, setMode] = useState<Mode>('byok')
  const plan = MODES[mode]

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
      className="relative overflow-hidden bg-[#F4F1EA] py-12 sm:py-20 md:py-28"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '100px' }}
      variants={containerVariants}
    >
      <div className="relative z-10 mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div className="mb-8 sm:mb-12 max-w-2xl" variants={itemVariants}>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#B0006C]">Offre</p>
          <h2 className="mt-3 font-heading text-3xl sm:text-4xl md:text-5xl font-light leading-[1.1] text-[#12100E] text-balance" style={{ letterSpacing: '-0.02em' }}>
            Une offre. <span className="text-[#B0006C] italic">Sans surprise.</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#5A554D]">
            Gratuit pour démarrer · sans carte bancaire · résiliable à tout moment.
          </p>
        </motion.div>

        {/* Configurator card */}
        <motion.div
          variants={itemVariants}
          className="rounded-3xl border border-[#B0006C]/30 bg-white p-6 sm:p-8 shadow-[0_30px_60px_-30px_rgba(176,0,108,0.35)]"
        >
          {/* Mode toggle */}
          <div className="mb-7 inline-flex rounded-full border border-black/10 bg-[#F4F1EA] p-1">
            <button
              onClick={() => setMode('byok')}
              className={`rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-colors ${
                mode === 'byok' ? 'bg-[#12100E] text-white' : 'text-[#5A554D] hover:text-[#12100E]'
              }`}
              aria-pressed={mode === 'byok'}
            >
              Mes clés (BYOK)
            </button>
            <button
              onClick={() => setMode('credits')}
              className={`rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-colors ${
                mode === 'credits' ? 'bg-[#12100E] text-white' : 'text-[#5A554D] hover:text-[#12100E]'
              }`}
              aria-pressed={mode === 'credits'}
            >
              Crédits inclus
            </button>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            {/* Left: price + note */}
            <div>
              <div className="flex items-baseline gap-1.5">
                <motion.span
                  key={plan.price}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="font-heading text-5xl font-light text-[#12100E]"
                >
                  {plan.price}
                </motion.span>
                <span className="text-sm text-[#8A857A]">{plan.period}</span>
              </div>
              <h3 className="mt-4 text-base font-medium text-[#12100E]">Solo</h3>
              <motion.p
                key={plan.note}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="mt-2 text-sm leading-relaxed text-[#5A554D]"
              >
                {plan.note}
              </motion.p>

              <button className="mt-6 w-full rounded-full bg-[#B0006C] px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#95005B]">
                Créer mon agent gratuitement
              </button>
            </div>

            {/* Right: features */}
            <ul className="space-y-3 sm:border-l sm:border-black/10 sm:pl-8">
              {plan.features.map((feature) => (
                <motion.li
                  key={feature}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-start gap-2.5 text-sm text-[#3A362F]"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 flex-shrink-0 text-[#B0006C]">
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
          className="mt-6 flex flex-col items-center gap-2 text-center text-sm text-[#5A554D] sm:flex-row sm:justify-center sm:gap-6"
        >
          <span>
            Besoin d’équiper une équipe ?{' '}
            <a href="#" className="font-medium text-[#B0006C] underline-offset-4 hover:underline">
              Ajoutez des agents
            </a>
          </span>
          <span className="hidden text-black/20 sm:inline">·</span>
          <span>
            Sur votre machine ?{' '}
            <a href="#" className="font-medium text-[#B0006C] underline-offset-4 hover:underline">
              Desktop gratuit &amp; open source
            </a>
          </span>
          <span className="hidden text-black/20 sm:inline">·</span>
          <span>
            Grand compte ?{' '}
            <a href="#" className="font-medium text-[#B0006C] underline-offset-4 hover:underline">
              Business sur mesure
            </a>
          </span>
        </motion.div>
      </div>
    </motion.section>
  )
}
