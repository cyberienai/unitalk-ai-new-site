import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const source = readFileSync(new URL('../components/discover/screen-account.tsx', import.meta.url), 'utf8')
const flow = readFileSync(new URL('../components/discover/discover-flow.tsx', import.meta.url), 'utf8')

describe('mission signup', () => {
  it('describes the real post-login sequence', () => {
    expect(source).toContain("missionAlmaTitle: 'Votre mission est conservée.'")
    expect(source).toContain("missionAlmaBody: 'Après votre connexion, vérifiez votre entreprise, complétez le cadrage de la mission puis choisissez le prénom de votre Collaborateur IA.'")
  })

  it('keeps the account step focused without a mission-change exit', () => {
    expect(source).not.toContain('← {t.change}')
    expect(source).toContain('Votre mission est conservée.')
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
    expect(flow).toContain('isProfessionalEmail(initialSession.email)')
    expect(flow).toContain('const domain = requestedDomain || sessionDomain')
  })

  it('skips detailed editing only for a structured catalog mission', () => {
    expect(flow).toContain("const flowSteps: OnboardingStep[] = context.kind === 'mission' ? ['entreprise', 'collaborateur'] : STEP_ORDER")
    expect(flow).toContain("onContinue={() => goTo(context.kind === 'mission' ? 'collaborateur' : 'mission')}")
  })
})
