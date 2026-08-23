'use client'

import { createContext, useContext, useEffect, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'

export type Lang = 'fr' | 'en'

type LanguageContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

const STORAGE_KEY = 'unitalk-lang'

export function LanguageProvider({ children, initialLang = 'fr', loadStoredLanguage = true }: { children: ReactNode; initialLang?: Lang; loadStoredLanguage?: boolean }) {
  const pathname = usePathname()
  const routeLang: Lang = pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'fr'
  const lang = routeLang
  void initialLang
  void loadStoredLanguage

  // Keep <html lang> in sync
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = (next: Lang) => {
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
