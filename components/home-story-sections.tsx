'use client'

import { motion } from 'framer-motion'
import {
  ArrowRight,
  Bot,
  Brain,
  CalendarDays,
  Check,
  Cloud,
  Database,
  FileText,
  Mail,
  MessageSquare,
  Phone,
  RefreshCw,
  RotateCcw,
  Server,
  ShieldCheck,
  Sparkles,
  UserRound,
  UsersRound,
  Wrench,
} from 'lucide-react'

const content = {
  fr: {
    breakTitle: "Les IA ne travaillent plus à côté de votre entreprise.",
    breakAccent: 'Elles travaillent dedans.',
    breakBody: [
      "Chaque Collaborateur IA possède une identité, ses propres outils et une mémoire qui grandit avec chaque mission. Propulsé par Hermes — l'agent autonome open source n°1 — il accède en permanence aux meilleurs modèles d'IA, apprend votre métier et collabore avec vos équipes.",
      'Chaque mission le rend plus performant. Chaque progrès appartient à votre entreprise.',
    ],
    moreEyebrow: 'TOUT CE QUI FAIT UN COLLABORATEUR',
    moreTitle: "Bien plus qu'un agent IA.",
    moreBody: "Un Collaborateur IA possède une identité, une mémoire, des outils et un rôle. Il apprend votre métier et travaille durablement avec vos équipes.",
    identity: ['Une identité', 'Une mémoire', 'Des outils', 'Un rôle'],
    teamEyebrow: 'UNE ÉQUIPE COMPLÈTE',
    teamTitle: 'Toute votre équipe IA. Au même endroit.',
    teamBody: "Des collaborateurs spécialisés pour chaque fonction. Chaque employé travaille avec son propre Collaborateur IA.",
    roles: ['Marketing', 'Ventes', 'Support', 'Finance', 'RH', 'Produit'],
    connectedEyebrow: 'INTÉGRÉS À VOS OUTILS',
    connectedTitle: 'Connectés à votre entreprise.',
    connectedBody: "Ils travaillent directement dans les outils que vos équipes utilisent déjà.",
    apps: ['Email', 'Calendrier', 'Drive', 'CRM', 'ERP', 'Téléphone', '3 000+ applications'],
    memoryEyebrow: 'UNE MÉMOIRE QUI GRANDIT',
    memoryTitle: 'Votre entreprise devient leur mémoire.',
    memoryBody: "Chaque interaction enrichit leur expérience et leur connaissance de votre entreprise.",
    memory: ['Conversations', 'Documents', 'Procédures', 'Expérience'],
    infraEyebrow: 'INFRASTRUCTURE MANAGÉE',
    infraTitle: "L'infrastructure invisible.",
    infraBody: "Vous vous concentrez sur votre entreprise. Nous nous occupons du reste.",
    infra: ['Cloud privé dédié', 'Infrastructure managée', 'Mises à jour continues', 'Sauvegardes automatiques', 'Sécurité', 'Contrôle et réversibilité'],
    hermesEyebrow: 'PROPULSÉS PAR HERMES',
    hermesTitle: "Hermes leur donne l'intelligence. Unitalk en fait des collaborateurs.",
    hermesBody: "Identité, mémoire, outils, organisation, gouvernance et infrastructure : tout ce dont ils ont besoin pour travailler dans votre entreprise.",
    company: 'Votre entreprise',
    finalTitle: "Prêt à faire entrer l'IA dans votre organigramme ?",
    finalSubtitle: 'Créez vos premiers Collaborateurs IA. En 2 minutes, votre équipe travaille 24h/24.',
    finalCta: 'Créer mon premier Collaborateur IA',
    finalFinePrint: "7 jours d'essai gratuit · Sans carte bancaire · Serveur IA privé",
  },
  en: {
    breakTitle: 'AI no longer works beside your company.',
    breakAccent: 'It works inside it.',
    breakBody: [
      'Every AI Collaborator has an identity, its own tools and a memory that grows with every mission. Powered by Hermes — the #1 open source autonomous agent — it always has access to the best AI models, learns your business and collaborates with your teams.',
      'Every mission makes it more capable. Every improvement belongs to your company.',
    ],
    moreEyebrow: 'EVERYTHING THAT MAKES A COLLABORATOR',
    moreTitle: 'Much more than an AI agent.',
    moreBody: 'An AI Collaborator has an identity, a memory, tools and a role. It learns your business and works alongside your teams over time.',
    identity: ['An identity', 'A memory', 'Tools', 'A role'],
    teamEyebrow: 'A COMPLETE TEAM',
    teamTitle: 'Your entire AI team. In one place.',
    teamBody: 'Specialized collaborators for every function. Every employee works with their own AI Collaborator.',
    roles: ['Marketing', 'Sales', 'Support', 'Finance', 'HR', 'Product'],
    connectedEyebrow: 'BUILT INTO YOUR TOOLS',
    connectedTitle: 'Connected to your business.',
    connectedBody: 'They work directly inside the tools your teams already use.',
    apps: ['Email', 'Calendar', 'Drive', 'CRM', 'ERP', 'Phone', '3,000+ applications'],
    memoryEyebrow: 'A MEMORY THAT GROWS',
    memoryTitle: 'Your company becomes their memory.',
    memoryBody: 'Every interaction enriches their experience and knowledge of your company.',
    memory: ['Conversations', 'Documents', 'Procedures', 'Experience'],
    infraEyebrow: 'MANAGED INFRASTRUCTURE',
    infraTitle: 'The invisible infrastructure.',
    infraBody: 'You focus on your business. We take care of the rest.',
    infra: ['Dedicated private cloud', 'Managed infrastructure', 'Continuous updates', 'Automatic backups', 'Security', 'Control and reversibility'],
    hermesEyebrow: 'POWERED BY HERMES',
    hermesTitle: 'Hermes gives them intelligence. Unitalk makes them collaborators.',
    hermesBody: 'Identity, memory, tools, organization, governance and infrastructure: everything they need to work inside your company.',
    company: 'Your company',
    finalTitle: 'Ready to bring AI into your org chart?',
    finalSubtitle: 'Create your first AI Collaborators. In 2 minutes, your team works around the clock.',
    finalCta: 'Create my first AI Collaborator',
    finalFinePrint: '7-day free trial · No credit card · Private AI server',
  },
} as const

