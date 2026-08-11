import { notFound, redirect } from 'next/navigation'

function getUnitalkAppUrl(): string | null {
  const configured = process.env.NEXT_PUBLIC_UNITALK_APP_URL?.trim()
  if (!configured) return null

  let url: URL
  try {
    url = new URL(configured)
  } catch {
    throw new Error('NEXT_PUBLIC_UNITALK_APP_URL must be a valid absolute URL.')
  }

  if (url.protocol !== 'https:' || url.username || url.password) {
    throw new Error('NEXT_PUBLIC_UNITALK_APP_URL must use HTTPS and must not contain credentials.')
  }

  return url.toString()
}

export default function WorkspaceRedirect() {
  const appUrl = getUnitalkAppUrl()
  if (appUrl) redirect(appUrl)

  if (process.env.NODE_ENV !== 'production') {
    throw new Error(
      'NEXT_PUBLIC_UNITALK_APP_URL is required. The public site does not provide a local Workspace.',
    )
  }

  notFound()
}
