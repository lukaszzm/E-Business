import { apiClient } from '@/api/client'
import type { Product } from '@/types'

export async function getFeaturedProducts() {
  return apiClient.get<Product[]>('/products?featured=true')
}
