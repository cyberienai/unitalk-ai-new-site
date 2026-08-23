import type { Metadata } from 'next'
import { HomeNew } from '@/components/home-new'

export const metadata: Metadata = {
  title: 'Your own AI Collaborator, ready to carry out your missions',
  description: 'Alma personalizes your AI Collaborator around your needs, tools and company rules.',
  alternates: {
    canonical: '/en',
    languages: { fr: '/', en: '/en', 'x-default': '/' },
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    alternateLocale: ['fr_FR'],
    url: 'https://unitalk.ai/en',
    title: 'Your own AI Collaborator, ready to carry out your missions',
    description: 'Alma personalizes it around your needs, tools and company rules.',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Unitalk, your AI Collaborator for business' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your own AI Collaborator, ready to carry out your missions',
    description: 'Alma personalizes it around your needs, tools and company rules.',
    images: ['/twitter-image'],
  },
}

export default function EnglishHomePage() {
  return <HomeNew lang="en" />
}
