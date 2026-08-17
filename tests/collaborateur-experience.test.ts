import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const source = readFileSync(new URL('../components/collaborateurs-ia/collaborateur-experience.tsx', import.meta.url), 'utf8')

describe('CollaborateurExperience', () => {
  it('leads with responsibility and a concrete definition', () => {
    expect(source).toContain('Donnez une responsabilité')
    expect(source).toContain('à une intelligence artificielle.')
    expect(source).toContain('une identité professionnelle, ses propres canaux et un profil métier')
  })

  it('introduces Alma as an employee in context', () => {
    for (const claim of ['Alma travaille chez Unitalk', 'Relation client', 'Supervisée par Patrick Chassany', 'Email · Agenda · Téléphone']) expect(source).toContain(claim)
  })

  it('proves work through one mission and one human decision', () => {
    for (const claim of ['Préparer l’arrivée d’un Collaborateur IA commercial', 'Profil, compétences et validations prêts à activer', 'Décision humaine requise', 'AI Gateway et Hermes']) expect(source).toContain(claim)
    expect(source).toContain("useState<'approved' | 'changed' | null>")
  })

  it('shows progression without changing identity', () => {
    for (const claim of ['La mission se termine. L’expérience reste.', 'Nouveau profil · Conseillère en adoption IA', 'Nouvelle compétence · Animer un bilan d’adoption', 'Alma reste Alma']) expect(source).toContain(claim)
  })

  it('makes core infrastructure and portability explicit', () => {
    for (const claim of ['Hermes open source', 'Modèles interchangeables', 'Export et migration', 'Droits explicites', '3 000+']) expect(source).toContain(claim)
    expect(source).toContain('/documentation/licence-collaborateur-ia')
    expect(source).toContain('/ai-gateway')
  })

  it('separates the public sales profile from the private record', () => {
    expect(source).toContain('/unitalk/@alma')
    expect(source).toContain('Son profil public peut vendre. Son dossier interne reste privé.')
    expect(source).toContain('sans exposer sa mémoire ni ses droits')
  })

  it('keeps a mission-first conversion path', () => {
    expect(source).toContain('/missions?composer=1&source=collaborateurs-ia')
    expect(source).toContain('Décrire une première mission')
    expect(source).not.toContain('IntersectionObserver')
  })
})
