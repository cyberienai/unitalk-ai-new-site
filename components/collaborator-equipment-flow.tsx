'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, Check, Eye, EyeOff, LockKeyhole } from 'lucide-react'
import type { RoleDetail } from '@/lib/collaborators-catalog'
import { buildEquipmentDraft, saveEquipmentDraft, type CollaboratorEquipmentDraft, type EquipmentItem, type EquipmentVisibility } from '@/lib/collaborator-equipment'

type Stage = 'request' | 'proposal' | 'installed'

export function CollaboratorEquipmentFlow({ detail }: { detail: RoleDetail }) {
  const router = useRouter()
  const [stage, setStage] = useState<Stage>('request')
  const [request, setRequest] = useState('')
  const [draft, setDraft] = useState<CollaboratorEquipmentDraft | null>(null)

  function prepare(value = request) {
    const clean = value.trim()
    if (!clean) return
    setRequest(clean)
    setDraft(buildEquipmentDraft(detail.slug, detail.name, clean))
    setStage('proposal')
  }

  function setVisibility(type: EquipmentItem['type'], id: string, visibility: EquipmentVisibility) {
    setDraft((current) => {
      if (!current) return current
      if (type === 'mission' || type === 'profile') return { ...current, [type]: { ...current[type], visibility } }
      const key = type === 'skill' ? 'skills' : 'applications'
      return { ...current, [key]: current[key].map((item) => item.id === id ? { ...item, visibility } : item) }
    })
  }

  function install() {
    if (!draft) return
    saveEquipmentDraft(draft)
    setStage('installed')
  }

  const examples = [
    `Je veux que ${detail.name} prépare mes réunions et suive les décisions.`,
    `Je veux que ${detail.name} qualifie de nouveaux prospects dans mon CRM.`,
    `Je veux que ${detail.name} traite les demandes clients et me soumette les cas sensibles.`,
  ]

  return (
    <section id="equiper" className="scroll-mt-24 border-y border-[#D8D0C2] bg-[#EAE3D4] px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid overflow-hidden rounded-[32px] border border-[#CFC5B5] bg-[#FAF8F3] shadow-[0_32px_90px_-60px_rgba(28,26,23,.7)] lg:grid-cols-[.72fr_1.28fr]">
          <aside className="relative overflow-hidden bg-[#181615] p-7 text-white sm:p-9">
            <div aria-hidden className="absolute -right-20 -top-24 size-64 rounded-full bg-[#D10E63]/20 blur-3xl" />
            <div className="relative flex items-center gap-3"><Image src="/alma-avatar.png" alt="Alma" width={44} height={44} className="size-11 rounded-full object-cover ring-2 ring-[#D10E63]/40"/><div><p className="font-sf font-semibold">Alma</p><p className="text-xs text-[#F2A4C5]">Coordinatrice IA de missions</p></div></div>
            <p className="relative mt-10 font-mono text-[10px] font-black uppercase tracking-[.18em] text-[#F2A4C5]">Équiper {detail.name}</p>
            <h2 className="relative mt-4 font-sf text-[34px] font-semibold leading-[1.02] tracking-[-.045em]">Dites ce que {detail.name} doit pouvoir accomplir.</h2>
            <p className="relative mt-5 text-sm leading-7 text-[#CFC6B8]">Alma propose la mission, le profil métier, les compétences, les applications compatibles et les validations. Rien n’est connecté ou publié sans confirmation.</p>
            <div className="relative mt-8 space-y-3 border-t border-white/10 pt-6 text-xs text-[#D8D0C2]"><p className="flex gap-2"><Check className="size-4 text-[#F2A4C5]"/>Mémoire et accès restent privés</p><p className="flex gap-2"><Check className="size-4 text-[#F2A4C5]"/>Le créateur choisit ce qui devient public</p><p className="flex gap-2"><Check className="size-4 text-[#F2A4C5]"/>Droits sensibles confirmés avant installation</p></div>
          </aside>

          <div className="p-6 sm:p-9">
            {stage === 'request' && <div><p className="font-mono text-[10px] font-black uppercase tracking-[.16em] text-[#B00C54]">Conversation avec Alma</p><label htmlFor="equipment-request" className="mt-5 block font-sf text-2xl font-semibold">Quel travail voulez-vous lui confier ?</label><textarea id="equipment-request" value={request} onChange={event=>setRequest(event.target.value)} rows={5} placeholder={`Ex. Je veux que ${detail.name}…`} className="mt-4 w-full resize-none rounded-2xl border border-[#D8D0C2] bg-white p-4 text-sm leading-6 outline-none focus:border-[#D10E63] focus:ring-4 focus:ring-[#D10E63]/10"/><div className="mt-3 flex flex-wrap gap-2">{examples.map(example=><button key={example} type="button" onClick={()=>{setRequest(example);prepare(example)}} className="rounded-full border border-[#D8D0C2] px-3 py-1.5 text-left text-xs font-semibold text-[#625B50] hover:border-[#D10E63]/50 hover:text-[#B00C54]">{example}</button>)}</div><button type="button" disabled={!request.trim()} onClick={()=>prepare()} className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#D10E63] px-7 text-sm font-bold text-white disabled:opacity-40">Préparer avec Alma<ArrowRight className="size-4"/></button></div>}

            {stage === 'proposal' && draft && <div><div className="flex items-center justify-between gap-4"><div><p className="font-mono text-[10px] font-black uppercase tracking-[.16em] text-[#B00C54]">Configuration proposée par Alma</p><h3 className="mt-3 font-sf text-3xl font-semibold tracking-[-.04em]">À vérifier avant installation</h3></div><button type="button" onClick={()=>setStage('request')} className="inline-flex items-center gap-1.5 text-xs font-bold text-[#625B50]"><ArrowLeft className="size-4"/>Modifier la demande</button></div><div className="mt-7 space-y-4"><EquipmentRow item={draft.mission} onVisibility={setVisibility}/><EquipmentRow item={draft.profile} onVisibility={setVisibility}/><EquipmentGroup title="Compétences" items={draft.skills} onVisibility={setVisibility}/><EquipmentGroup title="Applications compatibles" items={draft.applications} onVisibility={setVisibility}/><section className="rounded-2xl border border-[#D8D0C2] bg-white p-5"><p className="font-mono text-[10px] font-black uppercase tracking-[.14em] text-[#8A8175]">Validations privées</p><ul className="mt-3 space-y-2">{draft.approvals.map(item=><li key={item} className="flex gap-2 text-sm text-[#3F3A33]"><LockKeyhole className="mt-0.5 size-4 shrink-0 text-[#B00C54]"/>{item}</li>)}</ul></section></div><div className="mt-7 flex flex-col gap-3 sm:flex-row"><button type="button" onClick={install} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#D10E63] px-7 text-sm font-bold text-white">Vérifier et installer<ArrowRight className="size-4"/></button><button type="button" onClick={()=>setStage('request')} className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#D8D0C2] px-6 text-sm font-bold">Annuler</button></div></div>}

            {stage === 'installed' && draft && <div className="flex min-h-[420px] flex-col items-center justify-center text-center"><span className="flex size-16 items-center justify-center rounded-full bg-[#D10E63]/10 text-[#B00C54]"><Check className="size-8" strokeWidth={2.5}/></span><p className="mt-6 font-mono text-[10px] font-black uppercase tracking-[.16em] text-[#B00C54]">Brouillon installé</p><h3 className="mt-3 max-w-lg font-sf text-4xl font-semibold tracking-[-.045em]">{detail.name} est équipé pour cette mission.</h3><p className="mt-4 max-w-xl text-sm leading-7 text-[#625B50]">La configuration est conservée localement pour cette simulation. Les applications restent compatibles, mais non connectées. Les éléments publics pourront apparaître sur le profil après publication.</p><div className="mt-7 flex flex-col gap-3 sm:flex-row"><button type="button" onClick={()=>router.push(`/collaborateurs/${detail.slug}?equipment=${encodeURIComponent(draft.id)}#equipement-public`)} className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#181615] px-6 text-sm font-bold text-white">Voir le profil public préparé</button><button type="button" onClick={()=>{setStage('request');setRequest('');setDraft(null)}} className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#D8D0C2] px-6 text-sm font-bold">Nouvelle configuration</button></div></div>}
          </div>
        </div>
      </div>
    </section>
  )
}

function EquipmentGroup({title,items,onVisibility}:{title:string;items:EquipmentItem[];onVisibility:(type:EquipmentItem['type'],id:string,visibility:EquipmentVisibility)=>void}){return <section className="rounded-2xl border border-[#D8D0C2] bg-white p-5"><p className="font-mono text-[10px] font-black uppercase tracking-[.14em] text-[#8A8175]">{title}</p><div className="mt-3 space-y-2">{items.map(item=><EquipmentLine key={item.id} item={item} onVisibility={onVisibility}/>)}</div></section>}
function EquipmentRow({item,onVisibility}:{item:EquipmentItem;onVisibility:(type:EquipmentItem['type'],id:string,visibility:EquipmentVisibility)=>void}){return <section className="rounded-2xl border border-[#D8D0C2] bg-white p-5"><p className="font-mono text-[10px] font-black uppercase tracking-[.14em] text-[#8A8175]">{item.type==='mission'?'Mission':'Profil métier'}</p><div className="mt-3"><EquipmentLine item={item} onVisibility={onVisibility}/></div></section>}
function EquipmentLine({item,onVisibility}:{item:EquipmentItem;onVisibility:(type:EquipmentItem['type'],id:string,visibility:EquipmentVisibility)=>void}){const isPublic=item.visibility==='public';return <div className="flex items-center justify-between gap-4 rounded-xl bg-[#F3EFE6] px-3 py-2.5"><span className="text-sm font-semibold">{item.label}</span><button type="button" onClick={()=>onVisibility(item.type,item.id,isPublic?'private':'public')} className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold ${isPublic?'bg-[#D10E63]/10 text-[#B00C54]':'bg-[#E2DCCE] text-[#625B50]'}`}>{isPublic?<Eye className="size-3"/>:<EyeOff className="size-3"/>}{isPublic?'Public':'Privé'}</button></div>}
