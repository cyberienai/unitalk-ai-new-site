const INTEGRATIONS = [
  { name: 'Gmail', slug: 'gmail' },
  { name: 'Notion', slug: 'notion' },
  { name: 'Stripe', slug: 'stripe' },
  { name: 'HubSpot', slug: 'hubspot' },
  { name: 'Zapier', slug: 'zapier' },
  { name: 'Google Calendar', slug: 'google-calendar' },
  { name: 'WhatsApp', slug: 'whatsapp' },
  { name: 'Telegram', slug: 'telegram' },
  { name: 'Discord', slug: 'discord' },
  { name: 'Zoom', slug: 'zoom' },
  { name: 'Google Drive', slug: 'google-drive' },
  { name: 'Dropbox', slug: 'dropbox' },
  { name: 'Airtable', slug: 'airtable' },
  { name: 'Mailchimp', slug: 'mailchimp' },
  { name: 'Shopify', slug: 'shopify' },
  { name: 'Linear', slug: 'linear' },
  { name: 'Trello', slug: 'trello' },
  { name: 'Asana', slug: 'asana' },
]

const iconUrl = (slug: string) => `https://thesvg.org/icons/${slug}/mono.svg`

function LogoTrack() {
  return (
    <ul className="flex shrink-0 items-center gap-x-12 sm:gap-x-16 pr-12 sm:pr-16" aria-hidden="true">
      {INTEGRATIONS.map((app) => (
        <li key={app.slug} className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={iconUrl(app.slug) || "/placeholder.svg"}
            alt={app.name}
            width={28}
            height={28}
            loading="lazy"
            className="h-6 w-auto opacity-45 transition-opacity duration-300 hover:opacity-90 sm:h-7"
          />
        </li>
      ))}
    </ul>
  )
}

export function IntegrationsMarquee() {
  return (
    <section
      aria-label="Intégrations disponibles"
      className="border-y border-[#DcD4C4] bg-[#FBF9F3] py-10 sm:py-14"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.24em] text-[#857C6E]">
          Déjà connecté à vos outils — et à 3&nbsp;000 autres
        </p>
      </div>

      <div className="marquee-mask relative mt-8 flex overflow-hidden">
        <div className="flex animate-marquee">
          <LogoTrack />
          <LogoTrack />
        </div>
      </div>
    </section>
  )
}
