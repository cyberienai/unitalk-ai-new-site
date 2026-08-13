'use client'

import { useState } from 'react'
import { ChevronUp, Loader2 } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import type { Lang } from '@/lib/language-context'
import { startSession } from '@/app/actions/auth'
import type { AuthProvider } from '@/lib/mock-auth'
import { GoogleIcon, MicrosoftIcon } from '@/components/auth/provider-icons'
import { UnitalkLogo } from '@/components/unitalk-logo'
import { unitalkPricing } from '@/lib/unitalk-pricing'
import type { DiscoverSource } from '@/lib/discover-entry'

export type SelectedMission = {
  slug?: string
  title: string
  description: string
  category: string
}

export type DiscoverContext =
  | { kind: 'mission'; mission: SelectedMission; source: DiscoverSource }
  | { kind: 'draft'; draft: SelectedMission; draftId?: string; source: DiscoverSource }
  | { kind: 'empty'; source: DiscoverSource }
  | { kind: 'invalid'; requestedSlug: string; source: DiscoverSource }
  | { kind: 'new-mission'; source: DiscoverSource }

export function ScreenAccount({
  lang,
  context,
  languageToggle,
  onAuthenticated,
}: {
  lang: Lang
  context: DiscoverContext
  languageToggle: React.ReactNode
  onAuthenticated: (identity: {
    provider: AuthProvider
    email?: string
    firstName?: string
    lastName?: string
  }) => void
}) {
  const t = COPY[lang]
  const reduce = useReducedMotion()
  const [pending, setPending] = useState<AuthProvider | null>(null)
  const [email, setEmail] = useState('')
  const [emailTouched, setEmailTouched] = useState(false)
  const [missionOpen, setMissionOpen] = useState(true)
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  const mission = context.kind === 'mission' ? context.mission : context.kind === 'draft' ? context.draft : context.kind === 'new-mission' ? { title: COPY[lang].newMissionTitle, description: COPY[lang].newMissionDescription, category: 'Assistance' } : null
  const isNewMission = context.kind === 'new-mission'

  async function go(provider: AuthProvider) {
    if (pending || (provider === 'email' && !emailValid)) return
    setPending(provider)
    try {
      const session = await startSession(provider, provider === 'email' ? email.trim() : undefined)
      onAuthenticated({
        provider,
        email: provider === 'email' ? email.trim().toLowerCase() : undefined,
        firstName: session.firstName,
        lastName: session.lastName,
      })
    } catch {
      setPending(null)
    }
  }

  if (!mission) {
    return (
      <div className="grid min-h-screen lg:grid-cols-[41fr_59fr]">
        <aside className="flex bg-[#151310] px-5 py-6 text-[#FAF8F3] sm:px-10 lg:min-h-screen lg:flex-col lg:px-[clamp(2.5rem,5vw,5.5rem)] lg:py-6">
          <a href="/" className="flex items-center gap-2.5" aria-label="Unitalk"><UnitalkLogo size={22} /><span className="text-sm font-semibold">Unitalk</span></a>
          <div className="mx-auto mt-10 w-full max-w-md lg:mt-[72px]">
            <motion.div initial={reduce ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="flex items-center gap-4 lg:block">
              <img src="/alma-avatar.png" alt="" className="h-12 w-12 rounded-full object-cover lg:h-[72px] lg:w-[72px]" />
              <div className="lg:mt-4"><p className="font-sf text-[19px] font-semibold text-white">Alma</p><p className="mt-0.5 text-[13px] text-[#E38AB4]">{t.almaRole}</p></div>
            </motion.div>
            <motion.div initial={reduce ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: reduce ? 0 : 0.12 }} className="mt-6 border-l border-[#D10E63]/75 pl-5 lg:mt-9 lg:pl-6">
              <h1 className="font-sf text-[28px] font-semibold leading-tight tracking-[-0.035em] text-white lg:text-[38px]">{t.almaGenericTitle}</h1>
              <p className="mt-4 max-w-md text-[15px] leading-7 text-[#C9C1B8] lg:text-[17px]">{t.almaGenericBody}</p>
            </motion.div>
          </div>
        </aside>

        <section className="relative flex min-w-0 items-center bg-[#F3EFE6] px-5 pb-10 pt-20 sm:px-10 lg:min-h-screen lg:px-[clamp(3rem,7vw,7rem)] lg:py-16">
          <div className="absolute right-5 top-4 sm:right-8">{languageToggle}</div>
          <div className="mx-auto w-full max-w-[460px]">
            <GenericPromise t={t} />
            <AuthControls t={t} email={email} setEmail={setEmail} emailValid={emailValid} pending={pending} go={go} />
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-[42fr_58fr]">
      <aside
        style={mission.slug ? { viewTransitionName: `mission-${mission.slug}` } : undefined}
        className="relative order-2 overflow-hidden bg-[#151310] px-5 py-6 text-[#FAF8F3] sm:px-10 lg:order-1 lg:flex lg:min-h-screen lg:flex-col lg:px-[clamp(2.5rem,5vw,5.5rem)] lg:py-6"
      >
        <a href="/" className="flex items-center gap-2.5" aria-label="Unitalk"><UnitalkLogo size={22} /><span className="text-sm font-semibold">Unitalk</span></a>
        <div className="relative mx-auto mt-10 w-full max-w-md lg:mt-[72px]">
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#E05A93]">{t.selected}</p>
            <button type="button" aria-expanded={missionOpen} onClick={() => setMissionOpen((open) => !open)} className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#C9C1B8] lg:hidden">
              {missionOpen ? t.collapse : t.expand}
              <ChevronUp className={`h-3.5 w-3.5 transition-transform ${missionOpen ? '' : 'rotate-180'}`} />
            </button>
          </div>
          <div className={missionOpen ? 'block' : 'hidden lg:block'}>
            <h2 className="mt-[18px] max-w-xl font-sf text-[36px] font-bold leading-[1.02] tracking-[-0.045em] text-white sm:text-[44px]">{mission.title}</h2>
            <p className="mt-4 max-w-md text-[15px] leading-7 text-[#C9C1B8] sm:text-[16px] max-[430px]:hidden">{mission.description}</p>
          </div>
          <div className={`mt-8 sm:mt-12 ${missionOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="flex items-center gap-3"><img src="/alma-avatar.png" alt="" className="h-11 w-11 rounded-full object-cover sm:h-14 sm:w-14" /><div><p className="font-sf text-[18px] font-semibold text-white">Alma</p><p className="text-[12px] text-[#E38AB4]">{t.almaRole}</p></div></div>
            <div className="mt-5 border-l border-[#D10E63]/75 pl-5"><p className="max-w-md font-sf text-[27px] font-semibold leading-tight text-white sm:text-[30px]">{isNewMission ? t.newMissionAlmaTitle : t.missionAlmaTitle}</p><p className="mt-3 max-w-md text-[15px] leading-7 text-[#C9C1B8] sm:text-[16px]">{isNewMission ? t.newMissionAlmaBody : t.missionAlmaBody}</p></div>
            <a href={mission.slug ? `/missions?return=${encodeURIComponent(mission.slug)}` : '/missions'} className="mt-7 inline-flex text-[13px] font-medium text-[#9B9488] no-underline transition-colors hover:text-[#FAF8F3] hover:underline focus-visible:text-[#FAF8F3] focus-visible:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-4 focus-visible:ring-offset-[#151310]">← {t.change}</a>
          </div>
        </div>
      </aside>

      <section className="relative order-1 flex min-w-0 items-center bg-[#F3EFE6] px-5 pb-10 pt-20 sm:px-10 lg:order-2 lg:min-h-screen lg:px-[clamp(3rem,7vw,7rem)] lg:py-16">
        <div className="absolute right-5 top-4 sm:right-8">{languageToggle}</div>
        <div className="mx-auto w-full max-w-[480px]">
          <ContextualPromise t={t} />
          <AuthControls t={t} email={email} setEmail={setEmail} emailValid={emailValid} emailTouched={emailTouched} setEmailTouched={setEmailTouched} pending={pending} go={go} />
          <p className="mt-5 text-[12px] leading-5 text-[#6E665A]">{t.trialLimit}</p>
        </div>
      </section>
    </div>
  )
}

function OfferPromise({ t }: { t: (typeof COPY)[keyof typeof COPY] }) {
  return <div><h2 className="font-sf text-[36px] font-bold leading-[1.02] tracking-[-0.045em] text-[#1C1A17] lg:whitespace-nowrap lg:text-[58px]">{t.offerTitleOne}</h2><p className="mt-2 font-sf text-[30px] font-bold leading-[1.05] tracking-[-0.035em] text-[#1C1A17] lg:whitespace-nowrap lg:text-[44px]">{t.offerTitleTwo}</p><p className="mt-2 font-sf text-[22px] font-bold leading-[1.15] text-[#D10E63] lg:whitespace-nowrap lg:text-[28px]">{t.offerProofOne}</p><p className="mt-2 font-sf text-[17px] font-semibold leading-[1.2] text-[#1C1A17] lg:whitespace-nowrap lg:text-[20px]">{t.offerProofTwo}</p></div>
}

function ContextualPromise({ t }: { t: (typeof COPY)[keyof typeof COPY] }) {
  return <div><h1 className="font-sf text-[36px] font-bold leading-[1.02] tracking-[-0.045em] text-[#1C1A17] sm:text-[46px] lg:text-[54px]">{t.contextualTitle}</h1><p className="mt-3 font-sf text-[25px] font-semibold leading-[1.12] tracking-[-0.025em] text-[#1C1A17] sm:text-[30px]">{t.contextualLead}</p><p className="mt-5 text-[17px] font-semibold text-[#4E483F]">{t.contextualReassurance}</p></div>
}

function AuthControls({ t, email, setEmail, emailValid, emailTouched = false, setEmailTouched, pending, go }: { t: (typeof COPY)[keyof typeof COPY]; email: string; setEmail: (value: string) => void; emailValid: boolean; emailTouched?: boolean; setEmailTouched?: (value: boolean) => void; pending: AuthProvider | null; go: (provider: AuthProvider) => void }) {
  return (
    <div className="mt-7 flex flex-col gap-3">
      <AuthButton onClick={() => go('google')} pending={pending === 'google'} disabled={!!pending}><GoogleIcon className="h-[18px] w-[18px]" />{t.google}</AuthButton>
      <AuthButton onClick={() => go('microsoft')} pending={pending === 'microsoft'} disabled={!!pending}><MicrosoftIcon className="h-[18px] w-[18px]" />{t.microsoft}</AuthButton>
      <div className="my-1 flex items-center gap-3"><span className="h-px flex-1 bg-[#D8D0C2]" /><span className="text-[11px] text-[#8A8175]">{t.orEmail}</span><span className="h-px flex-1 bg-[#D8D0C2]" /></div>
      <label htmlFor="discover-email" className="text-sm font-semibold text-[#4E483F]">{t.emailLabel}</label>
      <input id="discover-email" type="email" inputMode="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} onBlur={() => setEmailTouched?.(true)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.nativeEvent.isComposing) { setEmailTouched?.(true); go('email') } }} placeholder={t.emailPlaceholder} aria-invalid={emailTouched && Boolean(email) && !emailValid} aria-describedby="discover-email-error" disabled={!!pending} className="h-12 w-full rounded-xl border border-[#D8D0C2] bg-white px-4 text-[15px] text-[#1C1A17] outline-none transition-colors placeholder:text-[#A79F91] focus:border-[#D10E63] focus:ring-2 focus:ring-[#D10E63]/20 disabled:opacity-70" />
      <p id="discover-email-error" aria-live="polite" className="min-h-4 text-[12px] text-[#A80B50]">{emailTouched && Boolean(email) && !emailValid ? t.emailError : ''}</p>
      <button type="button" onClick={() => { setEmailTouched?.(true); go('email') }} disabled={!!pending || !emailValid} aria-busy={pending === 'email'} aria-label={t.emailButtonAria} className="inline-flex h-14 items-center justify-center rounded-xl bg-[#D10E63] px-5 text-[15px] font-semibold text-[#FAF8F3] transition-colors hover:bg-[#B90C58] disabled:cursor-not-allowed disabled:bg-[#DED6C8] disabled:text-[#6E665A]">{pending === 'email' ? <Loader2 className="h-[18px] w-[18px] animate-spin" /> : <>{t.email} →</>}</button>
    </div>
  )
}

function AuthButton({ children, onClick, pending, disabled }: { children: React.ReactNode; onClick: () => void; pending: boolean; disabled: boolean }) {
  return <button type="button" onClick={onClick} disabled={disabled} aria-busy={pending} className="inline-flex h-14 items-center justify-center gap-3 rounded-xl border border-[#D8D0C2] bg-white px-5 text-[15px] font-semibold text-[#1C1A17] transition-colors hover:bg-[#FFFDF9] disabled:cursor-wait disabled:opacity-70">{pending ? <Loader2 className="h-[18px] w-[18px] animate-spin text-[#6E665A]" /> : children}</button>
}

const COPY = {
  fr: {
    selected: 'Votre mission', collapse: 'Réduire', expand: 'Afficher', change: 'Changer de mission', almaRole: 'Coordinatrice de missions', missionAlmaTitle: 'Nous reprendrons ici.', missionAlmaBody: 'Après votre connexion, je vous aide à personnaliser cette mission pour votre entreprise, puis à préparer le Collaborateur IA qui l’accomplira.', newMissionTitle: 'Créer une nouvelle mission', newMissionDescription: 'Partez du travail réel. Alma vous aide à définir le résultat attendu, les règles, les applications et les validations nécessaires.', newMissionAlmaTitle: 'Nous partirons de votre besoin.', newMissionAlmaBody: 'Après votre connexion, je vous aide à structurer la mission et à préparer le Collaborateur IA qui l’accomplira.', almaGenericTitle: 'Commençons par le travail à accomplir.', almaGenericBody: 'Après votre connexion, je vous aide à définir une première mission, puis à préparer le Collaborateur IA qui l’accomplira.', genericTitle: 'Tout commence par une mission.', genericLead: '7 jours pour définir la vôtre avec Alma.', google: 'Continuer avec Google', microsoft: 'Continuer avec Microsoft', or: 'ou', orEmail: 'ou par email', emailLabel: 'Adresse email professionnelle', emailPlaceholder: 'vous@entreprise.com', emailError: 'Saisissez une adresse email valide.', emailButtonAria: 'Continuer par email', email: 'Continuer', contextualTitle: 'Votre mission est choisie.', contextualLead: 'Créons le Collaborateur IA qui l’accomplira.', contextualReassurance: '7 jours d’essai. Aucune carte bancaire.', trialLimit: `Essai de ${unitalkPricing.trial.days} jours, dans la limite de ${unitalkPricing.trial.tokens / 1_000_000} million de tokens IA.`, offerTitleOne: 'Votre Collaborateur IA.', offerTitleTwo: 'Gratuit pendant 7 jours.', offerProofOne: `${unitalkPricing.trial.tokens / 1_000_000} million de tokens offerts.`, offerProofTwo: 'Aucune carte bancaire.', offerPrice: '',
  },
  en: {
    selected: 'Your mission', collapse: 'Collapse', expand: 'Show', change: 'Change mission', almaRole: 'Mission coordinator', missionAlmaTitle: 'We will pick up here.', missionAlmaBody: 'After you sign in, I help personalize this mission for your company and create the AI Collaborator that will accomplish it.', newMissionTitle: 'Create a new mission', newMissionDescription: 'Start from the real work. Alma helps define the expected result, rules, applications and approvals.', newMissionAlmaTitle: 'We will start from your need.', newMissionAlmaBody: 'After you sign in, I help structure the mission and create the AI Collaborator that will accomplish it.', almaGenericTitle: 'Let’s start with the work to be done.', almaGenericBody: 'After you sign in, I help define a first mission, then prepare the AI Collaborator that will accomplish it.', genericTitle: 'Everything starts with a mission.', genericLead: '7 days to define yours with Alma.', google: 'Continue with Google', microsoft: 'Continue with Microsoft', or: 'or', orEmail: 'or by email', emailLabel: 'Work email address', emailPlaceholder: 'you@company.com', emailError: 'Enter a valid email address.', emailButtonAria: 'Continue by email', email: 'Continue', contextualTitle: 'Your mission is selected.', contextualLead: 'Let’s create the AI Collaborator that will accomplish it.', contextualReassurance: '7-day trial. No credit card.', trialLimit: '7-day trial, limited to 1 million AI tokens.', offerTitleOne: 'Your AI Collaborator.', offerTitleTwo: 'Free for 7 days.', offerProofOne: '1 million free tokens.', offerProofTwo: 'No credit card.', offerPrice: '',
  },
} as const
