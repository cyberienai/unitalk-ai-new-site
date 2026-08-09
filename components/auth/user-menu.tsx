'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { signOut } from '@/app/actions/auth'
import { initials, readClientSession, type MockSession } from '@/lib/mock-auth'

const COPY = {
  fr: { signIn: 'Connexion', workspace: 'Workspace', account: 'Compte', signOut: 'Se déconnecter' },
  en: { signIn: 'Sign in', workspace: 'Workspace', account: 'Account', signOut: 'Sign out' },
} as const

/** Desktop: Connexion link when logged out, avatar dropdown when logged in. */
export function UserMenuDesktop({ overDark }: { overDark: boolean }) {
  const { lang } = useLanguage()
  const t = COPY[lang]
  const [session, setSession] = useState<MockSession | null>(null)
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    setSession(readClientSession())
  }, [])

  useEffect(() => {
    if (!open) return
    function onDoc(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open])

  const signInClass = `hidden rounded-md px-2 py-2 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#D10E63]/40 lg:inline-flex ${
    overDark ? 'text-[#D7D0C4] hover:text-[#FBF9F3]' : 'text-[#857C6E] hover:text-[#1C1A17]'
  }`

  // Before mount (and when logged out) render the sign-in link — matches SSR output.
  if (!mounted || !session) {
    return (
      <a href="/connexion" className={signInClass}>
        {t.signIn}
      </a>
    )
  }

  return (
    <div ref={wrapRef} className="relative hidden lg:block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#D10E63]/40"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D10E63] text-[12px] font-bold text-[#FBF9F3]">
          {initials(session.name)}
        </span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''} ${overDark ? 'text-[#D7D0C4]' : 'text-[#857C6E]'}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+0.5rem)] w-64 overflow-hidden rounded-2xl border border-[#E7E0D2] bg-[#FBF9F3] shadow-[0_12px_40px_-12px_rgba(28,26,23,0.28)]"
        >
          <div className="flex items-center gap-3 border-b border-[#EFE9DC] px-4 py-3.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D10E63] text-[13px] font-bold text-[#FBF9F3]">
              {initials(session.name)}
            </span>
            <div className="min-w-0">
              <p className="truncate text-[14px] font-semibold text-[#1C1A17]">{session.name}</p>
              <p className="truncate text-[12.5px] text-[#6B6560]">{session.email}</p>
            </div>
          </div>
          <div className="p-1.5">
            <a
              href="/workspace"
              role="menuitem"
              className="flex items-center rounded-lg px-3 py-2 text-[14px] font-medium text-[#4E483F] transition-colors hover:bg-[#F0EADD] hover:text-[#1C1A17]"
            >
              {t.workspace}
            </a>
            <form action={signOut}>
              <button
                type="submit"
                role="menuitem"
                className="flex w-full items-center rounded-lg px-3 py-2 text-left text-[14px] font-medium text-[#B00C54] transition-colors hover:bg-[#F7E7EF]"
              >
                {t.signOut}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

/** Mobile: a sign-in row when logged out, or account block + sign-out when logged in. */
export function UserMenuMobile({ onNavigate }: { onNavigate: () => void }) {
  const { lang } = useLanguage()
  const t = COPY[lang]
  const [session, setSession] = useState<MockSession | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setSession(readClientSession())
  }, [])

  if (!mounted || !session) {
    return (
      <a
        href="/connexion"
        onClick={onNavigate}
        className="flex min-h-11 items-center text-[15px] font-semibold text-[#1C1A17] transition-colors hover:text-[#D10E63]"
      >
        {t.signIn}
      </a>
    )
  }

  return (
    <div className="flex min-h-11 items-center justify-between gap-3 py-1">
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D10E63] text-[12px] font-bold text-[#FBF9F3]">
          {initials(session.name)}
        </span>
        <div className="min-w-0">
          <p className="truncate text-[14px] font-semibold text-[#1C1A17]">{session.name}</p>
          <p className="truncate text-[12px] text-[#6B6560]">{session.email}</p>
        </div>
      </div>
      <form action={signOut}>
        <button
          type="submit"
          className="shrink-0 text-[13px] font-semibold text-[#B00C54] transition-colors hover:text-[#8A0A41]"
        >
          {t.signOut}
        </button>
      </form>
    </div>
  )
}
