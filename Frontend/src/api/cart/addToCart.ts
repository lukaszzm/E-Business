import { MY_CART_ID } from '@/api/cart/getCart'
import { apiClient } from '@/api/client'
import type { LineItem } from '@/types'

interface AddToCartPayload {
  productId: Readonly<number>
  quantity: Readonly<number>
  cartId?: Readonly<number>
}

export async function addToCart(
  { productId, quantity, cartId = MY_CART_ID }: AddToCartPayload = {
    productId: 0,
    quantity: 1,
    cartId: undefined,
  },
) {
  return apiClient.post<LineItem>(`carts/${cartId}/items`, {
    product_id: productId,
    quantity,
  })
}
