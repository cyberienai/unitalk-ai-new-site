'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Check,
  Database,
  LockKeyhole,
  Mail,
  Server,
  ShieldCheck,
  UserRound,
  type LucideIcon,
} from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { Kicker } from '@/components/home/section-kicker'
import { UnitalkLogo } from '@/components/unitalk-logo'
import { AlmaInline } from '@/components/alma-inline'

const MARKETPLACE_LINKS = [
  { href: '/marketplace/collaborateurs-ia', key: 'collaborators' },
  { href: '/marketplace/profils-metier', key: 'profiles' },
  { href: '/marketplace/competences', key: 'skills' },
  { href: '/marketplace/applications', key: 'apps' },
  { href: '/marketplace/modeles-ia', key: 'models' },
  { href: '/marketplace/serveurs-ia', key: 'servers' },
] as const

export function CollaborateurExperience() {
  const { lang } = useLanguage()
  const t = COPY[lang]

  return (
    <main className="overflow-hidden bg-[#F3EFE6] font-sf text-[#191715]">
      <section aria-labelledby="collaborateurs-ia-title" className="relative flex min-h-[100svh] items-center overflow-hidden border-b border-[#CFC5B5] bg-[#F3EFE6] pb-12 pt-24 min-[390px]:pb-14 sm:pt-28 lg:min-h-[calc(100svh-1rem)] [@media(min-width:1024px)_and_(max-height:850px)]:pb-8 [@media(min-width:1024px)_and_(max-height:850px)]:pt-24">
        <div aria-hidden className="absolute inset-0 opacity-[.045] [background-image:linear-gradient(#191715_1px,transparent_1px),linear-gradient(90deg,#191715_1px,transparent_1px)] [background-size:56px_56px]" />
        <div aria-hidden className="absolute -right-40 top-12 size-[38rem] rounded-full bg-[#D10E63]/[.08] blur-3xl" />
        <div className="editorial-shell relative grid min-w-0 items-center gap-8 min-[390px]:gap-9 sm:gap-12 lg:grid-cols-[1.02fr_.98fr] lg:gap-16 [@media(min-width:1024px)_and_(max-height:850px)]:gap-8">
            <div className="max-w-[640px] lg:pr-4">
              <div className="mb-4 flex justify-center min-[390px]:mb-5 sm:mb-6 sm:justify-start"><Kicker>{t.eyebrow}</Kicker></div>
              <h1 id="collaborateurs-ia-title" className="text-balance text-center font-sf text-[clamp(2.15rem,5vw,4.35rem)] font-semibold leading-[.94] tracking-[-.06em] text-[#1C1A17] sm:text-left [@media(min-width:1024px)_and_(max-height:850px)]:text-[clamp(2.1rem,3.5vw,3.25rem)]"><span className="block">{t.heroTitlePrefix} <span className="whitespace-nowrap">{t.heroTitleRole}</span> {t.heroTitleEnd}</span><span className="mt-1 block text-[#D10E63]">{t.heroAccent}</span></h1>
              <p className="mx-auto mt-5 max-w-xl text-balance text-center text-[15px] font-medium leading-6 text-[#4E483F] min-[390px]:text-base min-[390px]:leading-7 sm:mx-0 sm:text-left md:text-lg md:leading-8">{t.heroLead}</p>
              <div className="mt-6 flex flex-col items-stretch gap-2.5 min-[390px]:gap-3 sm:flex-row sm:items-start [@media(min-width:1024px)_and_(max-height:850px)]:mt-5">
                <Link href="/decouvrir?source=collaborateurs-ia-hero" className="inline-flex min-h-13 items-center justify-center rounded-full bg-[#D10E63] px-6 text-center text-sm font-bold text-white shadow-[0_16px_36px_-22px_rgba(209,14,99,.8)] outline-none transition hover:-translate-y-0.5 hover:bg-[#B90C58] focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2">{t.start}</Link>
                <Link href="/marketplace/collaborateurs-ia" className="inline-flex min-h-13 items-center justify-center rounded-full border border-[#BFB4A4] bg-[#FAF8F3]/75 px-6 text-center text-sm font-bold outline-none transition hover:border-[#191715] hover:bg-[#191715] hover:text-white focus-visible:ring-2 focus-visible:ring-[#D10E63]">{t.explore}</Link>
              </div>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] font-medium text-[#6B6560] min-[390px]:text-xs sm:justify-start">{t.reassurance.map(item => <span key={item} className="inline-flex items-center gap-1.5"><Check className="size-3.5 text-[#D10E63]" strokeWidth={2.5}/>{item}</span>)}<span className="inline-flex items-center gap-1.5 whitespace-nowrap"><AlmaInline />{t.almaGuidance}</span></div>
            </div>
            <aside aria-label={t.heroCardLabel} className="group relative mx-auto w-full min-w-0 max-w-md">
              <div aria-hidden className="pointer-events-none absolute -inset-16 -z-10"><div className="absolute left-[42%] top-[46%] h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D10E63]/30 blur-[90px]"/><div className="absolute right-[8%] top-[8%] h-[52%] w-[52%] rounded-full bg-[#F2A65A]/20 blur-[80px]"/></div>
              <div className="relative w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#17130F] text-white shadow-[0_30px_80px_-20px_rgba(0,0,0,.65)] transition-transform duration-500 group-hover:-translate-y-1.5 sm:rounded-[1.75rem]">
                <div className="p-5 max-[389px]:p-4 sm:p-7 [@media(min-width:1024px)_and_(max-height:850px)]:p-5">
                  <div className="flex min-w-0 items-start gap-4 border-b border-white/10 pb-5 max-[389px]:gap-3 max-[389px]:pb-4">
                    <div className="flex shrink-0 items-center">
                    {[
                      ['/images/emma-avatar.png', 'Emma'],
                      ['/nina-avatar.png', 'Camille'],
                      ['/images/nadia-avatar.png', 'Nadia'],
                    ].map(([src, name], index) => <div key={name} className={`relative size-12 shrink-0 overflow-hidden rounded-full border-[3px] border-[#191715] sm:size-16 [@media(min-width:1024px)_and_(max-height:850px)]:size-12 ${index > 0 ? '-ml-3' : ''}`}><Image src={src} alt={name} fill sizes="64px" className="object-cover" /></div>)}
                    </div>
                    <p className="min-w-0 pt-1 text-sm font-semibold leading-6 text-[#CFC6B8]">{t.heroCardLabel}</p>
                  </div>
                  <dl className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-[#211E1B] max-[389px]:mt-4 [@media(min-width:1024px)_and_(max-height:850px)]:mt-4">
                    {t.heroGroups.map((group, index) => <div key={group.label} className={`grid gap-2 p-4 max-[389px]:px-3.5 max-[389px]:py-3 sm:grid-cols-[8.5rem_1fr] sm:items-start sm:gap-3 [@media(min-width:1024px)_and_(max-height:850px)]:py-3 ${index > 0 ? 'border-t border-white/10' : ''}`}><dt className="font-mono text-[9px] font-black uppercase tracking-[.15em] text-[#F2A4C5]">{group.label}</dt><dd className="hidden whitespace-pre-line text-[12px] font-semibold leading-5 text-[#E7E0D5] min-[390px]:block">{group.value}</dd></div>)}
                  </dl>
                  <div className="mt-5 flex items-center gap-3 rounded-xl border border-[#D10E63]/25 bg-[#D10E63]/10 px-4 py-3 max-[389px]:mt-4 max-[389px]:px-3.5 max-[389px]:py-2.5 [@media(min-width:1024px)_and_(max-height:850px)]:mt-4"><ShieldCheck className="size-5 shrink-0 text-[#F2A4C5] max-[389px]:size-4"/><p className="text-xs font-semibold leading-5 text-[#E7E0D5]">{t.heroCardRule}</p></div>
                </div>
              </div>
            </aside>
        </div>
      </section>

      <section aria-labelledby="rattachement-title" className="border-b border-[#CFC5B5] bg-[#FAF8F3] py-16 sm:py-24 [@media(min-width:1024px)_and_(max-height:850px)]:py-16">
        <div className="editorial-shell">
          <SectionHeading id="rattachement-title" kicker={t.placeKicker} title={t.placeTitle} body={t.placeBody} />
          <div className="mt-10 overflow-hidden rounded-[24px] border border-[#CFC5B5] bg-[#FAF8F3] sm:mt-12">
            <div className="grid border-b border-[#CFC5B5] px-6 py-4 sm:grid-cols-[1fr_auto] sm:items-center sm:px-7"><p className="text-sm font-bold">{t.placementChoiceTitle}</p><p className="mt-1 text-xs text-[#766D61] sm:mt-0">{t.placementChoiceBody}</p></div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4">
              {t.placements.map((label, index) => <div key={label} className={`group border-[#CFC5B5] p-6 transition-colors hover:bg-white sm:p-7 ${index > 0 ? 'border-t sm:[&:nth-child(2)]:border-t-0' : ''} ${index % 2 === 1 ? 'sm:border-l' : ''} ${index >= 2 ? 'lg:border-t-0' : ''} ${index > 0 ? 'lg:border-l' : ''}`}><span className="block h-0.5 w-8 bg-[#D10E63] transition-all group-hover:w-14"/><h3 className="mt-6 text-xl font-semibold tracking-[-.03em]">{label}</h3><p className="mt-3 text-sm leading-6 text-[#625B50]">{t.placementDescriptions[index]}</p></div>)}
            </div>
          </div>
          <div className="mt-6 overflow-hidden rounded-[24px] border border-[#CFC5B5] bg-[#EAE3D4]">
            <div className="grid gap-px bg-[#CFC5B5] sm:grid-cols-2 lg:grid-cols-4">
              <ResourceFact icon={LockKeyhole} title={t.privateMemory} body={t.privateMemoryBody} />
              <ResourceFact icon={Database} title={t.sharedKnowledge} body={t.sharedKnowledgeBody} />
              <ResourceFact icon={Mail} title={t.communication} body={t.communicationBody} />
              <ResourceFact icon={Server} title={t.sovereignty} body={t.sovereigntyBody} />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="mission-proof-title" className="border-b border-[#CFC5B5] bg-[#191715] py-14 text-white sm:py-18 [@media(min-width:1024px)_and_(max-height:850px)]:py-12">
        <div className="editorial-shell">
          <div className="grid gap-7 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div><Kicker dark>{t.proofKicker}</Kicker><h2 id="mission-proof-title" className="mt-5 max-w-2xl text-balance text-[clamp(2rem,3.8vw,3.6rem)] font-semibold leading-[.95] tracking-[-.055em]">{t.proofTitle}</h2></div>
            <p className="max-w-xl text-sm leading-7 text-[#CFC6B8] sm:text-[15px]">{t.proofBody}</p>
          </div>
          <ol className="mt-9 grid overflow-hidden rounded-[22px] border border-white/10 bg-white/10 md:grid-cols-3">
            {t.proofSteps.map((step, index) => <li key={step.title} className={`bg-[#211E1B] p-6 sm:p-7 ${index > 0 ? 'border-t border-white/10 md:border-l md:border-t-0' : ''}`}><span className="font-mono text-[9px] font-black uppercase tracking-[.16em] text-[#F2A4C5]">{step.label}</span><h3 className="mt-5 text-xl font-semibold tracking-[-.03em]">{step.title}</h3><p className="mt-3 text-sm leading-6 text-[#AFA397]">{step.body}</p></li>)}
          </ol>
        </div>
      </section>

      <section aria-labelledby="marketplace-title" className="bg-[#E8E0D2] py-16 sm:py-24 [@media(min-width:1024px)_and_(max-height:850px)]:py-16">
        <div className="editorial-shell">
          <SectionHeading id="marketplace-title" kicker={t.marketKicker} title={t.marketTitle} body={t.marketBody} />
          <div className="mt-10 overflow-hidden rounded-[24px] border border-[#BFB4A4] bg-[#FAF8F3] sm:mt-12">
            {MARKETPLACE_LINKS.map(({ href, key }, index) => {
              const item = t.marketItems[key]
              return <Link key={key} href={href} className={`group grid min-h-32 grid-cols-[1fr_auto] gap-x-4 gap-y-3 border-b border-[#CFC5B5] p-5 outline-none transition-colors last:border-b-0 hover:bg-white focus-visible:bg-white sm:min-h-0 sm:grid-cols-[2.5rem_minmax(9rem,.58fr)_1fr_auto] sm:items-center sm:gap-5 sm:px-6 sm:py-4 lg:grid-cols-[3rem_minmax(10rem,.58fr)_1fr_auto] lg:px-7 lg:py-4 [@media(min-width:1024px)_and_(max-height:850px)]:py-3.5 ${index === 3 ? 'bg-[#F6E5EC]' : ''}`}><span className="hidden font-mono text-[9px] font-black text-[#B00C54] sm:block">0{index + 1}</span><div><p className="font-mono text-[9px] font-black uppercase tracking-[.16em] text-[#857C6E]">{item.eyebrow}</p><h3 className="mt-1.5 text-[clamp(1.25rem,2.1vw,1.75rem)] font-semibold tracking-[-.04em]">{item.title}</h3></div><p className="col-span-2 max-w-xl text-[13px] leading-6 text-[#625B50] sm:col-span-1 sm:leading-5">{item.body}</p><span className="row-start-1 flex size-10 items-center justify-center rounded-full border border-[#BFB4A4] text-[#B00C54] transition-all group-hover:border-[#D10E63] group-hover:bg-[#D10E63] group-hover:text-white sm:row-auto sm:size-9"><ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5"/></span></Link>
            })}
          </div>
          <div className="relative mt-7 overflow-hidden rounded-[24px] border border-[#191715] bg-[#191715] text-white">
            <div aria-hidden className="absolute -right-16 -top-20 size-56 rounded-full border border-[#D10E63]/25" />
            <div aria-hidden className="absolute -right-5 -top-8 size-32 rounded-full bg-[#D10E63]/10 blur-2xl" />
            <div className="relative grid lg:grid-cols-[11rem_1fr]">
              <div className="border-b border-white/10 px-6 py-5 lg:border-b-0 lg:border-r lg:px-7 lg:py-8">
                <div className="flex items-center gap-3"><span className="h-px w-8 bg-[#D10E63]"/><span className="font-mono text-[9px] font-black uppercase tracking-[.18em] text-[#F2A4C5]">{t.marketNote}</span></div>
              </div>
              <div className="max-w-4xl px-6 py-7 sm:px-8 sm:py-9">
                <p className="max-w-3xl text-[15px] font-medium leading-7 text-[#AFA397]">{t.marketContrast}</p>
                <p className="mt-3 max-w-[38ch] text-pretty text-[clamp(1.55rem,3vw,2.65rem)] font-semibold leading-[1.08] tracking-[-.045em] text-[#FAF8F3]">{t.marketPromise}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="fonctionnement" aria-labelledby="hermes-unitalk-title" className="scroll-mt-20 bg-[#191715] py-10 text-white sm:py-12">
        <div className="editorial-shell grid gap-7 sm:grid-cols-[auto_1fr] sm:items-center lg:grid-cols-[auto_1fr_auto] lg:gap-10">
          <div className="flex items-center gap-3">
            <Image src="/images/hermes-agent-logo.webp" alt="Logo Hermes Agent" width={64} height={64} className="size-14 rounded-xl object-cover sm:size-16" />
            <span className="font-mono text-sm text-white/30">×</span>
            <span className="flex size-14 items-center justify-center rounded-xl bg-[#F3EFE6] sm:size-16"><UnitalkLogo size={38} /></span>
          </div>
          <div>
            <h2 id="hermes-unitalk-title" className="text-balance text-[clamp(1.7rem,3vw,2.7rem)] font-semibold leading-[1.02] tracking-[-.045em]">{t.foundationTitle}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#CFC6B8]">{t.foundationBody}</p>
          </div>
          <Link href="/hermes" className="inline-flex w-fit items-center gap-2 text-xs font-bold text-[#F2A4C5] underline decoration-white/20 underline-offset-4">{t.foundationCta}<ArrowRight className="size-3.5" /></Link>
        </div>
      </section>

      <section aria-labelledby="capital-title" className="border-y border-[#191715] bg-[#F3EFE6] py-16 sm:py-24 [@media(min-width:1024px)_and_(max-height:850px)]:py-16">
        <div className="editorial-shell">
          <SectionHeading id="capital-title" kicker={t.assetKicker} title={t.assetTitle} body={t.assetBody} compactTitle />
          <div className="mt-10 grid overflow-hidden rounded-[28px] border border-[#191715] sm:mt-12 lg:grid-cols-[.9fr_1.1fr]">
            <div className="relative flex flex-col bg-[#191715] p-7 text-white sm:p-10">
              <div className="flex items-center justify-between"><p className="font-mono text-[10px] font-black uppercase tracking-[.16em] text-[#F2A4C5]">{t.assetCardKicker}</p><span className="rounded-full border border-[#64C98D]/25 bg-[#64C98D]/10 px-3 py-1.5 text-[10px] font-bold text-[#86D9A7]">{t.assetStatus}</span></div>
              <div className="mt-8 flex items-center gap-4"><div className="relative size-20 overflow-hidden rounded-full ring-2 ring-[#F2A4C5]/30"><Image src="/images/emma-avatar.png" alt="Emma" fill sizes="80px" className="object-cover"/></div><div><h3 className="text-3xl font-semibold tracking-[-.04em]">Emma</h3><p className="mt-1 text-sm text-[#BEB4A8]">{t.assetRole}</p></div></div>
              <dl className="mt-9 divide-y divide-white/10 border-y border-white/10">{t.assetKeeps.map(([label,value])=><div key={label} className="grid grid-cols-[1fr_auto] gap-4 py-4"><dt className="text-xs text-[#AFA397]">{label}</dt><dd className="text-xs font-bold text-white">{value}</dd></div>)}</dl>
              <div className="mt-auto pt-8"><p className="font-mono text-[9px] font-black uppercase tracking-[.16em] text-[#F2A4C5]">{t.handoverLabel}</p><div className="mt-4 flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-full border border-white/15"><UserRound className="size-5 text-[#AFA397]"/></span><ArrowRight className="size-4 text-[#F2A4C5]"/><span className="flex size-10 items-center justify-center rounded-full bg-[#D10E63]"><UserRound className="size-5"/></span><p className="ml-2 text-xs font-semibold text-[#D8D0C5]">{t.handoverBody}</p></div></div>
            </div>
            <div className="bg-[#FAF8F3]">
              {t.assetPoints.map((point, index) => <div key={point.title} className={`grid gap-4 p-6 sm:grid-cols-[3rem_1fr] sm:p-8 ${index > 0 ? 'border-t border-[#CFC5B5]' : ''}`}><span className="font-mono text-[10px] font-black text-[#B00C54]">0{index + 1}</span><div><h3 className="text-xl font-semibold tracking-[-.03em]">{point.title}</h3><p className="mt-2 text-sm leading-7 text-[#625B50]">{point.body}</p></div></div>)}
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="alma-title" className="relative overflow-hidden bg-[#D10E63] py-16 text-white sm:py-24 [@media(min-width:1024px)_and_(max-height:850px)]:py-16">
        <div aria-hidden className="absolute -right-24 -top-32 size-[32rem] rounded-full border border-white/15" />
        <div aria-hidden className="absolute -right-8 -top-12 size-64 rounded-full border border-white/10" />
        <div className="editorial-shell relative grid gap-12 lg:grid-cols-[1.02fr_.98fr] lg:items-center">
          <div>
            <div className="flex items-center gap-4"><Image src="/alma-avatar.png" alt="" width={56} height={56} className="size-14 rounded-full object-cover ring-2 ring-white/30"/><div><p className="text-lg font-bold">Alma</p><p className="text-xs font-semibold text-white/70">{t.almaRole}</p></div></div>
            <h2 id="alma-title" className="mt-8 max-w-4xl text-balance text-[clamp(2.25rem,4.5vw,4.4rem)] font-semibold leading-[.94] tracking-[-.055em]">{t.almaTitle}</h2>
            <p className="mt-7 max-w-2xl text-[17px] leading-8 text-white/80">{t.almaBody}</p>
          </div>
          <div className="overflow-hidden rounded-[24px] border border-white/15 bg-[#191715] p-6 shadow-[0_34px_80px_-38px_rgba(25,23,21,.75)] sm:p-8">
            <h3 className="text-2xl font-semibold tracking-[-.04em]"><AlmaInline className="mr-2 size-8 align-[-.35em] ring-white/30" />{t.almaCardTitle}</h3>
            <ul className="mt-6 space-y-3 border-y border-white/10 py-5">{t.almaPrepares.map(item=><li key={item} className="flex gap-3 text-sm font-semibold leading-6 text-[#E7E0D5]"><span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-[#F15B9B]"/>{item}</li>)}</ul>
            <p className="mt-5 text-sm font-bold leading-6">{t.almaRule}</p>
            <Link href="/decouvrir?source=collaborateurs-ia" className="mt-6 inline-flex min-h-14 w-full items-center justify-center rounded-full bg-[#F3EFE6] px-7 text-sm font-bold text-[#191715] transition hover:bg-white">{t.almaCta}</Link>
            <p className="mt-4 text-center text-xs font-semibold text-white/60">{t.reassurance.join(' · ')}</p>
          </div>
        </div>
      </section>
    </main>
  )
}

function SectionHeading({ id, kicker, title, body, dark = false, compactTitle = false }: { id?: string; kicker: string; title: string; body: string; dark?: boolean; compactTitle?: boolean }) {
  return <div className="grid gap-6 lg:grid-cols-[1.08fr_.92fr] lg:items-end lg:gap-12"><div><Kicker dark={dark}>{kicker}</Kicker><h2 id={id} className={`mt-5 max-w-3xl font-semibold leading-[.96] tracking-[-.05em] ${compactTitle ? 'text-[clamp(2.1rem,3.5vw,3rem)]' : 'text-balance text-[clamp(2.1rem,4.2vw,4.1rem)]'}`}>{title}</h2></div><p className={`max-w-xl text-[16px] leading-8 ${dark ? 'text-[#CFC6B8]' : 'text-[#514A42]'}`}>{body}</p></div>
}

function ResourceFact({ icon: Icon, title, body }: { icon: LucideIcon; title: string; body: string }) {
  return <div className="bg-[#EAE3D4] p-6 sm:p-7"><Icon className="size-5 text-[#B00C54]"/><h3 className="mt-5 font-semibold">{title}</h3><p className="mt-2 text-xs leading-5 text-[#625B50]">{body}</p></div>
}

const COPY = {
  fr: {
    eyebrow: 'Un nouveau membre dans votre équipe', heroTitlePrefix: 'Votre', heroTitleRole: 'Collaborateur IA', heroTitleEnd: 'travaille.', heroAccent: 'Il progresse. Il reste.', heroLead: 'Une identité, une mémoire et des compétences sous votre contrôle. À chaque mission, il retient les méthodes et corrections que vous validez.',
    heroGroups: [{ label: 'Dans votre organisation', value: 'Identité définie\nMémoire sous votre contrôle' }, { label: 'Équipé pour travailler', value: 'Profils\nCompétences\nPlus de 3 000 apps' }, { label: 'Ses ressources dédiées', value: 'Meilleurs modèles d’IA\nServeur privé dédié' }], heroCardLabel: 'Choisissez l’identité adaptée à votre première mission.', heroCardRule: 'Vous contrôlez ses accès et les décisions qui restent humaines.', start: 'Confier une première mission', explore: 'Voir les Collaborateurs IA', reassurance: ['Première mission gratuite', 'Sans carte bancaire'], almaGuidance: 'Personnalisation guidée par Alma',
    foundationTitle: 'Hermes exécute. Unitalk organise le travail.', foundationBody: 'Hermes fournit le moteur agentique open source. Unitalk ajoute l’identité professionnelle, la mémoire, les applications, les droits et l’espace de collaboration.', foundationCta: 'Découvrir Hermes',
    placeKicker: 'Rattachement à l’entreprise', placeTitle: 'Un Collaborateur IA privé ou partagé.', placeBody: 'Privé pour une personne, ou partagé avec une équipe, un département ou toute l’entreprise. Les membres autorisés le retrouvent dans leur espace de travail.', placementChoiceTitle: 'Choisissez son périmètre de collaboration', placementChoiceBody: 'Vous pourrez le faire évoluer avec votre organisation.', placements: ['Une personne', 'Une équipe', 'Un département', 'Toute l’entreprise'], placementDescriptions: ['Un responsable direct lui confie et suit ses missions.','Il collabore avec tous les membres autorisés d’une équipe.','Il est accessible aux membres autorisés du département.','Il est accessible à tous les membres autorisés de l’entreprise.'], privateMemory: 'Sa propre mémoire', privateMemoryBody: 'Méthodes, expérience et historique des conversations restent disponibles entre ses missions.', sharedKnowledge: 'Les savoirs partagés', sharedKnowledgeBody: 'Il consulte uniquement les documents et informations que l’entreprise lui ouvre.', communication: 'Ses moyens de communication', communicationBody: 'Email, calendrier, messagerie et espace Unitalk selon les canaux autorisés.', sovereignty: 'Son serveur IA', sovereigntyBody: 'Chaque instance Hermes dispose de son propre serveur dans Unitalk AI Cloud.',
    proofKicker: 'Une mission, de bout en bout', proofTitle: 'Il prépare. Votre équipe décide.', proofBody: 'Le Collaborateur reçoit un résultat attendu, travaille avec les ressources autorisées et s’arrête lorsqu’une validation humaine est nécessaire.', proofSteps: [{label:'Mission confiée',title:'Vous définissez le résultat.',body:'L’objectif, le contexte et les limites sont réunis dans un même espace.'},{label:'Travail visible',title:'Il prépare le livrable.',body:'Votre équipe suit les étapes, les sources utilisées et le résultat produit.'},{label:'Contrôle humain',title:'Vous gardez la décision.',body:'Les actions sensibles restent en attente jusqu’à votre validation.'}],
    marketKicker: 'Un Store ouvert à la communauté', marketTitle: 'Choisissez-le, puis faites-le évoluer.', marketBody: 'Sélectionnez une identité, puis ajoutez simplement des profils métier, des compétences, des applications, des modèles et des ressources sans recréer votre Collaborateur.',
    marketItems: {
      collaborators: { eyebrow: 'Identités', title: 'Collaborateurs IA', body: 'Choisissez le Collaborateur qui rejoindra votre organisation.' },
      profiles: { eyebrow: 'Responsabilités', title: 'Profils métier', body: 'Ajoutez les rôles dont votre entreprise a besoin.' },
      skills: { eyebrow: 'Savoir-faire', title: 'Compétences', body: 'Attribuez des méthodes précises et réutilisables.' },
      apps: { eyebrow: '3 000+ connexions', title: 'Applications', body: 'Reliez-le aux outils dans lesquels vos équipes travaillent déjà.' },
      models: { eyebrow: 'Selon la mission', title: 'Modèles d’IA', body: 'Donnez-lui accès aux principaux modèles autorisés par votre entreprise.' },
      servers: { eyebrow: 'Ressources dédiées', title: 'Serveurs IA', body: 'Un serveur privé qui peut évoluer selon vos besoins.' },
    },
    marketNote: 'Le principe', marketContrast: 'Vous ne choisissez pas un outil d’intelligence artificielle individuel et isolé.', marketPromise: 'Vous équipez un Collaborateur qui appartient à votre entreprise pour accomplir ses missions.',
    assetKicker: 'Un capital opérationnel durable', assetTitle: 'Son responsable peut changer. Son expérience reste dans l’entreprise.', assetBody: 'Le Collaborateur appartient à l’entreprise, pas à la personne qui le supervise. Son identité, ses compétences et sa mémoire restent disponibles lorsque les équipes évoluent.', assetCardKicker: 'Propriété de votre entreprise', assetStatus: 'Continuité préservée', assetRole: 'Collaboratrice IA · Votre entreprise', assetKeeps: [['Identité professionnelle','Conservée'],['Mémoire autorisée','Conservée'],['Méthodes validées','Conservées']], handoverLabel: 'Changement de responsable', handoverBody: 'Supervision transférée, continuité préservée',
    assetPoints: [
      { title: 'Réattribuez sa supervision', body: 'Lorsqu’une personne quitte l’entreprise, ses accès sont supprimés et un nouveau responsable prend le relais.' },
      { title: 'Conservez ce qui a été appris', body: 'Les méthodes validées, l’historique utile et la mémoire choisie par l’entreprise restent attachés au Collaborateur.' },
      { title: 'Faites évoluer ses responsabilités', body: 'Ajoutez de nouveaux profils, compétences et outils sans recréer son identité ni perdre son expérience.' },
    ],
    almaRole: 'Collaboratrice IA Unitalk · Coordinatrice de missions IA', almaTitle: 'Partez d’une mission. Alma prépare le Collaborateur adapté.', almaBody: 'Décrivez simplement le résultat attendu. Alma cadre la mission, les ressources nécessaires et les décisions qui resteront sous votre contrôle.', almaCardTitle: 'Alma prépare avec vous', almaPrepares: ['Sa place dans l’organisation', 'Ses compétences et ses applications', 'Ses accès et ses validations', 'Son serveur privé'], almaRule: 'Le Collaborateur accomplit la mission. Votre équipe garde la décision.', almaCta: 'Décrire ma première mission',
  },
  en: {
    eyebrow: 'A new member of your team', heroTitlePrefix: 'Your', heroTitleRole: 'AI Collaborator', heroTitleEnd: 'works.', heroAccent: 'It improves. It stays.', heroLead: 'An identity, memory and skills under your control. With each mission, it retains the methods and corrections you approve.',
    heroGroups: [{ label: 'In your organization', value: 'Defined identity\nMemory under your control' }, { label: 'Equipped to work', value: 'Profiles\nSkills\n3,000+ apps' }, { label: 'Its dedicated resources', value: 'Leading AI models\nDedicated private server' }], heroCardLabel: 'Choose the identity suited to your first mission.', heroCardRule: 'You control its access and the decisions that remain human.', start: 'Entrust a first mission', explore: 'View AI Collaborators', reassurance: ['First mission free', 'No card'], almaGuidance: 'Personalized with Alma',
    foundationTitle: 'Hermes executes. Unitalk organizes the work.', foundationBody: 'Hermes provides the open-source agentic engine. Unitalk adds the professional identity, memory, applications, permissions and collaboration space.', foundationCta: 'Discover Hermes',
    placeKicker: 'Organizational placement', placeTitle: 'A private or shared AI Collaborator.', placeBody: 'Private for one person, or shared with a team, department or the whole organization. Authorized members can access it from their workspace.', placementChoiceTitle: 'Choose its collaboration scope', placementChoiceBody: 'You can evolve it as your organization changes.', placements: ['One person', 'A team', 'A department', 'The whole organization'], placementDescriptions: ['A direct manager assigns and follows its missions.','It collaborates with every authorized member of a team.','It is accessible to authorized department members.','It is accessible to every authorized member of the organization.'], privateMemory: 'Its own memory', privateMemoryBody: 'Methods, experience and conversation history remain available across missions.', sharedKnowledge: 'Shared knowledge', sharedKnowledgeBody: 'It only accesses documents and information the organization opens to it.', communication: 'Its communication tools', communicationBody: 'Email, calendar, messaging and Unitalk workspace through approved channels.', sovereignty: 'Its AI server', sovereigntyBody: 'Each Hermes instance has its own server in Unitalk AI Cloud.',
    proofKicker: 'One mission, end to end', proofTitle: 'It prepares. Your team decides.', proofBody: 'The Collaborator receives an expected outcome, works with authorized resources and stops whenever human approval is required.', proofSteps: [{label:'Mission assigned',title:'You define the outcome.',body:'The objective, context and boundaries are gathered in one shared space.'},{label:'Visible work',title:'It prepares the deliverable.',body:'Your team follows the steps, sources used and the result produced.'},{label:'Human control',title:'You keep the decision.',body:'Sensitive actions remain pending until you approve them.'}],
    marketKicker: 'A Store open to the community', marketTitle: 'Choose it, then evolve it.', marketBody: 'Select an identity, then add job profiles, skills, applications, models and resources without recreating your Collaborator.',
    marketItems: {
      collaborators: { eyebrow: 'Identities', title: 'AI Collaborators', body: 'Choose the Collaborator that will join your organization.' },
      profiles: { eyebrow: 'Responsibilities', title: 'Job profiles', body: 'Add the roles your organization needs.' },
      skills: { eyebrow: 'Know-how', title: 'Skills', body: 'Assign precise, reusable methods.' },
      apps: { eyebrow: '3,000+ connections', title: 'Applications', body: 'Connect it to the tools your teams already use.' },
      models: { eyebrow: 'For each mission', title: 'AI models', body: 'Give it access to leading models approved by your organization.' },
      servers: { eyebrow: 'Dedicated resources', title: 'AI servers', body: 'A private server that can scale with your needs.' },
    },
    marketNote: 'The principle', marketContrast: 'You are not choosing an individual, isolated artificial intelligence tool.', marketPromise: 'You equip a Collaborator that belongs to your organization to carry out its missions.',
    assetKicker: 'Lasting operational capital', assetTitle: 'Its manager can change. Its experience stays in the organization.', assetBody: 'The Collaborator belongs to the organization, not the person supervising it. Its identity, skills and memory remain available as teams evolve.', assetCardKicker: 'Owned by your organization', assetStatus: 'Continuity preserved', assetRole: 'AI Collaborator · Your organization', assetKeeps: [['Professional identity','Retained'],['Authorized memory','Retained'],['Approved methods','Retained']], handoverLabel: 'Manager change', handoverBody: 'Supervision transferred, continuity preserved',
    assetPoints: [
      { title: 'Reassign its supervision', body: 'When someone leaves the organization, their access is removed and a new manager takes over.' },
      { title: 'Retain what has been learned', body: 'Approved methods, useful history and organization-selected memory stay attached to the Collaborator.' },
      { title: 'Evolve its responsibilities', body: 'Add new profiles, skills and tools without recreating its identity or losing its experience.' },
    ],
    almaRole: 'Unitalk AI Collaborator · AI mission coordinator', almaTitle: 'Start with a mission. Alma prepares the right Collaborator.', almaBody: 'Simply describe the expected outcome. Alma scopes the mission, the required resources and the decisions that remain under your control.', almaCardTitle: 'Alma prepares it with you', almaPrepares: ['Its place in the organization', 'Its skills and applications', 'Its access and approvals', 'Its private server'], almaRule: 'The Collaborator carries out the mission. Your team keeps the decision.', almaCta: 'Describe my first mission',
  },
} as const
