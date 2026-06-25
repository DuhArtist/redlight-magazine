export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  imageUrl: string
  date: string | Date
  category: string
  author: string | { name: string }
  featured: boolean
  published: boolean
  views: number  // Add this
  tags: string[]  // Add this
  createdAt?: string
  updatedAt?: string
}

export interface Rose {
  id: string
  name: string
  stageName?: string
  bio: string
  imageUrl: string
  gallery: string[]
  category: 'rose' | 'art' | 'collab'
  featured: boolean
  socialLinks: {
    instagram?: string
    twitter?: string
    website?: string
  }
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
  category: string
  inStock: boolean
  tags: string[]
}

export interface User {
  id: string
  email: string
  name: string
  role: 'user' | 'admin' | 'rose'
  avatar?: string
}

export interface CartItem {
  productId: string
  quantity: number
  size?: string
  color?: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export type Theme = 'light' | 'dark' | 'auto'