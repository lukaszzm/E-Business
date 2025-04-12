import type { Product } from '@/types/product'

export const products = [
  {
    id: '1',
    name: 'Product 1',
    description: 'This is product 1',
    price: 100,
    stock: 10,
    discount: 0,
  },
  {
    id: '2',
    name: 'Product 2',
    description: 'This is product 2',
    price: 200,
    stock: 5,
    discount: 10,
  },
  {
    id: '3',
    name: 'Product 3',
    description: 'This is product 3',
    price: 300,
    stock: 0,
    discount: 20,
  },
  {
    id: '4',
    name: 'Product 4',
    description: 'This is product 4',
    price: 400,
    stock: 15,
    discount: 5,
  },
  {
    id: '5',
    name: 'Product 5',
    description: 'This is product 5',
    price: 500,
    stock: 8,
    discount: 15,
  },
] as const satisfies Product[]
