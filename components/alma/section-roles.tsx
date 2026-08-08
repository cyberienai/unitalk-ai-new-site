'use client'

import { useLanguage } from '@/lib/language-context'
import { Kicker } from '@/components/home/section-kicker'

type Role = { name: string; body: string; accent?: boolean }

const COPY = {
  fr: {
    kicker: 'Qui fait quoi ?',
    title: 'Alma prépare. Le Collaborateur IA accomplit. Vous validez.',
    roles: [
      { name: 'Alma', body: 'Comprend, structure, recommande, informe et transmet.', accent: true },
      { name: 'Le Collaborateur IA', body: 'Planifie et accomplit la mission dans le cadre défini.' },
      { name: 'Vos équipes', body: 'Transmettent leur méthode, corrigent le contexte et prennent les décisions importantes.' },
      { name: 'Les experts Unitalk', body: 'Interviennent lorsqu’une intégration, une gouvernance ou un accompagnement humain plus poussé est nécessaire.' },
    ] as Role[],
  },
  en: {
    kicker: 'Who does what?',
    title: 'Alma prepares. The AI Collaborator delivers. You validate.',
    roles: [
      { name: 'Alma', body: 'Understands, structures, recommends, informs and hands over.', accent: true },
      { name: 'The AI Collaborator', body: 'Plans and carries out the mission within the defined scope.' },
      { name: 'Your teams', body: 'Share their method, correct the context and make the important decisions.' },
      { name: 'Unitalk experts', body: 'Step in when a deeper integration, governance or human support is required.' },
    ] as Role[],
  },
} as const

export function SectionRoles() {
  const { lang } = useLanguage()
  const t = COPY[lang]

  return (
    <section className="border-b border-[#E7E0D2] bg-[#F3EFE6] px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <Kicker>{t.kicker}</Kicker>
        <h2 className="mt-4 max-w-3xl text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-[#1C1A17] sm:text-4xl">
          {t.title}
        </h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.roles.map((r) => (
            <div
              key={r.name}
              className={`rounded-2xl border p-5 ${
                r.accent ? 'border-[#D10E63]/30 bg-[#D10E63]/[0.05]' : 'border-[#E4DDCE] bg-[#FBF9F3]'
              }`}
            >
              <p className={`text-[15px] font-semibold tracking-[-0.01em] ${r.accent ? 'text-[#B00C54]' : 'text-[#1C1A17]'}`}>
                {r.name}
              </p>
              <p className="mt-2 text-[14px] leading-relaxed text-[#5A5348]">{r.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
