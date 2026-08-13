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
            q: `Que paient les ${price} ?`,
            a: 'Une identité professionnelle de Collaborateur IA, son environnement privé, sa mémoire, ses moyens de communication ainsi que des profils métier et compétences sans limite.',
          },
          {
            q: 'Les modèles IA sont-ils inclus ?',
            a: `L’essai comprend 1 million de tokens. Ensuite, utilisez des crédits Unitalk dès ${credits} par mois, vos propres clés API ou combinez les deux.`,
          },
          {
            q: 'Que comprend la partie gratuite ?',
            a: 'Alma, Unitalk Desktop et l’accès aux Stores de profils métier et de compétences.',
          },
          {
            q: 'Dois-je payer chaque profil métier ou compétence ?',
            a: 'Non. Unitalk ne limite pas le nombre de profils métier ou de compétences associés à votre Collaborateur IA. Les éventuelles conditions propres aux contenus communautaires sont affichées avant leur installation.',
          },
          {
            q: 'Le forfait inclut-il les moyens de communication ?',
            a: 'L’identité comprend un email, un calendrier et un numéro de téléphone professionnels. Les usages variables de voix, de téléphonie ou de services supplémentaires peuvent être proposés séparément selon les services activés.',
          },
        ],
      }
    : {
        heading: 'Frequently asked questions',
        items: [
          {
            q: `What does the ${price} pay for?`,
            a: 'One AI Collaborator’s professional identity, private environment, memory, communication tools, unlimited job profiles and unlimited skills.',
          },
          {
            q: 'Are AI models included?',
            a: `The trial includes 1 million tokens. Then use Unitalk credits from ${credits} per month, your own API keys, or combine both.`,
          },
          {
            q: 'What is included free?',
            a: 'Alma, Unitalk Desktop and access to the job profile and skills Stores.',
          },
          {
            q: 'Do I pay for each job profile or skill?',
            a: 'No. Unitalk does not limit the number of job profiles or skills associated with your AI Collaborator. Any terms specific to community content are shown before installation.',
          },
          {
            q: 'Does the plan include communication tools?',
            a: 'The identity includes a professional email, calendar and phone number. Variable voice, phone or additional service usage may be offered separately depending on the services activated.',
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
    <section aria-labelledby="faq-heading" className="mx-auto w-full max-w-[1120px] px-5 py-14 sm:px-8 sm:py-20">
      <h2 id="faq-heading" className="font-sf text-[34px] font-bold tracking-[-0.04em] sm:text-[48px]">{faq.heading}</h2>
      <div className="mt-7 max-w-3xl border-t border-[#1C1A17]/15">
        {faq.items.map((item) => <AccordionItem key={item.q} {...item} />)}
      </div>
    </section>
  )
}
