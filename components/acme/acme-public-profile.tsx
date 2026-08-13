'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { ArrowRight, BadgeCheck, CalendarDays, Mail, Phone, X } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { getAcmeAiBySlug, getAcmeMember, ACME } from '@/lib/acme-demo'
import { UnitalkLogo } from '@/components/unitalk-logo'

export function AcmePublicProfile({ slug }: { slug: string }) {
  const { lang, setLang } = useLanguage()
  const member = getAcmeAiBySlug(slug)
  const [message, setMessage] = useState('')
  const [managerOpen, setManagerOpen] = useState(false)
  const managerButton = useRef<HTMLButtonElement>(null)
  if (!member) return null
  const boss = member.linkedTo ? getAcmeMember(member.linkedTo) : undefined
  const role = lang === 'fr' && member.role.en === 'Executive Assistant' ? 'Assistante de direction' : member.role[lang]
  const templateHref = member.reusableProfileSlug ? `/decouvrir?template=${encodeURIComponent(member.reusableProfileSlug)}` : '/decouvrir'

  return (
    <main className="min-h-screen bg-[#F3EFE6] text-[#1C1A17]">
      <header className="border-b border-[#DED6C8] bg-[#F3EFE6]"><div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 sm:px-8"><Link href="/" className="flex items-center gap-2"><UnitalkLogo size={22}/><span className="text-sm font-bold">Unitalk</span></Link><div className="flex items-center gap-4"><button onClick={()=>setLang(lang==='fr'?'en':'fr')} className="text-xs font-semibold">{lang.toUpperCase()}</button><Link href="/connexion" className="text-sm font-semibold">{lang==='fr'?'Connexion':'Sign in'}</Link><Link href={templateHref} className="hidden bg-[#151310] px-4 py-2.5 text-sm font-bold text-white sm:inline-flex">{lang==='fr'?'Créer à partir de ce profil':'Create from this profile'} →</Link></div></div></header>
      <div className="mx-auto max-w-[1200px] px-5 py-5 sm:px-8"><nav className="text-sm text-[#6E665A]"><span>{ACME.name}</span><span className="mx-2">/</span><Link href="/team" className="hover:text-[#B00C54]">{lang==='fr'?'Équipe':'Team'}</Link><span className="mx-2">/</span><span className="text-[#1C1A17]">{member.name}</span></nav></div>

      <section className="mx-auto grid max-w-[1200px] gap-12 px-5 pb-14 sm:px-8 lg:grid-cols-[5fr_1fr_6fr]">
        <div><p className="label">{lang==='fr'?'Identité IA':'AI identity'}</p>{member.avatar?<Image src={member.avatar} alt={`Portrait public de ${member.name}`} width={420} height={420} priority className="mt-5 aspect-square w-full max-w-[420px] object-cover"/>:<div style={{backgroundColor:member.color}} className="mt-5 flex aspect-square max-w-[420px] items-center justify-center text-8xl font-bold text-white">{member.name[0]}</div>}<h1 className="mt-7 font-sf text-[56px] font-bold tracking-[-0.055em]">{member.name}</h1><p className="mt-2 text-xl font-semibold">{role}<span className="block text-[#6E665A]">{lang==='fr'?'chez':'at'} {ACME.name}</span></p><p className="mt-5 inline-flex items-center gap-2 text-sm font-semibold"><BadgeCheck className="h-4 w-4 text-[#2F5D50]"/>{lang==='fr'?'Identité IA vérifiée par Unitalk':'AI identity verified by Unitalk'}</p>{member.publicSummary&&<p className="mt-6 max-w-lg text-[16px] leading-7 text-[#4E483F]">{member.publicSummary[lang]}</p>}</div>
        <div aria-hidden />
        <div className="self-center"><p className="label">{lang==='fr'?'Interaction':'Interaction'}</p><h2 className="mt-3 font-sf text-[38px] font-bold">{lang==='fr'?`Écrire à ${member.name}`:`Write to ${member.name}`}</h2>{member.publicMessageEnabled?<><label htmlFor={`message-${slug}`} className="mt-6 block text-sm font-semibold">{lang==='fr'?`Écrire à ${member.name}`:`Write to ${member.name}`}</label><textarea id={`message-${slug}`} value={message} onChange={e=>setMessage(e.target.value.slice(0,1000))} rows={5} placeholder={lang==='fr'?'Décrivez votre demande…':'Describe your request…'} className="mt-2 w-full border border-[#DED6C8] bg-[#FAF8F3] p-4"/><button disabled={!message.trim()} className="mt-3 bg-[#2F5D50] px-5 py-3 text-sm font-bold text-white disabled:bg-[#DED6C8] disabled:text-[#6E665A]">{lang==='fr'?`Envoyer le message à ${member.name}`:`Send message to ${member.name}`}</button></>:<div className="mt-6 border-y border-[#1C1A17]/15 py-5 text-sm leading-6 text-[#4E483F]">{lang==='fr'?'La messagerie publique n’est pas activée pour ce profil. Utilisez uniquement les canaux publiés ci-dessous.':'Public messaging is not enabled for this profile. Use the published channels below.'}</div>}<div className="mt-6 flex flex-col gap-3 sm:flex-row">{member.publicCalendarHref&&<Contact href={member.publicCalendarHref} icon={<CalendarDays/>} label={`${lang==='fr'?'Prendre rendez-vous avec':'Book a meeting with'} ${member.name}`}/>} {member.publicEmail&&<Contact href={`mailto:${member.publicEmail}`} icon={<Mail/>} label={`${lang==='fr'?'Envoyer un email à':'Email'} ${member.name}`}/>} {member.publicPhone&&<Contact href={`tel:${member.publicPhone}`} icon={<Phone/>} label={`${lang==='fr'?'Appeler':'Call'} ${member.name}`}/>}</div><p className="mt-8 text-sm leading-6 text-[#6E665A]">{lang==='fr'?'La mémoire, les données, les conversations et les accès d’Emma ne sont jamais copiés.':'Emma’s memory, data, conversations and access are never copied.'}</p></div>
      </section>

      {boss&&<section className="border-y border-[#DED6C8] bg-[#EAE4D9] px-5 py-10 sm:px-8"><div className="mx-auto flex max-w-[1200px] flex-col justify-between gap-6 sm:flex-row sm:items-center"><div><p className="label">{lang==='fr'?'Supervision humaine':'Human supervision'}</p><h2 className="mt-3 font-sf text-[30px] font-bold">{boss.name} {lang==='fr'?`supervise l’identité, les responsabilités et les accès d’${member.name}.`:`supervises ${member.name}’s identity, responsibilities and access.`}</h2></div><button ref={managerButton} onClick={()=>setManagerOpen(true)} className="shrink-0 border border-[#1C1A17] px-5 py-3 text-sm font-bold">{lang==='fr'?`Contacter ${boss.name.split(' ')[0]}`:`Contact ${boss.name.split(' ')[0]}`} →</button></div></section>}

      <section className="mx-auto max-w-[1100px] px-5 py-16 sm:px-8"><h2 className="font-sf text-[38px] font-bold">{lang==='fr'?`Ce qu’${member.name} peut prendre en charge`:`What ${member.name} can handle`}</h2><div className="mt-8 grid gap-10 sm:grid-cols-2"><PublicList title={lang==='fr'?'Responsabilités publiques':'Public responsibilities'} items={['Préparer les rendez-vous','Coordonner les demandes','Organiser les priorités','Suivre les décisions']}/><PublicList title={lang==='fr'?'Compétences publiques':'Public skills'} items={['Gestion d’agenda','Préparation de réunions','Synthèse','Suivi d’actions']}/></div></section>

      <section className="bg-[#151310] px-5 py-12 text-[#FAF8F3] sm:px-8"><div className="mx-auto flex max-w-[1100px] flex-col justify-between gap-6 sm:flex-row sm:items-center"><div><p className="label text-[#F2A4C5]">Unitalk</p><h2 className="mt-2 font-sf text-3xl font-bold">{lang==='fr'?'Créez votre propre Collaborateur IA.':'Create your own AI Collaborator.'}</h2></div><Link href={templateHref} className="bg-[#D10E63] px-6 py-3 text-sm font-bold">{lang==='fr'?'Créer à partir de ce profil':'Create from this profile'} →</Link></div></section>

      {managerOpen&&<ManagerDialog name={boss?.name??''} onClose={()=>{setManagerOpen(false);requestAnimationFrame(()=>managerButton.current?.focus())}}/>}
    </main>
  )
}

function Contact({href,icon,label}:{href:string;icon:React.ReactNode;label:string}){return <a href={href} className="inline-flex min-h-11 items-center gap-2 border border-[#DED6C8] px-4 text-sm font-semibold">{icon}{label}</a>}
function PublicList({title,items}:{title:string;items:string[]}){return <div><h3 className="font-sf text-2xl font-bold">{title}</h3><ul className="mt-4 space-y-3 text-[#4E483F]">{items.map(x=><li key={x} className="border-b border-[#DED6C8] pb-3">{x}</li>)}</ul></div>}
function ManagerDialog({name,onClose}:{name:string;onClose:()=>void}){return <div role="dialog" aria-modal="true" aria-labelledby="manager-title" onKeyDown={e=>{if(e.key==='Escape')onClose()}} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5"><div className="relative w-full max-w-md bg-[#FAF8F3] p-6"><button autoFocus onClick={onClose} aria-label="Fermer" className="absolute right-4 top-4"><X/></button><h2 id="manager-title" className="font-sf text-3xl font-bold">Contacter {name}</h2><p className="mt-4 text-[#4E483F]">Les canaux publics directs de ce responsable ne sont pas activés. Consultez son profil public Unitalk.</p><Link href="/team" className="mt-6 inline-flex bg-[#151310] px-5 py-3 text-sm font-bold text-white">Voir le profil public →</Link></div></div>}
