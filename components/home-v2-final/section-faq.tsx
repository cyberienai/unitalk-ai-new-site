'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as const

const T = {
  fr: {
    eyebrow: 'Questions essentielles',
    title: 'Ce qu’il faut comprendre.',
    items: [
      {
        q: 'Qu’est-ce qu’un profil métier ?',
        a: 'Un profil métier réunit les compétences et les méthodes nécessaires pour accomplir un ensemble de missions.',
      },
      {
        q: 'Dois-je choisir les compétences moi-même ?',
        a: 'Non. Vous choisissez une mission. Alma identifie le profil métier, les compétences et les outils nécessaires, puis vous validez sa préparation.',
      },
      {
        q: 'Mon Collaborateur IA change-t-il de métier ?',
        a: 'Il conserve son identité, sa mémoire, ses accès et son historique. Vous pouvez lui ajouter plusieurs profils métier selon les besoins de votre organisation.',
      },
      {
        q: 'Puis-je personnaliser son identité ?',
        a: 'Oui. Après son arrivée, vous pouvez modifier son nom, son avatar et sa voix.',
      },
    ],
  },
  en: {
    eyebrow: 'Essential questions',
    title: 'What you need to understand.',
    items: [
      {
        q: 'What is a business profile?',
        a: 'A business profile brings together the skills and methods needed to carry out a set of missions.',
      },
      {
        q: 'Do I have to choose the skills myself?',
        a: 'No. You choose a mission. Alma identifies the business profile, skills and tools required, then you approve its preparation.',
      },
      {
        q: 'Does my AI Collaborator change job?',
        a: 'It keeps its identity, memory, access and history. You can add several business profiles depending on your organization’s needs.',
      },
      {
        q: 'Can I personalize its identity?',
        a: 'Yes. After it arrives, you can change its name, avatar and voice.',
      },
    ],
  },
} as const

export function SectionFaq({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = T[lang]
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="relative overflow-hidden bg-[#F3EFE6] py-20 sm:py-28">
      <div className="editorial-shell">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D10E63]">
            {t.eyebrow}
          </p>
          <h2 className="text-balance font-sf text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-[#1C1A17]">
            {t.title}
          </h2>
        </div>

        <div className="mx-auto mt-10 max-w-2xl">
          <ul className="flex flex-col gap-3">
            {t.items.map((item, i) => {
              const isOpen = open === i
              return (
                <li key={item.q} className="overflow-hidden rounded-2xl border border-[#D8D0C2] bg-[#FBF9F3]">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-inset"
                  >
                    <span className="text-sm font-bold text-[#1C1A17]">{item.q}</span>
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#D10E63]/10 text-[#D10E63] transition-transform ${
                        isOpen ? 'rotate-45' : ''
                      }`}
                      aria-hidden="true"
                    >
                      <Plus className="h-4 w-4" strokeWidth={2.5} />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-sm leading-relaxed text-[#4E483F]">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
