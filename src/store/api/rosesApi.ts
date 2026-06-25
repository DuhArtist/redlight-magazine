import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Rose, ApiResponse } from '@/types'
import { RoseFilters } from '@/types/api.types'

// Comment out unused variable or use it
// const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

export const rosesApi = createApi({
  reducerPath: 'rosesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5001/api',
    credentials: 'include',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json')
      return headers
    },
  }),
  tagTypes: ['Roses'],
  endpoints: (builder) => ({
    // Get featured rose
    getFeaturedRose: builder.query<Rose, void>({
      query: () => '/roses/featured',
      providesTags: ['Roses'],
    }),

    // Get all roses with filters
    getRoses: builder.query<ApiResponse<Rose[]>, RoseFilters>({
      query: (params) => {
        const queryParams = new URLSearchParams()
        // Fix: Check if category exists and is not undefined before comparing
        if (params.category && params.category !== 'all') {
          queryParams.append('category', params.category)
        }
        if (params.search) {
          queryParams.append('search', params.search)
        }
        if (params.page) {
          queryParams.append('page', params.page.toString())
        }
        if (params.limit) {
          queryParams.append('limit', params.limit.toString())
        }
        
        const queryString = queryParams.toString()
        return {
          url: `/roses${queryString ? `?${queryString}` : ''}`,
        }
      },
      providesTags: (result) => {
        // Fix: Check if result and result.data exist
        if (result && result.data) {
          return [
            ...result.data.map(({ id }) => ({ type: 'Roses' as const, id })),
            { type: 'Roses', id: 'LIST' },
          ]
        }
        return [{ type: 'Roses', id: 'LIST' }]
      },
    }),

    // Get single rose by ID
    getRoseById: builder.query<Rose, string>({
      query: (id) => `/roses/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Roses', id }],
    }),
  }),
})

export const {
  useGetFeaturedRoseQuery,
  useGetRosesQuery,
  useGetRoseByIdQuery,
} = rosesApi