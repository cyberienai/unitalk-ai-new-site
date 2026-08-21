import { existsSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { STORE_ITEMS } from '@/lib/store-catalog'

const page = readFileSync(new URL('../app/collaborateurs-ia/competences/page.tsx', import.meta.url), 'utf8')
const content = readFileSync(new URL('../components/collaborateurs-ia/competences-content.tsx', import.meta.url), 'utf8')
const detailRoute = new URL('../app/collaborateurs-ia/competences/[slug]/page.tsx', import.meta.url)

describe('competences catalog', () => {
  it('keeps every published skill accessible through pagination', () => {
    const skills = STORE_ITEMS.filter(item => item.type === 'competence')
    expect(skills.length).toBeGreaterThanOrEqual(105)
    expect(Math.ceil(skills.length / 12)).toBeGreaterThanOrEqual(9)
    expect(content).toContain('const PAGE_SIZE = 12')
    expect(content).toContain("searchParams.get('page')")
  })

  it('uses a dedicated skill scope without a type filter or sidebar', () => {
    expect(content).not.toContain('StoreContent')
    expect(content).not.toContain('Tout le catalogue')
    expect(content).not.toContain('Tous les compétences')
    expect(content).not.toContain('Parlez à Alma')
    expect(page).toContain('MarketplaceCategoryExplainer')
    expect(page).toContain('categoryId="competences"')
  })

  it('provides URL search, category, creator and sort controls', () => {
    expect(content).toContain("searchParams.get('q')")
    expect(content).toContain("searchParams.get('categorie')")
    expect(content).toContain("searchParams.get('createur')")
    expect(content).toContain("searchParams.get('tri')")
  })

  it('conditions application access claims and uses the requested creation route', () => {
    expect(content).toContain('application de téléphonie autorisée')
    expect(content).toContain('prépare sa mise à jour dans l’application autorisée')
    expect(content).toContain('Prépare et documente une relance selon le contexte et les droits accordés')
    expect(content).toContain('/inscription?source=competence-store&intention=nouvelle-competence')
  })

  it('adds a skill directly without publishing detail pages', () => {
    expect(content).toContain('Ajouter à un Collaborateur IA')
    expect(content).toContain('href={`/decouvrir?store=${item.slug}`}')
    expect(existsSync(detailRoute)).toBe(false)
  })

  it('publishes the 14 shared and 60 profile-specific Mustad skills in French', () => {
    const importedSkills = STORE_ITEMS.filter(item => item.type === 'competence' && ['brand-voice', 'ad-daily-workflow'].includes(item.slug))
    expect(STORE_ITEMS.some(item => item.slug.startsWith('mustad-'))).toBe(false)
    for (const skill of STORE_ITEMS.filter(item => item.type === 'competence')) {
      expect(skill.name.fr).toBeTruthy()
      expect(skill.description.fr).toBeTruthy()
      expect(skill.facet).toBeTruthy()
    }
    expect(importedSkills.find(item => item.slug === 'brand-voice')?.name.fr).toBe('Appliquer la voix de marque')
    expect(importedSkills.find(item => item.slug === 'ad-daily-workflow')?.name.fr).toBe('Organiser le suivi publicitaire quotidien')
    const profileSlugs = new Set(STORE_ITEMS.filter(item => item.type === 'profil').map(item => item.slug))
    for (const skill of STORE_ITEMS.filter(item => item.type === 'competence')) {
      for (const profile of skill.relatedProfiles ?? []) expect(profileSlugs.has(profile)).toBe(true)
    }
    for (const obsolete of ['decouverte-profil-client-ideal', 'enrichissement-donnees', 'production-contenu', 'redaction-messages-prospection', 'tri-routage-reponses', 'preparation-reunions-synthese-appels', 'copilote-equipes-terrain', 'reporting-synthese-hebdomadaire', 'previsions-propositions-commerciales', 'test-creations-publicitaires', 'cycle-vie-fidelisation']) {
      expect(STORE_ITEMS.some(item => item.type === 'competence' && item.relatedProfiles?.includes(obsolete))).toBe(false)
    }
  })

  it('keeps profile and skill relationships complete in both directions', () => {
    const profiles = STORE_ITEMS.filter(item => item.type === 'profil')
    const skills = STORE_ITEMS.filter(item => item.type === 'competence')
    const profileMap = new Map(profiles.map(item => [item.slug, item]))
    const skillMap = new Map(skills.map(item => [item.slug, item]))
    for (const profile of profiles) {
      expect(profile.relatedSkills?.length).toBeGreaterThan(0)
      for (const skill of profile.relatedSkills ?? []) expect(skillMap.get(skill)?.relatedProfiles).toContain(profile.slug)
    }
    for (const skill of skills) {
      for (const profile of skill.relatedProfiles ?? []) expect(profileMap.get(profile)?.relatedSkills).toContain(skill.slug)
    }
  })
})
