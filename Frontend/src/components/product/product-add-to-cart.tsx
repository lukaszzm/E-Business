import { addToCart } from '@/api/cart/addToCart'
import { Button } from '@/components/ui/button'
import { queryClient } from '@/lib/queryClient'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

interface ProductAddToCartProps {
  productId: number
  stock: number
  quantity?: number
}

export function ProductAddToCart({
  productId,
  stock,
  quantity = 1,
}: ProductAddToCartProps) {
  const inStock = stock > 0

  const { mutate, isPending } = useMutation({
    mutationKey: ['addToCart'],
    mutationFn: () => addToCart({ productId, quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cart'],
      })
      toast.success('Product added to cart')
    },
    onError: (error) => {
      console.log(error)
      toast.error('Error adding product to cart')
    },
  })

  return (
    <Button
      className="w-full"
      disabled={isPending || !inStock}
      onClick={() => mutate()}
    >
      {inStock ? 'Add to Cart' : 'Out of Stock'}
    </Button>
  )
}
