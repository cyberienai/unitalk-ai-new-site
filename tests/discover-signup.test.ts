import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const source = readFileSync(new URL('../components/discover/screen-account.tsx', import.meta.url), 'utf8')
const flow = readFileSync(new URL('../components/discover/discover-flow.tsx', import.meta.url), 'utf8')
const stateBuilder = readFileSync(new URL('../lib/discover-onboarding-state.ts', import.meta.url), 'utf8')

describe('mission signup', () => {
  it('keeps the selected mission visible without redundant reassurance', () => {
    expect(source).toContain("selected: 'Mission sélectionnée'")
    expect(source).not.toContain('Votre mission est conservée.')
  })

  it('keeps the account step focused without a mission-change exit', () => {
    expect(source).not.toContain('← {t.change}')
    expect(source).not.toContain('Votre mission est conservée.')
  })

  it('publishes transparent trial and legal wording', () => {
    expect(source).toContain("contextualReassurance: 'Première mission offerte · Sans carte bancaire'")
    expect(source).toContain('href="/conditions"')
    expect(source).toContain('href="/confidentialite"')
  })

  it('keeps the email CTA disabled until the email is valid', () => {
    expect(source).toContain('disabled={!!pending || !emailValid}')
    expect(source).toContain("emailValid && !pending ? 'bg-[#D10E63]")
    expect(source).toContain("cursor-not-allowed bg-[#DED6C8]")
    expect(source).toContain('bg-[#D10E63]')
    expect(source).toContain('emailError: \'Saisissez une adresse email professionnelle valide.\'')
    expect(source).toContain('personalEmailError: \'Utilisez votre adresse professionnelle, pas une adresse personnelle.\'')
  })

  it('keeps domain prefill in the unified discovery flow', () => {
    expect(flow).toContain("normalizeDomain(searchParams.get('domain'))")
    expect(flow).toContain('buildInitialOnboardingState')
    expect(stateBuilder).toContain('isProfessionalEmail(initialSession.email)')
    expect(stateBuilder).toContain('requestedDomain || sessionDomain')
  })

  it('keeps onboarding fast and moves detailed scoping to the Workspace', () => {
    expect(flow).toContain("const flowSteps: OnboardingStep[] = ['mission', 'entreprise', 'collaborateur', 'workspace']")
    expect(flow).toContain("lockedSteps={['mission']}")
    expect(flow).toContain("onContinue={() => goTo('collaborateur')}")
    expect(flow).not.toContain('<ScreenMission')
  })

  it('asks for a mission before authentication from the navigation CTA', () => {
    expect(flow).toContain("searchParams.get('next') === 'missions'")
    expect(flow).toContain("<MissionChoice lang={lang}")
    expect(flow).toContain('onStarterSelect={onChoose}')
    expect(flow).toContain('source=nav`')
  })

  it('resets structured fields for a new free-text draft', () => {
    expect(flow).toContain('missionFromDraft(selectedMission.title, lang)')
    expect(flow).toContain('missionDefined: false')
  })
})
