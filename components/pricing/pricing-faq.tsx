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
            a: `Le forfait comprend l’identité professionnelle persistante d’un Collaborateur IA, sa mémoire, ses profils métier illimités, ses coordonnées, son Workspace privé et ses accès contrôlés. L’essai de ${pricingConfig.trialDays} jours inclut 1 million de tokens. Les usages IA après l’essai sont réglés séparément.`,
          },
          {
            q: 'Quand faut-il ajouter un autre Collaborateur IA ?',
            a: 'Ajoutez une identité lorsqu’un autre nom, d’autres coordonnées ou des ressources isolées sont nécessaires. Sinon, le Collaborateur existant peut recevoir des profils métier illimités.',
          },
          {
            q: 'Comment sont facturés les usages IA après l’essai ?',
            a: `Vous choisissez dans l’application entre des crédits Unitalk à partir de ${credits} par mois, vos propres clés API ou un mode hybride. Le forfait d’identité reste séparé de ces usages.`,
          },
          {
            q: 'Puis-je utiliser mes propres clés API ?',
            a: 'Oui. Les appels concernés sont alors facturés directement par vos fournisseurs. Vous pouvez aussi combiner vos clés avec un budget Unitalk.',
          },
        ],
      }
    : {
        heading: 'Frequently asked questions',
        items: [
          {
            q: `What does the ${price} plan include?`,
            a: `The plan includes one AI Collaborator’s persistent professional identity, memory, unlimited job profiles, contact details, private Workspace and controlled access. The ${pricingConfig.trialDays}-day trial includes 1 million tokens. AI usage after the trial is billed separately.`,
          },
          {
            q: 'When should I add another AI Collaborator?',
            a: 'Add an identity when another name, separate contact details or isolated resources are required. Otherwise, the existing Collaborator can receive unlimited job profiles.',
          },
          {
            q: 'How is AI usage billed after the trial?',
            a: `In the application, choose Unitalk credits from ${credits} per month, your own API keys, or hybrid mode. The identity plan remains separate from usage.`,
          },
          {
            q: 'Can I use my own API keys?',
            a: 'Yes. The relevant calls are billed directly by your providers. You can also combine your keys with a Unitalk budget.',
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
