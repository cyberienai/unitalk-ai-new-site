'use client'

import { useState } from 'react'
import { ChevronUp, Loader2, Mail } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { startSession } from '@/app/actions/auth'
import type { AuthProvider } from '@/lib/mock-auth'
import { GoogleIcon, MicrosoftIcon } from '@/components/auth/provider-icons'

export type SelectedMission = {
  slug?: string
  title: string
  description: string
  category: string
}

export type DiscoverContext =
  | { kind: 'mission'; mission: SelectedMission }
  | { kind: 'draft'; draft: SelectedMission }
  | { kind: 'empty' }

export function ScreenAccount({
  lang,
  context,
  onAuthenticated,
}: {
  lang: Lang
  context: DiscoverContext
  onAuthenticated: (identity: {
    provider: AuthProvider
    email?: string
    firstName?: string
    lastName?: string
  }) => void
}) {
  const t = COPY[lang]
  const [pending, setPending] = useState<AuthProvider | null>(null)
  const [email, setEmail] = useState('')
  const [missionOpen, setMissionOpen] = useState(true)
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  const mission = context.kind === 'mission' ? context.mission : context.kind === 'draft' ? context.draft : null

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
      <div className="grid min-h-[calc(100vh-61px)] lg:grid-cols-[42fr_58fr]">
        <aside className="bg-[#151310] px-5 py-8 text-[#FAF8F3] sm:px-10 lg:flex lg:flex-col lg:justify-between lg:px-[clamp(2.5rem,5vw,5.5rem)] lg:py-14">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#F39AC2]">{t.journeyEyebrow}</p>
            <h1 className="mt-6 max-w-xl font-sf text-[clamp(2.2rem,4vw,4.5rem)] font-bold leading-[0.98] tracking-[-0.055em] text-white">
              <span className="block">{t.journeyTitle[0]}</span>
              <span className="block">{t.journeyTitle[1]}</span>
              <span className="block">{t.journeyTitle[2]}</span>
            </h1>
            <p className="mt-6 max-w-md text-[15px] leading-7 text-[#C9C1B8]">{t.journeyBody}</p>
            <ol className="mt-8 border-y border-white/15">
              {t.journeySteps.map(([title, body], index) => (
                <li key={title} className="grid grid-cols-[32px_1fr] gap-3 border-b border-white/15 py-4 last:border-b-0">
                  <span className="font-mono text-[10px] text-[#F39AC2]">0{index + 1}</span>
                  <span><strong className="block text-[12px] uppercase tracking-[0.08em] text-white">{title}</strong><span className="mt-1 block text-[12px] leading-5 text-[#AAA197]">{body}</span></span>
                </li>
              ))}
            </ol>
          </div>
          <div className="mt-8 border-t border-white/15 pt-6">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#F39AC2]">{t.alma}</p>
            <p className="mt-3 max-w-md text-sm leading-6 text-[#C9C1B8]">{t.journeyAlma}</p>
          </div>
        </aside>

        <section className="flex min-w-0 items-center bg-[#F3EFE6] px-5 py-10 sm:px-10 lg:px-[clamp(3rem,7vw,7rem)] lg:py-14">
          <div className="mx-auto w-full max-w-[480px]">
            <h2 className="text-balance font-sf text-[30px] font-bold leading-tight tracking-[-0.035em] text-[#1C1A17] sm:text-[38px]">{t.genericQuestion}</h2>
            <p className="mt-4 text-[15px] leading-7 text-[#4E483F]">{t.genericSubtitle}</p>
            <AuthControls t={t} email={email} setEmail={setEmail} emailValid={emailValid} pending={pending} go={go} />
            <p className="mt-6 text-[12px] leading-relaxed text-[#6E665A]">{t.genericReassure}</p>
            <p className="mt-2 text-[12px] font-semibold text-[#4E483F]">{t.genericTrial}</p>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="grid min-h-[calc(100vh-61px)] lg:grid-cols-[42fr_58fr]">
      <aside
        style={mission.slug ? { viewTransitionName: `mission-${mission.slug}` } : undefined}
        className="relative overflow-hidden bg-[#151310] px-5 py-7 text-[#FAF8F3] sm:px-10 lg:flex lg:min-h-0 lg:flex-col lg:justify-between lg:px-[clamp(2.5rem,5vw,5.5rem)] lg:py-14"
      >
        <div aria-hidden className="pointer-events-none absolute -left-32 -top-40 h-96 w-96 rounded-full bg-[#D10E63]/10 blur-3xl" />
        <div className="relative">
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#F39AC2]">{t.selected}</p>
            <button type="button" aria-expanded={missionOpen} onClick={() => setMissionOpen((open) => !open)} className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#C9C1B8] lg:hidden">
              {missionOpen ? t.collapse : t.expand}
              <ChevronUp className={`h-3.5 w-3.5 transition-transform ${missionOpen ? '' : 'rotate-180'}`} />
            </button>
          </div>
          <div className={missionOpen ? 'block' : 'hidden lg:block'}>
            <h1 className="mt-6 max-w-xl font-sf text-[clamp(2.15rem,4.2vw,4.75rem)] font-bold leading-[0.98] tracking-[-0.055em] text-white">{mission.title}</h1>
            <p className="mt-6 max-w-md text-[15px] leading-7 text-[#C9C1B8] sm:text-[16px]">{mission.description}</p>
            <p className="mt-6 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#F05C9D]">{mission.category}</p>
          </div>
        </div>
        <div className={`relative mt-8 border-t border-white/15 pt-6 ${missionOpen ? 'block' : 'hidden lg:block'}`}>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#F39AC2]">{t.alma}</p>
          <p className="mt-4 max-w-md font-sf text-xl font-bold text-white">{t.saved}</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-[#C9C1B8]">{t.almaMessage}</p>
          <a href="/missions" className="mt-6 inline-flex text-sm font-semibold text-white underline decoration-white/25 underline-offset-4 hover:decoration-white">← {t.change}</a>
        </div>
      </aside>

      <section className="flex min-w-0 items-center bg-[#F3EFE6] px-5 py-10 sm:px-10 lg:px-[clamp(3rem,7vw,7rem)] lg:py-14">
        <div className="mx-auto w-full max-w-[480px]">
          <h2 className="text-balance font-sf text-[30px] font-bold leading-tight tracking-[-0.035em] text-[#1C1A17] sm:text-[38px]">{t.question}</h2>
          <p className="mt-4 text-[15px] leading-7 text-[#4E483F]">{t.attached(mission.title)}</p>

          <AuthControls t={t} email={email} setEmail={setEmail} emailValid={emailValid} pending={pending} go={go} />
          <p className="mt-6 text-[12px] leading-relaxed text-[#6E665A]">{t.reassure}</p>
        </div>
      </section>
    </div>
  )
}

