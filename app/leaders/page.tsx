"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Play, Pause } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { useLanguage, type Lang } from "@/lib/language-context"

/* ── 17 Architects ───────────────────────────────────────────────────── */

type Architect = {
  slug: string
  name: string
  company: string
  category: "silicon" | "models" | "infrastructure" | "runtime" | "hosting"
  tagline: Record<Lang, string>
  videoUrl?: string
  accent: string
}

const ARCHITECTS: Architect[] = [
  // SILICON
  { slug: "jensen-huang", name: "Jensen Huang", company: "NVIDIA", category: "silicon", tagline: { fr: "Le silicium qui fait tourner l'IA mondiale.", en: "The silicon powering the world's AI." }, accent: "#76B900" },
  // MODELS
  { slug: "liang-wenfeng", name: "Liang Wenfeng", company: "DeepSeek", category: "models", tagline: { fr: "Le raisonnement open source qui a divisé les prix par 10.", en: "Open-source reasoning that slashed prices 10x." }, accent: "#4A90D9" },
  { slug: "sam-altman", name: "Sam Altman", company: "OpenAI", category: "models", tagline: { fr: "ChatGPT. Le grand public a découvert l'IA ici.", en: "ChatGPT. The world discovered AI here." }, accent: "#10A37F" },
  { slug: "demis-hassabis", name: "Demis Hassabis", company: "Google DeepMind", category: "models", tagline: { fr: "Prix Nobel. AlphaFold. La science avant l'échelle.", en: "Nobel Prize. AlphaFold. Science before scale." }, accent: "#FF6B35" },
  { slug: "dario-amodei", name: "Dario Amodei", company: "Anthropic", category: "models", tagline: { fr: "Il a écrit les lois d'échelle. Il construit la sécurité.", en: "He wrote the scaling laws. He builds safety." }, accent: "#D4A574" },
  { slug: "andrej-karpathy", name: "Andrej Karpathy", company: "Eureka Labs", category: "models", tagline: { fr: "Le professeur de l'IA. Tokenizers, ImageNet, llama.c.", en: "The teacher of AI. Tokenizers, ImageNet, llama.c." }, accent: "#00D4AA" },
  { slug: "arthur-mensch", name: "Arthur Mensch", company: "Mistral AI", category: "models", tagline: { fr: "La France qui compte. Modèles compacts et souverains.", en: "France that matters. Compact, sovereign models." }, accent: "#1E40AF" },
  { slug: "elon-musk", name: "Elon Musk", company: "xAI / Grok", category: "models", tagline: { fr: "First principles. Supercluster Memphis. Grok open source.", en: "First principles. Memphis supercluster. Grok open source." }, accent: "#FFFFFF" },
  { slug: "yann-lecun", name: "Yann LeCun", company: "Meta AI / Llama", category: "models", tagline: { fr: "Prix Turing. Llama open source. Le parrain qui a dit non.", en: "Turing Award. Llama open source. The godfather who said no." }, accent: "#0668E1" },
  { slug: "jingren-zhou", name: "Jingren Zhou", company: "Alibaba / Qwen", category: "models", tagline: { fr: "Qwen. Le modèle open source qui rivalise avec GPT-4.", en: "Qwen. The open-source model rivaling GPT-4." }, accent: "#FF6A00" },
  // INFRASTRUCTURE
  { slug: "clement-delangue", name: "Clément Delangue", company: "Hugging Face", category: "infrastructure", tagline: { fr: "La boutique open source. Sans HF, pas de Llama, pas de Mistral.", en: "The open-source shop. Without HF, no Llama, no Mistral." }, accent: "#FFD21E" },
  { slug: "nous-research", name: "Karan Malhotra", company: "Nous Research", category: "infrastructure", tagline: { fr: "Hermes. L'agent IA open source qui raisonne.", en: "Hermes. The open-source AI agent that reasons." }, accent: "#8B5CF6" },
  { slug: "krish-dholakia", name: "Krish Dholakia", company: "LiteLLM", category: "infrastructure", tagline: { fr: "Le proxy qui parle à 100+ modèles. Infrastructure invisible.", en: "The proxy speaking to 100+ models. Invisible infrastructure." }, accent: "#6366F1" },
  { slug: "jan-oberhauser", name: "Jan Oberhauser", company: "n8n", category: "infrastructure", tagline: { fr: "Le Zapier open source. 50K+ étoiles. Automatisation pour tous.", en: "Open-source Zapier. 50K+ stars. Automation for everyone." }, accent: "#EA4B2C" },
  // RUNTIME
  { slug: "michael-chiang", name: "Michael Chiang", company: "Ollama", category: "runtime", tagline: { fr: "Inférence locale. Un docker pull pour run un modèle.", en: "Local inference. One docker pull to run a model." }, accent: "#F5F5F5" },
  // HOSTING
  { slug: "octave-klaba", name: "Octave Klaba", company: "OVHcloud", category: "hosting", tagline: { fr: "Le cloud français. 400K+ serveurs. Souveraineté européenne.", en: "French cloud. 400K+ servers. European sovereignty." }, accent: "#1E90FF" },
  { slug: "yann-lechelle", name: "Yann Lechelle", company: "Scaleway", category: "hosting", tagline: { fr: "Cloud français alternatif. GPU bare metal. RGPD natif.", en: "Alternative French cloud. Bare metal GPU. GDPR native." }, accent: "#DC294F" },
]

