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
    <section className="relative w-full bg-[#F3EFE6] px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#DcD4C4] bg-[#FBF9F3] px-3.5 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4F5BD5]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#5C554A]">
              {lang === 'fr' ? 'Agent vs collaborateur' : 'Agent vs collaborator'}
            </span>
          </div>
          <motion.h2
            className="font-sf mb-4 text-3xl font-bold leading-tight text-[#1C1A17] sm:text-4xl lg:text-[2.75rem]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t.title}
          </motion.h2>

          <motion.p
            className="text-lg leading-relaxed text-[#4E483F] sm:text-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t.intro}
          </motion.p>
        </div>

        <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.cards.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.div
                key={i}
                className={`group relative overflow-hidden rounded-2xl border border-[#DcD4C4] bg-[#FBF9F3] p-6 transition-all hover:-translate-y-1 hover:border-[#4F5BD5]/40 hover:shadow-[0_12px_40px_-12px_rgba(28,26,23,0.25)] ${
                  i === 6 ? 'sm:col-span-2 lg:col-span-1' : ''
                }`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <span className="absolute right-5 top-5 text-xs font-bold tabular-nums text-[#C9C1B4]">
                  0{i + 1}
                </span>
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#4F5BD5]/10 text-[#4F5BD5] transition-colors group-hover:bg-[#4F5BD5]/20">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-[#1C1A17]">{card.title}</h3>
                <p className="text-sm leading-relaxed text-[#4E483F]">{card.description}</p>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          className="mx-auto max-w-3xl rounded-2xl bg-[#1A1613] px-8 py-8 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xl font-semibold leading-snug text-[#F7F4EE] sm:text-2xl">
            {t.conclusion}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
