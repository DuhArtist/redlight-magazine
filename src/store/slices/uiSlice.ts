import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UIState {
  mobileMenuOpen: boolean
  currentModal: string | null
  isLoading: boolean
  theme: 'light' | 'dark'
  notification: {
    message: string
    type: 'success' | 'error' | 'info'
  } | null
}

const initialState: UIState = {
  mobileMenuOpen: false,
  currentModal: null,
  isLoading: false,
  theme: 'dark',
  notification: null,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen
    },
    closeMobileMenu: (state) => {
      state.mobileMenuOpen = false
    },
    openModal: (state, action: PayloadAction<string>) => {
      state.currentModal = action.payload
    },
    closeModal: (state) => {
      state.currentModal = null
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload
    },
    showNotification: (state, action: PayloadAction<{
      message: string
      type: 'success' | 'error' | 'info'
    }>) => {
      state.notification = action.payload
    },
    clearNotification: (state) => {
      state.notification = null
    },
  },
})

export const {
  toggleMobileMenu,
  closeMobileMenu,
  openModal,
  closeModal,
  setLoading,
  setTheme,
  showNotification,
  clearNotification,
} = uiSlice.actions

export default uiSlice.reducer