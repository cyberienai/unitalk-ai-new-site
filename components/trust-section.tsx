'use client'

import { motion } from 'framer-motion'

const TRUST_BLOCKS = [
  {
    label: 'CONFORMITÉ',
    text: 'Vos données restent en France.\nPersonne ne les lit. Personne ne les entraîne.\nVous partez quand vous voulez.',
  },
  {
    label: 'CONFIDENTIALITÉ',
    text: 'Données isolées et chiffrées.\nAccès contrôlés.\nAucune donnée utilisée pour entraîner des modèles.',
  },
  {
    label: 'SÉCURITÉ',
    text: 'Ils préparent. Vous validez. Ils font.\nUn ingénieur IA prend le relais si besoin.',
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
      className="border-t border-[rgba(255,255,255,0.06)] bg-[#0A0A0A] py-12 sm:py-16 md:py-20 lg:py-32"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '100px' }}
      variants={containerVariants}
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
          {TRUST_BLOCKS.map((block, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <h3 className="text-xs uppercase tracking-wider text-[#555555] mb-3 sm:mb-4">{block.label}</h3>
              <p className="text-xs sm:text-sm leading-relaxed text-[#8E8E93] whitespace-pre-line">{block.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
