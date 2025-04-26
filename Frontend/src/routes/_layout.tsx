import { Button } from '@/components/ui/button'
import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { PyramidIcon, ShoppingBasketIcon } from 'lucide-react'
import { Toaster } from '@/components/ui/sonner'

export const Route = createFileRoute('/_layout')({
  component: Layout,
})

function Layout() {
  return (
    <>
      <div className="min-h-screen">
        <header className="w-full py-2 px-4 md:px-6 border-b border-border flex justify-between gap-9 items-center">
          <Link
            to="/"
            className="uppercase text-xl font-semibold flex items-center gap-2"
          >
            <PyramidIcon className="bg-primary p-1 text-primary-foreground rounded-lg" />
            <span className="text-nowrap">TS-Commerce</span>
          </Link>
          <nav className="flex gap-3 w-full">
            <Link
              to="/products"
              className="text-lg text-muted-foreground hover:text-primary"
            >
              Products
            </Link>
          </nav>

          <Button size="icon" asChild>
            <Link to="/cart">
              <ShoppingBasketIcon className="size-6" />
              <span className="sr-only">View cart</span>
            </Link>
          </Button>
        </header>
        <main className="flex-1 w-full p-2 md:p-6 container mx-auto">
          <Outlet />
        </main>
      </div>
      <Toaster />
    </>
  )
}
