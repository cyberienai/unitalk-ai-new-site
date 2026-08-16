import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const hub = readFileSync(new URL('../components/unitalk-store-hub.tsx', import.meta.url), 'utf8')
const page = readFileSync(new URL('../app/marketplace/page.tsx', import.meta.url), 'utf8')

describe('Marketplace IA hub', () => {
  it('centralizes nine distinct discovery areas', () => {
    expect(page).toContain('UnitalkStoreHub')
    for (const label of ['Profils métier','Compétences','Intégrations','Applications','Serveurs','Modèles IA','Formations','Services','Missions']) expect(hub).toContain(label)
    expect(hub).toContain('Des créations de la communauté Unitalk, prêtes à consulter et à adapter.')
  })

  it('states autonomy, open source and sovereignty', () => {
    expect(hub).toContain('Collaborateurs IA autonomes')
    expect(hub).toContain('Hermes open source')
    expect(hub).toContain('créations souveraines et interopérables')
  })

  it('highlights Alma with her profiles, skills and Academy training', () => {
    expect(hub).toContain('La sélection d’Alma')
    expect(hub).toContain('Profils d’Alma')
    expect(hub).toContain('Compétences d’Alma')
    expect(hub).toContain('Formations avec Alma')
    expect(hub).toContain('Dans Unitalk Academy, Alma peut aussi construire un parcours adapté à votre objectif.')
    expect(hub).toContain('/unitalk/@alma/store')
    expect(hub).toContain('/academy/alma')
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
