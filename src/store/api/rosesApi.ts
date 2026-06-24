import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { Rose, ApiResponse } from '@/types'
import { RoseFilters } from '@/types/api.types'
import { mockRoses } from '@/utils/mockData'

export const rosesApi = createApi({
  reducerPath: 'rosesApi',
  baseQuery: fakeBaseQuery(),  // Use mock data
  tagTypes: ['Roses'],
  endpoints: (builder) => ({
    getFeaturedRose: builder.query<Rose, void>({
      queryFn: () => {
        return { data: mockRoses.featured }
      },
      providesTags: ['Roses'],
    }),
    getRoses: builder.query<ApiResponse<Rose[]>, RoseFilters>({
      queryFn: (params) => {
        let filtered = [...mockRoses.list]
        
        // Apply filters
        if (params.category && params.category !== 'all') {
          filtered = filtered.filter(rose => rose.category === params.category)
        }
        
        if (params.search) {
          const searchLower = params.search.toLowerCase()
          filtered = filtered.filter(rose => 
            rose.name.toLowerCase().includes(searchLower) ||
            (rose.stageName && rose.stageName.toLowerCase().includes(searchLower))
          )
        }
        
        // Pagination
        const page = params.page || 1
        const limit = params.limit || 10
        const startIndex = (page - 1) * limit
        const endIndex = startIndex + limit
        
        return { 
          data: {
            success: true,
            data: filtered.slice(startIndex, endIndex),
            pagination: {
              page,
              limit,
              total: filtered.length,
              pages: Math.ceil(filtered.length / limit)
            }
          }
        }
      },
      providesTags: ['Roses'],
    }),
    getRoseById: builder.query<Rose, string>({
      queryFn: (id) => {
        const rose = mockRoses.list.find(r => r.id === id) || mockRoses.featured
        return { data: rose }
      },
      providesTags: (result, error, id) => [{ type: 'Roses', id }],
    }),
  }),
})

export const {
  useGetFeaturedRoseQuery,
  useGetRosesQuery,
  useGetRoseByIdQuery,
} = rosesApi