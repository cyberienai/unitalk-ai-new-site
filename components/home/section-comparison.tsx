'use client'

import { useLanguage } from '@/lib/language-context'
import { Kicker } from '@/components/home/section-kicker'
import { motion } from 'framer-motion'

/**
 * THE DIFFERENCE — no crosses vs checks, the most generic SaaS comparison there
 * is. Four lines that TRANSFORM from left to right: a warm, inert column becomes
 * an anthracite, owned one, with the magenta mission thread crossing each line.
 * No pictograms.
 */

const COPY = {
  fr: {
    kicker: 'La différence',
    title: 'Des Collaborateurs IA sur mesure',
    titleAccent: 'en 1 h max.',
    lead: 'Prêts à rejoindre votre organisation pour vous aider à gérer l’intelligence de votre entreprise. Pas des outils individuels isolés.',
    beforeTitle: 'Des outils isolés',
    afterTitle: 'Un Collaborateur IA',
    rows: [
      ['Des comptes anonymes, sans identité propre', 'Une identité : une voix, un numéro de téléphone, un email, un calendrier'],
      ['Aucune mémoire, aucun contexte partagé', 'Une mémoire et des connaissances, connectées à vos applications'],
      ['Un outil figé sur une seule fonction', 'De multiples profils métier'],
      ['Des fonctionnalités qui ne progressent pas', 'Des compétences qui s’accumulent'],
      ['Des abonnements dispersés, un modèle par outil', 'Son propre espace de travail, avec l’accès aux meilleurs modèles d’IA et à toutes leurs modalités : texte, images, audio, vidéo et code'],
      ['Autant d’interfaces que d’outils', 'Une interface universelle pour tout gérer'],
    ],
  },
  en: {
    kicker: 'The difference',
    title: 'Custom AI Collaborators',
    titleAccent: 'in under an hour.',
    lead: 'Ready to join your organization and help you manage your company’s intelligence. Not isolated, individual tools.',
    beforeTitle: 'Isolated tools',
    afterTitle: 'An AI Collaborator',
    rows: [
      ['Anonymous accounts, no identity of their own', 'An identity: a voice, a phone number, an email, a calendar'],
      ['No memory, no shared context', 'A memory and knowledge, connected to your apps'],
      ['A tool locked to a single function', 'Multiple job profiles'],
      ['Features that never grow', 'Skills that accumulate'],
      ['Scattered subscriptions, one model per tool', 'Its own workspace, with access to the best AI models and all their modalities: text, images, audio, video and code'],
      ['As many interfaces as tools', 'One universal interface to manage everything'],
    ],
  },
} as const

const ease = [0.22, 1, 0.36, 1] as const

export function SectionComparison() {
  const { lang } = useLanguage()
  const t = COPY[lang]

  return (
    <section className="border-t border-[#E7E0D2] bg-[#F4F1EA] px-6 py-14 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <Kicker>{t.kicker}</Kicker>
        <h2 className="mt-5 max-w-3xl text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-[#1C1A17] sm:text-4xl md:text-5xl">
          {t.title} <span className="text-[#D10E63]">{t.titleAccent}</span>
        </h2>
        <p className="mt-5 max-w-2xl text-pretty text-[15px] leading-relaxed text-[#6B6459] sm:text-base">{t.lead}</p>

        {/* The transforming lines */}
        <div className="mt-10 overflow-hidden rounded-lg border border-[#E4DDCE]">
          {/* Column headers */}
          <div className="grid grid-cols-2">
            <div className="bg-[#EDE7DA] px-5 py-3.5 text-right">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#9A9184]">{t.beforeTitle}</span>
            </div>
            <div className="bg-[#1C1A17] px-5 py-3.5">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#E8A0BE]">{t.afterTitle}</span>
            </div>
          </div>

          {t.rows.map(([before, after], i) => (
            <motion.div
              key={before}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, ease, delay: i * 0.08 }}
              className="relative grid grid-cols-2 border-t border-[#E4DDCE]"
            >
              {/* left — warm, inert (text kept clear of the central seam) */}
              <div className="flex items-start justify-end bg-[#EDE7DA]/70 py-5 pl-5 pr-10 text-right sm:pl-7 sm:pr-12">
                <p className="text-[14px] leading-snug text-[#857C6E] sm:text-[15px]">{before}</p>
              </div>
              {/* right — anthracite, owned (text kept clear of the central seam) */}
              <div className="flex items-start bg-[#1C1A17] py-5 pl-10 pr-5 sm:pl-12 sm:pr-7">
                <p className="text-[14px] font-medium leading-snug text-[#F4F1EA] sm:text-[15px]">{after}</p>
              </div>

              {/* the mission thread node sitting on the seam — short ticks only */}
              <span aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
                <span className="relative flex items-center">
                  <span className="block h-px w-3 bg-gradient-to-r from-transparent to-[#D10E63]" />
                  <span className="block h-[10px] w-[10px] rounded-full bg-[#D10E63] ring-2 ring-[#F4F1EA]" />
                  <span className="block h-px w-3 bg-gradient-to-r from-[#D10E63] to-transparent" />
                </span>
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
