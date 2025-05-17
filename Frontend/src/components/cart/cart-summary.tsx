import { CartCheckoutButton } from '@/components/cart/cart-checkout-button'

interface CartSummaryProps {
  cartId: Readonly<number>
  totalLineItems: Readonly<number>
  totalPrice: Readonly<number>
}

export function CartSummary({
  cartId,
  totalLineItems,
  totalPrice,
}: CartSummaryProps) {
  return (
    <div className="flex flex-col gap-4 p-4 min-w-sm">
      <div className="flex flex-col gap-2 p-4 rounded-lg border border-border">
        <h2 className="text-lg font-semibold">Cart Summary</h2>
        <div className="flex justify-between">
          <span>Total Items:</span>
          <span>{totalLineItems}</span>
        </div>
        <div className="flex justify-between">
          <span>Total Price:</span>
          <span> ${totalPrice.toFixed(2)}</span>
        </div>
      </div>
      <CartCheckoutButton cartId={cartId} />
    </div>
  )
}
