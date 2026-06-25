export interface PaginationParams {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface ArticleFilters extends PaginationParams {
  category?: string
  featured?: boolean
  search?: string
  page?: number
  limit?: number
  sortBy?: string
  tags?: string[]
}

export interface RoseFilters extends PaginationParams {
  category?: 'rose' | 'art' | 'collab'
  featured?: boolean
}

export interface ApiError {
  status: number
  message: string
  errors?: Record<string, string[]>
}