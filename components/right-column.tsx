'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { AlmaAvatar } from './alma-avatar'

const SLIDES = [
  {
    id: 1,
    title: 'Votre site peut maintenant\navoir son agent.',
    avatarState: 'listening',
    avatarLabel: 'Agent vocal Unitalk · ● En ligne',
    content: 'Votre site est le point de départ.\n\nUnitalk analyse votre domaine,\nvous appelle,\npuis crée votre agent.\n\nIl travaille ensuite partout :\nemails, CRM, réunions,\ncontenus, automatisations.\n\nPas de formulaire.\nVous parlez.',
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
  const [isHovering, setIsHovering] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const isPlaying = !isHovering && !isFocused && !prefersReducedMotion

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isPlaying])

  const goTo = (index: number) => setCurrentSlide((index + SLIDES.length) % SLIDES.length)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      goTo(currentSlide - 1)
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      goTo(currentSlide + 1)
    }
  }

  const slide = SLIDES[currentSlide]

  return (
    <motion.div
      className="flex flex-col justify-start pt-16 sm:pt-20 md:pt-0 w-full"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onFocusCapture={() => setIsFocused(true)}
      onBlurCapture={() => setIsFocused(false)}
      onKeyDown={handleKeyDown}
      role="region"
      aria-roledescription="carrousel"
      aria-label="Comment fonctionne Unitalk"
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
        {/* Autoplay progress bar */}
        <div className="h-0.5 w-full bg-[#1E1E1E]">
          <motion.div
            key={`${currentSlide}-${isPlaying}`}
            className="h-full bg-[#FF0099]"
            initial={{ width: isPlaying ? '0%' : '100%' }}
            animate={{ width: '100%' }}
            transition={{ duration: isPlaying ? 5 : 0, ease: 'linear' }}
          />
        </div>

        {/* Dots — neutral so the primary CTA keeps the magenta */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 border-b border-[#222222] bg-[#0F0F0F] px-4 sm:px-6 py-3 sm:py-4 overflow-x-auto">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 flex-shrink-0 ${
                idx === currentSlide
                  ? 'w-4 sm:w-5 bg-white'
                  : 'w-1 sm:w-1.5 bg-[#3A3A3A] hover:bg-[#555555]'
              }`}
              aria-label={`Aller à la diapositive ${idx + 1} sur ${SLIDES.length}`}
              aria-current={idx === currentSlide}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative h-72 sm:h-80 md:h-96 overflow-hidden" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 flex flex-col p-4 sm:p-6 space-y-3 sm:space-y-4"
              role="group"
              aria-roledescription="diapositive"
              aria-label={`${currentSlide + 1} sur ${SLIDES.length}`}
            >
              {/* Title */}
              <h2 className="font-heading text-base sm:text-lg md:text-xl leading-snug sm:leading-tight text-white whitespace-pre-line">{slide.title}</h2>

              {/* Avatar with label */}
              <div className="flex items-center gap-2 sm:gap-3">
                <AlmaAvatar state={slide.avatarState as any} size={32} showGlow={true} />
                <span className="text-xs text-[#A0A0A8]">{slide.avatarLabel}</span>
              </div>

              {/* Body text */}
              <p className="text-xs sm:text-sm leading-relaxed text-[#A0A0A8] whitespace-pre-line flex-1 overflow-y-auto">{slide.content}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer with pricing */}
        <div className="border-t border-[#222222] bg-[#0F0F0F] px-4 sm:px-6 py-3 sm:py-4">
          <p className="text-xs text-[#8A8A92]">Solo 49€ · Team 39€/pers. · Desktop gratuit · Business sur mesure</p>
        </div>
      </div>

      {/* Navigation arrows */}
      <div className="mt-3 sm:mt-4 flex items-center justify-between px-1 sm:px-2">
        <button
          onClick={() => goTo(currentSlide - 1)}
          className="p-1.5 sm:p-2 text-[#A0A0A8] hover:text-white transition-colors"
          aria-label="Diapositive précédente"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="sm:w-5 sm:h-5">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-xs text-[#8A8A92]" aria-hidden="true">
          {String(currentSlide + 1).padStart(2, '0')}/{String(SLIDES.length).padStart(2, '0')}
        </span>
        <button
          onClick={() => goTo(currentSlide + 1)}
          className="p-1.5 sm:p-2 text-[#A0A0A8] hover:text-white transition-colors"
          aria-label="Diapositive suivante"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="sm:w-5 sm:h-5">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </motion.div>
  )
}
