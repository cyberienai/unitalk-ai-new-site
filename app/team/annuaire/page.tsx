import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { AcmeDirectory } from '@/components/acme/acme-directory'

export const metadata: Metadata = {
  title: 'Annuaire Acme · Démo Unitalk',
  description: 'Découvrez comment Unitalk fait cohabiter les membres d’une équipe et leurs Collaborateurs IA dans une entreprise.',
}

export default function AcmeDirectoryPage() {
  return (
    <>
      <Navbar />
      <AcmeDirectory />
      <SiteFooter />
    </>
  )
}
