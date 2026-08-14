'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/language-context'

const ease = [0.22, 1, 0.36, 1] as const

const T = {
  fr: {
    eyebrow: 'À l’échelle de l’entreprise',
    title1: 'Pas un assistant personnel. ',
    title2: 'Le moteur de votre entreprise.',
    body: 'La plupart des outils d’IA aident une personne à aller plus vite. Unitalk travaille pour toute l’organisation — plusieurs agents, une mémoire commune, vos processus de bout en bout.',
    cta: 'Équiper mon entreprise',
    pillars: [
      { title: 'Une mémoire partagée', desc: 'Vos agents puisent dans la même connaissance de l’entreprise : clients, historiques, procédures. Rien ne se perd d’un service à l’autre.' },
      { title: 'Plusieurs agents qui coopèrent', desc: 'Commercial, support, administratif : chacun son rôle, tous alignés. Ils se passent le relais comme une vraie équipe.' },
      { title: 'Vos processus, de bout en bout', desc: 'Un devis qui devient commande, puis facture, puis relance. L’agent orchestre le flux complet, pas une tâche isolée.' },
    ],
  },
  en: {
    eyebrow: 'At company scale',
    title1: 'Not a personal assistant. ',
    title2: 'The engine of your company.',
    body: 'Most AI tools help one person move faster. Unitalk works for the whole organization — several agents, shared memory, your processes end to end.',
    cta: 'Equip my company',
    pillars: [
      { title: 'A shared memory', desc: 'Your agents draw on the same company knowledge: customers, history, procedures. Nothing is lost from one department to the next.' },
      { title: 'Several agents cooperating', desc: 'Sales, support, admin: each with its role, all aligned. They hand off to each other like a real team.' },
      { title: 'Your processes, end to end', desc: 'A quote that becomes an order, then an invoice, then a follow-up. The agent orchestrates the full flow, not an isolated task.' },
    ],
  },
}

export function EnterpriseSection() {
  const { lang } = useLanguage()
  const t = T[lang]
  const PILLARS = t.pillars
  return (
    <section className="relative w-full overflow-hidden bg-[#1C1A17] py-20 sm:py-28 text-[#F3EFE6]">
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: statement */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#F0568F]">
              {t.eyebrow}
            </p>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease }}
              className="mt-4 font-sf text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.04] text-[#FBF9F3] text-balance"
              style={{ letterSpacing: '-0.03em' }}
            >
              {t.title1}
              <span className="text-[#F0568F]">{t.title2}</span>
            </motion.h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[#C9C1B2] sm:text-lg">
              {t.body}
            </p>
            <a
              href="/decouvrir"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#D10E63] px-6 py-3 text-sm font-semibold text-[#FBF9F3] transition-colors hover:bg-[#B00B52]"
            >
              {t.cta}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Right: pillars */}
          <div className="flex flex-col divide-y divide-white/10 border-t border-white/10">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, ease, delay: i * 0.08 }}
                className="flex gap-5 py-6"
              >
                <span className="font-sf text-lg font-bold text-[#F0568F] tabular-nums" style={{ letterSpacing: '-0.02em' }}>
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-sf text-lg font-bold text-[#FBF9F3]" style={{ letterSpacing: '-0.02em' }}>
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#C9C1B2]">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
