import { describe, expect, it } from 'vitest'
import { collaboratorProfileHref, localizePublicHref, localizedHref, missionHref, switchLocaleHref } from '@/lib/i18n-routing'

describe('localized routing', () => {
  it('maps the primary commercial routes', () => {
    expect(localizedHref('missions', 'en')).toBe('/en/missions')
    expect(localizedHref('collaborators', 'en')).toBe('/en/ai-collaborators')
    expect(localizedHref('workspace', 'en')).toBe('/en/workspace')
    expect(localizedHref('desktop', 'en')).toBe('/en/desktop')
    expect(localizedHref('pricing', 'en')).toBe('/en/pricing')
    expect(localizedHref('discover', 'en')).toBe('/en/get-started')
  })

  it('localizes dynamic mission and collaborator routes', () => {
    expect(missionHref('trouver-de-nouveaux-clients', 'en')).toBe('/en/missions/trouver-de-nouveaux-clients')
    expect(collaboratorProfileHref('emma', 'en')).toBe('/en/@emma')
  })

  it('preserves query strings and hashes on known public routes', () => {
    expect(localizePublicHref('/missions?famille=finance', 'en')).toBe('/en/missions?famille=finance')
    expect(localizePublicHref('/tarifs#detail-tarifs', 'en')).toBe('/en/pricing#detail-tarifs')
    expect(localizePublicHref('/desktop', 'en')).toBe('/en/desktop')
  })

  it('switches between reciprocal localized routes', () => {
    expect(switchLocaleHref('/missions/example', 'en')).toBe('/en/missions/example')
    expect(switchLocaleHref('/en/missions/example', 'fr')).toBe('/missions/example')
    expect(switchLocaleHref('/en/marketplace/skills', 'fr')).toBe('/marketplace/competences')
    expect(switchLocaleHref('/en/desktop', 'fr')).toBe('/desktop')
  })
})
