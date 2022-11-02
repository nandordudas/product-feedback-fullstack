interface Pagination {
  total: number
  perPage: number
  currentPage: number
  lastPage: number
  firstPage: number
  firstPageUrl: string
  lastPageUrl: string
  nextPageUrl: string | null
  previousPageUrl: string | null
}

interface User {
  id: number
  email: string
  createdAt: string
  updatedAt: string
}

interface Response {
  meta: Pagination
  data: User[]
}

// TODO: move to app config
const baseUrl = 'http://localhost:3333/api'

export default defineEventHandler(async () => {
  const result = await $fetch<Response>(`${baseUrl}/users`)

  return result
})
