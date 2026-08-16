import { createFileRoute } from '@tanstack/react-router'
import { resolveIdea } from '#/components/idea-spinner/word-banks'
import {
  BLACK_OPS_ONE_WOFF_BASE64,
  SPACE_GROTESK_WOFF_BASE64,
} from '#/lib/og-fonts.generated'

const PAPER = '#180f0d'
const INK = '#f2e9e1'
const SLAB = '#efe6dc'
const SLAB_INK = '#241512'
const ACCENT = '#e2432e'
const MUTED = '#a08f86'

export const Route = createFileRoute('/api/og')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url)
        const idea = resolveIdea({
          p: url.searchParams.get('p') ?? undefined,
          t: url.searchParams.get('t') ?? undefined,
          n: url.searchParams.get('n') ?? undefined,
        })

        const platform = idea?.platform ?? 'web'
        const type = idea?.type ?? 'idea'
        const niche = idea?.niche ?? 'you'

        // Everything that can fail (loading @vercel/og, decoding fonts,
        // rendering) happens inside the request, never at module load —
        // a broken image must never be able to take the whole site down.
        try {
          return await renderOg({
            platform,
            type,
            niche,
            hasIdea: Boolean(idea),
          })
        } catch (err) {
          console.error('OG image render failed', err)
          return new Response('OG image unavailable', { status: 500 })
        }
      },
    },
  },
})

async function renderOg({
  platform,
  type,
  niche,
  hasIdea,
}: {
  platform: string
  type: string
  niche: string
  hasIdea: boolean
}) {
  const { ImageResponse } = await import('@vercel/og')
  const blackOpsOne = Buffer.from(BLACK_OPS_ONE_WOFF_BASE64, 'base64')
  const spaceGrotesk = Buffer.from(SPACE_GROTESK_WOFF_BASE64, 'base64')

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: PAPER,
        padding: '56px 64px',
        fontFamily: 'Space Grotesk',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            color: INK,
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: 4,
            textTransform: 'uppercase',
          }}
        >
          Idea Machine
        </div>
        <div
          style={{
            display: 'flex',
            color: MUTED,
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: 4,
            textTransform: 'uppercase',
          }}
        >
          16,356 combos
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 26,
        }}
      >
        <div
          style={{
            display: 'flex',
            color: INK,
            fontFamily: 'Black Ops One',
            fontSize: 58,
            textTransform: 'uppercase',
            letterSpacing: 1,
          }}
        >
          Let&#39;s build a
        </div>
        <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: SLAB,
              color: SLAB_INK,
              padding: '18px 26px',
              fontFamily: 'Black Ops One',
              fontSize: 32,
            }}
          >
            {platform}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: SLAB,
              color: SLAB_INK,
              padding: '18px 26px',
              fontFamily: 'Black Ops One',
              fontSize: 32,
            }}
          >
            {type}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: PAPER,
              color: INK,
              padding: '18px 18px',
              fontFamily: 'Black Ops One',
              fontSize: 32,
              textTransform: 'uppercase',
            }}
          >
            for
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: ACCENT,
              color: SLAB,
              padding: '18px 26px',
              fontFamily: 'Black Ops One',
              fontSize: 32,
            }}
          >
            {niche}
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          color: MUTED,
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: 2,
        }}
      >
        idea-machine-puce.vercel.app
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Black Ops One',
          data: blackOpsOne,
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Space Grotesk',
          data: spaceGrotesk,
          weight: 700,
          style: 'normal',
        },
      ],
      headers: {
        'cache-control': hasIdea
          ? 'public, immutable, no-transform, max-age=31536000'
          : 'public, max-age=3600',
      },
    },
  )
}
