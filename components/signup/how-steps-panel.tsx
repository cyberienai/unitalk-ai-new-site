'use client'

import { motion } from 'framer-motion'
import { Globe, Wand2, Briefcase, Check } from 'lucide-react'

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

export function HowStepsPanel({ lang, activeIndex }: { lang: 'fr' | 'en'; activeIndex: number }) {
  const t = T[lang]

  return (
    <div className="flex flex-col">
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D10E63]">{t.eyebrow}</p>
      <h2 className="mt-4 text-balance font-sf text-2xl font-bold leading-[1.1] tracking-[-0.03em] text-[#1C1A17] lg:text-[1.75rem]">
        {t.title}
      </h2>
      <p className="mt-3 text-pretty text-[15px] leading-relaxed text-[#5F594F]">{t.subtitle}</p>

      <ol className="relative mt-9 flex flex-col gap-1">
        {t.steps.map((step, i) => {
          const Icon = step.icon
          const isActive = i === activeIndex
          const isDone = i < activeIndex
          const isLast = i === t.steps.length - 1
          return (
            <li key={step.step} className="relative flex gap-4 pb-6 last:pb-0">
              {/* Connector line */}
              {!isLast && (
                <span
                  className={`absolute left-[19px] top-11 bottom-1 w-px ${isDone ? 'bg-[#D10E63]' : 'bg-[#E4DCCF]'}`}
                  aria-hidden="true"
                />
              )}
              {/* Marker */}
              <span
                className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                  isActive
                    ? 'bg-[#D10E63] text-[#FBF9F3]'
                    : isDone
                      ? 'bg-[#D10E63]/12 text-[#D10E63]'
                      : 'bg-[#EDE6D8] text-[#B8AF9E]'
                }`}
              >
                {isDone ? (
                  <Check className="h-5 w-5" strokeWidth={2.5} aria-hidden="true" />
                ) : (
                  <Icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
                )}
              </span>
              {/* Content */}
              <div className="min-w-0 pt-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#B8AF9E]">
                    {step.step}
                  </span>
                  {isActive && (
                    <motion.span
                      layout
                      className="rounded-full bg-[#D10E63]/12 px-2 py-0.5 text-[10px] font-semibold text-[#D10E63]"
                    >
                      {lang === 'fr' ? 'En cours' : 'In progress'}
                    </motion.span>
                  )}
                </div>
                <h3
                  className={`mt-1 font-sf text-[15px] font-bold tracking-[-0.01em] transition-colors ${
                    isActive || isDone ? 'text-[#1C1A17]' : 'text-[#8A8175]'
                  }`}
                >
                  {step.title}
                </h3>
                <p
                  className={`mt-1 text-pretty text-[13px] leading-relaxed transition-colors ${
                    isActive ? 'text-[#5F594F]' : 'text-[#9A9082]'
                  }`}
                >
                  {step.desc}
                </p>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
