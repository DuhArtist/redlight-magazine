import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// API_BASE_URL is not used directly here since we're using the baseUrl below
// const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

export interface Product {
  id: string
  name: string
  price: string
  category: string
  image: string
  description: string
  gallery?: string[]
  included?: string[]
  related?: string[]
}

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
    getProducts: builder.query<Product[], void>({
      query: () => '/products',
      providesTags: ['Products'],
      transformResponse: (response: Product[]) => response,
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => `/products/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Products', id }],
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
} = shopApi