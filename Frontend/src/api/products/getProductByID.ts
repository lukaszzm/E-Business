import { apiClient } from '@/api/client'
import type { Product } from '@/types'

export async function getProductByID(id: number) {
  return apiClient.get<Product>(`/products/${id}`)
}
