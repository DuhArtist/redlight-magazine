import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product, CartItem } from '@/types'

interface ShopState {
  products: Product[]
  cart: CartItem[]
  isComingSoon: boolean
}

const initialState: ShopState = {
  products: [],
  cart: [],
  isComingSoon: true,
}

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload
    },
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.cart.find(
        item => item.productId === action.payload.productId
      )
      if (existingItem) {
        existingItem.quantity += action.payload.quantity
      } else {
        state.cart.push(action.payload)
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter(item => item.productId !== action.payload)
    },
    updateCartQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const item = state.cart.find(item => item.productId === action.payload.productId)
      if (item) {
        item.quantity = action.payload.quantity
      }
    },
    clearCart: (state) => {
      state.cart = []
    },
    toggleComingSoon: (state, action: PayloadAction<boolean>) => {
      state.isComingSoon = action.payload
    },
  },
})

export const {
  setProducts,
  addToCart,
  removeFromCart,
  updateCartQuantity,
  clearCart,
  toggleComingSoon,
} = shopSlice.actions

export default shopSlice.reducer