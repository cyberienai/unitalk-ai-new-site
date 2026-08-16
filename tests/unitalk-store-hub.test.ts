import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const hub = readFileSync(new URL('../components/unitalk-store-hub.tsx', import.meta.url), 'utf8')
const page = readFileSync(new URL('../app/marketplace/page.tsx', import.meta.url), 'utf8')

describe('Marketplace IA hub', () => {
  it('centralizes ten distinct discovery areas in three groups', () => {
    expect(page).toContain('UnitalkStoreHub')
    for (const label of ['Collaborateurs IA','Missions','Métiers','Compétences','Connaissances','Mémoire et contexte','Applications','Modèles IA','Formations','Services']) expect(hub).toContain(label)
    for (const group of ['Trouver un Collaborateur','Enrichir ses capacités','Se faire accompagner']) expect(hub).toContain(group)
  })

  it('states autonomy, open source and sovereignty', () => {
    expect(hub).toContain('Marketplace ouverte à Unitalk et à la communauté')
    expect(hub).toContain('Un profil métier de référence pour chaque métier de la connaissance')
  })

  it('highlights Alma with her avatar rather than the Unitalk mark', () => {
    expect(hub).toContain('src="/alma-avatar.png"')
    expect(hub).toContain('Votre guide dans la Marketplace')
    expect(hub).toContain('Alma trouve la bonne combinaison')
  })

  it('keeps each asset type on one reference route', () => {
    for (const href of ['/collaborateurs-ia','/missions','/collaborateurs-ia/profils-metier','/collaborateurs-ia/competences','/architecture#connaissance-entreprise','/architecture#memoire-et-contexte','/collaborateurs-ia/applications','/modeles-ia','/academy','/experts']) expect(hub).toContain(`href: '${href}'`)
    expect(hub).toContain('<UnitalkLogo size={22}')
  })
})
