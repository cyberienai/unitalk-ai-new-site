'use client'

import { useLanguage } from '@/lib/language-context'

/**
 * Experts — the human pillar around the Collaborateurs IA.
 *
 * Phase A ships this scaffold: a real, coherent hero so the /experts route and
 * every nav/footer link resolve to a finished-looking surface. Phase B expands
 * this component with the voice-first Alma surface, the four domains, the client
 * journey, the expert types, and the "become an expert" section.
 */
export function ExpertsContent() {
  const { lang } = useLanguage()
  const fr = lang === 'fr'

  return (
    <main className="min-h-screen bg-[var(--store-page)] text-[var(--store-text)]">
      <section className="mx-auto w-full max-w-6xl px-5 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8">
        <div className="max-w-3xl">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#AD0C53]">
            {fr ? 'Experts' : 'Experts'}
          </p>
          <h1 className="mt-3 text-balance font-sf text-3xl font-bold leading-[1.08] tracking-[-0.02em] sm:text-4xl lg:text-[44px]">
            {fr
              ? 'Des experts pour donner leur plein potentiel à vos Collaborateurs IA'
              : 'Experts who bring your AI Collaborators to their full potential'}
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-[15px] leading-relaxed text-[var(--store-muted)] sm:text-base">
            {fr
              ? 'Vos Collaborateurs IA font le travail. Nos experts métier et techniques les cadrent, les configurent et transmettent le savoir-faire de votre entreprise — pour que la valeur reste chez vous.'
              : 'Your AI Collaborators do the work. Our business and technical experts frame them, configure them and pass on your company’s know-how — so the value stays with you.'}
          </p>

          {/* Proof chips */}
          <ul className="mt-7 flex flex-wrap gap-2.5">
            {(fr
              ? ['Cadrage avec Alma', 'Hébergé en France', 'Le savoir-faire vous reste']
              : ['Framing with Alma', 'Hosted in France', 'The know-how stays yours']
            ).map((chip) => (
              <li
                key={chip}
                className="inline-flex items-center rounded-full border border-[var(--store-border,#E4DDCE)] bg-[var(--store-card,#fff)] px-3.5 py-1.5 text-[13px] font-medium text-[var(--store-muted)]"
              >
                {chip}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
