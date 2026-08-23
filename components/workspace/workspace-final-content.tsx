'use client'

import Image from 'next/image'
import { ArrowRight, Check, Clock3, ShieldCheck } from 'lucide-react'
import { LocalizedLink as Link } from '@/components/localized-link'
import { AlmaInline } from '@/components/alma-inline'
import { useLanguage, type Lang } from '@/lib/language-context'
import { Kicker } from '@/components/home/section-kicker'
import { CtaButton } from '@/components/ui/cta-button'
import { localizedHref } from '@/lib/i18n-routing'

type WorkspaceOnboarding = {
  companyName: string
  missionTitle: string
  collaboratorName: string
  profile: { fr: string; en: string }
  collaboratorTemplateSlug?: string
}

const HERMES_DEMO = 'https://hermes-assets.nousresearch.com/hermes-desktop.mp4'
const HERMES_POSTER = 'https://web-assets.nousresearch.com/nousnet-web/img/desktop/showcase.a7afcde8704fe87f.webp'

export function WorkspaceFinalContent({ onboarding }: { onboarding?: WorkspaceOnboarding }) {
  const { lang } = useLanguage()
  const t = COPY[lang]

  return (
    <main id="main-content" className="overflow-hidden bg-[#F3EFE6] font-sf text-[#1C1A17]">
      <section className="relative border-b border-[#D8D0C2] px-5 pb-14 pt-28 sm:px-8 sm:pb-20 sm:pt-36">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[.035] [background-image:linear-gradient(#1C1A17_1px,transparent_1px),linear-gradient(90deg,#1C1A17_1px,transparent_1px)] [background-size:72px_72px]" />
        <div aria-hidden className="pointer-events-none absolute -right-40 top-16 size-[34rem] rounded-full bg-[#D10E63]/10 blur-3xl" />
        <div className="editorial-shell relative grid items-end gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
          <div>
            <Kicker>Unitalk Workspace</Kicker>
            <h1 className="hero-heading mt-5 whitespace-pre-line">{onboarding ? (lang === 'fr' ? `${onboarding.collaboratorName} est prêt.\nLa mission peut commencer.` : `${onboarding.collaboratorName} is ready.\nThe mission can begin.`) : t.heroTitle}</h1>
          </div>
          <div className="pb-1">
            <p className="max-w-xl text-[17px] leading-8 text-[#4E483F]">{onboarding ? (lang === 'fr' ? `Votre Workspace ${onboarding.companyName} conserve la mission « ${onboarding.missionTitle} ». Alma prépare les accès et soumet les actions sensibles à votre validation.` : `Your ${onboarding.companyName} Workspace keeps the “${onboarding.missionTitle}” mission. Alma prepares access and submits sensitive actions for your approval.`) : t.heroLead}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <CtaButton href={onboarding ? '#mission-example' : localizedHref('missions', lang)}>{onboarding ? t.openMission : t.heroCta}<ArrowRight className="size-4" /></CtaButton>
              <a href="#workspace-demo" className="inline-flex min-h-11 items-center justify-center px-3 text-sm font-bold text-[#4E483F] underline decoration-[#D10E63]/30 underline-offset-4">{t.demoCta}</a>
            </div>
            <p className="mt-5 text-xs font-semibold text-[#6E665A]">{onboarding ? t.onboardingNote : t.availability}</p>
          </div>
        </div>
      </section>

      <section id="workspace-demo" className="bg-[#151310] px-5 py-14 text-white sm:px-8 sm:py-20">
        <div className="editorial-shell">
          <div className="grid gap-8 lg:grid-cols-[.62fr_1.38fr] lg:items-end">
            <div>
              <p className="font-mono text-[10px] font-black uppercase tracking-[.18em] text-[#F2A4C5]">{onboarding ? t.genericDemo : t.demoKicker}</p>
              <h2 className="mt-5 text-balance text-[clamp(2.4rem,5vw,5rem)] font-semibold leading-[.94] tracking-[-.06em]">{t.demoTitle}</h2>
              <p className="mt-5 max-w-xl text-[15px] leading-7 text-[#CFC6B8]">{t.demoLead}</p>
            </div>
            <p className="text-sm leading-7 text-[#AFA69A] lg:max-w-lg lg:justify-self-end">{t.demoNote}</p>
          </div>
          <div className="mt-10 overflow-hidden rounded-[24px] border border-white/15 bg-black shadow-[0_35px_100px_-45px_rgba(0,0,0,.9)]">
            <video className="aspect-video w-full object-cover" controls playsInline preload="metadata" poster={HERMES_POSTER} aria-label={t.videoLabel}>
              <source src={HERMES_DEMO} type="video/mp4" />
            </video>
          </div>
          <div className="mt-4 flex flex-col justify-between gap-3 text-xs text-[#AFA69A] sm:flex-row sm:items-center">
            <p>{t.videoCaption}</p>
            <a href="https://hermes-agent.nousresearch.com/" target="_blank" rel="noreferrer" className="font-bold text-[#F2A4C5] underline decoration-white/20 underline-offset-4">{t.videoSource}<span aria-hidden className="ml-1.5">↗</span></a>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="editorial-shell">
          <div className="max-w-3xl"><Kicker>{t.capabilitiesKicker}</Kicker><h2 className="mt-5 text-balance text-[clamp(2.4rem,5vw,4.8rem)] font-semibold leading-[.95] tracking-[-.06em]">{t.capabilitiesTitle}</h2><p className="mt-5 text-[16px] leading-8 text-[#625B50]">{t.capabilitiesLead}</p></div>
          <div className="mt-12 grid border-l border-t border-[#D8D0C2] sm:grid-cols-2 lg:grid-cols-3">
            {t.capabilities.map((item, index) => <article key={item.title} className="min-h-64 border-b border-r border-[#D8D0C2] p-6 sm:p-7"><span className="font-mono text-[10px] font-black tracking-[.16em] text-[#B00C54]">0{index + 1}</span><h3 className="mt-10 text-2xl font-semibold tracking-[-.04em]">{item.title}</h3><p className="mt-4 text-sm leading-7 text-[#625B50]">{item.body}</p></article>)}
          </div>
        </div>
      </section>

      <section className="border-t border-[#D8D0C2] bg-[#FAF8F3] px-5 py-16 sm:px-8 sm:py-20">
        <div className="editorial-shell grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-start lg:gap-20">
          <div><Kicker>{t.downloadKicker}</Kicker><h2 className="mt-5 text-balance text-[clamp(2.35rem,4.5vw,4.4rem)] font-semibold leading-[.96] tracking-[-.055em]">{t.downloadTitle}</h2><p className="mt-5 max-w-xl text-[15px] leading-7 text-[#625B50]">{t.downloadLead}</p></div>
          <div><div className="grid gap-px overflow-hidden rounded-[24px] border border-[#D8D0C2] bg-[#D8D0C2] sm:grid-cols-2">{t.desktopLayers.map(([title, body]) => <article key={title} className="bg-white p-5 sm:p-6"><h3 className="text-base font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-[#625B50]">{body}</p></article>)}</div><CtaButton href="/desktop" className="mt-6">{t.discoverDesktop}<ArrowRight className="size-4" /></CtaButton></div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="editorial-shell">
          <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-end"><div><Kicker>{t.spacesKicker}</Kicker><h2 className="mt-5 text-balance text-[clamp(2.4rem,4.5vw,4.5rem)] font-semibold leading-[.95] tracking-[-.06em]"><span className="block">{t.spacesTitle}</span><span className="block text-[#D10E63]">{t.spacesAccent}</span></h2></div><p className="max-w-2xl text-[15px] leading-7 text-[#625B50]">{t.spacesLead}</p></div>
           <div className="mt-10 grid gap-px overflow-hidden rounded-[28px] border border-[#D8D0C2] bg-[#D8D0C2] lg:grid-cols-3">{t.spaces.map(([title,body,items])=><article key={title} className="bg-[#FAF8F3] p-6 sm:p-7"><h3 className="text-2xl font-semibold tracking-[-.04em]">{title}</h3><p className="mt-4 text-sm leading-7 text-[#625B50]">{body}</p><ul className="mt-6 space-y-3 border-t border-[#DED6C8] pt-5">{items.map(item=><li key={item} className="flex gap-2 text-xs font-semibold leading-5"><Check className="mt-0.5 size-3.5 shrink-0 text-[#D10E63]"/>{item}</li>)}</ul></article>)}</div>
           <WorkspaceMissionPreview lang={lang} onboarding={onboarding} />
          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <article className="rounded-[26px] border border-[#D8D0C2] bg-[#EAE3D4] p-6 sm:p-8"><p className="font-mono text-[10px] font-black uppercase tracking-[.16em] text-[#B00C54]">{t.memoryKicker}</p><h3 className="mt-4 text-2xl font-semibold tracking-[-.04em]">{t.memoryTitle}</h3><p className="mt-4 text-sm leading-7 text-[#625B50]">{t.memoryBody}</p><Link href="/documentation/memoire-gouvernee" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#B00C54]">{t.learnMemory}<ArrowRight className="size-4"/></Link></article>
            <article className="rounded-[26px] border border-[#292521] bg-[#211E1A] p-6 text-white sm:p-8"><p className="font-mono text-[10px] font-black uppercase tracking-[.16em] text-[#F2A4C5]">{t.communicationKicker}</p><h3 className="mt-4 text-2xl font-semibold tracking-[-.04em]">{t.communicationTitle}</h3><p className="mt-4 text-sm leading-7 text-[#CFC6B8]">{t.communicationBody}</p><Link href="/documentation/communications" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#F2A4C5]">{t.learnCommunications}<ArrowRight className="size-4"/></Link></article>
          </div>
        </div>
      </section>

      <section className="border-y border-[#D8D0C2] bg-[#EAE3D4] px-5 py-16 sm:px-8 sm:py-20">
        <div className="editorial-shell grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
          <div><Kicker>{t.governanceKicker}</Kicker><h2 className="mt-5 text-balance text-[clamp(2.35rem,4.5vw,4.4rem)] font-semibold leading-[.96] tracking-[-.055em]">{t.governanceTitle}</h2><p className="mt-5 text-[15px] leading-7 text-[#625B50]">{t.governanceLead}</p></div>
          <div className="overflow-hidden rounded-[24px] border border-[#D8D0C2] bg-[#FFFDF9]">
            {t.governance.map(([label, title, body], index) => <div key={label} className="grid gap-4 border-b border-[#E4DDCE] p-5 last:border-b-0 sm:grid-cols-[7rem_1fr] sm:p-6"><p className="font-mono text-[10px] font-black uppercase tracking-[.14em] text-[#B00C54]">{String(index + 1).padStart(2, '0')} · {label}</p><div><h3 className="text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-[#625B50]">{body}</p></div></div>)}
          </div>
        </div>
      </section>

      <section className="border-b border-[#D8D0C2] bg-[#EAE3D4] px-5 py-12 sm:px-8 sm:py-16">
        <div className="editorial-shell grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-4xl">
            <Kicker>{t.freeKicker}</Kicker>
            <h2 className="mt-5 text-balance text-[clamp(2.2rem,4.5vw,4.4rem)] font-semibold leading-[.96] tracking-[-.055em]">{t.freeTitle}</h2>
            <p className="mt-5 max-w-3xl text-[16px] leading-8 text-[#4E483F]">{withAlmaAvatar(t.freeBody)}</p>
          </div>
          <CtaButton href="/decouvrir?source=workspace-free-mission">{t.freeCta}<ArrowRight className="size-4" /></CtaButton>
        </div>
      </section>

      <section className="bg-[#151310] px-5 py-16 text-white sm:px-8 sm:py-20">
        <div className="editorial-shell">
          <div className="max-w-3xl"><p className="font-mono text-[10px] font-black uppercase tracking-[.18em] text-[#F2A4C5]">{t.rolesKicker}</p><h2 className="mt-5 text-balance text-[clamp(2.3rem,4vw,4rem)] font-semibold leading-[.96] tracking-[-.055em]">{t.rolesTitle}</h2></div>
          <div className="mt-10 grid gap-px overflow-hidden rounded-[20px] border border-white/10 bg-white/10 md:grid-cols-3">
            <Actor image="/images/claire-avatar.png" title={t.humanTitle} body={t.humanBody} />
            <Actor image="/images/hugo-avatar.png" title={t.aiTitle} body={t.aiBody} />
            <Actor image="/alma-avatar.png" title={t.almaTitle} body={t.almaBody} />
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-20">
        <div className="editorial-shell flex flex-col items-start justify-between gap-8 rounded-[24px] border border-[#D8D0C2] bg-[#FAF8F3] p-7 sm:p-10 lg:flex-row lg:items-end">
          <div className="max-w-3xl"><Kicker>{t.finalKicker}</Kicker><h2 className="mt-5 text-[clamp(2.3rem,4vw,4rem)] font-semibold leading-[.96] tracking-[-.055em]">{t.finalTitle}</h2><p className="mt-5 max-w-2xl text-[16px] leading-7 text-[#4E483F]">{t.finalBody}</p><p className="mt-5 text-sm font-semibold"><AlmaInline /> Alma · {t.almaRole}</p></div>
          <div className="flex flex-col items-start gap-4 lg:items-end"><CtaButton href={localizedHref('missions', lang)}>{t.finalCta}<ArrowRight className="size-4" /></CtaButton><Link href={localizedHref('pricing', lang)} className="text-sm font-bold underline decoration-[#D10E63]/30 underline-offset-4">{t.pricing}</Link></div>
        </div>
      </section>
    </main>
  )
}

function WorkspaceMissionPreview({ lang, onboarding }: { lang: Lang; onboarding?: WorkspaceOnboarding }) {
  const t = COPY[lang]
  return <section id="mission-example" className="mt-14 grid scroll-mt-24 overflow-hidden rounded-[24px] border border-[#D8D0C2] bg-[#FFFDF9] lg:grid-cols-[.7fr_1.3fr]"><div className="border-b border-[#D8D0C2] p-6 lg:border-b-0 lg:border-r lg:p-8"><p className="font-mono text-[10px] font-black uppercase tracking-[.16em] text-[#B00C54]">{t.unitalkPreviewKicker}</p><h3 className="mt-4 text-2xl font-semibold tracking-[-.04em]">{onboarding?.missionTitle ?? t.missionTitle}</h3><div className="mt-4 flex items-center gap-3">{!onboarding && <Image src="/images/nadia-avatar.png" alt="" width={40} height={40} className="size-10 rounded-full object-cover"/>}<p className="text-sm leading-6 text-[#625B50]">{onboarding ? `${onboarding.collaboratorName} · ${onboarding.profile[lang]}` : t.unitalkPreviewBody}</p></div></div><div className="p-6 lg:p-8"><ol className="grid gap-5 sm:grid-cols-3">{t.previewActivity.map(([time, body], index) => <li key={time}><span className="flex items-center gap-2 font-mono text-[9px] font-black uppercase tracking-[.12em] text-[#857C6E]">{index === t.previewActivity.length - 1 ? <ShieldCheck className="size-4 text-[#D10E63]" /> : index === 0 ? <Clock3 className="size-4 text-[#B00C54]" /> : <Check className="size-4 text-[#257A43]" />}{time}</span><p className="mt-2 text-sm font-semibold leading-6 text-[#4E483F]">{body}</p></li>)}</ol><div className="mt-6 flex items-center justify-between gap-4 rounded-xl bg-[#211E1A] p-4 text-white"><div><p className="font-mono text-[9px] font-black uppercase tracking-[.14em] text-[#F2A4C5]">{t.decisionRequired}</p><p className="mt-1 text-sm font-semibold">{t.previewQuestion}</p></div><span className="shrink-0 rounded-full bg-[#D10E63] px-3 py-1.5 text-[10px] font-bold">{t.toApprove}</span></div></div></section>
}

function Actor({ image, title, body }: { image: string; title: string; body: string }) {
  return <article className="bg-[#211E1B] p-6"><Image src={image} alt="" width={48} height={48} className="size-12 rounded-full object-cover" /><h3 className="mt-6 text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-7 text-[#CFC6B8]">{body}</p></article>
}

function withAlmaAvatar(value: string) {
  return value.split('Alma').map((part, index) => <span key={`${part}-${index}`}>{index > 0 && <><AlmaInline className="mr-1 align-[-.2em]" />Alma</>}{part}</span>)
}

const COPY = {
  fr: {
    heroTitle: 'Un espace de travail\noù humains et IA collaborent.',
    heroLead: 'Confiez une mission, suivez le travail et gardez la décision. Le Workspace Unitalk transforme un moteur agentique open source en environnement de travail gouverné pour votre entreprise.',
    heroCta: 'Explorer les missions', openMission: 'Voir un exemple de mission', demoCta: 'Voir la démonstration',
    availability: 'Web et Desktop · Mémoire · Outils · Validations humaines',
    onboardingNote: 'Première mission offerte · Applications connectées uniquement avec votre accord',
    previewMission: 'Mission en cours', readyMission: 'Première mission · Prête à démarrer', setupRequired: 'Configuration requise', previewStatus: 'Validation requise', missionTitle: 'Relancer les factures impayées',
    previewActivity: [['10:14', 'Nadia identifie 12 factures échues.'], ['10:16', 'Deux dossiers comportent un litige ouvert.'], ['10:18', 'Dix relances attendent votre validation.']] as const,
    decisionRequired: 'Décision requise', previewQuestion: 'Autoriser l’envoi des dix relances préparées ?',
    genericDemo: 'Démonstration générique du Workspace', demoKicker: 'Démonstration vidéo', demoTitle: 'Le moteur open source utilisé par Unitalk',
    demoLead: 'Le moteur exécute. Unitalk orchestre le travail et les décisions à l’échelle de l’entreprise.',
    demoNote: 'Unitalk ajoute au moteur open source le Workspace partagé, les missions, les profils, les droits, les validations humaines et l’administration.',
    videoLabel: 'Démonstration vidéo du projet Hermes Desktop', videoCaption: 'Démonstration officielle du projet open source Hermes Desktop par Nous Research. Unitalk Desktop en est une distribution enrichie. Ce n’est pas une capture du Workspace Unitalk.', videoSource: 'Voir la source officielle',
    freeKicker: 'Commencez gratuitement', freeTitle: 'Votre Workspace Solo est gratuit. Votre première mission aussi.', freeBody: 'Alma configure l’accès aux modèles IA, prépare la synchronisation avec Unitalk AI Cloud et vous accompagne jusqu’à la première mission de votre Collaborateur IA.', freeCta: 'Créer mon Workspace Solo',
    capabilitiesKicker: 'Les capacités du moteur', capabilitiesTitle: 'Six capacités agentiques. Un cadre Unitalk.', capabilitiesLead: 'Le moteur open source apporte les capacités d’exécution. Unitalk les intègre aux missions et aux règles de votre entreprise.',
    capabilities: [
      { title: 'Disponible partout', body: 'Le moteur fonctionne depuis une interface Desktop, le terminal et des canaux comme Slack, Discord ou Telegram.' },
      { title: 'Mémoire persistante', body: 'Il conserve le contexte utile, apprend les méthodes de travail et réutilise ses compétences.' },
      { title: 'Automatisation ciblée', body: 'Planifiez en langage naturel des rapports, sauvegardes, briefings et autres tâches récurrentes.' },
      { title: 'Tâches multipliées', body: 'Déléguez des travaux parallèles à des sous-agents isolés avec leurs propres conversations et outils.' },
      { title: 'Navigation web', body: 'Recherche web, navigateur, vision et outils multimodaux étendent les missions réalisables.' },
      { title: 'Exécution isolée', body: 'Plusieurs environnements d’exécution permettent d’isoler et d’adapter le travail agentique.' },
    ],
    spacesKicker: 'Collaboration à tous les niveaux', spacesTitle: 'Un espace pour chacun.', spacesAccent: 'Un contexte commun pour avancer.', spacesLead: 'Privé pour se concentrer, partagé pour collaborer, Entreprise pour gouverner. Chaque membre autorisé accède aux missions, Assistants IA et décisions dont il a besoin, sans devoir disposer de son propre Collaborateur IA.',
    spaces: [
      ['Privé', 'Un espace personnel pour préparer, converser et travailler avant de partager.', ['Assistants IA privés', 'Documents et conversations personnels', 'Ressources accessibles uniquement à leur propriétaire']],
      ['Partagé', 'Un espace d’équipe pour travailler sur les mêmes missions et connaissances autorisées.', ['Assistants IA d’équipe', 'Missions, fichiers et commentaires communs', 'Validations visibles par les membres autorisés']],
      ['Entreprise', 'Le niveau d’administration des humains, des IA et des ressources communes.', ['Membres, équipes et rattachements', 'Applications, modèles et politiques', 'Budgets, activité et mémoire partagée']],
    ] as const,
    memoryKicker: 'Mémoire gouvernée', memoryTitle: 'Propre, partagée ou Entreprise.', memoryBody: 'Chaque Collaborateur IA conserve le contexte autorisé entre ses missions. Unitalk contrôle la portée, les droits et le partage des informations.', learnMemory: 'Comprendre la mémoire',
    communicationKicker: 'Canaux professionnels', communicationTitle: 'Présent là où votre équipe travaille.', communicationBody: 'Email, calendrier, téléphone, Slack, Teams, Telegram ou WhatsApp sont disponibles selon la configuration et les droits accordés.', learnCommunications: 'Voir les communications',
    unitalkPreviewKicker: 'Aperçu Unitalk', unitalkPreviewBody: 'Nadia · Collaboratrice IA Finance', toApprove: 'À valider',
    downloadKicker: 'Unitalk Desktop', downloadTitle: 'Unitalk Desktop relie l’exécution au travail collectif.', downloadLead: 'Unitalk Desktop est la distribution Unitalk du projet open source Hermes Desktop. Elle intègre Unitalk AI Gateway et la synchronisation avec Unitalk AI Cloud afin de réunir l’exécution locale et les services de collaboration de l’entreprise.',
    desktopLayers: [['Gestion des missions avec Alma', 'Alma cadre les résultats, prépare le bon Collaborateur IA et orchestre les autorisations, le suivi et les validations.'], ['AI Gateway', 'Les modèles, fournisseurs, clés, routes, budgets et limites restent gouvernés par l’entreprise.'], ['Synchronisation avec Unitalk AI Cloud', 'Le Desktop synchronise les missions, l’activité et les ressources autorisées avec les services Unitalk.'], ['Workspace collaboratif', 'Identités, mémoire gouvernée, outils de communication et Assistants IA partagés restent accessibles dans le même environnement.']] as const,
    discoverDesktop: 'Découvrir Unitalk Desktop',
    governanceKicker: 'Contrôle humain', governanceTitle: 'Autonome dans le cadre. Jamais hors cadre.', governanceLead: 'Une application n’accorde aucun droit à elle seule. Chaque action dépend des permissions de la mission et des validations définies par votre entreprise.',
    governance: [['Droit', 'Définissez ce qui est autorisé.', 'Les applications, données et outils accessibles sont explicitement choisis.'], ['Validation', 'Gardez les actions sensibles en attente.', 'Un envoi, une publication ou une décision engageante peut exiger votre accord.'], ['Décision', 'Approuvez, corrigez ou refusez.', 'Le Collaborateur poursuit uniquement à partir de la décision enregistrée.'], ['Exécution', 'Laissez agir dans les limites validées.', 'Les tâches autorisées peuvent être exécutées sans multiplier les demandes inutiles.'], ['Trace', 'Retrouvez ce qui a été fait.', 'Sources, étapes, résultats et décisions restent rattachés à la mission.']] as const,
    rolesKicker: 'Une équipe lisible', rolesTitle: 'Chacun garde son rôle.', humanTitle: 'Votre équipe', humanBody: 'Définit le résultat, apporte le contexte et garde les décisions engageantes.', aiTitle: 'Le Collaborateur IA', aiBody: 'Réalise la mission avec son profil, sa mémoire et les outils autorisés.', almaTitle: 'Alma', almaBody: 'Cadre la mission, prépare le Collaborateur et orchestre les validations.',
    finalKicker: 'Première mission offerte', finalTitle: 'Commencez par un résultat concret.', finalBody: 'Choisissez une mission ou décrivez votre besoin. Alma prépare le Workspace et le Collaborateur IA adapté.', almaRole: 'Coordinatrice de missions IA', finalCta: 'Explorer les missions', pricing: 'Voir les tarifs',
  },
  en: {
    heroTitle: 'A workspace\nwhere humans and AI collaborate.',
    heroLead: 'Assign a mission, follow the work and keep the final say. Unitalk Workspace turns an open-source agent engine into a governed work environment for your organization.',
    heroCta: 'Explore missions', openMission: 'View a mission example', demoCta: 'Watch the demo',
    availability: 'Web and Desktop · Memory · Tools · Human approvals',
    onboardingNote: 'First mission included · Applications connect only with your approval',
    previewMission: 'Mission in progress', readyMission: 'First mission · Ready to start', setupRequired: 'Setup required', previewStatus: 'Approval required', missionTitle: 'Follow up unpaid invoices',
    previewActivity: [['10:14', 'Nadia identifies 12 overdue invoices.'], ['10:16', 'Two files have an open dispute.'], ['10:18', 'Ten reminders await your approval.']] as const,
    decisionRequired: 'Decision required', previewQuestion: 'Approve sending the ten prepared reminders?',
    genericDemo: 'Generic Workspace demonstration', demoKicker: 'Video demonstration', demoTitle: 'The open-source engine used by Unitalk',
    demoLead: 'The engine executes. Unitalk orchestrates work and decisions across the organization.',
    demoNote: 'Unitalk adds the shared Workspace, missions, profiles, permissions, human approvals and administration to the open-source engine.',
    videoLabel: 'Hermes Desktop project video demonstration', videoCaption: 'Official demonstration of the open-source Hermes Desktop project by Nous Research. Unitalk Desktop is an enriched distribution of it; this is not a capture of Unitalk Workspace.', videoSource: 'View the official source',
    freeKicker: 'Start for free', freeTitle: 'Your Solo Workspace is free. So is your first mission.', freeBody: 'Alma configures access to AI models, prepares synchronization with Unitalk AI Cloud and supports you through your AI Collaborator’s first mission.', freeCta: 'Create my Solo Workspace',
    capabilitiesKicker: 'Engine capabilities', capabilitiesTitle: 'Six agent capabilities. One Unitalk framework.', capabilitiesLead: 'The open-source engine provides execution capabilities. Unitalk connects them to missions and your organization’s rules.',
    capabilities: [
      { title: 'Lives everywhere', body: 'The engine works through a Desktop interface, the terminal and channels such as Slack, Discord or Telegram.' },
      { title: 'Persistent memory', body: 'It retains useful context, learns working methods and reuses its skills.' },
      { title: 'Focused automation', body: 'Schedule reports, backups, briefings and other recurring tasks in natural language.' },
      { title: 'Tasks multiplied', body: 'Delegate parallel work to isolated subagents with their own conversations and tools.' },
      { title: 'Browse the web', body: 'Web search, browser, vision and multimodal tools expand the missions it can perform.' },
      { title: 'Isolated sandboxing', body: 'Multiple execution environments isolate and adapt agent work to your requirements.' },
    ],
    spacesKicker: 'Collaboration at every level', spacesTitle: 'A space for everyone.', spacesAccent: 'One shared context to move forward.', spacesLead: 'Private to focus, shared to collaborate, organization-wide to govern. Every authorized member can access the missions, AI Assistants and decisions they need without having their own AI Collaborator.',
    spaces: [
      ['Private', 'A personal space to prepare, converse and work before sharing.', ['Private AI Assistants', 'Personal documents and conversations', 'Resources accessible only to their owner']],
      ['Shared', 'A team space for working on the same missions and authorized knowledge.', ['Team AI Assistants', 'Shared missions, files and comments', 'Approvals visible to authorized members']],
      ['Organization', 'The administration layer for humans, AI identities and shared resources.', ['Members, teams and assignments', 'Applications, models and policies', 'Budgets, activity and shared memory']],
    ] as const,
    memoryKicker: 'Governed memory', memoryTitle: 'Private, shared or organization-wide.', memoryBody: 'Each AI Collaborator retains authorized context across missions. Unitalk controls the scope, permissions and sharing of information.', learnMemory: 'Understand memory',
    communicationKicker: 'Professional channels', communicationTitle: 'Present where your team works.', communicationBody: 'Email, calendar, phone, Slack, Teams, Telegram and WhatsApp are available according to configuration and permissions.', learnCommunications: 'View communications',
    unitalkPreviewKicker: 'Unitalk preview', unitalkPreviewBody: 'Nadia · Finance AI Collaborator', toApprove: 'To approve',
    downloadKicker: 'Unitalk Desktop', downloadTitle: 'Unitalk Desktop connects execution to collaborative work.', downloadLead: 'Unitalk Desktop is Unitalk’s distribution of the open-source Hermes Desktop project. It integrates Unitalk AI Gateway and synchronization with Unitalk AI Cloud, combining local execution with organization-wide collaboration services.',
    desktopLayers: [['Mission management with Alma', 'Alma scopes outcomes, prepares the right AI Collaborator and orchestrates permissions, tracking and approvals.'], ['AI Gateway', 'Models, providers, keys, routes, budgets and limits remain governed by the organization.'], ['Synchronization with Unitalk AI Cloud', 'Desktop synchronizes missions, activity and authorized resources with Unitalk services.'], ['Collaborative Workspace', 'Identities, governed memory, communication tools and shared AI Assistants remain available in one environment.']] as const,
    discoverDesktop: 'Discover Unitalk Desktop',
    governanceKicker: 'Human control', governanceTitle: 'Autonomous within the framework. Never outside it.', governanceLead: 'An application grants no permission by itself. Every action depends on mission permissions and the approvals defined by your organization.',
    governance: [['Permission', 'Define what is allowed.', 'Applications, data and accessible tools are explicitly selected.'], ['Approval', 'Hold sensitive actions for review.', 'Sending, publishing or consequential decisions can require your approval.'], ['Decision', 'Approve, amend or decline.', 'The Collaborator proceeds only from the recorded decision.'], ['Execution', 'Let it act within approved limits.', 'Authorized tasks can run without unnecessary approval requests.'], ['Record', 'See what happened.', 'Sources, steps, outcomes and decisions remain attached to the mission.']] as const,
    rolesKicker: 'A legible team', rolesTitle: 'Everyone keeps a clear role.', humanTitle: 'Your team', humanBody: 'Defines the outcome, provides context and retains consequential decisions.', aiTitle: 'The AI Collaborator', aiBody: 'Performs the mission with its profile, memory and authorized tools.', almaTitle: 'Alma', almaBody: 'Scopes the mission, prepares the Collaborator and orchestrates approvals.',
    finalKicker: 'First mission included', finalTitle: 'Start with a concrete outcome.', finalBody: 'Choose a mission or describe your need. Alma prepares the Workspace and the right AI Collaborator.', almaRole: 'AI mission coordinator', finalCta: 'Explore missions', pricing: 'View pricing',
  },
} as const
