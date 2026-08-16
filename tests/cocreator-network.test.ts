import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const root = join(import.meta.dirname, '..')
const content = readFileSync(join(root, 'components', 'cocreator-network-content.tsx'), 'utf8')

describe('Co-creator approved network', () => {
  it('publishes a dedicated pilot network route', () => {
    expect(existsSync(join(root, 'app', 'reseau-co-createurs', 'page.tsx'))).toBe(true)
    expect(content).toContain('Programme pilote · Indépendants · France')
    expect(content).toContain('Ne prenez pas<br/>une franchise.')
  })

  it('uses a progressive proof-based model', () => {
    for (const level of ['Co-créateur formé','Co-créateur agréé','Partenaire de déploiement','Partenaire territorial']) expect(content).toContain(level)
    expect(content).toContain('Aucun raccourci.')
    expect(content).toContain('Phase future après validation du pilote')
  })

  it('states honest economics and no guarantees', () => {
    expect(content).toContain('Aucun revenu garanti')
    expect(content).toContain('Pas d’exclusivité territoriale')
    expect(content).toContain('100 %')
    expect(content).toContain('50 €')
    expect(content).toContain('Les commissions ne sont pas garanties')
  })

  it('connects formation, creation and deployment', () => {
    expect(content).toContain('/academy/formations/co-createur-ia')
    expect(content).toContain('Formation Co-créateur')
    expect(content).toContain('Espace Partner selon le niveau')
  })
})
