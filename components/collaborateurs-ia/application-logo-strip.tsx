'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { siDropbox, siGmail, siGooglecalendar, siGoogledrive, siHubspot, siNotion, siStripe, siZendesk } from 'simple-icons'

type App = { name: string; icon?: typeof siGmail; logo?: string; color?: string }

const GROUPS: { key: 'communicate' | 'organize' | 'act'; apps: App[] }[] = [
  {
    key: 'communicate',
    apps: [
      { name: 'Gmail', icon: siGmail },
      { name: 'Outlook', logo: 'O', color: '#0078D4' },
      { name: 'Teams', logo: 'T', color: '#6264A7' },
      { name: 'Slack', logo: 'Slack', color: '#4A154B' },
    ],
  },
  {
    key: 'organize',
    apps: [
      { name: 'Google Calendar', icon: siGooglecalendar },
      { name: 'Notion', icon: siNotion },
      { name: 'Google Drive', icon: siGoogledrive },
      { name: 'Dropbox', icon: siDropbox },
    ],
  },
  {
    key: 'act',
    apps: [
      { name: 'HubSpot', icon: siHubspot },
      { name: 'Salesforce', logo: 'salesforce', color: '#00A1E0' },
      { name: 'Stripe', icon: siStripe },
      { name: 'Zendesk', icon: siZendesk },
    ],
  },
]

export function ApplicationLogoStrip({ lang }: { lang: 'fr' | 'en' }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const active = reduce || inView
  const t = COPY[lang]

  return (
    <div ref={ref} className="mt-12 border-t border-[#1C1A17]/15">
      <h3 className="sr-only">{t.accessibleTitle}</h3>
      {GROUPS.map((group, groupIndex) => (
        <div key={group.key} className="grid gap-6 border-b border-[#1C1A17]/15 py-8 lg:grid-cols-[2fr_10fr] lg:items-center">
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-[10px] text-[#8A8175]">0{groupIndex + 1}</span>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#B00C54]">{t.groups[group.key]}</p>
          </div>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4">
            {group.apps.map((app, appIndex) => (
              <motion.li
                key={app.name}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={active ? { opacity: 0.72, y: 0 } : { opacity: 0, y: 8 }}
                transition={{ duration: reduce ? 0 : 0.32, delay: reduce ? 0 : groupIndex * 0.4 + appIndex * 0.07 }}
                tabIndex={0}
                aria-label={app.name}
                className="group flex min-w-0 items-center gap-3 outline-none transition-[opacity,transform] duration-150 hover:!-translate-y-0.5 hover:!opacity-100 focus-visible:!-translate-y-0.5 focus-visible:!opacity-100"
              >
                {app.icon ? (
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-8 w-8 shrink-0" fill={`#${app.icon.hex}`}><path d={app.icon.path} /></svg>
                ) : (
                  <span aria-hidden style={{ color: app.color }} className={`flex h-8 min-w-8 items-center font-sf font-bold ${app.logo && app.logo.length > 2 ? 'text-[15px] tracking-[-0.04em]' : 'text-2xl'}`}>{app.logo}</span>
                )}
                <span className="text-[12px] font-semibold leading-tight text-[#4E483F] group-hover:text-[#1C1A17] group-focus-visible:text-[#1C1A17]">{app.name}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

const COPY = {
  fr: { accessibleTitle: 'Applications accessibles à un Collaborateur IA', groups: { communicate: 'Communiquer', organize: 'Organiser', act: 'Agir' } },
  en: { accessibleTitle: 'Applications available to an AI Collaborator', groups: { communicate: 'Communicate', organize: 'Organize', act: 'Act' } },
} as const
