import { products } from '@/__mocks__'
import { ProductCard } from '@/components/product/product-card'
import { Button } from '@/components/ui/button'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ChevronRightCircleIcon } from 'lucide-react'

export const Route = createFileRoute('/_layout/')({
  component: HomePage,
})

function HomePage() {
  return (
    <>
      <section id="sale-banner">
        <div className="bg-blue-800 text-white py-3 md:py-6 text-center px-2 md:px-4 rounded-lg">
          <p className="text-xl font-semibold">
            🔥 50% off on all products! 🔥
          </p>
        </div>
      </section>
      <section id="highlighted-products" className="mt-4">
        <div className="p-4 md:p-6 rounded-lg">
          <h1 className="text-2xl font-semibold mb-4">Featured Products</h1>
          <div className="flex flex-wrap gap-2 justify-around">
            {/* Placeholder for product cards */}
            {products.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            <Button
              className="h-105 w-full max-w-72 grid place-content-center"
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
        </div>
      </section>
    </>
  )
}
