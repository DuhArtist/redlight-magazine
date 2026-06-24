import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import uiReducer from './slices/uiSlice'
import articlesReducer from './slices/articlesSlice'
import rosesReducer from './slices/rosesSlice'
import shopReducer from './slices/shopSlice'
import { articlesApi } from './api/articlesApi'
import { rosesApi } from './api/rosesApi'
import { shopApi } from './api/shopApi'
import { newsletterApi } from './api/newsletterApi'

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    articles: articlesReducer,
    roses: rosesReducer,
    shop: shopReducer,
    [articlesApi.reducerPath]: articlesApi.reducer,
    [rosesApi.reducerPath]: rosesApi.reducer,
    [shopApi.reducerPath]: shopApi.reducer,
    [newsletterApi.reducerPath]: newsletterApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      articlesApi.middleware,
      rosesApi.middleware,
      shopApi.middleware,
      newsletterApi.middleware
    ),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch