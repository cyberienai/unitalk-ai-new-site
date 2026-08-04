'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import {
  ArrowRight,
  ListChecks,
  MessagesSquare,
  FolderLock,
  ShieldCheck,
  FileCheck2,
  Users,
  Eye,
  PenLine,
  Play,
  CheckCircle2,
  Wallet,
  Cpu,
  Clock,
  FileText,
  Sparkles,
} from 'lucide-react'
import { useLanguage, type Lang } from '@/lib/language-context'
import { getMission, DELAY_TBD } from '@/lib/missions-catalog'
import { ROLE_DETAILS } from '@/lib/collaborators-catalog'

type Feature = { icon: React.ComponentType<{ className?: string }>; title: string; body: string }
type Step = { title: string; body: string }
type Copy = {
  kicker: string
  titleA: string
  titleB: string
  lead: string
  ctaPrimary: string
  ctaSecondary: string
  demoLabel: string
  claire: string
  claireMsg: string
  hugo: string
  hugoMsg: string
  resultLabel: string
  resultMsg: string
  examine: string
  validate: string
  journeyLabel: string
  steps: Step[]
  featuresKicker: string
  featuresTitle: string
  features: Feature[]
  autonomyKicker: string
  autonomyTitle: string
  autonomyIntro: string
  autonomyItems: string[]
  contextKicker: string
  contextTitle: string
  contextBody: string
  contextNote: string
  techKicker: string
  techTitle: string
  techBody: string
  techQuote: string
  techCta: string
  finalTitle: string
  finalBody: string
  finalCta: string
  activeBadge: string
  activeTitle: string
  activeBody: string
  activeStatusWord: string
  activeStatusValue: string
  activeDeliverableWord: string
  activeDelayWord: string
  activeOpenCta: string
  activeAddedSuffix: string
}

const CREATE_ORG_HREF = '/decouvrir'

