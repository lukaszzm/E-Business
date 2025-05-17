import { ProductAddToCart } from '@/components/product/product-add-to-cart'
import type { Product } from '@/types'
import { Link } from '@tanstack/react-router'

interface ProductCardProps {
  product: Product
}

const MOCKED_STOCK = 34

export function ProductCard({
  product: { id, name, price },
}: Readonly<ProductCardProps>) {
  return (
    <div className="group relative rounded-lg border bg-card text-card-foreground shadow transition-all hover:shadow-md max-w-64">
      <div className="relative aspect-square overflow-hidden rounded-t-lg">
        <Link to="/$productId" params={{ productId: String(id) }}>
          <img
            src="https://placehold.jp/bebecb/1a1919/450x450.png"
            alt={name}
            className="object-cover size-full transition-transform group-hover:scale-105"
          />
        </Link>
      </div>
      <div className="p-2">
        <Link to="/$productId" params={{ productId: String(id) }}>
          <h2 className="font-medium text-lg line-clamp-1">{name}</h2>
        </Link>
        <div className="mt-2 flex items-center gap-2">
          <span className="font-bold text-lg">${price.toFixed(2)}</span>
          <span className="text-sm text-muted-foreground line-through">
            ${price.toFixed(2)}
          </span>
        </div>
        <div className="mt-4">
          <ProductAddToCart productId={id} stock={MOCKED_STOCK} />
        </div>
      </div>
    </div>
  )
}
