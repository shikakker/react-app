import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const pkg = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'))

const runtime = ['react', 'react-dom', 'web-vitals']
const tooling = [
  'react-scripts',
  '@testing-library/jest-dom',
  '@testing-library/react',
  '@testing-library/user-event',
]

test('CRA deploy dependency boundary contains only browser runtime packages', () => {
  for (const name of runtime) assert.ok(pkg.dependencies?.[name], `${name} must remain a runtime dependency`)
  for (const name of tooling) {
    assert.equal(pkg.dependencies?.[name], undefined, `${name} must not ship as a runtime dependency`)
    assert.ok(pkg.devDependencies?.[name], `${name} must be classified as build/test tooling`)
  }
})
