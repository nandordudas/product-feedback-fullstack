import { $fetch } from '@nuxt/test-utils'

import type { User } from '~/server/types'

export async function getExistingUserId(): Promise<number> {
  const { data } = await $fetch('/api/users')
  const [id] = (data as User[]).map(({ id }) => id)

  return id
}
