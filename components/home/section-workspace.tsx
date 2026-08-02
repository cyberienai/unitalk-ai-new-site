'use client'

import { motion } from 'framer-motion'
import { Boxes } from 'lucide-react'
import { Kicker } from '@/components/home/section-kicker'

const T = {
  fr: {
    kicker: 'Votre espace de travail',
    title: 'Un seul espace pour toute votre intelligence.',
    lead: 'Vos équipes travaillent avec les meilleurs modèles IA, vos applications, vos documents, vos automatisations et vos Collaborateurs IA — dans un espace privé qui appartient à votre entreprise.',
    center: 'Workspace',
    centerSub: 'Espace privé',
    models: 'Modèles IA',
    tools: 'Vos outils',
    modelNodes: ['ChatGPT', 'Claude', 'Gemini', 'Mistral'],
    toolNodes: ['CRM', 'ERP', 'Email', 'Agenda', 'Drive'],
  },
  en: {
    kicker: 'Your workspace',
    title: 'One space for all your intelligence.',
    lead: 'Your teams work with the best AI models, your applications, your documents, your automations and your AI Collaborators — in a private space that belongs to your company.',
    center: 'Workspace',
    centerSub: 'Private space',
    models: 'AI models',
    tools: 'Your tools',
    modelNodes: ['ChatGPT', 'Claude', 'Gemini', 'Mistral'],
    toolNodes: ['CRM', 'ERP', 'Email', 'Calendar', 'Drive'],
  },
} as const

function Node({ label, delay }: { label: string; delay: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay }}
      className="inline-flex items-center rounded-full border border-[#E4DDCE] bg-[#FBF9F3] px-4 py-2 text-sm font-semibold text-[#4E483F]"
    >
      {label}
    </motion.span>
  )
}

export function SectionWorkspace({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = T[lang]

  return (
    <section className="bg-[#EFE9DD] py-20 sm:py-28">
      <div className="editorial-shell">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Kicker>{t.kicker}</Kicker>
          </div>
          <h2 className="mt-4 text-balance font-sf text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-[#1C1A17]">
            {t.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-7 text-[#5F594F]">{t.lead}</p>
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          <div className="rounded-[2rem] border border-[#E0D8C9] bg-[#F7F3EA] p-6 sm:p-10">
            {/* Models */}
            <p className="mb-3 text-center font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#857C6E]">
              {t.models}
            </p>
            <div className="flex flex-wrap justify-center gap-2.5">
              {t.modelNodes.map((n, i) => (
                <Node key={n} label={n} delay={i * 0.06} />
              ))}
            </div>

            {/* Converging line */}
            <div className="mx-auto my-6 h-8 w-px bg-gradient-to-b from-[#D10E63]/10 to-[#D10E63]/50" aria-hidden="true" />

            {/* Center workspace */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mx-auto flex max-w-sm items-center gap-4 rounded-3xl border border-[#D10E63]/30 bg-[#D10E63] p-6 text-[#FBF9F3] shadow-[0_20px_60px_rgba(209,14,99,0.25)]"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FBF9F3]/15">
                <Boxes className="h-6 w-6" />
              </span>
              <div>
                <p className="font-sf text-xl font-bold tracking-[-0.02em]">{t.center}</p>
                <p className="text-sm text-[#FBF9F3]/80">{t.centerSub}</p>
              </div>
            </motion.div>

            {/* Converging line */}
            <div className="mx-auto my-6 h-8 w-px bg-gradient-to-t from-[#D10E63]/10 to-[#D10E63]/50" aria-hidden="true" />

            {/* Tools */}
            <p className="mb-3 text-center font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#857C6E]">
              {t.tools}
            </p>
            <div className="flex flex-wrap justify-center gap-2.5">
              {t.toolNodes.map((n, i) => (
                <Node key={n} label={n} delay={i * 0.06} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
