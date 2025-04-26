import { ProductAddToCart } from '@/components/product/product-add-to-cart'
import { Button } from '@/components/ui/button'
import { useProductByID } from '@/hooks/useProductByID'
import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { ChevronLeftIcon } from 'lucide-react'

const MOCKED_STOCK = 34

export const Route = createFileRoute('/_layout/$productId')({
  beforeLoad: async ({ params }) => {
    if (!params.productId) {
      throw notFound()
    }

    const productId = Number(params.productId)

    if (Number.isNaN(productId)) {
      throw notFound()
    }

    return { productId }
  },
  component: ProductDetailsPage,
})

function ProductDetailsPage() {
  const { productId } = Route.useParams()

  const fixedProductId = Number(productId)

  const { data: product, isPending, error } = useProductByID(fixedProductId)

  if (isPending) return <p>Loading...</p>

  if (error) return <p>Error loading product</p>

  if (!product) return <p>Product not found</p>

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
            src="https://placehold.jp/bebecb/1a1919/750x750.png"
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
          </div>
          <div className="mt-4">
            <ProductAddToCart productId={fixedProductId} stock={MOCKED_STOCK} />
          </div>
        </div>
      </section>
    </>
  )
}
