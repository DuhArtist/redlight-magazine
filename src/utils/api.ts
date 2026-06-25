// src/utils/api.ts
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

export const api = {
  // GET requests
  get: async <T>(endpoint: string): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`)
    if (!response.ok) throw new Error(`API error: ${response.status}`)
    return response.json()
  },

  // POST requests
  post: async <T>(endpoint: string, data?: any): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: data ? JSON.stringify(data) : undefined,
    })
    if (!response.ok) throw new Error(`API error: ${response.status}`)
    return response.json()
  },

  // File upload
  upload: async (file: File): Promise<{ url: string; publicId: string }> => {
    const formData = new FormData()
    formData.append('media', file)

    const response = await fetch(`${API_BASE_URL}/media/upload`, {
      method: 'POST',
      body: formData,
    })
    if (!response.ok) throw new Error('Upload failed')
    const result = await response.json()
    return result.data
  },
}