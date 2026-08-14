"use client"

import Link from "next/link"
import { UnitalkLogo } from "@/components/unitalk-logo"
import { LanguageToggle } from "@/components/language-toggle"

export function PaulGrahamNavbar() {
  return (
    <nav className="fixed top-0 z-50 flex w-full items-center justify-between px-6 py-4">
      <Link href="/" className="shrink-0" aria-label="Unitalk">
        <UnitalkLogo className="h-7 w-auto" />
      </Link>
      <LanguageToggle />
    </nav>
  )
}