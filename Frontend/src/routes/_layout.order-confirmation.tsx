import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/order-confirmation')({
  component: OrderConfirmationPage,
})

function OrderConfirmationPage() {
  return (
    <section className="flex flex-col items-center justify-center gap-2 p-4 max-w-lg mx-auto text-center">
      <h1 className="text-2xl font-semibold mb-4">Thank you for an order!</h1>
      <p>
        Your order has been successfully placed. You will receive a confirmation
        email shortly with the details of your order.
      </p>
    </section>
  )
}
