'use client'

import { useLanguage } from '@/lib/language-context'

export type LegalSection = { heading: string; body: string[] }
export type LegalDoc = {
  title: string
  updated: string
  intro: string
  sections: LegalSection[]
}

const UI = {
  fr: {
    draft: 'Document de travail — contenu provisoire à finaliser par un conseil juridique avant mise en production.',
    updatedLabel: 'Dernière mise à jour',
    contactTitle: 'Une question sur ce document ?',
    contactCta: 'Nous écrire',
  },
  en: {
    draft: 'Working draft — provisional content to be finalized by legal counsel before production.',
    updatedLabel: 'Last updated',
    contactTitle: 'A question about this document?',
    contactCta: 'Get in touch',
  },
}

export function LegalContent({ doc }: { doc: { fr: LegalDoc; en: LegalDoc } }) {
  const { lang } = useLanguage()
  const t = doc[lang]
  const ui = UI[lang]

  return (
    <main className="bg-[#F3EFE6] px-5 pb-24 pt-28 sm:px-6 sm:pt-32">
      <article className="mx-auto w-full max-w-3xl">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B00C54]">
          {ui.updatedLabel} · {t.updated}
        </p>
        <h1 className="mt-4 text-balance font-sf text-[clamp(2rem,5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-[#1C1A17]">
          {t.title}
        </h1>

        {/* Provisional-content notice */}
        <div
          role="note"
          className="mt-6 rounded-xl border border-[#E7C9AE] bg-[#FBF1E6] px-4 py-3 text-[13.5px] leading-relaxed text-[#7A5230]"
        >
          {ui.draft}
        </div>

        <p className="mt-8 text-[16px] leading-relaxed text-[#4E483F]">{t.intro}</p>

        <div className="mt-10 flex flex-col gap-10">
          {t.sections.map((section, i) => (
            <section key={section.heading}>
              <h2 className="flex items-baseline gap-3 font-sf text-[19px] font-semibold tracking-[-0.01em] text-[#1C1A17]">
                <span className="font-mono text-[13px] font-semibold text-[#C7A98F]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {section.heading}
              </h2>
              <div className="mt-3 flex flex-col gap-3 border-l border-[#E4DDCE] pl-4">
                {section.body.map((p, j) => (
                  <p key={j} className="text-[15px] leading-relaxed text-[#5C554A]">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Contact */}
        <div className="mt-14 flex flex-col gap-4 rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sf text-[16px] font-semibold text-[#1C1A17]">{ui.contactTitle}</p>
          <a
            href="mailto:hello@unitalk.ai"
            className="inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-[#D10E63] px-6 text-sm font-bold text-[#FBF9F3] transition-colors hover:bg-[#E51872] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F3EFE6]"
          >
            {ui.contactCta}
          </a>
        </div>
      </article>
    </main>
  )
}
