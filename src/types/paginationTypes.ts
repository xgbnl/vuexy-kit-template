export type Paginator<T> = {
  total: number
  perPage: number
  currentPage: number
  list: T[]
}
