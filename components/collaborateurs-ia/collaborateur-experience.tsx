'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Brain, BriefcaseBusiness, Check, Cpu, FolderOpen, Globe2, Mail, Plug, ShieldCheck, SquareTerminal, TimerReset, UserRound, Wrench } from 'lucide-react'
import { AlmaInline } from '@/components/alma-inline'
import { useLanguage, type Lang } from '@/lib/language-context'

type FormatKey = 'text' | 'image' | 'audio' | 'video' | 'code'
type IdentityIndex = 0 | 1 | 2

const FORMAT_KEYS: FormatKey[] = ['text', 'image', 'audio', 'video', 'code']

export function CollaborateurExperience() {
  const { lang } = useLanguage()
  const t = COPY[lang]

  return (
    <main className="overflow-hidden bg-[#F3EFE6] font-sf text-[#1C1A17]">
      <section className="relative overflow-hidden border-b border-[#D8D0C2] px-5 pb-10 pt-24 sm:px-8 sm:pb-12 sm:pt-28 lg:pt-24">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(#1C1A17_1px,transparent_1px),linear-gradient(90deg,#1C1A17_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="editorial-shell relative">
          <p className="font-mono text-[10px] font-black uppercase tracking-[.22em] text-[#B00C54]">{t.heroKicker}</p>
          <div className="mt-6 grid items-center gap-10 lg:grid-cols-[1.08fr_.92fr] lg:gap-16">
          <div>
            <h1 className="max-w-[850px] whitespace-pre-line text-[clamp(3rem,6vw,6.2rem)] font-semibold leading-[.92] tracking-[-.065em]">{t.heroTitle}</h1>
            <p className="mt-5 max-w-2xl text-[16px] leading-7 text-[#4E483F]">{t.heroBody}</p>
            <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <Link href="/decouvrir?source=collaborateurs-ia" className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#181615] px-7 text-[15px] font-bold text-white transition-colors hover:bg-[#332F29] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 sm:w-auto">
                <span className="text-center leading-tight">
                  <span className="block">{t.heroCta}</span>
                  <span className="block">{lang === 'fr' ? <><AlmaInline />{' '}{t.heroCtaAlma}</> : t.heroCtaAlma}</span>
                </span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link href="/missions" className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-[#BFB5A5] bg-[#FAF8F3] px-7 text-sm font-bold sm:w-auto">{t.exploreMissions}</Link>
            </div>
            <p className="mt-3 text-xs font-semibold text-[#6E665A]">{t.trial}</p>
            <Link href="/documentation/licence-collaborateur-ia" className="mt-4 inline-flex text-xs font-bold text-[#B00C54] underline-offset-4 hover:underline">{t.licenseDocumentation}</Link>
          </div>
          <LucasMissionCard lang={lang} />
          </div>
          <div aria-label={t.reassuranceLabel} className="mt-8 grid border-y border-[#CFC5B5] sm:grid-cols-2 lg:grid-cols-4">{t.heroBenefits.map((benefit, index) => <p key={benefit} className="flex min-h-16 items-center gap-4 border-b border-[#CFC5B5] py-3 text-sm font-bold last:border-b-0 sm:border-r lg:border-b-0 lg:last:border-r-0"><span className="font-mono text-[9px] text-[#B00C54]">0{index + 1}</span>{benefit}</p>)}</div>
        </div>
      </section>

      <section id="demonstration" className="px-5 py-20 sm:px-8 sm:py-28">
        <div className="editorial-shell">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <SectionHeading eyebrow={t.startKicker} title={t.startTitle} body={t.startBody} />
            <ol className="border-t border-[#CFC5B5]">
              {t.startSteps.map((step, index) => <li key={step.title} className="grid gap-3 border-b border-[#CFC5B5] py-7 sm:grid-cols-[64px_.7fr_1.3fr] sm:items-center"><span className="font-mono text-[10px] font-black tracking-[0.16em] text-[#B00C54]">0{index + 1}</span><h2 className="text-2xl font-semibold tracking-[-.035em]">{step.title}</h2><p className="text-sm leading-7 text-[#625B50]">{step.body}</p></li>)}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-[#181615] px-5 py-20 text-white sm:px-8 sm:py-28">
        <div className="editorial-shell">
          <SectionHeading dark eyebrow={t.anatomyKicker} title={t.anatomyTitle} body={t.anatomyBody} />
          <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 md:grid-cols-2 xl:grid-cols-4">
            {t.anatomyItems.map((item, index) => {
              const Icon = [UserRound, SquareTerminal, Mail, FolderOpen, BriefcaseBusiness, Plug, Brain, Cpu][index]
              return (
                <article key={item.title} className="min-h-60 bg-[#211E1B] p-6 transition-colors hover:bg-[#292521]">
                  <div className="flex items-center justify-between"><Icon className="size-5 text-[#F2A4C5]" /><span className="font-mono text-[9px] text-[#756E65]">{String(index + 1).padStart(2, '0')}</span></div>
                  <h2 className="mt-12 text-xl font-semibold tracking-[-0.03em]">{item.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-[#AFA397]">{item.body}</p>
                </article>
              )
            })}
          </div>
          <div className="mt-8 flex items-start gap-4 border-l-2 border-[#D10E63] py-2 pl-5">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-[#F2A4C5]" />
            <p className="max-w-4xl text-sm font-semibold leading-7 text-[#E7E0D5]">{t.anatomyRule}</p>
          </div>
        </div>
      </section>

      <section id="formats" className="border-y border-[#DCD4C4] bg-[#EAE3D4] px-5 py-20 sm:px-8 sm:py-28">
        <div className="editorial-shell">
          <SectionHeading eyebrow={t.formatsKicker} title={t.formatsTitle} body={t.formatsBody} />
          <FormatTabs lang={lang} />
          <ConversionBand lang={lang} />
        </div>
      </section>

      <section className="bg-[#181615] px-5 py-16 text-[#FBF9F3] sm:px-8">
        <div className="editorial-shell">
          <SectionHeading dark eyebrow={t.workKicker} title={t.workTitle} body={t.workBody} />
          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">
            {t.workItems.map((item, index) => {
              const Icon = [Globe2, FolderOpen, SquareTerminal, TimerReset][index]
              return <div key={item.title} className="bg-[#211E1B] p-6"><Icon className="size-5 text-[#F2A4C5]" /><h3 className="mt-8 text-xl font-semibold">{item.title}</h3><p className="mt-3 text-sm leading-6 text-[#CFC6B8]">{item.body}</p></div>
            })}
          </div>
          <p className="mt-6 text-sm font-semibold text-[#E7E0D5]">{t.hermes}</p>

          <div className="mt-16 border-t border-white/15 pt-12">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#F2A4C5]">{t.appsKicker}</p>
            <h2 className="mt-4 max-w-3xl text-balance text-[32px] font-semibold leading-[1.06] tracking-[-0.04em] sm:text-[42px]">{t.appsTitle}</h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {t.appTypes.map((item) => <div key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"><h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#F2A4C5]">{item.title}</h3><p className="mt-4 text-sm leading-7 text-[#CFC6B8]">{item.body}</p></div>)}
            </div>
            <div className="mt-8 flex gap-4 rounded-2xl border border-[#D10E63]/40 bg-[#D10E63]/10 p-5"><ShieldCheck className="mt-0.5 size-5 shrink-0 text-[#F2A4C5]" /><p className="text-sm font-semibold leading-7">{t.permissionRule}</p></div>
            <div className="mt-10 grid gap-3 text-sm md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
              <ArchitectureItem label={t.architecture.collaboratorLabel} value={t.architecture.collaboratorValue} />
              <ArrowRight aria-hidden className="hidden size-4 text-[#F2A4C5] md:block" />
              <ArchitectureItem label={t.architecture.serverLabel} value={t.architecture.serverValue} />
              <ArrowRight aria-hidden className="hidden size-4 text-[#F2A4C5] md:block" />
              <ArchitectureItem label={t.architecture.accessLabel} value={t.architecture.accessValue} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#D10E63] px-5 py-20 text-white sm:px-8 sm:py-28">
        <div className="editorial-shell grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-end lg:gap-20">
          <div>
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-white/70">{t.identityKicker}</p>
            <h2 className="mt-5 max-w-xl text-[clamp(2.7rem,6vw,6rem)] font-semibold leading-[.92] tracking-[-.065em]">{t.identityTitle}</h2>
            <p className="mt-6 max-w-xl text-[16px] leading-8 text-white/80">{t.identityBody}</p>
          </div>
          <div className="rounded-[2rem] bg-[#FAF8F3] p-6 text-[#1C1A17] sm:p-8">
            <div className="flex items-center gap-4 border-b border-[#DCD4C4] pb-6">
              <Image src="/images/lucas-avatar.png" alt="" width={56} height={56} className="size-14 rounded-full object-cover" />
              <div><p className="text-xl font-semibold">Lucas</p><p className="mt-1 text-sm text-[#6E665A]">{t.lucasMeta}</p></div>
            </div>
            <div className="mt-6 grid gap-8 sm:grid-cols-2">
              <IdentityList label={t.profilesLabel} items={t.profiles} />
              <IdentityList label={t.experienceLabel} items={t.experience} />
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-t border-[#DCD4C4] bg-[#F3EFE6] px-5 py-20 sm:px-8 sm:py-28">
        <div className="editorial-shell grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20">
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#B00C54]">{t.migrationKicker}</p>
            <h2 className="mt-5 max-w-3xl text-balance text-[36px] font-semibold leading-[1.02] tracking-[-0.045em] sm:text-[48px]">{t.migrationTitle}</h2>
            <p className="mt-6 max-w-2xl text-[17px] leading-8 text-[#4E483F]">{t.migrationBody}</p>
            <Link href="/decouvrir?source=collaborateurs-ia" className="group mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#181615] px-7 text-sm font-bold text-white">
              {t.migrationCta}<ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="rounded-3xl bg-[#181615] p-6 text-[#FBF9F3] sm:p-8">
            <div className="flex items-center gap-3 border-b border-white/10 pb-6"><Wrench className="size-5 text-[#F2A4C5]" /><p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#F2A4C5]">{t.migrationCardLabel}</p></div>
            <ol className="mt-6 space-y-5">
              {t.migrationSteps.map((step, index) => <li key={step} className="flex gap-4 text-sm font-semibold leading-6 text-[#E7E0D5]"><span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#D10E63] font-mono text-[10px] font-black text-white">0{index + 1}</span>{step}</li>)}
            </ol>
            <p className="mt-7 border-t border-white/10 pt-6 text-sm font-bold leading-7 text-white">{t.ownership}</p>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#D10E63] px-5 py-20 text-white sm:px-8 sm:py-24">
        <div className="editorial-shell grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
             <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-white/70">{t.finalKicker}</p>
             <h2 className="mt-5 max-w-5xl text-[clamp(2.7rem,6vw,6rem)] font-semibold leading-[.92] tracking-[-.065em]">{t.finalTitle}</h2>
             <p className="mt-7 max-w-2xl text-[17px] leading-8 text-white/80">{t.finalBody}</p>
             <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-white/85">{t.finalProofs.map((proof) => <li key={proof} className="flex items-center gap-2"><Check className="size-4" />{proof}</li>)}</ul>
          </div>
          <div className="flex min-w-[260px] flex-col items-stretch gap-3">
            <Link href="/decouvrir?source=collaborateurs-ia" className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#181615] px-7 text-[15px] font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#D10E63]">
              {t.finalCta} <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link href="/missions" className="text-center text-sm font-bold text-white underline decoration-white/35 underline-offset-4">{t.exploreMissions}</Link>
            <Link href="/tarifs" className="text-center text-xs font-semibold text-white/70 hover:text-white">{t.pricing}</Link>
          </div>
        </div>
      </section>
    </main>
  )
}

function ConversionBand({ lang }: { lang: Lang }) {
  const t = COPY[lang]
  return <div className="mt-12 flex flex-col justify-between gap-6 border-y border-[#CFC5B5] py-7 sm:flex-row sm:items-center"><div><p className="text-2xl font-semibold tracking-[-0.03em]">{t.midCtaTitle}</p><p className="mt-2 max-w-2xl text-sm leading-6 text-[#625B50]">{t.midCtaBody}</p></div><Link href="/decouvrir?source=collaborateurs-ia" className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[#181615] px-6 text-sm font-bold text-white">{t.midCta}<ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" /></Link></div>
}

function LucasMissionCard({ lang }: { lang: Lang }) {
  const t = COPY[lang]
  const reduce = useReducedMotion()
  const [active, setActive] = useState<IdentityIndex>(0)
  const identities = t.heroIdentities

  useEffect(() => {
    if (reduce) return
    const timer = window.setTimeout(() => setActive((current) => ((current + 1) % identities.length) as IdentityIndex), 4800)
    return () => window.clearTimeout(timer)
  }, [active, identities.length, reduce])

  const identity = identities[active]
  return <div className="mx-auto w-full max-w-[480px]"><div className="overflow-hidden rounded-3xl border border-[#DCD4C4] bg-[#FBF9F3] shadow-[0_28px_65px_-48px_rgba(28,26,23,0.5)]"><AnimatePresence mode="wait" initial={false}><motion.div key={identity.name} initial={reduce ? false : { opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={reduce ? { opacity: 0 } : { opacity: 0, x: -12 }} transition={{ duration: reduce ? 0 : 0.3 }}><div className="grid grid-cols-[112px_1fr] items-stretch sm:grid-cols-[150px_1fr]"><div className="relative min-h-44 bg-[#ECE6DA]"><Image src={identity.avatar} alt={`${lang === 'fr' ? 'Portrait de' : 'Portrait of'} ${identity.name}, ${lang === 'fr' ? 'Collaborateur IA' : 'AI Collaborator'}`} fill priority={active === 0} sizes="150px" className="object-cover object-top" /></div><div className="p-5"><p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#B00C54]">{t.aiIdentity}</p><h2 className="mt-3 text-2xl font-semibold">{identity.name}</h2><p className="mt-1 text-sm text-[#6E665A]">{identity.meta}</p></div></div><div className="grid gap-px border-t border-[#DCD4C4] bg-[#DCD4C4] sm:grid-cols-2"><MissionFact label={t.currentMission} value={identity.mission} /><MissionFact label={t.profilesLabel} value={identity.profiles.join(' · ')} /><MissionFact label={t.permissionsLabel} value={identity.permissions.join('\n')} /><MissionFact label={t.stateLabel} value={identity.state} accent /></div></motion.div></AnimatePresence></div><div role="tablist" aria-label={t.identitySelector} className="mt-4 flex justify-center gap-2">{identities.map((item, index) => <button key={item.name} type="button" role="tab" aria-selected={active === index} aria-label={`${t.showIdentity} ${item.name}`} onClick={() => setActive(index as IdentityIndex)} className={`h-2 rounded-full outline-none transition-all focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 ${active === index ? 'w-8 bg-[#D10E63]' : 'w-2 bg-[#BDB3A1] hover:bg-[#857C6E]'}`} />)}</div></div>
}

function MissionFact({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return <div className="bg-[#FBF9F3] p-5"><p className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-[#857C6E]">{label}</p><p className={`mt-3 whitespace-pre-line text-sm font-semibold leading-6 ${accent ? 'text-[#257A43]' : ''}`}>{value}</p></div>
}

function FormatTabs({ lang }: { lang: Lang }) {
  const t = COPY[lang]
  const [active, setActive] = useState<FormatKey>('text')
  const refs = useRef<Record<FormatKey, HTMLButtonElement | null>>({ text: null, image: null, audio: null, video: null, code: null })
  const item = t.formats[active]

  function selectByKeyboard(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index
    if (event.key === 'ArrowRight') next = (index + 1) % FORMAT_KEYS.length
    else if (event.key === 'ArrowLeft') next = (index - 1 + FORMAT_KEYS.length) % FORMAT_KEYS.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = FORMAT_KEYS.length - 1
    else return
    event.preventDefault()
    const key = FORMAT_KEYS[next]
    setActive(key)
    refs.current[key]?.focus()
  }

  return <div className="mt-12"><div role="tablist" aria-label={t.formatsTabLabel} className="scrollbar-hide flex gap-2 overflow-x-auto pb-2">{FORMAT_KEYS.map((key, index) => <button key={key} ref={(node) => { refs.current[key] = node }} id={`format-tab-${key}`} type="button" role="tab" aria-selected={active === key} aria-controls={`format-panel-${key}`} tabIndex={active === key ? 0 : -1} onClick={() => setActive(key)} onKeyDown={(event) => selectByKeyboard(event, index)} className={`min-h-11 shrink-0 rounded-full border px-5 text-sm font-bold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 ${active === key ? 'border-[#D10E63] bg-[#D10E63] text-white' : 'border-[#D8D0C2] bg-white text-[#4E483F] hover:border-[#D10E63]/50'}`}>{t.formatLabels[key]}</button>)}</div><div id={`format-panel-${active}`} role="tabpanel" aria-labelledby={`format-tab-${active}`} tabIndex={0} className="mt-6 rounded-3xl border border-[#DCD4C4] bg-[#F3EFE6] p-6 outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] sm:p-8"><div className="grid gap-8 lg:grid-cols-3">{(['request', 'work', 'result'] as const).map((field, index) => <div key={field} className={index ? 'border-t border-[#DCD4C4] pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0' : ''}><p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#B00C54]">{t.flowLabels[field]}</p><p className="mt-4 whitespace-pre-line text-[16px] font-semibold leading-7">{item[field]}</p></div>)}</div>{'note' in item && <p className="mt-8 border-l-2 border-[#D10E63] pl-5 text-sm leading-7 text-[#4E483F]">{item.note}</p>}</div></div>
}

function SectionHeading({ eyebrow, title, body, dark = false }: { eyebrow: string; title: string; body: string; dark?: boolean }) {
  return <div className="max-w-4xl"><p className={`font-mono text-[11px] font-bold uppercase tracking-[0.18em] ${dark ? 'text-[#F2A4C5]' : 'text-[#B00C54]'}`}>{eyebrow}</p><h2 className={`mt-5 text-balance text-[34px] font-semibold leading-[1.05] tracking-[-0.04em] sm:text-[44px] ${dark ? 'text-white' : ''}`}>{title}</h2><p className={`mt-5 max-w-3xl text-[16px] leading-8 ${dark ? 'text-[#CFC6B8]' : 'text-[#4E483F]'}`}>{body}</p></div>
}

function ArchitectureItem({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"><p className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-[#F2A4C5]">{label}</p><p className="mt-3 leading-6 text-[#E7E0D5]">{value}</p></div>
}

function IdentityList({ label, items }: { label: string; items: readonly string[] }) {
  return <div><p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#857C6E]">{label}</p><ul className="mt-4 space-y-3">{items.map((item) => <li key={item} className="flex gap-3 text-sm font-semibold leading-6"><Check className="mt-1 size-4 shrink-0 text-[#D10E63]" />{item}</li>)}</ul></div>
}

const COPY = {
  fr: {
    heroKicker: 'Collaborateur IA pour entreprise', heroTitle: 'Confiez une mission.\nGardez la décision.', heroBody: 'Un Collaborateur IA accomplit un travail concret dans les outils autorisés, conserve le contexte validé et vous demande d’intervenir lorsque la décision doit rester humaine.', heroBenefits: ['Part du travail réel', 'Agit avec les accès autorisés', 'Conserve l’expérience validée', 'Décisions sensibles sous votre contrôle'], heroCta: 'Décrire une mission', heroCtaAlma: 'à Alma', seeWork: 'Voir une mission en action', trial: '7 jours gratuits · Sans carte bancaire · Licence dès 49 €/mois, capacité IA au choix', licenseDocumentation: 'Ce que comprend la Licence Collaborateur IA →',
    reassuranceLabel: 'Garanties de l’offre', reassurances: [{ title: 'Vous commencez par un besoin réel', body: 'Alma transforme votre besoin en mission cadrée.' }, { title: 'Vous gardez le contrôle', body: 'Les accès et validations sont définis avant l’activation.' }, { title: 'Son expérience ne repart pas de zéro', body: 'Le contexte validé reste attaché à son identité IA.' }],
    startKicker: 'Une mission de bout en bout', startTitle: 'Tout commence par une mission.', startBody: 'Décrivez le résultat attendu. Alma prépare le cadre, le Collaborateur IA accomplit le travail et vous gardez les décisions sensibles.', startSteps: [{ title: 'Décrivez le travail', body: 'Expliquez le résultat attendu avec vos propres mots.' }, { title: 'Validez le cadre', body: 'Confirmez les sources, applications, droits et validations humaines.' }, { title: 'Recevez le résultat', body: 'Le Collaborateur IA exécute, documente son travail et soumet ce qui doit être validé.' }],
    anatomyKicker: 'Autonomie · Open source · Souveraineté', anatomyTitle: 'Une vraie identité IA. Son propre espace de travail.', anatomyBody: 'Un Collaborateur IA ne se limite pas à une conversation. Il réunit une identité professionnelle et un environnement autonome propulsé par Hermes open source. Votre entreprise garde la maîtrise de ses données, de sa mémoire, de ses modèles et de son infrastructure.',
    anatomyItems: [
      { title: 'Identité IA', body: 'Un prénom, un avatar, une voix et un rattachement explicite à votre entreprise.' },
      { title: 'Espace autonome open source', body: 'Un environnement Hermes isolé avec navigateur, terminal, exécution de code, planification et outils autorisés.' },
      { title: 'Communication', body: 'Une adresse email, un calendrier, un numéro de téléphone si activé et les messageries d’équipe autorisées.' },
      { title: 'Fichiers et médias', body: 'Ses fichiers, documents, images, sons et vidéos restent organisés dans le contexte de ses missions.' },
      { title: 'Profils et compétences', body: 'Des profils métier, des compétences versionnées et l’expérience validée par votre entreprise.' },
      { title: 'Modèles et applications', body: 'Les modèles IA, applications connectées, API et outils MCP choisis par votre entreprise.' },
      { title: 'Mémoire et historique', body: 'La mémoire autorisée, l’historique des conversations, les étapes d’exécution et les journaux de son code.' },
      { title: 'Ressources matérielles', body: 'Un environnement isolé avec stockage, secrets et ressources CPU, RAM ou GPU affectées selon l’offre et l’hébergement.' },
    ],
    anatomyRule: 'Chaque accès reste gouverné : posséder un outil ne signifie pas pouvoir l’utiliser dans toutes les missions. Les droits, validations et limites sont définis par votre entreprise.',
    aiIdentity: 'Identité IA', lucasMeta: 'Collaborateur IA · Solvea', currentMission: 'Mission en cours', mission: 'Répondre aux demandes reçues par email', profilesLabel: 'Profils métier', profiles: ['Relation client', 'Commercial', 'Fidélisation'], permissionsLabel: 'Autorisations de cette mission', permissions: ['Lire les demandes reçues', 'Préparer une réponse', 'Soumettre avant envoi'], stateLabel: 'État', state: '3 réponses prêtes à valider',
    identitySelector: 'Exemples de Collaborateurs IA', showIdentity: 'Afficher', heroIdentities: [
      { name: 'Lucas', avatar: '/images/lucas-avatar.png', meta: 'Collaborateur IA · Solvea', mission: 'Répondre aux demandes reçues par email', profiles: ['Relation client', 'Commercial', 'Fidélisation'], permissions: ['Lire les demandes reçues', 'Préparer une réponse', 'Soumettre avant envoi'], state: '3 réponses prêtes à valider' },
      { name: 'Emma', avatar: '/images/emma-avatar.png', meta: 'Collaboratrice IA · Solvea', mission: 'Préparer les réunions de direction', profiles: ['Assistante de direction', 'Entreprise'], permissions: ['Lire l’agenda autorisé', 'Préparer les dossiers', 'Soumettre le compte rendu'], state: 'Réunion de 14 h préparée' },
      { name: 'Chloé', avatar: '/images/chloe-avatar.png', meta: 'Collaboratrice IA · Solvea', mission: 'Qualifier les nouveaux prospects', profiles: ['Commercial', 'Développement commercial'], permissions: ['Rechercher les entreprises', 'Enrichir les fiches', 'Proposer une qualification'], state: '12 prospects prêts à vérifier' },
    ],
    formatsKicker: 'Comprendre et produire', formatsTitle: 'Il comprend, produit et code dans le format utile à la mission.', formatsBody: 'Selon les modèles et les outils autorisés par votre entreprise, un même Collaborateur IA peut travailler avec du texte, des images, de l’audio, de la vidéo et du code, sans perdre le contexte de la mission.', formatsTabLabel: 'Formats de travail', formatLabels: { text: 'Texte', image: 'Image', audio: 'Audio', video: 'Vidéo', code: 'Code' }, flowLabels: { request: 'Demande', work: 'Travail', result: 'Résultat' },
    formats: {
      text: { request: 'Répondre à une demande client en tenant compte de son dossier.', work: 'Lire la demande, retrouver les informations autorisées et préparer une réponse conforme aux règles de l’entreprise.', result: 'Une réponse contextualisée, prête à relire et à valider.' },
      image: { request: 'Comparer deux versions d’un visuel produit.', work: 'Lire les éléments visibles, relever les écarts et, si un modèle autorisé le permet, préparer une variante.', result: 'Une comparaison documentée et un visuel exploitable si la génération est disponible.' },
      audio: { request: 'Transformer un enregistrement de réunion en décisions et actions.', work: 'Transcrire l’audio, distinguer les intervenants et rattacher chaque décision à son contexte.', result: 'Une transcription structurée, les décisions prises et les actions attribuées.' },
      video: { request: 'Préparer la publication d’une démonstration produit.', work: 'Analyser la vidéo, identifier les séquences utiles et préparer chapitres, résumé et sous-titres.', result: 'Une vidéo documentée, chapitrée et prête pour la validation éditoriale.' },
      code: { request: 'Réconcilier deux exports de ventes\net signaler les anomalies.', work: 'Écrire un script, le tester sur des données contrôlées et vérifier les écarts dans l’environnement isolé du Collaborateur IA.', result: 'Un fichier nettoyé, un rapport d’anomalies et une version du script conservée avec la mission.', note: 'Lorsque la mission le nécessite et que les droits le permettent, Code peut aussi servir à construire ou adapter une application métier vibecodée, testée et versionnée.' },
    },
    workKicker: 'Exécuter', workTitle: 'Il ne se contente pas de produire. Il agit avec les moyens autorisés.', workBody: 'Code désigne un format de production et un savoir-faire. Le Terminal est un moyen d’exécution disponible uniquement dans l’environnement isolé et selon les droits de la mission.', workItems: [{ title: 'Navigateur', body: 'Parcourir et utiliser les sites autorisés.' }, { title: 'Fichiers', body: 'Lire, produire et organiser les fichiers de la mission.' }, { title: 'Terminal', body: 'Exécuter et vérifier du code dans son environnement isolé.' }, { title: 'Planification', body: 'Reprendre un travail et continuer au-delà d’une conversation.' }], hermes: 'Hermes Agent est le système d’exploitation agentique open source de Nous Research, distribué sous licence MIT. Unitalk AI l’intègre dans une distribution professionnelle indépendante.',
    appsKicker: 'Applications et services', appsTitle: 'Les outils restent séparés des droits accordés au Collaborateur IA.', appTypes: [{ title: 'Connecteurs', body: 'Services externes autorisés par l’entreprise.' }, { title: 'Applications natives', body: 'Applications open source vérifiées et déployées sur le Serveur IA privé de l’entreprise.' }, { title: 'Applications métier', body: 'Applications privées ou modèles vibecodés pour soutenir une mission précise.' }], permissionRule: 'Installer une application ne donne aucun accès à un Collaborateur IA. Les droits sont accordés séparément.', architecture: { collaboratorLabel: 'Collaborateur IA', collaboratorValue: 'Environnement Hermes/VPS isolé', serverLabel: 'Serveur IA privé', serverValue: 'Applications et services de l’entreprise', accessLabel: 'Accès', accessValue: 'n8n, API, MCP ou navigateur selon les droits' },
    identityKicker: 'Une identité qui dure', identityTitle: 'Une seule identité IA. Plusieurs responsabilités.', identityBody: 'Les profils métier peuvent évoluer et l’expérience validée peut rester attachée à Lucas. Son identité, son rattachement et les règles de l’entreprise ne sont pas recréés à chaque mission.', experienceLabel: 'Expérience validée', experience: ['Politique de réponse client · version 3', 'Règles de qualification commerciale · version 2'],
    migrationKicker: 'Migration et portabilité', migrationTitle: 'Vous avez déjà Hermes ? Préparons la migration.', migrationBody: 'Importez une configuration Hermes compatible sans reconstruire votre Collaborateur IA depuis zéro. Unitalk prépare la reprise de son identité, de ses profils, de ses compétences, de ses outils et de sa mémoire exportable, puis vous fait valider les droits avant activation.', migrationCta: 'Étudier ma migration', migrationCardLabel: 'Compatible avec Hermes', migrationSteps: ['Connectez ou importez votre environnement Hermes.', 'Vérifiez les données, outils, secrets et dépendances détectés.', 'Validez la migration et retrouvez votre Collaborateur IA dans Unitalk.'], ownership: 'Sans verrouillage fournisseur. Vos données, votre mémoire, vos méthodes et votre intelligence restent sous le contrôle de votre entreprise.',
    midCtaTitle: 'Quel travail voulez-vous ne plus avoir à faire seul ?', midCtaBody: 'Décrivez-le à Alma. Elle vous aide à cadrer la mission avant toute activation.', midCta: 'Décrire ma mission',
    finalKicker: 'Votre première mission', finalTitle: 'Décrivez le travail. Alma prépare le cadre. Vous gardez le contrôle.', finalBody: 'Commencez avec vos propres mots. Alma structure la mission, identifie le Collaborateur IA adapté et prépare les accès avant toute activation.', finalProofs: ['7 jours gratuits', 'Sans carte bancaire', 'Licence dès 49 €/mois'], finalCta: 'Décrire ma mission', exploreMissions: 'Explorer les missions', pricing: 'Consulter les tarifs détaillés',
  },
  en: {
    heroKicker: 'AI Collaborator for business', heroTitle: 'Entrust a mission.\nKeep the decision.', heroBody: 'An AI Collaborator completes concrete work in authorized tools, retains validated context and asks you to step in whenever the decision must remain human.', heroBenefits: ['Starts from real work', 'Acts with authorized access', 'Retains validated experience', 'Sensitive decisions under your control'], heroCta: 'Describe a mission', heroCtaAlma: 'to Alma', seeWork: 'See a mission in action', trial: '7 days free · No credit card · License from €49/month, AI capacity of your choice', licenseDocumentation: 'What the AI Collaborator License includes →',
    reassuranceLabel: 'Offer guarantees', reassurances: [{ title: 'Start with real work', body: 'Alma turns your need into a scoped mission.' }, { title: 'You stay in control', body: 'Access and approvals are defined before activation.' }, { title: 'Experience does not reset', body: 'Validated context remains attached to its AI identity.' }],
    startKicker: 'One mission, end to end', startTitle: 'Everything starts with a mission.', startBody: 'Describe the expected outcome. Alma prepares the scope, the AI Collaborator does the work and you keep sensitive decisions.', startSteps: [{ title: 'Describe the work', body: 'Explain the expected outcome in your own words.' }, { title: 'Approve the scope', body: 'Confirm sources, applications, permissions and human approvals.' }, { title: 'Receive the result', body: 'The AI Collaborator executes, documents the work and submits what needs approval.' }],
    anatomyKicker: 'Everything it owns', anatomyTitle: 'A real AI identity. Its own workspace.', anatomyBody: 'An AI Collaborator is more than a conversation. It brings together a professional identity, an autonomous Hermes-powered environment and the resources your company assigns to it.',
    anatomyItems: [
      { title: 'AI identity', body: 'A first name, avatar, voice and explicit attachment to your organization.' },
      { title: 'Autonomous open-source workspace', body: 'An isolated Hermes environment with browser, terminal, code execution, scheduling and authorized tools.' },
      { title: 'Communication', body: 'An email address, calendar, phone number when enabled and authorized team messaging.' },
      { title: 'Files and media', body: 'Its files, documents, images, audio and video remain organized in mission context.' },
      { title: 'Profiles and skills', body: 'Job profiles, versioned skills and experience approved by your company.' },
      { title: 'Models and applications', body: 'The AI models, connected applications, APIs and MCP tools selected by your organization.' },
      { title: 'Memory and history', body: 'Authorized memory, conversation history, execution steps and code logs.' },
      { title: 'Compute resources', body: 'An isolated environment with storage, secrets and CPU, RAM or GPU resources allocated according to the plan and hosting.' },
    ],
    anatomyRule: 'Every access remains governed: having a tool does not mean it can be used in every mission. Your company defines permissions, approvals and limits.',
    aiIdentity: 'AI identity', lucasMeta: 'AI Collaborator · Solvea', currentMission: 'Current mission', mission: 'Answer requests received by email', profilesLabel: 'Job profiles', profiles: ['Customer relations', 'Sales', 'Customer success'], permissionsLabel: 'Permissions for this mission', permissions: ['Read received requests', 'Prepare a reply', 'Submit before sending'], stateLabel: 'Status', state: '3 replies ready for review',
    identitySelector: 'AI Collaborator examples', showIdentity: 'Show', heroIdentities: [
      { name: 'Lucas', avatar: '/images/lucas-avatar.png', meta: 'AI Collaborator · Solvea', mission: 'Answer requests received by email', profiles: ['Customer relations', 'Sales', 'Customer success'], permissions: ['Read received requests', 'Prepare a reply', 'Submit before sending'], state: '3 replies ready for review' },
      { name: 'Emma', avatar: '/images/emma-avatar.png', meta: 'AI Collaborator · Solvea', mission: 'Prepare executive meetings', profiles: ['Executive assistant', 'Organization'], permissions: ['Read authorized calendar', 'Prepare meeting files', 'Submit meeting notes'], state: '2 p.m. meeting prepared' },
      { name: 'Chloé', avatar: '/images/chloe-avatar.png', meta: 'AI Collaborator · Solvea', mission: 'Qualify new prospects', profiles: ['Sales', 'Business development'], permissions: ['Research companies', 'Enrich records', 'Suggest qualification'], state: '12 prospects ready for review' },
    ],
    formatsKicker: 'Understand and produce', formatsTitle: 'It understands, produces and codes in the format the mission needs.', formatsBody: 'Depending on the models and tools your company authorizes, one AI Collaborator can work with text, images, audio, video and code without losing the mission context.', formatsTabLabel: 'Work formats', formatLabels: { text: 'Text', image: 'Image', audio: 'Audio', video: 'Video', code: 'Code' }, flowLabels: { request: 'Request', work: 'Work', result: 'Result' },
    formats: {
      text: { request: 'Answer a customer request using its case context.', work: 'Read the request, retrieve authorized information and prepare a reply that follows company rules.', result: 'A contextual reply ready for review and approval.' },
      image: { request: 'Compare two versions of a product visual.', work: 'Read visible elements, identify differences and prepare a variant if an authorized model supports it.', result: 'A documented comparison and a usable visual when generation is available.' },
      audio: { request: 'Turn a meeting recording into decisions and actions.', work: 'Transcribe audio, distinguish speakers and connect every decision to its context.', result: 'A structured transcript, decisions and assigned actions.' },
      video: { request: 'Prepare a product demo for publication.', work: 'Analyze the video and prepare chapters, a summary and subtitles.', result: 'A documented, chaptered video ready for editorial review.' },
      code: { request: 'Reconcile two sales exports\nand flag anomalies.', work: 'Write a script, test it on controlled data and verify discrepancies in the AI Collaborator’s isolated environment.', result: 'A cleaned file, an anomaly report and a versioned script retained with the mission.', note: 'When the mission requires it and permissions allow it, Code can also build or adapt a vibe-coded business application that is tested and versioned.' },
    },
    workKicker: 'Execute', workTitle: 'It does not only produce. It acts with authorized means.', workBody: 'Code is a production format and skill. The Terminal is an execution method available only in the isolated environment and under mission permissions.', workItems: [{ title: 'Browser', body: 'Browse and use authorized websites.' }, { title: 'Files', body: 'Read, produce and organize mission files.' }, { title: 'Terminal', body: 'Run and verify code in its isolated environment.' }, { title: 'Scheduling', body: 'Resume work and continue beyond a conversation.' }], hermes: 'Hermes Agent is the open-source agentic operating system from Nous Research, distributed under the MIT License. Unitalk AI integrates it into an independent professional distribution.',
    appsKicker: 'Applications and services', appsTitle: 'Tools remain separate from the permissions granted to the AI Collaborator.', appTypes: [{ title: 'Connectors', body: 'External services authorized by the company.' }, { title: 'Native applications', body: 'Verified open-source applications deployed on the company’s private AI Server.' }, { title: 'Business applications', body: 'Private applications or vibe-coded templates supporting a specific mission.' }], permissionRule: 'Installing an application grants no access to an AI Collaborator. Permissions are granted separately.', architecture: { collaboratorLabel: 'AI Collaborator', collaboratorValue: 'Isolated Hermes/VPS environment', serverLabel: 'Private AI Server', serverValue: 'Company applications and services', accessLabel: 'Access', accessValue: 'n8n, API, MCP or browser according to permissions' },
    identityKicker: 'An identity that lasts', identityTitle: 'One AI identity. Several responsibilities.', identityBody: 'Job profiles can evolve and validated experience can remain attached to Lucas. Its identity, organization and company rules are not recreated for every mission.', experienceLabel: 'Validated experience', experience: ['Customer reply policy · version 3', 'Sales qualification rules · version 2'],
    migrationKicker: 'Migration and portability', migrationTitle: 'Already using Hermes? Let us prepare the migration.', migrationBody: 'Import a compatible Hermes setup without rebuilding your AI Collaborator from scratch. Unitalk prepares the transfer of its identity, profiles, skills, tools and exportable memory, then asks you to approve permissions before activation.', migrationCta: 'Assess my migration', migrationCardLabel: 'Compatible with Hermes', migrationSteps: ['Connect or import your Hermes environment.', 'Review detected data, tools, secrets and dependencies.', 'Approve the migration and find your AI Collaborator in Unitalk.'], ownership: 'No vendor lock-in. Your data, memory, methods and intelligence remain under your company’s control.',
    midCtaTitle: 'What work do you no longer want to handle alone?', midCtaBody: 'Describe it to Alma. She helps scope the mission before anything is activated.', midCta: 'Describe my mission',
    finalKicker: 'Your first mission', finalTitle: 'Describe the work. Alma prepares the scope. You keep control.', finalBody: 'Start in your own words. Alma structures the mission, identifies the right AI Collaborator and prepares access before anything is activated.', finalProofs: ['7 days free', 'No credit card', 'License from €49/month'], finalCta: 'Describe my mission', exploreMissions: 'Explore missions', pricing: 'View detailed pricing',
  },
} as const
