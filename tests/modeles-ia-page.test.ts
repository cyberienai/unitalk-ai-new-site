import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const page = readFileSync(new URL('../components/modeles-ia-content.tsx', import.meta.url), 'utf8')
const route = readFileSync(new URL('../app/capacite-ia/page.tsx', import.meta.url), 'utf8')

describe('AI models page', () => {
  it('publishes the capacity page on its explicit canonical route', () => {
    expect(route).toContain("canonical: '/capacite-ia'")
    expect(route).toContain('CapaciteIaPage')
  })
  it('shows every AI capacity attached to an AI Collaborator', () => {
    for (const capacity of ['BYOK', 'Quart-temps', 'Mi-temps', 'Temps plein']) expect(page).toContain(capacity)
    for (const price of ["price: '25 €'", "price: '50 €'", "price: '100 €'"]) expect(page).toContain(price)
    expect(page).toContain("perMonth: '/ mois / Collaborateur IA'")
  })

  it('offers prepaid credits from 25 euros', () => {
    expect(page).toContain("title: 'Crédits prépayés'")
    expect(page).toContain("price: 'Dès 25 €'")
    expect(page).toContain('Sans engagement')
  })

  it('uses AI Collaborator wording and gives Alma a face', () => {
    expect(page).not.toMatch(/\bagent(s)?\b/i)
    expect(page).toContain('withAlmaAvatar(t.finalBody)')
  })

  it('keeps catalog and routing outside the capacity page', () => {
    expect(page).toContain("models: 'Explorer les modèles disponibles'")
    expect(page).toContain("gateway: 'Comprendre le routage AI Gateway'")
    expect(page).toContain('href="/marketplace/modeles-ia"')
    expect(page).toContain('href="/ai-gateway"')
    expect(page).not.toContain('MODEL_FAMILIES')
    expect(page).not.toContain('Routage intelligent')
  })
})
