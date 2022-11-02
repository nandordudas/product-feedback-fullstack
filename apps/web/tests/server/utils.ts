import { $fetch } from '@nuxt/test-utils'

export async function getExistingUserId(): Promise<number> {
  const { data } = await $fetch('/api/users')
  const [id] = data.map(({ id }) => id)

  return id
}
