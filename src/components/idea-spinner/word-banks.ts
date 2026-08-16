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
//
// Vagueness guard: every APP_TYPE and NICHE below also gets tagged with
// a SECTOR further down this file (or marked universal). The spin only
// lands a niche whose sector overlaps the landed type's sectors, so you
// never get a nonsense pairing like "warehouse for tattoo shops." New
// words need a sector tag too — see SECTOR GROUPS below.
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

// ---------------------------------------------------------------------
// SECTOR GROUPS — the vagueness guard. Each niche belongs to exactly one
// trade sector; each app type belongs to one or more sectors, or is
// marked universal (fits any niche — think CRM, invoicing, dashboard).
// A spin only lands a niche that shares a sector with the landed type.
// ---------------------------------------------------------------------

export const SECTORS = [
  'personal-care',
  'fitness',
  'food-hospitality',
  'health',
  'professional',
  'education-events',
  'auto-logistics',
  'agriculture-food-retail',
  'retail-goods',
  'trades-field',
  'community-civic',
  'pet-care',
] as const

export type Sector = (typeof SECTORS)[number]

const NICHE_SECTOR_GROUPS: readonly (readonly [readonly Niche[], Sector])[] = [
  [
    ['barbers', 'salons', 'spas', 'nail shops', 'tattoo shops'],
    'personal-care',
  ],
  [['gyms', 'yoga studios', 'crossfit boxes', 'sports clubs'], 'fitness'],
  [
    [
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
    ],
    'food-hospitality',
  ],
  [
    [
      'dentists',
      'clinics',
      'vets',
      'pharmacies',
      'physios',
      'opticians',
      'labs',
    ],
    'health',
  ],
  [
    [
      'realtors',
      'builders',
      'architects',
      'interior shops',
      'lawyers',
      'accountants',
      'insurers',
      'agencies',
      'recruiters',
    ],
    'professional',
  ],
  [
    [
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
    ],
    'education-events',
  ],
  [
    [
      'mechanics',
      'dealers',
      'detailers',
      'tire shops',
      'movers',
      'couriers',
      'logistics',
      'warehouses',
    ],
    'auto-logistics',
  ],
  [
    [
      'farms',
      'dairies',
      'fisheries',
      'greenhouses',
      'co-ops',
      'grocers',
      'butchers',
    ],
    'agriculture-food-retail',
  ],
  [
    ['tailors', 'jewelers', 'furniture shops', 'hardware shops'],
    'retail-goods',
  ],
  [
    [
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
    ],
    'trades-field',
  ],
  [
    [
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
    ],
    'community-civic',
  ],
  [['pet shops', 'groomers', 'kennels'], 'pet-care'],
]

export const NICHE_SECTORS: Record<Niche, Sector> = Object.fromEntries(
  NICHE_SECTOR_GROUPS.flatMap(([niches, sector]) =>
    niches.map((niche) => [niche, sector]),
  ),
) as Record<Niche, Sector>

const UNIVERSAL_APP_TYPES: readonly AppType[] = [
  'SaaS',
  'CRM',
  'chatbot',
  'AI copilot',
  'booking app',
  'scheduler',
  'payroll',
  'invoicing',
  'expenses',
  'subscriptions',
  'referrals',
  'reviews',
  'feedback',
  'helpdesk',
  'live chat',
  'dashboard',
  'analytics',
  'automation',
  'forms',
  'surveys',
  'time clock',
]

