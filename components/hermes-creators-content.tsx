'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Play } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { HERMES_CREATORS } from '@/lib/hermes-creators'

export function HermesCreatorsContent() {
  const { lang } = useLanguage()
  const fr = lang === 'fr'

  return <main className="bg-[#F3EFE6] font-sf text-[#1C1A17]">
    <section className="relative overflow-hidden border-b border-[#D8D0C2] px-5 pb-16 pt-32 sm:px-8 sm:pt-40">
      <div aria-hidden className="absolute inset-0 opacity-[.045] [background-image:linear-gradient(#1C1A17_1px,transparent_1px),linear-gradient(90deg,#1C1A17_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="editorial-shell relative">
        <Link href="/marketplace" className="inline-flex items-center gap-2 text-sm font-bold text-[#625B50] hover:text-[#B00C54]"><ArrowLeft className="size-4" />{fr ? 'Marketplace' : 'Marketplace'}</Link>
        <p className="mt-10 font-mono text-[10px] font-black uppercase tracking-[.22em] text-[#B00C54]">{fr ? 'Sélection éditoriale / YouTube' : 'Editorial selection / YouTube'}</p>
        <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <h1 className="max-w-4xl text-[clamp(2.8rem,6vw,6rem)] font-semibold leading-[.92] tracking-[-.065em]">{fr ? '10 créateurs pour comprendre Hermes.' : '10 creators to understand Hermes.'}</h1>
          <div><p className="max-w-xl text-[17px] leading-8 text-[#4E483F]">{fr ? 'Tutoriels, cours, retours d’expérience et entretiens vérifiés pour découvrir Hermes Agent au-delà de la documentation.' : 'Verified tutorials, courses, hands-on reviews and interviews for discovering Hermes Agent beyond its documentation.'}</p><p className="mt-5 border-l-2 border-[#D10E63] pl-4 text-xs leading-6 text-[#6E665A]">{fr ? 'Sélection indépendante mise à jour en août 2026. Ces créateurs ne sont pas présentés comme affiliés, partenaires ou porte-parole de Unitalk ou Nous Research.' : 'Independent selection updated in August 2026. These creators are not presented as affiliates, partners or representatives of Unitalk or Nous Research.'}</p></div>
        </div>
      </div>
    </section>

    <section className="px-5 py-16 sm:px-8 sm:py-24"><div className="editorial-shell"><div className="grid gap-4 md:grid-cols-2">{HERMES_CREATORS.map((creator, index) => <article key={creator.videoUrl} className="group flex min-h-[330px] flex-col rounded-3xl border border-[#D8D0C2] bg-[#FAF8F3] p-6 transition-colors hover:border-[#D10E63]/45 sm:p-7"><div className="flex items-start justify-between gap-5"><div className="flex size-14 items-center justify-center rounded-full bg-[#181615] text-white"><Play className="ml-0.5 size-5 fill-current" /></div><span className="font-mono text-[10px] font-bold text-[#857C6E]">{String(index + 1).padStart(2, '0')} / 10</span></div><p className="mt-8 font-mono text-[9px] font-black uppercase tracking-[.18em] text-[#B00C54]">YouTube · {creator.language} · {creator.duration}</p><h2 className="mt-3 text-2xl font-semibold tracking-[-.035em]">{creator.name}</h2><a href={creator.channelUrl} target="_blank" rel="noreferrer" className="mt-1 w-fit text-xs font-semibold text-[#6E665A] hover:text-[#B00C54]">{creator.channel}</a><p className="mt-5 text-sm leading-7 text-[#625B50]">{creator.angle[lang]}</p><div className="mt-auto border-t border-[#D8D0C2] pt-6"><a href={creator.videoUrl} target="_blank" rel="noreferrer" className="inline-flex items-start gap-2 text-sm font-bold text-[#1C1A17] hover:text-[#B00C54]"><span>{creator.videoTitle}</span><ArrowUpRight className="mt-0.5 size-4 shrink-0" /></a><p className="mt-2 text-[11px] text-[#857C6E]">{creator.published}</p></div></article>)}</div></div></section>

    <section className="bg-[#181615] px-5 py-16 text-white sm:px-8"><div className="editorial-shell flex flex-col justify-between gap-8 lg:flex-row lg:items-end"><div><p className="font-mono text-[10px] font-black uppercase tracking-[.2em] text-[#F2A4C5]">Hermes Agent</p><h2 className="mt-5 max-w-3xl text-[clamp(2.4rem,5vw,4.8rem)] font-semibold leading-[.95] tracking-[-.055em]">{fr ? 'Passez de la découverte au travail réel.' : 'Move from discovery to real work.'}</h2></div><Link href="/collaborateurs-ia" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-[#D10E63] px-7 text-sm font-bold">{fr ? 'Découvrir les Collaborateurs IA' : 'Discover AI Collaborators'}<ArrowUpRight className="ml-2 size-4" /></Link></div></section>
  </main>
}
