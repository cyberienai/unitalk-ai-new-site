'use client'

import { motion } from 'framer-motion'

const ease = [0.21, 0.47, 0.32, 0.98] as const

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease },
  }),
}

type Channel = {
  name: string
  desc: string
  icon: React.ReactNode
}

const CHANNELS: Channel[] = [
  {
    name: 'Site web',
    desc: 'Un widget de chat et de voix sur vos pages. Il répond, qualifie et prend rendez-vous.',
    icon: (
      <>
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <path d="M3 8h18" />
        <path d="M8 21h8" />
      </>
    ),
  },
  {
    name: 'WhatsApp',
    desc: 'Vos clients écrivent, votre agent répond dans la seconde, 24h/24, sur le canal qu’ils préfèrent.',
    icon: (
      <>
        <path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 21l2.2-5.2A8.5 8.5 0 1 1 21 11.5z" />
        <path d="M8.5 9c0 4 2.5 6.5 6.5 6.5" />
      </>
    ),
  },
  {
    name: 'Téléphone',
    desc: 'Une vraie voix, un vrai numéro. Il décroche, comprend et agit — comme un standard qui ne dort jamais.',
    icon: (
      <>
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
      </>
    ),
  },
  {
    name: 'Email',
    desc: 'Sa propre adresse. Il trie, rédige et répond à vos emails, relance les devis et suit chaque fil.',
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
  },
  {
    name: 'SMS',
    desc: 'Rappels de rendez-vous, confirmations, relances : au bon moment, sur le canal le plus lu.',
    icon: (
      <>
        <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M8 10h.01M12 10h.01M16 10h.01" />
      </>
    ),
  },
  {
    name: 'Slack & Teams',
    desc: 'Un collègue de plus dans vos canaux internes. Il répond aux équipes et déclenche vos process.',
    icon: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </>
    ),
  },
  {
    name: 'Instagram & Messenger',
    desc: 'Vos messages sociaux traités en direct, sans faire attendre un seul prospect.',
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <path d="M17.5 6.5h.01" />
      </>
    ),
  },
  {
    name: 'API & Webhooks',
    desc: 'Pour vos équipes techniques : branchez l’agent à vos outils maison et vos flux sur mesure.',
    icon: (
      <>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </>
    ),
  },
]

const STEPS = [
  {
    n: '01',
    title: 'Choisissez vos canaux',
    body: 'Cochez les canaux où vous voulez être présent. Aucune configuration technique de votre côté.',
  },
  {
    n: '02',
    title: 'Un clic pour activer',
    body: 'Unitalk connecte, authentifie et met en ligne. Votre agent apparaît sur le canal en quelques secondes.',
  },
  {
    n: '03',
    title: 'Il travaille partout à la fois',
    body: 'Même agent, même mémoire, même personnalité sur tous les canaux. Un seul cerveau, toutes vos portes d’entrée.',
  },
]

export function DeployContent() {
  return (
    <main className="bg-[#FBF9F3] text-[#1C1A17]">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#E5DECF] bg-grid px-6 pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="mx-auto max-w-4xl">
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D10E63]"
          >
            Agent public
          </motion.p>
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={1}
            className="mt-4 font-sf text-4xl font-bold leading-[1.02] text-balance sm:text-6xl"
            style={{ letterSpacing: '-0.03em' }}
          >
            Rendez votre agent public, là où sont{' '}
            <span className="text-[#D10E63]">vos clients.</span>
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={2}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-[#4E483F]"
          >
            Le même agent qui vous assiste en interne accueille aussi vos clients — sur votre site,
            WhatsApp, au téléphone, par email… Chaque canal ouvert en un clic, sans code, sans attendre.
          </motion.p>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={3}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href="/creer"
              className="inline-flex items-center justify-center rounded-full bg-[#D10E63] px-6 py-3 text-sm font-medium text-[#FBF9F3] transition-colors hover:bg-[#B00B52]"
            >
              Créer mon agent
            </a>
            <a
              href="/tarifs"
              className="inline-flex items-center justify-center rounded-full border border-[#CFC6B4] px-6 py-3 text-sm font-medium text-[#1C1A17] transition-colors hover:border-[#1C1A17]"
            >
              Voir les tarifs
            </a>
          </motion.div>
        </div>
      </section>

      {/* Channels grid */}
      <section className="px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <h2
              className="font-sf text-3xl font-bold leading-[1.1] text-balance sm:text-4xl"
              style={{ letterSpacing: '-0.03em' }}
            >
              Chaque canal, actif en un clic.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#4E483F]">
              Vous choisissez, Unitalk connecte. Votre agent garde la même mémoire et la même
              personnalité, où qu’il parle à vos clients.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[#E5DECF] bg-[#E5DECF] sm:grid-cols-2 lg:grid-cols-4">
            {CHANNELS.map((c, i) => (
              <motion.div
                key={c.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={fadeUp}
                custom={i % 4}
                className="group flex flex-col gap-4 bg-[#FBF9F3] p-6 transition-colors hover:bg-[#F3EFE6]"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#1C1A17] text-[#FBF9F3] transition-colors group-hover:bg-[#D10E63]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {c.icon}
                  </svg>
                </span>
                <div>
                  <h3 className="font-sf text-lg font-bold" style={{ letterSpacing: '-0.02em' }}>
                    {c.name}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#4E483F]">{c.desc}</p>
                </div>
                <span className="mt-auto inline-flex w-fit items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-[#857C6E]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D10E63]" />
                  Actif en un clic
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-[#E5DECF] bg-[#F3EFE6] px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <h2
            className="max-w-2xl font-sf text-3xl font-bold leading-[1.1] text-balance sm:text-4xl"
            style={{ letterSpacing: '-0.03em' }}
          >
            Du choix au direct, <span className="text-[#D10E63]">en trois temps.</span>
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-3">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={fadeUp}
                custom={i}
              >
                <span
                  className="font-sf text-5xl font-bold text-[#1C1A17]/15 tabular-nums"
                  style={{ letterSpacing: '-0.03em' }}
                >
                  {s.n}
                </span>
                <h3
                  className="mt-4 font-sf text-xl font-bold"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4E483F]">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#1C1A17] px-6 py-20 text-[#F3EFE6] sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            className="font-sf text-3xl font-bold leading-[1.05] text-balance sm:text-5xl"
            style={{ letterSpacing: '-0.03em' }}
          >
            Un agent. Toutes vos portes d’entrée.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#A79E8E]">
            Créez votre agent avec Alma, puis déployez-le sur tous vos canaux en un clic. Vos clients
            ne verront plus la différence — sauf que vous répondez toujours.
          </p>
          <a
            href="/creer"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-[#D10E63] px-7 py-3.5 text-sm font-medium text-[#FBF9F3] transition-colors hover:bg-[#E85C8A]"
          >
            Créer mon agent
          </a>
        </div>
      </section>
    </main>
  )
}
