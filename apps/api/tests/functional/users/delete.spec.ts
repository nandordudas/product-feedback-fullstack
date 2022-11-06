import { test } from '@japa/runner'

test.group('users.destroy', () => {
  test('should delete existing user by id', async ({ client }) => {
    const response = await client.delete('/api/users/10')

    response.assertAgainstApiSpec()
  })
})
