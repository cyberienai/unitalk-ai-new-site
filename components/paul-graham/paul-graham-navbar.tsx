"use client"

import Link from "next/link"
import { UnitalkLogo } from "@/components/unitalk-logo"
import { LanguageToggle } from "@/components/language-toggle"

export function PaulGrahamNavbar() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-[#1C1A17]/[0.06] bg-[#F3EFE6]/90 backdrop-blur-xl"><div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8"><Link href="/" className="flex items-center gap-2.5" aria-label="Unitalk"><UnitalkLogo className="h-7 w-auto" /><span className="text-sm font-bold tracking-[-0.02em]">Unitalk</span></Link><div className="flex items-center gap-4"><Link href="/missions" className="hidden text-xs font-bold text-[#625B50] sm:block">Missions</Link><Link href="/tarifs" className="hidden text-xs font-bold text-[#625B50] sm:block">Tarifs</Link><LanguageToggle /></div></div></nav>
  )
}
