#!/usr/bin/env node
/**
 * Mechanical checks for src/components/idea-spinner/word-banks.ts
 * Duplicate / empty / over-length / URL-unsafe labels fail CI.
 */

import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const file = join(root, 'src/components/idea-spinner/word-banks.ts')
const src = readFileSync(file, 'utf8')

const maxMatch = src.match(/export const MAX_LABEL_LENGTH = (\d+)/)
const MAX_LABEL_LENGTH = maxMatch ? Number(maxMatch[1]) : 18
const URL_UNSAFE = /[&=?]/

function extractArray(name) {
  const re = new RegExp(`export const ${name} = \\[([\\s\\S]*?)\\] as const`)
  const block = src.match(re)
  if (!block) {
    throw new Error(`Could not find export const ${name} in word-banks.ts`)
  }
  return [...block[1].matchAll(/'([^']*)'/g)].map((m) => m[1])
}

const banks = {
  PLATFORMS: extractArray('PLATFORMS'),
  APP_TYPES: extractArray('APP_TYPES'),
  NICHES: extractArray('NICHES'),
}

const errors = []

for (const [name, labels] of Object.entries(banks)) {
  if (labels.length === 0) {
    errors.push(`${name} is empty`)
    continue
  }

  const seen = new Map()
  for (const label of labels) {
    const where = `${name} "${label}"`
    if (label.trim() === '') {
      errors.push(`${name} has an empty label`)
      continue
    }
    if (label !== label.trim()) {
      errors.push(`${where} has leading or trailing space`)
    }
    if (label.length > MAX_LABEL_LENGTH) {
      errors.push(`${where} is ${label.length} chars (max ${MAX_LABEL_LENGTH})`)
    }
    if (URL_UNSAFE.test(label)) {
      errors.push(`${where} contains &, =, or ? (breaks share URLs)`)
    }
    const key = label.toLowerCase()
    const prev = seen.get(key)
    if (prev) {
      errors.push(`${where} duplicates "${prev}" (case-insensitive)`)
    } else {
      seen.set(key, label)
    }
  }
}

if (errors.length) {
  console.error(`word-banks.ts failed ${errors.length} check(s):\n`)
  for (const err of errors) console.error(`  - ${err}`)
  process.exit(1)
}

const combos =
  banks.PLATFORMS.length * banks.APP_TYPES.length * banks.NICHES.length
console.log(
  `word-banks.ts ok — ${banks.PLATFORMS.length} platforms × ${banks.APP_TYPES.length} products × ${banks.NICHES.length} niches = ${combos.toLocaleString()} combos`,
)
