'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, Calendar, Database, Zap, Check } from 'lucide-react'

const T = {
  fr: {
    eyebrow: "L'IA entre dans votre organigramme.",
    headline: 'Chaque organisation aura ses collaborateurs IA.',
    headlineAccent: ' Ajoutez le vôtre.',
    subheadline:
      'Les Collaborateurs IA rejoignent votre organisation avec leur identité, leur intelligence et leur propre poste de travail numérique.',
    subheadlineSecond:
      'Ils travaillent avec vous, utilisent vos outils et créent des résultats concrets.',
    heroCta: 'Ajouter un Collaborateur IA',
    heroCtaSecondary: 'Découvrir les Collaborateurs IA',
    heroProofs: [
      'Premier Collaborateur IA avec Unitalk AI Work',
      'Aucune configuration complexe',
      'Prêt à travailler en quelques minutes',
    ],
    orgTitle: 'Votre organisation',
    employeeLabel: 'Employé',
    collaboratorLabel: 'Collaborateur IA',
    summary:
      "Chaque collaborateur IA possède sa propre identité, sa mémoire, ses outils et travaille aux côtés de vos équipes.",
    featuresText: '1 collaborateur · 10 profils inclus',
    signature: "L'IA qui travaille avec votre organisation.",
    ctaPrimary: 'Obtenir mon collaborateur',
    ctaProofs1: [
      { label: 'Tout est inclus, dès le premier collaborateur.' },
    ],
    profileCount: 'Vos nouveaux collaborateurs numériques',
    soloTeam: 'pour vendre, gérer, assister et développer votre entreprise 24h/24.',
    trust: ['Hébergé en France', 'Cloud privé dédié', 'Vos données vous appartiennent'],
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
    eyebrow: 'AI joins your org chart.',
    headline: 'Every organization will have its AI Collaborators.',
    headlineAccent: ' Add yours.',
    subheadline:
      'AI Collaborators join your organization with their own identity, intelligence and digital workstation.',
    subheadlineSecond:
      'They work with you, use your tools and create tangible results.',
    heroCta: 'Add an AI Collaborator',
    heroCtaSecondary: 'Discover AI Collaborators',
    heroProofs: [
      'Your first AI Collaborator with Unitalk AI Work',
      'No complex setup',
      'Ready to work in minutes',
    ],
    orgTitle: 'Your organization',
    employeeLabel: 'Employee',
    collaboratorLabel: 'AI Collaborator',
    summary:
      'Each AI collaborator has its own identity, memory and tools, and works alongside your teams.',
    featuresText: '1 collaborator · 10 profiles included',
    signature: 'The AI that works with your organization.',
    ctaPrimary: 'Get my collaborator',
    ctaProofs1: [
      { label: 'Everything included, from the very first collaborator.' },
    ],
    profileCount: 'Your new digital collaborators',
    soloTeam: 'to sell, manage, support and grow your business 24/7.',
    trust: ['Hosted in France', 'Dedicated private cloud', 'Your data stays yours'],
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
    <section className="relative flex min-h-[100svh] w-full items-center overflow-hidden bg-[#F3EFE6] pb-16 pt-24 sm:pb-20 sm:pt-28">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-20" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-5 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20 lg:px-8">
        <div className="flex min-w-0 max-w-2xl flex-col items-start">
          <motion.p
            className="mb-6 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#D10E63]"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease, delay: 0.05 }}
          >
            {t.eyebrow}
          </motion.p>

          <motion.h1
            className="font-sf max-w-3xl text-balance font-bold text-[#1C1A17]"
            style={{ fontSize: 'clamp(2.75rem, 5vw, 4.75rem)', lineHeight: 0.98, letterSpacing: '-0.05em' }}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.08 }}
          >
            {t.headline}
            <span className="text-[#D10E63]">{t.headlineAccent}</span>
          </motion.h1>

          <motion.div
            className="mt-7 flex max-w-xl flex-col gap-3"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease, delay: 0.16 }}
          >
            <p className="text-pretty font-sans text-base leading-relaxed text-[#4E483F] sm:text-lg">{t.subheadline}</p>
            <p className="text-pretty font-sans text-base leading-relaxed text-[#4E483F] sm:text-lg">{t.subheadlineSecond}</p>
          </motion.div>

          <motion.div
            className="mt-8 flex flex-col items-start gap-5"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease, delay: 0.24 }}
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="/signup"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#D10E63] px-6 py-3 text-center text-sm font-bold text-[#FBF9F3] shadow-[0_12px_30px_rgba(209,14,99,0.2)] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2"
              >
                {t.heroCta}
              </a>
              <a
                href="/collaborateurs-ia/roles"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#C9C0B2] bg-[#FBF9F3] px-6 py-3 text-center text-sm font-bold text-[#1C1A17] transition-colors hover:border-[#D10E63] hover:text-[#D10E63] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2"
              >
                {t.heroCtaSecondary}
              </a>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-[#6B6560]">
              {t.heroProofs.map((proof) => (
                <span key={proof} className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-[#D10E63]" strokeWidth={2.5} />
                  {proof}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="relative mx-auto w-full max-w-xl"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.18 }}
          aria-label={t.orgTitle}
        >
          <div className="overflow-hidden rounded-3xl border border-[#D7CFC1] bg-[#FBF9F3] shadow-[0_30px_80px_rgba(28,26,23,0.12)]">
            <video
              className="aspect-square w-full object-cover"
              src="/hero-video.mp4"
              autoPlay
              muted
              loop
              playsInline
              aria-label={t.orgTitle}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
