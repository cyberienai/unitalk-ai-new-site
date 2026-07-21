'use client'

import { motion } from 'framer-motion'
import {
  Sparkles,
  Package,
  UserPlus,
  BarChart3,
  Search,
  Zap,
  Bot,
  Star,
  MessageCircle,
  ClipboardList,
  Construction,
  BookOpen,
  Hand,
  Rocket,
  Compass,
  Gem,
  Ruler,
  Bell,
  HelpCircle,
  Settings,
  Target,
  ArrowUpRight,
  UserRound,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  type LucideIcon,
} from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

const ease = [0.22, 1, 0.36, 1] as const

type Domain = {
  icon: LucideIcon
  title: string
  items: { icon: LucideIcon; label: string }[]
}

const T = {
  fr: {
    eyebrow: 'RESPONSABLE DES COLLABORATEURS IA',
    name: 'Alma',
    tagline: 'Responsable du développement de votre équipe',
    intro:
      'Alma crée, optimise et accompagne vos Collaborateurs IA. Elle est votre interlocutrice unique pour construire votre organisation augmentée.',
    verified: 'Intelligence vérifiée',
    responds: 'Répond en moins de 5 secondes',
    domainsTitle: 'Ce qu’Alma fait pour vous',
    engineerTitle: 'Un Ingénieur IA nommé',
    engineerText:
      'Quand Alma ne peut pas répondre, elle escalade vers un ingénieur humain attitré à votre organisation. Pas de chatbot sans fin — un vrai contact humain, avec le contexte complet.',
    cta: 'Parler à Alma',
    ctaNote: 'Disponible immédiatement · Gratuit pendant 7 jours',
    hosting:
      'Intelligence hébergée par Unitalk. Alma apprend de votre organisation et n’en partage rien en dehors.',
    domains: [
      {
        icon: Rocket,
        title: 'Créer',
        items: [
          { icon: Sparkles, label: 'Créer un nouvel agent' },
          { icon: Package, label: 'Recruter un Agent Pack' },
          { icon: UserPlus, label: 'Créer un nouveau profil métier' },
        ],
      },
      {
        icon: BarChart3,
        title: 'Optimiser',
        items: [
          { icon: BarChart3, label: 'Analyser l’utilisation des agents' },
          { icon: Search, label: 'Détecter les tâches encore manuelles' },
          { icon: Zap, label: 'Proposer des automatisations' },
          { icon: Bot, label: 'Recommander de nouveaux agents' },
        ],
      },
      {
        icon: Star,
        title: 'Évaluer',
        items: [
          { icon: Star, label: 'Mesurer la satisfaction des utilisateurs' },
          { icon: MessageCircle, label: 'Interviewer les collaborateurs' },
          { icon: ClipboardList, label: 'Recueillir leurs difficultés' },
          { icon: Construction, label: 'Identifier les points de blocage' },
        ],
      },
      {
        icon: BookOpen,
        title: 'Former',
        items: [
          { icon: BookOpen, label: 'Expliquer une fonctionnalité' },
          { icon: Hand, label: 'Former un nouvel utilisateur' },
          { icon: Sparkles, label: 'Présenter les nouveautés' },
          { icon: Rocket, label: 'Guider les premiers pas' },
        ],
      },
      {
        icon: Compass,
        title: 'Conseiller',
        items: [
          { icon: Gem, label: 'Donner des astuces' },
          { icon: Ruler, label: 'Proposer de meilleures pratiques' },
          { icon: Bell, label: 'Signaler une opportunité d’automatisation' },
          { icon: HelpCircle, label: 'Expliquer pourquoi un agent n’agit pas comme prévu' },
        ],
      },
      {
        icon: Hand,
        title: 'Accompagner',
        items: [
          { icon: MessageCircle, label: 'Répondre aux questions' },
          { icon: Settings, label: 'Aider au paramétrage' },
          { icon: Target, label: 'Organiser une démonstration' },
          { icon: ArrowUpRight, label: 'Escalader vers un Ingénieur IA nommé' },
        ],
      },
    ] as Domain[],
  },
  en: {
    eyebrow: 'HEAD OF AI COLLABORATORS',
    name: 'Alma',
    tagline: 'Head of your team’s development',
    intro:
      'Alma creates, optimizes and supports your AI Collaborators. She is your single point of contact to build your augmented organization.',
    verified: 'Verified intelligence',
    responds: 'Replies in under 5 seconds',
    domainsTitle: 'What Alma does for you',
    engineerTitle: 'A named AI Engineer',
    engineerText:
      'When Alma can’t answer, she escalates to a human engineer dedicated to your organization. No endless chatbot — a real human contact, with full context.',
    cta: 'Talk to Alma',
    ctaNote: 'Available immediately · Free for 7 days',
    hosting:
      'Intelligence hosted by Unitalk. Alma learns from your organization and shares nothing outside of it.',
    domains: [
      {
        icon: Rocket,
        title: 'Create',
        items: [
          { icon: Sparkles, label: 'Create a new agent' },
          { icon: Package, label: 'Recruit an Agent Pack' },
          { icon: UserPlus, label: 'Create a new job profile' },
        ],
      },
      {
        icon: BarChart3,
        title: 'Optimize',
        items: [
          { icon: BarChart3, label: 'Analyze agent usage' },
          { icon: Search, label: 'Detect tasks that are still manual' },
          { icon: Zap, label: 'Suggest automations' },
          { icon: Bot, label: 'Recommend new agents' },
        ],
      },
      {
        icon: Star,
        title: 'Evaluate',
        items: [
          { icon: Star, label: 'Measure user satisfaction' },
          { icon: MessageCircle, label: 'Interview collaborators' },
          { icon: ClipboardList, label: 'Gather their difficulties' },
          { icon: Construction, label: 'Identify blockers' },
        ],
      },
      {
        icon: BookOpen,
        title: 'Train',
        items: [
          { icon: BookOpen, label: 'Explain a feature' },
          { icon: Hand, label: 'Onboard a new user' },
          { icon: Sparkles, label: 'Present what’s new' },
          { icon: Rocket, label: 'Guide the first steps' },
        ],
      },
      {
        icon: Compass,
        title: 'Advise',
        items: [
          { icon: Gem, label: 'Share tips' },
          { icon: Ruler, label: 'Suggest best practices' },
          { icon: Bell, label: 'Flag an automation opportunity' },
          { icon: HelpCircle, label: 'Explain why an agent isn’t acting as expected' },
        ],
      },
      {
        icon: Hand,
        title: 'Support',
        items: [
          { icon: MessageCircle, label: 'Answer questions' },
          { icon: Settings, label: 'Help with configuration' },
          { icon: Target, label: 'Set up a demo' },
          { icon: ArrowUpRight, label: 'Escalate to a named AI Engineer' },
        ],
      },
    ] as Domain[],
  },
}

