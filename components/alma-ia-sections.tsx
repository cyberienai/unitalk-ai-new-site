'use client'

import { motion } from 'framer-motion'
import { ChevronRight, X, ArrowLeftRight, CheckCircle2, ArrowDown, Network, ShieldCheck, Users, User, Bot, Building2, MessagesSquare, ListChecks, Plug, CalendarClock, TrendingUp } from 'lucide-react'
import { SectionHeader } from './section-header'

const ease = [0.22, 1, 0.36, 1] as const

const T = {
  fr: {
    // Alma
    almaEyebrow: '• Démarrage assisté',
    almaTitle: 'Alma vous interview et donne vie à ',
    almaTitleAccent: 'vos collaborateurs IA',
    almaText:
      "Alma comprend votre entreprise, identifie vos tâches qui vous prennent du temps et recommande les compétences essentielles. Votre Collaborateur IA est prêt en 5 minutes.",
    almaSteps: [
      { n: '01', label: 'Contexte entreprise', desc: 'Collecte les données publiques liées à votre entreprise et votre nom de domaine' },
      { n: '02', label: 'Interview & découverte', desc: 'Pose les bonnes questions sur votre rôle, vos tâches et vos processus' },
      { n: '03', label: 'Cartographie des tâches', desc: 'Identifie vos tâches chronophages et répétitives' },
      { n: '04', label: 'Configuration & intégrations', desc: 'Configure votre agent Hermes, vous aide à connecter vos apps' },
      { n: '05', label: 'Planifie une tâche', desc: 'Crée une première tâche pour effectuer la veille sur le sujet de votre choix' },
      { n: '06', label: 'Suivi & amélioration', desc: 'Alma est accessible à tout moment. Escalade auprès d\'un AgentOps si besoin' },
    ],
    almaCta: 'Parlez avec Alma',
    almaMicrocopy: 'Sans carte bancaire. Découvrez Alma →',
    almaLearnMore: 'En savoir plus',
    migrBadge: 'Vous avez déjà OpenClaw ou Hermes ?',
    migrText: 'Transférez vos données vers Unitalk simplement.',
    migrCta: 'Transférer mes données',

    // IA dispersée (dark)
    dispEyebrow: 'Le vrai problème',
    dispTitle: "L'IA, ",
    dispTitleAccent: "chacun pour soi.",
    dispIntro:
      "Shadow IT, fuite de données, obsolescence. Vos équipes utilisent l'IA — vous ne contrôlez ni où, ni comment, ni avec quels modèles.",
    dispPillars: [
      { label: 'AI Gateway', text: 'Tous les meilleurs modèles, un accès, un contrôle.' },
      { label: 'AI Cloud', text: 'Votre serveur IA privé. Données sous votre contrôle.' },
      { label: 'Collaboration', text: 'Humains et agents, même équipe. Mémoire partagée, contexte commun.' },
    ],
    dispCta: "Activer mon Collaborateur IA",
    dispVisual: {
      people: [
        { name: 'Sophie', detail: 'utilise ChatGPT dans son coin' },
        { name: 'Marc', detail: 'utilise Claude, pas de partage' },
        { name: 'Julie', detail: 'utilise Gemini, fichiers locaux' },
      ],
      highlight: { name: 'Elena', detail: 'collaboratrice IA Unitalk' },
    },
  },
  en: {
    almaEyebrow: '• Guided Setup',
    almaTitle: 'Alma interviews you and brings your ',
    almaTitleAccent: 'AI Collaborator to life',
    almaText: "Alma understands your business, identifies your time-consuming tasks, and recommends essential skills. Your AI Collaborator is ready in 5 minutes.",
    almaCta: 'Chat with Alma',
    almaMicrocopy: 'No credit card. Learn more about Alma →',
    almaLearnMore: 'Learn more',
    migrBadge: 'Already using OpenClaw or Hermes?',
    migrText: 'Transfer your data to Unitalk easily.',
    migrCta: 'Transfer my data',
    almaSteps: [
      { n: '01', label: 'Company context', desc: 'Collects public data related to your company and domain name' },
      { n: '02', label: 'Interview & discovery', desc: 'Asks the right questions about your role, tasks, and processes' },
      { n: '03', label: 'Task mapping', desc: 'Identifies your time-consuming and repetitive tasks' },
      { n: '04', label: 'Config. & integrations', desc: 'Configures your Hermes agent, helps you connect your apps' },
      { n: '05', label: 'Schedule a task', desc: 'Creates a first task to monitor the subject of your choice' },
      { n: '06', label: 'Follow-up & improvement', desc: 'Alma is available anytime. Escalates to AgentOps if needed' },
    ],
    
    dispEyebrow: 'The real problem',
    dispTitle: "AI, ",
    dispTitleAccent: "everyone for themselves.",
    dispIntro: "Shadow IT, data leaks, obsolescence. Your teams use AI — you control neither where, nor how, nor with which models.",
    dispPillars: [
      { label: 'AI Gateway', text: 'All the best models, one access, one control.' },
      { label: 'AI Cloud', text: 'Your private AI server. Data under your control.' },
      { label: 'Collaboration', text: 'Humans and agents, one team. Shared memory, common context.' },
    ],
    dispCta: "Activate my AI Collaborator",
    dispVisual: {
      people: [
        { name: 'Sophie', detail: 'uses ChatGPT on her own' },
        { name: 'Marc', detail: 'uses Claude, no sharing' },
        { name: 'Julie', detail: 'uses Gemini, local files' },
      ],
      highlight: { name: 'Elena', detail: 'Unitalk AI collaborator' },
    },
  },
}

