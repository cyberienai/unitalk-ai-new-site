'use client'

import { motion } from 'framer-motion'
import { ChevronRight, X, ArrowLeftRight } from 'lucide-react'
import { SectionHeader } from './section-header'

const T = {
  fr: {
    // Alma
    almaEyebrow: 'Assistance vocale pour la mise en service',
    almaTitle: 'Alma vous interview et donne vie à votre collaborateur IA ',
    almaTitleAccent: 'en 5 minutes.',
    almaText:
      "Alma comprend votre entreprise, identifie vos tâches chronophages et recommande les compétences clés. Elle lance votre Collaborateur IA propulsé par l'agent Hermès, le leader des agents autonomes open source.",
    almaSteps: [
      { n: '01', label: 'Contexte entreprise', desc: 'Collecte les données publiques liées à votre entreprise et votre nom de domaine' },
      { n: '02', label: 'Interview & découverte', desc: 'Pose les bonnes questions sur votre rôle, vos tâches et vos processus' },
      { n: '03', label: 'Cartographie des tâches', desc: 'Identifie vos tâches chronophages et répétitives' },
      { n: '04', label: 'Configuration & intégrations', desc: 'Configure votre agent Hermès, vous aide à connecter vos apps' },
      { n: '05', label: 'Planifie une tâche', desc: 'Crée une première tâche pour effectuer la veille sur le sujet de votre choix' },
      { n: '06', label: 'Suivi & amélioration', desc: 'Alma est accessible à tout moment. Escalade auprès d\'un AgentOps si besoin' },
    ],
    almaCta: 'Parlez avec Alma',
    almaMicrocopy: 'Sans carte bancaire. Découvrez Alma →',
    almaLearnMore: 'En savoir plus',
    migrBadge: 'Migration en un clic',
    migrText: 'Déjà un agent Hermes ou OpenClaw ? Migrez vos données vers Unitalk en un clic.',
    migrCta: 'Migrer maintenant',

    // IA dispersée (dark)
    dispEyebrow: 'Le vrai problème',
    dispTitle: "Vos équipes utilisent l'IA. ",
    dispTitleAccent: "Mais chacun de son côté.",
    dispIntro:
      "Vos équipes utilisent déjà l'IA. Le problème n'est pas l'adoption, c'est la dispersion\u00A0: chacun dans son coin, sans mémoire ni méthode partagée. Il est temps de recruter de vrais collaborateurs IA.",
    dispProblems: [
      'Des comptes individuels',
      'Des conversations isolées',
      'Des prompts qui disparaissent',
      'Des méthodes jamais partagées',
      'Une mémoire qui se perd',
      'Des données hors cadre',
    ],
    dispStrong: "Le problème n'est pas que les entreprises n'utilisent pas l'IA. C'est qu'elles l'utilisent en désordre.",
    dispConclusion: "C'est pourquoi nous avons créé Unitalk : la première interface Web collaborative pour les agents Hermès. Une IA qui travaille avec toute votre organisation, pas à côté d'elle.",
  },
  en: {
    almaEyebrow: 'Voice assistance for onboarding',
    almaTitle: 'Alma interviews you and brings your AI Collaborator to life ',
    almaTitleAccent: 'in 5 minutes.',
    almaText: "Alma understands your business, identifies your time-consuming tasks, and recommends the right skills. She launches your AI Collaborator powered by the Hermès agent, the leader in autonomous open-source agents.",
    almaCta: 'Chat with Alma',
    almaMicrocopy: 'No credit card. Learn more about Alma →',
    almaLearnMore: 'Learn more',
    migrBadge: 'One-click migration',
    migrText: 'Already have a Hermes or OpenClaw agent? Migrate your data to Unitalk in one click.',
    migrCta: 'Migrate now',
    almaSteps: [
      { n: '01', label: 'Company context', desc: 'Collects public data related to your company and domain name' },
      { n: '02', label: 'Interview & discovery', desc: 'Asks the right questions about your role, tasks, and processes' },
      { n: '03', label: 'Task mapping', desc: 'Identifies your time-consuming and repetitive tasks' },
      { n: '04', label: 'Config. & integrations', desc: 'Configures your Hermès agent, helps you connect your apps' },
      { n: '05', label: 'Schedule a task', desc: 'Creates a first task to monitor the subject of your choice' },
      { n: '06', label: 'Follow-up & improvement', desc: 'Alma is available anytime. Escalates to AgentOps if needed' },
    ],
    
    dispEyebrow: 'The real problem',
    dispTitle: "Your teams use AI. ",
    dispTitleAccent: "But each on their own.",
    dispIntro: "Your teams already use AI. The problem isn't adoption, it's fragmentation: everyone in their corner, with no shared memory or method. It's time to hire real AI collaborators.",
    dispProblems: [
      'Individual accounts',
      'Isolated conversations',
      'Prompts that disappear',
      'Methods never shared',
      'Memory that gets lost',
      'Data outside your control',
    ],
    dispStrong: "The problem isn't that companies don't use AI. It's that they use it in chaos.",
    dispConclusion: "That's why we built Unitalk: the first collaborative web interface for Hermès agents. An AI that works with your whole organization, not alongside it.",
  },
}

