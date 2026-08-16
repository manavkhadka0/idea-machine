import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { createFileRoute } from '@tanstack/react-router'
import { ImageResponse } from '@vercel/og'
import { resolveIdea } from '#/components/idea-spinner/word-banks'

// Read once at module load — not per-request — so bundlers can trace and
// include these files in the deployed function.
const blackOpsOne = readFileSync(
  fileURLToPath(
    new URL('../../assets/fonts/BlackOpsOne-Regular.woff', import.meta.url),
  ),
)
const spaceGrotesk = readFileSync(
  fileURLToPath(
    new URL('../../assets/fonts/SpaceGrotesk-Bold.woff', import.meta.url),
  ),
)

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
              'cache-control': idea
                ? 'public, immutable, no-transform, max-age=31536000'
                : 'public, max-age=3600',
            },
          },
        )
      },
    },
  },
})
