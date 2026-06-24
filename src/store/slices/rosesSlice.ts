import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Rose } from '@/types'

interface RosesState {
  featuredRose: Rose | null
  roseList: Rose[]
  filters: {
    category: 'rose' | 'art' | 'collab' | 'all'
    search: string
    sortBy: string
  }
}

const initialState: RosesState = {
  featuredRose: null,
  roseList: [],
  filters: {
    category: 'all',
    search: '',
    sortBy: 'name',
  },
}

const rosesSlice = createSlice({
  name: 'roses',
  initialState,
  reducers: {
    setFeaturedRose: (state, action: PayloadAction<Rose | null>) => {
      state.featuredRose = action.payload
    },
    setRoseList: (state, action: PayloadAction<Rose[]>) => {
      state.roseList = action.payload
    },
    setCategoryFilter: (state, action: PayloadAction<'rose' | 'art' | 'collab' | 'all'>) => {
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
  setFeaturedRose,
  setRoseList,
  setCategoryFilter,
  setSearchFilter,
  setSortBy,
} = rosesSlice.actions

export default rosesSlice.reducer