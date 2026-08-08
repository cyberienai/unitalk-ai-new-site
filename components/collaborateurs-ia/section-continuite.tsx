'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/language-context'
import { SpecCard, StatusPill, Conclusion, type SpecRow } from './lucas-card'

const COPY = {
  fr: {
    kicker: 'Identité · Mémoire · Ressources',
    title: 'Le même Collaborateur IA, d’une mission à l’autre.',
    lead: 'Lucas conserve son identité, sa mémoire, ses coordonnées et son rattachement. Ses responsabilités et ses moyens d’action évoluent avec les besoins de Solvea.',
    identityTitle: 'Une identité professionnelle',
    identity: [
      'Nom, visage et voix choisis par l’entreprise',
      'Nature IA toujours explicite',
      'Fonction et rattachement',
      'Responsable humaine : Sophie',
      'Email, téléphone et agenda',
    ],
    resEyebrow: 'Ses ressources',
    resTitle: 'Son propre environnement de travail',
    resRows: [
      { label: 'Environnement', status: 'Dédié', tone: 'active' },
      { label: 'Fichiers', status: 'Disponibles', tone: 'active' },
      { label: 'Navigateur', status: 'Autorisé', tone: 'active' },
      { label: 'Tâches planifiées', status: 'Actives', tone: 'active' },
      { label: 'Secrets', status: 'Protégés', tone: 'active' },
      { label: 'Socle agentique', value: 'Hermes open source' },
    ] as SpecRow[],
    sharedEyebrow: 'Contexte partagé de Solvea',
    sharedRows: [
      { label: 'Produits · Tarifs', status: 'Partagés', tone: 'neutral' },
      { label: 'Clients · Procédures', status: 'Partagés', tone: 'neutral' },
      { label: 'Documents · Décisions', status: 'Partagés', tone: 'neutral' },
    ] as SpecRow[],
    ownEyebrow: 'Expérience propre de Lucas',
    ownRows: [
      { label: 'Dossiers suivis', status: 'Conservés', tone: 'added' },
      { label: 'Préférences confirmées', status: 'Conservées', tone: 'added' },
      { label: 'Méthodes éprouvées', status: 'Conservées', tone: 'added' },
    ] as SpecRow[],
    proposalEyebrow: 'Lucas propose de mémoriser',
    proposal: 'Claire préfère être rappelée avant 10 h.',
    actions: ['Conserver', 'Corriger', 'Ne pas mémoriser'],
    conclusion: 'Il partage ce que l’entreprise sait. Il conserve ce que son travail lui apprend.',
  },
  en: {
    kicker: 'Identity · Memory · Resources',
    title: 'The same AI Collaborator, from one mission to the next.',
    lead: 'Lucas keeps his identity, memory, contact details and reporting line. His responsibilities and means of action evolve with Solvea’s needs.',
    identityTitle: 'A professional identity',
    identity: [
      'Name, face and voice chosen by the company',
      'AI nature always explicit',
      'Role and reporting line',
      'Human lead: Sophie',
      'Email, phone and calendar',
    ],
    resEyebrow: 'His resources',
    resTitle: 'His own working environment',
    resRows: [
      { label: 'Environment', status: 'Dedicated', tone: 'active' },
      { label: 'Files', status: 'Available', tone: 'active' },
      { label: 'Browser', status: 'Allowed', tone: 'active' },
      { label: 'Scheduled tasks', status: 'Active', tone: 'active' },
      { label: 'Secrets', status: 'Protected', tone: 'active' },
      { label: 'Agentic core', value: 'Hermes open source' },
    ] as SpecRow[],
    sharedEyebrow: 'Solvea’s shared context',
    sharedRows: [
      { label: 'Products · Pricing', status: 'Shared', tone: 'neutral' },
      { label: 'Customers · Procedures', status: 'Shared', tone: 'neutral' },
      { label: 'Documents · Decisions', status: 'Shared', tone: 'neutral' },
    ] as SpecRow[],
    ownEyebrow: 'Lucas’s own experience',
    ownRows: [
      { label: 'Handled cases', status: 'Kept', tone: 'added' },
      { label: 'Confirmed preferences', status: 'Kept', tone: 'added' },
      { label: 'Proven methods', status: 'Kept', tone: 'added' },
    ] as SpecRow[],
    proposalEyebrow: 'Lucas suggests remembering',
    proposal: 'Claire prefers to be called back before 10 a.m.',
    actions: ['Keep', 'Correct', 'Don’t remember'],
    conclusion: 'He shares what the company knows. He keeps what his work teaches him.',
  },
} as const

export function SectionContinuite() {
  const { lang } = useLanguage()
  const t = COPY[lang]

  return (
    <section className="border-b border-white/5 bg-[#161412] px-6 py-16 text-[#F4F1EA] sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="inline-flex items-center rounded-full border border-[#E8A0BF]/30 bg-[#E8A0BF]/10 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#F2BCD3]">
            {t.kicker}
          </p>
          <h2 className="mt-5 text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.02em] sm:text-4xl md:text-5xl">
            {t.title}
          </h2>
          <p className="mt-5 text-pretty text-[15px] leading-relaxed text-[#B8B0A4] sm:text-base">{t.lead}</p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Identity + resources */}
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl border border-white/10 bg-[#211E1B] p-5">
              <p className="text-[15px] font-semibold">{t.identityTitle}</p>
              <ul className="mt-3 flex flex-col gap-2.5">
                {t.identity.map((line) => (
                  <li key={line} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-[#C7C0B5]">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D10E63]" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
            <SpecCard eyebrow={t.resEyebrow} title={t.resTitle} rows={t.resRows} dark />
          </div>

          {/* Two memories + proposal */}
          <div className="flex flex-col gap-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <SpecCard eyebrow={t.sharedEyebrow} rows={t.sharedRows} dark />
              <SpecCard eyebrow={t.ownEyebrow} rows={t.ownRows} dark />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45 }}
              className="rounded-2xl border border-[#D10E63]/25 bg-[#D10E63]/[0.08] p-5"
            >
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#F2BCD3]">{t.proposalEyebrow}</p>
              <p className="mt-2 text-[15px] font-medium text-[#F4F1EA]">{t.proposal}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {t.actions.map((a, i) => (
                  <span
                    key={a}
                    className={`rounded-full px-3.5 py-1.5 text-[13px] font-semibold ${
                      i === 0 ? 'bg-[#22A06B] text-[#08130D]' : 'border border-white/15 text-[#C7C0B5]'
                    }`}
                  >
                    {a}
                  </span>
                ))}
              </div>
            </motion.div>

            <div className="rounded-2xl border border-white/10 bg-[#211E1B] p-5">
              <Conclusion dark>{t.conclusion}</Conclusion>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
