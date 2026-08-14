'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { Check, ArrowRight, ShieldCheck, Mail, Calendar, Phone, Eye, Database, Share2, Globe, Heart, Fingerprint, Laptop, Terminal, MessageSquare, Cpu, Lock, FileKey2, ShieldAlert, Sparkles, Video, Code, Mic, MessagesSquare, Target, Megaphone } from 'lucide-react'
import { Kicker } from '@/components/home/section-kicker'
import { PricingConfigurator } from './pricing-configurator'
import { useLanguage } from '@/lib/language-context'

const ease = [0.22, 1, 0.36, 1] as const

const NATIVE_PROFILES = {
  fr: [
    {
      icon: Target,
      name: 'Commercial IA (Sales)',
      desc: 'Recherche de prospects ciblés, campagnes de cold emailing, relances régulières, qualification de leads et synchronisation de votre CRM.',
    },
    {
      icon: Megaphone,
      name: 'Responsable Marketing IA',
      desc: 'Rédaction de newsletters, planification et publication sur les réseaux sociaux, optimisation SEO et création de campagnes d’acquisition.',
    },
    {
      icon: Database,
      name: 'Responsable CRM IA',
      desc: 'Mise à jour automatique de vos fiches clients, détection d’opportunités et relances de comptes. Connecté à Twenty (nécessite le serveur IA privé Unitalk).',
    },
    {
      icon: Code,
      name: 'Développeur Front-End IA',
      desc: 'Création d’interfaces réactives, écriture de code React/Tailwind, correction de bugs et intégration de maquettes Figma.',
    },
    {
      icon: Sparkles,
      name: 'Graphiste IA',
      desc: 'Création d’illustrations, bannières publicitaires, retouches d’images et déclinaisons de chartes graphiques.',
    },
    {
      icon: Video,
      name: 'Motion Designer IA',
      desc: 'Production et montage de vidéos courtes pour vos réseaux, sous-titres animés et animations graphiques.',
    },
    {
      icon: Mic,
      name: 'Prise de notes vocales',
      desc: 'Transcription automatique et instantanée de vos dictées, mémos vocaux d’idées et enregistrements en comptes rendus structurés.',
    },
    {
      icon: MessagesSquare,
      name: 'Assistant de meeting',
      desc: 'Présence discrète lors de vos réunions Teams/Zoom/Google Meet, prise de notes en direct, résumé des actions et synthèse des décisions.',
    },
  ],
  en: [
    {
      icon: Target,
      name: 'Sales AI',
      desc: 'Targeted lead research, cold emailing campaigns, regular follow-ups, lead qualification, and CRM synchronization.',
    },
    {
      icon: Megaphone,
      name: 'Marketing AI Manager',
      desc: 'Newsletter copywriting, social media scheduling and publishing, SEO optimization, and acquisition campaigns.',
    },
    {
      icon: Database,
      name: 'CRM AI Manager',
      desc: 'Automatic client files update, opportunity detection, and account follow-ups. Connected to Twenty (requires Unitalk private AI server).',
    },
    {
      icon: Code,
      name: 'Front-End Developer AI',
      desc: 'Building responsive interfaces, React/Tailwind coding, bug fixing, and Figma design integration.',
    },
    {
      icon: Sparkles,
      name: 'Graphic Designer AI',
      desc: 'Creating illustrations, ad banners, image editing, and graphic guidelines deployment.',
    },
    {
      icon: Video,
      name: 'Motion Designer AI',
      desc: 'Short video production and editing for socials, animated captions, and motion graphics.',
    },
    {
      icon: Mic,
      name: 'Voice notes transcriber',
      desc: 'Instant automatic transcription of dictations, audio ideas, and recordings into structured minutes.',
    },
    {
      icon: MessagesSquare,
      name: 'Meeting assistant',
      desc: 'Discreet presence in Teams/Zoom/Meet calls, live note-taking, action items summary, and decisions log.',
    },
  ],
} as const

