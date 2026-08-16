import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const alma = readFileSync(new URL('../components/alma/alma-final-content.tsx', import.meta.url), 'utf8')
const accompaniment = readFileSync(new URL('../app/accompagnement/page.tsx', import.meta.url), 'utf8')

describe('Alma support', () => {
  it('integrates ongoing support and expert handoff into the Alma page', () => {
    expect(alma).toContain('id="accompagnement"')
    expect(alma).toContain('Alma reste présente. Un expert prend le relais si nécessaire.')
    expect(alma).toContain('transmet le contexte à l’expert adapté')
  })

  it('redirects the former support page to the merged section', () => {
    expect(accompaniment).toContain("permanentRedirect('/collaborateurs-ia/alma#accompagnement')")
  })
})
