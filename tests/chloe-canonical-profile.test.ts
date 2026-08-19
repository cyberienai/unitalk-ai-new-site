import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const content = readFileSync(new URL('../components/collaborateur-content.tsx', import.meta.url), 'utf8')

describe('Chloé canonical public profile', () => {
  it('uses one concrete recruiting mission in the hero and final CTA', () => {
    expect(content).toContain('Chloé présélectionne les candidatures pour votre prochain recrutement.')
    expect(content).toContain('Présélectionner mes candidatures')
    expect(content).toContain('Présélectionner mes candidatures avec Chloé')
  })
})
