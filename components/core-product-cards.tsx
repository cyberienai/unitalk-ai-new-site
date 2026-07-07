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
      { icon: User, title: 'Une identité', description: 'Nom, voix, email, téléphone, URL publique, calendrier, contacts.' },
      { icon: Brain, title: 'Une intelligence', description: 'Modèles IA texte, code, image, audio, vidéo, multimodal ou local.' },
      { icon: Database, title: 'Une mémoire', description: "Contexte personnel, mémoire d'entreprise, méthodes, historique utile." },
      { icon: Zap, title: 'Des compétences', description: 'Profils de travail, skills, automatisations, savoir-faire métier.' },
      { icon: Wrench, title: 'Des outils', description: 'Email, calendrier, fichiers, CRM, CMS, API, navigateur, terminal.' },
      { icon: Cpu, title: 'Des ressources', description: "CPU, RAM, stockage, environnement d'exécution, tâches planifiées." },
      { icon: FileText, title: 'Des instructions de travail', description: 'Rôle, méthode, limites, validation, collaboration avec humains et agents.' },
      { icon: CalendarClock, title: 'La planification de tâches', description: 'Missions récurrentes, rappels, échéances et actions déclenchées automatiquement.' },
      { icon: MessagesSquare, title: 'Un accès partout', description: 'Apps de messagerie, terminal, logiciel Desktop et interface Web collaborative.' },
    ],
  },
  en: {
    eyebrow: 'Agent vs collaborator',
    title: 'What transforms an AI agent into a ',
    titleAccent: 'real collaborator.',
    subtitle:
      'An AI agent alone can answer, reason or execute a task. A Unitalk AI Collaborator goes further: it brings together everything that makes a real teammate.',
    cards: [
      { icon: User, title: 'An identity', description: 'Name, voice, email, phone, public URL, calendar, contacts.' },
      { icon: Brain, title: 'An intelligence', description: 'Text, code, image, audio, video, multimodal or local AI models.' },
      { icon: Database, title: 'A memory', description: 'Personal context, company memory, methods, useful history.' },
      { icon: Zap, title: 'Skills', description: 'Work profiles, skills, automations, industry expertise.' },
      { icon: Wrench, title: 'Tools', description: 'Email, calendar, files, CRM, CMS, API, browser, terminal.' },
      { icon: Cpu, title: 'Resources', description: 'CPU, RAM, storage, runtime environment, scheduled tasks.' },
      { icon: FileText, title: 'Work instructions', description: 'Role, method, limits, validation, collaboration with humans and agents.' },
      { icon: CalendarClock, title: 'Task scheduling', description: 'Recurring missions, reminders, deadlines and automatically triggered actions.' },
      { icon: MessagesSquare, title: 'Access everywhere', description: 'Messaging apps, terminal, Desktop software and collaborative web interface.' },
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

        {/* Grid — same graphic as the solo "capabilities" section */}
        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[#DcD4C4] bg-[#DcD4C4] sm:grid-cols-2 lg:grid-cols-3">
          {t.cards.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, ease, delay: (i % 3) * 0.06 }}
                className="group flex flex-col bg-[#FBF9F3] p-6 transition-colors hover:bg-[#F3EFE6] sm:p-8"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1C1A17] text-[#FBF9F3] transition-colors group-hover:bg-[#D10E63]">
                  <Icon className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <h3
                  className="mt-5 font-sf text-lg font-bold leading-snug text-[#1C1A17]"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {card.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#4E483F]">
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
