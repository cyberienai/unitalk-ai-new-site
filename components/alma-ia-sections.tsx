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
      { n: '01', label: 'Contexte entreprise', desc: 'Collecte domaine, données, culture' },
      { n: '02', label: 'Interview & découverte', desc: 'Pose les bonnes questions sur vos processus' },
      { n: '03', label: 'Cartographie des tâches', desc: 'Identifie vos tâches critiques et répétitives' },
      { n: '04', label: 'Recommandations', desc: 'Propose compétences et automatisations adaptées' },
      { n: '05', label: 'Config. agent', desc: 'Identité, rôle, instructions. Hermès.' },
      { n: '06', label: 'Connecte vos apps', desc: 'Intègre Slack, HubSpot, Gmail, etc.' },
      { n: '07', label: 'Test mission', desc: 'Valide le comportement et les automatisations' },
      { n: '08', label: 'Planifie une tâche', desc: 'Lance sa première mission en production' },
      { n: '09', label: 'Suivi & amélioration', desc: 'Évalue satisfaction hebdomadaire, optimise' },
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
      { n: '01', label: 'Company context', desc: 'Collects domain, data, culture' },
      { n: '02', label: 'Interview & discovery', desc: 'Asks the right questions about your processes' },
      { n: '03', label: 'Task mapping', desc: 'Identifies your critical and repetitive tasks' },
      { n: '04', label: 'Recommendations', desc: 'Suggests suitable skills and automations' },
      { n: '05', label: 'Agent config.', desc: 'Identity, role, instructions. Hermès.' },
      { n: '06', label: 'Connect your apps', desc: 'Integrates Slack, HubSpot, Gmail, etc.' },
      { n: '07', label: 'Test mission', desc: 'Validates behavior and automations' },
      { n: '08', label: 'Schedule a task', desc: 'Launches its first mission to production' },
      { n: '09', label: 'Follow-up & improvement', desc: 'Evaluates satisfaction weekly, optimizes' },
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
      <section className="relative w-full overflow-hidden border-t border-[#DcD4C4] bg-[#F3EFE6] py-20 sm:py-28">
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={t.almaEyebrow}
            title={t.almaTitle}
            titleAccent={t.almaTitleAccent}
            subtitle={t.almaText}
          />

          {/* Grid — 9 steps 3x3 */}
          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[#DcD4C4] bg-[#DcD4C4] sm:grid-cols-2 lg:grid-cols-3">
            {t.almaSteps.map((step, i) => (
              <motion.article
                key={step.n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const, delay: (i % 3) * 0.06 }}
                className="group flex flex-col bg-[#FBF9F3] p-6 transition-colors hover:bg-[#F3EFE6] sm:p-8"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1C1A17] text-[#FBF9F3] transition-colors group-hover:bg-[#D10E63] font-bold text-lg">
                  {step.n}
                </span>
                <h3
                  className="mt-5 font-sf text-lg font-bold leading-snug text-[#1C1A17]"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {step.label}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#4E483F]">
                  {step.desc}
                </p>
              </motion.article>
            ))}
          </div>

          {/* CTA below grid */}
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-center">
            <button className="inline-flex items-center gap-2 rounded-full bg-[#D10E63] px-7 py-3.5 text-sm font-semibold text-[#FBF9F3] transition-all hover:bg-[#B00B52] sm:text-base">
              {t.almaCta}
              <ChevronRight className="h-4 w-4" />
            </button>
            <a href="/alma" className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg border-2 border-[#D10E63]/30 bg-[#D10E63]/5 text-[#D10E63] hover:bg-[#D10E63]/10 hover:border-[#D10E63]/50 transition-all">
              {t.almaLearnMore}
              <ChevronRight className="h-3 w-3" />
            </a>
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
