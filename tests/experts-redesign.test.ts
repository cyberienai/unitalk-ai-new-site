import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const content = readFileSync(new URL('../components/experts-content.tsx', import.meta.url), 'utf8')

describe('Experts mission-first redesign', () => {
  it('starts from a real mission and isolates human judgment', () => {
    expect(content).toContain('Ne cherchez pas<br />d’abord un <span className="text-[#D10E63]">expert.</span>')
    expect(content).toContain('Où le jugement humain change-t-il le résultat ?')
    expect(content).toContain('Le Collaborateur IA peut')
    expect(content).toContain('L’humain doit encore')
  })

  it('shows tangible delivery and governed expert access', () => {
    expect(content).toContain('Dossier de livraison')
    expect(content).toContain('Matrice des validations humaines')
    expect(content).toContain('L’expert entre.<br/>Puis il ressort.')
    expect(content).toContain('Révocable à tout moment')
  })

  it('connects experts, Co-creators and deployment partners', () => {
    expect(content).toContain('id="devenir-expert"')
    expect(content).toContain('/academy/experts')
    expect(content).toContain('/academy/formations/co-createur-ia')
    expect(content).toContain('/partenaires/deployer')
  })
})
