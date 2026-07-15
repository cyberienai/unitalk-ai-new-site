'use client'

import { motion } from 'framer-motion'
import {
  ArrowRight,
  Bot,
  Brain,
  FileText,
  Laptop,
  MessageSquare,
  Monitor,
  RefreshCw,
  Terminal,
  ShieldCheck,
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
    connectedTitle: 'Connectés à votre entreprise.',
    connectedBody: "Ils travaillent directement dans les outils que vos équipes utilisent déjà.",
    channelsEyebrow: 'UN SEUL AGENT, PARTOUT À LA FOIS',
    channelsTitle: 'Accédez-y',
    channelsAccent: 'là où vous travaillez.',
    channelsBody: "Web, bureau, terminal ou messagerie : c'est le même agent, la même mémoire, les mêmes compétences. Vous changez d'écran, tout simplement.",
    channels: [
      { title: 'Apps de messagerie', body: 'WhatsApp, Telegram, Teams… Parlez à votre agent depuis votre poche, comme à un collègue.' },
      { title: 'Interface Web', body: 'La seule interface de chat unifiée pour piloter vos agents Hermes. Rien à installer, accessible partout.', badge: 'EXCLUSIVITÉ UNITALK' },
      { title: 'App Desktop', body: 'Une application native sur Mac, Windows et Linux, à portée de raccourci, intégrée à votre poste.' },
      { title: 'Terminal / CLI', body: 'Pour les équipes techniques : pilotez et scriptez votre agent en ligne de commande.' },
    ],
    logosEyebrow: 'DÉJÀ CONNECTÉ À VOS OUTILS — ET À 3 000 AUTRES',
    memoryEyebrow: 'UNE MÉMOIRE QUI GRANDIT',
    memoryTitle: 'Votre entreprise devient leur mémoire.',
    memoryBody: "Chaque interaction enrichit leur expérience et leur connaissance de votre entreprise.",
    memory: ['Conversations', 'Documents', 'Procédures', 'Expérience'],
    infraEyebrow: 'VOS DONNÉES, VOTRE CONTRÔLE',
    infraTitle: 'Vos données vous appartiennent.',
    infraAccent: 'Toujours.',
    infraBody: [
      'Vos Collaborateurs IA travaillent sur un serveur privé, isolé et sécurisé. Vous gardez le contrôle de vos données, de votre infrastructure et de votre mémoire d\'entreprise.',
      'Nous gérons le reste : mises à jour, sauvegardes, sécurité, conformité RGPD. Tout est inclus, vous n\'avez rien à faire.',
    ],
    infraNote: 'Aucun verrouillage. Vos données sont exportables à tout moment.',
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
    connectedTitle: 'Connected to your business.',
    connectedBody: 'They work directly inside the tools your teams already use.',
    channelsEyebrow: 'ONE AGENT, EVERYWHERE AT ONCE',
    channelsTitle: 'Reach it',
    channelsAccent: 'wherever you work.',
    channelsBody: "Web, desktop, terminal or messaging: it's the same agent, the same memory, the same skills. You just switch screens.",
    channels: [
      { title: 'Messaging apps', body: 'WhatsApp, Telegram, Teams… Talk to your agent from your pocket, like a colleague.' },
      { title: 'Web interface', body: 'The only unified chat interface to run your Hermes agents. Nothing to install, accessible everywhere.', badge: 'UNITALK EXCLUSIVE' },
      { title: 'Desktop app', body: 'A native app on Mac, Windows and Linux, one shortcut away, integrated into your machine.' },
      { title: 'Terminal / CLI', body: 'For technical teams: run and script your agent from the command line.' },
    ],
    logosEyebrow: 'ALREADY CONNECTED TO YOUR TOOLS — AND 3,000 MORE',
    memoryEyebrow: 'A MEMORY THAT GROWS',
    memoryTitle: 'Your company becomes their memory.',
    memoryBody: 'Every interaction enriches their experience and knowledge of your company.',
    memory: ['Conversations', 'Documents', 'Procedures', 'Experience'],
    infraEyebrow: 'YOUR DATA, YOUR CONTROL',
    infraTitle: 'Your data belongs to you.',
    infraAccent: 'Always.',
    infraBody: [
      'Your AI Collaborators run on a private, isolated and secure server. You keep control of your data, your infrastructure and your company memory.',
      'We handle the rest: updates, backups, security, GDPR compliance. Everything is included, with nothing for you to do.',
    ],
    infraNote: 'No lock-in. Your data is exportable at any time.',
    finalTitle: 'Ready to bring AI into your org chart?',
    finalSubtitle: 'Create your first AI Collaborators. In 2 minutes, your team works around the clock.',
    finalCta: 'Create my first AI Collaborator',
    finalFinePrint: '7-day free trial · No credit card · Private AI server',
  },
} as const

