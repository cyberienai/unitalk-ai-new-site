import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const hub = readFileSync(new URL('../components/unitalk-store-hub.tsx', import.meta.url), 'utf8')
const page = readFileSync(new URL('../app/marketplace/page.tsx', import.meta.url), 'utf8')

describe('Marketplace IA hub', () => {
  it('centralizes the five Store departments on one page', () => {
    expect(page).toContain('UnitalkStoreHub')
    for (const label of ['Profils métier','Compétences','Applications','Modèles IA','Serveurs IA']) expect(hub).toContain(label)
    expect(hub).toContain('STORE_CATEGORIES')
    expect(hub).toContain("categoriesKicker: 'Catalogue'")
  })

  it('states the catalog and knowledge-work positioning', () => {
    expect(hub).toContain('Tout l’équipement de votre Collaborateur IA')
    expect(hub).toContain('Un profil métier de référence pour chaque métier de la connaissance')
  })

  it('starts directly with the catalog', () => {
    expect(hub).not.toContain('AlmaMissionComposer')
    expect(hub).not.toContain('getSpeechRecognition')
    expect(hub).toContain('pt-28 sm:px-8 sm:pt-32')
  })

  it('uses a responsive category rail', () => {
    expect(hub).toContain("w-[220px] shrink-0")
    expect(hub).toContain('sticky top-24')
    expect(hub).toContain('onClick={() => selectCategory(category.id)}')
    expect(hub).toContain('Catégories du Store')
    expect(hub).toContain('lg:hidden')
  })

  it('centralizes real catalogs with search and featured cards', () => {
    expect(hub).toContain('STORE_ITEMS')
    expect(hub).toContain('itemsForCategory')
    expect(hub).toContain('MarketplaceItemCard')
    expect(hub).toContain('Rechercher dans cette catégorie')
    expect(hub).toContain('category={activeCategory}')
    expect(hub).toContain("window.location.hash.slice(1)")
  })

  it('keeps each category explanation on its reference route', () => {
    for (const href of ['/collaborateurs-ia/profils-metier','/collaborateurs-ia/competences','/collaborateurs-ia/applications','/modeles-ia','/collaborateurs-ia/serveurs']) expect(hub).toContain(`href: '${href}'`)
  })
})
