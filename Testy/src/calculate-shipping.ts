export function calculateShipping(subtotal: number): number {
  if (subtotal > 50) {
    return 0;
  }
  return 5.99;
}
