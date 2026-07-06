'use client'

import { motion } from 'framer-motion'
import { ChevronRight, X } from 'lucide-react'
import { SectionHeader } from './section-header'

const T = {
  fr: {
    // Alma
    almaEyebrow: 'Mise en service guidée',
    almaTitle: 'Votre agent est prêt en moins de 15 minutes, ',
    almaTitleAccent: 'avec Alma.',
    almaText:
      "Alma, notre agent vocal, vous accompagne au téléphone pour créer et configurer votre premier Collaborateur IA. Vous ne configurez rien seul — elle vous guide, étape par étape.",
    almaSteps: [
      { n: '01', label: 'Choisir son identité' },
      { n: '02', label: 'Définir son rôle' },
      { n: '03', label: 'Sélectionner ses premières compétences' },
      { n: '04', label: 'Ajouter le contexte de votre entreprise' },
      { n: '05', label: 'Rédiger ses instructions de travail' },
      { n: '06', label: 'Tester une première mission' },
      { n: '07', label: 'Planifier une première tâche' },
    ],
    almaCta: 'Créer mon Collaborateur IA gratuit',
    almaMicrocopy: 'Sans carte bancaire.',

    // IA dispersée (dark)
    dispEyebrow: 'Le vrai problème',
    dispTitle: "L'IA ne devrait pas vivre dans un onglet.",
    dispIntro:
      "Vos équipes utilisent déjà l'IA tous les jours. Le problème n'est pas l'adoption — c'est la dispersion. Chacun dans son coin, sans mémoire ni méthode partagée. L'entreprise, elle, n'en garde presque rien.",
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
    almaEyebrow: 'Guided onboarding',
    almaTitle: 'Your agent is ready in under 15 minutes, ',
    almaTitleAccent: 'with Alma.',
    almaText:
      "Alma, our voice agent, guides you over the phone to create and configure your first AI Collaborator. You never configure anything alone — she walks you through it, step by step.",
    almaSteps: [
      { n: '01', label: 'Choose its identity' },
      { n: '02', label: 'Define its role' },
      { n: '03', label: 'Select its first skills' },
      { n: '04', label: 'Add your company context' },
      { n: '05', label: 'Write its work instructions' },
      { n: '06', label: 'Test a first mission' },
      { n: '07', label: 'Schedule a first task' },
    ],
    almaCta: 'Create my AI Collaborator for free',
    almaMicrocopy: 'No credit card.',

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
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          {/* Left — copy + Alma bubble */}
          <div>
            <SectionHeader
              eyebrow={t.almaEyebrow}
              title={t.almaTitle}
              titleAccent={t.almaTitleAccent}
            />

            <p className="mb-8 mt-4 text-lg leading-relaxed text-[#4E483F]">{t.almaText}</p>

            <button className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#D10E63] px-7 py-3.5 text-sm font-semibold text-[#FBF9F3] transition-all hover:bg-[#B00B52] sm:text-base">
              {t.almaCta}
              <ChevronRight className="h-4 w-4" />
            </button>
            <p className="text-xs text-[#857C6E]">{t.almaMicrocopy}</p>
          </div>

          {/* Right — numbered steps */}
          <div className="grid gap-3 sm:grid-cols-2">
            {t.almaSteps.map((step, i) => (
              <motion.div
                key={step.n}
                className={`flex items-center gap-4 rounded-2xl border border-[#DcD4C4] bg-[#FBF9F3] px-4 py-4 ${
                  i === t.almaSteps.length - 1 ? 'sm:col-span-2' : ''
                }`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1C1A17] text-sm font-bold text-[#FBF9F3]">
                  {step.n}
                </span>
                <span className="text-sm font-medium text-[#1C1A17]">{step.label}</span>
              </motion.div>
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
