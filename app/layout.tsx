import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Playfair_Display } from 'next/font/google'
import { LanguageProvider } from '@/lib/language-context'
import { AlmaProvider } from '@/lib/alma-context'
import { MyTeamProvider } from '@/lib/my-team-context'
import { FloatingAlmaWidget } from '@/components/floating-alma-widget'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})
const playfairDisplay = Playfair_Display({ 
  variable: '--font-playfair-display', 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const SITE_URL = 'https://unitalk.ai'
const SITE_NAME = 'Unitalk'
const DEFAULT_TITLE = 'Unitalk : des Collaborateurs IA qui progressent avec votre entreprise'
const DEFAULT_DESCRIPTION =
  'Unitalk crée des Collaborateurs IA qui rejoignent votre organisation, prennent vos missions et gagnent des compétences au fil du temps. Alma analyse votre activité et prépare le bon Collaborateur IA. Les savoir-faire validés restent dans votre entreprise. Hébergé en France, conforme au RGPD.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: '%s | Unitalk',
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  generator: 'v0.app',
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
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
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
    description: 'À partir de 49 €/mois. 7 jours d’essai pour votre première mission, sans carte bancaire.',
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
    <html lang="fr" className={`bg-background ${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
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
