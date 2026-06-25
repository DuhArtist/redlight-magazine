import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Article, ApiResponse } from '@/types'
import { ArticleFilters } from '@/types/api.types'

// Get the base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

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
      providesTags: (result, error, id) => [{ type: 'Articles', id }],
    }),
    getArticles: builder.query<ApiResponse<Article[]>, ArticleFilters>({
      query: (params) => {
        const queryParams = new URLSearchParams()
        if (params.category && params.category !== 'all') queryParams.append('category', params.category)
        if (params.search) queryParams.append('search', params.search)
        if (params.page) queryParams.append('page', params.page.toString())
        if (params.limit) queryParams.append('limit', params.limit.toString())
        if (params.sortBy) queryParams.append('sortBy', params.sortBy)
        
        return {
          url: `/articles?${queryParams.toString()}`,
        }
      },
      providesTags: ['Articles'],
    }),
  }),
})

export const {
  useGetFeaturedArticlesQuery,
  useGetLatestArticlesQuery,
  useGetArticleByIdQuery,
  useGetArticlesQuery,
} = articlesApi