const T: Record<Lang, Record<string, string>> = {
  fr: {
    founder: "Par Patrick Chassany — fondateur d'Amen.fr (1998) et co-fondateur de Fotolia (2004, Adobe Stock)",
    h1: "17 architectes. Une infrastructure.",
    subtitle: "Ils construisent les modèles, les GPU, les clouds, les runtimes. Unitalk AI Gateway les connecte. Alma déploie vos collaborateurs avec leurs technologies dans votre infrastructure privée.",
    discover: "Découvrir",
    deploy: "Essayer Alma →",
    categories: {
      silicon: "Silicium",
      models: "Modèles",
      infrastructure: "Infrastructure",
      runtime: "Runtime",
      hosting: "Hébergement",
    },
    footer: "Patrick Chassany a conçu Unitalk pour que ces 17 écosystèmes travaillent pour vous. Pas dans le cloud de quelqu'un d'autre. Dans votre infrastructure. Gouvernée par vous.",
  },
  en: {
    founder: "By Patrick Chassany — founder of Amen.fr (1998) and co-founder of Fotolia (2004, Adobe Stock)",
    h1: "17 architects. One infrastructure.",
    subtitle: "They build the models, GPUs, clouds, runtimes. Unitalk AI Gateway connects them. Alma deploys your collaborators with their technologies in your private infrastructure.",
    discover: "Discover",
    deploy: "Try Alma →",
    categories: {
      silicon: "Silicon",
      models: "Models",
      infrastructure: "Infrastructure",
      runtime: "Runtime",
      hosting: "Hosting",
    },
    footer: "Patrick Chassany designed Unitalk so these 17 ecosystems work for you. Not in someone else's cloud. In your infrastructure. Governed by you.",
  },
}

/* ── Category filter chips ───────────────────────────────────────────── */

const CATEGORIES = ["silicon", "models", "infrastructure", "runtime", "hosting"] as const

/* ── Video-aware card ────────────────────────────────────────────────── */

function ArchitectCard({ a, index, lang }: { a: Architect; index: number; lang: Lang }) {
  const [playing, setPlaying] = useState(false)
  const [hovered, setHovered] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!videoRef.current) return
    if (playing) {
      videoRef.current.play().catch(() => {})
    } else {
      videoRef.current.pause()
    }
  }, [playing])

  const initials = a.name.split(" ").map(n => n[0]).join("").slice(0, 2)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => { setHovered(true); setPlaying(true) }}
      onMouseLeave={() => { setHovered(false); setPlaying(false) }}
      className="group relative"
    >
      <Link
        href={`/leaders/${a.slug}`}
        className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur transition-all duration-500 hover:border-white/[0.18] hover:bg-white/[0.06] hover:shadow-[0_25px_60px_-20px_rgba(0,0,0,0.5)]"
        style={{ "--card-accent": a.accent } as React.CSSProperties}
      >
        {/* Video / avatar zone */}
        <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-2xl bg-[#1A1A1A]">
          {/* Static gradient fallback */}
          <div
            className="absolute inset-0 transition-opacity duration-700"
            style={{
              background: `radial-gradient(circle at 30% 25%, ${a.accent}18, transparent 60%), radial-gradient(circle at 70% 70%, ${a.accent}0A, transparent 50%)`,
              opacity: playing ? 0 : 1,
            }}
          />

          {/* Initials avatar */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-700"
            style={{ opacity: hovered ? 0 : 1 }}
          >
            <motion.div
              animate={{ scale: hovered ? 1.1 : 1 }}
              className="flex h-20 w-20 items-center justify-center rounded-full text-3xl font-black tracking-tighter text-white/20 backdrop-blur"
              style={{ backgroundColor: `${a.accent}15`, borderColor: a.accent, borderWidth: 1 }}
            >
              {initials}
            </motion.div>
          </div>

          {/* Play indicator */}
          <motion.div
            className="absolute bottom-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur"
            animate={{ scale: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.25 }}
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
          </motion.div>

          {/* Accent glow on hover */}
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ boxShadow: `inset 0 0 60px ${a.accent}15` }}
          />
        </div>

        {/* Info */}
        <div className="relative z-10">
          <p className="text-sm font-bold tracking-[-0.01em] text-white">{a.name}</p>
          <p
            className="mt-0.5 text-xs font-semibold uppercase tracking-[0.06em]"
            style={{ color: a.accent }}
          >
            {a.company}
          </p>
          <p className="mt-2.5 text-[13px] leading-relaxed text-white/50">
            {a.tagline[lang]}
          </p>
        </div>

        {/* Hover CTA */}
        <motion.div
          className="mt-4 flex items-center gap-1.5 text-xs font-bold"
          style={{ color: a.accent }}
          animate={{ x: hovered ? 4 : 0, opacity: hovered ? 1 : 0.5 }}
        >
          {lang === "fr" ? "Découvrir" : "Discover"}
          <ArrowRight className="h-3.5 w-3.5" />
        </motion.div>
      </Link>
    </motion.div>
  )
}

