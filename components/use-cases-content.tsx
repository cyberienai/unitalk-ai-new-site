'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useT } from '@/lib/language-context'
import { ChevronRight } from 'lucide-react'
import { AlmaFace } from '@/components/alma-face'

type UseCaseKey = 'ecommerce' | 'saas' | 'services' | 'agency' | 'coaching' | 'consulting'

const USECASE_ORDER: UseCaseKey[] = ['ecommerce', 'saas', 'services', 'agency', 'coaching', 'consulting']

const USECASE_ICON: Record<UseCaseKey, React.ReactNode> = {
  ecommerce: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  ),
  saas: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  services: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  agency: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 3h-3V2h-2v1H8" />
    </svg>
  ),
  coaching: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  consulting: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
    </svg>
  ),
}

const USECASE_COLOR: Record<UseCaseKey, string> = {
  ecommerce: '#D10E63',
  saas: '#3E6DA8',
  services: '#C77A34',
  agency: '#2E7D4F',
  coaching: '#B4361C',
  consulting: '#4E483F',
}

type UseCase = {
  title: string
  desc: string
  benefits: string[]
}

export function UseCasesContent() {
  const [activeCase, setActiveCase] = useState<UseCaseKey>('ecommerce')

  const t = useT({
    fr: {
      eyebrow: 'Use Cases',
      menuLabel: 'Études de cas',
      mainQuestion: 'Quel est votre prochain collaborateur IA ?',
      mainSubtitle:
        'Découvrez comment les Collaborateurs IA Unitalk s\'adaptent à votre secteur d\'activité et transforment votre façon de travailler.',
      ctaTitle1: 'Vous ne trouvez pas votre secteur ? ',
      ctaTitle2: 'Alma vous écoute.',
      ctaDesc:
        'Décrivez-nous votre activité et votre défi. Alma conçoit un Collaborateur IA sur mesure pour vous.',
      ctaBtn: 'Créer mon collaborateur IA',
      useCases: {
        ecommerce: {
          title: 'E-commerce',
          desc: 'Gérez les commandes, le service client et la fidélisation en continu.',
          benefits: ['Gestion des commandes', 'Service client sans relâche', 'Relances panier abandonné', 'Recommandations produits'],
        },
        saas: {
          title: 'SaaS',
          desc: 'Onboarding clients, support technique et expansion au sein des comptes.',
          benefits: ['Onboarding assistant', 'Support technique', 'Upselling intelligent', 'Retention'],
        },
        services: {
          title: 'Services B2B',
          desc: 'Prospection, qualification des leads et suivi de pipeline.',
          benefits: ['Prospection automatisée', 'Qualification des leads', 'Suivi pipeline', 'Propositions commerciales'],
        },
        agency: {
          title: 'Agences Digitales',
          desc: 'Gestion de projets clients, reportings et suivi de tâches.',
          benefits: ['Gestion de projets', 'Reporting clients', 'Suivi de tâches', 'Communication'],
        },
        coaching: {
          title: 'Coaching & Formation',
          desc: 'Suivi des apprenants, planification des sessions et ressources.',
          benefits: ['Suivi apprenants', 'Planification sessions', 'Feedback automatisé', 'Ressources personnalisées'],
        },
        consulting: {
          title: 'Consulting',
          desc: 'Collecte d\'informations, analyse et synthèse de recommandations.',
          benefits: ['Collecte de données', 'Analyse', 'Synthèse rapports', 'Recommandations'],
        },
      },
    },
    en: {
      eyebrow: 'Use Cases',
      menuLabel: 'Case studies',
      mainQuestion: 'What\'s your next AI collaborator?',
      mainSubtitle:
        'Discover how Unitalk AI Collaborators adapt to your industry and transform the way you work.',
      ctaTitle1: 'Don\'t see your industry? ',
      ctaTitle2: 'Alma listens.',
      ctaDesc:
        'Tell us about your business and your challenge. Alma designs a custom AI Collaborator for you.',
      ctaBtn: 'Create my AI collaborator',
      useCases: {
        ecommerce: {
          title: 'E-commerce',
          desc: 'Manage orders, customer service and loyalty continuously.',
          benefits: ['Order management', 'Relentless customer service', 'Abandoned cart recovery', 'Product recommendations'],
        },
        saas: {
          title: 'SaaS',
          desc: 'Client onboarding, technical support and account expansion.',
          benefits: ['Onboarding assistant', 'Technical support', 'Intelligent upselling', 'Retention'],
        },
        services: {
          title: 'B2B Services',
          desc: 'Prospecting, lead qualification and pipeline tracking.',
          benefits: ['Automated prospecting', 'Lead qualification', 'Pipeline tracking', 'Sales proposals'],
        },
        agency: {
          title: 'Digital Agencies',
          desc: 'Client project management, reporting and task tracking.',
          benefits: ['Project management', 'Client reporting', 'Task tracking', 'Communication'],
        },
        coaching: {
          title: 'Coaching & Training',
          desc: 'Learner tracking, session planning and resources.',
          benefits: ['Learner tracking', 'Session planning', 'Automated feedback', 'Personalized resources'],
        },
        consulting: {
          title: 'Consulting',
          desc: 'Information gathering, analysis and recommendation synthesis.',
          benefits: ['Data collection', 'Analysis', 'Report synthesis', 'Recommendations'],
        },
      },
    },
  })

  return (
    <main className="w-full bg-[#F3EFE6]">
      {/* Hero intro */}
      <section className="w-full px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <motion.p
            className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#D10E63]"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t.eyebrow}
          </motion.p>
          <motion.h1
            className="font-sf mb-6 text-balance text-[2.5rem] font-bold leading-[1.1] text-[#1C1A17] sm:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.06 }}
          >
            {t.mainQuestion}
          </motion.h1>
          <motion.p
            className="text-lg leading-relaxed text-[#4E483F] sm:text-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.12 }}
          >
            {t.mainSubtitle}
          </motion.p>
        </div>
      </section>

      {/* Use Cases Menu */}
      <motion.section
        className="sticky top-0 z-40 w-full border-b border-[#D4CCBE] bg-[#F3EFE6]/95 px-5 py-4 backdrop-blur-sm sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#857C6E]">
            {t.menuLabel}
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {USECASE_ORDER.map((key) => {
              const useCase = t.useCases[key]
              const color = USECASE_COLOR[key]
              const isActive = activeCase === key

              return (
                <button
                  key={key}
                  onClick={() => {
                    setActiveCase(key)
                    const element = document.getElementById(`usecase-${key}`)
                    element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-white shadow-[0_4px_12px_rgba(209,14,99,0.1)]'
                      : 'bg-transparent hover:bg-[#FFFFFF]/50'
                  }`}
                  style={{
                    borderBottom: isActive ? `2px solid ${color}` : 'none',
                    color: isActive ? color : '#4E483F',
                  }}
                >
                  <span>{useCase.title}</span>
                </button>
              )
            })}
          </div>
        </div>
      </motion.section>

      {/* Use Cases Grid */}
      <section className="w-full px-5 pb-20 sm:px-6 sm:pb-28 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {USECASE_ORDER.map((key, index) => {
              const useCase = t.useCases[key]
              const color = USECASE_COLOR[key]
              const icon = USECASE_ICON[key]

              return (
                <motion.div
                  key={key}
                  id={`usecase-${key}`}
                  className="group flex flex-col gap-4 rounded-2xl border border-[#D4CCBE] bg-white p-6 transition-all hover:border-[#D10E63]/40 hover:shadow-[0_8px_24px_rgba(209,14,99,0.15)]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F3EFE6]" style={{ color }}>
                      {icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-bold text-[#1C1A17]">{useCase.title}</h3>
                    <p className="text-[15px] leading-relaxed text-[#4E483F]">{useCase.desc}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {useCase.benefits.map((benefit) => (
                      <span
                        key={benefit}
                        className="rounded-full bg-[#F3EFE6] px-3 py-1 text-xs font-medium text-[#4E483F]"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative w-full overflow-hidden bg-[#1C1A17] px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-[#D10E63]/10 blur-[120px]" />
          <div className="absolute -right-32 bottom-0 h-[600px] w-[600px] rounded-full bg-[#D10E63]/[0.07] blur-[140px]" />
        </div>

        <div className="relative mx-auto max-w-3xl text-center">
          <motion.h2
            className="mb-4 text-balance font-bold leading-tight text-[#C4BCAE]"
            style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
                {t.ctaTitle1}
                <span className="text-[#D10E63]">
                  <AlmaFace />
                  {t.ctaTitle2}
                </span>
          </motion.h2>
          <motion.p
            className="mb-8 text-lg leading-relaxed text-[#E7E1D6]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t.ctaDesc}
          </motion.p>
          <motion.a
            href="/decouvrir"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D10E63] px-8 py-4 text-base font-semibold text-[#FBF9F3] transition-colors hover:bg-[#B00B52]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {t.ctaBtn}
            <ChevronRight className="h-5 w-5" />
          </motion.a>
        </div>
      </section>
    </main>
  )
}
