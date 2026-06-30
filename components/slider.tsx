'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
  {
    id: 1,
    title: 'Version finale du slide 1',
    content: `Avant d'agir, il apprend. Un agent vocal Unitalk vous appelle, vous pose les bonnes questions et comprend votre entreprise. Il configure vos agents, les connecte à vos outils, et les met au travail. Pas de formulaire. Vous parlez.`,
    type: 'text'
  },
  {
    id: 2,
    title: 'Pas de formulaire.',
    subtitle: 'Vous parlez.\nElle comprend.\nElle crée votre agent.',
    smallText: '5 minutes. Comme un bon consultant.',
    type: 'interview'
  },
  {
    id: 3,
    title: 'En 45 secondes, Alma comprend déjà :',
    items: [
      '✓ votre activité',
      '✓ vos outils',
      '✓ vos points faibles',
      '✓ les agents à créer'
    ],
    type: 'diagnostic'
  },
  {
    id: 4,
    title: 'Les meilleurs modèles,\nsans vous compliquer la vie.',
    content: 'Unitalk choisit le bon modèle pour chaque tâche.\nOu vous utilisez vos propres clés.',
    models: ['GPT', 'Claude', 'Gemini', 'Mistral', 'Llama'],
    type: 'models'
  },
  {
    id: 5,
    title: 'Vous n\'êtes pas seul.',
    content: 'Alma vous guide.\nUn ingénieur IA prend le relais si besoin.',
    smallText: 'Self-serve · Accompagné · Managé\nEscalade : < 1 heure',
    type: 'support'
  },
  {
    id: 6,
    title: 'Vos données restent maîtrisées.',
    items: [
      '🇫🇷 Cloud Unitalk en France',
      '🔒 Données isolées et chiffrées',
      '🚫 Jamais utilisées pour entraîner des modèles',
      '💻 Desktop : zéro donnée dehors',
      '🏢 Business : votre infrastructure'
    ],
    type: 'sovereignty'
  }
]

export function Slider() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    if (!autoplay) return

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [autoplay])

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length)
    setAutoplay(false)
  }

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
    setAutoplay(false)
  }

  const goToSlide = (index: number) => {
    setCurrent(index)
    setAutoplay(false)
  }

  const slide = slides[current]

  return (
    <div 
      className="h-full bg-[#111111] border border-[rgba(255,255,255,0.08)] rounded-[28px] p-6 flex flex-col"
      onMouseEnter={() => setAutoplay(false)}
      onMouseLeave={() => setAutoplay(true)}
    >
      {/* Dots Navigation */}
      <div className="flex justify-center gap-2 mb-6">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === current ? 'bg-[#FF0099] w-8' : 'bg-[rgba(255,255,255,0.2)]'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="h-full flex flex-col justify-between"
          >
            {/* Title */}
            <h2 className="text-xl font-semibold text-white whitespace-pre-line mb-4">
              {slide.title}
            </h2>

            {/* Slide Content */}
            {slide.type === 'text' && (
              <p className="text-[#8E8E93] text-sm leading-relaxed flex-1">
                {slide.content}
              </p>
            )}

            {slide.type === 'interview' && (
              <div className="flex-1 flex flex-col items-center justify-center py-6">
                <div className="mb-6 text-center">
                  <p className="text-[#8E8E93] text-sm whitespace-pre-line leading-relaxed mb-4">
                    {slide.subtitle}
                  </p>
                  <p className="text-[#555555] text-xs">
                    {slide.smallText}
                  </p>
                </div>
              </div>
            )}

            {slide.type === 'diagnostic' && (
              <div className="flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  {slide.items?.map((item, i) => (
                    <p key={i} className="text-[#8E8E93] text-sm">
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {slide.type === 'models' && (
              <div className="flex-1 flex flex-col justify-between">
                <p className="text-[#8E8E93] text-sm leading-relaxed mb-4">
                  {slide.content?.split('\n')[0]}
                </p>
                <div className="flex flex-wrap gap-2">
                  {slide.models?.map((model, i) => (
                    <span key={i} className="px-3 py-1 bg-[#1A1A1A] border border-[#222222] rounded-full text-xs text-white">
                      {model}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {slide.type === 'support' && (
              <div className="flex-1 flex flex-col justify-between">
                <p className="text-[#8E8E93] text-sm leading-relaxed mb-4">
                  {slide.content?.split('\n')[0]}
                </p>
                <p className="text-[#555555] text-xs whitespace-pre-line">
                  {slide.smallText}
                </p>
              </div>
            )}

            {slide.type === 'sovereignty' && (
              <div className="flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  {slide.items?.map((item, i) => (
                    <p key={i} className="text-[#8E8E93] text-sm">
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="text-[#555555] text-xs pt-6 border-t border-[rgba(255,255,255,0.08)]">
        Gratuit pour commencer · sans carte bancaire
      </div>

      {/* Navigation Arrows */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePrev}
          className="p-2 hover:bg-[#1E1E1E] rounded-full transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} className="text-[#8E8E93]" />
        </button>
        <span className="text-[#555555] text-xs">
          {String(current + 1).padStart(2, '0')}/{String(slides.length).padStart(2, '0')}
        </span>
        <button
          onClick={handleNext}
          className="p-2 hover:bg-[#1E1E1E] rounded-full transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight size={20} className="text-[#8E8E93]" />
        </button>
      </div>
    </div>
  )
}
