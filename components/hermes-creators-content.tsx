'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Play } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { HERMES_CREATORS } from '@/lib/hermes-creators'

export function HermesCreatorsContent({ initialAffiliateCode }: { initialAffiliateCode?: string }) {
  const { lang } = useLanguage()
  const fr = lang === 'fr'
  const initialCreator = HERMES_CREATORS.find((creator) => creator.affiliateCode === initialAffiliateCode) ?? HERMES_CREATORS[0]
  const [selectedCreator, setSelectedCreator] = useState(initialCreator)
  const videoId = new URL(selectedCreator.videoUrl).searchParams.get('v')
  const orderHref = `/commande?affilie=${encodeURIComponent(selectedCreator.affiliateCode)}&source=hermes-creators`

  return <main className="bg-[#F3EFE6] font-sf text-[#1C1A17]">
    <section className="relative overflow-hidden border-b border-[#D8D0C2] px-5 pb-16 pt-32 sm:px-8 sm:pt-40">
      <div aria-hidden className="absolute inset-0 opacity-[.045] [background-image:linear-gradient(#1C1A17_1px,transparent_1px),linear-gradient(90deg,#1C1A17_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="editorial-shell relative">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-[#625B50] hover:text-[#B00C54]"><ArrowLeft className="size-4" />Blog</Link>
        <p className="mt-10 font-mono text-[10px] font-black uppercase tracking-[.22em] text-[#B00C54]">{fr ? 'Sélection éditoriale / YouTube' : 'Editorial selection / YouTube'}</p>
        <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <h1 className="max-w-4xl text-[clamp(2.8rem,6vw,6rem)] font-semibold leading-[.92] tracking-[-.065em]">{fr ? '10 créateurs pour comprendre Hermes.' : '10 creators to understand Hermes.'}</h1>
          <div><p className="max-w-xl text-[17px] leading-8 text-[#4E483F]">{fr ? 'Tutoriels, cours, retours d’expérience et entretiens vérifiés pour découvrir Hermes Agent au-delà de la documentation.' : 'Verified tutorials, courses, hands-on reviews and interviews for discovering Hermes Agent beyond its documentation.'}</p><div className="mt-7 flex flex-col gap-3 sm:flex-row"><Link href={orderHref} className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#D10E63] px-6 text-sm font-bold text-white transition-colors hover:bg-[#B80C56]">{fr ? 'Commander ma première mission gratuitement' : 'Order my first mission for free'}</Link><Link href="/tarifs" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#CFC6B8] px-6 text-sm font-bold transition-colors hover:border-[#1C1A17]">{fr ? 'Voir les tarifs' : 'View pricing'}</Link></div><p className="mt-5 border-l-2 border-[#D10E63] pl-4 text-xs leading-6 text-[#6E665A]">{fr ? 'Sélection éditoriale mise à jour en août 2026. Ces créateurs participent au programme d’affiliation Unitalk et transmettent leur commission de 30 % via leur code personnel. Ils ne sont pas porte-parole de Unitalk ou Nous Research.' : 'Editorial selection updated in August 2026. These creators participate in the Unitalk affiliate program and pass on their 30% commission through a personal code. They are not representatives of Unitalk or Nous Research.'}</p></div>
        </div>
      </div>
    </section>

    <section className="px-5 py-16 sm:px-8 sm:py-24">
      <div className="editorial-shell">
        <div className="overflow-hidden rounded-[30px] border border-[#292521] bg-[#181615] text-white shadow-[0_32px_80px_-40px_rgba(28,26,23,.7)]">
          <div className="aspect-video bg-black">
            <iframe key={videoId} src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`} title={`${selectedCreator.name} · ${selectedCreator.videoTitle}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen className="h-full w-full" />
          </div>
          <div className="grid gap-6 border-t border-white/10 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div><p className="font-mono text-[9px] font-black uppercase tracking-[.18em] text-[#F2A4C5]">Unitalk Player · {selectedCreator.name}</p><h2 className="mt-3 max-w-3xl text-2xl font-semibold tracking-[-.035em]">{selectedCreator.videoTitle}</h2><p className="mt-3 max-w-2xl text-sm leading-7 text-[#CFC6B8]">{selectedCreator.angle[lang]}</p></div>
            <div className="flex flex-col items-start gap-2 lg:items-end"><Link href={orderHref} className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#D10E63] px-6 text-sm font-bold transition-colors hover:bg-[#B80C56]">{fr ? 'Commander ma première mission gratuitement' : 'Order my first mission for free'}<ArrowUpRight className="ml-2 size-4" /></Link><p className="text-[10px] text-[#8F8579]">{fr ? `Code ${selectedCreator.affiliateCode} · avantage de 30 % la première année` : `Code ${selectedCreator.affiliateCode} · 30% benefit for the first year`}</p></div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">{HERMES_CREATORS.map((creator, index) => { const selected = selectedCreator.affiliateCode === creator.affiliateCode; return <article key={creator.videoUrl} className={`group flex min-h-[330px] flex-col rounded-3xl border p-6 transition-colors sm:p-7 ${selected ? 'border-[#D10E63] bg-[#FFF8FB] shadow-[0_18px_45px_-35px_rgba(209,14,99,.65)]' : 'border-[#D8D0C2] bg-[#FAF8F3] hover:border-[#D10E63]/45'}`}><div className="flex items-start justify-between gap-5"><button type="button" onClick={() => { setSelectedCreator(creator); document.querySelector('iframe')?.scrollIntoView({ behavior: 'smooth', block: 'center' }) }} aria-label={fr ? `Lire la vidéo de ${creator.name}` : `Play ${creator.name}'s video`} className={`flex size-14 items-center justify-center rounded-full transition-colors ${selected ? 'bg-[#D10E63] text-white' : 'bg-[#181615] text-white group-hover:bg-[#D10E63]'}`}><Play className="ml-0.5 size-5 fill-current" /></button><span className="font-mono text-[10px] font-bold text-[#857C6E]">{String(index + 1).padStart(2, '0')} / 10</span></div><p className="mt-8 font-mono text-[9px] font-black uppercase tracking-[.18em] text-[#B00C54]">YouTube · {creator.language} · {creator.duration}</p><h2 className="mt-3 text-2xl font-semibold tracking-[-.035em]">{creator.name}</h2><a href={creator.channelUrl} target="_blank" rel="noreferrer" className="mt-1 w-fit text-xs font-semibold text-[#6E665A] hover:text-[#B00C54]">{creator.channel}</a><p className="mt-5 text-sm leading-7 text-[#625B50]">{creator.angle[lang]}</p><div className="mt-auto border-t border-[#D8D0C2] pt-6"><button type="button" onClick={() => { setSelectedCreator(creator); window.scrollTo({ top: 520, behavior: 'smooth' }) }} className="inline-flex items-start gap-2 text-left text-sm font-bold text-[#1C1A17] hover:text-[#B00C54]"><span>{fr ? 'Regarder dans le player Unitalk' : 'Watch in the Unitalk player'}</span><Play className="mt-0.5 size-4 shrink-0 fill-current" /></button><div className="mt-4 flex items-center justify-between gap-3"><p className="text-[11px] text-[#857C6E]">{creator.published}</p><Link href={`/commande?affilie=${encodeURIComponent(creator.affiliateCode)}&source=hermes-creators`} className="text-[11px] font-bold text-[#B00C54] hover:underline">{fr ? 'Bon de commande −30 %' : 'Order form −30%'}</Link></div></div></article> })}</div>
        <div className="mt-8 flex flex-col justify-between gap-4 rounded-2xl border border-[#D8D0C2] bg-[#EAE3D4] p-5 sm:flex-row sm:items-center"><p className="max-w-3xl text-xs leading-6 text-[#625B50]">{fr ? 'L’avantage affilié correspond à 30 % des abonnements éligibles encaissés pendant la première année. Le code du créateur est transmis automatiquement au bon de commande. Conditions et validation définitive affichées avant confirmation.' : 'The affiliate benefit equals 30% of eligible subscriptions collected during the first year. The creator code is automatically passed to the order form. Terms and final validation are shown before confirmation.'}</p><Link href="/partenaires#affiliation" className="shrink-0 text-xs font-bold text-[#B00C54] underline-offset-4 hover:underline">{fr ? 'Rejoindre le programme d’affiliation' : 'Join the affiliate program'}</Link></div>
      </div>
    </section>

    <section className="bg-[#181615] px-5 py-16 text-white sm:px-8"><div className="editorial-shell flex flex-col justify-between gap-8 lg:flex-row lg:items-end"><div><p className="font-mono text-[10px] font-black uppercase tracking-[.2em] text-[#F2A4C5]">Hermes Agent</p><h2 className="mt-5 max-w-3xl text-[clamp(2.4rem,5vw,4.8rem)] font-semibold leading-[.95] tracking-[-.055em]">{fr ? 'Passez de la découverte au travail réel.' : 'Move from discovery to real work.'}</h2><p className="mt-5 max-w-2xl text-sm leading-7 text-[#CFC6B8]">{fr ? 'Composez votre Collaborateur IA Unitalk, choisissez sa licence et sa capacité, puis obtenez immédiatement votre bon de commande.' : 'Build your Unitalk AI Collaborator, choose its license and capacity, then get your order form immediately.'}</p></div><Link href={orderHref} className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-[#D10E63] px-7 text-sm font-bold transition-colors hover:bg-[#B80C56]">{fr ? 'Commander ma première mission gratuitement' : 'Order my first mission for free'}<ArrowUpRight className="ml-2 size-4" /></Link></div></section>
  </main>
}
