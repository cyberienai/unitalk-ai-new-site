'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, FileText, Globe, MessagesSquare, Users } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { Kicker } from '@/components/home/section-kicker'

const ease = [0.22, 1, 0.36, 1] as const

type FileId = 'soul' | 'user' | 'org'

const T = {
  fr: {
    eyebrow: 'Un contexte, pas un prompt',
    cta: 'Découvrir le contexte d’entreprise',
    title: 'Vos Collaborateurs partagent la même connaissance de votre entreprise.',
    subtitle:
      'Avant la première mission, Alma collecte vos informations publiques et vous pose quelques questions. De cet échange naît un contexte d’entreprise, lisible et modifiable, qui vous appartient. Chaque nouveau Collaborateur en hérite dès son premier jour.',
    points: [
      { icon: Globe, label: 'Construite à partir de vos informations publiques et de votre entretien avec Alma.' },
      { icon: MessagesSquare, label: 'Lisible et modifiable : vous gardez le contrôle de ce qu’elle contient.' },
      { icon: Users, label: 'Partagée par tous vos Collaborateurs IA, dès le premier jour.' },
    ],
    closing: 'Les modèles se louent. Ce contexte, lui, vous appartient.',
    panelTitle: 'Contexte d’entreprise',
    panelSub: 'Solvea',
    ownedBadge: 'Vous appartient',
    files: [
      { id: 'soul' as FileId, name: 'soul.md', human: 'Identité & valeurs' },
      { id: 'user' as FileId, name: 'user.md', human: 'Vos préférences' },
      { id: 'org' as FileId, name: 'organisation.md', human: 'Mémoire organisationnelle' },
    ],
    content: {
      soul: [
        { h: '# Identité', muted: false },
        { h: 'Éditeur de logiciel de gestion pour les PME françaises.', muted: true },
        { h: '## Ton', muted: false },
        { h: 'Clair, direct, sans jargon. Toujours en français.', muted: true },
        { h: '## Ce qui compte', muted: false },
        { h: 'La proximité client et la fiabilité du service.', muted: true },
      ],
      user: [
        { h: '# Vos préférences', muted: false },
        { h: 'Validation avant tout envoi externe.', muted: true },
        { h: 'Comptes-rendus synthétiques, une page maximum.', muted: true },
        { h: '## Interlocuteurs', muted: false },
        { h: 'Direction commerciale, puis équipe avant-vente.', muted: true },
      ],
      org: [
        { h: '# Mémoire organisationnelle', muted: false },
        { h: 'Clients : PME de 10 à 250 personnes.', muted: true },
        { h: 'Acquisition : demandes de démonstration.', muted: true },
        { h: '## Outils', muted: false },
        { h: 'CRM, agenda partagé, messagerie.', muted: true },
      ],
    } as Record<FileId, { h: string; muted: boolean }[]>,
  },
  en: {
    eyebrow: 'Context, not a prompt',
    cta: 'Explore company context',
    title: 'Your Collaborators share the same knowledge of your company.',
    subtitle:
      'Before the first mission, Alma gathers your public information and asks you a few questions. From that conversation comes a company context — readable, editable, and yours. Every new Collaborator inherits it from day one.',
    points: [
      { icon: Globe, label: 'Built from your public information and your conversation with Alma.' },
      { icon: MessagesSquare, label: 'Readable and editable: you stay in control of what it contains.' },
      { icon: Users, label: 'Shared by all your AI Collaborators, from day one.' },
    ],
    closing: 'Models are rented. This context is yours.',
    panelTitle: 'Company context',
    panelSub: 'Solvea',
    ownedBadge: 'Yours',
    files: [
      { id: 'soul' as FileId, name: 'soul.md', human: 'Identity & values' },
      { id: 'user' as FileId, name: 'user.md', human: 'Your preferences' },
      { id: 'org' as FileId, name: 'organisation.md', human: 'Organizational memory' },
    ],
    content: {
      soul: [
        { h: '# Identity', muted: false },
        { h: 'Business software vendor for French SMBs.', muted: true },
        { h: '## Tone', muted: false },
        { h: 'Clear, direct, no jargon. Always in French.', muted: true },
        { h: '## What matters', muted: false },
        { h: 'Customer closeness and service reliability.', muted: true },
      ],
      user: [
        { h: '# Your preferences', muted: false },
        { h: 'Validation before any external send.', muted: true },
        { h: 'Concise reports, one page maximum.', muted: true },
        { h: '## Contacts', muted: false },
        { h: 'Sales leadership, then pre-sales team.', muted: true },
      ],
      org: [
        { h: '# Organizational memory', muted: false },
        { h: 'Clients: SMBs of 10 to 250 people.', muted: true },
        { h: 'Acquisition: demo requests.', muted: true },
        { h: '## Tools', muted: false },
        { h: 'CRM, shared calendar, messaging.', muted: true },
      ],
    } as Record<FileId, { h: string; muted: boolean }[]>,
  },
} as const

