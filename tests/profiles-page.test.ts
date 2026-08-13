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
    expect(content).toContain("['Collaborateur IA','L’identité qui reste dans l’entreprise']")
    expect(content).toContain("['Profil métier','La responsabilité durable qu’il exerce']")
    expect(content).toContain("['Compétence','La méthode précise qu’il peut appliquer']")
    expect(content).toContain("['Mission','Le travail à accomplir avec un résultat attendu']")
  })

  it('uses URL-backed search, domain, creator, sort and page state', () => {
    for (const key of ['q', 'domaine', 'createur', 'tri', 'page']) expect(content).toContain(`params.get('${key}')`)
  })

  it('labels free-text capabilities as know-how and resolves details by type', () => {
    expect(content).toContain("knowHow:'Savoir-faire'")
    expect(content).not.toContain('>Compétences<')
    expect(detail).toContain('getStoreItem(typeSlug, slug)')
  })
})
