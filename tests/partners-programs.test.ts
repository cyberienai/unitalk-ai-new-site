import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const partners = readFileSync(new URL('../components/partners-content.tsx', import.meta.url), 'utf8')

describe('partner programs', () => {
  it('covers deployment, platform, infrastructure and affiliation', () => {
    expect(partners).toContain('/partenaires/deployer')
    expect(partners).toContain("href: '/platform'")
    expect(partners).toContain('Vous fournissez une application, une API, un modèle ou une infrastructure.')
    expect(partners).toContain('Rejoindre le programme d’affiliation')
    expect(partners).toContain('30 % des abonnements encaissés pendant leur première année')
  })
})
