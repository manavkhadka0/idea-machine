import { comboCount } from '#/components/idea-spinner/word-banks'

export const siteName = 'Idea Machine'

export const siteDescription = `Spin a platform, a product, and a niche — ${comboCount.toLocaleString()} combinations. Lock the idea, then build it.`

export const defaultTitle = 'Idea Machine — Spin a platform, product, and niche'

const OG_IMAGE_PATH = '/og.png'
const OG_IMAGE_WIDTH = '1200'
const OG_IMAGE_HEIGHT = '630'
const OG_IMAGE_ALT = 'Idea Machine — Spin. Lock. Build.'

/** Production: set VITE_SITE_URL with no trailing slash. Dev falls back to local. */
export function siteOrigin() {
  const raw = import.meta.env.VITE_SITE_URL as string | undefined
  if (raw) return raw.replace(/\/$/, '')
  if (import.meta.env.DEV) return 'http://localhost:3002'
  return ''
}

type HeadMeta = {
  title?: string
  name?: string
  property?: string
  content?: string
  charSet?: string
}

export function pageHead({
  title,
  description,
  path = '/',
}: {
  title: string
  description: string
  path?: string
}) {
  const origin = siteOrigin()
  const canonical = origin ? `${origin}${path}` : path
  const image = origin ? `${origin}${OG_IMAGE_PATH}` : OG_IMAGE_PATH

  const meta: HeadMeta[] = [
    { title },
    { name: 'description', content: description },
    { name: 'robots', content: 'index, follow' },
    { name: 'theme-color', content: '#2a1614' },
    { name: 'color-scheme', content: 'dark' },
    { name: 'application-name', content: siteName },
    { name: 'apple-mobile-web-app-title', content: siteName },
    { property: 'og:site_name', content: siteName },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'en_US' },
    { property: 'og:url', content: canonical },
    { property: 'og:image', content: image },
    { property: 'og:image:url', content: image },
    { property: 'og:image:type', content: 'image/png' },
    { property: 'og:image:width', content: OG_IMAGE_WIDTH },
    { property: 'og:image:height', content: OG_IMAGE_HEIGHT },
    { property: 'og:image:alt', content: OG_IMAGE_ALT },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:url', content: canonical },
    { name: 'twitter:image', content: image },
    { name: 'twitter:image:alt', content: OG_IMAGE_ALT },
  ]

  return {
    meta,
    links: [
      { rel: 'canonical' as const, href: canonical },
      { rel: 'icon' as const, href: '/favicon.svg', type: 'image/svg+xml' },
    ],
  }
}

export function webAppJsonLd() {
  const origin = siteOrigin()
  const image = origin ? `${origin}${OG_IMAGE_PATH}` : OG_IMAGE_PATH

  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: siteName,
    description: siteDescription,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    image,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    ...(origin ? { url: origin } : {}),
  }
}
