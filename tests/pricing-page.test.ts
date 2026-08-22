import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const page = readFileSync(new URL('../app/tarifs/page.tsx', import.meta.url), 'utf8')
const sections = readFileSync(new URL('../components/pricing/pricing-sections.tsx', import.meta.url), 'utf8')

describe('pricing page publication requirements', () => {
  it('publishes composable pricing metadata and an OG image', () => {
    expect(page).toContain('Tarifs Collaborateur IA et entreprise IA | Unitalk')
    expect(page).toContain("images: [{ url: '/opengraph-image'")
    expect(page).not.toContain("'@type':'Offer'")
  })

  it('makes the free first mission and paid activation explicit', () => {
    expect(sections).toContain("primary: 'Commencer gratuitement'")
    expect(sections).toContain('Aucun paiement automatique')
  })
})
