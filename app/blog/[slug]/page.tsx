import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { BlogArticleContent } from '@/components/blog-article-content'
import { BLOG_ARTICLES, getBlogArticle } from '@/lib/blog-articles'

export function generateStaticParams() {
  return BLOG_ARTICLES.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = getBlogArticle(slug)
  if (!article) return { title: 'Article' }
  return {
    title: article.title.fr,
    description: article.excerpt.fr,
    openGraph: {
      title: article.title.fr,
      description: article.excerpt.fr,
      images: [{ url: article.image }],
      type: 'article',
    },
  }
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = getBlogArticle(slug)
  if (!article) notFound()

  return (
    <>
      <Navbar />
      <BlogArticleContent article={article} />
      <SiteFooter />
    </>
  )
}
