'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Blocks,
  BookOpenCheck,
  BrainCircuit,
  BriefcaseBusiness,
  GraduationCap,
  Handshake,
  LibraryBig,
  Search,
  Sparkles,
  UserRound,
  type LucideIcon,
} from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { Kicker } from '@/components/home/section-kicker'
import { UnitalkLogo } from '@/components/unitalk-logo'

type Lang = 'fr' | 'en'
type Bi = { fr: string; en: string }
type Category = {
  id: string
  title: Bi
  description: Bi
  href: string
  icon: LucideIcon
}

const GROUPS: { title: Bi; description: Bi; categories: Category[] }[] = [
  {
    title: { fr: 'Trouver un Collaborateur', en: 'Find an AI Collaborator' },
    description: {
      fr: 'Partez d’une identité, d’un travail à accomplir ou d’un métier de la connaissance.',
      en: 'Start with an identity, a job to be done or a knowledge-work profession.',
    },
    categories: [
      {
        id: 'collaborateurs-ia',
        title: { fr: 'Collaborateurs IA', en: 'AI Collaborators' },
        description: {
          fr: 'Des identités professionnelles complètes, prêtes à rejoindre votre organisation.',
          en: 'Complete professional identities ready to join your organization.',
        },
        href: '/collaborateurs-ia',
        icon: UserRound,
      },
      {
        id: 'missions',
        title: { fr: 'Missions', en: 'Missions' },
        description: {
          fr: 'Le travail concret à confier, avec son résultat attendu et ses validations.',
          en: 'Concrete work to delegate, with its expected result and approvals.',
        },
        href: '/missions',
        icon: BookOpenCheck,
      },
      {
        id: 'metiers',
        title: { fr: 'Métiers', en: 'Professions' },
        description: {
          fr: 'Un profil métier de référence pour chaque métier de la connaissance.',
          en: 'One reference job profile for every knowledge-work profession.',
        },
        href: '/collaborateurs-ia/profils-metier',
        icon: BriefcaseBusiness,
      },
    ],
  },
  {
    title: { fr: 'Enrichir ses capacités', en: 'Expand capabilities' },
    description: {
      fr: 'Ajoutez les méthodes, le contexte et les outils nécessaires à son travail.',
      en: 'Add the methods, context and tools required for the work.',
    },
    categories: [
      {
        id: 'competences',
        title: { fr: 'Compétences', en: 'Skills' },
        description: {
          fr: 'Des savoir-faire précis, testés, versionnés et réutilisables.',
          en: 'Precise, tested, versioned and reusable know-how.',
        },
        href: '/collaborateurs-ia/competences',
        icon: Sparkles,
      },
      {
        id: 'connaissances',
        title: { fr: 'Connaissances', en: 'Knowledge' },
        description: {
          fr: 'Corpus, référentiels et procédures qu’un Collaborateur IA peut consulter.',
          en: 'Corpora, reference materials and procedures an AI Collaborator can consult.',
        },
        href: '/architecture#connaissance-entreprise',
        icon: LibraryBig,
      },
      {
        id: 'memoire-contexte',
        title: { fr: 'Mémoire et contexte', en: 'Memory and context' },
        description: {
          fr: 'Structures de mémoire, règles de conservation et contexte gouverné.',
          en: 'Memory structures, retention rules and governed context.',
        },
        href: '/architecture#memoire-et-contexte',
        icon: BrainCircuit,
      },
      {
        id: 'applications',
        title: { fr: 'Applications', en: 'Applications' },
        description: {
          fr: 'Les outils, connecteurs et applications métier autorisés.',
          en: 'Approved tools, connectors and business applications.',
        },
        href: '/collaborateurs-ia/applications',
        icon: Blocks,
      },
      {
        id: 'modeles-ia',
        title: { fr: 'Modèles IA', en: 'AI models' },
        description: {
          fr: 'Les moteurs autorisés pour raisonner, analyser, produire et agir.',
          en: 'Approved engines for reasoning, analysis, creation and action.',
        },
        href: '/modeles-ia',
        icon: BrainCircuit,
      },
    ],
  },
  {
    title: { fr: 'Se faire accompagner', en: 'Get support' },
    description: {
      fr: 'Apprenez à adopter les Collaborateurs IA ou faites-vous accompagner par un expert.',
      en: 'Learn to adopt AI Collaborators or get support from an expert.',
    },
    categories: [
      {
        id: 'formations',
        title: { fr: 'Formations', en: 'Training' },
        description: {
          fr: 'Des parcours pour utiliser, créer et gouverner les Collaborateurs IA.',
          en: 'Learning paths to use, create and govern AI Collaborators.',
        },
        href: '/academy',
        icon: GraduationCap,
      },
      {
        id: 'services',
        title: { fr: 'Services', en: 'Services' },
        description: {
          fr: 'Cadrage, intégration, création, migration et expertise spécialisée.',
          en: 'Scoping, integration, creation, migration and specialist expertise.',
        },
        href: '/experts',
        icon: Handshake,
      },
    ],
  },
]

