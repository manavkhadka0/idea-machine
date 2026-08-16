import { ideaSentence } from '#/components/idea-spinner/word-banks'

const KEY = 'idea-machine.locked'
const MAX = 12

export type LockedIdea = {
  platform: string
  type: string
  niche: string
  lockedAt: number
  built?: boolean
}

function ideaKey(idea: { platform: string; type: string; niche: string }) {
  return `${idea.platform}\0${idea.type}\0${idea.niche}`
}

function parse(raw: string | null): LockedIdea[] {
  if (!raw) return []
  try {
    const data = JSON.parse(raw) as unknown
    if (!Array.isArray(data)) return []
    return data.filter(isLockedIdea)
  } catch {
    return []
  }
}

function isLockedIdea(value: unknown): value is LockedIdea {
  if (!value || typeof value !== 'object') return false
  const item = value as Record<string, unknown>
  return (
    typeof item.platform === 'string' &&
    typeof item.type === 'string' &&
    typeof item.niche === 'string' &&
    typeof item.lockedAt === 'number'
  )
}

export function readLockedIdeas(): LockedIdea[] {
  if (typeof window === 'undefined') return []
  try {
    return parse(window.localStorage.getItem(KEY)).slice(0, MAX)
  } catch {
    return []
  }
}

function writeLockedIdeas(ideas: LockedIdea[]) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(KEY, JSON.stringify(ideas.slice(0, MAX)))
  } catch {
    // Storage blocked or full — fail silent.
  }
}

export function saveLockedIdea(idea: {
  platform: string
  type: string
  niche: string
}): LockedIdea[] {
  const next: LockedIdea = {
    platform: idea.platform,
    type: idea.type,
    niche: idea.niche,
    lockedAt: Date.now(),
  }
  const existing = readLockedIdeas().filter(
    (item) => ideaKey(item) !== ideaKey(next),
  )
  const ideas = [next, ...existing].slice(0, MAX)
  writeLockedIdeas(ideas)
  return ideas
}

export function markLockedIdeaBuilt(idea: {
  platform: string
  type: string
  niche: string
}): LockedIdea[] {
  const ideas = readLockedIdeas().map((item) =>
    ideaKey(item) === ideaKey(idea) ? { ...item, built: true } : item,
  )
  writeLockedIdeas(ideas)
  return ideas
}

export function clearLockedIdeas() {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.removeItem(KEY)
  } catch {
    // fail silent
  }
}

export function lockedIdeaLine(idea: {
  platform: string
  type: string
  niche: string
}) {
  return ideaSentence(idea)
}

export function shareUrlFor(
  idea: { platform: string; type: string; niche: string },
  origin = typeof window !== 'undefined' ? window.location.origin : '',
) {
  const params = new URLSearchParams({
    p: idea.platform,
    t: idea.type,
    n: idea.niche,
  })
  return `${origin}/?${params.toString()}`
}

export function sharePayload(idea: {
  platform: string
  type: string
  niche: string
}) {
  const url = shareUrlFor(idea)
  return `${ideaSentence(idea)}\n${url}`
}
