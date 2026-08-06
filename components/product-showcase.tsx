'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/lib/language-context'

const MODELS = ['GPT-5.5', 'Claude Opus 4', 'Gemini 3 Pro', 'Qwen 3 Max', 'DeepSeek V3', 'Kimi K2', 'GLM-5', 'MiniMax', 'Grok 4', 'Llama 4 · local']

const T = {
  fr: {
    eyebrow: 'Votre agent au travail',
    title1: 'Ce n’est pas un assistant. ',
    title2: 'C’est un employé numérique.',
    subtitle:
      'Il possède son propre numéro de téléphone, son adresse email, son agenda et ses comptes. Il travaille directement dans vos outils, comme un collaborateur — jour et nuit.',
    capabilitiesLabel: 'Ses accès et outils',
    capabilities: [
      'Téléphone', 'Email', 'Agenda', 'CRM', 'WhatsApp', 'Google Workspace',
      'Microsoft 365', 'Web', 'API', 'Mémoire', 'Voix', 'Documents',
    ],
    workspace: 'Espace de travail',
    model: 'Modèle',
    idLine1: 'voix · email · agenda',
    idLine2: 'contacts · fichiers',
    idLine3: 'contexte d’entreprise',
    listening: 'vous écoute…',
    profiles: [
      { name: 'Patrick', role: 'Commercial', color: '#D10E63' },
      { name: 'Sofia', role: 'Customer Success', color: '#3E6DA8' },
    ],
    tasks: [
      { label: 'Relance des devis en attente', done: true },
      { label: 'Résumé des appels de la semaine', done: true },
      { label: 'Préparation du rendez-vous de 14h', done: false },
    ],
  },
  en: {
    eyebrow: 'Your agent at work',
    title1: 'It’s not an assistant. ',
    title2: 'It’s a digital employee.',
    subtitle:
      'It has its own phone number, email address, calendar and accounts. It works directly inside your tools, like a teammate — day and night.',
    capabilitiesLabel: 'Its access and tools',
    capabilities: [
      'Phone', 'Email', 'Calendar', 'CRM', 'WhatsApp', 'Google Workspace',
      'Microsoft 365', 'Web', 'API', 'Memory', 'Voice', 'Documents',
    ],
    workspace: 'Workspace',
    model: 'Model',
    idLine1: 'voice · email · calendar',
    idLine2: 'contacts · files',
    idLine3: 'company context',
    listening: 'is listening…',
    profiles: [
      { name: 'Patrick', role: 'Sales', color: '#D10E63' },
      { name: 'Sofia', role: 'Customer Success', color: '#3E6DA8' },
    ],
    tasks: [
      { label: 'Follow up on pending quotes', done: true },
      { label: 'Summary of this week’s calls', done: true },
      { label: 'Prep for the 2pm meeting', done: false },
    ],
  },
}

export function ProductShowcase() {
  const [profile, setProfile] = useState(0)
  const [model, setModel] = useState(0)
  const { lang } = useLanguage()
  const t = T[lang]
  const PROFILES = t.profiles
  const TASKS = t.tasks

  useEffect(() => {
    const id = setInterval(() => setModel((m) => (m + 1) % MODELS.length), 2600)
    return () => clearInterval(id)
  }, [])

  const active = PROFILES[profile]

  return (
    <section id="solutions" className="relative w-full overflow-hidden bg-[#FBF9F3] py-20 sm:py-28 border-t border-[#DcD4C4]">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mb-12 sm:mb-16 max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#D10E63]" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D10E63]">
              {t.eyebrow}
            </p>
          </div>
          <h2 className="mt-4 font-sf text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.05] text-[#1C1A17] text-balance" style={{ letterSpacing: '-0.03em' }}>
            {t.title1}
            <span className="text-[#D10E63]">{t.title2}</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#4E483F] sm:text-lg">
            {t.subtitle}
          </p>
        </div>

        {/* Work record card */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <div className="overflow-hidden rounded-2xl border border-[#DcD4C4] bg-[#F3EFE6] shadow-[0_1px_2px_rgba(28,26,23,0.05)]">
              {/* Header bar */}
              <div className="flex items-center gap-4 border-b border-[#DcD4C4] px-5 py-3.5">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#857C6E]">
                  {t.workspace}
                </span>
                <div className="ml-auto flex items-center gap-1 rounded-full border border-[#DcD4C4] bg-[#FBF9F3] p-1">
                  {PROFILES.map((p, i) => (
                    <button
                      key={p.name}
                      onClick={() => setProfile(i)}
                      className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                        profile === i ? 'text-[#FBF9F3]' : 'text-[#857C6E] hover:text-[#1C1A17]'
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
                <div className="border-b border-[#DcD4C4] p-5 sm:border-b-0 sm:border-r">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active.name}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-full text-lg font-semibold text-[#FBF9F3]"
                        style={{ backgroundColor: active.color }}
                      >
                        {active.name[0]}
                      </div>
                      <p className="mt-3 text-sm font-semibold text-[#1C1A17]">{active.name}</p>
                      <p className="text-xs text-[#857C6E]">{active.role}</p>
                      <div className="mt-4 space-y-1.5 text-[11px] text-[#857C6E]">
                        <p>{t.idLine1}</p>
                        <p>{t.idLine2}</p>
                        <p>{t.idLine3}</p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Main area */}
                <div className="col-span-1 p-5 sm:col-span-2">
                  {/* Model selector */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-wider text-[#857C6E]">
                      {t.model}
                    </span>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={model}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2 }}
                        className="rounded-full border border-[#DcD4C4] bg-[#FBF9F3] px-2.5 py-1 text-xs font-medium text-[#1C1A17]"
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
                        className="flex items-center gap-3 rounded-lg border border-[#DcD4C4] bg-[#FBF9F3] px-3 py-2.5"
                      >
                        <span
                          className={`flex h-4 w-4 items-center justify-center rounded-full text-[9px] ${
                            t.done ? 'bg-[#2E7D4F] text-[#FBF9F3]' : 'border border-[#C4BAA8] text-transparent'
                          }`}
                        >
                          ✓
                        </span>
                        <span
                          className={`text-xs ${t.done ? 'text-[#A79E8E] line-through' : 'text-[#1C1A17]'}`}
                        >
                          {t.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Voice line */}
                  <div className="mt-4 flex items-center gap-2 rounded-full border border-[#DcD4C4] bg-[#FBF9F3] px-4 py-2.5">
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
                    <span className="text-xs text-[#857C6E]">{active.name} {t.listening}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Capabilities */}
          <div className="flex flex-col justify-center lg:col-span-4">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#857C6E]">
              {t.capabilitiesLabel}
            </p>
            <div className="flex flex-wrap gap-2">
              {t.capabilities.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#DcD4C4] bg-[#F3EFE6] px-3 py-1.5 text-xs font-medium text-[#1C1A17]"
                >
                  <span
                    className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#2E7D4F] text-[8px] text-[#FBF9F3]"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
