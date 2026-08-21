import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const hub = readFileSync(new URL('../components/unitalk-store-hub.tsx', import.meta.url), 'utf8')
const page = readFileSync(new URL('../app/marketplace/page.tsx', import.meta.url), 'utf8')

describe('Marketplace IA hub', () => {
  it('centralizes AI Collaborators and the five equipment categories', () => {
    expect(page).toContain('UnitalkStoreHub')
    for (const label of ['Collaborateurs IA','Profils métier','Compétences','Applications','Modèles IA','Serveurs IA']) expect(hub).toContain(label)
    expect(hub).toContain('STORE_CATEGORIES')
    expect(hub).toContain("heroTitle: { fr: 'Choisissez le Collaborateur IA qui rejoindra votre équipe.'")
  })

  it('shows canonical public AI Collaborators first', () => {
    expect(hub.indexOf("id: 'collaborateurs-ia'")).toBeLessThan(hub.indexOf("id: 'profils-metier'"))
    expect(hub).toContain('MARKETPLACE_COLLABORATOR_SLUGS')
    expect(hub).toContain('ROLE_DETAILS[slug]')
    expect(hub).toContain('collaboratorHref(detail.slug)')
    expect(hub).toContain('detail.avatar')
    expect(hub).toContain("explain: { fr: 'Comment fonctionne un Collaborateur IA ?'")
  })

  it('states the catalog and knowledge-work positioning', () => {
    expect(hub).toContain('Choisissez le Collaborateur IA qui rejoindra votre équipe.')
    expect(hub).toContain('Un profil métier de référence pour chaque métier de la connaissance')
  })

  it('starts directly with the catalog', () => {
    expect(hub).not.toContain('AlmaMissionComposer')
    expect(hub).not.toContain('getSpeechRecognition')
    expect(hub).toContain('px-5 pt-28 sm:px-8 sm:pt-40')
    expect(hub).not.toContain("'pb-9 pt-20 sm:pb-11 sm:pt-24")
    expect(hub).not.toContain('Marketplace · Collaborateurs IA')
    expect(hub).not.toContain('border-t border-[#CFC3B2]')
  })

  it('uses one horizontal category navigation', () => {
    expect(hub).not.toContain("w-[220px] shrink-0")
    expect(hub).not.toContain('sticky top-24')
    expect(hub).toContain('onClick={() => selectCategory(category.id)}')
    expect(hub).toContain("role={collaboratorsOnly ? undefined : 'tablist'}")
    expect(hub).toContain('overflow-x-auto scrollbar-hide')
    expect(hub).toContain("window.history.replaceState(null, '', href)")
    expect(hub).not.toContain("window.history.pushState(null, '', href)")
  })

  it('centralizes real catalogs with search and featured cards', () => {
    expect(hub).toContain('STORE_ITEMS')
    expect(hub).toContain('itemsForCategory')
    expect(hub).toContain('MarketplaceItemCard')
    expect(hub).toContain('Rechercher un profil métier')
    expect(hub).toContain('category={activeCategory}')
    expect(hub).toContain("window.location.hash.slice(1)")
    expect(hub).toContain("window.addEventListener('popstate'")
    expect(hub).toContain('useLayoutEffect')
    expect(hub).toContain("scrollIntoView({ behavior:")
  })

  it('makes skills concrete and filterable', () => {
    for (const text of ["skillCategories: 'Catégories de compétences'", 'Contexte d’application', 'Résultat produit', 'Profils compatibles', 'Méthode à valider sur votre cas']) expect(hub).toContain(text)
    expect(hub).toContain('Ajoutez gratuitement les compétences nécessaires à chaque mission.')
    expect(hub).toContain('Chaque compétence décrit une méthode, un contexte d’application et un résultat attendu.')
    expect(hub).toContain("storeType === 'competence' ? { fr: 'Gratuite', en: 'Free' }")
    expect(hub).toContain("skillHeroProofs: ['Compétences gratuites', 'Méthodes documentées', 'Réutilisables par mission']")
  })

  it('uses the shared featured hero for profiles, skills, applications and models', () => {
    expect(hub).toContain("['profils-metier', 'competences', 'applications', 'modeles-ia', 'serveurs-ia'].includes(activeCategory.id)")
    expect(hub).toContain("applicationHeroProofs: ['Accès gouvernés', 'Actions configurables', 'Connexions selon vos droits']")
    expect(hub).toContain("modelHeroProofs: ['Sélection automatique', 'Fournisseurs contrôlés', 'Modèles interchangeables']")
    expect(hub).toContain("serverHeroProofs: ['Infrastructure privée', 'Capacité évolutive', 'Déploiement gouverné']")
    expect(hub).toContain('featuredHeroProofs.map((proof)')
    expect(hub).toContain('<MarketplaceSidebarCatalog')
    expect(hub).toContain("category.id === 'competences' ? SKILL_CATEGORY_LABELS : category.id === 'applications' ? APP_CATEGORY_LABELS")
    expect(hub).toContain("skillCategories: 'Catégories de compétences', applicationCategories: 'Catégories d’applications', modelCategories: 'Modalités des modèles', serverCategories: 'Types d’infrastructure'")
    expect(hub).toContain("MODEL_MODALITY_ORDER = ['texte', 'raisonnement', 'multimodal', 'image', 'audio', 'video', 'open-source']")
  })

  it('orders job profiles by broad SMB demand', () => {
    expect(hub).toContain('PROFILE_DEMAND_ORDER')
    const demandOrder = hub.slice(hub.indexOf('const PROFILE_DEMAND_ORDER = ['), hub.indexOf('const PROFILE_DEMAND_RANK'))
    const commercial = demandOrder.indexOf("'commercial'")
    const administrative = demandOrder.indexOf("'gestionnaire-administratif'")
    const executive = demandOrder.indexOf("'assistante-de-direction'")
    const transformation = demandOrder.indexOf("'conseiller-transformation-ia'")
    expect(commercial).toBeGreaterThan(-1)
    expect(commercial).toBeLessThan(administrative)
    expect(administrative).toBeLessThan(executive)
    expect(executive).toBeLessThan(transformation)
    expect(hub).toContain("PROFILE_DEMAND_RANK.get(a.slug)")
  })

  it('keeps each category explanation on its reference route', () => {
    for (const href of ['/collaborateurs-ia/profils-metier','/collaborateurs-ia/competences','/collaborateurs-ia/applications','/modeles-ia','/collaborateurs-ia/serveurs']) expect(hub).toContain(`href: '${href}'`)
  })

  it('frames models as access and servers as scalable execution infrastructure', () => {
    expect(hub).toContain('Les modèles IA auxquels vos Collaborateurs ont accès.')
    expect(hub).toContain('Unitalk sélectionne automatiquement le modèle le plus pertinent pour chaque mission.')
    expect(hub).toContain('Où votre Collaborateur travaille. Une infrastructure qui évolue.')
    expect(hub).toContain('Augmentez ses ressources lorsque le travail l’exige.')
  })

  it('uses fully clickable profile and skill cards with a progressive add action', () => {
    expect(hub).toContain('aria-label={`${labels.addProfile} : ${item.title}`}')
    expect(hub).toContain('group-hover:bg-[var(--profile-accent)]')
    expect(hub).toContain('group-focus-visible:bg-[var(--profile-accent)]')
    expect(hub).toContain('aria-label={`${labels.addProfile} : ${item.title}`}')
  })

  it('uses the same structured cards for skills, applications, models and servers', () => {
    expect(hub).toContain("['competences', 'applications', 'modeles-ia', 'serveurs-ia'].includes(category.id)")
    expect(hub).toContain('Choisissez une compétence prête à ajouter.')
    expect(hub).toContain('Connectez uniquement les applications utiles.')
    expect(hub).toContain('Le bon modèle est sélectionné pour chaque travail.')
    expect(hub).toContain('Dimensionnez un environnement adapté au travail.')
    expect(hub).toContain("category.id === 'applications' ? (lang === 'fr' ? 'Usage principal'")
    expect(hub).toContain("category.id === 'modeles-ia' ? (lang === 'fr' ? 'Sélection'")
    expect(hub).toContain("lang === 'fr' ? 'Contexte conseillé' : 'Recommended context'")
    expect(hub).toContain("lang === 'fr' ? 'Gratuite' : 'Free'")
  })
})
