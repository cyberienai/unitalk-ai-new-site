import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { LanguageProvider } from '@/lib/language-context'
import { AlmaProvider } from '@/lib/alma-context'
import { MyTeamProvider } from '@/lib/my-team-context'
import { FloatingAlmaWidget } from '@/components/floating-alma-widget'
import './globals.css'

const SITE_URL = 'https://unitalk.ai'
const SITE_NAME = 'Unitalk'
const DEFAULT_TITLE = 'Unitalk : des Collaborateurs IA qui progressent avec votre entreprise'
const DEFAULT_DESCRIPTION =
  'Unitalk donne à votre entreprise son propre Collaborateur IA : une identité professionnelle qui accomplit des missions, travaille avec vos équipes et progresse à partir des méthodes que vous validez. Hébergé en France, conforme au RGPD.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: '%s | Unitalk',
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    'Collaborateur IA',
    'agent IA',
    'assistant IA',
    'IA pour entreprise',
    'automatisation',
    'Unitalk',
    'Alma',
    'workspace IA',
    'IA hébergée en France',
    'RGPD',
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: 'technology',
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ['/opengraph-image'],
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Unitalk, Collaborateurs IA pour entreprise' }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  formatDetection: { telephone: false },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

// Structured data for search engines (schema.org).
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  description: DEFAULT_DESCRIPTION,
}

const webSiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: 'fr-FR',
}

// Product-level schema so search engines can surface Unitalk as a software offering.
const softwareApplicationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: SITE_NAME,
  url: SITE_URL,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description: DEFAULT_DESCRIPTION,
  inLanguage: 'fr-FR',
  offers: {
    '@type': 'Offer',
    price: '49',
    priceCurrency: 'EUR',
    description: '49 €/mois par Collaborateur IA, hors capacité IA et licences optionnelles. 7 jours gratuits sans carte bancaire.',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: [
    { color: '#F3EFE6' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className="bg-background">
      <body className="font-sans antialiased bg-background text-foreground" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationJsonLd) }}
        />
        <LanguageProvider>
          <MyTeamProvider>
            <AlmaProvider>
              {children}
              <FloatingAlmaWidget />
            </AlmaProvider>
          </MyTeamProvider>
        </LanguageProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
