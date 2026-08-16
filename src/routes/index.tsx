import { createFileRoute } from '@tanstack/react-router'
import { IdeaSpinner } from '#/components/idea-spinner/IdeaSpinner'

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
  component: Home,
})

function Home() {
  const search = Route.useSearch()
  return <IdeaSpinner search={search} />
}