export function SectionCompanyMemory({ lang }: { lang: Lang }) {
  const t = T[lang]
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState<FileId>('soul')
  const lines = t.content[active]

  return (
    <section className="relative overflow-hidden border-t border-[#E9E2D4] bg-[#F3EFE6] py-24 sm:py-32">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* Left — message */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease }}
        >
          <Kicker>{t.eyebrow}</Kicker>
          <h2
            className="mt-4 font-sf text-3xl font-bold leading-[1.08] tracking-[-0.03em] text-[#1C1A17] text-balance sm:text-4xl md:text-[2.7rem]"
          >
            {t.title}
          </h2>
          <p className="mt-5 max-w-md text-pretty text-[15px] leading-7 text-[#5F594F] sm:text-base">
            {t.subtitle}
          </p>

          <ul className="mt-8 flex flex-col gap-4">
            {t.points.map((p) => (
              <li key={p.label} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EFE7D8] text-[#B10A52]">
                  <p.icon className="h-4 w-4" />
                </span>
                <span className="text-sm leading-6 text-[#4E483F]">{p.label}</span>
              </li>
            ))}
          </ul>

          <p className="mt-8 border-l-2 border-[#D10E63] pl-4 font-sf text-lg font-semibold leading-snug tracking-[-0.01em] text-[#1C1A17] text-pretty">
            {t.closing}
          </p>

          <Link
            href="/workspace"
            className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#B10A52] transition-colors hover:text-[#8C0840] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F3EFE6]"
          >
            {t.cta}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        {/* Right — memory files preview */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
          className="relative"
        >
          {/* ambient glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-6 opacity-70"
            style={{ background: 'radial-gradient(60% 50% at 70% 10%, rgba(209,14,99,0.16), transparent 70%)' }}
          />

          <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#17130F] shadow-2xl">
            {/* panel header */}
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#D10E63]/20 text-[#F0658F]">
                  <FileText className="h-4 w-4" />
                </span>
                <div className="leading-tight">
                  <p className="text-sm font-semibold text-[#FBF9F3]">{t.panelTitle}</p>
                  <p className="text-[11px] text-[#9B9288]">{t.panelSub}</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#5FE38F]/12 px-2.5 py-1 text-[11px] font-semibold text-[#5FE38F]">
                <Check className="h-3 w-3" />
                {t.ownedBadge}
              </span>
            </div>

            {/* file tabs */}
            <div className="flex gap-1 border-b border-white/10 px-3 pt-3">
              {t.files.map((f) => {
                const isActive = active === f.id
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setActive(f.id)}
                    className={`relative rounded-t-lg px-3 py-2 text-left transition-colors ${
                      isActive ? 'bg-[#211B16]' : 'hover:bg-white/5'
                    }`}
                  >
                    <span
                      className={`block font-mono text-[12px] ${isActive ? 'text-[#F0658F]' : 'text-[#C9C0B4]'}`}
                    >
                      {f.name}
                    </span>
                    <span className="mt-0.5 block text-[10px] text-[#8A8175]">{f.human}</span>
                  </button>
                )
              })}
            </div>

            {/* file content */}
            <div className="min-h-[15rem] bg-[#211B16] px-5 py-5">
              <motion.div
                key={active}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease }}
                className="flex flex-col gap-2.5 font-mono text-[12.5px] leading-relaxed"
              >
                {lines.map((line, i) => {
                  const isHeading = line.h.startsWith('#')
                  return (
                    <div key={i} className="flex gap-3">
                      <span className="w-4 shrink-0 select-none text-right text-[#5A5248]">{i + 1}</span>
                      <span
                        className={
                          isHeading
                            ? 'font-semibold text-[#F0A6C2]'
                            : line.muted
                              ? 'text-[#C9C0B4]'
                              : 'text-[#FBF9F3]'
                        }
                      >
                        {line.h}
                      </span>
                    </div>
                  )
                })}
                {/* blinking cursor line */}
                <div className="flex gap-3">
                  <span className="w-4 shrink-0 select-none text-right text-[#5A5248]">
                    {lines.length + 1}
                  </span>
                  <span className="inline-block h-4 w-2 bg-[#F0658F]/80" aria-hidden="true" />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
