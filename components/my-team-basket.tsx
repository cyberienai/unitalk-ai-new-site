'use client'

import { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronDown, Users, X } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { useMyTeam } from '@/lib/my-team-context'

export function MyTeamBasket() {
  const { lang } = useLanguage()
  const { members, count, remove, clear } = useMyTeam()
  const [open, setOpen] = useState(false)

  const t = {
    fr: {
      label: 'Mon équipe',
      empty: 'Aucun Collaborateur',
      member: 'Collaborateur',
      members: 'Collaborateurs',
      activate: 'Activer mon équipe',
      clear: 'Vider',
      close: 'Réduire',
    },
    en: {
      label: 'My team',
      empty: 'No Collaborator',
      member: 'Collaborator',
      members: 'Collaborators',
      activate: 'Activate my team',
      clear: 'Clear',
      close: 'Collapse',
    },
  }[lang]

  if (count === 0) return null

  return (
    <div className="fixed bottom-6 left-6 z-40 w-[calc(100vw-3rem)] max-w-sm">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="mb-3 overflow-hidden rounded-3xl border border-[#DcD4C4] bg-[#FBF9F3] shadow-[0_32px_96px_-24px_rgba(28,26,23,0.45)]"
          >
            <div className="flex items-center justify-between border-b border-[#E4DCCC] bg-[#F3EFE6] px-5 py-3.5">
              <p className="text-sm font-bold text-[#1C1A17]">
                {t.label}{' '}
                <span className="font-normal text-[#857C6E]">
                  · {count} {count > 1 ? t.members : t.member}
                </span>
              </p>
              <button
                onClick={() => setOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-full text-[#857C6E] transition-colors hover:bg-[#E4DCCC] hover:text-[#1C1A17]"
                aria-label={t.close}
              >
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>

            <ul className="max-h-64 overflow-y-auto px-3 py-3">
              {members.map((m) => (
                <li key={m.slug} className="flex items-center gap-3 rounded-2xl px-2 py-2 hover:bg-[#F3EFE6]">
                  <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-1 ring-[#D10E63]/20">
                    <Image src={m.avatar || '/placeholder.svg'} alt={m.name} fill className="object-cover" sizes="36px" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-[#1C1A17]">{m.name}</span>
                    <span className="block truncate text-xs text-[#857C6E]">{m.role}</span>
                  </span>
                  <button
                    onClick={() => remove(m.slug)}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[#857C6E] transition-colors hover:bg-[#EAE3D4] hover:text-[#D10E63]"
                    aria-label={`${t.clear} ${m.name}`}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3 border-t border-[#E4DCCC] bg-[#F3EFE6] px-4 py-3">
              <button
                onClick={clear}
                className="text-xs font-semibold text-[#857C6E] transition-colors hover:text-[#1C1A17]"
              >
                {t.clear}
              </button>
              <a
                href="/signup"
                className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-[#D10E63] px-4 py-2.5 text-sm font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5"
              >
                {t.activate}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((v) => !v)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="inline-flex items-center gap-2.5 rounded-full border border-[#D10E63]/30 bg-[#1C1A17] py-3 pl-4 pr-5 text-sm font-bold text-[#FBF9F3] shadow-[0_12px_32px_-8px_rgba(28,26,23,0.45)] transition-transform hover:scale-[1.03]"
      >
        <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-[#D10E63]">
          <Users className="h-3.5 w-3.5" />
        </span>
        {t.label}
        <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#FBF9F3] px-1.5 text-xs font-bold text-[#1C1A17]">
          {count}
        </span>
      </motion.button>
    </div>
  )
}
