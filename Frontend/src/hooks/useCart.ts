import { getCart } from '@/api/cart/getCart'
import { useQuery } from '@tanstack/react-query'

export const useCart = () => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: () => getCart(),
    select: (res) => res.data,
  })
}
