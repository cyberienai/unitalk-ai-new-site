'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Check, Plus, Star, UserRound } from 'lucide-react'
import { useT, type Lang } from '@/lib/language-context'
import { ROLE_DETAILS, type Bilingual } from '@/lib/collaborators-catalog'
import { useMyTeam } from '@/lib/my-team-context'

// Ordre d'affichage du catalogue + accroche courte (mission-phare) par Collaborateur IA
const SHOWCASE: { slug: string; tagline: Bilingual }[] = [
  { slug: 'emma', tagline: { fr: 'Prépare vos réunions', en: 'Prepares your meetings' } },
  { slug: 'hugo', tagline: { fr: 'Qualifie vos prospects', en: 'Qualifies your leads' } },
  { slug: 'ines', tagline: { fr: 'Répond à vos clients', en: 'Answers your customers' } },
  { slug: 'lea', tagline: { fr: 'Crée vos contenus', en: 'Creates your content' } },
  { slug: 'arthur', tagline: { fr: 'Corrige vos bugs', en: 'Fixes your bugs' } },
  { slug: 'nadia', tagline: { fr: 'Analyse vos finances', en: 'Analyzes your finances' } },
]

export function CollaboratorsShowcase({ lang }: { lang: Lang }) {
  const t = useT({
    fr: {
      eyebrow: 'Les Collaborateurs IA',
      title: 'Découvrez nos Collaborateurs IA',
      subtitle:
        "Ce ne sont pas des robots anonymes. Chacun a une identité, un métier et une mission — prêt à rejoindre votre équipe.",
      available: 'Disponible',
      profile: 'Voir le profil',
      add: 'Ajouter à mon équipe',
      added: 'Ajouté à mon équipe',
      allCta: 'Voir tous les Collaborateurs IA',
    },
    en: {
      eyebrow: 'The AI Collaborators',
      title: 'Meet our AI Collaborators',
      subtitle:
        'These are not anonymous bots. Each has an identity, a job and a mission — ready to join your team.',
      available: 'Available',
      profile: 'View profile',
      add: 'Add to my team',
      added: 'Added to my team',
      allCta: 'See all AI Collaborators',
    },
  })

  return (
    <section className="w-full bg-[#FBF9F3] py-20 sm:py-28">
      <div className="editorial-shell">
        <header className="mx-auto max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D10E63]"
          >
            {t.eyebrow}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="text-balance font-sf text-3xl font-bold leading-[1.05] tracking-[-0.035em] text-[#1C1A17] sm:text-4xl lg:text-[2.75rem]"
          >
            {t.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-[#5F594F]"
          >
            {t.subtitle}
          </motion.p>
        </header>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SHOWCASE.map(({ slug, tagline }, index) => {
            const ai = ROLE_DETAILS[slug]
            if (!ai) return null
            return (
              <ShowcaseCard
                key={slug}
                slug={slug}
                name={ai.name}
                avatar={ai.avatar}
                role={ai.role[lang]}
                department={ai.department[lang]}
                tagline={tagline[lang]}
                labels={t}
                index={index}
              />
            )
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/collaborateurs-ia/roles"
            className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-[#DDD5CA] bg-[#FBF9F3] px-6 text-sm font-semibold text-[#4E483F] transition-colors hover:border-[#1C1A17] hover:text-[#1C1A17]"
          >
            {t.allCta}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

function ShowcaseCard({
  slug,
  name,
  avatar,
  role,
  department,
  tagline,
  labels,
  index,
}: {
  slug: string
  name: string
  avatar: string
  role: string
  department: string
  tagline: string
  labels: Record<string, string>
  index: number
}) {
  const { has, toggle } = useMyTeam()
  const inTeam = has(slug)

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: Math.min(index, 5) * 0.07 }}
      className="group flex flex-col rounded-3xl border border-[#E4DCCF] bg-[#F3EFE6] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#D10E63]/30 hover:shadow-[0_24px_60px_rgba(28,26,23,0.10)]"
    >
      {/* Header: avatar + availability */}
      <div className="flex items-start justify-between">
        <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-[#1C1A17]/[0.08]">
          <Image
            src={avatar || '/placeholder.svg'}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="64px"
          />
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FBF9F3] px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#4E7C59]">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:hidden" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          {labels.available}
        </span>
      </div>

      {/* Identity */}
      <div className="mt-5">
        <h3 className="font-sf text-xl font-bold tracking-[-0.02em] text-[#1C1A17]">{name}</h3>
        <p className="mt-0.5 text-sm text-[#6B6560]">
          {role} <span className="text-[#A09789]">· {department}</span>
        </p>
      </div>

      {/* Rating */}
      <div className="mt-3 flex items-center gap-1.5" aria-label="5 / 5">
        <span className="flex" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-[#D10E63] text-[#D10E63]" />
          ))}
        </span>
        <span className="font-mono text-[11px] font-semibold text-[#857C6E]">5.0</span>
      </div>

      {/* Mission-phare */}
      <p className="mt-4 border-l-2 border-[#D10E63]/30 pl-3 text-pretty text-[15px] italic leading-relaxed text-[#4E483F]">
        &ldquo;{tagline}&rdquo;
      </p>

      {/* Actions */}
      <div className="mt-6 flex items-center gap-2">
        <Link
          href={`/@${slug}`}
          className="inline-flex min-h-10 flex-1 items-center justify-center gap-1.5 rounded-full border border-[#DDD5CA] text-sm font-semibold text-[#4E483F] transition-colors hover:border-[#1C1A17] hover:text-[#1C1A17]"
        >
          <UserRound className="h-4 w-4" />
          {labels.profile}
        </Link>
        <button
          type="button"
          onClick={() => toggle({ slug, name, role, avatar })}
          aria-pressed={inTeam}
          aria-label={inTeam ? labels.added : labels.add}
          title={inTeam ? labels.added : labels.add}
          className={`inline-flex min-h-10 shrink-0 items-center justify-center gap-1.5 rounded-full px-4 text-sm font-bold transition-colors ${
            inTeam
              ? 'bg-[#1C1A17] text-[#FBF9F3]'
              : 'border border-[#D10E63]/40 text-[#D10E63] hover:bg-[#D10E63]/[0.06]'
          }`}
        >
          {inTeam ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </button>
      </div>
    </motion.article>
  )
}
