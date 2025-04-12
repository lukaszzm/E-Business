import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Product } from '@/types/product'
import { Link } from '@tanstack/react-router'

interface ProductCardProps {
  product: Product
}

export function ProductCard({
  product: { id, discount, name, price, image, stock },
}: ProductCardProps) {
  const originalPrice = price + (price * discount) / 100
  const inStock = stock > 0

  return (
    <Link to="/$productId" params={{ productId: id }}>
      <div className="group relative rounded-lg border bg-card text-card-foreground shadow transition-all hover:shadow-md max-w-72">
        <div className="relative aspect-square overflow-hidden rounded-t-lg">
          <img
            src={image ?? 'https://placehold.jp/bebecb/1a1919/450x450.png'}
            alt={name}
            className="object-cover size-full transition-transform group-hover:scale-105"
          />
          {discount > 0 && (
            <Badge className="absolute right-2 top-2 bg-destructive text-white">
              {discount}% OFF
            </Badge>
          )}
        </div>
        <div className="p-2">
          <h2 className="font-medium text-lg line-clamp-1">{name}</h2>
          <div className="mt-2 flex items-center gap-2">
            <span className="font-bold text-lg">${price.toFixed(2)}</span>
            {discount > 0 && originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <div className="mt-4">
            <Button className="w-full" disabled={!inStock}>
              {inStock ? 'Add to Cart' : 'Out of Stock'}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  )
}
