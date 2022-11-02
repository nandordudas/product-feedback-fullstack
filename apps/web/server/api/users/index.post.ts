import type { User } from '~/server/types'

export default defineEventHandler(async (event) => {
  const appConfig = useRuntimeConfig()
  const method = getMethod(event)
  const url = `${appConfig.apiBase}/users`
  const body = await readBody(event)
  const result = await $fetch<User>(url, { method, body })

  return result
})
