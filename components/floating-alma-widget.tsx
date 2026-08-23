'use client'

import { useEffect, useId, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, X } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { useAlma } from '@/lib/alma-context'

const COPY = {
  fr: { close:'Fermer', tooltip:'Parler à Alma', role:'Collaboratrice IA · Coordinatrice de missions chez Unitalk', title:'Quel travail voulez-vous confier à votre Collaborateur IA ?', placeholder:'Décrivez votre besoin en une phrase…', continue:'Continuer', signIn:'J’ai déjà un compte · Me connecter', note:'Votre demande est conservée pour continuer après connexion.' },
  en: { close:'Close', tooltip:'Talk to Alma · AI mission coordinator', role:'Unitalk AI mission coordinator', title:'What work would you like to assign to your AI Collaborator?', placeholder:'Describe your need in one sentence…', continue:'Continue', signIn:'I already have an account · Sign in', note:'Your request is saved so you can continue after sign-in.' },
} as const

export function FloatingAlmaWidget() {
  const { isOpen, toggleAlma, closeAlma, launcherSuppressed } = useAlma()
  const { lang } = useLanguage()
  const pathname = usePathname()
  const router = useRouter()
  const t = COPY[lang]
  const [need, setNeed] = useState('')
  const launcherRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const titleId = useId()
  const missionDetail = pathname.startsWith('/missions/') || pathname.startsWith('/en/missions/')
  const hidden = pathname === '/' || pathname === '/accueil-2' || pathname === '/decouvrir' || pathname === '/missions' || missionDetail || pathname === '/tarifs' || pathname === '/alma' || pathname === '/unitalk/@alma' || pathname === '/collaborateurs-ia/profils-metier' || pathname.startsWith('/team/') || /^\/@[^/]+$/.test(pathname) || launcherSuppressed

  useEffect(() => {
    if (!isOpen) return
    const focusable = () => Array.from(dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), textarea, a[href]') ?? [])
    requestAnimationFrame(() => dialogRef.current?.querySelector<HTMLTextAreaElement>('textarea')?.focus())
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeAlma()
        requestAnimationFrame(() => launcherRef.current?.focus())
        return
      }
      if (event.key !== 'Tab') return
      const items = focusable()
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [closeAlma, isOpen])

  function continueFlow() {
    const clean = need.trim()
    if (!clean) return
    const draftId = `draft_${crypto.randomUUID()}`
    try { localStorage.setItem(`unitalk_mission_${draftId}`, JSON.stringify({ text: clean, createdAt: Date.now() })) } catch {}
    closeAlma()
    router.push(`/decouvrir?draft=${encodeURIComponent(draftId)}&source=alma-profile`)
  }

  return <>
    {!hidden && <div className="fixed bottom-6 right-6 z-40"><motion.button ref={launcherRef} type="button" onClick={toggleAlma} initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} transition={{delay:.4,duration:.25}} aria-label={isOpen?t.close:t.tooltip} aria-expanded={isOpen} aria-controls="alma-dialog" title={isOpen?t.close:t.tooltip} className={`overflow-hidden rounded-full bg-[#F3EFE6] shadow-[0_12px_32px_-8px_rgba(28,26,23,.35)] ring-2 ring-[#D10E63]/40 ${missionDetail?'size-12':'size-16'}`}>{isOpen?<span className="flex size-full items-center justify-center bg-[#D10E63] text-white"><X className="size-5"/></span>:<Image src="/alma-avatar.png" alt="" width={64} height={64} className="size-full object-cover"/>}</motion.button></div>}
    <AnimatePresence>{isOpen && <><motion.button type="button" aria-label={t.close} onClick={closeAlma} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-40 cursor-default bg-black/20"/><motion.div ref={dialogRef} id="alma-dialog" role="dialog" aria-modal="true" aria-labelledby={titleId} initial={{opacity:0,scale:.92,y:16}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:.94,y:12}} className={`fixed right-4 z-50 w-[min(390px,calc(100vw-2rem))] overflow-hidden rounded-[26px] border border-[#D8D0C2] bg-[#FAF8F3] shadow-[0_30px_90px_-30px_rgba(28,26,23,.55)] ${hidden?'bottom-4':'bottom-28'}`}>
      <header className="flex items-center justify-between border-b border-[#E4DCCC] px-5 py-4"><div className="flex items-center gap-3"><Image src="/alma-avatar.png" alt="" width={40} height={40} className="size-10 rounded-full object-cover ring-2 ring-[#D10E63]/25"/><div><p className="text-sm font-semibold">Alma</p><p className="text-xs text-[#857C6E]">{t.role}</p></div></div><button type="button" onClick={() => { closeAlma(); requestAnimationFrame(() => launcherRef.current?.focus()) }} aria-label={t.close} className="flex size-11 items-center justify-center rounded-full hover:bg-[#EAE3D4]"><X className="size-4"/></button></header>
      <div className="p-5"><h2 id={titleId} className="text-2xl font-semibold tracking-[-.035em]">{t.title}</h2><textarea value={need} onChange={event=>setNeed(event.target.value)} rows={4} placeholder={t.placeholder} className="mt-4 w-full resize-none rounded-2xl border border-[#D8D0C2] bg-white p-4 text-sm leading-6 outline-none placeholder:text-[#A79E8E] focus:border-[#D10E63] focus:ring-2 focus:ring-[#D10E63]/15"/><button type="button" onClick={continueFlow} disabled={!need.trim()} className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#D10E63] px-6 text-sm font-bold text-white disabled:opacity-40">{t.continue}<ArrowRight className="size-4"/></button><Link href={`/connexion?redirect=${encodeURIComponent(pathname)}`} onClick={closeAlma} className="mt-4 block text-center text-sm font-bold text-[#4E483F] underline decoration-[#D10E63]/30 underline-offset-4">{t.signIn}</Link><p className="mt-4 text-center text-xs leading-5 text-[#857C6E]">{t.note}</p></div>
    </motion.div></>}</AnimatePresence>
  </>
}
