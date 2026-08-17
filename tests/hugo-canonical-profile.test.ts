import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { collaboratorHref, ROLE_DETAILS } from '@/lib/collaborators-catalog'
import { getCollaboratorPage } from '@/lib/collaborator-pages'

const handleRoute = readFileSync(new URL('../app/[handle]/page.tsx', import.meta.url), 'utf8')
const legacyRoute = readFileSync(new URL('../app/collaborateurs/[slug]/page.tsx', import.meta.url), 'utf8')
const sitemap = readFileSync(new URL('../app/sitemap.ts', import.meta.url), 'utf8')
const equipment = readFileSync(new URL('../components/collaborator-equipment-flow.tsx', import.meta.url), 'utf8')

describe('Hugo canonical public profile', () => {
  it('uses Hugo as the shared sales identity', () => {
    expect(ROLE_DETAILS.hugo.role.fr).toBe('Commercial')
    expect(getCollaboratorPage('hugo')).toBeTruthy()
    expect(collaboratorHref('hugo')).toBe('/@hugo')
  })

  it('renders the mission-led profile at the handle URL', () => {
    expect(handleRoute).toContain('getCollaboratorPage(slug)')
    expect(handleRoute).toContain('<CollaborateurContent page={page}')
    expect(handleRoute).toContain('alternates: { canonical: `/@${slug}` }')
    expect(handleRoute).toContain('url: `${SITE_URL}/@${slug}`')
  })

  it('uses the new profile experience for every detailed AI identity', () => {
    expect(handleRoute).toContain('page ? <CollaborateurContent page={page}')
    expect(handleRoute).not.toContain("slug === 'hugo' && page")
  })

  it('removes the duplicate URL and keeps internal destinations canonical', () => {
    expect(legacyRoute).toContain("if (slug === 'hugo') notFound()")
    expect(sitemap).toContain('url: `${SITE_URL}/@${slug}`')
    expect(equipment).toContain('router.push(`/missions?composer=1&collaborateur=')
  })
})
