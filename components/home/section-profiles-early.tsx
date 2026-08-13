import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { Kicker } from '@/components/home/section-kicker'
import type { Lang } from '@/lib/language-context'

const COPY = {
  fr: {
    kicker: 'Profils métier',
    title: 'Une identité. Les responsabilités dont votre entreprise a besoin.',
    lead: 'Alma vous aide à définir la mission et configure le bon Collaborateur IA. Elle mobilise ensuite le profil métier, les compétences, les applications et les validations utiles.',
    alma: 'Alma cadre et prépare.',
    collaborator: 'Le Collaborateur IA exécute.',
    profiles: ['Relation client', 'Commercial', 'Fidélisation'],
    proof: '3 responsabilités · 1 identité IA',
    cta: 'Explorer les profils métier',
  },
  en: {
    kicker: 'Job profiles',
    title: 'One identity. The responsibilities your company needs.',
    lead: 'Alma helps define the mission and configures the right AI Collaborator. She then brings together the useful job profile, skills, applications and approvals.',
    alma: 'Alma scopes and prepares.',
    collaborator: 'The AI Collaborator executes.',
    profiles: ['Customer relations', 'Sales', 'Customer success'],
    proof: '3 responsibilities · 1 AI identity',
    cta: 'Explore job profiles',
  },
} as const

export function SectionProfilesEarly({ lang }: { lang: Lang }) {
  const t = COPY[lang]
  return <section className="border-y border-[#DED6C8] bg-[#EAE3D4] py-14 sm:py-16"><div className="editorial-shell grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-20"><div><Kicker>{t.kicker}</Kicker><h2 className="mt-5 max-w-2xl text-balance font-sf text-[32px] font-semibold leading-[1.08] tracking-[-.035em] sm:text-[40px]">{t.title}</h2><p className="mt-5 max-w-2xl text-[16px] leading-7 text-[#4E483F]">{t.lead}</p><div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold"><span className="text-[#B00C54]">{t.alma}</span><span>{t.collaborator}</span></div><Link href="/collaborateurs-ia/profils-metier" className="group mt-7 inline-flex items-center gap-1.5 text-sm font-bold text-[#B00C54] underline-offset-4 hover:underline">{t.cta}<ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" /></Link></div><article className="rounded-[18px] border border-[#D8D0C2] bg-[#FAF8F3] p-6 sm:p-7"><p className="font-mono text-[10px] font-bold uppercase tracking-[.16em] text-[#857C6E]">Lucas · Collaborateur IA</p><div className="mt-5 space-y-3">{t.profiles.map(profile => <div key={profile} className="flex items-center gap-3 rounded-xl border border-[#DED6C8] bg-[#FFFDF9] px-4 py-3 text-sm font-semibold"><Check className="size-4 text-[#D10E63]" />{profile}</div>)}</div><p className="mt-5 text-sm font-semibold text-[#B00C54]">{t.proof}</p></article></div></section>
}
