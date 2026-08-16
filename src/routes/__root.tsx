import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import appCss from '../styles.css?url'
import {
  defaultTitle,
  pageHead,
  siteDescription,
  webAppJsonLd,
} from '#/lib/seo'

export const Route = createRootRoute({
  head: () => {
    const page = pageHead({
      title: defaultTitle,
      description: siteDescription,
      path: '/',
    })

    return {
      meta: [
        { charSet: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        ...page.meta,
      ],
      links: [
        ...page.links,
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossOrigin: 'anonymous',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Black+Ops+One&family=Space+Grotesk:wght@400;500;700&display=swap',
        },
        { rel: 'stylesheet', href: appCss },
      ],
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(webAppJsonLd()),
        },
      ],
    }
  },
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="brutal">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        {import.meta.env.DEV ? (
          <TanStackDevtools
            config={{
              position: 'bottom-right',
            }}
            plugins={[
              {
                name: 'Tanstack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
            ]}
          />
        ) : null}
        <Scripts />
      </body>
    </html>
  )
}