export function AlmaContent() {
  const { lang } = useLanguage()
  const t = T[lang]

  return (
    <main className="bg-[#1A1613] text-[#F7F4EE]">
      {/* Hero */}
      <section className="relative overflow-hidden px-5 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              'radial-gradient(circle at 20% 0%, rgba(209,14,99,0.20), transparent 50%), radial-gradient(circle at 85% 30%, rgba(79,91,213,0.14), transparent 45%)',
          }}
        />
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1fr_1.15fr]">
          <div className="order-2 lg:order-1">
            <p className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D10E63]">{t.eyebrow}</p>
            <h1 className="font-sf text-5xl font-bold leading-[0.98] tracking-[-0.04em] text-balance sm:text-6xl md:text-7xl">{t.name}</h1>
            <p className="mt-4 text-pretty font-sf text-2xl font-medium leading-snug text-[#E8E1D0] sm:text-3xl">{t.tagline}</p>
            <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-[#B8AFA0]">{t.intro}</p>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#D10E63]/40 bg-[#D10E63]/10 px-4 py-1.5 text-sm font-semibold text-[#F0559B]">
                <CheckCircle2 className="h-4 w-4" strokeWidth={2} />
                {t.verified}
              </span>
              <a
                href="#parler"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#E8E1D0] transition-colors hover:text-[#F0559B]"
              >
                {t.responds}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative mx-auto aspect-square w-full max-w-md">
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-[#D10E63]/25 to-transparent blur-2xl"
              />
              <img
                src="/alma-avatar.png"
                alt="Alma, responsable des Collaborateurs IA"
                className="relative h-full w-full rounded-[2.5rem] border border-[#D10E63]/30 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Domaines */}
      <section className="px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="mb-10 font-sf text-3xl font-bold tracking-[-0.03em] sm:text-4xl">{t.domainsTitle}</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {t.domains.map((domain, i) => {
              const DomainIcon = domain.icon
              return (
                <motion.article
                  key={domain.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.45, ease, delay: (i % 3) * 0.06 }}
                  className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6 transition-colors hover:border-[#D10E63]/30 hover:bg-white/[0.05]"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#D10E63]/40 bg-[#D10E63]/10 text-[#D10E63]">
                      <DomainIcon className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                    <h3 className="font-sf text-xl font-bold tracking-[-0.02em]">{domain.title}</h3>
                  </div>
                  <ul className="mt-5 flex flex-col gap-3">
                    {domain.items.map((item) => {
                      const ItemIcon = item.icon
                      return (
                        <li key={item.label} className="flex items-start gap-3 text-[15px] leading-6 text-[#C9C0B2]">
                          <ItemIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#F0559B]" strokeWidth={1.8} />
                          <span>{item.label}</span>
                        </li>
                      )
                    })}
                  </ul>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Ingénieur IA nommé */}
      <section className="px-5 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <div className="flex flex-col items-start gap-5 rounded-3xl border border-[#D10E63]/30 bg-[#D10E63]/[0.07] p-7 sm:flex-row sm:items-center sm:p-9">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#D10E63] text-[#FBF9F3]">
              <UserRound className="h-7 w-7" strokeWidth={1.8} />
            </span>
            <div>
              <h2 className="font-sf text-2xl font-bold tracking-[-0.02em]">{t.engineerTitle}</h2>
              <p className="mt-2 max-w-3xl text-pretty leading-relaxed text-[#C9C0B2]">{t.engineerText}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="parler" className="px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
          <a
            href="/signup"
            className="inline-flex min-h-14 items-center gap-2 rounded-full bg-[#D10E63] px-9 text-base font-semibold text-[#FBF9F3] transition-colors hover:bg-[#B00B52]"
          >
            {t.cta}
            <ArrowRight className="h-5 w-5" />
          </a>
          <p className="mt-4 text-sm font-medium text-[#B8AFA0]">{t.ctaNote}</p>
          <p className="mt-10 flex items-start gap-2 text-sm leading-relaxed text-[#8A8175]">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#F0559B]" strokeWidth={1.8} />
            <span className="max-w-xl text-balance">{t.hosting}</span>
          </p>
        </div>
      </section>
    </main>
  )
}
