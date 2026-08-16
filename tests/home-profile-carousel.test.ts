import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const profiles = readFileSync(new URL('../components/home/section-profiles-early.tsx', import.meta.url), 'utf8')
const pricingPage = readFileSync(new URL('../app/tarifs/page.tsx', import.meta.url), 'utf8')
const configurator = readFileSync(new URL('../components/pricing/pricing-configurator.tsx', import.meta.url), 'utf8')

describe('home profile carousel', () => {
  it('shows six identities with accessible manual controls', () => {
    for (const name of ['Emma', 'Chloé', 'Lucas', 'Nadia', 'Marcus', 'Hugo']) expect(profiles).toContain(`name: '${name}'`)
    expect(profiles).toContain('useReducedMotion()')
    expect(profiles).not.toContain('ROTATION_MS')
    expect(profiles).toContain('role="tablist"')
    expect(profiles).toContain('md:hidden')
    expect(profiles).toContain('grid-cols-3')
  })

  it('sends the selected identity to pricing without imposing a capacity', () => {
    expect(profiles).toContain('/tarifs?profil=${profile.slug}#configurateur')
    expect(profiles).not.toContain('capacite=${profile.capacity}')
    expect(pricingPage).toContain('selectedProfile={selectedProfile}')
    expect(configurator).toContain('t.selectedProfile')
  })

  it('uses one collaborator price and sells professions rather than time levels', () => {
    expect(profiles).toContain('unitalkPricing.aiCollaborator.monthlyPrice')
    expect(profiles).toContain('Licence Collaborateur IA')
    expect(profiles).toContain('Capacité IA et éventuelles options calculées dans le configurateur.')
    expect(profiles).toContain('Une identité durable, des profils évolutifs')
    expect(profiles).toContain('Vos clés IA ou une capacité Unitalk')
    expect(profiles).toContain('Configuration rapide')
    expect(profiles).not.toContain('Quart-temps · 74€/mois')
    expect(profiles).not.toContain('Mi-temps · 99€/mois')
    expect(profiles).not.toContain('Temps plein · 149€/mois')
  })
})