const T_HERO = {
  fr: {
    eyebrow: 'Tarifs simples',
    title: 'Une Organisation. Des Agents Hermes. Une capacité par agent.',
    subtitle: 'Choisissez le nombre d’agents et leur capacité. Alma, Workspace et Desktop sont inclus avec votre Organisation. Le total s’ajuste immédiatement.',
    note: '7 jours d’essai gratuit · Sans carte bancaire'
  },
  en: {
    eyebrow: 'Simple pricing',
    title: 'One Organization. Hermes Agents. One capacity per agent.',
    subtitle: 'Choose the number of agents and their capacity. Alma, Workspace and Desktop are included with your Organization. The total updates immediately.',
    note: '7-day free trial · No credit card required'
  }
} as const

export function PricingHero() {
  const { lang } = useLanguage()
  const t = T_HERO[lang]

  return (
    <section className="relative overflow-hidden pb-14 pt-24 sm:pt-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(#1C1A17_1px,transparent_1px),linear-gradient(90deg,#1C1A17_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="editorial-shell relative">
        <div className="mb-8 max-w-2xl">
          <Kicker>{t.eyebrow}</Kicker>
          <h1 className="hero-heading mt-5">{t.title}</h1>
          <p className="mt-5 text-[16px] leading-7 text-[#4E483F]">
            {t.subtitle}
          </p>
          <p className="mt-3 text-sm font-semibold">{t.note}</p>
        </div>
        <PricingConfigurator />
      </div>
    </section>
  )
}

const T_COLLAB = {
  fr: {
    kicker: 'Repères de capacité',
    title: 'Que peut représenter chaque niveau ?',
    lead: 'Ces repères vous aident à choisir. Le configurateur reste la seule source du prix final.',
    plans: [
      {
        name: 'Quart-temps',
        price: '74€',
        period: ' / mois',
        desc: 'Tâches de fond et automatisation standard. Idéal pour assurer votre veille, mettre à jour vos outils en arrière-plan et exécuter des rapports simples.',
        features: ['Agent Hermes inclus', '5 millions de tokens', 'Profils métier illimités']
      },
      {
        name: 'Mi-temps',
        price: '99€',
        period: ' / mois',
        desc: 'Prise en charge active des processus métier quotidiens. Parfait pour le tri de vos emails, la qualification réactive de prospects et la planification d’agenda.',
        features: ['Agent Hermes inclus', '10 millions de tokens', 'Profils métier illimités'],
        featured: true
      },
      {
        name: 'Temps plein',
        price: '149€',
        period: ' / mois',
        desc: 'Autonomie complète 24/7 sur de hauts volumes. Un collaborateur IA dédié à 100% à l’action, prêt à piloter des flux de travail complexes et multi-apps pour votre équipe.',
        features: ['Agent Hermes inclus', '20 millions de tokens', 'Profils métier illimités']
      }
    ]
  },
  en: {
    kicker: 'Capacity guide',
    title: 'What can each level represent?',
    lead: 'Use these examples to choose. The configurator remains the single source of the final price.',
    plans: [
      {
        name: 'Part-time (1/4)',
        price: '€74',
        period: ' / month',
        desc: 'Background tasks and standard automation. Ideal for monitoring, updating your tools in the background, and running simple reports.',
        features: ['Hermes Agent included', '5 million tokens', 'Unlimited job profiles']
      },
      {
        name: 'Half-time (1/2)',
        price: '€99',
        period: ' / month',
        desc: 'Active daily support for your business processes. Perfect for sorting emails, responsive lead qualification, and calendar planning.',
        features: ['Hermes Agent included', '10 million tokens', 'Unlimited job profiles'],
        featured: true
      },
      {
        name: 'Full-time (1/1)',
        price: '€149',
        period: ' / month',
        desc: 'Full 24/7 autonomy on high volumes. A 100% dedicated AI collaborator ready to run complex multi-app workflows for your team.',
        features: ['Hermes Agent included', '20 million tokens', 'Unlimited job profiles']
      }
    ]
  }
} as const

