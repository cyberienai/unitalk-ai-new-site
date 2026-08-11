'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/lib/language-context'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { BlogArticle, BlogBlock } from '@/lib/blog-articles'
import { BLOG_ARTICLES } from '@/lib/blog-articles'

const UI = {
  fr: { back: 'Tous les articles', more: 'À lire ensuite', read: 'Lire l’article', cta: 'Confier une mission' },
  en: { back: 'All articles', more: 'Read next', read: 'Read the article', cta: 'Hand over a mission' },
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case 'h2':
      return (
        <h2 className="mt-12 text-balance font-sf text-2xl font-semibold leading-tight tracking-[-0.02em] text-[#1C1A17]">
          {block.text}
        </h2>
      )
    case 'h3':
      return <h3 className="mt-8 font-sf text-xl font-semibold text-[#1C1A17]">{block.text}</h3>
    case 'p':
      return <p className="mt-5 text-pretty text-[17px] leading-[1.75] text-[#3B3730]">{block.text}</p>
    case 'ul':
      return (
        <ul className="mt-5 space-y-2.5">
          {block.items.map((it) => (
            <li key={it} className="flex gap-3 text-[17px] leading-[1.7] text-[#3B3730]">
              <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#D10E63]" />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      )
    case 'ol':
      return (
        <ol className="mt-5 space-y-2.5">
          {block.items.map((it, i) => (
            <li key={it} className="flex gap-3 text-[17px] leading-[1.7] text-[#3B3730]">
              <span className="mt-0.5 font-mono text-[13px] font-bold tabular-nums text-[#B00C54]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span>{it}</span>
            </li>
          ))}
        </ol>
      )
    case 'quote':
      return (
        <blockquote className="mt-8 border-l-2 border-[#D10E63] bg-[#FBF9F3] py-4 pl-5 pr-4 text-[17px] italic leading-[1.7] text-[#1C1A17]">
          {block.text}
        </blockquote>
      )
    default:
      return null
  }
}

export function BlogArticleContent({ article }: { article: BlogArticle }) {
  const { lang } = useLanguage()
  const ui = UI[lang]
  const body = article.body[lang]
  const others = BLOG_ARTICLES.filter((a) => a.slug !== article.slug)

  return (
    <main className="bg-[#F4F1EA]">
      <article className="px-6 pb-24 pt-28 sm:pt-32">
        <div className="mx-auto max-w-2xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 font-mono text-[12px] font-bold uppercase tracking-[0.12em] text-[#6E655A] transition-colors hover:text-[#1C1A17]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {ui.back}
          </Link>

          <div className="mt-8 flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#B00C54]">
            <span>{article.category[lang]}</span>
            <span className="text-[#C4BBA8]">/</span>
            <span className="text-[#6E655A]">{article.readingTime[lang]}</span>
            <span className="text-[#C4BBA8]">/</span>
            <span className="text-[#6E655A]">{article.date[lang]}</span>
          </div>

          <h1 className="mt-4 text-balance font-sf text-[clamp(1.9rem,4vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-[#1C1A17]">
            {article.title[lang]}
          </h1>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-[#5C554A]">{article.excerpt[lang]}</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mt-10 max-w-4xl"
        >
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-[#E4DDCE] bg-[#EFEADF]">
            <Image
              src={article.image || '/placeholder.svg'}
              alt=""
              fill
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        <div className="mx-auto mt-4 max-w-2xl">
          {body.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>
      </article>

      {/* Read next */}
      <section className="border-t border-[#E4DDCE] px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#B00C54]">{ui.more}</span>
            <span className="h-px flex-1 bg-[#E4DDCE]" />
          </div>
          <div className="mt-7 grid gap-6 sm:grid-cols-2">
            {others.map((a) => (
              <Link
                key={a.slug}
                href={`/blog/${a.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#D7CCB8] hover:shadow-[0_18px_40px_-24px_rgba(28,26,23,0.4)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#EFEADF]">
                  <Image
                    src={a.image || '/placeholder.svg'}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="font-mono text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#B00C54]">
                    {a.category[lang]}
                  </div>
                  <h3 className="mt-2 text-balance font-sf text-[17px] font-semibold leading-snug tracking-[-0.01em] text-[#1C1A17]">
                    {a.title[lang]}
                  </h3>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#A80B50]">
                    {ui.read}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
