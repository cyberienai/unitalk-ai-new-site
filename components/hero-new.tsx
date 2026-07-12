'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, Calendar, Database, Zap, Check } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import CollaboratorForm from './collaborator-form'

function getInitials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

const T = {
  fr: {
    eyebrow: 'Votre équipe IA commence ici.',
    headline: 'Toute entreprise mérite ses propres',
    headlineAccent: ' Collaborateurs IA.',
    subheadline:
      "Ils répondent à vos clients, réalisent vos projets et apprennent chaque jour aux côtés de vos équipes.",
    summary:
      "Chaque collaborateur IA possède sa propre identité, sa mémoire, ses outils et travaille aux côtés de vos équipes.",
    featuresText: '1 collaborateur · 10 profils inclus',
    signature: "L'IA qui travaille avec votre organisation.",
    ctaPrimary: 'Obtenir mon collaborateur',
    ctaProofs1: [
      { label: 'Tout est inclus, dès le premier collaborateur.' },
    ],
    profileCount: 'Un collaborateur. Une identité.',
    soloTeam: '10 profils inclus. Une infinité de compétences.',
    trust: ['Sans engagement', 'Support en français', 'Vos données vous appartiennent'],
    example: {
      text: 'Exemple : Sophia gère la facturation et répond aux emails. Elle économise 15h par semaine.',
      icon: Zap,
    },
    ctaSecondary: 'Voir comment ça marche',
    sofiaTitle: 'Votre premier Collaborateur IA',
    sofiaName: 'Alex',
    sofiaRole: 'Assistant commercial',
    sofiaEmail: 'alex@votreentreprise.fr',
    sofiaPhone: 'Ligne dédiée',
    sofiaStatus: 'Prêt à travailler',
    sofiaProfileUrl: 'unitalk.ai/alex',
    sofiaStep: 'Étape 3 sur 7',
    sofiaBadge: 'vous guide, étape par étape.',
    sofiaCreateBtn: 'Activer',
    labelEmail: 'Email',
    labelPhone: 'Téléphone',
    labelCal: 'Calendrier',
    calValue: 'Connecté',
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
        profileUrl: 'unitalk.ai/alex',
        skills: 'Prospection LinkedIn, relance, CRM HubSpot',
        avatar: '/alex-avatar.png',
        example: 'Alex prospecte 50 leads par jour et relance automatiquement. Il génère 5 deals/mois.',
      },
      {
        id: 'sophia',
        name: 'Sophia',
        role: 'Responsable Support',
        profileUrl: 'unitalk.ai/sophia',
        skills: 'Support client, FAQ, escalade',
        avatar: '/sophia-avatar.png',
        example: 'Sophia gère la facturation et répond aux emails. Elle économise 15h par semaine.',
      },
      {
        id: 'marcus',
        name: 'Marcus',
        role: 'Gestionnaire Projets',
        profileUrl: 'unitalk.ai/marcus',
        skills: 'Planning, tracking, rappels',
        avatar: '/marcus-avatar.png',
        example: 'Marcus planifie les sprints et relance les tâches retardées. 0 deadline manquée.',
      },
      {
        id: 'elena',
        name: 'Elena',
        role: 'Responsable RH',
        profileUrl: 'unitalk.ai/elena',
        skills: 'Recrutement, onboarding, ressources humaines',
        avatar: '/elena-avatar.png',
        example: 'Elena sélectionne les candidats et onboarde les nouveaux. Elle économise 20h par semaine.',
      },
      {
        id: 'thomas',
        name: 'Thomas',
        role: 'Analyste Données',
        profileUrl: 'unitalk.ai/thomas',
        skills: 'Analyse, rapports, insights',
        avatar: '/thomas-avatar.png',
        example: 'Thomas génère des rapports automatiques et identifie les tendances. Insights en 2h au lieu de 8h.',
      },
      {
        id: 'nina',
        name: 'Nina',
        role: 'Responsable Marketing',
        profileUrl: 'unitalk.ai/nina',
        skills: 'Contenu, campagnes, engagement',
        avatar: '/nina-avatar.png',
        example: 'Nina crée et poste 3 contenus par jour. Engagement +40% en 1 mois.',
      },
      {
        id: 'designer',
        name: 'Lena',
        role: 'Graphiste',
        profileUrl: 'unitalk.ai/lena',
        skills: 'Design graphique, branding, visuels',
        avatar: '/designer-avatar.png',
        example: 'Lena produit 10 visuels par jour pour réseaux sociaux et blogs. Qualité constante.',
      },
      {
        id: 'motion',
        name: 'Jules',
        role: 'Motion Designer',
        profileUrl: 'unitalk.ai/jules',
        skills: 'Animation, vidéo, effets visuels',
        avatar: '/motion-avatar.png',
        example: 'Jules réalise des animations pour vidéos. Production 5x plus rapide.',
      },
      {
        id: 'automation',
        name: 'David',
        role: 'Développeur n8n',
        profileUrl: 'unitalk.ai/david',
        skills: 'Automatisations, intégrations, workflows',
        avatar: '/automation-avatar.png',
        example: 'David construit des workflows n8n. 20 automatisations déployées par mois.',
      },
      {
        id: 'meeting',
        name: 'Sophie',
        role: 'Assistant Réunions',
        profileUrl: 'unitalk.ai/sophie',
        skills: 'Notes vocales, transcription, résumés',
        avatar: '/assistant-avatar.png',
        example: 'Sophie transcrit vos réunions et en extrait décisions et actions. Compte-rendu prêt en 5 minutes.',
      },
    ],
  },
  en: {
    eyebrow: 'Your AI team starts here.',
    headline: 'Every business deserves its own',
    headlineAccent: ' AI Collaborators.',
    subheadline:
      'They answer your customers, deliver your projects and learn every day alongside your teams.',
    summary:
      'Each AI collaborator has its own identity, memory and tools, and works alongside your teams.',
    featuresText: '1 collaborator · 10 profiles included',
    signature: 'The AI that works with your organization.',
    ctaPrimary: 'Get my collaborator',
    ctaProofs1: [
      { label: 'Everything included, from the very first collaborator.' },
    ],
    profileCount: 'One collaborator. One identity.',
    soloTeam: '10 profiles included. Infinite skills.',
    trust: ['No commitment', 'Human support', 'Your data stays yours'],
    example: {
      text: 'Example: Sophia manages billing and emails. She saves 15 hours per week.',
      icon: Zap,
    },
    ctaSecondary: 'See how it works',
    sofiaTitle: 'Your first AI Collaborator',
    sofiaName: 'Alex',
    sofiaRole: 'Sales Assistant',
    sofiaEmail: 'alex@yourcompany.com',
    sofiaPhone: 'Dedicated line',
    sofiaStatus: 'Ready to work',
    sofiaProfileUrl: 'unitalk.ai/alex',
    sofiaStep: 'Step 3 of 7',
    sofiaBadge: 'guides you, step by step.',
    sofiaCreateBtn: 'Activate',
    labelEmail: 'Email',
    labelPhone: 'Phone',
    labelCal: 'Calendar',
    calValue: 'Connected',
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
        profileUrl: 'unitalk.ai/alex',
        skills: 'LinkedIn Prospecting, follow-up, CRM HubSpot',
        avatar: '/alex-avatar.png',
        example: 'Alex prospects 50 leads daily and auto-follows up. He generates 5 deals/month.',
      },
      {
        id: 'sophia',
        name: 'Sophia',
        role: 'Support Manager',
        profileUrl: 'unitalk.ai/sophia',
        skills: 'Customer support, FAQ, escalation',
        avatar: '/sophia-avatar.png',
        example: 'Sophia manages billing and handles emails. She saves 15 hours per week.',
      },
      {
        id: 'marcus',
        name: 'Marcus',
        role: 'Project Manager',
        profileUrl: 'unitalk.ai/marcus',
        skills: 'Planning, tracking, reminders',
        avatar: '/marcus-avatar.png',
        example: 'Marcus plans sprints and reminds on delays. Zero missed deadlines.',
      },
      {
        id: 'elena',
        name: 'Elena',
        role: 'HR Manager',
        profileUrl: 'unitalk.ai/elena',
        skills: 'Recruitment, onboarding, people management',
        avatar: '/elena-avatar.png',
        example: 'Elena screens candidates and onboards new hires. She saves 20 hours/week.',
      },
      {
        id: 'thomas',
        name: 'Thomas',
        role: 'Data Analyst',
        profileUrl: 'unitalk.ai/thomas',
        skills: 'Analysis, reporting, insights',
        avatar: '/thomas-avatar.png',
        example: 'Thomas auto-generates reports and spots trends. Insights in 2h instead of 8h.',
      },
      {
        id: 'nina',
        name: 'Nina',
        role: 'Marketing Manager',
        profileUrl: 'unitalk.ai/nina',
        skills: 'Content, campaigns, engagement',
        avatar: '/nina-avatar.png',
        example: 'Nina creates and posts 3 pieces daily. Engagement +40% in 1 month.',
      },
      {
        id: 'designer',
        name: 'Lena',
        role: 'Graphic Designer',
        profileUrl: 'unitalk.ai/lena',
        skills: 'Graphic design, branding, visuals',
        avatar: '/designer-avatar.png',
        example: 'Lena produces 10 visuals daily for socials and blogs. Consistent quality.',
      },
      {
        id: 'motion',
        name: 'Jules',
        role: 'Motion Designer',
        profileUrl: 'unitalk.ai/jules',
        skills: 'Animation, video, visual effects',
        avatar: '/motion-avatar.png',
        example: 'Jules delivers video animations. 5x faster production rate.',
      },
      {
        id: 'automation',
        name: 'David',
        role: 'n8n Developer',
        profileUrl: 'unitalk.ai/david',
        skills: 'Automations, integrations, workflows',
        avatar: '/automation-avatar.png',
        example: 'David builds n8n workflows. 20 automations deployed per month.',
      },
      {
        id: 'meeting',
        name: 'Sophie',
        role: 'Meeting Assistant',
        profileUrl: 'unitalk.ai/sophie',
        skills: 'Voice notes, transcription, summaries',
        avatar: '/assistant-avatar.png',
        example: 'Sophie transcribes your meetings and extracts decisions and action items. Summary ready in 5 minutes.',
      },
    ],
  },
}

