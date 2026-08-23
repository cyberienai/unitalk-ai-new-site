'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import type { RoleDetail } from '@/lib/collaborators-catalog'
import { useLanguage } from '@/lib/language-context'
import { localizedHref } from '@/lib/i18n-routing'

export function CollaboratorEquipmentFlow({ detail }: { detail: RoleDetail }) {
  const { lang } = useLanguage()
  const router = useRouter()
  const [request, setRequest] = useState('')
  const fr = lang === 'fr'
  const examples = fr
    ? ['Qualifier les prospects entrants dans mon CRM', 'Relancer les opportunités sans activité depuis 30 jours', 'Préparer mes rendez-vous commerciaux']
    : ['Qualify inbound prospects in my CRM', 'Follow up opportunities inactive for 30 days', 'Prepare my sales meetings']

  function continueWithAlma(value = request) {
    const clean = value.trim()
    if (!clean) return
    router.push(`${localizedHref('missions', lang)}?composer=1&collaborateur=${encodeURIComponent(detail.slug)}&q=${encodeURIComponent(clean)}&source=collaborator-profile`)
  }

  return <section id="equiper" className="scroll-mt-24 bg-[#181615] py-16 text-white sm:py-20">
    <div className="editorial-shell max-w-4xl">
      <div className="rounded-[28px] border border-white/10 bg-[#211E1A] p-5 sm:p-8">
        <div className="flex items-center gap-3"><Image src="/alma-avatar.png" alt="Alma" width={44} height={44} className="size-11 rounded-full object-cover ring-2 ring-[#D10E63]/40"/><div><p className="font-sf font-semibold">Alma</p><p className="text-xs text-[#F2A4C5]">{fr ? 'Collaboratrice IA · Coordinatrice de missions chez Unitalk' : 'AI Collaborator · Mission coordinator at Unitalk'}</p></div></div>
        <label htmlFor="equipment-request" className="mt-7 block text-2xl font-semibold tracking-[-.03em]">{fr ? `Quelle mission voulez-vous confier à ${detail.name} ?` : `What mission would you like to assign to ${detail.name}?`}</label>
        <textarea id="equipment-request" value={request} onChange={event => setRequest(event.target.value)} rows={3} placeholder={fr ? 'Ex. Qualifier les prospects entrants dans HubSpot…' : 'E.g. Qualify inbound prospects in HubSpot…'} className="mt-4 w-full resize-none rounded-2xl border border-white/15 bg-white/[.06] p-4 text-sm leading-6 text-white outline-none placeholder:text-[#8F877A] focus:border-[#F2A4C5] focus:ring-2 focus:ring-[#F2A4C5]/15"/>
        <div className="mt-3 flex flex-wrap gap-2">{examples.map(example => <button key={example} type="button" onClick={() => { setRequest(example); continueWithAlma(example) }} className="rounded-full border border-white/10 px-3 py-1.5 text-left text-xs font-semibold text-[#CFC6B8] hover:border-[#F2A4C5]/50 hover:text-white">{example}</button>)}</div>
        <button type="button" disabled={!request.trim()} onClick={() => continueWithAlma()} className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#D10E63] px-7 text-sm font-bold text-white disabled:opacity-40">{fr ? 'Préparer la mission' : 'Prepare the mission'}<ArrowRight className="size-4"/></button>
      </div>
    </div>
  </section>
}
