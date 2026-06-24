import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { Product, CartItem, ApiResponse } from '@/types'

export const shopApi = createApi({
  reducerPath: 'shopApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Products', 'Cart'],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      queryFn: () => {
        return { 
          data: [] // Empty array since shop is coming soon
        }
      },
      providesTags: ['Products'],
    }),
    getProductById: builder.query<Product, string>({
      queryFn: (id) => {
        return { 
          data: {
            id,
            name: 'Sample Product',
            description: 'Coming soon...',
            price: 0,
            imageUrl: '',
            category: 'clothing',
            inStock: false,
            tags: []
          }
        }
      },
      providesTags: (result, error, id) => [{ type: 'Products', id }],
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
} = shopApi