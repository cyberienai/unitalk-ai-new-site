'use client'

import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

type Capability = {
  title: string
  desc: string
  tech: string
  icon: React.ReactNode
}

const CAPABILITIES: Capability[] = [
  {
    title: 'Il planifie, raisonne et exécute',
    desc: 'Donnez-lui un objectif. Il le découpe en étapes, décide de la marche à suivre et va au bout — sans supervision.',
    tech: 'Agent autonome',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4" />
        <path d="m6.3 6.3 2.9 2.9" />
        <path d="M2 12h4" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 18v4" />
        <path d="m17.7 17.7-2.9-2.9" />
        <path d="M22 12h-4" />
        <path d="m17.7 6.3-2.9 2.9" />
        <path d="m6.3 17.7 2.9-2.9" />
      </svg>
    ),
  },
  {
    title: 'Il utilise les meilleurs modèles',
    desc: 'Toujours branché sur les dernières versions des modèles d’IA les plus performants. Vous choisissez, ou il choisit pour vous.',
    tech: 'Multimodèle, à jour',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a4 4 0 0 0-4 4 4 4 0 0 0-2 7 4 4 0 0 0 2 7 4 4 0 0 0 8 0 4 4 0 0 0 2-7 4 4 0 0 0-2-7 4 4 0 0 0-4-4Z" />
        <path d="M12 6v12" />
      </svg>
    ),
  },
  {
    title: 'Il apprend de nouvelles compétences',
    desc: 'Il dispose déjà d’un savoir-faire étendu — et en crée de nouvelles quand une tâche l’exige. Il grandit avec vous.',
    tech: 'Compétences extensibles',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v8" />
        <path d="m4.93 10.93 1.41 1.41" />
        <path d="M2 18h2" />
        <path d="M20 18h2" />
        <path d="m19.07 10.93-1.41 1.41" />
        <path d="M22 22H2" />
        <path d="m8 22 4-10 4 10" />
      </svg>
    ),
  },
  {
    title: 'Il se connecte à plus de 3000 apps',
    desc: 'Gmail, Slack, HubSpot, Notion, votre CRM, vos outils métier… Il agit directement là où travaille votre équipe.',
    tech: '3000+ intégrations',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="16" y="16" width="6" height="6" rx="1" />
        <rect x="2" y="16" width="6" height="6" rx="1" />
        <rect x="9" y="2" width="6" height="6" rx="1" />
        <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" />
        <path d="M12 12V8" />
      </svg>
    ),
  },
  {
    title: 'Il navigue sur internet',
    desc: 'Il cherche, lit et recoupe l’information en temps réel pour vous répondre avec des données à jour, pas des souvenirs figés.',
    tech: 'Navigation web',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </svg>
    ),
  },
  {
    title: 'Il exécute du code en toute sécurité',
    desc: 'Analyses, scripts, traitements de fichiers : il exécute du code dans un environnement isolé, sans jamais toucher à vos systèmes.',
    tech: 'Container sécurisé',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
]

export function CapabilitiesSection() {
  return (
    <section className="relative w-full overflow-hidden border-t border-[#DcD4C4] bg-[#FBF9F3] py-20 sm:py-28">
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D10E63]">Ce que votre agent IA sait faire</p>
          <h2
            className="mt-3 font-sf text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.05] text-[#1C1A17] text-balance"
            style={{ letterSpacing: '-0.03em' }}
          >
            Il agit. <span className="text-[#D10E63]">Il ne fait pas que répondre.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#4E483F] sm:text-lg">
            Il ne se contente pas de discuter. Il agit sur vos outils, cherche l’information,
            écrit et exécute — pour atteindre les objectifs que vous lui confiez.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[#DcD4C4] bg-[#DcD4C4] sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((cap, i) => (
            <motion.article
              key={cap.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease, delay: (i % 3) * 0.06 }}
              className="group flex flex-col bg-[#FBF9F3] p-6 sm:p-8 transition-colors hover:bg-[#F3EFE6]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1C1A17] text-[#FBF9F3] transition-colors group-hover:bg-[#D10E63]">
                {cap.icon}
              </span>
              <h3 className="mt-5 font-sf text-lg font-bold leading-snug text-[#1C1A17]" style={{ letterSpacing: '-0.02em' }}>
                {cap.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[#4E483F]">{cap.desc}</p>
              <span className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#D10E63]">
                {cap.tech}
              </span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
