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
    title: 'Des Collaborateurs IA qui grandissent avec votre entreprise',
    cols: [
      { n: '01', head: 'Le besoin', big: 'Vous parlez à Alma.', proof: 'Elle comprend votre entreprise et définit avec vous la mission à accomplir.', chip: 'Mission définie' },
      { n: '02', head: 'Le collaborateur', big: 'Alma prépare votre Collaborateur IA.', proof: 'Profil métier, instructions, compétences, modèle IA et connexion à vos applications.', chip: 'Collaborateur prêt' },
      { n: '03', head: 'La mission', big: 'Il accomplit la mission.', proof: 'Vous gardez le contrôle : il ne fait jamais rien sans votre accord.', chip: 'Sous votre contrôle' },
      { n: '04', head: 'Ce qui reste', big: 'Votre savoir-faire vous appartient.', proof: 'Chaque mission accomplie enrichit votre savoir-faire et fait progresser votre entreprise.', chip: 'Savoir-faire possédé' },
    ],
  },
  en: {
    eyebrow: 'How it works',
    title: 'AI Collaborators that grow with your company',
    cols: [
      { n: '01', head: 'The need', big: 'You talk to Alma.', proof: 'She understands your company and defines the mission with you.', chip: 'Mission defined' },
      { n: '02', head: 'The collaborator', big: 'Alma prepares your AI Collaborator.', proof: 'Business profile, instructions, skills, AI model and connection to your apps.', chip: 'Collaborator ready' },
      { n: '03', head: 'The mission', big: 'It carries out the mission.', proof: 'You stay in control: it never does anything without your consent.', chip: 'Under your control' },
      { n: '04', head: 'What stays', big: 'The know-how belongs to you.', proof: 'Every completed mission enriches your know-how and moves your company forward.', chip: 'Know-how owned' },
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

        {/* Horizontal thread band (desktop) — 4 nodes, drawn segment by segment */}
        <div aria-hidden className="relative mt-10 hidden h-5 md:block">
          {/* base dotted guide across the full width */}
          <span
            className="absolute inset-x-0 top-[9px] h-px"
            style={{ backgroundImage: 'linear-gradient(to right,#D3CABA 0 4px,transparent 4px 9px)', backgroundSize: '9px 1px' }}
          />
          {/* connecting segments between consecutive nodes */}
          {[0, 1, 2].map((seg) => (
            <motion.span
              key={seg}
              className="absolute top-[9px] h-[2px] origin-left rounded-full"
              style={{
                left: `${NODE_LEFT[seg]}%`,
                width: `${NODE_LEFT[seg + 1] - NODE_LEFT[seg]}%`,
                background: seg === 2 ? `linear-gradient(to right, ${MAGENTA}, ${GREEN})` : MAGENTA,
              }}
              initial={reduce ? false : { scaleX: 0 }}
              animate={{ scaleX: active > seg + 1 ? 1 : 0 }}
              transition={{ duration: reduce ? 0 : SEG_MS / 1000, ease }}
            />
          ))}
          {/* nodes */}
          {NODE_LEFT.map((left, i) => {
            const on = active > i
            const isLast = i === 3
            return (
              <span key={left} className="absolute top-0 -translate-x-1/2" style={{ left: `${left}%` }}>
                {/* soft halo pulse as a node switches on */}
                {on && !reduce && (
                  <motion.span
                    className="absolute left-1/2 top-[9px] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{ backgroundColor: colorFor(i) }}
                    initial={{ scale: 1, opacity: 0.45 }}
                    animate={{ scale: 2.6, opacity: 0 }}
                    transition={{ duration: 0.9, ease: 'easeOut' }}
                  />
                )}
                {isLast && on ? (
                  <span className="block translate-x-[2px]">
                    <MissionSeal size={20} color={GREEN} />
                  </span>
                ) : (
                  <span
                    className="relative block h-3.5 w-3.5 translate-y-[2px] rounded-full transition-all duration-500"
                    style={{
                      backgroundColor: on ? colorFor(i) : '#F3EFE6',
                      border: on ? 'none' : '1.5px solid #D3CABA',
                      boxShadow: on ? `0 0 0 4px ${colorFor(i)}1F` : 'none',
                    }}
                  />
                )}
              </span>
            )
          })}
        </div>

        {/* Columns — one continuous surface split by hairlines */}
        <div className="mt-7 grid gap-y-9 md:grid-cols-4 md:gap-y-0 md:divide-x md:divide-[#E1D9C9]">
          {t.cols.map((c, i) => {
            const on = active > i
            const accent = colorFor(i)
            return (
              <motion.div
                key={c.n}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={on ? { opacity: 1, y: 0 } : reduce ? { opacity: 1 } : { opacity: 0.32, y: 0 }}
                transition={{ duration: 0.55, ease }}
                className="group relative pl-6 md:px-7 md:first:pl-0 lg:md:px-8"
              >
                {/* Mobile: short vertical thread accent on the left of each block */}
                <span
                  aria-hidden
                  className="absolute left-0 top-1 h-full w-px transition-colors duration-500 md:hidden"
                  style={{ backgroundColor: on ? accent : '#DcD4C4' }}
                />
                <span
                  aria-hidden
                  className="absolute left-[-3px] top-1 h-[9px] w-[9px] rounded-full transition-all duration-500 md:hidden"
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
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: on ? accent : '#8A8073' }} />
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
