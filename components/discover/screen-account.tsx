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

export type SelectedMission = { slug?: string; title: string; description: string; category: string }

export type DiscoverContext =
  | { kind: 'mission'; mission: SelectedMission; source: DiscoverSource }
  | { kind: 'draft'; draft: SelectedMission; draftId?: string; source: DiscoverSource }
  | { kind: 'empty'; source: DiscoverSource }
  | { kind: 'invalid'; requestedSlug: string; source: DiscoverSource }
  | { kind: 'new-mission'; source: DiscoverSource }
  | { kind: 'profile'; profile: StoreItem; source: DiscoverSource }

export function ScreenAccount({
  lang, context, collaborator, profile, languageToggle, onAuthenticated,
}: {
  lang: Lang; context: DiscoverContext; languageToggle: React.ReactNode
  collaborator?: RoleDetail
  profile?: StoreItem
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

  async function go(provider: AuthProvider) {
    if (pending || (provider === 'email' && !emailValid)) return
    setPending(provider)
    try {
      const session = await startSession(provider, provider === 'email' ? email.trim() : undefined)
      onAuthenticated({ provider, email: provider === 'email' ? email.trim().toLowerCase() : undefined, firstName: session.firstName, lastName: session.lastName })
    } catch { setPending(null) }
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-[42fr_58fr]">
      {/* Left: dark panel */}
      <aside className="relative order-2 overflow-hidden bg-[#151310] px-6 py-8 sm:px-10 lg:order-1 lg:flex lg:min-h-screen lg:flex-col lg:px-[clamp(3rem,5vw,5rem)] lg:py-6">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(#FAF8F3_1px,transparent_1px),linear-gradient(90deg,#FAF8F3_1px,transparent_1px)] [background-size:64px_64px]" />
        <a href="/" className="relative flex w-fit items-center gap-2.5 text-white transition-opacity hover:opacity-80" aria-label="Accueil Unitalk"><UnitalkLogo size={22} color="#F15B9B" inactiveColor="#F15B9B" /><span className="text-sm font-semibold tracking-[-.02em]">Unitalk</span></a>
        <div className="relative mx-auto my-auto w-full max-w-md">
          {profile ? (
            <>
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#E05A93]">{t.selectedProfile}</p>
              <h2 className="mt-4 font-sf text-[36px] font-bold leading-[1.02] tracking-[-0.045em] text-white sm:text-[44px]">{profile.name[lang]}</h2>
              <p className="mt-4 max-w-md text-[15px] leading-7 text-[#C9C1B8]">{profile.description[lang]}</p>
              <div className="mt-8 border-t border-white/10 pt-6">
                <div className="flex items-center gap-3"><img src="/alma-avatar.png" alt="" className="h-12 w-12 rounded-full object-cover" /><div><p className="font-sf text-[18px] font-semibold text-white">Alma</p><p className="text-[12px] text-[#F2A4C5]">{t.almaRole}</p></div></div>
                <p className="mt-4 text-sm leading-6 text-[#C9C1B8]">{t.profileHelp}</p>
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
      <section className="relative order-1 flex min-w-0 items-center bg-[#F3EFE6] px-6 py-16 sm:px-10 lg:order-2 lg:min-h-screen lg:px-[clamp(3rem,7vw,7rem)]">
        <div className="absolute right-5 top-4 sm:right-8">{languageToggle}</div>
        <div className="mx-auto w-full max-w-[460px]">
          <h1 className="max-w-md font-sf text-[34px] font-bold leading-[1.02] tracking-[-0.045em] text-[#1C1A17] sm:text-[42px]">{profile ? t.profileTitle : collaborator ? t.collaboratorTitle(collaborator.name) : isDraft ? t.draftTitle : mission ? t.contextualTitle : t.genericTitle}</h1>
          {!mission && <p className="mt-3 max-w-sm text-[15px] leading-6 text-[#625B50]">{isDraft ? t.draftLead : t.genericLead}</p>}
          {(mission || profile) && <p className="mt-3 text-sm text-[#6E665A]">{t.contextualReassurance}</p>}

          <div className="mt-7 flex flex-col gap-3">
            <AuthButton onClick={() => go('google')} pending={pending === 'google'} disabled={!!pending}><GoogleIcon className="h-[18px] w-[18px]" />{t.google}</AuthButton>
            <AuthButton onClick={() => go('microsoft')} pending={pending === 'microsoft'} disabled={!!pending}><MicrosoftIcon className="h-[18px] w-[18px]" />{t.microsoft}</AuthButton>
            <div className="my-1 flex items-center gap-3"><span className="h-px flex-1 bg-[#D8D0C2]" /><span className="text-[11px] text-[#8A8175]">{t.orEmail}</span><span className="h-px flex-1 bg-[#D8D0C2]" /></div>
            <label htmlFor="discover-email" className="text-sm font-semibold text-[#4E483F]">{t.emailLabel}</label>
            <input id="discover-email" type="email" inputMode="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} onBlur={() => setEmailTouched(true)} onKeyDown={e => { if (e.key === 'Enter' && !e.nativeEvent.isComposing) { setEmailTouched(true); go('email') } }} placeholder={t.emailPlaceholder} aria-invalid={emailTouched && !!email && !emailValid} disabled={!!pending} className="h-12 w-full rounded-xl border border-[#D8D0C2] bg-white px-4 text-[15px] outline-none transition-colors placeholder:text-[#A79F91] focus:border-[#D10E63] focus:ring-2 focus:ring-[#D10E63]/20" />
            {emailTouched && !!email && !emailValid && <p className="text-[12px] text-[#A80B50]">{emailFormatValid ? t.personalEmailError : t.emailError}</p>}
            <button type="button" onClick={() => { setEmailTouched(true); go('email') }} disabled={!!pending || !emailValid} className={`inline-flex h-14 items-center justify-center rounded-xl px-5 text-[15px] font-semibold transition-colors ${emailValid && !pending ? 'bg-[#D10E63] text-white hover:bg-[#B90C58]' : 'cursor-not-allowed bg-[#DED6C8] text-[#6E665A]'}`}>{pending === 'email' ? <Loader2 className="h-[18px] w-[18px] animate-spin" /> : <>{t.email} →</>}</button>
          </div>
          <p className="mt-4 text-[11px] leading-5 text-[#857C6E]">{t.legalPrefix} <a href="/conditions" className="font-semibold underline underline-offset-3 hover:text-[#1C1A17]">{t.terms}</a> {t.legalAnd} <a href="/confidentialite" className="font-semibold underline underline-offset-3 hover:text-[#1C1A17]">{t.privacy}</a>.</p>
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
    selectedProfile: 'Profil métier sélectionné', profileTitle: 'Ajoutez ce profil métier.', profileHelp: 'Après votre connexion, Alma vous aide à l’attribuer à un Collaborateur IA et à vérifier son adaptation à votre entreprise.',
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
    selectedProfile: 'Selected job profile', profileTitle: 'Add this job profile.', profileHelp: 'After sign-in, Alma helps you assign it to an AI Collaborator and check its fit for your organization.',
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
