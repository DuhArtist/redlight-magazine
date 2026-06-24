import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { Article, ApiResponse } from '@/types'
import { ArticleFilters } from '@/types/api.types'
import { mockArticles } from '@/utils/mockData'

export const articlesApi = createApi({
  reducerPath: 'articlesApi',
  baseQuery: fakeBaseQuery(),  // This tells RTK Query to use mock data
  tagTypes: ['Articles'],
  endpoints: (builder) => ({
    getFeaturedArticles: builder.query<Article[], void>({
      queryFn: () => {
        // Return mock data instead of making API call
        return { data: mockArticles.featured }
      },
      providesTags: ['Articles'],
    }),
    getLatestArticles: builder.query<Article[], void>({
      queryFn: () => {
        return { data: mockArticles.latest }
      },
      providesTags: ['Articles'],
    }),
    getArticleById: builder.query<Article, string>({
      queryFn: (id) => {
        // Find article by ID in mock data
        const allArticles = [...mockArticles.featured, ...mockArticles.latest]
        const article = allArticles.find(a => a.id === id) || mockArticles.featured[0]
        return { data: article }
      },
      providesTags: (result, error, id) => [{ type: 'Articles', id }],
    }),
    getArticles: builder.query<ApiResponse<Article[]>, ArticleFilters>({
      queryFn: (params) => {
        const allArticles = [...mockArticles.featured, ...mockArticles.latest]
        
        // Apply filters (mock implementation)
        let filtered = [...allArticles]
        
        if (params.category && params.category !== 'all') {
          filtered = filtered.filter(article => article.category === params.category)
        }
        
        if (params.search) {
          const searchLower = params.search.toLowerCase()
          filtered = filtered.filter(article => 
            article.title.toLowerCase().includes(searchLower) ||
            article.excerpt.toLowerCase().includes(searchLower)
          )
        }
        
        // Pagination
        const page = params.page || 1
        const limit = params.limit || 10
        const startIndex = (page - 1) * limit
        const endIndex = startIndex + limit
        const paginated = filtered.slice(startIndex, endIndex)
        
        return { 
          data: {
            success: true,
            data: paginated,
            pagination: {
              page,
              limit,
              total: filtered.length,
              pages: Math.ceil(filtered.length / limit)
            }
          }
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