/* ── Page ─────────────────────────────────────────────────────────────── */

export default function LeadersPage() {
  const { lang } = useLanguage()
  const t = T[lang]
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const filtered = activeCategory
    ? ARCHITECTS.filter(a => a.category === activeCategory)
    : ARCHITECTS

  return (
    <main className="min-h-screen bg-[#080808] text-white">
      {/* Navbar */}
      <header className={`fixed top-0 z-50 w-full transition-all duration-500 ${scrolled ? "bg-[#080808]/90 backdrop-blur-xl border-b border-white/[0.06]" : ""}`}>
        <div className="flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2" aria-label="Unitalk">
            <span className="text-sm font-bold tracking-[-0.02em]">Unitalk</span>
          </Link>
          <Link
            href="/paul-graham"
            className="rounded-full bg-white px-5 py-2 text-xs font-bold text-black transition-all hover:scale-105 hover:shadow-[0_8px_30px_-10px_rgba(255,255,255,0.3)]"
          >
            {t.deploy}
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="px-6 pb-4 pt-28 text-center sm:px-8 sm:pt-32">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-auto mb-8 max-w-lg font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-white/30 leading-relaxed"
        >
          {t.founder}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mx-auto max-w-5xl text-balance text-[46px] font-black leading-[0.96] tracking-[-0.05em] sm:text-[72px] lg:text-[88px]"
        >
          {t.h1}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/40"
        >
          {t.subtitle}
        </motion.p>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-2"
        >
          <button
            onClick={() => setActiveCategory(null)}
            className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
              activeCategory === null
                ? "bg-white text-black"
                : "bg-white/[0.06] text-white/50 hover:bg-white/[0.12] hover:text-white/80"
            }`}
          >
            {lang === "fr" ? "Tous" : "All"}
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              className={`rounded-full px-4 py-2 text-xs font-bold capitalize transition-all ${
                activeCategory === cat
                  ? "bg-white text-black"
                  : "bg-white/[0.06] text-white/50 hover:bg-white/[0.12] hover:text-white/80"
              }`}
            >
              {t.categories[cat]}
            </button>
          ))}
        </motion.div>
      </section>

      {/* Grid */}
      <section className="px-6 pb-24 sm:px-8">
        <motion.div
          key={activeCategory ?? "all"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mx-auto grid max-w-[1400px] gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {filtered.map((a, i) => (
            <ArchitectCard key={a.slug} a={a} index={i} lang={lang} />
          ))}
        </motion.div>
      </section>

      {/* Patrick signature */}
      <section className="border-t border-white/[0.06] px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl"
        >
          <p className="text-[18px] leading-relaxed text-white/70 font-medium">
            {t.footer}
          </p>
          <Link
            href="/paul-graham"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-black transition-all hover:scale-105 hover:shadow-[0_15px_40px_-12px_rgba(255,255,255,0.3)]"
          >
            {t.deploy}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-8 text-center">
        <p className="text-xs text-white/30">
          Unitalk · Paris, France ·{" "}
          <a href="mailto:hello@unitalk.ai" className="underline hover:text-white/50">hello@unitalk.ai</a>
        </p>
      </footer>
    </main>
  )
}