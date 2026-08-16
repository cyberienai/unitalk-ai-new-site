import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const partners = readFileSync(new URL('../components/partners-content.tsx', import.meta.url), 'utf8')

describe('partner programs', () => {
  it('connects a real mission to creation, affiliation and deployment', () => {
    expect(partners).toContain('Transformez une mission réelle en activité durable.')
    expect(partners).toContain('/academy/parcours-gratuits/premiere-mission-ia')
    expect(partners).toContain('/reseau-co-createurs')
    expect(partners).toContain('/partenaires/deployer')
    expect(partners).toContain("href: '/platform'")
    expect(partners).toContain('Construire ou connecter une technologie')
  })

  it('distinguishes affiliate and deployment responsibilities', () => {
    expect(partners).toContain('Rejoindre le programme d’affiliation')
    expect(partners).toContain('Affilié · 30 %')
    expect(partners).toContain('Partenaire · 50 %')
    expect(partners).toContain('ne se cumulent pas sur une même vente')
  })
})
