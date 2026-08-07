'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, Monitor } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { MissionThread, type ThreadStep } from '@/components/home/mission-thread'

/**
 * WORKSPACE PROOF — the mission thread advances on its own up to a human
 * decision, then stops. A real "Valider" button lets the visitor clear the
 * gate; only then does the thread turn green and reach the result. This is the
 * homepage's clearest statement that decisions stay human.
 */

const T = {
  fr: {
    title: 'Le travail avance. Les décisions restent humaines.',
    sub: 'Le Collaborateur IA porte la mission jusqu’à votre validation — jamais au-delà sans votre accord.',
    emma: 'Emma',
    sophie: 'Sophie',
    emmaLine: '3 relances prêtes. Une concerne un client sensible — je te la soumets avant envoi.',
    sophieLine: 'Parfait, j’envoie les deux autres et je regarde la troisième.',
    steps: [
      { label: 'Emma prépare les relances' },
      { label: 'Cas sensibles regroupés' },
      { label: 'Validation de Marc', gate: true, gatePending: 'En attente de votre accord', gateDone: 'Validé' },
      { label: 'Envoi des relances' },
      { label: 'Réponses classées, paiements suivis' },
    ] as ThreadStep[],
    decisionLabel: 'Votre décision',
    validate: 'J’approuve et j’envoie',
    review: 'Je relis d’abord',
    validated: 'Vous avez validé — Emma poursuit',
    surfaces: 'Sur desktop, le web, vos messageries et en terminal — le même Collaborateur, partout où vous travaillez.',
    cta: 'Découvrir le Workspace',
  },
  en: {
    title: 'Work moves forward. Decisions stay human.',
    sub: 'The AI Collaborator carries the mission up to your validation — never beyond it without your agreement.',
    emma: 'Emma',
    sophie: 'Sophie',
    emmaLine: '3 reminders ready. One is for a sensitive client — I’ll submit it before sending.',
    sophieLine: 'Great, send the other two and I’ll look at the third.',
    steps: [
      { label: 'Emma prepares the reminders' },
      { label: 'Sensitive cases grouped' },
      { label: 'Marc’s validation', gate: true, gatePending: 'Awaiting your agreement', gateDone: 'Validated' },
      { label: 'Reminders sent' },
      { label: 'Replies filed, payments tracked' },
    ] as ThreadStep[],
    decisionLabel: 'Your decision',
    validate: 'I approve and send',
    review: 'I’ll review first',
    validated: 'You validated — Emma continues',
    surfaces: 'On desktop, the web, your messaging apps and in the terminal — the same Collaborator, wherever you work.',
    cta: 'Discover the Workspace',
  },
} as const

const ease = [0.22, 1, 0.36, 1] as const

export function SectionWorkspace({ lang = 'fr' }: { lang?: Lang }) {
  const t = T[lang]
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })

  const gateIndex = t.steps.findIndex((s) => s.gate)
  const [validated, setValidated] = useState(false)
  const [reached, setReached] = useState(false)

  // Draw the thread up to the gate once the panel is in view.
  useEffect(() => {
    if (reduce) {
      setReached(true)
      return
    }
    if (inView) {
      const id = window.setTimeout(() => setReached(true), 350)
      return () => window.clearTimeout(id)
    }
  }, [inView, reduce])

  const active = validated ? t.steps.length : reached ? gateIndex : 0

  return (
    <section className="bg-[#F3EFE6] py-16 sm:py-24">
      <div className="editorial-shell grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="max-w-xl">
          <h2 className="text-balance font-sf text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-[#1C1A17]">
            {t.title}
          </h2>
          <p className="mt-4 max-w-lg text-pretty text-[17px] leading-relaxed text-[#4E483F] md:text-[19px]">{t.sub}</p>
          <p className="mt-8 flex items-start gap-2.5 border-t border-[#DcD4C4] pt-6 text-[15px] leading-relaxed text-[#4E483F]">
            <Monitor className="mt-0.5 h-4 w-4 shrink-0 text-[#D10E63]" />
            {t.surfaces}
          </p>
          <Link
            href="/workspace"
            className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#1C1A17] underline decoration-[#D8D0C2] underline-offset-4 transition-colors hover:decoration-[#D10E63]"
          >
            {t.cta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Workspace panel */}
        <motion.div
          ref={ref}
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={inView || reduce ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="rounded-[24px] border border-[#E4DDCE] bg-[#FBF9F3] p-5 shadow-[0_24px_70px_-40px_rgba(28,26,23,0.4)] sm:p-6"
        >
          {/* Dialogue */}
          <div className="flex flex-col gap-3 border-b border-[#EEE7DA] pb-5">
            <div className="flex items-start gap-2.5">
              <Image src="/images/emma-avatar.png" alt="" width={28} height={28} className="h-7 w-7 rounded-full object-cover ring-1 ring-[#D10E63]/20" />
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#AD0C53]">{t.emma}</p>
                <p className="mt-1 rounded-2xl rounded-tl-sm bg-[#F1EADF] px-3.5 py-2.5 text-[13.5px] leading-relaxed text-[#2A2622]">{t.emmaLine}</p>
              </div>
            </div>
            <div className="flex flex-row-reverse items-start gap-2.5 text-right">
              <Image src="/images/sophie-avatar.png" alt="" width={28} height={28} className="h-7 w-7 rounded-full object-cover ring-1 ring-[#D10E63]/20" />
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#8A8073]">{t.sophie}</p>
                <p className="mt-1 inline-block rounded-2xl rounded-tr-sm bg-[#1C1A17] px-3.5 py-2.5 text-left text-[13.5px] leading-relaxed text-[#F3EFE6]">{t.sophieLine}</p>
              </div>
            </div>
          </div>

          {/* The mission thread */}
          <div className="pt-5">
            <MissionThread steps={t.steps} active={active} validated={validated} />

            {!validated ? (
              <div className="mt-5 rounded-2xl border border-[#E4DDCE] bg-[#F1EADF]/60 p-3.5">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#AD0C53]">{t.decisionLabel}</p>
                <div className="mt-2.5 flex flex-col gap-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => setValidated(true)}
                    disabled={!reached}
                    className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full bg-[#D10E63] px-5 text-[14px] font-bold text-[#FBF9F3] transition-colors hover:bg-[#B00B52] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Check className="h-4 w-4" strokeWidth={3} />
                    {t.validate}
                  </button>
                  <button
                    type="button"
                    disabled={!reached}
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#D2C9B8] bg-transparent px-5 text-[14px] font-semibold text-[#4E483F] transition-colors hover:border-[#1C1A17] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {t.review}
                  </button>
                </div>
              </div>
            ) : (
              <p className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#2E9E5B]/30 bg-[#EAF6EF] px-6 py-2.5 text-[14px] font-bold text-[#1F7A46]">
                <Check className="h-4 w-4" strokeWidth={3} />
                {t.validated}
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
