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
        a: 'Un profil métier, c’est un ensemble de savoir-faire que vous ajoutez à votre Collaborateur IA pour une mission : « Responsable du contenu », « Business developer », « Analyste data »… Il en gagne les compétences et les bons réflexes, sans changer d’identité.',
      },
      {
        q: 'Mon Collaborateur IA change-t-il quand j’ajoute un profil ?',
        a: 'Non. Emma reste Emma : même identité, même mémoire, mêmes accès. Un nouveau profil ajoute des savoir-faire, il ne remplace pas ce qu’elle sait déjà faire.',
      },
      {
        q: 'Combien de missions peut-il gérer ?',
        a: 'Autant que nécessaire. Vous activez les profils métier dont vous avez besoin, au fil de vos priorités, sans limite et sans surcoût par profil.',
      },
      {
        q: 'Est-ce que je garde le contrôle sur son travail ?',
        a: 'Oui. Votre Collaborateur IA avance dans son espace de travail et vous sollicite pour valider les étapes importantes. Rien n’est publié ou envoyé sans votre accord quand vous le souhaitez.',
      },
    ],
  },
  en: {
    eyebrow: 'Essential questions',
    title: 'What you need to understand.',
    items: [
      {
        q: 'What is a business profile?',
        a: 'A business profile is a set of know-how you add to your AI Collaborator for a mission: “Content lead”, “Business developer”, “Data analyst”… It gains the skills and the right instincts, without changing identity.',
      },
      {
        q: 'Does my AI Collaborator change when I add a profile?',
        a: 'No. Emma stays Emma: same identity, same memory, same access. A new profile adds know-how, it doesn’t replace what she already knows how to do.',
      },
      {
        q: 'How many missions can it handle?',
        a: 'As many as needed. You activate the business profiles you need, as your priorities evolve, with no limit and no extra cost per profile.',
      },
      {
        q: 'Do I keep control over its work?',
        a: 'Yes. Your AI Collaborator works in its workspace and asks you to approve the important steps. Nothing is published or sent without your consent when you want it that way.',
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
