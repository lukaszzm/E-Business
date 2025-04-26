export type Product = {
  id: number
  created_at: string
  updated_at: string
  deleted_at: string
  name: string
  description: string
  price: number
  category_id: number
  category: Category
}

export type Category = {
  id: number
  created_at: string
  updated_at: string
  deleted_at: string
  name: string
  description: string
}

export type Cart = {
  id: number
  created_at: string
  updated_at: string
  deleted_at: string
  user_id: number
  total: number
  line_items?: LineItem[]
}

export type LineItem = {
  id: number
  created_at: string
  updated_at: string
  deleted_at: string
  cart_id: number
  product_id: number
  product: Product
  quantity: number
  price: number
}
