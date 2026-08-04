'use client'

import { motion } from 'framer-motion'
import { Globe, Wand2, Briefcase } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as const

const T = {
  fr: {
    eyebrow: 'Comment ça marche',
    title: 'De votre site à votre Collaborateur IA, en trois temps.',
    subtitle: 'Vous n’installez rien. Vous partagez votre activité, et Alma s’occupe du reste.',
    steps: [
      {
        icon: Globe,
        step: 'Étape 1',
        title: 'Vous connectez votre activité',
        desc: 'Renseignez votre site web et vos outils. Alma analyse votre métier, vos offres et votre façon de travailler.',
      },
      {
        icon: Wand2,
        step: 'Étape 2',
        title: 'Alma façonne son savoir-faire',
        desc: 'Elle construit son profil métier, sa mémoire et ses compétences, sur mesure pour votre organisation.',
      },
      {
        icon: Briefcase,
        step: 'Étape 3',
        title: 'Il commence à travailler',
        desc: 'Votre Collaborateur IA rejoint votre organisation et prend ses missions en main, depuis son propre poste de travail.',
      },
    ],
  },
  en: {
    eyebrow: 'How it works',
    title: 'From your website to your AI Collaborator, in three steps.',
    subtitle: 'You install nothing. You share your business, and Alma takes care of the rest.',
    steps: [
      {
        icon: Globe,
        step: 'Step 1',
        title: 'You connect your business',
        desc: 'Add your website and your tools. Alma analyzes your business, your offers and the way you work.',
      },
      {
        icon: Wand2,
        step: 'Step 2',
        title: 'Alma shapes its know-how',
        desc: 'It builds its business profile, its memory and its skills, tailored to your organization.',
      },
      {
        icon: Briefcase,
        step: 'Step 3',
        title: 'It starts working',
        desc: 'Your AI Collaborator joins your organization and takes on its missions, from its own workstation.',
      },
    ],
  },
} as const

export function SectionHow({ lang }: { lang: 'fr' | 'en' }) {
  const t = T[lang]

  return (
    <section aria-label={t.eyebrow} className="w-full border-t border-[#E9E2D4] bg-[#FBF9F3] py-24 sm:py-32">
      <div className="editorial-shell">
        <header className="mx-auto max-w-2xl text-center">
          <p className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D10E63]">
            {t.eyebrow}
          </p>
          <h2 className="text-balance font-sf text-3xl font-bold leading-[1.05] tracking-[-0.035em] text-[#1C1A17] sm:text-4xl lg:text-[2.75rem]">
            {t.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-[#5F594F]">
            {t.subtitle}
          </p>
        </header>

        <ol className="mt-16 grid gap-6 md:grid-cols-3">
          {t.steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.li
                key={step.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease, delay: i * 0.12 }}
                className="relative flex flex-col rounded-[1.75rem] border border-[#E4DCCF] bg-[#F3EFE6] p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D10E63] text-[#FBF9F3]">
                    <Icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
                  </span>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#B8AF9E]">
                    {step.step}
                  </span>
                </div>
                <h3 className="mt-6 text-pretty font-sf text-xl font-bold tracking-[-0.02em] text-[#1C1A17]">
                  {step.title}
                </h3>
                <p className="mt-2 text-pretty text-[15px] leading-relaxed text-[#5F594F]">{step.desc}</p>
              </motion.li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
