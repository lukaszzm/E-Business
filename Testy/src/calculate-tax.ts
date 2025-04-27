export function calculateTax(subtotal: number, taxRate = 0.08): number {
  return subtotal * taxRate;
}
