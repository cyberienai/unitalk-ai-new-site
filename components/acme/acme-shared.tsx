'use client'

import { Lock } from 'lucide-react'
import { useT } from '@/lib/language-context'

export function Monogram({
  name,
  color,
  size = 'md',
}: {
  name: string
  color: string
  size?: 'sm' | 'md' | 'lg'
}) {
  const initial = name.trim().charAt(0).toUpperCase()
  const dims =
    size === 'lg' ? 'h-28 w-28 text-4xl' : size === 'sm' ? 'h-9 w-9 text-xs' : 'h-12 w-12 text-base'
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-sf font-semibold text-[#FBF9F3] ${dims}`}
      style={{ backgroundColor: color }}
    >
      {initial}
    </span>
  )
}

export function InternalBanner() {
  const t = useT({
    fr: { label: "Connecté en tant que membre d'Acme — vue interne" },
    en: { label: 'Signed in as an Acme member — internal view' },
  })
  return (
    <div className="flex items-center justify-center gap-2 bg-[#2A3B2E] px-4 py-2.5 text-center font-mono text-xs font-semibold tracking-[0.02em] text-[#E7E0D5]">
      <Lock className="h-3.5 w-3.5 text-[#C9A24B]" />
      {t.label}
    </div>
  )
}

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="flex items-center gap-2 font-mono text-sm text-[#857C6E]" aria-label="Breadcrumb">
      {items.map((item, i) => (
        <span key={item.label} className="flex items-center gap-2">
          {i > 0 && <span className="text-[#BDB5A9]">/</span>}
          {item.href ? (
            <a href={item.href} className="underline-offset-2 transition-colors hover:text-[#D10E63] hover:underline">
              {item.label}
            </a>
          ) : (
            <span className="text-[#4E483F]">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
