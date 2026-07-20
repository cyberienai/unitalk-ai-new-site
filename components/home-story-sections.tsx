'use client'

import { motion } from 'framer-motion'
import {
  ArrowRight,
  AudioLines,
  Brain,
  CalendarDays,
  ClipboardList,
  Code2,
  FileText,
  Mail,
  MessageSquare,
  Mic,
  Phone,
  Plug,
  Search,
  Target,
  UserRound,
  UsersRound,
  Zap,
} from 'lucide-react'
import { ChatMockup, WorkstationMockup } from './product-mockups'

const capabilityIcons = [Phone, MessageSquare, FileText, Search, Code2, Mic, ClipboardList, Zap, Brain]
const uniqueIcons = [Brain, Plug, UserRound]

const content = {
  fr: {
    // Section: Chatbot vs Collaborateur IA
    catEyebrow: 'UNE NOUVELLE CATÉGORIE',
    catTitle: '',
    catAccent: 'Collaborateurs IA.',
    catBody: "Pas un chatbot. Pas un assistant. Une nouvelle catégorie de travailleur.",
    capabilities: [
      { title: 'Prospection & ventes', body: 'Qualifie des leads, prépare des devis, relance les prospects, met à jour votre CRM.' },
      { title: 'Support client', body: 'Répond à vos clients par email, chat ou téléphone, 24h/24, dans leur langue.' },
      { title: 'Analyse & documents', body: 'Synthétise des rapports, extrait des données, rédige des propositions et des comptes rendus.' },
      { title: 'Recherche & veille', body: 'Surveille vos marchés, vos concurrents, détecte les opportunités et vous alerte.' },
      { title: 'Développement & design', body: 'Code, design, motion design. Participe aux revues UX avec transcription des échanges.' },
      { title: 'Notes vocales & réunions', body: 'Prend des notes vocales, assiste aux réunions, génère des comptes rendus et transcripts.' },
      { title: 'Gestion & coordination', body: 'Planifie des rendez-vous, suit des projets, coordonne des équipes et des flux de travail.' },
      { title: 'Automatisation', body: 'Connecte vos outils, exécute des missions en autonomie, prend des initiatives et vous rend compte.' },
      { title: 'Stratégie & conseil', body: 'Analyse vos données, propose des recommandations, prépare des décisions étayées.' },
    ],
    catCta: 'Découvrir les Collaborateurs IA',

    // Section: Ce qui rend un Collaborateur IA unique
    assetEyebrow: 'CE QUI LE REND UNIQUE',
    assetTitle: 'Ce qui rend un Collaborateur IA unique.',
    uniqueFeatures: [
      {
        title: "Il s'appuie sur les meilleurs modèles.",
        body: "Claude, ChatGPT, Gemini, et d'autres — celui qui convient le mieux à chaque mission, sans que vous ayez à choisir.",
      },
      {
        title: 'Il se connecte à tous vos outils.',
        body: 'CRM, email, calendrier, documentation, base de connaissance. Il travaille avec les applications que vous utilisez déjà.',
      },
      {
        title: 'Il possède sa propre identité.',
        body: 'Un nom, une voix, une mémoire, un espace de travail.',
      },
    ],
    assetNote: "Comme un vrai membre de l'équipe.",

    // Section: Trois façons de commencer
    plansEyebrow: 'TROIS FAÇONS DE COMMENCER',
    plansTitle: 'Une porte d\'entrée pour chaque organisation.',
    plans: [
      {
        name: 'Unitalk for Individuals',
        audience: 'Pour les indépendants et professions libérales',
        pitch: 'Faites le travail de plusieurs personnes, seul.',
        price: '30 €',
        unit: 'par mois · 1 collaborateur inclus',
        cta: 'Voir l\'offre',
        href: '/pricing',
      },
      {
        name: 'Unitalk for Teams',
        audience: 'Pour les équipes en croissance',
        pitch: 'Augmentez les capacités de votre équipe sans recruter au même rythme.',
        price: '25 €',
        unit: 'par collaborateur / mois',
        cta: 'Voir l\'offre',
        href: '/pricing',
        popular: true,
      },
      {
        name: 'Unitalk for Businesses',
        audience: 'Pour les organisations établies',
        pitch: "Construisez l'infrastructure d'intelligence de votre entreprise.",
        price: 'Sur devis',
        unit: 'Serveur dédié · Sur mesure',
        cta: 'Nous contacter',
        href: '/contact',
      },
    ],
    popularBadge: 'LE PLUS CHOISI',

    // Section: organigramme
    orgEyebrow: 'AUX CÔTÉS DE VOS ÉQUIPES',
    orgTitle: 'Chaque Collaborateur IA rejoint votre organisation.',
    orgBody: 'Avec un rôle, une mission, des droits d\'accès et une identité.',
    orgCardTitle: 'Votre organisation',
    orgPairs: [
      { human: 'Camille', dept: 'Employé · Ventes', ai: 'Alex', avatar: '/alex-avatar.png' },
      { human: 'Thomas', dept: 'Employé · Support', ai: 'Sophia', avatar: '/sophia-avatar.png' },
      { human: 'Léa', dept: 'Employé · Opérations', ai: 'Marcus', avatar: '/marcus-avatar.png' },
    ],
    employeeLabel: 'Employé',
    collaboratorLabel: 'Collaborateur IA',

    // Section: identité d'Emma
    idEyebrow: 'UNE IDENTITÉ COMPLÈTE',
    idTitle: 'Chaque Collaborateur IA possède sa propre identité.',
    idAccent: 'Comme Emma.',
    idBody: 'Elle dispose de tout ce qu\'il faut pour travailler comme un vrai membre de l\'équipe.',
    idName: 'Emma',
    idRole: 'Executive Assistant',
    idStatus: 'Prête à travailler',
    identity: [
      { title: 'Un email', body: 'Une adresse professionnelle pour échanger en interne et en externe.' },
      { title: 'Un calendrier', body: 'Elle planifie, gère son temps et coordonne les rendez-vous.' },
      { title: 'Un téléphone', body: 'Un numéro pour appeler ses collègues ou ses contacts.' },
      { title: 'Une voix', body: 'Elle parle naturellement, à l\'oral comme à l\'écrit.' },
      { title: 'Une mémoire', body: 'Chaque mission, chaque conversation enrichit sa connaissance.' },
      { title: 'Des compétences', body: 'Assistant, support, ventes, marketing, finance…' },
      { title: '3 000+ applications', body: 'Connectée aux outils que vous utilisez déjà au quotidien.' },
      { title: 'Des missions', body: 'Exécute en autonomie, prend des initiatives et vous rend compte.' },
    ],
    idFootnote: 'Vous pouvez lui parler directement ou lui confier une mission qu\'elle exécute sans supervision. Conversations et missions enrichissent la même mémoire. Le même actif.',

    // Section: CTA final
    finalEyebrow: 'VOTRE AVANTAGE DURABLE',
    finalTitle: 'Votre entreprise possède déjà une intelligence.',
    finalBody: 'Ses collaborateurs. Ses clients. Ses méthodes. Ses documents. Son savoir-faire. Unitalk vous aide à la transformer en un avantage durable.',
    finalCta: 'Créer mon Collaborateur IA',
    finalFinePrint: 'Analyse gratuite · Aucune carte bancaire · Déploiement en quelques minutes',
  },
  en: {
    catEyebrow: 'A NEW CATEGORY',
    catTitle: '',
    catAccent: 'AI Collaborators.',
    catBody: 'Not a chatbot. Not an assistant. A new category of worker.',
    capabilities: [
      { title: 'Prospecting & sales', body: 'Qualifies leads, prepares quotes, follows up with prospects, updates your CRM.' },
      { title: 'Customer support', body: 'Answers your customers by email, chat or phone, 24/7, in their language.' },
      { title: 'Analysis & documents', body: 'Summarizes reports, extracts data, drafts proposals and meeting notes.' },
      { title: 'Research & monitoring', body: 'Monitors your markets and competitors, spots opportunities and alerts you.' },
      { title: 'Development & design', body: 'Code, design, motion design. Joins UX reviews with transcripts of the discussions.' },
      { title: 'Voice notes & meetings', body: 'Takes voice notes, attends meetings, generates minutes and transcripts.' },
      { title: 'Management & coordination', body: 'Schedules meetings, tracks projects, coordinates teams and workflows.' },
      { title: 'Automation', body: 'Connects your tools, runs missions autonomously, takes initiative and reports back.' },
      { title: 'Strategy & advisory', body: 'Analyzes your data, proposes recommendations, prepares informed decisions.' },
    ],
    catCta: 'Discover AI Collaborators',

    assetEyebrow: 'WHAT MAKES IT UNIQUE',
    assetTitle: 'What makes an AI Collaborator unique.',
    uniqueFeatures: [
      {
        title: 'It runs on the best models.',
        body: 'Claude, ChatGPT, Gemini and others — whichever fits each mission best, without you having to choose.',
      },
      {
        title: 'It connects to all your tools.',
        body: 'CRM, email, calendar, documentation, knowledge base. It works with the apps you already use.',
      },
      {
        title: 'It has its own identity.',
        body: 'A name, a voice, a memory, a workspace.',
      },
    ],
    assetNote: 'Like a real member of the team.',

    plansEyebrow: 'THREE WAYS TO START',
    plansTitle: 'An entry point for every organization.',
    plans: [
      {
        name: 'Unitalk for Individuals',
        audience: 'For freelancers and independent professionals',
        pitch: 'Do the work of several people, on your own.',
        price: '€30',
        unit: 'per month · 1 collaborator included',
        cta: 'View plan',
        href: '/pricing',
      },
      {
        name: 'Unitalk for Teams',
        audience: 'For growing teams',
        pitch: 'Grow your team capabilities without hiring at the same pace.',
        price: '€25',
        unit: 'per collaborator / month',
        cta: 'View plan',
        href: '/pricing',
        popular: true,
      },
      {
        name: 'Unitalk for Businesses',
        audience: 'For established organizations',
        pitch: 'Build your company intelligence infrastructure.',
        price: 'Custom',
        unit: 'Dedicated server · Tailored',
        cta: 'Contact us',
        href: '/contact',
      },
    ],
    popularBadge: 'MOST CHOSEN',

    orgEyebrow: 'ALONGSIDE YOUR TEAMS',
    orgTitle: 'Every AI Collaborator joins your organization.',
    orgBody: 'With a role, a mission, access rights and an identity.',
    orgCardTitle: 'Your organization',
    orgPairs: [
      { human: 'Camille', dept: 'Employee · Sales', ai: 'Alex', avatar: '/alex-avatar.png' },
      { human: 'Thomas', dept: 'Employee · Support', ai: 'Sophia', avatar: '/sophia-avatar.png' },
      { human: 'Léa', dept: 'Employee · Operations', ai: 'Marcus', avatar: '/marcus-avatar.png' },
    ],
    employeeLabel: 'Employee',
    collaboratorLabel: 'AI Collaborator',

    idEyebrow: 'A COMPLETE IDENTITY',
    idTitle: 'Every AI Collaborator has its own identity.',
    idAccent: 'Like Emma.',
    idBody: 'She has everything she needs to work like a real member of the team.',
    idName: 'Emma',
    idRole: 'Executive Assistant',
    idStatus: 'Ready to work',
    identity: [
      { title: 'An email', body: 'A professional address to communicate internally and externally.' },
      { title: 'A calendar', body: 'She plans, manages her time and coordinates meetings.' },
      { title: 'A phone', body: 'A number to call her colleagues or contacts.' },
      { title: 'A voice', body: 'She speaks naturally, spoken and written.' },
      { title: 'A memory', body: 'Every mission, every conversation enriches her knowledge.' },
      { title: 'Skills', body: 'Assistant, support, sales, marketing, finance…' },
      { title: '3,000+ applications', body: 'Connected to the tools you already use every day.' },
      { title: 'Missions', body: 'Executes autonomously, takes initiative and reports back to you.' },
    ],
    idFootnote: 'You can talk to her directly or hand her a mission she executes without supervision. Conversations and missions enrich the same memory. The same asset.',

    finalEyebrow: 'YOUR LASTING ADVANTAGE',
    finalTitle: 'Your company already has intelligence.',
    finalBody: 'Its people. Its clients. Its methods. Its documents. Its know-how. Unitalk helps you turn it into a lasting advantage.',
    finalCta: 'Create my AI Collaborator',
    finalFinePrint: 'Free analysis · No credit card · Deployed in minutes',
  },
} as const

