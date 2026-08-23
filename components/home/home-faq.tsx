'use client'

import Link from 'next/link'
import { Plus } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { localizedHref } from '@/lib/i18n-routing'
import { Kicker } from './section-kicker'

const COPY = {
  fr: {
    kicker: 'Questions fréquentes',
    title: 'Les réponses avant de commencer.',
    questions: [
      ['Qu’est-ce qu’un Collaborateur IA ?', 'C’est une identité professionnelle configurée pour votre entreprise. Il réalise des missions dans un espace de travail persistant, avec les outils et les droits que vous lui accordez.'],
      ['Quelle différence avec ChatGPT ?', 'Un assistant conversationnel répond principalement à des demandes. Un Collaborateur IA suit une mission, conserve son contexte, utilise les applications autorisées et rend son travail visible dans le Workspace.'],
      ['Que peut-il réellement faire ?', 'Il peut notamment prospecter, préparer des réunions, traiter des demandes clients, analyser des données, produire des documents et prendre en charge des tâches répétitives. Ses capacités dépendent des outils et des accès configurés.'],
      ['Peut-il agir sans validation ?', 'Vous définissez son niveau d’autonomie. Les actions sensibles peuvent être systématiquement soumises à une personne responsable.'],
      ['Peut-il faire des erreurs ?', 'Oui. Comme toute intelligence artificielle, il peut se tromper. Son activité doit être contrôlée selon l’importance de la mission et les règles de votre entreprise.'],
      ['Comment mes données et mes accès sont-ils protégés ?', 'Le Collaborateur utilise uniquement les outils et les droits qui lui sont attribués. Les mesures techniques et contractuelles applicables sont détaillées dans notre documentation de sécurité et notre DPA.'],
      ['Combien cela coûte-t-il ?', 'La première mission est offerte, sans carte bancaire. Les Collaborateurs IA sont ensuite proposés à partir de 49 €/mois, selon la configuration et la consommation associée.'],
    ],
    security: 'Voir la sécurité et le DPA',
    pricing: 'Voir le détail des tarifs',
  },
  en: {
    kicker: 'Frequently asked questions',
    title: 'Answers before you get started.',
    questions: [
      ['What is an AI Collaborator?', 'It is a professional identity configured for your organization. It performs missions in a persistent workspace with the tools and permissions you grant it.'],
      ['How is it different from ChatGPT?', 'A conversational assistant mainly responds to requests. An AI Collaborator follows a mission, retains context, uses authorized applications and makes its work visible in Workspace.'],
      ['What can it actually do?', 'It can prospect, prepare meetings, handle customer requests, analyze data, produce documents and take on repetitive tasks. Its capabilities depend on configured tools and access.'],
      ['Can it act without approval?', 'You define its level of autonomy. Sensitive actions can always be submitted to the responsible person.'],
      ['Can it make mistakes?', 'Yes. Like any artificial intelligence, it can make mistakes. Its work should be reviewed according to the mission’s importance and your organization’s rules.'],
      ['How are my data and access protected?', 'The Collaborator uses only the tools and permissions assigned to it. Applicable technical and contractual measures are detailed in our security documentation and DPA.'],
      ['How much does it cost?', 'The first mission is included, with no credit card. AI Collaborators then start at €49/month, depending on configuration and associated usage.'],
    ],
    security: 'View security and the DPA',
    pricing: 'View detailed pricing',
  },
} as const

export function HomeFaq({ lang }: { lang: Lang }) {
  const copy = COPY[lang]
  return (
    <section aria-labelledby="home-faq-title" className="border-b border-[#D8D0C2] bg-[#F3EFE6] py-16 sm:py-20">
      <div className="editorial-shell grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
        <div><Kicker>{copy.kicker}</Kicker><h2 id="home-faq-title" className="mt-5 max-w-xl text-[clamp(2.35rem,4vw,3.5rem)] font-bold leading-[.98] tracking-[-.05em]">{copy.title}</h2></div>
        <div className="border-t border-[#CFC5B5]">
          {copy.questions.map(([question, answer], index) => (
            <details key={question} className="group border-b border-[#CFC5B5]">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-4 text-left text-[15px] font-bold marker:content-none"><span>{question}</span><Plus aria-hidden className="size-4 shrink-0 text-[#B00C54] transition-transform group-open:rotate-45"/></summary>
              <div className="max-w-2xl pb-5 pr-8 text-sm leading-7 text-[#5C554A]"><p>{answer}</p>{index === 5 && <Link href={localizedHref('security', lang)} className="mt-3 inline-block font-bold text-[#B00C54] underline decoration-[#D10E63]/30 underline-offset-4">{copy.security}</Link>}{index === 6 && <Link href={localizedHref('pricing', lang)} className="mt-3 inline-block font-bold text-[#B00C54] underline decoration-[#D10E63]/30 underline-offset-4">{copy.pricing}</Link>}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
