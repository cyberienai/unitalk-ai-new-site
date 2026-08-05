'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Globe } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { Kicker } from '@/components/home/section-kicker'
import { CtaButton } from '@/components/ui/cta-button'

const ease = [0.22, 1, 0.36, 1] as const

const T = {
  fr: {
    eyebrow: 'Commencez par votre site web',
    title: 'Commencez par le site Web de votre entreprise',
    subtitle:
      'Indiquez votre adresse et Alma s’occupe du reste. Elle analyse votre activité, comprend vos objectifs et recrute les Collaborateurs IA qui vous correspondent.',
    placeholder: 'www.votre-entreprise.com',
    cta: 'Analyser mon site',
    inputLabel: 'Adresse de votre site web',
    listLabel: 'À partir de votre site, Alma peut déjà :',
    items: [
      'analyser votre activité et vos offres',
      'préparer votre workspace',
      'recommander vos premiers Collaborateurs IA',
    ],
    footer: 'Vous n’avez rien à configurer.',
    alt: 'Vous n’avez pas encore de site ?',
    altCta: 'Parler directement avec Alma',
  },
  en: {
    eyebrow: 'Start with your website',
    title: 'Start with your company website',
    subtitle:
      'Enter your address and Alma takes care of the rest. She analyzes your business, understands your goals, and hires the AI Collaborators that fit you.',
    placeholder: 'www.your-company.com',
    cta: 'Analyze my website',
    inputLabel: 'Your website address',
    listLabel: 'From your website, Alma can already:',
    items: [
      'analyze your business and offerings',
      'prepare your workspace',
      'recommend your first AI Collaborators',
    ],
    footer: 'There is nothing to configure.',
    alt: 'No website yet?',
    altCta: 'Talk directly with Alma',
  },
} as const

export function SectionStartWebsite({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = T[lang]
  const router = useRouter()
  const [url, setUrl] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = url.trim()
    router.push(trimmed ? `/decouvrir?site=${encodeURIComponent(trimmed)}` : '/decouvrir')
  }

  return (
    <section id="commencer" className="scroll-mt-20 border-t border-[#E9E2D4] bg-[#F3EFE6] py-24 sm:py-32">
      <div className="editorial-shell">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="mb-4 flex justify-center">
            <Kicker>{t.eyebrow}</Kicker>
          </div>
          <h2 className="text-balance font-sf text-3xl font-bold leading-[1.05] tracking-[-0.035em] text-[#1C1A17] sm:text-4xl lg:text-[2.75rem]">
            {t.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-[#5F594F]">{t.subtitle}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.12, ease }}
          className="mx-auto mt-10 max-w-xl"
        >
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 rounded-[1.5rem] border border-[#E4DCCF] bg-[#FBF9F3] p-3 sm:flex-row sm:items-center sm:rounded-full sm:p-2 sm:pl-5"
          >
            <label htmlFor="company-site" className="sr-only">
              {t.inputLabel}
            </label>
            <span className="flex flex-1 items-center gap-2.5 px-3 sm:px-0">
              <Globe className="h-5 w-5 shrink-0 text-[#8A8175]" aria-hidden="true" />
              <input
                id="company-site"
                type="text"
                inputMode="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={t.placeholder}
                className="w-full bg-transparent py-2.5 font-mono text-[14px] text-[#1C1A17] placeholder:text-[#A69C8C] focus:outline-none"
              />
            </span>
            <CtaButton type="submit">
              {t.cta}
              <ArrowRight className="h-4 w-4" />
            </CtaButton>
          </form>

          <div className="mt-8 rounded-[1.5rem] border border-[#E4DCCF] bg-[#FBF9F3] p-6">
            <p className="text-[12px] font-semibold text-[#3F3A33]">{t.listLabel}</p>
            <ul className="mt-3 flex flex-col gap-2">
              {t.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[14px] leading-snug text-[#5F594F]">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D10E63]/60" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[12px] italic leading-snug text-[#8A8175]">{t.footer}</p>
          </div>

          <p className="mt-6 text-center text-[13px] text-[#5F594F]">
            {t.alt}{' '}
            <Link
              href="/decouvrir"
              className="font-bold text-[#D10E63] underline-offset-4 hover:underline"
            >
              {t.altCta}
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
