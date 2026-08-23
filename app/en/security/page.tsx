import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { SecurityContent } from '@/components/security-content'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Security, data and human control | Unitalk',
  description: 'Learn about Unitalk’s approach to hosting, data use, application access, human approval and traceability.',
  alternates: { canonical: '/en/security', languages: { fr: '/securite', en: '/en/security', 'x-default': '/securite' } },
}

export default function SecurityPage() {
  return <><Navbar/><SecurityContent/><SiteFooter/></>
}
