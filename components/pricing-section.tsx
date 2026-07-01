'use client'

import { motion } from 'framer-motion'
import { SectionBackdrop } from './backdrop'

const PLANS = [
  {
    name: 'Solo',
    price: '49€',
    period: '/ mois',
    tagline: 'Votre agent à vous.',
    features: ['1 agent personnel', '10 profils prêts à l\'emploi', 'Emails, CRM, réunions, contenus', 'Mémoire d\'entreprise'],
    cta: 'Démarrer en solo',
    highlighted: true,
  },
  {
    name: 'Team',
    price: '39€',
    period: '/ mois / personne',
    tagline: 'Un agent par collaborateur.',
    features: ['Un agent par membre', 'Mémoire partagée', 'Collaboration entre agents', 'Gestion des accès'],
    cta: 'Équiper mon équipe',
    highlighted: false,
  },
  {
    name: 'Desktop',
    price: 'Gratuit',
    period: '',
    tagline: 'Sur votre machine.',
    features: ['100 % local', 'Vos données ne sortent jamais', 'Vos propres clés API', 'Open source'],
    cta: 'Télécharger',
    highlighted: false,
  },
  {
    name: 'Business',
    price: 'Sur mesure',
    period: '',
    tagline: 'Votre infrastructure.',
    features: ['Déploiement dédié', 'Géré par Unitalk', 'Ingénieur IA dédié', 'SLA & support prioritaire'],
    cta: 'Nous contacter',
    highlighted: false,
  },
]

export function PricingSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <motion.section
      id="offres"
      className="relative overflow-hidden border-t border-[rgba(255,255,255,0.06)] bg-[#0B090D] py-16 sm:py-20 md:py-28"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '100px' }}
      variants={containerVariants}
    >
      <SectionBackdrop tone="purple" />
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div className="mb-10 sm:mb-14 max-w-2xl" variants={itemVariants}>
          <p className="text-xs uppercase tracking-wider text-[#8A8A92]">Offres</p>
          <h2 className="mt-3 font-heading text-3xl sm:text-4xl md:text-5xl font-light leading-[1.1] text-white text-balance" style={{ letterSpacing: '-0.02em' }}>
            Démarrez seul. <span className="text-[#FF0099] italic">Ajoutez votre équipe</span> plus tard.
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#A0A0A8]">
            7 jours d&apos;essai gratuit · une IA prête à travailler · sans carte bancaire.
          </p>
        </motion.div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {PLANS.map((plan) => (
            <motion.div
              key={plan.name}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className={`group relative flex flex-col rounded-2xl border p-6 transition-colors ${
                plan.highlighted
                  ? 'border-[#FF0099] bg-[#141014] shadow-[0_0_50px_-12px_rgba(255,0,153,0.45)]'
                  : 'border-[rgba(255,255,255,0.08)] bg-[#111111]/80 backdrop-blur-sm hover:border-[rgba(255,255,255,0.2)]'
              }`}
            >
              {/* Plan name + price */}
              <div className="flex items-baseline justify-between">
                <h3 className="text-base font-medium text-white">{plan.name}</h3>
                {plan.highlighted && (
                  <span className="rounded-full bg-[#FF0099] px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white">
                    Populaire
                  </span>
                )}
              </div>

              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-heading text-3xl font-light text-white">{plan.price}</span>
                {plan.period && <span className="text-xs text-[#8A8A92]">{plan.period}</span>}
              </div>

              <p className="mt-2 text-sm text-[#A0A0A8]">{plan.tagline}</p>

              {/* Features */}
              <ul className="mt-6 space-y-2.5 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-[#A0A0A8]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 flex-shrink-0 text-[#FF0099]">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                className={`mt-6 w-full rounded-full px-5 py-3 text-sm font-medium transition-colors ${
                  plan.highlighted
                    ? 'bg-[#FF0099] hover:bg-[#E00085] text-white'
                    : 'border border-[#333333] hover:border-[#555555] text-white'
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
