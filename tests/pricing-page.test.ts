import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const configurator = readFileSync(new URL('../components/pricing/pricing-configurator.tsx', import.meta.url), 'utf8')
const action = readFileSync(new URL('../app/actions/pricing.ts', import.meta.url), 'utf8')
const page = readFileSync(new URL('../app/tarifs/page.tsx', import.meta.url), 'utf8')

describe('pricing page publication requirements', () => {
  it('uses accessible pricing controls and a live total', () => {
    expect(configurator).toContain('role="radiogroup"')
    expect(configurator).toContain('type="radio"')
    expect(configurator).toContain('aria-label={removeLabel}')
    expect(configurator).toContain('aria-label={addLabel}')
    expect(configurator).toContain('aria-live="polite"')
  })

  it('persists a server-side draft and redirects to registration', () => {
    expect(action).toContain('httpOnly: true')
    expect(action).toContain("source: 'tarifs'")
    expect(action).toContain('/inscription?source=tarifs&pricingDraft=')
  })

  it('publishes composable pricing metadata and an OG image', () => {
    expect(page).toContain('Tarifs Unitalk : Organisation, Collaborateurs IA et capacité')
    expect(page).toContain("images: [{ url: '/opengraph-image'")
    expect(page).not.toContain("'@type':'Offer'")
  })
})
