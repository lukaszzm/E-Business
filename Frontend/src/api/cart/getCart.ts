import { apiClient } from '@/api/client'
import type { Cart } from '@/types'

export const MY_CART_ID = 3

export async function getCart() {
  return apiClient.get<Cart>(`carts/${MY_CART_ID}`)
}
