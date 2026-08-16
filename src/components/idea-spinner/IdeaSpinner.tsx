import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Lever } from './Lever'
import { SlotReel } from './SlotReel'
import { useSlotReel } from './useSlotReel'
import {
  APP_TYPES,
  NICHES,
  PLATFORMS,
  comboCount,
  ideaSentence,
  ideaShareSearch,
  ideasEqual,
  resolveIdea,
} from './word-banks'
import type { Idea } from './word-banks'
import { copyText } from '#/lib/clipboard'
import {
  clearLockedIdeas,
  markLockedIdeaBuilt,
  readLockedIdeas,
  saveLockedIdea,
  sharePayload,
} from '#/lib/locked-ideas'
import type { LockedIdea } from '#/lib/locked-ideas'
import { addWordIssueUrl } from '#/lib/repo'
import './idea-spinner.css'

const ITEM_HEIGHT = 144

export function IdeaSpinner({
  search,
}: {
  search: { p?: string; t?: string; n?: string }
}) {
  const shared = resolveIdea(search)
  const navigate = useNavigate({ from: '/' })
  const platformReel = useSlotReel({
    bank: PLATFORMS,
    itemHeight: ITEM_HEIGHT,
    loops: 4,
    duration: 3.0,
    initialWord: shared?.platform,
  })
  const typeReel = useSlotReel({
    bank: APP_TYPES,
    itemHeight: ITEM_HEIGHT,
    loops: 4,
    duration: 3.0,
    initialWord: shared?.type,
  })
  const nicheReel = useSlotReel({
    bank: NICHES,
    itemHeight: ITEM_HEIGHT,
    loops: 4,
    duration: 3.0,
    initialWord: shared?.niche,
  })

  const [idea, setIdea] = useState<Idea | null>(shared)
  const [spinning, setSpinning] = useState(false)
  const [locked, setLocked] = useState(Boolean(shared))
  const [built, setBuilt] = useState(false)
  const [copyState, setCopyState] = useState<'default' | 'success' | 'error'>(
    'default',
  )
  const [saved, setSaved] = useState<LockedIdea[]>([])
  const [flash, setFlash] = useState(false)
  const liveId = useId()
  const booted = useRef(Boolean(shared))

  const writeSearch = useCallback(
    (next: Idea | null) => {
      void navigate({
        to: '/',
        search: next ? ideaShareSearch(next) : {},
        replace: true,
      })
    },
    [navigate],
  )

  const landShared = useCallback(
    (next: Idea) => {
      platformReel.landOn(next.platform)
      typeReel.landOn(next.type)
      nicheReel.landOn(next.niche)
      setIdea(next)
      setLocked(true)
      setSpinning(false)
      const prior = readLockedIdeas().find((item) => ideasEqual(item, next))
      setBuilt(Boolean(prior?.built))
      setSaved(saveLockedIdea(next))
      if (prior?.built) setSaved(markLockedIdeaBuilt(next))
    },
    [platformReel.landOn, typeReel.landOn, nicheReel.landOn],
  )

  const runSpin = useCallback(async () => {
    setSpinning(true)
    setLocked(false)
    setBuilt(false)
    setIdea(null)
    setCopyState('default')
    writeSearch(null)
    const [platform, type, niche] = await Promise.all([
      platformReel.spin(0),
      typeReel.spin(0.18),
      nicheReel.spin(0.36),
    ])
    setIdea(resolveIdea({ p: platform, t: type, n: niche }))
    setSpinning(false)
  }, [platformReel.spin, typeReel.spin, nicheReel.spin, writeSearch])

  const lockIdea = useCallback(() => {
    if (!idea || spinning) return
    setLocked(true)
    writeSearch(idea)
    setSaved(saveLockedIdea(idea))
  }, [idea, spinning, writeSearch])

  const copyCombo = useCallback(async () => {
    if (!idea || !locked) return
    const ok = await copyText(sharePayload(idea))
    setCopyState(ok ? 'success' : 'error')
    window.setTimeout(() => setCopyState('default'), 1600)
  }, [idea, locked])

  const buildIdea = useCallback(async () => {
    if (!idea || !locked || spinning) return
    setBuilt(true)
    setSaved(markLockedIdeaBuilt(idea))
    const ok = await copyText(sharePayload(idea))
    if (!ok) setCopyState('error')
  }, [idea, locked, spinning])

  const restoreIdea = useCallback(
    (next: LockedIdea) => {
      const resolved = resolveIdea({
        p: next.platform,
        t: next.type,
        n: next.niche,
      })
      if (!resolved) return
      booted.current = true
      writeSearch(resolved)
      landShared(resolved)
    },
    [landShared, writeSearch],
  )

  const clearSaved = useCallback(() => {
    clearLockedIdeas()
    setSaved([])
  }, [])

  useEffect(() => {
    setSaved(readLockedIdeas())
  }, [])

  useEffect(() => {
    if (!idea || spinning) return
    setFlash(true)
    const t = window.setTimeout(() => setFlash(false), 520)
    return () => window.clearTimeout(t)
  }, [idea, spinning])

  useEffect(() => {
    const next = resolveIdea(search)
    if (next) {
      landShared(next)
      booted.current = true
      return
    }
    if (!booted.current) {
      booted.current = true
      void runSpin()
    }
    // Search params are the only input. Spin/land identities would retrigger this.
  }, [search.p, search.t, search.n])

  const status = spinning
    ? 'spinning'
    : built
      ? 'built'
      : locked
        ? 'locked'
        : idea
          ? 'ready'
          : 'idle'
  const statusLabel = spinning
    ? 'SPINNING'
    : built
      ? 'BUILT'
      : locked
        ? 'LOCKED'
        : 'READY'

  const liveMessage = built
    ? `Built: a ${idea?.platform} ${idea?.type} for ${idea?.niche}.`
    : locked
      ? `Locked: a ${idea?.platform} ${idea?.type} for ${idea?.niche}.`
      : idea
        ? `Landed: a ${idea.platform} ${idea.type} for ${idea.niche}.`
        : spinning
          ? 'Spinning.'
          : ''

  const copyLabel =
    copyState === 'success'
      ? 'Copied'
      : copyState === 'error'
        ? 'Copy failed'
        : 'Copy link'

  return (
    <div className="machine" data-status={status}>
      <a className="skip-link" href="#machine">
        Skip to machine
      </a>

      <header className="nav-slab">
        <a className="slab-mark" href="/">
          IDEA MACHINE
        </a>
        <p className="nav-status">
          <span className="status-led" aria-hidden="true" />
          <span>{statusLabel}</span>
        </p>
      </header>

      <main className="machine__main" aria-label="Idea Machine generator">
        <section className="hero" id="machine">
          <div className="hud-line">
            <span className="hud-line__key">COMBOS</span>
            <span className="hud-line__val">{comboCount.toLocaleString()}</span>
          </div>

          <h1 className="idea-lead">
            <span className="sr-only">Idea Machine. </span>
            LET&rsquo;S BUILD A
          </h1>

          <div className={`console ${locked ? 'console--locked' : ''}`}>
            <div className="console__stage" data-flash={flash ? 'true' : 'false'}>
              <SlotReel
                items={platformReel.items}
                y={platformReel.y}
                filter={platformReel.filter}
                landed={platformReel.landed}
                locked={locked}
                itemHeight={ITEM_HEIGHT}
                label="Platform"
                narrow
              />
              <SlotReel
                items={typeReel.items}
                y={typeReel.y}
                filter={typeReel.filter}
                landed={typeReel.landed}
                locked={locked}
                itemHeight={ITEM_HEIGHT}
                label="Product"
              />
              <p className="console__for">FOR</p>
              <SlotReel
                items={nicheReel.items}
                y={nicheReel.y}
                filter={nicheReel.filter}
                landed={nicheReel.landed}
                locked={locked}
                itemHeight={ITEM_HEIGHT}
                label="Niche"
              />
              <Lever onPull={() => void runSpin()} disabled={spinning} />

              {locked ? (
                <span className="lock-stamp" aria-hidden="true">
                  LOCKED
                </span>
              ) : null}
            </div>

            <p id={liveId} className="sr-only" aria-live="polite">
              {liveMessage}
            </p>

            <div className="console__controls">
              <button
                type="button"
                className="btn btn--ghost"
                onClick={lockIdea}
                disabled={spinning || !idea}
                data-state={
                  locked
                    ? 'success'
                    : spinning || !idea
                      ? 'disabled'
                      : 'default'
                }
                aria-pressed={locked}
              >
                {locked ? 'LOCKED' : 'LOCK'}
              </button>
              <button
                type="button"
                className="btn btn--fill"
                onClick={() => void buildIdea()}
                disabled={spinning || !locked || !idea}
                data-state={
                  built
                    ? 'success'
                    : spinning || !locked
                      ? 'disabled'
                      : 'default'
                }
              >
                {built ? 'BUILT' : 'BUILD'}
              </button>
            </div>

            {locked && idea ? (
              <div className="console__share">
                <button
                  type="button"
                  className="btn btn--ghost"
                  onClick={() => void copyCombo()}
                  data-state={copyState}
                >
                  {copyLabel}
                </button>
              </div>
            ) : null}
          </div>

          {saved.length > 0 ? (
            <div className="idea-strip">
              <div className="idea-strip__head">
                <span className="idea-strip__label">My locked ideas</span>
                <button
                  type="button"
                  className="idea-strip__clear"
                  onClick={clearSaved}
                >
                  Clear
                </button>
              </div>
              <ul className="idea-strip__list">
                {saved.map((item) => {
                  const active = idea ? ideasEqual(idea, item) && locked : false
                  return (
                    <li key={`${item.platform}-${item.type}-${item.niche}`}>
                      <button
                        type="button"
                        className="idea-strip__item"
                        data-active={active ? 'true' : 'false'}
                        onClick={() => restoreIdea(item)}
                      >
                        <span>{ideaSentence(item)}</span>
                        {item.built ? (
                          <span className="idea-strip__built">Built</span>
                        ) : null}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          ) : null}
        </section>
      </main>

      <footer className="foot-stmt">
        <p className="foot-stmt__line">
          LOCK IT. <em>BUILD IT.</em>
        </p>
        <p className="foot-stmt__desc">
          Idea Machine spins a platform, a product type, and a niche. Lock the
          combo, then build it.
        </p>
        <div className="foot-stmt__meta">
          <span className="wordmark">IDEA MACHINE</span>
          <a className="foot-stmt__link" href={addWordIssueUrl}>
            Add a word
          </a>
        </div>
      </footer>
    </div>
  )
}
