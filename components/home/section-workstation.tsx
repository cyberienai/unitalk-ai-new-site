'use client'

import { motion } from 'framer-motion'
import { Server, Mail, Calendar, Terminal, Globe, FolderOpen } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { Kicker } from './section-kicker'

const ease = [0.22, 1, 0.36, 1] as const

type Tile = { icon: typeof Server; title: string; desc: string }

const T: Record<Lang, {
  kicker: string
  title: string
  subtitle: string
  tiles: Tile[]
}> = {
  fr: {
    kicker: 'Son environnement',
    title: 'Son propre poste de travail',
    subtitle:
      'Un Collaborateur IA n’est pas un chatbot. Il dispose d’un vrai poste de travail pour agir par lui-même, en toute autonomie.',
    tiles: [
      { icon: Server, title: 'Serveur privé', desc: 'Un espace de travail cloud dédié, isolé et sécurisé, rien que pour lui.' },
      { icon: Mail, title: 'Email professionnel', desc: 'Sa propre adresse pour écrire, répondre et suivre ses échanges.' },
      { icon: Calendar, title: 'Calendrier', desc: 'Il planifie, organise et prépare vos rendez-vous.' },
      { icon: Terminal, title: 'Exécution de code', desc: 'Il écrit et exécute du code pour accomplir ses tâches concrètement.' },
      { icon: Globe, title: 'Navigation web', desc: 'Il navigue sur internet pour chercher, vérifier et collecter l’information.' },
      { icon: FolderOpen, title: 'Fichiers & documents', desc: 'Il lit, produit et classe ses fichiers comme n’importe quel collègue.' },
    ],
  },
  en: {
    kicker: 'Its environment',
    title: 'Its own workstation',
    subtitle:
      'An AI Collaborator is not a chatbot. It has a real workstation to act on its own, fully autonomously.',
    tiles: [
      { icon: Server, title: 'Private server', desc: 'A dedicated, isolated and secure cloud workspace, just for it.' },
      { icon: Mail, title: 'Work email', desc: 'Its own address to write, reply and follow up on its exchanges.' },
      { icon: Calendar, title: 'Calendar', desc: 'It schedules, organizes and prepares your meetings.' },
      { icon: Terminal, title: 'Code execution', desc: 'It writes and runs code to get its tasks done for real.' },
      { icon: Globe, title: 'Web browsing', desc: 'It browses the web to search, verify and gather information.' },
      { icon: FolderOpen, title: 'Files & documents', desc: 'It reads, produces and organizes its files like any colleague.' },
    ],
  },
}

export function SectionWorkstation({ lang }: { lang: Lang }) {
  const t = T[lang]

  return (
    <section className="border-t border-[#2A2723] bg-[#1C1A17] px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="flex justify-center">
            <Kicker dark>{t.kicker}</Kicker>
          </div>
          <h2 className="mt-3 text-balance font-sf text-3xl font-bold tracking-[-0.02em] text-[#F3EFE6] sm:text-4xl lg:text-[2.75rem]">
            {t.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-[#B8B0A4]">
            {t.subtitle}
          </p>
        </motion.header>

        <ul className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.tiles.map((tile, i) => {
            const Icon = tile.icon
            return (
              <motion.li
                key={tile.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease, delay: 0.06 * i }}
                className="group rounded-2xl border border-[#2E2A25] bg-[#232019] p-6 transition-colors hover:border-[#D10E63]/50"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D10E63]/15 text-[#E8A0BF] transition-colors group-hover:bg-[#D10E63]/25">
                  <Icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-sf text-lg font-bold tracking-[-0.01em] text-[#F3EFE6]">
                  {tile.title}
                </h3>
                <p className="mt-1.5 text-pretty text-sm leading-relaxed text-[#A69E92]">
                  {tile.desc}
                </p>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
