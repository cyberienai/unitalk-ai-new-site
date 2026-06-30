'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlmaAvatar } from './alma-avatar'

const SLIDES = [
  {
    id: 1,
    title: 'Avant d\'agir,\nvotre agent apprend.',
    avatarState: 'listening',
    avatarLabel: 'Agent vocal Unitalk · ● En ligne',
    content: 'Un agent vocal Unitalk vous appelle,\nvous pose les bonnes questions\net comprend votre entreprise.\n\nIl configure vos agents,\nles connecte à vos outils,\net les met au travail.\n\nPas de formulaire.\nVous parlez.',
  },
  {
    id: 2,
    title: 'En 45 secondes,\nil comprend déjà :',
    avatarState: 'speaking',
    avatarLabel: 'Diagnostic en cours',
    content: `✓ votre activité
✓ vos outils
✓ vos points faibles
✓ les agents à créer

agence-thomas.fr
WordPress · HubSpot · GA4
DMARC absent
Score mobile 38/100`,
  },
  {
    id: 3,
    title: 'Démarrez avec votre agent.\nAjoutez votre équipe plus tard.',
    avatarState: 'idle',
    avatarLabel: 'Plans disponibles',
    content: `👤 Solo
49€ / mois
Votre agent à vous.
10 profils prêts à l'emploi.

👥 Team
39€ / mois / personne
Un agent par collaborateur.
Mémoire partagée.`,
  },
  {
    id: 4,
    title: 'Vous voulez plus de contrôle ?',
    avatarState: 'thinking',
    avatarLabel: 'Offres avancées',
    content: `💻 Desktop
Gratuit
Sur votre machine.
Vos données ne sortent jamais.

🏢 Business
Sur mesure
Votre infrastructure.
Gérée par Unitalk.`,
  },
  {
    id: 5,
    title: 'Il n\'oublie jamais.',
    avatarState: 'idle',
    avatarLabel: 'Mémoire d\'entreprise',
    content: `Chaque échange enrichit la mémoire de votre entreprise.
Vos clients, vos règles, vos outils, vos habitudes :
vos agents les apprennent et s'en souviennent.

C'est ce qui les rend meilleurs chaque semaine.`,
  },
  {
    id: 6,
    title: 'Les meilleurs modèles,\nsans vous compliquer la vie.',
    avatarState: 'speaking',
    avatarLabel: 'Modèles IA',
    content: `Unitalk choisit le bon modèle pour chaque tâche.
Ou vous utilisez vos propres clés.

GPT · Claude · Gemini · Mistral · Llama`,
  },
  {
    id: 7,
    title: 'Vous n\'êtes pas seul.',
    avatarState: 'listening',
    avatarLabel: 'Support disponible',
    content: `Alma vous guide.
Un ingénieur IA prend le relais si besoin.

Self-serve · Accompagné · Managé
Escalade : < 1 heure`,
  },
  {
    id: 8,
    title: 'Vos données restent maîtrisées.',
    avatarState: 'idle',
    avatarLabel: 'Souveraineté des données',
    content: `🇫🇷 Cloud Unitalk en France
🔒 Données isolées et chiffrées
🚫 Jamais utilisées pour entraîner des modèles
💻 Desktop : zéro donnée dehors
🏢 Business : votre infrastructure`,
  },
]

export function RightColumn() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    if (!isAutoPlay || isHovering) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlay, isHovering])

  const slide = SLIDES[currentSlide]

  return (
    <motion.div
      className="flex flex-col justify-start pt-16 sm:pt-20 md:justify-center md:pt-0 w-full"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Glow background */}
      <div
        className="absolute inset-0 rounded-2xl sm:rounded-3xl -z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(160,117,232,0.15), transparent)',
          filter: 'blur(80px)',
        }}
      />

      {/* Card */}
      <div className="relative rounded-2xl sm:rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[#111111] overflow-hidden">
        {/* Dots */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 border-b border-[#222222] bg-[#0F0F0F] px-4 sm:px-6 py-3 sm:py-4 overflow-x-auto">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 flex-shrink-0 ${
                idx === currentSlide
                  ? 'w-2 sm:w-2 bg-[#FF0099] h-1.5 sm:h-2'
                  : 'w-1 sm:w-1.5 bg-[#333333] h-1 sm:h-1.5'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative h-72 sm:h-80 md:h-96 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 flex flex-col p-4 sm:p-6 space-y-3 sm:space-y-4"
            >
              {/* Title */}
              <h2 className="font-heading text-base sm:text-lg md:text-xl leading-snug sm:leading-tight text-white whitespace-pre-line">{slide.title}</h2>

              {/* Avatar with label */}
              <div className="flex items-center gap-2 sm:gap-3">
                <AlmaAvatar state={slide.avatarState as any} size={32} showGlow={true} />
                <span className="text-xs text-[#8E8E93]">{slide.avatarLabel}</span>
              </div>

              {/* Body text */}
              <p className="text-xs sm:text-sm leading-relaxed text-[#8E8E93] whitespace-pre-line flex-1 overflow-y-auto">{slide.content}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer with pricing */}
        <div className="border-t border-[#222222] bg-[#0F0F0F] px-4 sm:px-6 py-3 sm:py-4">
          <p className="text-xs text-[#555555]">Solo 49€ · Team 39€/pers. · Desktop gratuit · Business sur mesure</p>
        </div>
      </div>

      {/* Navigation arrows */}
      <div className="mt-3 sm:mt-4 flex items-center justify-between px-1 sm:px-2">
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)}
          className="p-1.5 sm:p-2 text-[#8E8E93] hover:text-white transition-colors"
          aria-label="Previous slide"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="sm:w-5 sm:h-5">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-xs text-[#555555]">
          {String(currentSlide + 1).padStart(2, '0')}/{String(SLIDES.length).padStart(2, '0')}
        </span>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % SLIDES.length)}
          className="p-1.5 sm:p-2 text-[#8E8E93] hover:text-white transition-colors"
          aria-label="Next slide"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="sm:w-5 sm:h-5">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </motion.div>
  )
}
