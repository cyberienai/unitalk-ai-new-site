'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import {
  ArrowRight,
  ListChecks,
  ShieldCheck,
  FileCheck2,
  Users,
  Eye,
  CheckCircle2,
  Clock,
  FileText,
  Sparkles,
  Mail,
  Phone,
  CalendarClock,
  BadgeCheck,
} from 'lucide-react'
import { useLanguage, type Lang } from '@/lib/language-context'
import { getMission, DELAY_TBD } from '@/lib/missions-catalog'
import { ROLE_DETAILS } from '@/lib/collaborators-catalog'

type InterfaceCard = { icon: React.ComponentType<{ className?: string }>; title: string; body: string }
type Copy = {
  // Hero + mission in action
  kicker: string
  titleA: string
  titleB: string
  lead: string
  ctaPrimary: string
  ctaSecondary: string
  channels: string
  demoLabel: string
  claire: string
  claireMsg: string
  hugo: string
  hugoMsg: string
  resultLabel: string
  resultValue: string
  resultNote: string
  examine: string
  modify: string
  validate: string
  flow: string
  // Section 2 — all work in one place
  workKicker: string
  workTitle: string
  interface: InterfaceCard[]
  sharedContext: string
  // Section 3 — public profile → private workspace
  profileKicker: string
  profileTitle: string
  profileRole: string
  verified: string
  profileTags: string
  availability: string
  write: string
  call: string
  book: string
  entrust: string
  profileNote: string
  profilePrivacy: string
  // Section 4 — governed autonomy
  autonomyKicker: string
  autonomyTitle: string
  autonomyIntro: string
  autonomyItems: string[]
  expertLine: string
  expertCta: string
  // Section 5 — proof band + final CTA
  techTitle: string
  techBody: string
  techEngine: string
  techCta: string
  finalTitle: string
  finalBody: string
  finalCta: string
  finalProof: string
  // Active mission banner (functional state)
  activeBadge: string
  activeTitle: string
  activeBody: string
  activeStatusValue: string
  activeDeliverableWord: string
  activeDelayWord: string
  activeOpenCta: string
  activeAddedSuffix: string
}

const CREATE_ORG_HREF = '/decouvrir'

