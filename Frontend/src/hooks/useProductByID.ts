import { getProductByID } from '@/api/products/getProductByID'
import { useQuery } from '@tanstack/react-query'

export const useProductByID = (id: number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductByID(id),
    select: (res) => res.data,
  })
}
