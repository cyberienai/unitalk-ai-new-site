'use client'

import { useLanguage } from '@/lib/language-context'
import { useAlma } from '@/components/home/alma-panel-context'
import { motion } from 'framer-motion'
import { ArrowRight, Lock, Network } from 'lucide-react'

const ease = [0.16, 1, 0.3, 1] as const

const COPY = {
  fr: {
    kicker: 'Écosystème Unitalk',
    title: 'Chaque entreprise enrichit ses propres capacités. Ensemble, elles font progresser l’écosystème Unitalk.',
    lead: 'Votre Collaborateur IA conserve l’identité, la mémoire et les méthodes propres à votre entreprise. Il bénéficie aussi des nouvelles compétences, intégrations et améliorations rendues disponibles dans l’écosystème Unitalk.',
    privateTitle: 'Ce qui reste à vous',
    privateItems: ['Votre mémoire', 'Vos données', 'Vos méthodes', 'Votre historique'],
    collectiveTitle: 'Ce qui progresse pour tous',
    collectiveItems: ['Le produit', 'Les compétences publiées', 'Les intégrations', 'Les contributions open source'],
    closing: 'Votre entreprise peut maintenant compter sur son propre Collaborateur IA.',
    cta: 'Confier une mission',
    ctaNote: 'Décrivez votre besoin. Alma prépare la suite.',
    proof: ['7 jours pour votre première mission', 'Sans CB', 'Hébergé en France'],
  },
  en: {
    kicker: 'The Unitalk ecosystem',
    title: 'Every company grows its own capabilities. Together, they move the Unitalk ecosystem forward.',
    lead: 'Your AI Collaborator keeps the identity, memory and methods that belong to your company. It also benefits from the new skills, integrations and improvements made available across the Unitalk ecosystem.',
    privateTitle: 'What stays yours',
    privateItems: ['Your memory', 'Your data', 'Your methods', 'Your history'],
    collectiveTitle: 'What grows for everyone',
    collectiveItems: ['The product', 'Published skills', 'Integrations', 'Open-source contributions'],
    closing: 'Your company can now rely on its own AI Collaborator.',
    cta: 'Hand over a mission',
    ctaNote: 'Describe your need. Alma prepares the next steps.',
    proof: ['7 days for your first mission', 'No card', 'Hosted in France'],
  },
}

export function SectionEcosystem() {
  const { lang } = useLanguage()
  const { openAlma } = useAlma()
  const t = COPY[lang]

  const columns = [
    { key: 'private', Icon: Lock, title: t.privateTitle, items: t.privateItems, accent: '#1C1A17' },
    { key: 'collective', Icon: Network, title: t.collectiveTitle, items: t.collectiveItems, accent: '#D10E63' },
  ]

  return (
    <section className="relative border-t border-[#E4DDCF] bg-[#F4F1EA] px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <p className="text-center font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#B0284F]">{t.kicker}</p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease }}
          className="mx-auto mt-6 max-w-3xl text-balance text-center text-3xl font-semibold leading-[1.12] tracking-[-0.02em] text-[#1C1A17] sm:text-4xl md:text-[2.75rem]"
        >
          {t.title}
        </motion.h2>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-center text-base leading-relaxed text-[#5C554A] sm:text-lg">{t.lead}</p>

        {/* The essential distinction: sovereign vs collective */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {columns.map((col) => (
            <motion.div
              key={col.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease }}
              className="rounded-2xl border border-[#E4DDCF] bg-[#FBF9F3] p-6 sm:p-7"
            >
              <div className="flex items-center gap-2.5">
                <col.Icon className="h-[18px] w-[18px]" style={{ color: col.accent }} aria-hidden />
                <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#6E655A]">{col.title}</h3>
              </div>
              <ul className="mt-5 flex flex-col gap-3">
                {col.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[15px] font-medium text-[#1C1A17]">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: col.accent }} aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Closing affirmation + the page's final conversion moment */}
        <div className="mt-16 text-center">
          <h3 className="mx-auto max-w-2xl text-balance text-2xl font-semibold leading-[1.15] tracking-[-0.02em] text-[#1C1A17] sm:text-3xl">
            {t.closing}
          </h3>

          <div className="mt-8 flex flex-col items-center gap-4">
            <button
              type="button"
              onClick={() => openAlma()}
              className="group inline-flex items-center gap-2.5 rounded-full bg-[#D10E63] px-8 py-4 text-base font-bold text-[#FBF9F3] transition-colors hover:bg-[#E51872] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F1EA]"
            >
              {t.cta}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </button>
            <p className="text-[13px] text-[#6E655A]">{t.ctaNote}</p>
          </div>

          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {t.proof.map((p) => (
              <li key={p} className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[#6E655A]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#22A06B]" aria-hidden />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