const avatars = ['/assistant-avatar.png', '/alex-avatar.png', '/nina-avatar.png', '/marcus-avatar.png', '/elena-avatar.png', '/sophia-avatar.png']
const identityIcons = [UserRound, Brain, Wrench, Bot]
const memoryIcons = [MessageSquare, FileText, RefreshCw, Brain]
const channelIcons = [MessageSquare, Monitor, Laptop, Terminal]
const logos = [
  { src: '/logos/zapier.svg', alt: 'Zapier' },
  { src: '/logos/google-calendar.svg', alt: 'Google Calendar' },
  { src: '/logos/whatsapp.svg', alt: 'WhatsApp' },
  { src: '/logos/telegram.svg', alt: 'Telegram' },
  { src: '/logos/discord.svg', alt: 'Discord' },
  { src: '/logos/zoom.svg', alt: 'Zoom' },
  { src: '/logos/google-drive.svg', alt: 'Google Drive' },
  { src: '/logos/dropbox.svg', alt: 'Dropbox' },
  { src: '/logos/notion.svg', alt: 'Notion' },
  { src: '/logos/mailchimp.svg', alt: 'Mailchimp' },
  { src: '/logos/shopify.svg', alt: 'Shopify' },
]

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
        <Reveal className="mx-auto max-w-6xl">
          <Eyebrow className="mb-5">{t.channelsEyebrow}</Eyebrow>
          <h2 className="max-w-4xl text-balance font-sf text-4xl font-semibold text-[#1C1A17] [letter-spacing:-0.04em] md:text-6xl">{t.channelsTitle} <span className="text-[#D10E63]">{t.channelsAccent}</span></h2>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-[#6B6560] md:text-lg">{t.channelsBody}</p>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.channels.map((channel, index) => {
              const Icon = channelIcons[index]
              const highlighted = 'badge' in channel
              return (
                <div key={channel.title} className={`relative flex flex-col rounded-2xl border bg-[#FBF9F3] p-6 ${highlighted ? 'border-[#D10E63] shadow-[0_18px_48px_rgba(209,14,99,0.14)]' : 'border-[#DDD5CA]'}`}>
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1C1A17]"><Icon className="h-6 w-6 text-[#FBF9F3]" /></span>
                  {highlighted && <span className="absolute right-6 top-8 rounded-full bg-[#D10E63] px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#FBF9F3]">{(channel as { badge: string }).badge}</span>}
                  <h3 className="mt-6 text-xl font-bold text-[#1C1A17]">{channel.title}</h3>
                  <p className="mt-3 text-pretty text-sm leading-relaxed text-[#6B6560]">{channel.body}</p>
                </div>
              )
            })}
          </div>
        </Reveal>
      </section>

      <section className="border-y border-[#DDD5CA] bg-[#FBF9F3] px-5 py-16">
        <Reveal className="mx-auto max-w-6xl text-center">
          <Eyebrow className="text-[#8A8378]">{t.logosEyebrow}</Eyebrow>
          <h2 className="mx-auto mt-5 max-w-3xl text-balance font-sf text-4xl font-semibold text-[#1C1A17] [letter-spacing:-0.04em] md:text-6xl">{t.connectedTitle}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-[#6B6560] md:text-lg">{t.connectedBody}</p>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
            {logos.map((logo) => (
              <span
                key={logo.alt}
                role="img"
                aria-label={logo.alt}
                title={logo.alt}
                className="h-8 w-8 bg-[#9A9384] transition-colors hover:bg-[#1C1A17]"
                style={{ WebkitMaskImage: `url(${logo.src})`, maskImage: `url(${logo.src})`, WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', WebkitMaskPosition: 'center', maskPosition: 'center', WebkitMaskSize: 'contain', maskSize: 'contain' }}
              />
            ))}
          </div>
        </Reveal>
      </section>

      <section className="bg-[#FBF9F3] px-5 py-24 md:py-32"><Reveal className="mx-auto max-w-6xl"><Heading eyebrow={t.memoryEyebrow} title={t.memoryTitle} body={t.memoryBody} center />
        <div className="mx-auto mt-14 grid max-w-4xl gap-4 md:grid-cols-4">{t.memory.map((item, index) => { const Icon = memoryIcons[index]; return <div key={item} className="rounded-2xl border border-[#DDD5CA] bg-[#F3EFE6] p-6"><Icon className="h-7 w-7 text-[#D10E63]" /><p className="mt-6 font-bold">{item}</p><div className="mt-5 flex gap-1">{Array.from({ length: index + 2 }).map((_, bar) => <span key={bar} className="h-1.5 flex-1 rounded-full bg-[#D10E63]" style={{ opacity: 0.25 + bar * 0.2 }} />)}</div></div> })}</div>
      </Reveal></section>

      <section className="bg-[#1C1A17] px-5 py-24 text-[#FBF9F3] md:py-32"><Reveal className="mx-auto max-w-4xl text-center"><Eyebrow className="mb-5 text-[#E0186A]">{t.infraEyebrow}</Eyebrow><h2 className="text-balance font-sf text-4xl font-semibold [letter-spacing:-0.04em] md:text-6xl">{t.infraTitle} <span className="text-[#E0186A]">{t.infraAccent}</span></h2><div className="mx-auto mt-8 flex max-w-2xl flex-col gap-4">{t.infraBody.map((paragraph) => <p key={paragraph} className="text-pretty text-base leading-relaxed text-[#BDB5A9] md:text-lg">{paragraph}</p>)}</div><div className="mx-auto mt-10 inline-flex items-center gap-3 rounded-full border border-[#FBF9F3]/15 bg-[#FBF9F3]/5 px-6 py-3"><ShieldCheck className="h-5 w-5 shrink-0 text-[#E0186A]" /><p className="text-sm font-semibold text-[#FBF9F3]">{t.infraNote}</p></div></Reveal></section>

      <section className="bg-[#D10E63] px-5 py-24 text-center text-[#FBF9F3] md:py-32"><Reveal className="mx-auto max-w-4xl"><UsersRound className="mx-auto h-10 w-10" /><h2 className="mt-6 text-balance font-sf text-4xl font-semibold [letter-spacing:-0.04em] md:text-6xl">{t.finalTitle}</h2><p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-[#FBF9F3]/85 md:text-lg">{t.finalSubtitle}</p><a href="/signup" className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#FBF9F3] px-7 py-3.5 font-bold text-[#1C1A17] transition-transform hover:-translate-y-0.5">{t.finalCta}<ArrowRight className="h-4 w-4" /></a><p className="mt-6 text-sm text-[#FBF9F3]/75">{t.finalFinePrint}</p></Reveal></section>
    </>
  )
}
