'use client'

import { useRef, useState, type TouchEvent } from 'react'
import Image from 'next/image'
import { LocalizedLink as Link } from '@/components/localized-link'
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Database,
  LockKeyhole,
  Mail,
  Phone,
  Server,
  ShieldCheck,
  Volume2,
  type LucideIcon,
} from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { MARKETPLACE_COLLABORATOR_SLUGS, ROLE_DETAILS } from '@/lib/collaborators-catalog'
import { Kicker } from '@/components/home/section-kicker'
import { UnitalkLogo } from '@/components/unitalk-logo'
import { AlmaInline } from '@/components/alma-inline'
import { collaboratorProfileHref, localizedHref } from '@/lib/i18n-routing'

const MARKETPLACE_LINKS = [
  { href: '/marketplace/profils-metier', key: 'profiles' },
  { href: '/marketplace/competences', key: 'skills' },
  { href: '/marketplace/applications', key: 'apps' },
] as const

export function CollaborateurExperience() {
  const { lang } = useLanguage()
  const t = COPY[lang]

  return (
    <main id="main-content" className="overflow-hidden bg-[#F3EFE6] font-sf text-[#191715]">
      <section aria-labelledby="collaborateurs-ia-title" className="relative overflow-hidden border-b border-[#D8CEBE] bg-[#EAE3D4] pb-14 pt-28 sm:pb-20 sm:pt-36 lg:flex lg:min-h-[100svh] lg:items-center lg:pb-5 lg:pt-[88px] [@media(min-width:1024px)_and_(max-height:850px)]:pb-3 [@media(min-width:1024px)_and_(max-height:850px)]:pt-20">
        <div aria-hidden className="absolute inset-0 opacity-[.045] [background-image:linear-gradient(#191715_1px,transparent_1px),linear-gradient(90deg,#191715_1px,transparent_1px)] [background-size:56px_56px]" />
        <div aria-hidden className="absolute -right-40 top-12 size-[38rem] rounded-full bg-[#D10E63]/[.08] blur-3xl" />
        <div className="editorial-shell relative grid min-w-0 items-center gap-9 sm:gap-12 lg:grid-cols-[1.16fr_.84fr] lg:gap-14 [@media(min-width:1024px)_and_(max-height:850px)]:gap-9">
            <div className="max-w-[760px] lg:pr-2">
              <div className="mb-4 flex justify-center min-[390px]:mb-5 sm:mb-6 sm:justify-start"><Kicker>{t.eyebrow}</Kicker></div>
              <h1 id="collaborateurs-ia-title" className="text-balance text-center font-sf text-[clamp(2.15rem,4.5vw,4rem)] font-semibold leading-[.92] tracking-[-.06em] text-[#1C1A17] sm:text-left [@media(min-width:1024px)_and_(max-height:850px)]:text-[clamp(2.1rem,3.4vw,3.2rem)]"><span className="block">{t.heroTitlePrefix} <span className="whitespace-nowrap">{t.heroTitleRole}</span> {t.heroTitleEnd}</span><span className="mt-1 block text-[#D10E63]">{t.heroAccent}</span></h1>
              <p className="mx-auto mt-5 max-w-2xl text-balance text-center text-[15px] font-medium leading-6 text-[#4E483F] min-[390px]:text-base min-[390px]:leading-7 sm:mx-0 sm:text-left md:text-[17px] md:leading-8">{t.heroLead}</p>
               <div className="mt-6 flex flex-col items-stretch gap-2.5 min-[390px]:gap-3 sm:flex-row sm:items-start [@media(min-width:1024px)_and_(max-height:850px)]:mt-5">
                <Link href={`${localizedHref('discover', lang)}?source=collaborateurs-ia-hero`} className="inline-flex min-h-13 items-center justify-center rounded-full bg-[#D10E63] px-6 text-center text-sm font-bold text-white shadow-[0_16px_36px_-22px_rgba(209,14,99,.8)] outline-none transition hover:-translate-y-0.5 hover:bg-[#B90C58] focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2">{t.start}</Link>
                <Link href={localizedHref('collaboratorsMarketplace', lang)} className="inline-flex min-h-13 items-center justify-center rounded-full border border-[#BFB4A4] bg-[#FAF8F3]/75 px-6 text-center text-sm font-bold outline-none transition hover:border-[#191715] hover:bg-[#191715] hover:text-white focus-visible:ring-2 focus-visible:ring-[#D10E63]">{t.explore}</Link>
               </div>
               <p className="mt-4 text-center text-xs font-bold text-[#4E483F] sm:text-left">{t.heroOffer}</p>
               <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] font-medium text-[#6B6560] min-[390px]:text-xs sm:justify-start">{t.reassurance.map(item => <span key={item} className="inline-flex items-center gap-1.5"><Check className="size-3.5 text-[#D10E63]" strokeWidth={2.5}/>{item}</span>)}<span className="inline-flex items-center gap-1.5 whitespace-nowrap"><AlmaInline />{t.almaGuidance}</span></div>
            </div>
            <IdentityCarousel lang={lang} labels={t.identityCarousel} />
        </div>
      </section>

      <section aria-labelledby="rattachement-title" className="border-b border-[#CFC5B5] bg-[#FAF8F3] py-14 sm:py-20 [@media(min-width:1024px)_and_(max-height:850px)]:py-14">
        <div className="editorial-shell">
           <SectionHeading id="rattachement-title" kicker={t.placeKicker} title={t.placeTitle} body={t.placeBody} />
           <p className="mt-5 max-w-4xl text-sm font-semibold leading-6 text-[#514A42]">{t.placeContinuity}</p>
          <div className="mt-8 overflow-hidden rounded-[20px] border border-[#CFC5B5] bg-[#FAF8F3] sm:mt-10">
            <div className="grid border-b border-[#CFC5B5] px-6 py-4 sm:grid-cols-[1fr_auto] sm:items-center sm:px-7"><p className="text-sm font-bold">{t.placementChoiceTitle}</p><p className="mt-1 text-xs text-[#766D61] sm:mt-0">{t.placementChoiceBody}</p></div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4">
              {t.placements.map((label, index) => <div key={label} className={`group border-[#CFC5B5] p-5 transition-colors hover:bg-white sm:p-6 ${index > 0 ? 'border-t sm:[&:nth-child(2)]:border-t-0' : ''} ${index % 2 === 1 ? 'sm:border-l' : ''} ${index >= 2 ? 'lg:border-t-0' : ''} ${index > 0 ? 'lg:border-l' : ''}`}><span className="block h-0.5 w-8 bg-[#D10E63] transition-all group-hover:w-14"/><h3 className="mt-5 text-xl font-semibold tracking-[-.03em]">{label}</h3><p className="mt-2.5 text-sm leading-6 text-[#625B50]">{t.placementDescriptions[index]}</p></div>)}
            </div>
          </div>
          <div className="mt-4 overflow-hidden rounded-[20px] border border-[#CFC5B5] bg-[#EAE3D4]">
            <div className="grid gap-px bg-[#CFC5B5] sm:grid-cols-2 lg:grid-cols-4">
              <ResourceFact icon={LockKeyhole} title={t.privateMemory} body={t.privateMemoryBody} />
              <ResourceFact icon={Database} title={t.sharedKnowledge} body={t.sharedKnowledgeBody} />
              <ResourceFact icon={Mail} title={t.communication} body={t.communicationBody} />
              <ResourceFact icon={Server} title={t.sovereignty} body={t.sovereigntyBody} />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="mission-proof-title" className="border-b border-[#CFC5B5] bg-[#191715] py-14 text-white sm:py-16 [@media(min-width:1024px)_and_(max-height:850px)]:py-12">
        <div className="editorial-shell">
          <div className="grid gap-7 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div><Kicker dark>{t.proofKicker}</Kicker><h2 id="mission-proof-title" className="mt-5 max-w-2xl text-balance text-[clamp(2rem,3.8vw,3.6rem)] font-semibold leading-[.95] tracking-[-.055em]">{t.proofTitle}</h2></div>
            <p className="max-w-xl text-sm leading-7 text-[#CFC6B8] sm:text-[15px]">{t.proofBody}</p>
          </div>
          <ol className="mt-8 grid overflow-hidden rounded-[20px] border border-white/10 bg-white/10 md:grid-cols-3">
            {t.proofSteps.map((step, index) => <li key={step.title} className={`bg-[#211E1B] p-5 sm:p-6 ${index > 0 ? 'border-t border-white/10 md:border-l md:border-t-0' : ''}`}><span className="font-mono text-[9px] font-black uppercase tracking-[.16em] text-[#F2A4C5]">{step.label}</span><h3 className="mt-4 text-xl font-semibold tracking-[-.03em]">{step.title}</h3><p className="mt-2.5 text-sm leading-6 text-[#AFA397]">{step.body}</p></li>)}
          </ol>
          <div className="mt-4 grid overflow-hidden rounded-[20px] border border-white/10 lg:grid-cols-[1fr_.8fr]">
             <div className="bg-[#F3EFE6] p-6 text-[#191715] sm:p-7"><p className="font-mono text-[9px] font-black uppercase tracking-[.16em] text-[#B00C54]">{t.proofIllustration}</p><p className="mt-3 text-xs font-bold text-[#857C6E]">{t.proofDeliverableLabel}</p><h3 className="mt-2 text-2xl font-semibold tracking-[-.04em]">{t.proofDeliverable}</h3><p className="mt-3 text-sm leading-6 text-[#625B50]">{t.proofDeliverableBody}</p></div>
            <div className="bg-[#D10E63] p-6 sm:p-7"><p className="font-mono text-[9px] font-black uppercase tracking-[.16em] text-white/65">{t.proofApprovalLabel}</p><p className="mt-3 text-lg font-semibold leading-7">{t.proofApproval}</p><span className="mt-5 inline-flex rounded-full bg-white px-4 py-2 text-xs font-bold text-[#B00C54]">{t.proofWaiting}</span></div>
          </div>
           <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
             <p className="max-w-3xl text-sm leading-6 text-[#CFC6B8]">{t.workspaceBridge}</p>
             <div className="flex shrink-0 flex-wrap gap-3"><Link href={localizedHref('workspace', lang)} className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/20 px-5 text-xs font-bold text-white transition hover:border-white hover:bg-white hover:text-[#191715]">{t.workspaceCta}<ArrowRight className="ml-2 size-3.5"/></Link><Link href={localizedHref('security', lang)} className="inline-flex min-h-11 items-center justify-center px-2 text-xs font-bold text-[#F2A4C5] underline decoration-white/20 underline-offset-4">{t.securityCta}</Link></div>
           </div>
        </div>
      </section>

      <section aria-labelledby="marketplace-title" className="bg-[#E8E0D2] py-14 sm:py-20 [@media(min-width:1024px)_and_(max-height:850px)]:py-14">
        <div className="editorial-shell">
          <SectionHeading id="marketplace-title" kicker={t.marketKicker} title={t.marketTitle} body={t.marketBody} />
          <div className="mt-8 overflow-hidden rounded-[20px] border border-[#BFB4A4] bg-[#FAF8F3] sm:mt-10">
            {MARKETPLACE_LINKS.map(({ href, key }, index) => {
              const item = t.marketItems[key]
              return <Link key={key} href={href} className="group grid min-h-28 grid-cols-[1fr_auto] gap-x-4 gap-y-2 border-b border-[#CFC5B5] p-4 outline-none transition-colors last:border-b-0 hover:bg-white focus-visible:bg-white sm:min-h-0 sm:grid-cols-[2.5rem_minmax(9rem,.58fr)_1fr_auto] sm:items-center sm:gap-5 sm:px-6 sm:py-4 lg:grid-cols-[3rem_minmax(10rem,.58fr)_1fr_auto] lg:px-7"><span className="hidden font-mono text-[9px] font-black text-[#B00C54] sm:block">0{index + 1}</span><div><p className="font-mono text-[9px] font-black uppercase tracking-[.16em] text-[#857C6E]">{item.eyebrow}</p><h3 className="mt-1 text-[clamp(1.2rem,2vw,1.65rem)] font-semibold tracking-[-.04em]">{item.title}</h3></div><p className="col-span-2 max-w-xl text-[13px] leading-5 text-[#625B50] sm:col-span-1">{item.body}</p><span className="row-start-1 flex size-9 items-center justify-center rounded-full border border-[#BFB4A4] text-[#B00C54] transition-all group-hover:border-[#D10E63] group-hover:bg-[#D10E63] group-hover:text-white sm:row-auto"><ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5"/></span></Link>
            })}
          </div>
          <p className="mt-6 max-w-4xl text-sm font-semibold leading-6 text-[#514A42]">{t.marketEvolution}</p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold text-[#625B50]"><Link href={localizedHref('skills', lang)} className="underline decoration-[#B00C54]/30 underline-offset-4 hover:text-[#B00C54]">{t.skillsCta}</Link><Link href={localizedHref('models', lang)} className="underline decoration-[#B00C54]/30 underline-offset-4 hover:text-[#B00C54]">{t.modelsCta}</Link><Link href={localizedHref('servers', lang)} className="underline decoration-[#B00C54]/30 underline-offset-4 hover:text-[#B00C54]">{t.serversCta}</Link><Link href={localizedHref('marketplace', lang)} className="underline decoration-[#B00C54]/30 underline-offset-4 hover:text-[#B00C54]">{t.marketplaceCta}</Link></div>
        </div>
      </section>

      <section id="fonctionnement" aria-labelledby="hermes-unitalk-title" className="scroll-mt-20 bg-[#E0D6C6] py-10 text-[#191715] sm:py-12">
        <div className="editorial-shell grid gap-7 sm:grid-cols-[auto_1fr] sm:items-center lg:grid-cols-[auto_1fr_auto] lg:gap-10">
          <div className="flex items-center gap-3">
            <span className="flex size-14 items-center justify-center rounded-xl bg-[#191715] p-2 sm:size-16"><Image src="/images/hermes-agent-logo.webp" alt="Logo Hermes Agent" width={48} height={48} className="size-full object-contain" /></span>
            <span className="font-mono text-sm text-[#857C6E]">×</span>
            <span className="flex size-14 items-center justify-center rounded-xl bg-[#F3EFE6] sm:size-16"><UnitalkLogo size={38} /></span>
          </div>
          <div>
            <h2 id="hermes-unitalk-title" className="text-balance text-[clamp(1.7rem,3vw,2.7rem)] font-semibold leading-[1.02] tracking-[-.045em]">{t.foundationTitle}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#514A42]">{t.foundationBody}</p>
          </div>
          <Link href="/hermes" className="inline-flex w-fit items-center gap-2 text-xs font-bold text-[#B00C54] underline decoration-[#B00C54]/30 underline-offset-4">{t.foundationCta}<ArrowRight className="size-3.5" /></Link>
        </div>
      </section>

      <section aria-labelledby="pricing-title" className="border-t border-[#CFC5B5] bg-[#191715] py-14 text-white sm:py-20">
        <div className="editorial-shell grid gap-9 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-16">
          <div><Kicker dark>{t.pricingKicker}</Kicker><h2 id="pricing-title" className="mt-5 max-w-2xl text-balance text-[clamp(2.2rem,4.4vw,4.2rem)] font-semibold leading-[.95] tracking-[-.055em]">{t.pricingTitle}</h2><p className="mt-5 max-w-xl text-[15px] leading-7 text-[#CFC6B8]">{t.pricingBody}</p></div>
          <div className="overflow-hidden rounded-[24px] border border-white/15 bg-white/[.04]">
            <div className="grid gap-3 border-b border-white/10 p-6 sm:grid-cols-[1fr_auto] sm:items-end"><div><p className="font-mono text-[9px] font-black uppercase tracking-[.16em] text-[#F2A4C5]">{t.soloLabel}</p><p className="mt-2 text-sm text-[#CFC6B8]">{t.soloBody}</p></div><p className="text-3xl font-semibold">0 €</p></div>
            <div className="grid gap-3 p-6 sm:grid-cols-[1fr_auto] sm:items-end"><div><p className="font-mono text-[9px] font-black uppercase tracking-[.16em] text-[#F2A4C5]">{t.collaboratorLabel}</p><p className="mt-2 text-sm text-[#CFC6B8]">{t.collaboratorBody}</p></div><p className="text-3xl font-semibold">49 €<span className="text-sm font-medium text-white/50">{t.perMonth}</span></p></div>
            <div className="border-t border-white/10 p-6"><p className="text-xs leading-6 text-white/55">{t.trialTerms}</p><Link href={localizedHref('pricing', lang)} className="mt-5 inline-flex min-h-11 items-center rounded-full bg-white px-5 text-xs font-bold text-[#191715]">{t.pricingCta}<ArrowRight className="ml-2 size-3.5"/></Link></div>
          </div>
        </div>
      </section>

      <section aria-labelledby="alma-title" className="relative overflow-hidden bg-[#D10E63] py-14 text-white sm:py-20 [@media(min-width:1024px)_and_(max-height:850px)]:py-14">
        <div aria-hidden className="absolute -right-24 -top-32 size-[32rem] rounded-full border border-white/15" />
        <div aria-hidden className="absolute -right-8 -top-12 size-64 rounded-full border border-white/10" />
        <div className="editorial-shell relative grid gap-12 lg:grid-cols-[1.02fr_.98fr] lg:items-center">
          <div>
            <div className="flex items-center gap-4"><Image src="/alma-avatar.png" alt="" width={56} height={56} className="size-14 rounded-full object-cover ring-2 ring-white/30"/><div><p className="text-lg font-bold">Alma</p><p className="text-xs font-semibold text-white/70">{t.almaRole}</p></div></div>
            <h2 id="alma-title" className="mt-7 max-w-4xl text-balance text-[clamp(2.15rem,4vw,3.7rem)] font-semibold leading-[.94] tracking-[-.055em]">{t.almaTitle}</h2>
            <p className="mt-5 max-w-2xl text-[16px] leading-7 text-white/80">{t.almaBody}</p>
          </div>
          <div className="overflow-hidden rounded-[24px] border border-[#D8CEBE] bg-[#FAF8F3] p-6 text-[#191715] shadow-[0_34px_80px_-38px_rgba(25,23,21,.45)] sm:p-8">
            <h3 className="text-2xl font-semibold tracking-[-.04em]"><AlmaInline className="mr-2 size-8 align-[-.35em] ring-[#D10E63]/30" />{t.almaCardTitle}</h3>
            <ul className="mt-6 space-y-3 border-y border-[#CFC5B5] py-5">{t.almaPrepares.map(item=><li key={item} className="flex gap-3 text-sm font-semibold leading-6 text-[#514A42]"><span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-[#F15B9B]"/>{item}</li>)}</ul>
            <p className="mt-5 text-sm font-bold leading-6 text-[#191715]">{t.almaRule}</p>
            <Link href={`${localizedHref('discover', lang)}?source=collaborateurs-ia`} className="mt-6 inline-flex min-h-14 w-full items-center justify-center rounded-full bg-[#D10E63] px-7 text-sm font-bold text-white transition hover:bg-[#B90C58]">{t.almaCta}</Link>
            <p className="mt-4 text-center text-xs font-semibold text-[#857C6E]">{t.reassurance.join(' · ')}</p>
          </div>
        </div>
      </section>
    </main>
  )
}

function SectionHeading({ id, kicker, title, body, dark = false }: { id?: string; kicker: string; title: string; body: string; dark?: boolean }) {
  return <div className="grid gap-6 lg:grid-cols-[1.08fr_.92fr] lg:items-end lg:gap-12"><div><Kicker dark={dark}>{kicker}</Kicker><h2 id={id} className="mt-5 max-w-3xl text-balance text-[clamp(2.1rem,4.2vw,4.1rem)] font-semibold leading-[.96] tracking-[-.05em]">{title}</h2></div><p className={`max-w-xl text-[16px] leading-8 ${dark ? 'text-[#CFC6B8]' : 'text-[#514A42]'}`}>{body}</p></div>
}

function ResourceFact({ icon: Icon, title, body }: { icon: LucideIcon; title: string; body: string }) {
  return <div className="bg-[#EAE3D4] p-6 sm:p-7"><Icon className="size-5 text-[#B00C54]"/><h3 className="mt-5 font-semibold">{title}</h3><p className="mt-2 text-xs leading-5 text-[#625B50]">{body}</p></div>
}

type IdentityCarouselLabels = {
  ariaLabel: string
  eyebrow: string
  previous: string
  next: string
  profile: string
  email: string
  calendar: string
  phone: string
  voice: string
  provided: string
  connected: string
  configurable: string
  mission: string
  result: string
  rule: string
}

function IdentityCarousel({ lang, labels }: { lang: 'fr' | 'en'; labels: IdentityCarouselLabels }) {
  const identities = MARKETPLACE_COLLABORATOR_SLUGS.map(slug => ROLE_DETAILS[slug])
  const [activeIndex, setActiveIndex] = useState(0)
  const touchStartX = useRef<number | null>(null)
  const activeIdentity = identities[activeIndex]

  const selectPrevious = () => setActiveIndex(index => (index - 1 + identities.length) % identities.length)
  const selectNext = () => setActiveIndex(index => (index + 1) % identities.length)
  const handleTouchStart = (event: TouchEvent<HTMLElement>) => { touchStartX.current = event.touches[0]?.clientX ?? null }
  const handleTouchEnd = (event: TouchEvent<HTMLElement>) => {
    if (touchStartX.current === null) return
    const distance = (event.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current
    touchStartX.current = null
    if (Math.abs(distance) < 45) return
    if (distance > 0) selectPrevious()
    else selectNext()
  }

  return (
    <aside aria-label={labels.ariaLabel} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} className="group relative mx-auto w-full min-w-0 max-w-[420px] touch-pan-y">
      <div aria-hidden className="pointer-events-none absolute -inset-16 -z-10"><div className="absolute left-[42%] top-[46%] h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D10E63]/30 blur-[90px]"/><div className="absolute right-[8%] top-[8%] h-[52%] w-[52%] rounded-full bg-[#F2A65A]/20 blur-[80px]"/></div>
      <div className="relative w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#17130F] text-white shadow-[0_30px_80px_-20px_rgba(0,0,0,.65)] transition-transform duration-500 group-hover:-translate-y-1.5 sm:rounded-[1.75rem]">
        <div className="p-5 max-[389px]:p-4 sm:p-6 [@media(min-width:1024px)_and_(max-height:850px)]:p-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <p className="font-mono text-[9px] font-black uppercase tracking-[.16em] text-[#F2A4C5]">{labels.eyebrow}</p>
            <div className="flex items-center gap-3"><span className="font-mono text-[9px] font-bold text-white/45">{String(activeIndex + 1).padStart(2, '0')} / {String(identities.length).padStart(2, '0')}</span><div className="flex gap-2">
              <button type="button" onClick={selectPrevious} aria-label={labels.previous} className="flex size-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-white/35 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2A4C5]"><ChevronLeft className="size-4"/></button>
              <button type="button" onClick={selectNext} aria-label={labels.next} className="flex size-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-white/35 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2A4C5]"><ChevronRight className="size-4"/></button>
            </div></div>
          </div>

          <div className="pt-5">
            <div className="flex items-center gap-4">
              <div className="relative size-16 shrink-0 overflow-hidden rounded-full border-2 border-[#F2A4C5]/35 sm:size-18">
                <Image src={activeIdentity.avatar} alt="" fill sizes="72px" className="object-cover" />
              </div>
              <div className="min-w-0">
                <h2 className="truncate text-2xl font-semibold tracking-[-.04em]">{activeIdentity.name}</h2>
                <p className="mt-1 text-sm font-semibold text-[#CFC6B8]">{activeIdentity.role[lang]}</p>
                <p className="mt-1 text-xs text-[#91877A]">{activeIdentity.department[lang]}</p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 overflow-hidden rounded-xl border border-white/10 bg-[#211E1B]">
              {[[Mail, labels.email, labels.provided], [CalendarDays, labels.calendar, labels.connected], [Phone, labels.phone, labels.configurable], [Volume2, labels.voice, labels.configurable]].map(([Icon, label, status], index) => { const ChannelIcon = Icon as LucideIcon; return <div key={label as string} className={`flex items-center gap-3 p-3 ${index >= 2 ? 'border-t border-white/10' : ''} ${index % 2 === 1 ? 'border-l border-white/10' : ''}`}><ChannelIcon className="size-4 shrink-0 text-[#F2A4C5]"/><div className="min-w-0"><p className="truncate text-[11px] font-bold text-[#E7E0D5]">{label as string}</p><p className="mt-0.5 truncate text-[9px] text-[#91877A]">{status as string}</p></div></div> })}
            </div>

            <dl className="mt-3 grid overflow-hidden rounded-xl border border-white/10 sm:grid-cols-2"><div className="p-3.5"><dt className="font-mono text-[8px] font-black uppercase tracking-[.14em] text-[#F2A4C5]">{labels.mission}</dt><dd className="mt-1.5 text-[11px] font-semibold leading-5 text-[#E7E0D5]">{activeIdentity.starterMission?.mission[lang] ?? activeIdentity.missions[0][lang]}</dd></div><div className="border-t border-white/10 p-3.5 sm:border-l sm:border-t-0"><dt className="font-mono text-[8px] font-black uppercase tracking-[.14em] text-[#F2A4C5]">{labels.result}</dt><dd className="mt-1.5 text-[11px] font-semibold leading-5 text-[#E7E0D5]">{activeIdentity.starterMission?.result[lang] ?? activeIdentity.promise[lang]}</dd></div></dl>

            <div className="mt-3 flex items-start gap-3 rounded-xl border border-[#D10E63]/25 bg-[#D10E63]/10 px-4 py-2.5"><ShieldCheck className="mt-0.5 size-4 shrink-0 text-[#F2A4C5]"/><p className="text-xs font-semibold leading-5 text-[#E7E0D5]">{labels.rule}</p></div>

            <div className="mt-5 flex justify-end"><Link href={collaboratorProfileHref(activeIdentity.slug, lang)} className="inline-flex shrink-0 items-center gap-2 text-xs font-bold text-[#F2A4C5] underline decoration-white/20 underline-offset-4">{labels.profile}<ArrowRight className="size-3.5"/></Link></div>
          </div>
        </div>
      </div>
    </aside>
  )
}

const COPY = {
  fr: {
    eyebrow: 'Un nouveau membre dans votre équipe', heroTitlePrefix: 'Votre', heroTitleRole: 'Collaborateur IA', heroTitleEnd: 'accomplit une mission.', heroAccent: 'Votre équipe garde les décisions.', heroLead: 'Une identité professionnelle durable, une mémoire autorisée, plus de 3 000 applications via Pipedream et un historique de travail traçable dans le Workspace Unitalk.',
    identityCarousel: { ariaLabel: 'Identités de Collaborateurs IA', eyebrow: 'Carte professionnelle', previous: 'Identité précédente', next: 'Identité suivante', profile: 'Voir le profil', email: 'E-mail professionnel', calendar: 'Calendrier', phone: 'Téléphone', voice: 'Voix', provided: 'Fourni par Unitalk', connected: 'Fourni ou connecté', configurable: 'Selon configuration', mission: 'Première mission', result: 'Résultat attendu', rule: 'Rattaché à votre organisation. Accès et décisions sous votre contrôle.' }, start: 'Décrire ma première mission', explore: 'Découvrir les 12 Collaborateurs IA', heroOffer: 'Première mission offerte · Puis 49 €/mois par Collaborateur IA', reassurance: ['Sans carte bancaire', 'Actions sensibles sous votre contrôle'], almaGuidance: 'Personnalisation guidée par Alma',
    foundationTitle: 'Hermes exécute. Unitalk organise le travail.', foundationBody: 'Hermes fournit le moteur agentique open source. Unitalk ajoute l’identité professionnelle, la mémoire, les applications, les droits et l’espace de collaboration.', foundationCta: 'Découvrir Hermes',
    placeKicker: 'Rattachement à l’entreprise', placeTitle: 'Un Collaborateur IA privé ou partagé.', placeBody: 'Privé pour une personne, ou partagé avec une équipe, un département ou toute l’entreprise. Les membres autorisés le retrouvent dans leur Workspace.', placeContinuity: 'Si son responsable change, son identité, ses méthodes validées et sa mémoire autorisée restent rattachées à l’entreprise ; sa supervision peut être réattribuée sans perdre son expérience.', placementChoiceTitle: 'Choisissez son périmètre de collaboration', placementChoiceBody: 'Vous pourrez le faire évoluer avec votre organisation.', placements: ['Une personne', 'Une équipe', 'Un département', 'Toute l’entreprise'], placementDescriptions: ['Un responsable direct lui confie et suit ses missions.','Il collabore avec tous les membres autorisés d’une équipe.','Il est accessible aux membres autorisés du département.','Il est accessible à tous les membres autorisés de l’entreprise.'], privateMemory: 'Sa propre mémoire', privateMemoryBody: 'Méthodes, expérience et historique des conversations restent disponibles entre ses missions.', sharedKnowledge: 'Les savoirs partagés', sharedKnowledgeBody: 'Il consulte uniquement les documents et informations que l’entreprise lui ouvre.', communication: 'Plus de 3 000 applications', communicationBody: 'Depuis le Workspace, Pipedream relie les comptes et applications utiles, selon les droits, licences et validations définis.', sovereignty: 'Son serveur privé virtuel', sovereigntyBody: 'Chaque Collaborateur IA dispose de son propre serveur privé virtuel dans Unitalk AI Cloud.',
    proofKicker: 'Une mission, de bout en bout', proofTitle: 'Il prépare. Votre équipe décide.', proofBody: 'Le Collaborateur reçoit un résultat attendu, travaille avec des droits explicites et s’arrête lorsqu’une validation humaine est nécessaire. Sources, actions et décisions restent consultables.', proofSteps: [{label:'Mission confiée',title:'Vous définissez le résultat.',body:'L’objectif, le contexte et les limites sont réunis dans un même espace.'},{label:'Travail visible',title:'Il prépare le livrable.',body:'Votre équipe suit les étapes, les sources utilisées et le résultat produit.'},{label:'Contrôle humain',title:'Vous gardez la décision.',body:'Les actions sensibles restent en attente jusqu’à votre validation.'}], proofIllustration:'Exemple illustratif · Données fictives', proofDeliverableLabel:'Livrable préparé par Emma', proofDeliverable:'Comité de direction prêt.', proofDeliverableBody:'Ordre du jour, synthèse de trois dossiers et six actions attribuées.', proofApprovalLabel:'Validation humaine', proofApproval:'Autoriser l’envoi de l’ordre du jour aux participants ?', proofWaiting:'En attente de votre décision',
    workspaceBridge: 'Le Collaborateur est l’identité durable. Le Workspace est l’endroit où votre équipe lui confie ses missions, suit son travail, consulte ses sources et prend les décisions.', workspaceCta: 'Découvrir le Workspace',
    governanceKicker: 'Sécurité et gouvernance', governanceTitle: 'L’entreprise définit les règles.', governanceBody: 'Chaque mission associe des droits explicites, des actions encadrées, des validations humaines et une trace consultable.', governanceSteps: [{title:'Droit',body:'Quelles ressources peut-il consulter ?'},{title:'Action',body:'Que peut-il préparer ou exécuter ?'},{title:'Validation',body:'Quand doit-il s’arrêter pour demander un accord ?'},{title:'Décision',body:'Qui peut approuver, modifier ou refuser ?'},{title:'Trace',body:'Quelles sources, actions et décisions sont conservées ?'}], securityCta:'Voir la sécurité et les contrôles',
    marketKicker: 'Un Store ouvert à la communauté', marketTitle: 'Choisissez-le, puis faites-le évoluer.', marketBody: 'Sélectionnez une identité, puis ajoutez simplement des profils métier, des compétences, des applications, des modèles et des ressources sans recréer votre Collaborateur.', marketEvolution: 'Profils et compétences sont inclus sans surcoût. Chaque compétence précise une méthode, un contexte et un résultat attendu ; vous faites évoluer ses responsabilités sans recréer son identité ni perdre son expérience.',
    marketItems: {
      collaborators: { eyebrow: 'Identités', title: 'Collaborateurs IA', body: 'Choisissez le Collaborateur qui rejoindra votre organisation.' },
      profiles: { eyebrow: 'Responsabilités', title: 'Profils métier', body: 'Ajoutez les rôles dont votre entreprise a besoin.' },
      skills: { eyebrow: 'Savoir-faire', title: 'Compétences', body: 'Attribuez des méthodes précises et réutilisables.' },
      apps: { eyebrow: 'Outils autorisés', title: 'Plus de 3 000 applications via Pipedream', body: 'Connectez depuis le Workspace les comptes utiles à la mission, avec leurs droits et validations.' },
    },
    modelsCta:'Configurer les modèles IA', serversCta:'Choisir son serveur privé', marketplaceCta:'Voir toute la Marketplace', marketNote: 'Le principe', marketContrast: 'Vous ne choisissez pas un outil d’intelligence artificielle individuel et isolé.', marketPromise: 'Vous équipez un Collaborateur durablement rattaché et gouverné par votre entreprise pour accomplir ses missions.',
    assetKicker: 'Une continuité opérationnelle durable', assetTitle: 'Son responsable peut changer. Son expérience reste dans l’entreprise.', assetBody: 'Son identité professionnelle, les méthodes validées et la mémoire autorisée restent rattachées à votre organisation lorsque les équipes évoluent.', assetCardKicker: 'Rattaché à votre organisation', assetStatus: 'Continuité préservée', assetRole: 'Collaboratrice IA · Votre entreprise', assetKeeps: [['Identité professionnelle','Conservée'],['Mémoire autorisée','Conservée'],['Méthodes validées','Conservées']], handoverLabel: 'Changement de responsable', handoverBody: 'Supervision transférée, continuité préservée',
    assetPoints: [
      { title: 'Réattribuez sa supervision', body: 'Lorsqu’une personne quitte l’entreprise, ses accès sont supprimés et un nouveau responsable prend le relais.' },
      { title: 'Conservez ce qui a été appris', body: 'Les méthodes validées, l’historique utile et la mémoire choisie par l’entreprise restent attachés au Collaborateur.' },
      { title: 'Faites évoluer ses responsabilités', body: 'Ajoutez de nouveaux profils, compétences et outils sans recréer son identité ni perdre son expérience.' },
    ],
    almaRole: 'Collaboratrice IA Unitalk · Coordinatrice de missions IA', almaTitle: 'Décrivez une mission. Alma prépare le Collaborateur adapté.', almaBody: 'Alma cadre le résultat, les ressources nécessaires et les décisions qui restent sous votre contrôle.', almaCardTitle: 'Alma prépare avec vous', almaPrepares: ['Sa place dans l’organisation', 'Ses compétences et ses applications', 'Ses accès et ses validations', 'Son serveur privé'], almaRule: 'Le Collaborateur accomplit la mission. Votre équipe garde la décision.', almaCta: 'Décrire ma première mission',
    skillsKicker: 'Compétences',
    skillsTitle: 'Ajoutez les compétences nécessaires à chaque mission.',
    skillsBody: 'Les profils et compétences sont inclus sans surcoût avec le Collaborateur IA. Chaque compétence décrit une méthode, un contexte d’application et un résultat attendu.',
    skillsCta: 'Explorer les compétences',
    skillsExamples: [
      { name: 'Qualifier un prospect', method: 'Évaluer selon les critères validés', context: 'Fiche dans le CRM autorisé', result: 'Qualification expliquée' },
      { name: 'Préparer une réunion', method: 'Structurer l’ordre du jour', context: 'Contexte et sujets', result: 'Ordre du jour prêt' },
      { name: 'Rédiger un article', method: 'Structurer un contenu éditorial', context: 'Sujet et sources', result: 'Contenu structuré' },
    ],
    pricingKicker:'Tarifs transparents', pricingTitle:'Commencez gratuitement. Activez ensuite le Collaborateur avec votre accord.', pricingBody:'Le Workspace et le Collaborateur sont deux choix distincts. Aucun abonnement payant ne démarre sans votre confirmation.', soloLabel:'Workspace Solo', soloBody:'1 utilisateur et 1 000 crédits Workspace inclus chaque mois.', collaboratorLabel:'Collaborateur IA', collaboratorBody:'5 millions de tokens et 60 minutes de téléphone inclus par mois.', perMonth:'/mois', trialTerms:'Première mission offerte, sans carte bancaire, jusqu’à sa fin, 7 jours ou 1 million de tokens. Prix HT, abonnement mensuel résiliable à tout moment.', pricingCta:'Voir tous les tarifs',
  },
  en: {
    eyebrow: 'A new member of your team', heroTitlePrefix: 'Your', heroTitleRole: 'AI Collaborator', heroTitleEnd: 'carries out a mission.', heroAccent: 'Your team keeps the decisions.', heroLead: 'A lasting professional identity, authorized memory, more than 3,000 applications through Pipedream and a traceable work history in Unitalk Workspace.',
    identityCarousel: { ariaLabel: 'AI Collaborator identities', eyebrow: 'Professional identity card', previous: 'Previous identity', next: 'Next identity', profile: 'View profile', email: 'Professional email', calendar: 'Calendar', phone: 'Phone', voice: 'Voice', provided: 'Provided by Unitalk', connected: 'Provided or connected', configurable: 'Based on configuration', mission: 'First mission', result: 'Expected outcome', rule: 'Attached to your organization. Access and decisions under your control.' }, start: 'Describe my first mission', explore: 'Discover the 12 AI Collaborators', heroOffer: 'First mission included · Then €49/month per AI Collaborator', reassurance: ['No credit card', 'Sensitive actions under your control'], almaGuidance: 'Personalized with Alma',
    foundationTitle: 'Hermes executes. Unitalk organizes the work.', foundationBody: 'Hermes provides the open-source agentic engine. Unitalk adds the professional identity, memory, applications, permissions and collaboration space.', foundationCta: 'Discover Hermes',
    placeKicker: 'Organizational placement', placeTitle: 'A private or shared AI Collaborator.', placeBody: 'Private for one person, or shared with a team, department or the whole organization. Authorized members can access it from their Workspace.', placeContinuity: 'If its manager changes, its identity, approved methods and authorized memory remain attached to the organization; supervision can be reassigned without losing its experience.', placementChoiceTitle: 'Choose its collaboration scope', placementChoiceBody: 'You can evolve it as your organization changes.', placements: ['One person', 'A team', 'A department', 'The whole organization'], placementDescriptions: ['A direct manager assigns and follows its missions.','It collaborates with every authorized member of a team.','It is accessible to authorized department members.','It is accessible to every authorized member of the organization.'], privateMemory: 'Its own memory', privateMemoryBody: 'Methods, experience and conversation history remain available across missions.', sharedKnowledge: 'Shared knowledge', sharedKnowledgeBody: 'It only accesses documents and information the organization opens to it.', communication: 'More than 3,000 applications', communicationBody: 'From Workspace, Pipedream connects useful accounts and applications under defined permissions, licenses and approvals.', sovereignty: 'Its private virtual server', sovereigntyBody: 'Each AI Collaborator has its own private virtual server in Unitalk AI Cloud.',
    proofKicker: 'One mission, end to end', proofTitle: 'It prepares. Your team decides.', proofBody: 'The Collaborator receives an expected outcome, works under explicit permissions and stops whenever human approval is required. Sources, actions and decisions remain reviewable.', proofSteps: [{label:'Mission assigned',title:'You define the outcome.',body:'The objective, context and boundaries are gathered in one shared space.'},{label:'Visible work',title:'It prepares the deliverable.',body:'Your team follows the steps, sources used and the result produced.'},{label:'Human control',title:'You keep the decision.',body:'Sensitive actions remain pending until you approve them.'}], proofIllustration:'Illustrative example · Fictional data', proofDeliverableLabel:'Deliverable prepared by Emma', proofDeliverable:'Leadership meeting ready.', proofDeliverableBody:'Agenda, three-file summary and six assigned actions.', proofApprovalLabel:'Human approval', proofApproval:'Authorize sending the agenda to participants?', proofWaiting:'Waiting for your decision',
    workspaceBridge: 'The Collaborator is the lasting identity. Workspace is where your team assigns missions, follows the work, reviews sources and makes decisions.', workspaceCta: 'Discover Workspace',
    governanceKicker: 'Security and governance', governanceTitle: 'Your organization defines the rules.', governanceBody: 'Every mission combines explicit permissions, governed actions, human approvals and an accessible record.', governanceSteps: [{title:'Permission',body:'Which resources can it access?'},{title:'Action',body:'What can it prepare or execute?'},{title:'Approval',body:'When must it stop and request approval?'},{title:'Decision',body:'Who can approve, amend or refuse?'},{title:'Record',body:'Which sources, actions and decisions are retained?'}], securityCta:'View security and controls',
    marketKicker: 'A Store open to the community', marketTitle: 'Choose it, then evolve it.', marketBody: 'Select an identity, then add job profiles, skills, applications, models and resources without recreating your Collaborator.', marketEvolution: 'Profiles and skills are included at no extra cost. Each skill defines a method, context and expected outcome, so responsibilities can evolve without recreating the identity or losing its experience.',
    marketItems: {
      collaborators: { eyebrow: 'Identities', title: 'AI Collaborators', body: 'Choose the Collaborator that will join your organization.' },
      profiles: { eyebrow: 'Responsibilities', title: 'Job profiles', body: 'Add the roles your organization needs.' },
      skills: { eyebrow: 'Know-how', title: 'Skills', body: 'Assign precise, reusable methods.' },
      apps: { eyebrow: 'Authorized tools', title: '3,000+ applications through Pipedream', body: 'Connect mission-relevant accounts from Workspace, with defined permissions and approvals.' },
    },
    modelsCta:'Configure AI models', serversCta:'Choose its private server', marketplaceCta:'View the full Marketplace', marketNote: 'The principle', marketContrast: 'You are not choosing an individual, isolated artificial intelligence tool.', marketPromise: 'You equip a Collaborator durably attached to and governed by your organization to carry out its missions.',
    assetKicker: 'Lasting operational continuity', assetTitle: 'Its manager can change. Its experience stays in the organization.', assetBody: 'Its professional identity, approved methods and authorized memory remain attached to your organization as teams evolve.', assetCardKicker: 'Attached to your organization', assetStatus: 'Continuity preserved', assetRole: 'AI Collaborator · Your organization', assetKeeps: [['Professional identity','Retained'],['Authorized memory','Retained'],['Approved methods','Retained']], handoverLabel: 'Manager change', handoverBody: 'Supervision transferred, continuity preserved',
    assetPoints: [
      { title: 'Reassign its supervision', body: 'When someone leaves the organization, their access is removed and a new manager takes over.' },
      { title: 'Retain what has been learned', body: 'Approved methods, useful history and organization-selected memory stay attached to the Collaborator.' },
      { title: 'Evolve its responsibilities', body: 'Add new profiles, skills and tools without recreating its identity or losing its experience.' },
    ],
    almaRole: 'Unitalk AI Collaborator · AI mission coordinator', almaTitle: 'Describe a mission. Alma prepares the right Collaborator.', almaBody: 'Alma scopes the outcome, the required resources and the decisions that remain under your control.', almaCardTitle: 'Alma prepares it with you', almaPrepares: ['Its place in the organization', 'Its skills and applications', 'Its access and approvals', 'Its private server'], almaRule: 'The Collaborator carries out the mission. Your team keeps the decision.', almaCta: 'Describe my first mission',
    skillsKicker: 'Skills',
    skillsTitle: 'Add the skills each mission needs.',
    skillsBody: 'Profiles and skills are included with the AI Collaborator at no extra cost. Each skill defines a method, an application context and an expected outcome.',
    skillsCta: 'Browse skills',
    skillsExamples: [
      { name: 'Qualify a lead', method: 'Score against validated criteria', context: 'Record in the authorized CRM', result: 'Explained qualification' },
      { name: 'Prepare a meeting', method: 'Structure the agenda', context: 'Context and topics', result: 'Ready-to-send agenda' },
      { name: 'Write an article', method: 'Structure editorial content', context: 'Topic and sources', result: 'Structured content' },
    ],
    pricingKicker:'Transparent pricing', pricingTitle:'Start for free. Activate the Collaborator only with your approval.', pricingBody:'Workspace and the AI Collaborator are separate choices. No paid subscription starts without your confirmation.', soloLabel:'Solo Workspace', soloBody:'1 user and 1,000 Workspace credits included each month.', collaboratorLabel:'AI Collaborator', collaboratorBody:'5 million tokens and 60 phone minutes included each month.', perMonth:'/month', trialTerms:'First mission included, no credit card, until completion, 7 days or 1 million tokens. Prices exclude tax; monthly subscription, cancel anytime.', pricingCta:'View all pricing',
  },
} as const
