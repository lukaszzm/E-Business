import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/cart')({
  component: CartPage,
})

function CartPage() {
  return <div>Hello "/cart"!</div>
}