export function AlmaOnboardingSection({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = T[lang]

  return (
    <section className="relative w-full overflow-hidden bg-[#1A1613] py-20 sm:py-28">
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* 2-column layout: title/subtitle left, video right */}
          <div className="mb-16 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            {/* Left — title & subtitle */}
            <div className="lg:order-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D10E63] mb-3">{t.almaEyebrow}</p>
              <h2 className="font-sf text-3xl font-bold leading-[1.05] text-balance sm:text-4xl md:text-5xl text-[#F7F4EE]" style={{ letterSpacing: '-0.03em' }}>
                {t.almaTitle}
                {t.almaTitleAccent && <span className="text-[#D10E63]">{t.almaTitleAccent}</span>}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-[#E8E1D0]">{t.almaText}</p>

              {/* CTA below subtitle */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button className="inline-flex items-center gap-2 rounded-full bg-[#D10E63] px-7 py-3.5 text-sm font-semibold text-[#FBF9F3] transition-all hover:bg-[#B00B52] sm:text-base">
                  {t.almaCta}
                  <ChevronRight className="h-4 w-4" />
                </button>
                <a
                  href="/alma"
                  className="group inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-[#D10E63] bg-transparent px-7 py-3.5 text-sm font-semibold text-[#D10E63] transition-all hover:bg-[#D10E63] hover:text-[#FBF9F3] sm:text-base"
                >
                  {t.almaLearnMore}
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>

            {/* Right — video placeholder */}
            <div className="lg:order-1">
              <div className="relative w-full bg-gradient-to-br from-[#D10E63]/15 to-[#D10E63]/5 rounded-3xl aspect-[3/2] border-2 border-[#D10E63]/30 flex items-center justify-center overflow-hidden">
                <div className="text-center">
                  <svg className="h-20 w-20 mx-auto mb-3 text-[#D10E63]/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm font-semibold text-[#857C6E] uppercase tracking-wide">Alma en action</p>
                </div>
                
                {/* Alma avatar overlay */}
                <img
                  src="/alma-avatar.png"
                  alt="Alma"
                  className="absolute bottom-6 left-6 h-14 w-14 rounded-full object-cover ring-2 ring-[#FBF9F3] shadow-lg"
                />
                
                {/* Video element - add your video src here */}
                {/* <video src="/alma-video.mp4" autoPlay muted loop className="w-full h-full object-cover" /> */}
              </div>
            </div>
          </div>

          {/* Vertical timeline — sequential onboarding steps */}
          <div className="mx-auto max-w-2xl">
            {t.almaSteps.map((step, i) => {
              const isLast = i === t.almaSteps.length - 1
              const StepIcon = [Building2, MessagesSquare, ListChecks, Plug, CalendarClock, TrendingUp][i] ?? Building2
              return (
                <motion.article
                  key={step.n}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as const, delay: i * 0.06 }}
                  className="group relative flex gap-5 pb-6 last:pb-0 sm:gap-6"
                >
                  {/* Icon badge + connecting line */}
                  <div className="relative flex flex-col items-center">
                    <div className="z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-[#D10E63]/40 bg-[#D10E63]/10 text-[#D10E63] transition-all duration-300 group-hover:border-[#D10E63] group-hover:bg-[#D10E63] group-hover:text-[#FBF9F3]">
                      <StepIcon className="h-5 w-5" strokeWidth={1.8} />
                    </div>
                    {!isLast && (
                      <div className="absolute top-12 h-full w-px bg-gradient-to-b from-[#D10E63]/40 to-[#D10E63]/5" aria-hidden="true" />
                    )}
                  </div>

                  {/* Content card */}
                  <div className="flex-1 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 transition-all duration-300 group-hover:border-[#D10E63]/30 group-hover:bg-white/[0.05] sm:p-6">
                    <div className="flex items-center gap-3">
                      <span className="font-sf text-xs font-bold tabular-nums tracking-[0.1em] text-[#D10E63]">
                        {step.n}
                      </span>
                      <h3
                        className="font-sf text-base font-bold leading-snug text-[#F7F4EE] sm:text-lg"
                        style={{ letterSpacing: '-0.02em' }}
                      >
                        {step.label}
                      </h3>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-[#B8AFA0]">
                      {step.desc}
                    </p>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
    </section>
  )
}

export function MigrationBanner({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = T[lang]

  return (
    <section className="w-full bg-[#F3EFE6] px-5 pb-20 sm:px-6 sm:pb-28 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-5 rounded-2xl border border-[#D10E63] bg-[#2A2620] p-6 sm:flex-row sm:items-center sm:p-8">
          <div className="flex-1">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#D10E63]">
              {t.migrBadge}
            </p>
            <p className="text-sm font-normal leading-relaxed text-[#E8E1D0] sm:text-base">{t.migrText}</p>
          </div>
          <a
            href="/migration"
            className="group inline-flex flex-shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-[#D10E63] bg-transparent px-5 py-2.5 text-sm font-semibold text-[#D10E63] transition-all hover:bg-[#D10E63]/10"
          >
            <ArrowLeftRight className="h-4 w-4" strokeWidth={2} />
            {t.migrCta}
          </a>
        </div>
      </div>
    </section>
  )
}

export function DispersedIASection({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = T[lang]

  return (
    <section className="relative w-full overflow-hidden bg-[#1A1613] px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
        {/* glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              'radial-gradient(circle at 15% 0%, rgba(209,14,99,0.18), transparent 45%), radial-gradient(circle at 90% 100%, rgba(79,91,213,0.16), transparent 45%)',
          }}
        />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left column — content */}
          <div>
            <SectionHeader eyebrow={t.dispEyebrow} title={t.dispTitle} titleAccent={t.dispTitleAccent} subtitle={t.dispIntro} dark />

            <div className="h-10" />

            {/* Solution pillars */}
            <div className="border-t border-[#D10E63]/30">
              {t.dispPillars.map((pillar, i) => {
                const PillarIcon = [Network, ShieldCheck, Users][i]
                return (
                  <motion.div
                    key={pillar.label}
                    className="flex items-start gap-4 border-b border-[#D10E63]/30 py-5"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, ease, delay: i * 0.12 }}
                  >
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#D10E63]/15 text-[#D10E63]">
                      <PillarIcon className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#D10E63]">
                        {pillar.label}
                      </p>
                      <p className="mt-1 text-base leading-relaxed text-[#E8E1D0]">{pillar.text}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Right column — before/after visual */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-2xl shadow-black/40 backdrop-blur-sm sm:p-7">
              {/* Dispersed people */}
              <ul className="flex flex-col gap-3">
                {t.dispVisual.people.map((person, idx) => (
                  <motion.li
                    key={person.name}
                    className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.04] px-4 py-3.5"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease, delay: idx * 0.1 }}
                  >
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#B8AFA0]">
                      <User className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                    <p className="text-sm text-[#C9C0B2] sm:text-[15px]">
                      <span className="font-semibold text-[#F7F4EE]">{person.name}</span>
                      <span className="text-[#8A8175]">{' — '}{person.detail}</span>
                    </p>
                  </motion.li>
                ))}

                {/* Highlighted Unitalk collaborator */}
                <motion.li
                  className="flex items-center gap-4 rounded-2xl border border-dashed border-[#D10E63]/60 bg-[#D10E63]/10 px-4 py-3.5"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease, delay: 0.35 }}
                >
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#D10E63] text-white">
                    <Bot className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <p className="text-sm text-[#C9C0B2] sm:text-[15px]">
                    <span className="font-semibold text-[#F7F4EE]">{t.dispVisual.highlight.name}</span>
                    <span className="text-[#E7B8CD]">{' — '}{t.dispVisual.highlight.detail}</span>
                  </p>
                </motion.li>
              </ul>

              {/* Arrow */}
              <motion.div
                className="flex justify-center py-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease, delay: 0.5 }}
              >
                <ArrowDown className="h-5 w-5 text-[#D10E63]" strokeWidth={2} />
              </motion.div>

              {/* CTA in schema */}
              <motion.button
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#D10E63] px-5 py-4 text-sm font-semibold text-[#FBF9F3] transition-all hover:bg-[#B00B52] sm:text-base"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: 0.6 }}
              >
                {t.dispCta}
                <ChevronRight className="h-4 w-4" />
              </motion.button>
            </div>
          </motion.div>
        </div>
    </section>
  )
}

export function AlmaIaSections({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  return (
    <>
      <AlmaOnboardingSection lang={lang} />
      <DispersedIASection lang={lang} />
    </>
  )
}
