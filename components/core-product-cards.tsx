'use client'

import { motion } from 'framer-motion'
import { User, Brain, Database, Zap, Wrench, Cpu, FileText, CalendarClock, MessagesSquare } from 'lucide-react'
import { SectionHeader } from './section-header'

const ease = [0.22, 1, 0.36, 1] as const

const T = {
  fr: {
    eyebrow: 'Agent vs collaborateur',
    title: 'Ce qui transforme un agent IA en ',
    titleAccent: 'vrai collaborateur.',
    subtitle:
      'Un agent IA seul peut répondre, raisonner ou exécuter une tâche. Un Collaborateur IA va plus loin : il réunit tout ce qui fait un vrai coéquipier.',
    cards: [
      { icon: User, title: 'Une identité', description: 'Nom, voix, email, calendrier. Un vrai profil avec sa présence et son historique.' },
      { icon: Brain, title: 'Une intelligence', description: 'Accès à tous les modèles IA. Texte, images, code, audio - Toujours les dernières versions.' },
      { icon: Database, title: 'Une mémoire', description: 'Se souvient de vos contextes, méthodes et préférences. Apprend au fil du temps.' },
      { icon: Zap, title: 'Des compétences', description: 'Profils de travail adaptés. Chacun maîtrise son domaine et ses automatisations.' },
      { icon: Wrench, title: 'Des outils', description: 'Se connecte à tout : email, CRM, fichiers, calendrier. Fonctionne où vous êtes.' },
      { icon: Cpu, title: 'Des ressources', description: 'Puissance de calcul dédiée, stockage sécurisé, tâches qui tournent 24/7.' },
      { icon: FileText, title: 'Des instructions claires', description: 'Connaît son rôle, ses limites, ses méthodes. Valide avec vous avant d\'agir.' },
      { icon: CalendarClock, title: 'La planification', description: 'Gère les tâches récurrentes, rappels et actions. Tout s\'exécute à temps.' },
      { icon: MessagesSquare, title: 'Omniprésent', description: 'Slack, Teams, WhatsApp, Telegram, Discord, terminal, desktop, web. Partout où vous êtes.' },
    ],
  },
  en: {
    eyebrow: 'Agent vs collaborator',
    title: 'What transforms an AI agent into a ',
    titleAccent: 'real collaborator.',
    subtitle:
      'An AI agent alone can answer, reason or execute a task. A Unitalk AI Collaborator goes further: it brings together everything that makes a real teammate.',
    cards: [
      { icon: User, title: 'An identity', description: 'Name, voice, email, calendar. A real profile with presence and history.' },
      { icon: Brain, title: 'An intelligence', description: 'Access to all AI models. Text, images, code, audio - Always the latest versions.' },
      { icon: Database, title: 'A memory', description: 'Remembers your contexts, methods and preferences. Learns over time.' },
      { icon: Zap, title: 'Skills', description: 'Customized work profiles. Each one masters its domain and automations.' },
      { icon: Wrench, title: 'Tools', description: 'Connects to everything: email, CRM, files, calendar. Works where you are.' },
      { icon: Cpu, title: 'Resources', description: 'Dedicated computing power, secure storage, tasks running 24/7.' },
      { icon: FileText, title: 'Clear instructions', description: 'Knows its role, limits and methods. Validates with you before acting.' },
      { icon: CalendarClock, title: 'Task scheduling', description: 'Manages recurring tasks, reminders and actions. Everything executes on time.' },
      { icon: MessagesSquare, title: 'Omnipresent', description: 'Slack, Teams, WhatsApp, Telegram, Discord, terminal, desktop, web. Everywhere you are.' },
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
      </div>
    </section>
  )
}
