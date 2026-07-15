import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { CollabCompareContent } from '@/components/collab-compare-content'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Comparatif · Collaborateurs IA · Unitalk',
  description:
    "Collaborateur IA vs ChatGPT, Claude, Gemini, Microsoft Copilot, OpenAI Codex, Claude Code, Dust et Glean. Les assistants répondent, les Collaborateurs IA travaillent.",
}

export default function ComparatifPage() {
  return (
    <>
      <Navbar />
      <CollabCompareContent />
      <SiteFooter />
    </>
  )
}
