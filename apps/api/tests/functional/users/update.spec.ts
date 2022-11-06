import { faker } from '@faker-js/faker'
import Hash from '@ioc:Adonis/Core/Hash'
import { test } from '@japa/runner'
import User from 'App/Models/User'

let user: User
const email = faker.internet.email()
const password = 'Pa55wor&1'

test.group('users.update', (group) => {
  group.each.setup(async () => {
    user = await User.findOrFail(1)
  })

  test('should update existing user', async ({ assert, client }) => {
    const response = await client.put(`/api/users/${user.id}`).json({ email, password })

    response.assertAgainstApiSpec()

    await user.refresh()

    assert.isTrue(await Hash.verify(user.password, password))
  })

  test('should not update existing user on validation fails', async ({ client }) => {
    const response = await client.put(`/api/users/${user.id}`).json({ email })

    response.assertAgainstApiSpec()
  })
})
