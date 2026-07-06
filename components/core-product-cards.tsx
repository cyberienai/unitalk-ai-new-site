'use client'

import { motion } from 'framer-motion'
import {
  User,
  Brain,
  Database,
  Zap,
  Wrench,
  Cpu,
  FileText,
} from 'lucide-react'

const T = {
  fr: {
    title: 'Ce qui transforme un agent IA en vrai collaborateur.',
    intro:
      'Un agent IA seul peut répondre, raisonner ou exécuter une tâche. Un Collaborateur IA Unitalk va plus loin.',
    cards: [
      {
        icon: User,
        title: 'Une identité',
        description: 'Nom, voix, email, téléphone, URL publique, calendrier, contacts.',
      },
      {
        icon: Brain,
        title: 'Une intelligence',
        description: 'Modèles IA texte, code, image, audio, vidéo, multimodal ou local.',
      },
      {
        icon: Database,
        title: "Une mémoire",
        description: "Contexte personnel, mémoire d'entreprise, méthodes, historique utile.",
      },
      {
        icon: Zap,
        title: "Des compétences",
        description: "Profils de travail, skills, automatisations, savoir-faire métier.",
      },
      {
        icon: Wrench,
        title: "Des outils",
        description: "Email, calendrier, fichiers, CRM, CMS, API, navigateur, terminal.",
      },
      {
        icon: Cpu,
        title: "Des ressources",
        description: "CPU, RAM, stockage, environnement d'exécution, tâches planifiées.",
      },
      {
        icon: FileText,
        title: "Des instructions de travail",
        description: "Rôle, méthode, limites, validation, collaboration avec humains et agents.",
      },
    ],
    conclusion: "C'est ce qui transforme un agent IA en vrai collaborateur.",
  },
  en: {
    title: "What transforms an AI agent into a real collaborator.",
    intro:
      "An AI agent alone can answer, reason or execute a task. A Unitalk AI Collaborator goes further.",
    cards: [
      {
        icon: User,
        title: "An identity",
        description: "Name, voice, email, phone, public URL, calendar, contacts.",
      },
      {
        icon: Brain,
        title: "An intelligence",
        description: "Text, code, image, audio, video, multimodal or local AI models.",
      },
      {
        icon: Database,
        title: "A memory",
        description: "Personal context, company memory, methods, useful history.",
      },
      {
        icon: Zap,
        title: "Skills",
        description: "Work profiles, skills, automations, industry expertise.",
      },
      {
        icon: Wrench,
        title: "Tools",
        description: "Email, calendar, files, CRM, CMS, API, browser, terminal.",
      },
      {
        icon: Cpu,
        title: "Resources",
        description: "CPU, RAM, storage, runtime environment, scheduled tasks.",
      },
      {
        icon: FileText,
        title: "Work instructions",
        description: "Role, method, limits, validation, collaboration with humans and agents.",
      },
    ],
    conclusion: "This is what transforms an AI agent into a real collaborator.",
  },
}

export function CoreProductCards({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = T[lang]

  return (
    <section className="relative w-full bg-[#F3EFE6] px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          className="font-sf mb-4 text-3xl font-bold text-[#1C1A17] text-center sm:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t.title}
        </motion.h2>

        <motion.p
          className="mb-12 text-center text-lg leading-relaxed text-[#4E483F] sm:text-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {t.intro}
        </motion.p>

        <motion.div
          className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t.cards.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.div
                key={i}
                className="group rounded-xl border border-[#DcD4C4] bg-white px-6 py-6 transition-all hover:border-[#D10E63]/40 hover:shadow-md sm:px-5 sm:py-5"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#D10E63]/10 text-[#D10E63] transition-colors group-hover:bg-[#D10E63]/20">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-[#1C1A17] sm:text-base">
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#4E483F]">{card.description}</p>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.p
          className="text-center text-lg font-semibold text-[#1C1A17] sm:text-xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {t.conclusion}
        </motion.p>
      </div>
    </section>
  )
}
