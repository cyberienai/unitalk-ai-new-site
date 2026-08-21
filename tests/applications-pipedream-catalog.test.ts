import { describe, expect, it } from 'vitest'
import { APP_CATEGORY_LABELS, STORE_ITEMS } from '@/lib/store-catalog'

describe('applications catalog inspired by Pipedream Explore', () => {
  it('includes the curated popular applications with original descriptions', () => {
    const apps = new Map(STORE_ITEMS.filter(item => item.type === 'application' || item.type === 'integration').map(item => [item.slug, item]))
    for (const slug of ['notion', 'google-sheets', 'slack', 'linear', 'gmail', 'google-drive', 'google-agenda', 'supabase', 'mysql', 'postgresql', 'aws', 'twilio-sendgrid', 'amazon-ses', 'klaviyo', 'zendesk', 'microsoft-teams', 'salesforce', 'hubspot']) {
      expect(apps.get(slug)?.description.fr).toBeTruthy()
    }
  })

  it('provides the imported application categories', () => {
    for (const category of ['communication', 'crm', 'databases', 'file-storage', 'helpdesk-support', 'infrastructure-cloud', 'marketing', 'productivite']) {
      expect(APP_CATEGORY_LABELS[category]).toBeTruthy()
    }
  })

  it('keeps the curated Pipedream popularity order in the marketplace source', async () => {
    const source = await import('node:fs/promises').then(fs => fs.readFile(new URL('../components/unitalk-store-hub.tsx', import.meta.url), 'utf8'))
    expect(source).toContain("const PIPEDREAM_APPLICATION_ORDER = ['notion', 'google-sheets', 'slack', 'linear', 'gmail', 'google-drive', 'google-agenda', 'supabase', 'mysql', 'postgresql', 'aws', 'twilio-sendgrid', 'amazon-ses', 'klaviyo', 'zendesk', 'microsoft-teams', 'salesforce', 'hubspot']")
    expect(source).toContain('PIPEDREAM_APPLICATION_RANK.get(a.slug)')
    expect(source).toContain('APPLICATION_CATEGORY_OVERRIDES[item.slug]')
    expect(source).toContain('assets.pipedream.net/s.v0/${item.logoId}/logo/96')
  })
})
