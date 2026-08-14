'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { UnitalkLogo } from '@/components/unitalk-logo'
import { LanguageToggle } from '@/components/language-toggle'
import { FlowStepper } from './flow-stepper'
import { ScreenAccount, type DiscoverContext, type SelectedMission } from './screen-account'
import { ScreenContext } from './screen-context'
import { ScreenMission } from './screen-mission'
import { ScreenCollaborateur } from './screen-collaborateur'
import { initialOnboardingState, STEP_ORDER, type OnboardingState, type OnboardingStep } from './types'
import { MISSIONS } from '@/lib/missions-catalog'
import { actionDescription, shortCategoryLabel } from '@/components/missions/store-card'
import type { MockSession } from '@/lib/mock-auth'
import { parseDiscoverSource } from '@/lib/discover-entry'

function normalizeDomain(v: string | null) { return v?.trim().replace(/^https?:\/\//i, '').replace(/\/.*$/, '').toLowerCase() ?? '' }

export function DiscoverFlow({ initialSession }: { initialSession?: MockSession | null }) {
  const { lang } = useLanguage()
  const reduce = useReducedMotion()
  const router = useRouter()
  const searchParams = useSearchParams()
  const missionSlug = searchParams.get('mission')
  const draftId = searchParams.get('draft')
  const legacyQuery = searchParams.get('q')?.trim() ?? ''
  const source = parseDiscoverSource(searchParams.get('source'))
  const requestedDomain = normalizeDomain(searchParams.get('domain'))
  const catalogMission = useMemo(() => MISSIONS.find(m => m.slug === missionSlug), [missionSlug])
  const [draftText, setDraftText] = useState('')

  const [state, setState] = useState<OnboardingState>(() => {
    const init = initialOnboardingState()
    const sessionDomain = initialSession?.email.split('@').at(-1)?.trim().toLowerCase()
    const domain = requestedDomain || sessionDomain
    return {
      ...init,
      authenticated: Boolean(initialSession),
      firstName: initialSession?.firstName?.trim() ?? '',
      lastName: initialSession?.lastName?.trim() ?? '',
      company: domain ? init.company.map(f => f.key === 'domain' ? { ...f, value: domain, uncertain: false } : f.key === 'name' ? { ...f, value: domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1), uncertain: false } : f) : init.company,
    }
  })
  const [step, setStep] = useState<OnboardingStep>('entreprise')

  useEffect(() => { if (!draftId) return; try { const raw = localStorage.getItem(`unitalk_mission_${draftId}`); if (raw) setDraftText((JSON.parse(raw) as { text?: string }).text?.trim() ?? '') } catch {} }, [draftId])

  const context: DiscoverContext = source === 'paul-graham'
    ? { kind: 'draft', draftId: draftId ?? undefined, draft: { title: draftText || legacyQuery, description: lang === 'fr' ? 'Alma va structurer votre demande et la personnaliser pour votre entreprise.' : 'Alma will structure your request and personalize it for your company.', category: lang === 'fr' ? 'Mission sur mesure' : 'Custom mission' }, source }
    : missionSlug && !catalogMission ? { kind: 'invalid', requestedSlug: missionSlug, source }
    : catalogMission ? { kind: 'mission', mission: { slug: catalogMission.slug, title: catalogMission.title[lang], description: actionDescription(catalogMission, lang), category: shortCategoryLabel(catalogMission.category, lang) }, source }
    : draftText || legacyQuery ? { kind: 'draft', draftId: draftId ?? undefined, draft: { title: draftText || legacyQuery, description: lang === 'fr' ? 'Alma va structurer votre demande.' : 'Alma will structure your request.', category: lang === 'fr' ? 'Mission sur mesure' : 'Custom mission' }, source }
    : { kind: 'empty', source }

  const selectedMission: SelectedMission | null = context.kind === 'mission' ? context.mission : context.kind === 'draft' ? context.draft : null

  useEffect(() => { if (!selectedMission?.title) return; setState(s => s.mission.title === selectedMission.title && s.missionDefined ? s : { ...s, mission: { ...s.mission, title: selectedMission.title }, missionDefined: true }) }, [selectedMission?.title])

  function goTo(next: OnboardingStep) { setStep(next) }
  const stepIndex = STEP_ORDER.indexOf(step)
  const back = stepIndex > 0 ? STEP_ORDER[stepIndex - 1] : null

  const anim = reduce ? {} : { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 }, transition: { duration: 0.25 } }

  // — Paul Graham entry: skip directly to auth, no stepper, no multi-step —
  if (source === 'paul-graham') {
    if (!state.authenticated) return (
      <main className="flex min-h-screen flex-col bg-[#F3EFE6] text-[#1C1A17]">
        <ScreenAccount lang={lang} context={context} languageToggle={<LanguageToggle />}
          onAuthenticated={({ provider, email, firstName, lastName }) => {
            const domain = provider === 'email' ? email?.split('@').at(-1)?.trim().toLowerCase() : undefined
            setState(s => ({
              ...s, authenticated: true, mission: selectedMission?.title ? { ...s.mission, title: selectedMission.title } : s.mission, missionDefined: Boolean(selectedMission?.title),
              firstName: firstName?.trim() ?? '', lastName: lastName?.trim() ?? '',
              company: domain ? s.company.map(f => f.key === 'domain' ? { ...f, value: domain, uncertain: false } : f.key === 'name' ? { ...f, value: domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1), uncertain: false } : f) : s.company,
            }))
          }}
        />
      </main>
    )
    // authenticated via Paul Graham → straight to workspace
    router.push('/workspace')
    return <div className="min-h-screen bg-[#F3EFE6]" />
  }

  // — Invalid mission —
  if (context.kind === 'invalid') return (
    <main className="flex min-h-screen flex-col bg-[#F3EFE6] text-[#1C1A17]">
      <header className="flex items-center justify-between gap-4 border-b border-[#D8D0C2] px-5 py-4 sm:px-8">
        <a href="/" className="flex items-center gap-2.5"><UnitalkLogo size={22} /><span className="text-sm font-semibold">Unitalk</span></a><LanguageToggle />
      </header>
      <section className="mx-auto flex flex-1 flex-col items-center justify-center px-5 text-center">
        <h1 className="text-[36px] font-bold tracking-[-0.04em] sm:text-[48px]">{lang === 'fr' ? 'Cette mission n\'est plus disponible.' : 'This mission is no longer available.'}</h1>
        <p className="mt-4 text-[#4E483F]">{lang === 'fr' ? 'Vous pouvez en choisir une autre ou poursuivre avec Alma.' : 'Choose another mission or continue with Alma.'}</p>
        <div className="mt-7 flex gap-4"><a href="/missions" className="text-sm font-bold text-[#B00C54] underline">← {lang === 'fr' ? 'Explorer les missions' : 'Explore missions'}</a></div>
      </section>
    </main>
  )

  // — Not authenticated —
  if (!state.authenticated) return (
    <main className="flex min-h-screen flex-col bg-[#F3EFE6] text-[#1C1A17]">
      <ScreenAccount lang={lang} context={context} languageToggle={<LanguageToggle />}
        onAuthenticated={({ provider, email, firstName, lastName }) => {
          const domain = provider === 'email' ? email?.split('@').at(-1)?.trim().toLowerCase() : undefined
          setState(s => ({ ...s, authenticated: true, mission: selectedMission?.title ? { ...s.mission, title: selectedMission.title } : s.mission, missionDefined: Boolean(selectedMission?.title), firstName: firstName?.trim() ?? '', lastName: lastName?.trim() ?? '', company: domain ? s.company.map(f => f.key === 'domain' ? { ...f, value: domain, uncertain: false } : f.key === 'name' ? { ...f, value: domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1), uncertain: false } : f) : s.company }))
          if (missionSlug) router.replace(`/decouvrir?mission=${encodeURIComponent(missionSlug)}`)
          else if (draftId) router.replace(`/decouvrir?draft=${encodeURIComponent(draftId)}`)
        }}
      />
    </main>
  )

  // — Full flow (enterprise → mission → collaborator) —
  return (
    <main className="flex min-h-screen flex-col bg-[#F3EFE6] text-[#1C1A17]">
      <header className="flex items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <a href="/" className="flex shrink-0 items-center gap-2.5"><UnitalkLogo size={22} /><span className="text-sm font-semibold">Unitalk</span></a>
        <div className="hidden flex-1 justify-center md:flex"><FlowStepper current={step} lang={lang} onStepClick={goTo} /></div>
        <div className="flex shrink-0 items-center gap-2 sm:gap-4"><LanguageToggle /></div>
      </header>
      <div className="px-5 py-3 md:hidden"><FlowStepper current={step} lang={lang} onStepClick={goTo} /></div>
      <div className="mx-auto w-full max-w-6xl flex-1 px-5 py-4 sm:px-8">
        {back && <button type="button" onClick={() => goTo(back)} className="mb-6 inline-flex items-center gap-1.5 text-[13px] font-medium text-[#6E665A] hover:text-[#1C1A17] md:hidden"><ArrowLeft className="h-3.5 w-3.5" />{lang === 'fr' ? 'Précédent' : 'Back'}</button>}
        <AnimatePresence mode="wait">
          <motion.div key={step} {...anim}>
            {step === 'entreprise' && <ScreenContext lang={lang} firstName={state.firstName} lastName={state.lastName} company={state.company} onChange={c => setState(s => ({ ...s, company: c }))} onIdentityChange={i => setState(s => ({ ...s, ...i }))} onContinue={() => goTo('mission')} />}
            {step === 'mission' && <ScreenMission lang={lang} company={state.company} mission={state.mission} onDefine={m => setState(s => ({ ...s, mission: m, missionDefined: true }))} onContinue={() => goTo('collaborateur')} />}
            {step === 'collaborateur' && <ScreenCollaborateur lang={lang} mission={state.mission} profile={state.profile} name={state.collaboratorName} onName={n => setState(s => ({ ...s, collaboratorName: n }))} onCreated={n => setState(s => ({ ...s, collaboratorName: n }))} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  )
}