import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const source = readFileSync(new URL('../components/collaborateurs-ia/collaborateur-experience.tsx', import.meta.url), 'utf8')

describe('CollaborateurExperience', () => {
  it('opens with a durable business identity and direct onboarding', () => {
    expect(source).toContain('Un nouveau membre dans votre équipe')
    expect(source).toContain("heroTitlePrefix: 'Votre'")
    expect(source).toContain("heroTitleRole: 'Collaborateur IA'")
    expect(source).toContain("heroTitleEnd: 'travaille et progresse.'")
    expect(source).toContain('Il reste dans votre entreprise.')
    expect(source).toContain("value: 'Profils\\nCompétences\\nPlus de 3 000 apps'")
    expect(source).toContain('Meilleurs modèles d’IA')
    expect(source).toContain('Voir les Collaborateurs IA')
    expect(source).toContain('Choisissez l’identité adaptée à votre première mission.')
    expect(source).toContain('Ses ressources dédiées')
    expect(source).toContain("reassurance: ['Première mission gratuite', 'Sans carte bancaire']")
    expect(source).toContain('/decouvrir?source=collaborateurs-ia-hero')
    expect(source).not.toContain('/missions?composer=1&source=collaborateurs-ia-hero')
    expect(source).toContain('text-[clamp(2.15rem,4.5vw,4rem)]')
    expect(source).toContain('lg:grid-cols-[1.16fr_.84fr]')
    expect(source).toContain('max-[389px]:py-3')
    expect(source).toContain('min-[390px]:block')
  })

  it('introduces Hermes compactly after the marketplace', () => {
    expect(source).toContain('Hermes exécute. Unitalk organise le travail.')
    expect(source).toContain('Hermes fournit le moteur agentique open source.')
    expect(source).toContain('href="/hermes"')
    expect(source.indexOf('id="fonctionnement"')).toBeGreaterThan(source.indexOf('aria-labelledby="marketplace-title"'))
    expect(source).not.toContain('Mises à jour maîtrisées')
  })

  it('explains organizational placement separately from permissions', () => {
    for (const label of ['Une personne', 'Une équipe', 'Un département', 'Toute l’entreprise']) expect(source).toContain(label)
    expect(source).toContain('Un Collaborateur IA privé ou partagé.')
    expect(source).not.toContain('Quel que soit son rattachement')
    expect(source).not.toContain('Son identité, sa mémoire et ses ressources lui restent propres.')
  })

  it('covers memory, communication and data sovereignty', () => {
    for (const claim of ['Sa propre mémoire', 'Les savoirs partagés', 'Ses moyens de communication', 'Son serveur IA']) expect(source).toContain(claim)
    expect(source).toContain('Chaque instance Hermes dispose de son propre serveur dans Unitalk AI Cloud.')
  })

  it('shows one concise mission proof before the marketplace', () => {
    expect(source).toContain('Une mission, de bout en bout')
    expect(source).toContain('Il prépare. Votre équipe décide.')
    expect(source).toContain('Les actions sensibles restent en attente jusqu’à votre validation.')
    expect(source.indexOf('id="mission-proof-title"')).toBeLessThan(source.indexOf('aria-labelledby="marketplace-title"'))
  })

  it('links every product resource to its marketplace section', () => {
    for (const href of ['/marketplace/collaborateurs-ia', '/marketplace/profils-metier', '/marketplace/competences', '/marketplace/applications', '/marketplace/modeles-ia', '/marketplace/serveurs-ia']) expect(source).toContain(href)
    expect(source).toContain('Plus de 3 000 apps')
    expect(source).toContain('Un Store ouvert à la communauté')
    expect(source).toContain('sm:min-h-0')
    expect(source).toContain('sm:px-6 sm:py-3.5')
  })

  it('presents continuity as a lasting operational asset', () => {
    expect(source).toContain('Un capital opérationnel durable')
    expect(source).toContain('Son responsable peut changer. Son expérience reste dans l’entreprise.')
    expect(source).toContain('Réattribuez sa supervision')
    expect(source).not.toContain('Plusieurs Collaborateurs. Un résultat commun.')
    expect(source).not.toContain('Profils importables')
  })

  it('gives Alma a clear coordinating role', () => {
    expect(source).toContain('Décrivez une mission. Alma prépare le Collaborateur adapté.')
    expect(source).toContain('Le Collaborateur accomplit la mission. Votre équipe garde la décision.')
    expect(source).toContain('/decouvrir?source=collaborateurs-ia')
    expect(source).not.toContain("marketCta: 'Explorer la Marketplace'")
  })
})
