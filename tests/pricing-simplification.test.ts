import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const page = readFileSync(new URL('../app/tarifs/page.tsx', import.meta.url), 'utf8')
const configurator = readFileSync(new URL('../components/pricing/pricing-configurator.tsx', import.meta.url), 'utf8')
const sections = readFileSync(new URL('../components/pricing/pricing-sections.tsx', import.meta.url), 'utf8')

describe('pricing simplification', () => {
  it('uses Agent Hermes wording throughout the pricing journey', () => {
    expect(configurator).toContain("collabTitle: 'Agents Hermes'")
    expect(configurator).toContain("lineCollab: 'Agents Hermes'")
    expect(sections).toContain('Agent Hermes inclus')
    expect(configurator).not.toContain('profil Hermes')
  })

  it('keeps one configurator and removes the long explanation component', () => {
    expect(page).toContain('<PricingHero />')
    expect(page).toContain('<PricingCollaboration />')
    expect(page).not.toContain('<PricingExplanations />')
  })

  it('uses plain-language pricing hierarchy', () => {
    expect(sections).toContain('Une Organisation. Des Agents Hermes. Une capacité par agent.')
    expect(configurator).toContain("lineOrg: 'Alma Organisation'")
    expect(configurator).toContain("lineOrgDetail: 'Workspace & Desktop inclus'")
    expect(configurator).toContain("cardAfterTrial: 'Total mensuel'")
  })
})
