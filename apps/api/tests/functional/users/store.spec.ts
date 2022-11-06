import { faker } from '@faker-js/faker'
import { test } from '@japa/runner'
import User from 'App/Models/User'

const email = faker.internet.email()
const password = 'Pa55wor&'

test.group('users.store', () => {
  test('should validate missing password', async ({ assert, client }) => {
    assert.plan(1)

    const response = await client.post('/api/users').json({ email })

    response.assertAgainstApiSpec()
    response.assertBodyContains({
      errors: [{
        rule: 'required',
        field: 'password',
        message: 'required validation failed',
      }],
    })
  })

  test('should validate invalid email', async ({ assert, client }) => {
    assert.plan(1)

    const response = await client.post('/api/users').json({ email: 'invalid' })

    response.assertAgainstApiSpec()
    response.assertBodyContains({
      errors: [{
        rule: 'email',
        field: 'email',
        message: 'email validation failed',
      }],
    })
  })

  test('should validate missing email', async ({ assert, client }) => {
    assert.plan(1)

    const response = await client.post('/api/users').json({ password })

    response.assertAgainstApiSpec()
    response.assertBodyContains({
      errors: [{
        rule: 'required',
        field: 'email',
        message: 'required validation failed',
      }],
    })
  })

  test('should create new user', async ({ client }) => {
    const response = await client.post('/api/users').json({ email, password })

    response.assertAgainstApiSpec()
  })

  test('should validate existing user', async ({ assert, client }) => {
    assert.plan(1)

    const { email, password } = await User.findOrFail(1)
    const response = await client.post('/api/users').json({ email, password })

    response.assertAgainstApiSpec()
    response.assertBodyContains({
      errors: [{
        rule: 'unique',
        field: 'email',
        message: 'unique validation failure',
      }],
    })
  })
})
