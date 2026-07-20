'use client'

import { motion } from 'framer-motion'
import { Bot, CalendarDays, Check, Inbox, Mail, Phone, Sparkles, Target, UsersRound } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as const

const mockCopy = {
  fr: {
    // Chat mockup
    chatApp: 'Unitalk · Interface unifiée',
    chatStatus: 'En ligne',
    chatName: 'Emma',
    chatRole: 'Executive Assistant',
    chatUser: 'Emma, prépare une proposition pour le client Lefebvre.',
    chatReply1: "Je m'en occupe. J'ai retrouvé vos 3 derniers échanges et votre grille tarifaire.",
    memoryChip: 'Mémoire mise à jour · Client Lefebvre',
    chatReply2: 'Proposition prête. Je l\'ai ajoutée à votre calendrier pour relance jeudi.',
    chatInput: 'Écrivez un message ou confiez une mission…',
    // Workstation mockup
    wsTitle: 'Poste de travail · Emma',
    wsBadge: 'Autonome',
    wsInbox: 'Boîte de réception',
    wsEmails: [
      { from: 'Client Lefebvre', subject: 'Re : Proposition commerciale', tag: 'Répondu' },
      { from: 'Thomas (Support)', subject: 'Brief réunion de 14h', tag: 'Traité' },
    ],
    wsAgenda: "Aujourd'hui",
    wsEvents: [
      { time: '11:00', label: 'Appel de qualification · Nova' },
      { time: '14:00', label: 'Point équipe ventes' },
    ],
    wsMissions: 'Missions en cours',
    wsMissionLabel: 'Analyse des 42 contrats fournisseurs',
    wsMissionProgress: '32 / 42',
    // Org chart mockup
    orgApp: 'Votre organisation',
    orgHuman: 'Équipe',
    orgAi: 'Collaborateurs IA',
    orgPairs: [
      { employee: 'Camille', role: 'Ventes', human: '/nina-avatar.png', ai: 'Alex', aiAvatar: '/alex-avatar.png' },
      { employee: 'Thomas', role: 'Support', human: '/thomas-avatar.png', ai: 'Sophia', aiAvatar: '/sophia-avatar.png' },
      { employee: 'Léa', role: 'Opérations', human: '/elena-avatar.png', ai: 'Marcus', aiAvatar: '/marcus-avatar.png' },
    ],
    orgFooter: '3 employés · 3 Collaborateurs IA',
  },
  en: {
    chatApp: 'Unitalk · Unified interface',
    chatStatus: 'Online',
    chatName: 'Emma',
    chatRole: 'Executive Assistant',
    chatUser: 'Emma, prepare a proposal for the Lefebvre account.',
    chatReply1: 'On it. I pulled your last 3 exchanges and your pricing grid.',
    memoryChip: 'Memory updated · Lefebvre account',
    chatReply2: 'Proposal ready. I added a follow-up to your calendar for Thursday.',
    chatInput: 'Write a message or hand over a mission…',
    wsTitle: 'Workstation · Emma',
    wsBadge: 'Autonomous',
    wsInbox: 'Inbox',
    wsEmails: [
      { from: 'Lefebvre account', subject: 'Re: Commercial proposal', tag: 'Replied' },
      { from: 'Thomas (Support)', subject: '2pm meeting brief', tag: 'Done' },
    ],
    wsAgenda: 'Today',
    wsEvents: [
      { time: '11:00', label: 'Qualification call · Nova' },
      { time: '14:00', label: 'Sales team sync' },
    ],
    wsMissions: 'Missions in progress',
    wsMissionLabel: 'Analysis of 42 supplier contracts',
    wsMissionProgress: '32 / 42',
    orgApp: 'Your organization',
    orgHuman: 'Team',
    orgAi: 'AI Collaborators',
    orgPairs: [
      { employee: 'Camille', role: 'Sales', human: '/nina-avatar.png', ai: 'Alex', aiAvatar: '/alex-avatar.png' },
      { employee: 'Thomas', role: 'Support', human: '/thomas-avatar.png', ai: 'Sophia', aiAvatar: '/sophia-avatar.png' },
      { employee: 'Léa', role: 'Operations', human: '/elena-avatar.png', ai: 'Marcus', aiAvatar: '/marcus-avatar.png' },
    ],
    orgFooter: '3 employees · 3 AI Collaborators',
  },
} as const

function WindowDots() {
  return (
    <div className="flex gap-1.5" aria-hidden="true">
      <span className="h-2.5 w-2.5 rounded-full bg-[#E0186A]/40" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#C9C0B2]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#C9C0B2]" />
    </div>
  )
}

