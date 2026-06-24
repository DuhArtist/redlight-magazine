import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Article } from '@/types'

interface ArticlesState {
  featuredArticles: Article[]
  latestArticles: Article[]
  currentArticle: Article | null
  filters: {
    category: string
    search: string
    sortBy: string
  }
}

const initialState: ArticlesState = {
  featuredArticles: [],
  latestArticles: [],
  currentArticle: null,
  filters: {
    category: 'all',
    search: '',
    sortBy: 'date',
  },
}

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setFeaturedArticles: (state, action: PayloadAction<Article[]>) => {
      state.featuredArticles = action.payload
    },
    setLatestArticles: (state, action: PayloadAction<Article[]>) => {
      state.latestArticles = action.payload
    },
    setCurrentArticle: (state, action: PayloadAction<Article | null>) => {
      state.currentArticle = action.payload
    },
    setCategoryFilter: (state, action: PayloadAction<string>) => {
      state.filters.category = action.payload
    },
    setSearchFilter: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.filters.sortBy = action.payload
    },
  },
})

export const {
  setFeaturedArticles,
  setLatestArticles,
  setCurrentArticle,
  setCategoryFilter,
  setSearchFilter,
  setSortBy,
} = articlesSlice.actions

export default articlesSlice.reducer