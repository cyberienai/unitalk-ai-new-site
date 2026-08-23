import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { DesktopContent } from '@/components/desktop-content'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Unitalk Desktop: your human-AI team on your computer',
  description: 'Access the Unitalk AI distribution from macOS, Windows or Linux. Assign missions, follow the work and approve sensitive actions.',
  alternates: { canonical: '/en/desktop', languages: { fr: '/desktop', en: '/en/desktop', 'x-default': '/desktop' } },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    alternateLocale: ['fr_FR'],
    url: 'https://unitalk.ai/en/desktop',
    title: 'Unitalk Desktop | Unitalk AI',
    description: 'The local workstation for your human-AI team.',
  },
}

export default function EnglishDesktopPage() {
  return <><Navbar/><DesktopContent/><SiteFooter/></>
}
