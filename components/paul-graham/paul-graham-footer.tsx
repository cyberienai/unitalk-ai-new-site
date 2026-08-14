"use client"

import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

export function PaulGrahamFooter() {
  const { lang } = useLanguage()

  return (
    <footer className="border-t border-[#D8D0C2] px-5 py-8 text-center">
      <p className="text-xs text-[#A79E8E]">
        Unitalk · Paris, France ·{" "}
        <a href="mailto:hello@unitalk.ai" className="underline hover:text-[#4E483F]">hello@unitalk.ai</a>
      </p>
      <p className="mt-2 text-xs text-[#A79E8E]">
        <Link href="/tarifs" className="hover:text-[#4E483F]">{lang === 'fr' ? 'Tarifs' : 'Pricing'}</Link>
        {" · "}
        <Link href="/leaders" className="hover:text-[#4E483F]">{lang === 'fr' ? 'Architectes IA' : 'AI Architects'}</Link>
        {" · "}
        <Link href="/missions" className="hover:text-[#4E483F]">{lang === 'fr' ? 'Missions' : 'Missions'}</Link>
        {" · "}
        <Link href="/mentions-legales" className="hover:text-[#4E483F]">{lang === 'fr' ? 'Mentions légales' : 'Legal'}</Link>
      </p>
    </footer>
  )
}