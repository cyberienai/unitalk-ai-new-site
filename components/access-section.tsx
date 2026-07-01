'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/language-context'

const ease = [0.22, 1, 0.36, 1] as const

const ICONS: React.ReactNode[] = [
  (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
      <path d="M8 12h.01" />
      <path d="M12 12h.01" />
      <path d="M16 12h.01" />
    </svg>
  ),
  (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8" />
      <path d="M12 17v4" />
    </svg>
  ),
  (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="12" rx="1" />
      <path d="M2 20h20" />
      <path d="M10 16v4" />
      <path d="M14 16v4" />
    </svg>
  ),
  (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m6 9 3 3-3 3" />
      <path d="M13 15h4" />
    </svg>
  ),
]

const T = {
  fr: {
    eyebrow: 'Un seul agent, partout à la fois',
    title1: 'Accédez-y ',
    title2: 'là où vous travaillez.',
    subtitle:
      'Web, bureau, terminal ou messagerie : c’est le même agent, la même mémoire, les mêmes compétences. Vous changez d’écran, tout simplement.',
    items: [
      { title: 'Apps de messagerie', desc: 'WhatsApp, Telegram, Teams… Parlez à votre agent depuis votre poche, comme à un collègue.' },
      { title: 'Interface Web', desc: 'La seule interface de chat unifiée pour piloter vos agents Hermes. Rien à installer, accessible partout.', badge: 'Exclusivité Unitalk' },
      { title: 'App Desktop', desc: 'Une application native sur Mac, Windows et Linux, à portée de raccourci, intégrée à votre poste.' },
      { title: 'Terminal / CLI', desc: 'Pour les équipes techniques : pilotez et scriptez votre agent en ligne de commande.' },
    ],
  },
  en: {
    eyebrow: 'One agent, everywhere at once',
    title1: 'Reach it ',
    title2: 'wherever you work.',
    subtitle:
      'Web, desktop, terminal or messaging: it’s the same agent, the same memory, the same skills. You just switch screens.',
    items: [
      { title: 'Messaging apps', desc: 'WhatsApp, Telegram, Teams… Talk to your agent from your pocket, like a colleague.' },
      { title: 'Web interface', desc: 'The single unified chat interface to run your Hermes agents. Nothing to install, accessible everywhere.', badge: 'Unitalk exclusive' },
      { title: 'Desktop app', desc: 'A native app on Mac, Windows and Linux, a shortcut away, integrated into your workstation.' },
      { title: 'Terminal / CLI', desc: 'For technical teams: run and script your agent from the command line.' },
    ],
  },
}

export function AccessSection() {
  const { lang } = useLanguage()
  const t = T[lang]
  const SURFACES = t.items.map((item, i) => ({
    ...(item as { title: string; desc: string; badge?: string }),
    icon: ICONS[i],
  }))
  return (
    <section className="relative w-full overflow-hidden border-t border-[#DcD4C4] bg-[#F3EFE6] py-20 sm:py-28">
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D10E63]">
            {t.eyebrow}
          </p>
          <h2
            className="mt-3 font-sf text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.05] text-[#1C1A17] text-balance"
            style={{ letterSpacing: '-0.03em' }}
          >
            {t.title1}<span className="text-[#D10E63]">{t.title2}</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#4E483F] sm:text-lg">
            {t.subtitle}
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
              className={`group relative flex flex-col rounded-2xl border bg-[#FBF9F3] p-6 transition-colors ${
                s.badge ? 'border-[#D10E63]/40 ring-1 ring-[#D10E63]/15' : 'border-[#DcD4C4] hover:border-[#D10E63]/40'
              }`}
            >
              {s.badge && (
                <span className="absolute right-4 top-4 inline-flex items-center rounded-full bg-[#D10E63] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#FBF9F3]">
                  {s.badge}
                </span>
              )}
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
