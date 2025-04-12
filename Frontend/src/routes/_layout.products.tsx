import { products } from '@/__mocks__'
import { ProductCard } from '@/components/product/product-card'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/products')({
  component: ProductsPage,
})

function ProductsPage() {
  return (
    <section>
      <div className="p-4 md:p-6 rounded-lg">
        <h1 className="text-2xl font-semibold mb-4">All Products</h1>
        <div className="flex flex-wrap gap-6 mx-auto">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
