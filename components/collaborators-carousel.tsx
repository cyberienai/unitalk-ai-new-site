'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, ChevronLeft, Mail, Phone, Calendar, Database, Zap, CheckCircle2 } from 'lucide-react'

const T = {
  fr: {
    title: 'Découvrez nos collaborateurs IA',
    subtitle: 'Chacun optimisé pour des rôles métier spécifiques',
    labelEmail: 'Email',
    labelPhone: 'Téléphone',
    labelCal: 'Calendrier',
    contactIcons: [
      { icon: Mail, label: 'Email' },
      { icon: Phone, label: 'Téléphone' },
      { icon: Calendar, label: 'Calendrier' },
    ],
    rows: [
      { icon: Database, label: 'Se souvient', value: 'De vos clients, votre historique et vos procédures' },
      { icon: Zap, label: 'Sait faire', value: '', dynamic: true },
    ],
    collaborators: [
      {
        id: 'alex',
        name: 'Alex',
        role: 'Assistant commercial',
        skills: 'Prospection LinkedIn, relance, CRM HubSpot',
        example: 'Alex prospecte 50 leads par jour et relance automatiquement. Il génère 5 deals/mois.',
      },
      {
        id: 'sophia',
        name: 'Sophia',
        role: 'Responsable Support',
        skills: 'Support client, FAQ, escalade',
        example: 'Sophia gère la facturation et répond aux emails. Elle économise 15h par semaine.',
      },
      {
        id: 'marcus',
        name: 'Marcus',
        role: 'Gestionnaire Projets',
        skills: 'Planning, tracking, rappels',
        example: 'Marcus planifie les sprints et relance les tâches retardées. 0 deadline manquée.',
      },
      {
        id: 'elena',
        name: 'Elena',
        role: 'Responsable RH',
        skills: 'Recrutement, onboarding, ressources humaines',
        example: 'Elena sélectionne les candidats et onboarde les nouveaux. Elle économise 20h par semaine.',
      },
      {
        id: 'thomas',
        name: 'Thomas',
        role: 'Analyste Données',
        skills: 'Analyse, rapports, insights',
        example: 'Thomas génère des rapports automatiques et identifie les tendances. Insights en 2h au lieu de 8h.',
      },
      {
        id: 'nina',
        name: 'Nina',
        role: 'Responsable Marketing',
        skills: 'Contenu, campagnes, engagement',
        example: 'Nina crée et poste 3 contenus par jour. Engagement +40% en 1 mois.',
      },
    ],
  },
  en: {
    title: 'Meet our AI collaborators',
    subtitle: 'Each optimized for specific business roles',
    labelEmail: 'Email',
    labelPhone: 'Phone',
    labelCal: 'Calendar',
    contactIcons: [
      { icon: Mail, label: 'Email' },
      { icon: Phone, label: 'Phone' },
      { icon: Calendar, label: 'Calendar' },
    ],
    rows: [
      { icon: Database, label: 'Remembers', value: 'Your clients, history and procedures' },
      { icon: Zap, label: 'Can do', value: '', dynamic: true },
    ],
    collaborators: [
      {
        id: 'alex',
        name: 'Alex',
        role: 'Sales Assistant',
        skills: 'LinkedIn Prospecting, follow-up, CRM HubSpot',
        example: 'Alex prospects 50 leads daily and auto-follows up. He generates 5 deals/month.',
      },
      {
        id: 'sophia',
        name: 'Sophia',
        role: 'Support Manager',
        skills: 'Customer support, FAQ, escalation',
        example: 'Sophia manages billing and handles emails. She saves 15 hours per week.',
      },
      {
        id: 'marcus',
        name: 'Marcus',
        role: 'Project Manager',
        skills: 'Planning, tracking, reminders',
        example: 'Marcus plans sprints and reminds on delays. Zero missed deadlines.',
      },
      {
        id: 'elena',
        name: 'Elena',
        role: 'HR Manager',
        skills: 'Recruitment, onboarding, people management',
        example: 'Elena screens candidates and onboards new hires. She saves 20 hours/week.',
      },
      {
        id: 'thomas',
        name: 'Thomas',
        role: 'Data Analyst',
        skills: 'Analysis, reporting, insights',
        example: 'Thomas auto-generates reports and spots trends. Insights in 2h instead of 8h.',
      },
      {
        id: 'nina',
        name: 'Nina',
        role: 'Marketing Manager',
        skills: 'Content, campaigns, engagement',
        example: 'Nina creates and posts 3 pieces daily. Engagement +40% in 1 month.',
      },
    ],
  },
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

const ease = [0.22, 1, 0.36, 1] as const

interface CollaboratorsCarouselProps {
  lang?: 'fr' | 'en'
}

export function CollaboratorsCarousel({ lang = 'fr' }: CollaboratorsCarouselProps) {
  const t = T[lang]
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  // Auto-scroll every 5 seconds, pause on hover
  useEffect(() => {
    if (isHovering) return
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % t.collaborators.length)
    }, 5000)
    return () => clearInterval(id)
  }, [isHovering, t.collaborators.length])

  const collab = t.collaborators[activeIndex]
  const femaleIds = ['sophia', 'elena', 'nina']
  const isFemale = femaleIds.includes(collab.id) && lang === 'fr'
  const statusText = isFemale ? 'Prête à travailler' : 'Ready to work'

  return (
    <section className="relative w-full bg-[#F3EFE6] px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          <h2 className="mb-4 text-3xl font-bold text-[#1C1A17] sm:text-4xl">{t.title}</h2>
          <p className="text-lg text-[#8A8175]">{t.subtitle}</p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          className="relative mx-auto max-w-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Card */}
          <div className="relative w-full overflow-hidden rounded-3xl border border-[#D10E63]/10 bg-white p-6 shadow-lg sm:p-8">
            {/* Identity */}
            <div className="relative mb-6 flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#D10E63] text-lg font-bold text-white">
                {getInitials(collab.name)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-2xl font-bold text-[#1C1A17]">{collab.name}</h3>
                  <span className="inline-flex items-center gap-1 rounded-lg border border-[#2E7D4F]/25 bg-[#2E7D4F]/10 px-2.5 py-1 text-xs font-medium text-[#2E7D4F]">
                    <CheckCircle2 className="h-3 w-3" />
                    {statusText}
                  </span>
                </div>
                <p className="text-sm text-[#8A8175]">{collab.role}</p>
              </div>
            </div>

            {/* Contact icons */}
            <div className="mb-5 flex items-center gap-2">
              {t.contactIcons.map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.label}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[#D10E63]/20 bg-[#D10E63]/[0.06] px-2 py-2"
                  >
                    <Icon className="h-3.5 w-3.5 text-[#D10E63]" />
                    <span className="text-[9px] font-semibold uppercase tracking-wide text-[#8A8175]">
                      {item.label}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Skills */}
            <div className="mb-6 space-y-3 border-t border-[#DDD5CA] pt-4">
              {t.rows.map((row) => {
                const Icon = row.icon
                const displayValue = row.dynamic ? collab.skills : row.value
                return (
                  <div key={row.label} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#D10E63]/15">
                      <Icon className="h-4 w-4 text-[#D10E63]" />
                    </span>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-[#8A8175]">{row.label}</p>
                      <p className="text-sm text-[#4E483F]">{displayValue}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Example */}
            <div className="rounded-lg border border-[#D10E63]/20 bg-[#D10E63]/10 p-4">
              <p className="text-sm font-medium text-[#4E483F]">{collab.example}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-between gap-4">
            <button
              onClick={() => setActiveIndex((i) => (i - 1 + t.collaborators.length) % t.collaborators.length)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D10E63]/30 bg-white hover:bg-[#D10E63]/10 transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5 text-[#D10E63]" />
            </button>

            <div className="flex flex-1 flex-wrap items-center justify-center gap-2">
              {t.collaborators.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2.5 rounded-full transition-all ${
                    idx === activeIndex ? 'w-8 bg-[#D10E63]' : 'w-2.5 bg-[#DDD5CA] hover:bg-[#D10E63]/50'
                  }`}
                  aria-label={`Show collaborator ${idx + 1}`}
                  aria-current={idx === activeIndex}
                />
              ))}
            </div>

            <button
              onClick={() => setActiveIndex((i) => (i + 1) % t.collaborators.length)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D10E63]/30 bg-white hover:bg-[#D10E63]/10 transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5 text-[#D10E63]" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
