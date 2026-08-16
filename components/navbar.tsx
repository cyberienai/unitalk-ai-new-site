'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  Blocks,
  BriefcaseBusiness,
  ChevronDown,
  GraduationCap,
  Monitor,
  Sparkles,
  UsersRound,
  type LucideIcon,
} from 'lucide-react'
import { UnitalkLogo } from './unitalk-logo'
import { useLanguage } from '@/lib/language-context'
import { AnonymousOnly, UserMenuDesktop, UserMenuMobile } from './auth/user-menu'
import { useAlma } from '@/lib/alma-context'
import { AlmaInline } from '@/components/alma-inline'

type Lang = 'fr' | 'en'
type Bi = { fr: string; en: string }

const ALMA_CTA = {
  href: '/decouvrir?source=nav',
  label: { fr: 'Commencez gratuitement', en: 'Start free' } as Bi,
}

const ACADEMY_URL = '/academy'

// Collaborateurs IA dropdown — the product hub, in three sections:
// Product-focused Collaborateurs IA menu: concept, profiles, skills,
// applications and Alma. Experts remain available in the footer.
type MenuEntry = { title: Bi; desc: Bi; href: string; avatar?: string; icon: LucideIcon }
type MenuAction = { title: Bi; href: string }

const COLLAB_FEATURED: MenuEntry = {
  title: { fr: 'Comprendre le Collaborateur IA', en: 'Understand the AI Collaborator' },
  desc: {
    fr: 'Identité, Agent Hermes, profils, compétences, outils et contrôle humain.',
    en: 'Identity, Hermes Agent, profiles, skills, tools and human control.',
  },
  href: '/collaborateurs-ia',
  icon: Sparkles,
}

const COLLAB_DISCOVER: MenuEntry[] = [
  {
    title: { fr: 'Qu’est-ce qu’un Collaborateur IA ?', en: 'What is an AI Collaborator?' },
    desc: {
      fr: 'Une identité professionnelle, un environnement privé et une expérience qui progresse avec votre entreprise.',
      en: 'A professional identity, a private environment and experience that grows with your company.',
    },
    href: '/collaborateurs-ia',
    icon: UsersRound,
  },
  {
    title: { fr: 'Profils métier', en: 'Job profiles' },
    desc: {
      fr: 'Les responsabilités durables qu’il peut exercer.',
      en: 'The lasting responsibilities it can perform.',
    },
    href: '/collaborateurs-ia/profils-metier',
    icon: BriefcaseBusiness,
  },
  {
    title: { fr: 'Compétences', en: 'Skills' },
    desc: {
      fr: 'Les savoir-faire qu’il peut appliquer, améliorer et partager.',
      en: 'The know-how it can apply, improve and share.',
    },
    href: '/collaborateurs-ia/competences',
    icon: Sparkles,
  },
  {
    title: { fr: 'Unitalk Store', en: 'Unitalk Store' },
    desc: {
      fr: 'Profils, compétences, applications, modèles et formations, avec Alma.',
      en: 'Profiles, skills, applications, models and training, with Alma.',
    },
    href: '/collaborateurs-ia/applications',
    icon: Blocks,
  },
  {
    title: { fr: 'Unitalk Desktop', en: 'Unitalk Desktop' },
    desc: {
      fr: 'Le poste de travail local de votre équipe humain-IA.',
      en: 'The local workstation for your human-AI team.',
    },
    href: '/desktop',
    icon: Monitor,
  },
]

