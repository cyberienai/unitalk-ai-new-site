import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { STORE_ITEMS } from '@/lib/store-catalog'

const content = readFileSync(new URL('../components/collaborateurs-ia/profils/profiles-catalog-content.tsx', import.meta.url), 'utf8')
const detail = readFileSync(new URL('../components/store/store-item-detail.tsx', import.meta.url), 'utf8')

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

  it('labels free-text capabilities as know-how and resolves details by type', () => {
    expect(content).toContain("knowHowLabel: 'Savoir-faire'")
    expect(content).not.toContain('>Compétences<')
    expect(detail).toContain('getStoreItem(typeSlug, slug)')
  })

  it('identifies profiles as AI Collaborator profiles for Hermes', () => {
    expect(content).toContain('AI Collaborator profile for Hermes')
    expect(detail).toContain('Profil Collaborateur IA pour Hermes')
  })
})
