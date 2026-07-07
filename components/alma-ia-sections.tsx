'use client'

import { motion } from 'framer-motion'
import { ChevronRight, X } from 'lucide-react'
import { SectionHeader } from './section-header'

const T = {
  fr: {
    // Alma
    almaEyebrow: 'Assistant consultant vocal',
    almaTitle: 'Alma vous interview et donne vie à votre collaborateur IA ',
    almaTitleAccent: 'en 5 minutes.',
    almaText:
      "Alma analyse votre contexte, cartographie vos tâches critiques et recommande les compétences adaptées. Déploie votre Collaborateur IA avec Hermès, leader des agents open source. Suivi hebdomadaire et support humain réactif.",
    almaSteps: [
      { n: '01', label: 'Interview & découverte', desc: 'Alma pose les bonnes questions sur vos processus' },
      { n: '02', label: 'Cartographie des tâches', desc: 'Identifie les tâches critiques et répétitives' },
      { n: '03', label: 'Recommandations IA', desc: 'Propose compétences et automatisations n8n' },
      { n: '04', label: 'Contexte d\'entreprise', desc: 'Collecte domaine, données publiques, culture' },
      { n: '05', label: 'Configuration agent', desc: 'Crée l\'identité, rôle et instructions. Hermès framework.' },
      { n: '06', label: 'Connecte vos apps', desc: 'Intégre Slack, HubSpot, Gmail, n8n, etc.' },
      { n: '07', label: 'Test mission', desc: 'Valide le comportement et les automatisations' },
      { n: '08', label: 'Planifie une 1ère tâche', desc: 'Lance sa première mission en production' },
      { n: '09', label: 'Suivi & amélioration', desc: 'Évalue satisfaction hebdomadaire, propose optimisations' },
    ],
    almaCta: 'Activer mon collaborateur IA avec Alma',
    almaMicrocopy: 'Sans carte bancaire. Découvrez Alma →',
    almaLearnMore: 'En savoir plus sur Alma',

    // IA dispersée (dark)
    dispEyebrow: 'Le vrai problème',
    dispTitle: "L'IA ne devrait pas vivre dans un onglet.",
    dispIntro:
      "Vos équipes utilisent déjà l'IA. Le problème n'est pas l'adoption, c'est la dispersion : chacun dans son coin, sans mémoire ni méthode partagée. L'entreprise, elle, n'en garde presque rien.",
    dispProblems: [
      'Des comptes individuels',
      'Des conversations isolées',
      'Des prompts qui disparaissent',
      'Des méthodes jamais partagées',
      'Une mémoire qui se perd',
      'Des données hors cadre',
      'Des outils déconnectés',
    ],
    dispStrong: "Le problème n'est pas que les entreprises n'utilisent pas l'IA. C'est qu'elles l'utilisent en désordre.",
    dispConclusion: "Unitalk organise l'IA pour qu'elle devienne une vraie capacité de travail, partagée et durable.",
  },
  en: {
    almaEyebrow: 'Voice consultant assistant',
    almaTitle: 'Alma interviews you and brings your AI Collaborator to life ',
    almaTitleAccent: 'in 5 minutes.',
    almaText:
      "Alma analyzes your context, maps your critical tasks, and recommends the right skills. Deploys your AI Collaborator with Hermès, the leader of open-source agents. Weekly follow-up and reactive human support.",
    almaSteps: [
      { n: '01', label: 'Interview & discovery', desc: 'Alma asks the right questions about your processes' },
      { n: '02', label: 'Task mapping', desc: 'Identifies critical and repetitive tasks' },
      { n: '03', label: 'AI recommendations', desc: 'Suggests skills and n8n automations' },
      { n: '04', label: 'Company context', desc: 'Collects domain, public data, culture' },
      { n: '05', label: 'Agent configuration', desc: 'Creates identity, role, and instructions. Hermès framework.' },
      { n: '06', label: 'Connect your apps', desc: 'Integrates Slack, HubSpot, Gmail, n8n, etc.' },
      { n: '07', label: 'Test mission', desc: 'Validates behavior and automations' },
      { n: '08', label: 'Schedule first task', desc: 'Launches its first mission to production' },
      { n: '09', label: 'Follow-up & improvement', desc: 'Evaluates satisfaction weekly, suggests optimizations' },
    ],
    almaCta: 'Activate my AI Collaborator with Alma',
    almaMicrocopy: 'No credit card. Learn more about Alma →',
    almaLearnMore: 'Learn more about Alma',

    dispEyebrow: 'The real problem',
    dispTitle: "AI shouldn't live in a tab.",
    dispIntro:
      "Your teams already use AI every day. The problem isn't adoption — it's dispersion. Everyone on their own, with no shared memory or method. And the company keeps almost nothing.",
    dispProblems: [
      'Individual accounts',
      'Isolated conversations',
      'Prompts that vanish',
      'Methods never shared',
      'Memory that gets lost',
      'Data out of bounds',
      'Disconnected tools',
    ],
    dispStrong: "The problem isn't that companies don't use AI. It's that they use it in disorder.",
    dispConclusion: 'Unitalk organizes AI so it becomes a real work capacity — shared and lasting.',
  },
}

