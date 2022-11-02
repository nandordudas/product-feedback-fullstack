import type { Response } from '~/server/types'

// https://v3.nuxtjs.org/guide/directory-structure/server
export default defineEventHandler(async () => {
  const appConfig = useRuntimeConfig()
  const url = `${appConfig.apiBase}/users`
  const result = await $fetch<Response>(url)

  return result
})
