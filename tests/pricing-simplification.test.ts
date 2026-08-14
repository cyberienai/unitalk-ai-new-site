import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const page = readFileSync(new URL('../app/tarifs/page.tsx', import.meta.url), 'utf8')
const configurator = readFileSync(new URL('../components/pricing/pricing-configurator.tsx', import.meta.url), 'utf8')
const sections = readFileSync(new URL('../components/pricing/pricing-sections.tsx', import.meta.url), 'utf8')

describe('pricing simplification', () => {
  it('keeps Agent Hermes understandable inside the Collaborator price', () => {
    expect(configurator).toContain("collabDesc: 'Chaque Collaborateur reçoit une identité et son propre Agent Hermes.'")
    expect(configurator).toContain("lineCollab: 'Collaborateurs IA'")
    expect(sections).toContain("name: 'Agent Hermes'")
    expect(configurator).not.toContain('profil Hermes')
  })

  it('keeps one configurator and removes the long explanation component', () => {
    expect(page).toContain('<PricingHero />')
    expect(page).toContain('<PricingCollaboration />')
    expect(page).not.toContain('<PricingExplanations />')
  })

  it('uses plain-language pricing hierarchy', () => {
    expect(sections).toContain('Le logiciel se paie par siège. Le travail, par capacité.')
    expect(sections).toContain('Le prix tient en trois lignes.')
    expect(configurator).toContain("lineOrg: 'Alma Organisation'")
    expect(configurator).toContain("lineOrgDetail: 'Workspace & Desktop inclus'")
    expect(configurator).toContain("cardAfterTrial: 'Total mensuel'")
  })
})
