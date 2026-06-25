export interface PaginationParams {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface ArticleFilters extends Partial<PaginationParams> {
  category?: string
  featured?: boolean
  search?: string
  tags?: string[]
}

export interface RoseFilters extends Partial<PaginationParams> {
  category?: 'rose' | 'art' | 'collab' | 'all'
  featured?: boolean
  search?: string // Add this!
}

export interface ApiError {
  status: number
  message: string
  errors?: Record<string, string[]>
}