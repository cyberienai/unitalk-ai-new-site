'use client'

import { motion } from 'framer-motion'
import { Blocks, BrainCircuit, Layers3, LifeBuoy } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as const

const T = {
  fr: {
    items: [
      { icon: LifeBuoy, title: 'Vous n’êtes jamais seul', desc: 'Alma vous accompagne et transmet à un ingénieur IA si nécessaire.' },
      { icon: Layers3, title: 'Profils métier et compétences sans limite', desc: 'Faites évoluer chaque Collaborateur IA selon vos missions.' },
      { icon: Blocks, title: 'Plus de 3 000 intégrations disponibles', desc: 'Connectez les outils que votre entreprise utilise déjà.' },
      { icon: BrainCircuit, title: 'Le modèle adapté à chaque tâche', desc: 'Unitalk sélectionne le modèle autorisé le plus pertinent pour le travail à accomplir.' },
    ],
  },
  en: {
    items: [
      { icon: LifeBuoy, title: 'You are never on your own', desc: 'Alma supports you and hands over to an AI engineer when needed.' },
      { icon: Layers3, title: 'Job profiles and skills without limits', desc: 'Evolve each AI Collaborator as your missions change.' },
      { icon: Blocks, title: 'More than 3,000 integrations available', desc: 'Connect the tools your company already uses.' },
      { icon: BrainCircuit, title: 'The right model for each task', desc: 'Unitalk selects the most relevant authorized model for the work at hand.' },
    ],
  },
} as const

export function SectionReassurance({ lang }: { lang: 'fr' | 'en' }) {
  const t = T[lang]

  return (
    <section aria-label={lang === 'fr' ? 'Réassurance' : 'Reassurance'} className="w-full border-t border-[#E9E2D4] bg-[#F3EFE6]">
      <div className="editorial-shell py-8 sm:py-10">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-6 lg:grid-cols-4">
          {t.items.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, ease, delay: i * 0.08 }}
                className="flex items-center gap-3"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#E4DCCF] bg-[#FBF9F3] text-[#D10E63]">
                  <Icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-bold leading-tight text-[#1C1A17]">{item.title}</p>
                  <p className="mt-0.5 text-[13px] leading-tight text-[#6B6560]">{item.desc}</p>
                </div>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