export function ChatMockup({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = mockCopy[lang]
  return (
    <div className="w-full overflow-hidden rounded-3xl border border-[#DDD5CA] bg-[#FBF9F3] shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
      <div className="flex items-center justify-between border-b border-[#E6DFD1] bg-[#F3EFE6] px-5 py-3.5">
        <WindowDots />
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#857C6E]">{t.chatApp}</p>
        <span className="w-8" />
      </div>

      <div className="flex items-center gap-3 border-b border-[#EDE7DA] px-5 py-3.5">
        <img src="/assistant-avatar.png" alt="" className="h-9 w-9 rounded-full object-cover ring-2 ring-[#D10E63]/20" />
        <div className="min-w-0">
          <p className="text-sm font-bold text-[#1C1A17]">{t.chatName}</p>
          <p className="text-xs text-[#857C6E]">{t.chatRole}</p>
        </div>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-[#D10E63]/10 px-2.5 py-1 text-[10px] font-bold text-[#D10E63]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#D10E63]" />
          {t.chatStatus}
        </span>
      </div>

      <div className="flex flex-col gap-3 px-5 py-6">
        <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-[#1C1A17] px-4 py-2.5 text-sm leading-relaxed text-[#FBF9F3]">
          {t.chatUser}
        </div>
        <div className="mr-auto max-w-[85%] rounded-2xl rounded-tl-sm border border-[#EDE7DA] bg-[#F3EFE6] px-4 py-2.5 text-sm leading-relaxed text-[#1C1A17]">
          {t.chatReply1}
        </div>
        <div className="mr-auto inline-flex items-center gap-2 rounded-full border border-[#D10E63]/25 bg-[#D10E63]/8 px-3 py-1.5 text-[11px] font-semibold text-[#D10E63]">
          <Sparkles className="h-3.5 w-3.5" />
          {t.memoryChip}
        </div>
        <div className="mr-auto max-w-[85%] rounded-2xl rounded-tl-sm border border-[#EDE7DA] bg-[#F3EFE6] px-4 py-2.5 text-sm leading-relaxed text-[#1C1A17]">
          {t.chatReply2}
        </div>
      </div>

      <div className="border-t border-[#EDE7DA] px-5 py-4">
        <div className="flex items-center gap-3 rounded-full border border-[#DDD5CA] bg-[#F3EFE6] px-4 py-2.5">
          <span className="truncate text-sm text-[#A79F91]">{t.chatInput}</span>
          <span className="ml-auto flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#D10E63]" aria-hidden="true">
            <Check className="h-4 w-4 text-[#FBF9F3]" strokeWidth={3} />
          </span>
        </div>
      </div>
    </div>
  )
}

export function WorkstationMockup({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = mockCopy[lang]
  return (
    <div className="w-full overflow-hidden rounded-3xl border border-[#DDD5CA] bg-[#FBF9F3] shadow-[0_24px_60px_rgba(28,26,23,0.12)]">
      <div className="flex items-center justify-between border-b border-[#E6DFD1] bg-[#F3EFE6] px-5 py-3.5">
        <div className="flex items-center gap-3">
          <WindowDots />
          <p className="text-xs font-bold text-[#1C1A17]">{t.wsTitle}</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D10E63]/10 px-2.5 py-1 text-[10px] font-bold text-[#D10E63]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#D10E63]" />
          {t.wsBadge}
        </span>
      </div>

      <div className="grid gap-px bg-[#EDE7DA] md:grid-cols-2">
        {/* Inbox */}
        <div className="bg-[#FBF9F3] p-5">
          <div className="flex items-center gap-2 text-[#857C6E]">
            <Inbox className="h-4 w-4" />
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em]">{t.wsInbox}</p>
          </div>
          <div className="mt-4 flex flex-col gap-2.5">
            {t.wsEmails.map((email) => (
              <div key={email.subject} className="rounded-xl border border-[#EDE7DA] bg-[#F3EFE6] p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-xs font-bold text-[#1C1A17]">{email.from}</p>
                  <span className="shrink-0 rounded-full bg-[#D10E63]/10 px-2 py-0.5 text-[9px] font-bold text-[#D10E63]">{email.tag}</span>
                </div>
                <p className="mt-1 truncate text-xs text-[#6B6560]">{email.subject}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Agenda */}
        <div className="bg-[#FBF9F3] p-5">
          <div className="flex items-center gap-2 text-[#857C6E]">
            <CalendarDays className="h-4 w-4" />
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em]">{t.wsAgenda}</p>
          </div>
          <div className="mt-4 flex flex-col gap-2.5">
            {t.wsEvents.map((event) => (
              <div key={event.label} className="flex items-center gap-3 rounded-xl border border-[#EDE7DA] bg-[#F3EFE6] p-3">
                <span className="shrink-0 font-mono text-xs font-bold text-[#D10E63]">{event.time}</span>
                <p className="truncate text-xs text-[#1C1A17]">{event.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission */}
      <div className="border-t border-[#EDE7DA] p-5">
        <div className="flex items-center gap-2 text-[#857C6E]">
          <Target className="h-4 w-4" />
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em]">{t.wsMissions}</p>
        </div>
        <div className="mt-4 rounded-xl border border-[#EDE7DA] bg-[#F3EFE6] p-4">
          <div className="flex items-center justify-between gap-2">
            <p className="truncate text-xs font-bold text-[#1C1A17]">{t.wsMissionLabel}</p>
            <span className="shrink-0 font-mono text-xs font-bold text-[#D10E63]">{t.wsMissionProgress}</span>
          </div>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[#DDD5CA]">
            <motion.span
              className="block h-full rounded-full bg-[#D10E63]"
              initial={{ width: 0 }}
              whileInView={{ width: '76%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 border-t border-[#EDE7DA] bg-[#F3EFE6] px-5 py-3 text-[#857C6E]">
        <Mail className="h-4 w-4" />
        <CalendarDays className="h-4 w-4" />
        <Phone className="h-4 w-4" />
        <Target className="h-4 w-4" />
        <span className="ml-auto font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#A79F91]">3 000+ apps</span>
      </div>
    </div>
  )
}

export function OrgChartMockup({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = mockCopy[lang]
  return (
    <div className="w-full overflow-hidden rounded-3xl border border-[#DDD5CA] bg-[#FBF9F3] shadow-[0_30px_80px_rgba(28,26,23,0.14)]">
      <div className="flex items-center justify-between border-b border-[#E6DFD1] bg-[#F3EFE6] px-5 py-3.5">
        <div className="flex items-center gap-3">
          <WindowDots />
          <p className="text-xs font-bold text-[#1C1A17]">{t.orgApp}</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D10E63]/10 px-2.5 py-1 text-[10px] font-bold text-[#D10E63]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#D10E63]" />
          {t.orgFooter}
        </span>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-2 px-4 pb-2 pt-5 sm:gap-x-3 sm:px-6">
        <p className="flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#857C6E]">
          <UsersRound className="h-3.5 w-3.5" />
          {t.orgHuman}
        </p>
        <span aria-hidden="true" />
        <p className="flex items-center justify-end gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#D10E63]">
          <Bot className="h-3.5 w-3.5" />
          {t.orgAi}
        </p>
      </div>

      <div className="flex flex-col gap-3 px-4 pb-6 pt-2 sm:px-6">
        {t.orgPairs.map((pair, index) => (
          <motion.div
            key={pair.employee}
            className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-2 sm:gap-x-3"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease, delay: index * 0.12 }}
          >
            <div className="flex min-w-0 items-center gap-2.5 rounded-2xl border border-[#E6DFD1] bg-[#F3EFE6] p-2.5 sm:gap-3 sm:p-3">
              <img src={pair.human || "/placeholder.svg"} alt="" className="h-9 w-9 shrink-0 rounded-full object-cover grayscale-[25%]" />
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-[#1C1A17]">{pair.employee}</p>
                <p className="truncate text-[11px] text-[#857C6E]">{pair.role}</p>
              </div>
            </div>

            <div className="flex items-center" aria-hidden="true">
              <span className="h-px w-2 bg-[#D10E63]/40 sm:w-4" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#D10E63]" />
              <span className="h-px w-2 bg-[#D10E63]/40 sm:w-4" />
            </div>

            <div className="flex min-w-0 items-center gap-2.5 rounded-2xl border border-[#D10E63]/25 bg-[#D10E63]/[0.06] p-2.5 sm:gap-3 sm:p-3">
              <div className="relative shrink-0">
                <img src={pair.aiAvatar || "/placeholder.svg"} alt="" className="h-9 w-9 rounded-full object-cover ring-2 ring-[#D10E63]/25" />
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#FBF9F3] bg-[#D10E63]" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-[#1C1A17]">{pair.ai}</p>
                <p className="truncate text-[11px] font-medium text-[#D10E63]">{t.orgAi}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
