import { apiClient } from '@/api/client'
import type { Product } from '@/types'

export async function getProducts() {
  return apiClient.get<Product[]>('/products')
}
