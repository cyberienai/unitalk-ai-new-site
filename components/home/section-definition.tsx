'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import type { Lang } from '@/lib/language-context'
import { MissionSeal } from '@/components/home/signs'
import { Kicker } from '@/components/home/section-kicker'

/**
 * THE MISSION THREAD, HORIZONTAL — the three steps as ONE editorial triptych,
 * not three SaaS cards. A single surface split into three columns by two
 * hairlines, with the mission thread running across them: it draws magenta
 * (Alma → the work), STOPS before the human decision, then turns green and
 * inscribes the skill (the know-how that stays). No icons; the moving thread
 * carries the whole idea. Vertical and static under reduced motion / on mobile.
 */

const MAGENTA = '#D10E63'
const GREEN = '#2E7D4F'
const ease = [0.22, 1, 0.36, 1] as const

const T = {
  fr: {
    eyebrow: 'Comment ça marche',
    title: 'Des Collaborateurs IA qui progressent avec votre entreprise',
    cols: [
      { n: '01', head: 'Le besoin', big: 'Vous parlez à Alma.', proof: 'Elle précise le résultat attendu, les règles et les décisions qui devront rester humaines.', chip: 'Mission définie' },
      { n: '02', head: 'L’affectation', big: 'Alma prépare le bon Collaborateur IA.', proof: 'Elle vérifie qui peut prendre la mission et ajoute uniquement les profils métier, les compétences et les applications qui manquent.', chip: 'Collaborateur prêt' },
      { n: '03', head: 'Le travail', big: 'Il accomplit la mission.', proof: 'Il agit dans le cadre défini et vous sollicite lorsqu’une décision humaine est nécessaire.', chip: 'Mission en cours' },
      { n: '04', head: 'Ce qui reste', big: 'Votre entreprise conserve le savoir-faire.', proof: 'Une méthode testée et validée peut devenir une compétence réutilisable et partageable.', chip: 'Compétence acquise' },
    ],
  },
  en: {
    eyebrow: 'How it works',
    title: 'AI Collaborators that progress with your company',
    cols: [
      { n: '01', head: 'The need', big: 'You talk to Alma.', proof: 'She clarifies the expected outcome, the rules and the decisions that must stay human.', chip: 'Mission defined' },
      { n: '02', head: 'The assignment', big: 'Alma prepares the right AI Collaborator.', proof: 'She checks who can take the mission and adds only the job profiles, skills and applications that are missing.', chip: 'Collaborator ready' },
      { n: '03', head: 'The work', big: 'It carries out the mission.', proof: 'It acts within the defined scope and asks you whenever a human decision is needed.', chip: 'Mission in progress' },
      { n: '04', head: 'What stays', big: 'Your company keeps the know-how.', proof: 'A tested and validated method can become a reusable, shareable skill.', chip: 'Skill preserved' },
    ],
  },
} as const

const NODE_LEFT = [0, 33.333, 66.666, 100] as const
const SEG_MS = 720

