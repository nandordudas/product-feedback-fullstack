import { faker } from '@faker-js/faker'
import Hash from '@ioc:Adonis/Core/Hash'
import { test } from '@japa/runner'
import User from 'App/Models/User'

const mockMeta = {
  total: 50,
  perPage: 15,
  currentPage: 1,
  lastPage: 4,
  firstPage: 1,
  firstPageUrl: '/?page=1',
  lastPageUrl: '/?page=4',
  nextPageUrl: '/?page=2',
  previousPageUrl: null,
}

test.group('/api/users index', () => {
  test('should display users page with pagination', async ({ client }) => {
    const response = await client.get('/api/users/?page=1')

    response.assertStatus(200)
    response.assertBodyContains({ meta: mockMeta })
  })

  test('should display users page with pagination 2', async ({ client }) => {
    const response = await client.get('/api/users/?page=2')

    response.assertStatus(200)
    response.assertBodyContains({
      meta: {
        ...mockMeta,
        currentPage: 2,
        nextPageUrl: '/?page=3',
        previousPageUrl: '/?page=1',
      },
    })
  })

  test('should display users page with pagination last', async ({ client }) => {
    const response = await client.get('/api/users/?page=4')

    response.assertStatus(200)
    response.assertBodyContains({
      meta: {
        ...mockMeta,
        currentPage: 4,
        nextPageUrl: null,
        previousPageUrl: '/?page=3',
      },
    })
  })
})

test.group('/api/users store', () => {
  const email = faker.internet.email()
  const password = 'Pa55wor&'

  test('should validate missing password', async ({ client }) => {
    const response = await client.post('/api/users')
      .json({ email })

    response.assertStatus(422)
    response.assertBodyContains({
      errors: [{
        rule: 'required',
        field: 'password',
        message: 'required validation failed',
      }],
    })
  })

  test('should validate invalid email', async ({ client }) => {
    const response = await client.post('/api/users')
      .json({ email: 'invalid' })

    response.assertStatus(422)
    response.assertBodyContains({
      errors: [{
        rule: 'email',
        field: 'email',
        message: 'email validation failed',
      }],
    })
  })

  test('should validate missing email', async ({ client }) => {
    const response = await client.post('/api/users')
      .json({ password })

    response.assertStatus(422)
    response.assertBodyContains({
      errors: [{
        rule: 'required',
        field: 'email',
        message: 'required validation failed',
      }],
    })
  })

  test('should create new user', async ({ client }) => {
    const response = await client.post('/api/users')
      .json({ email, password })

    response.assertStatus(201)
    response.assertBodyContains({
      email: String,
      createdAt: String,
      updatedAt: String,
      id: Number,
    })
  })

  test('should validate existing user', async ({ client }) => {
    const response = await client.post('/api/users')
      .json({ email, password })

    response.assertStatus(422)
    response.assertBodyContains({
      errors: [{
        rule: 'unique',
        field: 'email',
        message: 'unique validation failure',
      }],
    })
  })
})

test.group('/api/users show', () => {
  test('should display user by id', async ({ client }) => {
    const response = await client.get('/api/users/1')

    response.assertStatus(200)
  })

  // TODO: return with response
  test('should show error message when user does not exists', async ({ client }) => {
    const response = await client.get('/api/users/101')

    response.assertStatus(422)
  })
})

test.group('/api/users update', () => {
  const email = faker.internet.email()
  const password = 'Pa55wor&1'

  test('should update existing user', async ({ assert, client }) => {
    const user = await User.findOrFail(1)
    const response = await client.put(`/api/users/${user.id}`)
      .json({ email, password })

    response.assertStatus(200)

    await user.refresh()

    assert.isTrue(await Hash.verify(user.password, password))
  })

  test('should not update existing user on validation fails')
})

test.group('/api/users delete', () => {
  test('should delete existing user by id', async ({ client }) => {
    const response = await client.delete('/api/users/1')

    response.assertStatus(204)
  })
})
