import { fileURLToPath } from 'node:url'

import { $fetch, setup } from '@nuxt/test-utils'
import { describe, expect, it } from 'vitest'

await setup({
  rootDir: fileURLToPath(new URL('..', import.meta.url)),
  server: true,
})

describe('index page', () => {
  it('render index', async () => {
    const html = await $fetch('/')

    expect(html).toContain('<h1>users</h1>')
  })
})
