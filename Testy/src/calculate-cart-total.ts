import type { LineItem } from "./types";

export function calculateCartTotal(items: ReadonlyArray<LineItem>): number {
  return items.reduce(
    (total, item) => total + item.price * (item.quantity ?? 1),
    0
  );
}
