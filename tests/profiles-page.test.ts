import { existsSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { STORE_ITEMS } from '@/lib/store-catalog'

const content = readFileSync(new URL('../components/collaborateurs-ia/profils/profiles-catalog-content.tsx', import.meta.url), 'utf8')
const detailRoute = new URL('../app/collaborateurs-ia/profils-metier/[slug]/page.tsx', import.meta.url)

describe('profiles catalog', () => {
  it('publishes all profiles through twelve-item pagination', () => {
    const profiles = STORE_ITEMS.filter(item => item.type === 'profil')
    expect(profiles).toHaveLength(29)
    expect(Math.ceil(profiles.length / 12)).toBe(3)
    expect(content).toContain('const PAGE_SIZE = 12')
    expect(content).toContain("params.get('page')")
  })

  it('distinguishes identity, profile, skill and mission', () => {
    expect(content).toContain("['Identité IA', 'Lucas reste rattaché à votre entreprise']")
    expect(content).toContain("['Profil métier', 'Relation client devient une responsabilité durable']")
    expect(content).toContain("['Compétences', 'Qualifier, répondre et escalader selon vos méthodes']")
    expect(content).toContain("['Mission', 'Traiter les demandes reçues cette semaine']")
  })

  it('uses URL-backed search, domain, creator, sort and page state', () => {
    for (const key of ['q', 'domaine', 'createur', 'tri', 'page']) expect(content).toContain(`params.get('${key}')`)
  })

  it('labels free-text capabilities as know-how and adds profiles directly', () => {
    expect(content).toContain("knowHowLabel: 'Savoir-faire'")
    expect(content).not.toContain('>Compétences<')
    expect(content).toContain('Ajouter à un Collaborateur IA')
    expect(content).toContain('href={`/decouvrir?store=${profile.slug}`}')
  })

  it('keeps the Hermes positioning without publishing detail pages', () => {
    expect(content).toContain('AI Collaborator profile for Hermes')
    expect(existsSync(detailRoute)).toBe(false)
  })
})
