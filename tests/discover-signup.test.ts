import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const source = readFileSync(new URL('../components/discover/screen-account.tsx', import.meta.url), 'utf8')
const flow = readFileSync(new URL('../components/discover/discover-flow.tsx', import.meta.url), 'utf8')

describe('mission signup', () => {
  it('describes the real post-login sequence', () => {
    expect(source).toContain("contextualLead: 'Créez votre compte pour confirmer votre entreprise et choisir le prénom de votre Collaborateur IA.'")
    expect(source).toContain("missionAlmaBody: 'Après votre connexion, vous confirmez votre entreprise puis choisissez le prénom du Collaborateur IA qui prendra cette mission.'")
  })

  it('places the mission change link before the Alma block', () => {
    const change = source.indexOf('← {t.change}')
    const alma = source.indexOf('<div className="flex items-center gap-3"><img src="/alma-avatar.png"', change)
    expect(change).toBeGreaterThan(0)
    expect(change).toBeLessThan(alma)
  })

  it('publishes transparent trial and legal wording', () => {
    expect(source).toContain("contextualReassurance: '7 jours d\\'essai · Aucune carte bancaire'")
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
    expect(flow).toContain('isProfessionalEmail(initialSession.email)')
    expect(flow).toContain('const domain = requestedDomain || sessionDomain')
  })

  it('skips detailed mission editing when a mission is already known', () => {
    expect(flow).toContain("const flowSteps: OnboardingStep[] = selectedMission ? ['entreprise', 'collaborateur'] : STEP_ORDER")
    expect(flow).toContain("onContinue={() => goTo(selectedMission ? 'collaborateur' : 'mission')}")
  })
})
