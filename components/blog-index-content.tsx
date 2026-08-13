'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/lib/language-context'
import { Kicker } from '@/components/home/section-kicker'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { BLOG_ARTICLES } from '@/lib/blog-articles'

/**
 * Blog index — a "À la une" block features the three published articles (with
 * generated editorial illustrations, linking to /blog/[slug]), followed by the
 * remaining ranked titles still marked "À paraître". Copy is bilingual and the
 * layout reuses the home "Idées" editorial language (ivory ground, mono
 * eyebrows, magenta accent).
 */
const COPY = {
  fr: {
    kicker: 'Blog',
    title: 'Construire l’entreprise IA-native.',
    lead: 'Les idées, les méthodes et la doctrine qui redéfinissent le travail avec des Collaborateurs IA.',
    featured: 'À la une',
    read: 'Lire l’article',
    upcoming: 'À paraître',
    soon: 'À paraître',
    articles: [
      { category: 'Mémoire', title: 'Une mission terminée ne devrait jamais repartir de zéro.' },
      { category: 'Propriété', title: 'Ce que votre IA apprend doit rester dans votre entreprise.' },
      { category: 'Méthode', title: 'Une mission bien confiée vaut mieux qu’un long prompt.' },
      { category: 'Identité', title: 'Votre IA doit savoir qui elle était hier.' },
      { category: 'Workspace', title: 'L’IA agit. L’entreprise décide.' },
      { category: 'Organisation', title: 'Un Collaborateur IA ne se déploie pas. Il s’intègre.' },
      { category: 'Mémoire', title: 'Une entreprise qui oublie recommence toujours à zéro.' },
      { category: 'Méthode', title: 'Le véritable travail commence après le premier résultat.' },
      { category: 'Compétences', title: 'Une compétence n’a de valeur que si elle peut être réutilisée.' },
      { category: 'Management', title: 'Diriger une IA devient une compétence d’entreprise.' },
      { category: 'Modèles', title: 'Le meilleur modèle d’IA dépend du travail à accomplir.' },
      { category: 'Souveraineté', title: 'Une entreprise capable ne dépend pas d’un seul modèle.' },
      { category: 'Capital', title: 'Le savoir-faire est le capital invisible de l’entreprise.' },
      { category: 'Vision', title: 'L’IA ne transforme pas les métiers. Elle transforme ce qu’une équipe peut accomplir.' },
    ],
  },
  en: {
    kicker: 'Blog',
    title: 'Building the AI-native company.',
    lead: 'The ideas, methods and doctrine redefining how work gets done with AI Collaborators.',
    featured: 'Featured',
    read: 'Read the article',
    upcoming: 'Upcoming',
    soon: 'Coming soon',
    articles: [
      { category: 'Memory', title: 'A completed mission should never start over from scratch.' },
      { category: 'Ownership', title: 'What your AI learns must stay inside your company.' },
      { category: 'Method', title: 'A well-briefed mission beats a long prompt.' },
      { category: 'Identity', title: 'Your AI must know who it was yesterday.' },
      { category: 'Workspace', title: 'The AI acts. The company decides.' },
      { category: 'Organization', title: 'An AI Collaborator isn’t deployed. It’s integrated.' },
      { category: 'Memory', title: 'A company that forgets always starts over.' },
      { category: 'Method', title: 'The real work begins after the first result.' },
      { category: 'Skills', title: 'A skill only has value if it can be reused.' },
      { category: 'Management', title: 'Leading an AI becomes a company skill.' },
      { category: 'Models', title: 'The best AI model depends on the work to be done.' },
      { category: 'Sovereignty', title: 'A capable company doesn’t depend on a single model.' },
      { category: 'Capital', title: 'Know-how is the company’s invisible capital.' },
      { category: 'Vision', title: 'AI doesn’t transform jobs. It transforms what a team can accomplish.' },
    ],
  },
}

export function BlogIndexContent() {
  const { lang } = useLanguage()
  const t = COPY[lang]

  return (
    <main className="bg-[#F4F1EA]">
      <section className="px-6 pb-24 pt-28 sm:pt-32">
        <div className="mx-auto max-w-5xl">
          <Kicker>{t.kicker}</Kicker>
          <h1 className="mt-4 text-balance font-sf text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-[#1C1A17]">
            {t.title}
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-[15px] leading-relaxed text-[#5C554A] sm:text-base">{t.lead}</p>

          {/* Featured — the three published articles */}
          <div className="mt-14 flex items-center gap-3">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#B00C54]">{t.featured}</span>
            <span className="h-px flex-1 bg-[#E4DDCE]" />
          </div>

          <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BLOG_ARTICLES.map((a, i) => (
              <motion.div
                key={a.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: Math.min(i * 0.08, 0.24) }}
              >
                <Link
                  href={`/blog/${a.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#D7CCB8] hover:shadow-[0_18px_40px_-24px_rgba(28,26,23,0.4)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#EFEADF]">
                    <Image
                      src={a.image || `/blog/${a.slug}/opengraph-image`}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center gap-2 font-mono text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#B00C54]">
                      <span>{a.category[lang]}</span>
                      <span className="text-[#C4BBA8]">/</span>
                      <span className="text-[#6E655A]">{a.readingTime[lang]}</span>
                    </div>
                    <h2 className="mt-2.5 text-balance font-sf text-[17px] font-semibold leading-snug tracking-[-0.01em] text-[#1C1A17]">
                      {a.title[lang]}
                    </h2>
                    <p className="mt-2.5 text-[13.5px] leading-relaxed text-[#5C554A]">{a.cardLead[lang]}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#A80B50]">
                      {t.read}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Upcoming — the ranked titles still to be published */}
          <div className="mt-16 flex items-center gap-3">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#6E655A]">{t.upcoming}</span>
            <span className="h-px flex-1 bg-[#E4DDCE]" />
          </div>

          <ol className="mt-6 divide-y divide-[#E4DDCE] border-y border-[#E4DDCE]">
            {t.articles.map((a, i) => (
              <motion.li
                key={a.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.3) }}
                className="group flex items-baseline gap-4 py-5 sm:gap-6"
              >
                <span className="w-6 shrink-0 font-mono text-[12px] font-bold tabular-nums text-[#B7AE9D] sm:w-8">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="font-mono text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#B00C54]">
                    {a.category}
                  </div>
                  <h2 className="mt-1.5 text-balance font-sf text-[17px] font-semibold leading-snug tracking-[-0.01em] text-[#1C1A17] sm:text-lg">
                    {a.title}
                  </h2>
                </div>
                <span className="shrink-0 self-center rounded-full border border-[#DCD3C2] bg-[#FBF9F3] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#6E655A]">
                  {t.soon}
                </span>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  )
}
