import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const source = readFileSync(new URL('../components/collaborateurs-ia/collaborateur-experience.tsx', import.meta.url), 'utf8')

describe('CollaborateurExperience', () => {
  it('defines an AI Collaborator as a durable professional identity', () => {
    for (const claim of ['Une identité professionnelle.', 'Équipée pour travailler.', 'Une identité durable', 'Une place dans l’entreprise', 'Un périmètre gouverné']) expect(source).toContain(claim)
  })

  it('explains default and additional job profiles with public examples', () => {
    expect(source).toContain('Chaque Collaborateur IA possède un profil métier par défaut')
    expect(source).toContain('Une même identité peut cumuler plusieurs profils')
    for (const example of ['Hugo', 'Emma', 'Léa', 'Arthur']) expect(source).toContain(example)
    expect(source).toContain('role="tablist"')
    expect(source).toContain('role="tab"')
  })

  it('shows a concrete mission and explicit human control', () => {
    for (const proof of ['Une mission entre. Un résultat vérifiable sort.', 'Mission en cours', 'Décision humaine requise', 'Autoriser l’action avant exécution ?']) expect(source).toContain(proof)
  })

  it('makes all six equipment layers directly accessible', () => {
    for (const href of ['/marketplace#metiers', '/marketplace#competences', '/marketplace#applications', '/marketplace#modeles-ia', '/marketplace#serveurs-ia', '/workspace']) expect(source).toContain(`href:'${href}'`)
  })

  it('makes communication, applications, models and Hermes explicit', () => {
    for (const claim of ['son propre email, son calendrier, son numéro de téléphone', '3 000+ apps', 'Le bon modèle pour la tâche', 'Propulsé par Hermes']) expect(source).toContain(claim)
  })

  it('states portability, migration and governed memory', () => {
    for (const claim of ['Pas de verrou propriétaire', 'Migration accompagnée', 'consultables, exportables et portables', 'Accès explicites', 'Décisions humaines']) expect(source).toContain(claim)
    expect(source).toContain('/documentation/licence-collaborateur-ia')
  })

  it('keeps one normalized mission-first conversion path', () => {
    expect(source).toContain('/missions?composer=1&source=collaborateurs-ia')
    expect(source).toContain('Décrire une première mission')
    expect(source).not.toContain('Créer mon Collaborateur IA')
  })
})
