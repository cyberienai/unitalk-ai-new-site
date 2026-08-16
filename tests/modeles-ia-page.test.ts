import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const page = readFileSync(new URL('../components/modeles-ia-content.tsx', import.meta.url), 'utf8')

describe('AI models page', () => {
  it('shows every AI capacity attached to an AI Collaborator', () => {
    for (const capacity of ['BYOK', 'Quart-temps', 'Mi-temps', 'Temps plein']) expect(page).toContain(capacity)
    for (const price of ["price: '25 €'", "price: '50 €'", "price: '100 €'"]) expect(page).toContain(price)
    expect(page).toContain("perMonth: '/ mois / Collaborateur IA'")
  })

  it('offers prepaid credits from 25 euros', () => {
    expect(page).toContain("prepaidTitle: 'Crédits prépayés'")
    expect(page).toContain("prepaidPrice: 'Dès 25 €'")
    expect(page).toContain('Sans engagement')
  })

  it('uses AI Collaborator wording and gives Alma a face', () => {
    expect(page).not.toMatch(/\bagent(s)?\b/i)
    expect(page).toContain('withAlmaAvatar(t.finalB)')
    expect(page).toContain('withAlmaAvatar(t.finalBody)')
  })
})
