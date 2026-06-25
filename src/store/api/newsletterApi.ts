import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// API_BASE_URL is not used directly here since we're using the baseUrl below
// const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

export const newsletterApi = createApi({
  reducerPath: 'newsletterApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5001/api',
    credentials: 'include',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json')
      return headers
    },
  }),
  tagTypes: ['Newsletter'],
  endpoints: (builder) => ({
    subscribe: builder.mutation<{ message: string }, { email: string }>({
      query: (body) => ({
        url: '/newsletter/subscribe',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Newsletter'],
    }),
  }),
})

// Export the mutation hook with the desired name
export const { useSubscribeMutation: useSubscribeToNewsletterMutation } = newsletterApi