const COLLAB_ACCOMPANIMENT: MenuEntry[] = [
  {
    title: { fr: 'Alma · Coordinatrice de missions IA', en: 'Alma · AI mission coordinator' },
    desc: {
      fr: 'Cadrez une première mission et préparez votre Collaborateur IA.',
      en: 'Frame a first mission and prepare your AI Collaborator.',
    },
    href: '/unitalk/@alma',
    avatar: '/alma-avatar.png',
    icon: Sparkles,
  },
  {
    title: { fr: 'Devenir Co-créateur IA', en: 'Become an AI Co-creator' },
    desc: {
      fr: 'Apprenez à créer, publier et monétiser des profils, compétences et missions.',
      en: 'Learn to create, publish and monetize profiles, skills and missions.',
    },
    href: '/co-createur-ia',
    icon: GraduationCap,
  },
  {
    title: { fr: 'Experts humains', en: 'Human experts' },
    desc: {
      fr: 'Concevez, intégrez ou faites évoluer vos Collaborateurs IA avec un spécialiste.',
      en: 'Design, integrate or advance your AI Collaborators with a specialist.',
    },
    href: '/experts',
    icon: BriefcaseBusiness,
  },
]

const COLLAB_ACTIONS: MenuAction[] = [
  { title: { fr: 'Pourquoi Unitalk ?', en: 'Why Unitalk?' }, href: '/collaborateurs-ia/pourquoi-unitalk' },
]

const T = {
  fr: {
    home: 'Accueil Unitalk AI',
    signIn: 'Connexion',
    pricing: 'Tarifs',
    workspace: 'Workspace',
    missions: 'Missions',
    collaborators: 'Collaborateurs IA',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    collabMenu: 'Menu Collaborateurs IA',
    // Collaborateurs IA panel — two-column mega menu
    menuDiscover: 'Équiper',
    menuAccompaniment: 'Créer & accompagner',
    menuFeatured: 'Commencer ici',
    menuResources: 'Ressources',
    menuStore: 'Ouvrir le Unitalk Store',
    menuAcademy: 'Explorer Unitalk Academy',
  },
  en: {
    home: 'Unitalk AI Home',
    signIn: 'Sign in',
    pricing: 'Pricing',
    workspace: 'Workspace',
    missions: 'Missions',
    collaborators: 'AI Collaborators',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    collabMenu: 'AI Collaborators menu',
    menuDiscover: 'Equip',
    menuAccompaniment: 'Create & support',
    menuFeatured: 'Start here',
    menuResources: 'Resources',
    menuStore: 'Open the Unitalk Store',
    menuAcademy: 'Explore Unitalk Academy',
  },
}

function FrenchFlag() {
  return (
    <span aria-hidden="true" className="inline-flex overflow-hidden rounded-sm border border-[#DcD4C4]">
      <span className="h-4 w-[6px] bg-[#0055A4]" />
      <span className="h-4 w-[6px] bg-white" />
      <span className="h-4 w-[6px] bg-[#EF4135]" />
    </span>
  )
}

