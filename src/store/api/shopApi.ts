import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Product, CartItem, ApiResponse } from '@/types'

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

export const shopApi = createApi({
  reducerPath: 'shopApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5001/api',
    credentials: 'include',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json')
      return headers
    },
  }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getProducts: builder.query<any[], void>({
      query: () => '/products',
      providesTags: ['Products'],
    }),
  }),
})

export const { useGetProductsQuery } = shopApi
