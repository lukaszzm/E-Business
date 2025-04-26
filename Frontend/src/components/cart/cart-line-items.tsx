import type { LineItem } from '@/types'

interface CartLineItemsProps {
  lineItems: LineItem[] | undefined
}

export function CartLineItems({ lineItems }: CartLineItemsProps) {
  if (!lineItems || lineItems.length === 0) {
    return (
      <div className="text-center text-muted-foreground w-full">
        No items in cart
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 w-full border-separate">
      {lineItems.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between rounded-lg p-4"
        >
          <div className="flex items-center gap-4">
            <img
              src="https://placehold.jp/bebecb/1a1919/450x450.png"
              alt={item.product.name}
              className="h-16 w-16 rounded-lg object-cover"
            />
            <div>
              <h2 className="font-medium text-lg">{item.product.name}</h2>
              <span className="text-sm text-muted-foreground">
                Quantity: {item.quantity}
              </span>
            </div>
          </div>
          <span className="font-bold text-lg">${item.price.toFixed(2)}</span>
        </div>
      ))}
    </div>
  )
}
