import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { BlogArticleContent } from '@/components/blog-article-content'
import { ProspectsGuideContent } from '@/components/prospects-guide-content'
import { EmailGuideContent, EMAIL_GUIDE_FAQ } from '@/components/email-guide-content'
import { BLOG_ARTICLES, getBlogArticle } from '@/lib/blog-articles'

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
  const faqItems = article.specializedLayout === 'email-guide' ? EMAIL_GUIDE_FAQ : article.specializedLayout === 'prospects-guide' ? [
      ['Comment le Collaborateur IA qualifie-t-il un prospect ?', 'Il applique les critères définis par l’entreprise, consulte les sources autorisées et explique pourquoi chaque prospect est retenu.'],
      ['Comment le score est-il calculé ?', 'Selon les critères et les pondérations définis par l’entreprise, avec une explication et un niveau de confiance.'],
      ['Peut-on exporter la sélection ?', 'Après validation, vers le CRM autorisé, Microsoft Excel, Google Sheets ou CSV selon les droits configurés.'],
      ['Peut-il contacter automatiquement les prospects ?', 'Seulement si l’entreprise l’autorise. Les étapes peuvent être soumises à des niveaux de validation différents.'],
      ['Que devient l’expérience après la mission ?', 'Les corrections validées peuvent enrichir les compétences et le profil métier mobilisés.'],
    ] : null
  const faqJsonLd = faqItems ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })),
  } : null

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}
      <Navbar />
      {article.specializedLayout === 'prospects-guide' ? <ProspectsGuideContent /> : article.specializedLayout === 'email-guide' ? <EmailGuideContent /> : <BlogArticleContent article={article} />}
      <SiteFooter />
    </>
  )
}
