'use client'

import { useId, useState } from 'react'
import { useLanguage } from '@/lib/language-context'

const ITEMS = {
  fr: [
    ['Facturez-vous chaque membre de l’équipe ?', 'Non. La licence est un forfait mensuel par entreprise : 0 € pour 1 utilisateur, 49 € jusqu’à 10 utilisateurs et 299 € jusqu’à 100 utilisateurs.'],
    ['Que comprend la licence entreprise ?', 'L’espace de travail partagé, l’accès aux modèles autorisés, l’administration, les droits, les applications et les validations.'],
    ['Que comprend un Collaborateur IA à 49 € par mois ?', 'Son identité, sa mémoire, ses outils de communication, une instance dédiée de l’agent Hermes, 1 million de tokens et 60 minutes de téléphone.'],
    ['À quoi servent les crédits ?', 'Ils financent la consommation des modèles IA, des API externes et des minutes de téléphone supplémentaires. Les recharges commencent à 25 €.'],
    ['Puis-je utiliser mes propres clés API ?', 'Oui. Le mode BYOK vous permet d’utiliser vos clés et de payer directement vos fournisseurs. Le mode hybride combine vos clés et les crédits Unitalk.'],
  ],
  en: [
    ['Do you charge for every team member?', 'No. The license is a monthly flat fee per organization: €0 for 1 user, €49 for up to 10 users and €299 for up to 100 users.'],
    ['What does the organization license include?', 'The shared workspace, access to authorized models, administration, permissions, applications and approvals.'],
    ['What is included with a €49/month AI Collaborator?', 'Identity, memory, communication tools, a dedicated Hermes agent instance, 1 million tokens and 60 phone minutes.'],
    ['What are credits used for?', 'They fund AI model usage, external APIs and additional phone minutes. Top-ups start at €25.'],
    ['Can I use my own API keys?', 'Yes. BYOK lets you use your keys and pay providers directly. Hybrid mode combines your keys with Unitalk credits.'],
  ],
} as const

export function PricingFaqFinal() {
  const { lang } = useLanguage()
  return <section className="bg-[#FAF8F3] px-5 py-16 sm:px-8 sm:py-24"><div className="editorial-shell grid gap-10 lg:grid-cols-[.7fr_1.3fr]"><div><p className="font-mono text-[10px] font-black uppercase tracking-[.2em] text-[#B00C54]">FAQ</p><h2 className="mt-5 text-[clamp(2.5rem,5vw,4.8rem)] font-semibold leading-[.94] tracking-[-.06em]">{lang === 'fr' ? 'L’essentiel, sans astérisque.' : 'The essentials, no fine print.'}</h2></div><div className="border-t border-[#CFC5B5]">{ITEMS[lang].map(([q, a]) => <Item key={q} q={q} a={a}/>)}</div></div></section>
}

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  const id = useId()
  return <div className="border-b border-[#CFC5B5]"><button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen(value => !value)} className="flex min-h-20 w-full items-center justify-between gap-6 text-left text-lg font-semibold outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]"><span>{q}</span><span aria-hidden className="font-mono text-[#D10E63]">{open ? '−' : '+'}</span></button>{open && <p id={id} className="max-w-2xl pb-7 pr-8 text-[15px] leading-7 text-[#4E483F]">{a}</p>}</div>
}
