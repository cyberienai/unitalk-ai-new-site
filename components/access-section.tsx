'use client'

import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

type Surface = {
  title: string
  desc: string
  icon: React.ReactNode
}

const SURFACES: Surface[] = [
  {
    title: 'Interface Web',
    desc: 'Ouvrez votre navigateur et discutez avec votre agent. Rien à installer, accessible partout.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8" />
        <path d="M12 17v4" />
      </svg>
    ),
  },
  {
    title: 'App Desktop',
    desc: 'Une application native sur Mac, Windows et Linux, à portée de raccourci, intégrée à votre poste.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="12" rx="1" />
        <path d="M2 20h20" />
        <path d="M10 16v4" />
        <path d="M14 16v4" />
      </svg>
    ),
  },
  {
    title: 'Terminal / CLI',
    desc: 'Pour les équipes techniques : pilotez et scriptez votre agent en ligne de commande.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m6 9 3 3-3 3" />
        <path d="M13 15h4" />
      </svg>
    ),
  },
  {
    title: 'Apps de messagerie',
    desc: 'WhatsApp, Telegram, Slack… Parlez à votre agent depuis votre poche, comme à un collègue.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
        <path d="M8 12h.01" />
        <path d="M12 12h.01" />
        <path d="M16 12h.01" />
      </svg>
    ),
  },
]

export function AccessSection() {
  return (
    <section className="relative w-full overflow-hidden border-t border-[#DcD4C4] bg-[#F3EFE6] py-20 sm:py-28">
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D10E63]">
            Un seul agent, partout à la fois
          </p>
          <h2
            className="mt-3 font-sf text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.05] text-[#1C1A17] text-balance"
            style={{ letterSpacing: '-0.03em' }}
          >
            Accédez-y <span className="text-[#D10E63]">là où vous travaillez.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#4E483F] sm:text-lg">
            Web, bureau, terminal ou messagerie : c’est le même agent, la même mémoire,
            les mêmes compétences. Vous changez d’écran, pas d’assistant.
          </p>
        </div>

        {/* Row of surfaces */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SURFACES.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease, delay: i * 0.06 }}
              className="group flex flex-col rounded-2xl border border-[#DcD4C4] bg-[#FBF9F3] p-6 transition-colors hover:border-[#D10E63]/40"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1C1A17] text-[#FBF9F3] transition-colors group-hover:bg-[#D10E63]">
                {s.icon}
              </span>
              <h3 className="mt-5 font-sf text-lg font-bold leading-snug text-[#1C1A17]" style={{ letterSpacing: '-0.02em' }}>
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#4E483F]">{s.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
