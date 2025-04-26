import { getProducts } from '@/api/products/getProducts'
import { useQuery } from '@tanstack/react-query'

export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ['products', 'featured'],
    queryFn: () => getProducts(),
    select: (res) => res.data.slice(0, 3),
  })
}
