'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  ChevronDown,
  Mic,
  Square,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { UnitalkLogo } from './unitalk-logo'
import { useLanguage } from '@/lib/language-context'
import { AnonymousOnly, UserMenuDesktop, UserMenuMobile } from './auth/user-menu'
import { useAlma } from '@/lib/alma-context'

type Bi = { fr: string; en: string }
type SpeechResultEvent = { results: ArrayLike<{ 0: { transcript: string } }> }
type SpeechRecognitionInstance = {
  lang: string
  continuous: boolean
  interimResults: boolean
  onresult: ((event: SpeechResultEvent) => void) | null
  onend: (() => void) | null
  onerror: (() => void) | null
  start: () => void
  stop: () => void
  abort: () => void
}

function getSpeechRecognition(): (new () => SpeechRecognitionInstance) | null {
  if (typeof window === 'undefined') return null
  const speechWindow = window as typeof window & {
    SpeechRecognition?: new () => SpeechRecognitionInstance
    webkitSpeechRecognition?: new () => SpeechRecognitionInstance
  }
  return speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition ?? null
}

const ALMA_CTA = {
  href: '/missions?composer=1&source=nav',
  label: { fr: 'Décrire une mission', en: 'Describe a mission' } as Bi,
}

// Focused Collaborateurs IA menu. Infrastructure remains available deeper in
// the product and documentation, not in the launch navigation.
type MenuEntry = { title: Bi; desc: Bi; href: string }
type MenuAction = { title: Bi; href: string }

const MARKETPLACE_FEATURED: MenuEntry = {
  title: { fr: 'Les Collaborateurs IA', en: 'AI Collaborators' },
  desc: {
    fr: 'Découvrez des collaborateurs prêts à prendre en charge vos missions.',
    en: 'Discover collaborators ready to take on your missions.',
  },
  href: '/marketplace',
}

const MARKETPLACE_CATALOGS: MenuEntry[] = [
  { title: { fr: 'Profils métier', en: 'Job profiles' }, desc: { fr: 'Ses responsabilités.', en: 'Its responsibilities.' }, href: '/collaborateurs-ia/profils-metier' },
  { title: { fr: 'Compétences', en: 'Skills' }, desc: { fr: 'Ses savoir-faire.', en: 'Its know-how.' }, href: '/collaborateurs-ia/competences' },
  { title: { fr: 'Applications', en: 'Applications' }, desc: { fr: 'Ses outils de travail.', en: 'Its work tools.' }, href: '/collaborateurs-ia/applications' },
  { title: { fr: 'Modèles IA', en: 'AI models' }, desc: { fr: 'Son intelligence autorisée.', en: 'Its authorized intelligence.' }, href: '/modeles-ia' },
]

const MARKETPLACE_BUILD: MenuEntry[] = [
  { title: { fr: 'Connecteurs', en: 'Connectors' }, desc: { fr: 'Reliez vos applications et vos données.', en: 'Connect your applications and data.' }, href: '/collaborateurs-ia/integrations' },
  { title: { fr: 'Serveurs IA', en: 'AI Servers' }, desc: { fr: 'Choisissez son environnement de travail.', en: 'Choose its work environment.' }, href: '/collaborateurs-ia/serveurs' },
  { title: { fr: 'Experts', en: 'Experts' }, desc: { fr: 'Faites concevoir vos intégrations.', en: 'Have your integrations designed.' }, href: '/experts' },
  { title: { fr: 'Formations', en: 'Training' }, desc: { fr: 'Apprenez à travailler avec vos Collaborateurs IA.', en: 'Learn to work with your AI Collaborators.' }, href: '/academy' },
]

const COLLAB_ACTIONS: MenuAction[] = [
  { title: { fr: 'Sélection Unitalk', en: 'Unitalk selection' }, href: '/blog/hermes-agent-youtube' },
  { title: { fr: 'Pourquoi Unitalk ?', en: 'Why Unitalk?' }, href: '/collaborateurs-ia/pourquoi-unitalk' },
]

