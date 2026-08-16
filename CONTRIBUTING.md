# Contributing

Two jobs. That is the whole project.

1. **Add words** to the reels.
2. **Report bugs** in the machine.

Please do **not** open drive-by restyles, framework swaps, or backend PRs unless a maintainer asked for them.

## Add a word

The only file you need:

[`src/components/idea-spinner/word-banks.ts`](src/components/idea-spinner/word-banks.ts)

There are three banks:

- `PLATFORMS` — how it ships (`web`, `mobile`, `desktop`)
- `APP_TYPES` — what it is (`POS`, `waitlist`, `roster`)
- `NICHES` — who it is for (`barbers`, `clinics`, `logistics`)

The combo counter, the reels, and the share URL all read from these arrays. Add a label, the machine grows.

### Rules

- Short. Hard cap is **18 characters** (stencil type on the reels).
- Unique inside that bank, case-insensitive.
- No brands, no slurs, no living people.
- No `&`, `=`, or `?` (they break share URLs).
- Put the new label **next to related words**. Niches stay grouped by trade. Do not alphabetize the file.

Not sure it belongs? Open an issue with the **Word suggestion** template instead of a PR.

### Steps

```bash
pnpm install
pnpm validate:banks
```

1. Fork and branch from `main` (or `master`).
2. Add 1–5 labels. Small PRs merge faster than a dump of 80.
3. Run `pnpm validate:banks`.
4. Open a pull request. Use the checklist in the PR template.

## Report a bug

Use the **Bug** issue template. Include the combo if it matters (`/?p=web&t=POS&n=barbers`) and what you expected.

## Run the app

```bash
pnpm install
pnpm dev
```

Then:

```bash
pnpm validate:banks
pnpm check
pnpm lint
pnpm build
```

## Code of conduct

By participating you agree to the [Code of Conduct](CODE_OF_CONDUCT.md).
