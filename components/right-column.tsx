'use client'

import { motion } from 'framer-motion'
import { ChevronUp, ChevronDown } from 'lucide-react'

const slides = [
  {
    id: 0,
    title: 'Offres Personnalisées',
    description: 'Adaptez votre plan selon vos besoins spécifiques.',
  },
  {
    id: 1,
    title: 'Entretiens Vocaux',
    description: 'Menez des entretiens naturels en français ou en anglais.',
  },
  {
    id: 2,
    title: 'Diagnostic du Domaine',
    description: 'Analysez votre site web pour identifier les améliorations.',
  },
  {
    id: 3,
    title: 'Modèles IA Avancés',
    description: 'Utilise les derniers modèles d\'IA pour plus de précision.',
  },
  {
    id: 4,
    title: 'Support Premium',
    description: 'Accédez à notre équipe support disponible 24/7.',
  },
  {
    id: 5,
    title: 'Souveraineté des Données',
    description: 'Vos données restent sous votre contrôle et sécurisées.',
  },
]

interface RightColumnProps {
  selectedSlide: number
  onSelectSlide: (index: number) => void
}

export function RightColumn({ selectedSlide, onSelectSlide }: RightColumnProps) {
  const goToPrevious = () => {
    onSelectSlide((selectedSlide - 1 + slides.length) % slides.length)
  }

  const goToNext = () => {
    onSelectSlide((selectedSlide + 1) % slides.length)
  }

  const currentSlide = slides[selectedSlide]

  return (
    <motion.div
      className="flex flex-col justify-between"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      {/* Slider Content */}
      <motion.div
        className="flex flex-col gap-6"
        key={selectedSlide}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Slide Title */}
        <motion.div className="space-y-3">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-foreground leading-tight"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {currentSlide.title}
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {currentSlide.description}
          </motion.p>
        </motion.div>

        {/* Slide Counter */}
        <motion.div
          className="inline-block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span className="text-sm font-semibold text-accent">
            {String(selectedSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </span>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          className="w-full h-1 bg-muted rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div
            className="h-full bg-accent rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((selectedSlide + 1) / slides.length) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </motion.div>
      </motion.div>

      {/* Navigation Controls */}
      <motion.div
        className="flex gap-3 mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.button
          onClick={goToPrevious}
          className="flex-1 p-3 rounded-lg border border-border bg-card hover:bg-card/80 hover:border-accent transition-all flex items-center justify-center gap-2 group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Slide précédent"
        >
          <ChevronUp className="w-4 h-4 group-hover:text-accent transition-colors" />
          <span className="text-sm font-medium hidden sm:inline">Précédent</span>
        </motion.button>

        <motion.button
          onClick={goToNext}
          className="flex-1 p-3 rounded-lg bg-accent hover:bg-accent/90 text-accent-foreground transition-all flex items-center justify-center gap-2 group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Slide suivant"
        >
          <span className="text-sm font-medium hidden sm:inline">Suivant</span>
          <ChevronDown className="w-4 h-4 group-hover:text-accent-foreground transition-colors" />
        </motion.button>
      </motion.div>

      {/* Thumbnail Dots */}
      <motion.div
        className="flex gap-2 flex-wrap justify-end mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {slides.map((slide, index) => (
          <motion.button
            key={slide.id}
            onClick={() => onSelectSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === selectedSlide ? 'w-8 bg-accent' : 'bg-muted hover:bg-muted/80'
            }`}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Aller au slide ${index + 1}`}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}
