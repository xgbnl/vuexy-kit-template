export interface Paginator<Model> {
  total: number
  perPage: number
  currentPage: number
  list: Model[]
}