const T = {
  fr: {
    home: 'Accueil Unitalk AI',
    signIn: 'Connexion',
    pricing: 'Tarifs',
    workspace: 'Workspace',
    missions: 'Missions',
    partners: 'Partenaires',
    collaborators: 'Collaborateurs IA',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    collabMenu: 'Menu Collaborateurs IA',
    menuDiscover: 'Comprendre',
    menuAccompaniment: 'Participer',
    menuFeatured: 'Marketplace IA',
    menuEquip: 'Explorer',
    menuResources: 'Ressources',
    menuStore: 'Ouvrir la Marketplace IA',
    menuMarketplace: 'Voir les Collaborateurs IA',
    menuCatalog: 'Équiper votre Collaborateur',
    menuBuild: 'Connecter et déployer',
    missionTitle: 'Quel travail voulez-vous confier ?',
    voiceStart: 'Parler à Alma',
    voiceListening: 'Alma vous écoute…',
    voiceUnavailable: 'Voix indisponible',
    writeInstead: 'ou écrivez votre mission',
    missionPlaceholder: 'Décrivez votre mission…',
    missionSuggestions: ['Relancer mes factures impayées', 'Trouver de nouveaux prospects'],
    missionExamples: 'Voir toutes les missions',
    almaGuide: 'Alma vous oriente.',
    almaGuideBody: 'Elle trouve le Collaborateur IA, les compétences et les applications adaptés à votre mission.',
    continueAlma: 'Continuer avec Alma',
    doctrine: 'Ouverte · Open source · Souveraine',
  },
  en: {
    home: 'Unitalk AI Home',
    signIn: 'Sign in',
    pricing: 'Pricing',
    workspace: 'Workspace',
    missions: 'Missions',
    partners: 'Partners',
    collaborators: 'AI Collaborators',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    collabMenu: 'AI Collaborators menu',
    menuDiscover: 'Understand',
    menuAccompaniment: 'Participate',
    menuFeatured: 'AI Marketplace',
    menuEquip: 'Explore',
    menuResources: 'Resources',
    menuStore: 'Open the AI Marketplace',
    menuMarketplace: 'View AI Collaborators',
    menuCatalog: 'Equip your Collaborator',
    menuBuild: 'Connect and deploy',
    missionTitle: 'What work do you want to entrust?',
    voiceStart: 'Talk to Alma',
    voiceListening: 'Alma is listening…',
    voiceUnavailable: 'Voice unavailable',
    writeInstead: 'or type your mission',
    missionPlaceholder: 'Describe your mission…',
    missionSuggestions: ['Follow up on unpaid invoices', 'Find new prospects'],
    missionExamples: 'View all missions',
    almaGuide: 'Alma guides you.',
    almaGuideBody: 'She finds the right AI Collaborator, skills and applications for your mission.',
    continueAlma: 'Continue with Alma',
    doctrine: 'Open · Open source · Sovereign',
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

function MarketplaceMenuLink({ entry, index, lang, onSelect, compact = false }: { entry: MenuEntry; index: number; lang: 'fr' | 'en'; onSelect: () => void; compact?: boolean }) {
  void index
  return <a href={entry.href} role="menuitem" onClick={onSelect} className={`group block rounded-xl border border-[#DED6C8] bg-[#FAF8F3] outline-none transition-[transform,border-color,background-color] hover:-translate-y-0.5 hover:border-[#D10E63]/40 hover:bg-white focus-visible:ring-2 focus-visible:ring-[#D10E63]/40 ${compact ? 'min-h-[62px] px-3 py-2.5' : 'min-h-[82px] p-3.5'}`}><strong className="block text-[15px] font-bold leading-5 text-[#1C1A17] transition-colors group-hover:text-[#B00C54]">{entry.title[lang]}</strong><span className="mt-1 block text-[12px] leading-[1.4] text-[#625B50]">{entry.desc[lang]}</span></a>
}

function DeploymentMenuLink({ entry, lang, onSelect }: { entry: MenuEntry; lang: 'fr' | 'en'; onSelect: () => void }) {
  return <a href={entry.href} role="menuitem" onClick={onSelect} className="group block min-h-[59px] rounded-xl border border-transparent px-3 py-2.5 outline-none transition-colors hover:border-[#D8D0C2] hover:bg-white focus-visible:ring-2 focus-visible:ring-[#D10E63]/40"><strong className="block text-[14px] font-bold leading-5 text-[#1C1A17] group-hover:text-[#B00C54]">{entry.title[lang]}</strong><span className="mt-0.5 block text-[11px] leading-4 text-[#625B50]">{entry.desc[lang]}</span></a>
}

function MobileMarketplaceLink({ entry, index, lang, onSelect }: { entry: MenuEntry; index: number; lang: 'fr' | 'en'; onSelect: () => void }) {
  void index
  return <a href={entry.href} onClick={onSelect} className="group block min-h-12 border-b border-[#E4DDCE] py-2.5 last:border-b-0"><span className="block text-[13px] font-bold text-[#1C1A17] group-hover:text-[#B00C54]">{entry.title[lang]}</span><span className="mt-0.5 block text-[10.5px] leading-4 text-[#766D61]">{entry.desc[lang]}</span></a>
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
  const [marketplaceMission, setMarketplaceMission] = useState('')
  const [listening, setListening] = useState(false)
  const collabRef = useRef<HTMLDivElement | null>(null)
  const collabButtonRef = useRef<HTMLButtonElement | null>(null)
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null)
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
  const router = useRouter()
  const voiceSupported = typeof window !== 'undefined' && getSpeechRecognition() !== null
  const { setLauncherSuppressed } = useAlma()
  const t = T[lang]
  const pathname = usePathname() || '/'

  // The header is transparent only until the page scrolls or a panel opens.
  // While transparent over a dark hero, switch to light-on-dark link colors
  // so labels and hover states stay legible.
  const overDark = darkHero && !scrolled && !isMenuOpen && !collabOpen

  // Missions has its own top-level navigation item, so it must not also mark
  // the Collaborateurs IA trigger as the current page.
  const marketplacePrefixes = ['/marketplace', '/collaborateurs-ia', '/modeles-ia', '/academy', '/experts', '/co-createur-ia']
  const isCollabActive = marketplacePrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))
  const isWorkspaceActive = pathname === '/workspace' || pathname.startsWith('/workspace/')
  const isPricingActive = pathname === '/tarifs'

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

  useEffect(() => {
    const SpeechRecognition = getSpeechRecognition()
    if (!SpeechRecognition) return
    const recognition = new SpeechRecognition()
    recognition.lang = lang === 'fr' ? 'fr-FR' : 'en-US'
    recognition.continuous = false
    recognition.interimResults = true
    recognition.onresult = (event) => {
      let transcript = ''
      for (let index = 0; index < event.results.length; index++) transcript += event.results[index][0].transcript
      setMarketplaceMission(transcript.trim())
    }
    recognition.onend = () => setListening(false)
    recognition.onerror = () => setListening(false)
    recognitionRef.current = recognition
    return () => {
      recognition.abort()
      recognitionRef.current = null
    }
  }, [lang])

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

  function continueMarketplaceMission() {
    const mission = marketplaceMission.trim()
    setCollabOpen(false)
    router.push(`/missions?composer=1&source=marketplace-menu${mission ? `&q=${encodeURIComponent(mission)}` : ''}`)
  }

  function toggleMarketplaceVoice() {
    if (!voiceSupported || !recognitionRef.current) return
    if (listening) {
      recognitionRef.current.stop()
      setListening(false)
      return
    }
    setMarketplaceMission('')
    setListening(true)
    recognitionRef.current.start()
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,backdrop-filter,border-color] duration-300 ${
          scrolled || isMenuOpen || collabOpen
            ? 'border-[#1C1A17]/[0.08] bg-[#F3EFE6]/96 backdrop-blur-[16px]'
            : 'border-transparent bg-transparent backdrop-blur-0'
        }`}
      >
        <nav className="editorial-shell flex h-[76px] items-center justify-between">
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
              <NavItem href="/missions" active={pathname === '/missions' || pathname.startsWith('/missions/')} overDark={overDark}>
                {t.missions}
              </NavItem>
              {/* Marketplace IA — every way to find, equip or contribute a Collaborateur IA */}
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
                  onClick={() => setCollabOpen((open) => !open)}
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
                       className="absolute -left-[210px] top-full w-[1040px] max-w-[calc(100vw-2rem)] pt-3"
                     >
                       <div className="max-h-[560px] overflow-hidden rounded-[24px] border border-white/[.08] bg-[#151316] text-[#FAF8F3] shadow-[0_36px_90px_-26px_rgba(21,19,22,.7)]">
                          <div className="grid grid-cols-[40%_32%_28%]">
                           <div className="relative isolate overflow-hidden bg-[linear-gradient(145deg,#3A0B23_0%,#181117_76%)] p-6">
                             <div aria-hidden className="absolute -right-20 -top-20 -z-10 size-56 rounded-full bg-[#D10E63]/25 blur-3xl" />
                             <p className="font-mono text-[9px] font-black uppercase tracking-[.2em] text-[#F2A4C5]">{t.menuFeatured}</p>
                             <h2 className="mt-3 max-w-sm text-[27px] font-semibold leading-[1] tracking-[-.045em]">{t.missionTitle}</h2>
                             <button type="button" onClick={toggleMarketplaceVoice} disabled={!voiceSupported} aria-pressed={listening} className={`group relative mt-5 flex min-h-14 w-full items-center justify-center gap-3 overflow-hidden rounded-xl border px-4 text-sm font-bold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#F2A4C5] disabled:cursor-not-allowed disabled:opacity-55 ${listening ? 'border-[#F2A4C5]/60 bg-[#D10E63] text-white' : 'border-[#D10E63]/50 bg-[#D10E63]/15 text-[#F7D4E2] hover:bg-[#D10E63]/25'}`}>
                               {listening && <motion.span aria-hidden className="absolute size-10 rounded-full border border-white/60" animate={{ scale: [1, 2.2], opacity: [.6, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />}
                               <span className="relative flex size-9 items-center justify-center rounded-full bg-[#D10E63] text-white">{listening ? <Square className="size-3.5 fill-current" /> : <Mic className="size-[18px]" />}</span>
                               <span className="relative">{voiceSupported ? (listening ? t.voiceListening : t.voiceStart) : t.voiceUnavailable}</span>
                             </button>
                             <div className="my-3 flex items-center gap-3"><span className="h-px flex-1 bg-white/10" /><span className="font-mono text-[8px] uppercase tracking-[.14em] text-[#8F8188]">{t.writeInstead}</span><span className="h-px flex-1 bg-white/10" /></div>
                             <form onSubmit={(event) => { event.preventDefault(); continueMarketplaceMission() }}>
                               <div className="flex min-h-12 items-center rounded-xl border border-white/15 bg-white/[.07] px-4 focus-within:border-[#D10E63]/70 focus-within:ring-2 focus-within:ring-[#D10E63]/20">
                                 <input value={marketplaceMission} onChange={(event) => setMarketplaceMission(event.target.value)} placeholder={t.missionPlaceholder} aria-label={t.missionPlaceholder} className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-[#9E9198]" />
                                 <button type="submit" aria-label={t.continueAlma} className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#D10E63] text-white"><ArrowRight className="size-4" /></button>
                               </div>
                             </form>
                              <div className="mt-3 space-y-1">
                                {t.missionSuggestions.map((suggestion) => <button key={suggestion} type="button" onClick={() => setMarketplaceMission(suggestion)} className="block w-full rounded-lg px-2 py-1.5 text-left text-[12px] text-[#D8CDD2] transition-colors hover:bg-white/[.06] hover:text-white">{suggestion}</button>)}
                              </div>
                              <a href="/missions" onClick={() => setCollabOpen(false)} className="mt-1 inline-flex px-2 text-[11px] font-bold text-[#F2A4C5] underline decoration-[#F2A4C5]/30 underline-offset-4 hover:decoration-[#F2A4C5]">{t.missionExamples}</a>
                              <div className="mt-5 border-t border-white/10 pt-4"><p className="text-sm font-bold text-white">{t.almaGuide}</p><p className="mt-1.5 text-[11px] leading-5 text-[#B8ABB1]">{t.almaGuideBody}</p></div>
                           </div>

                            <div className="border-r border-[#DED6C8] bg-[#F3EFE6] p-5 text-[#1C1A17]">
                              <p className="px-1 pb-4 pt-1 font-mono text-[10px] font-black uppercase tracking-[.18em] text-[#B00C54]">{t.menuCatalog}</p>
                             <div className="grid grid-cols-2 gap-2">
                               {MARKETPLACE_CATALOGS.map((entry, index) => <MarketplaceMenuLink key={entry.href} entry={entry} index={index} lang={lang} onSelect={() => setCollabOpen(false)} />)}
                             </div>
                           </div>

                            <div className="bg-[#EAE3D4] p-5 text-[#1C1A17]">
                              <div className="flex items-center justify-between px-1 pb-4 pt-1"><p className="font-mono text-[10px] font-black uppercase tracking-[.18em] text-[#B00C54]">{t.menuBuild}</p><a href="/documentation" onClick={() => setCollabOpen(false)} className="text-[10px] font-bold text-[#625B50] hover:text-[#B00C54]">Documentation</a></div>
                              <div className="space-y-2">
                                {MARKETPLACE_BUILD.map((entry) => <DeploymentMenuLink key={entry.href} entry={entry} lang={lang} onSelect={() => setCollabOpen(false)} />)}
                             </div>
                           </div>
                         </div>

                          <div className="flex min-h-12 items-center justify-between gap-5 border-t border-[#DED6C8] bg-[#FFFDF9] px-6 text-[11px] font-semibold text-[#625B50]">
                            <span className="font-mono text-[9px] uppercase tracking-[.12em]">{t.doctrine}</span>
                            <div className="flex items-center gap-5">{COLLAB_ACTIONS.map((item) => <a key={item.href} href={item.href} onClick={() => setCollabOpen(false)} className="hover:text-[#B00C54]">{item.title[lang]}</a>)}</div>
                            <a href="/marketplace" onClick={() => setCollabOpen(false)} className="group inline-flex shrink-0 items-center gap-2 font-bold text-[#B00C54]">{lang === 'fr' ? 'Explorer toute la Marketplace' : 'Explore the full Marketplace'}<ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" /></a>
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
                {/* Primary links — same structure as desktop */}
                 <div className="divide-y divide-[#E4DDCE]">
                   {/* Marketplace IA — collapsible so the menu stays short */}
                   <a href="/missions" onClick={() => setIsMenuOpen(false)} className="flex min-h-11 items-center text-[15px] font-semibold text-[#1C1A17] transition-colors hover:text-[#D10E63]">{t.missions}</a>
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
                              <div className="relative my-3 overflow-hidden rounded-2xl bg-[linear-gradient(145deg,#3A0B23,#181117)] p-4 text-[#FAF8F3]">
                               <p className="font-mono text-[9px] font-black uppercase tracking-[.16em] text-[#F2A4C5]">{t.menuFeatured}</p><p className="mt-2 text-lg font-bold">{t.missionTitle}</p>
                               <button type="button" onClick={toggleMarketplaceVoice} disabled={!voiceSupported} aria-pressed={listening} className={`mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border text-xs font-bold disabled:opacity-50 ${listening ? 'border-[#F2A4C5] bg-[#D10E63]' : 'border-[#D10E63]/50 bg-[#D10E63]/15 text-[#F7D4E2]'}`}>{listening ? <Square className="size-3 fill-current" /> : <Mic className="size-4" />}{voiceSupported ? (listening ? t.voiceListening : t.voiceStart) : t.voiceUnavailable}</button>
                               <div className="mt-3 flex min-h-11 items-center rounded-xl border border-white/15 bg-white/[.07] px-3"><input value={marketplaceMission} onChange={(event) => setMarketplaceMission(event.target.value)} placeholder={t.missionPlaceholder} aria-label={t.missionPlaceholder} className="min-w-0 flex-1 bg-transparent text-xs text-white outline-none placeholder:text-white/45" /><button type="button" onClick={() => { continueMarketplaceMission(); setIsMenuOpen(false) }} aria-label={t.continueAlma} className="flex size-8 items-center justify-center rounded-full bg-[#D10E63]"><ArrowRight className="size-4" /></button></div>
                              </div>
                              <p className="px-1 pb-1 pt-3 font-mono text-[9px] font-black uppercase tracking-[.16em] text-[#857C6E]">{t.menuCatalog}</p>
                              <div className="grid grid-cols-2 gap-x-4">
                                {MARKETPLACE_CATALOGS.map((entry, index) => <MobileMarketplaceLink key={entry.href} entry={entry} index={index} lang={lang} onSelect={() => setIsMenuOpen(false)} />)}
                              </div>
                              <p className="px-1 pb-1 pt-4 font-mono text-[9px] font-black uppercase tracking-[.16em] text-[#857C6E]">{t.menuBuild}</p>
                              <div>
                                {MARKETPLACE_BUILD.map((entry, index) => <MobileMarketplaceLink key={entry.href} entry={entry} index={index + 4} lang={lang} onSelect={() => setIsMenuOpen(false)} />)}
                              </div>
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
                             <a href={MARKETPLACE_FEATURED.href} onClick={() => setIsMenuOpen(false)} className="mt-2 flex min-h-11 items-center justify-between rounded-xl bg-[#D10E63] px-4 text-sm font-bold text-white">{t.menuMarketplace}<ArrowRight className="size-4" /></a>
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
