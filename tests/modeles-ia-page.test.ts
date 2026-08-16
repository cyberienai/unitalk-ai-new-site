import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const page = readFileSync(new URL('../components/modeles-ia-content.tsx', import.meta.url), 'utf8')

describe('AI models page', () => {
  it('shows every AI capacity attached to an AI Collaborator', () => {
    for (const capacity of ['BYOK', 'Quart-temps', 'Mi-temps', 'Temps plein']) expect(page).toContain(capacity)
    expect(page).toContain('25 €/mois par Collaborateur IA')
    expect(page).toContain('50 €/mois par Collaborateur IA')
    expect(page).toContain('100 €/mois par Collaborateur IA')
  })

  it('uses AI Collaborator wording and gives Alma a face', () => {
    expect(page).not.toMatch(/\bagent(s)?\b/i)
    expect(page).toContain('withAlmaAvatar(t.ctaTitle2)')
    expect(page).toContain('withAlmaAvatar(t.ctaDesc)')
  })
})
