'use client'

import { motion } from 'framer-motion'

const PLANS = [
  {
    name: 'Solo',
    price: '29€',
    period: '/ mois / agent',
    tagline: 'Votre agent à vous.',
    features: ['1 agent sur mesure', '10 profils prêts à l\'emploi', 'Multimodal : voix, texte, image', 'Mémoire d\'entreprise'],
    cta: 'Démarrer en solo',
    highlighted: true,
  },
  {
    name: 'Team',
    price: '39€',
    period: '/ mois / agent',
    tagline: 'Un agent par collaborateur.',
    features: ['1 agent par collaborateur', 'Mémoire partagée', 'Collaboration entre agents', 'Gestion des accès'],
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
      className="relative overflow-hidden bg-[#F4F1EA] py-12 sm:py-20 md:py-28"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '100px' }}
      variants={containerVariants}
    >
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div className="mb-10 sm:mb-14 max-w-2xl" variants={itemVariants}>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#B0006C]">Offres</p>
          <h2 className="mt-3 font-heading text-3xl sm:text-4xl md:text-5xl font-light leading-[1.1] text-[#12100E] text-balance" style={{ letterSpacing: '-0.02em' }}>
            Démarrez seul. <span className="text-[#B0006C] italic">Ajoutez votre équipe</span> plus tard.
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#5A554D]">
            Gratuit pour démarrer · sans carte bancaire · résiliable à tout moment.
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
                  ? 'border-[#B0006C] bg-white shadow-[0_20px_50px_-20px_rgba(176,0,108,0.35)]'
                  : 'border-black/10 bg-white/70 hover:border-black/25'
              }`}
            >
              {/* Plan name + price */}
              <div className="flex items-baseline justify-between">
                <h3 className="text-base font-medium text-[#12100E]">{plan.name}</h3>
                {plan.highlighted && (
                  <span className="rounded-full bg-[#B0006C] px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white">
                    Populaire
                  </span>
                )}
              </div>

              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-heading text-3xl font-light text-[#12100E]">{plan.price}</span>
                {plan.period && <span className="text-xs text-[#8A857A]">{plan.period}</span>}
              </div>

              <p className="mt-2 text-sm text-[#5A554D]">{plan.tagline}</p>

              {/* Features */}
              <ul className="mt-6 space-y-2.5 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-[#3A362F]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 flex-shrink-0 text-[#B0006C]">
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
                    ? 'bg-[#B0006C] hover:bg-[#95005B] text-white'
                    : 'border border-black/20 bg-transparent hover:border-black/40 hover:bg-black/5 text-[#12100E]'
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
