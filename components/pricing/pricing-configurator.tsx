'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/lib/language-context'
import { pricingConfig } from '@/lib/pricing-config'
import { calculateMonthlySubscription, normalizeQuantity } from '@/lib/pricing-calculator'
import { formatEuro } from './format'

export function PricingConfigurator() {
  const { lang } = useLanguage()
  const router = useRouter()
  const fr = lang === 'fr'
  const total = formatEuro(pricingConfig.baseMonthlyPrice, lang)
  const hosting = formatEuro(pricingConfig.hostingMonthlyPrice, lang)
  const license = formatEuro(pricingConfig.licenseMonthlyPrice, lang)

  function startTrial() {
    try {
      sessionStorage.setItem('unitalk_pricing_selection', JSON.stringify({ quantity: 1, billingCycle: 'monthly', monthlySubscription: pricingConfig.baseMonthlyPrice }))
    } catch {}
    router.push('/decouvrir')
  }

  return (
    <section className="mx-auto w-full max-w-[1120px] px-5 pb-16 sm:px-8">
      <div className="border-y border-[#1C1A17]/15 bg-[#FAF8F3]">
        <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
          <div className="p-6 sm:p-9 lg:border-r lg:border-[#1C1A17]/15">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#B00C54]">{fr ? 'Votre Collaborateur IA' : 'Your AI Collaborator'}</p>
            <p className="mt-4 font-sf text-[88px] font-bold leading-none tracking-[-0.07em] sm:text-[118px]">{total}</p>
            <p className="mt-1 text-lg font-semibold">{fr ? 'par mois' : 'per month'}</p>
            <p className="mt-7 font-sf text-[36px] font-bold leading-tight text-[#B00C54]">5 millions</p>
            <p className="mt-1 text-sm font-semibold">{fr ? 'de tokens inclus chaque mois' : 'tokens included each month'}</p>
            <button type="button" onClick={startTrial} className="mt-8 w-full bg-[#D10E63] px-6 py-3.5 text-sm font-bold text-white">{fr ? 'Ajouter mon Collaborateur IA' : 'Add my AI Collaborator'} →</button>
            <p className="mt-3 text-xs leading-5 text-[#6E665A]">{fr ? 'Mensuel, sans engagement · Tarifs dégressifs disponibles selon le volume' : 'Monthly, no commitment · Volume pricing available'}</p>
          </div>
          <div>
            <PricePart number="01" price={hosting} title={fr ? 'Hébergement' : 'Hosting'} lead={fr ? 'Sa propre instance Hermes, isolée et disponible en continu.' : 'Its own isolated, continuously available Hermes instance.'} items={fr ? ['Environnement d’exécution dédié','Ressources et stockage persistants','Navigateur, code et tâches','Mémoire et historique de travail','Supervision et maintenance de l’instance',`SLA de ${pricingConfig.slaAvailability} %`] : ['Dedicated execution environment','Persistent resources and storage','Browser, code and tasks','Memory and work history','Instance supervision and maintenance',`${pricingConfig.slaAvailability}% SLA`]} />
            <PricePart number="02" price={license} title={fr ? 'Licence Unitalk' : 'Unitalk license'} lead={fr ? 'Tout ce qui lui permet de travailler dans votre entreprise.' : 'Everything it needs to work in your company.'} items={fr ? ['Identité et profil public','Email, agenda et téléphone professionnels','Workspace privé','Profils métier illimités','Compétences, applications, droits et validations','Desktop et accompagnement d’Alma'] : ['Identity and public profile','Professional email, calendar and phone','Private Workspace','Unlimited job profiles','Skills, applications, rights and approvals','Desktop and support from Alma']} />
          </div>
        </div>
      </div>
    </section>
  )
}

function PricePart({ number, price, title, lead, items }: { number: string; price: string; title: string; lead: string; items: string[] }) {
  return <article className="border-b border-[#1C1A17]/15 p-6 last:border-b-0 sm:p-8"><div className="flex items-start justify-between gap-5"><div><p className="font-mono text-[10px] text-[#6E665A]">{number}</p><h2 className="mt-2 font-sf text-[30px] font-bold">{price} · {title}</h2></div></div><p className="mt-3 font-semibold">{lead}</p><ul className="mt-5 grid gap-x-6 gap-y-2 text-sm text-[#4E483F] sm:grid-cols-2">{items.map(item => <li key={item}>{item}</li>)}</ul></article>
}

export function MultiCollaboratorConfigurator() {
  const { lang } = useLanguage()
  const fr = lang === 'fr'
  const [open, setOpen] = useState(false)
  const [quantity, setQuantity] = useState(2)
  const count = normalizeQuantity(quantity)
  return <section className="bg-[#F3EFE6]"><div className="mx-auto max-w-[1120px] px-5 py-16 sm:px-8 sm:py-20"><h2 className="max-w-4xl font-sf text-[38px] font-bold leading-tight sm:text-[54px]">{fr ? 'Plusieurs Collaborateurs IA ?' : 'Several AI Collaborators?'}</h2><p className="mt-5 max-w-3xl text-[17px] leading-7 text-[#4E483F]">{fr ? 'Une nouvelle identité est utile lorsqu’un autre prénom, une mémoire séparée ou des ressources dédiées deviennent nécessaires.' : 'A new identity is useful when another name, separate memory or dedicated resources are required.'}</p><button onClick={() => setOpen(v => !v)} aria-expanded={open} className="mt-6 text-sm font-bold text-[#B00C54] underline underline-offset-4">{open ? (fr ? 'Replier' : 'Close') : (fr ? 'Calculer le prix' : 'Calculate price')} →</button>{open && <div className="mt-7 grid gap-6 border-t border-[#1C1A17]/15 pt-7 sm:grid-cols-[1fr_auto] sm:items-center"><div><p className="font-mono text-[10px] uppercase text-[#6E665A]">{fr ? 'Nombre de Collaborateurs IA' : 'Number of AI Collaborators'}</p><div className="mt-3 inline-flex border border-[#1C1A17]/20"><button aria-label="Retirer" disabled={count <= 1} onClick={() => setQuantity(v => Math.max(1, v - 1))} className="h-11 w-11">−</button><span className="flex min-w-12 items-center justify-center border-x border-[#1C1A17]/20 font-bold">{count}</span><button aria-label="Ajouter" onClick={() => setQuantity(v => v + 1)} className="h-11 w-11">+</button></div></div><div className="sm:text-right"><p className="font-sf text-[34px] font-bold">{formatEuro(calculateMonthlySubscription(count), lang)}/{fr ? 'mois' : 'month'}</p><p className="mt-1 text-sm text-[#6E665A]">{fr ? 'Tarif public avant éventuelle remise de volume' : 'Public price before any volume discount'}</p></div></div>}</div></section>
}
