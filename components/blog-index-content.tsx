'use client'

import { useLanguage } from '@/lib/language-context'
import { Kicker } from '@/components/home/section-kicker'
import { motion } from 'framer-motion'

/**
 * Blog index — the 18 editorial titles that map Unitalk's category, ranked by
 * relevance. There are no article detail pages yet, so each row is a non-linked
 * list item marked "À paraître". Copy is bilingual and the layout reuses the
 * home "Idées" editorial language (ivory ground, mono eyebrows, magenta accent).
 */
const COPY = {
  fr: {
    kicker: 'Blog',
    title: 'Construire l’entreprise IA-native.',
    lead: 'Les idées, les méthodes et la doctrine qui redéfinissent le travail avec des Collaborateurs IA. Premiers articles à paraître.',
    soon: 'À paraître',
    articles: [
      { category: 'Méthode', title: 'Un agent produit un résultat. Un Collaborateur IA construit une capacité.' },
      { category: 'Mémoire', title: 'Une mission terminée ne devrait jamais repartir de zéro.' },
      { category: 'Doctrine', title: 'Une IA sans identité ne devient jamais un collaborateur.' },
      { category: 'Confiance', title: 'L’autonomie commence par des limites claires.' },
      { category: 'Propriété', title: 'Ce que votre IA apprend doit rester dans votre entreprise.' },
      { category: 'Méthode', title: 'Une mission bien confiée vaut mieux qu’un long prompt.' },
      { category: 'Identité', title: 'Votre IA doit savoir qui elle était hier.' },
      { category: 'Workspace', title: 'L’IA agit. L’entreprise décide.' },
      { category: 'Organisation', title: 'Un Collaborateur IA ne se déploie pas. Il s’intègre.' },
      { category: 'Mémoire', title: 'Une entreprise qui oublie recommence toujours à zéro.' },
      { category: 'Méthode', title: 'Le véritable travail commence après le premier résultat.' },
      { category: 'Confiance', title: 'Donner de l’autonomie à l’IA exige de savoir l’arrêter.' },
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
    lead: 'The ideas, methods and doctrine redefining how work gets done with AI Collaborators. First articles coming soon.',
    soon: 'Coming soon',
    articles: [
      { category: 'Method', title: 'An agent produces a result. An AI Collaborator builds a capability.' },
      { category: 'Memory', title: 'A completed mission should never start over from scratch.' },
      { category: 'Doctrine', title: 'An AI with no identity never becomes a collaborator.' },
      { category: 'Trust', title: 'Autonomy starts with clear boundaries.' },
      { category: 'Ownership', title: 'What your AI learns must stay inside your company.' },
      { category: 'Method', title: 'A well-briefed mission beats a long prompt.' },
      { category: 'Identity', title: 'Your AI must know who it was yesterday.' },
      { category: 'Workspace', title: 'The AI acts. The company decides.' },
      { category: 'Organization', title: 'An AI Collaborator isn’t deployed. It’s integrated.' },
      { category: 'Memory', title: 'A company that forgets always starts over.' },
      { category: 'Method', title: 'The real work begins after the first result.' },
      { category: 'Trust', title: 'Giving AI autonomy requires knowing how to stop it.' },
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
      <section className="px-6 pb-20 pt-28 sm:pt-32">
        <div className="mx-auto max-w-4xl">
          <Kicker>{t.kicker}</Kicker>
          <h1 className="mt-4 text-balance font-sf text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-[#1C1A17]">
            {t.title}
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-[15px] leading-relaxed text-[#5C554A] sm:text-base">{t.lead}</p>

          <ol className="mt-12 divide-y divide-[#E4DDCE] border-y border-[#E4DDCE]">
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
