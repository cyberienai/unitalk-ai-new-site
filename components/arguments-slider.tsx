'use client'

import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

/* ---- Mini UI mockups, one per card ---- */

function MockChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full w-full rounded-xl border border-white/10 bg-[#111114] p-3 overflow-hidden">
      <div className="mb-2.5 flex items-center gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
      </div>
      {children}
    </div>
  )
}

function VisualDomain() {
  return (
    <MockChrome>
      <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/40 px-2.5 py-2">
        <span className="h-3 w-3 rounded-full border border-[#FF0099]" />
        <span className="text-[11px] text-white/70">votre-domaine.fr</span>
        <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-[#FF0099] text-white text-[10px]">→</span>
      </div>
      <div className="mt-2.5 flex items-end gap-[3px] px-1">
        {[6, 11, 8, 15, 10, 18, 9, 13, 7, 16, 8, 12].map((h, i) => (
          <span key={i} className="w-[3px] rounded-full bg-[#FF0099]/70" style={{ height: h }} />
        ))}
        <span className="ml-auto text-[9px] uppercase tracking-wider text-white/40">appel</span>
      </div>
    </MockChrome>
  )
}

function VisualIdentity() {
  return (
    <MockChrome>
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#FF0099] to-[#7A0049] text-[11px] font-semibold text-white">P</span>
        <div className="flex-1">
          <div className="text-[12px] font-medium text-white leading-tight">Patrick</div>
          <div className="text-[9px] text-white/40">Commercial · voix, email, agenda</div>
        </div>
      </div>
      <div className="mt-2.5 flex flex-wrap gap-1">
        {['ton', 'clients', 'process'].map((t) => (
          <span key={t} className="rounded-full border border-white/12 px-2 py-0.5 text-[9px] text-white/55">{t}</span>
        ))}
      </div>
      <div className="mt-2 flex items-center gap-1.5 rounded-md border border-white/10 bg-black/30 px-2 py-1">
        <span className="h-1.5 w-1.5 rounded-full bg-[#FF0099]" />
        <span className="text-[9px] text-white/50">Automatisations n8n · en option</span>
      </div>
    </MockChrome>
  )
}

function VisualMemory() {
  return (
    <MockChrome>
      <div className="flex flex-col gap-1.5">
        {['Règle : jamais le vendredi', 'Client clé : Naboo', 'Ton : direct, chaleureux'].map((t, i) => (
          <div key={t} className="flex items-center gap-2 rounded-md border-l-2 border-[#FF0099]/60 bg-white/[0.03] px-2 py-1.5">
            <span className="text-[10px] text-white/65">{t}</span>
            {i === 0 && <span className="ml-auto text-[8px] text-[#FF0099]">mémorisé</span>}
          </div>
        ))}
      </div>
    </MockChrome>
  )
}

function VisualModels() {
  return (
    <MockChrome>
      <div className="text-[9px] uppercase tracking-wider text-white/40 mb-2">Meilleur modèle par tâche</div>
      <div className="flex flex-wrap gap-1.5">
        {['GPT', 'Claude', 'Gemini', 'Mistral', 'Llama'].map((m, i) => (
          <span
            key={m}
            className={`rounded-md px-2 py-1 text-[10px] ${i === 1 ? 'bg-[#FF0099] text-white' : 'border border-white/12 text-white/55'}`}
          >
            {m}
          </span>
        ))}
      </div>
      <div className="mt-2 flex gap-1.5 text-[9px] text-white/45">
        <span>voix</span><span>·</span><span>texte</span><span>·</span><span>image</span><span>·</span><span>vidéo</span>
      </div>
      <div className="mt-2 flex items-center gap-1.5 rounded-md border border-white/10 bg-black/30 px-2 py-1">
        <span className="rounded bg-[#FF0099]/15 px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wider text-[#FF0099]">BYOK</span>
        <span className="text-[9px] text-white/50">vos propres clés, ou crédits inclus</span>
      </div>
    </MockChrome>
  )
}

function VisualSupport() {
  return (
    <MockChrome>
      <div className="flex flex-col gap-1.5">
        <div className="self-start rounded-lg rounded-tl-sm bg-white/[0.06] px-2.5 py-1.5 text-[10px] text-white/70">Comment orchestrer mes agents ?</div>
        <div className="self-end rounded-lg rounded-tr-sm bg-[#FF0099]/90 px-2.5 py-1.5 text-[10px] text-white">Je vous montre, étape par étape.</div>
      </div>
      <div className="mt-2 flex items-center gap-1.5 rounded-md border border-white/10 bg-black/30 px-2 py-1">
        <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
        <span className="text-[9px] text-white/50">Ingénieur IA · escalade &lt; 1h</span>
      </div>
    </MockChrome>
  )
}

function VisualSovereignty() {
  return (
    <MockChrome>
      <div className="flex items-center gap-2">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF0099" strokeWidth="1.8">
          <rect x="4" y="10" width="16" height="10" rx="2" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        </svg>
        <div className="text-[11px] font-medium text-white">Cloud France · chiffré</div>
      </div>
      <div className="mt-2 flex flex-col gap-1">
        {['Données isolées', 'Jamais d’entraînement', 'Desktop : 100% local'].map((t) => (
          <div key={t} className="flex items-center gap-1.5 text-[9px] text-white/55">
            <span className="text-[#FF0099]">✓</span>{t}
          </div>
        ))}
      </div>
    </MockChrome>
  )
}

const CARDS = [
  {
    id: 1,
    label: 'Point de départ',
    title: 'Il naît de votre nom de domaine',
    content:
      'Vous donnez votre domaine, Alma collecte les données publiques de votre entreprise et vous appelle. À la fin de l’appel, votre agent existe. Aucun formulaire — vous parlez, c’est tout.',
    visual: VisualDomain,
  },
  {
    id: 2,
    label: 'Sur mesure',
    title: 'Il comprend votre métier',
    content:
      'Votre activité, votre ton, vos clients, vos process. Votre agent est façonné pour votre entreprise — et se connecte à vos outils via un serveur d’automatisation n8n en option, pour agir vraiment.',
    visual: VisualIdentity,
  },
  {
    id: 3,
    label: 'Mémoire',
    title: 'Il n’oublie jamais rien',
    content:
      'Chaque échange enrichit la mémoire de votre entreprise. Vos règles, vos habitudes, vos décisions : il les apprend, s’en souvient et s’améliore semaine après semaine.',
    visual: VisualMemory,
  },
  {
    id: 4,
    label: 'Multimodèle',
    title: 'Il choisit le bon modèle',
    content:
      'Voix, texte, image, vidéo — et le meilleur modèle pour chaque tâche. GPT, Claude, Gemini, Mistral, Llama. Automatiquement, ou en BYOK avec vos propres clés. Sans vous compliquer la vie.',
    visual: VisualModels,
  },
  {
    id: 5,
    label: 'Accompagnement',
    title: 'Vous n’êtes jamais seul',
    content:
      'Alma vous guide au quotidien et vous forme à orchestrer vos agents. Un ingénieur IA prend le relais si besoin — escalade en moins d’une heure.',
    visual: VisualSupport,
  },
  {
    id: 6,
    label: 'Souveraineté',
    title: 'Vos données restent à vous',
    content:
      'Cloud en France, données isolées et chiffrées, jamais utilisées pour entraîner des modèles. En Desktop, rien ne sort de votre machine. En Business, votre propre infrastructure.',
    visual: VisualSovereignty,
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
              {/* Mini UI mockup */}
              <div className="mb-6 h-[120px] w-full">
                <card.visual />
              </div>

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
