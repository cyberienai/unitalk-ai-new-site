'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Building2, Cpu, LifeBuoy, Server, UserPlus } from 'lucide-react'
import { CtaButton } from '@/components/ui/cta-button'
import { Kicker } from '@/components/home/section-kicker'

const ease = [0.22, 1, 0.36, 1] as const

const T = {
  fr: {
    eyebrow: 'Une offre simple',
    title: 'Vous ne payez pas pour des fonctionnalités.',
    subtitle:
      'Vous payez pour une organisation, des Collaborateurs IA et les ressources nécessaires pour les faire travailler.',
    blocks: [
      {
        icon: Building2,
        price: 'Incluse',
        title: 'Une licence organisation',
        items: [
          'Un assistant IA privé pour chaque collaborateur',
          'Tous les modèles compatibles, dont ChatGPT',
          'Un workspace unique pour toute l’organisation',
        ],
        highlight: false,
      },
      {
        icon: UserPlus,
        price: '49 € / mois',
        priceSuffix: 'par Collaborateur IA',
        title: 'Chaque Collaborateur IA',
        items: [
          'Identité complète : email, téléphone et calendrier',
          'Contexte d’entreprise partagé',
          'Expertises illimitées',
          'Missions illimitées',
          'Outils et automatisations',
        ],
        highlight: true,
      },
    ],
    secondary: [
      { icon: Cpu, title: 'Intelligence', desc: 'Utilisez les crédits Unitalk ou vos propres clés API. Vous gardez le contrôle de vos coûts.' },
      { icon: Server, title: 'Déploiement', desc: 'Cloud, cloud privé, on-premise ou desktop. Votre infrastructure, votre choix.' },
      { icon: LifeBuoy, title: 'Accompagnement', desc: 'Do It Yourself, On Demand ou Fully Managed.' },
    ],
    cta: 'Voir les tarifs',
  },
  en: {
    eyebrow: 'A simple offer',
    title: 'You don’t pay for features.',
    subtitle:
      'You pay for an organization, AI Collaborators, and the resources needed to put them to work.',
    blocks: [
      {
        icon: Building2,
        price: 'Included',
        title: 'An organization license',
        items: [
          'A private AI assistant for every team member',
          'All compatible models, including ChatGPT',
          'A single workspace for the whole organization',
        ],
        highlight: false,
      },
      {
        icon: UserPlus,
        price: '€49 / month',
        priceSuffix: 'per AI Collaborator',
        title: 'Each AI Collaborator',
        items: [
          'Full identity: email, phone and calendar',
          'Shared company context',
          'Unlimited expertise',
          'Unlimited missions',
          'Tools and automations',
        ],
        highlight: true,
      },
    ],
    secondary: [
      { icon: Cpu, title: 'Intelligence', desc: 'Use Unitalk credits or your own API keys. You stay in control of your costs.' },
      { icon: Server, title: 'Deployment', desc: 'Cloud, private cloud, on-premise or desktop. Your infrastructure, your choice.' },
      { icon: LifeBuoy, title: 'Support', desc: 'Do It Yourself, On Demand or Fully Managed.' },
    ],
    cta: 'See pricing',
  },
} as const

export function SectionPricingSimple({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = T[lang]

  return (
    <section id="tarifs" className="scroll-mt-20 border-t border-[#E9E2D4] bg-[#FBF9F3] py-24 sm:py-32">
      <div className="editorial-shell">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease }}
          className="mx-auto max-w-2xl text-center"
        >
            <div className="mb-4 flex justify-center">
              <Kicker>{t.eyebrow}</Kicker>
            </div>
          <h2 className="text-balance font-sf text-3xl font-bold leading-[1.05] tracking-[-0.035em] text-[#1C1A17] sm:text-4xl lg:text-[2.75rem]">
            {t.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-[#5F594F]">{t.subtitle}</p>
        </motion.header>

        <div className="mx-auto mt-14 grid max-w-4xl gap-5 lg:grid-cols-2">
          {t.blocks.map((block, i) => {
            const Icon = block.icon
            return (
              <motion.div
                key={block.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease, delay: i * 0.1 }}
                className={
                  block.highlight
                    ? 'relative overflow-hidden rounded-[1.75rem] border border-[#D10E63]/40 bg-[#D10E63]/[0.05] p-7 shadow-[0_0_60px_-24px_rgba(209,14,99,0.5)]'
                    : 'rounded-[1.75rem] border border-[#E4DCCF] bg-[#F3EFE6] p-7'
                }
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#D10E63] text-[#FBF9F3]">
                  <Icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
                </span>
                <div className="mt-5 flex items-baseline gap-2">
                  <span className="font-sf text-2xl font-bold tracking-[-0.03em] text-[#1C1A17]">{block.price}</span>
                  {'priceSuffix' in block && block.priceSuffix ? (
                    <span className="text-[13px] font-medium text-[#6B6560]">{block.priceSuffix}</span>
                  ) : null}
                </div>
                <h3 className="mt-1 font-sf text-lg font-bold tracking-[-0.02em] text-[#1C1A17]">{block.title}</h3>
                <ul className="mt-4 flex flex-col gap-2">
                  {block.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[13px] leading-snug text-[#3F3A33]">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D10E63]" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>

        <div className="mx-auto mt-5 grid max-w-4xl gap-4 sm:grid-cols-3">
          {t.secondary.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, ease, delay: i * 0.08 }}
                className="rounded-2xl border border-[#E4DCCF] bg-[#F3EFE6] p-5"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E4DCCF] bg-[#FBF9F3] text-[#D10E63]">
                  <Icon className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                </span>
                <p className="mt-3 font-sf text-[15px] font-bold text-[#1C1A17]">{s.title}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-[#5F594F]">{s.desc}</p>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-10 text-center">
          <CtaButton href="/tarifs">
            {t.cta}
            <ArrowRight className="h-4 w-4" />
          </CtaButton>
        </div>
      </div>
    </section>
  )
}
