'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, ChevronLeft, Mail, Phone, Calendar, Database, Zap, Cpu, CheckCircle2, CreditCard, Clock, FileText, MapPin, Gift } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

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
    eyebrow: "Le serveur privé de vos collaborateurs IA",
    headline: 'Unitalk. Vous avez maintenant ',
    headlineAccent: 'de vrais collaborateurs IA.',
    subheadline:
      'Un nom, une mémoire partagée, des compétences. Donnez-leur des objectifs. Ils travaillent seuls ou avec vous, 24h/24.',
    manifesto: ['Apprend', 'Se souvient', 'Collabore', 'Progresse'],
    signature: "L'IA qui travaille avec votre organisation.",
    ctaPrimary: 'Activer mon Collaborateur IA',
    ctaProofs: [
      { icon: Clock, label: 'Prêt à travailler en 5 min' },
      { icon: CreditCard, label: 'Aucun engagement' },
      { icon: Gift, label: '7 jours gratuits' },
      { icon: MapPin, label: 'Hébergé en France' },
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
      { icon: Database, label: 'Mémoire', value: 'Données, historique, contexte' },
      { icon: Zap, label: 'Compétences', value: 'Prospection LinkedIn, relance, CRM HubSpot' },
      { icon: Cpu, label: 'Modèles', value: 'ChatGPT, Claude, Gemini, Mistral' },
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
        example: 'Marcus planifie les sprints et relance les tâches retardées. 0 deadline manqué.',
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
        example: 'Sophie transcrit les réunions et crée des résumés. Actions en 5 minutes.',
      },
    ],
  },
  en: {
    eyebrow: 'The private server for your AI collaborators',
    headline: 'Unitalk transforms AI agents into ',
    headlineAccent: 'real collaborators.',
    subheadline:
      'With names, skills, shared memory. Give them objectives. They work alone or with your team, 24/7.',
    manifesto: ['It learns', 'It remembers', 'It collaborates', 'It improves'],
    signature: 'The AI that works with your organization.',
    ctaPrimary: 'Create my AI Collaborator for free',
    ctaProofs: [
      { icon: Clock, label: 'Ready to work in 5 min' },
      { icon: CreditCard, label: 'No commitment' },
      { icon: Gift, label: '7 days free' },
      { icon: MapPin, label: 'Hosted in France' },
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
      { icon: Database, label: 'Memory', value: 'Data, history, context' },
      { icon: Zap, label: 'Skills', value: 'LinkedIn Prospecting, follow-up, CRM HubSpot' },
      { icon: Cpu, label: 'Models', value: 'ChatGPT, Claude, Gemini, Mistral' },
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
        example: 'Sophie transcribes meetings and creates summaries. Actions in 5 minutes.',
      },
    ],
  },
}

const ease = [0.22, 1, 0.36, 1] as const