export function PricingCollaboration() {
  const { lang } = useLanguage()
  const t = T_COLLAB[lang]

  return (
    <section className="border-y border-[#DED6C8] bg-[#EAE3D4] py-16">
      <div className="editorial-shell">
        <Kicker>{t.kicker}</Kicker>
        <h2 className="mt-5 text-[34px] font-semibold tracking-[-.04em] sm:text-[44px]">{t.title}</h2>
        <p className="mt-3 max-w-2xl text-[16px] text-[#4E483F]">{t.lead}</p>
        <Link href="/documentation/capacite-ia" className="mt-5 inline-flex text-sm font-bold text-[#B00C54] underline-offset-4 hover:underline">Comprendre Agent Hermes et Capacité IA →</Link>
        <Link href="/documentation/alma-organisation" className="ml-5 mt-5 inline-flex text-sm font-bold text-[#B00C54] underline-offset-4 hover:underline">Comprendre Alma Organisation →</Link>
        
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {t.plans.map((plan) => {
            const isFeatured = 'featured' in plan && plan.featured
            return (
              <article 
                key={plan.name}
                className={`relative flex flex-col justify-between rounded-[22px] p-6 sm:p-8 border ${
                  isFeatured 
                    ? 'border-[#D10E63] bg-[#17130F] text-[#FAF8F3] shadow-[0_20px_48px_rgba(209,14,99,0.15)] md:-translate-y-2' 
                    : 'border-[#DED6C8] bg-[#FAF8F3] text-[#1C1A17]'
                }`}
              >
                {isFeatured && (
                  <div className="absolute right-4 top-4 rounded-full bg-[#D10E63] px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-white">
                    {lang === 'fr' ? 'Recommandé' : 'Recommended'}
                  </div>
                )}
                <div>
                  <h3 className={`text-xl font-bold ${isFeatured ? 'text-white' : 'text-[#1C1A17]'}`}>{plan.name}</h3>
                  <p className={`mt-2 text-2xl font-black ${isFeatured ? 'text-[#F15B9B]' : 'text-[#D10E63]'}`}>
                    {plan.price}<span className={`text-xs font-normal ${isFeatured ? 'text-[#C9C0B0]' : 'text-[#6B6560]'}`}>{plan.period}</span>
                  </p>
                  <p className={`mt-4 text-sm leading-relaxed ${isFeatured ? 'text-[#C9C0B0]' : 'text-[#5A5348]'}`}>
                    {plan.desc}
                  </p>
                </div>
                <ul className={`mt-6 space-y-2.5 text-xs border-t pt-5 ${isFeatured ? 'text-[#E8E1D0] border-white/10' : 'text-[#3F3A33] border-[#DED6C8]/40'}`}>
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2">
                      <Check className="size-4 shrink-0 text-[#22C55E]" /> {feature}
                    </li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

const T_EXPLANATIONS = {
  fr: {
    kicker: 'Inclus avec chaque Licence',
    title: 'Une identité IA vérifiée, armée pour le travail réel.',
    subtitle: 'Un Collaborateur IA Unitalk n’est pas un simple champ de chat. C’est un membre d’équipe à part entière, possédant ses propres outils de communication, sa mémoire souveraine et un profil certifié.',
    collabName: 'Lucas',
    collabStatus: 'En ligne',
    collabRole: 'Responsable Relation Client IA',
    channelsLabel: 'Canaux de communication & Accès',
    chMail: 'Email direct',
    chCal: 'Calendrier',
    chPhone: 'Téléphone',
    chDesktop: 'Desktop & Web',
    chMsg: 'Messageries',
    chTerminal: 'Terminal',
    memoryLabel: 'Système de mémoire souveraine',
    memPrivate: 'Mémoire privée (VPS isolé)',
    memShared: 'Mémoire partagée (Solvea)',
    memPublic: 'Mémoire publique (FAQ)',
    active: 'ACTIVÉE',
    publicProfile: 'Profil public :',
    visit: 'Visiter le profil',
    pill1Title: 'Identité vérifiée, Profil public & Canaux',
    pill1Text: 'Chaque collaborateur IA reçoit un badge d’identité <strong>Vérifiée Unitalk AI</strong> garantissant sa conformité technique. Son <strong>profil public</strong> (comme un CV LinkedIn) répertorie ses compétences activées. <strong>Il est accessible partout : via notre application Desktop dédiée, sur le Web, sur vos messageries d’équipe (Slack, Teams, WhatsApp) et même via Terminal.</strong>',
    pill2Title: 'Outils de communication directs & Puissance dédiée',
    pill2Text: 'Le collaborateur IA n’est pas passif. Il possède sa propre <strong>boîte email directe</strong> (envoi/réception), son <strong>calendrier synchronisé</strong> (gestion des rendez-vous et relances) et sa <strong>ligne de téléphone dédiée</strong> pour prendre/passer des appels. <strong>Chaque identité est propulsée par sa propre puissance de calcul dédiée (VPS isolé) pour une rapidité et une souveraineté absolues.</strong>',
    pill3Title: 'Mémoire privée, partagée et publique',
    pill3Text: 'Une gestion souveraine de l’intelligence d’entreprise à trois échelles :',
    memPrivateDetail: 'Mémoire privée : Isolée dans son VPS, contenant ses notes de tâches et ses secrets de connexion.',
    memSharedDetail: 'Mémoire partagée : Base de connaissances et de contexte d’entreprise, commune avec l’équipe humaine.',
    memPublicDetail: 'Mémoire publique : Base de documentation et FAQs ouvertes vers l’extérieur pour répondre aux clients.',
    
    // Native section
    nativeKicker: 'Prêts à l\'emploi',
    nativeTitle: 'Vos Collaborateurs IA natifs, disponibles instantanément.',
    nativeLead: 'Pas besoin de configurer chaque rôle à partir de zéro. Unitalk intègre des profils métier pré-équipés et entraînés, activables en 1 clic pour vos besoins de croissance et de productivité.',
    
    // Sovereignty section
    sovKicker: 'Souveraineté & Sécurité d\'Entreprise',
    sovTitle: 'Garanties absolues sur la souveraineté de vos données.',
    sovLead: 'Un écosystème conçu pour les exigences des directions informatiques, financières et juridiques. Votre intelligence reste 100% votre propriété exclusive.',
    sovCards: [
      {
        title: 'Hébergement en France & RGPD',
        desc: 'Vos données ne quittent jamais l’Europe. Tous nos serveurs et VPS d’infrastructure sont localisés en France (Scaleway, OVHcloud), assurant une conformité parfaite au RGPD et la protection des secrets d’affaires.'
      },
      {
        title: 'Isolation totale par VPS dédié',
        desc: 'Pas de base de données partagée. Chaque Collaborateur IA possède son propre serveur d’infrastructure isolé et sa mémoire chiffrée de bout en bout (AES-256), garantissant l’étanchéité totale face aux fuites.'
      },
      {
        title: 'Zéro entraînement externe',
        desc: 'Vos secrets de communication et d’intégration ne sont jamais revendus ou utilisés pour entraîner des modèles d’IA publics tiers. Vos données restent votre propriété exclusive.'
      }
    ]
  },
  en: {
    kicker: 'Included with every License',
    title: 'A verified AI identity, armed for real work.',
    subtitle: 'A Unitalk AI Collaborator is not a simple chat box. It is a full team member, having its own communication tools, its sovereign memory, and a certified profile.',
    collabName: 'Lucas',
    collabStatus: 'Online',
    collabRole: 'Customer Success AI Manager',
    channelsLabel: 'Communication Channels & Access',
    chMail: 'Direct Email',
    chCal: 'Calendar',
    chPhone: 'Phone Line',
    chDesktop: 'Desktop & Web',
    chMsg: 'Messaging',
    chTerminal: 'Terminal',
    memoryLabel: 'Sovereign Memory System',
    memPrivate: 'Private memory (Isolated VPS)',
    memShared: 'Shared memory (Solvea)',
    memPublic: 'Public memory (FAQ)',
    active: 'ENABLED',
    publicProfile: 'Public profile:',
    visit: 'Visit profile',
    pill1Title: 'Verified Identity, Public Profile & Channels',
    pill1Text: 'Each AI collaborator receives a <strong>Verified Unitalk AI</strong> identity badge guaranteeing its technical compliance. Its <strong>public profile</strong> (like a LinkedIn resume) lists its active skills. <strong>It is accessible anywhere: via our dedicated Desktop app, on the Web, on team messaging apps (Slack, Teams, WhatsApp), and even via Terminal.</strong>',
    pill2Title: 'Direct Communication Tools & Dedicated Power',
    pill2Text: 'The AI collaborator is not passive. It has its own <strong>direct email inbox</strong> (send/receive), its <strong>synchronized calendar</strong> (appointments and follow-ups management), and its <strong>dedicated phone line</strong> to make/receive calls. <strong>Each identity is powered by its own dedicated computing power (isolated VPS) for absolute speed and sovereignty.</strong>',
    pill3Title: 'Private, Shared, and Public Memory',
    pill3Text: 'Sovereign management of enterprise intelligence at three levels:',
    memPrivateDetail: 'Private memory: Isolated in its VPS, containing its task notes and credentials secrets.',
    memSharedDetail: 'Shared memory: Corporate knowledge base, shared with the human team.',
    memPublicDetail: 'Public memory: Open documentation base and FAQs to respond to customers.',
    
    // Native section
    nativeKicker: 'Ready-to-use',
    nativeTitle: 'Your native AI Collaborators, available instantly.',
    nativeLead: 'No need to set up every role from scratch. Unitalk embeds pre-equipped and trained business profiles, deployable in 1 click for your growth and productivity needs.',
    
    // Sovereignty section
    sovKicker: 'Sovereignty & Corporate Security',
    sovTitle: 'Absolute guarantees on the sovereignty of your data.',
    sovLead: 'An ecosystem designed for the requirements of IT, finance, and legal departments. Your intelligence remains 100% your exclusive property.',
    sovCards: [
      {
        title: 'Hosted in France & GDPR',
        desc: 'Your data never leaves Europe. All of our infrastructure VPS and servers are located in France (Scaleway, OVHcloud), ensuring perfect compliance with GDPR and protection of trade secrets.'
      },
      {
        title: 'Total isolation by dedicated VPS',
        desc: 'No shared database. Each AI Collaborator has its own isolated infrastructure server and end-to-end encrypted memory (AES-256), ensuring absolute leakage protection.'
      },
      {
        title: 'Zero external training',
        desc: 'Your communication and integration secrets are never resold or used to train third-party public AI models. Your data remains your 100% exclusive property.'
      }
    ]
  }
} as const

export function PricingExplanations() {
  const { lang } = useLanguage()
  const t = T_EXPLANATIONS[lang]
  const reduce = useReducedMotion()

  const enter = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay: reduce ? 0 : delay, ease },
  })

  return (
    <>
      {/* Radical Conversion Section — Anatomie d'un Collaborateur IA Vérifié */}
      <section className="py-20 bg-[#FAF8F3]">
        <div className="editorial-shell">
          <div className="mx-auto max-w-3xl text-center">
            <Kicker>{t.kicker}</Kicker>
            <h2 className="mt-5 text-balance font-sf text-[34px] font-bold leading-[1.05] tracking-[-0.035em] text-[#1C1A17] sm:text-[44px]">
              {t.title}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-[#5F594F] md:text-lg">
              {t.subtitle}
            </p>
          </div>

          <div className="mt-14 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
            {/* Left Column — Interactive Profile Card Preview (Visual Jewel) */}
            <motion.div 
              {...enter(0)}
              className="relative mx-auto w-full max-w-md overflow-hidden rounded-[28px] border border-[#D8D0C2] bg-white p-6 shadow-[0_24px_55px_-18px_rgba(28,26,23,0.12)]"
            >
              {/* Card Header — Identity */}
              <div className="flex items-center justify-between border-b border-[#DED6C8]/40 pb-5">
                <div className="flex items-center gap-4">
                  <div className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-[#D10E63]/25">
                    <Image src="/images/lucas-avatar.png" alt="Lucas" fill className="object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-sf text-lg font-bold text-[#1C1A17]">{t.collabName}</h3>
                      <span className="flex h-5 items-center gap-1 rounded-full bg-[#0055A4]/10 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-[#0055A4]">
                        <Check className="h-3 w-3 text-[#0055A4]" strokeWidth={4} />
                        {lang === 'fr' ? 'Vérifié Unitalk' : 'Verified Unitalk'}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-[#857C6E]">{t.collabRole}</p>
                  </div>
                </div>
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.12em] bg-[#22C55E]/10 text-[#22C55E] px-2 py-1 rounded-full">{t.collabStatus}</span>
              </div>

              {/* Card Body — Real communication tools */}
              <div className="mt-5 space-y-4">
                <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#857C6E]">{t.channelsLabel}</p>
                <div className="grid grid-cols-3 gap-2.5">
                  <div className="flex flex-col items-center gap-1.5 rounded-xl border border-[#D8D0C2] bg-[#FBF9F3] p-3 text-center">
                    <Mail className="h-4.5 w-4.5 text-[#D10E63]" />
                    <span className="text-[10px] font-bold text-[#1C1A17]">{t.chMail}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 rounded-xl border border-[#D8D0C2] bg-[#FBF9F3] p-3 text-center">
                    <Calendar className="h-4.5 w-4.5 text-[#D10E63]" />
                    <span className="text-[10px] font-bold text-[#1C1A17]">{t.chCal}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 rounded-xl border border-[#D8D0C2] bg-[#FBF9F3] p-3 text-center">
                    <Phone className="h-4.5 w-4.5 text-[#D10E63]" />
                    <span className="text-[10px] font-bold text-[#1C1A17]">{t.chPhone}</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2.5">
                  <div className="flex flex-col items-center gap-1.5 rounded-xl border border-[#DED6C8] bg-[#FAF8F3] p-2 text-center">
                    <Laptop className="h-4 w-4 text-[#8A8175]" />
                    <span className="text-[9px] font-bold text-[#6B6560]">{t.chDesktop}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 rounded-xl border border-[#DED6C8] bg-[#FAF8F3] p-2 text-center">
                    <MessageSquare className="h-4 w-4 text-[#8A8175]" />
                    <span className="text-[9px] font-bold text-[#6B6560]">{t.chMsg}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 rounded-xl border border-[#DED6C8] bg-[#FAF8F3] p-2 text-center">
                    <Terminal className="h-4 w-4 text-[#8A8175]" />
                    <span className="text-[9px] font-bold text-[#6B6560]">{t.chTerminal}</span>
                  </div>
                </div>
              </div>

              {/* Card Body — Sovereign Memory indicators */}
              <div className="mt-6 space-y-3">
                <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#857C6E]">{t.memoryLabel}</p>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 border border-slate-100 p-2.5">
                    <span className="flex items-center gap-2 font-semibold text-[#1C1A17]"><Fingerprint className="h-4 w-4 text-[#D10E63]" /> {t.memPrivate}</span>
                    <span className="font-mono text-[9px] font-bold text-slate-400">{t.active}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 border border-slate-100 p-2.5">
                    <span className="flex items-center gap-2 font-semibold text-[#1C1A17]"><Share2 className="h-4 w-4 text-[#D10E63]" /> {t.memShared}</span>
                    <span className="font-mono text-[9px] font-bold text-slate-400">{t.active}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 border border-slate-100 p-2.5">
                    <span className="flex items-center gap-2 font-semibold text-[#1C1A17]"><Globe className="h-4 w-4 text-[#D10E63]" /> {t.memPublic}</span>
                    <span className="font-mono text-[9px] font-bold text-slate-400">{t.active}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer — Public profile preview */}
              <div className="mt-6 border-t border-[#DED6C8]/40 pt-4 flex items-center justify-between">
                <span className="text-xs text-[#857C6E]">{t.publicProfile} <strong className="text-[#1C1A17]">unitalk.ai/@lucas</strong></span>
                <Link href="/unitalk/@alma" className="inline-flex items-center gap-1 text-[11px] font-bold text-[#D10E63] hover:underline">
                  <Eye className="h-3.5 w-3.5" />
                  {t.visit}
                </Link>
              </div>
            </motion.div>

            {/* Right Column — Deep-dive Core pillars explanation */}
            <div className="flex flex-col gap-8">
              {/* Pillar 1 — Identité Unitalk IA vérifiée & Profil public */}
              <motion.article {...enter(0.08)} className="flex items-start gap-4">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0055A4]/10 text-[#0055A4]">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-sf text-[17px] font-bold text-[#1C1A17]">{t.pill1Title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#5F594F]" dangerouslySetInnerHTML={{ __html: t.pill1Text }} />
                </div>
              </motion.article>

              {/* Pillar 2 — Outils de communication directs & Puissance de calcul */}
              <motion.article {...enter(0.14)} className="flex items-start gap-4">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#D10E63]/10 text-[#D10E63]">
                  <Cpu className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-sf text-[17px] font-bold text-[#1C1A17]">{t.pill2Title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#5F594F]" dangerouslySetInnerHTML={{ __html: t.pill2Text }} />
                </div>
              </motion.article>

              {/* Pillar 3 — Le Triple Niveau de Mémoire */}
              <motion.article {...enter(0.2)} className="flex items-start gap-4">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600">
                  <Database className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-sf text-[17px] font-bold text-[#1C1A17]">{t.pill3Title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#5F594F]">
                    {t.pill3Text}
                    <span className="block mt-2 font-normal text-[#5F594F]">
                      - <strong>{t.memPrivate.split(' ')[0]} {t.memPrivate.split(' ')[1]} :</strong> {t.memPrivateDetail}
                    </span>
                    <span className="block mt-1 font-normal text-[#5F594F]">
                      - <strong>{t.memShared.split(' ')[0]} {t.memShared.split(' ')[1]} :</strong> {t.memSharedDetail}
                    </span>
                    <span className="block mt-1 font-normal text-[#5F594F]">
                      - <strong>{t.memPublic.split(' ')[0]} {t.memPublic.split(' ')[1]} :</strong> {t.memPublicDetail}
                    </span>
                  </p>
                </div>
              </motion.article>
            </div>
          </div>
        </div>
      </section>

      {/* 🚀 New Section — Native Profiles (Sales, Marketing, Front-End Dev, Graphiste, Motion Designer, Voice Notes, Meeting Assistant) */}
      <section className="py-20 bg-[#EAE3D4] border-t border-[#DED6C8]/40">
        <div className="editorial-shell">
          <div className="mx-auto max-w-3xl text-center">
            <Kicker>{t.nativeKicker}</Kicker>
            <h2 className="mt-5 font-sf text-[34px] font-bold leading-[1.05] tracking-[-0.035em] text-[#1C1A17] sm:text-[42px]">
              {t.nativeTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#5F594F]">
              {t.nativeLead}
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {NATIVE_PROFILES[lang].map((p, index) => {
              const Icon = p.icon
              return (
                <motion.div
                  key={p.name}
                  {...enter(index * 0.04)}
                  className="flex flex-col items-center rounded-2xl border border-[#D8D0C2] bg-[#FAF8F3] p-5 text-center transition-all hover:-translate-y-1 hover:border-[#D10E63]/30 hover:shadow-md"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#D10E63]/10 text-[#D10E63] mb-4">
                    <Icon className="h-5.5 w-5.5" />
                  </span>
                  <h3 className="font-sf text-[14px] font-extrabold text-[#1C1A17] tracking-tight leading-snug">{p.name}</h3>
                  <p className="mt-2 text-[11px] leading-relaxed text-[#5F594F] flex-1">
                    {p.desc}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Radical Security & Sovereignty Trust Block — Deepening corporate confidence */}
      <section className="py-20 bg-[#FAF8F3] border-t border-[#DED6C8]/40">
        <div className="editorial-shell">
          <div className="mx-auto max-w-3xl text-center">
            <Kicker>{t.sovKicker}</Kicker>
            <h2 className="mt-5 font-sf text-[34px] font-bold leading-[1.05] tracking-[-0.035em] text-[#1C1A17] sm:text-[42px]">
              {t.sovTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#5F594F]">
              {t.sovLead}
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-1 md:grid-cols-3">
            {t.sovCards.map((card, index) => (
              <motion.div 
                key={card.title}
                {...enter(index * 0.06)} 
                className="rounded-3xl border border-[#D8D0C2] bg-white p-6 sm:p-8"
              >
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl mb-5 ${
                  index === 0 ? 'bg-green-500/10 text-green-600' : index === 1 ? 'bg-[#D10E63]/10 text-[#D10E63]' : 'bg-purple-500/10 text-purple-600'
                }`}>
                  {index === 0 ? <ShieldCheck className="h-5.5 w-5.5" /> : index === 1 ? <Lock className="h-5.5 w-5.5" /> : <FileKey2 className="h-5.5 w-5.5" />}
                </span>
                <h3 className="font-sf text-lg font-bold text-[#1C1A17]">{card.title}</h3>
                <p className="mt-2.5 text-xs leading-relaxed text-[#5F594F]">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dark section for credits and team resources */}
      <section className="border-t border-[#DED6C8] bg-[#EAE3D4] py-16">
        <div className="editorial-shell">
          <Kicker>Socles technologiques inclus</Kicker>
          <h2 className="mt-5 max-w-4xl text-[34px] font-semibold leading-[1.06] tracking-[-0.04em] sm:text-[44px]">Hermes agit. Unitalk AI Gateway donne accès aux modèles.</h2>
          <p className="mt-5 max-w-3xl text-[16px] leading-7 text-[#4E483F]">Chaque Collaborateur IA associe un environnement agentique Hermes et une capacité d’accès aux modèles configurée dans Unitalk AI Gateway.</p>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <article className="rounded-3xl border border-[#D8D0C2] bg-[#FAF8F3] p-7"><p className="font-mono text-[10px] font-bold uppercase tracking-[.16em] text-[#B00C54]">Système d’exploitation agentique</p><h3 className="mt-5 text-2xl font-bold">Hermes Agent</h3><p className="mt-4 text-sm leading-7 text-[#5F594F]">Navigation, terminal, fichiers, mémoire, compétences, outils et tâches planifiées dans l’environnement du Collaborateur IA.</p><p className="mt-5 rounded-2xl bg-[#EAE3D4] p-4 text-xs leading-6 text-[#625B50]">Hermes Agent est un projet open source de Nous Research distribué sous licence MIT. Unitalk AI est une distribution et une intégration indépendantes ; Nous Research n’est pas l’éditeur de Unitalk.</p><a href="https://github.com/NousResearch/hermes-agent" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#B00C54]">Voir Hermes et sa licence<ArrowRight className="size-4"/></a></article>
            <article className="rounded-3xl border border-[#D10E63] bg-[#181615] p-7 text-[#FAF8F3]"><p className="font-mono text-[10px] font-bold uppercase tracking-[.16em] text-[#F2A4C5]">Accès multimodèle</p><h3 className="mt-5 text-2xl font-bold">Unitalk AI Gateway</h3><p className="mt-4 text-sm leading-7 text-[#CFC6B8]">Interface commune, routage, clés, budgets et quotas pour utiliser des crédits Unitalk, vos propres clés ou une configuration hybride.</p><p className="mt-5 rounded-2xl bg-white/[.06] p-4 text-xs leading-6 text-[#AFA397]">Basé sur les composants open source MIT de LiteLLM. Les éventuels composants Enterprise de LiteLLM relèvent de conditions distinctes.</p><Link href="/ai-gateway" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#F2A4C5]">Découvrir AI Gateway<ArrowRight className="size-4"/></Link></article>
          </div>
        </div>
      </section>

      <section className="bg-[#181615] py-16 text-[#FAF8F3]">
        <div className="editorial-shell">
          <Kicker dark>Besoins ponctuels</Kicker>
          <h2 className="mt-5 max-w-3xl text-[34px] font-semibold tracking-[-0.04em] sm:text-[44px]">Les crédits restent séparés de vos licences.</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <Dark title="Crédits IA">Usage de modèles au-delà ou en dehors d’une capacité, selon les règles réelles.</Dark>
            <Dark title="Ressources d'équipe">Membres humains, Workspace et Desktop partagés de manière illimitée.</Dark>
            <Dark title="Garantie de souveraineté">Hébergement VPS isolé inclus pour chaque collaborateur IA configuré.</Dark>
          </div>
        </div>
      </section>
    </>
  )
}

function Card({ title, price, items }: { title: string; price: string; items: string[] }) {
  return <article className="rounded-[18px] border border-[#DED6C8] bg-[#FAF8F3] p-6"><h3 className="text-xl font-semibold">{title}</h3><p className="mt-2 text-sm font-semibold text-[#B00C54]">{price}</p><ul className="mt-5 space-y-2.5 text-sm text-[#4E483F]">{items.map(item=><li key={item} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-[#D10E63]" />{item}</li>)}</ul></article>
}

function Dark({ title, children }: { title: string; children: React.ReactNode }) {
  return <article className="rounded-[18px] border border-white/15 bg-white/[.04] p-5"><h3 className="text-lg font-semibold">{title}</h3><p className="mt-3 text-sm leading-7 text-[#CFC6B8]">{children}</p></article>
}
