import { fileURLToPath } from 'node:url'

import { $fetch, setup } from '@nuxt/test-utils'
import { describe, expect, it } from 'vitest'

await setup({
  rootDir: fileURLToPath(new URL('..', import.meta.url)),
  server: true,
})

describe('server index /api/users', () => {
  it('should display pagination', async () => {
    expect(await $fetch('/api/users')).toEqual(expect.objectContaining({
      meta: expect.any(Object),
      data: expect.any(Array),
    }))
  })

  it.todo('server show /api/users/:id')
  it.todo('server store /api/users')
  it.todo('server update /api/users')
  it.todo('server delete /api/users/:id')
})