const T: Record<Lang, Copy> = {
  fr: {
    kicker: 'Votre espace de travail',
    titleA: 'Vous donnez le cap.',
    titleB: 'Il fait avancer le travail.',
    lead: 'Missions, conversations, fichiers, validations et résultats sont réunis dans le Workspace privé de votre organisation.',
    ctaPrimary: 'Créer mon organisation',
    ctaSecondary: 'Voir une Mission en action',
    demoLabel: 'Exemple de Mission',
    claire: 'Claire',
    claireMsg: 'Hugo, prépare la prospection pour notre nouvelle offre.',
    hugo: 'Hugo · Profil Commercial',
    hugoMsg: 'Je vérifie la cible, sélectionne les entreprises pertinentes et prépare les prises de contact. Je vous demanderai confirmation avant tout envoi.',
    resultLabel: 'Résultat',
    resultMsg: '36 entreprises analysées. 12 retenues. Les messages sont prêts pour validation.',
    examine: 'Examiner',
    validate: 'Valider',
    journeyLabel: 'Le parcours',
    steps: [
      { title: 'Objectif', body: 'Vous fixez le résultat attendu.' },
      { title: 'Travail', body: 'Le Collaborateur IA planifie et exécute.' },
      { title: 'Validation', body: 'Vous décidez avant les actions sensibles.' },
      { title: 'Résultat', body: 'Le livrable et ses sources restent accessibles.' },
    ],
    featuresKicker: 'Tout le travail au même endroit',
    featuresTitle: 'Un Workspace pensé pour agir, pas seulement pour discuter.',
    features: [
      { icon: ListChecks, title: 'Missions', body: 'Suivez ce qui est à préparer, en cours, à valider ou terminé.' },
      { icon: MessagesSquare, title: 'Conversations', body: 'Échangez avec les Membres et les Collaborateurs IA sans perdre le contexte du travail.' },
      { icon: FolderLock, title: 'Fichiers et connaissances', body: 'Partagez les documents autorisés et conservez les résultats validés.' },
      { icon: ShieldCheck, title: 'Validations', body: 'Retrouvez dans une file dédiée les actions qui exigent votre décision.' },
      { icon: FileCheck2, title: 'Résultats', body: 'Consultez les livrables, leurs sources, les décisions prises et les coûts.' },
      { icon: Users, title: 'Collaborateurs IA', body: 'Retrouvez leur identité, leurs Profils, leur activité, leurs outils, leurs responsables et leur budget.' },
    ],
    autonomyKicker: 'Autonomie gouvernée',
    autonomyTitle: 'Il sait ce qu’il peut faire seul.',
    autonomyIntro: 'Vous définissez précisément son périmètre d’action.',
    autonomyItems: [
      'Ce qu’il peut consulter',
      'Ce qu’il peut préparer',
      'Ce qu’il peut exécuter',
      'Ce qu’il doit faire valider',
      'Ce qu’il peut dépenser',
    ],
    contextKicker: 'Contexte de l’organisation',
    contextTitle: 'Un contexte sourcé, validé par vos Membres.',
    contextBody: 'Notre conseillère IA prépare un contexte public sourcé. Les Membres le valident avant son utilisation.',
    contextNote: 'Connaissances privées et mémoire acquise restent séparées et gouvernées.',
    techKicker: 'Technologie ouverte',
    techTitle: 'Hermes fournit le moteur agentique open source.',
    techBody: 'Utilisez les modèles Unitalk, vos propres accès ou Ollama.',
    techQuote: 'Changez de modèle, pas de collaborateur.',
    techCta: 'Découvrir Hermes et l’open source',
    finalTitle: 'Ouvrez votre Workspace.',
    finalBody: 'Notre conseillère IA prépare votre organisation et configure le premier Profil de votre Collaborateur IA.',
    finalCta: 'Créer mon organisation',
    activeBadge: 'Mission en préparation',
    activeTitle: 'Votre première Mission est déjà là.',
    activeBody: 'Votre Workspace ne s’ouvre jamais vide. Votre Collaborateur IA prépare le travail et vous sollicite avant toute action sensible.',
    activeStatusWord: 'Statut',
    activeStatusValue: 'En préparation',
    activeDeliverableWord: 'Livrable attendu',
    activeDelayWord: 'Délai',
    activeOpenCta: 'Suivre la Mission',
    activeAddedSuffix: 'a rejoint votre organisation.',
  },
  en: {
    kicker: 'Your workspace',
    titleA: 'You set the direction.',
    titleB: 'It moves the work forward.',
    lead: 'Missions, conversations, files, approvals and results all come together in your organization’s private Workspace.',
    ctaPrimary: 'Create my organization',
    ctaSecondary: 'See a Mission in action',
    demoLabel: 'Mission example',
    claire: 'Claire',
    claireMsg: 'Hugo, prepare prospecting for our new offer.',
    hugo: 'Hugo · Sales Profile',
    hugoMsg: 'I check the target, select the relevant companies and prepare the outreach. I’ll ask for confirmation before sending anything.',
    resultLabel: 'Result',
    resultMsg: '36 companies analyzed. 12 shortlisted. The messages are ready for approval.',
    examine: 'Review',
    validate: 'Approve',
    journeyLabel: 'The journey',
    steps: [
      { title: 'Goal', body: 'You set the expected outcome.' },
      { title: 'Work', body: 'The AI Collaborator plans and executes.' },
      { title: 'Approval', body: 'You decide before sensitive actions.' },
      { title: 'Result', body: 'The deliverable and its sources stay accessible.' },
    ],
    featuresKicker: 'All the work in one place',
    featuresTitle: 'A Workspace built to act, not just to chat.',
    features: [
      { icon: ListChecks, title: 'Missions', body: 'Track what’s to prepare, in progress, to approve or done.' },
      { icon: MessagesSquare, title: 'Conversations', body: 'Talk with Members and AI Collaborators without losing the work context.' },
      { icon: FolderLock, title: 'Files and knowledge', body: 'Share authorized documents and keep validated results.' },
      { icon: ShieldCheck, title: 'Approvals', body: 'Find in a dedicated queue the actions that need your decision.' },
      { icon: FileCheck2, title: 'Results', body: 'Review deliverables, their sources, the decisions made and the costs.' },
      { icon: Users, title: 'AI Collaborators', body: 'Find their identity, Profiles, activity, tools, owners and budget.' },
    ],
    autonomyKicker: 'Governed autonomy',
    autonomyTitle: 'It knows what it can do on its own.',
    autonomyIntro: 'You define its scope of action precisely.',
    autonomyItems: [
      'What it can view',
      'What it can prepare',
      'What it can execute',
      'What it must get approved',
      'What it can spend',
    ],
    contextKicker: 'Organization context',
    contextTitle: 'A sourced context, validated by your Members.',
    contextBody: 'Our AI advisor prepares a sourced public context. Members validate it before use.',
    contextNote: 'Private knowledge and acquired memory stay separate and governed.',
    techKicker: 'Open technology',
    techTitle: 'Hermes provides the open-source agentic engine.',
    techBody: 'Use Unitalk models, your own access or Ollama.',
    techQuote: 'Switch the model, not the collaborator.',
    techCta: 'Discover Hermes and open source',
    finalTitle: 'Open your Workspace.',
    finalBody: 'Our AI advisor prepares your organization and configures the first Profile of your AI Collaborator.',
    finalCta: 'Create my organization',
    activeBadge: 'Mission being prepared',
    activeTitle: 'Your first Mission is already here.',
    activeBody: 'Your Workspace never opens empty. Your AI Collaborator prepares the work and checks with you before any sensitive action.',
    activeStatusWord: 'Status',
    activeStatusValue: 'Being prepared',
    activeDeliverableWord: 'Expected deliverable',
    activeDelayWord: 'Timeline',
    activeOpenCta: 'Follow the Mission',
    activeAddedSuffix: 'joined your organization.',
  },
}

