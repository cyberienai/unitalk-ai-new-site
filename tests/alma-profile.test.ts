import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const alma = readFileSync(new URL('../components/alma/alma-final-content.tsx', import.meta.url), 'utf8')
const discover = readFileSync(new URL('../components/discover/discover-flow.tsx', import.meta.url), 'utf8')
const account = readFileSync(new URL('../components/discover/screen-account.tsx', import.meta.url), 'utf8')

describe('Alma public profile', () => {
  it('starts the generic signup without selecting a mission', () => {
    expect(alma).toContain('href="/decouvrir?source=nav"')
    expect(alma).not.toContain('/decouvrir?mission=')
    expect(discover).toContain("{ kind: 'empty', source }")
    expect(account).toContain("almaGenericTitle: 'Commençons par le travail à accomplir.'")
    expect(account).toContain('function GenericPromise')
  })

  it('uses the canonical mission coordinator positioning', () => {
    expect(alma).toContain("role:'Coordinatrice de missions · Profil inclus'")
    expect(alma).toContain('Elle ne devient pas votre Collaboratrice IA')
    expect(alma).toContain('Une nouvelle mission ne signifie pas une nouvelle identité.')
  })

  it('uses accessible tabs for Alma use cases', () => {
    expect(alma).toContain('role="tablist"')
    expect(alma).toContain('role="tab"')
    expect(alma).toContain('aria-selected={active === key}')
    expect(alma).toContain('role="tabpanel"')
  })
})
