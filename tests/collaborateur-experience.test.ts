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

  it('uses the radical editorial system and a normalized conversion path', () => {
    expect(source).toContain('text-[clamp(3rem,6vw,6.2rem)]')
    expect(source).toContain('bg-[#181615]')
    expect(source).toContain('bg-[#D10E63]')
    expect(source).toContain('/decouvrir?source=collaborateurs-ia')
    expect(source).toContain('Confiez une mission.')
    expect(source).toContain('Licence dès 49 €/mois')
  })

  it('describes a complete AI identity and autonomous Hermes workspace', () => {
    for (const capability of ['Une vraie identité IA', 'Espace autonome open source', 'Communication', 'Fichiers et médias', 'Profils et compétences', 'Modèles et applications', 'Mémoire et historique', 'Ressources matérielles']) expect(source).toContain(capability)
    expect(source).toContain('l’historique des conversations')
    expect(source).toContain('les journaux de son code')
    expect(source).toContain('CPU, RAM ou GPU affectées selon l’offre et l’hébergement')
    expect(source).toContain('Autonomie · Open source · Souveraineté')
    expect(source).toContain('Votre entreprise garde la maîtrise de ses données, de sa mémoire, de ses modèles et de son infrastructure.')
  })

  it('makes Hermes migration and ownership explicit', () => {
    expect(source).toContain('Vous avez déjà Hermes ? Préparons la migration.')
    expect(source).toContain('Étudier ma migration')
    expect(source).toContain('Compatible avec Hermes')
    expect(source).toContain('Sans verrouillage fournisseur')
    expect(source).toContain('/decouvrir?source=collaborateurs-ia')
  })
})
