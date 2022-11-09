import { test } from '@japa/runner'

const pageList = [1, 2, 3, 4, 5]

test.group('users.index', () => {
  test('should display users without page parameter', async ({ client }) => {
    const response = await client.get('/api/users')

    response.assertAgainstApiSpec()
  })

  test('should display users page with page parameter - /?page={$self}')
    .with(pageList)
    .run(async ({ client }, page) => {
      const response = await client.get(`/api/users/?page=${page}`)

      response.assertAgainstApiSpec()
    })
})
