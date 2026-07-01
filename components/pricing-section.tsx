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
    note: 'Vous utilisez vos clés API (OpenAI, Anthropic, Google…). Vous ne payez que la plateforme, les modèles restent à votre charge, au prix réel.',
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
          {/* Mode toggle */}
          <div className="mb-7 inline-flex rounded-full border border-[#DcD4C4] bg-[#F3EFE6] p-1">
            <button
              onClick={() => setMode('byok')}
              className={`rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-colors ${
                mode === 'byok' ? 'bg-[#1C1A17] text-[#FBF9F3]' : 'text-[#4E483F] hover:text-[#1C1A17]'
              }`}
              aria-pressed={mode === 'byok'}
            >
              Mes clés (BYOK)
            </button>
            <button
              onClick={() => setMode('credits')}
              className={`rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-colors ${
                mode === 'credits' ? 'bg-[#1C1A17] text-[#FBF9F3]' : 'text-[#4E483F] hover:text-[#1C1A17]'
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
                  className="font-sf text-5xl font-bold text-[#1C1A17]" style={{ letterSpacing: '-0.03em' }}
                >
                  {plan.price}
                </motion.span>
                <span className="text-sm text-[#857C6E]">{plan.period}</span>
              </div>
              <h3 className="mt-4 text-base font-medium text-[#1C1A17]">Solo</h3>
              <motion.p
                key={plan.note}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="mt-2 text-sm leading-relaxed text-[#4E483F]"
              >
                {plan.note}
              </motion.p>

              <button className="mt-6 w-full rounded-full bg-[#D10E63] px-5 py-3.5 text-sm font-semibold text-[#FBF9F3] transition-colors hover:bg-[#B00B52]">
                Créer mon agent gratuitement
              </button>
            </div>

            {/* Right: features */}
            <ul className="space-y-3 sm:border-l sm:border-[#DcD4C4] sm:pl-8">
              {plan.features.map((feature) => (
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
            Vous préférez l’auto-hébergement ?{' '}
            <a href="#" className="font-medium text-[#D10E63] underline-offset-4 hover:underline">
              Desktop gratuit &amp; open source
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
