'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Globe, Target, UserRound } from 'lucide-react'
import { Kicker } from '@/components/home/section-kicker'

const ease = [0.22, 1, 0.36, 1] as const

const T = {
  fr: {
    eyebrow: 'Par où commencer',
    title: 'Trois façons de commencer',
    subtitle: 'Chaque entreprise est différente. Choisissez simplement votre point de départ.',
    cards: [
      {
        icon: Globe,
        label: 'Avec votre entreprise',
        desc: 'Vous avez déjà un site web. Alma découvre votre activité et prépare votre premier Collaborateur IA.',
        cta: 'Découvrir mon entreprise',
        href: '/decouvrir',
      },
      {
        icon: Target,
        label: 'Avec une mission',
        desc: 'Vous savez déjà ce que vous souhaitez déléguer. Choisissez une mission prête à l’emploi ; Alma recrute le Collaborateur IA le plus adapté.',
        cta: 'Explorer les missions',
        href: '/missions',
      },
      {
        icon: UserRound,
        label: 'Avec un Collaborateur IA',
        desc: 'Vous recherchez un métier ou une expertise. Choisissez un Collaborateur IA et Alma l’adapte à votre entreprise.',
        roles: ['Commercial', 'Assistante', 'Support', 'Marketing', 'Finance', 'RH', 'Direction'],
        cta: 'Explorer les Collaborateurs IA',
        href: '/collaborateurs-ia',
      },
    ],
  },
  en: {
    eyebrow: 'Where to start',
    title: 'Three ways to start',
    subtitle: 'Every company is different. Simply choose your starting point.',
    cards: [
      {
        icon: Globe,
        label: 'With your company',
        desc: 'You already have a website. Alma gets to know your business and prepares your first AI Collaborator.',
        cta: 'Discover my company',
        href: '/decouvrir',
      },
      {
        icon: Target,
        label: 'With a mission',
        desc: 'You already know what you want to delegate. Pick a ready-to-use mission; Alma recruits the best-suited AI Collaborator.',
        cta: 'Explore missions',
        href: '/missions',
      },
      {
        icon: UserRound,
        label: 'With an AI Collaborator',
        desc: 'You are looking for a role or an expertise. Choose an AI Collaborator and Alma adapts it to your company.',
        roles: ['Sales', 'Assistant', 'Support', 'Marketing', 'Finance', 'HR', 'Leadership'],
        cta: 'Explore AI Collaborators',
        href: '/collaborateurs-ia',
      },
    ],
  },
} as const

export function SectionThreeWays({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = T[lang]
  const reduceMotion = useReducedMotion()

  return (
    <section className="border-t border-[#E9E2D4] bg-[#FBF9F3] py-24 sm:py-32">
      <div className="editorial-shell">
        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="mb-4 flex justify-center">
            <Kicker>{t.eyebrow}</Kicker>
          </div>
          <h2 className="text-balance font-sf text-3xl font-bold leading-[1.05] tracking-[-0.035em] text-[#1C1A17] sm:text-4xl lg:text-[2.75rem]">
            {t.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-[#5F594F]">{t.subtitle}</p>
        </motion.header>

        <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:mt-14 md:grid-cols-3">
          {t.cards.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.label}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, ease, delay: i * 0.1 }}
              >
                <Link
                  href={card.href}
                  className="group flex h-full flex-col rounded-[1.5rem] border border-[#E4DCCF] bg-[#F3EFE6] p-7 transition-all duration-200 hover:-translate-y-1 hover:border-[#D10E63]/45 hover:shadow-[0_24px_60px_-32px_rgba(28,26,23,0.55)]"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D10E63]/[0.1] text-[#D10E63]">
                    <Icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-sf text-lg font-bold tracking-[-0.02em] text-[#1C1A17]">{card.label}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-[#5A544A]">{card.desc}</p>
                  {'roles' in card && card.roles ? (
                    <ul className="mt-4 flex flex-1 flex-wrap content-start gap-1.5">
                      {card.roles.map((role) => (
                        <li
                          key={role}
                          className="rounded-full border border-[#E4DCCF] bg-[#FBF9F3] px-2.5 py-1 text-[11px] font-semibold text-[#5A544A]"
                        >
                          {role}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="flex-1" aria-hidden="true" />
                  )}
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-[#D10E63]">
                    {card.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