export function AlmaIaSections({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = T[lang]

  return (
    <>
      {/* ---------- Alma onboarding (light) ---------- */}
      <section className="relative w-full bg-[#EFE9DC] px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
          {/* Left — copy + Alma bubble */}
          <div>
            {/* Alma header with photo */}
            <div className="mb-6 flex items-start gap-4 sm:gap-6">
              <img
                src="/alma-avatar.png"
                alt="Alma"
                className="h-16 w-16 shrink-0 rounded-full object-cover ring-2 ring-[#D10E63]/20 sm:h-20 sm:w-20"
              />
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D10E63] mb-3">{t.almaEyebrow}</p>
                <h2 className="font-sf text-3xl font-bold leading-[1.05] text-balance sm:text-4xl md:text-5xl text-[#1C1A17]" style={{ letterSpacing: '-0.03em' }}>
                  {t.almaTitle}
                  {t.almaTitleAccent && <span className="text-[#D10E63]">{t.almaTitleAccent}</span>}
                </h2>
              </div>
            </div>

            <p className="mb-5 mt-3 text-base leading-relaxed text-[#4E483F]">{t.almaText}</p>

            {/* Alma video/illustration placeholder */}
            <div className="mb-6 w-full max-w-sm">
              <div className="relative w-full bg-gradient-to-br from-[#D10E63]/10 to-[#D10E63]/5 rounded-2xl aspect-video border-2 border-[#D10E63]/20 flex items-center justify-center overflow-hidden">
                <div className="text-center">
                  <svg className="h-16 w-16 mx-auto mb-2 text-[#D10E63]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-xs font-semibold text-[#857C6E] uppercase tracking-wide">Vidéo Alma</p>
                </div>
                {/* Video element - add your video src here */}
                {/* <video src="/alma-video.mp4" autoPlay muted loop className="w-full h-full object-cover" /> */}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button className="mb-1 inline-flex w-fit items-center gap-2 rounded-full bg-[#D10E63] px-7 py-3.5 text-sm font-semibold text-[#FBF9F3] transition-all hover:bg-[#B00B52] sm:text-base">
                {t.almaCta}
                <ChevronRight className="h-4 w-4" />
              </button>
              <p className="text-xs text-[#857C6E]">{t.almaMicrocopy}</p>
              <a href="/alma" className="inline-flex w-fit items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg border-2 border-[#D10E63]/30 bg-[#D10E63]/5 text-[#D10E63] hover:bg-[#D10E63]/10 hover:border-[#D10E63]/50 transition-all">
                {t.almaLearnMore}
                <ChevronRight className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Right — numbered steps with descriptions */}
          <div className="grid gap-3 sm:grid-cols-3">
            {t.almaSteps.map((step, i) => {
              const isLastStep = i === t.almaSteps.length - 1
              return (
              <motion.div
                key={step.n}
                className={`flex flex-col gap-2 rounded-2xl border-2 px-4 py-4 transition-all ${
                  isLastStep 
                    ? 'border-[#D10E63]/40 bg-gradient-to-br from-[#D10E63]/15 to-[#D10E63]/5 hover:border-[#D10E63]/60 hover:from-[#D10E63]/20 hover:to-[#D10E63]/10 ring-1 ring-[#D10E63]/20'
                    : 'border-[#D10E63]/20 bg-gradient-to-br from-[#FBF9F3] to-[#F3EFE6] hover:border-[#D10E63]/40'
                } ${isLastStep ? 'sm:col-start-2' : ''}`}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#D10E63] to-[#B00B52] text-sm font-bold text-[#FBF9F3]">
                    {step.n}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-[#1C1A17]">{step.label}</p>
                      {isLastStep && <span className="inline-flex items-center gap-1 rounded-full bg-[#D10E63]/20 px-2 py-0.5 text-[10px] font-bold uppercase text-[#D10E63] tracking-wide">Continu</span>}
                    </div>
                    <p className="text-xs text-[#857C6E] leading-tight">{step.desc}</p>
                  </div>
                </div>
              </motion.div>
              )
            })}
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

        <div className="relative mx-auto max-w-4xl">
          <SectionHeader eyebrow={t.dispEyebrow} title={t.dispTitle} subtitle={t.dispIntro} dark />

          <div className="h-10" />

          {/* problems grid */}
          <div className="mb-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {t.dispProblems.map((problem, i) => (
              <motion.div
                key={problem}
                className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D10E63]/15 text-[#F1729F]">
                  <X className="h-3 w-3" />
                </span>
                <p className="text-sm text-[#D8D1C5]">{problem}</p>
              </motion.div>
            ))}
          </div>

          <div className="rounded-2xl border-l-2 border-[#D10E63] bg-white/[0.03] px-6 py-5">
            <p className="text-lg font-semibold leading-snug text-[#F7F4EE]">
              <span className="text-[#F1729F]">Unitalk</span>{' '}
              {t.dispConclusion.replace('Unitalk ', '')}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
