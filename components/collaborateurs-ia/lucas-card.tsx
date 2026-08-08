'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { Check, Plus } from 'lucide-react'

/**
 * Reusable "product fiche" primitives for the Collaborateurs IA page.
 * The whole page treats Lucas as a single product object whose metadata
 * visibly evolves, so these cards are the recurring visual language:
 * label (muted) + value + optional status pill, in a Linear-like density.
 */

export type Tone = 'neutral' | 'active' | 'added' | 'pending' | 'owner'

const TONE_LIGHT: Record<Tone, string> = {
  neutral: 'text-[#6B6459]',
  active: 'text-[#1C8A5B]',
  added: 'text-[#B00C54]',
  pending: 'text-[#9A6B1E]',
  owner: 'text-[#1C1A17]',
}

const TONE_DARK: Record<Tone, string> = {
  neutral: 'text-[#B8B0A4]',
  active: 'text-[#5FD3A0]',
  added: 'text-[#F2BCD3]',
  pending: 'text-[#E4B96B]',
  owner: 'text-[#F4F1EA]',
}

const DOT: Record<Tone, string> = {
  neutral: 'bg-[#C7BDAC]',
  active: 'bg-[#22A06B]',
  added: 'bg-[#D10E63]',
  pending: 'bg-[#C68A2E]',
  owner: 'bg-[#1C1A17]',
}

export type SpecRow = {
  label: string
  value?: string
  status?: string
  tone?: Tone
  /** Marks the row as freshly added — shows a subtle magenta highlight + icon. */
  added?: boolean
}

export function StatusPill({ label, tone = 'neutral', dark = false }: { label: string; tone?: Tone; dark?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-[13px] font-medium ${dark ? TONE_DARK[tone] : TONE_LIGHT[tone]}`}>
      <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${DOT[tone]}`} />
      {label}
    </span>
  )
}

export function MetaRow({ row, dark = false }: { row: SpecRow; dark?: boolean }) {
  const labelColor = dark ? 'text-[#8E877C]' : 'text-[#938A7C]'
  const valueColor = dark ? 'text-[#F4F1EA]' : 'text-[#1C1A17]'
  return (
    <div
      className={`flex items-center justify-between gap-4 rounded-lg px-3 py-2 transition-colors ${
        row.added ? (dark ? 'bg-[#D10E63]/15' : 'bg-[#D10E63]/[0.06]') : ''
      }`}
    >
      <span className={`flex items-center gap-2 text-[13px] ${labelColor}`}>
        {row.added && <Plus aria-hidden className="h-3.5 w-3.5 text-[#D10E63]" />}
        {row.label}
      </span>
      {row.status ? (
        <StatusPill label={row.status} tone={row.tone ?? 'neutral'} dark={dark} />
      ) : (
        <span className={`text-right text-[13px] font-medium ${valueColor}`}>{row.value}</span>
      )}
    </div>
  )
}

/**
 * Generic labelled spec card (used for the mission brief, the compétence
 * asset, Alma's checks, etc). A small eyebrow, an optional title, then rows.
 */
export function SpecCard({
  eyebrow,
  title,
  rows,
  footer,
  dark = false,
  accent = false,
  className = '',
}: {
  eyebrow?: string
  title?: string
  rows: SpecRow[]
  footer?: React.ReactNode
  dark?: boolean
  accent?: boolean
  className?: string
}) {
  const base = dark
    ? 'border-white/10 bg-[#211E1B]'
    : 'border-[#E4DDCE] bg-[#FBF9F3]'
  return (
    <div className={`rounded-2xl border ${base} ${accent ? 'ring-1 ring-[#D10E63]/30' : ''} p-5 ${className}`}>
      {eyebrow && (
        <p className={`font-mono text-[10px] font-bold uppercase tracking-[0.18em] ${dark ? 'text-[#8E877C]' : 'text-[#A89C88]'}`}>
          {eyebrow}
        </p>
      )}
      {title && (
        <p className={`mt-1.5 text-[15px] font-semibold tracking-[-0.01em] ${dark ? 'text-[#F4F1EA]' : 'text-[#1C1A17]'}`}>
          {title}
        </p>
      )}
      <div className={`${eyebrow || title ? 'mt-3' : ''} flex flex-col gap-0.5`}>
        {rows.map((row, i) => (
          <MetaRow key={`${row.label}-${i}`} row={row} dark={dark} />
        ))}
      </div>
      {footer && <div className="mt-3">{footer}</div>}
    </div>
  )
}

/**
 * The Lucas identity fiche: avatar header (name + role + AI-nature made
 * explicit) plus grouped metadata rows. Used in the hero and reused, in
 * evolving states, across the page.
 */
export function LucasCard({
  role,
  aiLabel,
  rows,
  dark = false,
  animate = true,
}: {
  role: string
  aiLabel: string
  rows: SpecRow[]
  dark?: boolean
  animate?: boolean
}) {
  const reduce = useReducedMotion()
  const shell = dark ? 'border-white/10 bg-[#1C1A17]' : 'border-[#E4DDCE] bg-[#FBF9F3]'
  const headBorder = dark ? 'border-white/10' : 'border-[#EDE6D9]'

  return (
    <motion.div
      initial={animate && !reduce ? { opacity: 0, y: 18 } : false}
      whileInView={animate && !reduce ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      className={`w-full max-w-sm rounded-3xl border ${shell} p-5 shadow-[0_24px_60px_-30px_rgba(28,26,23,0.4)]`}
    >
      <div className={`flex items-center gap-3 border-b ${headBorder} pb-4`}>
        <Image
          src="/images/lucas-avatar.png"
          alt="Lucas"
          width={52}
          height={52}
          className="h-[52px] w-[52px] rounded-full object-cover ring-2 ring-[#D10E63]/20"
        />
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className={`text-[17px] font-semibold tracking-[-0.01em] ${dark ? 'text-[#F4F1EA]' : 'text-[#1C1A17]'}`}>Lucas</p>
            <span className="inline-flex items-center rounded-full border border-[#D10E63]/30 bg-[#D10E63]/[0.08] px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[#B00C54]">
              {aiLabel}
            </span>
          </div>
          <p className={`truncate text-[13px] ${dark ? 'text-[#B8B0A4]' : 'text-[#6B6459]'}`}>{role}</p>
        </div>
      </div>
      <div className="mt-3 flex flex-col gap-0.5">
        {rows.map((row, i) => (
          <MetaRow key={`${row.label}-${i}`} row={row} dark={dark} />
        ))}
      </div>
    </motion.div>
  )
}

/** Small inline conclusion line ("Même Lucas. Une compétence de plus."). */
export function Conclusion({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p className={`flex items-start gap-2 text-[15px] font-medium leading-relaxed ${dark ? 'text-[#F4F1EA]' : 'text-[#1C1A17]'}`}>
      <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-[#22A06B]" />
      <span className="text-pretty">{children}</span>
    </p>
  )
}
