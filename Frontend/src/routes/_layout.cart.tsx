import { CartLineItems } from '@/components/cart/cart-line-items'
import { CartSummary } from '@/components/cart/cart-summary'
import { useCart } from '@/hooks/useCart'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/cart')({
  component: CartPage,
})

function CartPage() {
  const { data, isPending, error } = useCart()

  if (isPending) return <div>Loading...</div>

  if (error) return <div>Error: {error.message}</div>

  if (!data) return <div>No data</div>

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
      <div className="w-full flex gap-6">
        <CartLineItems lineItems={data.line_items} />
        <CartSummary
          cartId={data.id}
          totalLineItems={data.line_items?.length ?? 0}
          totalPrice={data.total}
        />
      </div>
    </section>
  )
}
