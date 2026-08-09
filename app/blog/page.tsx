import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { BlogIndexContent } from '@/components/blog-index-content'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Les idées, les méthodes et la doctrine qui redéfinissent le travail avec des Collaborateurs IA. Découvrez les premiers articles du blog Unitalk.',
}

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <BlogIndexContent />
      <SiteFooter />
    </>
  )
}