const APP_TYPE_SECTOR_GROUPS: readonly (readonly [
  readonly AppType[],
  readonly Sector[],
])[] = [
  [
    ['POS'],
    [
      'food-hospitality',
      'retail-goods',
      'agriculture-food-retail',
      'personal-care',
      'pet-care',
      'fitness',
    ],
  ],
  [
    ['ERP'],
    [
      'professional',
      'auto-logistics',
      'retail-goods',
      'agriculture-food-retail',
      'trades-field',
    ],
  ],
  [['LMS'], ['education-events', 'professional', 'community-civic']],
  [
    ['waitlist'],
    [
      'food-hospitality',
      'personal-care',
      'health',
      'fitness',
      'education-events',
      'community-civic',
    ],
  ],
  [
    ['queue app'],
    [
      'food-hospitality',
      'health',
      'personal-care',
      'community-civic',
      'retail-goods',
    ],
  ],
  [
    ['roster'],
    [
      'fitness',
      'education-events',
      'health',
      'trades-field',
      'community-civic',
    ],
  ],
  [
    ['quoting'],
    ['trades-field', 'professional', 'auto-logistics', 'retail-goods'],
  ],
  [
    ['inventory'],
    [
      'retail-goods',
      'agriculture-food-retail',
      'food-hospitality',
      'auto-logistics',
      'pet-care',
    ],
  ],
  [
    ['warehouse'],
    ['auto-logistics', 'agriculture-food-retail', 'retail-goods'],
  ],
  [['fleet tracker'], ['auto-logistics', 'trades-field']],
  [['dispatch'], ['auto-logistics', 'trades-field']],
  [
    ['delivery app'],
    [
      'food-hospitality',
      'auto-logistics',
      'agriculture-food-retail',
      'retail-goods',
    ],
  ],
  [
    ['order tracker'],
    [
      'food-hospitality',
      'retail-goods',
      'auto-logistics',
      'agriculture-food-retail',
    ],
  ],
  [
    ['marketplace'],
    [
      'retail-goods',
      'agriculture-food-retail',
      'professional',
      'community-civic',
    ],
  ],
  [
    ['store'],
    ['retail-goods', 'agriculture-food-retail', 'food-hospitality', 'pet-care'],
  ],
  [
    ['memberships'],
    ['fitness', 'community-civic', 'education-events', 'personal-care'],
  ],
  [
    ['loyalty app'],
    [
      'food-hospitality',
      'retail-goods',
      'personal-care',
      'fitness',
      'pet-care',
    ],
  ],
  [
    ['gift cards'],
    ['food-hospitality', 'retail-goods', 'personal-care', 'fitness'],
  ],
  [
    ['portal'],
    ['professional', 'health', 'education-events', 'community-civic'],
  ],
  [['directory'], ['community-civic', 'professional', 'education-events']],
  [['listings'], ['retail-goods', 'professional', 'agriculture-food-retail']],
  [
    ['rentals'],
    ['retail-goods', 'professional', 'auto-logistics', 'education-events'],
  ],
  [
    ['reservations'],
    ['food-hospitality', 'health', 'personal-care', 'fitness'],
  ],
  [['digital menu'], ['food-hospitality']],
  [
    ['kiosk app'],
    ['food-hospitality', 'retail-goods', 'community-civic', 'health'],
  ],
  [
    ['check-in'],
    [
      'health',
      'fitness',
      'education-events',
      'community-civic',
      'food-hospitality',
    ],
  ],
  [
    ['attendance'],
    ['education-events', 'fitness', 'trades-field', 'community-civic'],
  ],
  [['courses'], ['education-events', 'community-civic']],
  [['patient hub'], ['health']],
  [['vendor hub'], ['agriculture-food-retail', 'retail-goods', 'professional']],
  [
    ['franchise OS'],
    ['food-hospitality', 'personal-care', 'fitness', 'retail-goods'],
  ],
  [['field app'], ['trades-field', 'auto-logistics']],
  [['inspect app'], ['trades-field', 'auto-logistics', 'professional']],
  [['work orders'], ['trades-field', 'auto-logistics']],
  [['asset tracker'], ['trades-field', 'auto-logistics', 'community-civic']],
  [['route planner'], ['auto-logistics', 'trades-field']],
  [
    ['shift board'],
    ['food-hospitality', 'health', 'fitness', 'trades-field', 'retail-goods'],
  ],
]

export const APP_TYPE_SECTORS: Record<AppType, readonly Sector[]> =
  Object.fromEntries([
    ...UNIVERSAL_APP_TYPES.map((type) => [type, SECTORS] as const),
    ...APP_TYPE_SECTOR_GROUPS.flatMap(([types, sectors]) =>
      types.map((type) => [type, sectors] as const),
    ),
  ]) as Record<AppType, readonly Sector[]>

/** Niches that share a sector with `type` — never every niche in the bank. */
export function compatibleNiches(type: AppType): readonly Niche[] {
  const sectors = APP_TYPE_SECTORS[type]
  const matches = NICHES.filter((niche) =>
    sectors.includes(NICHE_SECTORS[niche]),
  )
  return matches.length > 0 ? matches : NICHES
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
