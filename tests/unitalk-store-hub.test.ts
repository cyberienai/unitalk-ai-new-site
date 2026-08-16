import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const hub = readFileSync(new URL('../components/unitalk-store-hub.tsx', import.meta.url), 'utf8')
const page = readFileSync(new URL('../app/marketplace/page.tsx', import.meta.url), 'utf8')

describe('Marketplace IA hub', () => {
  it('centralizes nine distinct discovery areas', () => {
    expect(page).toContain('UnitalkStoreHub')
    for (const label of ['Profils métier','Compétences','Intégrations','Applications','Serveurs','Modèles IA','Formations','Services','Missions']) expect(hub).toContain(label)
    expect(hub).toContain('ouverte aux créations de Unitalk et de la communauté')
  })

  it('highlights Alma with her profiles and skills', () => {
    expect(hub).toContain('La sélection d’Alma')
    expect(hub).toContain('Profils d’Alma')
    expect(hub).toContain('Compétences d’Alma')
    expect(hub).toContain('/unitalk/@alma/store')
  })

  it('keeps each asset type on one reference route', () => {
    expect(hub).toContain("href:'/collaborateurs-ia/profils-metier'")
    expect(hub).toContain("href:'/collaborateurs-ia/competences'")
    expect(hub).toContain("href:'/collaborateurs-ia/integrations'")
    expect(hub).toContain("href:'/collaborateurs-ia/applications'")
    expect(hub).toContain("href:'/collaborateurs-ia/serveurs'")
    expect(hub).toContain("href:'/modeles-ia'")
    expect(hub).toContain("href:'/academy'")
    expect(hub).toContain("href:'/experts'")
  })
})