function UkFlag() {
  return (
    <span aria-hidden="true" className="inline-block h-4 w-[18px] overflow-hidden rounded-sm border border-[#DcD4C4]">
      <svg viewBox="0 0 60 30" className="h-full w-full">
        <clipPath id="uk-clip">
          <rect width="60" height="30" />
        </clipPath>
        <g clipPath="url(#uk-clip)">
          <rect width="60" height="30" fill="#012169" />
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" clipPath="url(#uk-clip)" />
          <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10" />
          <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
        </g>
      </svg>
    </span>
  )
}

function CollabMenuLink({ entry, lang, onSelect }: { entry: MenuEntry; lang: Lang; onSelect: () => void }) {
  const Icon = entry.icon
  return (
    <a
      href={entry.href}
      role="menuitem"
      onClick={onSelect}
      className="group flex min-h-[92px] w-full gap-3 rounded-2xl border border-transparent p-3.5 outline-none transition-[background-color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-[#DED6C8] hover:bg-[#FFFDF9] focus-visible:border-[#D10E63] focus-visible:bg-[#FFFDF9] focus-visible:ring-2 focus-visible:ring-[#D10E63]/30"
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#EEE8DD] text-[#6F6558] transition-colors group-hover:bg-[#F9DFE9] group-hover:text-[#B00C54]">
        <Icon aria-hidden="true" className="size-[17px]" strokeWidth={1.8} />
      </span>
      <span className="min-w-0">
        <span className="block text-[14px] font-semibold leading-tight text-[#1C1A17] transition-colors group-hover:text-[#B00C54]">{entry.title[lang]}</span>
        <span className="mt-1.5 block text-[12px] leading-[1.55] text-[#6B6256]">{entry.desc[lang]}</span>
      </span>
    </a>
  )
}

function AccompanimentMenuLink({ entry, lang, onSelect }: { entry: MenuEntry; lang: Lang; onSelect: () => void }) {
  const Icon = entry.icon
  return (
    <a href={entry.href} role="menuitem" onClick={onSelect} className="group flex min-h-[78px] w-full items-center gap-3 rounded-2xl px-3.5 py-3 outline-none transition-colors hover:bg-[#ECE5D9] focus-visible:bg-[#ECE5D9] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#D10E63]/40">
      {entry.avatar ? <img src={entry.avatar} alt="" aria-hidden="true" className="size-9 shrink-0 rounded-xl object-cover ring-1 ring-[#D8CFC1]" /> : <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#E5DDD0] text-[#6F6558]"><Icon aria-hidden="true" className="size-[17px]" strokeWidth={1.8} /></span>}
      <span className="min-w-0 flex-1"><span className="block text-[14px] font-semibold leading-tight text-[#1C1A17] transition-colors group-hover:text-[#B00C54]">{entry.title[lang]}</span><span className="mt-1 block line-clamp-2 text-[12px] leading-[1.5] text-[#6B6256]">{entry.desc[lang]}</span></span>
      <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 text-[#B00C54] opacity-0 transition-[transform,opacity] group-hover:translate-x-0.5 group-hover:opacity-100 group-focus-visible:opacity-100" />
    </a>
  )
}

function MobileCollabLink({ entry, lang, onSelect }: { entry: MenuEntry; lang: Lang; onSelect: () => void }) {
  const Icon = entry.icon
  return (
    <a href={entry.href} onClick={onSelect} className="group flex min-h-14 items-center gap-3 rounded-xl px-2.5 py-2 outline-none transition-colors hover:bg-[#EAE3D7] focus-visible:bg-[#EAE3D7] focus-visible:ring-2 focus-visible:ring-[#D10E63]/30">
      {entry.avatar ? <img src={entry.avatar} alt="" aria-hidden="true" className="size-8 rounded-lg object-cover" /> : <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#E7DFD2] text-[#6F6558]"><Icon aria-hidden="true" className="size-4" strokeWidth={1.8} /></span>}
      <span className="min-w-0"><span className="block text-[13.5px] font-semibold leading-tight text-[#292620] transition-colors group-hover:text-[#B00C54]">{entry.title[lang]}</span><span className="mt-1 block line-clamp-1 text-[11.5px] text-[#766D61]">{entry.desc[lang]}</span></span>
    </a>
  )
}

/** Desktop primary nav link with hover/focus/active states.
 *  `overDark` = transparent navbar sitting over a dark hero → light-on-dark colors. */
function NavItem({
  href,
  active,
  overDark,
  onClick,
  children,
}: {
  href: string
  active: boolean
  overDark: boolean
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
  children: React.ReactNode
}) {
  const color = active
    ? overDark
      ? 'text-[#F5679D]'
      : 'text-[#D10E63]'
    : overDark
      ? 'text-[#D7D0C4] hover:text-[#FBF9F3]'
      : 'text-[#857C6E] hover:text-[#1C1A17]'
  return (
    <a
      href={href}
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={`relative rounded-md px-3 py-2 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#D10E63]/40 ${color}`}
    >
      {children}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-3 -bottom-0.5 h-px rounded-full transition-opacity duration-200 ${
          overDark ? 'bg-[#F5679D]' : 'bg-[#D10E63]'
        } ${active ? 'opacity-100' : 'opacity-0'}`}
      />
    </a>
  )
}

export function Navbar(
  { darkHero = false }: { ctaLabel?: Bi; ctaShortLabel?: Bi; darkHero?: boolean } = {},
) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [collabOpen, setCollabOpen] = useState(false)
  const [mobileCollabOpen, setMobileCollabOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const collabRef = useRef<HTMLDivElement | null>(null)
  const collabButtonRef = useRef<HTMLButtonElement | null>(null)
  // Hover intent: small close delay so moving from trigger to panel doesn't flicker.
  const collabHoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const openCollabHover = () => {
    if (collabHoverTimeout.current) clearTimeout(collabHoverTimeout.current)
    setCollabOpen(true)
  }
  const closeCollabHover = () => {
    if (collabHoverTimeout.current) clearTimeout(collabHoverTimeout.current)
    collabHoverTimeout.current = setTimeout(() => setCollabOpen(false), 120)
  }
  const { lang, setLang } = useLanguage()
  const { setLauncherSuppressed } = useAlma()
  const t = T[lang]
  const pathname = usePathname() || '/'

  // The header is transparent only until the page scrolls or a panel opens.
  // While transparent over a dark hero, switch to light-on-dark link colors
  // so labels and hover states stay legible.
  const overDark = darkHero && !scrolled && !isMenuOpen && !collabOpen

  // Active-state resolution
  // Collaborateurs IA owns the product hub: the presentation page and the three
  // capability catalogs (profils métier, compétences, applications) plus details.
  const isCollabActive = pathname === '/collaborateurs-ia' || pathname.startsWith('/collaborateurs-ia/')
  const isMissionsActive = pathname === '/missions' || pathname.startsWith('/missions/')
  // Experts: the human pillar — accompaniment around the Collaborateurs IA.
  const isWorkspaceActive = pathname === '/workspace' || pathname.startsWith('/workspace/')
  const isPricingActive = pathname === '/tarifs'

  function handleMissionsClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (pathname !== '/missions' || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })
  }

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    const isMobile = window.innerWidth < 1024
    if (isMobile) document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  useEffect(() => {
    setLauncherSuppressed(collabOpen)
    return () => setLauncherSuppressed(false)
  }, [collabOpen, setLauncherSuppressed])

  // Subtle bottom border once the page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Collaborateurs IA dropdown: close on outside click
  useEffect(() => {
    if (!collabOpen) return
    const onDown = (e: MouseEvent) => {
      if (collabRef.current && !collabRef.current.contains(e.target as Node)) setCollabOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [collabOpen])

  // Collaborateurs IA dropdown: close on Escape and return focus to the button
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && collabOpen) {
        setCollabOpen(false)
        collabButtonRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [collabOpen])

  // Clear any pending hover-close timer on unmount
  useEffect(() => () => {
    if (collabHoverTimeout.current) clearTimeout(collabHoverTimeout.current)
  }, [])

  const toggleLang = () => setLang(lang === 'fr' ? 'en' : 'fr')

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,backdrop-filter,border-color] duration-300 ${
          scrolled || isMenuOpen || collabOpen
            ? 'border-[#1C1A17]/[0.08] bg-[#F3EFE6]/96 backdrop-blur-[16px]'
            : 'border-transparent bg-transparent backdrop-blur-0'
        }`}
      >
        <nav className={`editorial-shell flex items-center justify-between ${isMissionsActive ? 'h-[64px]' : 'h-[76px]'}`}>
          {/* Group 1 — Identity + Group 2 — Navigation */}
          <div className="flex items-center gap-8 xl:gap-10">
            <a href="/" aria-label={t.home} className="flex items-center gap-2 sm:gap-3">
              <UnitalkLogo size={24} />
              <span
                className={`font-inter text-sm font-semibold transition-colors sm:text-base ${
                  overDark ? 'text-[#FBF9F3]' : 'text-[#1C1A17]'
                }`}
              >
                Unitalk
              </span>
            </a>

            <div className="hidden items-center gap-1 lg:flex">
              {/* Missions — the entry point: start from the need to accomplish */}
              <NavItem href="/missions" active={isMissionsActive} overDark={overDark} onClick={handleMissionsClick}>
                {t.missions}
              </NavItem>

              {/* Collaborateurs IA — product hub dropdown (who takes the work on) */}
              <div
                ref={collabRef}
                className="relative"
                onMouseEnter={openCollabHover}
                onMouseLeave={closeCollabHover}
              >
                <button
                  ref={collabButtonRef}
                  type="button"
                  id="collab-trigger"
                  onClick={() => setCollabOpen((v) => !v)}
                  aria-expanded={collabOpen}
                  aria-haspopup="true"
                  aria-controls="collab-menu"
                  aria-current={isCollabActive ? 'page' : undefined}
                  className={`relative inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#D10E63]/40 ${
                    isCollabActive || collabOpen
                      ? overDark
                        ? 'text-[#F5679D]'
                        : 'text-[#D10E63]'
                      : overDark
                        ? 'text-[#D7D0C4] hover:text-[#FBF9F3]'
                        : 'text-[#857C6E] hover:text-[#1C1A17]'
                  }`}
                >
                  {t.collaborators}
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${collabOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-x-3 -bottom-0.5 h-px rounded-full transition-opacity duration-200 ${
                      overDark ? 'bg-[#F5679D]' : 'bg-[#D10E63]'
                    } ${isCollabActive ? 'opacity-100' : 'opacity-0'}`}
                  />
                </button>

                <AnimatePresence>
                  {collabOpen && (
                    <motion.div
                      id="collab-menu"
                      role="menu"
                      aria-labelledby="collab-trigger"
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                      style={{ transformOrigin: 'top left' }}
                      className="absolute -left-[180px] top-full w-[1040px] max-w-[calc(100vw-2rem)] pt-3"
                    >
                      <div className="overflow-hidden rounded-[28px] border border-[#D8D0C2] bg-[#F8F5EE] shadow-[0_36px_90px_-24px_rgba(28,26,23,0.42)] ring-1 ring-white/70">
                        <div className="grid grid-cols-[280px_1fr_310px]">
                          <div className="relative isolate overflow-hidden bg-[#171514] p-7 text-[#FAF8F3]">
                            <div aria-hidden="true" className="absolute -right-20 -top-20 -z-10 size-64 rounded-full bg-[#D10E63]/20 blur-3xl" />
                            <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[.18em] text-[#F2A4C5]"><span className="size-1.5 rounded-full bg-[#F2A4C5]" />{t.menuFeatured}</div>
                            <div className="mt-9 h-px w-12 bg-[#F2A4C5]" />
                            <h2 className="mt-6 text-[30px] font-semibold leading-[1.02] tracking-[-.05em]">{COLLAB_FEATURED.title[lang]}</h2>
                            <p className="mt-4 text-[13px] leading-6 text-[#CFC6B8]">{COLLAB_FEATURED.desc[lang]}</p>
                            <a href={COLLAB_FEATURED.href} onClick={() => setCollabOpen(false)} className="group mt-6 inline-flex items-center gap-2 rounded-full bg-[#F2A4C5] px-4 py-2.5 text-xs font-bold text-[#24151B] outline-none transition-colors hover:bg-white focus-visible:ring-2 focus-visible:ring-white">{lang === 'fr' ? 'Découvrir le produit' : 'Discover the product'}<ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" /></a>
                            <div className="mt-7 border-t border-white/10 pt-5"><p className="text-[11px] font-bold uppercase tracking-[.12em] text-white">{lang === 'fr' ? 'Votre équipe humain-IA' : 'Your human-AI team'}</p><p className="mt-2 text-[12px] leading-5 text-[#AFA397]"><AlmaInline /> {lang === 'fr' ? 'Alma cadre. Les Agents Hermes exécutent. Les humains valident.' : 'Alma scopes. Hermes Agents execute. Humans approve.'}</p></div>
                          </div>
                          <div className="p-5">
                            <p className="px-1 pb-3 pt-1 text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#8A8172]">
                              {t.menuDiscover}
                            </p>
                            <div className="grid grid-cols-2 gap-1.5">
                              {COLLAB_DISCOVER.map((item) => (
                                <CollabMenuLink
                                  key={item.href}
                                  entry={item}
                                  lang={lang}
                                  onSelect={() => setCollabOpen(false)}
                                />
                              ))}
                            </div>
                          </div>

                          <div className="border-l border-[#DED6C8] bg-[#F1ECE3] p-5">
                            <p className="px-3 pb-3 pt-1 text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#8A8172]">
                              {t.menuAccompaniment}
                            </p>
                            <div className="flex flex-col">
                              {COLLAB_ACCOMPANIMENT.map((item) => (
                              <AccompanimentMenuLink
                                  key={item.href}
                                  entry={item}
                                  lang={lang}
                                  onSelect={() => setCollabOpen(false)}
                                />
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="grid border-t border-[#DED6C8] bg-[#FFFDF9] sm:grid-cols-[1fr_auto] sm:items-center">
                          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 px-7 py-4 text-[11.5px] font-bold text-[#625B50]">
                            <span className="font-mono text-[9px] uppercase tracking-[.16em] text-[#9A9081]">{t.menuResources}</span>
                            {COLLAB_ACTIONS.map((item) => <a key={item.href} href={item.href} onClick={() => setCollabOpen(false)} className="hover:text-[#D10E63]">{item.title[lang]}</a>)}
                            <a href="/documentation" onClick={() => setCollabOpen(false)} className="hover:text-[#D10E63]">Documentation</a>
                            <a href="/tarifs" onClick={() => setCollabOpen(false)} className="hover:text-[#D10E63]">{t.pricing}</a>
                          </div>
                          <a href={ACADEMY_URL} onClick={() => setCollabOpen(false)} className="group flex items-center gap-2 border-t border-[#DED6C8] px-6 py-4 text-xs font-bold text-[#1C1A17] transition-colors hover:bg-[#F3EEE5] sm:border-l sm:border-t-0">{t.menuAcademy}<ArrowRight className="size-3.5 text-[#B00C54] transition-transform group-hover:translate-x-0.5" /></a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <NavItem href="/workspace" active={isWorkspaceActive} overDark={overDark}>
                {t.workspace}
              </NavItem>
              <NavItem href="/tarifs" active={isPricingActive} overDark={overDark}>
                {t.pricing}
              </NavItem>
              <a href={ACADEMY_URL} className={`relative inline-flex items-center px-2 py-2 text-sm font-medium transition-colors ${overDark ? 'text-[#EDE8DE] hover:text-[#FBF9F3]' : 'text-[#1C1A17] hover:text-[#D10E63]'}`}>
                Academy
              </a>
            </div>
          </div>

          {/* Group 3 — Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={toggleLang}
              className={`hidden items-center gap-1.5 rounded-md px-1.5 py-2 text-xs font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#D10E63]/40 lg:inline-flex ${
                overDark ? 'text-[#EDE8DE] hover:text-[#FBF9F3]' : 'text-[#1C1A17] hover:text-[#D10E63]'
              }`}
              aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}
            >
              {lang === 'fr' ? <FrenchFlag /> : <UkFlag />}
              {lang === 'fr' ? 'FR' : 'EN'}
            </button>

            <UserMenuDesktop
              overDark={overDark}
              anonymousAction={
                <a
                  href={ALMA_CTA.href}
                  className={`hidden h-10 items-center justify-center rounded-full px-5 text-sm font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 lg:inline-flex ${
                    overDark
                      ? 'bg-[#FBF9F3] text-[#1C1A17] hover:bg-[#EAE3D4] focus-visible:ring-[#FBF9F3]/60 focus-visible:ring-offset-transparent'
                      : 'bg-[#1C1A17] text-[#FBF9F3] hover:bg-[#332F29] focus-visible:ring-[#1C1A17]/40 focus-visible:ring-offset-[#F3EFE6]'
                  }`}
                >
                  {ALMA_CTA.label[lang]}
                </a>
              }
            />

            {/* Mobile burger */}
            <button
              onClick={() => {
                if (isMenuOpen) setMobileCollabOpen(false)
                setIsMenuOpen((v) => !v)
              }}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#DcD4C4] bg-[#FBF9F3] text-[#1C1A17] transition-colors hover:bg-[#EAE3D4] lg:hidden"
              aria-label={isMenuOpen ? t.closeMenu : t.openMenu}
              aria-expanded={isMenuOpen}
              aria-controls="menu-panel"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMenuOpen ? (
                  <motion.svg
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <line x1="6" y1="6" x2="18" y2="18" />
                    <line x1="18" y1="6" x2="6" y2="18" />
                  </motion.svg>
                ) : (
                  <motion.svg
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <line x1="3" y1="7" x2="21" y2="7" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="17" x2="21" y2="17" />
                  </motion.svg>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile burger panel */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 top-[76px] z-30 bg-black/20 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setIsMenuOpen(false)}
            />

            <motion.div
              id="menu-panel"
              className="fixed inset-x-0 bottom-0 top-[76px] z-40 flex flex-col overflow-hidden bg-[#F3EFE6] lg:hidden"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              {/* Scrollable link area — leaves the CTA footer always visible */}
              <nav className="scrollbar-hide flex-1 overflow-y-auto overflow-x-hidden px-6 py-2">
                {/* Primary links — same order as desktop: Missions first (the need) */}
                <div className="divide-y divide-[#E4DDCE]">
                  <a
                    href="/missions"
                    onClick={(event) => {
                      handleMissionsClick(event)
                      setIsMenuOpen(false)
                    }}
                    className="flex min-h-11 items-center text-[15px] font-semibold text-[#1C1A17] transition-colors hover:text-[#D10E63]"
                  >
                    {t.missions}
                  </a>

                  {/* Collaborateurs IA — collapsible so the menu stays short */}
                  <div className="py-1">
                    <button
                      type="button"
                      onClick={() => setMobileCollabOpen((v) => !v)}
                      aria-expanded={mobileCollabOpen}
                      aria-controls="mobile-collab-sub"
                      className="flex min-h-11 w-full items-center justify-between text-[15px] font-semibold text-[#1C1A17] transition-colors hover:text-[#D10E63]"
                    >
                      {t.collaborators}
                      <ChevronDown
                        aria-hidden="true"
                        className={`h-4 w-4 text-[#6B6252] transition-transform duration-200 ${mobileCollabOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {mobileCollabOpen && (
                        <motion.div
                          id="mobile-collab-sub"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                           <div className="ml-1 flex flex-col border-l border-[#DcD4C4] pb-2 pl-4">
                            <a href={COLLAB_FEATURED.href} onClick={() => setIsMenuOpen(false)} className="group relative my-3 overflow-hidden rounded-2xl bg-[#181615] p-4 text-[#FAF8F3]"><span aria-hidden="true" className="absolute -right-8 -top-10 size-28 rounded-full bg-[#D10E63]/25 blur-2xl" /><span className="relative flex items-center gap-3"><span className="h-8 w-0.5 shrink-0 rounded-full bg-[#F2A4C5]" /><span><span className="block text-[14px] font-bold">{COLLAB_FEATURED.title[lang]}</span><span className="mt-1 block text-[11.5px] leading-5 text-[#CFC6B8]">{COLLAB_FEATURED.desc[lang]}</span></span><ArrowRight className="ml-auto size-4 shrink-0 text-[#F2A4C5] transition-transform group-hover:translate-x-0.5" /></span></a>
                            <p className="px-2 pb-1 pt-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A8172]">
                              {t.menuDiscover}
                            </p>
                            {COLLAB_DISCOVER.map((item) => (
                              <MobileCollabLink
                                key={item.href}
                                entry={item}
                                lang={lang}
                                onSelect={() => setIsMenuOpen(false)}
                              />
                            ))}
                            <p className="px-2 pb-1 pt-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A8172]">
                              {t.menuAccompaniment}
                            </p>
                            {COLLAB_ACCOMPANIMENT.map((item) => (
                              <MobileCollabLink
                                key={item.href}
                                entry={item}
                                lang={lang}
                                onSelect={() => setIsMenuOpen(false)}
                              />
                            ))}
                            <div className="my-1.5 border-t border-[#E4DDCE]" />
                            {COLLAB_ACTIONS.map((item) => (
                              <a
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="flex min-h-10 items-center gap-1.5 text-[14px] font-semibold text-[#1C1A17] transition-colors hover:text-[#D10E63]"
                              >
                                {item.title[lang]}
                                <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 text-[#D10E63]" />
                              </a>
                            ))}
                            <a href="/documentation" onClick={() => setIsMenuOpen(false)} className="flex min-h-10 items-center text-[14px] font-semibold text-[#1C1A17] transition-colors hover:text-[#D10E63]">Documentation</a>
                            <a href={ACADEMY_URL} onClick={() => setIsMenuOpen(false)} className="mt-2 flex min-h-11 items-center justify-between rounded-xl bg-[#D10E63] px-4 text-sm font-bold text-white">{t.menuAcademy}<ArrowRight className="size-4" /></a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <a
                    href="/workspace"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex min-h-11 items-center text-[15px] font-semibold text-[#1C1A17] transition-colors hover:text-[#D10E63]"
                  >
                    {t.workspace}
                  </a>
                  <a
                    href="/tarifs"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex min-h-11 items-center text-[15px] font-semibold text-[#1C1A17] transition-colors hover:text-[#D10E63]"
                  >
                    {t.pricing}
                  </a>
                  <a href={ACADEMY_URL} onClick={() => setIsMenuOpen(false)} className="flex min-h-11 items-center text-[15px] font-semibold text-[#1C1A17] transition-colors hover:text-[#D10E63]">
                    Academy
                  </a>
                  <UserMenuMobile onNavigate={() => setIsMenuOpen(false)} />
                  <button
                    onClick={toggleLang}
                    className="flex min-h-11 w-full items-center gap-2 text-[15px] font-semibold text-[#1C1A17] transition-colors hover:text-[#D10E63]"
                    aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}
                  >
                    {lang === 'fr' ? <FrenchFlag /> : <UkFlag />}
                    {lang === 'fr' ? 'Français — FR' : 'English — EN'}
                  </button>
                </div>

                {/* Contact */}
                <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-[#E4DDCE] pt-3">
                  <a
                    href="tel:+33189713394"
                    className="group flex items-center gap-2 py-1 text-[13px] font-medium text-[#4E483F] transition-colors hover:text-[#1C1A17]"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="flex-shrink-0 text-[#D10E63]">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span className="underline underline-offset-2">01 89 71 33 94</span>
                  </a>
                  <a
                    href="mailto:hello@unitalk.ai"
                    className="group flex items-center gap-2 py-1 text-[13px] font-medium text-[#4E483F] transition-colors hover:text-[#1C1A17]"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="flex-shrink-0 text-[#D10E63]">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-10 6L2 7" />
                    </svg>
                    <span className="underline underline-offset-2">hello@unitalk.ai</span>
                  </a>
                </div>
              </nav>

              {/* Sticky CTA footer — always visible above the fold */}
              <AnonymousOnly>
                <div className="shrink-0 border-t border-[#DcD4C4] bg-[#F3EFE6] px-6 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-4">
                  <a
                    href={ALMA_CTA.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex min-h-12 items-center justify-center rounded-full bg-[#D10E63] px-5 py-3 text-[15px] font-bold text-[#FBF9F3] shadow-[0_8px_24px_-8px_rgba(209,14,99,0.5)] transition-colors hover:bg-[#B10B53]"
                  >
                    {ALMA_CTA.label[lang]}
                  </a>
                </div>
              </AnonymousOnly>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
