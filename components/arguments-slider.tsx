'use client'

import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const CARDS = [
  {
    id: 1,
    label: 'Point de départ',
    title: 'Il naît de votre nom de domaine',
    content:
      'Vous donnez votre domaine, Alma collecte les données publiques de votre entreprise et vous appelle. À la fin de l’appel, votre agent existe. Aucun formulaire — vous parlez, c’est tout.',
  },
  {
    id: 2,
    label: 'Sur mesure',
    title: 'Il comprend votre métier',
    content:
      'Votre activité, votre ton, vos clients, vos process. Votre agent est façonné pour votre entreprise — pas un chatbot générique de plus, un vrai bras droit qui vous ressemble.',
  },
  {
    id: 3,
    label: 'Mémoire',
    title: 'Il n’oublie jamais rien',
    content:
      'Chaque échange enrichit la mémoire de votre entreprise. Vos règles, vos habitudes, vos décisions : il les apprend, s’en souvient et s’améliore semaine après semaine.',
  },
  {
    id: 4,
    label: 'Multimodèle',
    title: 'Il choisit le bon modèle',
    content:
      'Voix, texte, image, vidéo — et le meilleur modèle pour chaque tâche. GPT, Claude, Gemini, Mistral, Llama. Automatiquement, ou avec vos propres clés. Sans vous compliquer la vie.',
  },
  {
    id: 5,
    label: 'Accompagnement',
    title: 'Vous n’êtes jamais seul',
    content:
      'Alma vous guide au quotidien et vous forme à orchestrer vos agents. Un ingénieur IA prend le relais si besoin — escalade en moins d’une heure.',
  },
  {
    id: 6,
    label: 'Souveraineté',
    title: 'Vos données restent à vous',
    content:
      'Cloud en France, données isolées et chiffrées, jamais utilisées pour entraîner des modèles. En Desktop, rien ne sort de votre machine. En Business, votre propre infrastructure.',
  },
]

export function ArgumentsSlider() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateScrollState = () => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 8)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8)
  }

  useEffect(() => {
    updateScrollState()
    const el = scrollRef.current
    if (!el) return
    el.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)
    return () => {
      el.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [])

  const scrollBy = (dir: number) => {
    const el = scrollRef.current
    if (!el) return
    const amount = Math.min(el.clientWidth * 0.8, 380)
    el.scrollBy({ left: dir * amount, behavior: 'smooth' })
  }

  return (
    <section className="relative w-full overflow-hidden bg-[#0A0A0A] py-20 sm:py-28 md:py-32 border-t border-[rgba(255,255,255,0.08)]">
      {/* Editorial oversized watermark */}
      <p
        aria-hidden="true"
        className="pointer-events-none absolute -top-2 sm:-top-6 left-0 font-heading text-[22vw] sm:text-[16vw] font-light leading-none text-white/[0.03] select-none whitespace-nowrap"
        style={{ letterSpacing: '-0.04em' }}
      >
        votre agent
      </p>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-[#FF0099]" />
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#FF0099] font-semibold">Ce qu’il fait</p>
            </div>
            <h2
              className="font-heading text-4xl sm:text-5xl md:text-6xl font-light leading-[0.95] text-white text-balance"
              style={{ letterSpacing: '-0.03em' }}
            >
              Il comprend, il agit,
              <br />
              <span className="italic text-[#FF0099]">il se souvient.</span>
            </h2>
          </div>
          {/* Nav arrows */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => scrollBy(-1)}
              disabled={!canScrollLeft}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition-all hover:border-white/60 hover:bg-white/5 disabled:opacity-25 disabled:cursor-not-allowed"
              aria-label="Cartes précédentes"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scrollBy(1)}
              disabled={!canScrollRight}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition-all hover:border-white/60 hover:bg-white/5 disabled:opacity-25 disabled:cursor-not-allowed"
              aria-label="Cartes suivantes"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Horizontal editorial card slider */}
        <div
          ref={scrollRef}
          className="flex gap-5 sm:gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2 -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {CARDS.map((card, idx) => (
            <motion.article
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
              className="group relative snap-start flex-shrink-0 w-[300px] sm:w-[360px] flex flex-col rounded-none border-t-2 border-white/15 bg-transparent pt-6 pr-4 transition-colors hover:border-[#FF0099]"
            >
              {/* Big editorial index */}
              <div className="flex items-baseline justify-between mb-8">
                <span
                  className="font-heading text-6xl sm:text-7xl font-light leading-none text-white/15 transition-colors group-hover:text-[#FF0099]/70 tabular-nums"
                  style={{ letterSpacing: '-0.04em' }}
                >
                  {String(card.id).padStart(2, '0')}
                </span>
                <span className="text-[11px] uppercase tracking-[0.18em] text-[#8A8A92]">{card.label}</span>
              </div>
              <h3
                className="font-heading text-2xl sm:text-[1.75rem] font-light leading-[1.05] text-white mb-4 text-balance"
                style={{ letterSpacing: '-0.02em' }}
              >
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#9A9AA4]">{card.content}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
