'use client'

import { motion } from 'framer-motion'
import {
  ArrowRight,
  BarChart3,
  Bot,
  Brain,
  CalendarDays,
  ClipboardList,
  Code2,
  FileText,
  Globe,
  Image as ImageIcon,
  Mail,
  Megaphone,
  MessageSquare,
  Mic,
  Monitor,
  Phone,
  Search,
  Terminal,
  UsersRound,
  Zap,
} from 'lucide-react'

const capabilityIcons = [Megaphone, Phone, MessageSquare, Code2, FileText, Mic, Search, ClipboardList, Zap]
const accessIcons = [MessageSquare, Monitor, Terminal, Globe]
const modelIcons = [Bot, Brain, ImageIcon, Code2]

const content = {
  fr: {
    // Section: Une nouvelle catégorie de travailleur
    catEyebrow: 'UNE NOUVELLE CATÉGORIE DE TRAVAILLEUR',
    catTitle: 'Des Collaborateurs IA qui analysent, planifient, exécutent',
    catAccent: 'et apprennent à vos côtés.',
    capabilities: [
      { title: 'Marketing & contenu', body: 'Gère vos réseaux sociaux, rédige des articles de blog, prépare des newsletters, planifie des campagnes.' },
      { title: 'Prospection & ventes', body: 'Qualifie des leads, prépare des devis, relance les prospects, met à jour votre CRM.' },
      { title: 'Support client', body: 'Répond à vos clients par email, chat ou téléphone, 24h/24, dans leur langue.' },
      { title: 'Développement', body: 'Code vos applications, intègre vos systèmes, corrige les bugs et livre des fonctionnalités.' },
      { title: 'Analyse & documents', body: 'Synthétise des rapports, extrait des données, rédige des propositions et des comptes rendus.' },
      { title: 'Notes vocales & réunions', body: 'Prend des notes vocales, assiste aux réunions, génère des comptes rendus et transcripts.' },
      { title: 'Recherche & veille', body: 'Surveille vos marchés, vos concurrents, détecte les opportunités et vous alerte.' },
      { title: 'Gestion & coordination', body: 'Planifie des rendez-vous, suit des projets, coordonne des équipes et des flux de travail.' },
      { title: 'Automatisation', body: 'Connecte vos outils, exécute des missions en autonomie, prend des initiatives et vous rend compte.' },
    ],
    catCta: 'Découvrir les Collaborateurs IA',

    // Section: Tout ça reste dans votre entreprise
    proofTitle: 'Tout ça reste dans votre entreprise.',
    proofLead: 'Vous ne louez pas des capacités. Vous les possédez.',
    proofBody: "Ce qu'il apprend, ce qu'il crée, ce qu'il décide — tout reste chez vous. Sa mémoire est votre actif. Et il travaille avec les meilleurs modèles, partout où vous êtes.",
    accessTitle: 'Comment y accéder',
    access: [
      'Messageries (WhatsApp, Telegram, Signal…)',
      'Application Desktop',
      'Terminal & API',
      'Interface Web',
    ],
    modelsTitle: 'Les modèles disponibles',
    models: [
      'Claude · ChatGPT · Gemini',
      'Mistral · Qwen · DeepSeek',
      'Images · Vidéo · Audio',
      'Code · Exécution locale',
    ],
    proofNote: 'À chaque mission son modèle — automatiquement. Pas besoin de choisir.',

    // Section: Emma
    emmaTitle: 'Emma, Executive Assistant.',
    emmaIntroStrong: 'Aux côtés de vos équipes.',
    emmaIntro: "Emma rejoint votre organisation avec un rôle, une mission, des droits d'accès et une identité. Vous lui confiez une mission, elle exécute.",
    emmaName: 'Emma',
    emmaRole: 'Executive Assistant',
    emmaEmail: 'emma@votre-entreprise.fr',
    emmaSkills: ['Planning', 'CRM', 'Export', 'Synthèse', 'Veille'],
    emmaMissions: [
      { label: 'Dernière mission', body: 'A organisé 14 réunions, coordonné 3 comités et préparé les comptes rendus — le tout en une matinée.' },
      { label: "Ce qu'elle fait chaque jour", body: 'Gère la boîte email, met à jour le CRM, prépare les reportings, alerte sur les sujets critiques.' },
    ],
    emmaCta: "Voir la fiche complète d'Emma",
    emmaNote: 'Chaque Collaborateur IA s\'adapte à ses missions. Les compétences se choisissent à la création et évoluent avec lui.',

    // Section: Trois façons de commencer
    plansEyebrow: 'TROIS FAÇONS DE COMMENCER',
    plansTitle: "Une porte d'entrée pour chaque organisation.",
    plans: [
      {
        name: 'Unitalk for Individuals',
        audience: 'Pour les indépendants et professions libérales',
        pitch: 'Faites le travail de plusieurs personnes, seul.',
        price: '30 €',
        unit: 'par mois · 1 collaborateur inclus',
        cta: "Voir l'offre",
        href: '/pricing',
      },
      {
        name: 'Unitalk for Teams',
        audience: 'Pour les équipes en croissance',
        pitch: 'Augmentez les capacités de votre équipe sans recruter au même rythme.',
        price: '25 €',
        unit: 'par collaborateur / mois',
        cta: "Voir l'offre",
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

    // Section: CTA final
    finalEyebrow: 'VOTRE AVANTAGE DURABLE',
    finalTitle: 'Votre intelligence vous appartient.',
    finalBody: "Votre intelligence d'entreprise — ses collaborateurs, ses clients, ses méthodes, son savoir-faire. Unitalk vous aide à la transformer en un avantage durable.",
    finalCta: 'Ajouter mon Collaborateur IA',
    finalCtaSecondary: 'Analyse gratuite',
    finalFinePrint: 'Essai gratuit 7 jours · Déploiement en quelques minutes',
  },
  en: {
    catEyebrow: 'A NEW CATEGORY OF WORKER',
    catTitle: 'AI Collaborators that analyze, plan, execute',
    catAccent: 'and learn alongside you.',
    capabilities: [
      { title: 'Marketing & content', body: 'Runs your social media, writes blog posts, prepares newsletters, plans campaigns.' },
      { title: 'Prospecting & sales', body: 'Qualifies leads, prepares quotes, follows up with prospects, updates your CRM.' },
      { title: 'Customer support', body: 'Answers your customers by email, chat or phone, 24/7, in their language.' },
      { title: 'Development', body: 'Codes your applications, integrates your systems, fixes bugs and ships features.' },
      { title: 'Analysis & documents', body: 'Summarizes reports, extracts data, drafts proposals and meeting notes.' },
      { title: 'Voice notes & meetings', body: 'Takes voice notes, attends meetings, generates minutes and transcripts.' },
      { title: 'Research & monitoring', body: 'Monitors your markets and competitors, spots opportunities and alerts you.' },
      { title: 'Management & coordination', body: 'Schedules meetings, tracks projects, coordinates teams and workflows.' },
      { title: 'Automation', body: 'Connects your tools, runs missions autonomously, takes initiative and reports back.' },
    ],
    catCta: 'Discover AI Collaborators',

    proofTitle: 'All of it stays inside your company.',
    proofLead: 'You do not rent capabilities. You own them.',
    proofBody: 'What it learns, what it creates, what it decides — everything stays with you. Its memory is your asset. And it works with the best models, wherever you are.',
    accessTitle: 'How to reach it',
    access: [
      'Messaging apps (WhatsApp, Telegram, Signal…)',
      'Desktop application',
      'Terminal & API',
      'Web interface',
    ],
    modelsTitle: 'Available models',
    models: [
      'Claude · ChatGPT · Gemini',
      'Mistral · Qwen · DeepSeek',
      'Images · Video · Audio',
      'Code · Local execution',
    ],
    proofNote: 'The right model for each mission — automatically. No need to choose.',

    emmaTitle: 'Emma, Executive Assistant.',
    emmaIntroStrong: 'Alongside your teams.',
    emmaIntro: 'Emma joins your organization with a role, a mission, access rights and an identity. You hand her a mission, she executes.',
    emmaName: 'Emma',
    emmaRole: 'Executive Assistant',
    emmaEmail: 'emma@your-company.com',
    emmaSkills: ['Planning', 'CRM', 'Export', 'Summary', 'Monitoring'],
    emmaMissions: [
      { label: 'Latest mission', body: 'Organized 14 meetings, coordinated 3 committees and prepared the minutes — all in one morning.' },
      { label: 'What she does every day', body: 'Manages the inbox, updates the CRM, prepares reporting, flags critical topics.' },
    ],
    emmaCta: "See Emma's full profile",
    emmaNote: 'Every AI Collaborator adapts to its missions. Skills are chosen at creation and evolve over time.',

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

    finalEyebrow: 'YOUR LASTING ADVANTAGE',
    finalTitle: 'Your intelligence belongs to you.',
    finalBody: 'Your company intelligence — its people, its clients, its methods, its know-how. Unitalk helps you turn it into a lasting advantage.',
    finalCta: 'Add my AI Collaborator',
    finalCtaSecondary: 'Free assessment',
    finalFinePrint: '7-day free trial · Deployed in minutes',
  },
} as const

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
      {/* Une nouvelle catégorie de travailleur */}
      <section className="relative overflow-hidden bg-[#FBF9F3] px-5 py-24 md:py-32">
        <div aria-hidden="true" className="bg-dots pointer-events-none absolute inset-0 opacity-[0.5]" />
        <Reveal className="relative mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow className="mb-5">{t.catEyebrow}</Eyebrow>
            <h2 className="text-balance font-sf text-4xl font-semibold text-[#1C1A17] [letter-spacing:-0.04em] md:text-5xl">
              {t.catTitle} <span className="text-[#D10E63]">{t.catAccent}</span>
            </h2>
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
            <a href="/collaborateurs-ia" className="inline-flex items-center gap-2 text-sm font-bold text-[#D10E63] transition-all hover:gap-3">
              {t.catCta}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </section>

      {/* Tout ça reste dans votre entreprise */}
      <section className="bg-[#F3EFE6] px-5 py-24 md:py-32">
        <Reveal className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance font-sf text-4xl font-semibold text-[#1C1A17] [letter-spacing:-0.04em] md:text-5xl">{t.proofTitle}</h2>
            <p className="mt-4 font-sf text-xl font-bold text-[#D10E63] [letter-spacing:-0.02em]">{t.proofLead}</p>
            <p className="mt-4 text-pretty text-base leading-relaxed text-[#6B6560] md:text-lg">{t.proofBody}</p>
          </div>

          <div className="mx-auto mt-14 grid max-w-3xl gap-5 md:grid-cols-2">
            <div className="rounded-3xl border border-[#DDD5CA] bg-[#FBF9F3] p-7">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#D10E63]">{t.accessTitle}</p>
              <ul className="mt-5 flex flex-col">
                {t.access.map((item, index) => {
                  const Icon = accessIcons[index]
                  return (
                    <li key={item} className="flex items-center gap-3 border-b border-[#EDE7DA] py-3 text-sm text-[#1C1A17] last:border-none">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#D10E63]/10 text-[#D10E63]"><Icon className="h-4 w-4" /></span>
                      {item}
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className="rounded-3xl border border-[#DDD5CA] bg-[#FBF9F3] p-7">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#D10E63]">{t.modelsTitle}</p>
              <ul className="mt-5 flex flex-col">
                {t.models.map((item, index) => {
                  const Icon = modelIcons[index]
                  return (
                    <li key={item} className="flex items-center gap-3 border-b border-[#EDE7DA] py-3 text-sm text-[#1C1A17] last:border-none">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#D10E63]/10 text-[#D10E63]"><Icon className="h-4 w-4" /></span>
                      {item}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-center text-sm text-[#857C6E]">{t.proofNote}</p>
        </Reveal>
      </section>

      {/* Emma */}
      <section className="relative overflow-hidden bg-[#FBF9F3] px-5 py-24 md:py-32">
        <div aria-hidden="true" className="bg-dots pointer-events-none absolute inset-0 opacity-[0.5]" />
        <Reveal className="relative mx-auto max-w-3xl text-center">
          <h2 className="text-balance font-sf text-4xl font-semibold text-[#1C1A17] [letter-spacing:-0.04em] md:text-5xl">{t.emmaTitle}</h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-[#6B6560] md:text-lg">
            <span className="font-bold text-[#1C1A17]">{t.emmaIntroStrong}</span> {t.emmaIntro}
          </p>

          <div className="mx-auto mt-12 overflow-hidden rounded-3xl border border-[#DDD5CA] bg-[#FBF9F3] text-left shadow-[0_24px_60px_rgba(28,26,23,0.1)]">
            <div className="flex items-center gap-4 bg-[#D10E63] p-6 text-[#FBF9F3] sm:p-7">
              <img src="/assistant-avatar.png" alt={t.emmaName} className="h-14 w-14 shrink-0 rounded-full object-cover ring-2 ring-[#FBF9F3]/40" />
              <div>
                <p className="font-sf text-xl font-bold">{t.emmaName}</p>
                <p className="text-sm text-[#FBF9F3]/85">{t.emmaRole}</p>
                <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-[#FBF9F3]/90"><Mail className="h-3.5 w-3.5" />{t.emmaEmail}</p>
              </div>
            </div>
            <div className="p-6 sm:p-7">
              <div className="flex flex-wrap gap-2">
                {t.emmaSkills.map((skill) => (
                  <span key={skill} className="rounded-full bg-[#D10E63]/10 px-3.5 py-1.5 text-xs font-semibold text-[#D10E63]">{skill}</span>
                ))}
              </div>
              <div className="mt-6 flex flex-col gap-4">
                {t.emmaMissions.map((mission, index) => {
                  const Icon = index === 0 ? CalendarDays : BarChart3
                  return (
                    <div key={mission.label} className="flex items-start gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F3EFE6] text-[#D10E63]"><Icon className="h-4 w-4" /></span>
                      <div>
                        <p className="text-sm font-bold text-[#1C1A17]">{mission.label}</p>
                        <p className="mt-0.5 text-pretty text-sm leading-relaxed text-[#6B6560]">{mission.body}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
              <a href="/collaborateurs-ia/executive-assistant" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#D10E63] px-6 py-3 text-sm font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5">
                {t.emmaCta}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
          <p className="mx-auto mt-8 max-w-xl text-pretty text-sm text-[#857C6E]">{t.emmaNote}</p>
        </Reveal>
      </section>

      {/* Trois façons de commencer */}
      <section className="relative overflow-hidden bg-[#F3EFE6] px-5 py-24 md:py-32">
        <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-[0.35]" />
        <Reveal className="relative mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow className="mb-5">{t.plansEyebrow}</Eyebrow>
            <h2 className="text-balance font-sf text-4xl font-semibold text-[#1C1A17] [letter-spacing:-0.04em] md:text-5xl">{t.plansTitle}</h2>
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

      {/* CTA final */}
      <section className="bg-[#D10E63] px-5 py-24 text-center text-[#FBF9F3] md:py-32">
        <Reveal className="mx-auto max-w-4xl">
          <UsersRound className="mx-auto h-10 w-10" />
          <p className="mt-6 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#FBF9F3]/80">{t.finalEyebrow}</p>
          <h2 className="mt-4 text-balance font-sf text-4xl font-semibold [letter-spacing:-0.04em] md:text-6xl">{t.finalTitle}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-[#FBF9F3]/85 md:text-lg">{t.finalBody}</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="/signup" className="inline-flex items-center gap-2 rounded-full bg-[#FBF9F3] px-7 py-3.5 font-bold text-[#1C1A17] transition-transform hover:-translate-y-0.5">
              {t.finalCta}
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href="/contact" className="inline-flex items-center gap-2 rounded-full border border-[#FBF9F3]/50 px-7 py-3.5 font-bold text-[#FBF9F3] transition-colors hover:bg-[#FBF9F3]/10">
              {t.finalCtaSecondary}
            </a>
          </div>
          <p className="mt-6 text-sm text-[#FBF9F3]/75">{t.finalFinePrint}</p>
        </Reveal>
      </section>
    </>
  )
}