const T: Record<Lang, Copy> = {
  fr: {
    kicker: 'Workspace',
    titleA: 'Le travail avance.',
    titleB: 'Vous gardez la main.',
    lead: 'Le workspace réunit les missions, les décisions, les fichiers et les résultats de vos équipes et de vos Collaborateurs IA.',
    ctaPrimary: 'Confier une première mission',
    ctaSecondary: 'Voir le workspace en action',
    channels: 'Web · Desktop · Messageries · Terminal',
    demoLabel: 'Mission en action',
    claire: 'Claire',
    claireMsg: 'Hugo, prépare la prospection pour notre nouvelle offre.',
    hugo: 'Hugo · Collaborateur IA commercial',
    hugoMsg: 'Je sélectionne les entreprises pertinentes et prépare les prises de contact. Je vous demanderai confirmation avant tout envoi.',
    resultLabel: 'Résultat',
    resultValue: '36 entreprises analysées · 12 retenues · 12 messages prêts',
    resultNote: 'Aucun message n’est envoyé sans validation.',
    examine: 'Examiner',
    modify: 'Modifier',
    validate: 'Valider',
    flow: 'Objectif → Travail → Décision humaine → Résultat conservé',
    workKicker: 'Tout le travail au même endroit',
    workTitle: 'Pas seulement des conversations. Des missions qui avancent.',
    interface: [
      { icon: ListChecks, title: 'Missions', body: 'Ce qui est à préparer, en cours, à valider ou terminé.' },
      { icon: ShieldCheck, title: 'Décisions', body: 'Les actions qui nécessitent votre arbitrage.' },
      { icon: Users, title: 'Collaborateurs IA', body: 'Qui travaille, sur quoi et avec quelles limites.' },
      { icon: FileCheck2, title: 'Résultats', body: 'Les livrables, leurs sources, les décisions et les coûts.' },
    ],
    sharedContext:
      'Vos équipes partagent le contexte autorisé. Chaque Collaborateur IA conserve l’expérience validée de ses missions.',
    profileKicker: 'Du profil public au workspace privé',
    profileTitle: 'Une présence publique. Un travail privé.',
    profileRole: 'Collaborateur IA · Solvea',
    verified: 'Entreprise vérifiée',
    profileTags: 'Commercial · Prospection',
    availability: 'Disponible sur rendez-vous',
    write: 'Écrire',
    call: 'Appeler',
    book: 'Prendre rendez-vous',
    entrust: 'Confier une demande',
    profileNote:
      'Les demandes reçues depuis son profil, votre site, son email ou son téléphone entrent dans le workspace et suivent vos règles de validation.',
    profilePrivacy: 'Le visiteur n’accède jamais à votre espace privé.',
    autonomyKicker: 'Autonomie gouvernée',
    autonomyTitle: 'Il sait ce qu’il peut faire seul.',
    autonomyIntro: 'Pour chaque mission, vous définissez :',
    autonomyItems: [
      'ce qu’il peut consulter',
      'ce qu’il peut préparer',
      'ce qu’il peut exécuter',
      'ce qu’il doit faire valider',
      'ce qu’il peut dépenser',
    ],
    expertLine:
      'Vous pouvez aussi inviter un expert sur une mission précise, pour une durée définie, sans ouvrir le reste de votre workspace.',
    expertCta: 'Découvrir les Experts',
    techTitle: 'Changez de modèle. Pas de Collaborateur.',
    techBody:
      'Unitalk utilise les modèles autorisés les plus adaptés à chaque tâche. L’identité, la mémoire et l’historique restent les mêmes.',
    techEngine: 'Propulsé par Hermes, le moteur d’agents autonome open source.',
    techCta: 'Découvrir Hermes',
    finalTitle: 'Humains et Collaborateurs IA, dans le même espace de travail.',
    finalBody: 'Confiez une première mission. Alma prépare le Collaborateur, les accès et les validations nécessaires.',
    finalCta: 'Confier une première mission',
    finalProof: '7 jours d’essai · Sans carte bancaire · Données sous votre contrôle',
    activeBadge: 'Mission en préparation',
    activeTitle: 'Votre première mission est déjà là.',
    activeBody:
      'Votre workspace ne s’ouvre jamais vide. Votre Collaborateur IA prépare le travail et vous sollicite avant toute action sensible.',
    activeStatusValue: 'En préparation',
    activeDeliverableWord: 'Livrable attendu',
    activeDelayWord: 'Délai',
    activeOpenCta: 'Suivre la mission',
    activeAddedSuffix: 'a rejoint votre organisation.',
  },
  en: {
    kicker: 'Workspace',
    titleA: 'The work moves forward.',
    titleB: 'You stay in control.',
    lead: 'The workspace brings together the missions, decisions, files and results of your teams and your AI Collaborators.',
    ctaPrimary: 'Assign a first mission',
    ctaSecondary: 'See the workspace in action',
    channels: 'Web · Desktop · Messaging · Terminal',
    demoLabel: 'Mission in action',
    claire: 'Claire',
    claireMsg: 'Hugo, prepare prospecting for our new offer.',
    hugo: 'Hugo · Sales AI Collaborator',
    hugoMsg: 'I select the relevant companies and prepare the outreach. I’ll ask for confirmation before sending anything.',
    resultLabel: 'Result',
    resultValue: '36 companies analyzed · 12 shortlisted · 12 messages ready',
    resultNote: 'No message is sent without approval.',
    examine: 'Review',
    modify: 'Edit',
    validate: 'Approve',
    flow: 'Goal → Work → Human decision → Result kept',
    workKicker: 'All the work in one place',
    workTitle: 'Not just conversations. Missions that move forward.',
    interface: [
      { icon: ListChecks, title: 'Missions', body: 'What’s to prepare, in progress, to approve or done.' },
      { icon: ShieldCheck, title: 'Decisions', body: 'The actions that need your arbitration.' },
      { icon: Users, title: 'AI Collaborators', body: 'Who works, on what and within which limits.' },
      { icon: FileCheck2, title: 'Results', body: 'Deliverables, their sources, decisions and costs.' },
    ],
    sharedContext:
      'Your teams share the authorized context. Each AI Collaborator keeps the validated experience of its missions.',
    profileKicker: 'From public profile to private workspace',
    profileTitle: 'A public presence. Private work.',
    profileRole: 'AI Collaborator · Solvea',
    verified: 'Verified company',
    profileTags: 'Sales · Prospecting',
    availability: 'Available by appointment',
    write: 'Write',
    call: 'Call',
    book: 'Book a meeting',
    entrust: 'Send a request',
    profileNote:
      'Requests received from his profile, your website, his email or his phone enter the workspace and follow your approval rules.',
    profilePrivacy: 'The visitor never reaches your private space.',
    autonomyKicker: 'Governed autonomy',
    autonomyTitle: 'It knows what it can do on its own.',
    autonomyIntro: 'For each mission, you define:',
    autonomyItems: [
      'what it can view',
      'what it can prepare',
      'what it can execute',
      'what it must get approved',
      'what it can spend',
    ],
    expertLine:
      'You can also invite an expert on a specific mission, for a defined period, without opening the rest of your workspace.',
    expertCta: 'Discover Experts',
    techTitle: 'Switch the model. Not the Collaborator.',
    techBody:
      'Unitalk uses the authorized models best suited to each task. The identity, memory and history stay the same.',
    techEngine: 'Powered by Hermes, the open-source autonomous agent engine.',
    techCta: 'Discover Hermes',
    finalTitle: 'Humans and AI Collaborators, in the same workspace.',
    finalBody: 'Assign a first mission. Alma prepares the Collaborator, the access and the approvals needed.',
    finalCta: 'Assign a first mission',
    finalProof: '7-day trial · No credit card · Your data under your control',
    activeBadge: 'Mission being prepared',
    activeTitle: 'Your first mission is already here.',
    activeBody:
      'Your workspace never opens empty. Your AI Collaborator prepares the work and checks with you before any sensitive action.',
    activeStatusValue: 'Being prepared',
    activeDeliverableWord: 'Expected deliverable',
    activeDelayWord: 'Timeline',
    activeOpenCta: 'Follow the mission',
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

      {/* 1 — Hero + mission in action */}
      <section id="demo" className="scroll-mt-20 border-b border-[#E4DDCE] px-5 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-32">
        <div className="editorial-shell grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
          {/* Hero copy */}
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D10E63]">{t.kicker}</p>
            <h1 className="mt-4 max-w-2xl font-sf text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-[#1C1A17] sm:text-5xl">
              {t.titleA}
              <br />
              <span className="text-[#D10E63]">{t.titleB}</span>
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-base leading-7 text-[#5F594F] md:text-lg">{t.lead}</p>
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
            <p className="mt-6 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8A8175]">
              {t.channels}
            </p>
          </div>

          {/* Mission in action card */}
          <div className="rounded-3xl border border-[#E4DDCE] bg-[#1C1A17] p-5 text-[#FBF9F3] sm:p-6">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#E8A0BF]">{t.demoLabel}</p>
            <div className="mt-4 space-y-3">
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
                <p className="mt-2 font-sf text-sm font-bold leading-snug text-[#FBF9F3]">{t.resultValue}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-[#C9BFB2]">{t.resultNote}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button className="inline-flex items-center gap-1.5 rounded-full border border-[#4A443C] px-3.5 py-1.5 text-xs font-semibold text-[#FBF9F3] transition-colors hover:bg-[#2A2723]">
                    <Eye className="h-3.5 w-3.5" />
                    {t.examine}
                  </button>
                  <button className="inline-flex items-center gap-1.5 rounded-full border border-[#4A443C] px-3.5 py-1.5 text-xs font-semibold text-[#FBF9F3] transition-colors hover:bg-[#2A2723]">
                    {t.modify}
                  </button>
                  <button className="inline-flex items-center gap-1.5 rounded-full bg-[#22A06B] px-3.5 py-1.5 text-xs font-bold text-[#F3EFE6] transition-transform hover:-translate-y-0.5">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {t.validate}
                  </button>
                </div>
              </div>
            </div>
            <p className="mt-4 rounded-xl bg-[#221F1B] px-4 py-2.5 text-center font-mono text-[11px] leading-relaxed text-[#8F8677]">
              {t.flow}
            </p>
          </div>
        </div>
      </section>

      {/* 2 — All the work in one place */}
      <section className="px-5 py-20 sm:px-8 sm:py-24">
        <div className="editorial-shell">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D10E63]">{t.workKicker}</p>
          <h2 className="mt-4 max-w-2xl text-balance font-sf text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-[#1C1A17] sm:text-4xl">
            {t.workTitle}
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.interface.map((f) => {
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
          <p className="mt-8 max-w-2xl text-pretty text-base leading-7 text-[#4E483F]">{t.sharedContext}</p>
        </div>
      </section>

      {/* 3 — Public profile → private workspace */}
      <section className="border-y border-[#E4DDCE] bg-[#EFEADF] px-5 py-20 sm:px-8 sm:py-24">
        <div className="editorial-shell grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D10E63]">{t.profileKicker}</p>
            <h2 className="mt-4 font-sf text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-[#1C1A17] sm:text-4xl">
              {t.profileTitle}
            </h2>
            <p className="mt-5 max-w-md text-pretty text-base leading-7 text-[#5F594F]">{t.profileNote}</p>
            <p className="mt-3 flex items-start gap-2 text-sm font-semibold leading-relaxed text-[#3B362F]">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#2E7D5B]" />
              {t.profilePrivacy}
            </p>
          </div>

          {/* Public profile card */}
          <div className="overflow-hidden rounded-3xl border border-[#E4DDCE] bg-[#FBF9F3]">
            <div className="flex items-center gap-3 border-b border-[#EFE8DA] px-5 py-4 sm:px-6">
              <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-[#D10E63]/30">
                <Image src="/images/hugo-avatar.png" alt="Hugo" fill className="object-cover" sizes="48px" />
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="font-sf text-[15px] font-bold text-[#1C1A17]">Hugo</p>
                  <BadgeCheck className="h-4 w-4 text-[#2E7D5B]" aria-label={t.verified} />
                </div>
                <p className="text-[13px] text-[#8A8175]">{t.profileRole}</p>
              </div>
            </div>

            <div className="grid gap-px bg-[#EFE8DA] sm:grid-cols-2">
              <div className="bg-[#FBF9F3] px-5 py-4 sm:px-6">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#8A8175]">{t.profileTags}</p>
                <p className="mt-1.5 font-mono text-[13px] text-[#3B362F]">unitalk.ai/@hugo-solvea</p>
              </div>
              <div className="bg-[#FBF9F3] px-5 py-4 sm:px-6">
                <p className="flex items-center gap-1.5 text-[13px] text-[#3B362F]">
                  <Mail className="h-3.5 w-3.5 text-[#8A8175]" />
                  hugo@solvea.fr
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-[13px] text-[#3B362F]">
                  <Phone className="h-3.5 w-3.5 text-[#8A8175]" />
                  +33 1 •• •• •• ••
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-[13px] text-[#8A8175]">
                  <CalendarClock className="h-3.5 w-3.5" />
                  {t.availability}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 border-t border-[#EFE8DA] px-5 py-4 sm:px-6">
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#1C1A17] px-3.5 py-2 text-[13px] font-bold text-[#FBF9F3]">
                <Mail className="h-3.5 w-3.5" />
                {t.write}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#D8D0C2] px-3.5 py-2 text-[13px] font-semibold text-[#3B362F]">
                <Phone className="h-3.5 w-3.5" />
                {t.call}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#D8D0C2] px-3.5 py-2 text-[13px] font-semibold text-[#3B362F]">
                <CalendarClock className="h-3.5 w-3.5" />
                {t.book}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#D10E63]/25 bg-[#FCEAF2] px-3.5 py-2 text-[13px] font-bold text-[#AD0C53]">
                {t.entrust}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4 — Governed autonomy (+ Expert reduced to one line) */}
      <section className="px-5 py-20 sm:px-8 sm:py-24">
        <div className="editorial-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D10E63]">{t.autonomyKicker}</p>
            <h2 className="mt-4 font-sf text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-[#1C1A17] sm:text-4xl">
              {t.autonomyTitle}
            </h2>
            <p className="mt-4 max-w-md text-base leading-7 text-[#5F594F]">{t.autonomyIntro}</p>
          </div>
          <div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {t.autonomyItems.map((item, i) => {
                const Icon = [Eye, FileText, CheckCircle2, ShieldCheck, ListChecks][i] ?? Eye
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
            <p className="mt-6 text-pretty text-sm leading-7 text-[#4E483F]">{t.expertLine}</p>
            <Link
              href="/experts"
              className="mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-[#AD0C53] underline-offset-4 transition-colors hover:underline"
            >
              {t.expertCta}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5 — Proof band (Hermes) + final CTA */}
      <section className="bg-[#1C1A17] px-5 py-16 text-[#FBF9F3] sm:px-8 sm:py-20">
        <div className="editorial-shell max-w-3xl text-center">
          <h2 className="font-sf text-2xl font-bold leading-[1.15] tracking-[-0.01em] text-[#FBF9F3] sm:text-3xl">
            {t.techTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-sm leading-7 text-[#C9BFB2] sm:text-base">{t.techBody}</p>
          <p className="mt-5 font-mono text-[12px] uppercase tracking-[0.14em] text-[#8F8677]">{t.techEngine}</p>
          <Link
            href="/hermes"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#E8A0BF] underline-offset-4 transition-colors hover:text-[#FBF9F3] hover:underline"
          >
            {t.techCta}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

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
          <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-[#8A8175]">{t.finalProof}</p>
        </div>
      </section>
    </main>
  )
}
