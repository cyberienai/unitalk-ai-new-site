'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PROFILES = [
  { name: 'Patrick', role: 'Commercial', color: '#FF0099' },
  { name: 'Alma', role: 'Customer Success', color: '#5D9CEC' },
]

const MODELS = ['GPT-5.5', 'Claude Opus 4', 'Gemini 3 Pro', 'Llama 4 · local']

const TASKS = [
  { label: 'Relance des devis en attente', done: true },
  { label: 'Résumé des appels de la semaine', done: true },
  { label: 'Préparation du rendez-vous de 14h', done: false },
]

export function ProductShowcase() {
  const [profile, setProfile] = useState(0)
  const [model, setModel] = useState(0)

  // Cycle the active model to feel alive
  useEffect(() => {
    const id = setInterval(() => setModel((m) => (m + 1) % MODELS.length), 2600)
    return () => clearInterval(id)
  }, [])

  const active = PROFILES[profile]

  return (
    <section className="relative w-full overflow-hidden bg-[#F4F1EA] py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mb-12 sm:mb-16 max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF0099]">
            Votre agent au travail
          </p>
          <h2 className="mt-3 font-heading text-3xl sm:text-4xl md:text-5xl font-light leading-[1.1] text-[#12100E] text-balance" style={{ letterSpacing: '-0.02em' }}>
            Un collègue.{' '}
            <span className="text-[#FF0099] italic">Pas un chatbot.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#5A554D] sm:text-lg">
            Chaque profil a son identité, sa mémoire et ses outils. Vous changez de rôle
            d&apos;un clic, vous choisissez le modèle, il exécute pendant que vous dormez.
          </p>
        </div>

        {/* Mockup */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          {/* App window */}
          <div className="lg:col-span-8">
            <div className="overflow-hidden rounded-2xl border border-black/10 bg-[#101013] shadow-2xl shadow-black/20">
              {/* Title bar */}
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
                <span className="h-3 w-3 rounded-full bg-[#28C840]" />
                {/* Profile toggle */}
                <div className="ml-4 flex items-center gap-1 rounded-full bg-white/5 p-1">
                  {PROFILES.map((p, i) => (
                    <button
                      key={p.name}
                      onClick={() => setProfile(i)}
                      className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                        profile === i ? 'text-white' : 'text-white/40 hover:text-white/70'
                      }`}
                      style={profile === i ? { backgroundColor: p.color } : undefined}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Body */}
              <div className="grid grid-cols-1 sm:grid-cols-3">
                {/* Identity panel */}
                <div className="border-b border-white/10 p-5 sm:border-b-0 sm:border-r">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active.name}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-full text-lg font-semibold text-white"
                        style={{ backgroundColor: active.color }}
                      >
                        {active.name[0]}
                      </div>
                      <p className="mt-3 text-sm font-semibold text-white">{active.name}</p>
                      <p className="text-xs text-white/50">{active.role}</p>
                      <div className="mt-4 space-y-1.5 text-[11px] text-white/40">
                        <p>voix · email · agenda</p>
                        <p>contacts · fichiers</p>
                        <p>mémoire d&apos;entreprise</p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Main area */}
                <div className="col-span-1 p-5 sm:col-span-2">
                  {/* Model selector */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-wider text-white/40">
                      Modèle
                    </span>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={model}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2 }}
                        className="rounded-full bg-white/8 px-2.5 py-1 text-xs font-medium text-white"
                      >
                        {MODELS[model]}
                      </motion.span>
                    </AnimatePresence>
                  </div>

                  {/* Tasks */}
                  <div className="mt-4 space-y-2">
                    {TASKS.map((t) => (
                      <div
                        key={t.label}
                        className="flex items-center gap-3 rounded-lg bg-white/5 px-3 py-2.5"
                      >
                        <span
                          className={`flex h-4 w-4 items-center justify-center rounded-full text-[9px] ${
                            t.done ? 'bg-[#28C840] text-black' : 'border border-white/25 text-transparent'
                          }`}
                        >
                          ✓
                        </span>
                        <span
                          className={`text-xs ${t.done ? 'text-white/45 line-through' : 'text-white/85'}`}
                        >
                          {t.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Voice line */}
                  <div className="mt-4 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5">
                    <span className="flex items-center gap-0.5" aria-hidden="true">
                      {[3, 7, 5, 9, 4, 8, 6, 10, 5, 7].map((h, i) => (
                        <motion.span
                          key={i}
                          className="w-0.5 rounded-full"
                          style={{ backgroundColor: active.color }}
                          animate={{ height: [h * 1.4, h * 2.6, h * 1.4] }}
                          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.08, ease: 'easeInOut' }}
                        />
                      ))}
                    </span>
                    <span className="text-xs text-white/60">{active.name} vous écoute…</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Side captions */}
          <div className="flex flex-col justify-center gap-6 lg:col-span-4">
            {[
              { k: 'Multimodèle', v: 'Le meilleur modèle pour chaque tâche — sans changer d\'outil.' },
              { k: 'Multi-profil', v: 'Un agent, plusieurs rôles. Chacun avec sa propre identité.' },
              { k: 'Autonome', v: 'Il planifie et exécute vos tâches, même la nuit.' },
            ].map((c) => (
              <div key={c.k} className="border-l-2 border-[#FF0099]/30 pl-4">
                <p className="text-sm font-semibold text-[#12100E]">{c.k}</p>
                <p className="mt-1 text-sm leading-relaxed text-[#5A554D]">{c.v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
