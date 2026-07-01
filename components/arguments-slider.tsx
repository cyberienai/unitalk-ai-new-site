'use client'

import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AlmaAvatar } from './alma-avatar'

const CARDS = [
  {
    id: 1,
    title: 'Votre site peut avoir son agent',
    avatarState: 'listening',
    label: 'Point de départ',
    content:
      'Unitalk analyse votre domaine, vous appelle, puis crée votre agent. Il travaille ensuite partout : emails, CRM, réunions, contenus, automatisations. Pas de formulaire — vous parlez.',
  },
  {
    id: 2,
    title: 'En 45 secondes, il comprend',
    avatarState: 'speaking',
    label: 'Diagnostic instantané',
    content:
      'Votre activité, vos outils, vos points faibles et les agents à créer. WordPress · HubSpot · GA4, DMARC absent, score mobile 38/100 — tout est détecté automatiquement.',
  },
  {
    id: 3,
    title: 'Il n’oublie jamais',
    avatarState: 'idle',
    label: 'Mémoire d’entreprise',
    content:
      'Chaque échange enrichit la mémoire de votre entreprise. Vos clients, vos règles, vos outils, vos habitudes : vos agents les apprennent et s’en souviennent. Ils s’améliorent chaque semaine.',
  },
  {
    id: 4,
    title: 'Les meilleurs modèles, sans effort',
    avatarState: 'speaking',
    label: 'Multimodèle',
    content:
      'Unitalk choisit le bon modèle pour chaque tâche, ou vous utilisez vos propres clés. GPT · Claude · Gemini · Mistral · Llama — sans vous compliquer la vie.',
  },
  {
    id: 5,
    title: 'Vous n’êtes pas seul',
    avatarState: 'listening',
    label: 'Support humain',
    content:
      'Alma vous guide au quotidien. Un ingénieur IA prend le relais si besoin. Self-serve, accompagné ou managé — escalade en moins d’une heure.',
  },
  {
    id: 6,
    title: 'Vos données restent maîtrisées',
    avatarState: 'idle',
    label: 'Souveraineté',
    content:
      'Cloud Unitalk en France, données isolées et chiffrées, jamais utilisées pour entraîner des modèles. Desktop : zéro donnée dehors. Business : votre infrastructure.',
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
    const amount = Math.min(el.clientWidth * 0.8, 360)
    el.scrollBy({ left: dir * amount, behavior: 'smooth' })
  }

  return (
    <section className="relative w-full overflow-hidden py-16 sm:py-20 md:py-24 bg-[#0A0A0A] border-t border-[rgba(255,255,255,0.06)]">
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <p className="text-xs uppercase tracking-wider text-[#8A8A92] mb-3 font-semibold">Ce que fait votre agent</p>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl leading-tight text-white text-balance max-w-xl">
              Un agent qui comprend, agit et se souvient.
            </h2>
          </div>
          {/* Nav arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollBy(-1)}
              disabled={!canScrollLeft}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#333333] text-white transition-colors hover:border-[#555555] disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Cartes précédentes"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scrollBy(1)}
              disabled={!canScrollRight}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#333333] text-white transition-colors hover:border-[#555555] disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Cartes suivantes"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Horizontal card slider */}
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2 -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {CARDS.map((card, idx) => (
            <motion.article
              key={card.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="snap-start flex-shrink-0 w-[280px] sm:w-[320px] flex flex-col rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#111111] p-6 hover:border-[rgba(255,255,255,0.16)] transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <AlmaAvatar state={card.avatarState as any} size={36} showGlow={false} />
                <span className="text-xs text-[#A0A0A8]">{card.label}</span>
              </div>
              <h3 className="font-heading text-lg sm:text-xl leading-snug text-white mb-3 text-balance">{card.title}</h3>
              <p className="text-sm leading-relaxed text-[#A0A0A8]">{card.content}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
