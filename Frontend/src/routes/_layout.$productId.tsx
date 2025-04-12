import { products } from '@/__mocks__'
import { Button } from '@/components/ui/button'
import type { Product } from '@/types/product'
import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { ChevronLeftIcon } from 'lucide-react'

export const Route = createFileRoute('/_layout/$productId')({
  component: ProductDetailsPage,
})

function ProductDetailsPage() {
  const product: Product | undefined = products.find(
    (product) => product.id === '1',
  )

  if (!product) {
    throw notFound()
  }

  return (
    <>
      <Button variant="ghost" asChild>
        <Link to="/products">
          <ChevronLeftIcon />
          <span>Back to products</span>
        </Link>
      </Button>
      <section id="product-details" className="mt-4 flex justify-center gap-8">
        <div className="flex-1 ">
          <img
            src={
              product.image ?? 'https://placehold.jp/bebecb/1a1919/750x750.png'
            }
            alt={product.name}
            className="size-full rounded-lg"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-semibold mb-4">{product.name}</h1>
          <p className="text-lg mb-4">
            {product.description ?? 'No description available.'}
          </p>
          <div className="flex items-center gap-2">
            <span className="font-bold text-xl">
              ${product.price.toFixed(2)}
            </span>
            {product.discount > 0 && (
              <span className="text-sm text-muted-foreground line-through">
                $
                {(
                  product.price +
                  (product.price * product.discount) / 100
                ).toFixed(2)}
              </span>
            )}
          </div>
          <div className="mt-4">
            <Button className="w-full" disabled={product.stock <= 0}>
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
