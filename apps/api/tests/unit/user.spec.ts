import { faker } from '@faker-js/faker'
import Hash from '@ioc:Adonis/Core/Hash'
import { test } from '@japa/runner'
import User from 'App/Models/User'

const mockMessages = {
  emailAndPasswordIsRequired: 'insert into "users" ("createdAt", "updatedAt") values ($1, $2) '
    + 'returning "id" - null value in column "email" of relation "users" violates not-null constraint',
  passwordIsRequired: 'insert into "users" ("createdAt", "email", "updatedAt") values ($1, $2, $3) '
    + 'returning "id" - null value in column "password" of relation "users" violates not-null constraint',
  emailIsTooLong: 'insert into "users" ("createdAt", "email", "password", "updatedAt") '
    + 'values ($1, $2, $3, $4) returning "id" - value too long for type character varying(255)',
  emailMustBeUnique: 'insert into "users" ("createdAt", "email", "password", "updatedAt") values ($1, $2, $3, $4) '
    + 'returning "id" - duplicate key value violates unique constraint "users_email_unique"',
} as const

test.group('User', (group) => {
  let user: User
  let password: string
  let email: string

  group.each.setup(() => {
    user = new User()
    password = faker.internet.password()
    email = faker.internet.email()
  })

  test('should has properties', async ({ assert }) => {
    const visibleFields = ['id', 'email', 'createdAt', 'updatedAt']

    user.fill({ email, password })

    assert.properties((await user.save()).toJSON(), visibleFields)
  })

  test('should hash plain password', async ({ assert }) => {
    user.fill({ email, password })

    assert.deepEqual(user.$attributes, { email, password })
    assert.notEqual((await user.save()).password, password)
    assert.isTrue(await Hash.verify(user.password, password))
  })

  test('should require email and password', async ({ assert }) => {
    await assert.rejects(async () => {
      await user.save()
    }, /DatabaseError/, mockMessages.emailAndPasswordIsRequired)

    assert.isFalse(user.$isPersisted)

    user.email = email

    await assert.rejects(async () => {
      await user.save()
    }, /DatabaseError/, mockMessages.passwordIsRequired)

    assert.isFalse(user.$isPersisted)

    user.password = password

    assert.isTrue((await user.save()).$isPersisted)
  })

  test('should has record insert restrictions', async ({ assert }) => {
    email = faker.random.alpha(255 + 1)

    user.fill({ email, password })

    await assert.rejects(async () => {
      await user.save()
    }, /DatabaseError/, mockMessages.emailIsTooLong)

    assert.isFalse(user.$isPersisted)
  })

  test('should record unique by email', async ({ assert }) => {
    user.fill({ email, password })

    await user.save()

    assert.isTrue(user.$isPersisted)

    await assert.rejects(async () => {
      user = await new User().fill({ email, password })
        .save()

      assert.isFalse(user.$isPersisted)
    }, /DatabaseError/, mockMessages.emailMustBeUnique)
  })
})
