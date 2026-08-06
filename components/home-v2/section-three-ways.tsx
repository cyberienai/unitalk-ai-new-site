'use client'

import { useId, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, Globe, Target, UserRound } from 'lucide-react'
import { Kicker } from '@/components/home/section-kicker'

const ease = [0.22, 1, 0.36, 1] as const

const T = {
  fr: {
    eyebrow: 'Alma prépare le reste',
    title: 'Commencez par ce que vous savez déjà.',
    subtitle:
      'Votre entreprise, une mission ou un profil métier : choisissez votre point de départ. Alma prépare le Collaborateur IA qu’il vous faut.',
    company: {
      badge: 'Recommandé',
      label: 'À partir de votre entreprise',
      desc: 'Indiquez votre domaine. Alma analyse votre activité et prépare les premières missions adaptées à vos priorités.',
      fieldLabel: 'Nom de domaine de votre entreprise',
      placeholder: 'votreentreprise.fr',
      cta: 'Analyser mon entreprise',
      demo: 'Démonstration',
    },
    mission: {
      label: 'À partir d’une mission',
      desc: 'Choisissez un travail concret à confier. Alma réunit le profil métier et les compétences nécessaires.',
      cta: 'Explorer les missions',
      steps: ['Mission choisie', 'Compétences réunies', 'Prête à être confiée'],
    },
    profile: {
      label: 'À partir d’un profil métier',
      desc: 'Partez du savoir-faire dont votre entreprise a besoin. Alma l’adapte à votre activité et à votre première mission.',
      cta: 'Explorer les profils métier',
      roles: [
        'Commercial',
        'Marketing',
        'Assistance de direction',
        'Support client',
        'Ressources humaines',
        'Finance',
        'Direction',
      ],
    },
  },
  en: {
    eyebrow: 'Alma prepares the rest',
    title: 'Start with what you already know.',
    subtitle:
      'Your company, a mission or a job profile: choose your starting point. Alma prepares the AI Collaborator you need.',
    company: {
      badge: 'Recommended',
      label: 'From your company',
      desc: 'Enter your domain. Alma analyzes your activity and prepares the first missions matched to your priorities.',
      fieldLabel: 'Your company domain name',
      placeholder: 'yourcompany.com',
      cta: 'Analyze my company',
      demo: 'Demo',
    },
    mission: {
      label: 'From a mission',
      desc: 'Pick a concrete task to hand off. Alma gathers the job profile and the skills required.',
      cta: 'Explore missions',
      steps: ['Mission chosen', 'Skills gathered', 'Ready to hand off'],
    },
    profile: {
      label: 'From a job profile',
      desc: 'Start from the know-how your company needs. Alma adapts it to your activity and your first mission.',
      cta: 'Explore job profiles',
      roles: ['Sales', 'Marketing', 'Executive assistance', 'Customer support', 'Human resources', 'Finance', 'Leadership'],
    },
  },
} as const

/* Card 1 — Company. A real form: type a domain, submit to the Alma flow with the
   domain carried in the query so /decouvrir never re-asks it. The whole card is a
   click target too (clicking outside the field focuses it). */
type CompanyCopy = {
  badge: string
  label: string
  desc: string
  fieldLabel: string
  placeholder: string
  cta: string
  demo: string
}

function CompanyCard({ t }: { t: CompanyCopy }) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [domain, setDomain] = useState('')
  const fieldId = useId()

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const d = domain.trim()
    const qs = d ? `?entry=company&domain=${encodeURIComponent(d)}` : '?entry=company'
    router.push(`/decouvrir${qs}`)
  }

  // Convenience: clicking the card away from the field focuses the field.
  function onCardClick(e: React.MouseEvent) {
    if ((e.target as HTMLElement).closest('input, button, a')) return
    inputRef.current?.focus()
  }

  return (
    <form
      onSubmit={onSubmit}
      onClick={onCardClick}
      className="group relative flex h-full flex-col rounded-[1.5rem] border border-[#D10E63]/45 bg-[#F3EFE6] p-6 shadow-[0_18px_44px_-28px_rgba(209,14,99,0.5)] transition-all duration-200 hover:-translate-y-1 hover:border-[#D10E63]/70 hover:shadow-[0_30px_72px_-30px_rgba(28,26,23,0.66)]"
    >
      <span className="absolute right-6 top-6 rounded-full bg-[#D10E63] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-white">
        {t.badge}
      </span>
      <span
        className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D10E63]/[0.1] text-[#D10E63] transition-transform duration-200 group-hover:scale-[1.04] motion-reduce:group-hover:scale-100"
        aria-hidden="true"
      >
        <Globe className="h-6 w-6" strokeWidth={2} />
      </span>
      <h3 className="mt-4 font-sf text-lg font-bold tracking-[-0.02em] text-[#1C1A17]">{t.label}</h3>
      <p className="mt-2 text-[14px] leading-relaxed text-[#5A544A] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden">
        {t.desc}
      </p>

      <div className="mt-4 flex flex-1 flex-col justify-end">
        <label htmlFor={fieldId} className="sr-only">
          {t.fieldLabel}
        </label>
        <input
          id={fieldId}
          ref={inputRef}
          type="text"
          inputMode="url"
          autoComplete="off"
          spellCheck={false}
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder={t.placeholder}
          className="h-11 w-full rounded-xl border border-[#DcD4C4] bg-[#FDFCF9] px-3.5 text-sm text-[#1C1A17] outline-none transition-colors placeholder:text-[#B7B0A4] focus:border-[#D10E63] focus-visible:ring-2 focus-visible:ring-[#D10E63]/40"
        />
        <span className="mt-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#B7B0A4]">{t.demo}</span>
      </div>

      <button
        type="submit"
        className="mt-4 inline-flex h-11 items-center justify-center gap-1.5 rounded-full bg-[#D10E63] px-5 text-sm font-bold text-white transition-colors hover:bg-[#AD0C53] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F3EFE6]"
      >
        {t.cta}
        <ArrowRight
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
          aria-hidden="true"
        />
      </button>
    </form>
  )
}