export function WorkspaceContent() {
  const { lang } = useLanguage()
  const t = T[lang]
  const params = useSearchParams()
  const launched = params.get('launched') === '1'
  const activeMission = launched ? getMission(params.get('mission') ?? '') : undefined
  const activeCollab = activeMission ? ROLE_DETAILS[activeMission.collaboratorSlug] : undefined

  return (
    <main className="bg-[#F3EFE6]">
      {/* Active Mission banner — the Workspace never opens empty after a launch */}
      {activeMission && (
        <section className="border-b border-[#E4DDCE] bg-[#1C1A17] px-5 pb-10 pt-28 text-[#FBF9F3] sm:px-8 sm:pb-12 sm:pt-32">
          <div className="editorial-shell">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#D10E63]/15 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#E8A0BF]">
              <Sparkles className="h-3.5 w-3.5" />
              {t.activeBadge}
            </span>
            <h1 className="mt-4 max-w-3xl text-balance font-sf text-3xl font-bold leading-[1.08] tracking-[-0.02em] sm:text-4xl">
              {t.activeTitle}
            </h1>
            <p className="mt-3 max-w-2xl text-pretty text-sm leading-7 text-[#C9BFB2] sm:text-base">{t.activeBody}</p>

            <div className="mt-7 rounded-3xl border border-[#3A352F] bg-[#221F1B] p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#8F8677]">{t.demoLabel}</p>
                  <p className="mt-1.5 font-sf text-lg font-bold text-[#FBF9F3]">{activeMission.title[lang]}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F0B429]/15 px-3 py-1 text-xs font-bold text-[#F0B429]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#F0B429]" />
                  {t.activeStatusValue}
                </span>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-2.5">
                  <FileText className="mt-0.5 h-4 w-4 shrink-0 text-[#E8A0BF]" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wide text-[#8F8677]">{t.activeDeliverableWord}</p>
                    <p className="text-sm leading-snug text-[#E7E0D6]">{activeMission.deliverable[lang]}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#E8A0BF]" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wide text-[#8F8677]">{t.activeDelayWord}</p>
                    <p className="text-sm leading-snug text-[#E7E0D6]">{DELAY_TBD[lang]}</p>
                  </div>
                </div>
              </div>

              {activeCollab && (
                <div className="mt-5 flex items-center gap-3 border-t border-[#3A352F] pt-4">
                  <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-[#D10E63]/40">
                    <Image src={activeCollab.avatar || '/placeholder.svg'} alt={activeCollab.name} fill className="object-cover" sizes="40px" />
                  </span>
                  <p className="text-sm text-[#C9BFB2]">
                    <span className="font-bold text-[#FBF9F3]">{activeCollab.name}</span> · {activeMission.profile[lang]} — {t.activeAddedSuffix}
                  </p>
                </div>
              )}

              <a
                href="#demo"
                className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-[#D10E63] px-5 py-2.5 text-sm font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5"
              >
                {t.activeOpenCta}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Hero */}
      <section className="border-b border-[#E4DDCE] px-5 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-32">
        <div className="editorial-shell">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D10E63]">{t.kicker}</p>
          <h1 className="mt-4 max-w-3xl font-sf text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-[#1C1A17] sm:text-5xl lg:text-6xl">
            {t.titleA}
            <br />
            <span className="text-[#D10E63]">{t.titleB}</span>
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-[#5F594F] md:text-lg">{t.lead}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href={CREATE_ORG_HREF}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#1C1A17] px-6 py-3 text-sm font-bold text-[#F3EFE6] transition-transform hover:-translate-y-0.5"
            >
              {t.ctaPrimary}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#demo"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#4E483F] underline-offset-4 transition-colors hover:text-[#D10E63] hover:underline"
            >
              {t.ctaSecondary}
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Demo + journey (dark) */}
      <section id="demo" className="scroll-mt-20 bg-[#1C1A17] px-5 py-20 text-[#FBF9F3] sm:px-8 sm:py-28">
        <div className="editorial-shell grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Conversation */}
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#E8A0BF]">{t.demoLabel}</p>
            <div className="mt-6 space-y-4">
              {/* Claire */}
              <div className="flex items-start gap-3">
                <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full">
                  <Image src="/images/claire-avatar.png" alt="Claire" fill className="object-cover" sizes="36px" />
                </span>
                <div className="rounded-2xl rounded-tl-sm bg-[#2A2723] px-4 py-3">
                  <p className="text-xs font-bold text-[#C9BFB2]">{t.claire}</p>
                  <p className="mt-1 text-sm leading-relaxed text-[#FBF9F3]">{t.claireMsg}</p>
                </div>
              </div>
              {/* Hugo */}
              <div className="flex items-start gap-3">
                <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-2 ring-[#D10E63]/40">
                  <Image src="/images/hugo-avatar.png" alt="Hugo" fill className="object-cover" sizes="36px" />
                </span>
                <div className="rounded-2xl rounded-tl-sm bg-[#D10E63]/[0.12] px-4 py-3 ring-1 ring-[#D10E63]/25">
                  <p className="text-xs font-bold text-[#E8A0BF]">{t.hugo}</p>
                  <p className="mt-1 text-sm leading-relaxed text-[#FBF9F3]">{t.hugoMsg}</p>
                </div>
              </div>
              {/* Result */}
              <div className="rounded-2xl border border-[#3A352F] bg-[#221F1B] p-4">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#8F8677]">{t.resultLabel}</p>
                <p className="mt-2 text-sm leading-relaxed text-[#FBF9F3]">{t.resultMsg}</p>
                <div className="mt-4 flex gap-3">
                  <button className="inline-flex items-center gap-1.5 rounded-full border border-[#4A443C] px-4 py-2 text-sm font-semibold text-[#FBF9F3] transition-colors hover:bg-[#2A2723]">
                    <Eye className="h-4 w-4" />
                    {t.examine}
                  </button>
                  <button className="inline-flex items-center gap-1.5 rounded-full bg-[#22A06B] px-4 py-2 text-sm font-bold text-[#F3EFE6] transition-transform hover:-translate-y-0.5">
                    <CheckCircle2 className="h-4 w-4" />
                    {t.validate}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Journey */}
          <div className="lg:pt-8">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#E8A0BF]">{t.journeyLabel}</p>
            <ol className="mt-6 space-y-4">
              {t.steps.map((s, i) => (
                <li key={s.title} className="flex items-start gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#D10E63] font-mono text-sm font-bold text-[#FBF9F3]">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-sf text-base font-bold text-[#FBF9F3]">{s.title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-[#C9BFB2]">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section className="px-5 py-20 sm:px-8 sm:py-28">
        <div className="editorial-shell">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D10E63]">{t.featuresKicker}</p>
          <h2 className="mt-4 max-w-2xl text-balance font-sf text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-[#1C1A17] sm:text-4xl">
            {t.featuresTitle}
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {t.features.map((f) => {
              const Icon = f.icon
              return (
                <div key={f.title} className="rounded-3xl border border-[#E4DDCE] bg-[#FBF9F3] p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D10E63]/10 text-[#D10E63]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-sf text-lg font-bold tracking-[-0.01em] text-[#1C1A17]">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5F594F]">{f.body}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Governed autonomy */}
      <section className="border-y border-[#E4DDCE] bg-[#EFEADF] px-5 py-20 sm:px-8 sm:py-28">
        <div className="editorial-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D10E63]">{t.autonomyKicker}</p>
            <h2 className="mt-4 font-sf text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-[#1C1A17] sm:text-4xl">
              {t.autonomyTitle}
            </h2>
            <p className="mt-4 max-w-md text-base leading-7 text-[#5F594F]">{t.autonomyIntro}</p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {t.autonomyItems.map((item, i) => {
              const icons = [Eye, PenLine, Play, ShieldCheck, Wallet]
              const Icon = icons[i] ?? Eye
              return (
                <li key={item} className="flex items-center gap-3 rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] px-4 py-3.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#D10E63]/10 text-[#D10E63]">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-semibold text-[#1C1A17]">{item}</span>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* Organization context */}
      <section className="px-5 py-20 sm:px-8 sm:py-28">
        <div className="editorial-shell max-w-3xl">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D10E63]">{t.contextKicker}</p>
          <h2 className="mt-4 font-sf text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-[#1C1A17] sm:text-4xl">
            {t.contextTitle}
          </h2>
          <p className="mt-4 text-base leading-7 text-[#5F594F] md:text-lg">{t.contextBody}</p>
          <div className="mt-5 flex items-start gap-2.5 rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-4">
            <FolderLock className="mt-0.5 h-5 w-5 shrink-0 text-[#8A8175]" />
            <p className="text-sm leading-relaxed text-[#4E483F]">{t.contextNote}</p>
          </div>
        </div>
      </section>

      {/* Open technology (Hermes) */}
      <section className="bg-[#1C1A17] px-5 py-20 text-[#FBF9F3] sm:px-8 sm:py-28">
        <div className="editorial-shell max-w-3xl">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#E8A0BF]">{t.techKicker}</p>
          <h2 className="mt-4 font-sf text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-[#FBF9F3] sm:text-4xl">
            {t.techTitle}
          </h2>
          <p className="mt-4 text-base leading-7 text-[#C9BFB2] md:text-lg">{t.techBody}</p>
          <blockquote className="mt-8 flex items-start gap-3 border-l-2 border-[#D10E63] pl-5">
            <Cpu className="mt-1 h-5 w-5 shrink-0 text-[#E8A0BF]" />
            <p className="font-sf text-xl font-bold tracking-[-0.01em] text-[#FBF9F3] sm:text-2xl">{t.techQuote}</p>
          </blockquote>
          <Link
            href="/hermes"
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-bold text-[#E8A0BF] underline-offset-4 transition-colors hover:text-[#FBF9F3] hover:underline"
          >
            {t.techCta}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-5 py-24 text-center sm:px-8 sm:py-32">
        <div className="editorial-shell flex flex-col items-center">
          <h2 className="max-w-2xl text-balance font-sf text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-[#1C1A17] sm:text-5xl">
            {t.finalTitle}
          </h2>
          <p className="mt-5 max-w-xl text-pretty text-base leading-7 text-[#5F594F] md:text-lg">{t.finalBody}</p>
          <Link
            href={CREATE_ORG_HREF}
            className="mt-8 inline-flex items-center gap-1.5 rounded-full bg-[#D10E63] px-7 py-3.5 text-sm font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5"
          >
            {t.finalCta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}
