'use client'

import { useLanguage } from '@/lib/language-context'
import { useAlma } from '@/components/home/alma-panel-context'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const COPY = {
  fr: {
    kicker: 'Mission après mission',
    title: 'Votre entreprise devient plus capable, mission après mission.',
    lead: 'Vos Collaborateurs IA accomplissent le travail. Les méthodes, les compétences et l’expérience que vous validez restent dans votre entreprise.',
    owned: ['Ne louez pas votre intelligence.', 'Possédez-la.'],
    proof: ['7 jours pour votre première mission', 'Sans CB', 'Hébergé en France'],
    cta: 'Confier une première mission',
    ctaNote: 'Décrivez votre besoin. Alma prépare la suite.',
  },
  en: {
    kicker: 'Mission after mission',
    title: 'Your company becomes more capable, mission after mission.',
    lead: 'Your AI Collaborators do the work. The methods, skills and experience you validate stay inside your company.',
    owned: ['Don’t rent your intelligence.', 'Own it.'],
    proof: ['7 days for your first mission', 'No card', 'Hosted in France'],
    cta: 'Hand over a first mission',
    ctaNote: 'Describe your need. Alma prepares the next steps.',
  },
}

export function SectionVision() {
  const { lang } = useLanguage()
  const { openAlma } = useAlma()
  const t = COPY[lang]

  return (
    <section className="relative overflow-hidden border-t border-[#2A2723] bg-[#161412] px-6 py-16 sm:py-24">
      {/* single quiet magenta thread anchoring the dark scene */}
      <span aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-24 w-px -translate-x-1/2 bg-gradient-to-b from-[#D10E63] to-transparent" />

      <div className="mx-auto max-w-3xl text-center">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#E8A0BE]">{t.kicker}</p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mt-6 text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.02em] text-[#F4F1EA] sm:text-5xl md:text-6xl"
        >
          {t.title}
        </motion.h2>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-[#B8B0A4] sm:text-lg">{t.lead}</p>

        <p className="mt-10 text-balance font-sf text-2xl font-semibold leading-[1.15] tracking-[-0.02em] text-[#F4F1EA] sm:text-3xl">
          {t.owned[0]}{' '}
          <span className="text-[#E8A0BE]">{t.owned[1]}</span>
        </p>

        <div className="mt-8 flex flex-col items-center gap-4">
          <button
            type="button"
            onClick={() => openAlma()}
            className="group inline-flex items-center gap-2.5 rounded-full bg-[#D10E63] px-8 py-4 text-base font-bold text-[#FBF9F3] transition-colors hover:bg-[#E51872] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#161412]"
          >
            {t.cta}
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </button>
          <p className="text-[13px] text-[#8C8477]">{t.ctaNote}</p>
        </div>

        <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {t.proof.map((p) => (
            <li key={p} className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[#8C8477]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#22A06B]" aria-hidden />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
