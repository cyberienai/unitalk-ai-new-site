import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const navbar = readFileSync(new URL('../components/navbar.tsx', import.meta.url), 'utf8')

describe('Collaborateurs IA navigation', () => {
  it('keeps the primary journey visible', () => {
    for (const href of ['/missions', '/collaborateurs-ia', '/workspace', '/tarifs']) expect(navbar).toContain(href)
    expect(navbar).toContain("label: { fr: 'Décrire ma mission'")
  })

  it('links directly to the Collaborators overview on desktop and mobile', () => {
    expect(navbar).toContain("<NavItem href={localizePublicHref('/marketplace/collaborateurs-ia', lang)}")
    expect(navbar).toContain("<Link href={localizePublicHref('/marketplace/collaborateurs-ia', lang)}")
    expect(navbar).not.toContain('COLLAB_MENU')
    expect(navbar).not.toContain('collab-menu')
  })

  it('keeps Missions and Academy visible and removes Marketplace from top navigation', () => {
    expect(navbar).toContain("<NavItem href={localizedHref('missions', lang)}")
    expect(navbar).not.toContain('<NavItem href="/marketplace"')
    expect(navbar).not.toContain('{t.marketplace}')
    expect(navbar).not.toContain('<NavItem href="/partenaires"')
  })

})
