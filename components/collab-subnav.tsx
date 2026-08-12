'use client'

import { useLanguage } from '@/lib/language-context'
import { COLLAB_NAV_LINKS } from '@/lib/collaborators-nav'

export function CollabSubNav({ active, dark = false }: { active: string; dark?: boolean }) {
  const { lang } = useLanguage()

  return (
    <nav
      className={
        dark
          ? 'z-30 border-b border-[#2C2822] bg-[#151310]/90 backdrop-blur-md md:sticky md:top-[var(--main-header-height)]'
          : 'z-30 border-b border-[#DDD5CA] bg-[#F3EFE6]/90 backdrop-blur-md md:sticky md:top-[var(--main-header-height)]'
      }
    >
      <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-5 py-3 sm:px-6 lg:px-8 scrollbar-hide">
        {COLLAB_NAV_LINKS.map((link) => {
          const isActive = link.href === active
          const cls = dark
            ? isActive
              ? 'bg-[#FBF9F3] text-[#151310]'
              : 'text-[#9A9384] hover:bg-[#2C2822] hover:text-[#FBF9F3]'
            : isActive
              ? 'bg-[#1C1A17] text-[#FBF9F3]'
              : 'text-[#6B6560] hover:bg-[#EAE3D4] hover:text-[#1C1A17]'
          return (
            <a
              key={link.href}
              href={link.href}
              className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${cls}`}
            >
              {link[lang]}
            </a>
          )
        })}
      </div>
    </nav>
  )
}
