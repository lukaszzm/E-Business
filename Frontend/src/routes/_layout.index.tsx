import { FeaturedProducts } from '@/components/featured'
import { createFileRoute } from '@tanstack/react-router'

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
          <FeaturedProducts />
        </div>
      </section>
    </>
  )
}
