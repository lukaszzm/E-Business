import { MY_CART_ID } from '@/api/cart/getCart'
import { apiClient } from '@/api/client'

interface PlaceOrderPayload {
  cartId?: number
}

export async function placeOrder({ cartId = MY_CART_ID }: PlaceOrderPayload) {
  return apiClient.post<string>(`carts/${cartId}/place-order`)
}
