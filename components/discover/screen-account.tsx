'use client'

import { useState } from 'react'
import { ChevronUp, Loader2 } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import type { Lang } from '@/lib/language-context'
import { startSession } from '@/app/actions/auth'
import type { AuthProvider } from '@/lib/mock-auth'
import { GoogleIcon, MicrosoftIcon } from '@/components/auth/provider-icons'
import { UnitalkLogo } from '@/components/unitalk-logo'
import type { DiscoverSource } from '@/lib/discover-entry'
import { isProfessionalEmail } from '@/lib/professional-email'
import type { RoleDetail } from '@/lib/collaborators-catalog'
import type { StoreItem } from '@/lib/store-catalog'
import type { AiModel } from '@/lib/ai-models-catalog'

export type SelectedMission = { slug?: string; title: string; description: string; category: string }

export type DiscoverContext =
  | { kind: 'mission'; mission: SelectedMission; source: DiscoverSource }
  | { kind: 'draft'; draft: SelectedMission; draftId?: string; source: DiscoverSource }
  | { kind: 'empty'; source: DiscoverSource }
  | { kind: 'invalid'; requestedSlug: string; source: DiscoverSource }
  | { kind: 'new-mission'; source: DiscoverSource }
  | { kind: 'profile-creation'; query?: string; source: DiscoverSource }
  | { kind: 'store-item'; item: StoreItem; source: DiscoverSource }
  | { kind: 'model'; model: AiModel; source: DiscoverSource }