function AuthControls({ t, email, setEmail, emailValid, pending, go }: { t: (typeof COPY)[keyof typeof COPY]; email: string; setEmail: (value: string) => void; emailValid: boolean; pending: AuthProvider | null; go: (provider: AuthProvider) => void }) {
  return (
    <div className="mt-7 flex flex-col gap-3">
      <AuthButton onClick={() => go('google')} pending={pending === 'google'} disabled={!!pending}><GoogleIcon className="h-[18px] w-[18px]" />{t.google}</AuthButton>
      <AuthButton onClick={() => go('microsoft')} pending={pending === 'microsoft'} disabled={!!pending}><MicrosoftIcon className="h-[18px] w-[18px]" />{t.microsoft}</AuthButton>
      <div className="my-1 flex items-center gap-3"><span className="h-px flex-1 bg-[#D8D0C2]" /><span className="text-[11px] text-[#8A8175]">{t.or}</span><span className="h-px flex-1 bg-[#D8D0C2]" /></div>
      <input type="email" inputMode="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.nativeEvent.isComposing) go('email') }} placeholder={t.emailPlaceholder} aria-label={t.emailPlaceholder} disabled={!!pending} className="h-12 w-full rounded-xl border border-[#D8D0C2] bg-white px-4 text-[15px] text-[#1C1A17] outline-none transition-colors placeholder:text-[#A79F91] focus:border-[#D10E63] focus:ring-2 focus:ring-[#D10E63]/20 disabled:opacity-70" />
      <button type="button" onClick={() => go('email')} disabled={!!pending || !emailValid} aria-busy={pending === 'email'} className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#D10E63] px-5 text-[15px] font-semibold text-white transition-colors hover:bg-[#B90C58] disabled:cursor-not-allowed disabled:bg-[#C9C1B8] disabled:text-[#F7F3EC]">{pending === 'email' ? <Loader2 className="h-[18px] w-[18px] animate-spin" /> : <><Mail className="h-[18px] w-[18px]" />{t.email} →</>}</button>
    </div>
  )
}

function AuthButton({ children, onClick, pending, disabled }: { children: React.ReactNode; onClick: () => void; pending: boolean; disabled: boolean }) {
  return <button type="button" onClick={onClick} disabled={disabled} aria-busy={pending} className="inline-flex h-12 items-center justify-center gap-3 rounded-xl border border-[#D8D0C2] bg-white px-5 text-[15px] font-semibold text-[#1C1A17] shadow-[0_10px_24px_-20px_rgba(28,26,23,0.5)] transition-colors hover:bg-[#FBF9F3] disabled:cursor-wait disabled:opacity-70">{pending ? <Loader2 className="h-[18px] w-[18px] animate-spin text-[#6E665A]" /> : children}</button>
}

const COPY = {
  fr: {
    selected: 'Mission à personnaliser', collapse: 'Réduire', expand: 'Afficher', change: 'Changer de mission', alma: 'Alma · Conseillère IA · Unitalk', saved: 'J’ai conservé cette mission.', almaMessage: 'Authentifiez-vous pour poursuivre. Je vous aiderai ensuite à l’adapter à votre entreprise et à préparer votre premier Collaborateur IA.', attached: (title: string) => `Votre mission « ${title} » est conservée.`, question: 'Authentifiez-vous pour continuer.', google: 'Continuer avec Google', microsoft: 'Continuer avec Microsoft', or: 'ou', emailPlaceholder: 'vous@entreprise.com', email: 'Recevoir un lien par email', reassure: 'Aucun mot de passe · Aucune carte bancaire · Mission conservée', journeyEyebrow: 'Votre parcours Unitalk', journeyTitle: ['Une entreprise.', 'Une mission.', 'Un Collaborateur IA.'], journeyBody: 'Après votre authentification, Alma vous aide à présenter votre entreprise, cadrer une première mission et préparer le Collaborateur IA qui l’accomplira.', journeySteps: [['Votre entreprise', 'Le contexte dans lequel il travaillera.'], ['Votre première mission', 'Le résultat que vous voulez obtenir.'], ['Votre Collaborateur IA', 'Son identité, ses responsabilités et ses accès.']], journeyAlma: 'Je vous accompagne de la première mission à la création de votre Collaborateur IA.', genericQuestion: 'Authentifiez-vous pour commencer.', genericSubtitle: 'Utilisez votre adresse professionnelle pour rejoindre le parcours Unitalk.', genericReassure: 'Aucun mot de passe · Aucune carte bancaire', genericTrial: '7 jours d’essai · 1 million de tokens offerts',
  },
  en: {
    selected: 'Mission to personalize', collapse: 'Collapse', expand: 'Show', change: 'Change mission', alma: 'Alma · AI Advisor · Unitalk', saved: 'I saved this mission.', almaMessage: 'Sign in to continue. I will then help you adapt it to your company and prepare your first AI Collaborator.', attached: (title: string) => `Your mission “${title}” is saved.`, question: 'Sign in to continue.', google: 'Continue with Google', microsoft: 'Continue with Microsoft', or: 'or', emailPlaceholder: 'you@company.com', email: 'Receive an email link', reassure: 'No password · No credit card · Mission saved', journeyEyebrow: 'Your Unitalk journey', journeyTitle: ['A company.', 'A mission.', 'An AI Collaborator.'], journeyBody: 'After authentication, Alma helps you present your company, frame a first mission and prepare the AI Collaborator that will accomplish it.', journeySteps: [['Your company', 'The context in which it will work.'], ['Your first mission', 'The result you want to achieve.'], ['Your AI Collaborator', 'Its identity, responsibilities and access.']], journeyAlma: 'I guide you from the first mission to creating your AI Collaborator.', genericQuestion: 'Sign in to get started.', genericSubtitle: 'Use your work email to join the Unitalk journey.', genericReassure: 'No password · No credit card', genericTrial: '7-day trial · 1 million free tokens',
  },
} as const