export function AlmaIaSections({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = T[lang]

  return (
    <>
      {/* ---------- Alma onboarding (light) ---------- */}
      <section className="relative w-full overflow-hidden bg-[#F3EFE6] py-20 sm:py-28">
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* 2-column layout: title/subtitle left, video right */}
          <div className="mb-16 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            {/* Left — title & subtitle */}
            <div className="lg:order-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D10E63] mb-3">{t.almaEyebrow}</p>
              <h2 className="font-sf text-3xl font-bold leading-[1.05] text-balance sm:text-4xl md:text-5xl text-[#1C1A17]" style={{ letterSpacing: '-0.03em' }}>
                {t.almaTitle}
                {t.almaTitleAccent && <span className="text-[#D10E63]">{t.almaTitleAccent}</span>}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-[#4E483F]">{t.almaText}</p>

              {/* CTA below subtitle */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button className="inline-flex items-center gap-2 rounded-full bg-[#D10E63] px-7 py-3.5 text-sm font-semibold text-[#FBF9F3] transition-all hover:bg-[#B00B52] sm:text-base">
                  {t.almaCta}
                  <ChevronRight className="h-4 w-4" />
                </button>
                <a
                  href="/alma"
                  className="group inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-[#D10E63]/40 bg-white/60 px-7 py-3.5 text-sm font-semibold text-[#D10E63] transition-all hover:border-[#D10E63] hover:bg-[#D10E63] hover:text-[#FBF9F3] sm:text-base"
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

              {/* Migration banner under the video */}
              <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-[#D10E63]/25 bg-gradient-to-r from-[#D10E63]/10 to-transparent p-4">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#D10E63]/15 text-[#D10E63]">
                    <ArrowLeftRight className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <div>
                    <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#D10E63]">
                      {t.migrBadge}
                    </p>
                    <p className="text-sm font-medium leading-snug text-[#1C1A17]">{t.migrText}</p>
                  </div>
                </div>
                <a
                  href="/migration"
                  className="group inline-flex flex-shrink-0 items-center justify-center gap-1.5 self-start whitespace-nowrap rounded-full border border-[#D10E63]/40 bg-white/60 px-4 py-2 text-sm font-semibold text-[#D10E63] transition-all hover:border-[#D10E63] hover:bg-[#D10E63] hover:text-[#FBF9F3]"
                >
                  {t.migrCta}
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Grid — 9 steps 3x3 with Alma-specific design */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {t.almaSteps.map((step, i) => (
              <motion.article
                key={step.n}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const, delay: i * 0.08 }}
                className="group relative flex flex-col rounded-2xl border-2 border-[#D10E63]/20 bg-gradient-to-br from-[#FBF9F3] to-[#F3EFE6] p-6 transition-all hover:border-[#D10E63]/40 hover:shadow-lg hover:shadow-[#D10E63]/10 sm:p-7"
              >
                {/* Number badge */}
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#D10E63] to-[#B00B52] text-[#FBF9F3] font-bold text-base transition-all group-hover:scale-110">
                  {step.n}
                </div>

                {/* Content */}
                <h3
                  className="mt-5 font-sf text-base font-bold leading-snug text-[#1C1A17]"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {step.label}
                </h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-[#4E483F]">
                  {step.desc}
                </p>

                {/* Hover accent line */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[#D10E63] to-[#B00B52] rounded-full transition-all duration-300 group-hover:w-full" />
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- IA dispersée (dark) ---------- */}
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

        <div className="relative mx-auto max-w-5xl">
          <SectionHeader eyebrow={t.dispEyebrow} title={t.dispTitle} titleAccent={t.dispTitleAccent} subtitle={t.dispIntro} dark />

          <div className="h-12" />

          {/* problems grid - improved typography & layout */}
          <div className="mb-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {t.dispProblems.map((problem, i) => (
              <motion.div
                key={problem}
                className="group flex items-start gap-4 rounded-xl border border-[#D10E63]/20 bg-gradient-to-br from-[#D10E63]/8 to-[#D10E63]/3 px-5 py-4 transition-all hover:border-[#D10E63]/40 hover:shadow-lg hover:shadow-[#D10E63]/10"
                initial={{ opacity: 0, y: 16, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: i * 0.07, ease: 'easeOut' }}
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#D10E63]/20 text-[#F1729F] transition-all group-hover:bg-[#D10E63]/30 group-hover:scale-110">
                  <X className="h-3.5 w-3.5" />
                </span>
                <p className="text-sm font-medium leading-relaxed text-[#E8DFD5]">{problem}</p>
              </motion.div>
            ))}
          </div>

          {/* Solution section */}
          <div className="rounded-2xl border-l-4 border-[#D10E63] bg-gradient-to-r from-[#D10E63]/10 to-transparent px-6 py-6 sm:px-8 sm:py-8">
            <p className="text-lg font-semibold leading-relaxed text-[#F7F4EE]">
              <span className="font-bold text-white">Unitalk</span>{' '}
              {t.dispConclusion.replace('Unitalk ', '')}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
