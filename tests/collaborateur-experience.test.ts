import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const source = readFileSync(new URL('../components/collaborateurs-ia/collaborateur-experience.tsx', import.meta.url), 'utf8')

describe('CollaborateurExperience', () => {
  it('opens with a durable business identity and direct onboarding', () => {
    expect(source).toContain('Un nouveau membre dans votre équipe')
    expect(source).toContain("heroTitlePrefix: 'Votre'")
    expect(source).toContain("heroTitleRole: 'Collaborateur IA'")
    expect(source).toContain("heroTitleEnd: 'accomplit une mission.'")
    expect(source).toContain('Votre équipe garde les décisions.')
    expect(source).toContain('Découvrir les 12 Collaborateurs IA')
    expect(source).toContain('Carte professionnelle')
    expect(source).toContain('Première mission offerte · Puis 49 €/mois par Collaborateur IA')
    expect(source).toContain("reassurance: ['Sans carte bancaire', 'Actions sensibles sous votre contrôle']")
    expect(source).toContain("?source=collaborateurs-ia-hero")
    expect(source).not.toContain('/missions?composer=1&source=collaborateurs-ia-hero')
    expect(source).toContain('text-[clamp(2.15rem,4.5vw,4rem)]')
    expect(source).toContain('lg:grid-cols-[1.16fr_.84fr]')
  })

  it('provides the skip-link target', () => {
    expect(source).toContain('<main id="main-content"')
  })

  it('shows the twelve identities with professional channels and a first mission', () => {
    expect(source).toContain('MARKETPLACE_COLLABORATOR_SLUGS.map')
    expect(source).toContain("String(activeIndex + 1).padStart(2, '0')")
    for (const claim of ['E-mail professionnel', 'Calendrier', 'Téléphone', 'Voix', 'Fourni par Unitalk', 'Selon configuration', 'Première mission', 'Résultat attendu']) expect(source).toContain(claim)
    expect(source).toContain('activeIdentity.starterMission?.mission[lang]')
    expect(source).toContain('activeIdentity.starterMission?.result[lang]')
    expect(source).toContain('onTouchStart={handleTouchStart}')
    expect(source).not.toContain('setInterval')
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
    for (const claim of ['Sa propre mémoire', 'Les savoirs partagés', 'Plus de 3 000 applications', 'Son serveur privé virtuel']) expect(source).toContain(claim)
    expect(source).toContain('Chaque Collaborateur IA dispose de son propre serveur privé virtuel dans Unitalk AI Cloud.')
    expect(source).toContain('Pipedream relie les comptes et applications utiles')
  })

  it('shows one concise mission proof before the marketplace', () => {
    expect(source).toContain('Une mission, de bout en bout')
    expect(source).toContain('Il prépare. Votre équipe décide.')
    expect(source).toContain('Les actions sensibles restent en attente jusqu’à votre validation.')
    expect(source).toContain('Comité de direction prêt.')
    expect(source).toContain('Exemple illustratif · Données fictives')
    expect(source).toContain('Autoriser l’envoi de l’ordre du jour aux participants ?')
    expect(source.indexOf('id="mission-proof-title"')).toBeLessThan(source.indexOf('aria-labelledby="marketplace-title"'))
  })

  it('links every product resource to its marketplace section', () => {
    for (const route of ["localizedHref('collaboratorsMarketplace', lang)", "href: '/marketplace/profils-metier'", "href: '/marketplace/competences'", "href: '/marketplace/applications'", "localizedHref('models', lang)", "localizedHref('servers', lang)"]) expect(source).toContain(route)
    expect(source).toContain('Un Store ouvert à la communauté')
    expect(source).toContain('sm:min-h-0')
    expect(source).toContain('Voir toute la Marketplace')
    expect(source).toContain('Plus de 3 000 applications via Pipedream')
  })

  it('integrates continuity into organizational placement', () => {
    expect(source).toContain('Si son responsable change, son identité, ses méthodes validées et sa mémoire autorisée restent rattachées à l’entreprise')
    expect(source).not.toContain('aria-labelledby="capital-title"')
    expect(source).not.toContain('Plusieurs Collaborateurs. Un résultat commun.')
    expect(source).not.toContain('Profils importables')
    expect(source).not.toContain('Propriété de votre entreprise')
    expect(source).not.toContain('Le Collaborateur appartient à l’entreprise')
  })

  it('gives Alma a clear coordinating role', () => {
    expect(source).toContain('Décrivez une mission. Alma prépare le Collaborateur adapté.')
    expect(source).toContain('Le Collaborateur accomplit la mission. Votre équipe garde la décision.')
    expect(source).toContain("?source=collaborateurs-ia")
    expect(source).not.toContain("marketCta: 'Explorer la Marketplace'")
  })

  it('presents included skills with method, context and result', () => {
    expect(source).toContain('Profils et compétences sont inclus sans surcoût.')
    expect(source).toContain('Chaque compétence précise une méthode, un contexte et un résultat attendu')
    expect(source).not.toContain('aria-labelledby="competences-title"')
    expect(source).toContain("localizedHref('skills', lang)")
    for (const name of ['Qualifier un prospect', 'Préparer une réunion', 'Rédiger un article']) expect(source).toContain(name)
  })

  it('connects the Workspace, governance, security and pricing', () => {
    expect(source).toContain('Le Collaborateur est l’identité durable. Le Workspace est l’endroit')
    for (const label of ['Droit', 'Action', 'Validation', 'Décision', 'Trace']) expect(source).toContain(label)
    expect(source).not.toContain('aria-labelledby="governance-title"')
    for (const route of ["localizedHref('workspace', lang)", "localizedHref('security', lang)", "localizedHref('pricing', lang)"]) expect(source).toContain(route)
    expect(source).toContain("collaboratorBody:'5 millions de tokens et 60 minutes de téléphone inclus par mois.'")
    expect(source).toContain('7 jours ou 1 million de tokens')
    expect(source).toContain('Aucun abonnement payant ne démarre sans votre confirmation.')
  })
})
