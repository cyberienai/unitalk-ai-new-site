'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { MissionSeal } from '@/components/home/signs'
import { Kicker } from '@/components/home/section-kicker'
import { useAlma } from '@/components/home/alma-panel-context'

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
      { n: '01', head: 'Le besoin', big: 'Vous parlez à Alma.', proof: 'Elle précise la mission, le résultat attendu, les règles et les décisions qui doivent rester humaines.', chip: 'Mission définie' },
      { n: '02', head: 'L’affectation', big: 'Alma prépare votre Collaborateur IA.', proof: 'Avec le contexte, les accès et les compétences nécessaires à la mission.', chip: 'Collaborateur prêt' },
      { n: '03', head: 'Le travail', big: 'Votre Collaborateur IA accomplit la mission.', proof: 'Il agit dans le cadre défini et vous sollicite lorsqu’une décision humaine est nécessaire.', chip: 'Mission en cours' },
      { n: '04', head: 'La capitalisation', big: 'L’expérience est conservée.', proof: 'Une méthode testée et validée peut ensuite devenir une compétence réutilisable, privée ou publiée selon vos choix.', chip: 'Expérience conservée' },
    ],
    closeLead: 'Tout commence par une conversation.',
    closeCta: 'Parler à Alma',
  },
  en: {
    eyebrow: 'How it works',
    title: 'AI Collaborators that progress with your company',
    cols: [
      { n: '01', head: 'The need', big: 'You talk to Alma.', proof: 'She clarifies the mission, the expected outcome, the rules and the decisions that must stay human.', chip: 'Mission defined' },
      { n: '02', head: 'The assignment', big: 'Alma prepares your AI Collaborator.', proof: 'With the context, access and skills needed for the mission.', chip: 'Collaborator ready' },
      { n: '03', head: 'The work', big: 'Your AI Collaborator carries out the mission.', proof: 'It acts within the defined scope and asks you whenever a human decision is needed.', chip: 'Mission in progress' },
      { n: '04', head: 'Capitalization', big: 'The experience is preserved.', proof: 'A tested and validated method can then become a reusable skill — private or published, as you choose.', chip: 'Experience preserved' },
    ],
    closeLead: 'It all starts with a conversation.',
    closeCta: 'Talk to Alma',
  },
} as const

const NODE_LEFT = [0, 33.333, 66.666, 100] as const
const SEG_MS = 720

export function SectionDefinition({ lang = 'fr' }: { lang?: Lang }) {
  const t = T[lang]
  const reduce = useReducedMotion()
  const { openAlma } = useAlma()
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
              <span
                key={seg}
                className="absolute top-1/2 -translate-y-1/2"
                style={{
                  // Inset 14px on each side so the line stops short of the node
                  // icons instead of running under (and through) them.
                  left: `calc(${NODE_LEFT[seg]}% + 14px)`,
                  width: `calc(${NODE_LEFT[seg + 1] - NODE_LEFT[seg]}% - 28px)`,
                }}
              >
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
              <span key={left} className="absolute top-1/2 z-10 -translate-x-1/2 -translate-y-1/2" style={{ left: `${left}%` }}>
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
                animate={on ? { opacity: 1, y: 0 } : reduce ? { opacity: 1 } : { opacity: 0.5, y: 0 }}
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
                  <span
                    className="font-mono text-[10px] font-bold uppercase tracking-[0.16em]"
                    style={{ color: c.n === '04' ? accent : '#6E655A' }}
                  >
                    {c.head}
                  </span>
                </div>
                <p className="mt-3 text-balance font-sf text-[clamp(1.15rem,1.8vw,1.5rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-[#1C1A17]">
                  {c.big}
                </p>
                <p className="mt-2.5 text-pretty text-[14.5px] leading-relaxed text-[#5A5348]">{c.proof}</p>
                <motion.p
                  initial={false}
                  animate={{ opacity: on ? 1 : 0.5 }}
                  transition={{ duration: 0.4 }}
                  className="mt-5 inline-flex items-center gap-2 rounded-full py-1 pr-3 font-mono text-[10.5px] font-bold uppercase tracking-[0.12em]"
                  style={{ color: on ? accent : '#6E655A' }}
                >
                  {c.n === '04' ? (
                    <span aria-hidden className="text-[11px] leading-none">
                      ✓
                    </span>
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: on ? accent : '#6E655A' }} />
                  )}
                  {c.chip}
                </motion.p>
              </motion.div>
            )
          })}
        </div>

        {/* Editorial close — a single, lower-funnel invitation that opens Alma.
            Deliberately quieter than the hero's "Confier une première mission":
            this speaks to a visitor who has understood and wants to begin. */}
        <div className="mt-12 flex flex-col items-start gap-4 border-t border-[#E1D9C9] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-balance font-sf text-[clamp(1.15rem,1.8vw,1.4rem)] font-semibold leading-tight tracking-[-0.02em] text-[#1C1A17]">
            {t.closeLead}
          </p>
          <button
            type="button"
            onClick={() => openAlma()}
            className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#1C1A17] px-6 text-[15px] font-bold text-[#F3EFE6] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1A17] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F3EFE6]"
          >
            {t.closeCta}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </section>
  )
}
