import { ProductCard } from '@/components/product/product-card'
import { Button } from '@/components/ui/button'
import { useFeaturedProducts } from '@/hooks/useFeaturedProducts'
import { Link } from '@tanstack/react-router'
import { ChevronRightCircleIcon } from 'lucide-react'

export function FeaturedProducts() {
  const { data, isPending, error } = useFeaturedProducts()

  if (isPending) return <p>Loading...</p>

  if (error) return <p>Error loading products</p>

  if (!data || data.length === 0) return <p>No featured products available</p>

  return (
    <div className="flex flex-wrap gap-2 justify-around">
      {data.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      <Button
        className="h-96 w-full max-w-64 grid place-content-center"
        variant="outline"
        asChild
      >
        <Link to="/products">
          <div className="flex flex-col items-center gap-4 text-xl">
            <span>View All Products</span>
            <ChevronRightCircleIcon className="size-6" />
          </div>
        </Link>
      </Button>
    </div>
  )
}
