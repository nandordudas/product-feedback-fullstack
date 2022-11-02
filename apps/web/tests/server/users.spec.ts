import { fileURLToPath } from 'node:url'

// TODO: check @faker-js/faker dependency
import { faker } from '@faker-js/faker'
import { $fetch, setup } from '@nuxt/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'

import { getExistingUserId } from './utils'

// TODO: fill missing test cases
await setup({
  rootDir: fileURLToPath(new URL('..', import.meta.url)),
  server: true,
})

let email: string
let password: string

beforeEach(() => {
  email = faker.internet.email()
  password = 'Pa55wor&'
})

describe('server index /api/users', () => {
  it('should display pagination', async () => {
    expect(await $fetch('/api/users')).toEqual(expect.objectContaining({
      meta: expect.any(Object),
      data: expect.any(Array),
    }))
  })
})

describe('server store /api/users', () => {
  it('should create new user', async () => {
    expect(await $fetch('/api/users', {
      method: 'post',
      body: { email, password },
    })).toEqual(expect.objectContaining({ email }))
  })

  it.todo('should response validation error when email and/or password not provided')
})

describe('server show /api/users/:id', () => {
  it('should display existing user', async () => {
    const id = await getExistingUserId()

    expect(await $fetch(`/api/users/${id}`)).toEqual(expect.objectContaining({
      id: expect.any(Number),
      email: expect.any(String),
    }))
  })

  it.todo('should response error when user does not exists')
})

describe('server update /api/users/:id', () => {
  password = 'Pa55wor&1'

  it('should display existing user', async () => {
    const id = await getExistingUserId()

    expect(await $fetch(`/api/users/${id}`, {
      method: 'put',
      body: { email, password },
    })).toEqual(expect.objectContaining({
      id: expect.any(Number),
      email: expect.any(String),
    }))
  })

  it.todo('should response validation error when email and/or password not provided')
  it.todo('should response error when user does not exists')
})

describe('server delete /api/users/:id', () => {
  it('should destroy existing user', async () => {
    const id = await getExistingUserId()

    expect(await $fetch(`/api/users/${id}`, { method: 'delete' })).toEqual('')
  })

  it.todo('should response error when user does not exists')
})
