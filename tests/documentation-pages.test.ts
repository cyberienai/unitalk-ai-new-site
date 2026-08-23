import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { DOCUMENTATION, DOCUMENTATION_SLUGS } from '@/lib/unitalk-documentation'

const pricing = readFileSync(new URL('../components/pricing/pricing-sections.tsx', import.meta.url), 'utf8')

describe('Unitalk license documentation', () => {
  it('publishes the complete documentation structure', () => {
    expect(DOCUMENTATION_SLUGS).toHaveLength(9)
    for (const slug of DOCUMENTATION_SLUGS) expect(DOCUMENTATION[slug].sections.length).toBeGreaterThan(0)
  })

  it('documents organization resources and collaborator assignments', () => {
    const organization = DOCUMENTATION['alma-organisation']
    for (const item of ['Assistants IA privés ou partagés','Mémoire partagée','Applications et modèles autorisés','Affecter un Collaborateur IA']) expect(JSON.stringify(organization)).toContain(item)
    for (const item of ['Outils, terminal, navigateur et MCP','Choix des modèles et fournisseurs']) expect(JSON.stringify(DOCUMENTATION['hermes-unitalk'])).toContain(item)
    expect(JSON.stringify(DOCUMENTATION['licence-collaborateur-ia'])).toContain('60 minutes de téléphone')
    expect(JSON.stringify(DOCUMENTATION['memoire-gouvernee'])).toContain('Honcho')
    expect(JSON.stringify(DOCUMENTATION.communications)).toContain('Stalwart')
    expect(JSON.stringify(DOCUMENTATION.communications)).toContain('Telnyx')
    expect(JSON.stringify(DOCUMENTATION['migration-hermes-openclaw'])).toContain('OpenClaw')
  })

  it('links documentation from pricing', () => {
    expect(pricing).toContain('/documentation/communications')
  })
})
