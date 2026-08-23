import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Crédits IA prépayés et consommation | Unitalk',
  description: 'Comprenez comment les crédits Unitalk prépayés financent les modèles IA, les API externes, les médias et le téléphone.',
  alternates: { canonical: '/credits' },
  openGraph: {
    type: 'website', url: 'https://unitalk.ai/credits', title: 'Crédits IA prépayés et consommation | Unitalk',
    description: 'Crédits prépayés dès 25 €, avec un solde visible et une validation avant chaque recharge.',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
}

const uses = [
  ['Modèles IA', 'Texte, raisonnement, recherche, analyse multimodale et code.'],
  ['Création multimodale', 'Génération et édition d’images, vidéo, audio et transcription.'],
  ['API externes', 'Services tiers appelés pendant une mission.'],
  ['Téléphone', 'Minutes d’appels utilisées par vos Collaborateurs IA.'],
] as const

export default function CreditsPage() {
  return <div className="min-h-screen bg-[#F3EFE6] text-[#1C1A17]"><Navbar/><main><section className="border-b border-[#D8D0C2] px-5 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-36"><div className="editorial-shell"><p className="font-mono text-[10px] font-black uppercase tracking-[.2em] text-[#B00C54]">Crédits Unitalk</p><div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-end"><h1 className="max-w-4xl text-balance text-[clamp(3rem,6vw,6rem)] font-semibold leading-[.9] tracking-[-.07em]">Payez l’usage réel.<span className="block text-[#D10E63]">Gardez le contrôle.</span></h1><div><p className="max-w-xl text-[17px] leading-8 text-[#4E483F]">Rechargez des crédits à partir de 25 €. Le solde est débité uniquement lorsque votre équipe ou vos Collaborateurs IA utilisent un service facturé à l’usage.</p><Link href="/tarifs#configurateur" className="mt-7 inline-flex min-h-12 items-center rounded-full bg-[#181615] px-6 text-sm font-bold text-white">Configurer mon équipe<ArrowRight className="ml-2 size-4"/></Link></div></div></div></section><section className="px-5 py-16 sm:px-8 sm:py-24"><div className="editorial-shell"><div className="grid gap-4 md:grid-cols-3"><article className="rounded-[22px] border border-[#D8D0C2] bg-[#FAF8F3] p-7"><p className="font-mono text-[10px] font-black uppercase tracking-[.16em] text-[#B00C54]">Recharge minimale</p><p className="mt-6 text-4xl font-semibold tracking-[-.06em]">25 €</p><p className="mt-4 text-sm leading-7 text-[#625B50]">Un solde commun à votre entreprise, consommé uniquement à l’usage.</p></article><article className="rounded-[22px] border border-[#D8D0C2] bg-[#FAF8F3] p-7"><p className="font-mono text-[10px] font-black uppercase tracking-[.16em] text-[#B00C54]">Expiration</p><p className="mt-6 text-4xl font-semibold tracking-[-.06em]">Aucune</p><p className="mt-4 text-sm leading-7 text-[#625B50]">Les crédits inutilisés restent disponibles dans le solde de votre entreprise.</p></article><article className="rounded-[22px] border border-[#D8D0C2] bg-[#FAF8F3] p-7"><p className="font-mono text-[10px] font-black uppercase tracking-[.16em] text-[#B00C54]">Recharges</p><p className="mt-6 text-4xl font-semibold tracking-[-.06em]">Validées</p><p className="mt-4 text-sm leading-7 text-[#625B50]">Aucune recharge ni dépense au-delà du solde sans votre accord.</p></article></div><h2 className="mt-16 max-w-3xl text-[clamp(2.4rem,5vw,4.7rem)] font-semibold leading-[.94] tracking-[-.06em]">Un seul solde pour toute la consommation.</h2><div className="mt-9 grid gap-px overflow-hidden rounded-[22px] border border-[#CFC5B5] bg-[#CFC5B5] sm:grid-cols-2">{uses.map(([title, body]) => <article key={title} className="bg-[#FAF8F3] p-6"><Check className="size-5 text-[#D10E63]"/><h3 className="mt-5 text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-7 text-[#625B50]">{body}</p></article>)}</div></div></section></main><SiteFooter/></div>
}
