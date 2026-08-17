import Link from 'next/link'
import { ArrowRight, Home, Search } from 'lucide-react'
import { UnitalkLogo } from '@/components/unitalk-logo'

export default function NotFound() {
  return <main className="relative flex min-h-screen overflow-hidden bg-[#F3EFE6] text-[#1C1A17]">
    <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[.045] [background-image:linear-gradient(#1C1A17_1px,transparent_1px),linear-gradient(90deg,#1C1A17_1px,transparent_1px)] [background-size:72px_72px]"/>
    <div aria-hidden className="pointer-events-none absolute -right-32 -top-32 size-[34rem] rounded-full bg-[#D10E63]/10 blur-3xl"/>
    <div className="editorial-shell relative my-auto py-24">
      <Link href="/" className="inline-flex items-center gap-3 text-sm font-bold"><UnitalkLogo size={24}/><span>Unitalk</span></Link>
      <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_.72fr] lg:items-end">
        <div><p className="font-mono text-[11px] font-black uppercase tracking-[.2em] text-[#B00C54]">Erreur 404</p><h1 className="mt-6 max-w-5xl text-[clamp(3.6rem,8vw,8rem)] font-semibold leading-[.86] tracking-[-.078em]">Cette page<br/><span className="text-[#D10E63]">n’existe pas.</span></h1></div>
        <div className="lg:pb-3"><p className="max-w-xl text-[17px] leading-8 text-[#4E483F]">Le lien est peut-être ancien ou l’adresse incomplète. Retrouvez une mission, un Collaborateur IA ou revenez à l’accueil.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row"><Link href="/" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#181615] px-7 text-sm font-bold text-white"><Home className="size-4"/>Retour à l’accueil</Link><Link href="/missions" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#CFC5B5] bg-[#FAF8F3] px-7 text-sm font-bold"><Search className="size-4 text-[#D10E63]"/>Explorer les missions<ArrowRight className="size-4"/></Link></div></div>
      </div>
      <div className="mt-16 grid border-y border-[#CFC5B5] sm:grid-cols-3"><Link href="/collaborateurs-ia" className="group py-5 text-sm font-bold sm:border-r sm:px-6 sm:first:pl-0">Comprendre les Collaborateurs IA<ArrowRight className="ml-2 inline size-4 text-[#D10E63] transition-transform group-hover:translate-x-1"/></Link><Link href="/workspace" className="group py-5 text-sm font-bold sm:border-r sm:px-6">Découvrir le Workspace<ArrowRight className="ml-2 inline size-4 text-[#D10E63] transition-transform group-hover:translate-x-1"/></Link><Link href="/marketplace" className="group py-5 text-sm font-bold sm:px-6">Explorer la Marketplace<ArrowRight className="ml-2 inline size-4 text-[#D10E63] transition-transform group-hover:translate-x-1"/></Link></div>
    </div>
  </main>
}
