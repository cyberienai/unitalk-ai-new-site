'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/language-context'

const ease = [0.21, 0.47, 0.32, 0.98] as const

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease },
  }),
}

const ICONS: React.ReactNode[] = [
  (
    <>
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M3 8h18" />
      <path d="M8 21h8" />
    </>
  ),
  (
    <>
      <path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 21l2.2-5.2A8.5 8.5 0 1 1 21 11.5z" />
      <path d="M8.5 9c0 4 2.5 6.5 6.5 6.5" />
    </>
  ),
  (
    <>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
    </>
  ),
  (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  (
    <>
      <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <path d="M8 10h.01M12 10h.01M16 10h.01" />
    </>
  ),
  (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </>
  ),
  (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </>
  ),
  (
    <>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </>
  ),
]

const T = {
  fr: {
    eyebrow: 'Agent public',
    heroTitle1: 'Rendez votre agent public, là où sont ',
    heroTitle2: 'vos clients.',
    heroBody: 'Le même agent qui vous assiste en interne accueille aussi vos clients — sur votre site, WhatsApp, au téléphone, par email… Chaque canal ouvert en un clic, sans code, sans attendre.',
    ctaCreate: 'Créer mon agent',
    ctaPricing: 'Voir les tarifs',
    channelsTitle: 'Chaque canal, actif en un clic.',
    channelsBody: 'Vous choisissez, Unitalk connecte. Votre agent garde la même mémoire et la même personnalité, où qu’il parle à vos clients.',
    activeBadge: 'Actif en un clic',
    stepsTitle1: 'Du choix au direct, ',
    stepsTitle2: 'en trois temps.',
    finalTitle: 'Un agent. Toutes vos portes d’entrée.',
    finalBody: 'Créez votre agent avec Alma, puis déployez-le sur tous vos canaux en un clic. Vos clients ne verront plus la différence — sauf que vous répondez toujours.',
    channels: [
      { name: 'Site web', desc: 'Un widget de chat et de voix sur vos pages. Il répond, qualifie et prend rendez-vous.' },
      { name: 'WhatsApp', desc: 'Vos clients écrivent, votre agent répond dans la seconde, 24h/24, sur le canal qu’ils préfèrent.' },
      { name: 'Téléphone', desc: 'Une vraie voix, un vrai numéro. Il décroche, comprend et agit — comme un standard qui ne dort jamais.' },
      { name: 'Email', desc: 'Sa propre adresse. Il trie, rédige et répond à vos emails, relance les devis et suit chaque fil.' },
      { name: 'SMS', desc: 'Rappels de rendez-vous, confirmations, relances : au bon moment, sur le canal le plus lu.' },
      { name: 'Slack & Teams', desc: 'Un collègue de plus dans vos canaux internes. Il répond aux équipes et déclenche vos process.' },
      { name: 'Instagram & Messenger', desc: 'Vos messages sociaux traités en direct, sans faire attendre un seul prospect.' },
      { name: 'API & Webhooks', desc: 'Pour vos équipes techniques : branchez l’agent à vos outils maison et vos flux sur mesure.' },
    ],
    steps: [
      { n: '01', title: 'Choisissez vos canaux', body: 'Cochez les canaux où vous voulez être présent. Aucune configuration technique de votre côté.' },
      { n: '02', title: 'Un clic pour activer', body: 'Unitalk connecte, authentifie et met en ligne. Votre agent apparaît sur le canal en quelques secondes.' },
      { n: '03', title: 'Il travaille partout à la fois', body: 'Même agent, même mémoire, même personnalité sur tous les canaux. Un seul cerveau, toutes vos portes d’entrée.' },
    ],
  },
  en: {
    eyebrow: 'Public agent',
    heroTitle1: 'Make your agent public, right where ',
    heroTitle2: 'your customers are.',
    heroBody: 'The same agent that assists you internally also welcomes your customers — on your website, WhatsApp, by phone, by email… Each channel opened in one click, no code, no waiting.',
    ctaCreate: 'Create my agent',
    ctaPricing: 'See pricing',
    channelsTitle: 'Every channel, live in one click.',
    channelsBody: 'You choose, Unitalk connects. Your agent keeps the same memory and the same personality, wherever it talks to your customers.',
    activeBadge: 'Live in one click',
    stepsTitle1: 'From choice to live, ',
    stepsTitle2: 'in three steps.',
    finalTitle: 'One agent. All your front doors.',
    finalBody: 'Create your agent with Alma, then deploy it across all your channels in one click. Your customers won’t see the difference — except that you always answer.',
    channels: [
      { name: 'Website', desc: 'A chat and voice widget on your pages. It answers, qualifies and books meetings.' },
      { name: 'WhatsApp', desc: 'Your customers write, your agent replies within seconds, 24/7, on the channel they prefer.' },
      { name: 'Phone', desc: 'A real voice, a real number. It picks up, understands and acts — like a switchboard that never sleeps.' },
      { name: 'Email', desc: 'Its own address. It sorts, writes and answers your emails, follows up on quotes and tracks every thread.' },
      { name: 'SMS', desc: 'Appointment reminders, confirmations, follow-ups: at the right moment, on the most-read channel.' },
      { name: 'Slack & Teams', desc: 'One more colleague in your internal channels. It answers teams and triggers your processes.' },
      { name: 'Instagram & Messenger', desc: 'Your social messages handled live, without keeping a single prospect waiting.' },
      { name: 'API & Webhooks', desc: 'For your technical teams: plug the agent into your in-house tools and custom flows.' },
    ],
    steps: [
      { n: '01', title: 'Choose your channels', body: 'Tick the channels where you want to be present. No technical setup on your side.' },
      { n: '02', title: 'One click to activate', body: 'Unitalk connects, authenticates and goes live. Your agent appears on the channel within seconds.' },
      { n: '03', title: 'It works everywhere at once', body: 'Same agent, same memory, same personality across all channels. One brain, all your front doors.' },
    ],
  },
}

export function DeployContent() {
  const { lang } = useLanguage()
  const t = T[lang]
  const CHANNELS = t.channels.map((c, i) => ({ ...c, icon: ICONS[i] }))
  const STEPS = t.steps
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
            {t.eyebrow}
          </motion.p>
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={1}
            className="mt-4 font-sf text-4xl font-bold leading-[1.02] text-balance sm:text-6xl"
            style={{ letterSpacing: '-0.03em' }}
          >
            {t.heroTitle1}
            <span className="text-[#D10E63]">{t.heroTitle2}</span>
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={2}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-[#4E483F]"
          >
            {t.heroBody}
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
              {t.ctaCreate}
            </a>
            <a
              href="/tarifs"
              className="inline-flex items-center justify-center rounded-full border border-[#CFC6B4] px-6 py-3 text-sm font-medium text-[#1C1A17] transition-colors hover:border-[#1C1A17]"
            >
              {t.ctaPricing}
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
              {t.channelsTitle}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#4E483F]">
              {t.channelsBody}
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
                  {t.activeBadge}
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
            {t.stepsTitle1}<span className="text-[#D10E63]">{t.stepsTitle2}</span>
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
            {t.finalTitle}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#A79E8E]">
            {t.finalBody}
          </p>
          <a
            href="/creer"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-[#D10E63] px-7 py-3.5 text-sm font-medium text-[#FBF9F3] transition-colors hover:bg-[#E85C8A]"
          >
            {t.ctaCreate}
          </a>
        </div>
      </section>
    </main>
  )
}
