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

  it('uses a mission-led team meeting experience for small businesses', () => {
    expect(content).toContain('const isMissionLedProfile = true')
    expect(content).toContain('Emma prépare et suit votre prochaine réunion d’équipe.')
    expect(content).toContain('Confier la préparation et le suivi à Emma')
    expect(content).toContain('5", "Participants')
    expect(content).toContain('aucun ordre du jour réel ne sera envoyé')
    expect(content).toContain('Format d’ordre du jour validé')
    expect(content).toContain('Priorités de la semaine')
    expect(content).toContain('Réutilisé à la prochaine mission')
    expect(content).toContain('Aucun enregistrement automatique')
    expect(content).toContain('Aperçu du message')
    expect(content).not.toContain('meetingParticipants')
  })

  it('keeps the example out of the four ready-to-use missions', () => {
    expect(getCollaboratorPage('emma')?.missions.map((mission) => mission.slug)).toEqual([
      'preparer-et-suivre-mes-reunions',
      'trier-la-boite-de-reception',
      'organiser-les-rendez-vous',
      'participer-a-vos-reunions',
      'suivre-les-actions-decidees',
    ])
    expect(content).toContain('? "preparer-et-suivre-mes-reunions"')
    expect(content).not.toContain('Emma prépare votre prochain comité de direction.')
  })
})
