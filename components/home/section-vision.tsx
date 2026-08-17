'use client'

import { useLanguage } from '@/lib/language-context'
import { useAlma } from '@/components/home/alma-panel-context'
import { AlmaInline } from '@/components/alma-inline'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const ease = [0.16, 1, 0.3, 1] as const

const COPY = {
  fr: {
    kicker: 'Mission après mission',
    title: 'Votre Collaborateur IA progresse avec votre entreprise.',
    lead: 'Mission après mission, il réutilise les méthodes et consignes validées par votre entreprise. L’expérience acquise reste dans votre organisation.',
    closing: 'Prêt à confier une première mission ?',
    cta: 'Décrire ma mission',
    ctaNote: 'Alma conserve votre demande et vous accompagne après la connexion.',
    proof: ['Première mission offerte', 'Sans carte bancaire', 'Rien ne devient payant sans votre accord'],
  },
  en: {
    kicker: 'Mission after mission',
    title: 'Your AI Collaborator improves with your organization.',
    lead: 'Mission after mission, it reuses the methods and instructions your organization has approved. The experience gained stays within your organization.',
    closing: 'Ready to hand over a first mission?',
    cta: 'Describe my mission',
    ctaNote: 'Alma saves your request and supports you after sign-in.',
    proof: ['First mission included', 'No credit card', 'Nothing becomes paid without your approval'],
  },
}

export function SectionVision() {
  const { lang } = useLanguage()
  const { openAlma } = useAlma()
  const t = COPY[lang]

  return (
    <section className="relative overflow-hidden bg-[#D10E63] px-6 py-20 text-white sm:py-28">
      {/* single quiet magenta thread anchoring the dark scene — the Unitalk
          signature, kept as a graphic accent only (not a reading color) */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-24 w-px -translate-x-1/2 bg-gradient-to-b from-white/70 to-transparent"
      />

      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-white/65">{t.kicker}</p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease }}
            className="mt-6 text-balance font-sf text-[clamp(3rem,6vw,6rem)] font-semibold leading-[.92] tracking-[-.065em] text-white"
          >
            {t.title}
          </motion.h2>
          <p className="mx-auto mt-7 max-w-2xl text-pretty text-[16px] leading-8 text-white/80">
            {t.lead}
          </p>
        </div>

        {/* Closing affirmation + the page's final conversion moment */}
        <div className="mt-16 text-center">
          <h3 className="mx-auto max-w-2xl text-balance text-2xl font-semibold leading-[1.15] tracking-[-0.02em] text-white sm:text-3xl">
            {t.closing}
          </h3>

          <div className="mt-8 flex flex-col items-center gap-4">
            <button
              type="button"
              onClick={() => {
                const hero = document.getElementById('alma-hero')
                if (hero) {
                  window.dispatchEvent(new Event('open-home-alma'))
                  return
                }
                openAlma(undefined, 'final_cta')
              }}
              className="group inline-flex min-h-12 items-center gap-2.5 rounded-full border border-white/35 bg-white px-8 py-3 text-base font-bold text-[#B00C54] transition-colors hover:bg-[#FFF3F8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#D10E63]"
            >
              {t.cta}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </button>
            <p className="text-[13px] text-white/70"><AlmaInline />{' '}{t.ctaNote}</p>
          </div>

          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {t.proof.map((p) => (
              <li
                key={p}
                className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.1em] text-white/70"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-white" aria-hidden />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
