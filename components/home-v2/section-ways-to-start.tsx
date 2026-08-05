'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Bot, Target, Users } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as const

const T = {
  fr: {
    eyebrow: 'Comment souhaitez-vous commencer ?',
    title: 'Une seule conversation. Trois façons de commencer.',
    subtitle: 'Chaque entreprise est différente. Choisissez simplement votre point de départ.',
    cards: [
      {
        icon: Bot,
        tag: 'Vous souhaitez être accompagné',
        title: 'Commencer avec Alma',
        desc: 'Alma est le premier Collaborateur IA que vous allez rencontrer. Elle découvre votre entreprise, comprend vos objectifs et recrute les bons Collaborateurs IA.',
        listLabel: 'Pendant votre conversation, Alma peut déjà :',
        items: [
          'analyser votre site web',
          'comprendre votre activité',
          'identifier vos produits et services',
          'préparer votre workspace',
          'recommander vos premiers Collaborateurs IA',
        ],
        footer: 'Vous n’avez rien à configurer.',
        cta: 'Parler avec Alma',
        href: '/decouvrir',
      },
      {
        icon: Target,
        tag: 'Vous savez déjà ce que vous voulez accomplir',
        title: 'Explorer les missions',
        desc: 'Choisissez simplement une mission. Alma sélectionnera automatiquement le Collaborateur IA le plus adapté à votre entreprise.',
        listLabel: 'Par exemple :',
        items: [
          'trouver de nouveaux clients',
          'répondre à vos clients',
          'créer du contenu',
          'préparer des devis',
          'et des centaines d’autres',
        ],
        footer: 'Partez du besoin, pas de l’outil.',
        cta: 'Explorer les missions',
        href: '/collaborateurs-ia#missions',
      },
      {
        icon: Users,
        tag: 'Vous recherchez un métier ou une expertise',
        title: 'Découvrir les Collaborateurs IA',
        desc: 'Choisissez le Collaborateur IA qui rejoindra votre organisation. Alma personnalisera ensuite ses expertises, ses connaissances et ses missions.',
        listLabel: 'Par métier :',
        items: [
          'commercial, marketing, support',
          'finance, RH, juridique',
          'développement, produit, direction',
        ],
        footer: 'Un métier, un Collaborateur IA.',
        cta: 'Découvrir les Collaborateurs IA',
        href: '/collaborateurs-ia',
      },
    ],
  },
  en: {
    eyebrow: 'How would you like to start?',
    title: 'One conversation. Three ways to start.',
    subtitle: 'Every company is different. Simply choose your starting point.',
    cards: [
      {
        icon: Bot,
        tag: 'You’d like to be guided',
        title: 'Start with Alma',
        desc: 'Alma is the first AI Collaborator you will meet. She learns about your company, understands your goals, and hires the right AI Collaborators.',
        listLabel: 'During your conversation, Alma can already:',
        items: [
          'analyze your website',
          'understand your business',
          'identify your products and services',
          'prepare your workspace',
          'recommend your first AI Collaborators',
        ],
        footer: 'There is nothing to configure.',
        cta: 'Talk to Alma',
        href: '/decouvrir',
      },
      {
        icon: Target,
        tag: 'You already know what you want to achieve',
        title: 'Explore the missions',
        desc: 'Simply pick a mission. Alma will automatically select the AI Collaborator best suited to your company.',
        listLabel: 'For example:',
        items: [
          'find new customers',
          'answer your customers',
          'create content',
          'prepare quotes',
          'and hundreds more',
        ],
        footer: 'Start from the need, not the tool.',
        cta: 'Explore the missions',
        href: '/collaborateurs-ia#missions',
      },
      {
        icon: Users,
        tag: 'You’re looking for a role or an expertise',
        title: 'Discover the AI Collaborators',
        desc: 'Choose the AI Collaborator that will join your organization. Alma will then personalize its expertise, knowledge, and missions.',
        listLabel: 'By role:',
        items: [
          'sales, marketing, support',
          'finance, HR, legal',
          'development, product, leadership',
        ],
        footer: 'One role, one AI Collaborator.',
        cta: 'Discover the AI Collaborators',
        href: '/collaborateurs-ia',
      },
    ],
  },
} as const

export function SectionWaysToStart({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = T[lang]

  return (
    <section id="commencer" className="scroll-mt-20 border-t border-[#E9E2D4] bg-[#F3EFE6] py-24 sm:py-32">
      <div className="editorial-shell">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D10E63]">{t.eyebrow}</p>
          <h2 className="text-balance font-sf text-3xl font-bold leading-[1.05] tracking-[-0.035em] text-[#1C1A17] sm:text-4xl lg:text-[2.75rem]">
            {t.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-[#5F594F]">{t.subtitle}</p>
        </motion.header>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {t.cards.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease, delay: i * 0.1 }}
                className="group flex flex-col rounded-[1.75rem] border border-[#E4DCCF] bg-[#FBF9F3] p-7 transition-colors hover:border-[#D10E63]/40"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#D10E63] text-[#FBF9F3]">
                  <Icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
                </span>
                <p className="mt-5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A8175]">{card.tag}</p>
                <h3 className="mt-2 font-sf text-xl font-bold tracking-[-0.02em] text-[#1C1A17]">{card.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-[#5F594F]">{card.desc}</p>

                <p className="mt-5 text-[12px] font-semibold text-[#3F3A33]">{card.listLabel}</p>
                <ul className="mt-2 flex flex-col gap-1.5">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[13px] leading-snug text-[#5F594F]">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D10E63]/60" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>

                <p className="mt-4 text-[12px] italic leading-snug text-[#8A8175]">{card.footer}</p>

                <Link
                  href={card.href}
                  className="mt-6 inline-flex items-center gap-1.5 self-start text-sm font-bold text-[#D10E63] underline-offset-4 transition-transform hover:translate-x-0.5"
                >
                  {card.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
