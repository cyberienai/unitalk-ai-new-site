'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/lib/language-context'

const T = {
  fr: {
    eyebrow: 'Questions fréquentes',
    title1: 'Tout ce que vous voulez ',
    title2: 'savoir.',
    contactPre: 'Une autre question ?',
    contactLink: 'Parlez-en à Alma',
    faqs: [
      { q: "Qu'est-ce qu'un Collaborateur IA ?", a: "Un Collaborateur IA est un membre de votre organisation, propulsé par Hermès. Il possède sa propre identité, sa mémoire et un profil métier. Vous lui ajoutez le savoir-faire dont vous avez besoin, vous le connectez à vos outils, et il exécute les missions que vous lui confiez aux côtés de vos équipes." },
      { q: "Comment un Collaborateur IA acquiert-il son savoir-faire ?", a: "Son savoir-faire se construit concrètement à partir de profils métier, d'une personnalité dédiée et de compétences activables. Ce savoir-faire se crée à mesure de vos besoins : vous pouvez enrichir votre Collaborateur IA de nouvelles compétences à tout moment, sans repartir de zéro." },
      { q: "Comment fonctionne la tarification ?", a: "Un seul plan, tout compris : 49€/mois pour un Collaborateur IA partagé par toute votre organisation, sans coût par membre. Profils et compétences illimités, serveur IA privé et 10 millions de tokens inclus. Besoin de plusieurs Collaborateurs IA ? Le tarif est dégressif dès le deuxième, toujours dans un seul abonnement. Essai gratuit de 7 jours, sans carte bancaire, résiliable à tout moment." },
      { q: "Où sont hébergées mes données ?", a: "Les serveurs Unitalk sont hébergés en France pour la souveraineté des données. Toutes les données sont chiffrées et isolées, sur un serveur IA privé inclus dans votre abonnement. Pour les grandes organisations, un hébergement souverain ou sur votre propre infrastructure est possible." },
      { q: "Comment je commence ?", a: "Indiquez l'adresse de votre site, et Alma, notre conseillère IA, analyse votre activité et prépare les premières missions de votre Collaborateur IA. En quelques minutes, il est prêt. Vous activez votre essai gratuit de 7 jours immédiatement, sans carte bancaire." },
      { q: "Quels modèles d'IA utilise mon Collaborateur IA ?", a: "Votre Collaborateur IA s'appuie sur les meilleurs modèles du marché, dont ChatGPT, selon la mission à accomplir. Vous n'avez rien à configurer : Hermès sélectionne le modèle le plus adapté, et vous gardez la possibilité de choisir vos préférences." },
      { q: "Que deviennent les données de mon Collaborateur IA ?", a: "Sa mémoire persiste entre toutes les sessions : chaque conversation, décision et contexte est conservé dans l'espace mémoire de votre organisation, si bien qu'il apprend et s'améliore au fil du temps. Vous gardez le contrôle : si vous le mettez en pause, ses données sont conservées et il peut être réactivé ; si vous le supprimez, les données sont définitivement effacées et la facturation s'arrête immédiatement." },
    ],
  },
  en: {
    eyebrow: 'Frequently asked questions',
    title1: 'Everything you want ',
    title2: 'to know.',
    contactPre: 'Another question?',
    contactLink: 'Talk to Alma about it',
    faqs: [
      { q: 'What is an AI Collaborator?', a: 'An AI Collaborator is a member of your organization, powered by Hermès. It has its own identity, memory, and a job profile. You add the know-how you need, connect it to your tools, and it carries out the missions you assign alongside your teams.' },
      { q: 'How does an AI Collaborator gain its know-how?', a: 'Its know-how is built concretely from job profiles, a dedicated personality, and activatable skills. That know-how is created as your needs grow: you can add new skills to your AI Collaborator at any time, without starting over.' },
      { q: 'How does pricing work?', a: 'One plan, everything included: €49/month for one AI Collaborator shared across your whole organization, with no per-seat cost. Unlimited profiles and skills, a private AI server, and 10 million tokens included. Need several AI Collaborators? The price is degressive from the second one, still within a single subscription. 7-day free trial, no credit card, cancel anytime.' },
      { q: 'Where is my data hosted?', a: 'Unitalk servers are hosted in France for data sovereignty. All data is encrypted and isolated, on a private AI server included in your subscription. For larger organizations, sovereign hosting or deployment on your own infrastructure is available.' },
      { q: 'How do I get started?', a: 'Enter your website address, and Alma, our AI advisor, analyzes your business and prepares the first missions for your AI Collaborator. In a few minutes, it is ready. You activate your 7-day free trial immediately, no credit card required.' },
      { q: 'Which AI models does my AI Collaborator use?', a: 'Your AI Collaborator relies on the best models available, including ChatGPT, depending on the mission at hand. There is nothing to configure: Hermès selects the most suitable model, and you can still set your own preferences.' },
      { q: "What happens to my AI Collaborator's data?", a: "Its memory persists across all sessions: every conversation, decision, and context is stored in your organization's memory space, so it learns and improves over time. You stay in control: if you pause it, its data is retained and it can be reactivated; if you delete it, data is permanently removed and billing stops immediately." },
    ],
  },
}

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0)
  const { lang } = useLanguage()
  const t = T[lang]
  const FAQS = t.faqs

  return (
    <section
      id="faq"
      className="relative overflow-hidden border-t border-[#DcD4C4] bg-[#FBF9F3] py-12 sm:py-20 md:py-28"
    >
      <div className="relative z-10 mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 sm:mb-14 max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D10E63]">{t.eyebrow}</p>
          <h2
            className="mt-3 font-sf text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] text-[#1C1A17] text-balance"
            style={{ letterSpacing: '-0.03em' }}
          >
            {t.title1}<span className="text-[#D10E63]">{t.title2}</span>
          </h2>
        </div>

        {/* Accordion */}
        <div className="divide-y divide-[#DcD4C4] border-y border-[#DcD4C4]">
          {FAQS.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className={`text-base sm:text-lg font-medium ${isOpen ? 'text-[#1C1A17]' : 'text-[#4E483F]'}`}>
                    {item.q}
                  </span>
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors ${
                      isOpen ? 'border-[#D10E63] text-[#D10E63]' : 'border-[#C4BAA8] text-[#857C6E]'
                    }`}
                    aria-hidden="true"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      className={`transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 pr-10 text-sm sm:text-base leading-relaxed text-[#6E665A]">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        {/* Contact line */}
        <p className="mt-8 text-sm text-[#857C6E]">
          {t.contactPre}{' '}
          <a href="/decouvrir" className="text-[#D10E63] underline-offset-4 hover:underline">
            {t.contactLink}
          </a>
          .
        </p>
      </div>
    </section>
  )
}
