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
      <div className="grid min-h-screen lg:grid-cols-[42fr_58fr]">
        <aside className="relative overflow-hidden bg-[#151310] px-5 py-6 text-[#FAF8F3] sm:px-10 lg:flex lg:min-h-screen lg:flex-col lg:px-[clamp(2.5rem,5vw,5.5rem)] lg:py-6">
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(#FAF8F3_1px,transparent_1px),linear-gradient(90deg,#FAF8F3_1px,transparent_1px)] [background-size:64px_64px]" />
          <a href="/" className="flex items-center gap-2.5" aria-label="Unitalk"><UnitalkLogo size={22} /><span className="text-sm font-semibold">Unitalk</span></a>
          <div className="relative mx-auto mt-10 w-full max-w-md lg:my-auto">
            <motion.div initial={reduce ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="flex items-center gap-4 lg:block">
              <img src="/alma-avatar.png" alt="" className="h-12 w-12 rounded-full object-cover lg:h-[72px] lg:w-[72px]" />
              <div className="lg:mt-4"><p className="font-sf text-[19px] font-semibold text-white">Alma</p><p className="mt-0.5 text-[13px] text-[#F2A4C5]">{t.almaRole}</p></div>
            </motion.div>
            <motion.div initial={reduce ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: reduce ? 0 : 0.12 }} className="mt-6 border-l border-[#D10E63]/75 pl-5 lg:mt-9 lg:pl-6">
              <h2 className="font-sf text-[28px] font-semibold leading-tight tracking-[-0.035em] text-white lg:text-[38px]">{t.almaGenericTitle}</h2>
              <p className="mt-4 max-w-md text-[15px] leading-7 text-[#C9C1B8] lg:text-[17px]">{t.almaGenericBody}</p>
            </motion.div>
            <div className="mt-8 grid gap-3 text-sm text-[#D9D1C6] sm:grid-cols-3 lg:grid-cols-1">
              {t.genericSteps.map((item, index) => <div key={item} className="flex gap-3"><span className="font-mono text-[10px] font-bold text-[#E05A93]">0{index + 1}</span><span>{item}</span></div>)}
            </div>
          </div>
        </aside>

        <section className="relative flex min-w-0 items-center bg-[#F3EFE6] px-5 pb-10 pt-20 sm:px-10 lg:min-h-screen lg:px-[clamp(3rem,7vw,7rem)] lg:py-12">
          <div className="absolute right-5 top-4 sm:right-8">{languageToggle}</div>
          <div className="mx-auto w-full max-w-[460px]">
            <GenericPromise t={t} />
            <AuthControls t={t} email={email} setEmail={setEmail} emailValid={emailValid} pending={pending} go={go} />
            <p className="mt-5 text-[12px] leading-5 text-[#6E665A]">{t.trialLimit}</p>
            <LegalNotice t={t} />
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
            <a href={mission.slug ? `/missions?return=${encodeURIComponent(mission.slug)}` : '/missions'} className="mt-5 inline-flex text-[13px] font-medium text-[#C9C1B8] underline decoration-white/20 underline-offset-4 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2A4C5]">← {t.change}</a>
          </div>
          <div className={`mt-8 sm:mt-12 ${missionOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="flex items-center gap-3"><img src="/alma-avatar.png" alt="" className="h-11 w-11 rounded-full object-cover sm:h-14 sm:w-14" /><div><p className="font-sf text-[18px] font-semibold text-white">Alma</p><p className="text-[12px] text-[#F2A4C5]">{t.almaRole}</p></div></div>
            <div className="mt-5 border-l border-[#D10E63]/75 pl-5"><p className="max-w-md font-sf text-[27px] font-semibold leading-tight text-white sm:text-[30px]">{isNewMission ? t.newMissionAlmaTitle : t.missionAlmaTitle}</p><p className="mt-3 max-w-md text-[15px] leading-7 text-[#C9C1B8] sm:text-[16px]">{isNewMission ? t.newMissionAlmaBody : t.missionAlmaBody}</p></div>
          </div>
        </div>
      </aside>

      <section className="relative order-1 flex min-w-0 items-center bg-[#F3EFE6] px-5 pb-10 pt-20 sm:px-10 lg:order-2 lg:min-h-screen lg:px-[clamp(3rem,7vw,7rem)] lg:py-16">
        <div className="absolute right-5 top-4 sm:right-8">{languageToggle}</div>
        <div className="mx-auto w-full max-w-[480px]">
          <ContextualPromise t={t} />
          <AuthControls t={t} email={email} setEmail={setEmail} emailValid={emailValid} emailTouched={emailTouched} setEmailTouched={setEmailTouched} pending={pending} go={go} />
          <p className="mt-5 text-[12px] leading-5 text-[#6E665A]">{t.trialLimit}</p>
          <LegalNotice t={t} />
        </div>
      </section>
    </div>
  )
}

function OfferPromise({ t }: { t: (typeof COPY)[keyof typeof COPY] }) {
  return <div><h2 className="font-sf text-[36px] font-bold leading-[1.02] tracking-[-0.045em] text-[#1C1A17] lg:whitespace-nowrap lg:text-[58px]">{t.offerTitleOne}</h2><p className="mt-2 font-sf text-[30px] font-bold leading-[1.05] tracking-[-0.035em] text-[#1C1A17] lg:whitespace-nowrap lg:text-[44px]">{t.offerTitleTwo}</p><p className="mt-2 font-sf text-[22px] font-bold leading-[1.15] text-[#D10E63] lg:whitespace-nowrap lg:text-[28px]">{t.offerProofOne}</p><p className="mt-2 font-sf text-[17px] font-semibold leading-[1.2] text-[#1C1A17] lg:whitespace-nowrap lg:text-[20px]">{t.offerProofTwo}</p></div>
}

function GenericPromise({ t }: { t: (typeof COPY)[keyof typeof COPY] }) {
  return <div><h1 className="font-sf text-[36px] font-semibold leading-[1.02] tracking-[-0.045em] text-[#1C1A17] sm:text-[46px]">{t.genericTitle}</h1><p className="mt-4 text-[17px] font-semibold leading-7 text-[#4E483F]">{t.genericLead}</p><p className="mt-3 text-sm leading-6 text-[#6E665A]">{t.contextualReassurance}</p></div>
}

function ContextualPromise({ t }: { t: (typeof COPY)[keyof typeof COPY] }) {
  return <div><h1 className="font-sf text-[36px] font-bold leading-[1.02] tracking-[-0.045em] text-[#1C1A17] sm:text-[46px] lg:text-[54px]">{t.contextualTitle}</h1><p className="mt-3 font-sf text-[25px] font-semibold leading-[1.12] tracking-[-0.025em] text-[#1C1A17] sm:text-[30px]">{t.contextualLead}</p><p className="mt-5 text-[17px] font-semibold text-[#4E483F]">{t.contextualReassurance}</p></div>
}

function LegalNotice({ t }: { t: (typeof COPY)[keyof typeof COPY] }) {
  return <p className="mt-4 text-[11px] leading-5 text-[#857C6E]">{t.legalPrefix} <a href="/conditions" className="font-semibold underline underline-offset-3 hover:text-[#1C1A17]">{t.terms}</a> {t.legalAnd} <a href="/confidentialite" className="font-semibold underline underline-offset-3 hover:text-[#1C1A17]">{t.privacy}</a>.</p>
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
      <button type="button" onClick={() => { setEmailTouched?.(true); go('email') }} disabled={!!pending || !emailValid} aria-busy={pending === 'email'} aria-label={t.emailButtonAria} className={`inline-flex h-14 items-center justify-center rounded-xl px-5 text-[15px] font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 ${emailValid && !pending ? 'bg-[#D10E63] text-[#FAF8F3] hover:bg-[#B90C58]' : 'cursor-not-allowed bg-[#DED6C8] text-[#6E665A]'}`}>{pending === 'email' ? <Loader2 className="h-[18px] w-[18px] animate-spin" /> : <>{t.email} →</>}</button>
    </div>
  )
}

function AuthButton({ children, onClick, pending, disabled }: { children: React.ReactNode; onClick: () => void; pending: boolean; disabled: boolean }) {
  return <button type="button" onClick={onClick} disabled={disabled} aria-busy={pending} className="inline-flex h-14 items-center justify-center gap-3 rounded-xl border border-[#D8D0C2] bg-white px-5 text-[15px] font-semibold text-[#1C1A17] transition-colors hover:bg-[#FFFDF9] disabled:cursor-wait disabled:opacity-70">{pending ? <Loader2 className="h-[18px] w-[18px] animate-spin text-[#6E665A]" /> : children}</button>
}

const COPY = {
  fr: {
    selected: 'Votre mission', collapse: 'Réduire', expand: 'Afficher', change: 'Changer de mission', almaRole: 'Collaboratrice IA · Coordinatrice de missions', missionAlmaTitle: 'Nous reprendrons ici.', missionAlmaBody: 'Après votre connexion, je vous aide à adapter cette mission à votre entreprise, puis à préparer le Collaborateur IA qui l’accomplira.', newMissionTitle: 'Créer une nouvelle mission', newMissionDescription: 'Partez du travail réel. Alma vous aide à définir le résultat attendu, les règles, les applications et les validations nécessaires.', newMissionAlmaTitle: 'Nous partirons de votre besoin.', newMissionAlmaBody: 'Après votre connexion, je vous aide à structurer la mission et à préparer le Collaborateur IA qui l’accomplira.', almaGenericTitle: 'Vous n’avez pas encore choisi de mission.', almaGenericBody: 'Après votre inscription, nous partons de votre entreprise et du travail que vous voulez accomplir. Je vous aide à choisir ou construire la première mission, puis à préparer le Collaborateur IA qui l’accomplira.', genericSteps: ['Présenter votre entreprise', 'Définir une première mission', 'Préparer votre Collaborateur IA'], genericTitle: 'Créez votre compte Unitalk.', genericLead: 'Aucune mission n’est présélectionnée. Alma vous aide à définir la première après votre connexion.', google: 'Continuer avec Google', microsoft: 'Continuer avec Microsoft', or: 'ou', orEmail: 'ou par email', emailLabel: 'Adresse email professionnelle', emailPlaceholder: 'vous@entreprise.com', emailError: 'Saisissez une adresse email valide.', emailButtonAria: 'Continuer par email', email: 'Continuer', contextualTitle: 'Votre mission est choisie.', contextualLead: 'Connectez-vous pour l’adapter à votre entreprise avec Alma.', contextualReassurance: '7 jours d’essai · Aucune carte bancaire', trialLimit: `Limite de l’essai : ${unitalkPricing.trial.tokens / 1_000_000} million de tokens IA.`, legalPrefix: 'En continuant, vous acceptez les', terms: 'Conditions d’utilisation', legalAnd: 'et la', privacy: 'Politique de confidentialité', offerTitleOne: 'Votre Collaborateur IA.', offerTitleTwo: 'Gratuit pendant 7 jours.', offerProofOne: `${unitalkPricing.trial.tokens / 1_000_000} million de tokens offerts.`, offerProofTwo: 'Aucune carte bancaire.', offerPrice: '',
  },
  en: {
    selected: 'Your mission', collapse: 'Collapse', expand: 'Show', change: 'Change mission', almaRole: 'AI Collaborator · Mission coordinator', missionAlmaTitle: 'We will pick up here.', missionAlmaBody: 'After you sign in, I help adapt this mission to your company, then prepare the AI Collaborator that will accomplish it.', newMissionTitle: 'Create a new mission', newMissionDescription: 'Start from the real work. Alma helps define the expected result, rules, applications and approvals.', newMissionAlmaTitle: 'We will start from your need.', newMissionAlmaBody: 'After you sign in, I help structure the mission and prepare the AI Collaborator that will accomplish it.', almaGenericTitle: 'You have not selected a mission yet.', almaGenericBody: 'After signup, we start from your company and the work you want to accomplish. I help select or build the first mission, then prepare the AI Collaborator that will carry it out.', genericSteps: ['Introduce your company', 'Define a first mission', 'Prepare your AI Collaborator'], genericTitle: 'Create your Unitalk account.', genericLead: 'No mission is preselected. Alma helps define the first one after you sign in.', google: 'Continue with Google', microsoft: 'Continue with Microsoft', or: 'or', orEmail: 'Work email', emailLabel: 'Work email address', emailPlaceholder: 'you@company.com', emailError: 'Enter a valid email address.', emailButtonAria: 'Continue by email', email: 'Continue', contextualTitle: 'Your mission is selected.', contextualLead: 'Sign in to adapt it to your company with Alma.', contextualReassurance: '7-day trial · No credit card', trialLimit: 'Trial limit: 1 million AI tokens.', legalPrefix: 'By continuing, you agree to the', terms: 'Terms of Use', legalAnd: 'and the', privacy: 'Privacy Policy', offerTitleOne: 'Your AI Collaborator.', offerTitleTwo: 'Free for 7 days.', offerProofOne: '1 million free tokens.', offerProofTwo: 'No credit card.', offerPrice: '',
  },
} as const
