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
  Globe,
  Image as ImageIcon,
  Mail,
  Megaphone,
  MessageSquare,
  Monitor,
  Phone,
  Plus,
  Terminal,
  UsersRound,
} from 'lucide-react'

const roleIcons = [Megaphone, Phone, MessageSquare, ClipboardList, Code2, BarChart3, UsersRound]
const accessIcons = [MessageSquare, Monitor, Terminal, Globe]
const modelIcons = [Bot, Brain, ImageIcon, Code2]

const content = {
  fr: {
    // Section: Vos Collaborateurs IA sont déjà prêts
    catEyebrow: 'VOS COLLABORATEURS IA SONT DÉJÀ PRÊTS',
    catTitle: 'Commencez avec un.',
    catAccent: "Ajoutez-en d'autres à mesure que votre entreprise grandit.",
    catRoles: ['Marketing', 'Ventes', 'Support', 'Administration', 'Développement', 'Finance', 'RH'],
    catRolesNote: 'Ou créez un Collaborateur IA spécialement conçu pour votre métier.',
    catCta: 'Découvrir les Collaborateurs IA',

    // Section: Tout ça reste dans votre entreprise
    proofTitle: 'Tout ça reste dans votre entreprise.',
    proofLead: 'Vous ne louez pas des capacités. Vous les possédez.',
    proofBody: "Ce que chaque Collaborateur IA apprend, crée, décide — tout reste chez vous. Sa mémoire est votre actif. Et il travaille avec les meilleurs modèles, partout où vous êtes.",
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
    emmaIntroStrong: 'Un membre à part entière.',
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
    finalEyebrow: 'PRÊT À PASSER À L\'ACTION',
    finalTitle: 'Vos Collaborateurs IA vous attendent.',
    finalBody: "Créez le vôtre en quelques minutes, confiez-lui une première mission et voyez votre capacité d'action grandir dès aujourd'hui.",
    finalCta: "Commencer l'essai gratuit",
    finalCtaSecondary: 'Analyse gratuite',
    finalFinePrint: 'Essai gratuit 7 jours · Déploiement en quelques minutes',
  },
  en: {
    catEyebrow: 'YOUR AI COLLABORATORS ARE ALREADY READY',
    catTitle: 'Start with one.',
    catAccent: 'Add more as your company grows.',
    catRoles: ['Marketing', 'Sales', 'Support', 'Administration', 'Development', 'Finance', 'HR'],
    catRolesNote: 'Or create an AI Collaborator built specifically for your field.',
    catCta: 'Discover AI Collaborators',

    proofTitle: 'All of it stays inside your company.',
    proofLead: 'You do not rent capabilities. You own them.',
    proofBody: 'What each AI Collaborator learns, creates, decides — everything stays with you. Its memory is your asset. And it works with the best models, wherever you are.',
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
    emmaIntroStrong: 'A full-fledged team member.',
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

    finalEyebrow: 'READY TO TAKE ACTION',
    finalTitle: 'Your AI Collaborators are waiting.',
    finalBody: 'Create yours in minutes, hand it a first mission and watch your capacity to act grow from today.',
    finalCta: 'Start free trial',
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
      {/* Collaborateurs prêts */}
      <section className="section-rule relative overflow-hidden bg-[#FBF9F3] py-24 md:py-32">
        <div aria-hidden="true" className="bg-editorial pointer-events-none absolute inset-0 opacity-35" />
        <Reveal className="editorial-shell relative">
          <div className="max-w-3xl">
            <Eyebrow className="mb-5">{t.catEyebrow}</Eyebrow>
            <h2 className="text-balance font-sf text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-[#1C1A17] md:text-5xl">{t.catTitle}</h2>
            <p className="mt-4 text-pretty font-sf text-2xl font-semibold leading-snug tracking-[-0.025em] text-[#D10E63] md:text-3xl">{t.catAccent}</p>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.catRoles.map((role, index) => {
              const Icon = roleIcons[index]
              return (
                <motion.div key={role} className="flex items-center gap-3 rounded-2xl border border-[#D8D0C2] bg-[#FBF9F3] px-5 py-4" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: (index % 4) * 0.05 }}>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#D8D0C2] text-[#D10E63]"><Icon className="h-5 w-5" strokeWidth={1.8} /></span>
                  <span className="font-sf text-lg font-bold tracking-[-0.02em] text-[#1C1A17]">{role}</span>
                </motion.div>
              )
            })}
            <motion.a href="/collaborateurs-ia" className="flex items-center gap-3 rounded-2xl border border-dashed border-[#D10E63] bg-[#D10E63]/[0.05] px-5 py-4 transition-colors hover:bg-[#D10E63]/[0.1]" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#D10E63] text-[#FBF9F3]"><Plus className="h-5 w-5" strokeWidth={2} /></span>
              <span className="text-pretty text-sm font-semibold leading-snug text-[#D10E63]">{t.catRolesNote}</span>
            </motion.a>
          </div>

          <a href="/collaborateurs-ia" className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-[#D10E63] transition-[gap] hover:gap-3">{t.catCta}<ArrowRight className="h-4 w-4" /></a>
        </Reveal>
      </section>

      {/* Propriété et accès */}
      <section className="section-rule bg-[#1C1A17] py-24 text-[#FBF9F3] md:py-32">
        <Reveal className="editorial-shell">
          <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Eyebrow className="mb-6 text-[#F0559B]">{lang === 'fr' ? 'VOTRE INTELLIGENCE' : 'YOUR INTELLIGENCE'}</Eyebrow>
              <h2 className="max-w-xl text-balance font-sf text-4xl font-semibold leading-[1.02] tracking-[-0.045em] md:text-6xl">{t.proofTitle}</h2>
              <p className="mt-7 max-w-lg font-sf text-xl font-semibold tracking-[-0.02em] text-[#F0559B]">{t.proofLead}</p>
              <p className="mt-5 max-w-lg text-pretty text-base leading-7 text-[#BDB5A9]">{t.proofBody}</p>
            </div>
            <div className="border-t border-[#FBF9F3]/15">
              {[{ title: t.accessTitle, items: t.access, icons: accessIcons }, { title: t.modelsTitle, items: t.models, icons: modelIcons }].map((group) => (
                <div key={group.title} className="border-b border-[#FBF9F3]/15 py-8">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#F0559B]">{group.title}</p>
                  <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {group.items.map((item, index) => { const Icon = group.icons[index]; return <li key={item} className="flex items-center gap-3 text-sm text-[#E7E0D5]"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#FBF9F3]/15"><Icon className="h-4 w-4 text-[#F0559B]" /></span>{item}</li> })}
                  </ul>
                </div>
              ))}
              <p className="pt-7 text-pretty text-sm leading-6 text-[#9E968A]">{t.proofNote}</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Emma */}
      <section className="section-rule relative overflow-hidden bg-[#FBF9F3] py-24 md:py-32">
        <div aria-hidden="true" className="bg-dots pointer-events-none absolute inset-0 opacity-40" />
        <Reveal className="editorial-shell relative grid items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-24">
          <div className="premium-shadow overflow-hidden rounded-[1.75rem] border border-[#D8D0C2] bg-[#FBF9F3]">
            <div className="flex items-center justify-between border-b border-[#E4DDCE] p-5 sm:p-6">
              <div className="flex items-center gap-4"><img src="/assistant-avatar.png" alt={t.emmaName} className="h-14 w-14 rounded-full object-cover" /><div><p className="font-sf text-xl font-bold text-[#1C1A17]">{t.emmaName}</p><p className="text-sm text-[#D10E63]">{t.emmaRole}</p></div></div>
              <span className="h-2.5 w-2.5 rounded-full bg-[#D10E63]" aria-label={lang === 'fr' ? 'Disponible' : 'Available'} />
            </div>
            <div className="p-5 sm:p-6">
              <p className="flex items-center gap-2 text-xs text-[#857C6E]"><Mail className="h-3.5 w-3.5" />{t.emmaEmail}</p>
              <div className="mt-5 flex flex-wrap gap-2">{t.emmaSkills.map((skill) => <span key={skill} className="rounded-full border border-[#D8D0C2] px-3 py-1.5 text-[11px] font-semibold text-[#6B6560]">{skill}</span>)}</div>
              <div className="mt-7 border-t border-[#E4DDCE]">
                {t.emmaMissions.map((mission, index) => { const Icon = index === 0 ? CalendarDays : BarChart3; return <div key={mission.label} className="flex gap-4 border-b border-[#E4DDCE] py-5 last:border-0"><Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#D10E63]" /><div><p className="text-xs font-bold uppercase tracking-[0.12em] text-[#1C1A17]">{mission.label}</p><p className="mt-2 text-pretty text-sm leading-6 text-[#6B6560]">{mission.body}</p></div></div> })}
              </div>
            </div>
          </div>

          <div>
            <Eyebrow className="mb-6">{lang === 'fr' ? 'UN VRAI MEMBRE DE L’ÉQUIPE' : 'A REAL TEAM MEMBER'}</Eyebrow>
            <h2 className="text-balance font-sf text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-[#1C1A17] md:text-6xl">{t.emmaTitle}</h2>
            <p className="mt-6 max-w-xl text-pretty text-base leading-7 text-[#6B6560] md:text-lg"><span className="font-bold text-[#1C1A17]">{t.emmaIntroStrong}</span> {t.emmaIntro}</p>
            <p className="mt-6 max-w-lg border-l-2 border-[#D10E63] pl-5 text-sm leading-6 text-[#857C6E]">{t.emmaNote}</p>
            <a href="/collaborateurs-ia/executive-assistant" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#D10E63] px-6 py-3 text-sm font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5">{t.emmaCta}<ArrowRight className="h-4 w-4" /></a>
          </div>
        </Reveal>
      </section>

      {/* Trois façons de commencer */}
      <section id="offres" className="section-rule relative overflow-hidden bg-[#F3EFE6] py-24 md:py-32">
        <div aria-hidden="true" className="bg-editorial pointer-events-none absolute inset-0 opacity-35" />
        <Reveal className="editorial-shell relative">
          <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <Eyebrow>{t.plansEyebrow}</Eyebrow>
            <h2 className="text-balance font-sf text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-[#1C1A17] md:text-5xl">{t.plansTitle}</h2>
          </div>
          <div className="mt-14 grid gap-4 lg:grid-cols-3">
            {t.plans.map((plan) => (
              <div key={plan.name} className={`relative flex flex-col rounded-[1.5rem] border bg-[#FBF9F3] p-7 md:p-8 ${'popular' in plan && plan.popular ? 'border-[#D10E63] premium-shadow lg:-translate-y-3' : 'border-[#D8D0C2]'}`}>
                {'popular' in plan && plan.popular && <span className="absolute right-7 top-8 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-[#D10E63]">{t.popularBadge}</span>}
                <p className="font-sf text-xl font-bold text-[#1C1A17]">{plan.name}</p>
                <p className="mt-2 text-sm font-medium text-[#D10E63]">{plan.audience}</p>
                <p className="mt-4 text-pretty text-sm leading-relaxed text-[#6B6560]">{plan.pitch}</p>
                <div className="mt-8 flex items-baseline gap-2">
                  <span className="font-sf text-4xl font-bold text-[#1C1A17] [letter-spacing:-0.03em]">{plan.price}</span>
                </div>
                <p className="mt-2 text-xs font-medium text-[#857C6E]">{plan.unit}</p>
                <a
                  href={plan.href}
                  className={`mt-8 inline-flex min-h-11 items-center justify-center rounded-full px-6 py-2.5 text-sm font-bold transition-all ${'popular' in plan && plan.popular ? 'bg-[#D10E63] text-[#FBF9F3] hover:-translate-y-0.5' : 'border border-[#C9C0B2] bg-[#FBF9F3] text-[#1C1A17] hover:border-[#D10E63] hover:text-[#D10E63]'}`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* CTA final */}
      <section className="section-rule bg-[#D10E63] py-24 text-center text-[#FBF9F3] md:py-32">
        <Reveal className="editorial-shell max-w-4xl">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#FBF9F3]/35"><UsersRound className="h-5 w-5" /></span>
          <p className="mt-7 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#FBF9F3]/75">{t.finalEyebrow}</p>
          <h2 className="mt-5 text-balance font-sf text-4xl font-semibold leading-[1] tracking-[-0.05em] md:text-6xl">{t.finalTitle}</h2>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-7 text-[#FBF9F3]/80 md:text-lg">{t.finalBody}</p>
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