const identityIcons = [Mail, CalendarDays, Phone, AudioLines, Brain, Zap, Plug, Target]

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.55 }}>
      {children}
    </motion.div>
  )
}

function Eyebrow({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <p className={`font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#D10E63] ${className}`}>{children}</p>
}

export function HomeStorySections({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = content[lang]
  return (
    <>
      {/* Chatbot vs Collaborateur IA */}
      <section className="relative overflow-hidden bg-[#FBF9F3] px-5 py-24 md:py-32">
        <div aria-hidden="true" className="bg-dots pointer-events-none absolute inset-0 opacity-[0.5]" />
        <Reveal className="relative mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow className="mb-5">{t.catEyebrow}</Eyebrow>
            <h2 className="text-balance font-sf text-4xl font-semibold text-[#1C1A17] [letter-spacing:-0.04em] md:text-6xl">
              {t.catTitle}
            {t.catTitle ? ' ' : ''}
            <span className="text-[#D10E63]">{t.catAccent}</span>
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-[#6B6560] md:text-lg">{t.catBody}</p>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.capabilities.map((cap, index) => {
              const Icon = capabilityIcons[index]
              return (
                <motion.div
                  key={cap.title}
                  className="group rounded-3xl border border-[#DDD5CA] bg-[#F3EFE6] p-6 transition-colors hover:border-[#D10E63]/40 hover:bg-[#FBF9F3]"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (index % 3) * 0.08 }}
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#D10E63]/10 text-[#D10E63]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-sf text-lg font-bold text-[#1C1A17]">{cap.title}</h3>
                  <p className="mt-2 text-pretty text-sm leading-relaxed text-[#6B6560]">{cap.body}</p>
                </motion.div>
              )
            })}
          </div>

          <div className="mt-10 text-center">
            <a href="/collaborateurs-ia" className="inline-flex items-center gap-2 text-sm font-bold text-[#D10E63] hover:gap-3 transition-all">
              {t.catCta}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </section>

      {/* Ce qui rend un Collaborateur IA unique */}
      <section className="bg-[#1C1A17] px-5 py-24 text-[#FBF9F3] md:py-32">
        <Reveal className="mx-auto max-w-6xl">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <Eyebrow className="mb-5 text-[#E0186A]">{t.assetEyebrow}</Eyebrow>
              <h2 className="text-balance font-sf text-4xl font-semibold [letter-spacing:-0.04em] md:text-5xl">{t.assetTitle}</h2>
              <div className="mt-9 flex flex-col gap-7">
                {t.uniqueFeatures.map((feature, index) => {
                  const Icon = uniqueIcons[index]
                  return (
                    <div key={feature.title} className="flex items-start gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#E0186A]/15 text-[#E0186A]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="font-sf text-lg font-bold text-[#FBF9F3]">{feature.title}</h3>
                        <p className="mt-1.5 text-pretty text-base leading-relaxed text-[#BDB5A9]">{feature.body}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <ChatMockup lang={lang} />
          </div>
          <div className="mt-12 rounded-3xl border border-[#FBF9F3]/15 bg-[#FBF9F3]/5 p-7 text-center md:p-9">
            <p className="text-balance font-sf text-2xl font-semibold text-[#FBF9F3] [letter-spacing:-0.02em] md:text-3xl">{t.assetNote}</p>
          </div>
        </Reveal>
      </section>

      {/* Trois façons de commencer */}
      <section className="relative overflow-hidden bg-[#F3EFE6] px-5 py-24 md:py-32">
        <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-[0.35]" />
        <Reveal className="relative mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow className="mb-5">{t.plansEyebrow}</Eyebrow>
            <h2 className="text-balance font-sf text-4xl font-semibold text-[#1C1A17] [letter-spacing:-0.04em] md:text-6xl">{t.plansTitle}</h2>
          </div>
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {t.plans.map((plan) => (
              <div key={plan.name} className={`relative flex flex-col rounded-3xl border bg-[#FBF9F3] p-7 md:p-8 ${plan.popular ? 'border-[#D10E63] shadow-[0_24px_60px_rgba(209,14,99,0.14)]' : 'border-[#DDD5CA]'}`}>
                {plan.popular && <span className="absolute right-7 top-8 rounded-full bg-[#D10E63] px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#FBF9F3]">{t.popularBadge}</span>}
                <p className="font-sf text-xl font-bold text-[#1C1A17]">{plan.name}</p>
                <p className="mt-2 text-sm font-medium text-[#D10E63]">{plan.audience}</p>
                <p className="mt-4 text-pretty text-sm leading-relaxed text-[#6B6560]">{plan.pitch}</p>
                <div className="mt-8 flex items-baseline gap-2">
                  <span className="font-sf text-4xl font-bold text-[#1C1A17] [letter-spacing:-0.03em]">{plan.price}</span>
                </div>
                <p className="mt-2 text-xs font-medium text-[#857C6E]">{plan.unit}</p>
                <a
                  href={plan.href}
                  className={`mt-8 inline-flex min-h-11 items-center justify-center rounded-full px-6 py-2.5 text-sm font-bold transition-all ${plan.popular ? 'bg-[#D10E63] text-[#FBF9F3] hover:-translate-y-0.5' : 'border border-[#C9C0B2] bg-[#FBF9F3] text-[#1C1A17] hover:border-[#D10E63] hover:text-[#D10E63]'}`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Organigramme */}
      <section className="relative overflow-hidden bg-[#FBF9F3] px-5 py-24 md:py-32">
        <div aria-hidden="true" className="bg-dots pointer-events-none absolute inset-0 opacity-[0.5]" />
        <Reveal className="relative mx-auto max-w-6xl">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative order-2 lg:order-1">
              <div aria-hidden="true" className="absolute -inset-5 -z-10 rounded-[2.25rem] bg-[#D10E63]/[0.05] blur-2xl" />
              <div className="rounded-3xl border border-[#DDD5CA] bg-[#F3EFE6] p-5 shadow-[0_24px_60px_rgba(28,26,23,0.1)] sm:p-7">
                <div className="flex items-center justify-between border-b border-[#DDD5CA] pb-5">
                  <div>
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#D10E63]">Unitalk</p>
                    <p className="mt-1 text-lg font-bold text-[#1C1A17]">{t.orgCardTitle}</p>
                  </div>
                  <span className="rounded-full bg-[#D10E63]/10 px-3 py-1 text-xs font-bold text-[#D10E63]">3 + 3</span>
                </div>
                <div className="mt-5 flex flex-col gap-3">
                  {t.orgPairs.map((pair, index) => (
                    <motion.div
                      key={pair.human}
                      className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 rounded-2xl border border-[#E6DFD1] bg-[#FBF9F3] p-2.5 sm:gap-4 sm:p-3.5"
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: index * 0.12 }}
                    >
                      <div className="flex min-w-0 items-center gap-2.5">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EAE3D4] text-xs font-bold text-[#857C6E]">{pair.human.slice(0, 2).toUpperCase()}</span>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-[#1C1A17]">{pair.human}</p>
                          <p className="truncate text-[11px] text-[#6B6560]">{pair.dept}</p>
                        </div>
                      </div>
                      <div className="flex items-center" aria-hidden="true">
                        <span className="h-px w-2 bg-[#D10E63]/40 sm:w-4" />
                        <span className="h-1.5 w-1.5 rounded-full bg-[#D10E63]" />
                        <span className="h-px w-2 bg-[#D10E63]/40 sm:w-4" />
                      </div>
                      <div className="flex min-w-0 items-center gap-2.5">
                        <div className="relative shrink-0">
                          <img src={pair.avatar || "/placeholder.svg"} alt="" className="h-10 w-10 rounded-full object-cover ring-2 ring-[#D10E63]/20" />
                          <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#FBF9F3] bg-[#D10E63]" />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-[#1C1A17]">{pair.ai}</p>
                          <p className="truncate text-[11px] font-medium text-[#D10E63]">{t.collaboratorLabel}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <Eyebrow className="mb-5">{t.orgEyebrow}</Eyebrow>
              <h2 className="text-balance font-sf text-4xl font-semibold text-[#1C1A17] [letter-spacing:-0.04em] md:text-5xl">{t.orgTitle}</h2>
              <p className="mt-5 text-pretty text-base leading-relaxed text-[#6B6560] md:text-lg">{t.orgBody}</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Identité d'Emma */}
      <section className="bg-[#F3EFE6] px-5 py-24 md:py-32">
        <Reveal className="mx-auto max-w-6xl">
          <div className="grid items-center gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <Eyebrow className="mb-5">{t.idEyebrow}</Eyebrow>
              <h2 className="text-balance font-sf text-4xl font-semibold text-[#1C1A17] [letter-spacing:-0.04em] md:text-5xl">
                {t.idTitle} <span className="text-[#D10E63]">{t.idAccent}</span>
              </h2>
              <p className="mt-5 text-pretty text-base leading-relaxed text-[#6B6560] md:text-lg">{t.idBody}</p>
              <div className="mt-8 flex items-center gap-5 rounded-3xl border border-[#DDD5CA] bg-[#FBF9F3] p-5">
                <img src="/assistant-avatar.png" alt={t.idName} className="h-16 w-16 rounded-full object-cover ring-4 ring-[#F3EFE6]" />
                <div>
                  <p className="text-xl font-bold text-[#1C1A17]">{t.idName}</p>
                  <p className="text-sm text-[#6B6560]">{t.idRole}</p>
                  <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#D10E63]/10 px-3 py-1 text-xs font-bold text-[#D10E63]"><span className="h-1.5 w-1.5 rounded-full bg-[#D10E63]" />{t.idStatus}</span>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {t.identity.map((item, index) => {
                const Icon = identityIcons[index]
                return (
                  <div key={item.title} className="rounded-2xl border border-[#DDD5CA] bg-[#FBF9F3] p-5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1C1A17]"><Icon className="h-5 w-5 text-[#FBF9F3]" /></span>
                    <p className="mt-4 text-base font-bold text-[#1C1A17]">{item.title}</p>
                    <p className="mt-1.5 text-pretty text-sm leading-relaxed text-[#6B6560]">{item.body}</p>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="mx-auto mt-14 max-w-3xl">
            <WorkstationMockup lang={lang} />
          </div>
          <p className="mx-auto mt-12 max-w-3xl text-pretty text-center text-base leading-relaxed text-[#6B6560] md:text-lg">{t.idFootnote}</p>
        </Reveal>
      </section>

      {/* CTA final */}
      <section className="bg-[#D10E63] px-5 py-24 text-center text-[#FBF9F3] md:py-32">
        <Reveal className="mx-auto max-w-4xl">
          <UsersRound className="mx-auto h-10 w-10" />
          <p className="mt-6 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#FBF9F3]/80">{t.finalEyebrow}</p>
          <h2 className="mt-4 text-balance font-sf text-4xl font-semibold [letter-spacing:-0.04em] md:text-6xl">{t.finalTitle}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-[#FBF9F3]/85 md:text-lg">{t.finalBody}</p>
          <a href="/signup" className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#FBF9F3] px-7 py-3.5 font-bold text-[#1C1A17] transition-transform hover:-translate-y-0.5">
            {t.finalCta}
            <ArrowRight className="h-4 w-4" />
          </a>
          <p className="mt-6 text-sm text-[#FBF9F3]/75">{t.finalFinePrint}</p>
        </Reveal>
      </section>
    </>
  )
}
