type LineItem = {
  price: number;
  quantity?: number;
};

type Order = {
  items: ReadonlyArray<LineItem>;
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
};

export type { LineItem, Order };
