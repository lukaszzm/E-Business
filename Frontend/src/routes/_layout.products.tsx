import { ProductCard } from '@/components/product/product-card'
import { useProducts } from '@/hooks/useProducts'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/products')({
  component: ProductsPage,
})

function ProductsPage() {
  const { data, isPending, error } = useProducts()

  if (isPending) return <p>Loading...</p>

  if (error) return <p>Error loading products</p>

  if (!data || data.length === 0) return <p>No products available</p>

  return (
    <section>
      <div className="p-4 md:p-6 rounded-lg">
        <h1 className="text-2xl font-semibold mb-4">All Products</h1>
        <div className="flex flex-wrap gap-6 mx-auto">
          {data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
