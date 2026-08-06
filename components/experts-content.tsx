'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { loadDraft } from '@/lib/mission-draft'
import { type Accompaniment, type ExpertDomain } from '@/lib/experts'
import { ExpertsAlmaSurface, type ExpertsSeed } from '@/components/experts/experts-alma-surface'
import { ExpertsDomains } from '@/components/experts/experts-domains'
import { ExpertsJourney } from '@/components/experts/experts-journey'
import { ExpertsTypes } from '@/components/experts/experts-types'
import { BecomeExpert } from '@/components/experts/become-expert'

/**
 * Experts — the human pillar around the Collaborateurs IA (brief §5–§11).
 *
 * The page presents human expertise as the extension of complex AI Collaborator
 * deployments: a voice-first Alma surface that builds an accompaniment brief,
 * four intervention domains, an honest client journey, the mobilizable expert
 * types, the real availability state, and a "become an expert" section.
 */
export function ExpertsContent() {
  const { lang } = useLanguage()
  const fr = lang === 'fr'

  const [seed, setSeed] = useState<ExpertsSeed | null>(null)
  const seedCounter = useRef(0)
  const almaRef = useRef<HTMLElement>(null)
  const becomeRef = useRef<HTMLElement>(null)

  const scrollToAlma = useCallback(() => {
    almaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const scrollToBecome = useCallback(() => {
    becomeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  // A domain card loads its context into Alma.
  const pickDomain = useCallback(
    (d: ExpertDomain) => {
      seedCounter.current += 1
      setSeed({ text: d.seed, level: d.level, key: seedCounter.current })
      scrollToAlma()
    },
    [scrollToAlma],
  )

  // Mission handoff (brief §12): /experts?entry=mission&draft=mis_123.
  // The draft lives in sessionStorage; the company context is NOT transmitted.
  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    if (params.get('entry') !== 'mission') return
    const id = params.get('draft')
    if (!id) return
    seedCounter.current += 1
    // Two carriers are supported (both keep company context private):
    //  1. a stored MissionDraft id (structured objective + result), or
    //  2. raw text drafted in the Missions Alma field (no stored draft).
    const draft = loadDraft(id)
    const consentNote = {
      fr: 'Projet transmis depuis vos missions. Le contexte de votre entreprise n’est pas partagé sans votre accord.',
      en: 'Project carried over from your missions. Your company context is not shared without your consent.',
    }
    if (draft) {
      setSeed({
        text: {
          fr: `${draft.objective.fr} ${draft.result.fr}`.trim(),
          en: `${draft.objective.en} ${draft.result.en}`.trim(),
        },
        level: 'deploiement',
        note: {
          fr: `Projet transmis depuis votre mission « ${draft.title.fr} ». Le contexte de votre entreprise n’est pas partagé sans votre accord.`,
          en: `Project carried over from your mission "${draft.title.en}". Your company context is not shared without your consent.`,
        },
        key: seedCounter.current,
      })
    } else {
      // Raw drafted text — seed both languages with what the user typed.
      const raw = id.trim()
      setSeed({
        text: { fr: raw, en: raw },
        level: 'deploiement',
        note: consentNote,
        key: seedCounter.current,
      })
    }
    // Scroll to Alma once mounted.
    requestAnimationFrame(() => almaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }, [])

  // The final brief CTA — honest mise en relation (no marketplace / no backend):
  // prepare an email to Unitalk with the structured brief.
  const findExpert = useCallback(
    (brief: Accompaniment) => {
      const lines = [
        `${fr ? 'Objectif' : 'Objective'}: ${brief.objective[lang]}`,
        `${fr ? 'Périmètre' : 'Scope'}: ${brief.perimeter[lang]}`,
        `${fr ? 'Collaborateurs IA' : 'AI Collaborators'}: ${brief.collaborators[lang]}`,
        `${fr ? 'Applications' : 'Applications'}: ${brief.applications.map((a) => a[lang]).join(', ') || (fr ? 'à préciser' : 'to be specified')}`,
        `${fr ? 'Contraintes' : 'Constraints'}: ${brief.constraints.map((c) => c[lang]).join(', ') || (fr ? 'à préciser' : 'to be specified')}`,
        `${fr ? 'Niveau' : 'Level'}: ${brief.level[lang]}`,
        `${fr ? 'Échéance' : 'Timeline'}: ${brief.deadline[lang]}`,
      ]
      const subject = fr ? 'Projet d’accompagnement expert' : 'Expert support project'
      const body = `${fr ? 'Bonjour,' : 'Hello,'}\n\n${fr ? 'Voici mon projet préparé avec Alma :' : 'Here is my project prepared with Alma:'}\n\n${lines.join('\n')}\n`
      window.location.href = `mailto:hello@unitalk.ai?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    },
    [fr, lang],
  )

  return (
    <main className="min-h-screen bg-[var(--store-page)] text-[var(--store-text)]">
      {/* Hero (brief §5) */}
      <section className="mx-auto w-full max-w-6xl px-5 pb-10 pt-16 sm:px-6 sm:pb-12 sm:pt-20 lg:px-8">
        <div className="max-w-3xl">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#AD0C53]">
            {fr ? 'Experts' : 'Experts'}
          </p>
          <h1 className="mt-3 text-balance font-sf text-[34px] font-bold leading-[1.06] tracking-[-0.02em] sm:text-5xl lg:text-[54px]">
            {fr ? 'Faites orchestrer vos Collaborateurs IA.' : 'Have your AI Collaborators orchestrated.'}
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-[16px] leading-relaxed text-[var(--store-muted)] sm:text-lg">
            {fr
              ? 'Des professionnels vous accompagnent pour concevoir les missions, intégrer vos applications et faire progresser votre organisation du travail.'
              : 'Professionals support you to design missions, integrate your applications and advance the way your organization works.'}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={scrollToAlma}
              className="inline-flex min-h-[52px] items-center gap-2 rounded-full bg-[#D10E63] px-7 py-3.5 text-base font-bold text-[#FBF9F3] shadow-[0_10px_28px_-12px_rgba(209,14,99,0.75)] transition-colors hover:bg-[#B00B52] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--store-page)]"
            >
              {fr ? 'Trouver un expert' : 'Find an expert'}
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={scrollToBecome}
              className="inline-flex min-h-[52px] items-center rounded-full border border-[#E7DFD0] bg-[var(--store-surface)] px-6 py-3.5 text-base font-semibold text-[var(--store-text)] transition-colors hover:border-[#D10E63]/40 hover:text-[#D10E63] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/40"
            >
              {fr ? 'Devenir expert Unitalk' : 'Become a Unitalk expert'}
            </button>
          </div>

          {/* Reassurance (brief §5) */}
          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
            {(fr
              ? ['Besoin préparé avec Alma', 'Contexte transmis avec votre accord', 'Accompagnement adapté au projet']
              : ['Need prepared with Alma', 'Context shared with your consent', 'Support tailored to the project']
            ).map((chip) => (
              <li key={chip} className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--store-muted)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#D10E63]" aria-hidden="true" />
                {chip}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Alma surface (brief §6) */}
      <section ref={almaRef} className="scroll-mt-20 border-t border-[#E7DFD0] bg-[#FBF7F2]">
        <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-6 sm:py-16 lg:px-8">
          <ExpertsAlmaSurface lang={lang} seed={seed} onFindExpert={findExpert} />
        </div>
      </section>

      {/* Four domains (brief §7) */}
      <ExpertsDomains lang={lang} onPick={pickDomain} />

      {/* Client journey (brief §8) */}
      <ExpertsJourney lang={lang} />

      {/* Expert types + honest availability (brief §9, §10) */}
      <ExpertsTypes lang={lang} onPresent={scrollToAlma} />

      {/* Become an expert (brief §11) */}
      <BecomeExpert ref={becomeRef} lang={lang} />
    </main>
  )
}
