import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const source = readFileSync(new URL('../components/collaborateurs-ia/collaborateur-experience.tsx', import.meta.url), 'utf8')

describe('CollaborateurExperience', () => {
  it('opens with a durable business identity and direct onboarding', () => {
    expect(source).toContain('Un Collaborateur IA rejoint votre équipe.')
    expect(source).toContain('Ses capacités évoluent avec votre entreprise.')
    expect(source).toContain('Profils métier et compétences')
    expect(source).toContain('Accès aux modèles d’IA')
    expect(source).toContain('/decouvrir?source=collaborateurs-ia-hero')
    expect(source).not.toContain('/missions?composer=1&source=collaborateurs-ia-hero')
    expect(source).toContain('text-[clamp(1.9rem,4.2vw,3.5rem)]')
    expect(source).toContain('lg:grid-cols-[1.02fr_.98fr]')
  })

  it('introduces Hermes in plain language and explains Unitalk', () => {
    expect(source).toContain('Hermes, l’agent autonome open source.')
    expect(source).toContain('Propulsé par Hermes. Opéré par Unitalk.')
    expect(source).toContain('href="/hermes"')
    expect(source).not.toContain('Mises à jour maîtrisées')
  })

  it('explains organizational placement separately from permissions', () => {
    for (const label of ['Une personne', 'Une équipe', 'Un département', 'Toute l’entreprise']) expect(source).toContain(label)
    expect(source).toContain('Le rattachement définit avec qui il travaille. Les autorisations définissent ce qu’il peut voir et faire.')
  })

  it('covers memory, communication and data sovereignty', () => {
    for (const claim of ['Sa mémoire propre', 'Les savoirs partagés', 'Ses moyens de communication', 'Son serveur IA']) expect(source).toContain(claim)
    expect(source).toContain('Chaque instance Hermes dispose de son propre serveur dans Unitalk AI Cloud.')
  })

  it('links every product resource to its marketplace section', () => {
    for (const href of ['/marketplace/collaborateurs-ia', '/marketplace/profils-metier', '/marketplace/competences', '/marketplace/applications', '/marketplace/modeles-ia', '/marketplace/serveurs-ia']) expect(source).toContain(href)
    expect(source).toContain('Plus de 3 000 applications')
    expect(source).toContain('Un Store ouvert à la communauté')
  })

  it('presents continuity as a lasting operational asset', () => {
    expect(source).toContain('Un capital opérationnel durable')
    expect(source).toContain('Votre Collaborateur reste. Son expérience aussi.')
    expect(source).toContain('Réattribuez sa supervision')
    expect(source).not.toContain('Plusieurs Collaborateurs. Un résultat commun.')
    expect(source).not.toContain('Profils importables')
  })

  it('gives Alma a clear coordinating role', () => {
    expect(source).toContain('Partez d’une mission. Alma prépare le Collaborateur adapté.')
    expect(source).toContain('Alma prépare et coordonne. Le Collaborateur accomplit la mission. Votre équipe garde la décision.')
    expect(source).toContain('/decouvrir?source=collaborateurs-ia')
    expect(source).toContain('Explorer la Marketplace')
  })
})
