import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const overview = readFileSync(new URL('../components/marketplace-overview.tsx', import.meta.url), 'utf8')
const page = readFileSync(new URL('../app/marketplace/page.tsx', import.meta.url), 'utf8')
const missions = readFileSync(new URL('../components/missions-content.tsx', import.meta.url), 'utf8')
const english = readFileSync(new URL('../app/en/marketplace/page.tsx', import.meta.url), 'utf8')

describe('Marketplace overview', () => {
  it('presents all seven parts of the system', () => {
    for (const label of ['Missions', 'Collaborateurs IA', 'Profils métier', 'Compétences', 'Applications', 'Modèles IA', 'Serveurs IA']) expect(overview).toContain(label)
    expect(page).toContain("canonical: '/marketplace'")
    expect(page).toContain("en: '/en/marketplace'")
    expect(english).toContain('<MarketplaceOverview lang="en"/>')
  })

  it('starts from work and links missions back to equipment', () => {
    expect(overview).toContain('Commencez par le travail.')
    expect(overview).toContain("href: '/missions'")
    expect(missions).toContain('Choisissez la mission. Alma prépare le Collaborateur.')
    expect(missions).toContain('MARKETPLACE_PATHS')
  })
})
