import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const source = readFileSync(new URL('../components/collaborateurs-ia/collaborateur-experience.tsx', import.meta.url), 'utf8')

describe('CollaborateurExperience', () => {
  it('uses accessible tabs for the five work formats', () => {
    expect(source).toContain('role="tablist"')
    expect(source).toContain('role="tab"')
    expect(source).toContain('aria-selected={active === key}')
    expect(source).toContain('role="tabpanel"')
    expect(source).toContain("['text', 'image', 'audio', 'video', 'code']")
  })

  it('does not publish obsolete pricing and application claims', () => {
    expect(source).not.toContain('1 million de tokens')
    expect(source).not.toContain('98 €/mois')
    expect(source).not.toContain('3 000 applications')
    expect(source).not.toContain('Créer mon Collaborateur IA')
    expect(source).not.toContain('Donnez-lui un prénom')
  })

  it('distinguishes Code from Terminal and starts with a mission', () => {
    expect(source).toContain('Code est un format de production')
    expect(source).toContain('le Terminal est un moyen d’exécution distinct')
    expect(source).toContain('Une première mission, pas un projet informatique.')
    expect(source).toContain('/missions?composer=1&source=collaborateurs-ia')
  })

  it('uses the radical editorial system and a normalized conversion path', () => {
    expect(source).toContain('text-[clamp(3rem,6.2vw,6.4rem)]')
    expect(source).toContain('bg-[#181615]')
    expect(source).toContain('bg-[#D10E63]')
    expect(source).toContain('/missions?composer=1&source=collaborateurs-ia')
    expect(source).toContain('Son identité IA reste la même.')
    expect(source).toContain('Voir le prix complet')
  })

  it('shows one concrete mission with explicit human control', () => {
    for (const proof of ['3 nouveaux messages identifiés', 'Dossiers clients retrouvés', '3 réponses préparées', 'Validation humaine', '2 réponses prêtes à envoyer']) expect(source).toContain(proof)
    expect(source).toContain('Démonstration fictive')
    expect(source).toContain('Modifier les tarifs')
    expect(source).toContain('Interdit')
  })

  it('keeps technical detail on dedicated pages', () => {
    for (const href of ['/ai-gateway', '/architecture', '/collaborateurs-ia/applications', '/desktop']) expect(source).toContain(href)
    expect(source).toContain('/missions?composer=1&source=collaborateurs-ia')
  })
})
