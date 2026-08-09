'use client'

import { useLanguage } from '@/lib/language-context'
import { Kicker } from '@/components/home/section-kicker'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

/**
 * Editorial closing section — three thought-leadership article cards that
 * develop Unitalk's category ("the IA-native company"), followed by a light,
 * non-intrusive newsletter banner. Content is static placeholder copy: there is
 * no /blog CMS yet, so the cards point to the future /blog destination.
 * Newsletter is visual only (no backend) — the form never submits.
 */
const COPY = {
  fr: {
    kicker: 'Idées',
    title: 'Construire l’entreprise IA-native.',
    lead: 'Les idées et les méthodes qui redéfinissent le travail avec des Collaborateurs IA.',
    readArticle: 'Lire l’article',
    seeAll: 'Voir tous les articles',
    articles: [
      { category: 'Doctrine', date: 'Juillet 2026', title: 'Pourquoi les agents IA doivent avoir une identité persistante.' },
      { category: 'Méthode', date: 'Juin 2026', title: 'Un agent produit un résultat. Un Collaborateur IA construit une capacité.' },
      { category: 'Propriété', date: 'Mai 2026', title: 'Pourquoi la mémoire de votre IA doit appartenir à votre entreprise.' },
    ],
    newsletterTitle: 'Les idées, les méthodes et les nouveautés Unitalk.',
    newsletterSub: 'Une fois par mois. Pas de bruit.',
    emailPlaceholder: 'Votre email',
    subscribe: 'S’inscrire',
  },
  en: {
    kicker: 'Ideas',
    title: 'Building the AI-native company.',
    lead: 'The ideas and methods redefining how work gets done with AI Collaborators.',
    readArticle: 'Read the article',
    seeAll: 'See all articles',
    articles: [
      { category: 'Doctrine', date: 'July 2026', title: 'Why AI agents must have a persistent identity.' },
      { category: 'Method', date: 'June 2026', title: 'An agent produces a result. An AI Collaborator builds a capability.' },
      { category: 'Ownership', date: 'May 2026', title: 'Why your AI’s memory should belong to your company.' },
    ],
    newsletterTitle: 'Unitalk ideas, methods and updates.',
    newsletterSub: 'Once a month. No noise.',
    emailPlaceholder: 'Your email',
    subscribe: 'Subscribe',
  },
}

export function SectionArticles() {
  const { lang } = useLanguage()
  const t = COPY[lang]

  return (
    <section className="border-t border-[#E4DDCE] bg-[#F4F1EA] px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <Kicker>{t.kicker}</Kicker>
            <h2 className="mt-4 text-balance font-sf text-[clamp(1.75rem,3.4vw,2.6rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-[#1C1A17]">
              {t.title}
            </h2>
            <p className="mt-3 max-w-md text-pretty text-[15px] leading-relaxed text-[#5C554A]">{t.lead}</p>
          </div>
          <a
            href="/blog"
            className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[#B00C54] transition-colors hover:text-[#D10E63]"
          >
            {t.seeAll}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        {/* Three sober editorial cards */}
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {t.articles.map((a, i) => (
            <motion.a
              key={a.title}
              href="/blog"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group flex flex-col justify-between rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#D8CFBD] hover:shadow-[0_12px_32px_-16px_rgba(28,26,23,0.25)]"
            >
              <div>
                <div className="flex items-center gap-2 font-mono text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#6E655A]">
                  <span className="text-[#B00C54]">{a.category}</span>
                  <span aria-hidden className="h-1 w-1 rounded-full bg-[#CDC4B2]" />
                  <span>{a.date}</span>
                </div>
                <h3 className="mt-4 text-balance font-sf text-lg font-semibold leading-snug tracking-[-0.01em] text-[#1C1A17]">
                  {a.title}
                </h3>
              </div>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#1C1A17] transition-colors group-hover:text-[#D10E63]">
                {t.readArticle}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </motion.a>
          ))}
        </div>

        {/* Light newsletter banner — visual only, no submission */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-8 flex flex-col gap-5 rounded-2xl border border-[#E4DDCE] bg-[#1C1A17] px-6 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8"
        >
          <div className="max-w-md">
            <p className="text-balance font-sf text-[17px] font-semibold leading-snug text-[#F3EFE6]">{t.newsletterTitle}</p>
            <p className="mt-1 text-sm text-[#A79E8E]">{t.newsletterSub}</p>
          </div>
          <div className="flex w-full max-w-sm items-center gap-2 sm:w-auto">
            <label htmlFor="newsletter-email" className="sr-only">
              {t.emailPlaceholder}
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder={t.emailPlaceholder}
              className="h-11 w-full min-w-0 flex-1 rounded-full border border-[rgba(243,239,230,0.18)] bg-[rgba(243,239,230,0.06)] px-4 text-sm text-[#F3EFE6] placeholder:text-[#8F877A] focus:border-[#D10E63] focus:outline-none focus:ring-1 focus:ring-[#D10E63] sm:w-56"
            />
            <button
              type="submit"
              className="group inline-flex h-11 shrink-0 items-center gap-1.5 rounded-full bg-[#D10E63] px-5 text-sm font-bold text-[#FBF9F3] transition-colors hover:bg-[#E51872] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1C1A17]"
            >
              {t.subscribe}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
