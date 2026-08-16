'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ArrowRight, BookOpen, Bot, BriefcaseBusiness, Check, Route } from 'lucide-react'

const GOALS = [
  { id:'mission', icon:BriefcaseBusiness, title:'Réaliser une mission réelle', body:'Partir d’un résultat utile et produire une première preuve.' },
  { id:'collaborateur', icon:Bot, title:'Créer un Collaborateur IA', body:'Transformer une méthode en rôle, compétences, outils et validations.' },
  { id:'formation', icon:BookOpen, title:'Suivre une formation', body:'Rejoindre un parcours guidé et conserver vos livrables.' },
  { id:'cocreateur', icon:Route, title:'Devenir Co-créateur', body:'Apprendre à construire, tester, présenter et commercialiser.' },
] as const

export function AcademyOnboarding({firstName,initialMission,initialPath}:{firstName:string;initialMission?:string;initialPath?:string}){
  const router=useRouter()
  const [goal,setGoal]=useState(initialPath==='co-createur-ia'?'cocreateur':initialMission?'mission':'')
  const [need,setNeed]=useState('')
  const [consent,setConsent]=useState(true)
  const [step,setStep]=useState<1|2>(1)

  function finish(){
    try{sessionStorage.setItem('unitalk_academy_handoff',JSON.stringify({version:1,createdAt:Date.now(),goal,need:need.trim(),mission:initialMission,path:initialPath,consent}))}catch{}
    router.push('/academy/espace?onboarding=complete')
  }

  return <main className="fixed inset-0 z-[70] min-h-screen overflow-y-auto bg-[#F3EFE6] text-[#1C1A17] lg:grid lg:grid-cols-[.78fr_1.22fr]">
    <aside className="relative overflow-hidden bg-[#181615] px-6 py-10 text-white sm:px-10 lg:min-h-screen lg:p-12"><div aria-hidden className="absolute inset-0 opacity-[.06] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:72px_72px]"/><div className="relative flex h-full flex-col"><p className="font-mono text-[10px] font-black uppercase tracking-[.2em] text-[#F2A4C5]">Alma · Coordinatrice de missions IA</p><h1 className="mt-6 font-sf text-[clamp(2.8rem,5vw,5.5rem)] font-semibold leading-[.88] tracking-[-.07em]">Bonjour {firstName}.<br/><span className="text-[#F2A4C5]">Que voulez-vous savoir livrer ?</span></h1><p className="mt-6 max-w-xl text-[16px] leading-8 text-[#CFC6B8]">Je personnalise votre point de départ. Vous retrouverez ensuite vos formations dans le même compte Unitalk.</p><div className="relative mt-10 aspect-[4/3] max-w-md overflow-hidden border border-white/15 lg:mt-auto"><Image src="/alma-avatar.png" alt="Alma, Coordinatrice de missions IA dans Unitalk Academy" fill priority className="object-cover object-top"/><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#181615] via-[#181615]/80 to-transparent p-5 pt-16"><strong className="text-sm">Même Alma. Contexte pédagogique dédié.</strong><p className="mt-1 text-xs text-[#CFC6B8]">Aucun document opérationnel n’est transféré sans votre accord.</p></div></div></div></aside>
    <section className="flex items-center px-5 py-12 sm:px-10 lg:px-16"><div className="mx-auto w-full max-w-3xl">{step===1?<><p className="font-mono text-[10px] font-black uppercase tracking-[.18em] text-[#B00C54]">01 / Votre objectif</p><h2 className="mt-4 font-sf text-4xl font-bold tracking-[-.05em]">Choisissez un résultat, pas un catalogue.</h2><div className="mt-8 grid gap-3 sm:grid-cols-2">{GOALS.map(item=><button key={item.id} type="button" onClick={()=>setGoal(item.id)} aria-pressed={goal===item.id} className={`min-h-48 border p-5 text-left transition ${goal===item.id?'border-[#D10E63] bg-[#FBEAF1] shadow-[inset_4px_0_0_#D10E63]':'border-[#D8D0C2] bg-[#FBF9F3] hover:border-[#D10E63]/50'}`}><item.icon className="size-5 text-[#B00C54]"/><h3 className="mt-7 text-xl font-bold">{item.title}</h3><p className="mt-3 text-sm leading-6 text-[#625B50]">{item.body}</p></button>)}</div><button type="button" disabled={!goal} onClick={()=>setStep(2)} className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#D10E63] px-6 text-sm font-bold text-white disabled:opacity-40">Continuer avec Alma<ArrowRight className="size-4"/></button></>:<><p className="font-mono text-[10px] font-black uppercase tracking-[.18em] text-[#B00C54]">02 / Personnalisation</p><h2 className="mt-4 font-sf text-4xl font-bold tracking-[-.05em]">Montrez-moi le travail.</h2><p className="mt-4 text-[16px] leading-7 text-[#625B50]">Décrivez le problème, le résultat attendu ou la méthode que vous voulez transmettre. Vous pourrez compléter plus tard.</p><textarea value={need} onChange={event=>setNeed(event.target.value)} rows={7} placeholder="Ex. Je veux transformer notre méthode de qualification commerciale en Collaborateur IA et la tester sur dix opportunités…" className="mt-7 w-full border border-[#D8D0C2] bg-[#FBF9F3] p-5 text-[16px] leading-7 outline-none focus:border-[#D10E63] focus:ring-2 focus:ring-[#D10E63]/15"/><label className="mt-5 flex gap-3 border border-[#D8D0C2] bg-[#FBF9F3] p-4 text-sm leading-6"><input type="checkbox" checked={consent} onChange={event=>setConsent(event.target.checked)} className="mt-1 accent-[#D10E63]"/><span>J’autorise le transfert de cet objectif vers mon espace Unitalk afin de personnaliser mes formations. Je pourrai le modifier ou le supprimer.</span></label><div className="mt-7 flex flex-wrap gap-3"><button type="button" onClick={()=>setStep(1)} className="min-h-12 rounded-full border border-[#1C1A17] px-6 text-sm font-bold">Retour</button><button type="button" disabled={!consent} onClick={finish} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#D10E63] px-6 text-sm font-bold text-white disabled:opacity-40">Ouvrir mes Formations<ArrowRight className="size-4"/></button></div><ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-[#625B50]">{['Même compte Unitalk','Objectif modifiable','Aucun achat automatique'].map(item=><li key={item} className="flex items-center gap-2"><Check className="size-3.5 text-[#D10E63]"/>{item}</li>)}</ul></>}</div></section>
  </main>
}
