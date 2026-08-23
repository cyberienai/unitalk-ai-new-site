import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { DOCUMENTATION, DOCUMENTATION_SLUGS } from '@/lib/unitalk-documentation'

const pricing = readFileSync(new URL('../components/pricing/pricing-sections.tsx', import.meta.url), 'utf8')

describe('Unitalk license documentation', () => {
  it('publishes five distinct documentation pages', () => {
    expect(DOCUMENTATION_SLUGS).toHaveLength(5)
    for (const slug of DOCUMENTATION_SLUGS) expect(DOCUMENTATION[slug].sections.length).toBeGreaterThan(0)
  })

  it('documents organization resources and collaborator assignments', () => {
    const organization = DOCUMENTATION['alma-organisation']
    for (const item of ['Compétences','Serveurs et outils MCP','Modèles autorisés','Fournisseurs de modèles','Serveurs IA enregistrés']) expect(JSON.stringify(organization)).toContain(item)
    expect(JSON.stringify(DOCUMENTATION['licence-collaborateur-ia'])).toContain('Outils de communication')
  })

  it('links documentation from pricing', () => {
    expect(pricing).toContain('/documentation/alma-organisation')
  })
})
