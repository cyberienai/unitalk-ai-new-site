'use client'

import { motion } from 'framer-motion'
import { User, Brain, Database, Zap, Wrench, MessagesSquare, ChevronRight } from 'lucide-react'
import { SectionHeader } from './section-header'

const ease = [0.22, 1, 0.36, 1] as const

const T = {
  fr: {
    eyebrow: 'Agent vs collaborateur',
    title: 'Ce qui transforme un agent IA en ',
    titleAccent: 'vrai collaborateur.',
    subtitle:
      'Un agent exécute des tâches. Un Collaborateur IA a une identité, une mémoire, des compétences. Il travaille avec votre équipe, pas à côté. Propulsé par Hermes, l\'agent autonome open source n°1.',
    cta: 'Activer mon Collaborateur IA',
    cards: [
      { icon: User, title: 'Identité', description: 'Nom, voix, téléphone, email, calendrier. Un vrai profil.' },
      { icon: Brain, title: 'Intelligence', description: 'Tous les modèles IA. Texte, images, code, audio.' },
      { icon: Database, title: 'Mémoire', description: 'Contextes, méthodes, préférences. Apprend chaque jour.' },
      { icon: Zap, title: 'Compétences', description: 'Crée les compétences nécessaires pour chaque mission.' },
      { icon: Wrench, title: 'Outils', description: 'Se connecte à 3 000+ apps. Exécute du code, navigue sur internet.' },
      { icon: MessagesSquare, title: 'Partout', description: 'Slack, Teams, WhatsApp, Telegram, Discord, CLI, desktop, web.' },
    ],
  },
  en: {
    eyebrow: 'Agent vs collaborator',
    title: 'What transforms an AI agent into a ',
    titleAccent: 'real collaborator.',
    subtitle:
      'An agent executes tasks. An AI Collaborator has an identity, a memory, skills. It works with your team, not beside it. Powered by Hermes, the #1 open source autonomous agent.',
    cta: 'Activate my AI Collaborator',
    cards: [
      { icon: User, title: 'Identity', description: 'Name, voice, phone, email, calendar. A real profile.' },
      { icon: Brain, title: 'Intelligence', description: 'All AI models. Text, images, code, audio.' },
      { icon: Database, title: 'Memory', description: 'Contexts, methods, preferences. Learns every day.' },
      { icon: Zap, title: 'Skills', description: 'Creates the skills needed for each mission.' },
      { icon: Wrench, title: 'Tools', description: 'Connects to 3,000+ apps. Runs code, browses the web.' },
      { icon: MessagesSquare, title: 'Everywhere', description: 'Slack, Teams, WhatsApp, Telegram, Discord, CLI, desktop, web.' },
    ],
  },
}

export function CoreProductCards({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = T[lang]

  return (
    <section className="relative w-full overflow-hidden border-t border-[#DcD4C4] bg-[#F3EFE6] py-20 sm:py-28">
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow={t.eyebrow}
          title={t.title}
          titleAccent={t.titleAccent}
          subtitle={t.subtitle}
        />

        {/* Grid — improved cards with better interactions */}
        <div className="mt-16 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {t.cards.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 24, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, ease, delay: i * 0.08 }}
                className="group flex flex-col rounded-2xl border-2 border-[#1C1A17]/8 bg-[#FBF9F3] p-7 transition-all hover:border-[#D10E63]/20 hover:shadow-lg hover:shadow-[#D10E63]/8 hover:scale-105 sm:p-8"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1C1A17] text-[#FBF9F3] transition-all group-hover:bg-[#D10E63] group-hover:scale-110">
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </span>
                <h3
                  className="mt-6 font-sf text-lg font-bold leading-snug text-[#1C1A17]"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {card.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[#4E483F]">
                  {card.description}
                </p>
              </motion.article>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-14 flex justify-center">
          <a
            href="/solo"
            className="inline-flex items-center gap-2 rounded-full bg-[#D10E63] px-8 py-4 text-sm font-semibold text-[#FBF9F3] transition-all hover:bg-[#B00B52] sm:text-base"
          >
            {t.cta}
            <ChevronRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
