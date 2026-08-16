const PERSONAL_EMAIL_DOMAINS = new Set([
  'gmail.com',
  'googlemail.com',
  'outlook.com',
  'hotmail.com',
  'live.com',
  'msn.com',
  'yahoo.com',
  'yahoo.fr',
  'icloud.com',
  'me.com',
  'mac.com',
  'aol.com',
  'proton.me',
  'protonmail.com',
  'orange.fr',
  'free.fr',
  'laposte.net',
  'sfr.fr',
])

export function emailDomain(email: string): string {
  return email.trim().toLowerCase().split('@').at(-1) ?? ''
}

export function isProfessionalEmail(email: string): boolean {
  const domain = emailDomain(email)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) && Boolean(domain) && !PERSONAL_EMAIL_DOMAINS.has(domain)
}
