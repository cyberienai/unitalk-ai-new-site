'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

type Activity = { name: string; avatar: string; action: string }

const ACTIVITIES: Record<'fr' | 'en', Activity[]> = {
  fr: [
    { name: 'Emma', avatar: '/images/emma-avatar.png', action: 'prépare votre réunion' },
    { name: 'Alex', avatar: '/images/alex-avatar.png', action: 'qualifie un prospect' },
    { name: 'Sophia', avatar: '/images/sophia-avatar.png', action: 'répond à un client' },
    { name: 'Marcus', avatar: '/images/marcus-avatar.png', action: 'coordonne votre projet' },
    { name: 'Emma', avatar: '/images/emma-avatar.png', action: 'met à jour votre CRM' },
    { name: 'Alex', avatar: '/images/alex-avatar.png', action: 'rédige une proposition commerciale' },
    { name: 'Sophia', avatar: '/images/sophia-avatar.png', action: 'répond à vos emails' },
    { name: 'Marcus', avatar: '/images/marcus-avatar.png', action: 'planifie votre semaine' },
    { name: 'Emma', avatar: '/images/emma-avatar.png', action: 'prépare votre compte rendu' },
    { name: 'Alex', avatar: '/images/alex-avatar.png', action: 'trouve 12 nouveaux prospects' },
  ],
  en: [
    { name: 'Emma', avatar: '/images/emma-avatar.png', action: 'is preparing your meeting' },
    { name: 'Alex', avatar: '/images/alex-avatar.png', action: 'is qualifying a lead' },
    { name: 'Sophia', avatar: '/images/sophia-avatar.png', action: 'is answering a customer' },
    { name: 'Marcus', avatar: '/images/marcus-avatar.png', action: 'is coordinating your project' },
    { name: 'Emma', avatar: '/images/emma-avatar.png', action: 'is updating your CRM' },
    { name: 'Alex', avatar: '/images/alex-avatar.png', action: 'is drafting a sales proposal' },
    { name: 'Sophia', avatar: '/images/sophia-avatar.png', action: 'is answering your emails' },
    { name: 'Marcus', avatar: '/images/marcus-avatar.png', action: 'is planning your week' },
    { name: 'Emma', avatar: '/images/emma-avatar.png', action: 'is finishing your report' },
    { name: 'Alex', avatar: '/images/alex-avatar.png', action: 'found 12 new leads' },
  ],
}

export function HeroActivityBadge({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const reduceMotion = useReducedMotion()
  const activities = ACTIVITIES[lang]
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % activities.length)
    }, 5000)
    return () => clearInterval(id)
  }, [activities.length])

  const current = activities[index]
  const liveLabel = lang === 'fr' ? 'En activité' : 'Working now'

  return (
    <div
      className="inline-flex h-12 w-[19rem] items-center gap-3 rounded-full border border-[#EAEAEA] bg-[#FFFFFF]/90 px-3 shadow-[0_2px_10px_rgba(28,26,23,0.06)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(28,26,23,0.1)]"
      role="status"
      aria-live="polite"
      aria-label={`${current.name} ${current.action} — ${liveLabel}`}
    >
      <div className="relative shrink-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={current.avatar + index}
            src={current.avatar}
            alt=""
            className="h-9 w-9 rounded-full object-cover"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.35 }}
          />
        </AnimatePresence>
        <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22C55E] opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full border-2 border-[#FFFFFF] bg-[#22C55E]" />
        </span>
      </div>
      <div className="relative h-9 min-w-0 flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="absolute inset-0 flex flex-col justify-center"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="truncate text-[11px] font-medium leading-tight text-[#6B6560]">{current.name}</span>
            <span className="truncate text-[13px] font-bold leading-tight text-[#1C1A17]">{current.action}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
