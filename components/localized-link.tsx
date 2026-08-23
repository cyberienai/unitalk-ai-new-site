'use client'

import Link from 'next/link'
import type { ComponentProps } from 'react'
import { useLanguage } from '@/lib/language-context'
import { localizePublicHref } from '@/lib/i18n-routing'

export function LocalizedLink({ href, ...props }: ComponentProps<typeof Link>) {
  const { lang } = useLanguage()
  const localized = typeof href === 'string' ? localizePublicHref(href, lang) : href
  return <Link href={localized} {...props}/>
}
