'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { collaboratorHref } from '@/lib/collaborators-catalog'
import { Kicker } from './section-kicker'

const ease = [0.22, 1, 0.36, 1] as const

// Chaque mission mène au Collaborateur IA qui la réalise.
// L'ordre suit exactement celui des tableaux `missions` (identique FR/EN).
const MISSION_SLUGS = [
  // Page 1
  'hugo', // Trouver de nouveaux clients
  'ines', // Répondre à vos clients
  'lea', // Créer vos contenus
  'lea', // Générer des images
  'lea', // Générer des vidéos
  'arthur', // Exécuter du code
  'nadia', // Analyser vos données
  'emma', // Participer à vos réunions
  // Page 2
  'hugo', // Gérer votre CRM
  'arthur', // Planifier des tâches
  'nadia', // Suivre votre trésorerie
  'lea', // Planifier vos publications
  'nadia', // Effectuer de la veille
  'emma', // Traduire vos documents
  'emma', // Prendre des notes vocales
  'emma', // Transcrire les réunions
  // Page 3
  'hugo', // Émettre des appels sortants
  'hugo', // Qualifier vos prospects
  'emma', // Envoyer un email
  'emma', // Générer des présentations
  'nadia', // Gérer vos factures
  'emma', // Prendre un rendez-vous
  'lea', // Publier sur les réseaux sociaux
  'emma', // Naviguer sur Internet
] as const

const PAGE_SIZE = 8

const T: Record<Lang, {
  kicker: string
  headline: string
  rotatingWords: string[]
  subtitle: string
  exploreAll: string
  missions: string[]
  prevPage: string
  nextPage: string
  goToPage: (n: number) => string
}> = {
  fr: {
    kicker: 'Commencez par une mission',
    headline: 'Votre Collaborateur\u00A0IA est prêt',
    rotatingWords: ['à commencer', 'à générer du contenu', 'à écrire du code', 'à répondre à vos clients', 'à prospecter', 'à participer à vos réunions', 'à automatiser vos tâches', 'à rédiger vos rapports', 'à créer vos visuels', 'à générer des vidéos', 'à analyser vos données', 'à planifier vos posts', 'à gérer votre blog', 'à gérer votre CRM', 'à suivre votre trésorerie', 'à assurer votre support', 'à traduire vos documents'],
    subtitle: 'Choisissez une mission, un Collaborateur IA s’en charge.',
    exploreAll: 'Explorer toutes les missions',
    prevPage: 'Missions précédentes',
    nextPage: 'Missions suivantes',
    goToPage: (n) => `Voir le groupe de missions ${n}`,
    missions: [
      'Trouver de nouveaux clients',
      'Répondre à vos clients',
      'Créer vos contenus',
      'Générer des images',
      'Générer des vidéos',
      'Exécuter du code',
      'Analyser vos données',
      'Participer à vos réunions',
      'Gérer votre CRM',
      'Planifier des tâches',
      'Suivre votre trésorerie',
      'Planifier vos publications',
      'Effectuer de la veille',
      'Traduire vos documents',
      'Prendre des notes vocales',
      'Transcrire les réunions',
      'Émettre des appels sortants',
      'Qualifier vos prospects',
      'Envoyer un email',
      'Générer des présentations',
      'Gérer vos factures',
      'Prendre un rendez-vous',
      'Publier sur les réseaux sociaux',
      'Naviguer sur Internet',
    ],
  },
  en: {
    kicker: 'Start with a mission',
    headline: 'Your AI\u00A0Collaborator is ready',
    rotatingWords: ['to get started', 'to generate content', 'to write code', 'to answer your customers', 'to find new prospects', 'to join your meetings', 'to automate your tasks', 'to draft your reports', 'to create your visuals', 'to generate videos', 'to analyze your data', 'to schedule your posts', 'to manage your blog', 'to manage your CRM', 'to track your cash flow', 'to handle your support', 'to translate your documents'],
    subtitle: 'Pick a mission, an AI Collaborator handles it.',
    exploreAll: 'Explore every mission',
    prevPage: 'Previous missions',
    nextPage: 'Next missions',
    goToPage: (n) => `Go to mission group ${n}`,
    missions: [
      'Find new customers',
      'Answer your customers',
      'Create your content',
      'Generate images',
      'Generate videos',
      'Run code',
      'Analyze your data',
      'Join your meetings',
      'Manage your CRM',
      'Schedule tasks',
      'Track your cash flow',
      'Schedule your posts',
      'Monitor your market',
      'Translate your documents',
      'Take voice notes',
      'Transcribe meetings',
      'Make outbound calls',
      'Qualify your leads',
      'Send an email',
      'Generate presentations',
      'Manage your invoices',
      'Book an appointment',
      'Post on social media',
      'Browse the web',
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

  const totalPages = Math.ceil(t.missions.length / PAGE_SIZE)
  const [page, setPage] = useState(0)
  const goTo = (p: number) => setPage((p + totalPages) % totalPages)
  const pageMissions = t.missions
    .map((label, i) => ({ label, slug: MISSION_SLUGS[i], i }))
    .slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE)

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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.15, ease }}
          className="mt-12 sm:mt-14"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.ul
              key={page}
              initial={reduceMotion ? false : { opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, x: -24 }}
              transition={{ duration: 0.35, ease }}
              className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:justify-center sm:gap-3"
            >
              {pageMissions.map(({ label, slug }) => (
                <li key={label} className="flex">
                  <Link
                    href={collaboratorHref(slug)}
                    className="group flex w-full items-center gap-2 rounded-2xl border border-[#D8D0C2] bg-[#FBF9F3] px-3.5 py-2.5 text-left text-[13px] font-semibold leading-tight text-[#3F3A33] transition-all hover:-translate-y-0.5 hover:border-[#D10E63] hover:text-[#D10E63] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F3EFE6] sm:w-auto sm:rounded-full sm:px-5 sm:py-3 sm:text-sm"
                  >
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#D10E63]/50 transition-colors group-hover:bg-[#D10E63]"
                      aria-hidden="true"
                    />
                    {label}
                  </Link>
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>

          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => goTo(page - 1)}
                aria-label={t.prevPage}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D8D0C2] bg-[#FBF9F3] text-[#3F3A33] transition-colors hover:border-[#D10E63] hover:text-[#D10E63] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F3EFE6]"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={t.goToPage(i + 1)}
                    aria-current={i === page ? 'true' : undefined}
                    className={`h-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F3EFE6] ${
                      i === page ? 'w-6 bg-[#D10E63]' : 'w-2 bg-[#C9BFAF] hover:bg-[#D10E63]/60'
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => goTo(page + 1)}
                aria-label={t.nextPage}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D8D0C2] bg-[#FBF9F3] text-[#3F3A33] transition-colors hover:border-[#D10E63] hover:text-[#D10E63] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F3EFE6]"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </motion.div>

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