const COPY = {
  fr: {
    kicker: 'Marketplace IA',
    title: 'La place de marché des Collaborateurs IA.',
    lead: 'Trouvez un Collaborateur IA, enrichissez ses capacités ou publiez vos créations. Une Marketplace ouverte à Unitalk et à la communauté.',
    placeholder: 'Ex. Je veux qualifier mes prospects et mettre à jour mon CRM…',
    ask: 'Demander à Alma',
    explore: 'Explorer les catégories',
    almaKicker: 'Votre guide dans la Marketplace',
    almaTitle: 'Décrivez le travail. Alma trouve la bonne combinaison.',
    almaBody: 'Alma part de votre besoin, identifie le métier et les compétences utiles, puis recommande les connaissances, la mémoire, les applications et les modèles adaptés.',
    almaCta: 'Parler à Alma',
    categoriesKicker: 'Accès directs',
    categoriesTitle: 'Dix catégories. Un même Collaborateur IA.',
    categoriesLead: 'Chaque raccourci ouvre son catalogue ou sa page de référence. Le symbole Unitalk identifie l’univers Marketplace ; Alma conserve son propre avatar.',
    unitalkOrigin: 'Univers Unitalk',
    contribute: 'Ouvrir la Marketplace à votre savoir-faire.',
    contributeBody: 'Formalisez une méthode, un métier, une connaissance, un outil, une formation ou un service, puis proposez-le à la communauté.',
    contributeCta: 'Devenir Co-créateur IA',
  },
  en: {
    kicker: 'AI Marketplace',
    title: 'The marketplace for AI Collaborators.',
    lead: 'Find an AI Collaborator, expand its capabilities or publish your creations. A Marketplace open to Unitalk and the community.',
    placeholder: 'E.g. I want to qualify prospects and update my CRM…',
    ask: 'Ask Alma',
    explore: 'Browse categories',
    almaKicker: 'Your Marketplace guide',
    almaTitle: 'Describe the work. Alma finds the right combination.',
    almaBody: 'Alma starts with your need, identifies the right profession and skills, then recommends suitable knowledge, memory, applications and models.',
    almaCta: 'Talk to Alma',
    categoriesKicker: 'Direct access',
    categoriesTitle: 'Ten categories. One AI Collaborator.',
    categoriesLead: 'Each shortcut opens its catalog or reference page. The Unitalk symbol identifies the Marketplace universe; Alma keeps her own avatar.',
    unitalkOrigin: 'Unitalk universe',
    contribute: 'Open the Marketplace to your expertise.',
    contributeBody: 'Formalize a method, profession, knowledge base, tool, course or service, then offer it to the community.',
    contributeCta: 'Become an AI Co-creator',
  },
} as const

