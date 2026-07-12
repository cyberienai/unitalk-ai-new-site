'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, ChevronLeft, Mail, Phone, Calendar, Database, Zap, CheckCircle2, Unlock, Clock, FileText, MapPin, Gift, Users } from 'lucide-react'
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
    eyebrow: "COLLABORATEUR IA",
    headline: 'Unitalk. ',
    headlineAccent: 'Vous avez maintenant un vrai collaborateur IA.',
    subheadline:
      "Il retient tout de votre entreprise, crée ses compétences automatiquement, et travaille depuis vos outils — email, CRM, téléphone, calendrier.",
    featuresText: '1 agent · 10 profils · Démarrez seul, ajoutez votre équipe plus tard',
    signature: "L'IA qui travaille avec votre organisation.",
    ctaPrimary: 'Obtenir mon collaborateur',
    ctaProofs1: [
      { label: '1 agent · 10 profils · Démarrez seul, ajoutez votre équipe plus tard' },
    ],
    ctaProofs2: [
      { icon: MapPin, label: 'Hébergé en France' },
      { icon: Clock, label: 'Prêt en 5 min' },
      { icon: Unlock, label: 'Aucun engagement' },
      { icon: Gift, label: '7 jours gratuits' },
    ],
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
    eyebrow: 'AI COLLABORATOR',
    headline: 'Unitalk transforms AI agents into ',
    headlineAccent: 'real collaborators.',
    subheadline:
      'With a name, shared memory, skills. Give them a goal, they work 24/7.',
    featuresText: '1 agent · 10 profiles · Start solo, add your team later',
    signature: 'The AI that works with your organization.',
    ctaPrimary: 'Get my collaborator',
    ctaProofs1: [
      { label: '1 agent · 10 profiles · Start solo, add your team later' },
    ],
    ctaProofs2: [
      { icon: MapPin, label: 'Hosted in France' },
      { icon: Clock, label: 'Ready in 5 min' },
      { icon: Unlock, label: 'No commitment' },
      { icon: Gift, label: '7 days free' },
    ],
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
        className="bg-grid pointer-events-none absolute inset-0 opacity-20"
        style={{
          maskImage: 'radial-gradient(100% 70% at 50% 0%, #000 10%, transparent 65%)',
          WebkitMaskImage: 'radial-gradient(100% 70% at 50% 0%, #000 10%, transparent 65%)',
        }}
      />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-5 sm:px-6 lg:grid-cols-[1.2fr_1.1fr] lg:items-start lg:gap-16 lg:px-8 lg:before:absolute lg:before:inset-y-0 lg:before:left-1/2 lg:before:w-32 lg:before:bg-gradient-to-r lg:before:from-transparent lg:before:via-[#F3EFE6]/10 lg:before:to-transparent lg:before:pointer-events-none">
        {/* Left column — copy */}
        <div className="flex min-w-0 flex-col justify-center">
        <motion.div
          className="relative h-full flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
        >
          {/* Hero form image */}
          <img
            src="/images/hero-form.png"
            alt="Créer votre collaborateur IA"
            className="w-full max-w-lg rounded-2xl shadow-xl"
          />
        </motion.div>

          <motion.h1
            className="font-sf mb-6 font-bold text-[#1C1A17]"
            style={{ fontSize: 'clamp(2.2rem, 3.6vw, 3.3rem)', lineHeight: 1.1, letterSpacing: '-0.03em' }}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.06 }}
          >
            {t.headline}
            <span className="inline text-[#D10E63]">{t.headlineAccent}</span>
          </motion.h1>

          <motion.p
            className="mb-7 max-w-xl text-lg leading-relaxed text-[#4E483F] sm:text-xl"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.14 }}
          >
            {t.subheadline}
          </motion.p>

          {/* Manifesto as chips — a rolling highlight sweeps through the verbs */}


          <motion.div
            className="flex flex-col gap-3 sm:flex-row sm:items-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.26 }}
          >
            <button className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D10E63] px-7 py-3.5 text-sm font-semibold text-[#FBF9F3] shadow-sm transition-all hover:bg-[#B00B52] sm:text-base">
              {t.ctaPrimary}
              <ChevronRight className="h-4 w-4" />
            </button>
          </motion.div>

          {/* Line 1: Features text */}
          <motion.p
            className="mt-6 text-center text-sm font-medium text-[#6B6560] sm:mt-8 sm:text-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease, delay: 0.32 }}
          >
            {t.ctaProofs1[0].label}
          </motion.p>

          {/* Line 2: Proofs with icons */}
          <motion.ul
            className="mt-3 -mx-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-medium text-[#6B6560] sm:-mx-0 sm:mt-3 sm:flex-nowrap sm:gap-x-5 sm:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease, delay: 0.38 }}
          >
            {t.ctaProofs2.map((proof) => {
              const ProofIcon = proof.icon
              return (
                <li key={proof.label} className="inline-flex items-center gap-2 whitespace-nowrap">
                  {ProofIcon && <ProofIcon className="h-4 w-4 flex-shrink-0 text-[#D10E63]" />}
                  {proof.label}
                </li>
              )
            })}
          </motion.ul>


        </div>

        {/* Right column — Alex dark glass card, dipped lower to hook into the next section.
            Offset lives on this wrapper because framer-motion sets an inline transform on the card. */}
        <div className="relative z-10 flex min-w-0 justify-center mt-4 sm:mt-8 lg:mt-16 lg:justify-end lg:self-start">
          <CollaboratorForm lang={lang} />
        </div>
      </div>
    </section>
  )
}