const avatars = ['/assistant-avatar.png', '/alex-avatar.png', '/nina-avatar.png', '/marcus-avatar.png', '/elena-avatar.png', '/sophia-avatar.png']
const identityIcons = [UserRound, Brain, Wrench, Bot]
const appIcons = [Mail, CalendarDays, Cloud, Database, Server, Phone, Sparkles]
const memoryIcons = [MessageSquare, FileText, RefreshCw, Brain]
const infraIcons = [Server, Wrench, RefreshCw, Cloud, ShieldCheck, RotateCcw]

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

function Heading({ eyebrow, title, body, center = false }: { eyebrow?: string; title: string; body?: string; center?: boolean }) {
  return (
    <div className={center ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      {eyebrow && <Eyebrow className="mb-5">{eyebrow}</Eyebrow>}
      <h2 className="text-balance font-sf text-4xl font-semibold text-[#1C1A17] [letter-spacing:-0.04em] md:text-6xl">{title}</h2>
      {body && <p className="mt-5 text-pretty text-base leading-relaxed text-[#6B6560] md:text-lg">{body}</p>}
    </div>
  )
}

export function HomeStorySections({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = content[lang]
  return (
    <>
      <section className="overflow-hidden bg-[#1C1A17] px-5 py-24 text-[#FBF9F3] md:py-36">
        <Reveal className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-balance font-sf text-4xl font-semibold [letter-spacing:-0.04em] md:text-7xl">{t.breakTitle}</h2>
            <p className="mt-5 text-balance font-sf text-4xl font-semibold text-[#E0186A] [letter-spacing:-0.04em] md:text-7xl">{t.breakAccent}</p>
            <div className="mx-auto mt-8 flex max-w-2xl flex-col gap-4">
              {t.breakBody.map((paragraph) => (
                <p key={paragraph} className="text-pretty text-base leading-relaxed text-[#BDB5A9] md:text-lg">{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="mt-14 flex items-center justify-center gap-3 md:gap-7">
            {['ChatGPT', 'Claude', 'Gemini'].map((name, index) => <motion.div key={name} className="rounded-xl border border-[#FBF9F3]/15 bg-[#FBF9F3]/5 px-3 py-3 text-xs font-semibold text-[#BDB5A9] md:px-6 md:text-sm" animate={{ x: [0, index === 0 ? 8 : index === 2 ? -8 : 0, 0] }} transition={{ repeat: Infinity, duration: 4, delay: index * 0.3 }}>{name}</motion.div>)}
            <ArrowRight className="h-5 w-5 shrink-0 text-[#E0186A]" />
            <div className="rounded-2xl bg-[#E0186A] px-5 py-4 text-sm font-bold text-[#FBF9F3] shadow-xl md:px-8 md:text-base">Unitalk</div>
          </div>
        </Reveal>
      </section>

      <section className="bg-[#F3EFE6] px-5 py-24 md:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <Eyebrow className="mb-5">{t.moreEyebrow}</Eyebrow>
            <Heading title={t.moreTitle} body={t.moreBody} />
            <div className="mt-8 grid grid-cols-2 gap-3">
              {t.identity.map((item, index) => { const Icon = identityIcons[index]; return <div key={item} className="flex items-center gap-3 rounded-xl border border-[#DDD5CA] bg-[#FBF9F3] p-4 text-sm font-semibold"><Icon className="h-5 w-5 text-[#D10E63]" />{item}</div> })}
            </div>
          </Reveal>
          <Reveal className="rounded-3xl border border-[#DDD5CA] bg-[#FBF9F3] p-6 shadow-[0_24px_60px_rgba(28,26,23,0.08)] md:p-10">
            <div className="flex items-center gap-5 border-b border-[#DDD5CA] pb-7">
              <img src="/assistant-avatar.png" alt="Emma" className="h-20 w-20 rounded-full object-cover ring-4 ring-[#F3EFE6]" />
              <div><p className="text-2xl font-bold">Emma</p><p className="text-[#6B6560]">Executive Assistant</p><span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#D10E63]/10 px-3 py-1 text-xs font-bold text-[#D10E63]"><span className="h-1.5 w-1.5 rounded-full bg-[#D10E63]" />{lang === 'fr' ? 'Prête à travailler' : 'Ready to work'}</span></div>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-7">{t.identity.map((item, index) => { const Icon = identityIcons[index]; return <div key={item} className="rounded-xl bg-[#F3EFE6] p-4"><Icon className="mb-3 h-5 w-5 text-[#D10E63]" /><p className="text-sm font-semibold">{item}</p></div> })}</div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#FBF9F3] px-5 py-24 md:py-32">
        <Reveal className="mx-auto max-w-6xl"><Heading eyebrow={t.teamEyebrow} title={t.teamTitle} body={t.teamBody} center />
          <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">{t.roles.map((role, index) => <div key={role} className="rounded-2xl border border-[#DDD5CA] bg-[#F3EFE6] p-4 text-center"><img src={avatars[index]} alt="" className="mx-auto h-16 w-16 rounded-full object-cover" /><p className="mt-4 text-sm font-bold">{role}</p></div>)}</div>
        </Reveal>
      </section>

      <section className="bg-[#F3EFE6] px-5 py-24 md:py-32">
        <Reveal className="mx-auto max-w-6xl"><Heading eyebrow={t.connectedEyebrow} title={t.connectedTitle} body={t.connectedBody} center />
          <div className="relative mx-auto mt-14 max-w-4xl rounded-3xl border border-[#DDD5CA] bg-[#FBF9F3] p-6 md:p-10"><div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">{t.apps.map((app, index) => { const Icon = appIcons[index]; return <div key={app} className="flex min-h-28 flex-col items-center justify-center rounded-xl bg-[#F3EFE6] p-3 text-center"><Icon className="h-6 w-6 text-[#D10E63]" /><p className="mt-3 text-xs font-bold">{app}</p></div> })}</div></div>
        </Reveal>
      </section>

      <section className="bg-[#FBF9F3] px-5 py-24 md:py-32"><Reveal className="mx-auto max-w-6xl"><Heading eyebrow={t.memoryEyebrow} title={t.memoryTitle} body={t.memoryBody} center />
        <div className="mx-auto mt-14 grid max-w-4xl gap-4 md:grid-cols-4">{t.memory.map((item, index) => { const Icon = memoryIcons[index]; return <div key={item} className="rounded-2xl border border-[#DDD5CA] bg-[#F3EFE6] p-6"><Icon className="h-7 w-7 text-[#D10E63]" /><p className="mt-6 font-bold">{item}</p><div className="mt-5 flex gap-1">{Array.from({ length: index + 2 }).map((_, bar) => <span key={bar} className="h-1.5 flex-1 rounded-full bg-[#D10E63]" style={{ opacity: 0.25 + bar * 0.2 }} />)}</div></div> })}</div>
      </Reveal></section>

      <section className="bg-[#1C1A17] px-5 py-24 text-[#FBF9F3] md:py-32"><Reveal className="mx-auto max-w-6xl"><div className="mx-auto max-w-3xl text-center"><Eyebrow className="mb-5 text-[#E0186A]">{t.infraEyebrow}</Eyebrow><h2 className="text-balance font-sf text-4xl font-semibold [letter-spacing:-0.04em] md:text-6xl">{t.infraTitle}</h2><p className="mt-5 text-pretty text-[#BDB5A9] md:text-lg">{t.infraBody}</p></div><div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{t.infra.map((item, index) => { const Icon = infraIcons[index]; return <div key={item} className="flex items-center gap-4 rounded-2xl border border-[#FBF9F3]/15 bg-[#FBF9F3]/5 p-5"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E0186A]"><Icon className="h-5 w-5" /></span><p className="font-semibold">{item}</p><Check className="ml-auto h-4 w-4 text-[#E0186A]" /></div> })}</div></Reveal></section>

      <section className="bg-[#F3EFE6] px-5 py-24 md:py-32"><Reveal className="mx-auto max-w-6xl text-center"><Eyebrow>{t.hermesEyebrow}</Eyebrow><h2 className="mx-auto mt-5 max-w-4xl text-balance font-sf text-4xl font-semibold [letter-spacing:-0.04em] md:text-6xl">{t.hermesTitle}</h2><p className="mx-auto mt-6 max-w-2xl text-pretty leading-relaxed text-[#6B6560] md:text-lg">{t.hermesBody}</p><div className="mx-auto mt-14 flex max-w-3xl flex-col items-stretch gap-3 sm:flex-row sm:items-center"><div className="flex-1 rounded-2xl bg-[#1C1A17] p-6 font-bold text-[#FBF9F3]">Hermes</div><ArrowRight className="mx-auto h-5 w-5 rotate-90 text-[#D10E63] sm:rotate-0" /><div className="flex-1 rounded-2xl bg-[#D10E63] p-6 font-bold text-[#FBF9F3]">Unitalk</div><ArrowRight className="mx-auto h-5 w-5 rotate-90 text-[#D10E63] sm:rotate-0" /><div className="flex-1 rounded-2xl border border-[#DDD5CA] bg-[#FBF9F3] p-6 font-bold">{t.company}</div></div></Reveal></section>

      <section className="bg-[#D10E63] px-5 py-24 text-center text-[#FBF9F3] md:py-32"><Reveal className="mx-auto max-w-4xl"><UsersRound className="mx-auto h-10 w-10" /><h2 className="mt-6 text-balance font-sf text-4xl font-semibold [letter-spacing:-0.04em] md:text-6xl">{t.finalTitle}</h2><p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-[#FBF9F3]/85 md:text-lg">{t.finalSubtitle}</p><a href="/signup" className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#FBF9F3] px-7 py-3.5 font-bold text-[#1C1A17] transition-transform hover:-translate-y-0.5">{t.finalCta}<ArrowRight className="h-4 w-4" /></a><p className="mt-6 text-sm text-[#FBF9F3]/75">{t.finalFinePrint}</p></Reveal></section>
    </>
  )
}
