'use client'

import { motion } from 'framer-motion'

const TRUST_BLOCKS = [
  {
    label: 'CONFORMITÉ',
    text: 'Vos données restent en France.\nPersonne ne les lit. Personne ne les entraîne.\nVous partez quand vous voulez.',
    icon: (
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    ),
  },
  {
    label: 'CONFIDENTIALITÉ',
    text: 'Données isolées et chiffrées.\nAccès contrôlés.\nAucune donnée utilisée pour entraîner des modèles.',
    icon: (
      <>
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </>
    ),
  },
  {
    label: 'SÉCURITÉ',
    text: 'Ils préparent. Vous validez. Ils font.\nUn ingénieur IA prend le relais si besoin.',
    icon: (
      <>
        <path d="M9 12l2 2 4-4" />
        <circle cx="12" cy="12" r="9" />
      </>
    ),
  },
]

export function TrustSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
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
      className="relative overflow-hidden border-t border-[#DcD4C4] bg-[#F3EFE6] py-12 sm:py-16 md:py-20 lg:py-32"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '100px' }}
      variants={containerVariants}
    >
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div className="mb-10 sm:mb-14 max-w-2xl" variants={itemVariants}>
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#D10E63]" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D10E63]">Confiance</p>
          </div>
          <h2 className="mt-4 font-sf text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] text-[#1C1A17] text-balance" style={{ letterSpacing: '-0.03em' }}>
            Souverain. <span className="text-[#D10E63]">Confidentiel</span>. Sous contrôle.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {TRUST_BLOCKS.map((block, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className="rounded-2xl border border-[#DcD4C4] bg-[#FBF9F3] p-6 transition-colors hover:border-[#D10E63]/50"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#D10E63]/25 bg-[#D10E63]/8">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D10E63" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {block.icon}
                </svg>
              </div>
              <h3 className="text-xs uppercase tracking-wider text-[#857C6E] mb-3">{block.label}</h3>
              <p className="text-xs sm:text-sm leading-relaxed text-[#4E483F] whitespace-pre-line">{block.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
