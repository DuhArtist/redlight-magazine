import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Article, ApiResponse } from '@/types'
import { ArticleFilters } from '@/types/api.types'

// API_BASE_URL is not used directly here since we're using the baseUrl below
// We'll keep it commented to avoid unused variable errors
// const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

export const articlesApi = createApi({
  reducerPath: 'articlesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5001/api',
    credentials: 'include',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json')
      return headers
    },
  }),
  tagTypes: ['Articles'],
  endpoints: (builder) => ({
    getFeaturedArticles: builder.query<Article[], void>({
      query: () => '/articles/featured',
      providesTags: ['Articles'],
      transformResponse: (response: Article[]) => response,
    }),
    getLatestArticles: builder.query<Article[], void>({
      query: () => '/articles/latest',
      providesTags: ['Articles'],
      transformResponse: (response: Article[]) => response,
    }),
    getArticleById: builder.query<Article, string>({
      query: (id) => `/articles/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Articles', id }],
    }),
    getArticles: builder.query<ApiResponse<Article[]>, ArticleFilters>({
      query: (params) => {
        const queryParams = new URLSearchParams()
        if (params.category && params.category !== 'all') queryParams.append('category', params.category)
        if (params.search) queryParams.append('search', params.search)
        if (params.page) queryParams.append('page', params.page.toString())
        if (params.limit) queryParams.append('limit', params.limit.toString())
        if (params.sortBy) queryParams.append('sortBy', params.sortBy)
        if (params.tags && params.tags.length > 0) {
          params.tags.forEach(tag => queryParams.append('tags', tag))
        }
        
        return {
          url: `/articles?${queryParams.toString()}`,
        }
      },
      providesTags: ['Articles'],
      transformResponse: (response: ApiResponse<Article[]>) => response,
    }),
  }),
})

export const {
  useGetFeaturedArticlesQuery,
  useGetLatestArticlesQuery,
  useGetArticleByIdQuery,
  useGetArticlesQuery,
} = articlesApi