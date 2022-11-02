export interface Pagination {
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

// TODO: check openapi
export interface User {
  id: number
  email: string
  createdAt: string
  updatedAt: string
}

export interface Response {
  meta: Pagination
  data: User[]
}