export function UnitalkStoreHub() {
  const { lang } = useLanguage()
  const t = COPY[lang]

  return (
    <main className="bg-[#F3EFE6] font-sf text-[#1C1A17]">
      <section className="relative overflow-hidden px-5 pb-16 pt-28 sm:px-8 sm:pb-20">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[.04] [background-image:linear-gradient(#1C1A17_1px,transparent_1px),linear-gradient(90deg,#1C1A17_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="editorial-shell relative text-center">
          <Kicker>{t.kicker}</Kicker>
          <h1 className="hero-heading mx-auto mt-5 max-w-5xl [font-size:clamp(2.6rem,6vw,5.2rem)]">{t.title}</h1>
          <p className="mx-auto mt-6 max-w-3xl text-[17px] leading-8 text-[#4E483F]">{t.lead}</p>
          <form action="/decouvrir" className="mx-auto mt-9 flex max-w-3xl flex-col gap-3 rounded-3xl border border-[#D8D0C2] bg-[#FAF8F3] p-3 shadow-[0_25px_60px_-40px_rgba(28,26,23,.4)] sm:flex-row">
            <label className="relative min-w-0 flex-1">
              <span className="sr-only">{t.placeholder}</span>
              <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#857C6E]" />
              <input name="q" placeholder={t.placeholder} className="h-12 w-full bg-transparent pl-11 pr-4 text-sm outline-none" />
            </label>
            <input type="hidden" name="source" value="marketplace-ia" />
            <button className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#D10E63] px-6 text-sm font-bold text-white">{t.ask}<ArrowRight className="ml-2 size-4" /></button>
          </form>
          <a href="#categories" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#B00C54]">{t.explore}<ArrowRight className="size-4 rotate-90" /></a>
        </div>
      </section>

      <section className="border-y border-[#D8D0C2] bg-[#EAE3D4] px-5 py-14 sm:px-8 sm:py-16">
        <div className="editorial-shell grid gap-8 lg:grid-cols-[auto_1fr_auto] lg:items-center">
          <Image src="/alma-avatar.png" alt="Alma" width={80} height={80} className="size-20 rounded-full object-cover ring-2 ring-[#D10E63]/25" />
          <div>
            <p className="font-mono text-[10px] font-black uppercase tracking-[.16em] text-[#B00C54]">{t.almaKicker}</p>
            <h2 className="mt-3 text-[30px] font-semibold leading-[1.06] tracking-[-.04em] sm:text-[38px]">{t.almaTitle}</h2>
            <p className="mt-4 max-w-3xl text-[15px] leading-7 text-[#4E483F]">{t.almaBody}</p>
          </div>
          <Link href="/unitalk/@alma" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#D10E63] px-6 text-sm font-bold text-white">{t.almaCta}<ArrowRight className="ml-2 size-4" /></Link>
        </div>
      </section>

      <section id="categories" className="scroll-mt-24 px-5 py-16 sm:px-8 sm:py-20">
        <div className="editorial-shell">
          <Kicker>{t.categoriesKicker}</Kicker>
          <h2 className="mt-5 text-[34px] font-semibold tracking-[-.04em] sm:text-[44px]">{t.categoriesTitle}</h2>
          <p className="mt-4 max-w-3xl text-[16px] leading-7 text-[#4E483F]">{t.categoriesLead}</p>
          <div className="mt-12 space-y-14">
            {GROUPS.map((group, groupIndex) => (
              <section key={group.title.fr} aria-labelledby={`marketplace-group-${groupIndex}`}>
                <div className="grid gap-2 border-b border-[#CFC5B5] pb-5 md:grid-cols-[1fr_1.2fr] md:items-end">
                  <h3 id={`marketplace-group-${groupIndex}`} className="text-[26px] font-semibold tracking-[-.035em]">{group.title[lang]}</h3>
                  <p className="text-sm leading-6 text-[#625B50]">{group.description[lang]}</p>
                </div>
                <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {group.categories.map((category) => <CategoryCard key={category.id} category={category} lang={lang} originLabel={t.unitalkOrigin} />)}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#181615] px-5 py-16 text-[#FAF8F3] sm:px-8 sm:py-20">
        <div className="editorial-shell grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Kicker dark>{lang === 'fr' ? 'Communauté' : 'Community'}</Kicker>
            <h2 className="mt-5 max-w-4xl text-[34px] font-semibold leading-[1.06] tracking-[-.04em] sm:text-[44px]">{t.contribute}</h2>
            <p className="mt-5 max-w-3xl text-[16px] leading-8 text-[#CFC6B8]">{t.contributeBody}</p>
          </div>
          <Link href="/co-createur-ia" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#D10E63] px-6 text-sm font-bold">{t.contributeCta}<ArrowRight className="ml-2 size-4" /></Link>
        </div>
      </section>
    </main>
  )
}

function CategoryCard({ category, lang, originLabel }: { category: Category; lang: Lang; originLabel: string }) {
  const Icon = category.icon
  return (
    <Link id={category.id} href={category.href} className="group relative flex min-h-[230px] scroll-mt-28 flex-col overflow-hidden rounded-3xl border border-[#D8D0C2] bg-[#FAF8F3] p-6 outline-none transition hover:-translate-y-1 hover:border-[#D10E63]/35 focus-visible:ring-2 focus-visible:ring-[#D10E63]">
      <div className="flex items-start justify-between">
        <span className="flex size-11 items-center justify-center rounded-2xl bg-[#EEE8DD] text-[#B00C54]"><Icon className="size-5" strokeWidth={1.7} /></span>
        <span className="flex items-center gap-2 font-mono text-[8px] font-black uppercase tracking-[.14em] text-[#857C6E]"><UnitalkLogo size={22} activeSegment={0} inactiveColor="#C9BFB0" />{originLabel}</span>
      </div>
      <h4 className="mt-8 text-2xl font-bold tracking-[-.025em]">{category.title[lang]}</h4>
      <p className="mt-3 text-sm leading-7 text-[#625B50]">{category.description[lang]}</p>
      <ArrowRight className="mt-auto size-5 pt-6 box-content text-[#D10E63] transition-transform group-hover:translate-x-1" />
    </Link>
  )
}
