import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Crédits IA, BYOK et consommation | Unitalk',
  description: 'Comprenez comment les crédits Unitalk financent les modèles IA, les API externes et les minutes de téléphone, ou utilisez vos propres clés API.',
  alternates: { canonical: '/credits' },
  openGraph: {
    type: 'website',
    url: 'https://unitalk.ai/credits',
    title: 'Crédits IA, BYOK et consommation | Unitalk',
    description: 'Crédits prépayés dès 25 €, BYOK ou mode hybride, avec validation avant chaque dépense.',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
}

const uses = [
  ['Modèles IA', 'Texte, raisonnement, recherche et code.'],
  ['Création multimodale', 'Génération et édition d’images, vidéo, audio et transcription.'],
  ['API externes', 'Services tiers appelés pendant une mission.'],
  ['Téléphone', 'Minutes supplémentaires au-delà de celles incluses avec le Collaborateur IA.'],
] as const

export default function CreditsPage() {
  return <div className="min-h-screen bg-[#F3EFE6] text-[#1C1A17]"><Navbar/><main><section className="border-b border-[#D8D0C2] px-5 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-36"><div className="editorial-shell"><p className="font-mono text-[10px] font-black uppercase tracking-[.2em] text-[#B00C54]">Crédits Unitalk</p><div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-end"><h1 className="max-w-4xl text-balance text-[clamp(3rem,6vw,6rem)] font-semibold leading-[.9] tracking-[-.07em]">Payez l’usage réel.<span className="block text-[#D10E63]">Gardez le contrôle.</span></h1><div><p className="max-w-xl text-[17px] leading-8 text-[#4E483F]">Rechargez des crédits à partir de 25 €, utilisez vos propres clés API ou combinez les deux. Aucune dépense n’est engagée sans votre accord.</p><Link href="/tarifs" className="mt-7 inline-flex min-h-12 items-center rounded-full bg-[#181615] px-6 text-sm font-bold text-white">Retour aux tarifs<ArrowRight className="ml-2 size-4"/></Link></div></div></div></section><section className="px-5 py-16 sm:px-8 sm:py-24"><div className="editorial-shell"><div className="grid gap-4 md:grid-cols-3"><article className="rounded-[22px] border border-[#D8D0C2] bg-[#FAF8F3] p-7"><p className="font-mono text-[10px] font-black uppercase tracking-[.16em] text-[#B00C54]">Crédits prépayés</p><p className="mt-6 text-4xl font-semibold tracking-[-.06em]">Dès 25 €</p><p className="mt-4 text-sm leading-7 text-[#625B50]">Un solde commun à votre entreprise, consommé uniquement à l’usage.</p></article><article className="rounded-[22px] border border-[#D8D0C2] bg-[#FAF8F3] p-7"><p className="font-mono text-[10px] font-black uppercase tracking-[.16em] text-[#B00C54]">BYOK</p><p className="mt-6 text-4xl font-semibold tracking-[-.06em]">0 €</p><p className="mt-4 text-sm leading-7 text-[#625B50]">Connectez vos clés API. Vos fournisseurs vous facturent directement.</p></article><article className="rounded-[22px] border border-[#D8D0C2] bg-[#FAF8F3] p-7"><p className="font-mono text-[10px] font-black uppercase tracking-[.16em] text-[#B00C54]">Hybride</p><p className="mt-6 text-4xl font-semibold tracking-[-.06em]">À la carte</p><p className="mt-4 text-sm leading-7 text-[#625B50]">Utilisez vos clés lorsqu’elles sont disponibles et les crédits Unitalk pour le reste.</p></article></div><div className="mt-16 grid gap-8 lg:grid-cols-[.75fr_1.25fr]"><div><p className="font-mono text-[10px] font-black uppercase tracking-[.2em] text-[#B00C54]">Ce que financent les crédits</p><h2 className="mt-5 text-[clamp(2.4rem,4.5vw,4.5rem)] font-semibold leading-[.94] tracking-[-.06em]">Un seul solde pour les services consommés.</h2></div><ul className="overflow-hidden rounded-[22px] border border-[#D8D0C2] bg-[#FAF8F3]">{uses.map(([title, body], index) => <li key={title} className={`grid gap-2 p-6 sm:grid-cols-[.65fr_1.35fr] ${index > 0 ? 'border-t border-[#DED6C8]' : ''}`}><p className="flex items-center gap-2 text-sm font-bold"><Check className="size-4 shrink-0 text-[#D10E63]"/>{title}</p><p className="text-sm leading-6 text-[#625B50]">{body}</p></li>)}</ul></div><p className="mt-10 max-w-3xl border-l-2 border-[#D10E63] pl-5 text-sm leading-7 text-[#4E483F]">Le coût dépend du modèle et du service choisis. Unitalk affiche le coût estimé avant une opération payante et permet à l’entreprise de définir ses budgets et autorisations.</p></div></section></main><SiteFooter/></div>
}
