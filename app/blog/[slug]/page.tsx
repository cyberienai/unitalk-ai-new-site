import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { BlogArticleContent } from '@/components/blog-article-content'
import { MissionGuideContent } from '@/components/mission-guide-content'
import { BLOG_ARTICLES, getBlogArticle } from '@/lib/blog-articles'
import { getMission } from '@/lib/missions-catalog'

const SITE_URL = 'https://unitalk.ai'

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
  const ogImage = article.image || `/blog/${slug}/opengraph-image`
  return {
    title: article.seoTitle?.fr ?? article.title.fr,
    description: article.excerpt.fr,
    alternates: { canonical: article.canonical ?? `/blog/${slug}` },
    openGraph: {
      title: article.seoTitle?.fr ?? article.title.fr,
      description: article.excerpt.fr,
      url: `${SITE_URL}${article.canonical ?? `/blog/${slug}`}`,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: article.seoTitle?.fr ?? article.title.fr,
      description: article.excerpt.fr,
      images: [ogImage],
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

  const canonical = `${SITE_URL}${article.canonical ?? `/blog/${slug}`}`
  const published = undefined
  const image = `${SITE_URL}/blog/${slug}/opengraph-image`
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.specializedLayout === 'prospects-guide' ? 'Trouver des prospects qualifiés. Et savoir exactement pourquoi.' : article.specializedLayout === 'email-guide' ? 'Répondre aux emails clients. Sans perdre le contexte.' : article.title.fr,
    description: article.excerpt.fr,
    mainEntityOfPage: canonical,
    image,
    datePublished: published,
    dateModified: published,
    inLanguage: 'fr-FR',
    author: { '@type': 'Organization', name: 'Unitalk', url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: 'Unitalk',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon.svg` },
    },
  }
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: article.specializedLayout ? 'Missions' : 'Blog', item: `${SITE_URL}${article.specializedLayout ? '/missions' : '/blog'}` },
      { '@type': 'ListItem', position: 3, name: article.title.fr, item: canonical },
    ],
  }
  const specializedMission = article.missionSlug ? getMission(article.missionSlug) : undefined

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Navbar />
      {article.specializedLayout && specializedMission ? <MissionGuideContent mission={specializedMission} /> : <BlogArticleContent article={article} />}
      <SiteFooter />
    </>
  )
}
