import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { collaboratorHref, ROLE_DETAILS } from '@/lib/collaborators-catalog'
import { getCollaboratorPage } from '@/lib/collaborator-pages'

const content = readFileSync(new URL('../components/collaborateur-content.tsx', import.meta.url), 'utf8')

describe('Emma canonical public profile', () => {
  it('uses Emma as the shared executive assistant identity', () => {
    expect(ROLE_DETAILS.emma.role.fr).toBe('Assistante de direction')
    expect(ROLE_DETAILS.emma.department.fr).toBe('Direction')
    expect(getCollaboratorPage('emma')).toBeTruthy()
    expect(collaboratorHref('emma')).toBe('/@emma')
  })

  it('uses a mission-led leadership meeting experience', () => {
    expect(content).toContain('["hugo", "nadia", "emma"].includes(detail.slug)')
    expect(content).toContain('Emma prépare votre prochain comité de direction.')
    expect(content).toContain('Confier mon prochain comité à Emma')
    expect(content).toContain('8", "Participants')
    expect(content).toContain('aucun ordre du jour réel ne sera envoyé')
    expect(content).toContain('Format d’ordre du jour validé')
  })

  it('keeps the example out of the four ready-to-use missions', () => {
    expect(getCollaboratorPage('emma')?.missions.map((mission) => mission.slug)).toEqual([
      'preparer-un-comite-de-direction',
      'participer-a-vos-reunions',
      'preparer-et-suivre-mes-reunions',
      'extraire-les-decisions',
      'suivre-les-actions-decidees',
    ])
    expect(content).toContain('? "preparer-un-comite-de-direction"')
  })
})
