import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { ConfierContent } from '@/components/confier-content'

export const metadata: Metadata = {
  title: 'Confier une Mission · Unitalk',
  description: 'Confiez votre Mission à un Collaborateur IA : précisez l’essentiel, gardez la main sur les validations et ouvrez votre Workspace.',
  robots: { index: false, follow: true },
}

export default function ConfierPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div className="min-h-[70vh]" />}>
        <ConfierContent />
      </Suspense>
      <SiteFooter />
    </>
  )
}
