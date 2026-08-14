import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const profiles = readFileSync(new URL('../components/home/section-profiles-early.tsx', import.meta.url), 'utf8')
const pricingPage = readFileSync(new URL('../app/tarifs/page.tsx', import.meta.url), 'utf8')
const configurator = readFileSync(new URL('../components/pricing/pricing-configurator.tsx', import.meta.url), 'utf8')

describe('home profile carousel', () => {
  it('rotates six generic identities with accessible controls', () => {
    for (const name of ['Emma', 'Chloé', 'Lucas', 'Nadia', 'Marcus', 'Hugo']) expect(profiles).toContain(`name: '${name}'`)
    expect(profiles).toContain('useReducedMotion()')
    expect(profiles).toContain('onMouseEnter={() => setPaused(true)}')
    expect(profiles).toContain('onFocusCapture={() => setPaused(true)}')
    expect(profiles).toContain('role="tablist"')
    expect(profiles).toContain('md:hidden')
    expect(profiles).toContain('grid-cols-3')
  })

  it('sends the selected profile and capacity to pricing', () => {
    expect(profiles).toContain('/tarifs?profil=${profile.slug}&capacite=${profile.capacity}#configurateur')
    expect(pricingPage).toContain("query.capacite as AiCapacityId")
    expect(pricingPage).toContain('selectedProfile={selectedProfile}')
    expect(configurator).toContain('t.selectedProfile')
  })
})
