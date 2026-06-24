import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { ApiResponse } from '@/types'

export const newsletterApi = createApi({
  reducerPath: 'newsletterApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Newsletter'],
  endpoints: (builder) => ({
    subscribeToNewsletter: builder.mutation<ApiResponse<{ email: string }>, { email: string }>({
      queryFn: (data) => {
        console.log('Mock newsletter subscription:', data.email)
        return { 
          data: {
            success: true,
            message: 'Successfully subscribed to newsletter (mock)',
            data: { email: data.email }
          }
        }
      },
      invalidatesTags: ['Newsletter'],
    }),
  }),
})

export const {
  useSubscribeToNewsletterMutation,
} = newsletterApi