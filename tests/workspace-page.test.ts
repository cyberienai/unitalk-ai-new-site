import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const source = readFileSync(new URL('../components/workspace/workspace-final-content.tsx', import.meta.url), 'utf8')

describe('Workspace landing', () => {
  it('uses the shared visual grammar and one clear hero', () => {
    expect(source).toContain('hero-heading')
    expect(source).toContain('editorial-shell')
    expect(source).toContain('CtaButton')
    expect(source).toContain('rounded-[18px]')
  })

  it('uses stable governance vocabulary', () => {
    for (const term of ['Droit', 'Validation', 'Décision', 'Exécution', 'Trace']) expect(source).toContain(term)
    expect(source).toContain('Une application n’accorde aucun droit à elle seule.')
  })

  it('does not publish unverified vendors or ambiguous free claims', () => {
    for (const claim of ['Clerk', 'Honcho', 'Pipedream', 'Stalwart', 'Telnyx', 'Utilisateurs humains gratuits', 'Chat gratuit', 'Desktop gratuit', '3 000']) expect(source).not.toContain(claim)
  })

  it('marks the product scene as an illustrative fictional demonstration', () => {
    expect(source).toContain('Démonstration fictive')
    expect(source).toContain('Démonstration illustrative')
  })
})
