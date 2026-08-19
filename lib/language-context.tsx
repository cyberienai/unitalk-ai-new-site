'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type Lang = 'fr' | 'en'

type LanguageContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

const STORAGE_KEY = 'unitalk-lang'

export function LanguageProvider({ children, initialLang = 'fr', loadStoredLanguage = true }: { children: ReactNode; initialLang?: Lang; loadStoredLanguage?: boolean }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  // Load persisted language on mount
  useEffect(() => {
    if (!loadStoredLanguage) return
    let frame = 0
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Lang | null
      if (stored === 'fr' || stored === 'en') {
        frame = requestAnimationFrame(() => setLangState(stored))
      }
    } catch {
      // ignore
    }
    return () => cancelAnimationFrame(frame)
  }, [loadStoredLanguage])

  // Keep <html lang> in sync
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = (next: Lang) => {
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // ignore
    }
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return ctx
}

/**
 * Helper to pick the value for the current language from a
 * `{ fr, en }` translation object.
 */
export function useT<T>(dict: { fr: T; en: T }): T {
  const { lang } = useLanguage()
  return dict[lang]
}
