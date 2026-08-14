import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const catalog = readFileSync(new URL('../components/collaborateurs-ia/profils/profiles-catalog-content.tsx', import.meta.url), 'utf8')
const publication = readFileSync(new URL('../components/collaborateurs-ia/profils/publish-profile-content.tsx', import.meta.url), 'utf8')
const page = readFileSync(new URL('../app/collaborateurs-ia/profils-metier/publier/page.tsx', import.meta.url), 'utf8')

describe('profile creation and publication paths', () => {
  it('offers voice search and carries the query to Alma', () => {
    expect(catalog).toContain('webkitSpeechRecognition')
    expect(catalog).toContain('aria-pressed={listening}')
    expect(catalog).toContain('encodeURIComponent(query.trim())')
    expect(catalog).toContain('Vous ne connaissez pas le nom du profil ?')
  })

  it('separates adapt, learn and publish intentions', () => {
    expect(catalog).toContain('Créer ou adapter un profil')
    expect(catalog).toContain("href: '/co-createur-ia'")
    expect(catalog).toContain("href: '/collaborateurs-ia/profils-metier/publier'")
  })

  it('publishes a dedicated verification page', () => {
    expect(page).toContain('PublishProfileContent')
    expect(publication).toContain("type Visibility = 'private' | 'organization' | 'public'")
    expect(publication).toContain('Aucune publication publique sans validation explicite')
    expect(publication).toContain('Un processus de vérification, pas un bouton de mise en ligne.')
  })
})
