import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const content = readFileSync(new URL('../components/collaborateur-content.tsx', import.meta.url), 'utf8')

describe('Marcus canonical public profile', () => {
  it('uses one concrete legal mission in the hero and final CTA', () => {
    expect(content).toContain('Marcus prépare la revue de votre prochain contrat.')
    expect(content).toContain('Préparer ma revue de contrat')
    expect(content).toContain('Préparer ma revue avec Marcus')
  })
})
