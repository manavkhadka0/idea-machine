import { createFileRoute } from '@tanstack/react-router'
import { IdeaSpinner } from '#/components/idea-spinner/IdeaSpinner'
import { ideaSentence, resolveIdea } from '#/components/idea-spinner/word-banks'
import { pageHead, siteOrigin } from '#/lib/seo'

export type IdeaSearch = {
  p?: string
  t?: string
  n?: string
}

export const Route = createFileRoute('/')({
  validateSearch: (search: Record<string, unknown>): IdeaSearch => ({
    p: typeof search.p === 'string' ? search.p : undefined,
    t: typeof search.t === 'string' ? search.t : undefined,
    n: typeof search.n === 'string' ? search.n : undefined,
  }),
  head: ({ match }) => {
    const idea = resolveIdea(match.search)
    if (!idea) return {}

    const sentence = ideaSentence(idea)
    const title = `${sentence} — Idea Machine`
    const description = `Someone pulled the lever and got: ${sentence.replace(/\.$/, '')}. Pull your own at Idea Machine.`
    const query = new URLSearchParams({
      p: idea.platform,
      t: idea.type,
      n: idea.niche,
    }).toString()

    return pageHead({
      title,
      description,
      path: `/?${query}`,
      image: `${siteOrigin()}/api/og?${query}`,
      imageAlt: sentence,
    })
  },
  component: Home,
})

function Home() {
  const search = Route.useSearch()
  return <IdeaSpinner search={search} />
}
