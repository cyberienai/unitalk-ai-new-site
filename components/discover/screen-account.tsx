'use client'

import { useState } from 'react'
import { ChevronUp, Loader2 } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
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
  | { kind: 'invalid'; requestedSlug: string }

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
  const reduce = useReducedMotion()
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
      <div className="grid min-h-[calc(100vh-61px)] lg:grid-cols-[41fr_59fr]">
        <aside className="flex bg-[#151310] px-5 py-7 text-[#FAF8F3] sm:px-10 lg:items-center lg:px-[clamp(2.5rem,5vw,5.5rem)] lg:py-14">
          <div className="mx-auto w-full max-w-md">
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

        <section className="flex min-w-0 items-center bg-[#F3EFE6] px-5 py-10 sm:px-10 lg:px-[clamp(3rem,7vw,7rem)] lg:py-14">
          <div className="mx-auto w-full max-w-[460px]">
            <h2 className="font-sf text-[34px] font-bold leading-[1.03] tracking-[-0.045em] text-[#1C1A17] sm:text-[42px] lg:text-[56px]"><span className="block">{t.offerTitleOne}</span><span className="block">{t.offerTitleTwo}</span></h2>
            <p className="mt-5 text-[16px] font-semibold leading-7 text-[#B00C54]">{t.offerProofOne}<span className="block text-[#4E483F]">{t.offerProofTwo}</span></p>
            <p className="mt-3 text-[13px] leading-6 text-[#6E665A]">{t.offerPrice}</p>
            <AuthControls t={t} email={email} setEmail={setEmail} emailValid={emailValid} pending={pending} go={go} />
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="grid min-h-[calc(100vh-61px)] lg:grid-cols-[42fr_58fr]">
      <aside
        style={mission.slug ? { viewTransitionName: `mission-${mission.slug}` } : undefined}
        className="relative overflow-hidden bg-[#151310] px-5 py-7 text-[#FAF8F3] sm:px-10 lg:flex lg:min-h-0 lg:items-center lg:px-[clamp(2.5rem,5vw,5.5rem)] lg:py-12"
      >
        <div className="relative mx-auto w-full max-w-md">
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#F39AC2]">{t.selected}</p>
            <button type="button" aria-expanded={missionOpen} onClick={() => setMissionOpen((open) => !open)} className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#C9C1B8] lg:hidden">
              {missionOpen ? t.collapse : t.expand}
              <ChevronUp className={`h-3.5 w-3.5 transition-transform ${missionOpen ? '' : 'rotate-180'}`} />
            </button>
          </div>
          <div className={missionOpen ? 'block' : 'hidden lg:block'}>
            <h1 className="mt-3 max-w-xl font-sf text-[36px] font-bold leading-[1.02] tracking-[-0.045em] text-white sm:text-[44px]">{mission.title}</h1>
            <p className="mt-4 max-w-md text-[15px] leading-7 text-[#C9C1B8] sm:text-[16px] max-[430px]:hidden">{mission.description}</p>
          </div>
          <div className={`mt-8 sm:mt-12 ${missionOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="flex items-center gap-3"><img src="/alma-avatar.png" alt="" className="h-11 w-11 rounded-full object-cover sm:h-14 sm:w-14" /><div><p className="font-sf text-[18px] font-semibold text-white">Alma</p><p className="text-[12px] text-[#E38AB4]">{t.almaRole}</p></div></div>
            <div className="mt-5 border-l border-[#D10E63]/75 pl-5"><p className="max-w-md font-sf text-[27px] font-semibold leading-tight text-white sm:text-[30px]">{t.missionAlmaTitle}</p><p className="mt-3 max-w-md text-[15px] leading-7 text-[#C9C1B8] sm:text-[16px]">{t.missionAlmaBody}</p></div>
            <a href={mission.slug ? `/missions?return=${encodeURIComponent(mission.slug)}` : '/missions'} className="mt-7 inline-flex text-sm font-semibold text-white underline decoration-white/25 underline-offset-4 hover:decoration-white">← {t.change}</a>
          </div>
        </div>
      </aside>

      <section className="flex min-w-0 items-center bg-[#F3EFE6] px-5 py-10 sm:px-10 lg:px-[clamp(3rem,7vw,7rem)] lg:py-14">
        <div className="mx-auto w-full max-w-[480px]">
          <h2 className="font-sf text-[34px] font-bold leading-[1.03] tracking-[-0.045em] text-[#1C1A17] sm:text-[42px] lg:text-[56px]"><span className="block">{t.offerTitleOne}</span><span className="block">{t.offerTitleTwo}</span></h2>
          <p className="mt-5 text-[16px] font-semibold leading-7 text-[#B00C54]">{t.offerProofOne}<span className="block text-[#4E483F]">{t.offerProofTwo}</span></p>
          <p className="mt-3 text-[13px] leading-6 text-[#6E665A]">{t.offerPrice}</p>
          <AuthControls t={t} email={email} setEmail={setEmail} emailValid={emailValid} pending={pending} go={go} />
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
      <div className="my-1 flex items-center gap-3"><span className="h-px flex-1 bg-[#D8D0C2]" /><span className="text-[11px] text-[#8A8175]">{t.orEmail}</span><span className="h-px flex-1 bg-[#D8D0C2]" /></div>
      <input type="email" inputMode="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.nativeEvent.isComposing) go('email') }} placeholder={t.emailPlaceholder} aria-label={t.emailPlaceholder} disabled={!!pending} className="h-12 w-full rounded-xl border border-[#D8D0C2] bg-white px-4 text-[15px] text-[#1C1A17] outline-none transition-colors placeholder:text-[#A79F91] focus:border-[#D10E63] focus:ring-2 focus:ring-[#D10E63]/20 disabled:opacity-70" />
      <button type="button" onClick={() => go('email')} disabled={!!pending || !emailValid} aria-busy={pending === 'email'} className="inline-flex h-14 items-center justify-center rounded-xl bg-[#151310] px-5 text-[15px] font-semibold text-[#FAF8F3] transition-colors hover:bg-[#2A2621] disabled:cursor-not-allowed disabled:bg-[#DED6C8] disabled:text-[#6E665A]">{pending === 'email' ? <Loader2 className="h-[18px] w-[18px] animate-spin" /> : <>{t.email} →</>}</button>
    </div>
  )
}

function AuthButton({ children, onClick, pending, disabled }: { children: React.ReactNode; onClick: () => void; pending: boolean; disabled: boolean }) {
  return <button type="button" onClick={onClick} disabled={disabled} aria-busy={pending} className="inline-flex h-14 items-center justify-center gap-3 rounded-xl border border-[#D8D0C2] bg-white px-5 text-[15px] font-semibold text-[#1C1A17] transition-colors hover:bg-[#FFFDF9] disabled:cursor-wait disabled:opacity-70">{pending ? <Loader2 className="h-[18px] w-[18px] animate-spin text-[#6E665A]" /> : children}</button>
}

const COPY = {
  fr: {
    selected: 'Votre choix', collapse: 'Réduire', expand: 'Afficher', change: 'Choisir une autre mission', almaRole: 'Conseillère IA · Unitalk', missionAlmaTitle: 'Nous reprendrons ici.', missionAlmaBody: 'Après votre connexion, je vous aide à personnaliser cette mission pour votre entreprise et à créer le Collaborateur IA qui l’accomplira.', almaGenericTitle: 'Commençons par votre entreprise.', almaGenericBody: 'Après votre connexion, je vous aide à définir une première mission et à créer le Collaborateur IA qui l’accomplira.', google: 'Continuer avec Google', microsoft: 'Continuer avec Microsoft', or: 'ou', orEmail: 'ou par email', emailPlaceholder: 'vous@entreprise.com', email: 'Recevoir mon lien d’accès', offerTitleOne: 'Votre Collaborateur IA.', offerTitleTwo: 'Gratuit pendant 7 jours.', offerProofOne: '1 million de tokens offerts.', offerProofTwo: 'Aucune carte bancaire.', offerPrice: 'Puis 98 €/mois, avec 5 millions de tokens inclus chaque mois.',
  },
  en: {
    selected: 'Your choice', collapse: 'Collapse', expand: 'Show', change: 'Choose another mission', almaRole: 'AI Advisor · Unitalk', missionAlmaTitle: 'We will pick up here.', missionAlmaBody: 'After you sign in, I help personalize this mission for your company and create the AI Collaborator that will accomplish it.', almaGenericTitle: 'Let’s start with your company.', almaGenericBody: 'After you sign in, I help define a first mission and create the AI Collaborator that will accomplish it.', google: 'Continue with Google', microsoft: 'Continue with Microsoft', or: 'or', orEmail: 'or by email', emailPlaceholder: 'you@company.com', email: 'Send my access link', offerTitleOne: 'Your AI Collaborator.', offerTitleTwo: 'Free for 7 days.', offerProofOne: '1 million free tokens.', offerProofTwo: 'No credit card.', offerPrice: 'Then €49/month for its identity, excluding AI model usage.',
  },
} as const
