'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useLanguage } from '@/lib/language-context'
import { configurationTotal, unitalkPricing, type AiCapacityId } from '@/lib/unitalk-pricing'
import { formatEuro } from './format'

export function PricingConfigurator() {
  const { lang } = useLanguage()
  const router = useRouter()
  const params = useSearchParams()
  const fr = lang === 'fr'
  const [quantity, setQuantity] = useState(1)
  const [capacity, setCapacity] = useState<AiCapacityId>('quarterTime')
  const [alma, setAlma] = useState(true)
  const [cocreator, setCocreator] = useState(params.get('co-createur') === 'true')
  useEffect(() => { if (params.get('co-createur') === 'true') setCocreator(true) }, [params])
  const current = configurationTotal(quantity, capacity, alma, cocreator, true)
  const future = configurationTotal(quantity, capacity, alma, cocreator, false)
  const cap = unitalkPricing.aiCapacity[capacity]

  function start() {
    sessionStorage.setItem('unitalk_pricing_selection', JSON.stringify({ quantity, capacity, alma, cocreator, monthlyTotal: current }))
    router.push('/decouvrir')
  }

  return <section id="configurateur" className="mx-auto max-w-[1120px] px-5 pb-20 sm:px-8"><div className="grid border-y border-[#1C1A17]/15 lg:grid-cols-[1fr_340px]"><div className="lg:border-r lg:border-[#1C1A17]/15">
    <ConfigRow n="01" title="Collaborateur IA"><p className="text-sm text-[#4E483F]">{fr?'Identité et environnement de travail.':'Identity and work environment.'}</p><div className="mt-5 inline-flex border border-[#DED6C8]"><button onClick={()=>setQuantity(q=>Math.max(1,q-1))} className="h-11 w-11">−</button><span className="flex min-w-14 items-center justify-center border-x border-[#DED6C8] font-bold">{quantity}</span><button onClick={()=>setQuantity(q=>q+1)} className="h-11 w-11">+</button></div><p className="mt-3 font-semibold">{formatEuro(unitalkPricing.aiCollaborator.monthlyPrice,lang)}/{fr?'mois':'month'} {fr?'par Collaborateur IA':'per AI Collaborator'}</p></ConfigRow>
    <ConfigRow n="02" title="Capacité IA"><p className="text-sm text-[#4E483F]">{fr?'Une capacité pour réfléchir, créer et coder.':'Capacity to think, create and code.'}</p><select value={capacity} onChange={e=>setCapacity(e.target.value as AiCapacityId)} className="mt-5 h-12 w-full max-w-xl border border-[#DED6C8] bg-white px-4">{Object.entries(unitalkPricing.aiCapacity).map(([id,c])=><option key={id} value={id}>{c.label} · {c.tokens?`${c.tokens/1_000_000} M`:'vos clés'} · {formatEuro(id==='quarterTime'?0:c.monthlyPrice,lang)}/{fr?'mois':'month'}</option>)}</select><p className="mt-4 text-sm leading-6 text-[#6E665A]">{fr?'Texte · Code · Image · Audio · Vidéo. Texte et code sont comptés en tokens ; les autres modalités suivent les règles de conversion du modèle utilisé.':'Text · Code · Image · Audio · Video. Text and code are counted in tokens; other modalities follow each model’s conversion rules.'}</p><p className="mt-3 font-semibold">{fr?'Les crédits IA financent l’intelligence qui écrit et analyse le code. L’environnement privé fournit les ressources qui l’exécutent.':'AI credits fund the intelligence that writes and analyzes code. The private environment provides execution resources.'}</p></ConfigRow>
    <ConfigRow n="03" title="Alma"><Check checked={alma} onChange={setAlma} label={fr?'Ajouter Alma à ce Collaborateur IA':'Add Alma to this AI Collaborator'}/><p className="mt-3 text-sm">{formatEuro(unitalkPricing.alma.monthlyPricePerCollaborator,lang)}/{fr?'mois':'month'} · {fr?'0 € jusqu’au 21 décembre 2026':'€0 until December 21, 2026'}</p></ConfigRow>
    <ConfigRow n="04" title="Co-créateur IA"><Check checked={cocreator} onChange={setCocreator} label={fr?'Ajouter la Licence Co-créateur IA Unitalk':'Add the Unitalk AI Co-creator License'}/><p className="mt-3 text-sm">{formatEuro(unitalkPricing.aiCocreator.monthlyPrice,lang)}/{fr?'mois':'month'}</p><p className="mt-3 text-sm text-[#4E483F]">{fr?'Créer, versionner, publier, partager et monétiser des profils métier, compétences et missions.':'Create, version, publish, share and monetize job profiles, skills and missions.'}</p><Link href="/co-createur-ia" className="mt-4 inline-flex text-sm font-bold text-[#B00C54]">{fr?'Découvrir la licence':'Discover the license'} →</Link></ConfigRow>
  </div><aside className="h-fit p-6 lg:sticky lg:top-24"><p className="label">{fr?'Votre configuration':'Your configuration'}</p><Summary label={`${quantity} ${fr?'Collaborateur IA':'AI Collaborator'}`} value={quantity*49}/><Summary label={`${cap.label} · ${cap.tokens?`${cap.tokens/1_000_000} M`:'BYOK'}`} value={quantity*(capacity==='quarterTime'?0:cap.monthlyPrice)}/><Summary label="Alma" value={alma?0:null}/><Summary label={fr?'Licence Co-créateur':'Co-creator License'} value={cocreator?50:null}/><div className="mt-5 border-t border-[#1C1A17]/15 pt-5"><p className="text-sm text-[#6E665A]">Total</p><p className="font-sf text-[44px] font-bold">{formatEuro(current,lang)}/{fr?'mois':'month'}</p></div><button onClick={start} className="mt-6 w-full bg-[#D10E63] px-5 py-3 text-sm font-bold text-white">{fr?'Commencer gratuitement':'Start free'} →</button><div className="mt-8 border-t border-[#1C1A17]/15 pt-5 text-xs leading-6 text-[#6E665A]"><p><strong>{fr?'Aujourd’hui':'Today'}</strong><br/>7 {fr?'jours gratuits':'free days'} · 1 M tokens</p><p className="mt-3"><strong>22/12/2026</strong><br/>+ {alma?formatEuro(quantity*50,lang):formatEuro(0,lang)} Alma</p><p className="mt-3"><strong>01/01/2027</strong><br/>{fr?'Total futur':'Future total'} : {formatEuro(future,lang)}/{fr?'mois':'month'}</p></div></aside></div></section>
}

function ConfigRow({n,title,children}:{n:string;title:string;children:React.ReactNode}){return <div className="border-b border-[#1C1A17]/15 p-6 sm:p-8"><p className="font-mono text-[10px] text-[#B00C54]">{n}</p><h2 className="mt-2 font-sf text-3xl font-bold">{title}</h2><div className="mt-4">{children}</div></div>}
function Check({checked,onChange,label}:{checked:boolean;onChange:(v:boolean)=>void;label:string}){return <label className="flex items-start gap-3 font-semibold"><input type="checkbox" checked={checked} onChange={e=>onChange(e.target.checked)} className="mt-1 h-4 w-4 accent-[#D10E63]"/>{label}</label>}
function Summary({label,value}:{label:string;value:number|null}){return <div className="mt-4 flex justify-between gap-4 text-sm"><span>{label}</span><strong>{value===null?'non sélectionnée':`${value} €`}</strong></div>}

export function MultiCollaboratorConfigurator(){return null}
