import { test } from '@japa/runner'

test.group('users.show', () => {
  test('should display user by id', async ({ client }) => {
    const response = await client.get('/api/users/1')

    response.assertAgainstApiSpec()
  })

  test('should show error message when user does not exists', async ({ assert, client }) => {
    assert.plan(1)

    const response = await client.get('/api/users/101')

    response.assertAgainstApiSpec()
    response.assertBodyContains({
      errors: [{ message: 'row not found' }],
    })
  })
})
