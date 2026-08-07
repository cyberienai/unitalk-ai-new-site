'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Check, GitBranch, ShieldCheck, UserCheck } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { Kicker } from '@/components/home/section-kicker'

/**
 * HERMÈS REVEAL — the engine behind the Collaborators, shown as a single skill
 * card that outlives the mission that created it. One card, centred, on an
 * anthracite surface. Actions are discreet; Hermès is the quiet motor.
 */

const T = {
  fr: {
    eyebrow: 'Propulsé par Hermès',
    title: 'Une mission accomplie. Une compétence qui reste.',
    sub: 'Hermès est le moteur des Collaborateurs IA. Chaque mission réussie devient une compétence versionnée, gouvernée par votre entreprise.',
    owner: 'Propriétaire',
    ownerV: 'Solvea',
    skill: 'Relance des factures impayées',
    version: 'Version 1.0',
    trigger: 'Déclencheur',
    triggerV: 'Chaque lundi, factures échues depuis 7 jours',
    stepsLabel: 'Méthode',
    steps: [
      'Identifier les factures échues',
      'Préparer une relance adaptée à chaque client',
      'Soumettre les cas sensibles à validation',
      'Envoyer après accord',
      'Classer les réponses et suivre les paiements',
    ],
    limit: 'Limite',
    limitV: 'Aucun contentieux sans validation humaine',
    validatedBy: 'Validée par Sophie',
    share: 'Partageable dans votre Organisation',
    signature: 'The agent that grows with you.',
    link: 'Découvrir Hermès',
  },
  en: {
    eyebrow: 'Powered by Hermès',
    title: 'A mission done. A skill that stays.',
    sub: 'Hermès is the engine behind AI Collaborators. Every successful mission becomes a versioned skill, governed by your company.',
    owner: 'Owner',
    ownerV: 'Solvea',
    skill: 'Chasing unpaid invoices',
    version: 'Version 1.0',
    trigger: 'Trigger',
    triggerV: 'Every Monday, invoices overdue by 7 days',
    stepsLabel: 'Method',
    steps: [
      'Identify overdue invoices',
      'Draft a reminder tailored to each client',
      'Submit sensitive cases for approval',
      'Send once approved',
      'File replies and track payments',
    ],
    limit: 'Limit',
    limitV: 'No collections without human approval',
    validatedBy: 'Validated by Sophie',
    share: 'Shareable across your Organization',
    signature: 'The agent that grows with you.',
    link: 'Discover Hermès',
  },
} as const

const ease = [0.22, 1, 0.36, 1] as const

export function SectionHermes({ lang = 'fr' }: { lang?: Lang }) {
  const t = T[lang]
  return (
    <section className="relative overflow-hidden bg-[#1C1A17] py-24 text-[#F3EFE6] sm:py-32">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#D10E63]/30 to-transparent" />

      <div className="editorial-shell relative max-w-3xl text-center">
        <div className="flex justify-center">
          <Kicker dark>{t.eyebrow}</Kicker>
        </div>
        <h2 className="mx-auto mt-5 max-w-2xl text-balance font-sf text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.06] tracking-[-0.03em]">
          {t.title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-[17px] leading-relaxed text-white/60">{t.sub}</p>

        {/* The skill card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease }}
          className="mx-auto mt-12 max-w-xl rounded-[24px] border border-white/12 bg-white/[0.04] p-6 text-left sm:p-8"
        >
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-white/50">
              {t.owner} · {t.ownerV}
            </span>
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#9AE6B4]">
              <GitBranch className="h-3 w-3" /> {t.version}
            </span>
          </div>

          <h3 className="mt-4 font-sf text-xl font-semibold tracking-[-0.02em] text-[#F3EFE6]">{t.skill}</h3>

          <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#E8A0BF]">{t.trigger}</p>
            <p className="mt-1 text-[13.5px] leading-relaxed text-[#EFE9DE]">{t.triggerV}</p>
          </div>

          <p className="mt-4 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-white/40">{t.stepsLabel}</p>
          <ol className="mt-2 space-y-1.5">
            {t.steps.map((step, i) => (
              <li key={step} className="flex items-start gap-2.5 text-[13.5px] leading-snug text-[#EFE9DE]">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#D10E63]/20 font-mono text-[9px] font-bold text-[#F3C6DB]">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>

          <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-[#D10E63]/25 bg-[#D10E63]/[0.08] p-3.5">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#F3C6DB]" />
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#F3C6DB]">{t.limit}</p>
              <p className="mt-0.5 text-[13.5px] leading-snug text-[#F5DCE7]">{t.limitV}</p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/10 pt-4 text-[12.5px] text-white/55">
            <span className="inline-flex items-center gap-1.5">
              <UserCheck className="h-3.5 w-3.5 text-[#9AE6B4]" /> {t.validatedBy}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-[#9AE6B4]" /> {t.share}
            </span>
          </div>
        </motion.div>

        <p className="mt-10 font-sf text-lg font-medium italic tracking-[-0.01em] text-white/70">{t.signature}</p>
        <Link
          href="/agent-hermes"
          className="mt-4 inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#F2BCD3] underline decoration-white/20 underline-offset-4 transition-colors hover:text-white hover:decoration-[#D10E63]"
        >
          {t.link}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}