export function SectionDefinition({ lang = 'fr' }: { lang?: Lang }) {
  const t = T[lang]
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })

  // active = how many steps have been revealed (0..4). The thread and cards
  // light up one after another, telling the story left → right.
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (reduce) {
      setActive(4)
      return
    }
    if (!inView) return
    const timers = [0, 1, 2, 3].map((i) =>
      window.setTimeout(() => setActive(i + 1), 350 + i * SEG_MS),
    )
    return () => timers.forEach((id) => window.clearTimeout(id))
  }, [inView, reduce])

  const colorFor = (i: number) => (i === 3 ? GREEN : MAGENTA)

  return (
    <section className="bg-[#F3EFE6] py-14 sm:py-20">
      <div className="editorial-shell" ref={ref}>
        <Kicker>{t.eyebrow}</Kicker>
        <h2 className="mt-4 max-w-3xl text-balance font-sf text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-[#1C1A17]">
          {t.title}
        </h2>

        {/* Horizontal thread band (desktop) — 4 nodes, drawn segment by segment.
            A leading "comet" glides along each segment as the thread inscribes
            itself; the last segment warms from magenta to green (the handoff). */}
        <div aria-hidden className="relative mt-12 hidden h-6 lg:block">
          {/* base rail: dotted guide for the not-yet-drawn path */}
          <span
            className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2"
            style={{ backgroundImage: 'linear-gradient(to right,#CDC4B2 0 3px,transparent 3px 10px)', backgroundSize: '10px 1px' }}
          />
          {/* connecting segments between consecutive nodes */}
          {[0, 1, 2].map((seg) => {
            const drawn = active > seg + 1
            const segColor = seg === 2 ? GREEN : MAGENTA
            return (
              <span key={seg} className="absolute top-1/2 -translate-y-1/2" style={{ left: `${NODE_LEFT[seg]}%`, width: `${NODE_LEFT[seg + 1] - NODE_LEFT[seg]}%` }}>
                {/* the inscribed line */}
                <motion.span
                  className="absolute inset-x-0 top-1/2 h-[3px] origin-left -translate-y-1/2 rounded-full"
                  style={{
                    background: seg === 2 ? `linear-gradient(to right, ${MAGENTA}, ${GREEN})` : MAGENTA,
                    boxShadow: `0 1px 8px -1px ${segColor}66`,
                  }}
                  initial={reduce ? false : { scaleX: 0 }}
                  animate={{ scaleX: drawn ? 1 : 0 }}
                  transition={{ duration: reduce ? 0 : SEG_MS / 1000, ease }}
                />
                {/* traveling comet head — rides the drawing tip */}
                {!reduce && (
                  <motion.span
                    className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{ backgroundColor: segColor, boxShadow: `0 0 10px 2px ${segColor}` }}
                    initial={{ left: '0%', opacity: 0 }}
                    animate={drawn ? { left: '100%', opacity: [0, 1, 1, 0] } : { left: '0%', opacity: 0 }}
                    transition={{ duration: SEG_MS / 1000, ease, times: [0, 0.15, 0.8, 1] }}
                  />
                )}
              </span>
            )
          })}
          {/* nodes */}
          {NODE_LEFT.map((left, i) => {
            const on = active > i
            const isLast = i === 3
            return (
              <span key={left} className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ left: `${left}%` }}>
                {/* soft halo pulse as a node switches on */}
                {on && !reduce && (
                  <motion.span
                    className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{ backgroundColor: colorFor(i) }}
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 3, opacity: 0 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  />
                )}
                {isLast && on ? (
                  <span className="block">
                    <MissionSeal size={24} color={GREEN} />
                  </span>
                ) : (
                  <span
                    className="relative flex h-[18px] w-[18px] items-center justify-center rounded-full transition-all duration-500"
                    style={{
                      backgroundColor: on ? colorFor(i) : '#F3EFE6',
                      border: on ? `1px solid ${colorFor(i)}` : '1.5px solid #CDC4B2',
                      boxShadow: on
                        ? `0 0 0 6px ${colorFor(i)}12, 0 3px 8px -1px ${colorFor(i)}55`
                        : 'inset 0 0 0 3px #F3EFE6',
                    }}
                  >
                    {/* bright concentric core — reads like a lit beacon */}
                    <span
                      className="block h-1.5 w-1.5 rounded-full transition-opacity duration-500"
                      style={{ backgroundColor: '#FFFDF9', opacity: on ? 0.95 : 0 }}
                    />
                  </span>
                )}
              </span>
            )
          })}
        </div>

        {/* Columns — one continuous surface split by hairlines */}
        <div className="mt-7 grid gap-y-9 md:grid-cols-2 md:gap-x-8 md:gap-y-10 lg:grid-cols-4 lg:gap-x-0 lg:gap-y-0 lg:divide-x lg:divide-[#E1D9C9]">
          {t.cols.map((c, i) => {
            const on = active > i
            const accent = colorFor(i)
            return (
              <motion.div
                key={c.n}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={on ? { opacity: 1, y: 0 } : reduce ? { opacity: 1 } : { opacity: 0.32, y: 0 }}
                transition={{ duration: 0.55, ease }}
                className="group relative pl-6 lg:px-8"
              >
                {/* Mobile: short vertical thread accent on the left of each block */}
                <span
                  aria-hidden
                  className="absolute left-0 top-1 h-full w-px transition-colors duration-500 lg:hidden"
                  style={{ backgroundColor: on ? accent : '#DcD4C4' }}
                />
                <span
                  aria-hidden
                  className="absolute left-[-3px] top-1 h-[9px] w-[9px] rounded-full transition-all duration-500 lg:hidden"
                  style={{ backgroundColor: on ? accent : 'transparent', border: `1.5px solid ${on ? accent : '#DcD4C4'}` }}
                />

                <div className="flex items-baseline gap-2.5">
                  <span className="font-mono text-[13px] font-bold" style={{ color: accent }}>{c.n}</span>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A8073]">{c.head}</span>
                </div>
                <p className="mt-3 text-balance font-sf text-[clamp(1.15rem,1.8vw,1.5rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-[#1C1A17]">
                  {c.big}
                </p>
                <p className="mt-2.5 text-pretty text-[14.5px] leading-relaxed text-[#5A5348]">{c.proof}</p>
                <motion.p
                  initial={false}
                  animate={{ opacity: on ? 1 : 0.3 }}
                  transition={{ duration: 0.4 }}
                  className="mt-5 inline-flex items-center gap-2 rounded-full py-1 pr-3 font-mono text-[10.5px] font-bold uppercase tracking-[0.12em]"
                  style={{ color: on ? accent : '#8A8073' }}
                >
                  {c.n === '04' ? (
                    <span aria-hidden className="text-[11px] leading-none">
                      ✓
                    </span>
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: on ? accent : '#8A8073' }} />
                  )}
                  {c.chip}
                </motion.p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
