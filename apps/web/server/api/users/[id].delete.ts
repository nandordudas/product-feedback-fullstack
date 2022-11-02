import type { User } from '~/server/types'

export default defineEventHandler(async (event) => {
  const appConfig = useRuntimeConfig()
  const method = getMethod(event)
  const url = `${appConfig.apiBase}/users/${event.context.params.id}`
  const result = await $fetch<User>(url, { method })

  return result
})
