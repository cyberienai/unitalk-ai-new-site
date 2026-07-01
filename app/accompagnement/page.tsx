import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { AccompagnementContent } from '@/components/accompagnement-content'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Accompagnement · Unitalk',
  description:
    'Alma, votre conseillère IA vocale, crée votre agent et vous forme à l’orchestrer. Un ingénieur humain prend le relais quand il le faut.',
}

export default function AccompagnementPage() {
  return (
    <>
      <Navbar />
      <AccompagnementContent />
      <SiteFooter />
    </>
  )
}
