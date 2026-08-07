'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { RegistreRow } from '@/components/home/signs'

/**
 * HERMÈS REVEAL — the engine behind the Collaborators, shown as a COMPETENCE
 * REGISTRY entry, not a workflow card. The skill is treated as an asset
 * inscribed in a professional register: identifier, owner, version, source,
 * status, scope — then trigger, method and the human limit. No generic icons,
 * no rose circles, no shield: the documentary frame carries the meaning.
 */

const T = {
  fr: {
    eyebrow: 'Propulsé par Hermes',
    title: 'Une mission accomplie. Une compétence qui reste.',
    sub: 'Hermes est le moteur des Collaborateurs IA. Chaque mission réussie devient une compétence versionnée, gouvernée par votre entreprise.',
    registreLabel: 'Compétence Hermes',
    skillId: 'SKL-FIN-014',
    skill: 'Suivre une facture impayée',
    owner: 'Propriétaire',
    ownerV: 'Solvea',
    version: 'Version',
    versionV: '1.0',
    source: 'Source',
    sourceV: 'Méthode transmise par Sophie',
    statut: 'Statut',
    statutV: 'Testée · Validée',
    scope: 'Périmètre',
    scopeV: 'Équipe Finance',
    trigger: 'Déclencheur',
    triggerV: 'Facture échue depuis sept jours',
    methodLabel: 'Méthode',
    steps: [
      'Vérifier les litiges ouverts',
      'Retrouver le dernier échange',
      'Préparer la relance',
      'Classer la réponse',
      'Planifier la suite',
    ],
    limit: 'Limite',
    limitV: 'Transmission au contentieux bloquée sans validation humaine.',
    share: 'Privée par défaut · Partage autorisé avec l’équipe Finance',
    signature: 'Hermes — The agent that grows with you.',
    link: 'Découvrir Hermes',
  },
  en: {
    eyebrow: 'Powered by Hermes',
    title: 'A mission done. A skill that stays.',
    sub: 'Hermes is the engine behind AI Collaborators. Every successful mission becomes a versioned skill, governed by your company.',
    registreLabel: 'Hermes competence',
    skillId: 'SKL-FIN-014',
    skill: 'Chasing an unpaid invoice',
    owner: 'Owner',
    ownerV: 'Solvea',
    version: 'Version',
    versionV: '1.0',
    source: 'Source',
    sourceV: 'Method taught by Sophie',
    statut: 'Status',
    statutV: 'Tested · Validated',
    scope: 'Scope',
    scopeV: 'Finance team',
    trigger: 'Trigger',
    triggerV: 'Invoice overdue by seven days',
    methodLabel: 'Method',
    steps: [
      'Check for open disputes',
      'Retrieve the last exchange',
      'Draft the reminder',
      'File the reply',
      'Schedule the follow-up',
    ],
    limit: 'Limit',
    limitV: 'Escalation to collections is blocked without human validation.',
    share: 'Private by default · Sharing allowed with the Finance team',
    signature: 'Hermes — The agent that grows with you.',
    link: 'Discover Hermes',
  },
} as const

const ease = [0.22, 1, 0.36, 1] as const

export function SectionHermes({ lang = 'fr' }: { lang?: Lang }) {
  const t = T[lang]
  return (
    <section className="relative overflow-hidden bg-[#1C1A17] py-16 text-[#F3EFE6] sm:py-24">
      <div className="editorial-shell relative max-w-3xl text-center">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#E8A0BF]">{t.eyebrow}</p>
        <h2 className="mx-auto mt-4 max-w-2xl text-balance font-sf text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.06] tracking-[-0.03em]">
          {t.title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-[17px] leading-relaxed text-white/60">{t.sub}</p>

        {/* The competence registry entry */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease }}
          className="mx-auto mt-12 max-w-xl rounded-lg border border-white/12 bg-white/[0.03] text-left"
        >
          {/* Registry header */}
          <div className="flex items-center justify-between gap-3 border-b border-white/10 px-6 py-3.5">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">{t.registreLabel}</span>
            <span className="font-mono text-[11px] font-semibold tracking-[0.14em] text-[#9AE6B4]">{t.skillId}</span>
          </div>

          <div className="px-6 py-5 sm:px-7">
            <h3 className="font-sf text-[1.35rem] font-semibold tracking-[-0.02em] text-[#F3EFE6]">{t.skill}</h3>

            {/* Registry fields */}
            <div className="mt-4 divide-y divide-white/[0.07] border-y border-white/[0.07]">
              <RegistreRow label={t.owner} value={t.ownerV} />
              <RegistreRow label={t.version} value={t.versionV} valueClassName="font-mono" />
              <RegistreRow label={t.source} value={t.sourceV} />
              <RegistreRow
                label={t.statut}
                value={
                  <span className="inline-flex items-center gap-1.5 text-[#9AE6B4]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#2E9E5B]" />
                    {t.statutV}
                  </span>
                }
              />
              <RegistreRow label={t.scope} value={t.scopeV} />
            </div>

            {/* Trigger */}
            <div className="mt-5">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#E8A0BF]">{t.trigger}</p>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#EFE9DE]">{t.triggerV}</p>
            </div>

            {/* Method */}
            <div className="mt-5">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">{t.methodLabel}</p>
              <ol className="mt-2 space-y-1.5">
                {t.steps.map((step, i) => (
                  <li key={step} className="flex items-baseline gap-3 text-[13.5px] leading-snug text-[#EFE9DE]">
                    <span className="w-5 shrink-0 font-mono text-[11px] font-semibold text-white/35">{`0${i + 1}`}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            {/* Limit — the human boundary, stated plainly */}
            <div className="mt-5 border-l-2 border-[#D10E63] pl-4">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#F3C6DB]">{t.limit}</p>
              <p className="mt-1 text-[13.5px] leading-snug text-[#F5DCE7]">{t.limitV}</p>
            </div>

            {/* Governance footer */}
            <p className="mt-5 border-t border-white/10 pt-4 font-mono text-[11px] leading-relaxed tracking-[0.02em] text-white/45">
              {t.share}
            </p>
          </div>
        </motion.div>

        <p className="mt-8 font-sf text-[15px] font-medium italic tracking-[-0.01em] text-white/45">{t.signature}</p>
        <Link
          href="/agent-hermes"
          className="mt-3 inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#F2BCD3] underline decoration-white/20 underline-offset-4 transition-colors hover:text-white hover:decoration-[#D10E63]"
        >
          {t.link}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}