export function ScreenAccount({
  lang, context, collaborator, languageToggle, onAuthenticated,
}: {
  lang: Lang; context: DiscoverContext; languageToggle: React.ReactNode
  collaborator?: RoleDetail
  onAuthenticated: (i: { provider: AuthProvider; email?: string; firstName?: string; lastName?: string }) => void
}) {
  const t = COPY[lang]
  const reduce = useReducedMotion()
  const [pending, setPending] = useState<AuthProvider | null>(null)
  const [email, setEmail] = useState('')
  const [emailTouched, setEmailTouched] = useState(false)
  const [missionOpen, setMissionOpen] = useState(true)
  const emailFormatValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  const emailValid = isProfessionalEmail(email)
  const mission = context.kind === 'mission' ? context.mission : context.kind === 'draft' ? context.draft : context.kind === 'new-mission' ? { title: t.newMissionTitle, description: t.newMissionDescription, category: 'Assistance' } : null
  const isDraft = context.kind === 'draft'
  const isProfileCreation = context.kind === 'profile-creation'
  const storeItem = context.kind === 'store-item' ? context.item : undefined
  const model = context.kind === 'model' ? context.model : undefined
  const selectedKind = storeItem?.type === 'profil' ? 'profile' : storeItem?.type === 'competence' ? 'skill' : storeItem?.type === 'application' || storeItem?.type === 'integration' ? 'application' : model ? 'model' : collaborator ? 'collaborator' : undefined
  const selectedName = storeItem?.name[lang] ?? model?.title ?? collaborator?.name
  const selectedDescription = storeItem?.description[lang] ?? model?.description[lang] ?? collaborator?.promise[lang]
  const selectedDetails = storeItem?.type === 'profil'
    ? storeItem.exampleMissions?.map(item => item[lang])
    : storeItem?.type === 'competence'
      ? [...(storeItem.contexts ?? []), ...(storeItem.produces ?? storeItem.enables ?? [])].map(item => item[lang])
      : storeItem?.type === 'application' || storeItem?.type === 'integration'
        ? [...(storeItem.uses ?? []), ...(storeItem.actions ?? []), ...(storeItem.permissions ?? [])].map(item => item[lang])
        : model
          ? model.modalities.map(modality => t.modelModalities[modality] ?? modality)
          : collaborator?.missions.map(item => item[lang])
  const hasSelection = Boolean(selectedKind) || isProfileCreation

  async function go(provider: AuthProvider) {
    if (pending || (provider === 'email' && !emailValid)) return
    setPending(provider)
    try {
      const session = await startSession(provider, provider === 'email' ? email.trim() : undefined)
      onAuthenticated({ provider, email: provider === 'email' ? email.trim().toLowerCase() : undefined, firstName: session.firstName, lastName: session.lastName })
    } catch { setPending(null) }
  }

  return (
    <div className={`grid ${hasSelection ? 'h-dvh overflow-hidden grid-rows-[34%_66%] lg:grid-rows-1' : 'min-h-screen'} lg:grid-cols-[42fr_58fr]`}>
      {/* Left: dark panel */}
      <aside className={`relative overflow-hidden bg-[#151310] px-6 sm:px-10 lg:order-1 lg:flex lg:min-h-screen lg:flex-col lg:px-[clamp(3rem,5vw,5rem)] lg:py-6 ${hasSelection ? 'order-1 min-h-0 py-5' : 'order-2 py-8'}`}>
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(#FAF8F3_1px,transparent_1px),linear-gradient(90deg,#FAF8F3_1px,transparent_1px)] [background-size:64px_64px]" />
        <a href="/" className="relative flex w-fit items-center gap-2.5 text-white transition-opacity hover:opacity-80" aria-label="Accueil Unitalk"><UnitalkLogo size={22} color="#F15B9B" inactiveColor="#F15B9B" /><span className="text-sm font-semibold tracking-[-.02em]">Unitalk</span></a>
        <div className={`relative mx-auto w-full max-w-md ${hasSelection ? 'mt-3 lg:my-auto' : 'my-auto'}`}>
          {isProfileCreation ? (
            <>
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#E05A93] sm:text-[11px]">{t.profileCreationLabel}</p>
              <h2 className="mt-1.5 font-sf text-[27px] font-bold leading-[1.02] tracking-[-0.045em] text-white sm:mt-4 sm:text-[44px]">{context.query || t.profileCreationName}</h2>
              <p className="mt-2 max-w-md text-[12px] leading-[1.1rem] text-[#C9C1B8] sm:mt-4 sm:text-[15px] sm:leading-7">{t.profileCreationDescription}</p>
              <div className="mt-4 hidden border-l border-[#D10E63]/75 pl-5 sm:block sm:mt-7"><p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#F2A4C5]">{t.profileCreationStepsLabel}</p><ul className="mt-3 space-y-2.5 text-sm text-[#E4DDD4]">{t.profileCreationSteps.map(item => <li key={item} className="flex gap-3"><span aria-hidden className="mt-[7px] size-1.5 shrink-0 rounded-full bg-[#E05A93]" />{item}</li>)}</ul></div>
              <div className="mt-3 hidden border-t border-white/10 pt-3 sm:mt-8 sm:block sm:pt-6">
                <div className="flex items-center gap-3"><img src="/alma-avatar.png" alt="" className="size-9 rounded-full object-cover sm:size-12" /><div><p className="font-sf text-[16px] font-semibold text-white sm:text-[18px]">Alma</p><p className="hidden text-[12px] text-[#F2A4C5] sm:block">{t.almaRole}</p></div></div>
                <p className="mt-2 text-[12px] leading-5 text-[#C9C1B8] sm:mt-4 sm:text-sm sm:leading-6">{t.profileCreationHelp}</p>
              </div>
            </>
          ) : selectedKind ? (
            <>
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#E05A93] sm:text-[11px]">{t.selectionLabels[selectedKind!]}</p>
              {selectedKind === 'collaborator' && collaborator && <img src={collaborator.avatar} alt="" className="mt-3 size-12 rounded-full object-cover ring-1 ring-white/20 sm:mt-5 sm:size-16" />}
              <h2 className="mt-1.5 font-sf text-[27px] font-bold leading-[1.02] tracking-[-0.045em] text-white sm:mt-4 sm:text-[44px]">{selectedName}</h2>
              {selectedKind === 'model' && model && <p className="mt-2 text-sm font-semibold text-[#F2A4C5]">{model.maker}</p>}
              <p className="mt-2 line-clamp-2 max-w-md text-[12px] leading-[1.1rem] text-[#C9C1B8] sm:mt-4 sm:text-[15px] sm:leading-7">{selectedDescription}</p>
              {selectedDetails && selectedDetails.length > 0 && <div className="mt-4 hidden border-l border-[#D10E63]/75 pl-5 sm:block sm:mt-7"><p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#F2A4C5]">{t.capabilityLabels[selectedKind!]}</p><ul className="mt-3 space-y-2.5 text-sm text-[#E4DDD4]">{selectedDetails.slice(0, 3).map(item => <li key={item} className="flex gap-3"><span aria-hidden className="mt-[7px] size-1.5 shrink-0 rounded-full bg-[#E05A93]" />{item}</li>)}</ul></div>}
              <div className="mt-3 hidden border-t border-white/10 pt-3 sm:mt-8 sm:block sm:pt-6">
                <div className="flex items-center gap-3"><img src="/alma-avatar.png" alt="" className="size-9 rounded-full object-cover sm:size-12" /><div><p className="font-sf text-[16px] font-semibold text-white sm:text-[18px]">Alma</p><p className="hidden text-[12px] text-[#F2A4C5] sm:block">{t.almaRole}</p></div></div>
                <p className="mt-2 text-[12px] leading-5 text-[#C9C1B8] sm:mt-4 sm:text-sm sm:leading-6">{t.selectionHelp[selectedKind!]}</p>
              </div>
            </>
          ) : mission ? (
            <>
              <div className="flex items-center justify-between">
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#E05A93]">{isDraft ? t.request : t.selected}</p>
                <button type="button" aria-expanded={missionOpen} onClick={() => setMissionOpen(o => !o)} className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#C9C1B8] lg:hidden">{missionOpen ? t.collapse : t.expand}<ChevronUp className={`ml-1 h-3.5 w-3.5 transition-transform ${missionOpen ? '' : 'rotate-180'}`} /></button>
              </div>
              <div className={missionOpen ? 'block' : 'hidden lg:block'}>
                <h2 className="mt-4 font-sf text-[36px] font-bold leading-[1.02] tracking-[-0.045em] text-white sm:text-[44px]">{mission.title}</h2>
                {mission.description && <p className="mt-4 max-w-md text-[15px] leading-7 text-[#C9C1B8]">{mission.description}</p>}
                {collaborator && <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5"><img src={collaborator.avatar} alt="" className="size-11 rounded-full object-cover ring-1 ring-white/15"/><div><p className="text-[11px] font-bold uppercase tracking-[.12em] text-[#F2A4C5]">{t.recommendedProfile}</p><p className="mt-1 text-sm font-bold text-white">{collaborator.name} · {collaborator.role[lang]}</p></div></div>}
              </div>
              <div className={`mt-10 ${missionOpen ? 'block' : 'hidden lg:block'}`}>
                <div className="flex items-center gap-3"><img src="/alma-avatar.png" alt="" className="h-12 w-12 rounded-full object-cover" /><div><p className="font-sf text-[18px] font-semibold text-white">Alma</p><p className="text-[12px] text-[#F2A4C5]">{t.almaRole}</p></div></div>
              </div>
            </>
          ) : (
            <motion.div initial={reduce ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
              <img src="/alma-avatar.png" alt="" className="h-14 w-14 rounded-full object-cover lg:h-[72px] lg:w-[72px]" />
              <p className="mt-4 font-sf text-[19px] font-semibold text-white">Alma</p>
              <p className="mt-0.5 text-[13px] text-[#F2A4C5]">{t.almaRole}</p>
              <div className="mt-6 border-l border-[#D10E63]/75 pl-5">
                <h2 className="font-sf text-[28px] font-semibold leading-tight text-white lg:text-[38px]">{t.almaGenericTitle}</h2>
                <p className="mt-4 max-w-md text-[15px] leading-7 text-[#C9C1B8]">{t.almaGenericBody}</p>
              </div>
              <div className="mt-8 grid gap-3 text-sm text-[#D9D1C6] sm:grid-cols-3 lg:grid-cols-1">
                {t.genericSteps.map((item, i) => <div key={item} className="flex gap-3"><span className="font-mono text-[10px] font-bold text-[#E05A93]">0{i + 1}</span><span>{item}</span></div>)}
              </div>
            </motion.div>
          )}
        </div>
      </aside>

      {/* Right: auth */}
      <section className={`relative flex min-h-0 min-w-0 items-center bg-[#F3EFE6] px-6 sm:px-10 lg:order-2 lg:min-h-screen lg:px-[clamp(3rem,7vw,7rem)] ${hasSelection ? 'order-2 py-3' : 'order-1 py-16'}`}>
        <div className="absolute right-5 top-4 sm:right-8">{languageToggle}</div>
        <div className="mx-auto w-full max-w-[460px]">
          <h1 className={`max-w-md font-sf font-bold leading-[1.02] tracking-[-0.045em] text-[#1C1A17] ${hasSelection ? 'text-[22px] sm:text-[34px] lg:text-[42px]' : 'text-[34px] sm:text-[42px]'}`}>{isProfileCreation ? t.profileCreationTitle : selectedKind && selectedName ? t.selectionTitles[selectedKind](selectedName) : isDraft ? t.draftTitle : mission ? t.contextualTitle : t.genericTitle}</h1>
          {!hasSelection && !mission && <p className="mt-3 max-w-sm text-[15px] leading-6 text-[#625B50]">{isDraft ? t.draftLead : t.genericLead}</p>}
          {(mission || hasSelection) && <p className={`${hasSelection ? 'mt-1.5 text-xs' : 'mt-3 text-sm'} text-[#6E665A]`}>{isProfileCreation ? t.profileCreationReassurance : selectedKind ? t.selectionReassurance[selectedKind] : t.contextualReassurance}</p>}

          <div className={`${hasSelection ? 'mt-3 gap-1.5 sm:mt-4 sm:gap-2' : 'mt-7 gap-3'} flex flex-col`}>
            {hasSelection && <p className="hidden text-xs font-semibold text-[#4E483F] sm:mb-1 sm:block sm:text-sm">{isProfileCreation ? t.profileCreationContinue : t.createSpace}</p>}
            <AuthButton onClick={() => go('google')} pending={pending === 'google'} disabled={!!pending}><GoogleIcon className="h-[18px] w-[18px]" />{t.google}</AuthButton>
            <AuthButton onClick={() => go('microsoft')} pending={pending === 'microsoft'} disabled={!!pending}><MicrosoftIcon className="h-[18px] w-[18px]" />{t.microsoft}</AuthButton>
            <div className="my-1 flex items-center gap-3"><span className="h-px flex-1 bg-[#D8D0C2]" /><span className="text-[11px] text-[#8A8175]">{t.orEmail}</span><span className="h-px flex-1 bg-[#D8D0C2]" /></div>
            <label htmlFor="discover-email" className="text-sm font-semibold text-[#4E483F]">{t.emailLabel}</label>
            <input id="discover-email" type="email" inputMode="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} onBlur={() => setEmailTouched(true)} onKeyDown={e => { if (e.key === 'Enter' && !e.nativeEvent.isComposing) { setEmailTouched(true); go('email') } }} placeholder={t.emailPlaceholder} aria-invalid={emailTouched && !!email && !emailValid} disabled={!!pending} className="h-12 w-full rounded-xl border border-[#D8D0C2] bg-white px-4 text-[15px] outline-none transition-colors placeholder:text-[#A79F91] focus:border-[#D10E63] focus:ring-2 focus:ring-[#D10E63]/20" />
            {emailTouched && !!email && !emailValid && <p className="text-[12px] text-[#A80B50]">{emailFormatValid ? t.personalEmailError : t.emailError}</p>}
            <button type="button" onClick={() => { setEmailTouched(true); go('email') }} disabled={!!pending || !emailValid} className={`inline-flex h-14 items-center justify-center rounded-xl px-5 text-[15px] font-semibold transition-colors ${emailValid && !pending ? 'bg-[#D10E63] text-white hover:bg-[#B90C58]' : 'cursor-not-allowed bg-[#DED6C8] text-[#6E665A]'}`}>{pending === 'email' ? <Loader2 className="h-[18px] w-[18px] animate-spin" /> : <>{t.email} →</>}</button>
          </div>
          <p className={`${hasSelection ? 'mt-2 leading-4' : 'mt-4 leading-5'} text-[11px] text-[#857C6E]`}>{t.legalPrefix} <a href="/conditions" className="font-semibold underline underline-offset-3 hover:text-[#1C1A17]">{t.terms}</a> {t.legalAnd} <a href="/confidentialite" className="font-semibold underline underline-offset-3 hover:text-[#1C1A17]">{t.privacy}</a>.</p>
        </div>
      </section>
    </div>
  )
}

function AuthButton({ children, onClick, pending, disabled }: { children: React.ReactNode; onClick: () => void; pending: boolean; disabled: boolean }) {
  return <button type="button" onClick={onClick} disabled={disabled} className="inline-flex h-14 items-center justify-center gap-3 rounded-xl border border-[#D8D0C2] bg-white px-5 text-[15px] font-semibold transition-colors hover:bg-[#FFFDF9] disabled:cursor-wait disabled:opacity-70">{pending ? <Loader2 className="h-[18px] w-[18px] animate-spin text-[#6E665A]" /> : children}</button>
}

const COPY = {
  fr: {
    selected: 'Mission sélectionnée', request: 'Votre demande', collapse: 'Réduire', expand: 'Afficher', change: 'Changer de mission',
    recommendedProfile: 'Profil recommandé', collaboratorTitle: (name: string) => `Continuez avec ${name}.`,
    selectionLabels: { profile: 'Profil métier sélectionné', skill: 'Compétence sélectionnée', application: 'Application sélectionnée', model: 'Modèle IA sélectionné', collaborator: 'Collaborateur IA sélectionné' },
    selectionTitles: { profile: (name: string) => `Ajoutez le profil ${name} à votre Collaborateur IA.`, skill: (name: string) => `Ajoutez la compétence ${name} à votre Collaborateur IA.`, application: (name: string) => `Connectez ${name} à votre Collaborateur IA.`, model: (name: string) => `Autorisez ${name} pour votre Collaborateur IA.`, collaborator: (name: string) => `Accueillez ${name} dans votre équipe.` },
    capabilityLabels: { profile: 'Ce profil peut notamment', skill: 'Cette compétence permet notamment', application: 'Accès et actions prévus', model: 'Capacités prises en charge', collaborator: 'Vous pouvez notamment lui confier' },
    selectionHelp: { profile: 'Après votre connexion, je vous aide à préparer sa première mission selon vos méthodes de travail.', skill: 'Après votre connexion, je vous aide à l’ajouter au bon Collaborateur IA et à la tester sur une mission réelle.', application: 'Après votre connexion, je vous aide à définir les accès et les actions strictement nécessaires à chaque mission.', model: 'Après votre connexion, je vous aide à l’autoriser pour les missions adaptées, selon les règles de votre entreprise.', collaborator: 'Après votre connexion, je vous aide à préparer sa première mission et à l’adapter à votre entreprise.' },
    selectionReassurance: { profile: 'Profil gratuit · Sans carte bancaire', skill: 'Compétence gratuite · Sans carte bancaire', application: 'Connexion sécurisée · Accès sous votre contrôle', model: 'Sélection contrôlée · Fournisseurs sous votre contrôle', collaborator: 'Première mission offerte · Sans carte bancaire' },
    profileCreationLabel: 'Profil métier sur mesure', profileCreationName: 'Votre nouveau profil métier', profileCreationDescription: 'Partez des responsabilités réelles à couvrir dans votre entreprise, sans devoir formaliser seul une fiche métier complète.', profileCreationStepsLabel: 'Alma vous aide à', profileCreationSteps: ['Définir le rôle et ses responsabilités', 'Formaliser les méthodes de travail', 'Préciser les limites et validations humaines'], profileCreationHelp: 'Après votre connexion, je vous guide pour construire un profil clair, testable et réutilisable.', profileCreationTitle: 'Créez votre profil métier avec Alma.', profileCreationReassurance: 'Création guidée · Sans carte bancaire', profileCreationContinue: 'Créez votre espace pour commencer',
    modelModalities: { texte: 'Texte', image: 'Image', embeddings: 'Recherche sémantique', audio: 'Audio', video: 'Vidéo', rerank: 'Classement des résultats', speech: 'Voix', transcription: 'Transcription' } as Record<string, string>, createSpace: 'Créez votre espace pour continuer',
    almaRole: 'Collaboratrice IA · Coordinatrice de missions chez Unitalk',
    newMissionTitle: 'Créer une nouvelle mission', newMissionDescription: 'Partez du travail réel. Alma vous aide à définir le résultat attendu, les règles, les applications et les validations nécessaires.',
    almaGenericTitle: 'Vous n\'avez pas encore choisi de mission.',
    almaGenericBody: 'Après votre inscription, je vous aiderai à personnaliser votre Collaborateur IA pour sa première mission.',
    genericSteps: ['Définir votre première mission', 'Vérifier les informations de votre entreprise', 'Choisir le prénom de votre Collaborateur IA'],
    genericTitle: 'Commencez avec Alma.',
    genericLead: 'Définissez votre première mission.',
    google: 'Continuer avec Google', microsoft: 'Continuer avec Microsoft', orEmail: 'ou par email',
    emailLabel: 'Adresse email professionnelle', emailPlaceholder: 'vous@entreprise.com',
    emailError: 'Saisissez une adresse email professionnelle valide.', personalEmailError: 'Utilisez votre adresse professionnelle, pas une adresse personnelle.', email: 'Continuer',
    contextualTitle: 'Continuez avec cette mission.',
    contextualLead: 'Confirmez votre entreprise et votre Collaborateur IA.',
    draftTitle: 'Continuons avec cette mission.',
    draftLead: 'Connectez-vous pour créer votre Collaborateur IA. Vous préciserez la mission dans le Workspace.',
    contextualReassurance: 'Première mission offerte · Sans carte bancaire',
    legalPrefix: 'En continuant, vous acceptez les', terms: 'Conditions d\'utilisation', legalAnd: 'et la', privacy: 'Politique de confidentialité',
  },
  en: {
    selected: 'Selected mission', request: 'Your request', collapse: 'Collapse', expand: 'Show', change: 'Change mission',
    recommendedProfile: 'Recommended profile', collaboratorTitle: (name: string) => `Continue with ${name}.`,
    selectionLabels: { profile: 'Selected job profile', skill: 'Selected skill', application: 'Selected application', model: 'Selected AI model', collaborator: 'Selected AI Collaborator' },
    selectionTitles: { profile: (name: string) => `Add the ${name} profile to your AI Collaborator.`, skill: (name: string) => `Add the ${name} skill to your AI Collaborator.`, application: (name: string) => `Connect ${name} to your AI Collaborator.`, model: (name: string) => `Authorize ${name} for your AI Collaborator.`, collaborator: (name: string) => `Welcome ${name} to your team.` },
    capabilityLabels: { profile: 'This profile can notably', skill: 'This skill notably enables', application: 'Planned access and actions', model: 'Supported capabilities', collaborator: 'You can notably assign' },
    selectionHelp: { profile: 'After you sign in, I will help you prepare its first mission around your ways of working.', skill: 'After you sign in, I will help you add it to the right AI Collaborator and test it on a real mission.', application: 'After you sign in, I will help you define the access and actions strictly required for each mission.', model: 'After you sign in, I will help you authorize it for suitable missions under your organization’s rules.', collaborator: 'After you sign in, I will help you prepare the first mission and adapt this Collaborator to your organization.' },
    selectionReassurance: { profile: 'Free profile · No credit card', skill: 'Free skill · No credit card', application: 'Secure connection · Access under your control', model: 'Controlled selection · Providers under your control', collaborator: 'First mission included · No credit card' },
    profileCreationLabel: 'Custom job profile', profileCreationName: 'Your new job profile', profileCreationDescription: 'Start from the actual responsibilities your organization needs covered, without having to formalize a complete role profile alone.', profileCreationStepsLabel: 'Alma helps you', profileCreationSteps: ['Define the role and its responsibilities', 'Formalize working methods', 'Set boundaries and human approvals'], profileCreationHelp: 'After you sign in, I will guide you in building a clear, testable and reusable profile.', profileCreationTitle: 'Create your job profile with Alma.', profileCreationReassurance: 'Guided creation · No credit card', profileCreationContinue: 'Create your space to get started',
    modelModalities: { texte: 'Text', image: 'Image', embeddings: 'Semantic search', audio: 'Audio', video: 'Video', rerank: 'Result ranking', speech: 'Voice', transcription: 'Transcription' } as Record<string, string>, createSpace: 'Create your space to continue',
    almaRole: 'AI Collaborator · Mission coordinator',
    newMissionTitle: 'Create a new mission', newMissionDescription: 'Start from the real work. Alma helps define the expected result, rules, applications and approvals.',
    almaGenericTitle: 'You have not selected a mission yet.',
    almaGenericBody: 'After signup, I will help you customize your AI Collaborator for the first mission.',
    genericSteps: ['Define your first mission', 'Review your organization details', 'Choose your AI Collaborator’s first name'],
    genericTitle: 'Start with Alma.',
    genericLead: 'Define your first mission.',
    google: 'Continue with Google', microsoft: 'Continue with Microsoft', orEmail: 'or by email',
    emailLabel: 'Work email address', emailPlaceholder: 'you@company.com',
    emailError: 'Enter a valid work email address.', personalEmailError: 'Use your work email address, not a personal address.', email: 'Continue',
    contextualTitle: 'Continue with this mission.',
    contextualLead: 'Confirm your organization and your AI Collaborator.',
    draftTitle: 'Your request is saved.',
    draftLead: 'Create your account to continue with Alma.',
    contextualReassurance: 'First mission included · No credit card',
    legalPrefix: 'By continuing, you agree to the', terms: 'Terms of Use', legalAnd: 'and the', privacy: 'Privacy Policy',
  },
} as const