export function HeroNew({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = T[lang] as typeof T['fr']
  const [activeVerb, setActiveVerb] = useState(0)
  const [activeCollaborator, setActiveCollaborator] = useState(0)
  const [isHoveringCarousel, setIsHoveringCarousel] = useState(false)
  const chipsRef = useRef<HTMLDivElement>(null)
  const chipRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const id = setInterval(() => {
      setActiveVerb((i) => (i + 1) % t.manifesto.length)
    }, 2500)
    return () => clearInterval(id)
  }, [t.manifesto.length])

  // Auto-scroll the collaborators carousel every 4 seconds, pause on hover
  useEffect(() => {
    if (isHoveringCarousel) return
    const id = setInterval(() => {
      setActiveCollaborator((i) => (i + 1) % t.collaborators.length)
    }, 4000)
    return () => clearInterval(id)
  }, [isHoveringCarousel, t.collaborators.length])

  // Keep the highlighted verb in view on the horizontally scrollable mobile row,
  // so every chip is revealed as the highlight rolls through.
  useEffect(() => {
    const container = chipsRef.current
    const chip = chipRefs.current[activeVerb]
    if (!container || !chip) return
    if (container.scrollWidth <= container.clientWidth) return
    const target = chip.offsetLeft - (container.clientWidth - chip.offsetWidth) / 2
    container.scrollTo({ left: Math.max(0, target), behavior: 'smooth' })
  }, [activeVerb])

  return (
    <section className="relative flex w-full flex-col justify-center overflow-x-clip bg-[#F3EFE6] px-5 pb-14 pt-24 sm:px-6 sm:pb-20 sm:pt-28 lg:min-h-[100svh] lg:px-8">
      {/* Faint ink rule grid — same editorial backdrop as the solo hero */}
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 opacity-20"
        style={{
          maskImage: 'radial-gradient(100% 70% at 50% 0%, #000 10%, transparent 65%)',
          WebkitMaskImage: 'radial-gradient(100% 70% at 50% 0%, #000 10%, transparent 65%)',
        }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-16 lg:before:absolute lg:before:inset-y-0 lg:before:left-1/2 lg:before:w-32 lg:before:bg-gradient-to-r lg:before:from-transparent lg:before:via-[#F3EFE6]/10 lg:before:to-transparent lg:before:pointer-events-none">
        {/* Left column — copy */}
        <div className="flex min-w-0 flex-col justify-center">
          <motion.div
            className="mb-5 inline-flex w-fit items-center rounded-full border border-[#D10E63] bg-transparent px-4 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-[#D10E63]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            {t.eyebrow}
          </motion.div>

          <motion.h1
            className="font-sf mb-6 text-balance font-bold text-[#1C1A17]"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4.25rem)', lineHeight: 1.0, letterSpacing: '-0.03em' }}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.06 }}
          >
            {t.headline}
            <span className="text-[#D10E63]">{t.headlineAccent}</span>
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
            ref={chipsRef}
            className="mb-8 -mx-5 flex gap-1.5 overflow-x-auto px-5 py-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:py-0 relative after:absolute after:right-0 after:top-0 after:bottom-0 after:w-16 after:pointer-events-none after:bg-gradient-to-l after:from-[#F3EFE6] after:to-transparent sm:after:hidden"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
          >
            {t.manifesto.map((line, i) => {
              const isActive = i === activeVerb
              return (
                <motion.span
                  key={line}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease, delay: 0.3 + i * 0.12 }}
                  className="inline-flex shrink-0"
                >
                  <motion.span
                    ref={(el) => {
                      chipRefs.current[i] = el
                    }}
                    animate={{ scale: isActive ? 1.06 : 1 }}
                    transition={{ duration: 0.45, ease }}
                    className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-[#DcD4C4] bg-[#FBF9F3] px-2.5 py-1 text-sm font-medium text-[#1C1A17]"
                  >
                    <motion.span
                      animate={{ scale: isActive ? [1, 1.9, 1] : 1 }}
                      transition={{ duration: isActive ? 0.6 : 0.3, ease }}
                      className="h-1 w-1 rounded-full bg-[#D10E63]"
                    />
                    {line}
                  </motion.span>
                </motion.span>
              )
            })}
          </motion.div>

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

          <motion.ul
            className="mt-6 -mx-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-xl border border-[#D10E63]/15 bg-[#D10E63]/8 px-5 py-4 text-sm font-medium text-[#6B6560] sm:-mx-0 sm:mt-8 sm:flex-nowrap sm:gap-x-5 sm:border-none sm:bg-transparent sm:p-0 sm:justify-start sm:text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease, delay: 0.32 }}
          >
            {t.ctaProofs.map((proof) => {
              const ProofIcon = proof.icon
              return (
                <li key={proof.label} className="inline-flex items-center gap-2 whitespace-nowrap">
                  <ProofIcon className="h-4 w-4 flex-shrink-0 text-[#D10E63]" />
                  {proof.label}
                </li>
              )
            })}
          </motion.ul>


        </div>

        {/* Right column — Alex dark glass card, dipped lower to hook into the next section.
            Offset lives on this wrapper because framer-motion sets an inline transform on the card. */}
        <div className="relative z-10 flex min-w-0 justify-center mt-4 sm:mt-8 lg:mt-16 lg:self-start">
        <motion.div
          className="relative flex w-full items-center justify-center"
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.28 }}
        >
          {/* Glow behind card */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-6 rounded-[2rem] opacity-70 blur-2xl"
            style={{
              background:
                'radial-gradient(circle at 30% 20%, rgba(209,14,99,0.32), transparent 55%), radial-gradient(circle at 80% 90%, rgba(241,114,159,0.22), transparent 55%)',
            }}
          />

          <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-[#3A3530] p-4 shadow-2xl sm:p-6">
            {/* top sheen */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-24"
              style={{ background: 'radial-gradient(ellipse 60% 100% at 50% 0%, rgba(209,14,99,0.16), transparent)' }}
            />

            {/* header row with status top-right */}


            {/* identity - using active collaborator */}
            {(() => {
              const collab = t.collaborators[activeCollaborator]
              const femaleIds = ['sophia', 'elena', 'nina', 'designer', 'meeting']
              const status =
                lang === 'fr' && femaleIds.includes(collab.id)
                  ? 'Prête à travailler'
                  : t.sofiaStatus
              return (
                <div className="relative mb-6 flex items-center gap-4">
                  <div
                    aria-label={collab.name}
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#D10E63] text-lg font-bold text-white ring-1 ring-white/15"
                  >
                    {getInitials(collab.name)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-2xl font-bold leading-tight text-[#F7F4EE]">{collab.name}</h2>
                      <span className="inline-flex items-center gap-1 rounded-lg border border-[#2E7D4F]/25 bg-[#2E7D4F]/10 px-2.5 py-1 text-xs font-medium text-[#8FCBA6]">
                        <CheckCircle2 className="h-3 w-3 text-[#4F9E6E]" />
                        {status}
                      </span>
                    </div>
                    <p className="text-sm text-[#B8B0A2]">{collab.role}</p>
                    <a
                      href={`https://${collab.profileUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[9px] font-semibold uppercase tracking-wide text-[#8A8175] hover:text-[#D10E63] transition-colors"
                    >
                      {collab.profileUrl}
                    </a>
                  </div>
                </div>
              )
            })()}

            {/* contact icons row */}
            <div className="relative mb-5 flex items-center gap-2">
              {t.contactIcons.map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.label}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-white/5 bg-white/[0.03] px-2 py-2"
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0 text-[#F1729F]" />
                    <span className="text-[9px] font-semibold uppercase tracking-wide text-[#8A8175]">
                      {item.label}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* capability rows */}
            <div className="relative mb-4 space-y-3.5 border-t border-white/[0.06] pt-4">
              {t.rows.map((row) => {
                const Icon = row.icon
                // Use collaborator's skills for the Compétences/Skills row
                const displayValue = row.label === 'Compétences' || row.label === 'Skills' 
                  ? t.collaborators[activeCollaborator].skills 
                  : row.value
                return (
                  <div key={row.label} className="flex items-start gap-3">
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#D10E63]" />
                    <div className="space-y-0.5">
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-[#8A8175]">
                        {row.label}
                      </p>
                      <p className="text-sm text-[#E7E1D6]">{displayValue}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* personalized example */}
            <div className="mb-6 rounded-lg border border-[#D10E63]/20 bg-[#D10E63]/10 p-4">
              <p className="text-sm font-medium leading-relaxed text-[#E7E1D6]">
                {t.collaborators[activeCollaborator].example}
              </p>
            </div>



            {/* carousel indicators + buttons — below the card */}
            <div
              className="relative mt-6 flex items-center justify-between gap-2"
              onMouseEnter={() => setIsHoveringCarousel(true)}
              onMouseLeave={() => setIsHoveringCarousel(false)}
            >
              <button
                onClick={() => setActiveCollaborator((prev) => (prev - 1 + t.collaborators.length) % t.collaborators.length)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#D10E63]/30 bg-[#D10E63]/10 text-[#8A8175] hover:bg-[#D10E63]/20 hover:text-[#D10E63] transition-all"
                aria-label="Previous collaborator"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="flex flex-1 flex-wrap items-center justify-center gap-x-0.5 gap-y-1">
                {t.collaborators.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveCollaborator(idx)}
                    className="group flex h-9 w-6 items-center justify-center"
                    aria-label={`Show collaborator ${idx + 1}`}
                    aria-current={idx === activeCollaborator}
                  >
                    <span
                      className={`h-2.5 rounded-full transition-all ${
                        idx === activeCollaborator
                          ? 'w-6 bg-[#D10E63]'
                          : 'w-2.5 bg-[#DcD4C4] group-hover:bg-[#857C6E]'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <button
                onClick={() => setActiveCollaborator((prev) => (prev + 1) % t.collaborators.length)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#D10E63]/30 bg-[#D10E63]/10 text-[#8A8175] hover:bg-[#D10E63]/20 hover:text-[#D10E63] transition-all"
                aria-label="Next collaborator"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
        </div>
      </div>
    </section>
  )
}
