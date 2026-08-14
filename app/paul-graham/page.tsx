"use client"

import { PaulGrahamNavbar } from "@/components/paul-graham/paul-graham-navbar"
import { PaulGrahamHero } from "@/components/paul-graham/paul-graham-hero"
import { PaulGrahamFooter } from "@/components/paul-graham/paul-graham-footer"

export default function PaulGrahamPage() {
  return (
    <div className="min-h-screen bg-[#F3EFE6] text-[#1C1A17]">
      <PaulGrahamNavbar />
      <main>
        <PaulGrahamHero />
        <PaulGrahamFooter />
      </main>
    </div>
  )
}