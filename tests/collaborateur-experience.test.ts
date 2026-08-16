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
    expect(source).toContain('Code désigne un format de production et un savoir-faire')
    expect(source).toContain('Le Terminal est un moyen d’exécution')
    expect(source).toContain('Tout commence par une mission.')
    expect(source).toContain('href="/missions"')
  })

  it('describes a complete AI identity and autonomous Hermes workspace', () => {
    for (const capability of ['Une vraie identité IA', 'Espace autonome open source', 'Communication', 'Fichiers et médias', 'Profils et compétences', 'Modèles et applications', 'Mémoire et historique', 'Ressources matérielles']) expect(source).toContain(capability)
    expect(source).toContain('l’historique des conversations')
    expect(source).toContain('les journaux de son code')
    expect(source).toContain('CPU, RAM ou GPU affectées selon l’offre et l’hébergement')
  })

  it('makes Hermes migration and ownership explicit', () => {
    expect(source).toContain('Migration en un clic. Votre intelligence vous appartient.')
    expect(source).toContain('Migrer en un clic')
    expect(source).toContain('Compatible avec Hermes')
    expect(source).toContain('Sans verrouillage fournisseur')
    expect(source).toContain('intention=migration-hermes')
  })
})
