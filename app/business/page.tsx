import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { SegmentContent } from '@/components/segment-content'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Business · Unitalk AI',
  description:
    'Une infrastructure IA privée et dédiée, hébergée où vous le décidez, avec la sécurité, la conformité et l’accompagnement humain qui vont avec.',
}

export default function BusinessPage() {
  return (
    <>
      <Navbar />
      <SegmentContent segment="business" />
      <SiteFooter />
    </>
  )
}
