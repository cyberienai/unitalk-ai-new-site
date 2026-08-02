'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { collaboratorHref } from '@/lib/collaborators-catalog'
import { Kicker } from '@/components/home/section-kicker'

type Node = { human: string; humanRole: string; ai: string; aiRole: string; slug: string; avatar: string }

const T = {
  fr: {
    kicker: 'Votre équipe',
    title: 'Des humains et des Collaborateurs IA travaillent ensemble.',
    lead: 'Chaque collaborateur possède son propre Collaborateur IA. Ils partagent les mêmes informations, les mêmes outils et les mêmes objectifs.',
    share: 'Informations, outils et objectifs partagés',
    cta: 'Construire mon équipe',
    nodes: [
      { human: 'Patrick', humanRole: 'Direction', ai: 'Emma', aiRole: 'Assistante de direction IA', slug: 'emma', avatar: '/images/emma-avatar.png' },
      { human: 'Sophie', humanRole: 'Marketing', ai: 'Léa', aiRole: 'Créatrice de contenu IA', slug: 'lea', avatar: '/images/lea-avatar.png' },
      { human: 'Claire', humanRole: 'Ventes', ai: 'Hugo', aiRole: 'Commercial IA', slug: 'hugo', avatar: '/images/hugo-avatar.png' },
      { human: 'Marc', humanRole: 'Relation client', ai: 'Inès', aiRole: 'Support client IA', slug: 'ines', avatar: '/images/ines-avatar.png' },
    ] as Node[],
  },
  en: {
    kicker: 'Your team',
    title: 'Humans and AI Collaborators work together.',
    lead: 'Every teammate has their own AI Collaborator. They share the same information, the same tools and the same goals.',
    share: 'Shared information, tools and goals',
    cta: 'Build my team',
    nodes: [
      { human: 'Patrick', humanRole: 'Leadership', ai: 'Emma', aiRole: 'AI Executive Assistant', slug: 'emma', avatar: '/images/emma-avatar.png' },
      { human: 'Sophie', humanRole: 'Marketing', ai: 'Léa', aiRole: 'AI Content Strategist', slug: 'lea', avatar: '/images/lea-avatar.png' },
      { human: 'Claire', humanRole: 'Sales', ai: 'Hugo', aiRole: 'AI Sales Rep', slug: 'hugo', avatar: '/images/hugo-avatar.png' },
      { human: 'Marc', humanRole: 'Customer Relations', ai: 'Inès', aiRole: 'AI Customer Support', slug: 'ines', avatar: '/images/ines-avatar.png' },
    ] as Node[],
  },
} as const

export function SectionTeam({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = T[lang]

  return (
    <section className="bg-[#F3EFE6] py-20 sm:py-28">
      <div className="editorial-shell">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Kicker>{t.kicker}</Kicker>
          </div>
          <h2 className="mt-4 text-balance font-sf text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-[#1C1A17]">
            {t.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-7 text-[#5F594F]">{t.lead}</p>
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          <div className="flex flex-col gap-4">
            {t.nodes.map((node, i) => (
              <motion.div
                key={node.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-5"
              >
                {/* Human */}
                <div className="rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-4">
                  <p className="font-sf text-base font-bold text-[#1C1A17]">{node.human}</p>
                  <p className="text-[13px] text-[#6E665A]">{node.humanRole}</p>
                </div>

                {/* Animated link */}
                <div className="flex w-10 items-center sm:w-16" aria-hidden="true">
                  <span className="h-px flex-1 bg-[#D10E63]/30" />
                  <motion.span
                    initial={{ scale: 0.6, opacity: 0.4 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                    className="h-2 w-2 rounded-full bg-[#D10E63]"
                  />
                  <span className="h-px flex-1 bg-[#D10E63]/30" />
                </div>

                {/* AI Collaborator */}
                <Link
                  href={collaboratorHref(node.slug)}
                  className="flex items-center gap-3 rounded-2xl border border-[#D10E63]/25 bg-[#D10E63]/[0.05] p-4 transition-colors hover:border-[#D10E63]/50 hover:bg-[#D10E63]/[0.09]"
                >
                  <div className="relative shrink-0">
                    <img src={node.avatar || '/placeholder.svg'} alt="" className="h-10 w-10 rounded-full object-cover" />
                    <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5" aria-hidden="true">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D10E63] opacity-60 motion-reduce:hidden" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full border-2 border-[#FBF9F3] bg-[#D10E63]" />
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-sf text-base font-bold text-[#1C1A17]">{node.ai}</p>
                    <p className="truncate text-[13px] font-medium text-[#A80B50]">{node.aiRole}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <p className="mt-8 text-center font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#857C6E]">
            {t.share}
          </p>

          <div className="mt-8 flex justify-center">
            <Link
              href="/team"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#1C1A17] px-7 text-sm font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5"
            >
              {t.cta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
