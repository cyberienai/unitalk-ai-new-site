import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const source = readFileSync(new URL('../components/discover/screen-account.tsx', import.meta.url), 'utf8')
const flow = readFileSync(new URL('../components/discover/discover-flow.tsx', import.meta.url), 'utf8')

describe('mission signup', () => {
  it('describes the real post-login sequence', () => {
    expect(source).toContain("contextualLead: 'Connectez-vous pour l’adapter à votre entreprise avec Alma.'")
    expect(source).toContain("missionAlmaBody: 'Après votre connexion, je vous aide à adapter cette mission à votre entreprise, puis à préparer le Collaborateur IA qui l’accomplira.'")
  })

  it('places the mission change link before the Alma block', () => {
    const change = source.indexOf('← {t.change}')
    const alma = source.indexOf('<div className="flex items-center gap-3"><img src="/alma-avatar.png"', change)
    expect(change).toBeGreaterThan(0)
    expect(change).toBeLessThan(alma)
  })

  it('publishes transparent trial and legal wording', () => {
    expect(source).toContain("trialLimit: `Limite de l’essai :")
    expect(source).toContain('href="/conditions"')
    expect(source).toContain('href="/confidentialite"')
  })

  it('keeps the email CTA disabled until the email is valid', () => {
    expect(source).toContain('disabled={!!pending || !emailValid}')
    expect(source).toContain("emailValid && !pending ? 'bg-[#D10E63]")
    expect(source).toContain("cursor-not-allowed bg-[#DED6C8]")
    expect(source).toContain('bg-[#D10E63]')
    expect(source).toContain('emailError: \'Saisissez une adresse email valide.\'')
  })

  it('keeps domain prefill in the unified discovery flow', () => {
    expect(flow).toContain("normalizeDomain(searchParams.get('domain'))")
    expect(flow).toContain('const domain = requestedDomain || sessionDomain')
  })
})
