import { placeOrder } from '@/api/cart/placeOrder'
import { Button } from '@/components/ui/button'
import { queryClient } from '@/lib/queryClient'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

interface CartCheckoutButtonProps {
  cartId: number
}

export function CartCheckoutButton({ cartId }: CartCheckoutButtonProps) {
  const navigate = useNavigate()

  const { mutate, isPending } = useMutation({
    mutationKey: ['placeOrder'],
    mutationFn: () => placeOrder({ cartId }),
    onSuccess: () => {
      navigate({
        to: '/order-confirmation',
      })
      queryClient.invalidateQueries({
        queryKey: ['cart'],
      })
    },
    onError: (error) => {
      console.log('Error placing order')
      console.log(error)
      toast.error('Error placing order')
    },
  })

  return (
    <Button className="w-full" disabled={isPending} onClick={() => mutate()}>
      Checkout
    </Button>
  )
}
