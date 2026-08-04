'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { Kicker } from './section-kicker'

const ease = [0.22, 1, 0.36, 1] as const

const T: Record<Lang, {
  kicker: string
  headline: string
  rotatingWords: string[]
  subtitle: string
  exploreAll: string
  missions: string[]
}> = {
  fr: {
    kicker: 'Il vous manque quelqu’un.',
    headline: 'Votre Collaborateur\u00A0IA est prêt',
    rotatingWords: ['à commencer', 'à générer du contenu', 'à écrire du code', 'à répondre à vos clients', 'à prospecter', 'à préparer vos réunions', 'à automatiser vos tâches', 'à rédiger vos rapports', 'à créer vos visuels', 'à analyser vos données', 'à planifier vos posts', 'à gérer votre blog', 'à gérer votre CRM', 'à suivre votre trésorerie', 'à assurer votre support', 'à traduire vos documents'],
    subtitle: 'Choisissez une mission, un Collaborateur IA s’en charge.',
    exploreAll: 'Explorer toutes les missions',
    missions: [
      'Trouver de nouveaux clients',
      'Répondre à vos clients',
      'Créer vos contenus',
      'Préparer vos réunions',
      'Écrire du code',
      'Automatiser vos tâches',
      'Analyser vos données',
      'Gérer votre CRM',
      'Suivre votre trésorerie',
      'Planifier vos publications',
      'Gérer votre blog',
      'Traduire vos documents',
      'Prendre des notes vocales',
      'Transcrire les réunions',
      'Émettre des appels sortants',
    ],
  },
  en: {
    kicker: 'You’re missing someone.',
    headline: 'Your AI\u00A0Collaborator is ready',
    rotatingWords: ['to get started', 'to generate content', 'to write code', 'to answer your customers', 'to find new prospects', 'to prepare your meetings', 'to automate your tasks', 'to draft your reports', 'to create your visuals', 'to analyze your data', 'to schedule your posts', 'to manage your blog', 'to manage your CRM', 'to track your cash flow', 'to handle your support', 'to translate your documents'],
    subtitle: 'Pick a mission, an AI Collaborator handles it.',
    exploreAll: 'Explore every mission',
    missions: [
      'Find new customers',
      'Answer your customers',
      'Create your content',
      'Prepare your meetings',
      'Write code',
      'Automate your tasks',
      'Analyze your data',
      'Manage your CRM',
      'Track your cash flow',
      'Schedule your posts',
      'Manage your blog',
      'Translate your documents',
      'Take voice notes',
      'Transcribe meetings',
      'Make outbound calls',
    ],
  },
}

export function SectionMissions({ lang }: { lang: Lang }) {
  const t = T[lang]
  const reduceMotion = useReducedMotion()
  const [wordIndex, setWordIndex] = useState(0)
  useEffect(() => {
    if (reduceMotion) return
    const id = setInterval(() => {
      setWordIndex((i) => (i + 1) % t.rotatingWords.length)
    }, 2200)
    return () => clearInterval(id)
  }, [reduceMotion, t.rotatingWords.length])

  return (
    <section id="missions" className="scroll-mt-20 border-t border-[#E9E2D4] bg-[#F3EFE6] px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease }}
        >
          <div className="flex justify-center">
            <Kicker>{t.kicker}</Kicker>
          </div>
          <h2 className="mt-4 text-balance font-sf text-[clamp(2rem,4.4vw,3.25rem)] font-bold leading-[1.05] tracking-[-0.03em] text-[#1C1A17]">
            {t.headline}
          </h2>
          <div
            className="mt-1 flex min-h-[1.5em] items-start justify-center overflow-hidden text-balance font-sf text-[clamp(2rem,4.4vw,3.25rem)] font-bold leading-[1.1] tracking-[-0.03em] text-[#D10E63]"
            aria-hidden="true"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={wordIndex}
                initial={reduceMotion ? false : { opacity: 0, y: '0.5em' }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: '-0.5em' }}
                transition={{ duration: 0.4, ease }}
                className="inline-block text-balance"
              >
                {t.rotatingWords[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
          <p className="sr-only">{`${t.headline} ${t.rotatingWords.join(', ')}.`}</p>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-lg leading-relaxed text-[#5F594F]">
            {t.subtitle}
          </p>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.15, ease }}
          className="mt-12 grid grid-cols-2 gap-2.5 sm:mt-14 sm:flex sm:flex-wrap sm:justify-center sm:gap-3"
        >
          {t.missions.map((mission) => (
            <li key={mission} className="flex">
              <Link
                href="/collaborateurs-ia"
                className="group flex w-full items-center gap-2 rounded-2xl border border-[#D8D0C2] bg-[#FBF9F3] px-3.5 py-2.5 text-left text-[13px] font-semibold leading-tight text-[#3F3A33] transition-all hover:-translate-y-0.5 hover:border-[#D10E63] hover:text-[#D10E63] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F3EFE6] sm:w-auto sm:rounded-full sm:px-5 sm:py-3 sm:text-sm"
              >
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#D10E63]/50 transition-colors group-hover:bg-[#D10E63]"
                  aria-hidden="true"
                />
                {mission}
              </Link>
            </li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
          className="mt-14"
        >
          <Link
            href="/collaborateurs-ia"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#D10E63] px-7 text-sm font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F3EFE6]"
          >
            {t.exploreAll}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
