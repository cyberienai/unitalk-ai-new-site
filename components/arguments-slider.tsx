'use client'

import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

/* ---- Mini paper mockups, one per card ---- */

function MockChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full w-full rounded-xl border border-[#DcD4C4] bg-[#FBF9F3] p-3 overflow-hidden">
      <div className="mb-2.5 h-px w-full bg-[#E6DECE]" />
      {children}
    </div>
  )
}

function VisualDomain() {
  return (
    <MockChrome>
      <div className="flex items-center gap-2 rounded-lg border border-[#DcD4C4] bg-[#F3EFE6] px-2.5 py-2">
        <span className="h-3 w-3 rounded-full border border-[#D10E63]" />
        <span className="text-[11px] text-[#4E483F]">votre-domaine.fr</span>
        <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-[#D10E63] text-[#FBF9F3] text-[10px]">→</span>
      </div>
      <div className="mt-2.5 flex items-end gap-[3px] px-1">
        {[6, 11, 8, 15, 10, 18, 9, 13, 7, 16, 8, 12].map((h, i) => (
          <span key={i} className="w-[3px] rounded-full bg-[#D10E63]/70" style={{ height: h }} />
        ))}
        <span className="ml-auto text-[9px] uppercase tracking-wider text-[#A79E8E]">appel</span>
      </div>
    </MockChrome>
  )
}

function VisualIdentity() {
  return (
    <MockChrome>
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D10E63] text-[11px] font-semibold text-[#FBF9F3]">P</span>
        <div className="flex-1">
          <div className="text-[12px] font-medium text-[#1C1A17] leading-tight">Patrick</div>
          <div className="text-[9px] text-[#857C6E]">Commercial · voix, email, agenda</div>
        </div>
      </div>
      <div className="mt-2.5 flex flex-wrap gap-1">
        {['ton', 'clients', 'process'].map((t) => (
          <span key={t} className="rounded-full border border-[#DcD4C4] px-2 py-0.5 text-[9px] text-[#4E483F]">{t}</span>
        ))}
      </div>
      <div className="mt-2 flex items-center gap-1.5 rounded-md border border-[#DcD4C4] bg-[#F3EFE6] px-2 py-1">
        <span className="h-1.5 w-1.5 rounded-full bg-[#D10E63]" />
        <span className="text-[9px] text-[#857C6E]">Automatisations n8n · en option</span>
      </div>
    </MockChrome>
  )
}

function VisualMemory() {
  return (
    <MockChrome>
      <div className="flex flex-col gap-1.5">
        {['Règle : jamais le vendredi', 'Client clé : Naboo', 'Ton : direct, chaleureux'].map((t, i) => (
          <div key={t} className="flex items-center gap-2 rounded-md border-l-2 border-[#D10E63]/60 bg-[#F3EFE6] px-2 py-1.5">
            <span className="text-[10px] text-[#4E483F]">{t}</span>
            {i === 0 && <span className="ml-auto text-[8px] text-[#D10E63]">mémorisé</span>}
          </div>
        ))}
      </div>
    </MockChrome>
  )
}

function VisualModels() {
  const models = [
    { name: 'OpenAI', slug: 'openai', variant: 'dark' },
    { name: 'Claude', slug: 'claude', variant: 'mono' },
    { name: 'Gemini', slug: 'google-gemini', variant: 'mono' },
    { name: 'Mistral', slug: 'mistral', variant: 'mono' },
    { name: 'Llama', slug: 'meta', variant: 'mono' },
    { name: 'Qwen', slug: 'qwen', variant: 'dark' },
    { name: 'DeepSeek', slug: 'deepseek', variant: 'default' },
    { name: 'Kimi', slug: 'kimi', variant: 'default' },
    { name: 'GLM', slug: 'chatglm', variant: 'mono' },
    { name: 'MiniMax', slug: 'minimax', variant: 'mono' },
    { name: 'Grok', slug: 'grok', variant: 'dark' },
  ]
  return (
    <MockChrome>
      <div className="text-[9px] uppercase tracking-wider text-[#857C6E] mb-2">Meilleur modèle par tâche</div>
      <div className="flex flex-wrap gap-1.5">
        {models.map((m) => (
          <span
            key={m.name}
            title={m.name}
            className="inline-flex items-center gap-1 rounded-md border border-[#DcD4C4] bg-[#FBF9F3] px-1.5 py-1"
          >
            <img
              src={`https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/${m.slug}/${m.variant}.svg`}
              alt={m.name}
              width={12}
              height={12}
              loading="lazy"
              className="h-3 w-3 object-contain"
            />
            <span className="text-[9px] text-[#4E483F]">{m.name}</span>
          </span>
        ))}
      </div>
      <div className="mt-2 flex gap-1.5 text-[9px] text-[#857C6E]">
        <span>voix</span><span>·</span><span>texte</span><span>·</span><span>image</span><span>·</span><span>vidéo</span>
      </div>
      <div className="mt-2 flex items-center gap-1.5 rounded-md border border-[#DcD4C4] bg-[#F3EFE6] px-2 py-1">
        <span className="rounded bg-[#D10E63]/12 px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wider text-[#D10E63]">BYOK</span>
        <span className="text-[9px] text-[#857C6E]">vos propres clés, ou crédits inclus</span>
      </div>
    </MockChrome>
  )
}

function VisualSupport() {
  return (
    <MockChrome>
      <div className="flex flex-col gap-1.5">
        <div className="self-start rounded-lg rounded-tl-sm border border-[#DcD4C4] bg-[#F3EFE6] px-2.5 py-1.5 text-[10px] text-[#4E483F]">Comment orchestrer mes agents ?</div>
        <div className="self-end rounded-lg rounded-tr-sm bg-[#D10E63] px-2.5 py-1.5 text-[10px] text-[#FBF9F3]">Je vous montre, étape par étape.</div>
      </div>
      <div className="mt-2 flex items-center gap-1.5 rounded-md border border-[#DcD4C4] bg-[#F3EFE6] px-2 py-1">
        <span className="h-1.5 w-1.5 rounded-full bg-[#2E7D4F]" />
        <span className="text-[9px] text-[#857C6E]">Ingénieur IA · escalade &lt; 4h</span>
      </div>
    </MockChrome>
  )
}

function VisualSovereignty() {
  return (
    <MockChrome>
      <div className="flex items-center gap-2">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D10E63" strokeWidth="1.8">
          <rect x="4" y="10" width="16" height="10" rx="2" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        </svg>
        <div className="text-[11px] font-medium text-[#1C1A17]">Cloud France · chiffré</div>
      </div>
      <div className="mt-2 flex flex-col gap-1">
        {['Données isolées', 'Jamais d’entraînement', 'Desktop : 100% local'].map((t) => (
          <div key={t} className="flex items-center gap-1.5 text-[9px] text-[#4E483F]">
            <span className="text-[#D10E63]">✓</span>{t}
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
      'Vous donnez votre nom de domaine, Alma collecte les données publiques de votre entreprise et vous appelle. À la fin de l’appel, votre agent existe. Aucun formulaire — vous parlez, c’est tout.',
    visual: VisualDomain,
  },
  {
    id: 2,
    label: 'Sur mesure',
    title: 'Il comprend votre métier',
    content:
      'Votre activité, votre ton, vos clients, vos process. Votre agent est façonné pour votre entreprise — et se connecte à vos outils en un clic.',
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
      'Voix, texte, image, vidéo — et le meilleur modèle pour chaque tâche. GPT, Claude, Gemini, Mistral, Llama, Qwen, DeepSeek, Kimi, GLM, MiniMax, Grok. Automatiquement, ou en BYOK avec vos propres clés. Sans vous compliquer la vie.',
    visual: VisualModels,
  },
  {
    id: 5,
    label: 'Accompagnement',
    title: 'Vous n’êtes jamais seul',
    content:
      'Alma vous guide au quotidien et vous forme à orchestrer vos agents. Un ingénieur IA prend le relais si besoin — escalade en moins de 4 heures.',
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
    <section className="relative w-full overflow-hidden bg-[#EAE3D4] py-20 sm:py-28 md:py-32 border-t border-[#DcD4C4]">
      {/* Editorial oversized watermark */}
      <p
        aria-hidden="true"
        className="pointer-events-none absolute -top-2 sm:-top-6 left-0 font-sf text-[22vw] sm:text-[16vw] font-bold leading-none text-[#1C1A17]/[0.04] select-none whitespace-nowrap"
        style={{ letterSpacing: '-0.04em' }}
      >
        votre agent
      </p>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-[#D10E63]" />
              <p className="text-[11px] uppercase tracking-[0.24em] text-[#D10E63] font-semibold">Ce qu’il fait</p>
            </div>
            <h2
              className="font-sf text-4xl sm:text-5xl md:text-6xl font-bold leading-[0.98] text-[#1C1A17] text-balance"
              style={{ letterSpacing: '-0.03em' }}
            >
              Il comprend, il agit,
              <br />
              <span className="text-[#D10E63]">il se souvient.</span>
            </h2>
          </div>
          {/* Nav arrows */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => scrollBy(-1)}
              disabled={!canScrollLeft}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#C4BAA8] text-[#1C1A17] transition-all hover:border-[#1C1A17] hover:bg-[#F3EFE6] disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Cartes précédentes"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scrollBy(1)}
              disabled={!canScrollRight}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#C4BAA8] text-[#1C1A17] transition-all hover:border-[#1C1A17] hover:bg-[#F3EFE6] disabled:opacity-30 disabled:cursor-not-allowed"
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
              className="group relative snap-start flex-shrink-0 w-[300px] sm:w-[360px] flex flex-col rounded-none border-t-2 border-[#C4BAA8] bg-transparent pt-6 pr-4 transition-colors hover:border-[#D10E63]"
            >
              {/* Mini paper mockup */}
              <div className="mb-6 h-[120px] w-full">
                <card.visual />
              </div>

              {/* Big editorial index */}
              <div className="flex items-baseline justify-between mb-8">
                <span
                  className="font-sf text-6xl sm:text-7xl font-bold leading-none text-[#1C1A17]/15 transition-colors group-hover:text-[#D10E63]/70 tabular-nums"
                  style={{ letterSpacing: '-0.04em' }}
                >
                  {String(card.id).padStart(2, '0')}
                </span>
                <span className="text-[11px] uppercase tracking-[0.18em] text-[#857C6E]">{card.label}</span>
              </div>
              <h3
                className="font-sf text-2xl sm:text-[1.75rem] font-bold leading-[1.08] text-[#1C1A17] mb-4 text-balance"
                style={{ letterSpacing: '-0.02em' }}
              >
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#6E665A]">{card.content}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
