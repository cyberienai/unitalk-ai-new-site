'use client'

import { useId, useState } from 'react'
import { useLanguage } from '@/lib/language-context'
import { minimumCreditBudget, pricingConfig } from '@/lib/pricing-config'
import { formatEuro } from './format'

type QA = { q: string; a: string }

function getFaq(lang: 'fr' | 'en'): { heading: string; items: QA[] } {
  const price = formatEuro(pricingConfig.baseMonthlyPrice, lang)
  const credits = formatEuro(minimumCreditBudget(), lang)
  return lang === 'fr'
    ? {
        heading: 'Questions fréquentes',
        items: [
          {
            q: `Que comprend le forfait à ${price} ?`,
            a: 'Une identité professionnelle de Collaborateur IA, son environnement privé, son Workspace, sa mémoire, ses profils métier et ses compétences illimités. Alma et Unitalk Desktop sont également incluses gratuitement.',
          },
          {
            q: 'Comment sont réglés les modèles IA ?',
            a: `Après l’essai, vous pouvez utiliser des crédits Unitalk à partir de ${credits} par mois, vos propres clés API ou combiner les deux. Les coûts des fournisseurs externes restent facturés par ces fournisseurs.`,
          },
          {
            q: 'Pourquoi les usages IA sont-ils séparés ?',
            a: 'Le Collaborateur IA est une identité durable. Les modèles peuvent changer selon le travail, le niveau de qualité attendu et vos propres accords fournisseurs.',
          },
          {
            q: 'Puis-je utiliser des modèles privés ?',
            a: 'Oui, selon leur compatibilité avec l’AI Gateway et la configuration de votre organisation.',
          },
          {
            q: 'Alma est-elle facturée comme un Collaborateur IA ?',
            a: 'Non. Alma est la Conseillère IA de Unitalk et reste incluse gratuitement.',
          },
          {
            q: 'Unitalk Desktop est-elle payante ?',
            a: 'Non. Unitalk Desktop est incluse gratuitement. Les garanties précises de traitement local dépendent du mode et des modèles utilisés.',
          },
        ],
      }
    : {
        heading: 'Frequently asked questions',
        items: [
          {
            q: `What does the ${price} plan include?`,
            a: 'One AI Collaborator’s professional identity, private environment, Workspace, memory, unlimited job profiles and unlimited skills. Alma and Unitalk Desktop are also included free of charge.',
          },
          {
            q: 'How are AI models paid for?',
            a: `After the trial, use Unitalk credits from ${credits} per month, your own API keys, or combine both. External provider costs remain billed by those providers.`,
          },
          {
            q: 'Why is AI usage separate?',
            a: 'The AI Collaborator is a lasting identity. Models can change depending on the work, the required quality and your own provider agreements.',
          },
          {
            q: 'Can I use private models?',
            a: 'Yes, depending on their compatibility with the AI Gateway and your organization’s configuration.',
          },
          {
            q: 'Is Alma billed as an AI Collaborator?',
            a: 'No. Alma is Unitalk’s AI Advisor and remains included free of charge.',
          },
          {
            q: 'Is Unitalk Desktop paid?',
            a: 'No. Unitalk Desktop is included free of charge. Exact local processing guarantees depend on the mode and models used.',
          },
        ],
      }
}

function AccordionItem({ q, a }: QA) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  return (
    <div className="border-b border-[#E4DDCE]">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
          className="flex min-h-12 w-full items-center justify-between gap-4 py-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/50"
        >
          <span className="text-[15px] font-medium">{q}</span>
          <span aria-hidden="true" className={`text-xl text-[#D10E63] transition-transform ${open ? 'rotate-45' : ''}`}>+</span>
        </button>
      </h3>
      {open && <div id={panelId} className="pb-4 pr-8 text-sm leading-relaxed text-[#4E483F]">{a}</div>}
    </div>
  )
}

export function PricingFaq() {
  const { lang } = useLanguage()
  const faq = getFaq(lang)
  return (
    <section aria-labelledby="faq-heading" className="mx-auto w-full max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
      <h2 id="faq-heading" className="text-center font-sf text-[28px] font-bold tracking-[-0.02em] sm:text-[34px]">{faq.heading}</h2>
      <div className="mt-7 border-t border-[#E4DDCE]">
        {faq.items.map((item) => <AccordionItem key={item.q} {...item} />)}
      </div>
    </section>
  )
}