/* Mission preview — a 3-step checklist that ticks off on hover, staggered.
   Sans-serif throughout (no monospace). Decorative → hidden from AT. */
function MissionPreview({ steps }: { steps: readonly string[] }) {
  return (
    <div
      className="mt-3 flex flex-1 flex-col justify-center gap-2 rounded-xl border border-[#E4DCCF] bg-[#FDFCF9] p-3"
      aria-hidden="true"
    >
      {steps.map((step, idx) => (
        <div key={step} className="flex items-center gap-2">
          <span
            className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-[#D8D0C2] text-transparent transition-colors duration-300 group-hover:border-[#D10E63] group-hover:bg-[#D10E63] group-hover:text-white motion-reduce:border-[#D10E63] motion-reduce:bg-[#D10E63] motion-reduce:text-white motion-reduce:transition-none"
            style={{ transitionDelay: `${idx * 160}ms` }}
          >
            <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
          </span>
          <span className="text-[12px] font-medium text-[#5A544A]">{step}</span>
        </div>
      ))}
    </div>
  )
}

/* Job-profile preview — example role chips. Sans-serif. Decorative → hidden. */
function ProfilePreview({ roles }: { roles: readonly string[] }) {
  return (
    <div className="mt-3 flex flex-1 items-center" aria-hidden="true">
      <ul className="flex flex-wrap content-center gap-1.5">
        {roles.map((role, idx) => (
          <li
            key={role}
            className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-colors duration-300 motion-reduce:transition-none ${
              idx === 0
                ? 'border-[#D10E63]/30 bg-[#F5E1EA] text-[#AD0C53]'
                : 'border-[#E4DCCF] bg-[#FBF9F3] text-[#5A544A] group-hover:border-[#D10E63]/25'
            }`}
          >
            {role}
          </li>
        ))}
      </ul>
    </div>
  )
}

/* Cards 2 & 3 — whole-card Link. Single link, so the CTA text is not announced
   as a separate control. */
function LinkCard({
  href,
  icon: Icon,
  label,
  desc,
  cta,
  children,
}: {
  href: string
  icon: typeof Target
  label: string
  desc: string
  cta: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="group relative flex h-full flex-col rounded-[1.5rem] border border-[#E4DCCF] bg-[#F3EFE6] p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[#D10E63]/45 hover:shadow-[0_30px_72px_-30px_rgba(28,26,23,0.66)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/45"
    >
      <span
        className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D10E63]/[0.1] text-[#D10E63] transition-transform duration-200 group-hover:scale-[1.04] motion-reduce:group-hover:scale-100"
        aria-hidden="true"
      >
        <Icon className="h-6 w-6" strokeWidth={2} />
      </span>
      <h3 className="mt-4 font-sf text-lg font-bold tracking-[-0.02em] text-[#1C1A17]">{label}</h3>
      <p className="mt-2 text-[14px] leading-relaxed text-[#5A544A] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden">
        {desc}
      </p>

      {children}

      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#D10E63] transition-colors group-hover:text-[#AD0C53]">
        {cta}
        <ArrowRight
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
          aria-hidden="true"
        />
      </span>
    </Link>
  )
}

export function SectionThreeWays({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = T[lang]
  const reduceMotion = useReducedMotion()

  return (
    <section className="border-t border-[#E9E2D4] bg-[#FBF9F3] py-24 sm:py-32">
      <div className="editorial-shell">
        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="mb-4 flex justify-center">
            <Kicker>{t.eyebrow}</Kicker>
          </div>
          <h2 className="text-balance font-sf text-3xl font-bold leading-[1.05] tracking-[-0.035em] text-[#1C1A17] sm:text-4xl lg:text-[2.75rem]">
            {t.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-[#5F594F]">{t.subtitle}</p>
        </motion.header>

        <div className="mx-auto mt-12 grid max-w-5xl items-stretch gap-5 sm:mt-14 md:grid-cols-3">
          {[
            <CompanyCard key="company" t={t.company} />,
            <LinkCard
              key="mission"
              href="/missions"
              icon={Target}
              label={t.mission.label}
              desc={t.mission.desc}
              cta={t.mission.cta}
            >
              <MissionPreview steps={t.mission.steps} />
            </LinkCard>,
            <LinkCard
              key="profile"
              href="/store/profils-metier"
              icon={UserRound}
              label={t.profile.label}
              desc={t.profile.desc}
              cta={t.profile.cta}
            >
              <ProfilePreview roles={t.profile.roles} />
            </LinkCard>,
          ].map((card, i) => (
            <motion.div
              key={card.key}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, ease, delay: i * 0.1 }}
            >
              {card}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
