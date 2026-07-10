'use client'

import { motion } from 'framer-motion'
import { useT } from '@/lib/language-context'
import { ChevronRight, Code2, Brain, Zap, Lock, MessageSquare, Download } from 'lucide-react'

export function AgentHermesContent() {
  const t = useT({
    fr: {
      eyebrow: 'Open Source',
      mainTitle: 'Agent Hermes',
      subtitle: 'Le framework d\'agents IA autonome qui apprend et crée ses propres compétences',
      intro:
        'Hermes Agent est un véritable collaborateur persistant qui s\'exécute en arrière-plan, apprend de vos habitudes et crée ses propres compétences au fil du temps. L\'un des frameworks d\'agents à la croissance la plus rapide, avec plus de 200 000 étoiles sur GitHub.',
      whyTitle: 'Pourquoi est-il considéré comme un "vrai" collaborateur ?',
      features: [
        {
          icon: 'improvement',
          title: 'Boucle d\'auto-amélioration',
          description:
            'Lorsqu\'il résout un problème complexe, il rédige un document de compétence réutilisable. Il n\'a plus besoin de réinventer la roue lors de la tâche suivante.',
        },
        {
          icon: 'memory',
          title: 'Mémoire persistante à long terme',
          description:
            'Il stocke localement l\'historique et le contexte de vos projets. Vous n\'avez pas à tout lui réexpliquer à chaque nouvelle session.',
        },
        {
          icon: 'autonomous',
          title: 'Exécution autonome sans relâche',
          description:
            'Conçu pour tourner sur votre ordinateur ou sur un serveur privé, il peut exécuter des tâches chronométrées ou agir de manière proactive même si vous êtes déconnecté.',
        },
        {
          icon: 'multiplatform',
          title: 'Contrôle multi-plateforme',
          description:
            'Associez-le à Telegram, Discord, Slack ou WhatsApp. Donnez-lui des ordres en langage naturel et il s\'exécute.',
        },
        {
          icon: 'security',
          title: 'Environnement sécurisé',
          description:
            'Plus de 40 outils natifs et exécution du code généré dans des bacs à sable sécurisés (Docker, SSH, Modal).',
        },
      ],
      useCasesTitle: 'Que peut-on faire avec ?',
      useCases: [
        {
          title: 'Gestion administrative',
          description:
            'Lire vos e-mails, rédiger des réponses avec votre style vocal, organiser votre calendrier et vous envoyer un briefing chaque matin sur Telegram.',
        },
        {
          title: 'Automatisation de flux',
          description:
            'Gérer un tableau Kanban, synchroniser des documents sur Notion ou Google Workspace, et exécuter des tâches récurrentes planifiées.',
        },
        {
          title: 'Recherche et développement',
          description:
            'Réaliser des veilles technologiques poussées, coder des scripts entiers et faire de l\'analyse de données en direct.',
        },
      ],
      installTitle: 'Comment l\'installer ?',
      installIntro: 'Deux options s\'offrent à vous :',
      desktopTitle: 'La version Desktop',
      desktopDesc:
        'Idéale pour débuter. L\'application de bureau propose une interface graphique complète pour gérer ses clés API, ses modules de mémoire et son calendrier.',
      terminalTitle: 'La version Terminal',
      terminalDesc: 'Pour les développeurs, l\'installation se fait via une simple ligne de commande.',
      command: 'curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash',
      ctaTitle: 'Prêt à découvrir Hermes Agent ?',
      ctaDescription:
        'Démarrez avec la version Desktop ou installez la version Terminal pour exploiter toute la puissance d\'un agent IA autonome.',
      ctaButton: 'Accéder à Hermes Agent',
    },
    en: {
      eyebrow: 'Open Source',
      mainTitle: 'Hermes Agent',
      subtitle: 'The autonomous AI agent framework that learns and creates its own skills',
      intro:
        'Hermes Agent is a true persistent collaborator that runs in the background, learns from your habits, and creates its own skills over time. One of the fastest-growing agent frameworks with over 200,000 stars on GitHub.',
      whyTitle: 'Why is it considered a "true" collaborator?',
      features: [
        {
          icon: 'improvement',
          title: 'Self-improvement loop',
          description:
            'When it solves a complex problem, it writes a reusable skill document. It no longer needs to reinvent the wheel on the next task.',
        },
        {
          icon: 'memory',
          title: 'Persistent long-term memory',
          description:
            'It stores the history and context of your projects locally. You don\'t have to re-explain everything on every new session.',
        },
        {
          icon: 'autonomous',
          title: 'Tireless autonomous execution',
          description:
            'Designed to run on your computer or a private server, it can execute scheduled tasks or act proactively even when you\'re offline.',
        },
        {
          icon: 'multiplatform',
          title: 'Multi-platform control',
          description:
            'Connect it to Telegram, Discord, Slack, or WhatsApp. Give it orders in natural language and it executes.',
        },
        {
          icon: 'security',
          title: 'Secure environment',
          description:
            'Over 40 native tools and code execution in secure sandboxes (Docker, SSH, Modal).',
        },
      ],
      useCasesTitle: 'What can you do with it?',
      useCases: [
        {
          title: 'Administrative management',
          description:
            'Read your emails, draft responses in your style, manage your calendar, and get a daily briefing sent to Telegram.',
        },
        {
          title: 'Workflow automation',
          description:
            'Manage Kanban boards, sync documents to Notion or Google Workspace, and execute recurring scheduled tasks.',
        },
        {
          title: 'Research and development',
          description:
            'Perform in-depth technology watch, write entire scripts, and do real-time data analysis.',
        },
      ],
      installTitle: 'How to install it?',
      installIntro: 'Two options are available:',
      desktopTitle: 'Desktop version',
      desktopDesc:
        'Perfect for getting started. The desktop app offers a complete GUI to manage API keys, memory modules, and calendar.',
      terminalTitle: 'Terminal version',
      terminalDesc: 'For developers, installation is just one command away.',
      command: 'curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash',
      ctaTitle: 'Ready to discover Hermes Agent?',
      ctaDescription:
        'Start with the Desktop version or install the Terminal version to unlock the full power of an autonomous AI agent.',
      ctaButton: 'Access Hermes Agent',
    },
  })

  const getIcon = (iconName: string) => {
    const icons: Record<string, React.ReactNode> = {
      improvement: <Brain className="h-6 w-6" />,
      memory: <Zap className="h-6 w-6" />,
      autonomous: <Code2 className="h-6 w-6" />,
      multiplatform: <MessageSquare className="h-6 w-6" />,
      security: <Lock className="h-6 w-6" />,
    }
    return icons[iconName] || <ChevronRight className="h-6 w-6" />
  }

  return (
    <main className="w-full bg-[#F3EFE6]">
      {/* Hero Section */}
      <section className="relative w-full px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#D10E63]">
              {t.eyebrow}
            </p>
            <h1
              className="font-sf mb-6 text-balance font-bold leading-[1.1] text-[#1C1A17]"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}
            >
              {t.mainTitle}
            </h1>
            <p className="mb-6 text-xl leading-relaxed text-[#857C6E]">{t.subtitle}</p>
            <p className="text-lg leading-relaxed text-[#4E483F]">{t.intro}</p>
          </motion.div>
        </div>
      </section>

      {/* Why Section */}
      <section className="w-full px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <motion.h2
            className="mb-12 text-3xl font-bold text-[#1C1A17]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t.whyTitle}
          </motion.h2>

          <div className="grid gap-6 sm:gap-8">
            {t.features.map((feature, i) => (
              <motion.div
                key={feature.title}
                className="flex gap-6 rounded-xl border border-[#D4CCBE] bg-white p-6 sm:p-8"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-[#D10E63]/10 text-[#D10E63]">
                  {getIcon(feature.icon)}
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-[#1C1A17]">{feature.title}</h3>
                  <p className="text-base leading-relaxed text-[#4E483F]">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="w-full bg-[#1C1A17] px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <motion.h2
            className="mb-12 text-3xl font-bold text-[#C4BCAE]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t.useCasesTitle}
          </motion.h2>

          <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
            {t.useCases.map((useCase, i) => (
              <motion.div
                key={useCase.title}
                className="rounded-xl bg-gradient-to-br from-[#D10E63]/15 to-transparent p-6 sm:p-8"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <h3 className="mb-3 text-lg font-semibold text-[#F7F4EE]">{useCase.title}</h3>
                <p className="leading-relaxed text-[#E7E1D6]">{useCase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Installation Section */}
      <section className="w-full px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-4 text-3xl font-bold text-[#1C1A17]">{t.installTitle}</h2>
            <p className="mb-10 text-base text-[#4E483F]">{t.installIntro}</p>

            <div className="grid gap-8 sm:grid-cols-2">
              {/* Desktop */}
              <div className="rounded-xl border border-[#D4CCBE] bg-white p-6 sm:p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#D10E63]/10">
                  <Download className="h-6 w-6 text-[#D10E63]" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-[#1C1A17]">{t.desktopTitle}</h3>
                <p className="text-base text-[#4E483F]">{t.desktopDesc}</p>
              </div>

              {/* Terminal */}
              <div className="rounded-xl border border-[#D4CCBE] bg-white p-6 sm:p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#D10E63]/10">
                  <Code2 className="h-6 w-6 text-[#D10E63]" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-[#1C1A17]">{t.terminalTitle}</h3>
                <p className="text-base text-[#4E483F]">{t.terminalDesc}</p>
              </div>
            </div>

            {/* Command */}
            <div className="mt-10 rounded-xl bg-[#1C1A17] p-6 sm:p-8">
              <p className="mb-3 text-sm font-semibold text-[#E7E1D6]">Installation command:</p>
              <code className="block font-mono text-sm text-[#D10E63]">{t.command}</code>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-gradient-to-b from-[#1C1A17] to-[#0F0E0C] px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 text-3xl font-bold text-[#C4BCAE]">{t.ctaTitle}</h2>
            <p className="mb-8 text-lg text-[#E7E1D6]">{t.ctaDescription}</p>
            <a
              href="https://hermes-agent.nousresearch.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D10E63] px-8 py-3 text-lg font-semibold text-[#FBF9F3] transition-colors hover:bg-[#B00B52]"
            >
              {t.ctaButton}
              <ChevronRight className="h-5 w-5" />
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
