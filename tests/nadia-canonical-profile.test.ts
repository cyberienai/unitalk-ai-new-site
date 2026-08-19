import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { collaboratorHref, ROLE_DETAILS } from '@/lib/collaborators-catalog'
import { getCollaboratorPage } from '@/lib/collaborator-pages'

const content = readFileSync(new URL('../components/collaborateur-content.tsx', import.meta.url), 'utf8')

describe('Nadia canonical public profile', () => {
  it('uses Nadia as the shared finance identity', () => {
    expect(ROLE_DETAILS.nadia.role.fr).toBe('Analyste Financière')
    expect(ROLE_DETAILS.nadia.department.fr).toBe('Finance')
    expect(getCollaboratorPage('nadia')).toBeTruthy()
    expect(collaboratorHref('nadia')).toBe('/@nadia')
  })

  it('uses the mission-led experience with finance-specific content', () => {
    expect(content).toContain('const isMissionLedProfile = true')
    expect(content).toContain('Relancer mes factures impayées')
    expect(content).toContain('Confier mes relances à Nadia')
    expect(content).toContain('Nadia vérifie vos factures impayées et prépare les relances.')
    expect(content).toContain('10 relances contextualisées prêtes à envoyer.')
    expect(content).toContain('De quoi Nadia a-t-elle besoin pour commencer ?')
    expect(content).toContain('Nadia prépare et suit vos relances de factures.')
    expect(content).toContain('Prêt à confier la gestion')
    expect(content).toContain('de vos relances à Nadia&nbsp;?')
    expect(content).toContain('Promesses de paiement à suivre')
    expect(content).toContain('Relances préparées, jamais envoyées seules')
    expect(content).toContain('relances validées')
    expect(content).toContain('règles réutilisables')
    expect(content).toContain('Réutilisé à la prochaine mission')
    expect(content).toContain('14 820 €')
    expect(content).not.toContain('Données fictives')
    expect(content).toContain('aucune relance réelle ne sera envoyée')
    expect(content).not.toContain('Validation financière')
    expect(content).toContain('? "relancer-les-factures-impayees"')
  })

  it('features Nadia finance missions in a coherent order', () => {
    expect(getCollaboratorPage('nadia')?.missions.map((mission) => mission.slug)).toEqual([
      'relancer-les-factures-impayees',
      'suivre-la-tresorerie',
      'preparer-mon-reporting-financier',
      'analyser-les-ecarts-budgetaires',
      'preparer-les-previsions-budgetaires',
    ])
  })
})
