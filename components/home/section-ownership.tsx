'use client'

import Link from 'next/link'
import { ArrowRight, Brain, SlidersHorizontal, Cpu, Sparkles, Globe, FileSearch, UserCheck, Layers, Target } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { Kicker } from './section-kicker'

type Pillar = { title: string; body: string; icon: typeof Brain }
type Step = { label: string; icon: typeof Brain }

const T: Record<Lang, {
  kicker: string
  title: string
  subtitle: string
  pillars: Pillar[]
  quote: string
  almaKicker: string
  almaTitle: string
  almaBodyA: string
  almaBodyB: string
  createCta: string
  hermesCta: string
  timelineLabel: string
  steps: Step[]
  chain: string[]
}> = {
  fr: {
    kicker: 'Il appartient à votre Organisation',
    title: 'L’IA équipe des individus. Unitalk équipe l’Organisation.',
    subtitle:
      'Vos Collaborateurs IA appartiennent à votre entreprise. Elle gouverne leurs Profils, leurs connaissances, leurs accès, leurs validations et leurs budgets.',
    pillars: [
      { title: 'Son expérience reste dans votre Organisation', body: 'Son identité, sa mémoire, ses Profils privés, ses méthodes et ses résultats validés restent avec votre entreprise.', icon: Brain },
      { title: 'Vous définissez son autonomie', body: 'Décidez ce qu’il peut consulter, accomplir seul, soumettre à validation et dépenser.', icon: SlidersHorizontal },
      { title: 'Vous choisissez sa technologie', body: 'Propulsé par Hermès, moteur agentique open source, il utilise les modèles et l’hébergement de votre choix.', icon: Cpu },
    ],
    quote: 'Changez de modèle, pas de collaborateur.',
    almaKicker: 'Alma',
    almaTitle: 'Alma prépare son premier jour',
    almaBodyA:
      'À partir de votre domaine, Alma identifie votre activité, vos offres, votre marché et vos concurrents. Vous vérifiez ses sources et choisissez ce qui doit être conservé.',
    almaBodyB:
      'Elle recommande ensuite le Collaborateur IA et le Profil adaptés, prépare leur cadre de travail et accompagne la première Mission jusqu’au résultat.',
    createCta: 'Créer mon organisation',
    hermesCta: 'Découvrir Hermès et l’open source',
    timelineLabel: 'Du domaine à la première Mission',
    steps: [
      { label: 'Domaine', icon: Globe },
      { label: 'Contexte sourcé', icon: FileSearch },
      { label: 'Collaborateur recommandé', icon: UserCheck },
      { label: 'Profil', icon: Layers },
      { label: 'Première Mission', icon: Target },
    ],
    chain: ['Organisation', 'Collaborateur IA', 'Modèles interchangeables'],
  },
  en: {
    kicker: 'It belongs to your Organization',
    title: 'AI equips individuals. Unitalk equips the Organization.',
    subtitle:
      'Your AI Collaborators belong to your company. It governs their Profiles, their knowledge, their access, their validations and their budgets.',
    pillars: [
      { title: 'Its experience stays in your Organization', body: 'Its identity, its memory, its private Profiles, its methods and its validated results stay with your company.', icon: Brain },
      { title: 'You define its autonomy', body: 'Decide what it can consult, do on its own, submit for validation and spend.', icon: SlidersHorizontal },
      { title: 'You choose its technology', body: 'Powered by Hermès, an open-source agentic engine, it uses the models and hosting of your choice.', icon: Cpu },
    ],
    quote: 'Change the model, not the collaborator.',
    almaKicker: 'Alma',
    almaTitle: 'Alma prepares its first day',
    almaBodyA:
      'From your domain, Alma identifies your business, your offers, your market and your competitors. You verify her sources and choose what should be kept.',
    almaBodyB:
      'She then recommends the right AI Collaborator and Profile, prepares their working framework and guides the first Mission through to the result.',
    createCta: 'Create my organization',
    hermesCta: 'Discover Hermès and open source',
    timelineLabel: 'From domain to first Mission',
    steps: [
      { label: 'Domain', icon: Globe },
      { label: 'Sourced context', icon: FileSearch },
      { label: 'Recommended Collaborator', icon: UserCheck },
      { label: 'Profile', icon: Layers },
      { label: 'First Mission', icon: Target },
    ],
    chain: ['Organization', 'AI Collaborator', 'Interchangeable models'],
  },
}

export function SectionOwnership({ lang }: { lang: Lang }) {
  const t = T[lang]

  return (
    <section className="bg-[#F3EFE6] px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <Kicker>{t.kicker}</Kicker>
          <h2 className="mt-3 text-balance font-sf text-3xl font-bold tracking-[-0.02em] text-[#1C1A17] sm:text-4xl">
            {t.title}
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-[#5F594F]">{t.subtitle}</p>
        </div>

        {/* Three pillars */}
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {t.pillars.map((p) => {
            const Icon = p.icon
            return (
              <div key={p.title} className="rounded-3xl border border-[#E4DCCF] bg-[#FBF9F3] p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#D10E63]/10 text-[#D10E63]">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-sf text-lg font-bold tracking-[-0.01em] text-[#1C1A17]">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5F594F]">{p.body}</p>
              </div>
            )
          })}
        </div>

        {/* Pull quote */}
        <blockquote className="mt-10 border-l-2 border-[#D10E63] pl-5 font-sf text-2xl font-bold tracking-[-0.02em] text-[#1C1A17] sm:text-3xl">
          {t.quote}
        </blockquote>

        {/* Alma prepares the first day */}
        <div className="mt-16 grid gap-10 rounded-[2rem] border border-[#E4DCCF] bg-[#EFEADF] p-6 sm:p-10 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D10E63] text-[#FBF9F3]">
                <Sparkles className="h-4 w-4" />
              </span>
              <Kicker>{t.almaKicker}</Kicker>
            </div>
            <h3 className="mt-4 font-sf text-2xl font-bold tracking-[-0.02em] text-[#1C1A17] sm:text-3xl">{t.almaTitle}</h3>
            <p className="mt-4 text-pretty text-base leading-7 text-[#5F594F]">{t.almaBodyA}</p>
            <p className="mt-3 text-pretty text-base leading-7 text-[#5F594F]">{t.almaBodyB}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                href="/decouvrir"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#D10E63] px-6 py-3 text-sm font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5"
              >
                {t.createCta}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/manifeste"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#4E483F] underline-offset-4 transition-colors hover:text-[#D10E63] hover:underline"
              >
                {t.hermesCta}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Timeline visual */}
          <div className="rounded-3xl border border-[#E4DCCF] bg-[#FBF9F3] p-5 sm:p-6">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A8175]">{t.timelineLabel}</p>
            <ol className="mt-4 flex flex-col gap-2">
              {t.steps.map((s) => {
                const Icon = s.icon
                return (
                  <li
                    key={s.label}
                    className="flex items-center gap-3 rounded-2xl bg-[#F3EFE6] px-4 py-2.5"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#D10E63]/10 text-[#D10E63]">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-semibold text-[#1C1A17]">{s.label}</span>
                  </li>
                )
              })}
            </ol>
            <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-2 border-t border-[#E9E2D4] pt-4">
              {t.chain.map((c, i) => (
                <span key={c} className="flex items-center gap-2">
                  <span className="rounded-full bg-[#EDE7DA] px-3 py-1 text-xs font-semibold text-[#4E483F]">{c}</span>
                  {i < t.chain.length - 1 && <ArrowRight className="h-3.5 w-3.5 text-[#B8AF9E]" />}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
