'use client'

import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
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

const HERMES_DEMO = '/hermes-desktop-demo.mp4'
const HERMES_POSTER = '/hermes-desktop-demo.webp'

export function WorkspaceFinalContent({ onboarding }: { onboarding?: WorkspaceOnboarding }) {
  const { lang } = useLanguage()
  const t = COPY[lang]

  return (
    <main className="overflow-hidden bg-[#F3EFE6] font-sf text-[#1C1A17]">
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
              <CtaButton href={onboarding ? '#workspace-demo' : localizedHref('missions', lang)}>{onboarding ? t.openMission : t.heroCta}<ArrowRight className="size-4" /></CtaButton>
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
            <video className="aspect-video w-full object-cover" autoPlay loop muted playsInline preload="metadata" poster={HERMES_POSTER} aria-label={t.videoLabel}>
              <source src={HERMES_DEMO} type="video/mp4" />
            </video>
          </div>
          <div className="mt-4 flex flex-col justify-between gap-3 text-xs text-[#AFA69A] sm:flex-row sm:items-center">
            <p>{t.videoCaption}</p>
            <a href="https://hermes-agent.nousresearch.com/" target="_blank" rel="noreferrer" className="font-bold text-[#F2A4C5] underline decoration-white/20 underline-offset-4">{t.videoSource}<span aria-hidden className="ml-1.5">↗</span></a>
          </div>
        </div>
      </section>

      <section className="border-b border-[#D8D0C2] bg-[#EAE3D4] px-5 py-12 sm:px-8 sm:py-16">
        <div className="editorial-shell grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-4xl">
            <Kicker>{t.freeKicker}</Kicker>
            <h2 className="mt-5 text-balance text-[clamp(2.2rem,4.5vw,4.4rem)] font-semibold leading-[.96] tracking-[-.055em]">{t.freeTitle}</h2>
            <p className="mt-5 max-w-3xl text-[16px] leading-8 text-[#4E483F]">{t.freeBody}</p>
            <ol className="mt-7 grid gap-3 text-sm font-semibold text-[#4E483F] sm:grid-cols-3">
              {t.freeSteps.map((step, index) => <li key={step} className="flex gap-3 border-t border-[#CFC5B5] pt-3"><span className="font-mono text-[10px] font-black text-[#B00C54]">0{index + 1}</span><span>{step}</span></li>)}
            </ol>
          </div>
          <CtaButton href="/decouvrir?source=workspace-free-mission">{t.freeCta}<ArrowRight className="size-4" /></CtaButton>
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

      <section className="border-y border-[#D8D0C2] bg-[#EAE3D4] px-5 py-16 sm:px-8 sm:py-20">
        <div className="editorial-shell grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
          <div><Kicker>{t.governanceKicker}</Kicker><h2 className="mt-5 text-balance text-[clamp(2.35rem,4.5vw,4.4rem)] font-semibold leading-[.96] tracking-[-.055em]">{t.governanceTitle}</h2><p className="mt-5 text-[15px] leading-7 text-[#625B50]">{t.governanceLead}</p></div>
          <div className="overflow-hidden rounded-[24px] border border-[#D8D0C2] bg-[#FFFDF9]">
            {t.governance.map(([label, title, body], index) => <div key={label} className="grid gap-4 border-b border-[#E4DDCE] p-5 last:border-b-0 sm:grid-cols-[7rem_1fr] sm:p-6"><p className="font-mono text-[10px] font-black uppercase tracking-[.14em] text-[#B00C54]">{String(index + 1).padStart(2, '0')} · {label}</p><div><h3 className="text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-[#625B50]">{body}</p></div></div>)}
          </div>
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

function Actor({ image, title, body }: { image: string; title: string; body: string }) {
  return <article className="bg-[#211E1B] p-6"><Image src={image} alt="" width={48} height={48} className="size-12 rounded-full object-cover" /><h3 className="mt-6 text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-7 text-[#CFC6B8]">{body}</p></article>
}

const COPY = {
  fr: {
    heroTitle: 'Un espace de travail\npour humains et Collaborateurs IA.',
    heroLead: 'Confiez une mission, suivez le travail et gardez la décision. Le Workspace Unitalk transforme le moteur agentique open source Hermes en environnement de travail gouverné pour votre entreprise.',
    heroCta: 'Explorer les missions', openMission: 'Ouvrir la mission', demoCta: 'Voir la démonstration',
    availability: 'Web et Desktop · Mémoire · Outils · Validations humaines',
    onboardingNote: 'Première mission offerte · Applications connectées uniquement avec votre accord',
    previewMission: 'Mission en cours', readyMission: 'Première mission · Prête à démarrer', setupRequired: 'Configuration requise', previewStatus: 'Validation requise', missionTitle: 'Relancer les factures impayées',
    previewActivity: [['10:14', 'Emma identifie 12 factures échues.'], ['10:16', 'Deux dossiers comportent un litige ouvert.'], ['10:18', 'Dix relances attendent votre validation.']] as const,
    decisionRequired: 'Décision requise', previewQuestion: 'Autoriser l’envoi des dix relances préparées ?',
    genericDemo: 'Démonstration générique du Workspace', demoKicker: 'Le moteur agentique en action', demoTitle: 'Voyez comment un agent travaille.',
    demoLead: 'Hermes est le moteur agentique open source au cœur de la distribution Unitalk AI. Cette démonstration officielle montre son interface Desktop et sa capacité à travailler avec des outils.',
    demoNote: 'Unitalk ajoute le Workspace partagé, les missions, les profils, les droits, les validations humaines et l’administration à l’échelle de l’entreprise.',
    videoLabel: 'Démonstration vidéo de Hermes Desktop', videoCaption: 'Démonstration officielle de Hermes Desktop par Nous Research. Cet exemple générique est indépendant de votre mission et son interface est présentée à titre illustratif.', videoSource: 'Voir la source officielle',
    freeKicker: 'Commencez gratuitement', freeTitle: 'Votre Workspace est gratuit. Votre première mission aussi.', freeBody: 'Connectez l’AI Gateway au Workspace, synchronisez votre environnement avec Unitalk AI Cloud et lancez une première mission offerte avec votre Collaborateur IA.', freeSteps: ['Créez votre Workspace Solo', 'Connectez l’AI Gateway et Unitalk AI Cloud', 'Lancez la mission avec votre Collaborateur IA'], freeCta: 'Lancer ma mission offerte',
    capabilitiesKicker: 'Un agent qui progresse', capabilitiesTitle: 'Même contexte. Plus de capacité à chaque mission.', capabilitiesLead: 'Retrouvez les forces de l’expérience Hermes dans un cadre pensé pour le travail en équipe.',
    capabilities: [
      { title: 'Travaillez partout', body: 'Retrouvez vos missions sur le Web, Desktop et dans les messageries compatibles, selon votre configuration.' },
      { title: 'Gardez le contexte', body: 'Le Collaborateur conserve la mémoire autorisée et réutilise ce qui a été validé lors des missions précédentes.' },
      { title: 'Planifiez le travail', body: 'Préparez des tâches récurrentes et suivez leur exécution depuis un même espace.' },
      { title: 'Déléguez des missions', body: 'Confiez un résultat attendu plutôt qu’une suite de commandes et gardez une trace du travail produit.' },
      { title: 'Utilisez vos outils', body: 'Applications, fichiers, recherche et modèles IA sont accessibles uniquement selon les droits accordés.' },
      { title: 'Isolez l’exécution', body: 'Les environnements privés et serveurs IA permettent d’adapter le déploiement à vos exigences.' },
    ],
    governanceKicker: 'Contrôle humain', governanceTitle: 'Autonome dans le cadre. Jamais hors cadre.', governanceLead: 'Une application n’accorde aucun droit à elle seule. Chaque action dépend des permissions de la mission et des validations définies par votre entreprise.',
    governance: [['Droit', 'Définissez ce qui est autorisé.', 'Les applications, données et outils accessibles sont explicitement choisis.'], ['Validation', 'Gardez les actions sensibles en attente.', 'Un envoi, une publication ou une décision engageante peut exiger votre accord.'], ['Décision', 'Approuvez, corrigez ou refusez.', 'Le Collaborateur poursuit uniquement à partir de la décision enregistrée.'], ['Exécution', 'Laissez agir dans les limites validées.', 'Les tâches autorisées peuvent être exécutées sans multiplier les demandes inutiles.'], ['Trace', 'Retrouvez ce qui a été fait.', 'Sources, étapes, résultats et décisions restent rattachés à la mission.']] as const,
    rolesKicker: 'Une équipe lisible', rolesTitle: 'Chacun garde son rôle.', humanTitle: 'Votre équipe', humanBody: 'Définit le résultat, apporte le contexte et garde les décisions engageantes.', aiTitle: 'Le Collaborateur IA', aiBody: 'Réalise la mission avec son profil, sa mémoire et les outils autorisés.', almaTitle: 'Alma', almaBody: 'Cadre la mission, prépare le Collaborateur et orchestre les validations.',
    finalKicker: 'Première mission offerte', finalTitle: 'Commencez par un résultat concret.', finalBody: 'Choisissez une mission ou décrivez votre besoin. Alma prépare le Workspace et le Collaborateur IA adapté.', almaRole: 'Coordinatrice de missions IA', finalCta: 'Explorer les missions', pricing: 'Voir les tarifs',
  },
  en: {
    heroTitle: 'A workspace\nfor humans and AI Collaborators.',
    heroLead: 'Assign a mission, follow the work and keep the final say. Unitalk Workspace turns the open-source Hermes agent engine into a governed work environment for your organization.',
    heroCta: 'Explore missions', openMission: 'Open mission', demoCta: 'Watch the demo',
    availability: 'Web and Desktop · Memory · Tools · Human approvals',
    onboardingNote: 'First mission included · Applications connect only with your approval',
    previewMission: 'Mission in progress', readyMission: 'First mission · Ready to start', setupRequired: 'Setup required', previewStatus: 'Approval required', missionTitle: 'Follow up unpaid invoices',
    previewActivity: [['10:14', 'Emma identifies 12 overdue invoices.'], ['10:16', 'Two files have an open dispute.'], ['10:18', 'Ten reminders await your approval.']] as const,
    decisionRequired: 'Decision required', previewQuestion: 'Approve sending the ten prepared reminders?',
    genericDemo: 'Generic Workspace demonstration', demoKicker: 'The agent engine in action', demoTitle: 'See how an agent works.',
    demoLead: 'Hermes is the open-source agent engine at the heart of the Unitalk AI distribution. This official demo shows its Desktop interface and its ability to work with tools.',
    demoNote: 'Unitalk adds the shared Workspace, missions, profiles, permissions, human approvals and organization-wide administration.',
    videoLabel: 'Hermes Desktop video demonstration', videoCaption: 'Official Hermes Desktop demonstration by Nous Research. This generic example is separate from your mission and its interface is shown for illustrative purposes.', videoSource: 'View the official source',
    freeKicker: 'Start for free', freeTitle: 'Your Workspace is free. So is your first mission.', freeBody: 'Connect the AI Gateway to your Workspace, sync your environment with Unitalk AI Cloud and launch an included first mission with your AI Collaborator.', freeSteps: ['Create your Solo Workspace', 'Connect the AI Gateway and Unitalk AI Cloud', 'Launch the mission with your AI Collaborator'], freeCta: 'Start my included mission',
    capabilitiesKicker: 'An agent that grows', capabilitiesTitle: 'Same context. More capable with every mission.', capabilitiesLead: 'Bring the strengths of the Hermes experience into a framework designed for teamwork.',
    capabilities: [
      { title: 'Work everywhere', body: 'Access missions on Web, Desktop and compatible messaging channels, depending on your configuration.' },
      { title: 'Keep context', body: 'The Collaborator retains authorized memory and reuses what was approved in previous missions.' },
      { title: 'Schedule work', body: 'Prepare recurring tasks and follow their execution from one place.' },
      { title: 'Delegate missions', body: 'Assign an expected outcome rather than a sequence of commands and retain a record of the work.' },
      { title: 'Use your tools', body: 'Applications, files, search and AI models are available only under granted permissions.' },
      { title: 'Isolate execution', body: 'Private environments and AI servers let you adapt deployment to your requirements.' },
    ],
    governanceKicker: 'Human control', governanceTitle: 'Autonomous within the framework. Never outside it.', governanceLead: 'An application grants no permission by itself. Every action depends on mission permissions and the approvals defined by your organization.',
    governance: [['Permission', 'Define what is allowed.', 'Applications, data and accessible tools are explicitly selected.'], ['Approval', 'Hold sensitive actions for review.', 'Sending, publishing or consequential decisions can require your approval.'], ['Decision', 'Approve, amend or decline.', 'The Collaborator proceeds only from the recorded decision.'], ['Execution', 'Let it act within approved limits.', 'Authorized tasks can run without unnecessary approval requests.'], ['Record', 'See what happened.', 'Sources, steps, outcomes and decisions remain attached to the mission.']] as const,
    rolesKicker: 'A legible team', rolesTitle: 'Everyone keeps a clear role.', humanTitle: 'Your team', humanBody: 'Defines the outcome, provides context and retains consequential decisions.', aiTitle: 'The AI Collaborator', aiBody: 'Performs the mission with its profile, memory and authorized tools.', almaTitle: 'Alma', almaBody: 'Scopes the mission, prepares the Collaborator and orchestrates approvals.',
    finalKicker: 'First mission included', finalTitle: 'Start with a concrete outcome.', finalBody: 'Choose a mission or describe your need. Alma prepares the Workspace and the right AI Collaborator.', almaRole: 'AI mission coordinator', finalCta: 'Explore missions', pricing: 'View pricing',
  },
} as const