const ease = [0.22, 1, 0.36, 1] as const

export function HeroNew({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = T[lang] as typeof T['fr']



  return (
    <section className="relative flex w-full flex-col justify-center overflow-x-clip bg-[#F3EFE6] pb-14 pt-24 sm:pb-20 sm:pt-28 lg:min-h-[100svh]">
      {/* Faint ink rule grid — same editorial backdrop as the solo hero */}
      <div
        aria-hidden="true"
        className="bg-grid animate-grid pointer-events-none absolute inset-0 opacity-20"
        style={{
          maskImage: 'radial-gradient(100% 70% at 50% 0%, #000 10%, transparent 65%)',
          WebkitMaskImage: 'radial-gradient(100% 70% at 50% 0%, #000 10%, transparent 65%)',
        }}
      />

      {/* Dynamic warm aurora — very subtle, keeps the paper feel alive */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-aurora absolute -left-24 top-8 h-[26rem] w-[26rem] rounded-full bg-[#D10E63]/8 blur-3xl" />
        <div className="animate-orb absolute right-[-6rem] top-1/3 h-80 w-80 rounded-full bg-[#E0A96D]/12 blur-3xl" />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-5 sm:px-6 lg:grid-cols-[1fr_460px] lg:items-center lg:gap-20 lg:px-8">
        {/* Left column — editorial value proposition */}
        <div className="flex min-w-0 max-w-2xl flex-col justify-center">
        <motion.p
          className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-[#D7CFC1] bg-[#F4EEE2] px-3.5 py-1.5 font-sans text-xs font-semibold leading-tight text-[#4E483F]"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease, delay: 0.05 }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#D10E63]" aria-hidden="true" />
          {t.eyebrow}
        </motion.p>

          <motion.h1
            className="font-sf mb-6 max-w-2xl font-bold text-[#1C1A17] text-balance"
            style={{ fontSize: 'clamp(2.5rem, 4.3vw, 4rem)', lineHeight: 1.02, letterSpacing: '-0.045em' }}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.06 }}
          >
            {t.headline}
            <span className="inline text-[#D10E63]">{t.headlineAccent}</span>
          </motion.h1>

          <motion.p
            className="font-sans max-w-xl border-l-2 border-[#D10E63] pl-5 text-base leading-relaxed text-[#1C1A17] sm:text-lg"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.14 }}
          >
            {t.subheadline}
          </motion.p>

        <motion.div
          className="mt-9 flex max-w-xl flex-col gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.28 }}
        >
          {/* Team preview — overlapping avatars double as social proof and product peek */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <div className="flex shrink-0 -space-x-3">
              {t.collaborators.slice(0, 6).map((c) => (
                <img
                  key={c.id}
                  src={c.avatar || '/placeholder.svg'}
                  alt={`${c.name}, ${c.role}`}
                  className="h-10 w-10 rounded-full border-2 border-[#F3EFE6] object-cover shadow-sm"
                />
              ))}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[#1C1A17]">{t.profileCount}</p>
              <p className="text-xs leading-relaxed text-[#6B6560]">{t.soloTeam}</p>
            </div>
          </div>

          {/* Trust badges — gray checkmarks by default until deployed */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#DDD5CA] pt-4">
            {t.trust.map((item) => (
              <span key={item} className="flex items-center gap-1.5 text-xs font-medium text-[#6B6560]">
                <Check className="h-3.5 w-3.5 shrink-0 text-[#B8B0A2]" strokeWidth={2.5} />
                {item}
              </span>
            ))}
          </div>
          </motion.div>
        </div>

        {/* Right column — collaborator creation form, vertically centered against the copy */}
        <div className="relative z-10 flex min-w-0 justify-center lg:justify-end">
          <div className="relative">
            {/* Warm magenta halo behind the card for depth */}
            <div
              aria-hidden="true"
              className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-[radial-gradient(60%_55%_at_50%_35%,rgba(209,14,99,0.18),transparent_72%)] blur-2xl"
            />

            <div className="relative z-10">
              <CollaboratorForm lang={lang} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
