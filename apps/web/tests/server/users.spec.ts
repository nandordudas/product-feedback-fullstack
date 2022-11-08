import { fileURLToPath } from 'node:url'

import { faker } from '@faker-js/faker'
import { $fetch, setup } from '@nuxt/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'

let email: string
const password = 'Pa55wor&'

const mockPaginationResponse = {
  meta: expect.any(Object),
  data: expect.any(Array),
}

const mockUserResponse = {
  id: expect.any(Number),
  email: expect.any(String),
}

beforeEach(() => {
  email = faker.internet.email()
})

await setup({
  rootDir: fileURLToPath(new URL('..', import.meta.url)),
  server: true,
})

describe('server index /api/users', () => {
  it('should display pagination ', async () => {
    const result = await $fetch('/api/users')

    expect(result).toEqual(expect.objectContaining(mockPaginationResponse))
  })

  it('should display pagination', async () => {
    const result = await $fetch('/api/users/?page=2')

    expect(result).toEqual(expect.objectContaining(mockPaginationResponse))
  })
})

describe('server store /api/users', () => {
  const body = { email, password }

  it('should create new user', async () => {
    const result = await $fetch('/api/users', { method: 'post', body })

    expect(result).toEqual(expect.objectContaining({ email }))
  })

  it.todo('should response validation error when email and/or password not provided')
})

describe('server show /api/users/:id', () => {
  it('should display existing user', async () => {
    const result = await $fetch('/api/users/1')

    expect(result).toEqual(expect.objectContaining(mockUserResponse))
  })

  it.todo('should response error when user does not exists')
})

describe('server update /api/users/:id', () => {
  const body = { email, password: 'Pa55wor&1' }

  it('should update existing user', async () => {
    const result = await $fetch('/api/users/1', { method: 'put', body })

    expect(result).toEqual(expect.objectContaining(mockUserResponse))
  })

  it.todo('should response validation error when email and/or password not provided')
  it.todo('should response error when user does not exists')
})

describe('server delete /api/users/:id', () => {
  it('should destroy existing user', async () => {
    const result = await $fetch('/api/users/10', { method: 'delete' })

    expect(result).toEqual('')
  })

  it.todo('should response error when user does not exists')
})
