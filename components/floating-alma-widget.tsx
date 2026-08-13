'use client'

import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/lib/language-context'
import { useAlma } from '@/lib/alma-context'

const T = {
  fr: {
    tooltipClose: 'Fermer',
    role: 'Je crée vos agents et les aide à progresser',
    // Contextual tooltips by route
    tipHome: 'Moi, c’est Alma. Activons votre premier Collaborateur IA.',
    tipAgents: 'Moi, c’est Alma. Activons votre premier Collaborateur IA.',
    tipPricing: 'Une question sur les offres ? Parlons-en.',
    tipMissions: 'Notre conseillère IA peut préparer votre mission.',
    ctaMissions: 'Décrire mon besoin',
    tipDefault: 'Parler à Alma · Conseillère IA',
    msg1: 'Bonjour, je suis Alma.',
    msg2: 'J\'active des collaborateurs IA sur mesure pour votre entreprise.',
    msg3a: "Je découvre votre activité, puis je vous appelle pour comprendre vos outils et votre façon de travailler. ",
    msg3strong: 'À la fin, votre agent est prêt à travailler.',
    msg4: 'Il a sa propre identité — prénom, voix, téléphone, email, agenda — et agit dans vos outils dès le premier jour.',
    msg5: 'Je reste ensuite à vos côtés pour activer de nouveaux agents et les faire progresser.',
    msg6: 'Pour commencer, quel est le nom de domaine de votre entreprise ?',
    placeholder: 'Entrez votre nom de domaine',
    footnote: 'Écrivez ou parlez — gratuit, sans carte bancaire',
    send: 'Envoyer',
  },
  en: {
    tooltipClose: 'Close',
    role: 'I create your agents and help them grow',
    tipHome: 'Hi, I’m Alma. I can activate your first AI Collaborator.',
    tipAgents: 'Let’s describe the role you need to fill.',
    tipPricing: 'A question about our plans? Let’s talk.',
    tipMissions: 'Our AI advisor can prepare your mission.',
    ctaMissions: 'Describe my need',
    tipDefault: 'Talk to Alma · AI Advisor',
    msg1: "Hello, I'm Alma.",
    msg2: 'I create a tailored AI collaborator for your company.',
    msg3a: 'I learn about your business, then call you to understand your tools and the way you work. ',
    msg3strong: 'By the end, your agent is ready to work.',
    msg4: 'It has its own identity — name, voice, phone, email, calendar — and acts inside your tools from day one.',
    msg5: 'Then I stay by your side to create new agents and help them grow.',
    msg6: "To start, what's your company's domain name?",
    placeholder: 'Enter your domain name',
    footnote: 'Type or talk — free, no credit card',
    send: 'Send',
  },
}

