import { siDropbox, siGmail, siGooglecalendar, siGoogledrive, siHubspot, siNotion, siStripe, siZendesk } from 'simple-icons'

const applications = [
  { name: 'Gmail', icon: siGmail },
  { name: 'Microsoft Outlook', initials: 'O', color: '#0078D4' },
  { name: 'Google Calendar', icon: siGooglecalendar },
  { name: 'Microsoft Teams', initials: 'T', color: '#6264A7' },
  { name: 'Slack', initials: 'S', color: '#4A154B' },
  { name: 'HubSpot', icon: siHubspot },
  { name: 'Salesforce', initials: 'SF', color: '#00A1E0' },
  { name: 'Notion', icon: siNotion },
  { name: 'Google Drive', icon: siGoogledrive },
  { name: 'Dropbox', icon: siDropbox },
  { name: 'Stripe', icon: siStripe },
  { name: 'Zendesk', icon: siZendesk },
] as const

export function ApplicationLogoStrip() {
  return (
    <section aria-labelledby="application-logo-strip-title" className="mt-10">
      <h3 id="application-logo-strip-title" className="sr-only">Applications accessibles à un Collaborateur IA</h3>
      <ul className="grid grid-cols-2 gap-x-8 gap-y-9 sm:grid-cols-3 lg:grid-cols-6">
        {applications.map((application) => (
          <li key={application.name} className="flex min-h-20 flex-col items-center justify-center text-center">
            {'icon' in application ? (
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-8 w-8" fill={`#${application.icon.hex}`}><path d={application.icon.path} /></svg>
            ) : (
              <span aria-hidden="true" style={{ color: application.color }} className="flex h-8 min-w-8 items-center justify-center font-sf text-xl font-bold">{application.initials}</span>
            )}
            <span className="mt-3 text-xs font-semibold text-[#4E483F]">{application.name}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
