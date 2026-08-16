// ---------------------------------------------------------------------
// WORD BANKS — this is the only file you need to touch to add more
// options. The reels, combo counter, and share URLs all derive from
// these three arrays.
//
// Contributor rules (CI enforces the mechanical ones):
// - Short. Hard cap is MAX_LABEL_LENGTH (stencil face: Black Ops One).
// - Unique inside that bank, case-insensitive.
// - No brands, no slurs, no living people.
// - No "&", "=", or "?" — they break share URLs.
// - Add next to related words. Niches stay grouped by trade.
// - Do not alphabetize this file.
//
// Headline: "Let's build a {platform} {type} for {niche}."
// See CONTRIBUTING.md.
// ---------------------------------------------------------------------

export const MAX_LABEL_LENGTH = 18

export const PLATFORMS = ['web', 'mobile', 'desktop'] as const

export const APP_TYPES = [
  'SaaS',
  'CRM',
  'POS',
  'ERP',
  'LMS',
  'chatbot',
  'AI copilot',
  'booking app',
  'waitlist',
  'queue app',
  'scheduler',
  'roster',
  'payroll',
  'invoicing',
  'quoting',
  'expenses',
  'inventory',
  'warehouse',
  'fleet tracker',
  'dispatch',
  'delivery app',
  'order tracker',
  'marketplace',
  'store',
  'subscriptions',
  'memberships',
  'loyalty app',
  'gift cards',
  'referrals',
  'reviews',
  'feedback',
  'helpdesk',
  'live chat',
  'portal',
  'dashboard',
  'analytics',
  'automation',
  'forms',
  'surveys',
  'directory',
  'listings',
  'rentals',
  'reservations',
  'digital menu',
  'kiosk app',
  'check-in',
  'attendance',
  'courses',
  'patient hub',
  'vendor hub',
  'franchise OS',
  'field app',
  'inspect app',
  'work orders',
  'asset tracker',
  'route planner',
  'shift board',
  'time clock',
] as const

export const NICHES = [
  'barbers',
  'salons',
  'spas',
  'nail shops',
  'tattoo shops',
  'gyms',
  'yoga studios',
  'crossfit boxes',
  'sports clubs',
  'cafes',
  'bakeries',
  'restaurants',
  'food trucks',
  'caterers',
  'cloud kitchens',
  'bars',
  'breweries',
  'hotels',
  'homestays',
  'hostels',
  'dentists',
  'clinics',
  'vets',
  'pharmacies',
  'physios',
  'opticians',
  'labs',
  'realtors',
  'builders',
  'architects',
  'interior shops',
  'lawyers',
  'accountants',
  'insurers',
  'agencies',
  'recruiters',
  'tutors',
  'schools',
  'daycares',
  'colleges',
  'music schools',
  'dance studios',
  'photo studios',
  'event crews',
  'wedding planners',
  'florists',
  'printers',
  'mechanics',
  'dealers',
  'detailers',
  'tire shops',
  'movers',
  'couriers',
  'logistics',
  'warehouses',
  'farms',
  'dairies',
  'fisheries',
  'greenhouses',
  'co-ops',
  'grocers',
  'butchers',
  'tailors',
  'jewelers',
  'furniture shops',
  'hardware shops',
  'electricians',
  'plumbers',
  'HVAC crews',
  'solar crews',
  'roofers',
  'painters',
  'cleaners',
  'laundries',
  'landscapers',
  'pest control',
  'security firms',
  'IT shops',
  'repair cafes',
  'coworking',
  'nonprofits',
  'churches',
  'temples',
  'mosques',
  'NGOs',
  'unions',
  'municipalities',
  'libraries',
  'museums',
  'theaters',
  'cinemas',
  'pet shops',
  'groomers',
  'kennels',
] as const

export const comboCount = PLATFORMS.length * APP_TYPES.length * NICHES.length

export type Platform = (typeof PLATFORMS)[number]
export type AppType = (typeof APP_TYPES)[number]
export type Niche = (typeof NICHES)[number]

export type Idea = {
  platform: Platform
  type: AppType
  niche: Niche
}

function lookup<T extends readonly string[]>(
  bank: T,
  value: string | undefined,
): T[number] | undefined {
  if (!value) return undefined
  return bank.find((item) => item === value)
}

/** All three params must match a bank entry exactly, or this returns null. */
export function resolveIdea(search: {
  p?: string
  t?: string
  n?: string
}): Idea | null {
  const platform = lookup(PLATFORMS, search.p)
  const type = lookup(APP_TYPES, search.t)
  const niche = lookup(NICHES, search.n)
  if (!platform || !type || !niche) return null
  return { platform, type, niche }
}

export function ideaSentence(idea: {
  platform: string
  type: string
  niche: string
}) {
  return `Let's build a ${idea.platform} ${idea.type} for ${idea.niche}.`
}

export function ideaShareSearch(idea: {
  platform: string
  type: string
  niche: string
}) {
  return { p: idea.platform, t: idea.type, n: idea.niche }
}

export function ideasEqual(
  a: { platform: string; type: string; niche: string },
  b: { platform: string; type: string; niche: string },
) {
  return a.platform === b.platform && a.type === b.type && a.niche === b.niche
}