export function FloatingAlmaWidget() {
  const { isOpen, toggleAlma, closeAlma, launcherSuppressed } = useAlma()
  const { lang } = useLanguage()
  const t = T[lang]
  const pathname = usePathname()
  const competenceStore = pathname === '/collaborateurs-ia/competences'
  const almaProfile = pathname === '/unitalk/@alma'
  // Hide the floating launcher on the homepages — the hero form would compete with it,
  // and on /accueil-2 it would overlap the interactive demo CTA.
  // Also hide it on /decouvrir, where the onboarding already features Alma as a
  // dedicated voice-agent panel. The chat window still opens via in-page buttons.
  // On the /missions marketplace it is removed entirely: Alma lives there as a
  // native catalog card, so a floating widget would be redundant (spec §10).
  // `launcherSuppressed` lets any page hide it transiently.
  const showLauncher =
    pathname !== '/' &&
    pathname !== '/accueil-2' &&
    pathname !== '/decouvrir' &&
    pathname !== '/missions' &&
    pathname !== '/tarifs' &&
    pathname !== '/alma' &&
    !almaProfile &&
    pathname !== '/collaborateurs-ia/profils-metier' &&
    !competenceStore &&
    !pathname.startsWith('/team/') &&
    !/^\/@[^/]+$/.test(pathname) &&
    !launcherSuppressed
  // Mission detail pages keep a small, unobtrusive round avatar.
  const isMissions = pathname.startsWith('/missions/')

  return (
    <>
      {/* Floating launcher — Alma as a living presence, not a support bot */}
      {showLauncher && (
        <div className="fixed bottom-6 right-6 z-40 flex items-end gap-3">
          <motion.button
            onClick={toggleAlma}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className={`relative flex items-center justify-center rounded-full bg-[#F3EFE6] shadow-[0_12px_32px_-8px_rgba(28,26,23,0.35)] ring-2 ring-[#D10E63]/40 transition-transform hover:scale-105 ${isMissions ? 'h-12 w-12' : 'h-16 w-16'}`}
            aria-label={isOpen ? t.tooltipClose : t.tipDefault}
            title={isOpen ? t.tooltipClose : t.tipDefault}
          >
            {isOpen ? (
              <span className="flex h-full w-full items-center justify-center rounded-full bg-[#D10E63] text-[#FBF9F3]">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </span>
            ) : (
              <>
                <img
                  src="/alma-avatar.png"
                  alt="Alma"
                  className="h-full w-full rounded-full object-cover"
                />
              </>
            )}
          </motion.button>
        </div>
      )}

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && !competenceStore && !almaProfile && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ duration: 0.2 }}
            className={`fixed right-6 z-50 max-h-[620px] w-96 overflow-hidden rounded-[28px] border border-[#DcD4C4] bg-[#FBF9F3] shadow-[0_32px_96px_-24px_rgba(28,26,23,0.45)] ${showLauncher ? 'bottom-28' : 'bottom-6'}`}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#E4DCCC] bg-[#F3EFE6] px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="relative shrink-0">
                  <img
                    src="/alma-avatar.png"
                    alt="Alma"
                    className="h-9 w-9 rounded-full object-cover ring-2 ring-[#D10E63]/35"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#F3EFE6] bg-[#2E7D4F]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1C1A17]">Alma</p>
                  <p className="text-[11px] text-[#857C6E]">{t.role}</p>
                </div>
              </div>
              <button
                onClick={closeAlma}
                className="flex h-8 w-8 items-center justify-center rounded-full text-[#857C6E] transition-colors hover:bg-[#E4DCCC] hover:text-[#1C1A17]"
                aria-label={t.tooltipClose}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="space-y-2.5 overflow-y-auto px-5 py-4" style={{ maxHeight: '380px' }}>
              <div className="flex items-start gap-2.5">
                <div className="rounded-2xl rounded-tl-md bg-[#EFE9DC] px-4 py-2.5 text-sm leading-relaxed text-[#1C1A17]">
                  {t.msg1}
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="rounded-2xl rounded-tl-md bg-[#EFE9DC] px-4 py-2.5 text-sm leading-relaxed text-[#4E483F]">
                  {t.msg2}
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="rounded-2xl rounded-tl-md bg-[#EFE9DC] px-4 py-2.5 text-sm leading-relaxed text-[#4E483F]">
                  {t.msg3a}
                  <span className="font-medium text-[#1C1A17]">{t.msg3strong}</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="rounded-2xl rounded-tl-md bg-[#EFE9DC] px-4 py-2.5 text-sm leading-relaxed text-[#4E483F]">
                  {t.msg4}
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="rounded-2xl rounded-tl-md bg-[#EFE9DC] px-4 py-2.5 text-sm leading-relaxed text-[#4E483F]">
                  {t.msg5}
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="rounded-2xl rounded-tl-md bg-[#EFE9DC] px-4 py-2.5 text-sm leading-relaxed text-[#1C1A17]">
                  {t.msg6}
                </div>
              </div>
            </div>

            {/* Composer */}
            <div className="border-t border-[#E4DCCC] bg-[#F3EFE6] px-4 py-2.5">
              <div className="flex items-center gap-2 rounded-full border border-[#DcD4C4] bg-[#FBF9F3] pl-4 pr-1.5 py-1.5 focus-within:border-[#D10E63]">
                <input
                  type="text"
                  placeholder={t.placeholder}
                  className="flex-1 bg-transparent text-sm text-[#1C1A17] placeholder-[#A79E8E] focus:outline-none"
                />
                <button
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#D10E63] text-[#FBF9F3] transition-colors hover:bg-[#B00B52]"
                  aria-label={t.send}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                </button>
              </div>
              <p className="mt-2.5 text-center text-[10px] text-[#857C6E]">
                {t.footnote}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
