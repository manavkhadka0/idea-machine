# Idea Machine

[![CI](https://github.com/manavkhadka0/idea-machine/actions/workflows/ci.yml/badge.svg)](https://github.com/manavkhadka0/idea-machine/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-cream.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-ff8a3d.svg)](CONTRIBUTING.md)
[![Live](https://img.shields.io/badge/live-idea--machine-111.svg)](https://idea-machine-puce.vercel.app)

Out of side-project ideas? Pull the lever.

Idea Machine spins a **platform**, a **product**, and a **niche** into a one-line brief — "Let's build a mobile CRM for barbers" — then lets you lock the combo, share it, or mark it built. No account, no backend, no gallery. Just a slot machine for your next build.

The machine is one page. The community owns the word banks — see [Contribute a word](#contribute-a-word) below.

![Idea Machine](public/og.png)

## Contribute a word

This is the main way to help.

Edit [`src/components/idea-spinner/word-banks.ts`](src/components/idea-spinner/word-banks.ts).

The combo count on the machine is derived:

```ts
PLATFORMS.length * APP_TYPES.length * NICHES.length
```

Add a label, the number goes up. Do not hardcode it.

Rules, in short:

- 18 characters or fewer (stencil type)
- Unique in that bank, case-insensitive
- No brands, slurs, living people
- Sit next to related words — do not alphabetize the file

Full steps: [CONTRIBUTING.md](CONTRIBUTING.md)

Not sure? Open a [word suggestion](https://github.com/manavkhadka0/idea-machine/issues/new?template=word.yml).

## Run it

```bash
pnpm install
pnpm dev
```

Open the URL Vite prints (port `3000`, or the next free port).

```bash
pnpm validate:banks
pnpm check
pnpm lint
pnpm build
```

## How a combo is shared

Lock writes the address bar:

```
/?p=web&t=warehouse&n=logistics
```

Unknown params are ignored and the machine spins as usual. Locked ideas also stay in **your browser** (last 12). There is no account and no public gallery.

## Stack

TanStack Start, Vite, React, Framer Motion. Styling is Hallmark Brutal tokens in `tokens.css` — please do not drive-by restyle it.

## Contributing

This is open source and PRs are welcome. Adding a word is the fastest way in — see [Contribute a word](#contribute-a-word) above and [CONTRIBUTING.md](CONTRIBUTING.md) for the full guide. Please open an issue before any structural or visual change.

## Contributors

Every word in the machine came from someone. Add one and you're on this wall.

[![Contributors](https://contrib.rocks/image?repo=manavkhadka0/idea-machine)](https://github.com/manavkhadka0/idea-machine/graphs/contributors)

Want to talk instead of PR? Use [Discussions](https://github.com/manavkhadka0/idea-machine/discussions) — good spot for "what would you add" or a combo you liked.

## Author

**Er. Manav Khadka**
Co-founder, [Baliyo Technologies](https://github.com/manavkhadka0)

## License

[MIT](LICENSE) — free to use, fork, and build on.
